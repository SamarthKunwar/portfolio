import { getDict, getProjects, type Locale } from "@/lib/content";
import Section from "./Section";
import ProjectGrid from "./ProjectGrid";

export default function Projects({ lang }: { lang: Locale }) {
  const t = getDict(lang).projects;
  const readMore = getDict(lang).ui.readCaseStudy;

  return (
    <Section id="projects" title={t.heading} lead={t.lead} surface>
      <ProjectGrid
        projects={getProjects(lang)}
        lang={lang}
        readMore={readMore}
      />
    </Section>
  );
}
