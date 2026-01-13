import React from "react";
import Image from "next/image";

interface JudulProps {
  title: string;
  subtitle?: string;
}

function Bannerjudul({ title, subtitle }: JudulProps) {
  return (
    <div className="relative w-full h-[260px] sm:h-[320px] md:h-[420px] lg:h-[480px]">
      {/* Background image */}
      <Image
        className="object-cover"
        alt="judul"
        src="/BG-2.jpg"
        fill
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div
        className="
        relative z-10
        flex flex-col
        justify-center
        h-full
        px-4 sm:px-8 md:px-20 lg:px-32
        text-white
        text-center md:text-left
      "
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold">
          {title}
        </h1>

        {subtitle && (
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold">
            {subtitle}
          </h2>
        )}
      </div>
    </div>
  );
}

export default Bannerjudul;
