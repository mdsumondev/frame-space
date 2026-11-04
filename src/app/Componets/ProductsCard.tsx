import { StudioType } from "@/Type/studioType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// The backend sends a per-studio `rating`, which StudioType doesn't declare
// yet — read it defensively and fall back like the listings table does.
const reviews = 48;

const ProductsCard = ({ studio }: { studio: StudioType }) => {
  const { _id, title, category, location, image, hourlyRate } = studio;
  const studioRating = (studio as { rating?: number }).rating;
  const rating = typeof studioRating === "number" ? studioRating : 4.9;

  return (
    <div className="group flex w-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Studio image with category badge + favorite button */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-stone-900">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-800 shadow-sm">
          {category}
        </span>

        <button
          type="button"
          aria-label={`Save ${title} to favorites`}
          className="absolute right-4 top-4 rounded-full bg-white p-2.5 text-stone-800 shadow-sm transition-transform duration-300 hover:scale-110"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col px-5 py-4">
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <svg className="h-4 w-4 fill-amber-500" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-bold text-stone-900">
            {rating.toFixed(1)}
          </span>
          <span className="text-sm text-stone-500">({reviews})</span>
        </div>

        {/* Title + location */}
        <h3 className="mt-2 truncate text-lg font-medium text-stone-900 sm:text-xl">
          {title}
        </h3>
        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-stone-500">
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <span className="truncate">{location}</span>
        </div>

        {/* Price + view space */}
        <div className="mt-4 border-t border-stone-200" />
        <div className="flex items-center justify-between pt-4">
          <span className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-stone-900">
              ${hourlyRate}
            </span>
            <span className="text-sm text-stone-500">/ hour</span>
          </span>

          <Link
            href={`/studio/${_id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 underline decoration-stone-500 underline-offset-4 transition-colors hover:decoration-stone-900"
          >
            View space
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
