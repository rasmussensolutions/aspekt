import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { aspektConfig } from "./config";

const kbdVariants = cva(
  [
    "inline-flex items-center justify-center border font-mono font-medium tabular-nums",
    "text-primary shadow-[inset_0_-1px_0_color-mix(in_oklab,var(--text-primary)_12%,transparent)]",
  ],
  {
    variants: {
      variant: {
        outline: "border-border bg-surface-current text-primary",
        soft: "border-transparent bg-surface-muted text-primary",
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

type KbdVariant = "soft" | "outline";

type KbdSize = "sm" | "base" | "lg";

type KbdShape = "square" | "round";

type KbdProps = React.HTMLAttributes<HTMLElement> & {
  shape?: KbdShape | null;
  size?: KbdSize | null;
  variant?: KbdVariant | null;
};

function Kbd({ className, shape, size, variant, ...props }: KbdProps) {
  const resolvedShape = shape ?? aspektConfig.shape;

  return (
    <kbd
      data-slot="kbd"
      className={cn(
        kbdVariants({ variant, size, shape: resolvedShape }),
        className,
      )}
      {...props}
    />
  );
}

export { Kbd, kbdVariants };
export type { KbdProps, KbdShape, KbdSize, KbdVariant };
