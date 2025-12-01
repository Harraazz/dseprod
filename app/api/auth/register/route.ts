// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signJwt, createTokenCookie, userPayloadFromUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "email & password required" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "email already used" }, { status: 409 });
    }

    const hashed = await hashPassword(password);

    // By default role USER. You can manually seed admin.
    const user = await prisma.user.create({
      data: { name: name ?? null, email, password: hashed }
    });

    const token = signJwt(userPayloadFromUser(user));
    const res = NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } });
    res.headers.set("Set-Cookie", createTokenCookie(token));
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
