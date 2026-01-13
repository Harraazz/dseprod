"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Lokasi from "@/components/Lokasi";

export default function Iklan() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 2500);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="w-full py-20 flex flex-col items-center">
      {/* TITLE */}
      <div className="text-center max-w-3xl mb-12 px-6">
        <h1 className="text-[25px] md:text-4xl font-bold mb-4">
          Ingin memulai usaha di bidang pendidikan dengan sistem yang sudah
          terbukti?
        </h1>
        <p className="text-gray-600 md:text-[20px] text-[18px]">
          PT. Dwi Sarana Edukasi membuka peluang kemitraan bagi Anda yang ingin
          menjalankan pusat belajar di wilayah:
        </p>
      </div>

      {/* CAROUSEL */}
      <div ref={emblaRef} className="overflow-hidden w-full">
        <div className="flex">
          {["BEKASI", "DEPOK", "SEMARANG", "BANDUNG"].map((kota) => (
            <div
              key={kota}
              className="
                flex-[0_0_100%]
                sm:flex-[0_0_50%]
                lg:flex-[0_0_33.3333%]
                px-4
              "
            >
              <Lokasi gambar="/DSE Logo 1.png" footer={kota} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
