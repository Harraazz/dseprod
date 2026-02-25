"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Youtube, Facebook } from "lucide-react";

function Ftr() {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Background Blur */}
      <div className="absolute -left-40 top-10 w-[500px] h-[400px] rounded-full bg-[#DA384A8F] blur-3xl opacity-60" />
      <div className="absolute -right-40 top-10 w-[500px] h-[400px] rounded-full bg-[#F0B343BF] blur-3xl opacity-60" />

      <div className="relative z-10 backdrop-blur-md bg-white/40 border-t border-white/20">
        {/* CONTAINER FIX */}
        <div className="max-w-6xl mx-auto px-6 py-14">
          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-black">
            {/* Logo */}
            <div className="space-y-6">
              <Image
                src="/DSE Logo 1.png"
                alt="Logo"
                width={200}
                height={80}
                className="object-contain w-[180px]"
              />

              <div className="flex space-x-4 text-lg">
                <Instagram className="cursor-pointer hover:text-pink-600 transition" />
                <Youtube className="cursor-pointer hover:text-red-600 transition" />
                <Facebook className="cursor-pointer hover:text-blue-600 transition" />
              </div>
            </div>

            {/* Programs */}
            <div>
              <h3 className="font-semibold mb-4 text-base">Programs</h3>
              <ul className="space-y-2 text-sm text-black/80">
                <li>English</li>
                <li>Calistung</li>
                <li>Matematika</li>
                <li>Math</li>
                <li>DSE Edu</li>
              </ul>
            </div>

            {/* Lokasi */}
            <div>
              <h3 className="font-semibold mb-4 text-base">Lokasi</h3>
              <ul className="space-y-2 text-sm text-black/80">
                <li>Bekasi</li>
                <li>Depok</li>
                <li>Bandung</li>
                <li>Semarang</li>
                <li>Tangerang Selatan</li>
              </ul>
            </div>

            {/* Tentang Kami */}
            <div>
              <h3 className="font-semibold mb-4 text-base">Tentang Kami</h3>
              <ul className="space-y-2 text-sm text-black/80">
                <li>Program</li>
                <li>Kuis</li>
                <li>Partnership</li>
                <li>Kontak</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-black/60 py-5 border-t border-white/20">
          © {new Date().getFullYear()} Dwi Sarana Edukasi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Ftr;
