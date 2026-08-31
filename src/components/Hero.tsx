import Image from "next/image";
import { getDict, siteMeta, socials, type Locale } from "@/lib/content";
import Reveal from "./Reveal";
import CopyEmail from "./CopyEmail";
import SocialIcon from "./SocialIcon";

export default function Hero({ lang }: { lang: Locale }) {
  const t = getDict(lang);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center pt-24 pb-16"
    >
      <div className="container-page grid w-full gap-y-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-x-12">
        {/* Left rail — meta */}
        <div className="flex flex-col gap-6">
          {siteMeta.photo ? (
            <Reveal>
              <div className="relative aspect-square w-36 overflow-hidden rounded-2xl border border-[var(--color-border)]">
                <Image
                  src={siteMeta.photo}
                  alt={siteMeta.name}
                  fill
                  sizes="144px"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={siteMeta.photo ? 0.05 : 0}>
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
                {t.ui.email}
              </p>
              <CopyEmail lang={lang} email={siteMeta.email} />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-fg)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              {t.hero.status}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
                {t.ui.basedIn}
              </p>
              <p className="text-sm text-[var(--color-fg)]">{t.location}</p>
            </div>
          </Reveal>
        </div>

        {/* Right column — statement */}
        <div>
          <Reveal>
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.98] tracking-[-0.03em] [hyphens:auto]">
              {siteMeta.name}
            </h1>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-4 text-xl font-medium tracking-[-0.01em] text-[var(--color-muted)] sm:text-2xl">
              {t.hero.role}
            </p>
          </Reveal>

          <div className="mt-7 max-w-xl space-y-4">
            {t.hero.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.12 + i * 0.05}>
                <p className="text-lg leading-[1.3] text-[var(--color-fg)]">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#projects"
                className="text-sm font-medium uppercase tracking-[0.1em] underline decoration-[var(--color-border)] underline-offset-[6px] transition-colors hover:decoration-[var(--color-fg)]"
              >
                {t.ui.viewWork}
              </a>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
                >
                  <SocialIcon name={s.icon} size={15} />
                  {s.icon === "Mail" ? t.ui.email : s.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container-page mt-16 md:mt-24">
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
          ({t.ui.scrollHint})
        </span>
      </div>
    </section>
  );
}
