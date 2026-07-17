import { promises as fs } from "fs";
import path from "path";
import { seedProducts, type Product } from "@/data/products";

const CATALOG_KEY = "shopverse:products";

type GlobalCatalog = {
  products?: Product[];
};

function globalStore(): GlobalCatalog {
  const g = globalThis as typeof globalThis & { __shopverseCatalog?: GlobalCatalog };
  if (!g.__shopverseCatalog) g.__shopverseCatalog = {};
  return g.__shopverseCatalog;
}

function filePath() {
  // Local: persistent project file. On Vercel: /tmp (instance lifetime).
  if (process.env.VERCEL) {
    return path.join("/tmp", "shopverse-products.json");
  }
  return path.join(process.cwd(), "data", "products.json");
}

function hasRedis() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

export function persistenceMode(): "redis" | "file" | "memory" {
  if (hasRedis()) return "redis";
  if (!process.env.VERCEL) return "file";
  return "memory";
}

async function readFileCatalog(): Promise<Product[] | null> {
  try {
    const raw = await fs.readFile(filePath(), "utf8");
    const parsed = JSON.parse(raw) as Product[];
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    // missing / empty
  }
  return null;
}

async function writeFileCatalog(products: Product[]) {
  const target = filePath();
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, JSON.stringify(products, null, 2), "utf8");
}

async function readRedisCatalog(): Promise<Product[] | null> {
  const { Redis } = await import("@upstash/redis");
  const redis = Redis.fromEnv();
  const data = await redis.get<Product[]>(CATALOG_KEY);
  return Array.isArray(data) && data.length > 0 ? data : null;
}

async function writeRedisCatalog(products: Product[]) {
  const { Redis } = await import("@upstash/redis");
  const redis = Redis.fromEnv();
  await redis.set(CATALOG_KEY, products);
}

export async function getCatalog(): Promise<Product[]> {
  const store = globalStore();

  if (hasRedis()) {
    const fromRedis = await readRedisCatalog();
    if (fromRedis) {
      store.products = fromRedis;
      return structuredClone(fromRedis);
    }
  }

  if (store.products?.length) {
    return structuredClone(store.products);
  }

  const fromFile = await readFileCatalog();
  if (fromFile) {
    store.products = fromFile;
    return structuredClone(fromFile);
  }

  store.products = structuredClone(seedProducts);
  if (!process.env.VERCEL || hasRedis()) {
    await saveCatalog(store.products);
  }
  return structuredClone(store.products);
}

export async function saveCatalog(products: Product[]): Promise<{ mode: string }> {
  const store = globalStore();
  store.products = structuredClone(products);

  if (hasRedis()) {
    await writeRedisCatalog(products);
    return { mode: "redis" };
  }

  try {
    await writeFileCatalog(products);
    return { mode: process.env.VERCEL ? "memory+tmp" : "file" };
  } catch {
    return { mode: "memory" };
  }
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type ProductInput = {
  name: string;
  price: number;
  category: Product["category"];
  description: string;
  details?: string[] | string;
  colors?: string[] | string;
  image: string;
  gallery?: string[] | string;
  featured?: boolean;
  badge?: string;
  rating?: number;
  reviews?: number;
  slug?: string;
};

function toList(value: string[] | string | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => v.trim()).filter(Boolean);
  return value
    .split(/\n|,/)
    .map((v) => v.trim())
    .filter(Boolean);
}

export function normalizeProduct(
  input: ProductInput,
  existing?: Product,
): Product {
  const name = input.name.trim();
  const slug = (input.slug?.trim() || slugify(name) || `item-${Date.now()}`).toLowerCase();
  const image = input.image.trim();
  const gallery = toList(input.gallery);
  if (image && !gallery.includes(image)) gallery.unshift(image);

  return {
    id: existing?.id || `${Date.now()}`,
    slug,
    name,
    price: Number(input.price),
    category: input.category,
    rating: input.rating ?? existing?.rating ?? 5,
    reviews: input.reviews ?? existing?.reviews ?? 0,
    description: input.description.trim(),
    details: toList(input.details),
    colors: toList(input.colors),
    image,
    gallery: gallery.length ? gallery : [image],
    featured: Boolean(input.featured),
    badge: input.badge?.trim() || undefined,
  };
}
