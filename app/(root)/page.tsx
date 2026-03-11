"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import ProbFix from "@/components/Bocil";
import Image from "next/image";
import Cards from "@/components/Kartu";
import { Banner } from "@/components/Banner";
import Lokasi from "@/components/Lokasi";
import Berita from "@/components/Berita";
import Brand from "@/components/Brand";
import Footer from "@/components/Ftr";
import { Button } from "@/components/ui/button";
import { GraduationCap, Shapes, Clock, Blocks } from "lucide-react";

function Home() {
  const lokasiData = [
    { gambar: "/DSE Logo 1.png", footer: "BEKASI" },
    { gambar: "/DSE Logo 1.png", footer: "DEPOK" },
  ];

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Banner />
      <ProbFix />

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 items-center gap-8">
        <div className="col-span-12 md:col-span-8">
          <div className="col-span-12 md:col-span-7 text-justify md:text-left">
            <p className="mt-6 text-[18px] md:text-[20px] font-bold">
              Perkenalkan
            </p>
            <h1 className="text-[28px] md:text-[40px] font-extrabold">
              Dwi Sarana Edukasi
            </h1>
            <p className="text-[16px] md:text-[20px]">
              Kami percaya setiap anak adalah bintang yang memiliki potensi luar
              biasa. Melalui program pendidikan berkualitas internasional, kami
              membantu setiap siswa menemukan dan mengembangkan kemampuan
              terbaiknya. Kami berkomitmen menciptakan lingkungan belajar yang
              mendukung, inspiratif, dan mendorong setiap anak untuk tumbuh
              menjadi versi terbaik dari dirinya.
            </p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 flex justify-center">
          <Image
            className="object-contain w-[200px] md:w-[295px]"
            width={295}
            height={263}
            src="/Nulis.png"
            alt="Banner"
          />
        </div>
      </section>

      <section>
        <Brand />
      </section>

      {/* ================= VALUE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-center font-bold text-[26px] md:text-[35px]">
          Kami hadir sebagai solusi belajar yang dipercaya oleh ribuan keluarga.
        </p>

        <div className="flex justify-center">
          <div
            className=" grid
                    grid-cols-1
                    xl:grid-cols-2
                    gap-6
                     place-items-center"
          >
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
      </section>

      {/* ================= LOCATION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-[28px] md:text-[40px] font-bold">OUR LOCATION</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 ">
          {lokasiData.map((item, index) => {
            const isLastOdd =
              lokasiData.length % 2 !== 0 && index === lokasiData.length - 1;

            return (
              <div
                key={index}
                className={isLastOdd ? "sm:col-span-2 flex justify-center" : ""}
              >
                <Lokasi gambar={item.gambar} footer={item.footer} />
              </div>
            );
          })}
        </div>
      </section>
      {/* ================= BANNER CTA ================= */}
      <section className="relative w-full my-10">
        <Image
          src="/banner 2.png"
          alt="Banner"
          width={1280}
          height={337}
          className="w-full h-[200px] md:h-[337px] object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <p className="lg:text-[50px] md:text-[30px] font-extrabold text-stroke-solid">
            Ayo uji serunya belajar bareng kami!
          </p>
          <p className="lg:text-[50px] md:text-[30px] font-extrabold text-stroke-solid2">
            Ikuti quiz gratis sekarang!
          </p>
          <Button variant="custom2" size="custom2" className="mt-5">
            Pergi ke Quiz
          </Button>
        </div>
      </section>

      {/* ================= NEWS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-[28px] md:text-[44px] font-bold">NEWS</h1>
        <Berita />
      </section>

      <Footer />
    </div>
  );
}

export default Home;
