"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AtSign, MessageCircle, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { contactChannels, instagramChannels } from "@/data/contact";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Motion";

type Props = {
  product: Product;
  related: Product[];
};

export function ProductDetail({ product, related }: Props) {
  const [activeImage, setActiveImage] = useState(product.gallery[0] || product.image);
  const whatsapp = contactChannels.find((c) => c.id === "whatsapp");
  const primaryInstagram = instagramChannels[0];

  const inquireMessage = encodeURIComponent(
    `Hi! I'm interested in ${product.name} (${formatPrice(product.price)}). Is it available?`,
  );
  const whatsappHref = whatsapp
    ? `${whatsapp.href}${whatsapp.href.includes("?") ? "&" : "?"}text=${inquireMessage}`
    : "/contact";

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden bg-[var(--bg-elevated)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <ProductImage
                    src={activeImage}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {product.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.gallery.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(src)}
                    className={`relative aspect-square overflow-hidden border transition-colors ${
                      activeImage === src
                        ? "border-[var(--ink)]"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <ProductImage src={src} alt="" fill sizes="120px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {product.category}
              {product.badge ? ` · ${product.badge}` : ""}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--ink-soft)]">
              <Star size={16} className="fill-[var(--warm)] text-[var(--warm)]" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-[var(--muted)]">· {product.reviews} reviews</span>
            </div>

            <p className="mt-5 text-3xl font-semibold text-[var(--forest)]">
              {formatPrice(product.price)}
            </p>

            <p className="mt-6 max-w-lg leading-relaxed text-[var(--ink-soft)]">
              {product.description}
            </p>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                Colors
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--ink-soft)]"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            <ul className="mt-6 space-y-2">
              {product.details.map((detail) => (
                <li key={detail} className="flex gap-2 text-sm text-[var(--ink-soft)]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--accent)]" />
                  {detail}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-accent">
                <MessageCircle size={18} />
                Inquire on WhatsApp
              </a>
              {primaryInstagram && (
                <a
                  href={primaryInstagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <AtSign size={18} />
                  Instagram DM
                </a>
              )}
              {instagramChannels.length > 1 && (
                <Link href="/contact" className="btn-ghost">
                  All Instagrams
                </Link>
              )}
            </div>

            <p className="mt-4 text-sm text-[var(--muted)]">
              No online cart — message us to check size & availability.{" "}
              <Link href="/contact" className="font-semibold text-[var(--forest)] underline-offset-2 hover:underline">
                All contact options
              </Link>
            </p>
          </div>
        </Reveal>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                More to explore
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
                Related products
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden text-sm font-semibold text-[var(--forest)] underline-offset-4 hover:underline sm:inline"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, i) => (
              <ProductCard key={item.id} product={item} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
