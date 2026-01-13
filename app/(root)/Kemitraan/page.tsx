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
import {
  BookCheck,
  ToolCase,
  School,
  CircleStar,
  Tv,
  Handshake,
} from "lucide-react";

function Page() {
  const data = [
    {
      title: "English",
      description:
        "Mengembangkan empat aspek literasi (reading, writing, speaking, listening) dan membangun kepercayaan diri ",
      image: "/Bing-01.png",
      color: "#20B9C3",
      link: "/program/english",
    },
    {
      title: "Calistung",
      description:
        "Membantu anak mengenal huruf dan angka sebagai persiapan optimal memasuki pendidikan formal.",
      image: "/calistung-01.png",
      color: "#F3AF32",
      link: "/program/calistung",
    },
    {
      title: "Matematika",
      description:
        "Memperkuat kemampuan dasar matematis dan mengembangkan pola pikir kritis",
      image: "/math.png",
      color: "#D94848",
      link: "/program/matematika",
    },
    {
      title: "Math",
      description:
        "Memperkuat kemampuan dasar matematis dan mengembangkan pola pikir kritis",
      image: "/math.png",
      color: "#9BC24C",
      link: "/program/math",
    },
    {
      title: "DSE Edu",
      description:
        "Program pengembangan internal DSE yang dirancang khusus untuk siswa SMP hingga SMA sebagai solusi dukungan tambahan dalam memahami materi sekolah. DSE Edu menggunakan sistem semi private dengan tiga pilihan kelas: Regular (pembelajaran rutin mingguan), Intensif (untuk kebutuhan akademik padat), dan Weekend (fleksibel untuk siswa sibuk).",
      image: "/dse-edu.png",
      color: "#157A84",
      link: "/program/dse-edu",
    },
  ];

  return (
    <div>
      <Navbar />

      {/* BANNER */}
      <section className="pt-20">
        <Bj title="PARTNERSHIP" />
      </section>

      {/* BRAND */}
      <section className="container mx-auto py-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40">
        <Brand />
      </section>

      {/* BENEFIT */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40">
        <Benefit />
      </section>

      {/* PROGRAM */}
      <section className="container mx-auto py-12 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40">
        <h1 className="text-center font-bold text-3xl md:text-[44px] mb-8">
          Program Kami
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 place-items-center">
          {data.slice(0, 4).map((item, index) => (
            <Cj
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              color={item.color}
              link={item.link}
            />
          ))}
        </div>

        {/* FULL WIDTH CARD */}
        <div className="mt-6 flex justify-center">
          <Cj {...data[4]} />
        </div>
      </section>

      {/* IKLAN */}
      <section>
        <Iklan />
      </section>

      {/* BENEFIT CARD */}
      <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40">
        <h1 className="text-center text-3xl md:text-5xl mb-12 font-bold">
          Apa yang anda dapatkan?
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <Cards
            icon={BookCheck}
            title="Kurikulum Siap Pakai"
            bgColor="#35B5C3"
            iconSize={60}
          />
          <Cards
            icon={ToolCase}
            title="Modul & Teaching Tools"
            bgColor="#F0B343"
            iconSize={60}
          />
          <Cards
            icon={School}
            title="Pelatihan Intensif"
            bgColor="#DA384A"
            iconSize={60}
          />
          <Cards
            icon={CircleStar}
            title="Branding & Promosi"
            bgColor="#35B5C3"
            iconSize={60}
          />
          <Cards
            icon={Tv}
            title="Dukungan Iklan Lokal"
            bgColor="#F0B343"
            iconSize={60}
          />
          <Cards
            icon={Handshake}
            title="Sistem Operasional Mudah"
            bgColor="#DA384A"
            iconSize={60}
          />
        </div>
      </section>

      {/* SYARAT */}
      <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40">
        <Syarat />
      </section>

      {/* WAVE */}
      <Image
        src="/wave.svg"
        alt="Wave"
        width={1920}
        height={300}
        className="w-full h-auto"
      />

      {/* CTA */}
      <section className="bg-[#35B5C3] py-16 px-4 flex justify-center">
        <div className="bg-white rounded-3xl shadow-lg text-center px-8 py-10 max-w-3xl w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Tertarik Bermitra?
          </h2>
          <p className="mb-6">
            Isi formulir berikut, dan tim kami akan segera menghubungi Anda
          </p>
          <button className="bg-[#35B5C3] text-white py-2 px-8 rounded-full hover:bg-[#1da4ae] transition">
            Klik di sini
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Page;
