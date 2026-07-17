import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="border border-[var(--line)] bg-[var(--bg-elevated)] px-6 py-16 text-center">
        <p className="font-[family-name:var(--font-display)] text-xl font-semibold">
          No products match that filter
        </p>
        <p className="mt-2 text-[var(--muted)]">Try another category or clear your search.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
