"use client";

import meetingMinutes from "@/content/meeting-minutes.json";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MeetingMinutesSlider() {
  if (!meetingMinutes.enable) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          {meetingMinutes.title}
        </h2>
        <p className="mx-auto max-w-2xl text-gray-600">
          {meetingMinutes.description}
        </p>
      </div>

      <div className="relative">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: ".meeting-prev",
            nextEl: ".meeting-next",
          }}
          pagination={{
            el: ".meeting-pagination",
            clickable: true,
            bulletClass: "swiper-pagination-bullet meeting-bullet",
            bulletActiveClass:
              "swiper-pagination-bullet-active meeting-bullet-active",
          }}
          autoplay={{
            delay: 4000,
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
          className="meeting-minutes-swiper"
        >
          {meetingMinutes.meetings.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  {slide.title}
                </h3>
                <p className="mb-4 flex-grow text-sm leading-relaxed text-gray-600">
                  {slide.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-sm bg-gray-400"></div>
                    <span>{slide.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-sm bg-gray-400"></div>
                    <span>{slide.time}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button className="meeting-prev absolute top-1/2 left-0 z-10 flex h-8 w-8 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
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
        <button className="meeting-next absolute top-1/2 right-0 z-10 flex h-8 w-8 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
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
        <div className="meeting-pagination mt-6 flex justify-center gap-2"></div>
      </div>
    </section>
  );
}
