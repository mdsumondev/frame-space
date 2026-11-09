import { BookingForm } from "@/app/Componets/BookingForm";
import { StudioType } from "@/Type/studioType";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const studioesData = await fetch("http://localhost:5000/studios", {
    cache: "force-cache",
  });

  const res = await studioesData.json();
  const studioes = res.data;

  return (
    studioes?.map((studio: { _id: string }) => ({
      id: studio._id,
    })) || []
  );
}

// ----------------- single studio data load -------------------

const singleStudioData = async (id: string): Promise<StudioType> => {
  const res = await fetch(`http://localhost:5000/studios/${id}`);
  const payload = (await res.json()) as {
    status: number;
    message: string;
    data: StudioType;
  };
  return payload.data;
};

// ----------------- small shared pieces -------------------

const AMENITY_ICONS: { test: RegExp; d: string }[] = [
  {
    test: /light/,
    d: "M12 3v2M12 19v2M4.9 5.2l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 18.8l1.4-1.4M17.7 6.3l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z",
  },
  {
    test: /wifi|wi-fi/,
    d: "M8.5 16.5a5 5 0 017 0M5.6 13.2a9.4 9.4 0 0112.8 0M2.8 10a13.4 13.4 0 0118.4 0M12 20h.01",
  },
  {
    test: /dressing|changing|room/,
    d: "M12 12a4 4 0 100-8 4 4 0 000 8zm8 8a8 8 0 10-16 0",
  },
  {
    test: /sound|audio|speaker|music|studio/,
    d: "M9 9l10.5-3m0 6.5V6L9 9m0 11.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm10.5-2a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z",
  },
  {
    test: /water/,
    d: "M12 3.5c3.4 3.9 6 7.2 6 9.7a6 6 0 11-12 0c0-2.5 2.6-5.8 6-9.7z",
  },
  {
    test: /camera|backdrop|photo/,
    d: "M4 7.5h2.6L8.2 5h5.6l1.6 2.5H20V19H4V7.5zm8 9.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z",
  },
];

const amenityIconPath = (amenity: string): string =>
  AMENITY_ICONS.find(({ test }) => test.test(amenity.toLowerCase()))?.d ??
  "M12 3.8l1.7 4.5 4.5 1.7-4.5 1.7L12 16.2l-1.7-4.5L5.8 10l4.5-1.7L12 3.8z";

