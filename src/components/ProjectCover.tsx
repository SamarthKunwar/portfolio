import type { ProjectCoverVariant } from "@/lib/content";

/**
 * Generated cover artwork for project cards — self-contained SVG, no assets.
 * Monochrome + blue accent, tuned to the site's minimal / Swiss style.
 */

type Variant = ProjectCoverVariant;

const ACCENT = "var(--color-accent)";
const INK = "var(--color-fg)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 200"
      role="img"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <pattern
          id="cover-grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 0H0V20"
            fill="none"
            stroke={INK}
            strokeOpacity="0.06"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="400" height="200" fill="var(--color-surface)" />
      <rect width="400" height="200" fill="url(#cover-grid)" />
      {children}
    </svg>
  );
}

function Rag() {
  const docs = [
    { x: 250, y: 46, hit: true },
    { x: 320, y: 78, hit: true },
    { x: 300, y: 140, hit: false },
    { x: 236, y: 120, hit: false },
    { x: 348, y: 40, hit: false },
  ];
  return (
    <Frame>
      {/* query node */}
      <rect
        x="40"
        y="82"
        width="70"
        height="36"
        rx="8"
        fill="none"
        stroke={INK}
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <line x1="54" y1="94" x2="96" y2="94" stroke={INK} strokeOpacity="0.4" strokeWidth="2" />
      <line x1="54" y1="104" x2="84" y2="104" stroke={INK} strokeOpacity="0.25" strokeWidth="2" />
      {/* edges */}
      {docs.map((d, i) => (
        <line
          key={i}
          x1="110"
          y1="100"
          x2={d.x}
          y2={d.y}
          stroke={d.hit ? ACCENT : INK}
          strokeOpacity={d.hit ? 0.9 : 0.18}
          strokeWidth={d.hit ? 1.75 : 1}
        />
      ))}
      {/* doc nodes */}
      {docs.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.hit ? 9 : 6}
          fill={d.hit ? ACCENT : "var(--color-surface)"}
          stroke={d.hit ? ACCENT : INK}
          strokeOpacity={d.hit ? 1 : 0.4}
          strokeWidth="1.5"
        />
      ))}
      <circle cx="110" cy="100" r="4" fill={INK} />
    </Frame>
  );
}

function Cloud() {
  const nodes = [70, 200, 330];
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
  return (
    <Frame>
      {/* pipeline */}
      <line x1="40" y1="44" x2="360" y2="44" stroke={INK} strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4 5" />
      {[110, 200, 290].map((x, i) => (
        <path
          key={i}
          d={`M${x - 6} 38 L${x + 6} 44 L${x - 6} 50 Z`}
          fill={i === 1 ? ACCENT : INK}
          fillOpacity={i === 1 ? 1 : 0.35}
        />
      ))}
      {/* cluster nodes */}
      {nodes.map((cx, i) => (
        <g key={i}>
          <polygon
            points={hex(cx, 122, 40)}
            fill="var(--color-surface)"
            stroke={i === 1 ? ACCENT : INK}
            strokeOpacity={i === 1 ? 1 : 0.4}
            strokeWidth="1.5"
          />
          {[
            [-10, -8],
            [8, -8],
            [-10, 10],
            [8, 10],
          ].map(([dx, dy], j) => (
            <rect
              key={j}
              x={cx + dx - 6}
              y={122 + dy - 6}
              width="12"
              height="12"
              rx="2.5"
              fill={i === 1 && j === 0 ? ACCENT : INK}
              fillOpacity={i === 1 && j === 0 ? 1 : 0.22}
            />
          ))}
        </g>
      ))}
    </Frame>
  );
}

function MapCover() {
  return (
    <Frame>
      {/* roads */}
      {[50, 100, 150].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={INK} strokeOpacity="0.14" strokeWidth="1.5" />
      ))}
      {[70, 150, 230, 310].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={INK} strokeOpacity="0.14" strokeWidth="1.5" />
      ))}
      <path d="M0 118 C120 90 180 150 400 96" fill="none" stroke={INK} strokeOpacity="0.22" strokeWidth="2" />
      {/* pins — tip at (x, y) */}
      {[
        { x: 150, y: 66, a: true },
        { x: 232, y: 116, a: false },
        { x: 70, y: 112, a: false },
      ].map((p, i) => (
        <g key={i}>
          <path
            d={`M${p.x} ${p.y} C ${p.x - 10} ${p.y - 12}, ${p.x - 12} ${p.y - 28}, ${p.x} ${p.y - 34} C ${p.x + 12} ${p.y - 28}, ${p.x + 10} ${p.y - 12}, ${p.x} ${p.y} Z`}
            fill={p.a ? ACCENT : "var(--color-surface)"}
            stroke={p.a ? ACCENT : INK}
            strokeOpacity={p.a ? 1 : 0.5}
            strokeWidth="1.5"
          />
          <circle
            cx={p.x}
            cy={p.y - 21}
            r="4.5"
            fill={p.a ? "var(--color-surface)" : INK}
            fillOpacity={p.a ? 1 : 0.55}
          />
        </g>
      ))}
      {/* star */}
      <path
        d="M320 46 l4 9 10 1 -7.5 6.5 2.3 9.8 -8.8 -5.2 -8.8 5.2 2.3 -9.8 -7.5 -6.5 10 -1 Z"
        fill={ACCENT}
      />
    </Frame>
  );
}

function Neural() {
  const layers = [
    { x: 90, n: 3 },
    { x: 200, n: 4 },
    { x: 310, n: 2 },
  ];
  const ys = (n: number) =>
    Array.from({ length: n }, (_, i) => 100 + (i - (n - 1) / 2) * 40);
  return (
    <Frame>
      {layers.slice(0, -1).map((l, li) =>
        ys(l.n).flatMap((y1) =>
          ys(layers[li + 1].n).map((y2, k) => (
            <line
              key={`${li}-${y1}-${k}`}
              x1={l.x}
              y1={y1}
              x2={layers[li + 1].x}
              y2={y2}
              stroke={INK}
              strokeOpacity="0.12"
              strokeWidth="1"
            />
          )),
        ),
      )}
      {layers.map((l, li) =>
        ys(l.n).map((y, i) => (
          <circle
            key={`${li}-${i}`}
            cx={l.x}
            cy={y}
            r="9"
            fill={li === layers.length - 1 ? ACCENT : "var(--color-surface)"}
            stroke={li === layers.length - 1 ? ACCENT : INK}
            strokeOpacity={li === layers.length - 1 ? 1 : 0.45}
            strokeWidth="1.5"
          />
        )),
      )}
    </Frame>
  );
}

const map: Record<Variant, () => React.ReactElement> = {
  rag: Rag,
  cloud: Cloud,
  map: MapCover,
  neural: Neural,
};

export default function ProjectCover({
  variant,
  className = "",
}: {
  variant: Variant;
  className?: string;
}) {
  const Art = map[variant];
  return (
    <div className={`overflow-hidden ${className}`}>
      <Art />
    </div>
  );
}
