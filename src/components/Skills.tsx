import { getDict, type Locale } from "@/lib/content";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Skills({ lang }: { lang: Locale }) {
  const t = getDict(lang).skills;
  return (
    <Section id="skills" title={t.heading} lead={t.lead}>
      <div className="grid gap-6 sm:grid-cols-2">
        {t.groups.map((group, i) => (
          <Reveal key={group.category} delay={(i % 2) * 0.06}>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                {group.category}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-[var(--color-border)] px-2.5 py-1 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
