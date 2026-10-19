import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PlaceholderNote } from "@/components/placeholder-note";
import { getContentRepository } from "@/lib/content";
import { loadIdeaBody } from "@/lib/content/idea-bodies";

type IdeaPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const ideas = await getContentRepository().listIdeas();
  return ideas.map((idea) => ({ slug: idea.slug }));
}

export async function generateMetadata({ params }: IdeaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const idea = await getContentRepository().getIdea(slug);
  return {
    title: idea?.title ?? "Idea",
    description: idea?.summary,
  };
}

export default function IdeaPage(props: IdeaPageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-5 py-14">
          <div className="h-12 w-2/3 rounded-2xl bg-line" />
          <p className="sr-only">Loading essay</p>
        </div>
      }
    >
      <IdeaArticle params={props.params} />
    </Suspense>
  );
}

async function IdeaArticle({ params }: Pick<IdeaPageProps, "params">) {
  const { slug } = await params;
  const idea = await getContentRepository().getIdea(slug);
  if (!idea) notFound();
  const Body = await loadIdeaBody(slug);

  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-sm uppercase tracking-[0.18em] text-muted">Idea</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">{idea.title}</h1>
      <p className="mt-4 text-lg leading-8 text-ink/80">{idea.summary}</p>
      {idea.placeholder ? (
        <div className="mt-6">
          <PlaceholderNote />
        </div>
      ) : null}
      <div className="mt-8">
        {Body ? (
          <Body />
        ) : (
          <p className="leading-7">
            The MDX file for this slug is not registered in{" "}
            <code>src/lib/content/idea-bodies.ts</code>.
          </p>
        )}
      </div>
      <p className="mt-10">
        <Link href="/ideas" className="text-sm underline underline-offset-4">
          All ideas
        </Link>
      </p>
    </article>
  );
}
