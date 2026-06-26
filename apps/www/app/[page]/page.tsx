import { notFound } from "next/navigation";

import { DocsApp } from "../page";

const docsPages = [
  "principles",
  "button",
  "checkbox",
  "input",
  "select",
  "slider",
  "switch",
  "toggle",
  "dialog",
  "drawer",
  "popover",
  "tabs",
  "table",
  "snippet",
  "sound-provider",
  "heading",
  "text",
  "code",
  "kbd",
  "prose",
  "blockquote",
  "list",
] as const;

type DocsRoutePage = (typeof docsPages)[number];

function isDocsRoutePage(page: string): page is DocsRoutePage {
  return (docsPages as readonly string[]).includes(page);
}

export function generateStaticParams() {
  return docsPages.map((page) => ({ page }));
}

export default async function DocsRoute({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;

  if (!isDocsRoutePage(page)) {
    notFound();
  }

  return <DocsApp initialPage={page} />;
}
