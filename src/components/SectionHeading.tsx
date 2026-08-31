"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const slashV: Variants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -25 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 320, damping: 16 },
  },
};

const wipeV: Variants = {
  hidden: { y: "115%" },
  visible: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const leadV: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SectionHeading({
  title,
  lead,
}: {
  title: string;
  lead?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="mb-12 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl">
          <span className="text-[var(--color-accent)]">/</span> {title}
        </h2>
        {lead ? (
          <p className="mt-3 leading-relaxed text-[var(--color-muted)]">{lead}</p>
        ) : null}
      </div>
    );
  }

  return (
    <motion.div
      className="mb-12 max-w-2xl"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      <h2 className="flex items-baseline gap-2 text-2xl sm:text-3xl">
        <motion.span
          className="text-[var(--color-accent)]"
          variants={slashV}
        >
          /
        </motion.span>
        <span className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={wipeV}>
            {title}
          </motion.span>
        </span>
      </h2>
      {lead ? (
        <motion.p
          className="mt-3 leading-relaxed text-[var(--color-muted)]"
          variants={leadV}
        >
          {lead}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
