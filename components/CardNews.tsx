import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface ProgramProps {
  Gambar: string;
  title: string;
  description: string;
  bgColor?: string;
}

function CardNews({
  Gambar,
  title,
  description,
  bgColor = "#fff",
}: ProgramProps) {
  return (
    <Card
      className="w-[300px] h-[370px] flex flex-col"
      style={{ backgroundColor: bgColor }}
    >
      {/* Gambar */}
      <CardContent className="flex justify-center items-center">
        <div className="w-[250px] h-[150px] bg-white rounded-[8px] border-2 flex justify-center items-center">
          <Image
            src={Gambar}
            alt={title}
            width={153}
            height={189}
            className="object-contain"
          />
        </div>
      </CardContent>

      {/* Judul */}
      <CardHeader className="w-full items-start pl-6">
        <h3 className="text-left text-[22px] font-regular font-bold">
          {title}
        </h3>
      </CardHeader>

      {/* Deskripsi */}
      <CardDescription className="pl-6 pb-3 text-sm text-gray-600">
        <p className="break-words whitespace-normal font-regular ">
          {description}
        </p>
      </CardDescription>
    </Card>
  );
}

export default CardNews;
