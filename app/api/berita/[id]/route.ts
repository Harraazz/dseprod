import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import fs from "fs/promises"
import path from "path"

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/berita")

// GET detail berita
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ParamsId  = await params;
  const id = Number(ParamsId.id)

  const berita = await prisma.berita.findUnique({
    where: { id },
  })

  if (!berita) {
    return NextResponse.json({ message: "Not found" }, { status: 404 })
  }

  return NextResponse.json(berita)
}

// UPDATE berita
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ParamsId  = await params;
  const id = Number(ParamsId.id)
  const formData = await req.formData()

  const judul = formData.get("judul") as string
  const isi = formData.get("isi") as string
  const tanggal = new Date(formData.get("tanggal") as string)
  const status = formData.get("status") as string
  const file = formData.get("gambar") as File | null

  const existing = await prisma.berita.findUnique({ where: { id } })
  if (!existing) {
    return NextResponse.json({ message: "Not found" }, { status: 404 })
  }

  let gambar_url = existing.gambar_url

  if (file && file.size > 0) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true })

    // hapus gambar lama
    if (gambar_url) {
      const oldPath = path.join(process.cwd(), "public", gambar_url)
      try {
        await fs.unlink(oldPath)
      } catch {}
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`
    const filepath = path.join(UPLOAD_DIR, filename)

    await fs.writeFile(filepath, buffer)
    gambar_url = `/uploads/berita/${filename}`
  }

  const berita = await prisma.berita.update({
    where: { id },
    data: {
      judul,
      isi,
      tanggal,
      status,
      gambar_url,
    },
  })

  return NextResponse.json(berita)
}

// DELETE berita
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ParamsId  = await params;
  const id = Number(ParamsId.id)

  const berita = await prisma.berita.findUnique({ where: { id } })
  if (!berita) {
    return NextResponse.json({ message: "Not found" }, { status: 404 })
  }

  if (berita.gambar_url) {
    const filePath = path.join(process.cwd(), "public", berita.gambar_url)
    try {
      await fs.unlink(filePath)
    } catch {}
  }

  await prisma.berita.delete({
    where: { id },
  })

  return NextResponse.json({ success: true })
}