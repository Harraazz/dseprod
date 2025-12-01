import React from "react";
import Navbar from "@/components/Navbar";
import Bj from "@/components/Bannerjudul";
import Footer from "@/components/Ftr";
import Image from "next/image";
import Cj from "@/components/CardPanjang";

function page() {
  const data = [
    {
      title: "English",
      description:
        "Mengembangkan empat aspek literasi (reading, writing, speaking, listening) sambil membangun kepercayaan diri siswa ",
      image: "/Bing-01.png",
      color: "#20B9C3",
    },
    {
      title: "Calistung",
      description:
        "Membantu anak mengenal huruf dan angka sebagai persiapan optimal memasuki pendidikan formal.",
      image: "/calistung-01.png",
      color: "#F3AF32",
    },
    {
      title: "Matematika",
      description:
        "Memperkuat kemampuan dasar matematis dan mengembangkan pola pikir kritis",
      image: "/math.png",
      color: "#D94848",
    },
    {
      title: "Math",
      description:
        "Memperkuat kemampuan dasar matematis dan mengembangkan pola pikir kritis",
      image: "/math.png",
      color: "#9BC24C",
    },
    {
      title: "DSE Edu",
      description:
        "Program pengembangan internal DSE yang dirancang khusus untuk siswa SMP hingga SMA sebagai solusi dukungan tambahan dalam memahami materi sekolah. DSE Edu menggunakan sistem semi private dengan tiga pilihan kelas: Regular (pembelajaran rutin mingguan), Intensif (untuk kebutuhan akademik padat), dan Weekend (fleksibel untuk siswa sibuk).",
      image: "/dse-edu.png",
      color: "#157A84",
    },
  ];

  return (
    <div>
      <Navbar />
      {/* Banner Judul Halaman */}
      <section className="pt-20">
        <Bj title="OUR" subtitle="PROGRAM" />
      </section>
      <section className="container mx-auto px-40 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.slice(0, 4).map((item, index) => (
            <Cj
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              color={item.color}
            />
          ))}
        </div>

        {/* DSE Edu full width */}
        <div className="mt-6">
          <Cj
            title={data[4].title}
            description={data[4].description}
            image={data[4].image}
            color={data[4].color}
          />
        </div>
      </section>
      <section className="pt-20">
        <Footer />
      </section>
    </div>
  );
}

export default page;
