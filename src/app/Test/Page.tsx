import React from "react";

type Listing = {
  id: number;
  name: string;
  image: string;
  alt: string;
  category: string;
  rate: number;
  rating: number;
  created: string;
};

const listings: Listing[] = [
  {
    id: 1,
    name: "The Daylight Atelier",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=100&q=80",
    alt: "The Daylight Atelier",
    category: "Photo Studio",
    rate: 95,
    rating: 4.9,
    created: "May 18, 2026",
  },
  {
    id: 2,
    name: "Juniper Podcast Lounge",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=100&q=80",
    alt: "Juniper Podcast Lounge",
    category: "Podcast Lounge",
    rate: 68,
    rating: 4.8,
    created: "Mar 02, 2026",
  },
  {
    id: 3,
    name: "Northline Sound Room",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=100&q=80",
    alt: "Northline Sound Room",
    category: "Music Suite",
    rate: 115,
    rating: 5,
    created: "Jan 16, 2026",
  },
  {
    id: 4,
    name: "Canvas & Light Workshop",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=100&q=80",
    alt: "Canvas & Light Workshop",
    category: "Art Workshop",
    rate: 72,
    rating: 4.7,
    created: "Nov 08, 2025",
  },
];

const Test = () => {
  return (
    <div className="min-h-screen w-full bg-[#f4f5f0] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl overflow-x-auto rounded-2xl border border-stone-200/80 bg-white shadow-sm">
        <table className="table min-w-[760px]">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#f0f2ea] text-xs font-semibold text-stone-600 sm:text-sm">
              <th className="py-4 px-4 sm:px-6">Studio</th>
              <th className="py-4 px-4 sm:px-6">Category</th>
              <th className="py-4 px-4 sm:px-6">Rate</th>
              <th className="py-4 px-4 sm:px-6">Rating</th>
              <th className="py-4 px-4 sm:px-6">Created</th>
              <th className="py-4 px-4 sm:px-6">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100 text-sm">
            {listings.map((listing) => (
              <tr
                key={listing.id}
                className="transition-colors hover:bg-stone-50/50"
              >
                {/* Studio Name & Image */}
                <td className="py-4 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={listing.image}
                      alt={listing.alt}
                      className="h-10 w-10 shrink-0 rounded-xl border border-stone-200 object-cover sm:h-12 sm:w-12"
                    />
                    <span className="font-bold text-stone-900">
                      {listing.name}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td className="py-4 px-4 text-stone-600 sm:px-6">
                  {listing.category}
                </td>

                {/* Rate */}
                <td className="py-4 px-4 font-bold whitespace-nowrap text-stone-900 sm:px-6">
                  ${listing.rate}/hr
                </td>

                {/* Rating */}
                <td className="py-4 px-4 sm:px-6">
                  <div className="flex items-center gap-1.5 font-semibold text-stone-700">
                    <svg
                      className="h-5 w-5 text-amber-500 fill-amber-500"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{listing.rating}</span>
                  </div>
                </td>

                {/* Created Date */}
                <td className="py-4 px-4 whitespace-nowrap text-stone-600 sm:px-6">
                  {listing.created}
                </td>

                {/* Actions */}
                <td className="py-4 px-4 sm:px-6">
                  <div className="flex items-center gap-2">
                    {/* Edit Button */}
                    <button
                      type="button"
                      aria-label={`Edit ${listing.name}`}
                      className="rounded-lg border border-stone-200 bg-stone-50 p-2 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
                    >
                      <svg
                        className="h-4 w-4"
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
                    <button
                      type="button"
                      aria-label={`Delete ${listing.name}`}
                      className="rounded-lg border border-rose-200/60 bg-rose-50 p-2 text-rose-500 transition-colors hover:bg-rose-100 hover:text-rose-700"
                    >
                      <svg
                        className="h-4 w-4"
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Test;
