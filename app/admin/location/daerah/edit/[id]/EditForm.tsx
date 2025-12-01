"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useParams } from "next/navigation"

export default function EditForm() {
  const router = useRouter()
  const { id } = useParams()
  const [namaDaerah, setNamaDaerah] = useState("")
  const [status, setStatus] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [oldImage, setOldImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Fetch existing data
  useEffect(() => {
    async function loadData() {
      const res = await fetch(`/api/daerah`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      )
      const json = await res.json()
      
      setNamaDaerah(json.nama_daerah)
      setStatus(json.status)
      setOldImage(json.gambar_url) // simpan gambar lama
    }

    loadData()
  }, [id])

  // generate preview when uploading new file
  useEffect(() => {
    if (!selectedFile) return setPreviewUrl(null)

    const url = URL.createObjectURL(selectedFile)
    setPreviewUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [selectedFile])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append("nama_daerah", namaDaerah)
    formData.append("status", status)

    if (selectedFile) {
      formData.append("gambar", selectedFile) // only send if new file uploaded
    }

    const res = await fetch(`/api/daerah/${id}`, {
      method: "PUT",
      body: formData,
    })

    setLoading(false)

    if (!res.ok) {
      alert("Gagal memperbarui data")
      return
    }

    router.push("/admin/location/daerah")
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="shadow-sm border-none">
        <CardContent className="space-y-4">

          <div className="space-y-2">
            <Label>Nama Daerah</Label>
            <Input
              value={namaDaerah}
              onChange={(e) => setNamaDaerah(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Nonaktif">Nonaktif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Gambar (opsional)</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />

            {/* Preview gambar lama atau gambar baru */}
            <div className="mt-3">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  className="max-w-64 max-h-64 rounded border"
                />
              ) : oldImage ? (
                <img
                  src={`/${oldImage}`}
                  className="max-w-64 max-h-64 rounded border"
                />
              ) : null}
            </div>
          </div>

        </CardContent>
      </Card>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </Button>
    </form>
  )
}
