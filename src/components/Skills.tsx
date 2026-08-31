"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { getDict, type Locale } from "@/lib/content";
import Section from "./Section";
import Reveal from "./Reveal";

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025 } },
};

const chip: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 26 },
  },
};

export default function Skills({ lang }: { lang: Locale }) {
  const t = getDict(lang).skills;
  const reduce = useReducedMotion();

  return (
    <Section id="skills" title={t.heading} lead={t.lead}>
      <div className="grid gap-6 sm:grid-cols-2">
        {t.groups.map((group, i) => (
          <Reveal key={group.category} delay={(i % 2) * 0.06}>
            <div className="h-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                {group.category}
              </h3>
              <motion.ul
                className="mt-3 flex flex-wrap gap-2"
                variants={reduce ? undefined : list}
                initial={reduce ? false : "hidden"}
                whileInView={reduce ? undefined : "visible"}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              >
                {group.items.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={reduce ? undefined : chip}
                    className="cursor-default rounded-lg border border-[var(--color-border)] px-2.5 py-1 text-sm transition-colors duration-200 hover:border-[var(--color-fg)] hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)]"
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
