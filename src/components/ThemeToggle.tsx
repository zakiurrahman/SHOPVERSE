"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type Props = {
  className?: string;
};

export function ThemeToggle({ className = "" }: Props) {
  const { theme, toggleTheme, ready } = useTheme();
  const reduce = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Switch to bright mode" : "Switch to dark mode"}
      title={isDark ? "Bright mode" : "Dark mode"}
      onClick={toggleTheme}
      whileHover={reduce ? undefined : { scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--ink)] transition-colors hover:border-[var(--ink)] ${className}`}
    >
      <motion.span
        key={ready ? theme : "loading"}
        initial={reduce ? false : { opacity: 0, rotate: -90, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.span>
    </motion.button>
  );
}
