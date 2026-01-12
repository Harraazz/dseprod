"use client"
import React, { useState, useMemo } from "react"
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

import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

type Daerah = {
  id: number
  nama_daerah: string
  status: string
}

export default function LocationDaerahTable() {
  const router = useRouter();
  const [data, setData] = useState<Daerah[]>([])
  const [search, setSearch] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: keyof Daerah; direction: "asc" | "desc" }>({
  key: "status",
  direction: "desc",
})
  const [page, setPage] = useState(1)
  const rowsPerPage = 6

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/daerah");
        const dataset = await res.json();

        console.log("Narik data:", dataset);

        if (Array.isArray(dataset.data)) {
          setData(dataset.data);
          console.log("✅ Data loaded:", dataset.data);
        } else {
          console.error("🚨 Data bukan array:", dataset.data);
          setData([]);
        }
      } catch (err) {
        console.error("❌ Failed to load daerah:", err);
        setData([]);
      }
    }

    loadData();
  }, []);
  console.log(data)

  const sortedData = useMemo(() => {
    let filtered = [...data]

    // Filter (search in title or content)
    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.nama_daerah.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (sortConfig) {
      filtered.sort((a, b) => {
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

  const sortData = (key: keyof Daerah) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const handleDelete = async (id: number) => {
    try {
      console.log("⏳ Deleting daerah with ID:", id)
      const res = await fetch(`/api/daerah`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        console.log("✅ Deleted daerah with ID:", id)
        setData(data.filter((item) => item.id !== id))
      } else {
        console.error("Failed to delete daerah")
      }
    } catch (err) {
      console.error("Failed to delete daerah", err)
      }
  }

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
            onClick={() => router.push("/admin/location/daerah/create")}className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2 ">
              <Plus className="h-4 w-4" />
              Buat daerah baru
            </Button>
        </div>

      <div className="rounded-xl overflow-hidden overflow-y-auto">
        <Table className="">

          <TableHeader className="bg-slate-100 sticky top-0 z-10 rounded-t-md">
            <TableRow className="font-semibold rounded-xl">
              <TableHead>Lokasi</TableHead>
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
                <TableCell>{item.nama_daerah}</TableCell>
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
                  onClick={() => router.push(`/admin/location/daerah/edit/${item.id}`)}
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
        <p className="font-regular font-semibold text-black">Total Daerah: {sortedData.length}</p>
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
