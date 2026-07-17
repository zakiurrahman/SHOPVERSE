"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

type Props = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.65,
        delay: Math.min(index * 0.07, 0.42),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduce ? undefined : { y: -8 }}
      className="group"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-elevated)] shadow-[var(--card-shadow)] transition-shadow duration-500 group-hover:shadow-[var(--card-shadow-hover)]">
          <motion.div
            className="absolute inset-0"
            whileHover={reduce ? undefined : { scale: 1.08 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--ink)]/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <motion.div
            className="card-shine pointer-events-none absolute -left-full top-0 h-full w-1/2 skew-x-[-20deg] bg-white/20 opacity-0 group-hover:opacity-100"
          />

          {product.badge && (
            <motion.span
              initial={false}
              whileHover={reduce ? undefined : { scale: 1.05 }}
              className="absolute left-3 top-3 z-[1] bg-[var(--ink)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--on-ink)]"
            >
              {product.badge}
            </motion.span>
          )}

          <motion.div
            className="absolute right-3 top-3 z-[1] flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-elevated)]/95 text-[var(--ink)] opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
            whileHover={reduce ? undefined : { scale: 1.1, rotate: 8 }}
          >
            <ArrowUpRight size={16} />
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 z-[1] translate-y-3 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="m-3 flex items-center justify-center gap-2 bg-[var(--ink)] px-3 py-2.5 text-sm font-semibold text-[var(--on-ink)]">
              View details
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)] transition-colors group-hover:text-[var(--forest)]">
              {product.category}
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--forest)]">
              {product.name}
            </h3>
          </div>
          <motion.p
            className="shrink-0 text-base font-semibold text-[var(--forest)]"
            whileHover={reduce ? undefined : { scale: 1.05 }}
          >
            {formatPrice(product.price)}
          </motion.p>
        </div>
      </Link>
    </motion.article>
  );
}
