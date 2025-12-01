"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const lokasiData = [
  {
    nama: "Depok",
    cabang: [
      {
        title: "Depok 1",
        alamat:
          "Jl. Meruyung Raya, RT 01 / RW 03 Rangkapan Jaya Baru, Pancoran Mas, Kota Depok, Jawa Barat – 16434, Ruko No. 3 (di dalam SPBU Parung Bingung)",
        jam: "Senin – Jumat (09.00 – 17.00)",
        kontak: "+62 12345678901",
        maps: "https://www.google.com/maps?q=-6.3903272,106.7684722&output=embed",
      },
      {
        title: "Depok 2",
        alamat:
          "Jl. Meruyung Raya, RT 01 / RW 03 Rangkapan Jaya Baru, Pancoran Mas, Kota Depok, Jawa Barat – 16434, Ruko No. 3 (di dalam SPBU Parung Bingung)",
        jam: "Senin – Jumat (09.00 – 17.00)",
        kontak: "+62 12345678901",
        maps: "https://www.google.com/maps?q=-6.391,106.769&output=embed",
      },
    ],
  },
  {
    nama: "Bekasi",
    cabang: [
      {
        title: "Bekasi 1",
        alamat: "Jl. Raya Bekasi Timur No.45, Kota Bekasi, Jawa Barat – 17113",
        jam: "Senin – Sabtu (08.00 – 17.00)",
        kontak: "+62 81234567890",
        maps: "https://www.google.com/maps?q=-6.238,107.000&output=embed",
      },
    ],
  },
  {
    nama: "Semarang",
    cabang: [
      {
        title: "Semarang 1",
        alamat: "Jl. Pandanaran No.15, Semarang, Jawa Tengah – 50241",
        jam: "Senin – Jumat (09.00 – 17.00)",
        kontak: "+62 81122334455",
        maps: "https://www.google.com/maps?q=-6.983,110.414&output=embed",
      },
    ],
  },
];

export default function LokasiPage() {
  const [activeMap, setActiveMap] = useState(lokasiData[0].cabang[0].maps);

  return (
    <section className="container mx-auto px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Kiri - Accordion */}
      <div>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {lokasiData.map((kota, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border rounded-lg"
            >
              <AccordionTrigger className="text-lg font-semibold bg-gray-50 hover:bg-gray-100 px-4 rounded-t-lg">
                {kota.nama}
              </AccordionTrigger>
              <AccordionContent className="bg-white p-4 space-y-4 rounded-b-lg">
                {kota.cabang.map((c, idx) => (
                  <div key={idx} className="border-b pb-3 last:border-none">
                    <h3 className="font-semibold">{c.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{c.alamat}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Jam Operasional: {c.jam}
                    </p>
                    <p className="text-sm text-gray-600">
                      Nomor Kontak: {c.kontak}
                    </p>
                    <button
                      onClick={() => setActiveMap(c.maps)}
                      className="mt-2 border border-blue-500 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-50 transition"
                    >
                      Tampilkan Alamat
                    </button>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Kanan - Google Maps */}
      <div className="w-full h-[400px] md:h-[500px]">
        <iframe
          src={activeMap}
          className="w-full h-full rounded-lg border"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
