import React from "react";
import Image from "next/image";
import { Instagram, Youtube, Facebook } from "lucide-react";

function Ftr() {
  return (
    <footer className="relative w-full overflow-hidden shadow-[0_1px_50px_rgba(0,0,0,0.2)]">
      {/* Background Blur Kiri */}
      <div className="absolute -left-40 top-20 w-[400px] h-[300px] md:w-[700px] md:h-[400px] rounded-full bg-[#DA384A8F] blur-3xl opacity-70" />

      {/* Background Blur Kanan */}
      <div className="absolute -right-40 top-20 w-[400px] h-[300px] md:w-[700px] md:h-[400px] rounded-full bg-[#F0B343BF] blur-3xl opacity-70" />

      {/* Glass Container */}
      <div className="relative z-10 mx-auto w-full">
        <div className="backdrop-blur-md bg-white/40 border-t border-white/20 rounded-t-2xl shadow-lg">
          {/* Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-4 md:px-10 py-10 text-black">
            {/* Logo & Sosmed */}
            <div className="space-y-4">
              <Image
                src="/DSE Logo 1.png"
                alt="Logo"
                width={1280}
                height={590}
                className="w-[160px] object-contain"
              />
              <div className="flex space-x-5 text-xl">
                <Instagram className="cursor-pointer hover:text-pink-600 transition" />
                <Youtube className="cursor-pointer hover:text-red-600 transition" />
                <Facebook className="cursor-pointer hover:text-blue-600 transition" />
              </div>
            </div>

            {/* Programs */}
            <div>
              <h3 className="font-bold mb-2">Programs</h3>
              <ul className="space-y-1 text-sm">
                <li>English</li>
                <li>Calistung</li>
                <li>Matematika</li>
                <li>Math</li>
                <li>DSE Edu</li>
              </ul>
            </div>

            {/* Lokasi */}
            <div>
              <h3 className="font-bold mb-2">Lokasi</h3>
              <ul className="space-y-1 text-sm">
                <li>Bekasi</li>
                <li>Depok</li>
                <li>Bandung</li>
                <li>Semarang</li>
                <li>Tangerang Selatan</li>
              </ul>
            </div>

            {/* Tentang Kami */}
            <div>
              <h3 className="font-bold mb-2">Tentang Kami</h3>
              <ul className="space-y-1 text-sm">
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
              </ul>
            </div>

            {/* Kontak Kami */}
            <div>
              <h3 className="font-bold mb-2">Kontak Kami</h3>
              <ul className="space-y-1 text-sm">
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-black/70 py-4 border-t border-white/20">
            © {new Date().getFullYear()} Dwi Sarana Edukasi. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Ftr;
