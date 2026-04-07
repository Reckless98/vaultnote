"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCcw, Trash2 } from "lucide-react";
import { useNotes } from "@/components/providers/notes-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNoteDateTime } from "@/lib/utils";

export function TrashScreen() {
  const { snapshot, trashedNotes, restoreNote } = useNotes();

  return (
    <div className="space-y-5 p-4 md:p-6">
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <Trash2 className="h-3.5 w-3.5" />
          soft-deleted notes
        </div>
        <h1 className="font-serif text-4xl tracking-tight">Trash</h1>
        <p className="text-base leading-7 text-muted-foreground">
          Notes moved here stay recoverable in local state until you clear the demo
          data. Restore sends them back to the main workspace with a fresh updated
          timestamp.
        </p>
      </div>

      {trashedNotes.length === 0 ? (
        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle>Nothing in Trash</CardTitle>
            <CardDescription>
              The restore flow is ready. You just do not have any deleted notes at
              the moment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/app">Back to workspace</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {trashedNotes.map((note, index) => {
            const folder = snapshot.folders.find((item) => item.id === note.folderId);
            const noteTags = snapshot.tags.filter((tag) => note.tagIds.includes(tag.id));

            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl">{note.title}</CardTitle>
                    <CardDescription>
                      Deleted {note.deletedAt ? formatNoteDateTime(note.deletedAt) : "recently"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-6 text-muted-foreground">
                      {note.content.slice(0, 170).replace(/\n+/g, " ")}...
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{folder?.name}</Badge>
                      {noteTags.map((tag) => (
                        <Badge key={tag.id} className={tag.tone}>
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => restoreNote(note.id)}>
                        <RefreshCcw className="h-4 w-4" />
                        Restore
                      </Button>
                      <Button asChild variant="outline">
                        <Link href={`/app/note/${note.id}`}>Open route</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
