export type FolderId = "inbox" | "research" | "product" | "archive";

export type NoteSortMode = "updated-desc" | "updated-asc" | "title-asc";

export type Folder = {
  id: FolderId;
  name: string;
  description: string;
};

export type Tag = {
  id: string;
  name: string;
  tone: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  folderId: FolderId;
  tagIds: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type WorkspaceSnapshot = {
  folders: Folder[];
  tags: Tag[];
  notes: Note[];
};

export const workspaceStorageKey = "vaultnote-demo-v1";

export const folders: Folder[] = [
  {
    id: "inbox",
    name: "Inbox",
    description: "Loose drafts, quick notes, and capture pages.",
  },
  {
    id: "research",
    name: "Research",
    description: "Collected references, reading notes, and source traces.",
  },
  {
    id: "product",
    name: "Product",
    description: "Specs, launch checklists, and roadmap thinking.",
  },
  {
    id: "archive",
    name: "Archive",
    description: "Long-term notes you still want on hand.",
  },
];

export const tags: Tag[] = [
  { id: "security", name: "Security", tone: "bg-amber-500/14 text-amber-200" },
  { id: "draft", name: "Draft", tone: "bg-sky-500/14 text-sky-200" },
  { id: "launch", name: "Launch", tone: "bg-emerald-500/14 text-emerald-200" },
  { id: "writing", name: "Writing", tone: "bg-rose-500/14 text-rose-200" },
  { id: "ops", name: "Ops", tone: "bg-stone-500/18 text-stone-200" },
  { id: "personal", name: "Personal", tone: "bg-violet-500/14 text-violet-200" },
];

export const sampleNotes: Note[] = [
  {
    id: "vault-architecture",
    title: "Zero-knowledge architecture sketch",
    folderId: "research",
    tagIds: ["security", "draft"],
    createdAt: "2026-03-21T09:30:00.000Z",
    updatedAt: "2026-04-06T15:20:00.000Z",
    deletedAt: null,
    content: `# Zero-knowledge architecture sketch

The app keeps plaintext notes on-device and treats the sync layer as an opaque blob store.

## Core ideas

- Derive a local encryption key from the user's passphrase.
- Encrypt the note payload before any sync request leaves the device.
- Store metadata separately when fast search matters.

## Constraints

1. Search can only cover locally decrypted notes.
2. Shared workspaces need a second key exchange story.
3. Recovery has to be explicit because the service should not know the key.

\`\`\`ts
type Envelope = {
  iv: string;
  ciphertext: string;
  tag: string;
};
\`\`\`
`,
  },
  {
    id: "meeting-recap-april",
    title: "Monday writing session recap",
    folderId: "inbox",
    tagIds: ["writing"],
    createdAt: "2026-04-01T11:00:00.000Z",
    updatedAt: "2026-04-07T04:12:00.000Z",
    deletedAt: null,
    content: `# Monday writing session recap

Three things worked:

- Closing Slack before opening the editor.
- Starting from a sentence, not a title.
- Keeping the sidebar collapsed while drafting.

## Next pass

- Rewrite the opening section in plain language.
- Add a short pull quote for the landing page.
- Trim repeated phrasing in the security explainer.
`,
  },
  {
    id: "launch-checklist",
    title: "Launch checklist",
    folderId: "product",
    tagIds: ["launch", "ops"],
    createdAt: "2026-03-27T08:10:00.000Z",
    updatedAt: "2026-04-05T12:40:00.000Z",
    deletedAt: null,
    content: `# Launch checklist

- [x] Freeze the copy set
- [x] Review metadata and page titles
- [ ] Export seed demo notes for QA
- [ ] Confirm CI runs lint, test, and build
- [ ] Verify restore flow in Trash

> Keep the release branch boring. No late redesigns.
`,
  },
  {
    id: "encryption-copy",
    title: "Encryption explainer copy",
    folderId: "product",
    tagIds: ["security", "writing"],
    createdAt: "2026-03-24T13:45:00.000Z",
    updatedAt: "2026-04-04T17:25:00.000Z",
    deletedAt: null,
    content: `# Encryption explainer copy

VaultNote treats encryption as a local step, not a promise hidden in a footer.

## Plain-language framing

The service never needs to see readable note content.

## Tight version

Your notes are encrypted before sync. The service stores ciphertext, not prose.
`,
  },
  {
    id: "field-notes",
    title: "Field notes from user calls",
    folderId: "research",
    tagIds: ["writing"],
    createdAt: "2026-03-18T15:00:00.000Z",
    updatedAt: "2026-04-02T09:50:00.000Z",
    deletedAt: null,
    content: `# Field notes from user calls

Patterns that kept showing up:

- People distrust storage vendors more than editors.
- Search matters more than formatting.
- An export button lowers anxiety fast.

## Friction

People hear "end-to-end encrypted" and immediately ask about recovery.
`,
  },
  {
    id: "offline-queue",
    title: "Offline queue ideas",
    folderId: "research",
    tagIds: ["ops", "draft"],
    createdAt: "2026-03-29T10:20:00.000Z",
    updatedAt: "2026-04-03T08:05:00.000Z",
    deletedAt: null,
    content: `# Offline queue ideas

When sync is unavailable:

1. Keep writes local.
2. Mark notes as pending upload.
3. Retry with backoff after connectivity resumes.

\`\`\`bash
queue -> encrypt -> upload -> confirm
\`\`\`
`,
  },
  {
    id: "travel-journal",
    title: "Bangkok travel journal",
    folderId: "archive",
    tagIds: ["personal", "writing"],
    createdAt: "2026-02-12T06:10:00.000Z",
    updatedAt: "2026-03-30T14:22:00.000Z",
    deletedAt: null,
    content: `# Bangkok travel journal

Strong coffee, slow afternoon light, and a notebook that never asked for a network connection.

## Keep

- The paragraph about heat settling over the street after sunset.
- The line about taxis feeling like moving lanterns.
`,
  },
  {
    id: "vaultnote-brand",
    title: "VaultNote naming notes",
    folderId: "inbox",
    tagIds: ["draft", "launch"],
    createdAt: "2026-03-14T05:55:00.000Z",
    updatedAt: "2026-04-01T16:35:00.000Z",
    deletedAt: null,
    content: `# VaultNote naming notes

The name works because it suggests:

- writing
- storage
- a boundary around access

Avoid language that sounds like surveillance software or enterprise compliance copy.
`,
  },
  {
    id: "removed-roadmap",
    title: "Discarded roadmap draft",
    folderId: "archive",
    tagIds: ["draft"],
    createdAt: "2026-03-10T09:10:00.000Z",
    updatedAt: "2026-03-25T13:10:00.000Z",
    deletedAt: "2026-04-06T21:00:00.000Z",
    content: `# Discarded roadmap draft

This one leaned too hard into team workflows and drifted away from focused writing.
`,
  },
  {
    id: "old-key-rotation",
    title: "Old key rotation notes",
    folderId: "research",
    tagIds: ["security", "ops"],
    createdAt: "2026-03-01T07:45:00.000Z",
    updatedAt: "2026-03-20T12:05:00.000Z",
    deletedAt: "2026-04-05T07:30:00.000Z",
    content: `# Old key rotation notes

Useful reference, but duplicated elsewhere and made the settings page too noisy.
`,
  },
];

export const initialWorkspaceSnapshot: WorkspaceSnapshot = {
  folders,
  tags,
  notes: sampleNotes,
};

export function getActiveNotes(notes: Note[]) {
  return notes.filter((note) => !note.deletedAt);
}

export function getTrashedNotes(notes: Note[]) {
  return notes.filter((note) => Boolean(note.deletedAt));
}

export function filterNotes({
  notes,
  folderId,
  query,
  tagId,
}: {
  notes: Note[];
  folderId?: FolderId | "all";
  query?: string;
  tagId?: string | "all";
}) {
  const normalizedQuery = query?.trim().toLowerCase() ?? "";

  return notes.filter((note) => {
    const matchesFolder =
      !folderId || folderId === "all" || note.folderId === folderId;
    const matchesTag =
      !tagId || tagId === "all" || note.tagIds.includes(tagId);
    const haystack = `${note.title} ${note.content}`.toLowerCase();
    const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);

    return matchesFolder && matchesTag && matchesQuery;
  });
}

