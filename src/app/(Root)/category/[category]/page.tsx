import { StudioType } from "@/Type/studioType";
import ProductsCard from "@/app/Componets/ProductsCard";
import React, { Suspense } from "react";

export async function generateStaticParams(): Promise<{ category: string }[]> {
  const categoryData = await fetch(`${process.env.API_BASE_URL}category`);

  const res = await categoryData.json();
  const categories = res.data;

  return (
    categories?.map((category: { title: string }) => ({
      category: category.title,
    })) || []
  );
}
// Params type for Next.js 15
interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

const CategoryWiseStudio = async ({ params }: PageProps) => {
  const { category } = await params;

  // 2. Data Fetching
  const res = await fetch(`${process.env.API_BASE_URL}category/${category}`, {
    next: {
      revalidate: 2000,
    },
  });

  const result = await res.json();
  const studioes: StudioType[] = result;

  return (
    <div className="container mx-auto py-20">
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

export default CategoryWiseStudio;
