"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Cabang = {
  id: number;
  alamat: string;
  jam_buka: string;
  jam_tutup: string;
  nomor_kontak: string;
  maps_iframe: string | null;
};

type Daerah = {
  id: number;
  nama_daerah: string;
  cabang: Cabang[];
};

function getIframeSrc(value: string) {
  if (!value) return "";

  // Jika isinya masih berupa tag iframe
  const match = value.match(/src\s*=\s*"([^"]+)"/i);

  // Kalau ketemu src="", ambil isinya
  if (match && match[1]) {
    return match[1];
  }

  // Kalau sudah berupa URL, kembalikan langsung
  return value;
}

export default function LokasiPage() {
  const [data, setData] = useState<Daerah[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMap, setActiveMap] = useState<string>("");
  const [normalizeMap, setNormalizeMap] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/public/lokasi");
        const json = await res.json();

        setData(json);

        // set default map pertama
        if (json.length && json[0].cabang.length) {
          setActiveMap(getIframeSrc(json[0].cabang[0].maps_iframe || ""));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (activeMap) {
      setNormalizeMap(activeMap.slice(0, -1));
    }
  }, [activeMap]);

  console.log(normalizeMap);

  if (loading) {
    return (
      <section className="container mx-auto px-12 py-12">
        <div className="animate-pulse h-40 bg-gray-200 rounded-lg" />
      </section>
    );
  }

  return (
    <section className="container mx-auto px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Kiri - Accordion */}
      <div>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {data.map((kota, i) => (
            <AccordionItem
              key={kota.id}
              value={`item-${i}`}
              className="border rounded-lg"
            >
              <AccordionTrigger className="text-lg font-semibold bg-gray-50 hover:bg-gray-100 px-4 rounded-t-lg">
                {kota.nama_daerah}
              </AccordionTrigger>
              <AccordionContent className="bg-white p-4 space-y-4 rounded-b-lg">
                {kota.cabang.map((c) => (
                  <div key={c.id} className="border-b pb-3 last:border-none">
                    <h3 className="font-semibold">{kota.nama_daerah}</h3>
                    <p className="text-sm text-gray-600 mt-1">{c.alamat}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Jam Operasional: {c.jam_buka} – {c.jam_tutup}
                    </p>
                    <p className="text-sm text-gray-600">
                      Nomor Kontak: {c.nomor_kontak}
                    </p>
                    {c.maps_iframe && (
                      <button
                        onClick={() => setActiveMap(getIframeSrc(c.maps_iframe as string))}
                        className="mt-2 border border-blue-500 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-50 transition"
                      >
                        Tampilkan Alamat
                      </button>
                    )}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Kanan - Google Maps */}
      <div className="w-full h-[400px] md:h-[500px]">
        {activeMap && (
          <iframe
            src={activeMap}
            className="w-full h-full rounded-lg border"
            allowFullScreen
            loading="lazy"
          ></iframe>
        )}
      </div>
    </section>
  );
}