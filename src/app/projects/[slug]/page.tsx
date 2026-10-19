import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PlaceholderNote } from "@/components/placeholder-note";
import { getContentRepository } from "@/lib/content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getContentRepository().listProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getContentRepository().getProject(slug);
  return {
    title: project?.title ?? "Project",
    description: project?.summary,
  };
}

export default function ProjectPage(props: ProjectPageProps) {
  return (
    <Suspense fallback={<ArticleFallback label="project" />}>
      <ProjectArticle params={props.params} />
    </Suspense>
  );
}

async function ProjectArticle({ params }: Pick<ProjectPageProps, "params">) {
  const { slug } = await params;
  const project = await getContentRepository().getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-sm uppercase tracking-[0.18em] text-muted">Project</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">{project.title}</h1>
      {project.placeholder ? (
        <div className="mt-6">
          <PlaceholderNote />
        </div>
      ) : null}
      <p className="mt-6 text-lg leading-8">{project.summary}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-[0.14em] text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        {project.url ? (
          <a href={project.url} className="underline underline-offset-4" rel="noreferrer" target="_blank">
            Live site
          </a>
        ) : (
          <span className="text-muted">Live link not set</span>
        )}
        {project.repositoryUrl ? (
          <a
            href={project.repositoryUrl}
            className="underline underline-offset-4"
            rel="noreferrer"
            target="_blank"
          >
            Repository
          </a>
        ) : (
          <span className="text-muted">Repository not set</span>
        )}
      </div>
      <p className="mt-10">
        <Link href="/projects" className="text-sm underline underline-offset-4">
          All projects
        </Link>
      </p>
    </article>
  );
}

function ArticleFallback({ label }: { label: string }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <div className="h-4 w-24 rounded-full bg-line" />
      <div className="mt-4 h-12 w-2/3 rounded-2xl bg-line" />
      <p className="sr-only">Loading {label}</p>
    </div>
  );
}
