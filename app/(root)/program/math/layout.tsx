import Navbar from "@/components/Navbar";
import Bj from "@/components/Bannerjudul";
import Footer from "@/components/Ftr";

const title = "MATH";
const image = "/banner-calistung.png";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Bj title={title} imageSrc={image} />
      <div>{children}</div>
      <Footer />
    </>
  );
}
