import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Logical tables for a future SQLite database.
 * Not migrated and not queried by the site. See README.md before generating SQL.
 */
export const experiences = sqliteTable("experiences", {
  id: text("id").primaryKey(),
  role: text("role").notNull(),
  organization: text("organization").notNull(),
  summary: text("summary").notNull(),
  startDate: text("start_date"),
  endDate: text("end_date"),
  placeholder: integer("placeholder", { mode: "boolean" }).notNull().default(true),
});

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  tagsJson: text("tags_json").notNull().default("[]"),
  url: text("url"),
  repositoryUrl: text("repository_url"),
  placeholder: integer("placeholder", { mode: "boolean" }).notNull().default(true),
});

export const ideas = sqliteTable("ideas", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  publishedAt: text("published_at"),
  bodyPath: text("body_path"),
  placeholder: integer("placeholder", { mode: "boolean" }).notNull().default(true),
});
