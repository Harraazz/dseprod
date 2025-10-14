"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Lokasi from "@/components/Lokasi";

function Iklan() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "end",
  });

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext(); // geser ke kiri terus
    }, 2500);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="w-full py-20 flex flex-col items-center">
      <div className="text-center max-w-3xl mb-12 px-6">
        <h1 className="text-[40px] font-regular md:text-4xl font-bold mb-4">
          Ingin memulai usaha di bidang pendidikan dengan sistem yang sudah
          terbukti?
        </h1>
        <p className="text-gray-600 text-[20px]">
          PT. Dwi Sarana Edukasi membuka peluang kemitraan bagi Anda yang ingin
          menjalankan pusat belajar di wilayah:
        </p>
      </div>

      {/* Carousel Lokasi */}
      <div ref={emblaRef} className="overflow-hidden w-full">
        <div className="flex">
          <div className="flex-[0_0_33.3333%] px-4">
            <Lokasi gambar={"/DSE Logo 1.png"} footer={"BEKASI"} />
          </div>
          <div className="flex-[0_0_33.3333%] px-4">
            <Lokasi gambar={"/DSE Logo 1.png"} footer={"DEPOK"} />
          </div>
          <div className="flex-[0_0_33.3333%] px-4">
            <Lokasi gambar={"/DSE Logo 1.png"} footer={"SEMARANG"} />
          </div>
          <div className="flex-[0_0_33.3333%] px-4">
            <Lokasi gambar={"/DSE Logo 1.png"} footer={"BANDUNG"} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Iklan;
