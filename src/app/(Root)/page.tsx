import Image from "next/image";
import Hero from "../Componets/Home/Hero";
import { CategoryType } from "@/Type/Category";
import { Suspense } from "react";
import Category from "../Componets/Home/Category";
import NewestFeatures from "../Componets/Home/NewestSix";
import HowWork from "../Componets/Home/HowWork";

const categoryData = async (): Promise<CategoryType[]> => {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}category`, {
      next: {
        revalidate: 2000,
      },
    });

    if (!res.ok) return [];

    const payload = (await res.json()) as { data?: CategoryType[] };
    return payload?.data ?? [];
  } catch {
    return [];
  }
};

export default async function Home() {
  const categories = await categoryData();

  return (
    <div>
      <Hero />

      <section className="py-20 px-5 lg:px-0 bg-[#F7F8F5]">
        <div className="container mx-auto mb-5">
          <h5 className="text-xs font-semibold uppercase mb-1">
            Find your setting
          </h5>
          <h2 className="text-3xl font-bold mb-4">Explore collection</h2>
          <p className="text-base">
            Whatever your medium, there’s a space thoughtfully equipped for it.
          </p>
        </div>
        <div className=" container mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 [counter-reset:cat]">
          <Suspense
            fallback={
              <span className="loading loading-ring loading-2xl"></span>
            }
          >
            {categories.map((category) => (
              <Category key={category._id} category={category} />
            ))}
          </Suspense>
        </div>
      </section>
      <NewestFeatures />
      <HowWork />
    </div>
  );
}
