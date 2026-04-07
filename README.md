# VaultNote
VaultNote is a local-first notes workspace for writing, organizing, and recovering markdown notes.

A lot of note tools either bury simple writing under collaboration features or make security claims harder to inspect than the product itself. VaultNote keeps the core flow straightforward: fast note editing, clear organization, exportable data, and a plain-language view of how the workspace handles storage and security.

## Features
- Local-first workspace with folders, tags, search, and note lists
- Markdown editor with live preview
- Dedicated note routes for direct linking and editing
- Trash view with soft-delete recovery
- Settings screen for account and security preferences
- Security page that explains the storage model in plain language
- JSON export of the current vault
- Seeded sample notes so the workspace is usable immediately
- Browser persistence through local storage

Tech stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Radix UI primitives, React Markdown, date-fns, Framer Motion, next-themes, Vitest.

## Routes
- `/` landing page
- `/app`, `/app/note/[id]` workspace and note editor
- `/app/trash`, `/app/settings` recovery and preferences
- `/pricing`, `/security` plans and storage model

## Development
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Testing
`npm test`

Build with `npm run build`.
