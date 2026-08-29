"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ProjectCoverVariant } from "@/lib/content";

/**
 * Generated cover artwork for project cards — self-contained SVG, no assets.
 * The geometry draws itself in when the card scrolls into view: strokes
 * trace on (pathLength), then nodes pop with a small spring. Respects
 * prefers-reduced-motion (renders the final state immediately).
 */

const ACCENT = "var(--color-accent)";
const INK = "var(--color-fg)";
const SURFACE = "var(--color-surface)";

const nodeStyle = {
  transformBox: "fill-box",
  transformOrigin: "center",
} as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.12 } },
};

const strokeV: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] },
  },
};

const popV: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 340, damping: 18 },
  },
};

const fadeV: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

function Rag() {
  const docs = [
    { x: 250, y: 46, hit: true },
    { x: 320, y: 78, hit: true },
    { x: 300, y: 140, hit: false },
    { x: 236, y: 120, hit: false },
    { x: 348, y: 40, hit: false },
  ];
  return (
    <>
      <motion.rect
        x="40"
        y="82"
        width="70"
        height="36"
        rx="8"
        fill="none"
        stroke={INK}
        strokeOpacity="0.5"
        strokeWidth="1.5"
        variants={strokeV}
      />
      <motion.line
        x1="54"
        y1="94"
        x2="96"
        y2="94"
        stroke={INK}
        strokeOpacity="0.4"
        strokeWidth="2"
        variants={strokeV}
      />
      <motion.line
        x1="54"
        y1="104"
        x2="84"
        y2="104"
        stroke={INK}
        strokeOpacity="0.25"
        strokeWidth="2"
        variants={strokeV}
      />
      {docs.map((d, i) => (
        <motion.line
          key={`e${i}`}
          x1="110"
          y1="100"
          x2={d.x}
          y2={d.y}
          stroke={d.hit ? ACCENT : INK}
          strokeOpacity={d.hit ? 0.9 : 0.18}
          strokeWidth={d.hit ? 1.75 : 1}
          variants={strokeV}
        />
      ))}
      <motion.circle
        cx="110"
        cy="100"
        r="4"
        fill={INK}
        variants={popV}
        style={nodeStyle}
      />
      {docs.map((d, i) => (
        <motion.circle
          key={`n${i}`}
          cx={d.x}
          cy={d.y}
          r={d.hit ? 9 : 6}
          fill={d.hit ? ACCENT : SURFACE}
          stroke={d.hit ? ACCENT : INK}
          strokeOpacity={d.hit ? 1 : 0.4}
          strokeWidth="1.5"
          variants={popV}
          style={nodeStyle}
        />
      ))}
    </>
  );
}

function Cloud() {
  const centers = [70, 200, 330];
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
  const pods: [number, number][] = [
    [-10, -8],
    [8, -8],
    [-10, 10],
    [8, 10],
  ];
  return (
    <>
      <motion.line
        x1="40"
        y1="44"
        x2="360"
        y2="44"
        stroke={INK}
        strokeOpacity="0.2"
        strokeWidth="1.5"
        strokeDasharray="4 5"
        variants={strokeV}
      />
      {[110, 200, 290].map((x, i) => (
        <motion.path
          key={`a${i}`}
          d={`M${x - 6} 38 L${x + 6} 44 L${x - 6} 50 Z`}
          fill={i === 1 ? ACCENT : INK}
          fillOpacity={i === 1 ? 1 : 0.35}
          variants={popV}
          style={nodeStyle}
        />
      ))}
      {centers.map((cx, i) => (
        <motion.polygon
          key={`h${i}`}
          points={hex(cx, 122, 40)}
          fill={SURFACE}
          stroke={i === 1 ? ACCENT : INK}
          strokeOpacity={i === 1 ? 1 : 0.4}
          strokeWidth="1.5"
          variants={strokeV}
        />
      ))}
      {centers.flatMap((cx, i) =>
        pods.map(([dx, dy], j) => (
          <motion.rect
            key={`p${i}-${j}`}
            x={cx + dx - 6}
            y={122 + dy - 6}
            width="12"
            height="12"
            rx="2.5"
            fill={i === 1 && j === 0 ? ACCENT : INK}
            fillOpacity={i === 1 && j === 0 ? 1 : 0.22}
            variants={popV}
            style={nodeStyle}
          />
        )),
      )}
    </>
  );
}

