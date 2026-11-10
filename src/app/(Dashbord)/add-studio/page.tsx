"use client";
import { useSession } from "@/lib/auth-client";
import React from "react";
import { toast } from "react-toastify";

const availableAmenities = [
  "Natural light",
  "Lighting equipment",
  "Dressing room",
  "Soundproofing",
  "Cyclorama",
  "Kitchen",
  "Wi-Fi",
  "Parking",
];

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Loft",
];

const AddStudioPage = () => {
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    const amenities = formData.getAll("amenities") as string[];

    const payload = {
      ...rawData,
      maxCapacity: Number(rawData.maxCapacity),
      hourlyRate: Number(rawData.hourlyRate),
      securityDeposit: rawData.securityDeposit
        ? Number(rawData.securityDeposit)
        : 0,
      amenities,
      ownerName: session?.user?.name,
      ownerEmail: session?.user?.email,
    };

    try {
      const res = await fetch(`${process.env.API_BASE_URL}add-studio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok || result.status === 200 || result.insertedId) {
        toast.success("Studio added successfully!");
      } else {
        toast.error(result.message || "Failed to add studio.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Network error or server is unreachable!");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f3] py-10">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl space-y-6 px-4"
      >
        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold text-[#2f3527] sm:text-3xl">
            Add a new studio
          </h1>
          <p className="mt-2 text-sm text-[#8b8f85]">
            Turn your space into someone&apos;s next great idea.
          </p>
        </div>

        {/* 01 — The essentials */}
        <section className="rounded-2xl border border-[#ecece4] bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9fae7e] text-xs font-semibold text-white">
              01
            </span>
            <div>
              <h2 className="text-lg font-semibold text-[#2f3527] sm:text-xl">
                The essentials
              </h2>
              <p className="mt-1 text-sm text-[#8b8f85]">
                Start with the details creators see first.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {/* Studio title */}
            <div className="form-control">
              <label className="mb-2 text-sm font-medium text-[#5c6052]">
                Studio title
              </label>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] focus:border-[#9fae7e] focus:outline-none placeholder:text-[#b6b8ae]"
                placeholder="e.g. Sun-flooded loft with skyline view"
                required
              />
            </div>

            {/* Category + Maximum capacity */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="form-control">
                <label className="mb-2 text-sm font-medium text-[#5c6052]">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue=""
                  className="select select-bordered w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] text-[#5c6052] focus:border-[#9fae7e] focus:outline-none"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="mb-2 text-sm font-medium text-[#5c6052]">
                  Maximum capacity
                </label>
                <input
                  type="number"
                  name="maxCapacity"
                  className="input input-bordered w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] focus:border-[#9fae7e] focus:outline-none placeholder:text-[#b6b8ae]"
                  placeholder="Number of guests"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Hourly rate + Security deposit */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="form-control">
                <label className="mb-2 text-sm font-medium text-[#5c6052]">
                  Hourly rate ($)
                </label>
                <input
                  type="number"
                  name="hourlyRate"
                  defaultValue={25}
                  className="input input-bordered w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] text-[#5c6052] focus:border-[#9fae7e] focus:outline-none"
                  min="0"
                  required
                />
              </div>

              <div className="form-control">
                <label className="mb-2 text-sm font-medium text-[#5c6052]">
                  Security deposit ($)
                </label>
                <input
                  type="number"
                  name="securityDeposit"
                  defaultValue={250}
                  className="input input-bordered w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] text-[#5c6052] focus:border-[#9fae7e] focus:outline-none"
                  min="0"
                />
              </div>
            </div>

            {/* Location / Address */}
            <div className="form-control">
              <label className="mb-2 text-sm font-medium text-[#5c6052]">
                Location / Address
              </label>
              <input
                type="text"
                name="location"
                className="input input-bordered w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] focus:border-[#9fae7e] focus:outline-none placeholder:text-[#b6b8ae]"
                placeholder="Street, city, state"
                required
              />
            </div>
          </div>
        </section>

        {/* 02 — Show your space */}
        <section className="rounded-2xl border border-[#ecece4] bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9fae7e] text-xs font-semibold text-white">
              02
            </span>
            <div>
              <h2 className="text-lg font-semibold text-[#2f3527] sm:text-xl">
                Show your space
              </h2>
              <p className="mt-1 text-sm text-[#8b8f85]">
                Provide an image URL that showcases your space.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="form-control">
              <label className="mb-2 text-sm font-medium text-[#5c6052]">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                className="input input-bordered w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] focus:border-[#9fae7e] focus:outline-none placeholder:text-[#b6b8ae]"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            <p className="mt-2 text-xs text-[#a3a69a]">
              Recommended: landscape image, at least 1600 x 1200
            </p>
          </div>
        </section>

        {/* 03 — Features & story */}
        <section className="rounded-2xl border border-[#ecece4] bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9fae7e] text-xs font-semibold text-white">
              03
            </span>
            <div>
              <h2 className="text-lg font-semibold text-[#2f3527] sm:text-xl">
                Features & story
              </h2>
              <p className="mt-1 text-sm text-[#8b8f85]">
                Help creators plan their production in your space.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {/* Amenities Chips */}
            <div className="form-control">
              <label className="mb-2 text-sm font-medium text-[#5c6052]">
                Amenities
              </label>
              <div className="flex flex-wrap gap-2">
                {availableAmenities.map((amenity) => (
                  <label
                    key={amenity}
                    className="group flex cursor-pointer items-center gap-1.5 rounded-full bg-[#ecefe4] px-3.5 py-2 text-xs font-medium text-[#5c6b45] transition-colors has-[:checked]:bg-[#9fae7e] has-[:checked]:text-white hover:bg-[#e2e7d5]"
                  >
                    <input
                      type="checkbox"
                      name="amenities"
                      value={amenity}
                      className="hidden"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 opacity-40 transition-opacity group-has-[:checked]:opacity-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m5 13 4 4L19 7"
                      />
                    </svg>
                    {amenity}
                  </label>
                ))}
              </div>
            </div>

            {/* Detailed overview */}
            <div className="form-control">
              <label className="mb-2 text-sm font-medium text-[#5c6052]">
                Detailed studio overview
              </label>
              <textarea
                name="overview"
                className="textarea textarea-bordered min-h-36 w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] leading-relaxed focus:border-[#9fae7e] focus:outline-none placeholder:text-[#b6b8ae]"
                placeholder="Tell creators what makes your space special, what's included, and anything they should know before booking."
              />
            </div>
          </div>
        </section>

        {/* Action bar */}
        <div className="rounded-2xl border border-[#ecece4] bg-white p-4 shadow-sm">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="btn rounded-full border-[#deded2] bg-white text-[#5c6052] shadow-none hover:border-[#c9cbb9] hover:bg-[#f2f5ec]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn rounded-full border-none bg-[#2f3527] text-white hover:bg-[#3d4434]"
            >
              Publish studio
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStudioPage;
