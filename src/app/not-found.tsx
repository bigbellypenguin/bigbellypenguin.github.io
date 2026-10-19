import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20">
      <p className="text-sm uppercase tracking-[0.18em] text-muted">Missing page</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">That page is not here.</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
        The study is still at the front of {site.name}&apos;s site.
      </p>
      <Link
        href="/?room=1"
        className="mt-8 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
      >
        Back to the room
      </Link>
    </div>
  );
}
