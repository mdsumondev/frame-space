"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Prover from "./Prover";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#HowItWork" },
  { label: "About Us", href: "/about-us" },
];

const Header = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const pathname = usePathname();

  // Active link: seeded from the current route, so it also works
  // for hash links (#explore, ...) that never change the pathname.
  const [activeHref, setActiveHref] = useState(pathname);

  // Theme state: default to 'light' or load from localStorage
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const linkClass = (href: string) => {
    const isActive = activeHref === href;

    return `px-3 py-2 text-sm transition-colors sm:text-base hover:bg-transparent focus:bg-transparent ${
      isActive
        ? "border-b-2 border-[#1F2D22] font-semibold text-[#1F2D22] dark:border-emerald-400 dark:text-emerald-400"
        : "border-b-2 border-transparent text-base-content/60 hover:text-base-content"
    }`;
  };

  return (
    <header className="shadow-sm">
      <nav className="navbar container mx-auto bg-base-100 px-4 sm:px-6 lg:px-8">
        {/* Navbar-start: mobile menu + logo */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
              <svg
                aria-label="Open menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu dropdown-content rounded-box z-50 mt-2 w-52 border border-base-content/10 bg-base-100 p-2 font-medium text-base-content/70 shadow"
            >
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setActiveHref(link.href)}
                    className={`py-1.5 hover:bg-transparent focus:bg-transparent ${
                      activeHref === link.href
                        ? "font-semibold text-base-content"
                        : "hover:text-[#1F2D22]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-base-content/10 pt-2">
                <li>
                  <Link
                    href="/sign-in"
                    className="text-sm hover:bg-transparent focus:bg-transparent"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-up"
                    className="btn btn-sm rounded-full border-none bg-[#1F2D22] text-white hover:bg-[#354739]"
                  >
                    Register
                  </Link>
                </li>
              </div>
            </ul>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="FrameSpace"
              width={118}
              height={40}
              className="h-8 w-auto sm:h-10"
              priority
            />
          </Link>
        </div>

        {/* Navbar-center: desktop links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1 font-medium">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setActiveHref(link.href)}
                  className={linkClass(link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navbar-end: theme toggle + auth state */}
        <div className="navbar-end gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="btn btn-ghost btn-circle btn-sm text-base-content"
          >
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>

          {/* Dynamic Auth Section */}
          {isPending ? (
            <div className="flex items-center justify-center px-4">
              <span className="loading loading-spinner loading-sm text-[#1F2D22]"></span>
            </div>
          ) : user ? (
            <Prover user={user} />
          ) : (
            <>
              <Link
                href="/sign-in"
                className="hidden text-sm font-medium text-base-content/80 transition-colors hover:text-base-content sm:block"
              >
                Log in
              </Link>

              <Link
                href="/sign-up"
                className="btn rounded-full border-none bg-[#1F2D22] px-5 text-sm text-white shadow-none hover:bg-[#354739] sm:px-6"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
