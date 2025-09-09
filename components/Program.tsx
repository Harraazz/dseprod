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
        className="w-[322px] flex flex-col justify-center items-center h-[373px]"
        style={{ backgroundColor: bgColor }}
      >
        <CardHeader className="text-center justify-center text-[40px] font-regular font-bold">
          {title}
        </CardHeader>
        <CardContent className="border-2 rounded-[8px]  flex justify-center w-[274] h-[300px] pt-6 bg-white">
          <Image
            src={Gambar}
            alt={title}
            width={153}
            height={189}
            className="w-30 object-contain self-end"
          />
        </CardContent>
        <CardFooter>
          <Button variant="destructive">Destructive</Button>;
        </CardFooter>
      </Card>
    </div>
  );
}

export default Program;
