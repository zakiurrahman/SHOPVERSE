"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search } from "lucide-react";
import { categories } from "@/data/products";

export function ShopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "featured";

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value || value === "all" || (key === "sort" && value === "featured") || (key === "search" && !value)) {
        if (key === "search" && !value) params.delete("search");
        else if (key === "category" && value === "all") params.delete("category");
        else if (key === "sort" && value === "featured") params.delete("sort");
        else params.set(key, value);
      } else {
        params.set(key, value);
      }

      startTransition(() => {
        router.push(`/shop?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  return (
    <div className={`space-y-5 ${pending ? "opacity-70" : ""} transition-opacity`}>
      <div className="relative max-w-md">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
        />
        <input
          type="search"
          defaultValue={search}
          placeholder="Search products..."
          onChange={(e) => update("search", e.target.value)}
          className="w-full border border-[var(--line)] bg-[var(--bg-elevated)] py-3 pl-10 pr-4 text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--forest)]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const active = category === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => update("category", cat.value)}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-[var(--ink)] text-[var(--on-ink)]"
                  : "border border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--ink)]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}

        <div className="ml-auto">
          <label className="sr-only" htmlFor="sort">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => update("sort", e.target.value)}
            className="border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-2 text-sm font-medium text-[var(--ink)] outline-none focus:border-[var(--forest)]"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price · Low to high</option>
            <option value="price-desc">Price · High to low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
