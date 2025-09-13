"use client";

import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { buttonVariants } from "./ui/button";

interface SliderProps {
  data: Array<{
    title: string;
    description: string;
    image?: string;
  }>;
}

export default function Slider({ data }: SliderProps) {
  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          prevEl: ".notices-prev",
          nextEl: ".notices-next",
        }}
        pagination={{
          el: ".notices-pagination",
          clickable: true,
          bulletClass: "swiper-pagination-bullet notices-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active notices-bullet-active",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="notices-swiper"
      >
        {data.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="border-border bg-card flex h-full flex-col rounded-lg border p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
              <div className="mb-4 flex items-start gap-3">
                <div className="bg-accent h-8 w-8 flex-shrink-0 rounded"></div>
                <h3 className="text-card-foreground text-lg font-semibold">
                  {slide.title}
                </h3>
              </div>
              <p className="text-muted-foreground-foreground mb-6 flex-grow text-sm leading-relaxed">
                {slide.title}
              </p>

              <Link
                href={`/notices/${index}`}
                className={buttonVariants({ variant: "outline" })}
              >
                View Details
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <button className="notices-prev absolute top-1/2 left-0 z-10 flex h-8 w-8 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
        <svg
          className="h-4 w-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button className="notices-next absolute top-1/2 right-0 z-10 flex h-8 w-8 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
        <svg
          className="h-4 w-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="notices-pagination mt-6 flex justify-center gap-2"></div>
    </div>
  );
}
