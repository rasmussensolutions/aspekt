import type { MetadataRoute } from "next";

const siteUrl = "https://www.aspekt.systems";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
