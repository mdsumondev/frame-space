import { StudioType } from "@/Type/studioType";
import React, { Suspense } from "react";
import ProductsCard from "../ProductsCard";

const newestDataCall = async (): Promise<{
  status: number;
  message: string;
  data: StudioType[];
}> => {
  const res = await fetch("http://localhost:5000/neweststudios");
  return res.json();
};

const NewestFeatures = async () => {
  const newestStudios: StudioType[] = (await newestDataCall()).data;

  return (
    <div className="bg-[#FAF9F3] py-20">
      <div className="container mx-auto">
        <h5 className="text-xs font-semibold uppercase mb-1">NEW ARRIVALS</h5>
        <h2 className="text-3xl font-bold mb-4">Discover Our Newest Studios</h2>
        <p className="text-base mb-5 max-w-1/3 w-full">
          Be the first to explore our latest creative spaces. Discover newly
          listed photography studios, film stages, podcast lounges, and
          more—ready to bring your next big idea to life.
        </p>
        <div className=" container mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 [counter-reset:cat]">
          <Suspense
            fallback={
              <span className="loading loading-ring loading-2xl"></span>
            }
          >
            {newestStudios.map((newStudio) => (
              <ProductsCard key={newStudio._id} studio={newStudio} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default NewestFeatures;
