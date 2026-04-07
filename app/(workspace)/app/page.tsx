import { WorkspacePage } from "@/components/notes/workspace-page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Workspace",
  description:
    "VaultNote writing workspace with folder filters, tags, local search, and a markdown editor.",
  path: "/app",
});

export default function AppPage() {
  return <WorkspacePage />;
}
