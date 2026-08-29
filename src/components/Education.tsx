import { getDict, type Locale } from "@/lib/content";
import Section from "./Section";
import Timeline from "./Timeline";

export default function Education({ lang }: { lang: Locale }) {
  const t = getDict(lang).education;
  return (
    <Section id="education" title={t.heading} lead={t.lead} surface>
      <Timeline items={t.items} />
    </Section>
  );
}
