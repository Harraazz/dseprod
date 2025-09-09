import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito", // Gunakan nama yang konsisten
  subsets: ["latin"],
  display: "swap", // Tambahkan untuk performance
});

export const metadata: Metadata = {
  title: "Dwi Sarana Edukasi",
  description: "Website resmi Dwi Sarana Edukasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
