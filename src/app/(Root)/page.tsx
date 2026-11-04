import Image from "next/image";
import Hero from "../Componets/Home/Hero";
import { CategoryType } from "@/Type/Category";
import { Suspense } from "react";
import Category from "../Componets/Home/Category";

const categoryData = async (): Promise<{
  status: number;
  message: string;
  data: CategoryType[];
}> => {
  const res = await fetch("http://localhost:5000/category", {
    next: {
      revalidate: 2000,
    },
  });

  return res.json();
};

export default async function Home() {
  const categoriesResponse = await categoryData();

  const categories = categoriesResponse.data;

  console.log(categories);

  return (
    <div>
      <Hero />

      <section className="py-20 bg-[#F7F8F5]">
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
    </div>
  );
}
