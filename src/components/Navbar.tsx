"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getDict, navItems, siteMeta, type Locale } from "@/lib/content";
import LocaleToggle from "./LocaleToggle";

export default function Navbar({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  const links = navItems.map((id) => ({
    href: `/${lang}#${id}`,
    label: t.nav[id],
  }));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-[var(--color-border)] bg-white/80 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${lang}#top`}
          className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.14em]"
        >
          {siteMeta.name}
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          <ul className="flex items-center gap-5">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.1em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
                >
                  {item.label}
                </Link>
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

      {open ? (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] lg:hidden">
          <ul className="container-page flex flex-col py-4">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-[var(--color-fg)]"
                >
                  {item.label}
                </Link>
              </li>
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
        </div>
      ) : null}
    </header>
  );
}
