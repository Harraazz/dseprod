"use client";

import React from "react";
import Image from "next/image";
import { Footprints, Lightbulb, GraduationCap, LayoutGrid } from "lucide-react";

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
              src="/BG-2.jpg"
              alt="Belajar di DSE"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* TEXT */}
          <div className="px-2 sm:px-0">
            <p className="text-gray-600 text-[15px] md:text-[18px] text-justify leading-relaxed">
              Matematika bukan sekadar angka dan rumus, tapi cara berpikir
              logis, analitis, dan sistematis. Kemampuan ini penting untuk
              membantu anak memecahkan masalah, memahami pelajaran lain, dan
              melatih ketekunan.
            </p>

            <p className="text-gray-600 text-[15px] md:text-[18px] mt-4 text-justify leading-relaxed">
              Program Matematika DSE dirancang agar anak belajar langkah demi
              langkah dengan pendekatan yang menyenangkan. Menggunakan bahasa
              pengantar Bahasa Indonesia, anak lebih mudah memahami konsep dan
              menerapkannya dalam kehidupan sehari-hari.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== KEUNGGULAN ===================== */}

      <section className="w-full px-6 sm:px-10 md:px-20 lg:px-40 py-16">
        <h2 className="text-[32px] font-bold mb-10 text-gray-900">
          Keunggulan Program Calistung di DSE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
          {[
            {
              title: "Pembelajaran Bertahap",
              color: "#33C4CF",
              text: "Materi disusun secara sistematis sesuai kemampuan anak, memastikan pemahaman yang kuat sebelum lanjut ke tingkat berikutnya.",
              icon: Footprints,
            },
            {
              title: "Fokus pada Pemahaman Konsep",
              color: "#E5484D",
              text: "Anak diajak memahami mengapa dan bagaimana cara kerja matematika, bukan sekadar menghafal rumus.",
              icon: Lightbulb,
            },
            {
              title: "Pengajar Berkualitas",
              color: "#F5B93A",
              text: "Guru berpengalaman dan terlatih mendampingi anak dengan sabar, memastikan proses belajar efektif, menyenangkan, dan penuh dukungan positif.",
              icon: GraduationCap,
            },
            {
              title: "Latihan Menarik",
              color: "#A8C545",
              text: "Soal-soal dan aktivitas dibuat interaktif dan dekat dengan kehidupan sehari-hari, sehingga anak merasa matematika itu seru dan bermanfaat.",
              icon: LayoutGrid,
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
            lg:flex-col
            xl:flex-row
            items-center
            lg:items-center
            xl:items-center
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
                  <p className="text-gray-600 text-[16px]  leading-5">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== SECTION BAWAH ===================== */}
      <section className="w-full px-6 sm:px-10 md:px-20 lg:px-40 py-16 grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-10 items-center ">
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
          <h3 className="text-[25px] md:text-[30px] lg:md:text-[32px]   font-bold mb-4">
            Mau lihat seperti apa serunya belajar {""}
            <span className="text-[#35B5C3]">Bahasa Inggris</span> di DSE?
          </h3>
          <p className="text-gray-600 md:text-2xl text-[20px] mb-4">
            Kami sudah siapkan quiz singkat yang bisa dicoba anak untuk
            merasakan pengalaman belajarnya
          </p>
          <button
            className=" bg-[#35B5C3]
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
            Cobain Quiz Seru Gratis
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
