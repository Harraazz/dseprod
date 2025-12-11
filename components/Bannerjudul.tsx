import React from "react";
import Image from "next/image";

interface JudulProps {
  title: string;
  subtitle?: string;
}

function Bannerjudul({ title, subtitle }: JudulProps) {
  return (
    <div className="relative w-full h-120">
      {/* Background image */}
      <Image
        className="object-cover"
        alt="judul"
        src="/BG-2.jpg"
        fill
        priority
      />

      {/* Overlay transparan */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Konten overlay */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-32 text-white">
        <h1 className="text-[64px] font-regular font-bold">{title}</h1>
        {subtitle && (
          <h2 className="text-[64px] font-regular font-bold">{subtitle}</h2>
        )}
      </div>
    </div>
  );
}

export default Bannerjudul;