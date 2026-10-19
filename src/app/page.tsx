import Link from "next/link";
import { Suspense } from "react";
import { RoomExperience } from "@/components/room/room-experience";
import { getContentRepository } from "@/lib/content";
import type { RoomSummary } from "@/lib/content/types";
import { readParam } from "@/lib/read-param";
import { site } from "@/lib/site";

export const metadata = {
  title: "Room",
  description: site.description,
};

type HomePageProps = {
  searchParams: Promise<{
    room?: string | string[];
    object?: string | string[];
  }>;
};

export default function HomePage(props: HomePageProps) {
  return (
    <div className="pb-4">
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-12">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Study</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight sm:text-6xl">
          {site.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/80">
          A personal site in progress. This study is the base for an explorable
          room: objects stand in for projects, writing, and experience. The
          scene is a prototype, and the entries inside it are placeholders.
        </p>
        <p className="mt-4 text-sm">
          <a
            href={site.githubUrl}
            className="underline decoration-copper/40 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </p>
      </section>
      <Suspense fallback={<RoomSkeleton />}>
        <RoomSection searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

async function RoomSection({
  searchParams,
}: Pick<HomePageProps, "searchParams">) {
  const query = await searchParams;
  const requested = readParam(query.room) ?? "1";
  const objectId = readParam(query.object) ?? null;
  const content = getContentRepository();
  const room = await content.getRoom(requested);

  if (!room) {
    const rooms = await content.listRooms();
    return <UnknownRoom requested={requested} rooms={rooms} />;
  }

  return <RoomExperience key={room.id} room={room} initialObjectId={objectId} />;
}

function UnknownRoom({
  requested,
  rooms,
}: {
  requested: string;
  rooms: RoomSummary[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16">
      <h2 className="font-display text-4xl tracking-tight">No room named {requested}</h2>
      <p className="mt-3 max-w-xl leading-7 text-muted">
        Room ids live in the room config. These are the ones defined now.
      </p>
      <ul className="mt-6 flex flex-wrap gap-3">
        {rooms.map((room) => (
          <li key={room.id}>
            <Link
              href={`/?room=${room.id}`}
              className="inline-flex rounded-full border border-line bg-panel px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
            >
              {room.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RoomSkeleton() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-5 pb-16 lg:grid-cols-[minmax(0,1fr)_19rem]">
      <div className="h-[min(70vh,640px)] min-h-[420px] rounded-3xl bg-room" />
      <div className="h-64 rounded-3xl border border-line bg-panel" />
    </div>
  );
}
