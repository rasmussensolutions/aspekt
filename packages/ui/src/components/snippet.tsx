import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";
import bash from "refractor/bash";
import css from "refractor/css";
import { refractor } from "refractor/core";
import javascript from "refractor/javascript";
import json from "refractor/json";
import jsx from "refractor/jsx";
import markup from "refractor/markup";
import tsx from "refractor/tsx";
import typescript from "refractor/typescript";

import { CodeCopyButton } from "./code-copy-button";

const snippetVariants = cva(
  "overflow-hidden border font-mono text-sm leading-6 text-neutral-700 shadow-sm dark:text-neutral-300",
  {
    variants: {
      variant: {
        outline:
          "border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-950",
        soft: "border-transparent bg-neutral-50 dark:bg-white/[0.06]",
      },
      shape: {
        square: "rounded-lg",
        round: "rounded-3xl",
      },
    },
    defaultVariants: {
      variant: "outline",
      shape: "square",
    },
  },
);

type SnippetLanguage =
  | "bash"
  | "css"
  | "html"
  | "js"
  | "json"
  | "jsx"
  | "sh"
  | "text"
  | "ts"
  | "tsx"
  | (string & {});

type SnippetVariant = "soft" | "outline";

type SnippetShape = "square" | "round";

type SnippetProps = Omit<React.HTMLAttributes<HTMLElement>, "children"> & {
    children?: string;
    code?: string;
    copiedLabel?: string;
    copyable?: boolean;
    copyButtonClassName?: string;
    copyLabel?: string;
    filename?: React.ReactNode;
    highlightedLines?: readonly number[];
    language?: SnippetLanguage;
    preClassName?: string;
    shape?: SnippetShape | null;
    showHeader?: boolean;
    showLineNumbers?: boolean;
    variant?: SnippetVariant | null;
    wrap?: boolean;
  };

type RefractorSyntax = {
  (prism: typeof refractor): undefined | void;
  aliases?: readonly string[];
  displayName: string;
};

type RefractorNode = RefractorElement | RefractorRoot | RefractorText;

type RefractorRoot = {
  children?: RefractorNode[];
  type: "root";
};

type RefractorElement = {
  children?: RefractorNode[];
  properties?: {
    className?: unknown;
  };
  type: "element";
};

type RefractorText = {
  type: "text";
  value: string;
};

const snippetSyntaxes = [
  bash,
  css,
  javascript,
  json,
  jsx,
  markup,
  typescript,
  tsx,
] satisfies RefractorSyntax[];

let snippetSyntaxesRegistered = false;

function registerSnippetSyntaxes() {
  if (snippetSyntaxesRegistered) {
    return;
  }

  for (const syntax of snippetSyntaxes) {
    if (!refractor.registered(syntax.displayName)) {
      refractor.register(syntax);
    }

    if (syntax.aliases?.length) {
      refractor.alias(syntax.displayName, [...syntax.aliases]);
    }
  }

  snippetSyntaxesRegistered = true;
}

function normalizeLanguage(language: SnippetLanguage | undefined) {
  const value = language?.toLowerCase() ?? "text";

  if (value === "javascript") return "js";
  if (value === "typescript") return "ts";
  if (value === "shell") return "sh";

  return value;
}

function getTokenClassName(className: unknown) {
  const classNames = Array.isArray(className)
    ? className.filter((name): name is string => typeof name === "string")
    : typeof className === "string"
      ? className.split(/\s+/)
      : [];

  const names = new Set(classNames);

  if (
    names.has("comment") ||
    names.has("prolog") ||
    names.has("doctype") ||
    names.has("cdata")
  ) {
    return "text-neutral-400 dark:text-neutral-500";
  }

  if (names.has("deleted")) {
    return "text-red-700 dark:text-red-300";
  }

  if (names.has("inserted")) {
    return "text-emerald-700 dark:text-emerald-300";
  }

  if (
    names.has("string") ||
    names.has("char") ||
    names.has("attr-value") ||
    names.has("url")
  ) {
    return "text-emerald-700 dark:text-emerald-300";
  }

  if (
    names.has("keyword") ||
    names.has("atrule") ||
    names.has("important") ||
    names.has("rule")
  ) {
    return "text-fuchsia-700 dark:text-fuchsia-300";
  }

  if (
    names.has("function") ||
    names.has("method") ||
    names.has("function-variable")
  ) {
    return "text-blue-700 dark:text-blue-300";
  }

  if (
    names.has("class-name") ||
    names.has("builtin") ||
    names.has("constructor")
  ) {
    return "text-sky-700 dark:text-sky-300";
  }

  if (
    names.has("number") ||
    names.has("boolean") ||
    names.has("constant") ||
    names.has("symbol")
  ) {
    return "text-blue-700 dark:text-blue-300";
  }

  if (
    names.has("property") ||
    names.has("attr-name") ||
    names.has("namespace") ||
    names.has("variable")
  ) {
    return "text-orange-700 dark:text-orange-300";
  }

  if (names.has("tag") || names.has("selector")) {
    return "text-red-700 dark:text-red-300";
  }

  if (
    names.has("operator") ||
    names.has("entity") ||
    names.has("punctuation") ||
    names.has("script-punctuation")
  ) {
    return "text-neutral-500 dark:text-neutral-400";
  }

  return undefined;
}

function splitTextNode(value: string) {
  return value.split("\n").map((line) => (line ? [line] : []));
}

