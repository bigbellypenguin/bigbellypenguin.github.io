export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super(
      "No database is configured. Content comes from the local repository in src/lib/content. Set DATABASE_URL after choosing SQLite or PostgreSQL. See README.md.",
    );
    this.name = "DatabaseNotConfiguredError";
  }
}

export class DatabaseDriverNotInstalledError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseDriverNotInstalledError";
  }
}
