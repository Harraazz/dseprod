import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "@/components/Navbar";
import Bj from "@/components/Bannerjudul";
import Footer from "@/components/Ftr";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Bj title="NEWS" />
      <div>{children}</div>
      <Footer />
    </>
  );
}
