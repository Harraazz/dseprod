// lib/auth.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize, parse } from "cookie";
import { prisma } from "./prisma"

type User = Awaited<ReturnType<typeof prisma.user.findFirst>>

const JWT_SECRET = process.env.JWT_SECRET || "gcnvwKGGdouxKoCVhDVryOzFXrwhflRd";
const TOKEN_NAME = "token";
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7 // 7 days
};

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signJwt(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (e) {
    return null;
  }
}

export function createTokenCookie(token: string) {
  return serialize(TOKEN_NAME, token, COOKIE_OPTIONS);
}

export function removeTokenCookie() {
  return serialize(TOKEN_NAME, "", { ...COOKIE_OPTIONS, maxAge: 0 });
}

export function parseCookies(cookieHeader?: string) {
  return cookieHeader ? parse(cookieHeader) : {};
}

export function userPayloadFromUser(user: User) {
  return {
    id: user?.id,
    email: user?.email,
    role: user?.role
  };
}
