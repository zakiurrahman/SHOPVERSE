"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDownRight, ChevronDown, MessageCircle } from "lucide-react";
import { storeInfo } from "@/data/contact";
import { FloatingIcons } from "./FloatingIcons";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.3]);

  return (
    <section
      ref={ref}
      className="noise relative min-h-[100svh] overflow-hidden mesh-bg"
    >
      <FloatingIcons density="hero" />

      <motion.div
        style={reduce ? undefined : { opacity: heroOpacity }}
        className="relative z-[2] mx-auto grid min-h-[100svh] max-w-7xl items-end gap-8 px-4 pb-10 pt-24 sm:px-5 sm:pb-14 sm:pt-28 md:grid-cols-[1.05fr_0.95fr] md:items-center md:px-8 md:pb-20 md:pt-24"
      >
        <motion.div
          style={reduce ? undefined : { y: textY, opacity: textOpacity }}
          className="relative z-[3]"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--bg-elevated)]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] backdrop-blur-sm"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
              animate={reduce ? undefined : { scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Bags · Suits · Clothing · More
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-display)] text-[clamp(2.55rem,13vw,4.5rem)] font-bold leading-none tracking-[-0.055em] text-[var(--ink)] md:text-7xl lg:text-8xl"
          >
            {storeInfo.brand.split("").map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                className="inline-block"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.04 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-xl text-xl font-medium leading-snug text-[var(--ink-soft)] min-[380px]:text-2xl sm:mt-5 sm:text-3xl md:text-4xl"
          >
            Style for every wardrobe — bags, suits & more.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--muted)] sm:mt-4 sm:text-base md:text-lg"
          >
            Handbags, three-piece suits, clothing, footwear & accessories — curated for everyday and occasions.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex flex-col gap-3 min-[420px]:flex-row sm:mt-8 sm:flex-wrap"
          >
            <motion.div
              className="w-full min-[420px]:w-auto"
              whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/shop" className="btn-primary group relative w-full overflow-hidden min-[420px]:w-auto">
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-[1] flex items-center gap-2">
                  Browse collection
                  <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </span>
              </Link>
            </motion.div>
            <motion.div
              className="w-full min-[420px]:w-auto"
              whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/contact" className="btn-ghost w-full min-[420px]:w-auto">
                <MessageCircle size={18} />
                Contact us
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { y: imageY }}
          className="relative z-[2] -mx-4 aspect-[5/4] sm:-mx-5 md:mx-0 md:aspect-[4/5] md:min-h-[70vh]"
        >
          <motion.div
            style={reduce ? undefined : { scale: imageScale }}
            initial={reduce ? false : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80"
              alt="SHOPVERSE fashion collection"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center md:object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-[var(--hero-fade)]" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-[var(--forest)]/10 via-transparent to-[var(--accent)]/10"
              animate={reduce ? undefined : { opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#featured"
        aria-label="Scroll to featured products"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-[3] hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)] md:flex"
      >
        <span>Scroll</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
