import * as React from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Banner() {
  return (
    <Carousel className="w-full ">
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <Image
              className="object-contain w-screen "
              width={1280}
              height={734}
              src="/COVER PAGE.png"
              alt="Banner"
              priority={index === 0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      {/* <CarouselNext /> */}
    </Carousel>
  );
}
