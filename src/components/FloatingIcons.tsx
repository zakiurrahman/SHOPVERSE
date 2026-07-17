"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Gem, Shirt, ShoppingBag, Footprints, Sparkles } from "lucide-react";

type FloatItem = {
  id: string;
  Icon: typeof ShoppingBag;
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
  color: string;
  bg: string;
};

const items: FloatItem[] = [
  {
    id: "bag",
    Icon: ShoppingBag,
    x: "8%",
    y: "18%",
    size: 28,
    delay: 0,
    duration: 5.2,
    rotate: -12,
    color: "var(--forest)",
    bg: "rgba(27, 94, 74, 0.12)",
  },
  {
    id: "shirt",
    Icon: Shirt,
    x: "88%",
    y: "22%",
    size: 26,
    delay: 0.4,
    duration: 6,
    rotate: 14,
    color: "var(--accent)",
    bg: "rgba(226, 59, 42, 0.1)",
  },
  {
    id: "shoe",
    Icon: Footprints,
    x: "78%",
    y: "72%",
    size: 24,
    delay: 0.8,
    duration: 5.6,
    rotate: -8,
    color: "var(--ink-soft)",
    bg: "rgba(20, 32, 28, 0.08)",
  },
  {
    id: "gem",
    Icon: Gem,
    x: "12%",
    y: "68%",
    size: 22,
    delay: 1.2,
    duration: 6.4,
    rotate: 10,
    color: "var(--warm)",
    bg: "rgba(201, 166, 107, 0.18)",
  },
  {
    id: "spark",
    Icon: Sparkles,
    x: "52%",
    y: "12%",
    size: 20,
    delay: 0.6,
    duration: 4.8,
    rotate: 6,
    color: "var(--forest-soft)",
    bg: "rgba(42, 122, 98, 0.1)",
  },
];

type Props = {
  className?: string;
  density?: "hero" | "section";
};

export function FloatingIcons({ className = "", density = "hero" }: Props) {
  const reduce = useReducedMotion();
  const visible = density === "hero" ? items : items.slice(0, 3);

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${className}`}
    >
      {visible.map((item, index) => (
        <motion.div
          key={item.id}
          className={`absolute items-center justify-center rounded-2xl border border-[var(--float-border)] shadow-[var(--card-shadow)] backdrop-blur-sm ${
            index < 2 ? "flex scale-75 opacity-60 sm:scale-100 sm:opacity-100" : "hidden lg:flex"
          }`}
          style={{
            left: item.x,
            top: item.y,
            width: item.size + 36,
            height: item.size + 36,
            background: item.bg,
            rotate: item.rotate,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0.55, 0.9, 0.55],
            y: [0, -18, 0, 14, 0],
            x: [0, 8, -6, 4, 0],
            rotate: [item.rotate, item.rotate + 6, item.rotate - 4, item.rotate],
          }}
          transition={{
            opacity: { duration: item.duration, repeat: Infinity, ease: "easeInOut" },
            y: {
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            },
            x: {
              duration: item.duration * 1.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay + 0.2,
            },
            rotate: {
              duration: item.duration * 1.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            },
            scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <item.Icon size={item.size} style={{ color: item.color }} strokeWidth={1.6} />
        </motion.div>
      ))}
    </div>
  );
}
