import { NextResponse } from "next/server";
import { getProductById, getRelatedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const related = await getRelatedProducts(product.id);

  return NextResponse.json({ product, related });
}
