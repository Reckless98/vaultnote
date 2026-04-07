"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FolderOpen, Focus, Lock, PanelRight, RefreshCcw, Trash2 } from "lucide-react";
import { useNotes } from "@/components/providers/notes-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Folder, Note, Tag } from "@/lib/notes";
import { estimateReadingTime, formatRelativeTime } from "@/lib/utils";

export function NoteEditor({
  note,
  folders,
  tags,
  distractionFree,
  onDistractionFreeChange,
}: {
  note: Note;
  folders: Folder[];
  tags: Tag[];
  distractionFree: boolean;
  onDistractionFreeChange: (value: boolean) => void;
}) {
  const router = useRouter();
  const { updateNote, softDeleteNote } = useNotes();
  const [livePreview, setLivePreview] = useState(true);

  const noteTags = tags.filter((tag) => note.tagIds.includes(tag.id));

  function toggleTag(tagId: string) {
    const nextTagIds = note.tagIds.includes(tagId)
      ? note.tagIds.filter((current) => current !== tagId)
      : [...note.tagIds, tagId];

    updateNote(note.id, {
      tagIds: nextTagIds,
    });
  }

  function handleDelete() {
    softDeleteNote(note.id);
    router.push("/app/trash");
  }

  return (
    <motion.div
      key={note.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="flex h-full flex-col gap-4"
    >
      <Card className="overflow-hidden">
        <CardContent className="space-y-5 px-6 py-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-primary" />
                  locally encrypted demo
                </div>
                <span className="font-mono">{estimateReadingTime(note.content)} min read</span>
              </div>
              <textarea
                value={note.title}
                onChange={(event) =>
                  updateNote(note.id, { title: event.target.value || "Untitled note" })
                }
                className="min-h-[3.5rem] w-full resize-none border-0 bg-transparent p-0 font-serif text-4xl leading-tight tracking-tight outline-none placeholder:text-muted-foreground"
                rows={2}
                placeholder="Untitled note"
              />
              <p className="text-sm leading-6 text-muted-foreground">
                Updated {formatRelativeTime(note.updatedAt)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={distractionFree ? "default" : "outline"}
                size="sm"
                onClick={() => onDistractionFreeChange(!distractionFree)}
              >
                <Focus className="h-4 w-4" />
                Focus
              </Button>
              <Button variant="outline" size="sm" onClick={() => setLivePreview((value) => !value)}>
                <PanelRight className="h-4 w-4" />
                {livePreview ? "Hide preview" : "Show preview"}
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
                Move to Trash
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  <FolderOpen className="h-3.5 w-3.5" />
                  Folder
                </label>
                <Select
                  value={note.folderId}
                  onValueChange={(value) =>
                    updateNote(note.id, {
                      folderId: value as Note["folderId"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a folder" />
                  </SelectTrigger>
                  <SelectContent>
                    {folders.map((folder) => (
                      <SelectItem key={folder.id} value={folder.id}>
                        {folder.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    Live preview
                  </label>
                  <Switch checked={livePreview} onCheckedChange={setLivePreview} />
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  Render markdown side-by-side while you edit.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    const active = note.tagIds.includes(tag.id);

                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        className={`rounded-full border px-3 py-1.5 text-sm ${
                          active
                            ? "border-primary/50 bg-primary/15 text-foreground"
                            : "border-border/80 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tag.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {noteTags.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    Active tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {noteTags.map((tag) => (
                      <Badge key={tag.id} className={tag.tone}>
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div
              className={`grid gap-4 ${
                livePreview ? "2xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]" : ""
              }`}
            >
              <Card className="border-dashed">
                <CardContent className="p-0">
                  <Textarea
                    value={note.content}
                    onChange={(event) =>
                      updateNote(note.id, {
                        content: event.target.value,
                      })
                    }
                    className="editor-scroll min-h-[60vh] resize-none border-0 bg-[color:var(--editor)] px-6 py-6 font-serif text-lg leading-8 shadow-none focus-visible:ring-0"
                  />
                </CardContent>
              </Card>

              {livePreview ? (
                <Card className="overflow-hidden">
                  <CardContent className="min-h-[60vh] bg-[color:var(--editor)] px-6 py-6">
                    <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      <RefreshCcw className="h-3.5 w-3.5" />
                      rendered preview
                    </div>
                    <article className="note-prose">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {note.content}
                      </ReactMarkdown>
                    </article>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
