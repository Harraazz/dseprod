"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type CardPanjangProps = {
  title: string;
  description: string;
  image: string;
  color: string; // untuk background dynamic
};

export default function CardPanjang({
  title,
  description,
  image,
  color,
}: CardPanjangProps) {
  return (
    <Card
      className={`flex flex-col md:flex-row items-center justify-between rounded-xl p-6 text-white`}
      style={{ backgroundColor: color }}
    >
      {/* Bagian Kiri (Text) */}
      <div className="flex-1 space-y-3">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl font-bold font-regular">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-sm font-regular leading-relaxed">
          {description}
        </CardContent>
        <Button
          variant="outline"
          className="w-70 mt-4 text-white border-white hover:bg-white hover:text-black text-[16px]"
        >
          Read More
        </Button>
      </div>

      {/* Bagian Kanan (Image) */}
      <div className="mt-6 md:mt-0 md:ml-6">
        <Image
          src={image}
          alt={title}
          width={185}
          height={185}
          className="object-contain"
        />
      </div>
    </Card>
  );
}
