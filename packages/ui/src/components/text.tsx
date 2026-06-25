import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "cnfast";

const textVariants = cva("text-pretty text-foreground", {
  variants: {
    size: {
      lg: "text-lg leading-8",
      base: "text-base leading-7",
      sm: "text-sm leading-6",
      xs: "text-xs leading-5",
    },
    tone: {
      default: "text-foreground",
      muted: "text-foreground/75",
      subtle: "text-foreground/50",
      accent: "text-accent-foreground",
      danger: "text-red-600 dark:text-red-400",
      success: "text-emerald-600 dark:text-emerald-400",
      warning: "text-amber-600 dark:text-amber-400",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    size: "base",
    tone: "default",
    weight: "normal",
  },
});

type TextProps<T extends React.ElementType = "p"> =
  React.ComponentPropsWithoutRef<T> &
    VariantProps<typeof textVariants> & {
      as?: T;
    };

function Text<T extends React.ElementType = "p">({
  as,
  className,
  size,
  tone,
  weight,
  ...props
}: TextProps<T>) {
  const Component = as || "p";

  return (
    <Component
      className={cn(textVariants({ size, tone, weight }), className)}
      {...props}
    />
  );
}

export { Text, textVariants };
