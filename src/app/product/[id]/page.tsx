import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { getProductById, getRelatedProducts } from "@/lib/products";

type Params = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const related = await getRelatedProducts(product.id);

  return <ProductDetail product={product} related={related} />;
}
