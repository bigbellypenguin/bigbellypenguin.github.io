import type { Metadata } from "next";
import Link from "next/link";
import { PlaceholderNote } from "@/components/placeholder-note";
import { getContentRepository } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ideas",
  description: "Writing by Jonathan Hsu. Entries are placeholders and MDX-ready.",
};

export default async function IdeasPage() {
  const ideas = await getContentRepository().listIdeas();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-sm uppercase tracking-[0.18em] text-muted">Ideas</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">Ideas</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/80">
        Essays will live here as MDX. The note below is a placeholder the shelf
        in the study can open.
      </p>
      <div className="mt-6">
        <PlaceholderNote />
      </div>
      <ul className="mt-6 space-y-4">
        {ideas.map((idea) => (
          <li key={idea.id}>
            <article className="rounded-3xl border border-line bg-panel p-6">
              <h2 className="font-display text-2xl tracking-tight">
                <Link
                  href={`/ideas/${idea.slug}`}
                  className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
                >
                  {idea.title}
                </Link>
              </h2>
              <p className="mt-3 leading-7">{idea.summary}</p>
              {idea.publishedAt ? (
                <p className="mt-3 text-sm text-muted">{idea.publishedAt}</p>
              ) : (
                <p className="mt-3 text-sm text-muted">Date not set</p>
              )}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
