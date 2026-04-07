import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.72rem] font-medium tracking-wide",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/14 text-primary dark:bg-primary/22 dark:text-primary",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border/80 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
