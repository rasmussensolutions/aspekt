import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

const blockquoteVariants = cva(
  [
    "border-l-2 pl-5 text-pretty text-foreground",
    "[&>p]:my-0 [&>p+p]:mt-4",
  ],
  {
    variants: {
      size: {
        sm: "text-sm leading-6",
        base: "text-base leading-7",
        lg: "text-lg leading-8",
      },
      tone: {
        default: "border-border",
        muted: "border-border text-muted-foreground",
        accent: "border-primary",
        danger: "border-destructive text-destructive",
        success: "border-success text-success",
        warning: "border-warning text-warning",
      },
    },
    defaultVariants: {
      size: "base",
      tone: "default",
    },
  },
);

const blockquoteSourceVariants = cva("mt-3 block text-sm not-italic", {
  variants: {
    tone: {
      default: "text-muted-foreground",
      muted: "text-muted-foreground",
      accent: "text-muted-foreground",
      danger: "text-destructive/80",
      success: "text-success/80",
      warning: "text-warning/80",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

type BlockquoteSize = "sm" | "base" | "lg";

type BlockquoteTone =
  | "default"
  | "muted"
  | "accent"
  | "danger"
  | "success"
  | "warning";

type BlockquoteProps = React.BlockquoteHTMLAttributes<HTMLQuoteElement> & {
    size?: BlockquoteSize | null;
    source?: React.ReactNode;
    sourceClassName?: string;
    tone?: BlockquoteTone | null;
  };

function Blockquote({
  children,
  className,
  size,
  source,
  sourceClassName,
  tone,
  ...props
}: BlockquoteProps) {
  return (
    <blockquote
      data-slot="blockquote"
      className={cn(blockquoteVariants({ size, tone }), className)}
      {...props}
    >
      {children}
      {source ? (
        <footer
          data-slot="blockquote-source"
          className={cn(blockquoteSourceVariants({ tone }), sourceClassName)}
        >
          {source}
        </footer>
      ) : null}
    </blockquote>
  );
}

export { Blockquote, blockquoteSourceVariants, blockquoteVariants };
export type { BlockquoteProps, BlockquoteSize, BlockquoteTone };
