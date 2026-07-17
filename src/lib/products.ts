import { getCatalog, type ProductInput, normalizeProduct, saveCatalog } from "@/lib/catalog";
import type { Product, ProductCategory } from "@/data/products";

export type ProductFilters = {
  category?: ProductCategory | "all";
  search?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "rating";
};

export async function getAllProducts(): Promise<Product[]> {
  return getCatalog();
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getCatalog();
  return products.filter((p) => p.featured);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getCatalog();
  return products.find((p) => p.id === id || p.slug === id);
}

export async function getRelatedProducts(id: string, limit = 4): Promise<Product[]> {
  const products = await getCatalog();
  const current = products.find((p) => p.id === id || p.slug === id);
  if (!current) return products.slice(0, limit);

  return products
    .filter((p) => p.id !== current.id)
    .sort((a, b) => {
      const aSame = a.category === current.category ? 1 : 0;
      const bSame = b.category === current.category ? 1 : 0;
      return bSame - aSame;
    })
    .slice(0, limit);
}

export async function filterProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const { category = "all", search = "", sort = "featured" } = filters;
  const q = search.trim().toLowerCase();
  let list = await getCatalog();

  if (category !== "all") {
    list = list.filter((p) => p.category === category);
  }

  if (q) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.includes(q),
    );
  }

  switch (sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    default:
      list.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  return list;
}

export async function createProduct(input: ProductInput) {
  const products = await getCatalog();
  const product = normalizeProduct(input);
  if (products.some((p) => p.slug === product.slug)) {
    product.slug = `${product.slug}-${product.id}`;
  }
  products.unshift(product);
  const persist = await saveCatalog(products);
  return { product, persist };
}

export async function updateProduct(id: string, input: ProductInput) {
  const products = await getCatalog();
  const index = products.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return null;
  const product = normalizeProduct(input, products[index]);
  products[index] = product;
  const persist = await saveCatalog(products);
  return { product, persist };
}

export async function deleteProduct(id: string) {
  const products = await getCatalog();
  const next = products.filter((p) => p.id !== id && p.slug !== id);
  if (next.length === products.length) return null;
  const persist = await saveCatalog(next);
  return { persist };
}

export { formatPrice } from "@/lib/format";
