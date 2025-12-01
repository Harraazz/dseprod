import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    const data = await prisma.cabang.findMany({
      orderBy: { id: "desc" },
      include: { daerah: true }, // relasi
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal mengambil data cabang" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const daerah_id = Number(form.get("daerah_id"));
    const alamat = form.get("alamat") as string;
    const maps_iframe = form.get("maps_iframe") as string | null;
    const status = form.get("status") as string;
    const tanggal_dibuka = new Date(String(form.get("tanggal_dibuka")));
    const nama_penanggung = form.get("nama_penanggung") as string;
    const email_kontak = form.get("email_kontak") as string;
    const nomor_kontak = form.get("nomor_kontak") as string;
    const hari_operasional = form.get("hari_operasional") as string | null;
    const jam_buka = form.get("jam_buka") as string;
    const jam_tutup = form.get("jam_tutup") as string;

    const file = form.get("gambar") as File | null;

    let uploadedUrl: string | null = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      uploadedUrl = `/uploads/${fileName}`;
    }

    const cabang = await prisma.cabang.create({
      data: {
        daerah_id,
        alamat,
        maps_iframe,
        status,
        tanggal_dibuka,
        nama_penanggung,
        email_kontak,
        nomor_kontak,
        hari_operasional,
        jam_buka,
        jam_tutup,
        gambar_url: uploadedUrl,
      },
    });

    return NextResponse.json({ message: "Cabang berhasil dibuat", cabang });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal membuat cabang" }, { status: 500 });
  }
}
