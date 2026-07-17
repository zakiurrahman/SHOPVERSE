import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCatalog, persistenceMode, type ProductInput } from "@/lib/catalog";
import { createProduct } from "@/lib/products";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const products = await getCatalog();
  return NextResponse.json({ products, persistence: persistenceMode() });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as ProductInput | null;
  if (!body?.name?.trim() || !body?.image?.trim() || body.price == null || !body.category) {
    return NextResponse.json(
      { error: "Name, price, category, and image are required" },
      { status: 400 },
    );
  }

  if (Number.isNaN(Number(body.price)) || Number(body.price) < 0) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  const { product, persist } = await createProduct(body);
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath(`/product/${product.slug}`);

  return NextResponse.json({ product, persist }, { status: 201 });
}
