// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // protect only /admin routes
  if (pathname.startsWith("/admin")) {
    const cookie = req.headers.get("cookie") || "";
    const token = cookie.split(";").map(s=>s.trim()).find(s=>s.startsWith("token="))?.split("=")[1];
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl), console.log("Invalid token 1");
    }

    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", req.url)), console.log("Invalid token 2");
    }

    // require admin role
    if (payload.role !== "ADMIN" || payload.role !== "USER") {
      return NextResponse.redirect(new URL("/login", req.url)), console.log("Invalid role");
    }
  }

  // if (pathname === "/admin/regis") {
  //   const cookie = req.headers.get("cookie") || "";
  //   const token = cookie.split(";").map(s=>s.trim()).find(s=>s.startsWith("token="))?.split("=")[1];
  //   if (!token) {
  //     const loginUrl = new URL("/login", req.url);
  //     return NextResponse.redirect(loginUrl);
  //   }

  //   const payload = verifyJwt(token);
  //   if (!payload) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }

  //   // require admin role
  //   if (payload.role !== "ADMIN") {
  //     return NextResponse.redirect(new URL("/not-found", req.url));
  //   }    
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};