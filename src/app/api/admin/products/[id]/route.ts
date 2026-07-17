import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { ProductInput } from "@/lib/catalog";
import { deleteProduct, updateProduct } from "@/lib/products";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json().catch(() => null)) as ProductInput | null;
  if (!body?.name?.trim() || !body?.image?.trim() || body.price == null || !body.category) {
    return NextResponse.json(
      { error: "Name, price, category, and image are required" },
      { status: 400 },
    );
  }

  const result = await updateProduct(id, body);
  if (!result) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath(`/product/${result.product.slug}`);

  return NextResponse.json(result);
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const result = await deleteProduct(id);
  if (!result) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath("/shop");

  return NextResponse.json({ ok: true, persist: result.persist });
}
