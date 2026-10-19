import { localContentRepository } from "@/lib/content/local";
import type { ContentRepository } from "@/lib/content/repository";

export function getContentRepository(): ContentRepository {
  return localContentRepository;
}

export type {
  ContentRef,
  Experience,
  HotspotView,
  Idea,
  Project,
  RoomObjectKind,
  RoomSummary,
  RoomView,
} from "@/lib/content/types";
