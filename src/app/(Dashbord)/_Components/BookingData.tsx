"use client";

import { BookingType } from "@/Type/BookingType";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

interface BookingDataProps {
  booking: BookingType;
  refreshBookings: () => Promise<void>;
  variant?: "table" | "card" | "row";
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (value: string): string => {
  if (!value) return "";

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return value;

  return `${months[month - 1]} ${day}, ${year}`;
};

const shortTime = (value: string): string =>
  value ? value.replace(" AM", "").replace(" PM", "") : "";

const BookingData = ({
  booking,
  refreshBookings,
  variant = "table",
}: BookingDataProps) => {
  const {
    _id,
    name,
    estimatedTotal,
    bookingHours,
    end,
    start,
    date,
    productId,
  } = booking;

  console.log("This is booking data", booking.productId);

  const record = booking as BookingType & {
    image?: string;
    studioName?: string;
    studioTitle?: string;
  };

  const studioName = record.studioName ?? record.studioTitle ?? name;
  const studioImage = record.image;

  const cancelBooking = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}studio-book/${_id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        await refreshBookings();
        toast.success("Cancel Success");
      }
    } catch (error) {
      console.log(error);
      toast.error("Try again!");
    }
  };

  // Mobile / Card View
  if (variant === "card") {
    return (
      <div className="p-4 border-b border-[#ecefe8] space-y-3">
        <div className="flex items-center gap-3.5">
          {studioImage ? (
            <Image
              src={studioImage}
              width={48}
              height={48}
              alt={studioName}
              unoptimized
              className="h-12 w-12 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ecefe4] text-sm font-bold text-[#5c6052]">
              {studioName?.charAt(0).toUpperCase() || "S"}
            </span>
          )}

          <span className="font-bold text-[#1c1c1c] text-base">
            {studioName}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm text-[#4a5043]">
          <span>Date: {formatDate(date)}</span>

          <span>
            Time: {shortTime(start)}–{shortTime(end)}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-[#4a5043]">Duration: {bookingHours}h</span>

          <span className="font-extrabold text-[#1c1c1c]">
            ${estimatedTotal}
          </span>
        </div>

        <div className="flex items-center justify-end gap-4 text-[#1c1c1c] pt-2">
          <Link
            href={`/studio/${productId}`}
            className="font-bold hover:opacity-75 transition-opacity text-sm"
          >
            View
          </Link>

          <button
            onClick={cancelBooking}
            className="font-bold hover:opacity-75 transition-opacity cursor-pointer text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Desktop Table View
  return (
    <tr className="border-b border-[#ecefe8] hover:bg-stone-50/30 transition-colors">
      {/* Studio Name & Image */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3.5">
          {studioImage ? (
            <Image
              src={studioImage}
              width={48}
              height={48}
              alt={studioName}
              unoptimized
              className="h-12 w-12 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ecefe4] text-sm font-bold text-[#5c6052]">
              {studioName?.charAt(0).toUpperCase() || "S"}
            </span>
          )}

          <span className="font-bold text-[#1c1c1c] text-sm sm:text-base">
            {studioName}
          </span>
        </div>
      </td>

      {/* Date */}
      <td className="py-4 px-6 text-sm text-[#4a5043] font-medium">
        {formatDate(date)}
      </td>

      {/* Time */}
      <td className="py-4 px-6 text-sm text-[#4a5043] font-medium">
        {shortTime(start)}–{shortTime(end)}
      </td>

      {/* Duration */}
      <td className="py-4 px-6 text-sm text-[#4a5043] font-medium">
        {bookingHours}h
      </td>

      {/* Total */}
      <td className="py-4 px-6 font-extrabold text-[#1c1c1c] text-sm sm:text-base">
        ${estimatedTotal}
      </td>

      {/* Actions */}
      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-6 text-[#1c1c1c]">
          <Link
            href={`/studio/${productId}`}
            className="font-bold hover:opacity-75 transition-opacity"
          >
            View
          </Link>

          <button
            onClick={cancelBooking}
            className="font-bold hover:opacity-75 transition-opacity cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookingData;
