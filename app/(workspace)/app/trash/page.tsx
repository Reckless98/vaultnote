import { TrashScreen } from "@/components/notes/trash-screen";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Trash",
  description:
    "Review and restore soft-deleted notes in the VaultNote workspace.",
  path: "/app/trash",
});

export default function TrashPage() {
  return <TrashScreen />;
}
