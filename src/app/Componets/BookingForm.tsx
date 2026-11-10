"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "react-toastify";

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className ?? "h-4 w-4"}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const parseTime = (timeStr: string): number => {
  const [time, modifier] = timeStr.split(" ");
  let [hours] = time.split(":").map(Number);
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return hours;
};

interface BookingFormProps {
  rate: number;
  deposit: number;
  ratingText: string;
  productId: string;
}

export const BookingForm = ({
  rate,
  deposit,
  ratingText,
  productId,
}: BookingFormProps) => {
  const route = useRouter();

  const [startTime, setStartTime] = useState("9:00 AM");
  const [endTime, setEndTime] = useState("3:00 PM");

  const { data: session, isPending } = useSession();
  const user = session?.user;
  const email = user?.email;
  const name = user?.name;

  // Dynamic hour count
  const startHour = parseTime(startTime);
  const endHour = parseTime(endTime);
  const bookingHours = Math.max(0, endHour - startHour);

  // Dynamic fee calculation
  const bookingFee = rate * bookingHours;
  const serviceFee = Math.round(bookingFee * 0.12);
  const estimatedTotal = bookingFee + deposit + serviceFee;

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const finalBookingData = {
      ...formValues,
      bookingHours,
      bookingFee,
      serviceFee,
      estimatedTotal,
      email,
      name,
      productId,
    };

    const res = await fetch(`${process.env.API_BASE_URL}studio-book`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(finalBookingData),
    });

    const result = await res.json();
    if (result.message === "success") {
      toast.success("Booking Success");
      route.push("/my-booking");
    } else {
      toast.error("Try again!");
    }
  };

  return (
    <form
      onSubmit={handleBooking}
      className="mt-10 block md:sticky md:top-24 md:col-span-5 md:mt-0 md:self-start"
    >
      <div className="space-y-4">
        <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <p className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-stone-900">${rate}</span>
              <span className="text-sm text-stone-500">/ hour</span>
            </p>
            <span className="flex items-center gap-1 pt-1">
              <StarIcon className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold text-stone-900">
                {ratingText}
              </span>
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <label
                htmlFor="booking-date"
                className="text-xs font-medium text-stone-500"
              >
                Date
              </label>
              <input
                id="booking-date"
                name="date"
                type="date"
                required
                className="input input-bordered mt-1 w-full text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="booking-start"
                  className="text-xs font-medium text-stone-500"
                >
                  Start time
                </label>
                <select
                  id="booking-start"
                  name="start"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="select select-bordered mt-1 w-full text-sm"
                >
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="booking-end"
                  className="text-xs font-medium text-stone-500"
                >
                  End time
                </label>
                <select
                  id="booking-end"
                  name="end"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="select select-bordered mt-1 w-full text-sm"
                >
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm">
            <p className="text-xs font-medium text-stone-500">Fee breakdown</p>
            <div className="mt-2 space-y-1.5">
              <p className="flex items-center justify-between">
                <span className="text-stone-500">
                  {bookingHours} hrs × ${rate}/hr
                </span>
                <span className="font-medium text-stone-900">
                  ${bookingFee}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-stone-500">Studio deposit</span>
                <span className="font-medium text-stone-900">${deposit}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-stone-500">Service fee (12%)</span>
                <span className="font-medium text-stone-900">
                  ${serviceFee}
                </span>
              </p>
            </div>
            <p className="mt-2 flex items-center justify-between border-t border-stone-200 pt-2 text-base font-semibold text-stone-900">
              <span>Estimated total</span>
              <span>${estimatedTotal}</span>
            </p>
          </div>

          <button
            type="submit"
            className="btn mt-4 w-full rounded-full border-none bg-[#2f3527] text-white hover:bg-[#3d4434]"
          >
            Book workspace now
          </button>
          <p className="mt-2 text-center text-xs text-stone-500">
            You won&apos;t be charged yet
          </p>
        </div>

        <div className="flex items-start gap-2.5 rounded-2xl border border-stone-200 bg-white p-4">
          <svg
            className="h-5 w-5 shrink-0 text-emerald-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3l7 3v5c0 4.8-3 8.7-7 10-4-1.3-7-5.2-7-10V6l7-3zM9.2 12l2 2 3.6-3.8"
            />
          </svg>
          <div>
            <p className="text-sm font-semibold text-stone-900">
              Purchase protection
            </p>
            <p className="mt-0.5 text-xs text-stone-500">
              100% money-back guarantee on your booking.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
