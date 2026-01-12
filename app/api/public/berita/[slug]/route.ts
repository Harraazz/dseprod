import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, { params }: Params) {
  const { slug } = await params;
  const berita = await prisma.berita.findFirst({
    where: {
      slug: slug,
      status: "Publish",
    },
  });

  if (!berita) {
    return NextResponse.json(
      { message: "Berita tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(berita);
}
