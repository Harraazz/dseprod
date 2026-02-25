import Navbar from "@/components/Navbar";
import Bj from "@/components/Bannerjudul";
import Footer from "@/components/Ftr";

const title = "ENGLISH";
const image = "/banner-english.png";

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
