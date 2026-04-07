import { LockKeyhole, Search, ServerCog, ShieldCheck, UserRoundCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Security",
  description:
    "VaultNote security explainer covering the local-first model, ciphertext sync envelope, and service visibility boundaries.",
  path: "/security",
});

const sections = [
  {
    icon: UserRoundCheck,
    title: "Trust model",
    body: "VaultNote treats the client as the only place where note bodies should be readable. The hosted service is assumed to be honest enough to store data but not trusted with plaintext.",
  },
  {
    icon: LockKeyhole,
    title: "Encryption boundary",
    body: "In the real design, the passphrase-derived key never leaves the device. Notes are encrypted before upload, decrypted after download, and otherwise handled as ciphertext in transit and at rest.",
  },
  {
    icon: Search,
    title: "Search tradeoff",
    body: "Global search only works over locally available decrypted notes. The server cannot index note content without breaking the zero-knowledge model, so search is a client concern.",
  },
  {
    icon: ServerCog,
    title: "Service visibility",
    body: "The service can still see timing, device identifiers, note counts, payload sizes, and sharing metadata unless those surfaces are deliberately padded or minimized.",
  },
];

export default function SecurityPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          security model
        </div>
        <h1 className="font-serif text-5xl tracking-tight">What the service can see, and what it should not.</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          This demo does not implement real encryption, but it does present a
          concrete zero-knowledge architecture. The point is to make the trust
          boundaries explicit instead of implied.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <Card key={section.title}>
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-background/60">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.body}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Threats the product still needs to account for</CardTitle>
          <CardDescription>
            Encryption is only one boundary. Operational choices still matter.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {[
            "Device compromise still exposes readable notes after unlock.",
            "Traffic analysis can leak when you edited and how much data moved.",
            "Shared vaults need explicit key exchange and revocation design.",
            "Recovery flows must not let the service silently reconstruct user keys.",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1.4rem] border border-border/80 bg-background/55 p-4 text-sm leading-7 text-muted-foreground"
            >
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
