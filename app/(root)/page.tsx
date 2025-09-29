import React from "react";
import Navbar from "@/components/Navbar";
import ProbFix from "@/components/Bocil";
import Image from "next/image";
import Cards from "@/components/Kartu";
import Programs from "@/components/Program";
import { Banner } from "@/components/Banner";
import Lokasi from "@/components/Lokasi";
import Berita from "@/components/Berita";
import Cardnews from "@/components/CardNews";
import { Button } from "@/components/ui/button";
import { GraduationCap, Shapes, Clock, Blocks } from "lucide-react";

function Home() {
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

        <div className="flexflex-col justify-center mt-10 items-center">
          <p className="text-start font-bold font-regular text-[44px] ms-36 mr-36">
            OUR PROGRAMS
          </p>
        </div>

        {/* Our Program  */}
        <div className="flex flex-col justify-center mt-10 items-center">
          <div className="grid grid-cols-3 gap-10">
            <Programs Gambar="/Asset 2.png" title="ENGLISH" bgColor="#35B5C3" />
            <Programs
              Gambar="/Asset 3.png"
              title="CALISTUNG"
              bgColor="#FFCD71"
            />
            <Programs
              Gambar="/Asset 1.png"
              title="MATEMATIKA"
              bgColor="#DA384A"
            />
          </div>
        </div>
        <div className="flexflex-col justify-center mt-10 items-center">
          <p className="text-start font-bold font-regular text-[44px] ms-36 mr-36">
            LOCATION
          </p>
        </div>

        {/* Location  */}
        <div className="flex flex-col justify-center mt-10 items-center">
          <div className="grid grid-cols-2 gap-10 [&>*:last-child]:col-span-2 [&>*:last-child]:justify-self-center">
            <Lokasi gambar={"/DSE Logo 1.png"} Footer={"BEKASI"} />
            <Lokasi gambar={"/DSE Logo 1.png"} Footer={"DEPOK"} />
            <Lokasi gambar={"/DSE Logo 1.png"} Footer={"SEMARANG"} />
            <Lokasi gambar={"/DSE Logo 1.png"} Footer={"BANDUNG"} />
            <Lokasi gambar={"/DSE Logo 1.png"} Footer={"TANGERANG SELATAN"} />
          </div>
        </div>
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
      <div className="flexflex-col justify-center mt-10 items-center">
        <p className="text-start font-bold font-regular text-[44px] ms-36 mr-36">
          NEWS
        </p>
      </div>
      {/* News  */}
      <div className="flex flex-col">
        <Berita />
      </div>
    </div>
  );
}

export default Home;
