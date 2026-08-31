"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getDict, navItems, siteMeta, type Locale } from "@/lib/content";
import LocaleToggle from "./LocaleToggle";

const SPY_IDS = ["top", ...navItems] as const;

export default function Navbar({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("top");
  const [hovered, setHovered] = useState<string | null>(null);
  const indicated = hovered ?? active;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scrollspy: highlight the section crossing the middle of the viewport.
  useEffect(() => {
    const els = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const links = navItems.map((id) => ({
    id,
    href: `/${lang}#${id}`,
    label: t.nav[id],
  }));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--color-border)] bg-white/80 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${lang}#top`}
          className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
        >
          {siteMeta.name}
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          <ul className="flex items-center gap-5">
            {links.map((item) => (
              <li
                key={item.id}
                className="relative"
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  href={item.href}
                  className={`block whitespace-nowrap py-1 text-xs font-medium uppercase tracking-[0.1em] transition-colors active:scale-[0.96] ${
                    active === item.id
                      ? "text-[var(--color-fg)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                  }`}
                >
                  {item.label}
                </Link>
                {indicated === item.id ? (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--color-fg)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
              </li>
            ))}
          </ul>
          {siteMeta.resumeUrl ? (
            <a
              href={siteMeta.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.1em] underline decoration-[var(--color-border)] underline-offset-4 transition-colors hover:decoration-[var(--color-fg)] hover:text-[var(--color-fg)]"
            >
              {t.ui.resume}
            </a>
          ) : null}
          <LocaleToggle current={lang} />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LocaleToggle current={lang} />
          <button
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="border-t border-[var(--color-border)] bg-[var(--color-bg)] lg:hidden"
          >
            <ul className="container-page flex flex-col py-4">
              {links.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.25 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-base ${
                      active === item.id
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-fg)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              {siteMeta.resumeUrl ? (
                <li className="mt-3 border-t border-[var(--color-border)] pt-4">
                  <a
                    href={siteMeta.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium uppercase tracking-[0.12em] underline decoration-[var(--color-border)] underline-offset-4"
                  >
                    {t.ui.resume}
                  </a>
                </li>
              ) : null}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
