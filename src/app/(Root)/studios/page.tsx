import ProductsCard from "@/app/Componets/ProductsCard";
import { StudioType } from "@/Type/studioType";
import React, { Suspense } from "react";

// 1. Fixed return type signature and added await for res.json()
const fetchStudiosData = async (): Promise<StudioType[]> => {
  const res = await fetch("http://localhost:5000/studios");
  const result: { status: number; message: string; data: StudioType[] } =
    await res.json();
  return result.data;
};

// 2. Separate async component so Suspense fallback works as intended
const StudiosList = async () => {
  const studios = await fetchStudiosData();

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
    <div>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
          {/* 3. Clean JSX syntax inside Suspense */}
          <Suspense
            fallback={
              <span className="loading loading-ring loading-2xl"></span>
            }
          >
            <StudiosList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default StudiosPage;
