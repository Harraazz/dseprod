import { NextResponse } from "next/server";
import fs from "fs"
import path from "path";
import { prisma } from "@/lib/prisma";

//UPDATE DAERAH
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ParamsId  = await params;
    const id = Number(ParamsId.id)
    const formData = await req.formData()

    const nama = formData.get("nama_daerah") as string
    const status = formData.get("status") as string
    const file = formData.get("gambar") as File | null

    if (!nama) {
      return NextResponse.json({ error: "Nama daerah wajib diisi" }, { status: 400 })
    }

    if (!["Aktif", "Nonaktif"].includes(status)) {
      return NextResponse.json({ error: "Status tidak valid" }, { status: 400 })
    }

    // cek data lama
    const oldData = await prisma.daerah.findUnique({
      where: { id: Number(id) }
    })

    if (!oldData) return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 })

    let newFilename = oldData.gambar_url

    // jika user upload file baru → replace
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const uploadDir = path.join(process.cwd(), "public/uploads")

      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

      newFilename = `daerah-${Date.now()}-${file.name}`
      const filePath = path.join(uploadDir, newFilename)

      // simpan file baru
      fs.writeFileSync(filePath, buffer)

      // hapus file lama
      const oldFilePath = path.join(uploadDir, oldData.gambar_url)
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath)
    }

    // update data
    const updated = await prisma.daerah.update({
      where: { id: Number(id) },
      data: {
        nama_daerah : nama,
        status,
        gambar_url: newFilename
      }
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
  }
}

//DELETE DAERAH
export async function DELETE( req : Request ) {
  try {
    const { id } = await req.json()

    const daerah = await prisma.daerah.findUnique({ where: { id } })
    if (!daerah) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 })
    }

    // hapus file fisik

    const filePath = path.join(process.cwd(), daerah.gambar_url)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

    // hapus dari database
    await prisma.daerah.delete({ where: { id } })

    return NextResponse.json({ message: "Daerah berhasil dihapus" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 })
  }
}
