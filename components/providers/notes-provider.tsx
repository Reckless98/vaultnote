"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createNoteDraft,
  filterNotes,
  getActiveNotes,
  getTrashedNotes,
  initialWorkspaceSnapshot,
  makeExportFileName,
  parseWorkspace,
  serializeWorkspace,
  type FolderId,
  type Note,
  type NoteSortMode,
  type WorkspaceSnapshot,
  workspaceStorageKey,
} from "@/lib/notes";

type NotesContextValue = {
  snapshot: WorkspaceSnapshot;
  hydrated: boolean;
  searchQuery: string;
  selectedFolderId: FolderId | "all";
  selectedTagId: string | "all";
  sortMode: NoteSortMode;
  activeNotes: Note[];
  trashedNotes: Note[];
  setSearchQuery: (value: string) => void;
  setSelectedFolderId: (value: FolderId | "all") => void;
  setSelectedTagId: (value: string | "all") => void;
  setSortMode: (value: NoteSortMode) => void;
  getFilteredNotes: (query?: string) => Note[];
  createNote: (folderId?: FolderId) => string;
  updateNote: (
    id: string,
    changes: Partial<Pick<Note, "title" | "content" | "folderId" | "tagIds">>,
  ) => void;
  softDeleteNote: (id: string) => void;
  restoreNote: (id: string) => void;
  exportSnapshot: () => { fileName: string; content: string };
};

const NotesContext = createContext<NotesContextValue | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [snapshot, setSnapshot] = useState(initialWorkspaceSnapshot);
  const [hydrated, setHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<FolderId | "all">(
    "all",
  );
  const [selectedTagId, setSelectedTagId] = useState<string | "all">("all");
  const [sortMode, setSortMode] = useState<NoteSortMode>("updated-desc");

  useEffect(() => {
    const stored = window.localStorage.getItem(workspaceStorageKey);
    setSnapshot(parseWorkspace(stored));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(workspaceStorageKey, serializeWorkspace(snapshot));
  }, [hydrated, snapshot]);

  const activeNotes = getActiveNotes(snapshot.notes);
  const trashedNotes = getTrashedNotes(snapshot.notes);

  function getFilteredNotes(query = searchQuery) {
    return filterNotes({
      notes: activeNotes,
      folderId: selectedFolderId,
      tagId: selectedTagId,
      query,
    });
  }

  function createNote(
    folderId: FolderId =
      selectedFolderId === "all" ? "inbox" : selectedFolderId,
  ) {
    const nextNote = createNoteDraft(folderId);

    setSnapshot((current) => ({
      ...current,
      notes: [nextNote, ...current.notes],
    }));
    setSelectedFolderId(folderId);
    setSelectedTagId("all");
    setSearchQuery("");

    return nextNote.id;
  }

  function updateNote(
    id: string,
    changes: Partial<Pick<Note, "title" | "content" | "folderId" | "tagIds">>,
  ) {
    setSnapshot((current) => ({
      ...current,
      notes: current.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              ...changes,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    }));
  }

  function softDeleteNote(id: string) {
    setSnapshot((current) => ({
      ...current,
      notes: current.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              deletedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    }));
  }

  function restoreNote(id: string) {
    setSnapshot((current) => ({
      ...current,
      notes: current.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              deletedAt: null,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    }));
  }

  function exportSnapshot() {
    return {
      fileName: makeExportFileName(),
      content: JSON.stringify(snapshot, null, 2),
    };
  }

  return (
    <NotesContext.Provider
      value={{
        snapshot,
        hydrated,
        searchQuery,
        selectedFolderId,
        selectedTagId,
        sortMode,
        activeNotes,
        trashedNotes,
        setSearchQuery,
        setSelectedFolderId,
        setSelectedTagId,
        setSortMode,
        getFilteredNotes,
        createNote,
        updateNote,
        softDeleteNote,
        restoreNote,
        exportSnapshot,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }

  return context;
}
