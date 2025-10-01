import React from "react";
import Image from "next/image";
import { Instagram, Youtube, Facebook } from "lucide-react";

function Ftr() {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Background oval kiri */}
      <div className="absolute left-10 top-30 w-[700px] h-[400px] rounded-[50%] bg-[#DA384A8F] blur-3xl opacity-70"></div>
      {/* Background oval kanan */}
      <div className="absolute right-10 top-30 w-[700px] h-[400px] rounded-[50%] bg-[#F0B343BF] blur-3xl opacity-70"></div>

      {/* Glass effect container */}
      <div className="relative z-10 mx-auto w-full">
        <div className="backdrop-blur-md bg-white/40 border-t border-white/20 rounded-t-2xl shadow-lg">
          <div className="flex justify-center gap-10 p-10 text-black">
            {/* Logo & Sosmed */}
            <div className="col-span-1 space-y-3">
              <Image
                className="object-contain w-50"
                width={1280}
                height={590}
                src="/DSE Logo 1.png"
                alt="Banner"
              />
              <div className="flex space-x-5 text-xl">
                <i className="fab fa-instagram">
                  <Instagram />
                </i>
                <i className="fab fa-youtube">
                  <Youtube />
                </i>
                <i className="fab fa-facebook">
                  <Facebook />
                </i>
              </div>
            </div>

            {/* Programs */}
            <div>
              <h3 className="font-bold">Programs</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>English</li>
                <li>Calistung</li>
                <li>Matematika</li>
                <li>Math</li>
                <li>DSE Edu</li>
              </ul>
            </div>

            {/* Lokasi */}
            <div>
              <h3 className="font-bold">Lokasi</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Bekasi</li>
                <li>Depok</li>
                <li>Bandung</li>
                <li>Semarang</li>
                <li>Tangerang Selatan</li>
              </ul>
            </div>

            {/* Tentang Kami */}
            <div>
              <h3 className="font-bold">Tentang Kami</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
              </ul>
            </div>

            {/* Kontak Kami */}
            <div>
              <h3 className="font-bold">Kontak Kami</h3>
              <ul className="mt-2 space-y-1 text-sm">
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
