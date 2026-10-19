import type { Room } from "@/lib/content/types";

/**
 * Rooms and hotspots are data. Add a room by appending an object with a new id.
 * Each hotspot points at an experience, project, or idea id from src/content.
 * Open it at /?room=<id>.
 */
export const rooms: readonly Room[] = [
  {
    id: "1",
    name: "Study",
    description:
      "A prototype room. The desk, shelf, and window open placeholder entries for a project, an essay, and an experience. Placement and labels live in this file so later rooms can be added without rewriting the scene.",
    hotspots: [
      {
        id: "desk",
        label: "Desk",
        object: "desk",
        position: [-1.15, 0, 0.55],
        rotation: [0, 0.18, 0],
        content: { type: "project", id: "placeholder-project" },
      },
      {
        id: "shelf",
        label: "Shelf",
        object: "shelf",
        position: [1.85, 0, -1.15],
        rotation: [0, -0.42, 0],
        content: { type: "idea", id: "notes-from-the-room" },
      },
      {
        id: "window",
        label: "Window",
        object: "window",
        position: [-0.15, 1.42, -2.58],
        content: { type: "experience", id: "placeholder-experience" },
      },
    ],
  },
];
