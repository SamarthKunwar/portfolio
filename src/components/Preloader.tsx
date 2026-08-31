"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteMeta } from "@/lib/content";

const initials = siteMeta.name
  .split(" ")
  .map((w) => w[0])
  .join("");

/**
 * Brief intro curtain on the first visit of a session. Renders in the SSR
 * markup so it covers the first paint; a repeat visit skips it (quick fade).
 */
export default function Preloader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
    } catch {
      /* storage unavailable — just play it */
    }
    const instant = seen || reduce;
    // The flag is written only after the intro has run, so React's
    // dev-mode double-invoked effect doesn't skip it on the second pass.
    const t = setTimeout(
      () => {
        if (instant) setSkip(true);
        setVisible(false);
        if (!instant) {
          try {
            sessionStorage.setItem("intro-seen", "1");
          } catch {
            /* ignore */
          }
        }
      },
      instant ? 0 : 700,
    );
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[var(--color-bg)]"
          initial={{ y: 0 }}
          exit={skip ? { opacity: 0 } : { y: "-100%" }}
          transition={{
            duration: skip ? 0.25 : 0.6,
            ease: skip ? "easeOut" : [0.7, 0, 0.3, 1],
          }}
        >
          {!skip ? (
            <>
              <motion.span
                className="font-display text-3xl font-bold tracking-[-0.04em] text-[var(--color-fg)]"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {initials}
              </motion.span>
              <span className="block h-px w-28 overflow-hidden bg-[var(--color-border)]">
                <motion.span
                  className="block h-full origin-left bg-[var(--color-fg)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </span>
            </>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
