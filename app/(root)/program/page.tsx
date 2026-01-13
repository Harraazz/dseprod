import React from "react";
import Navbar from "@/components/Navbar";
import Bj from "@/components/Bannerjudul";
import Footer from "@/components/Ftr";
import Cj from "@/components/CardPanjang";

function page() {
  const data = [
    {
      title: "English",
      description:
        "Mengembangkan empat aspek literasi (reading, writing, speaking, listening) dan membangun kepercayaan diri ",
      image: "/Bing-01.png",
      color: "#20B9C3",
      link: "/program/english",
    },
    {
      title: "Calistung",
      description:
        "Membantu anak mengenal huruf dan angka sebagai persiapan optimal memasuki pendidikan formal.",
      image: "/calistung-01.png",
      color: "#F3AF32",
      link: "/program/calistung",
    },
    {
      title: "Matematika",
      description:
        "Memperkuat kemampuan dasar matematis dan mengembangkan pola pikir kritis",
      image: "/math.png",
      color: "#D94848",
      link: "/program/matematika",
    },
    {
      title: "Math",
      description:
        "Memperkuat kemampuan dasar matematis dan mengembangkan pola pikir kritis",
      image: "/math.png",
      color: "#9BC24C",
      link: "/program/math",
    },
    {
      title: "DSE Edu",
      description:
        "Program pengembangan internal DSE yang dirancang khusus untuk siswa SMP hingga SMA sebagai solusi dukungan tambahan dalam memahami materi sekolah. DSE Edu menggunakan sistem semi private dengan tiga pilihan kelas: Regular (pembelajaran rutin mingguan), Intensif (untuk kebutuhan akademik padat), dan Weekend (fleksibel untuk siswa sibuk).",
      image: "/dse-edu.png",
      color: "#157A84",
      link: "/program/dse-edu",
    },
  ];

  return (
    <div>
      <Navbar />

      {/* Banner */}
      <section className="pt-20">
        <Bj title="OUR" subtitle="PROGRAM" />
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-12">
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            place-items-center
          "
        >
          {data.slice(0, 4).map((item, index) => (
            <Cj
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              color={item.color}
              link={item.link}
            />
          ))}
        </div>

        {/* DSE Edu */}
        <div className="mt-6 flex justify-center">
          <Cj
            title={data[4].title}
            description={data[4].description}
            image={data[4].image}
            color={data[4].color}
            link={data[4].link}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default page;
