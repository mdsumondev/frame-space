"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "#HowItWork" },
  { label: "About Us", href: "/about-us" },
];

const Header = () => {
  const pathname = usePathname();

  // Active link: seeded from the current route, so it also works
  // for hash links (#explore, ...) that never change the pathname.
  const [activeHref, setActiveHref] = useState(pathname);

  const linkClass = (href: string) => {
    const isActive = activeHref === href;

    return `px-3 py-2 text-sm transition-colors sm:text-base hover:bg-transparent focus:bg-transparent ${
      isActive
        ? "border-b-2 border-[#1F2D22] font-semibold text-[#1F2D22]"
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

        {/* Navbar-end: auth buttons */}
        <div className="navbar-end gap-2 sm:gap-3">
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
