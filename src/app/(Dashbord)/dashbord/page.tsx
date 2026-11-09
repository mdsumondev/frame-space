"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import React from "react";

const stats = [
  {
    label: "Studio listings",
    value: "3",
    footer: "+1 this month",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
        />
      </svg>
    ),
  },
  {
    label: "Total bookings",
    value: "24",
    footer: "+8 this month",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
        />
      </svg>
    ),
  },
  {
    label: "Pending requests",
    value: "5",
    footer: "Needs attention",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    label: "Confirmed",
    value: "19",
    footer: "79% acceptance",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.2}
        stroke="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    ),
  },
];

const bookings = [
  {
    title: "The Willow Daylight Loft",
    meta: "Olivia Park · Mar 22 · 10:00–14:00",
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=160&q=80",
  },
  {
    title: "Juniper Sound Suite",
    meta: "Eli Morgan · Mar 24 · 09:00–12:00",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb7f051154?auto=format&fit=crop&w=160&q=80",
  },
  {
    title: "The Parlour Podcast Room",
    meta: "Sofia James · Mar 28 · 13:00–15:00",
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=160&q=80",
  },
];

const quickActions = [
  {
    title: "List a new studio",
    subtitle: "Share another creative space",
    href: "/add-studio",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  {
    title: "Manage availability",
    subtitle: "Update your open dates",
    href: "/my-listings",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
        />
      </svg>
    ),
  },
  {
    title: "Edit profile",
    subtitle: "Keep your host details fresh",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.99l1.005.828c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a7.723 7.723 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
];

const badgeClass = (status: string) =>
  status === "Pending"
    ? "badge bg-amber-100 text-amber-800 border-0 font-medium"
    : "badge bg-[#1F2D22]/10 text-[#1F2D22] border-0 font-medium";

const Dashbord = () => {
  const { data: session } = useSession();
  const name = session?.user?.name ?? "Maya";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen w-full bg-[#f4f5f0]">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        {/* Header row */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              {today}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
              Welcome back, {name}.
            </h1>
            <p className="mt-2 text-sm text-stone-500 sm:text-base">
              Here&apos;s what&apos;s happening with your creative spaces.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="btn inline-flex h-12 shrink-0 items-center gap-2 rounded-full border-0 bg-[#1F2D22] px-6 text-sm font-semibold text-white shadow-none hover:bg-[#354739]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new studio
          </Link>
        </div>

        {/* Stat cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1F2D22]/10 text-[#1F2D22]">
                  {stat.icon}
                </span>
                <span className="text-sm font-medium text-stone-600">{stat.label}</span>
              </div>
              <p className="mt-5 text-4xl font-bold tracking-tight text-stone-900">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-stone-500">{stat.footer}</p>
            </div>
          ))}
        </div>

        {/* Activity + quick actions */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Recent booking activity */}
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-stone-900 sm:text-xl">
                  Recent booking activity
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Your latest reservations and requests
                </p>
              </div>
              <Link
                href="/my-listings"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-stone-700 hover:text-[#1F2D22]"
              >
                View all
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <ul className="mt-5 divide-y divide-stone-100">
              {bookings.map((booking) => (
                <li
                  key={booking.title}
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg sm:h-14 sm:w-20">
                    <Image
                      src={booking.image}
                      alt={booking.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-stone-900 sm:text-base">
                      {booking.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-stone-500 sm:text-sm">
                      {booking.meta}
                    </p>
                  </div>
                  <span className={`badge badge-sm shrink-0 sm:badge-md ${badgeClass(booking.status)}`}>
                    {booking.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-stone-900 sm:text-xl">Quick actions</h2>
            <p className="mt-1 text-sm text-stone-500">Manage your studio business</p>

            <ul className="mt-5">
              {quickActions.map((action) => (
                <li key={action.title}>
                  <Link
                    href={action.href}
                    className="group -mx-2 flex items-center gap-3.5 rounded-xl px-2 py-3.5 transition-colors hover:bg-[#f4f5f0]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1F2D22]/10 text-[#1F2D22]">
                      {action.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-stone-900">
                        {action.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-stone-500">
                        {action.subtitle}
                      </span>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4 shrink-0 text-stone-700 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <div className="border-t border-stone-200 last:border-0" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
