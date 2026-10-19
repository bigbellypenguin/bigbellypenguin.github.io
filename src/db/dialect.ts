export type DatabaseDialect = "sqlite" | "postgresql";

/**
 * Picks a dialect from DATABASE_URL. Returns null for an empty or unknown URL
 * so callers can keep using the file-based content repository.
 */
export function resolveDialect(databaseUrl: string | undefined): DatabaseDialect | null {
  const url = databaseUrl?.trim() ?? "";
  if (!url) return null;
  if (url.startsWith("postgres://") || url.startsWith("postgresql://")) {
    return "postgresql";
  }
  if (url.startsWith("file:") || url.startsWith("sqlite:")) {
    return "sqlite";
  }
  return null;
}
