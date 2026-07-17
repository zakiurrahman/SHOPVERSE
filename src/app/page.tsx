import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { FloatingIcons } from "@/components/FloatingIcons";
import { ParallaxSection, Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { getFeaturedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = (await getFeaturedProducts()).slice(0, 8);

  return (
    <>
      <Hero />

      <section id="featured" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                New season
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
                Featured picks
              </h2>
              <p className="mt-2 max-w-md text-[var(--muted)]">
                Bags, suits, clothing & more — browse the full shop or message us for size & stock.
              </p>
            </div>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--forest)] underline-offset-4 hover:underline"
            >
              View all
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        <ProductGrid products={featured} />
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--band-bg)] text-[var(--band-fg)]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <Stagger className="grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Message to order",
                body: "No cart clutter — reach us on WhatsApp or Instagram and we handle sizing & delivery.",
              },
              {
                title: "Everything in one shop",
                body: "Handbags, three-piece suits, clothing, footwear, and accessories — one place to browse it all.",
              },
              {
                title: "Real replies",
                body: "Ask about colors, sizes, or availability. We respond personally — same day when possible.",
              },
            ].map((item, i) => (
              <StaggerItem key={item.title}>
                <div className="group rounded-xl border border-[var(--band-line)] p-6 transition-all duration-500 hover:border-[var(--band-soft)] hover:bg-white/[0.04]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--band-muted)]">
                    0{i + 1}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold transition-transform duration-300 group-hover:translate-x-1">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[var(--band-soft)] leading-relaxed">{item.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mesh-bg noise relative overflow-hidden">
        <FloatingIcons density="section" />
        <ParallaxSection className="relative z-[2] mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
              Found something you love?
            </p>
            <p className="mt-4 max-w-lg text-lg text-[var(--ink-soft)]">
              Browse the shop, then ping us on WhatsApp or Instagram — we&apos;ll sort size, stock, and delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary">
                Open shop
              </Link>
              <Link href="/contact" className="btn-accent">
                Contact us
              </Link>
            </div>
          </Reveal>
        </ParallaxSection>
      </section>
    </>
  );
}
