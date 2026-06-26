import type { Metadata } from "next";
import "./globals.css";
import { SoundProvider } from "@aspekt/components/sound-provider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Aspekt UI",
  description: "Precision-crafted React components for modern web apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SoundProvider variant="pop" volume={1}>
          <Analytics />
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
