"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Cross-fade between routes. Opacity only: a transform here would drag the
// fixed navbar and progress bar.
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
