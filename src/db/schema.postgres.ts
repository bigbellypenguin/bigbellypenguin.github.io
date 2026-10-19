import { boolean, pgTable, text } from "drizzle-orm/pg-core";

/**
 * Logical tables for a future PostgreSQL database.
 * Same shape as schema.sqlite.ts. Not migrated and not queried by the site.
 */
export const experiences = pgTable("experiences", {
  id: text("id").primaryKey(),
  role: text("role").notNull(),
  organization: text("organization").notNull(),
  summary: text("summary").notNull(),
  startDate: text("start_date"),
  endDate: text("end_date"),
  placeholder: boolean("placeholder").notNull().default(true),
});

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  tagsJson: text("tags_json").notNull().default("[]"),
  url: text("url"),
  repositoryUrl: text("repository_url"),
  placeholder: boolean("placeholder").notNull().default(true),
});

export const ideas = pgTable("ideas", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  publishedAt: text("published_at"),
  bodyPath: text("body_path"),
  placeholder: boolean("placeholder").notNull().default(true),
});
