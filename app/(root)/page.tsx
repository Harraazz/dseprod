import React from "react";
import Navbar from "@/components/Navbar";
import ProbFix from "@/components/Bocil";
import Image from "next/image";
import Cards from "@/components/Kartu";
import { Banner } from "@/components/Banner";
import Lokasi from "@/components/Lokasi";
import Berita from "@/components/Berita";
import Footer from "@/components/Ftr";
import { Button } from "@/components/ui/button";
import { GraduationCap, Shapes, Clock, Blocks } from "lucide-react";

function Home() {

  const lokasiData = [
    { gambar: "/DSE Logo 1.png", footer: "BEKASI" },
    { gambar: "/DSE Logo 1.png", footer: "DEPOK" },
    { gambar: "/DSE Logo 1.png", footer: "SEMARANG" },
    { gambar: "/DSE Logo 1.png", footer: "BANDUNG" },
    { gambar: "/DSE Logo 1.png", footer: "TANGERANG SELATAN" },
  ];

  return (
    <div>
      <Navbar />
      <Banner />
      <ProbFix />
      <div className="grid grid-cols-12">
        <div className=" col-span-8 text-start font-regular">
          <div className="ms-50 mb-40 pr-3  flex flex-col align-middle justify-center ">
            <p className="mt-6 text-[20px]  font-bold">Perkenalkan</p>
            <h1 className="text-[40px] font-extrabold ">Dwi Sarana Edukasi</h1>
            <p className="text-[20px] mr-4">
              Kami percaya setiap anak adalah bintang yang bersinar dengan
              caranya sendiri. Dengan pengalaman 15+ tahun mengelola program
              pendidikan berkualitas internasional, kami telah membantu ribuan
              siswa menemukan potensi terbaiknya.
            </p>
          </div>
        </div>
        <div className="col-span-4 ">
          <Image
            className="object-contain"
            width={295}
            height={263}
            src="/Nulis.png"
            alt="Banner"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center align-middle ">
        <p className="text-center font-extrabold font-regular text-[44px] ms-38 mr-38">
          Kami hadir sebagai solusi belajar yang dipercaya oleh ribuan keluarga.
        </p>

        {/* Card With Icon */}
        <div className="flex flex-col items-center justify-center mt-10 ">
          <div className="grid grid-cols-2 gap-10">
            <Cards
              icon={GraduationCap}
              title="Sistem pembelajaran yang efektif"
              description="Program Eye Level dari Korea yang sudah dipercaya di 20+ negara. Metode yang sama sudah membantu jutaan anak di seluruh dunia, sekarang hadir untuk anak Indonesia."
              bgColor="#35B5C3"
              iColor="#fff"
            />
            <Cards
              icon={Shapes}
              title="Belajar Sesuai Karakter Anak"
              description="Setiap anak punya ritme belajar yang berbeda. Di DSE, anak tidak akan merasa tertekan atau minder karena semua disesuaikan dengan kenyamanan mereka. Belajar jadi lebih santai dan menyenangkan."
              bgColor="#F0B343"
              iColor="#fff"
            />
            <Cards
              icon={Blocks}
              title="Membangun kepercayaan diri anak"
              description="Tidak cuma ngajarin pelajaran, tapi juga membangun mental juara. Anak jadi percaya diri karena bisa menyelesaikan soal step by step. "
              bgColor="#DA384A"
              iColor="#fff"
            />
            <Cards
              icon={Clock}
              title="Waktu belajar yang fleksibel"
              description="DSE menyediakan pilihan jadwal yang bisa disesuaikan dengan kesibukan anak."
              bgColor="#ACC253"
              iColor="#fff"
            />
          </div>
        </div>
        {/* Our Program  */}
        <section className="container mx-auto px-40 py-12">
          <h1 className="text-start font-bold font-regular text-[44px]">
            OUR PROGRAM
          </h1>
          <div className="grid grid-cols-2 gap-6 pt-8">
            {lokasiData.map((item, index) => {
              const isLastOdd =
                lokasiData.length % 2 !== 0 && index === lokasiData.length - 1;

              return (
                <div
                  key={index}
                  className={isLastOdd ? "col-span-2 flex justify-center" : ""}
                >
                  <Lokasi gambar={item.gambar} footer={item.footer} />
                </div>
              );
            })}
          </div>
        </section>
      </div>
      {/* banner awan */}
      <div className="relative w-full mb-10 mt-10">
        <Image
          src="/banner 2.png"
          alt="Banner"
          width={1280}
          height={337}
          className="w-full h-100 object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center p-6  ">
          <p className="text-[60px] font-regular font-extrabold pt-10 text-stroke-solid">
            Ayo uji serunya belajar bareng kami!
          </p>
          <p className="text-[50px] font-extrabold text-center font-regular text-stroke-solid2">
            Ikuti quiz gratis sekarang!
          </p>
          <Button variant="custom2" size={"custom2"} className=" mt-5">
            Pergi ke Quiz
          </Button>
        </div>
      </div>

      {/* News  */}
      <section className="container mx-auto px-40 pt-12 pb-30">
        <h1 className="text-start font-bold font-regular text-[44px]">NEWS</h1>
        <Berita />
      </section>
      <Footer />
    </div>
  );
}
export default Home;