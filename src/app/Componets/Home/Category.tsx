import { CategoryType } from "@/Type/Category";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Category = ({ category }: { category: CategoryType }) => {
  const { title, description, image } = category;

  return (
    <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-stone-900 [counter-increment:cat] first:md:row-span-2 first:md:aspect-auto">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {/* Caption: number, title, description + arrow */}
      <div className="absolute inset-0 flex items-end justify-between gap-3 p-5 md:p-6 lg:p-7">
        <div className="min-w-0">
          <span className="block text-xs font-semibold text-white/90 before:content-[counter(cat,decimal-leading-zero)] md:text-sm" />
          <h3 className="mt-1.5 truncate text-xl font-bold text-white md:text-2xl">
            {title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-white/75 md:text-sm">
            {description}
          </p>
        </div>

        <Link href={`/category/${title}`}>
          <svg
            className="h-5 w-5 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6"
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
  );
};

export default Category;
