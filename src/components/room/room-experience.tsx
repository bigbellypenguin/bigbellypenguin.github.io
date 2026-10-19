"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import type { RoomView } from "@/lib/content/types";
import { ContentPanel } from "@/components/room/content-panel";
import { HotspotList } from "@/components/room/hotspot-list";
import { RoomFallback } from "@/components/room/room-fallback";

const RoomCanvas = dynamic(
  () => import("@/components/room/room-canvas").then((mod) => mod.RoomCanvas),
  {
    ssr: false,
    loading: () => <div className="h-full min-h-[420px] bg-room" />,
  },
);

type StageOverride = "auto" | "scene" | "fallback";

type Capability = {
  webgl: boolean;
  reducedMotion: boolean;
};

const serverCapability: Capability = { webgl: true, reducedMotion: false };
let clientCapability: Capability | null = null;

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function readCapability(): Capability {
  const next: Capability = {
    webgl: hasWebGL(),
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
  if (
    clientCapability &&
    clientCapability.webgl === next.webgl &&
    clientCapability.reducedMotion === next.reducedMotion
  ) {
    return clientCapability;
  }
  clientCapability = next;
  return clientCapability;
}

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function resolveMode(capability: Capability, override: StageOverride): "scene" | "fallback" {
  if (!capability.webgl) return "fallback";
  if (override === "scene") return "scene";
  if (override === "fallback") return "fallback";
  return capability.reducedMotion ? "fallback" : "scene";
}

export function RoomExperience({
  room,
  initialObjectId,
}: {
  room: RoomView;
  initialObjectId: string | null;
}) {
  const capability = useSyncExternalStore(subscribe, readCapability, () => serverCapability);
  const [override, setOverride] = useState<StageOverride>("auto");
  const mode = resolveMode(capability, override);
  const knownInitial = room.hotspots.some((hotspot) => hotspot.id === initialObjectId)
    ? initialObjectId
    : null;
  const [activeId, setActiveId] = useState<string | null>(knownInitial);
  const active = useMemo(
    () => room.hotspots.find((hotspot) => hotspot.id === activeId) ?? null,
    [activeId, room.hotspots],
  );

  const writeUrl = useCallback(
    (objectId: string | null) => {
      const url = new URL(window.location.href);
      url.searchParams.set("room", room.id);
      if (objectId) url.searchParams.set("object", objectId);
      else url.searchParams.delete("object");
      window.history.replaceState(null, "", `${url.pathname}${url.search}`);
    },
    [room.id],
  );

  const select = useCallback(
    (id: string) => {
      setActiveId(id);
      writeUrl(id);
    },
    [writeUrl],
  );

  const close = useCallback(() => {
    setActiveId(null);
    writeUrl(null);
  }, [writeUrl]);

  const fallbackMessage = !capability.webgl
    ? "This browser has no WebGL, so the study is shown as a flat drawing. The object list still opens each entry."
    : capability.reducedMotion && override !== "scene"
      ? "Reduced motion is on, so the 3D room stays hidden. The object list opens the same entries."
      : "The flat view keeps the same desk, shelf, and window without a 3D scene.";

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-16 lg:grid-cols-[minmax(0,1fr)_19rem]">
      <div>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-muted">Room {room.id}</p>
            <h2 className="font-display text-4xl tracking-tight">{room.name}</h2>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Room display">
            <ModeButton
              pressed={mode === "scene"}
              disabled={!capability.webgl}
              onClick={() => setOverride("scene")}
            >
              Room view
            </ModeButton>
            <ModeButton pressed={mode === "fallback"} onClick={() => setOverride("fallback")}>
              Flat view
            </ModeButton>
          </div>
        </div>
        <p className="mb-4 max-w-2xl leading-7 text-ink/80">{room.description}</p>
        {room.availableRooms.length > 1 ? (
          <ul className="mb-4 flex flex-wrap gap-3 text-sm">
            {room.availableRooms.map((entry) => (
              <li key={entry.id}>
                <Link
                  href={`/?room=${entry.id}`}
                  aria-current={entry.id === room.id ? "page" : undefined}
                  className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
                >
                  {entry.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="overflow-hidden rounded-3xl border border-line bg-room">
          <p className="sr-only">
            {mode === "scene"
              ? "Drag to look around the study. Select the desk, shelf, or window, or use the object list."
              : fallbackMessage}
          </p>
          <div className="h-[min(70vh,640px)] min-h-[420px]">
            {mode === "scene" ? (
              <RoomCanvas hotspots={room.hotspots} activeId={activeId} onSelect={select} />
            ) : (
              <RoomFallback message={fallbackMessage} />
            )}
          </div>
        </div>
      </div>
      <HotspotList hotspots={room.hotspots} activeId={activeId} onSelect={select} />
      <ContentPanel hotspot={active} onClose={close} />
    </section>
  );
}

function ModeButton({
  pressed,
  disabled,
  onClick,
  children,
}: {
  pressed: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper disabled:cursor-not-allowed disabled:opacity-50 ${
        pressed ? "border-ink bg-ink text-paper" : "border-line bg-panel text-ink"
      }`}
    >
      {children}
    </button>
  );
}
