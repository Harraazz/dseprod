"use client"

import React, { useState, useMemo, useEffect } from "react"
import { ArrowUpDown, Search, Eye, Pencil, Trash2, Plus } from "lucide-react"
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

type News = {
  id: number
  title: string
  content: string
  date: string
  status: "Publish" | "Draft"
}

export default function NewsTable() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<News[]>([])
  const [search, setSearch] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof News
    direction: "asc" | "desc"
  }>({
    key: "date",
    direction: "desc",
  })
  const [page, setPage] = useState(1)
  const rowsPerPage = 6

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/berita")
      const json = await res.json()

      const mapped: News[] = json.map((item: any) => ({
        id: item.id,
        title: item.judul,
        content: item.isi.replace(/<[^>]+>/g, "").slice(0, 100),
        date: item.tanggal,
        status: item.status === "Publish" ? "Publish" : "Draft",
      }))

      setData(mapped)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [])

  const sortedData = useMemo(() => {
    let filtered = [...data]

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
  const paginatedData = sortedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  )

  const sortData = (key: keyof News) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="space-y-4 font-regular">
      {/* 🔎 Search bar */}
      <div className="flex justify-between gap-3 mb-5">
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-2 top-2 h-5 w-6" color="gray" />
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
          className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2"
          onClick={() => router.push("/admin/news/create")}
        >
          <Plus className="h-4 w-4" />
          Buat berita baru
        </Button>
      </div>

      <div className="rounded-xl overflow-hidden overflow-y-auto">
        <Table>
          <TableHeader className="bg-slate-100 sticky top-0 z-10 rounded-t-md">
            <TableRow className="font-semibold rounded-xl">
              <TableHead>Judul Berita</TableHead>
              <TableHead>Isi Berita</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => sortData("date")}>
                  Tanggal Berita <ArrowUpDown className="ml-2 h-4 w-4" />
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
          <TableBody>
            {loading
              ? Array.from({ length: rowsPerPage }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-6 w-20 bg-slate-200 rounded-md animate-pulse" />
                    </TableCell>
                    <TableCell className="flex gap-2 items-center mt-2">
                      <div className="h-4 w-4 bg-slate-200 rounded animate-pulse" />
                      <div className="h-4 w-4 bg-slate-200 rounded animate-pulse" />
                      <div className="h-4 w-4 bg-slate-200 rounded animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))
              : paginatedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell className="truncate max-w-xs">
                      {item.content}
                    </TableCell>
                    <TableCell>
                      {new Date(item.date).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`w-20 px-3 py-1 rounded-md text-xs font-semibold ${
                          item.status === "Publish"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-2 items-center mt-2">
                      <Eye className="w-4 h-4 text-blue-500 cursor-pointer" />
                      <Pencil
                      className="w-4 h-4 text-orange-500 cursor-pointer"
                      onClick={() => router.push(`/admin/news/${item.id}/edit`)}/>
                      <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination tetap sama */}
      <div className="absolute w-[160vh] flex items-center justify-between text-sm text-gray-600 bottom-15 left-80">
        <p className="font-regular font-semibold text-black">
          Total Berita: {sortedData.length}
        </p>
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
