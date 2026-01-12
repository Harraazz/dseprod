"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

type Berita = {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
  gambar_url: string | null;
};

export default function DetailBeritaPage() {
  const params = useParams();
  const [berita, setBerita] = useState<Berita | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(params.slug);

  const formatHtml = (html: string) => {
  return html.replace(/<p><\/p>/g, "<p>&nbsp;</p>");
};

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await fetch(
          `${window.location.origin}/api/public/berita/${params.slug}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Berita tidak ditemukan");

        const data = await res.json();
        setBerita(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [params.id]);

  if (loading) {
    return (
      <section className="container mx-auto px-40 py-12 animate-pulse">
        <div className="h-[400px] bg-gray-200 rounded-xl mb-8" />
        <div className="h-6 w-1/2 bg-gray-200 rounded mb-4" />
        <div className="h-4 w-32 bg-gray-200 rounded mb-8" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
      </section>
    );
  }

  if (!berita) return null;

  return (
    <>
      {/* CONTENT */}
      <section className="container mx-auto px-8 md:px-20 lg:px-40 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">
            {berita.judul}
          </h2>

          <p className="text-center text-sm text-gray-500 mb-10">
            {new Date(berita.tanggal).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* GAMBAR BERITA */}
          {berita.gambar_url && (
            <Image
              src={berita.gambar_url}
              alt={berita.judul}
              width={1920}
              height={1080}
              className="object-cover rounded-xl mb-8 mx-auto"
            />
          )}

          {/* ISI BERITA (HTML dari Tiptap) */}
          <article
            className="
                prose 
                prose-lg 
                prose-berita 
                max-w-none
                prose-br:content-['']
                prose-img:my-6
                prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: formatHtml(berita.isi) }}
          />
        </div>
      </section>
    </>
  );
}