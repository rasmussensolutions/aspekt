"use client";

import { cn } from "cnfast";
import * as React from "react";

type CodeCopyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  copiedLabel?: string;
  copyLabel?: string;
  placement?: "block" | "inline";
  timeout?: number;
  value: string;
};

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="M5.25 4.25V3.5A1.75 1.75 0 0 1 7 1.75h5.5a1.75 1.75 0 0 1 1.75 1.75V9A1.75 1.75 0 0 1 12.5 10.75h-.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <rect
        height="9"
        rx="1.75"
        stroke="currentColor"
        strokeWidth="1.5"
        width="9"
        x="1.75"
        y="5.25"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="m3.25 8.25 3 3 6.5-6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

async function writeClipboardText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

function CodeCopyButton({
  className,
  copiedLabel = "Copied",
  copyLabel = "Copy code",
  disabled,
  onClick,
  placement = "block",
  timeout = 1600,
  value,
  ...props
}: CodeCopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<number | null>(null);
  const iconClassName = placement === "inline" ? "size-[0.9em]" : "size-3.5";

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (event.defaultPrevented || disabled) return;

    await writeClipboardText(value);
    setCopied(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopied(false);
      timeoutRef.current = null;
    }, timeout);
  }

  return (
    <button
      type="button"
      aria-label={copied ? copiedLabel : copyLabel}
      className={cn(
        [
          "inline-flex shrink-0 items-center justify-center rounded-md",
          "text-muted-foreground outline-none transition-[background-color,color,opacity,transform] duration-150",
          "hover:bg-muted hover:text-foreground active:scale-95",
          "focus-visible:ring-2 focus-visible:ring-current/25",
          "disabled:pointer-events-none disabled:opacity-50",
          placement === "block"
            ? "absolute right-2 top-2 size-7 bg-card/80 shadow-sm backdrop-blur"
            : "size-[1.45em] rounded-sm bg-transparent",
        ],
        className,
      )}
      data-copied={copied ? "" : undefined}
      disabled={disabled}
      onClick={handleClick}
      title={copied ? copiedLabel : copyLabel}
      {...props}
    >
      {copied ? (
        <CheckIcon className={iconClassName} />
      ) : (
        <CopyIcon className={iconClassName} />
      )}
    </button>
  );
}

export { CodeCopyButton };
