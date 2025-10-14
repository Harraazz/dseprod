"use client";

import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface LokasiProps {
  gambar: string;
  footer: string;
}

export default function Lokasi({ gambar, footer }: LokasiProps) {
  return (
    <Card className="relative w-full h-[235px] overflow-hidden">
      {/* Background Gambar */}
      <div className="absolute inset-0">
        <Image src={gambar} alt={footer} fill className="object-cover" />
      </div>

      {/* Footer dengan Gradient */}
      <CardFooter className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <p className="relative z-10 font-bold text-2xl">{footer}</p>
      </CardFooter>
    </Card>
  );
}
