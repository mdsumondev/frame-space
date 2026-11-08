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

  // Auto slide every 5s; pauses on hover. Timer resets on every slide change.
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [index, isHovered, next]);

  // Keep `index` in sync when the user swipes/drags the carousel manually.
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
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={carouselRef}
        className="carousel min-h-[calc(100vh-86px)] w-full sm:h-[90vh] lg:h-[90vh]"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="relative h-full min-w-full snap-center overflow-hidden bg-base-300"
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

            {/* Slide content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 text-white sm:px-8 lg:px-12">
              <div className="max-w-xl">
                <h1 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>
                <p className="mt-1 text-lg text-white/85 sm:text-2xl lg:text-3xl">
                  {slide.subtitle}
                </p>
                <p className="mt-4 text-sm text-white/75 sm:text-base">
                  {slide.date}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link href="/studios">
                    <button
                      type="button"
                      className="btn rounded-full border-none bg-[#1F2D22] px-6 text-sm text-white shadow-none hover:bg-indigo-500 sm:px-8 sm:text-base"
                    >
                      Explore Studios
                    </button>
                  </Link>
                  <Link href="/sign-in">
                    <button
                      type="button"
                      className="btn btn-outline rounded-full border-white/70 px-6 text-sm text-white shadow-none hover:border-white hover:bg-white/10 sm:px-8 sm:text-base"
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

      {/* Navigation arrows */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={prev}
        className="btn btn-circle btn-ghost absolute top-1/2 left-2 z-20 hidden -translate-y-1/2 border border-white/30 bg-black/30 text-white hover:border-white hover:bg-black/60 sm:flex sm:left-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
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
        className="btn btn-circle btn-ghost absolute top-1/2 right-2 z-20 hidden -translate-y-1/2 border border-white/30 bg-black/30 text-white hover:border-white hover:bg-black/60 sm:flex sm:right-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Mobile-only navigation arrows (always visible under sm) */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={prev}
        className="btn btn-circle btn-ghost absolute top-1/2 left-1 z-20 -translate-y-1/2 border border-white/30 bg-black/30 text-white btn-xs hover:border-white hover:bg-black/60 sm:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
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
        className="btn btn-circle btn-ghost absolute top-1/2 right-1 z-20 -translate-y-1/2 border border-white/30 bg-black/30 text-white btn-xs hover:border-white hover:bg-black/60 sm:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-5 sm:gap-3">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={index === i}
            onClick={() => goTo(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 sm:h-2.5 sm:w-2.5 ${
              index === i
                ? "w-6 bg-indigo-500 sm:w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
