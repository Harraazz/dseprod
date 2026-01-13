import React from "react";
import Cardnews from "@/components/CardNews";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

function Berita() {
  return (
    <div className="mb-1 flex flex-col items-center justify-center">
      <Carousel className="w-full">
        <CarouselContent className="flex gap-x-4 py-0">
          <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/4">
            <Cardnews
              Gambar="/DSE Logo 1.png"
              title="lorem ipsum dolor sit amet"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            />
          </CarouselItem>

          <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/4">
            <Cardnews
              Gambar="/DSE Logo 1.png"
              title="lorem ipsum dolor sit amet"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            />
          </CarouselItem>

          <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/4">
            <Cardnews
              Gambar="/DSE Logo 1.png"
              title="lorem ipsum dolor sit amet"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            />
          </CarouselItem>

          <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/4">
            <Cardnews
              Gambar="/DSE Logo 1.png"
              title="lorem ipsum dolor sit amet"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Berita;
