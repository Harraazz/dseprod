import React from "react";
import Image from "next/image";

function Syarat() {
  return (
    <div>
      <h2 className="text-center text-4xl font-regular font-bold mb-10">
        Syarat Utama Bermitra
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-4 items-stretch px-4 sm:px-8">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-8 duration-300 overflow-hidden w-full ">
          <Image
            src="/DSE Logo 1.png" // ganti sesuai path gambar kamu
            alt="Lokasi Belajar"
            width={467}
            height={250}
            className="w-full object-cover"
          />
          <div className="pt-10 text-center">
            <p className="text-gray-700 wrap-break-words text-2xl font-regular whitespace-normal">
              Memiliki lokasi yang siap digunakan sebagai pusat belajar
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-8 duration-300 overflow-hidden w-full">
          <Image
            src="/DSE Logo 1.png" // ganti sesuai path gambar kamu
            alt="Minat Pendidikan"
            width={467}
            height={250}
            className="w-full object-cover"
          />
          <div className="pt-10 text-center">
            <p className="text-gray-700 wrap-break-words text-2xl font-regular whitespace-normal">
              Memiliki minat dan komitmen di bidang pendidikan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Syarat;
