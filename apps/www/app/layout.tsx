import type { Metadata } from "next";
import "./globals.css";
import { SoundProvider } from "@aspekt/ui/sound-provider";

export const metadata: Metadata = {
  title: "Aspekt UI",
  description: "Registry docs for the Aspekt UI component library.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SoundProvider variant="pop" volume={10}>
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
