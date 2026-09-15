import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "playcrafter.ai — kids build games with their voice",
  description:
    "Tell a game idea, get a game. Playcrafter helps kids think creatively and problem-solve while making games they actually get to play.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5C518",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
