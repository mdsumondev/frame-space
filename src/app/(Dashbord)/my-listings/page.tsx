"use client";

import { useSession } from "@/lib/auth-client";
import { StudioType } from "@/Type/studioType";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import MyListing from "../_Components/MyListing";
import Link from "next/link";

const MyListingData = () => {
  const [listings, setListings] = useState<StudioType[]>([]);
  const { data: userData } = useSession();
  const email = userData?.user?.email;

  const fetchListingsData = useCallback(async (): Promise<void> => {
    try {
      if (!email) return;

      const res = await fetch(`http://localhost:5000/my-listings/${email}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data: { data: StudioType[] } = await res.json();
      setListings(data.data);
    } catch (error) {
      console.log(error);
    }
  }, [email]);

  useEffect(() => {
    fetchListingsData();
  }, [fetchListingsData]);
  return (
    <div>
      <div>
        <div className="max-w-7xl w-full mt-5 mx-auto flex justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">My studio listings</h1>
            <p>Manage how your spaces appear to creators.</p>
          </div>
          <div>
            <Link
              href="/add-studio"
              className="btn rounded-full border-[#deded2] bg-white text-[#5c6052] shadow-none hover:border-[#c9cbb9] hover:bg-[#f2f5ec]"
            >
              Add new studio
            </Link>
          </div>
        </div>

        <div className="max-w-7xl w-full mx-auto mt-3">
          <p className="text-lg font-semibold">
            {listings.length} active listings
          </p>
        </div>

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
                    <MyListing
                      key={listing._id}
                      listing={listing}
                      refreshListings={fetchListingsData}
                    />
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
