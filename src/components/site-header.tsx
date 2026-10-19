import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/?room=1", label: "Room" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/ideas", label: "Ideas" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-paper/90">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4">
        <Link
          href="/?room=1"
          className="font-display text-xl tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
        >
          {site.name}
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink/80 underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.githubUrl}
            className="text-ink/80 underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
