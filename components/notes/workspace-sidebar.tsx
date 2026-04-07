"use client";

import Link from "next/link";
import { startTransition, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  FilePlus2,
  FolderClosed,
  Search,
  Settings2,
  ShieldCheck,
  Tags,
  Trash2,
} from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { useNotes } from "@/components/providers/notes-provider";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function WorkspaceSidebar({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    snapshot,
    activeNotes,
    createNote,
    searchQuery,
    selectedFolderId,
    selectedTagId,
    setSearchQuery,
    setSelectedFolderId,
    setSelectedTagId,
  } = useNotes();
  const [foldersOpen, setFoldersOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(true);

  const folderCounts = useMemo(
    () =>
      snapshot.folders.map((folder) => ({
        ...folder,
        count: activeNotes.filter((note) => note.folderId === folder.id).length,
      })),
    [activeNotes, snapshot.folders],
  );

  function handleCreateNote() {
    const id = createNote();
    onNavigate?.();
    router.push(`/app/note/${id}`);
  }

  function handleSearchChange(value: string) {
    startTransition(() => {
      setSearchQuery(value);
    });
  }

  return (
    <div className="flex h-full flex-col bg-[color:var(--sidebar)] text-[color:var(--sidebar-foreground)]">
      <div className="flex items-center justify-between px-4 pb-3 pt-4">
        <BrandMark compact />
        <Button size="icon" variant="ghost" onClick={handleCreateNote}>
          <FilePlus2 className="h-4 w-4" />
          <span className="sr-only">Create note</span>
        </Button>
      </div>

      <div className="px-4">
        <div className="rounded-[1.7rem] border border-[color:var(--sidebar-border)] bg-card/60 p-3">
          <label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
            Search vault
          </label>
          <Input
            value={searchQuery}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Find text, headings, code…"
            className="border-0 bg-background/75"
          />
        </div>
      </div>

      <ScrollArea className="mt-4 flex-1 px-4">
        <div className="space-y-5 pb-6">
          <Collapsible open={foldersOpen} onOpenChange={setFoldersOpen}>
            <div className="rounded-[1.7rem] border border-[color:var(--sidebar-border)] bg-card/55 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  <FolderClosed className="h-3.5 w-3.5" />
                  Folder tree
                </div>
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="rounded-full p-1 text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  >
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", foldersOpen && "rotate-180")}
                    />
                  </button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-3 space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFolderId("all");
                    onNavigate?.();
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm",
                    selectedFolderId === "all"
                      ? "bg-primary/16 text-foreground"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  )}
                >
                  <span>All notes</span>
                  <span className="font-mono text-xs">{activeNotes.length}</span>
                </button>
                {folderCounts.map((folder) => (
                  <button
                    key={folder.id}
                    type="button"
                    onClick={() => {
                      setSelectedFolderId(folder.id);
                      onNavigate?.();
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm",
                      selectedFolderId === folder.id
                        ? "bg-primary/16 text-foreground"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                    )}
                  >
                    <div>
                      <div>{folder.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {folder.description}
                      </div>
                    </div>
                    <span className="font-mono text-xs">{folder.count}</span>
                  </button>
                ))}
              </CollapsibleContent>
            </div>
          </Collapsible>

          <Collapsible open={tagsOpen} onOpenChange={setTagsOpen}>
            <div className="rounded-[1.7rem] border border-[color:var(--sidebar-border)] bg-card/55 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  <Tags className="h-3.5 w-3.5" />
                  Tag cloud
                </div>
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="rounded-full p-1 text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  >
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", tagsOpen && "rotate-180")}
                    />
                  </button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTagId("all");
                      onNavigate?.();
                    }}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm",
                      selectedTagId === "all"
                        ? "border-primary/50 bg-primary/15 text-foreground"
                        : "border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                    )}
                  >
                    All tags
                  </button>
                  {snapshot.tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => {
                        setSelectedTagId(tag.id);
                        onNavigate?.();
                      }}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm",
                        selectedTagId === tag.id
                          ? "border-primary/50 bg-primary/15 text-foreground"
                          : "border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                      )}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          <div className="rounded-[1.7rem] border border-[color:var(--sidebar-border)] bg-card/55 p-3">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Sections
            </div>
            <div className="mt-3 space-y-1">
              {[
                {
                  href: "/app/settings",
                  label: "Settings",
                  icon: Settings2,
                },
                {
                  href: "/app/trash",
                  label: "Trash",
                  icon: Trash2,
                },
                {
                  href: "/security",
                  label: "Security",
                  icon: ShieldCheck,
                },
              ].map((item) => {
                const Icon = item.icon;
                const active = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => onNavigate?.()}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm",
                      active
                        ? "bg-primary/16 text-foreground"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="px-4 pb-4">
        <Separator className="mb-4 bg-[color:var(--sidebar-border)]" />
        <div className="rounded-[1.7rem] border border-[color:var(--sidebar-border)] bg-card/55 p-4">
          <div className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
            Local key
          </div>
          <div className="mt-2 font-mono text-sm text-foreground">
            vn_demo_9d4e...a21c
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Mock demo state stays in local storage. No remote crypto or sync is
            running behind this workspace.
          </p>
        </div>
      </div>
    </div>
  );
}
