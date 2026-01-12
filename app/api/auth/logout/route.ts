// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { removeTokenCookie } from "@/lib/auth";

export async function POST( req: Request ) {
  const res = NextResponse.json({ "message": "Logout successful" });
  res.headers.set("Set-Cookie", removeTokenCookie());
  return res;
}
export const runtime = "nodejs"; // pastikan pakai Node.js runtime