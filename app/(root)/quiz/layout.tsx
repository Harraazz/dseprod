"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Bj from "@/components/Bannerjudul";
import Footer from "@/components/Ftr";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Navbar />
      <Bj title="Quiz" />
      <div>{children}</div>
      <Footer />
    </>
  );
}
