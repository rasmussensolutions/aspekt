import { notFound } from "next/navigation";

import { DocsApp } from "../page";

const docsPages = [
  "principles",
  "typography",
  "colors",
  "sonification",
  "app-tabs",
  "avatar",
  "button",
  "checkbox",
  "input",
  "select",
  "combobox",
  "slider",
  "inline-slider",
  "switch",
  "toggle",
  "dialog",
  "drawer",
  "popover",
  "sidebar",
  "toast",
  "tabs",
  "table",
  "snippet",
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
