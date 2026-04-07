import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Simple VaultNote pricing tiers for the marketing demo: Free, Pro, and Team.",
  path: "/pricing",
});

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Single-user workspace with local state only.",
    features: ["Local notes", "Tags and folders", "Markdown preview", "JSON export"],
  },
  {
    name: "Pro",
    price: "$9",
    description: "Adds private sync and key rotation in the real product story.",
    features: ["Encrypted sync", "Device unlock controls", "Revision history", "Priority support"],
  },
  {
    name: "Team",
    price: "$19",
    description: "Shared vaults with role-aware access and admin controls.",
    features: ["Shared workspaces", "Audit events", "Team recovery policy", "SAML / SCIM"],
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="max-w-3xl space-y-4">
        <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          pricing
        </div>
        <h1 className="font-serif text-5xl tracking-tight">Simple plans with clear boundaries.</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          The app demo ships as a single-user workspace, but the pricing page
          sketches how a hosted version could separate local use, private sync,
          and team controls.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <Card
            key={tier.name}
            className={index === 1 ? "border-primary/40 shadow-[0_30px_80px_-42px_rgba(0,0,0,0.6)]" : ""}
          >
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div className="pt-4 font-serif text-5xl tracking-tight">
                {tier.price}
                <span className="ml-1 text-base text-muted-foreground">/mo</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/app">{tier.name === "Free" ? "Open demo" : "Contact sales"}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
