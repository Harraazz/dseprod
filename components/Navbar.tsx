import Image from "next/image";

const items = [
  {
    title: "Beranda",
    url: "/",
  },
  {
    title: "Program",
    url: "/program",
  },
  {
    title: "Kuis",
    url: "/kuis",
  },
  {
    title: "berita",
    url: "/news",
  },
  {
    title: "Location",
    url: "/location",
  },
  {
    title: "Kemitraan",
    url: "/Kemitraan",
  },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-45 py-4 bg-white shadow-xl z-50">
      {/* Kiri: Logo */}
      <div className="text-[20px] font-bold   text-blue-600">
        <Image
          className="w-[119px]"
          src="/DSE Logo 1.png"
          alt="logo"
          width={1920}
          height={1080}
        />
      </div>

      {/* Kanan: Navigasi */}
      <ul className="flex space-x-15 text-gray-700 font-medium">
        {items.map((i) => (
          <li key={i.title} className="hover:text-blue-500 cursor-pointer">
            <a href={i.url}>{i.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}