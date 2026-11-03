import React from "react";
import { StudioType } from "@/Type/studioType";
import Image from "next/image";

interface MyListingType {
  listing: StudioType;
}

const MyListing = ({ listing }: MyListingType) => {
  const { title, category, image, hourlyRate } = listing;

  return (
    <tr className="hover:bg-stone-50/50 transition-colors border-b-gray-300 border">
      {/* Studio Name & Image */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <Image
            src={image}
            width={50}
            height={50}
            alt={title}
            className="rounded-sm"
          />
          <span className="font-bold text-stone-900">{title}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-stone-600">{category}</td>

      {/* Rate */}
      <td className="py-4 px-6 font-bold text-stone-900">${hourlyRate}/hr</td>

      {/* Rating */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-1.5 font-semibold text-stone-700">
          <svg
            className="w-5 h-5 text-amber-500 fill-amber-500"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>4.9</span>
        </div>
      </td>

      {/* Created Date */}
      <td className="py-4 px-6 text-stone-600">May 18, 2026</td>

      {/* Actions */}
      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-2">
          {/* Edit Button */}
          <button className="p-2 text-stone-600 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          {/* Delete Button */}
          <button className="p-2 text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 rounded-lg transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MyListing;
