import React from "react";
import Image from "next/image";
import Link from "next/link";

// Data berita (bisa kamu ambil dari API nanti)
const beritaData = [
  {
    image: "/BG-2.jpg",
    title: "Kegiatan Belajar Seru di DSE",
    description:
      "Lorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis non",
    link: "/berita/kegiatan-belajar-seru",
  },
  {
    image: "/BG-2.jpg",
    title: "Kegiatan Belajar Seru di DSE",
    description:
      "Lorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis non",
    link: "/berita/kegiatan-belajar-seru",
  },
  {
    image: "/BG-2.jpg",
    title: "Kegiatan Belajar Seru di DSE",
    description:
      "Lorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis non",
    link: "/berita/kegiatan-belajar-seru",
  },
  {
    image: "/BG-2.jpg",
    title: "Kegiatan Belajar Seru di DSE",
    description:
      "Lorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis non",
    link: "/berita/kegiatan-belajar-seru",
  },
];

function page() {
  return (
    <section className="container mx-auto px-40 py-12">
      <div className="flex flex-col gap-6">
        {beritaData.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="flex flex-col md:flex-row gap-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition p-4"
          >
            {/* Gambar square */}
            <div className="aspect-[16:9] max-w-[250px] max-h-[150px] w-full overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={500}
                className="object-cover w-100 h-100"
              />
            </div>

            {/* Konten */}
            <div className="flex flex-col justify-between md:w-2/3">
              <div>
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-4">
                  {item.description}
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

export default page;
