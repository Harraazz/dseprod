"use client";

import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface LokasiProps {
  gambar: string;
  footer: string;
}

export default function Lokasi({ gambar, footer }: LokasiProps) {
  return (
    <Card
      className="
        relative
        w-full
        h-[180px]        /* 📱 HP */
        sm:h-[210px]
        md:h-[235px]    /* 🖥 Desktop */
        overflow-hidden
      "
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={gambar}
          alt={footer}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>

      {/* Footer Gradient */}
      <CardFooter
        className="
          absolute bottom-0 left-0 right-0
          px-4 py-3
          sm:px-5 sm:py-4
          text-white
        "
      >
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        {/* Text */}
        <p
          className="
            relative z-10
            font-bold
            text-[16px]     /* 📱 HP */
            sm:text-[18px]
            md:text-[20px] /* 🖥 Desktop */
            leading-tight
          "
        >
          {footer}
        </p>
      </CardFooter>
    </Card>
  );
}
