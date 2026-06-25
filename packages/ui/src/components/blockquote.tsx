import { cva, type VariantProps } from "class-variance-authority";
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
        default: "border-neutral-300 dark:border-white/20",
        muted:
          "border-neutral-200 text-neutral-600 dark:border-white/15 dark:text-neutral-300",
        accent: "border-primary",
        danger:
          "border-red-600 text-red-800 dark:border-red-500 dark:text-red-300",
        success:
          "border-emerald-600 text-emerald-800 dark:border-emerald-500 dark:text-emerald-300",
        warning:
          "border-amber-500 text-amber-900 dark:border-amber-400 dark:text-amber-300",
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
      default: "text-neutral-500 dark:text-neutral-400",
      muted: "text-neutral-500 dark:text-neutral-400",
      accent: "text-neutral-600 dark:text-neutral-300",
      danger: "text-red-700/80 dark:text-red-300/80",
      success: "text-emerald-700/80 dark:text-emerald-300/80",
      warning: "text-amber-800/80 dark:text-amber-300/80",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

type BlockquoteProps = React.BlockquoteHTMLAttributes<HTMLQuoteElement> &
  VariantProps<typeof blockquoteVariants> & {
    source?: React.ReactNode;
    sourceClassName?: string;
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
