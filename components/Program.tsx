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
    <div>
      <Card
        className="w-[340px] flex flex-col justify-center items-center h-[370px]"
        style={{ backgroundColor: bgColor }}
      >
        <CardHeader className="text-center justify-center text-[40px] font-regular font-bold text-white">
          {title}
        </CardHeader>
        <CardContent className="border-2 rounded-[8px]  flex justify-center w-[280] h-[400px]  bg-white">
          <Image
            src={Gambar}
            alt={title}
            width={153}
            height={189}
            className="w-30 object-contain self-end"
          />
        </CardContent>
        <CardFooter>
          <Button variant="custom">Read More</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Program;
