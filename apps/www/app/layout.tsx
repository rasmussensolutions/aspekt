import type { Metadata } from "next";
import "./globals.css";
import { SoundProvider } from "@aspekt/components-source/sound-provider";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "./theme-provider";

export const metadata: Metadata = {
  title: "Aspekt UI",
  description: "Precision-crafted React components for modern web apps.",
  metadataBase: new URL("https://www.aspekt.systems"),
  openGraph: {
    title: "Aspekt UI",
    description: "Precision-crafted React components for modern web apps.",
    url: "https://www.aspekt.systems",
    siteName: "Aspekt UI",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Precision-crafted React components for modern web apps.",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Aspekt UI",
    description: "Precision-crafted React components for modern web apps.",
    images: [
      {
        url: "/twitter-image.png",
        width: 1200,
        height: 630,
        alt: "Precision-crafted React components for modern web apps.",
      },
    ],
    creator: "@tobiasrasmsn",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SoundProvider variant="pop" volume={1}>
            <Analytics />
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
