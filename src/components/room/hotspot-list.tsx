import type { HotspotView } from "@/lib/content/types";

type HotspotListProps = {
  hotspots: readonly HotspotView[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export function HotspotList({ hotspots, activeId, onSelect }: HotspotListProps) {
  return (
    <nav aria-label="Objects in this room" className="rounded-3xl border border-line bg-panel p-4">
      <h2 className="px-2 font-display text-2xl tracking-tight">In this room</h2>
      <p className="px-2 pt-1 text-sm leading-6 text-muted">
        Use Tab and Enter. The same objects can be selected in the scene.
      </p>
      <ul className="mt-3 space-y-2">
        {hotspots.map((hotspot) => {
          const selected = hotspot.id === activeId;
          return (
            <li key={hotspot.id}>
              <button
                type="button"
                id={`hotspot-${hotspot.id}`}
                aria-expanded={selected}
                aria-controls="room-object-dialog"
                onClick={() => onSelect(hotspot.id)}
                className={`flex w-full items-start justify-between gap-3 rounded-2xl px-3 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper ${
                  selected ? "bg-copper-soft" : "hover:bg-paper"
                }`}
              >
                <span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-muted">
                    {hotspot.kicker}
                  </span>
                  <span className="mt-1 block font-medium">{hotspot.label}</span>
                </span>
                <span className="pt-1 text-sm text-muted">{hotspot.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
