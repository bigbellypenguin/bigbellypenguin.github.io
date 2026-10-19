export type Experience = {
  id: string;
  role: string;
  organization: string;
  summary: string;
  startDate: string | null;
  endDate: string | null;
  placeholder: boolean;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  tags: readonly string[];
  url: string | null;
  repositoryUrl: string | null;
  placeholder: boolean;
};

export type Idea = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string | null;
  placeholder: boolean;
};

export type RoomObjectKind = "desk" | "shelf" | "window";

export type Vec3 = [number, number, number];

export type ContentRef =
  | { readonly type: "experience"; readonly id: string }
  | { readonly type: "project"; readonly id: string }
  | { readonly type: "idea"; readonly id: string };

export type Hotspot = {
  id: string;
  label: string;
  object: RoomObjectKind;
  position: Vec3;
  rotation?: Vec3;
  content: ContentRef;
};

export type Room = {
  id: string;
  name: string;
  description: string;
  hotspots: readonly Hotspot[];
};

export type RoomSummary = {
  id: string;
  name: string;
};

export type HotspotView = {
  id: string;
  label: string;
  object: RoomObjectKind;
  position: Vec3;
  rotation: Vec3;
  kicker: string;
  title: string;
  summary: string;
  href: string;
  placeholder: boolean;
};

export type RoomView = {
  id: string;
  name: string;
  description: string;
  hotspots: HotspotView[];
  availableRooms: RoomSummary[];
};
