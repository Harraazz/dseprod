"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      {/* Bagian Atas */}
      <section className="px-40 py-16">
        <div className="grid grid-cols-2 items-center">
          {/* Gambar kiri */}
          <div className="w-full max-w-[505px] max-h-[308px] overflow-hidden shadow-md rounded-2xl">
            <Image
              src="/BG-2.jpg"
              alt="Belajar di DSE"
              width={505}
              height={380}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Teks kanan */}
          <div>
            <p className="text-gray-600 text-[20px] text-justify leading-relaxed">
              Kemampuan membaca, menulis, dan berhitung adalah fondasi utama
              bagi anak untuk siap masuk sekolah dan mengikuti pelajaran dengan
              percaya diri. Saat dasar ini kuat, anak lebih mudah memahami
              materi baru, lebih fokus, dan tidak cepat merasa tertinggal di
              kelas.Program Calistung DSE hadir untuk mendampingi anak usia dini
              agar menguasai keterampilan dasar ini sejak awal. Dengan metode
              belajar yang menyenangkan dan bertahap, anak tidak hanya bisa
              baca-tulis-hitung, tapi juga menikmati proses belajar dan tumbuh
              rasa percaya diri mereka.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Kotak keunggulan */}
      <section className="px-40 py-16 ">
        <h2 className="text-[32px] font-bold font-regular mb-10 text-gray-900">
          Keunggulan Program Calistung di DSE
        </h2>

        <div className="grid grid-cols-2 gap-y-10 gap-x-12">
          {/* 1 */}
          <div className="flex items-start justify-center gap-4">
            <div className="w-25 h-25 bg-[#33C4CF] rounded-xl flex-shrink-0"></div>
            <div>
              <h3 className="text-[#33C4CF] text-2xl t font-bold font-regular mb-1  ">
                Metode Bertahap & Personal
              </h3>
              <p className="text-gray-600 text-[16px] font-regular leading-5">
                Anak belajar sesuai level kemampuannya. Setiap tahap dirancang
                untuk menumbuhkan rasa percaya diri dan semangat belajar.
              </p>
            </div>
          </div>

          {/* 2 */}
          <div className="flex items-start gap-4">
            <div className="w-25 h-25 bg-[#E5484D] rounded-xl flex-shrink-0"></div>
            <div>
              <h3 className="text-[#E5484D] text-2xl t font-bold font-regular mb-1">
                Belajar Lewat Aktivitas Seru
              </h3>
              <p className="text-gray-600 text-[16px] font-regular leading-5">
                Materi disajikan lewat permainan dan kegiatan interaktif agar
                anak belajar sambil bersenang-senang, tanpa merasa bosan.
              </p>
            </div>
          </div>

          {/* 3 */}
          <div className="flex items-start gap-4">
            <div className="w-25 h-25 bg-[#F5B93A] rounded-xl flex-shrink-0"></div>
            <div>
              <h3 className="text-[#F5B93A] text-2xl t font-bold font-regular mb-1">
                Pengajar Berkualitas
              </h3>
              <p className="text-gray-600 text-[16px] font-regular leading-5">
                Guru berpengalaman dan terlatih dalam pendidikan anak,
                mendampingi dengan sabar dan penuh perhatian agar proses belajar
                tetap efektif dan menyenangkan.
              </p>
            </div>
          </div>

          {/* 4 */}
          <div className="flex items-start gap-4">
            <div className="w-25 h-25 bg-[#A8C545] rounded-xl flex-shrink-0"></div>
            <div>
              <h3 className="text-[#A8C545] text-2xl font-bold font-regular mb-1">
                Lingkungan Belajar Nyaman
              </h3>
              <p className="text-gray-600 text-[16px] font-regular leading-5">
                Kelas dirancang aman, menyenangkan, dan penuh warna agar anak
                betah dan merasa nyaman saat belajar.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* LAYOUT BAWAH */}
      <section className="px-40 py-16 grid grid-cols-2 gap-10 items-center">
        <div className="container flex items-center justify-center">
          <Image
            src="/Quiz 1.png"
            alt="Belajar anak"
            width={357}
            height={259}
            className="object-contain w-100"
          />
        </div>
        <div>
          <h3 className="text-[32px] font-bold font-regular mb-4">
            Mau lihat seperti apa serunya belajar di Calistung DSE?
          </h3>
          <p className="text-gray-600 text-2xl font-regular mb-4 ">
            Kami sudah siapkan quiz singkat yang bisa dicoba anak untuk
            merasakan pengalaman belajarnya
          </p>
          <button className="bg-red-500 text-white font-regular font-bold px-6 py-2 rounded-lg shadow hover:bg-red-600 transition"
          onClick={() => router.push("/quiz")}
          >
            Cobain Quiz Seru Gratis
          </button>
        </div>
      </section>

      {/* CTA Bawah */}
      <section className="relative w-[1200px] h-[236px] mb-20 rounded-[12px] overflow-hidden ">
        <Image
          src="/PROGRAM1.webp"
          alt="Background"
          fill
          className="absolute object-cover rounded-[12px] -z-10"
          priority
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="m-0 text-[32px] text-[#164C52] font-bold leading-tight max-w-[500px]">
            Bantu anak kuasai fondasi belajar sejak dini
          </h1>
          <h3 className="m-0 mt-1 text-[18px] text-[#164C52] font-medium leading-tight max-w-[500px]">
            Yuk ngobrol bareng tim DSE
          </h3>
          <button className="mt-4 bg-[#35B5C3] border-4 border-white w-60 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-white hover:text-[#35B5C3] transition hover:border-[#35B5C3]">
            Chat Kami Sekarang
          </button>
        </div>
      </section>
    </div>
  );
}
