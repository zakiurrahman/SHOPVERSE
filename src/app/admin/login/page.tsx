"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { storeInfo } from "@/data/contact";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Wrong password. Try again.");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
        {storeInfo.brand} · Private
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
        Admin login
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        Only you can list products here. Shoppers cannot access this page.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 outline-none focus:border-[var(--forest)]"
            placeholder="Enter admin password"
            required
          />
        </div>

        {error && <p className="text-sm text-[var(--accent)]">{error}</p>}

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Checking..." : "Enter admin"}
        </button>
      </form>
    </div>
  );
}
