import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { writeFile } from "fs/promises"
import path from "path"

export async function GET() {
  try {
    const data = await prisma.berita.findMany({
      orderBy: { created_at: "desc" },
    })
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ message: "Gagal mengambil data" }, { status: 500 })
  }
}

const createSlug = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Ganti semua karakter non-alfanumerik dengan "-"
    .replace(/(^-|-$)+/g, "");    // Hapus tanda "-" di awal atau akhir

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const judul = formData.get("judul") as string;
    const isi = formData.get("isi") as string;
    const tanggalValue = formData.get("tanggal");
    const tanggal = tanggalValue ? new Date(tanggalValue as string) : new Date();
    const status = formData.get("status") as string;
    const gambar = formData.get("gambar") as File | null;

    let gambar_url: string | null = null;

    if (gambar && gambar.size > 0) { // Tambahkan cek size agar lebih aman
      const bytes = await gambar.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${gambar.name.replace(/\s/g, "")}`;
      const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

      await writeFile(uploadPath, buffer);
      gambar_url = `/uploads/${fileName}`;
    }

    const berita = await prisma.berita.create({
      data: {
        judul,
        isi,
        tanggal,
        status,
        gambar_url,
        // TAMBAHKAN INI:
        slug: `${createSlug(judul)}-${Date.now().toString().slice(-4)}`, // Ditambah suffix agar unik
      },
    });

    return NextResponse.json(berita, { status: 201 });
  } catch (err) {
    console.error("Error creating berita:", err);
    return NextResponse.json(
      { message: "Gagal menyimpan berita" },
      { status: 500 }
    );
  }
}