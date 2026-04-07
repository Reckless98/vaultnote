"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Settings2, ShieldCheck, Trash2 } from "lucide-react";
import { WorkspaceSidebar } from "@/components/notes/workspace-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        <aside className="hidden w-[20rem] shrink-0 border-r border-border/60 lg:block">
          <WorkspaceSidebar />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border/60 bg-background/90 px-4 backdrop-blur-xl lg:hidden">
            <div className="flex items-center gap-2">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open navigation</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[min(90vw,22rem)] p-0">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Vault navigation</SheetTitle>
                    <SheetDescription>
                      Search notes, switch folders, and open settings.
                    </SheetDescription>
                  </SheetHeader>
                  <WorkspaceSidebar onNavigate={() => setMobileOpen(false)} />
                </SheetContent>
              </Sheet>
              <div>
                <p className="font-serif text-lg tracking-tight">VaultNote</p>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  writing workspace
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button asChild size="icon" variant="ghost">
                <Link href="/security">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="sr-only">Security</span>
                </Link>
              </Button>
              <Button asChild size="icon" variant="ghost">
                <Link href="/app/trash">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Trash</span>
                </Link>
              </Button>
              <Button asChild size="icon" variant="ghost">
                <Link href="/app/settings">
                  <Settings2 className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </Link>
              </Button>
            </div>
          </header>

          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
