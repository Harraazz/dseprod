import React from "react";
import Navbar from "@/components/Navbar";
import Bj from "@/components/Bannerjudul";
import Footer from "@/components/Ftr";
import Cj from "@/components/CardPanjang";
import Brand from "@/app/(root)/Kemitraan/Brand";
import Benefit from "@/app/(root)/Kemitraan/Benefit";
import Iklan from "@/app/(root)/Kemitraan/Iklan";
import Cards from "@/app/(root)/Kemitraan/Kartu";
import Syarat from "@/app/(root)/Kemitraan/Syarat";
import Image from "next/image";
import wave from "@/public/wave.svg";
import {
  GraduationCap,
  BookCheck,
  ToolCase,
  School,
  CircleStar,
  Tv,
  Handshake,
} from "lucide-react";

function page() {
  const data = [
    {
      title: "English",
      description:
        "Mengembangkan empat aspek literasi (reading, writing, speaking, listening) sambil membangun kepercayaan diri siswa ",
      image: "/Bing-01.png",
      color: "#20B9C3",
    },
    {
      title: "Calistung",
      description:
        "Membantu anak mengenal huruf dan angka sebagai persiapan optimal memasuki pendidikan formal.",
      image: "/calistung-01.png",
      color: "#F3AF32",
    },
    {
      title: "Matematika",
      description:
        "Memperkuat kemampuan dasar matematis dan mengembangkan pola pikir kritis",
      image: "/math.png",
      color: "#D94848",
    },
    {
      title: "Math",
      description:
        "Memperkuat kemampuan dasar matematis dan mengembangkan pola pikir kritis",
      image: "/math.png",
      color: "#9BC24C",
    },
    {
      title: "DSE Edu",
      description:
        "Program pengembangan internal DSE yang dirancang khusus untuk siswa SMP hingga SMA sebagai solusi dukungan tambahan dalam memahami materi sekolah. DSE Edu menggunakan sistem semi private dengan tiga pilihan kelas: Regular (pembelajaran rutin mingguan), Intensif (untuk kebutuhan akademik padat), dan Weekend (fleksibel untuk siswa sibuk).",
      image: "/dse-edu.png",
      color: "#157A84",
    },
  ];
  return (
    <div>
      <Navbar />
      {/* Banner Judul Halaman */}
      <section className="relative flex items-center justify-center h-[500px]">
        <Bj title="PARTNERSHIP" />
      </section>
      <section className="container py-10 pt-40">
        <Brand />
      </section>
      <section className="px-50">
        <Benefit />
      </section>
      <section className="container mx-auto px-40 py-12">
        <h1 className="text-center font-bold font-regular text-[44px] mb-6">
          Program Kami
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.slice(0, 4).map((item, index) => (
            <Cj
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              color={item.color}
            />
          ))}
        </div>

        {/* DSE Edu full width */}
        <div className="mt-6">
          <Cj
            title={data[4].title}
            description={data[4].description}
            image={data[4].image}
            color={data[4].color}
          />
        </div>
      </section>
      <section>
        <Iklan />
      </section>
      <section className="flex flex-col justify-center w-full ">
        <h1 className="text-center text-5xl mb-10 font-bold font-regular">
          Apa yang anda dapatkan?
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12  w-full mx-auto px-10">
          <Cards
            icon={BookCheck}
            title="Kurikulum Siap Pakai"
            bgColor="#35B5C3"
            iColor="#fff"
            iconSize={60}
          />
          <Cards
            icon={ToolCase}
            title="Modul & teaching tools lengkap"
            bgColor="#F0B343"
            iColor="#fff"
            iconSize={60}
          />
          <Cards
            icon={School}
            title="Pelatihan intensif untuk pengelola dan pengajar"
            bgColor="#DA384A"
            iColor="#fff"
            iconSize={60}
          />
          <Cards
            icon={CircleStar}
            title="Branding & promosi digital dari pusat"
            bgColor="#35B5C3"
            iColor="#fff"
            iconSize={60}
          />
          <Cards
            icon={Tv}
            title="Dukungan kampanye lokal (iklan & materi visual)"
            bgColor="#F0B343"
            iColor="#fff"
            iconSize={60}
          />
          <Cards
            icon={Handshake}
            title="Sistem operasional yang mudah dijalankan"
            bgColor="#DA384A"
            iColor="#fff"
            iconSize={60}
          />
        </div>
      </section>
      <section className="w-full py-16 px-40">
        <Syarat />
      </section>
      <section>
        <Image
          src="/wave.svg"
          alt="Wave"
          width={1920}
          height={300}
          className="w-full h-auto"
        />
      </section>
      <section className="w-full bg-[#35B5C3] pb-10 flex justify-center items-center">
        <div className="bg-white rounded-3xl shadow-lg text-center px-8 py-10 max-w-3xl w-full">
          <h2 className="text-4xl font-bold font-regular mb-2">
            Tertarik Bermitra?
          </h2>
          <p className="text-black font-regular mb-6">
            Isi formulir berikut, dan tim kami akan segera menghubungi Anda
          </p>
          <button className="bg-[#35B5C3] text-white font-semibold py-2 px-6 w-50 rounded-full shadow hover:bg-[#1da4ae] transition-all">
            Klik di sini
          </button>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}

export default page;
