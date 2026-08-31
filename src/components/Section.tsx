import type { ReactNode } from "react";
import SectionHeading from "./SectionHeading";

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
        <SectionHeading title={title} lead={lead} />
        {children}
      </div>
    </section>
  );
}
