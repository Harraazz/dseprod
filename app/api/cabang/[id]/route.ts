// app/api/cabang/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
  const ParamsId  = await params;
  const id = Number(ParamsId.id)

    const cabang = await prisma.cabang.findUnique({
      where: { id },
      include: {
        daerah: {
          select: { id: true, nama_daerah: true },
        },
      },
    });

    if (!cabang) {
      return NextResponse.json({ error: "Cabang tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(cabang);
  } catch (err) {
    console.error("GET /api/cabang/[id] error:", err);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
  const ParamsId  = await params;
  const id = Number(ParamsId.id)
    const formData = await req.formData();

    const daerah_id = Number(formData.get("daerah_id"));
    const alamat = String(formData.get("alamat"));
    const maps_iframe = String(formData.get("maps_iframe") || "");
    const status = String(formData.get("status"));
    const tanggal_dibuka = new Date(String(formData.get("tanggal_dibuka")));
    const nama_penanggung = String(formData.get("nama_penanggung"));
    const email_kontak = String(formData.get("email_kontak"));
    const nomor_kontak = String(formData.get("nomor_kontak"));
    const hari_operasional = String(formData.get("hari_operasional") || "[]");
    const jam_buka = String(formData.get("jam_buka"));
    const jam_tutup = String(formData.get("jam_tutup"));

    const file = formData.get("gambar") as File | null;

    // ambil data lama
    const old = await prisma.cabang.findUnique({ where: { id } });
    if (!old) {
      return NextResponse.json({ error: "Cabang tidak ditemukan" }, { status: 404 });
    }

    let gambar_url = old.gambar_url;

    // jika upload gambar baru
    if (file && file instanceof File) {
      const bytes = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name);
      const filename = `${Date.now()}${ext}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      const filepath = path.join(uploadDir, filename);

      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(filepath, bytes);

      // hapus file lama
      if (old.gambar_url) {
        const oldPath = path.join(process.cwd(), "public", old.gambar_url);
        fs.unlink(oldPath).catch(() => {});
      }

      gambar_url = `/uploads/${filename}`;
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
        gambar_url,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/cabang/[id] error:", err);
    return NextResponse.json(
      { error: "Gagal update cabang" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
  const ParamsId  = await params;
  const id = Number(ParamsId.id)

    const cabang = await prisma.cabang.findUnique({
      where: { id },
    });

    if (!cabang) {
      return NextResponse.json(
        { error: "Cabang tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hapus file gambar jika ada
    if (cabang.gambar_url) {
      const filePath = path.join(
        process.cwd(),
        "public",
        cabang.gambar_url
      );

      // Abaikan error jika file tidak ada
      await fs.unlink(filePath).catch(() => {});
    }

    await prisma.cabang.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Cabang berhasil dihapus" });
  } catch (err) {
    console.error("DELETE /api/cabang/[id] error:", err);
    return NextResponse.json(
      { error: "Gagal menghapus cabang" },
      { status: 500 }
    );
  }
}