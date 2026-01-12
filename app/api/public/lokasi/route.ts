import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.daerah.findMany({
      where: {
        status: "Aktif",
      },
      orderBy: {
        nama_daerah: "asc",
      },
      include: {
        cabang: {
          where: {
            status: "Aktif",
          },
          orderBy: {
            id: "asc",
          },
          select: {
            id: true,
            alamat: true,
            jam_buka: true,
            jam_tutup: true,
            nomor_kontak: true,
            maps_iframe: true,
          },
        },
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/public/lokasi error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data lokasi" },
      { status: 500 }
    );
  }
}