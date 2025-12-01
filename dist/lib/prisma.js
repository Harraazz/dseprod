"use strict";
// // lib/prisma.ts
// import { PrismaClient } from "@prisma/client";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// declare global {
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }
// export const prisma =
//   global.prisma ??
//   new PrismaClient({
//     log: ["query"]
//   });
// if (process.env.NODE_ENV !== "production") global.prisma = prisma;
var client_1 = require("@prisma/client");
var globalForPrisma = globalThis;
var prisma = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : new client_1.PrismaClient({
    log: ["query", "error"],
});
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
