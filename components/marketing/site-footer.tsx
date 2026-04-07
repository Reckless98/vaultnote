import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-col gap-3">
          <BrandMark />
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            VaultNote is a demo note workspace for local-first, encrypted writing
            flows. It ships with mock data and client-side persistence only.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <Link href="/security" className="hover:text-foreground">
            Security model
          </Link>
          <Link href="/pricing" className="hover:text-foreground">
            Pricing
          </Link>
          <Link href="/app/settings" className="hover:text-foreground">
            Settings
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.22em]">
            MIT license
          </span>
        </div>
      </div>
    </footer>
  );
}
