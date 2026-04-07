import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3 text-left", className)}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-card shadow-[0_16px_48px_-28px_rgba(0,0,0,0.65)]">
        <LockKeyhole className="h-4 w-4 text-primary" strokeWidth={2.1} />
      </span>
      {!compact ? (
        <span className="flex flex-col">
          <span className="font-serif text-xl tracking-tight text-foreground">
            VaultNote
          </span>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-muted-foreground">
            encrypted writing
          </span>
        </span>
      ) : null}
    </Link>
  );
}
