
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Banner = {
  id: number;
  imageUrl: string;
  title: string;
  link: string;
}

// Dummy data - would come from backend in production
const banners: Banner[] = [
  {
    id: 1,
    imageUrl: "/placeholder.svg",
    title: "美容優惠活動",
    link: "/promotions/1"
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg", 
    title: "新店開幕特惠",
    link: "/promotions/2"
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg",
    title: "季節限定服務",
    link: "/promotions/3"
  }
];

export function Banner() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white text-xl font-semibold">{banner.title}</h3>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}
