import Navbar from "@/components/Navbar";
import Bj from "@/components/Bannerjudul";
import Footer from "@/components/Ftr";

const title = "CALISTUNG";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Bj title={title} imageSrc="/banner-calistung.png" />
      <div>{children}</div>
      <Footer />
    </>
  );
}
