import type { ReactNode } from "react";
import { NotesProvider } from "@/components/providers/notes-provider";
import { WorkspaceShell } from "@/components/notes/workspace-shell";

export default function VaultAppLayout({ children }: { children: ReactNode }) {
  return (
    <NotesProvider>
      <WorkspaceShell>{children}</WorkspaceShell>
    </NotesProvider>
  );
}
