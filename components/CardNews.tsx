import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface ProgramProps {
  Gambar: string;
  title: string;
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
          <Image
            src={Gambar}
            alt={title}
            width={153}
            height={189}
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
  );
}

export default CardNews;
