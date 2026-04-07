import { SettingsScreen } from "@/components/notes/settings-screen";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Settings",
  description:
    "VaultNote account and security settings with theme control, demo key material, and export.",
  path: "/app/settings",
});

export default function SettingsPage() {
  return <SettingsScreen />;
}
