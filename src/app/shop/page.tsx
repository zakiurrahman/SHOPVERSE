import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopFilters } from "@/components/ShopFilters";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Motion";
import { filterProducts } from "@/lib/products";
import type { ProductCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse handbags, suits, clothing, footwear & accessories.",
};

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  category?: string;
  search?: string;
  sort?: string;
}>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const category = (params.category as ProductCategory | "all") || "all";
  const search = params.search || "";
  const sort =
    (params.sort as "featured" | "price-asc" | "price-desc" | "rating") || "featured";

  const products = await filterProducts({ category, search, sort });

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Collection
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
          Shop all
        </h1>
        <p className="mt-3 max-w-xl text-[var(--muted)]">
          Filter by category, search by name, then message us to lock in your size.
        </p>
      </Reveal>

      <div className="mt-10">
        <Suspense
          fallback={
            <div className="h-24 animate-pulse border border-[var(--line)] bg-[var(--bg-elevated)]" />
          }
        >
          <ShopFilters />
        </Suspense>
      </div>

      <p className="mt-8 text-sm text-[var(--muted)]">
        {products.length} {products.length === 1 ? "product" : "products"}
      </p>

      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
