import { DatabaseDriverNotInstalledError } from "@/db/errors";

/**
 * Intentionally does not import better-sqlite3.
 * Installing that driver is a later choice, and a native module would make
 * dev and build depend on a database that has not been selected.
 */
export function createSqliteDatabase(url: string): Promise<never> {
  const scheme = url.startsWith("file:") || url.startsWith("sqlite:") ? "sqlite" : "unknown";
  return Promise.reject(
    new DatabaseDriverNotInstalledError(
      [
        `SQLite adapter is stubbed (URL scheme: ${scheme}).`,
        "When you choose SQLite:",
        "  1. npm install better-sqlite3",
        "  2. npm install -D @types/better-sqlite3",
        "  3. Set DATABASE_URL=file:./.data/app.db and DATABASE_DIALECT=sqlite",
        "  4. Replace this function with a drizzle-orm/better-sqlite3 client using src/db/schema.sqlite.ts",
        "  5. Generate migrations with npx drizzle-kit generate",
        "See README.md → Database.",
      ].join("\n"),
    ),
  );
}
