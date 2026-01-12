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
      <Bj title="Lokasi" />
      <div>{children}</div>
      <Footer />
    </>
  );
}
