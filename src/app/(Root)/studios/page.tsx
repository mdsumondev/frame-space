import ProductsCard from "@/app/Componets/ProductsCard";
import { StudioType } from "@/Type/studioType";
import React, { Suspense } from "react";

// 1. Fixed return type signature and added await for res.json()
const fetchStudiosData = async (): Promise<StudioType[]> => {
  const res = await fetch(`${process.env.API_BASE_URL}studios`);
  const result: { status: number; message: string; data: StudioType[] } =
    await res.json();
  return result.data;
};

const StudiosPage = async () => {
  const studios = await fetchStudiosData();

  return (
    <div>
      <div className="container mx-auto py-20">
        <h1 className="text-3xl font-bold mb-2">All Studios</h1>
        <p className="text-base mb-5">
          Total {studios.length} studios available
        </p>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
          <Suspense
            fallback={
              <span className="loading loading-ring loading-2xl"></span>
            }
          >
            {studios.map((studio) => (
              <ProductsCard key={studio._id} studio={studio} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default StudiosPage;