const AmenityIcon = ({ amenity }: { amenity: string }) => (
  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={amenityIconPath(amenity)}
      />
    </svg>
  </span>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className ?? "h-4 w-4"}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const PinIcon = () => (
  <svg
    className="h-4 w-4 shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);

const reviewsCount = 48;

// ----------------- studio detail content -------------------

const StudioContent = async ({
  idPromise,
}: {
  idPromise: Promise<{ id: string }>;
}) => {
  const { id } = await idPromise;
  const studio = await singleStudioData(id);
  const {
    title,
    category,
    hourlyRate,
    securityDeposit,
    location,
    image,
    amenities,
    overview,
    ownerName,
    ownerEmail,
  } = studio;

  const studioRating = (studio as { rating?: number }).rating;
  const ratingText =
    typeof studioRating === "number" ? studioRating.toFixed(1) : "4.9";
  const createdAt = (studio as { createdAt?: string }).createdAt;
  const ownerImage = (studio as { ownerImage?: string }).ownerImage;
  const extraImages = (studio as { images?: string[] }).images;

  const gallery = Array.from(
    new Set([...(extraImages ?? []), image].filter(Boolean)),
  );

  const overviewText = overview ?? "";
  const firstDot = overviewText.indexOf(". ");
  const lead =
    firstDot > 0 ? overviewText.slice(0, firstDot + 1) : overviewText;
  const body = firstDot > 0 ? overviewText.slice(firstDot + 2) : "";

  const rate = Number(hourlyRate) || 0;
  const deposit = Number(securityDeposit) || 0;

  const hostSince = createdAt
    ? `Hosting since ${new Date(createdAt).getFullYear()}`
    : "Verified host";
  const initial = ownerName?.[0]?.toUpperCase() ?? "S";

  const submitReview = async (formData: FormData) => {
    "use server";
    const backendRes = await fetch(
      `http://localhost:5000/studios/${id}/reviews`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          studioId: id,
          reviewer: formData.get("name"),
          rating: formData.get("rating"),
          comment: formData.get("comment"),
        }),
      },
    );
    console.log("Review post:", backendRes.status);
    redirect(`/studio/${id}`);
  };

  return (
    <div className="bg-[#faf9f3] text-stone-800">
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 md:py-10 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 sm:text-sm">
          <Link href="/" className="hover:text-stone-800">
            Home
          </Link>
          <span>/</span>
          <Link href="/studios" className="hover:text-stone-800">
            Studios
          </Link>
          <span>/</span>
          <span className="truncate font-medium text-stone-900">{title}</span>
        </nav>

        {/* Feature gallery */}
        <section className="mt-4">
          {gallery.length === 1 && (
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone-900">
              <Image
                src={gallery[0]}
                alt={title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          )}

          {gallery.length === 2 && (
            <div className="grid h-[280px] grid-cols-2 gap-3 overflow-hidden rounded-2xl sm:h-[360px] md:h-[440px]">
              {gallery.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative overflow-hidden rounded-2xl bg-stone-900"
                >
                  <Image
                    src={src}
                    alt={`${title} photo ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {gallery.length >= 3 && (
            <div className="flex h-[280px] gap-3 overflow-hidden rounded-2xl sm:h-[380px] md:h-[480px]">
              <div className="relative min-w-0 flex-[2] overflow-hidden rounded-2xl bg-stone-900">
                <Image
                  src={gallery[0]}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 66vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute bottom-4 right-4 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-stone-800 shadow-sm">
                  1/{gallery.length}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                {gallery.slice(1, 3).map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-stone-900"
                  >
                    <Image
                      src={src}
                      alt={`${title} photo ${i + 2}`}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Category pill + title + meta */}
        <div className="mt-8">
          <span className="inline-block rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-800 shadow-sm">
            {category}
          </span>

          <h1 className="mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">
            {title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
            <span className="flex items-center gap-1.5">
              <StarIcon className="h-4 w-4 text-amber-500" />
              <span className="font-semibold text-stone-900">{ratingText}</span>
              <span className="text-stone-500">({reviewsCount} reviews)</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone-500">
              <PinIcon />
              <span className="truncate">{location}</span>
            </span>
          </div>
        </div>

        <div className="mt-10 md:grid md:grid-cols-12 md:items-start md:gap-x-10">
          {/* Left Column: Overview, Amenities, Host & Reviews (Blank Space Resolved Here) */}
          <div className="space-y-10 md:col-span-7">
            {/* Overview */}
            <section className="space-y-5">
              {lead && (
                <p className="text-lg text-stone-600 sm:text-xl">{lead}</p>
              )}
              {body && (
                <p className="text-sm leading-relaxed text-stone-500 sm:text-base">
                  {body}
                </p>
              )}
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-xl font-medium text-stone-900">
                What this space offers
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {amenities?.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-2.5">
                    <AmenityIcon amenity={amenity} />
                    <span className="text-sm text-stone-700">{amenity}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Meet your host */}
            <section>
              <h2 className="text-xl font-medium text-stone-900">
                Meet your host
              </h2>
              <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 sm:items-center">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-emerald-100">
                  {ownerImage ? (
                    <Image
                      src={ownerImage}
                      alt={ownerName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-base font-semibold text-emerald-900">
                      {initial}
                    </span>
                  )}
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-stone-900">
                    {ownerName}
                  </p>
                  <p className="mt-0.5 text-xs text-stone-500">{hostSince}</p>
                  <p className="text-xs text-stone-500">
                    Typically responds within a day
                  </p>
                </div>

                <a
                  href={`mailto:${ownerEmail}`}
                  className="w-full rounded-full border border-stone-300 bg-white px-4 py-2 text-center text-sm font-medium text-stone-800 transition-colors hover:border-stone-500 sm:w-auto sm:text-left"
                >
                  Contact host
                </a>
              </div>
            </section>

            {/* Guest reviews */}
            <section>
              <h2 className="text-xl font-medium text-stone-900">
                Guest reviews
              </h2>

              <div className="mt-4 flex items-center gap-6 rounded-2xl border border-stone-200 bg-white p-4 sm:gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-stone-900">
                    {ratingText}
                  </p>
                  <StarIcon className="mx-auto mt-1 h-4 w-4 text-amber-500" />
                  <p className="mt-1 text-xs text-stone-500">Excellent</p>
                </div>

                <div className="flex-1 space-y-2">
                  {[
                    ["Cleanliness", 4.8],
                    ["Communication", 5.0],
                    ["Check-in", 4.9],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="w-24 text-xs text-stone-500">
                        {label}
                      </span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200">
                        <span
                          className="block h-full rounded-full bg-stone-800"
                          style={{ width: `${(Number(value) / 5) * 100}%` }}
                        />
                      </span>
                      <span className="w-7 text-right text-xs font-medium text-stone-900">
                        {Number(value).toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <figure className="mt-6">
                <blockquote className="text-base leading-relaxed text-stone-800 sm:text-lg">
                  &ldquo;Even more beautiful than the photos. Filled with
                  natural light, and the whole team vibe was
                  extraordinary!&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-xs text-stone-500">
                  — Elana, Wedding Photographer · March 2026
                </figcaption>
              </figure>
            </section>

            {/* Write a review */}
            <section className="rounded-2xl border border-stone-200 bg-white p-5 md:p-6">
              <h2 className="text-xl font-medium text-stone-900">
                Write a review
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                Share your experience hosting or creating in this space.
              </p>
              <form action={submitReview} className="mt-5 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="review-name"
                      className="text-xs font-medium text-stone-500"
                    >
                      Your name
                    </label>
                    <input
                      id="review-name"
                      name="name"
                      required
                      placeholder="Jane Cooper"
                      className="input input-bordered mt-1 w-full text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="review-rating"
                      className="text-xs font-medium text-stone-500"
                    >
                      Rating
                    </label>
                    <select
                      id="review-rating"
                      name="rating"
                      defaultValue="5"
                      className="select select-bordered mt-1 w-full text-sm"
                    >
                      <option value="5">5 — Excellent</option>
                      <option value="4">4 — Great</option>
                      <option value="3">3 — Good</option>
                      <option value="2">2 — Fair</option>
                      <option value="1">1 — Poor</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="review-comment"
                    className="text-xs font-medium text-stone-500"
                  >
                    Your review
                  </label>
                  <textarea
                    id="review-comment"
                    name="comment"
                    rows={4}
                    required
                    placeholder="Tell other creators about your session — the space, the light, the gear…"
                    className="textarea textarea-bordered mt-1 w-full text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="btn rounded-full border-none bg-[#2f3527] px-6 text-white hover:bg-[#3d4434]"
                >
                  Submit review
                </button>
              </form>
            </section>
          </div>

          {/* Right Column: Client Booking Form */}
          <BookingForm rate={rate} deposit={deposit} ratingText={ratingText} />
        </div>
      </main>
    </div>
  );
};

// ----------------- page -------------------

const StudioData = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense fallback={<span className="loading loading-ring loading-2xl" />}>
      <StudioContent idPromise={params} />
    </Suspense>
  );
};

export default StudioData;
