import Link from "next/link";
import { ArrowRight, CheckCircle2, LockKeyhole, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  description:
    "VaultNote is a local-first note-taking demo that presents a zero-knowledge architecture, calm editing surface, and focused security story.",
  path: "/",
});

const features = [
  {
    icon: LockKeyhole,
    title: "Local-first encryption model",
    body: "Notes are framed as plaintext on-device, encrypted before sync, and stored as unreadable blobs in the service layer.",
  },
  {
    icon: Search,
    title: "Search across decrypted notes",
    body: "Folder filters, tags, and text search stay local so the app can search without exposing note bodies to the server.",
  },
  {
    icon: ShieldCheck,
    title: "Security copy that explains itself",
    body: "The product language stays concrete about what the service can and cannot see. No vague promises.",
  },
];

export default function LandingPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div className="space-y-6">
          <Badge>Zero-knowledge demo workspace</Badge>
          <div className="space-y-5">
            <h1 className="max-w-4xl font-serif text-5xl tracking-tight sm:text-6xl">
              Focused note-taking built around local trust boundaries.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              VaultNote models an end-to-end encrypted writing product without a
              real crypto backend. The demo keeps notes in local state, explains
              the architecture clearly, and stays out of the way while you write.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/app">
                Open the app
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/security">Read the security model</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.22em]">State</div>
              <div className="mt-1">localStorage persistence</div>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.22em]">Editor</div>
              <div className="mt-1">markdown + live preview</div>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.22em]">Vault</div>
              <div className="mt-1">folders, tags, trash, export</div>
            </div>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="border-b border-border/70 px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    secure note envelope
                  </div>
                  <div className="mt-2 font-serif text-3xl tracking-tight">
                    Ciphertext leaves the device. Drafting stays readable where you work.
                  </div>
                </div>
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="space-y-4 bg-[color:var(--editor)] px-6 py-6">
              <div className="rounded-[1.5rem] border border-border/70 bg-background/65 p-4">
                <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  plaintext note
                </div>
                <p className="mt-3 text-sm leading-7 text-foreground">
                  “Close every ambient app before the first sentence. The quieter
                  the screen, the better the page.”
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-border/70 bg-card/90 p-4 font-mono text-sm leading-7 text-muted-foreground">
                iv=a4db71... tag=f33a2d...
                <br />
                ciphertext=8e9df4af0cd6015c20d7...
              </div>
              <div className="rounded-[1.5rem] border border-border/70 bg-background/65 p-4">
                <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  service visibility
                </div>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                    stores ciphertext and sync metadata
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                    never receives the readable note body in this model
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card key={feature.title}>
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-background/60">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.body}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Card>
          <CardHeader>
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              how it works
            </div>
            <CardTitle>Three clear steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
            <div>
              <div className="font-medium text-foreground">1. Write locally</div>
              Draft in a plain editing surface with folders, tags, and local search.
            </div>
            <div>
              <div className="font-medium text-foreground">2. Encrypt before sync</div>
              Treat the backend as a blob store. Only encrypted payloads leave the device.
            </div>
            <div>
              <div className="font-medium text-foreground">3. Export when needed</div>
              Pull down a JSON snapshot of the demo workspace at any point.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              product posture
            </div>
            <CardTitle>Built for writing, not dashboard theater</CardTitle>
            <CardDescription>
              The workspace keeps the chrome quiet, gives the editor room, and
              treats security details as part of the product instead of a separate
              compliance page.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {[
              "Markdown with live preview",
              "Soft-delete and restore",
              "Route-level metadata",
              "Warm neutral dark mode",
              "Mock folder and tag system",
              "Static pricing and security pages",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-border/80 bg-background/50 px-4 py-3 text-sm text-foreground"
              >
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