function splitElementNode(node: RefractorElement, key: string) {
  const lines = splitRefractorNodes(node.children ?? [], key);
  const className = getTokenClassName(node.properties?.className);

  return lines.map((line, lineIndex) => [
    <span key={`${key}-${lineIndex}`} className={className}>
      {line}
    </span>,
  ]);
}

function splitRefractorNode(node: RefractorNode, key: string) {
  if (node.type === "text") {
    return splitTextNode(node.value);
  }

  if (node.type === "element") {
    return splitElementNode(node, key);
  }

  return splitRefractorNodes(node.children ?? [], key);
}

function splitRefractorNodes(nodes: RefractorNode[], key: string) {
  const lines: React.ReactNode[][] = [[]];

  nodes.forEach((node, index) => {
    const nodeLines = splitRefractorNode(node, `${key}-${index}`);

    nodeLines.forEach((nodeLine, nodeLineIndex) => {
      if (nodeLineIndex === 0) {
        lines[lines.length - 1]?.push(...nodeLine);
        return;
      }

      lines.push([...nodeLine]);
    });
  });

  return lines;
}

function getPlainLines(code: string) {
  return code.split("\n").map((line) => (line ? [line] : []));
}

function getHighlightedLines(code: string, language: string) {
  registerSnippetSyntaxes();

  if (language === "text" || !refractor.registered(language)) {
    return getPlainLines(code);
  }

  try {
    const tree = refractor.highlight(code, language) as RefractorRoot;

    return splitRefractorNodes(tree.children ?? [], language);
  } catch {
    return getPlainLines(code);
  }
}

function getSnippetCode(
  code: string | undefined,
  children: string | undefined,
) {
  return (code ?? children ?? "").replace(/\n$/, "");
}

function Snippet({
  children,
  className,
  code,
  copiedLabel,
  copyable = true,
  copyButtonClassName,
  copyLabel,
  filename,
  highlightedLines,
  language = "text",
  preClassName,
  shape,
  showHeader = true,
  showLineNumbers = false,
  variant,
  wrap = false,
  ...props
}: SnippetProps) {
  const value = getSnippetCode(code, children);
  const normalizedLanguage = normalizeLanguage(language);
  const lines = value.split("\n");
  const highlightedCodeLines = getHighlightedLines(value, normalizedLanguage);
  const highlightedLineSet = new Set(highlightedLines);
  const hasHeader = showHeader && Boolean(filename || language || copyable);
  const hasFloatingCopyButton = copyable && !hasHeader;

  return (
    <figure
      data-slot="snippet"
      className={cn(
        "relative",
        snippetVariants({ variant, shape }),
        className,
      )}
      {...props}
    >
      {hasHeader ? (
        <figcaption
          data-slot="snippet-header"
          className={cn(
            "flex min-h-10 items-center justify-between gap-3 border-b border-neutral-200 bg-neutral-50 py-2 dark:border-white/10 dark:bg-white/[0.03]",
            shape === "round" ? "px-5" : "px-3",
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            {filename ? (
              <span className="truncate text-xs font-medium text-foreground">
                {filename}
              </span>
            ) : null}
            {language ? (
              <span className="inline-flex h-4 items-center rounded-md bg-neutral-950/[0.04] px-1.5 text-[0.625rem] leading-none uppercase tracking-wide text-neutral-500 dark:bg-white/10 dark:text-neutral-400">
                {normalizedLanguage}
              </span>
            ) : null}
          </div>

          {copyable ? (
            <CodeCopyButton
              className={copyButtonClassName}
              copiedLabel={copiedLabel}
              copyLabel={copyLabel}
              placement="inline"
              value={value}
            />
          ) : null}
        </figcaption>
      ) : null}

      <pre
        data-slot="snippet-pre"
        className={cn(
          "overflow-x-auto p-4",
          hasFloatingCopyButton ? "pr-12" : "",
          wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre",
          preClassName,
        )}
      >
        <code data-slot="snippet-code" className="block min-w-max">
          {lines.map((line, index) => {
            const lineNumber = index + 1;
            const highlighted = highlightedLineSet.has(lineNumber);
            const highlightedCodeLine = highlightedCodeLines[index];

            return (
              <span
                key={`${lineNumber}-${line}`}
                data-highlighted={highlighted ? "" : undefined}
                data-line={lineNumber}
                className={cn(
                  "block min-h-6",
                  showLineNumbers
                    ? "grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4"
                    : "",
                  highlighted
                    ? "-mx-4 bg-primary/10 px-4 dark:bg-primary/15"
                    : "",
                )}
              >
                {showLineNumbers ? (
                  <span
                    aria-hidden="true"
                    className="select-none text-right text-neutral-400 dark:text-neutral-600"
                  >
                    {lineNumber}
                  </span>
                ) : null}
                <span
                  className={wrap ? "whitespace-pre-wrap" : "whitespace-pre"}
                >
                  {highlightedCodeLine && highlightedCodeLine.length > 0
                    ? highlightedCodeLine
                    : "\u00A0"}
                </span>
              </span>
            );
          })}
        </code>
      </pre>

      {hasFloatingCopyButton ? (
        <CodeCopyButton
          className={copyButtonClassName}
          copiedLabel={copiedLabel}
          copyLabel={copyLabel}
          value={value}
        />
      ) : null}
    </figure>
  );
}

export { Snippet, snippetVariants };
export type { SnippetLanguage, SnippetProps, SnippetShape, SnippetVariant };
