import type {
  Experience,
  Idea,
  Project,
  RoomSummary,
  RoomView,
} from "@/lib/content/types";

/**
 * The UI talks to this interface only.
 * The current implementation reads local TypeScript and MDX files.
 * A later database-backed implementation can replace it without changing pages.
 */
export interface ContentRepository {
  listExperiences(): Promise<Experience[]>;
  getExperience(id: string): Promise<Experience | null>;
  listProjects(): Promise<Project[]>;
  getProject(slug: string): Promise<Project | null>;
  listIdeas(): Promise<Idea[]>;
  getIdea(slug: string): Promise<Idea | null>;
  listRooms(): Promise<RoomSummary[]>;
  getRoom(id: string): Promise<RoomView | null>;
}
