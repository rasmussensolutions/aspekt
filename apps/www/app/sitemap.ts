import type { MetadataRoute } from "next";

const siteUrl = "https://www.aspekt.systems";

const routes = [
  { path: "/", priority: 1 },
  { path: "/principles", priority: 0.8 },
  { path: "/typography", priority: 0.8 },
  { path: "/colors", priority: 0.8 },
  { path: "/sonification", priority: 0.8 },
  { path: "/app-tabs", priority: 0.7 },
  { path: "/button", priority: 0.7 },
  { path: "/checkbox", priority: 0.7 },
  { path: "/input", priority: 0.7 },
  { path: "/select", priority: 0.7 },
  { path: "/combobox", priority: 0.7 },
  { path: "/slider", priority: 0.7 },
  { path: "/switch", priority: 0.7 },
  { path: "/toggle", priority: 0.7 },
  { path: "/avatar", priority: 0.7 },
  { path: "/dialog", priority: 0.7 },
  { path: "/drawer", priority: 0.7 },
  { path: "/popover", priority: 0.7 },
  { path: "/sidebar", priority: 0.7 },
  { path: "/toast", priority: 0.7 },
  { path: "/tabs", priority: 0.7 },
  { path: "/table", priority: 0.7 },
  { path: "/snippet", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route.path, siteUrl).toString(),
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
