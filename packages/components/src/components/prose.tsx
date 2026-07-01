import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

const proseVariants = cva(
  [
    "max-w-prose text-pretty",
    "[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 hover:[&_a]:decoration-primary",
    "[&_strong]:font-semibold [&_strong]:text-primary",
    "[&_p]:my-4",
    "[&_h1]:mb-4 [&_h1]:mt-10 [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:leading-tight",
    "[&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:leading-tight",
    "[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:leading-snug",
    "[&_h4]:mb-2 [&_h4]:mt-6 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:leading-snug",
    "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
    "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
    "[&_li]:pl-1 [&_li]:marker:text-secondary",
    "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-5 [&_blockquote]:text-secondary",
    "[&_code]:rounded-md [&_code]:border [&_code]:border-border [&_code]:bg-surface-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.875em]",
    "[&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface-muted [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-6",
    "[&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0",
  ],
  {
    variants: {
      size: {
        sm: "text-sm leading-6 [&_p]:leading-6",
        base: "text-base leading-7 [&_p]:leading-7",
        lg: "text-lg leading-8 [&_p]:leading-8",
      },
      tone: {
        default: "text-primary",
        muted: "text-secondary",
      },
    },
    defaultVariants: {
      size: "base",
      tone: "default",
    },
  },
);

type ProseSize = "sm" | "base" | "lg";

type ProseTone = "default" | "muted";

type ProseProps<T extends React.ElementType = "div"> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    size?: ProseSize | null;
    tone?: ProseTone | null;
  };

function Prose<T extends React.ElementType = "div">({
  as,
  className,
  size,
  tone,
  ...props
}: ProseProps<T>) {
  const Component = as || "div";

  return (
    <Component
      data-slot="prose"
      className={cn(proseVariants({ size, tone }), className)}
      {...props}
    />
  );
}

export { Prose, proseVariants };
export type { ProseProps, ProseSize, ProseTone };
