"use client";

import React from "react";
import Image from "next/image";
import { School, Shapes, GraduationCap, Lightbulb } from "lucide-react";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center w-full">
      {/* ===================== SECTION ATAS ===================== */}
      <section className="w-full px-6 md:px-10 lg:px-40 py-16">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
          {/* IMAGE */}
          <div
            className="
                    relative
                    w-full
                    max-w-[505px]
                    h-[200px]
                    md:h-[360px]
                    overflow-hidden
                    shadow-md
                    rounded-2xl
                    mx-auto
                    xl:mx-0
                  "
          >
            <Image
              src="/dseedu.webp"
              alt="Belajar di DSE"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* TEXT */}
          <div className="px-2 sm:px-0">
            <p className="text-gray-600 text-[15px] md:text-[18px] text-justify leading-relaxed">
              Masa SMP dan SMA adalah fase penting dalam perjalanan belajar anak
              — di mana mereka mulai menghadapi pelajaran yang semakin kompleks
              dan tuntutan akademik yang makin tinggi. Banyak siswa merasa
              kewalahan, dan di sinilah DSE Edu hadir sebagai solusi.
            </p>

            <p className="text-gray-600 text-[15px] md:text-[18px] mt-4 text-justify leading-relaxed">
              Program DSE Edu membantu siswa memahami materi sekolah dengan
              lebih mudah, sekaligus membangun kepercayaan diri dalam belajar.
              Dengan sistem kelas semi private, setiap siswa mendapat perhatian
              lebih, bisa bertanya bebas, dan belajar sesuai kebutuhan serta
              gaya belajarnya masing-masing.ss.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== KEUNGGULAN ===================== */}

      <section className="w-full px-6 sm:px-10 md:px-20 lg:px-40 py-16">
        <h2 className="text-[32px] font-bold mb-10 text-gray-900">
          Keunggulan Program DSE Edu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
          {[
            {
              title: "Kelas Semi Private yang Fokus",
              color: "#33C4CF",
              text: " Jumlah siswa dalam tiap kelas dibatasi agar interaksi lebih intens, membuat proses belajar lebih efektif dan personal.",
              icon: School,
            },
            {
              title: "Pengajar Berkualitas & Supportif",
              color: "#F5B93A",
              text: "Guru berpengalaman siap membimbing siswa tidak hanya agar paham materi, tapi juga percaya diri menghadapi tantangan akademik.",
              icon: GraduationCap,
            },
            {
              title: "Pembelajaran Relevan & Terarah",
              color: "#E5484D",
              text: "Materi disesuaikan dengan kurikulum sekolah dan kebutuhan siswa — dari tugas harian, ujian tengah semester, hingga persiapan ujian masuk perguruan tinggi.",
              icon: Lightbulb,
            },
            {
              title: "Pilihan Kelas Fleksibel",
              color: "#A8C545",
              description: "Tersedia tiga pilihan kelas:",
              points: [
                "Regular (belajar rutin mingguan)",
                "Intensif (belajar menjelang ujian)",
                "Weekend (fleksibel untuk siswa dengan jadwal padat)",
              ],
              icon: Shapes,
            },
          ].map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="
            flex
            flex-col
            md:flex-col
            lg:flex-row
            items-center
            lg:items-start
            gap-4
          "
              >
                {/* ICON */}
                <div
                  className="
              w-24 h-24
              rounded-xl
              flex items-center justify-center
              shrink-0
              mx-auto
              lg:mx-0
            "
                  style={{ backgroundColor: item.color }}
                >
                  <Icon size={40} color="white" />
                </div>

                {/* TEXT */}
                <div className="text-center lg:text-center xl:text-start">
                  <h3
                    className="text-2xl font-bold mb-1"
                    style={{ color: item.color }}
                  >
                    {item.title}
                  </h3>
                  <p>{item.description}</p>
                  <p className="text-gray-600 text-[16px]  leading-5">
                    {item.text}
                  </p>
                  <ul>
                    {item.points?.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== SECTION BAWAH ===================== */}
      <section className="w-full px-6 sm:px-10 md:px-20 lg:px-40 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <Image
            src="/Quiz 1.png"
            alt="Belajar anak"
            width={357}
            height={259}
            className="object-contain w-full max-w-[357px]"
          />
        </div>

        <div>
          <h3 className="text-[32px] font-bold mb-4">
            Curious about how fun and endgaging our {""}
            <span className="text-[#ACC253]">Math</span> lesson are?
          </h3>
          <p className="text-gray-600 text-2xl mb-4">
            Try our short quiz and see how exciting learning can be with DSE!
          </p>
          <button
            className=" bg-[#ACC253]
            text-white
            font-bold
            px-6 py-2
            rounded-lg
            shadow
            border-4 border-transparent
            hover:border-[#F0B343]
            transition-all duration-300"
            onClick={() => router.push("/quiz")}
          >
            Try a fun quiz for free!
          </button>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="relative w-full max-w-[1200px] h-[236px] mb-20 rounded-[12px] overflow-hidden px-4">
        <Image
          src="/PROGRAM1.webp"
          alt="Background"
          fill
          className="object-cover -z-10"
          priority
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-[32px] text-[#164C52] font-bold max-w-125">
            Bantu anak kuasai fondasi belajar sejak dini
          </h1>
          <h3 className="mt-1 text-[18px] text-[#164C52] font-medium max-w-125">
            Yuk ngobrol bareng tim DSE
          </h3>
          <button className="mt-4 bg-[#35B5C3] border-4 border-white w-60 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-[#35B5C3] transition">
            Chat Kami Sekarang
          </button>
        </div>
      </section>
    </div>
  );
}
