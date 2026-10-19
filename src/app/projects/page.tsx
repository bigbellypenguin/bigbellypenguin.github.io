import type { Metadata } from "next";
import Link from "next/link";
import { PlaceholderNote } from "@/components/placeholder-note";
import { getContentRepository } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Jonathan Hsu. Entries are placeholders.",
};

export default async function ProjectsPage() {
  const projects = await getContentRepository().listProjects();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-sm uppercase tracking-[0.18em] text-muted">Projects</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">Projects</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/80">
        Work will be listed here. The card below is a placeholder wired to the
        desk in the study.
      </p>
      <div className="mt-6">
        <PlaceholderNote />
      </div>
      <ul className="mt-6 space-y-4">
        {projects.map((project) => (
          <li key={project.id}>
            <article className="rounded-3xl border border-line bg-panel p-6">
              <h2 className="font-display text-2xl tracking-tight">
                <Link
                  href={`/projects/${project.slug}`}
                  className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
                >
                  {project.title}
                </Link>
              </h2>
              <p className="mt-3 leading-7">{project.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-[0.14em] text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
