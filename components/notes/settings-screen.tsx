"use client";

import { useTheme } from "next-themes";
import { Download, LockKeyhole, MoonStar, Shield, SunMedium } from "lucide-react";
import { useNotes } from "@/components/providers/notes-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function bytesToKilobytes(value: number) {
  return `${(value / 1024).toFixed(1)} KB`;
}

export function SettingsScreen() {
  const { theme } = useTheme();
  const { snapshot, exportSnapshot } = useNotes();
  const storageSize = new Blob([JSON.stringify(snapshot)]).size;

  function handleExport() {
    const payload = exportSnapshot();
    const url = URL.createObjectURL(
      new Blob([payload.content], { type: "application/json" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = payload.fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5 p-4 md:p-6">
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <Shield className="h-3.5 w-3.5" />
          account and security
        </div>
        <h1 className="font-serif text-4xl tracking-tight">Workspace settings</h1>
        <p className="text-base leading-7 text-muted-foreground">
          This demo exposes the same surfaces a real encrypted notes product would
          need: theme control, export, and key visibility. The crypto layer here is
          explanatory only.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)]">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <LockKeyhole className="h-3.5 w-3.5" />
              encryption state
            </div>
            <CardTitle>Demo key material</CardTitle>
            <CardDescription>
              The value below is fake, static, and present only to model the UX of
              showing a local recovery fingerprint.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-[1.5rem] border border-border/80 bg-background/60 p-4 font-mono text-sm">
              vn_demo_9d4e_f8a1_2b7c_5e10_a21c
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border border-border/80 bg-background/50 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Storage
                </div>
                <div className="mt-2 text-lg font-medium">{bytesToKilobytes(storageSize)}</div>
              </div>
              <div className="rounded-[1.4rem] border border-border/80 bg-background/50 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Notes
                </div>
                <div className="mt-2 text-lg font-medium">{snapshot.notes.length}</div>
              </div>
              <div className="rounded-[1.4rem] border border-border/80 bg-background/50 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Theme
                </div>
                <div className="mt-2 text-lg font-medium capitalize">{theme}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Theme and readability</CardTitle>
              <CardDescription>
                Dark mode is the default surface, with a lighter mode available for
                long review sessions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ThemeToggle />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline">
                  {theme === "light" ? <SunMedium className="mr-1 h-3.5 w-3.5" /> : <MoonStar className="mr-1 h-3.5 w-3.5" />}
                  Active
                </Badge>
                The workspace defaults to dark mode and can follow system theme if you want it to.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export your vault</CardTitle>
              <CardDescription>
                Download the current mock workspace as JSON. That includes folders,
                tags, notes, and Trash state.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleExport}>
                <Download className="h-4 w-4" />
                Export JSON
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
