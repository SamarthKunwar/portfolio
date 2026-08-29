"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/content";

export default function LocaleToggle({ current }: { current: Locale }) {
  const pathname = usePathname();

  const swap = (to: Locale) => {
    const rest = pathname.replace(/^\/(en|de)(?=\/|$)/, "");
    return `/${to}${rest || ""}`;
  };

  return (
    <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.12em]">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 ? <span className="text-[var(--color-border)]">/</span> : null}
          {loc === current ? (
            <span className="text-[var(--color-fg)]">{loc}</span>
          ) : (
            <Link
              href={swap(loc)}
              className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
            >
              {loc}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
