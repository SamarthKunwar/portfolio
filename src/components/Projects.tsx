import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getDict, getProjects, type Locale } from "@/lib/content";
import Section from "./Section";
import Reveal from "./Reveal";
import ProjectCover from "./ProjectCover";

export default function Projects({ lang }: { lang: Locale }) {
  const t = getDict(lang).projects;
  const readMore = getDict(lang).ui.readCaseStudy;
  const projects = getProjects(lang);

  return (
    <Section id="projects" title={t.heading} lead={t.lead} surface>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.06}>
            <Link
              href={`/${lang}/projects/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] transition-colors hover:border-[var(--color-primary)]"
            >
              <div className="relative aspect-[2/1] border-b border-[var(--color-border)]">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={`${p.name} preview`}
                    fill
                    sizes="(min-width: 640px) 520px, 100vw"
                    className="object-cover"
                  />
                ) : p.cover ? (
                  <ProjectCover variant={p.cover} className="absolute inset-0" />
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-2 text-[var(--color-fg)]">{p.description}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5 pt-1">
                  {p.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md bg-[var(--color-surface)] px-2 py-0.5 text-xs text-[var(--color-muted)]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-fg)]">
                  {readMore}
                  <ArrowRight
                    size={15}
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
