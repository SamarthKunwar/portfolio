import Link from "next/link";
import { getDict, navItems, siteMeta, socials, type Locale } from "@/lib/content";
import SocialIcon from "./SocialIcon";

export default function Footer({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-[var(--color-border)]">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href={`/${lang}#top`} className="font-display font-semibold">
            {siteMeta.name}
          </Link>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            © {year} · {t.ui.footerBuilt}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--color-muted)]">
            {navItems.map((id) => (
              <li key={id}>
                <Link
                  href={`/${lang}#${id}`}
                  className="transition-colors hover:text-[var(--color-fg)]"
                >
                  {t.nav[id]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-1">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.icon === "Mail" ? t.ui.email : s.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)]"
              >
                <SocialIcon name={s.icon} size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
