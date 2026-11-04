import Image from "next/image";
import Link from "next/link";

import NewsLetterForm from "./NewsLetterForm";

const footerColumns = [
  {
    heading: "Marketplace",
    links: [
      { label: "Explore studios", href: "#explore" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Become a host", href: "#become-a-host" },
    ],
  },
  {
    heading: "Popular spaces",
    links: [
      { label: "Photo studios", href: "#explore" },
      { label: "Podcast lounges", href: "#explore" },
      { label: "Music suites", href: "#explore" },
    ],
  },
];

const socialLinks = [
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.75c0-.93.26-1.56 1.6-1.56h1.6V3.28c-.29-.04-1.26-.12-2.4-.12-2.37 0-4 1.44-4 4.1v2.44H7.6V13h2.7v8z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-base-300 bg-base-100">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-6 sm:px-6 lg:px-8">
        {/* Top: brand + link columns + newsletter */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="FrameSpace"
                width={40}
                height={40}
                className="h-9 w-auto sm:h-10"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-base-content/70">
              Exceptional spaces for extraordinary ideas. Discover studios
              built for the way you create.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="btn btn-circle btn-sm border-base-300 bg-base-100 text-base-content shadow-none hover:border-base-content hover:bg-base-100"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-sm font-medium text-base-content/80">
                {column.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-base-content/70 transition-colors hover:text-base-content"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-medium text-base-content/80">
              Stay Inspired
            </h3>
            <p className="mt-4 text-sm text-base-content/70">
              Monthly spaces, stories, and creative notes.
            </p>
            <div className="mt-5">
              <NewsLetterForm />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-base-300 pt-6 sm:flex-row">
          <p className="text-sm text-base-content/60">
            © 2026 FrameSpace, Inc.
          </p>
          <div className="flex items-center gap-2 text-sm text-base-content/60">
            <a href="#" className="transition-colors hover:text-base-content">
              Privacy
            </a>
            <span aria-hidden="true">·</span>
            <a href="#" className="transition-colors hover:text-base-content">
              Terms
            </a>
            <span aria-hidden="true">·</span>
            <a href="#" className="transition-colors hover:text-base-content">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