export function sortNotes(notes: Note[], sortMode: NoteSortMode) {
  const clone = [...notes];

  clone.sort((left, right) => {
    if (sortMode === "title-asc") {
      return left.title.localeCompare(right.title);
    }

    const delta =
      new Date(left.updatedAt).getTime() - new Date(right.updatedAt).getTime();

    return sortMode === "updated-asc" ? delta : -delta;
  });

  return clone;
}

export function createNoteDraft(folderId: FolderId = "inbox"): Note {
  const now = new Date().toISOString();

  return {
    id: `note-${crypto.randomUUID().slice(0, 8)}`,
    title: "Untitled note",
    folderId,
    tagIds: ["draft"],
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    content: `# Untitled note

Start writing here.
`,
  };
}

export function serializeWorkspace(snapshot: WorkspaceSnapshot) {
  return JSON.stringify(snapshot);
}

function isFolderId(value: unknown): value is FolderId {
  return (
    value === "inbox" ||
    value === "research" ||
    value === "product" ||
    value === "archive"
  );
}

function isNote(value: unknown): value is Note {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.content === "string" &&
    isFolderId(candidate.folderId) &&
    Array.isArray(candidate.tagIds) &&
    typeof candidate.createdAt === "string" &&
    typeof candidate.updatedAt === "string" &&
    (typeof candidate.deletedAt === "string" || candidate.deletedAt === null)
  );
}

export function parseWorkspace(raw: string | null | undefined) {
  if (!raw) {
    return initialWorkspaceSnapshot;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<WorkspaceSnapshot>;

    if (
      !Array.isArray(parsed.notes) ||
      !Array.isArray(parsed.folders) ||
      !Array.isArray(parsed.tags) ||
      !parsed.notes.every(isNote)
    ) {
      return initialWorkspaceSnapshot;
    }

    return {
      folders: parsed.folders as Folder[],
      tags: parsed.tags as Tag[],
      notes: parsed.notes,
    };
  } catch {
    return initialWorkspaceSnapshot;
  }
}

export function makeExportFileName() {
  const stamp = new Date().toISOString().slice(0, 10);
  return `vaultnote-export-${stamp}.json`;
}
