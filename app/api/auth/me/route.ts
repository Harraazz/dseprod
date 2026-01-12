// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { parse } from "cookie";
import { verifyJwt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const parsed = parse(cookie);
    const token = parsed.token;
    if (!token) return NextResponse.json({ user: null });

    const payload = verifyJwt(token);
    if (!payload) return NextResponse.json({ user: null });

    const user = await prisma.user.findUnique({ where: { id: Number(payload.id) } });
    if (!user) return NextResponse.json({ user: null });

    return NextResponse.json({ user: { id: user.id, email: user.email, role: user.role, name: user.name } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ user: null });
  }
}
export const runtime = "nodejs"; // pastikan pakai Node.js runtime