"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Berita = {
  id: string;
  slug: string;
  judul: string;
  isi: string;
  tanggal: string;
  status: string;
  gambar_url: string | null;
};

const stripHtml = (html: string) => {
  if (typeof window === "undefined") return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

function Page() {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await fetch(
          `${window.location.origin}/api/public/berita`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Gagal mengambil data berita");

        const data = await res.json();
        console.log(data);
        // filter hanya berita published
        const published = data

        setBerita(published);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  return (
    <section className="container mx-auto px-40 py-12">
      <div className="flex flex-col gap-6">
        {/* Skeleton Loading */}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row gap-4 bg-white rounded-xl border p-4 animate-pulse"
            >
              <div className="aspect-[16/9] max-w-[250px] max-h-[150px] w-full bg-gray-200 rounded-lg" />
              <div className="flex flex-col gap-3 md:w-2/3">
                <div className="h-5 w-2/3 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
              </div>
            </div>
          ))}

        {/* Data Berita */}
        {!loading &&
          berita.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="flex flex-col md:flex-row gap-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition p-4"
            >
              {/* Gambar */}
              <div className="aspect-[16/9] max-w-[250px] max-h-[150px] w-full overflow-hidden rounded-lg">
              {item.gambar_url ? (
                <Image
                  src={item.gambar_url}
                  alt={item.judul}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
                ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                  <span>Tidak ada gambar</span>
                </div>
              )}
              </div>

              {/* Konten */}
              <div className="flex flex-col justify-between md:w-2/3">
                <div>
                  <h2 className="text-xl font-bold">{item.judul}</h2>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-4">
                    {stripHtml(item.isi)}
                  </p>
                  <p className="text-[#007BFF] text-sm font-semibold mt-2 hover:underline">
                    Baca Selengkapnya →
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}

export default Page;