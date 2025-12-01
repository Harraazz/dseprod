<<<<<<< HEAD
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

interface Locationprops {
  gambar: string;
  Footer: string;
}
function Lokasi({ gambar, Footer }: Locationprops) {
  return (
    <div>
      <Card className="relative w-[535px] h-[235px] overflow-hidden">
        {/* Gambar sebagai background */}
        <div className="absolute inset-0">
          <Image src={gambar} alt={gambar} fill className="object-cover" />
        </div>

        {/* Overlay untuk meningkatkan keterbacaan teks */}
        {/* <div className="absolute inset-0 bg-black/30"></div> */}

        {/* Konten card - Footer ditempatkan di bagian bawah */}
        <CardFooter className="absolute bottom-0 left-0 right-0 p-5 text-white">
          {/* Gradient hitam transparan dari bawah ke atas */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

          {/* Konten footer */}
          <p className="relative z-10 font-regular font-bold text-2xl">
            {Footer}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Lokasi;
=======
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
>>>>>>> b6d5f1fb73a12db31543a3ab42ee3eff560920f8
