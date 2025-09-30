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
    <div className="mb-1 flex flex-col items-center justify-center">
      <Carousel>
        <CarouselContent className="flex gap-x-4 py-0">
          <CarouselItem className="basis-1/4">
            <Cardnews
              Gambar="/DSE Logo 1.png"
              title="lorem ipsum dolor sit amet"
              bgColor=""
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus,
          adipisci."
            />
          </CarouselItem>
          <CarouselItem className="basis-1/4">
            <Cardnews
              Gambar="/DSE Logo 1.png"
              title="lorem ipsum dolor sit amet"
              bgColor=""
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus,
          adipisci."
            />
          </CarouselItem>
          <CarouselItem className="basis-1/4">
            <Cardnews
              Gambar="/DSE Logo 1.png"
              title="lorem ipsum dolor sit amet"
              bgColor=""
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus,
          adipisci."
            />
          </CarouselItem>
          <CarouselItem className="basis-1/4">
            <Cardnews
              Gambar="/DSE Logo 1.png"
              title="lorem ipsum dolor sit amet"
              bgColor=""
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus,
          adipisci."
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Berita;
