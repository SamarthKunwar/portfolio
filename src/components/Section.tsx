import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionProps = {
  id: string;
  title: string;
  /** optional short line under the title */
  lead?: string;
  children: ReactNode;
  /** tint the section background */
  surface?: boolean;
};

export default function Section({
  id,
  title,
  lead,
  children,
  surface = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-20 sm:py-28 ${
        surface ? "bg-[var(--color-surface)]" : ""
      }`}
    >
      <div className="container-page">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl">
              <span className="text-[var(--color-accent)]">/</span> {title}
            </h2>
            {lead ? (
              <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
                {lead}
              </p>
            ) : null}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
