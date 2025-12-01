"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function CreateForm() {
  const router = useRouter()
  const [namaDaerah, setNamaDaerah] = useState("");
  const [status, setStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // generate preview image whenever selectedFile changes
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)

    // cleanup URL object to avoid memory leak
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    formData.append("nama_daerah", namaDaerah);
    formData.append("status", status);
    formData.append("gambar", selectedFile);
    console.log(formData.get("nama_daerah"))
    console.log(formData.get("status"))
    console.log(formData.get("gambar"))
    if (selectedFile) {
      formData.append("gambar", selectedFile)
    }

    const res = await fetch("/api/daerah", {
      method: "POST",
      body: formData,
    })

    setLoading(false)

    if (!res.ok) {
      alert("Gagal menyimpan data")
      return
    }

    router.push("/admin/location/daerah")
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="shadow-sm border-none">
        <CardContent className="space-y-4">
          {/* Nama Daerah */}
          <div className="space-y-2">
            <Label htmlFor="nama_daerah">
              Nama Daerah<span className="text-red-500">*</span>
            </Label>
            <Input id="nama_daerah" name="nama_daerah" placeholder="Masukkan Nama Daerah Cabang" onChange={(e) => setNamaDaerah(e.target.value)} required />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">
              Status<span className="text-red-500">*</span>
            </Label>
            <Select name="status" defaultValue="Nonaktif" onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent >
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Nonaktif" defaultChecked>
                  Nonaktif
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gambar Cover */}
          <div className="space-y-2">
            <Label htmlFor="gambar">
              Gambar Sampul<span className="text-red-500">*</span>
            </Label>
            <Input
              id="gambar"
              name="gambar"
              type="file"
              accept="image/*"
              className="w-full h-14 font-regular text-2xl text-gray-500 text-center items-center justify-center p-3 border-2"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
            
            {/* Live Preview */}
            {previewUrl && (
              <div className="mt-3 flex">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-64 max-h-64 object-cover rounded-md border"
                />
                {selectedFile && (
              <p className="text-sm text-gray-500"></p>
              )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Button Selesai */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className="w-full bg-[#247BA0] hover:bg-[#134658]"
        >
          Selesai
        </Button>
      </div>
    </form>
  )
}
