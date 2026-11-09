"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { User } from "better-auth";
import Link from "next/link";
import { signOut } from "better-auth/api";
import { handleLogOut } from "../(Authentication)/_components/LogOut";

export default function Prover({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-end p-6 bg-base-100">
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="flex items-center gap-2.5 px-3 py-1.5 border border-base-300 rounded-full bg-white shadow-sm hover:bg-base-100 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral"
        >
          <div className="avatar">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              {user?.image ? (
                <Image
                  src={user?.image || ""}
                  alt="Maya"
                  width={8}
                  height={8}
                  className="object-cover w-full h-full"
                />
              ) : (
                <p> {user?.name.charAt(1)} </p>
              )}
            </div>
          </div>

          <span className="font-semibold text-[15px] text-gray-800">
            {user?.name}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-3.5 h-3.5 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2.5 w-[280px] bg-white border border-gray-100 rounded-[18px] shadow-lg overflow-hidden z-50 animate-fade-in transition-all">
            <div className="flex items-center gap-3 p-4 border-b border-gray-100">
              <div className="avatar">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  {user?.image ? (
                    <Image
                      src={user?.image || ""}
                      alt="Maya"
                      width={8}
                      height={8}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <p> {user?.name.charAt(1)} </p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-[16px] text-gray-900 leading-tight">
                  {user?.name}
                </h4>
                <p className="text-[13px] text-gray-400 font-medium">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="py-2.5 px-1.5 flex flex-col gap-0.5">
              <Link href="/dashbord">
                <button className="flex items-center gap-3.5 w-full px-4 py-3 text-left font-medium text-[15px] text-gray-700 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-[18px] h-[18px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                    />
                  </svg>
                  Dashboard
                </button>
              </Link>

              {/* Add New Studio */}
              <Link href="/add-studio">
                <button className="flex items-center gap-3.5 w-full px-4 py-3 text-left font-medium text-[15px] text-gray-700 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-[18px] h-[18px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Add New Studio
                </button>
              </Link>

              {/* My Listings */}
              <Link href="/my-listings">
                <button className="flex items-center gap-3.5 w-full px-4 py-3 text-left font-medium text-[15px] text-gray-700 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-[18px] h-[18px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    />
                  </svg>
                  My Listings
                </button>
              </Link>

              {/* My Bookings */}
             <Link href="/my-booking"> 
             
               <button className="flex items-center gap-3.5 w-full px-4 py-3 text-left font-medium text-[15px] text-gray-700 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-[18px] h-[18px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.497c1.547-.225 2.665-1.582 2.665-3.13V8.2c0-1.547-1.118-2.905-2.665-3.13a48.555 48.555 0 0 0-14.54 0c-1.548.226-2.665 1.583-2.665 3.13v5.671Z"
                  />
                </svg>
                My Bookings
              </button>
             
             </Link>

              {/* Log out */}
              <button
                onClick={handleLogOut}
                className="flex items-center gap-3.5 w-full px-4 py-3 text-left font-medium text-[15px] text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-[18px] h-[18px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
