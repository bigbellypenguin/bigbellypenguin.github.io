import type { Metadata } from "next";
import { PlaceholderNote } from "@/components/placeholder-note";
import { getContentRepository } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Jonathan Hsu. Experience entries are placeholders.",
};

export default async function AboutPage() {
  const experiences = await getContentRepository().listExperiences();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-sm uppercase tracking-[0.18em] text-muted">About</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">{site.name}</h1>
      <p className="mt-5 text-lg leading-8 text-ink/80">
        This page will hold experience. The only public identity recorded in
        this scaffold is the name and the GitHub profile.
      </p>
      <dl className="mt-8 grid gap-4 rounded-3xl border border-line bg-panel p-5 sm:grid-cols-[8rem_1fr]">
        <dt className="text-sm uppercase tracking-[0.16em] text-muted">Name</dt>
        <dd>{site.name}</dd>
        <dt className="text-sm uppercase tracking-[0.16em] text-muted">GitHub</dt>
        <dd>
          <a
            href={site.githubUrl}
            className="underline decoration-copper/40 underline-offset-4"
            rel="noreferrer"
            target="_blank"
          >
            github.com/bigbellypenguin
          </a>
        </dd>
      </dl>

      <h2 className="mt-14 font-display text-3xl tracking-tight">Experience</h2>
      <div className="mt-4">
        <PlaceholderNote>
          No employer, title, or biography has been added. The card below is a
          typed placeholder so the page and the room window have a target.
        </PlaceholderNote>
      </div>
      <ul className="mt-6 space-y-4">
        {experiences.map((experience) => (
          <li key={experience.id}>
            <article
              id={experience.id}
              className="rounded-3xl border border-line bg-panel p-6"
            >
              <h3 className="font-display text-2xl tracking-tight">{experience.role}</h3>
              <p className="mt-1 text-sm text-muted">{experience.organization}</p>
              <p className="mt-4 leading-7">{experience.summary}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
