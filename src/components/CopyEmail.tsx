"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { getDict, type Locale } from "@/lib/content";

export default function CopyEmail({
  lang,
  email,
  /** Hide the address itself (use when it's already shown nearby). */
  compact = false,
}: {
  lang: Locale;
  email: string;
  compact?: boolean;
}) {
  const t = getDict(lang).ui;
  const [copied, setCopied] = useState(false);

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      // Fallback for non-secure contexts / older browsers.
      try {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {compact ? (
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
        >
          {copied ? (
            <Check size={15} aria-hidden />
          ) : (
            <Copy size={15} aria-hidden />
          )}
          <span aria-live="polite">{copied ? t.copied : t.copyEmail}</span>
        </button>
      ) : (
        <>
          <a
            href={`mailto:${email}`}
            className="text-sm tracking-tight text-[var(--color-fg)] underline decoration-[var(--color-border)] underline-offset-4 transition-colors hover:decoration-[var(--color-fg)]"
          >
            {email}
          </a>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? t.copied : t.copyEmail}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)]"
          >
            {copied ? (
              <Check size={15} aria-hidden />
            ) : (
              <Copy size={15} aria-hidden />
            )}
          </button>
          <span
            aria-live="polite"
            className={`text-[11px] uppercase tracking-wide text-[var(--color-muted)] transition-opacity ${
              copied ? "opacity-100" : "opacity-0"
            }`}
          >
            {t.copied}
          </span>
        </>
      )}
    </div>
  );
}
