"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function RotatingRole({ roles }: { roles: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || roles.length < 2) return;
    const id = setInterval(
      () => setI((v) => (v + 1) % roles.length),
      2600,
    );
    return () => clearInterval(id);
  }, [reduce, roles.length]);

  if (reduce) return <span>{roles[0]}</span>;

  return (
    <span className="relative inline-flex overflow-hidden align-bottom">
      {/* keeps the line height stable */}
      <span className="invisible" aria-hidden>
        {roles.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[i]}
          className="absolute left-0 top-0 whitespace-nowrap"
          initial={{ y: "115%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-115%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
