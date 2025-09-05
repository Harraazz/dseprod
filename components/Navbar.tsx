"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between  px-30 py-4 bg-white shadow-xl">
      {/* Kiri: Logo */}
      <div className="text-[20px] font-bold ms-20  text-blue-600">
        <Image 
            className="w-[119px]"
            src='/DSE Logo 1.png'
            alt="logo"
            width={1920}
            height={1080}
        />
      </div>

      {/* Kanan: Navigasi */}
      <ul className="flex space-x-15 text-gray-700 font-medium ">
        <li className="hover:text-blue-500 cursor-pointer ">Home</li>
        <li className="hover:text-blue-500 cursor-pointer ">Program</li>
        <li className="hover:text-blue-500 cursor-pointer ">Quis</li>
        <li className="hover:text-blue-500 cursor-pointer ">News</li>
        <li className="hover:text-blue-500 cursor-pointer ">Location</li>
        <li className="hover:text-blue-500 cursor-pointer mr-30">Partnership</li>
      </ul>
    </nav>
  );
}
