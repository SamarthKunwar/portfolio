import { getDict, siteMeta, socials, type Locale } from "@/lib/content";
import Section from "./Section";
import Reveal from "./Reveal";
import SocialIcon from "./SocialIcon";
import CopyEmail from "./CopyEmail";

export default function Contact({ lang }: { lang: Locale }) {
  const t = getDict(lang).contact;
  return (
    <Section id="contact" title={t.heading} lead={t.blurb}>
      <div className="flex flex-col gap-8">
        <Reveal>
          <a
            href={`mailto:${siteMeta.email}`}
            className="inline-block text-[clamp(1.75rem,4.5vw,3rem)] font-medium tracking-[-0.02em] text-[var(--color-fg)] underline decoration-[var(--color-border)] underline-offset-[8px] transition-colors hover:decoration-[var(--color-fg)]"
          >
            {siteMeta.email}
          </a>
        </Reveal>

        <Reveal delay={0.05}>
          <CopyEmail lang={lang} email={siteMeta.email} compact />
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
            {socials
              .filter((s) => s.icon !== "Mail")
              .map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
                  >
                    <SocialIcon name={s.icon} size={16} />
                    {s.label}
                  </a>
                </li>
              ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
