import { defineConfig } from "drizzle-kit";

/**
 * Drizzle Kit loads this file only when you ask it to (generate, push, studio).
 * The Next.js app does not import it, and no migration folder is checked in yet.
 */
const dialect = process.env.DATABASE_DIALECT;
const url = process.env.DATABASE_URL?.trim();

if (dialect !== "sqlite" && dialect !== "postgresql") {
  throw new Error(
    "Set DATABASE_DIALECT to sqlite or postgresql before running drizzle-kit. No database is selected yet. See README.md.",
  );
}

if (!url) {
  throw new Error(
    "Set DATABASE_URL before running drizzle-kit. See .env.example.",
  );
}

const shared = {
  out: "./drizzle",
  dbCredentials: { url },
} as const;

export default dialect === "postgresql"
  ? defineConfig({
      ...shared,
      dialect: "postgresql",
      schema: "./src/db/schema.postgres.ts",
    })
  : defineConfig({
      ...shared,
      dialect: "sqlite",
      schema: "./src/db/schema.sqlite.ts",
    });
