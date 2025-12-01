import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";

export async function GET(req: Request, { params }: any) {
  try {
    const cabang = await prisma.cabang.findUnique({
      where: { id: Number(params.id) },
      include: { daerah: true }
    });

    if (!cabang) {
      return NextResponse.json({ error: "Data cabang tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(cabang);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mengambil data cabang" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: any) {
  try {
    const id = Number(params.id);
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

    const existing = await prisma.cabang.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Cabang tidak ditemukan" }, { status: 404 });
    }

    let uploadedUrl = existing.gambar_url;

    // Jika upload gambar baru
    if (file && file.size > 0) {
      // hapus gambar lama
      if (existing.gambar_url) {
        const oldPath = path.join(process.cwd(), "public", existing.gambar_url.replace("/uploads/", "uploads/"));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      uploadedUrl = `/uploads/${fileName}`;
    }

    const updated = await prisma.cabang.update({
      where: { id },
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

    return NextResponse.json({ message: "Cabang berhasil diperbarui", updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mengupdate cabang" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: any) {
  try {
    const id = Number(params.id);

    const cabang = await prisma.cabang.findUnique({ where: { id } });
    if (!cabang) {
      return NextResponse.json({ error: "Cabang tidak ditemukan" }, { status: 404 });
    }

    // hapus gambar jika ada
    if (cabang.gambar_url) {
      const imgPath = path.join(process.cwd(), "public", cabang.gambar_url);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await prisma.cabang.delete({ where: { id } });

    return NextResponse.json({ message: "Cabang berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal menghapus cabang" }, { status: 500 });
  }
}
