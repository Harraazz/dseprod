import React from "react";
import Image from "next/image";

function Brand() {
  return (
    <div className="mx-auto flex flex-col items-center px-4 mt-4">
      {/* Bagian Logo */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
        {/* Logo kiri */}
        <div className="flex justify-center w-full md:w-auto">
          <Image
            src="/DSE Logo 1.png"
            alt="Logo DSE"
            width={360}
            height={100}
            className="object-contain w-[300px] md:w-[320px] lg:w-[360px] h-auto"
          />
        </div>

        {/* Logo kanan */}
        <div className="flex justify-center w-full md:w-auto">
          <Image
            src="/logo-eyelevel.png"
            alt="Logo Eye Level"
            width={400}
            height={100}
            className="object-contain w-[300px] md:w-[320px] lg:w-[400px] h-auto"
          />
        </div>
      </div>

      {/* Deskripsi */}
      <p className="text-justify text-[14px] md:text-[18px] lg:text-[25px] text-gray-700 leading-relaxed max-w-md md:max-w-2xl lg:max-w-6xl mt-8">
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
