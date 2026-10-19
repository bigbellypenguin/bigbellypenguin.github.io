"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { HotspotView } from "@/lib/content/types";

type ContentPanelProps = {
  hotspot: HotspotView | null;
  onClose: () => void;
};

export function ContentPanel({ hotspot, onClose }: ContentPanelProps) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hotspot) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    focusable()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [hotspot, onClose]);

  return (
    <AnimatePresence>
      {hotspot ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center p-3 sm:items-center sm:p-6">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute inset-0 bg-ink/35"
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            id="room-object-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="room-object-title"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-lg rounded-3xl border border-line bg-panel p-6 shadow-[0_24px_80px_rgba(28,25,21,0.18)]"
          >
            {hotspot.placeholder ? (
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
                Placeholder
              </p>
            ) : null}
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-muted">
              {hotspot.kicker} · {hotspot.label}
            </p>
            <h2 id="room-object-title" className="mt-2 font-display text-3xl tracking-tight">
              {hotspot.title}
            </h2>
            <p className="mt-4 leading-7 text-ink/85">{hotspot.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={hotspot.href}
                className="inline-flex rounded-full bg-ink px-4 py-2 text-sm text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
              >
                Open the full entry
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex rounded-full border border-line px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
