import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "playcrafter.ai — every kid has a world inside them",
  description:
    "Speak a world into being. Playcrafter turns the adventures kids dream up into playable worlds — so they practice creative thinking and problem-solving while building.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4a9fe0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
