"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { storeInfo } from "@/data/contact";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <Link href={href} className="group relative px-1 py-2">
      <motion.span
        className={`relative z-[1] text-sm font-semibold tracking-wide transition-colors duration-300 ${
          active ? "text-[var(--ink)]" : "text-[var(--ink-soft)] group-hover:text-[var(--ink)]"
        }`}
        whileHover={reduce ? undefined : { y: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {label}
      </motion.span>

      <motion.span
        className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-[var(--accent)]"
        initial={false}
        animate={{
          scaleX: active ? 1 : 0,
          opacity: active ? 1 : 0,
        }}
        whileHover={reduce ? undefined : { scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
      />

      <motion.span
        className="absolute -inset-x-2 -inset-y-1 rounded-lg bg-[var(--ink)]/0 group-hover:bg-[var(--ink)]/[0.04]"
        transition={{ duration: 0.25 }}
      />
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.header
      initial={false}
      animate={{
        y: 0,
        boxShadow: scrolled || open ? "var(--nav-shadow)" : "0 0 0 rgba(0,0,0,0)",
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border] duration-500 ${
        scrolled || open
          ? "border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-5 md:h-[4.5rem] md:px-8">
        <motion.div whileHover={reduce ? undefined : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/"
            className="group flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--ink)] min-[380px]:text-2xl"
          >
            <motion.span
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--ink)] text-[10px] font-extrabold tracking-tighter text-[var(--on-ink)]"
              whileHover={reduce ? undefined : { rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.5 }}
            >
              SV
            </motion.span>
            <span className="bg-gradient-to-r from-[var(--ink)] to-[var(--forest)] bg-clip-text transition-all group-hover:from-[var(--forest)] group-hover:to-[var(--accent)]">
              {storeInfo.brand}
            </span>
          </Link>
        </motion.div>

        <div className="hidden items-center gap-4 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={pathname === link.href}
            />
          ))}

          <ThemeToggle />

          <motion.div whileHover={reduce ? undefined : { scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link href="/contact" className="btn-accent group relative overflow-hidden text-sm shadow-[0_8px_24px_rgba(226,59,42,0.25)]">
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
              />
              <MessageCircle size={16} className="relative z-[1]" />
              <span className="relative z-[1]">Message Us</span>
            </Link>
          </motion.div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <motion.button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="relative z-[2] flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--bg-elevated)]/80 text-[var(--ink)] md:hidden"
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.92 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 top-16 z-[-1] bg-[var(--overlay)] backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[var(--line)] bg-[var(--bg-elevated)]/95 shadow-[var(--nav-shadow)] backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1 px-5 py-5">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={`block rounded-lg px-3 py-3.5 text-lg font-semibold transition-colors ${
                        pathname === link.href
                          ? "bg-[var(--ink)] text-[var(--on-ink)]"
                          : "text-[var(--ink)] hover:bg-[var(--ink)]/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link href="/contact" className="btn-accent mt-3 w-full text-center text-sm">
                    Message Us
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
