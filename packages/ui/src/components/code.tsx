import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { CodeCopyButton } from "./code-copy-button";

const codeVariants = cva("font-mono tabular-nums text-foreground", {
  variants: {
    variant: {
      inline: [
        "inline rounded-md border border-neutral-200 bg-neutral-950/[0.04]",
        "px-1.5 py-0.5 text-[0.875em] leading-none",
        "dark:border-white/10 dark:bg-white/10",
      ],
      block: [
        "block max-w-full overflow-x-auto whitespace-pre rounded-lg border border-neutral-200",
        "bg-neutral-50 px-4 py-3 text-sm leading-6 text-neutral-700 shadow-sm",
        "dark:border-white/10 dark:bg-white/5 dark:text-neutral-300",
      ],
    },
    tone: {
      default: "",
      muted: "text-neutral-600 dark:text-neutral-300",
      accent: "border-primary/25 bg-primary/10 text-foreground",
      danger:
        "border-red-600/20 bg-red-600/10 text-red-700 dark:text-red-300",
      success:
        "border-emerald-600/20 bg-emerald-600/10 text-emerald-700 dark:text-emerald-300",
      warning:
        "border-amber-500/25 bg-amber-500/10 text-amber-800 dark:text-amber-300",
    },
  },
  defaultVariants: {
    variant: "inline",
    tone: "default",
  },
});

type CodeProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof codeVariants> & {
    as?: "code" | "pre";
    copiedLabel?: string;
    copyable?: boolean;
    copyButtonClassName?: string;
    copyLabel?: string;
    copyValue?: string;
  };

function getCopyText(children: React.ReactNode): string {
  if (children === null || children === undefined || typeof children === "boolean") {
    return "";
  }

  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getCopyText).join("");
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return getCopyText(children.props.children);
  }

  return "";
}

function Code({
  as,
  children,
  className,
  copiedLabel,
  copyable = false,
  copyButtonClassName,
  copyLabel,
  copyValue,
  tone,
  variant,
  ...props
}: CodeProps) {
  const Component = as ?? (variant === "block" ? "pre" : "code");
  const resolvedVariant = variant ?? "inline";
  const code = (
    <Component
      data-slot="code"
      className={cn(
        codeVariants({ variant, tone }),
        copyable && resolvedVariant === "block" ? "pr-12" : "",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );

  if (!copyable) return code;

  return resolvedVariant === "block" ? (
    <div data-slot="code-copy-wrapper" className="group/code relative max-w-full">
      {code}
      <CodeCopyButton
        className={copyButtonClassName}
        copiedLabel={copiedLabel}
        copyLabel={copyLabel}
        value={copyValue ?? getCopyText(children)}
      />
    </div>
  ) : (
    <span
      data-slot="code-copy-wrapper"
      className="inline-flex items-center gap-[0.25em] align-baseline"
    >
      {code}
      <CodeCopyButton
        className={copyButtonClassName}
        copiedLabel={copiedLabel}
        copyLabel={copyLabel}
        placement="inline"
        value={copyValue ?? getCopyText(children)}
      />
    </span>
  );
}

export { Code, CodeCopyButton, codeVariants };
