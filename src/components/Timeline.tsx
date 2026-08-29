import Reveal from "./Reveal";

export type TimelineEntry = {
  title: string;
  subtitle: string;
  meta: string;
  location?: string;
  points: string[];
};

export default function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <ol className="relative border-l border-[var(--color-border)]">
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 0.05}>
          <div className="relative pb-10 pl-6 last:pb-0">
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
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
