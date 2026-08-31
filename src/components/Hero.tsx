"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { getDict, siteMeta, socials, type Locale } from "@/lib/content";
import CopyEmail from "./CopyEmail";
import SocialIcon from "./SocialIcon";
import RotatingRole from "./RotatingRole";
import LocalTime from "./LocalTime";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const wordWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const PHOTO_TILT = 12;

export default function Hero({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const reduce = useReducedMotion();

  const anim = reduce
    ? {}
    : { variants: container, initial: "hidden" as const, animate: "visible" as const };
  const itemAnim = reduce ? {} : { variants: item };

  // Photo tilts toward the pointer (same spring feel as the project cards).
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 170, damping: 20 };
  const photoRotateY = useSpring(
    useTransform(px, [0, 1], [PHOTO_TILT, -PHOTO_TILT]),
    spring,
  );
  const photoRotateX = useSpring(
    useTransform(py, [0, 1], [-PHOTO_TILT, PHOTO_TILT]),
    spring,
  );
  const onPhotoMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onPhotoLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-[6%] top-[12%] h-[46vh] max-h-[540px] w-[46vh] max-w-[540px] rounded-full blur-[130px]"
          style={{ backgroundColor: "var(--color-accent)", opacity: 0.14 }}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <motion.div
        {...anim}
        className="container-page relative z-10 grid w-full gap-y-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-x-12"
      >
        {/* Left rail — meta */}
        <div className="flex flex-col gap-6">
          {siteMeta.photo ? (
            <div className="w-36 [perspective:900px]">
              <motion.div
                {...itemAnim}
                onMouseMove={reduce ? undefined : onPhotoMove}
                onMouseLeave={reduce ? undefined : onPhotoLeave}
                style={
                  reduce
                    ? undefined
                    : {
                        rotateX: photoRotateX,
                        rotateY: photoRotateY,
                        transformStyle: "preserve-3d",
                      }
                }
                className="group relative aspect-square w-36 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <Image
                  src={siteMeta.photo}
                  alt={siteMeta.name}
                  fill
                  sizes="144px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  priority
                />
                {/* faint warm wash + inner hairline so the photo reads as part of the paper */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[var(--color-accent)] opacity-[0.05] mix-blend-multiply"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[var(--color-fg)]/10"
                />
              </motion.div>
            </div>
          ) : null}

          <motion.div {...itemAnim} className="space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
              {t.ui.email}
            </p>
            <CopyEmail lang={lang} email={siteMeta.email} />
          </motion.div>

          <motion.span
            {...itemAnim}
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-fg)]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            </span>
            {t.hero.status}
          </motion.span>

          <motion.div {...itemAnim} className="space-y-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
              {t.ui.basedIn}
            </p>
            <p className="text-sm text-[var(--color-fg)]">{t.location}</p>
            <LocalTime lang={lang} />
          </motion.div>
        </div>

        {/* Right column — statement */}
        <div>
          {reduce ? (
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
              {siteMeta.name}
            </h1>
          ) : (
            <motion.h1
              variants={wordWrap}
              aria-label={siteMeta.name}
              className="text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.98] tracking-[-0.03em]"
            >
              {siteMeta.name.split(" ").map((w, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="mr-[0.22em] inline-block overflow-hidden pb-[0.06em] align-bottom"
                >
                  <motion.span variants={word} className="inline-block">
                    {w}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
          )}

          <motion.p
            {...itemAnim}
            className="mt-4 text-xl font-medium tracking-[-0.01em] text-[var(--color-muted)] sm:text-2xl"
          >
            {t.hero.role.split(" & ")[0]} &amp;{" "}
            <span className="text-[var(--color-fg)]">
              <RotatingRole roles={t.hero.roles} />
            </span>
          </motion.p>

          <div className="mt-7 max-w-xl space-y-4">
            {t.hero.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                {...itemAnim}
                className="text-lg leading-[1.35] text-[var(--color-fg)]"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            {...itemAnim}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <a
              href="#projects"
              className="group relative pb-1 text-sm font-medium uppercase tracking-[0.1em]"
            >
              {t.ui.viewWork}
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 bg-[var(--color-border)] transition-colors duration-300 group-hover:bg-[var(--color-fg)]" />
            </a>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] transition-all hover:-translate-y-0.5 hover:text-[var(--color-fg)]"
              >
                <SocialIcon name={s.icon} size={15} />
                {s.icon === "Mail" ? t.ui.email : s.label}
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="container-page relative z-10 mt-16 md:mt-24"
      >
        <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
          <motion.span
            aria-hidden
            animate={reduce ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
          ({t.ui.scrollHint})
        </span>
      </motion.div>
    </section>
  );
}
