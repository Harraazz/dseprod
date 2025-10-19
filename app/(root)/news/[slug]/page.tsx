import Image from "next/image";

const newsData = [
  {
    slug: "judul-berita-pertama",
    title: "Title News",
    date: "12 August 2025",
    content1:
      "Lorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur.",
    content2:
      "Lorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur.",
    content3:
      "Lorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur.",
    image1: "/images/news-1.jpg",
    image2: "/images/news-2.jpg",
  },
  {
    slug: "judul-berita-kedua",
    title: "Another News",
    date: "13 August 2025",
    content1:
      "Ini berita kedua. Lorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi magnis non.",
    content2:
      "Konten lanjutan berita kedua. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet.",
    content3:
      "Penutup berita kedua. Gravida pharetra dignissim mi magnis nonLorem ipsum dolor sit amet consectetur.",
    image1: "/images/news-3.jpg",
    image2: "/images/news-4.jpg",
  },
];

export default function NewsDetail({ params }: { params: { slug: string } }) {
  const news = newsData.find((n) => n.slug === params.slug);

  if (!news) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold">News not found</h1>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">
      {/* ====== Judul dan Tanggal ====== */}
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-semibold">{news.title}</h1>
        <p className="text-sm text-gray-500">{news.date}</p>
      </div>

      {/* ====== Paragraf Pembuka ====== */}
      <p className="text-gray-700 leading-relaxed">{news.content1}</p>

      {/* ====== Gambar dan paragraf ====== */}
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <Image
          src={news.image1}
          alt="News Image"
          width={500}
          height={300}
          className="rounded-lg object-cover"
        />
        <p className="text-gray-700 leading-relaxed">{news.content2}</p>
      </div>

      {/* ====== Gambar Lebar Penuh ====== */}
      <div className="w-full">
        <Image
          src={news.image2}
          alt="News Banner"
          width={900}
          height={400}
          className="rounded-lg object-cover w-full"
        />
      </div>

      {/* ====== Paragraf Penutup ====== */}
      <p className="text-gray-700 leading-relaxed">{news.content3}</p>

      {/* ====== Section Berita Lain ====== */}
      <section className="pt-8">
        <h2 className="text-2xl font-semibold mb-6">NEWS</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {newsData
            .filter((n) => n.slug !== params.slug)
            .map((n) => (
              <a
                key={n.slug}
                href={`/news/berita/${n.slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition block"
              >
                <Image
                  src={n.image1}
                  alt={n.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-40"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-base mb-2">{n.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {n.content1}
                  </p>
                </div>
              </a>
            ))}
        </div>
      </section>
    </main>
  );
}
