import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/pricing", label: "Pricing" },
  { href: "/security", label: "Security" },
  { href: "/app", label: "Open app" },
];

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-border/60 bg-background/88 backdrop-blur-xl",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <BrandMark />
        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground lg:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            zero-knowledge demo
          </div>
          <ThemeToggle compact className="hidden sm:inline-flex" />
          <Button asChild size="sm">
            <Link href="/app">Launch workspace</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
