# VaultNote

VaultNote is a mock end-to-end encrypted note-taking app built as a portfolio project.

It includes:
- marketing pages for the product pitch, pricing, and security model
- a local-first writing workspace with folders, tags, search, trash, and settings
- markdown editing with live preview and a distraction-free mode
- seeded demo data with localStorage persistence for repeat sessions
- per-route metadata, a branded app icon, CI, and Vitest coverage for data helpers

Tech stack: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, next-themes, Lucide icons, Vitest.

## Routes

- `/` landing page
- `/app` workspace
- `/app/note/[id]` note editor route
- `/app/settings` account and security settings
- `/app/trash` restore deleted notes
- `/pricing` pricing tiers
- `/security` security explainer

## Notes

- The encryption model is explanatory only. There is no real crypto backend.
- Workspace data is stored in `localStorage` under `vaultnote-demo-v1`.
- Export downloads the current demo vault as JSON.
- Trash is soft-delete only; restore returns the note to the active workspace.

## Development

```bash
npm install
npm run dev
npm run lint && npm test
npm run build
```

## Verification

- `npm run lint`
- `npm test`
- `npm run build`

## License

MIT
