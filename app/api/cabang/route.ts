import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createCabangSchema } from '@/lib/validators/cabang'
import { saveCabangImage } from '@/lib/upload'

export async function GET() {
  try {
    const data = await prisma.cabang.findMany({
      include: {
        daerah: {
          select: {
            id: true,
            nama_daerah: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/cabang error:", err);
    return NextResponse.json(
      { error: "Gagal mengambil data cabang" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    // Ambil file gambar
    const gambar = formData.get('gambar') as File | null

    // Convert FormData → Object
    const rawData = Object.fromEntries(formData.entries())

    // Validasi
    const parsed = createCabangSchema.safeParse(rawData)
    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Validasi gagal', errors: parsed.error.flatten() },
        { status: 400 }
      )
    }

    // Pastikan daerah ada
    const daerah = await prisma.daerah.findUnique({
      where: { id: parsed.data.daerah_id },
    })

    if (!daerah) {
      return NextResponse.json(
        { message: 'Daerah tidak ditemukan' },
        { status: 404 }
      )
    }

    // Upload gambar (jika ada)
    let gambar_url: string | null = null
    if (gambar && gambar.size > 0) {
      gambar_url = await saveCabangImage(gambar)
    }

    // Simpan ke database
    const cabang = await prisma.cabang.create({
      data: {
        daerah_id: parsed.data.daerah_id,
        alamat: parsed.data.alamat,
        maps_iframe: parsed.data.maps_iframe,
        status: parsed.data.status,
        tanggal_dibuka: parsed.data.tanggal_dibuka,
        nama_penanggung: parsed.data.nama_penanggung,
        email_kontak: parsed.data.email_kontak,
        nomor_kontak: parsed.data.nomor_kontak,
        hari_operasional: parsed.data.hari_operasional,
        jam_buka: parsed.data.jam_buka,
        jam_tutup: parsed.data.jam_tutup,
        gambar_url,
      },
    })

    return NextResponse.json(cabang, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
