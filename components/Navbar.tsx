"use client";

import { List } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const items = [
  { title: "Beranda", url: "/" },
  { title: "Program", url: "/program" },
  { title: "Kuis", url: "/quiz" },
  { title: "Berita", url: "/news" },
  { title: "Location", url: "/location" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-xl z-50">
      <div className="flex items-center justify-between px-4 md:px-10 lg:px-16 py-4">
        {/* Logo */}
        <Image
          src="/DSE Logo 1.png"
          alt="logo"
          width={1920}
          height={1080}
          className="w-[90px] md:w-[119px]"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          {items.map((i) => (
            <li key={i.title} className="hover:text-blue-500 cursor-pointer">
              <a href={i.url}>{i.title}</a>
            </li>
          ))}
        </ul>

        {/* Hamburger (SELALU ADA, tapi hanya kelihatan di HP) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center"
        >
          <List />
        </button>
      </div>

      {/* Mobile Menu (muncul saat hamburger diklik) */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="px-6 py-4 space-y-4 text-gray-700 font-medium">
          {items.map((i) => (
            <li key={i.title} onClick={() => setOpen(false)}>
              <a href={i.url} className="block hover:text-blue-500">
                {i.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
