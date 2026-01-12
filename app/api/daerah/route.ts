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