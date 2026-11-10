"use client";

import React, { useEffect, useState, useCallback } from "react";
import { BookingType } from "@/Type/BookingType";
import BookingData from "../_Components/BookingData";
import { useSession } from "@/lib/auth-client";

const MyBooking = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);

  // 1. BetterAuth useSession hook
  const { data: sessionData, isPending } = useSession();

  const userEmail = sessionData?.user?.email;

  console.log(userEmail);

  const fetchBookings = useCallback(async (): Promise<void> => {
    if (!userEmail) return;

    try {
      const res = await fetch(
        `${process.env.API_BASE_URL}my-booking/${userEmail}`,
      );
      const data = await res.json();
      setBookings(data.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  }, [userEmail]);

  useEffect(() => {
    if (userEmail) {
      fetchBookings();
    }
  }, [userEmail, fetchBookings]);

  if (isPending) {
    return (
      <div className="py-10 text-center text-stone-500">Loading session...</div>
    );
  }

  console.log(bookings);

  return (
    <div className="w-full">
      {/* Empty bookings state */}
      {bookings.length === 0 ? (
        <div className="py-10 text-center text-stone-500">
          No bookings found.
        </div>
      ) : (
        <>
          {/* Mobile View: Card layout */}
          <div className="block md:hidden divide-y divide-stone-200">
            {bookings.map((booking) => (
              <BookingData
                key={booking._id}
                booking={booking}
                refreshBookings={fetchBookings}
                variant="card"
              />
            ))}
          </div>

          {/* Desktop View: Table layout */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table w-full text-left">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 text-sm">
                  <th className="py-3 px-4 sm:px-6">Studio</th>
                  <th className="py-3 px-4 sm:px-6">Date</th>
                  <th className="py-3 px-4 sm:px-6">Time</th>
                  <th className="py-3 px-4 sm:px-6">Duration</th>
                  <th className="py-3 px-4 sm:px-6">Total</th>
                  <th className="py-3 px-4 text-right sm:px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {bookings.map((booking) => (
                  <BookingData
                    key={booking._id}
                    booking={booking}
                    refreshBookings={fetchBookings}
                    variant="row"
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyBooking;
