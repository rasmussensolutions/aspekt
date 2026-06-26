import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "cnfast";

const headingVariants = cva(
  "scroll-m-20 text-balance tracking-tight text-foreground",
  {
    variants: {
      size: {
        display: "text-5xl leading-[1.05] leading-tight md:text-6xl",
        h1: "text-4xl leading-tight",
        h2: "text-3xl leading-tight",
        h3: "text-2xl leading-snug",
        h4: "text-xl leading-snug",
        h5: "text-lg leading-snug",
        h6: "text-base leading-snug",
      },
      tone: {
        default: "text-foreground",
        muted: "text-foreground/75",
        subtle: "text-foreground/50",
        accent: "text-foreground font-medium",
      },
    },
    defaultVariants: {
      size: "h2",
      tone: "default",
    },
  },
);

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingTone = "default" | "muted" | "subtle" | "accent";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
    level?: HeadingLevel;
    size?: HeadingSize | null;
    tone?: HeadingTone | null;
  };

function Heading({ className, size, tone, level = 2, ...props }: HeadingProps) {
  const Component = `h${level}` as const;

  return (
    <Component
      className={cn(headingVariants({ size, tone }), className)}
      {...props}
    />
  );
}

export { Heading, headingVariants };
export type { HeadingLevel, HeadingProps, HeadingSize, HeadingTone };
