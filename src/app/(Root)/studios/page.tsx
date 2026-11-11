import ProductsCard from "@/app/Componets/ProductsCard";
import { StudioType } from "@/Type/studioType";
import React, { Suspense } from "react";

const fetchStudiosData = async (): Promise<StudioType[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
    return [];
  }

  const url = `${baseUrl.replace(/\/+$/, "")}/studios`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to fetch studios. Status: ${res.status}`);
      return [];
    }

    const result: {
      status: number;
      message: string;
      data: StudioType[];
    } = await res.json();

    return result.data ?? [];
  } catch (error) {
    console.error("Error fetching studios:", error);
    return [];
  }
};

const StudioList = async () => {
  const studios = await fetchStudiosData();

  if (studios.length === 0) {
    return (
      <p className="text-gray-500 col-span-full text-center py-10">
        No studios available at the moment.
      </p>
    );
  }

  return (
    <>
      {studios.map((studio) => (
        <ProductsCard key={studio._id} studio={studio} />
      ))}
    </>
  );
};

const StudiosPage = () => {
  return (
    <div className="container mx-auto py-20 px-5 lg:px-0">
      <h1 className="text-3xl font-bold mb-2">All Studios</h1>

      <p className="text-base mb-5">Explore our available studio spaces</p>

      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
        <Suspense
          fallback={
            <div className="flex justify-center items-center col-span-full py-10">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          }
        >
          <StudioList />
        </Suspense>
      </div>
    </div>
  );
};

export default StudiosPage;
