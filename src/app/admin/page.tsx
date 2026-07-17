"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2, LogOut } from "lucide-react";
import { categories, type Product, type ProductCategory } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { storeInfo } from "@/data/contact";

type FormState = {
  name: string;
  price: string;
  category: ProductCategory;
  description: string;
  details: string;
  colors: string;
  image: string;
  gallery: string;
  featured: boolean;
  badge: string;
};

const emptyForm: FormState = {
  name: "",
  price: "",
  category: "handbags",
  description: "",
  details: "",
  colors: "",
  image: "",
  gallery: "",
  featured: true,
  badge: "",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [persistence, setPersistence] = useState("file");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const me = await fetch("/api/admin/me");
    if (!me.ok) {
      router.replace("/admin/login");
      return;
    }
    const meData = await me.json();
    setPersistence(meData.persistence || "file");

    const res = await fetch("/api/admin/products");
    if (!res.ok) {
      router.replace("/admin/login");
      return;
    }
    const data = await res.json();
    setProducts(data.products || []);
    setPersistence(data.persistence || meData.persistence || "file");
    setLoading(false);
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const categoryOptions = useMemo(
    () => categories.filter((c) => c.value !== "all") as { value: ProductCategory; label: string }[],
    [],
  );

  function fillForm(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      category: product.category,
      description: product.description,
      details: product.details.join("\n"),
      colors: product.colors.join(", "),
      image: product.image,
      gallery: product.gallery.join("\n"),
      featured: Boolean(product.featured),
      badge: product.badge || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this product from the shop?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Could not delete product");
      return;
    }
    setMessage("Product deleted");
    if (editingId === id) resetForm();
    await load();
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const payload = {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      description: form.description,
      details: form.details,
      colors: form.colors,
      image: form.image,
      gallery: form.gallery,
      featured: form.featured,
      badge: form.badge,
    };

    const res = await fetch(
      editingId ? `/api/admin/products/${editingId}` : "/api/admin/products",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not save product");
      return;
    }

    setMessage(editingId ? "Product updated" : "Product listed in the shop");
    resetForm();
    await load();
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 text-[var(--muted)] md:px-8">
        Loading admin…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            {storeInfo.brand} · Admin only
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
            List products
          </h1>
          <p className="mt-2 max-w-xl text-[var(--muted)]">
            Add handbags, suits, clothing, footwear, and accessories. Public visitors only see the
            shop — not this page.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/shop" className="btn-ghost text-sm">
            View shop
          </Link>
          <button type="button" onClick={onLogout} className="btn-ghost text-sm">
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </div>

      {persistence === "memory" && (
        <div className="mt-6 border border-[var(--warm)] bg-[color-mix(in_srgb,var(--warm)_18%,white)] px-4 py-3 text-sm text-[var(--ink)]">
          Running on Vercel without Redis — saves may reset after sleep. For permanent free storage,
          add Upstash Redis env vars (see README), or list products while running locally (
          <code className="font-semibold">npm run dev</code>).
        </div>
      )}

      {(message || error) && (
        <p className={`mt-4 text-sm ${error ? "text-[var(--accent)]" : "text-[var(--forest)]"}`}>
          {error || message}
        </p>
      )}

      <form
        onSubmit={onSubmit}
        className="mt-8 grid gap-4 border border-[var(--line)] bg-[var(--bg-elevated)] p-5 md:grid-cols-2 md:p-8"
      >
        <div className="md:col-span-2 flex items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
            {editingId ? "Edit product" : "Add new product"}
          </h2>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-sm font-semibold text-[var(--muted)]">
              Cancel edit
            </button>
          )}
        </div>

        <label className="block text-sm">
          <span className="font-semibold">Name *</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-2 w-full border border-[var(--line)] bg-[var(--input-bg)] px-3 py-2.5 outline-none focus:border-[var(--forest)]"
            placeholder="Velvet Tote Bag"
          />
        </label>

        <label className="block text-sm">
          <span className="font-semibold">Price (USD) *</span>
          <input
            required
            type="number"
            min="0"
            step="1"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            className="mt-2 w-full border border-[var(--line)] bg-[var(--input-bg)] px-3 py-2.5 outline-none focus:border-[var(--forest)]"
            placeholder="120"
          />
        </label>

        <label className="block text-sm">
          <span className="font-semibold">Category *</span>
          <select
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value as ProductCategory }))
            }
            className="mt-2 w-full border border-[var(--line)] bg-[var(--input-bg)] px-3 py-2.5 outline-none focus:border-[var(--forest)]"
          >
            {categoryOptions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="font-semibold">Badge (optional)</span>
          <input
            value={form.badge}
            onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
            className="mt-2 w-full border border-[var(--line)] bg-[var(--input-bg)] px-3 py-2.5 outline-none focus:border-[var(--forest)]"
            placeholder="New, Bestseller…"
          />
        </label>

        <label className="block text-sm md:col-span-2">
          <span className="font-semibold">Image URL *</span>
          <input
            required
            value={form.image}
            onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
            className="mt-2 w-full border border-[var(--line)] bg-[var(--input-bg)] px-3 py-2.5 outline-none focus:border-[var(--forest)]"
            placeholder="https://… or /products/my-photo.jpg"
          />
        </label>

        <label className="block text-sm md:col-span-2">
          <span className="font-semibold">Description *</span>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="mt-2 w-full border border-[var(--line)] bg-[var(--input-bg)] px-3 py-2.5 outline-none focus:border-[var(--forest)]"
            placeholder="Short product description for shoppers"
          />
        </label>

        <label className="block text-sm">
          <span className="font-semibold">Details (one per line)</span>
          <textarea
            rows={4}
            value={form.details}
            onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
            className="mt-2 w-full border border-[var(--line)] bg-[var(--input-bg)] px-3 py-2.5 outline-none focus:border-[var(--forest)]"
            placeholder={"Wool blend\nFully lined\nStandard sizes"}
          />
        </label>

        <label className="block text-sm">
          <span className="font-semibold">Colors (comma separated)</span>
          <textarea
            rows={4}
            value={form.colors}
            onChange={(e) => setForm((f) => ({ ...f, colors: e.target.value }))}
            className="mt-2 w-full border border-[var(--line)] bg-[var(--input-bg)] px-3 py-2.5 outline-none focus:border-[var(--forest)]"
            placeholder="Black, Navy, Camel"
          />
        </label>

        <label className="block text-sm md:col-span-2">
          <span className="font-semibold">Extra gallery URLs (one per line)</span>
          <textarea
            rows={2}
            value={form.gallery}
            onChange={(e) => setForm((f) => ({ ...f, gallery: e.target.value }))}
            className="mt-2 w-full border border-[var(--line)] bg-[var(--input-bg)] px-3 py-2.5 outline-none focus:border-[var(--forest)]"
            placeholder="Optional extra photos"
          />
        </label>

        <label className="flex items-center gap-2 text-sm font-semibold md:col-span-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
          />
          Show on home page (featured)
        </label>

        <div className="md:col-span-2">
          <button type="submit" className="btn-accent" disabled={saving}>
            {editingId ? <Pencil size={16} /> : <Plus size={16} />}
            {saving ? "Saving…" : editingId ? "Update product" : "List product"}
          </button>
        </div>
      </form>

      <section className="mt-14">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
          Current listings ({products.length})
        </h2>
        <div className="mt-6 divide-y divide-[var(--line)] border border-[var(--line)] bg-[var(--bg-elevated)]">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex gap-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[var(--bg)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                    {product.category}
                    {product.featured ? " · featured" : ""}
                  </p>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-[var(--forest)]">{formatPrice(product.price)}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fillForm(product)}
                  className="btn-ghost text-sm"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(product.id)}
                  className="inline-flex items-center gap-2 border border-[var(--accent)] px-3 py-2 text-sm font-semibold text-[var(--accent)]"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
