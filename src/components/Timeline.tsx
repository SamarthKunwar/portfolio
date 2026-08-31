"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

export type TimelineEntry = {
  title: string;
  subtitle: string;
  meta: string;
  location?: string;
  points: string[];
};

export default function Timeline({ items }: { items: TimelineEntry[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative">
      {/* track + scroll-linked fill */}
      <span className="absolute inset-y-0 left-0 w-px bg-[var(--color-border)]" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : lineScale }}
        className="absolute inset-y-0 left-0 w-px origin-top bg-[var(--color-muted)]"
      />

      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 0.06}>
          <div className="relative pb-10 pl-6 last:pb-0">
            <motion.span
              className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]"
              initial={reduce ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
              style={{ transformOrigin: "center" }}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <span className="text-sm text-[var(--color-muted)]">
                {item.meta}
              </span>
            </div>
            <p className="mt-0.5 text-[var(--color-fg)]">{item.subtitle}</p>
            {item.location ? (
              <p className="text-sm text-[var(--color-muted)]">
                {item.location}
              </p>
            ) : null}
            {item.points.length > 0 ? (
              <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-muted)]">
                {item.points.map((p, j) => (
                  <li key={j} className="flex gap-2">
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-border)]"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
