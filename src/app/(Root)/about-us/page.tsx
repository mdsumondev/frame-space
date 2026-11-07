import Image from "next/image";
import Link from "next/link";
import React from "react";

const stats = [
  { value: "12K+", label: "Creative bookings" },
  { value: "48", label: "Cities and growing" },
  { value: "2,400", label: "Remarkable spaces" },
  { value: "4.9/5", label: "Average rating" },
];

const audienceCards = [
  {
    title: "For creators",
    description: "Prospective spaces without long-term overhead.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
        <circle cx="12" cy="13" r="3.5" />
      </svg>
    ),
  },
  {
    title: "For hosts",
    description: "Flexible income and a thriving creative community.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />
      </svg>
    ),
  },
];

const values = [
  {
    number: "01",
    title: "Access over exclusivity",
    description:
      "Great spaces and serious tools should be available to every creator.",
  },
  {
    number: "02",
    title: "Trust is designed",
    description:
      "Clear standards and human support create confidence on both sides.",
  },
  {
    number: "03",
    title: "Local makes culture",
    description: "Independent studios are essential creative infrastructure.",
  },
  {
    number: "04",
    title: "Details shape experience",
    description: "Thoughtful products get out of the way of the work.",
  },
];

const AboutUsPage = () => {
  return (
    <main className="bg-base-200 text-base-content">
      {/* Our story hero */}
      <section className="grid grid-cols-1 bg-[#1f2d22] text-white lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-16 sm:px-12 sm:py-24 lg:px-16 lg:py-32">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
            Our story
          </p>
          <h1 className="mt-6 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl lg:text-6xl">
            A better space for
            <br />
            every creative idea.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
            We believe the right room can change the shape of an idea.
            StudioSpace makes exceptional creative environments accessible to
            everyone.
          </p>
        </div>
        <div className="relative min-h-72 sm:min-h-80 lg:min-h-[560px]">
          <Image
            src="https://images.unsplash.com/photo-1563330232-57114bb0823c"
            alt="Artist painting at an easel in a bright studio"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-base-content/10">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-y-10 py-12 sm:py-16 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center gap-2 px-3 text-center lg:border-l lg:border-base-content/10 ${
                  i === 0 ? "lg:border-l-0" : ""
                }`}
              >
                <span className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {stat.value}
                </span>
                <span className="text-xs text-base-content/60 sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for both sides */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-base-300 sm:aspect-[4/3] lg:aspect-[5/6]">
              <Image
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80"
                alt="Studio microphone and headphones in a podcast studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase">
                Built for both sides
              </p>
              <h2 className="mt-5 text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
                Creators find possibility. Hosts build something lasting.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-base-content/70 sm:text-base">
                Every StudioSpace booking is an exchange of trust, expertise,
                and creative energy. Our tools keep it simple, safe, and
                rewarding for everyone involved.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {audienceCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-xl border border-base-content/10 bg-base-100 p-5 transition-shadow hover:shadow-md"
                  >
                    <span className="text-primary">{card.icon}</span>
                    <h3 className="mt-6 text-sm font-semibold">{card.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-base-content/60 sm:text-sm">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What guides us */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase">
            What guides us
          </p>
          <h2 className="mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-5xl">
            Our values,
            <br />
            in practice.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {values.map((value) => (
              <div
                key={value.number}
                className="border-t border-base-content/20 pt-5"
              >
                <span className="text-xs text-base-content/50">
                  {value.number}
                </span>
                <h3 className="mt-8 text-base font-medium sm:text-lg">
                  {value.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-base-content/60 sm:text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the community */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid overflow-hidden rounded-2xl bg-[#1f2d22] text-white lg:min-h-[380px] lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
              <p className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
                Join the community
              </p>
              <h2 className="mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-[2.75rem]">
                A space this good should be shared.
              </h2>
              <Link
                href="/sign-up"
                className="btn mt-7 w-fit items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black shadow-none hover:bg-white/90"
              >
                Become a host
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="relative min-h-64 lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1664817550969-5e76adc4a3fe"
                alt="Bright creative studio filled with art supplies and easels"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
