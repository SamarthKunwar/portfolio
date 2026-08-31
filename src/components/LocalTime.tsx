"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/content";

// Local time in Europe/Berlin. Renders nothing until mounted to avoid a
// hydration mismatch.
export default function LocalTime({ lang }: { lang: Locale }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-US", {
          timeZone: "Europe/Berlin",
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date()),
      );
    const raf = requestAnimationFrame(update);
    const id = setInterval(update, 15_000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [lang]);

  if (!time) return null;

  return (
    <p className="flex items-center gap-1.5 text-sm text-[var(--color-muted)] tabular-nums">
      <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
      {lang === "de" ? `${time} Uhr Ortszeit` : `${time} local time`}
    </p>
  );
}
