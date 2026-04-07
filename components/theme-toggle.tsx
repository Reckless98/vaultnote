"use client";

import { Monitor, MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const themeOptions = [
  { value: "dark", label: "Dark", icon: MoonStar },
  { value: "light", label: "Light", icon: SunMedium },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-10 rounded-full border border-border/70 bg-card/70",
          compact ? "w-10" : "w-44",
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border/70 bg-card/80 p-1 shadow-sm",
        className,
      )}
    >
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const active = theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            className={cn(
              "inline-flex h-8 items-center justify-center rounded-full px-3 text-sm",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
              compact ? "w-8 px-0" : "gap-2",
            )}
            aria-label={`Switch to ${option.label.toLowerCase()} theme`}
          >
            <Icon className="h-4 w-4" />
            {!compact ? <span>{option.label}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
