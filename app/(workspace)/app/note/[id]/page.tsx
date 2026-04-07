import { WorkspacePage } from "@/components/notes/workspace-page";
import { buildMetadata } from "@/lib/metadata";
import { sampleNotes } from "@/lib/notes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = sampleNotes.find((entry) => entry.id === id);

  return buildMetadata({
    title: note?.title ?? "Note",
    description: "Read and edit a VaultNote markdown note in the shared workspace shell.",
    path: `/app/note/${id}`,
  });
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <WorkspacePage noteId={id} />;
}
