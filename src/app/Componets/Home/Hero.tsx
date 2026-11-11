"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_SLIDE_INTERVAL = 5000;

const slides = [
  {
    id: 1,
    title: "Killjoys Live Vocal",
    subtitle: "Guitar, vocal and slow time",
    date: "7:30 PM, Royal Festival Hall, Moscow",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80",
    alt: "Crowd enjoying a live concert under purple stage lights",
  },
  {
    id: 2,
    title: "Midnight Guitar Sessions",
    subtitle: "Acoustic strings, warm nights",
    date: "9:00 PM, Grand Hall West, Moscow",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80",
    alt: "Silhouette of a guitarist performing on a lit stage",
  },
  {
    id: 3,
    title: "Unplugged Vocal Night",
    subtitle: "Raw voice, single microphone",
    date: "8:00 PM, Riverside Arena, Moscow",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80",
    alt: "Singer performing with a microphone on a dark stage",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  const goTo = useCallback((i: number) => {
    const slide = slideRefs.current[i];
    const carousel = carouselRef.current;
    if (slide && carousel) {
      carousel.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    }
    setIndex(i);
  }, []);

  const prev = useCallback(
    () => goTo((index - 1 + slides.length) % slides.length),
    [index, goTo],
  );
  const next = useCallback(
    () => goTo((index + 1) % slides.length),
    [index, goTo],
  );

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [index, isHovered, next]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let timeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (document.documentElement.contains(carousel)) {
          setIndex(Math.round(carousel.scrollLeft / carousel.clientWidth));
        }
      }, 150);
    };
    carousel.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      carousel.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={carouselRef}
        className="carousel flex h-[460px] min-h-[400px] w-full snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-none sm:h-[90vh]"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="relative h-full w-full min-w-full flex-shrink-0 snap-center bg-base-300"
          >
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/50 sm:to-transparent" />

            {/* Content Container - Centered */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-end px-5 pb-8 text-center text-white sm:justify-center sm:px-10 sm:pb-0 lg:px-16">
              <div className="flex max-w-xl flex-col items-center">
                {/* Title (Bigger Size) */}
                <h1 className="text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>

                {/* Subtitle (Bigger Size) */}
                <p className="mt-1.5 text-base text-white/90 sm:text-2xl lg:text-3xl">
                  {slide.subtitle}
                </p>

                {/* Date */}
                <p className="mt-2 text-xs font-medium text-white/75 sm:text-base">
                  {slide.date}
                </p>

                {/* Buttons Layout */}
                <div className="mt-5 flex w-full flex-col items-center gap-2.5 sm:w-auto sm:flex-row sm:gap-4">
                  <Link href="/studios" className="w-full sm:w-auto">
                    <button
                      type="button"
                      className="btn btn-sm w-full rounded-full border-none bg-[#1F2D22] text-xs text-white shadow-md hover:bg-indigo-600 sm:btn-md sm:w-auto sm:px-8 sm:text-base"
                    >
                      Explore Studios
                    </button>
                  </Link>
                  <Link href="/sign-in" className="w-full sm:w-auto">
                    <button
                      type="button"
                      className="btn btn-outline btn-sm w-full rounded-full border-white/70 text-xs text-white shadow-md hover:border-white hover:bg-white/10 sm:btn-md sm:w-auto sm:px-8 sm:text-base"
                    >
                      Host Your Space
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={prev}
        className="btn btn-circle btn-ghost absolute left-2 top-1/2 z-20 h-8 w-8 -translate-y-1/2 border border-white/30 bg-black/40 text-white backdrop-blur-sm hover:border-white hover:bg-black/70 sm:left-6 sm:h-12 sm:w-12"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={next}
        className="btn btn-circle btn-ghost absolute right-2 top-1/2 z-20 h-8 w-8 -translate-y-1/2 border border-white/30 bg-black/40 text-white backdrop-blur-sm hover:border-white hover:bg-black/70 sm:right-6 sm:h-12 sm:w-12"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-6 sm:gap-3">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={index === i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 sm:h-2.5 ${
              index === i
                ? "w-5 bg-indigo-500 sm:w-8"
                : "w-1.5 bg-white/50 hover:bg-white/80 sm:w-2.5"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
