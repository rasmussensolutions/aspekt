import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

const kbdVariants = cva(
  [
    "inline-flex items-center justify-center border font-mono font-medium tabular-nums",
    "text-foreground shadow-[inset_0_-1px_0_rgb(0_0_0/0.12)]",
    "dark:shadow-[inset_0_-1px_0_rgb(255_255_255/0.12)]",
  ],
  {
    variants: {
      variant: {
        outline:
          "border-neutral-200 bg-white text-neutral-700 dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-200",
        soft:
          "border-transparent bg-neutral-950/5 text-neutral-700 dark:bg-white/10 dark:text-neutral-200",
      },
      size: {
        sm: "h-5 min-w-5 px-1 text-[0.6875rem]",
        base: "h-6 min-w-6 px-1.5 text-xs",
        lg: "h-7 min-w-7 px-2 text-sm",
      },
      shape: {
        square: "rounded-md",
        round: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "base",
      shape: "square",
    },
  },
);

type KbdProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof kbdVariants>;

function Kbd({ className, shape, size, variant, ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(kbdVariants({ variant, size, shape }), className)}
      {...props}
    />
  );
}

export { Kbd, kbdVariants };
