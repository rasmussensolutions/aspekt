import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { CodeCopyButton } from "./code-copy-button";

const codeVariants = cva("font-mono tabular-nums", {
  variants: {
    variant: {
      inline: [
        "inline rounded-md border border-border bg-surface-sunken",
        "px-1.5 py-0.5 text-[0.875em] leading-none",
      ],
      block: [
        "block max-w-full overflow-x-auto whitespace-pre rounded-lg border border-border",
        "bg-surface-sunken px-4 py-3 text-sm leading-6 shadow-sm",
      ],
    },
    tone: {
      default: "text-primary",
      muted: "text-secondary",
      accent: "border-action/25 bg-action/10 text-primary",
      danger: "border-destructive/20 bg-destructive/10 text-destructive",
      success: "border-success/20 bg-success/10 text-success",
      warning: "border-warning/25 bg-warning/10 text-warning",
    },
  },
  defaultVariants: {
    variant: "inline",
    tone: "default",
  },
});

type CodeVariant = "inline" | "block";

type CodeTone =
  | "default"
  | "muted"
  | "accent"
  | "danger"
  | "success"
  | "warning";

type CodeProps = React.HTMLAttributes<HTMLElement> & {
    as?: "code" | "pre";
    copiedLabel?: string;
    copyable?: boolean;
    copyButtonClassName?: string;
    copyLabel?: string;
    copyValue?: string;
    tone?: CodeTone | null;
    variant?: CodeVariant | null;
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
export type { CodeProps, CodeTone, CodeVariant };