function MapCover() {
  const pins = [
    { x: 150, y: 66, a: true },
    { x: 232, y: 116, a: false },
    { x: 70, y: 112, a: false },
  ];
  return (
    <>
      {[50, 100, 150].map((y) => (
        <motion.line
          key={`hr${y}`}
          x1="0"
          y1={y}
          x2="400"
          y2={y}
          stroke={INK}
          strokeOpacity="0.14"
          strokeWidth="1.5"
          variants={strokeV}
        />
      ))}
      {[70, 150, 230, 310].map((x) => (
        <motion.line
          key={`vr${x}`}
          x1={x}
          y1="0"
          x2={x}
          y2="200"
          stroke={INK}
          strokeOpacity="0.14"
          strokeWidth="1.5"
          variants={strokeV}
        />
      ))}
      <motion.path
        d="M0 118 C120 90 180 150 400 96"
        fill="none"
        stroke={INK}
        strokeOpacity="0.22"
        strokeWidth="2"
        variants={strokeV}
      />
      {pins.map((p, i) => (
        <motion.g key={`pin${i}`} variants={popV} style={nodeStyle}>
          <path
            d={`M${p.x} ${p.y} C ${p.x - 10} ${p.y - 12}, ${p.x - 12} ${p.y - 28}, ${p.x} ${p.y - 34} C ${p.x + 12} ${p.y - 28}, ${p.x + 10} ${p.y - 12}, ${p.x} ${p.y} Z`}
            fill={p.a ? ACCENT : SURFACE}
            stroke={p.a ? ACCENT : INK}
            strokeOpacity={p.a ? 1 : 0.5}
            strokeWidth="1.5"
          />
          <circle
            cx={p.x}
            cy={p.y - 21}
            r="4.5"
            fill={p.a ? SURFACE : INK}
            fillOpacity={p.a ? 1 : 0.55}
          />
        </motion.g>
      ))}
      <motion.path
        d="M320 46 l4 9 10 1 -7.5 6.5 2.3 9.8 -8.8 -5.2 -8.8 5.2 2.3 -9.8 -7.5 -6.5 10 -1 Z"
        fill={ACCENT}
        variants={popV}
        style={nodeStyle}
      />
    </>
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
  const lines = layers.slice(0, -1).flatMap((l, li) =>
    ys(l.n).flatMap((y1, a) =>
      ys(layers[li + 1].n).map((y2, b) => ({
        key: `${li}-${a}-${b}`,
        x1: l.x,
        y1,
        x2: layers[li + 1].x,
        y2,
      })),
    ),
  );
  return (
    <>
      {lines.map((ln) => (
        <motion.line
          key={ln.key}
          x1={ln.x1}
          y1={ln.y1}
          x2={ln.x2}
          y2={ln.y2}
          stroke={INK}
          strokeOpacity="0.12"
          strokeWidth="1"
          variants={strokeV}
        />
      ))}
      {layers.flatMap((l, li) =>
        ys(l.n).map((y, i) => {
          const out = li === layers.length - 1;
          return (
            <motion.circle
              key={`${li}-${i}`}
              cx={l.x}
              cy={y}
              r="9"
              fill={out ? ACCENT : SURFACE}
              stroke={out ? ACCENT : INK}
              strokeOpacity={out ? 1 : 0.45}
              strokeWidth="1.5"
              variants={popV}
              style={nodeStyle}
            />
          );
        }),
      )}
    </>
  );
}

const shapes: Record<ProjectCoverVariant, () => React.ReactElement> = {
  rag: Rag,
  cloud: Cloud,
  map: MapCover,
  neural: Neural,
};

export default function ProjectCover({
  variant,
  className = "",
  animate = true,
}: {
  variant: ProjectCoverVariant;
  className?: string;
  /** Set false to render the final state with no draw-in animation. */
  animate?: boolean;
}) {
  const reduce = useReducedMotion();
  const anim =
    reduce || !animate
      ? { initial: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, amount: 0.3 },
        };

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.svg
        viewBox="0 0 400 200"
        role="img"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        variants={container}
        {...anim}
      >
        <defs>
          <pattern
            id={`cg-${variant}`}
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
        <rect width="400" height="200" fill={SURFACE} />
        <motion.rect
          width="400"
          height="200"
          fill={`url(#cg-${variant})`}
          variants={fadeV}
        />
        {shapes[variant]()}
      </motion.svg>
    </div>
  );
}
