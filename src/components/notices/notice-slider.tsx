"use client";

import { Notice } from "@/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function NoticesSlider({ notices }: { notices: Notice[] }) {
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
        {notices.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
              <div className="mb-4 flex items-start gap-3">
                <div className="h-8 w-8 flex-shrink-0 rounded bg-gray-400"></div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {slide.title}
                </h3>
              </div>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600">
                {slide.title}
              </p>
              <button className="self-start rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50">
                View Details
              </button>
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
