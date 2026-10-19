import { experiences } from "@/content/experiences";
import { ideas } from "@/content/ideas";
import { projects } from "@/content/projects";
import { rooms } from "@/content/rooms";
import type { ContentRepository } from "@/lib/content/repository";
import type {
  ContentRef,
  Experience,
  Hotspot,
  HotspotView,
  Idea,
  Project,
  RoomView,
} from "@/lib/content/types";

function cloneExperience(entry: Experience): Experience {
  return { ...entry };
}

function cloneProject(entry: Project): Project {
  return { ...entry, tags: [...entry.tags] };
}

function cloneIdea(entry: Idea): Idea {
  return { ...entry };
}

function findExperience(id: string): Experience | undefined {
  return experiences.find((entry) => entry.id === id);
}

function findProjectById(id: string): Project | undefined {
  return projects.find((entry) => entry.id === id);
}

function findProjectBySlug(slug: string): Project | undefined {
  return projects.find((entry) => entry.slug === slug);
}

function findIdeaById(id: string): Idea | undefined {
  return ideas.find((entry) => entry.id === id);
}

function findIdeaBySlug(slug: string): Idea | undefined {
  return ideas.find((entry) => entry.slug === slug);
}

function hrefFor(ref: ContentRef, entry: Experience | Project | Idea): string {
  if (ref.type === "experience") return `/about#${entry.id}`;
  if (ref.type === "project") return `/projects/${(entry as Project).slug}`;
  return `/ideas/${(entry as Idea).slug}`;
}

function kickerFor(ref: ContentRef): string {
  if (ref.type === "experience") return "Experience";
  if (ref.type === "project") return "Project";
  return "Idea";
}

function resolveHotspot(hotspot: Hotspot): HotspotView {
  const ref = hotspot.content;
  const entry =
    ref.type === "experience"
      ? findExperience(ref.id)
      : ref.type === "project"
        ? findProjectById(ref.id)
        : findIdeaById(ref.id);

  if (!entry) {
    throw new Error(
      `Room hotspot "${hotspot.id}" points at missing ${ref.type} "${ref.id}".`,
    );
  }

  const title =
    ref.type === "experience"
      ? (entry as Experience).role
      : (entry as Project | Idea).title;

  return {
    id: hotspot.id,
    label: hotspot.label,
    object: hotspot.object,
    position: hotspot.position,
    rotation: hotspot.rotation ?? [0, 0, 0],
    kicker: kickerFor(ref),
    title,
    summary: entry.summary,
    href: hrefFor(ref, entry),
    placeholder: entry.placeholder,
  };
}

export async function listExperiences(): Promise<Experience[]> {
  "use cache";
  return experiences.map(cloneExperience);
}

export async function getExperience(id: string): Promise<Experience | null> {
  "use cache";
  const entry = findExperience(id);
  return entry ? cloneExperience(entry) : null;
}

export async function listProjects(): Promise<Project[]> {
  "use cache";
  return projects.map(cloneProject);
}

export async function getProject(slug: string): Promise<Project | null> {
  "use cache";
  const entry = findProjectBySlug(slug);
  return entry ? cloneProject(entry) : null;
}

export async function listIdeas(): Promise<Idea[]> {
  "use cache";
  return ideas.map(cloneIdea);
}

export async function getIdea(slug: string): Promise<Idea | null> {
  "use cache";
  const entry = findIdeaBySlug(slug);
  return entry ? cloneIdea(entry) : null;
}

export async function listRooms() {
  "use cache";
  return rooms.map((room) => ({ id: room.id, name: room.name }));
}

export async function getRoom(id: string): Promise<RoomView | null> {
  "use cache";
  const room = rooms.find((entry) => entry.id === id);
  if (!room) return null;

  return {
    id: room.id,
    name: room.name,
    description: room.description,
    hotspots: room.hotspots.map(resolveHotspot),
    availableRooms: rooms.map((entry) => ({ id: entry.id, name: entry.name })),
  };
}

export const localContentRepository: ContentRepository = {
  listExperiences,
  getExperience,
  listProjects,
  getProject,
  listIdeas,
  getIdea,
  listRooms,
  getRoom,
};
