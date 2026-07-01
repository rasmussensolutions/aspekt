"use client";

import { cn } from "cnfast";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import * as React from "react";

type CodeCopyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  copiedLabel?: string;
  copyLabel?: string;
  placement?: "block" | "inline";
  timeout?: number;
  value: string;
};

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
          "text-secondary outline-none transition-[background-color,color,opacity,transform] duration-150",
          "hover:bg-surface-hover hover:text-primary active:scale-95",
          "focus-visible:ring-2 focus-visible:ring-current/25",
          "disabled:pointer-events-none disabled:opacity-50",
          placement === "block"
            ? "absolute right-2 top-2 size-7 bg-surface-current/80 shadow-sm backdrop-blur"
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
        <CheckIcon
          aria-hidden="true"
          className={iconClassName}
          weight="bold"
        />
      ) : (
        <CopyIcon aria-hidden="true" className={iconClassName} />
      )}
    </button>
  );
}

export { CodeCopyButton };
