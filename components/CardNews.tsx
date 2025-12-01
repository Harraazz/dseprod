import React from "react";
import Image from "next/image";
<<<<<<< HEAD
import { Button } from "@/components/ui/button";
=======
>>>>>>> b6d5f1fb73a12db31543a3ab42ee3eff560920f8
import {
  Card,
  CardContent,
  CardDescription,
<<<<<<< HEAD
  CardFooter,
=======
>>>>>>> b6d5f1fb73a12db31543a3ab42ee3eff560920f8
  CardHeader,
} from "@/components/ui/card";

interface ProgramProps {
  Gambar: string;
  title: string;
<<<<<<< HEAD
  bgColor?: string;
}

function CardNews({ Gambar, title, bgColor = "#fff" }: ProgramProps) {
  return (
    <div>
      <Card
        className="w-[250px] flex flex-col items-center h-[370px]"
        style={{ backgroundColor: bgColor }}
      >
        <CardContent className="border-2 rounded-[8px] flex justify-center w-[200px] h-[400px] bg-white">
=======
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
      className="w-full h-[370px] flex flex-col"
      style={{ backgroundColor: bgColor }}
    >
      {/* Gambar */}
      <CardContent className="flex justify-center items-center">
        <div className="w-[250px] h-[150px] bg-white rounded-[8px] border-2 flex justify-center items-center">
>>>>>>> b6d5f1fb73a12db31543a3ab42ee3eff560920f8
          <Image
            src={Gambar}
            alt={title}
            width={153}
            height={189}
<<<<<<< HEAD
            className="w-30 object-contain self-centerx"
          />
        </CardContent>
        <CardHeader className="text-center justify-center text-[40px] font-regular font-bold">
          {title}
        </CardHeader>
        <CardDescription>
          <p className="break-words whitespace-normal">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus,
            adipisci.
          </p>
        </CardDescription>
      </Card>
    </div>
=======
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
>>>>>>> b6d5f1fb73a12db31543a3ab42ee3eff560920f8
  );
}

export default CardNews;
