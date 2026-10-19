import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-muted">
        <p>{site.name}</p>
        <a
          href={site.githubUrl}
          className="underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
          rel="noreferrer"
          target="_blank"
        >
          github.com/bigbellypenguin
        </a>
      </div>
    </footer>
  );
}
