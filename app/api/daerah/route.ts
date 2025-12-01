import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import fs from "fs"
import path from "path";
import { prisma } from "@/lib/prisma";

//CREATE DAERAH
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const nama_daerah = formData.get("nama_daerah") as string;
    const status = formData.get("status") as string;
    const gambar = formData.get("gambar") as File | null;

    if (!nama_daerah || !status || !gambar) {
      return NextResponse.json(
        { error: "Nama daerah, status, dan gambar wajib diisi" },
        { status: 400 }
      );
    }

    // save file
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const bytes = await gambar.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + "-" + gambar.name;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const imageUrl = `public/uploads/${fileName}`;
    console.log(imageUrl);
    // save to database
    const daerah = await prisma.daerah.create({
      data: {
        nama_daerah,
        status,
        gambar_url: imageUrl,
      },
    });

    return NextResponse.json({
      message: "Data berhasil disimpan",
      data: daerah,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

// GET DAERAH
export async function GET() {
  try {
    const data = await prisma.daerah.findMany({
      orderBy: { id: "desc" }
    });

    return NextResponse.json({ data }); // 🔥 wrap array dalam object
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

//UPDATE DAERAH
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
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
      where: { id: Number(params.id) }
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
      where: { id: Number(params.id) },
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
