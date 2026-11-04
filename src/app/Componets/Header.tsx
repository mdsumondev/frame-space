"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "#explore" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about" },
];

const Header = () => {
  const pathname = usePathname();

  // Active link: seeded from the current route, so it also works
  // for hash links (#explore, ...) that never change the pathname.
  const [activeHref, setActiveHref] = useState(pathname);

  // Theme: defaults to light, syncs with what the layout script applied.
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = document.documentElement.dataset.theme;
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  const linkClass = (href: string) => {
    const isActive = activeHref === href;

    return `rounded-lg px-3 pb-5 pt-2 text-sm transition-colors sm:text-base ${
      isActive
        ? "border-b-2 border-base-content font-semibold text-base-content"
        : "border-b-2 border-transparent text-base-content/60 hover:text-base-content"
    }`;
  };

  return (
    <header className="shadow-sm">
      <nav className="navbar mx-auto max-w-7xl bg-base-100 px-4 sm:px-6 lg:px-8">
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
                    className={
                      activeHref === link.href
                        ? "bg-base-200 font-semibold text-base-content"
                        : "hover:text-base-content"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-base-content/10 pt-2">
                <li>
                  <Link href="/sign-in" className="text-sm">
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-up"
                    className="btn btn-sm rounded-full border-none bg-[#2f3527] text-white hover:bg-[#3d4434]"
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

        {/* Navbar-end: theme toggle + auth buttons */}
        <div className="navbar-end gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="btn btn-circle btn-ghost border border-base-300 bg-base-100"
          >
            {theme === "light" ? (
              /* Moon — shown in light mode, click to go dark */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-base-content"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.14 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05Zm-9.5 6.69A8.14 8.14 0 0 1 7.08 5.22v.27a10.15 10.15 0 0 0 10.14 10.14 9.82 9.82 0 0 0 2.74-.4 8.11 8.11 0 0 1-7.82 4.46Z" />
              </svg>
            ) : (
              /* Sun — shown in dark mode, click to go light */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-base-content"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="4" />
                <path
                  strokeLinecap="round"
                  d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                />
              </svg>
            )}
          </button>

          <Link
            href="/sign-in"
            className="hidden text-sm font-medium text-base-content/80 transition-colors hover:text-base-content sm:block"
          >
            Log in
          </Link>

          <Link
            href="/sign-up"
            className="btn rounded-full border-none bg-[#2f3527] px-5 text-sm text-white shadow-none hover:bg-[#3d4434] sm:px-6"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
