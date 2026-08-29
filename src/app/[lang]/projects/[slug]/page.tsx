import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  getDict,
  getProject,
  isLocale,
  locales,
  projectMeta,
  siteMeta,
} from "@/lib/content";
import { GithubMark } from "@/components/icons";
import ProjectCover from "@/components/ProjectCover";
import Footer from "@/components/Footer";
import LocaleToggle from "@/components/LocaleToggle";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projectMeta.map((p) => ({ lang, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const project = getProject(lang, slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/${lang}/projects/${slug}` },
    openGraph: {
      title: `${project.name} · ${siteMeta.name}`,
      description: project.description,
      type: "article",
      locale: lang === "de" ? "de_DE" : "en_US",
    },
  };
}

function Prose({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((p, i) => (
        <p key={i} className="leading-relaxed text-[var(--color-fg)]">
          {p}
        </p>
      ))}
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const project = getProject(lang, slug);
  if (!project) notFound();

  const t = getDict(lang);
  const index = projectMeta.findIndex((p) => p.slug === slug);
  const nextMeta = projectMeta[(index + 1) % projectMeta.length];
  const next = getProject(lang, nextMeta.slug)!;

  return (
    <>
      <header className="border-b border-[var(--color-border)]">
        <div className="container-page flex h-16 items-center justify-between">
          <Link
            href={`/${lang}`}
            className="text-xs font-semibold uppercase tracking-[0.14em]"
          >
            {siteMeta.name}
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href={`/${lang}#projects`}
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
            >
              <ArrowLeft size={14} aria-hidden />
              {t.ui.allProjects}
            </Link>
            <LocaleToggle current={lang} />
          </div>
        </div>
      </header>

      <main>
        <article className="container-page py-16 sm:py-24">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
            {t.ui.caseStudy}
          </p>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.03em]">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[var(--color-fg)]">
            {project.description}
          </p>
          {project.detail ? (
            <p className="mt-3 max-w-2xl leading-relaxed text-[var(--color-muted)]">
              {project.detail}
            </p>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium underline decoration-[var(--color-border)] underline-offset-4 transition-colors hover:decoration-[var(--color-fg)]"
              >
                <GithubMark size={16} />
                {t.ui.source}
              </a>
            ) : null}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium underline decoration-[var(--color-border)] underline-offset-4 transition-colors hover:decoration-[var(--color-fg)]"
              >
                {t.ui.liveDemo}
                <ArrowUpRight size={15} aria-hidden />
              </a>
            ) : null}
          </div>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-md bg-[var(--color-surface)] px-2 py-0.5 text-xs text-[var(--color-muted)]"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="relative mt-12 aspect-[16/7] overflow-hidden rounded-xl border border-[var(--color-border)]">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.name} preview`}
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
                priority
              />
            ) : project.cover ? (
              <ProjectCover variant={project.cover} className="absolute inset-0" />
            ) : null}
          </div>

          <div className="mt-16 space-y-16">
            <section>
              <h2 className="text-xl sm:text-2xl">
                <span className="text-[var(--color-accent)]">/</span>{" "}
                {t.ui.challenge}
              </h2>
              <div className="mt-5 max-w-2xl">
                <Prose items={project.challenge} />
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl">
                <span className="text-[var(--color-accent)]">/</span>{" "}
                {t.ui.process}
              </h2>
              <ol className="mt-6 max-w-2xl space-y-6">
                {project.process.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="mt-0.5 shrink-0 font-[family-name:var(--font-display)] text-sm text-[var(--color-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="leading-relaxed text-[var(--color-fg)]">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl">
                <span className="text-[var(--color-accent)]">/</span>{" "}
                {t.ui.outcomes}
              </h2>
              <ul className="mt-6 max-w-2xl space-y-4">
                {project.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                    />
                    <p className="leading-relaxed text-[var(--color-fg)]">{o}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-20 border-t border-[var(--color-border)] pt-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
              {t.ui.nextProject}
            </p>
            <Link
              href={`/${lang}/projects/${next.slug}`}
              className="group mt-2 inline-flex items-center gap-2 text-2xl font-medium tracking-[-0.02em]"
            >
              {next.name}
              <ArrowRight
                size={20}
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </article>
      </main>

      <Footer lang={lang} />
    </>
  );
}
