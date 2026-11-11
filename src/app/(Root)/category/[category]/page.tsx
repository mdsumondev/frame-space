import { StudioType } from "@/Type/studioType";
import ProductsCard from "@/app/Componets/ProductsCard";
import React, { Suspense } from "react";

// Params type for Next.js 15
interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

// 2. Data Fetching
const fetchCategoryStudios = async (
  category: string,
): Promise<StudioType[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}category/${category}`,
      {
        next: {
          revalidate: 2000,
        },
      },
    );

    if (!res.ok) return null;

    const result = await res.json();

    return Array.isArray(result) ? result : (result?.data ?? null);
  } catch {
    return null;
  }
};

const CategoryContent = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const studioes = await fetchCategoryStudios(category);

  if (!studioes?.length) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold mb-3">{category} studios</h1>
        <p className="text-base text-stone-500">
          No studios are available in this category right now.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-5 lg:px-0">
      <div>
        <div className="mb-5">
          <h1 className="text-4xl font-bold mb-3">
            {studioes[0].category} category studio
          </h1>
          <p className="text-base">Total {studioes.length} studio available</p>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
          <Suspense
            fallback={
              <span className="loading loading-ring loading-2xl"></span>
            }
          >
            {studioes.map((studio) => (
              <ProductsCard key={studio._id} studio={studio} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default function CategoryWiseStudio({ params }: PageProps) {
  return (
    <Suspense
      fallback={<span className="loading loading-ring loading-2xl"></span>}
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
