import { StudioType } from "@/Type/studioType";

import React from "react";
import { toast } from "react-toastify";

interface MyListingType {
  listing: StudioType;
  refreshListings: () => Promise<void>;
}

const EditListing = ({ listing, refreshListings }: MyListingType) => {
  const {
    _id,
    title,
    category,
    maxCapacity,
    hourlyRate,
    securityDeposit,
    location,
    image,
    amenities,
    overview,
  } = listing;

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

  const closeModal = () => {
    const modal = document.getElementById(_id) as HTMLDialogElement | null;
    modal?.close();
  };

  const handleUpdateForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateForm = new FormData(e.currentTarget);
    const updateStudio = Object.fromEntries(updateForm.entries());

    const selectedAmenities = updateForm.getAll("amenities");
    const updatedPayload = {
      ...updateStudio,
      amenities: selectedAmenities,
    };

    try {
      const res = await fetch(`http://localhost:5000/my-listings/${_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedPayload),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Studio update");
        await refreshListings();
        setTimeout(() => {
          closeModal();
        }, 100);
      }

      console.log("Update Result:", result);
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  return (
    <div className="w-full text-left">
      <button
        className="btn"
        onClick={() => {
          const modal = document.getElementById(
            _id,
          ) as HTMLDialogElement | null;
          modal?.showModal();
        }}
      >
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

      <dialog id={_id} className="modal text-left">
        <div className="modal-box w-11/12 max-w-5xl relative bg-[#faf9f3] p-6 md:p-10 text-left">
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-10"
          >
            ✕
          </button>

          <form
            onSubmit={handleUpdateForm}
            className="mx-auto w-full max-w-3xl space-y-6 text-left items-start"
          >
            {/* Page heading */}
            <div className="text-left">
              <h1 className="text-2xl font-bold text-[#2f3527] sm:text-3xl text-left">
                Update studio information
              </h1>
            </div>

            {/* 01 — The essentials */}
            <section className="rounded-2xl border border-[#ecece4] bg-white p-6 shadow-sm md:p-8 text-left">
              <div className="flex items-start gap-4 text-left">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9fae7e] text-xs font-semibold text-white">
                  01
                </span>
                <div className="text-left">
                  <h2 className="text-lg font-semibold text-[#2f3527] sm:text-xl text-left">
                    The essentials
                  </h2>
                  <p className="mt-1 text-sm text-[#8b8f85] text-left">
                    Start with the details creators see first.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-6 text-left">
                {/* Studio title */}
                <div className="form-control items-start text-left">
                  <label className="mb-2 text-sm font-medium text-[#5c6052] block text-left">
                    Studio title
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="input input-bordered w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] focus:border-[#9fae7e] focus:outline-none placeholder:text-[#b6b8ae] text-left"
                    placeholder="e.g. Sun-flooded loft with skyline view"
                    required
                    defaultValue={title}
                  />
                </div>

                {/* Category + Maximum capacity */}
                <div className="grid gap-6 sm:grid-cols-2 text-left">
                  <div className="form-control items-start text-left">
                    <label className="mb-2 text-sm font-medium text-[#5c6052] block text-left">
                      Category
                    </label>
                    <select
                      name="category"
                      defaultValue={category || ""}
                      className="select select-bordered w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] text-[#5c6052] focus:border-[#9fae7e] focus:outline-none text-left"
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

                  <div className="form-control items-start text-left">
                    <label className="mb-2 text-sm font-medium text-[#5c6052] block text-left">
                      Maximum capacity
                    </label>
                    <input
                      type="number"
                      name="maxCapacity"
                      className="input input-bordered w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] focus:border-[#9fae7e] focus:outline-none placeholder:text-[#b6b8ae] text-left"
                      placeholder="Number of guests"
                      min="1"
                      required
                      defaultValue={maxCapacity}
                    />
                  </div>
                </div>

                {/* Hourly rate + Security deposit */}
                <div className="grid gap-6 sm:grid-cols-2 text-left">
                  <div className="form-control items-start text-left">
                    <label className="mb-2 text-sm font-medium text-[#5c6052] block text-left">
                      Hourly rate ($)
                    </label>
                    <input
                      type="number"
                      name="hourlyRate"
                      className="input input-bordered w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] text-[#5c6052] focus:border-[#9fae7e] focus:outline-none text-left"
                      min="0"
                      required
                      defaultValue={hourlyRate}
                    />
                  </div>

                  <div className="form-control items-start text-left">
                    <label className="mb-2 text-sm font-medium text-[#5c6052] block text-left">
                      Security deposit ($)
                    </label>
                    <input
                      type="number"
                      name="securityDeposit"
                      className="input input-bordered w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] text-[#5c6052] focus:border-[#9fae7e] focus:outline-none text-left"
                      min="0"
                      defaultValue={securityDeposit}
                    />
                  </div>
                </div>

                {/* Location / Address */}
                <div className="form-control items-start text-left">
                  <label className="mb-2 text-sm font-medium text-[#5c6052] block text-left">
                    Location / Address
                  </label>
                  <input
                    type="text"
                    name="location"
                    className="input input-bordered w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] focus:border-[#9fae7e] focus:outline-none placeholder:text-[#b6b8ae] text-left"
                    placeholder="Street, city, state"
                    required
                    defaultValue={location}
                  />
                </div>
              </div>
            </section>

            {/* 02 — Show your space */}
            <section className="rounded-2xl border border-[#ecece4] bg-white p-6 shadow-sm md:p-8 text-left">
              <div className="flex items-start gap-4 text-left">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9fae7e] text-xs font-semibold text-white">
                  02
                </span>
                <div className="text-left">
                  <h2 className="text-lg font-semibold text-[#2f3527] sm:text-xl text-left">
                    Show your space
                  </h2>
                  <p className="mt-1 text-sm text-[#8b8f85] text-left">
                    Provide an image URL that showcases your space.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-left">
                <div className="form-control items-start text-left">
                  <label className="mb-2 text-sm font-medium text-[#5c6052] block text-left">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    className="input input-bordered w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] focus:border-[#9fae7e] focus:outline-none placeholder:text-[#b6b8ae] text-left"
                    placeholder="https://example.com/image.jpg"
                    required
                    defaultValue={image}
                  />
                </div>
                <p className="mt-2 text-xs text-[#a3a69a] text-left">
                  Recommended: landscape image, at least 1600 x 1200
                </p>
              </div>
            </section>

            {/* 03 — Features & story */}
            <section className="rounded-2xl border border-[#ecece4] bg-white p-6 shadow-sm md:p-8 text-left">
              <div className="flex items-start gap-4 text-left">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9fae7e] text-xs font-semibold text-white">
                  03
                </span>
                <div className="text-left">
                  <h2 className="text-lg font-semibold text-[#2f3527] sm:text-xl text-left">
                    Features & story
                  </h2>
                  <p className="mt-1 text-sm text-[#8b8f85] text-left">
                    Help creators plan their production in your space.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-6 text-left">
                {/* Amenities Chips */}
                <div className="form-control items-start text-left">
                  <label className="mb-2 text-sm font-medium text-[#5c6052] block text-left">
                    Amenities
                  </label>
                  <div className="flex flex-wrap gap-2 text-left">
                    {availableAmenities.map((amenity) => (
                      <label
                        key={amenity}
                        className="group flex cursor-pointer items-center gap-1.5 rounded-full bg-[#ecefe4] px-3.5 py-2 text-xs font-medium text-[#5c6b45] transition-colors has-[:checked]:bg-[#9fae7e] has-[:checked]:text-white hover:bg-[#e2e7d5]"
                      >
                        <input
                          type="checkbox"
                          name="amenities"
                          value={amenity}
                          defaultChecked={amenities?.includes(amenity)}
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
                <div className="form-control items-start text-left">
                  <label className="mb-2 text-sm font-medium text-[#5c6052] block text-left">
                    Detailed studio overview
                  </label>
                  <textarea
                    name="overview"
                    className="textarea textarea-bordered min-h-36 w-full rounded-lg border-[#e3e3d8] bg-[#fbfbf8] leading-relaxed focus:border-[#9fae7e] focus:outline-none placeholder:text-[#b6b8ae] text-left"
                    placeholder="Tell creators what makes your space special, what's included, and anything they should know before booking."
                    defaultValue={overview}
                  />
                </div>
              </div>
            </section>

            {/* Action bar */}
            <div className="rounded-2xl border border-[#ecece4] bg-white p-4 shadow-sm">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn rounded-full border-[#deded2] bg-white text-[#5c6052] shadow-none hover:border-[#c9cbb9] hover:bg-[#f2f5ec]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn rounded-full border-none bg-[#2f3527] text-white hover:bg-[#3d4434]"
                >
                  Update studio
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

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default EditListing;
