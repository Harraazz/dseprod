import React from "react";
import Image from "next/image";
import Cardnews from "@/components/CardNews";
import { LucideProps } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  //   CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Berita() {
  return (
    <div className="mb-5 flex flex-col items-center justify-center">
      <Carousel>
        <CarouselContent className="">
          <CarouselItem className="basis-1/4">
            <Cardnews Gambar="/DSE Logo 1.png" title="test" bgColor="" />
          </CarouselItem>
          <CarouselItem className="basis-1/4">
            <Cardnews Gambar="/DSE Logo 1.png" title="test" bgColor="" />
          </CarouselItem>
          <CarouselItem className="basis-1/4">
            <Cardnews Gambar="/DSE Logo 1.png" title="test" bgColor="" />
          </CarouselItem>
          <CarouselItem className="basis-1/4">
            <Cardnews Gambar="/DSE Logo 1.png" title="test" bgColor="" />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Berita;
