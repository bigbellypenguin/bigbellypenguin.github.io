import type { Idea } from "@/lib/content/types";

/**
 * Essay metadata. The long-form body lives in content/ideas/<slug>.mdx
 * and must be registered in src/lib/content/idea-bodies.ts.
 */
export const ideas: readonly Idea[] = [
  {
    id: "notes-from-the-room",
    slug: "notes-from-the-room",
    title: "Placeholder: notes from the room",
    summary:
      "Placeholder. This essay exists so the Ideas page and the room shelf can render an MDX body. Replace the file with real writing.",
    publishedAt: null,
    placeholder: true,
  },
];
