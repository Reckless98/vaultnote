import { describe, expect, it } from "vitest";
import {
  filterNotes,
  getActiveNotes,
  getTrashedNotes,
  initialWorkspaceSnapshot,
  parseWorkspace,
  serializeWorkspace,
  sortNotes,
} from "@/lib/notes";

describe("notes helpers", () => {
  it("filters active notes by folder and query", () => {
    const activeNotes = getActiveNotes(initialWorkspaceSnapshot.notes);
    const result = filterNotes({
      notes: activeNotes,
      folderId: "product",
      query: "launch",
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("launch-checklist");
  });

  it("returns trashed notes separately", () => {
    const trashed = getTrashedNotes(initialWorkspaceSnapshot.notes);
    expect(trashed.map((note) => note.id)).toEqual([
      "removed-roadmap",
      "old-key-rotation",
    ]);
  });

  it("sorts notes alphabetically when requested", () => {
    const sorted = sortNotes(
      getActiveNotes(initialWorkspaceSnapshot.notes),
      "title-asc",
    );
    expect(sorted[0]?.title).toBe("Bangkok travel journal");
  });

  it("round-trips valid snapshots", () => {
    const serialized = serializeWorkspace(initialWorkspaceSnapshot);
    expect(parseWorkspace(serialized)).toEqual(initialWorkspaceSnapshot);
  });

  it("falls back to initial data for invalid snapshots", () => {
    expect(parseWorkspace("{bad json")).toEqual(initialWorkspaceSnapshot);
  });
});
