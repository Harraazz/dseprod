import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface ProgramProps {
  Gambar: string;
  title: string;
  bgColor?: string;
}

function Program({ Gambar, title, bgColor = "#fff" }: ProgramProps) {
  return (
    <Card
      className="
        w-[340px] h-[370px]
        flex flex-col items-center justify-center
        sm:w-full sm:max-w-[340px]
      "
      style={{ backgroundColor: bgColor }}
    >
      {/* Header */}
      <CardHeader className="text-center text-[32px] md:text-[40px] font-bold text-white">
        {title}
      </CardHeader>

      {/* Content */}
      <CardContent
        className="
          border-2 rounded-[8px]
          flex justify-center items-end
          bg-white
          w-[280px] h-[200px]
          sm:w-full sm:max-w-[280px]
        "
      >
        <Image
          src={Gambar}
          alt={title}
          width={153}
          height={189}
          className="object-contain"
        />
      </CardContent>

      {/* Footer */}
      <CardFooter>
        <Button variant="custom" className="sm:w-full">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Program;
