# Jonathan Hsu

Personal site for [Jonathan Hsu](https://github.com/bigbellypenguin). This branch is a technical foundation for a redesign: an explorable room whose objects open projects, writing, and experience. The visual design, the real copy, and the database are intentionally not decided yet.

The only identity recorded here is the name **Jonathan Hsu** and the GitHub profile [github.com/bigbellypenguin](https://github.com/bigbellypenguin). Entries in the study are placeholders.

## Stack

| Piece | Choice | Why |
| --- | --- | --- |
| App | Next.js 16 App Router, React 19, TypeScript `strict` | Server components, file routes, and a Node deployment path. Cache Components are on, matching the current `create-next-app` default. |
| Runtime | Node.js 20.9 or newer (verified on Node 22) | Next.js 16 requires Node 20.9+. |
| Styling | Tailwind CSS 4 | Utility styling without a separate config file. Theme tokens live in `src/app/globals.css`. |
| 3D | React Three Fiber and drei | A small WebGL room. The scene reads hotspot data; it does not own the content. |
| Motion | Motion (`motion/react`) | The object panel eases in. Reduced motion skips that animation. GSAP is not installed. |
| Writing | MDX via `@next/mdx` | Essay bodies are `.mdx` files the App Router can compile, including React components. |
| Content | `src/lib/content` | Pages ask a repository interface. The implementation reads local TypeScript and MDX. |
| Database | Drizzle ORM, stubbed | SQLite and PostgreSQL schemas exist. No driver is installed, no migrations are generated, and dev/build never connect. |

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000/?room=1](http://localhost:3000/?room=1).

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

No `.env` file is required. Copy `.env.example` to `.env.local` only after choosing a database.

## Routes

- `/?room=1` — study prototype. `room` selects a room id from config. `object` opens a hotspot (`desk`, `shelf`, or `window`).
- `/about` — name, GitHub, and experience placeholders.
- `/projects` and `/projects/[slug]` — project placeholders.
- `/ideas` and `/ideas/[slug]` — MDX essays.

## How rooms and hotspots work

Rooms live in `src/content/rooms.ts`. Each hotspot has a label, an object kind (`desk`, `shelf`, or `window`), a position, an optional rotation, and a content reference:

```ts
content: { type: "project", id: "placeholder-project" }
```

`src/lib/content/local.ts` resolves those ids to titles, summaries, and links. The page passes a plain `RoomView` into the client scene. To add a room, append an object with a new `id` and visit `/?room=<id>`. When more than one room exists, the study lists them.

The 3D view is pointer-only. A keyboard list beside the scene opens the same entries. The panel is a dialog: Enter opens it from the list, Escape or Close dismisses it, and focus returns to the control that opened it.

Flat view replaces the canvas when WebGL is missing, when `prefers-reduced-motion: reduce` is set, or when Flat view is selected. Room view can be chosen explicitly if WebGL exists.

## How to add content

Pages import `getContentRepository()` from `src/lib/content`. They do not read the database, and they do not import the data files directly.

- **Experience** — add an object to `src/content/experiences.ts`. It shows on `/about`. Link a hotspot with `{ type: "experience", id }`.
- **Project** — add an object to `src/content/projects.ts`. The index and `/projects/[slug]` pick it up from the repository. Link a hotspot with `{ type: "project", id }` (the id, not the slug).
- **Idea** — add metadata to `src/content/ideas.ts`, add `content/ideas/<slug>.mdx`, and register that file in `src/lib/content/idea-bodies.ts`. The registry is a static import map so the bundler can see the MDX. The MDX file can import React components; `src/mdx-components.tsx` styles the markdown elements.

Mark unfinished records with `placeholder: true`.

## Database later

The site does not need a database to develop, typecheck, or build. `src/db` is the seam for a later choice.

1. Pick **SQLite** or **PostgreSQL**.
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL` and `DATABASE_DIALECT`.
   - SQLite: `DATABASE_URL="file:./.data/app.db"` and `DATABASE_DIALECT=sqlite`
   - PostgreSQL: `DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/portfolio"` and `DATABASE_DIALECT=postgresql`
4. Install one driver and replace the stub:
   - SQLite: `npm install better-sqlite3` and `npm install -D @types/better-sqlite3`. Implement `src/db/adapters/sqlite.ts` with `drizzle-orm/better-sqlite3` and `src/db/schema.sqlite.ts`.
   - PostgreSQL: `npm install postgres` (or `pg`). Implement `src/db/adapters/postgres.ts` with `drizzle-orm/postgres-js` or `drizzle-orm/node-postgres` and `src/db/schema.postgres.ts`.
5. Generate migrations: `npx drizzle-kit generate`. That writes SQL under `drizzle/`. Commit those files when you are ready. `drizzle.config.ts` refuses to run until both env vars are set, so an accidental command does not pick a dialect for you.
6. Add a second `ContentRepository` that reads Drizzle, and return it from `getContentRepository()`. Keep pages on the interface. `createDatabase()` in `src/db/client.ts` throws `DatabaseNotConfiguredError` when `DATABASE_URL` is empty, and the adapter throws until the driver exists.

The SQLite and PostgreSQL table files mirror the same logical records (`experiences`, `projects`, `ideas`). They are not applied anywhere yet.

## Folder map

```text
src/app/                  routes, layout, global CSS
src/components/room/      scene, flat fallback, hotspot list, panel
src/components/           header, footer, placeholder note
src/content/              typed experience, project, idea, and room data
src/lib/content/          repository interface and local implementation
src/lib/site.ts           name and GitHub URL
src/db/                   dialect detection, schemas, stubbed adapters
content/ideas/            MDX essay bodies
legacy/static-site/       previous GitHub Pages site
drizzle.config.ts         used only when a dialect has been chosen
```

## Deployment

GitHub Pages publishes static files. It does not run this Node server. Deploy the app to Vercel or another host that runs Next.js on Node 20.9+.

- Do not set `DATABASE_URL` until a database exists. The build succeeds without it.
- The repository stays the source of truth for content. MDX and typed data ship with the app.
- Do not turn on `output: "export"` for GitHub Pages unless a later pass drops request-time `searchParams`. The room query is rendered with Cache Components and a Suspense boundary, which is a Node rendering model.

Merging this branch deletes the root `index.html` that GitHub Pages is serving today. The old files are in `legacy/static-site/` (see that folder's README). Leave the pull request unmerged until the new host is ready, or the published GitHub Pages site will lose its entry file.

## Previous site

`main` is a static HTML portfolio (HTML5 UP Strata) plus images and assets. This branch moves that tree to `legacy/static-site/` and replaces the root with the Next.js app. Nothing from the old biography or project write-ups was copied into the new content files.
