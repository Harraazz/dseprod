"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type CardPanjangProps = {
  title: string;
  description: string;
  image: string;
  color: string;
  link: string;
};

export default function CardPanjang({
  title,
  description,
  image,
  color,
  link, // ✅ JANGAN LUPA
}: CardPanjangProps) {
  const router = useRouter(); // ✅ HARUS DI SINI

  return (
    <Card
      className="
        w-full
        max-w-[1100px]
        h-full
        flex flex-col
        md:flex-row
        items-stretch
        rounded-xl
        p-6
        text-white
      "
      style={{ backgroundColor: color }}
    >
      {/* IMAGE */}
      <div
        className="
        order-1 md:order-2
        mb-6 md:mb-0 md:ml-6
        flex justify-center items-center
        flex-shrink-0
        w-full md:w-[185px]
      "
      >
        <Image
          src={image}
          alt={title}
          width={185}
          height={185}
          className="object-contain"
        />
      </div>

      {/* TEXT */}
      <div
        className="
        order-2 md:order-1
        flex flex-col justify-between
        flex-1 min-w-0
        text-center md:text-left
      "
      >
        <div className="space-y-3">
          <CardHeader className="p-0">
            <CardTitle className="text-xl md:text-2xl font-bold">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 text-sm md:text-base leading-relaxed">
            {description}
          </CardContent>
        </div>

        {/* BUTTON */}
        <div className="mt-6 flex justify-center md:justify-start">
          <Button
            variant="outline"
            className="w-full sm:w-[200px] text-white border-white hover:bg-white hover:text-black"
            onClick={() => router.push(link)}
          >
            Read More
          </Button>
        </div>
      </div>
    </Card>
  );
}
