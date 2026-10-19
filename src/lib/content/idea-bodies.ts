import type { ComponentType } from "react";

/**
 * Static import map so the bundler can see every essay.
 * Adding an idea: create content/ideas/<slug>.mdx and add one line here.
 */
const ideaBodies = {
  "notes-from-the-room": () =>
    import("@content/ideas/notes-from-the-room.mdx"),
} satisfies Record<string, () => Promise<{ default: ComponentType }>>;

export function hasIdeaBody(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(ideaBodies, slug);
}

export async function loadIdeaBody(
  slug: string,
): Promise<ComponentType | null> {
  const load = ideaBodies[slug as keyof typeof ideaBodies];
  if (!load) return null;
  const loaded = await load();
  return loaded.default;
}
