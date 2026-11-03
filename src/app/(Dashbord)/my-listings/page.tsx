"use client";

import { useSession } from "@/lib/auth-client";
import { StudioType } from "@/Type/studioType";
import React, { Suspense, useEffect, useState } from "react";
import MyListing from "../_Components/MyListing";

const MyListingData = () => {
  const [listings, setListings] = useState<StudioType[]>([]);
  const { data: userData } = useSession();

  useEffect(() => {
    const fetchListingsData = async (): Promise<void> => {
      try {
        if (!userData?.user?.id) return;

        const res = await fetch(
          `http://localhost:5000/my-listings/${userData?.user?.email}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch listings");
        }

        const data: { data: StudioType[] } = await res.json();

        setListings(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListingsData();
  }, [userData?.user?.email]);

  console.log(listings);
  console.log("user:", userData?.user.email);

  return (
    <div>
      <div>
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
                <Suspense
                  fallback={
                    <span className="loading loading-ring loading-2xl"></span>
                  }
                >
                  {listings.map((listing) => (
                    <MyListing key={listing._id} listing={listing} />
                  ))}
                </Suspense>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyListingData;
