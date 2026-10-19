import { createPostgresDatabase } from "@/db/adapters/postgres";
import { createSqliteDatabase } from "@/db/adapters/sqlite";
import { resolveDialect } from "@/db/dialect";
import { DatabaseNotConfiguredError } from "@/db/errors";

/**
 * Opens a Drizzle client for the URL in DATABASE_URL.
 * Pages do not call this. Content reads go through getContentRepository().
 * With no DATABASE_URL, this throws DatabaseNotConfiguredError and nothing connects.
 */
export async function createDatabase() {
  const url = process.env.DATABASE_URL?.trim();
  const dialect = resolveDialect(url);

  if (!url || !dialect) {
    throw new DatabaseNotConfiguredError();
  }

  if (dialect === "sqlite") {
    return createSqliteDatabase(url);
  }

  return createPostgresDatabase(url);
}
