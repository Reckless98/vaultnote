"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock3, FileText, SearchX } from "lucide-react";
import { useNotes } from "@/components/providers/notes-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NoteEditor } from "@/components/notes/note-editor";
import { sortNotes } from "@/lib/notes";
import { formatRelativeTime } from "@/lib/utils";

function summarizeMarkdown(value: string) {
  return value
    .replace(/[#>*`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 132);
}

export function WorkspacePage({ noteId }: { noteId?: string }) {
  const {
    snapshot,
    searchQuery,
    sortMode,
    setSortMode,
    getFilteredNotes,
    activeNotes,
  } = useNotes();
  const [distractionFree, setDistractionFree] = useState(false);
  const deferredQuery = useDeferredValue(searchQuery);
  const filteredNotes = sortNotes(getFilteredNotes(deferredQuery), sortMode);
  const currentNote =
    (noteId ? activeNotes.find((note) => note.id === noteId) : null) ??
    filteredNotes[0] ??
    null;

  if (!currentNote) {
    return (
      <div className="p-4 md:p-6">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <div className="flex items-center gap-3 text-muted-foreground">
              <SearchX className="h-5 w-5" />
              Empty result set
            </div>
            <CardTitle>No active note matches the current filters</CardTitle>
            <CardDescription>
              Clear the search query, switch folders, or restore a note from Trash.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/app/trash">Open Trash</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/security">Read the security model</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div
        className={`grid gap-5 ${
          distractionFree ? "grid-cols-1" : "xl:grid-cols-[23rem_minmax(0,1fr)]"
        }`}
      >
        {!distractionFree ? (
          <motion.section
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <Card className="h-full">
              <CardHeader className="gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      <FileText className="h-3.5 w-3.5" />
                      Vault index
                    </div>
                    <CardTitle>Notes</CardTitle>
                    <CardDescription>
                      {filteredNotes.length} visible of {activeNotes.length} active notes.
                    </CardDescription>
                  </div>
                  <Select
                    value={sortMode}
                    onValueChange={(value) =>
                      setSortMode(value as "updated-desc" | "updated-asc" | "title-asc")
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="updated-desc">Newest first</SelectItem>
                      <SelectItem value="updated-asc">Oldest first</SelectItem>
                      <SelectItem value="title-asc">Title A–Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {deferredQuery ? (
                  <div className="flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
                    <Clock3 className="h-4 w-4" />
                    Filtering for “{deferredQuery}”
                  </div>
                ) : null}
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredNotes.map((note) => {
                  const isActive = note.id === currentNote.id;
                  const folder = snapshot.folders.find((item) => item.id === note.folderId);
                  const noteTags = snapshot.tags.filter((tag) => note.tagIds.includes(tag.id));

                  return (
                    <Link
                      key={note.id}
                      href={`/app/note/${note.id}`}
                      className={`block rounded-[1.4rem] border p-4 transition ${
                        isActive
                          ? "border-primary/45 bg-primary/10"
                          : "border-border/70 bg-background/45 hover:border-primary/25 hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-medium text-foreground">{note.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            {summarizeMarkdown(note.content)}...
                          </p>
                        </div>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{folder?.name ?? "Folder"}</Badge>
                        {noteTags.slice(0, 2).map((tag) => (
                          <Badge key={tag.id} className={tag.tone}>
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {formatRelativeTime(note.updatedAt)}
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </motion.section>
        ) : null}

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="min-w-0"
        >
          <NoteEditor
            note={currentNote}
            folders={snapshot.folders}
            tags={snapshot.tags}
            distractionFree={distractionFree}
            onDistractionFreeChange={setDistractionFree}
          />
        </motion.section>
      </div>
    </div>
  );
}
