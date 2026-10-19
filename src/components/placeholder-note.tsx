import type { ReactNode } from "react";

export function PlaceholderNote({ children }: { children?: ReactNode }) {
  return (
    <div
      role="note"
      className="rounded-2xl border border-copper/20 bg-copper-soft px-4 py-3 text-sm leading-6 text-ink"
    >
      <span className="font-semibold">Placeholder. </span>
      {children ??
        "This entry is structure for the redesign. It is not a biography, job, or finished project."}
    </div>
  );
}
