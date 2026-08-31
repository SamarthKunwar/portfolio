"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Locale, Project } from "@/lib/content";
import ProjectCover from "./ProjectCover";

const TILT = 6; // max degrees

function ProjectCard({
  project,
  lang,
  readMore,
  index,
}: {
  project: Project;
  lang: Locale;
  readMore: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const coverY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-7%", "7%"],
  );

  // Pointer-driven tilt.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [TILT, -TILT]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-TILT, TILT]), {
    stiffness: 220,
    damping: 22,
  });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  // Diagonal wave stagger across the 2-column grid (top-left first).
  const delay = reduce ? 0 : (Math.floor(index / 2) + (index % 2)) * 0.09;

  return (
    <motion.article
      ref={ref}
      className="group h-full [perspective:1000px]"
      initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={reduce ? undefined : { y: -4 }}
        className="h-full"
      >
        <Link
          href={`/${lang}/projects/${project.slug}`}
          className="flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-primary)] hover:shadow-[0_18px_50px_-16px_rgba(14,14,14,0.18)]"
        >
          <div className="relative aspect-[2/1] overflow-hidden border-b border-[var(--color-border)]">
            <motion.div
              style={{ y: coverY }}
              className="absolute inset-x-0 -inset-y-[10%]"
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  fill
                  sizes="(min-width: 640px) 520px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : project.cover ? (
                <ProjectCover
                  variant={project.cover}
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : null}
            </motion.div>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="mt-2 text-[var(--color-fg)]">{project.description}</p>

            <ul className="mt-4 flex flex-wrap gap-1.5 pt-1">
              {project.tech.map((tech) => (
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
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.article>
  );
}

export default function ProjectGrid({
  projects,
  lang,
  readMore,
}: {
  projects: Project[];
  lang: Locale;
  readMore: string;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectCard
          key={project.slug}
          project={project}
          lang={lang}
          readMore={readMore}
          index={i}
        />
      ))}
    </div>
  );
}
