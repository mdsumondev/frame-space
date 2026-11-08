import React from "react";

const steps = [
  {
    number: "01",
    title: "Discover spaces",
    description: "Search by craft, city, and creative needs.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Select shoot hours",
    description: "Choose the exact date and time you need.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Book instantly",
    description: "Reserve securely with transparent pricing.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Create & produce",
    description: "Arrive, settle in, and make your vision real.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="9" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18"
        />
      </svg>
    ),
  },
];

const HowWork = () => {
  return (
    <section className="px-5 py-16 sm:px-8 lg:py-24" id="HowItWork">
      <div className="mx-auto container">
        {/* Heading */}
        <h5 className="text-xs font-semibold uppercase mb-1">
          Simple by design
        </h5>
        <h2 className="text-3xl font-bold mb-4">
          From search to studio in minutes.
        </h2>
        <p className="mt-4 text-sm text-stone-500 sm:text-base">
          Spend less time coordinating and more time creating.
        </p>

        {/* Steps card */}
        <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-stone-200/70 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`p-7 lg:p-8 ${
                i !== steps.length - 1
                  ? "border-b border-stone-200/70 lg:border-b-0"
                  : ""
              } ${i % 2 === 0 ? "sm:border-r sm:border-stone-200/70" : ""} ${
                i !== steps.length - 1
                  ? "lg:border-r lg:border-stone-200/70"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dde4cf] text-stone-800">
                  {step.icon}
                </span>
                <span className="text-4xl font-semibold text-stone-200 sm:text-5xl">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-8 text-lg text-stone-800 sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWork;
