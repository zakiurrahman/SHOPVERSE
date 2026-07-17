"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactChannels, storeInfo } from "@/data/contact";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--band-bg)] text-[var(--band-fg)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
            {storeInfo.brand}
          </p>
          <p className="mt-3 max-w-sm text-[var(--band-soft)]">{storeInfo.tagline}</p>
          <p className="mt-6 text-sm text-[var(--band-muted)]">{storeInfo.hours}</p>
          <p className="text-sm text-[var(--band-muted)]">{storeInfo.location}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--band-muted)]">
            Explore
          </p>
          <ul className="mt-4 space-y-3">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-white transition-colors">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--band-muted)]">
            Reach us
          </p>
          <ul className="mt-4 space-y-3">
            {contactChannels.map((channel) => (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {channel.icon === "instagram" || channel.id.startsWith("instagram")
                    ? channel.handle
                    : channel.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--band-line)] px-5 py-5 text-center text-sm text-[var(--band-muted)] md:px-8">
        © {new Date().getFullYear()} {storeInfo.brand}. Style for every moment.
      </div>
    </footer>
  );
}
