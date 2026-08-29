import { getDict, type Locale } from "@/lib/content";
import Section from "./Section";
import Timeline from "./Timeline";

export default function Experience({ lang }: { lang: Locale }) {
  const t = getDict(lang).experience;
  return (
    <Section id="experience" title={t.heading} lead={t.lead}>
      <Timeline items={t.items} />
    </Section>
  );
}
