import { DatabaseDriverNotInstalledError } from "@/db/errors";

/**
 * Intentionally does not import `postgres` or `pg`.
 * Either driver can be added later without changing the content repository.
 */
export function createPostgresDatabase(url: string): Promise<never> {
  const scheme = url.startsWith("postgres://") || url.startsWith("postgresql://")
    ? "postgresql"
    : "unknown";
  return Promise.reject(
    new DatabaseDriverNotInstalledError(
      [
        `PostgreSQL adapter is stubbed (URL scheme: ${scheme}).`,
        "When you choose PostgreSQL:",
        "  1. npm install postgres   (or npm install pg)",
        "  2. Set DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/portfolio",
        "  3. Set DATABASE_DIALECT=postgresql",
        "  4. Replace this function with drizzle-orm/postgres-js or drizzle-orm/node-postgres using src/db/schema.postgres.ts",
        "  5. Generate migrations with npx drizzle-kit generate",
        "See README.md → Database.",
      ].join("\n"),
    ),
  );
}
