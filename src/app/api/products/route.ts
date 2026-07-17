import { NextResponse } from "next/server";
import { filterProducts } from "@/lib/products";
import type { ProductCategory } from "@/data/products";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = (searchParams.get("category") as ProductCategory | "all") || "all";
  const search = searchParams.get("search") || "";
  const sort =
    (searchParams.get("sort") as "featured" | "price-asc" | "price-desc" | "rating") ||
    "featured";

  const data = await filterProducts({ category, search, sort });

  return NextResponse.json({ products: data, count: data.length });
}
