import { formatDistanceToNowStrict, format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNoteDate(value: string) {
  return format(new Date(value), "MMM d, yyyy");
}

export function formatNoteDateTime(value: string) {
  return format(new Date(value), "MMM d, yyyy 'at' h:mm a");
}

export function formatRelativeTime(value: string) {
  return formatDistanceToNowStrict(new Date(value), {
    addSuffix: true,
  });
}

export function countWords(markdown: string) {
  return markdown
    .replace(/[#>*`~-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function estimateReadingTime(markdown: string) {
  return Math.max(1, Math.round(countWords(markdown) / 180));
}

export function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
