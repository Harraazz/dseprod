import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const berita = await prisma.berita.findMany({
      where: {
        status: "Publish",
      },
      orderBy: {
        tanggal: "desc",
      },
      select: {
        id: true,
        judul: true,
        isi: true,
        tanggal: true,
        gambar_url: true,
        slug: true,
      },
    });

    return NextResponse.json(berita);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil berita" },
      { status: 500 }
    );
  }
}
