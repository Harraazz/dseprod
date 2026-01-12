"use client"

import React, { useState, useMemo, useEffect } from "react"
import { ArrowUpDown, Search, Pencil, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

type Cabang = {
  id: number
  title: string
  content: string
  date: string
  status: "Aktif" | "Nonaktif"
}

export default function LocationCabangTable() {
  const router = useRouter()
  const [data, setData] = useState<Cabang[]>([])
  const [search, setSearch] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: keyof Cabang; direction: "asc" | "desc" }>({
    key: "date",
    direction: "desc",
  })
  const [page, setPage] = useState(1)
  const rowsPerPage = 6

  const sortedData = useMemo(() => {
    let filtered = [...data]

    // Filter (search in title or content)
    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.content.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (sortConfig) {
      filtered.sort((a, b) => {
        if (sortConfig.key === "date") {
          return sortConfig.direction === "asc"
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        if (sortConfig.key === "status") {
          const order: Record<string, number> = { 
            "Aktif": 1, 
            "Nonaktif": 2 
          };
          return sortConfig.direction === "asc"
            ? order[a.status] - order[b.status]
            : order[b.status] - order[a.status]
        }
        return 0
      })
    }

    return filtered
  }, [data, sortConfig, search])

  const totalPages = Math.ceil(sortedData.length / rowsPerPage)
  const paginatedData = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const sortData = (key: keyof Cabang) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  useEffect(() => {
  const loadCabang = async () => {
    try {
      const res = await fetch("/api/cabang")
      const json = await res.json()

      const list = Array.isArray(json) ? json : json.data

      const mapped: Cabang[] = (list || []).map((c: any) => ({
        id: c.id,
        title: c.daerah?.nama_daerah ?? "—",
        content: c.alamat,
        date: c.tanggal_dibuka,
        status: c.status,
      }))

      setData(mapped)
    } catch (err) {
      console.error("Gagal load cabang:", err)
      setData([])
    }
  }

  loadCabang()
}, [])

const handleDelete = async (id: number) => {
  const confirmDelete = confirm("Yakin ingin menghapus cabang ini?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/cabang/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Gagal menghapus data");
    }

    // Refresh data setelah delete
    setData((prev) => prev.filter((item) => item.id !== id));
  } catch (error) {
    alert("Terjadi kesalahan saat menghapus cabang");
    console.error(error);
  }
};


  return (
    <div className="space-y-4">
      {/* 🔎 Search bar */}
        <div className="flex justify-between gap-3 mb-5">
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-2 top-2 h-5 w-6" color="gray"/>
                <Input
                type="text"
                placeholder="Search by name or ID"
                className="pl-9 w-64 border-gray-400"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                }}
                />
              </div>
            </div>
            <Button
            onClick={() => router.push("/admin/location/cabang/create")}className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2 ">
              <Plus className="h-4 w-4" />
              Buat cabang baru
            </Button>
        </div>

      <div className="rounded-xl overflow-hidden overflow-y-auto">
        <Table className="">

          <TableHeader className="bg-slate-100 sticky top-0 z-10 rounded-t-md">
            <TableRow className="font-semibold rounded-xl">
              <TableHead>Lokasi</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>
                <Button variant="ghost" className="" onClick={() => sortData("date")}>
                  Tanggal Buka <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => sortData("status")}>
                  Status <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="">
            {paginatedData.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.title}</TableCell>
                <TableCell className="truncate max-w-xs">{item.content}</TableCell>
                <TableCell>
                  {new Date(item.date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="">
                  <span
                    className={`w-20 px-3 py-1 rounded-md text-xs font-medium ${
                      item.status === "Aktif"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="flex gap-2 mt-2">
                  <Pencil
                  className="w-4 h-4 text-orange-500 cursor-pointer"
                  onClick={() => router.push(`/admin/location/cabang/${item.id}/edit`)}
                  />
                  <Trash2
                  className="w-4 h-4 text-red-500 cursor-pointer"
                  onClick={() => handleDelete(item.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 🔹 Pagination control */}
      <div className="absolute w-[160vh] flex items-center justify-between text-sm text-gray-600 bottom-15 left-80">
        <p className="font-regular font-semibold text-black">Total Quiz: {sortedData.length}</p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
