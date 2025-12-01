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
  const path = usePathname();
  const isBeritaPage = path.includes("/news/berita");

  return (
    <>
      <Navbar />
      <Bj title={isBeritaPage ? "Thumbnail News" : "News"} />
      <div>{children}</div>
      <Footer />
    </>
  );
}
