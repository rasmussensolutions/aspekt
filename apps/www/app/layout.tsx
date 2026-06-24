import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
