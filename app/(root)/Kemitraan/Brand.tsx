import React from "react";
import Image from "next/image";

function Brand() {
  return (
    <div className="mx-auto flex flex-col items-center">
      {/* Bagian Logo */}
      <div className="flex items-center justify-center w-auto gap-6">
        {/* Logo kiri */}
        <div className="flex justify-center">
          <Image
            src="/DSE Logo 1.png"
            alt="Logo 1"
            width={360}
            height={100}
            className="object-contain"
          />
        </div>

        <div className="w-px h-20 bg-[#9E9E9E]" />

        {/* Logo kanan */}
        <div className="flex justify-center">
          <Image
            src="/logo-eyelevel.png"
            alt="Logo 1"
            width={400}
            height={100}
            className="object-contain"
          />
        </div>
      </div>

      {/* Deskripsi */}
      <p className="text-justify text-[18px] md:text-[20px] text-gray-700 text-base leading-relaxed max-w-6xl mt-8">
        PT. Dwi Sarana Edukasi adalah perusahaan pendidikan yang berkomitmen
        menghadirkan layanan belajar berkualitas untuk anak-anak Indonesia. PT.
        Dwi Sarana Edukasi telah terbukti sebagai pioneer dalam industri
        pendidikan Indonesia dengan track record yang solid. Dengan
        menggabungkan program internasional Eye Level dari Korea Selatan dan
        program lokal DSE Edu, kami menawarkan solusi pendidikan komprehensif
        untuk anak usia 3-18 tahun.
      </p>
    </div>
  );
}

export default Brand;
