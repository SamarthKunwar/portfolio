import { getDict, type Locale } from "@/lib/content";
import Section from "./Section";
import Reveal from "./Reveal";

export default function About({ lang }: { lang: Locale }) {
  const t = getDict(lang).about;
  return (
    <Section id="about" title={t.heading} surface>
      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <div className="space-y-4 text-[var(--color-fg)]">
            {t.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="divide-y divide-[var(--color-border)] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]">
            {t.facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-0.5 px-4 py-3">
                <dt className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
                  {f.label}
                </dt>
                <dd className="text-sm">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
