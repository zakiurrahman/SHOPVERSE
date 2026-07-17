import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-start justify-center px-5 pt-24 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">404</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 text-[var(--muted)]">That route doesn&apos;t exist — head back to the shop.</p>
      <Link href="/shop" className="btn-primary mt-8">
        Browse shop
      </Link>
    </div>
  );
}
