import React from "react";
import Image from "next/image";
import { Globe, ShieldCheck, HeartHandshake, TrendingUp } from "lucide-react";

function Benefit() {
  return (
    <div className="flex flex-col lg:flex-row justify-center gap-10 w-full py-20 px-6">
      {/* Bagian Kiri - Gambar */}
      <div className="flex justify-center lg:w-1/2">
        <Image
          src="/Asset 4.png"
          alt="Trophy Image"
          width={506}
          height={491}
          className="object-contain"
        />
      </div>

      {/* Bagian Kanan - Teks */}
      <div className="lg:w-1/2 text-center lg:text-center">
        <h1 className="text-4xl font-bold font-regular mb-10">
          Keunggulan Menjadi Mitra
        </h1>

        <div className="flex gap-6 px-3 py-4 justify-center lg:justify-start">
          <div className="flex items-center">
            <Globe size={70} strokeWidth={1} className="text-[#30A5B1]" />
          </div>
          <div className="flex flex-col max-w-md text-left font-regular">
            <h2 className="text-2xl font-extrabold text-[#30A5B1]">
              Brand Terpercaya
            </h2>
            <p>Eye Level hadir di 20+ negara dengan 100+ cabang di Indonesia</p>
          </div>
        </div>
        <div className="flex gap-6 px-3 py-4 justify-center lg:justify-start">
          <div className="flex items-center">
            <ShieldCheck size={70} strokeWidth={1} className="text-[#DAA33D]" />
          </div>
          <div className="flex flex-col max-w-md text-left font-regular">
            <h2 className="text-2xl font-extrabold text-[#DAA33D]">
              Brand Terpercaya
            </h2>
            <p>Eye Level hadir di 20+ negara dengan 100+ cabang di Indonesia</p>
          </div>
        </div>
        <div className="flex gap-6 px-3 py-4 justify-center lg:justify-start">
          <div className="flex items-center">
            <HeartHandshake
              size={70}
              strokeWidth={1}
              className="text-[#C63343]"
            />
          </div>
          <div className="flex flex-col max-w-md text-left font-regular">
            <h2 className="text-2xl font-extrabold text-[#C63343]">
              Brand Terpercaya
            </h2>
            <p>Eye Level hadir di 20+ negara dengan 100+ cabang di Indonesia</p>
          </div>
        </div>
        <div className="flex gap-6 px-3 py-4 justify-center lg:justify-start">
          <div className="flex items-center">
            <TrendingUp size={70} strokeWidth={1} className="text-[#96AD39]" />
          </div>
          <div className="flex flex-col max-w-md text-left font-regular">
            <h2 className="text-2xl font-extrabold text-[#96AD39]">
              Brand Terpercaya
            </h2>
            <p>Eye Level hadir di 20+ negara dengan 100+ cabang di Indonesia</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefit;
