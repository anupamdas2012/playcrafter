"use client";

import type { ReactNode } from "react";

type Props = {
  title: string;
  caption: string;
  by: string;
  plays: number;
  remixes: number;
  tint: "blue" | "pink" | "yellow" | "mint" | "dark" | "sunset";
  children: ReactNode;
};

const TINT: Record<Props["tint"], string> = {
  blue: "linear-gradient(180deg, #6cc3f0 0%, #3ba7e8 100%)",
  pink: "linear-gradient(180deg, #ffc0ce 0%, #ff8fa3 100%)",
  yellow: "linear-gradient(180deg, #fde585 0%, #f5c518 100%)",
  mint: "linear-gradient(180deg, #d7f2dc 0%, #8fd39d 100%)",
  dark: "linear-gradient(180deg, #1e293b 0%, #0F172A 100%)",
  sunset: "linear-gradient(180deg, #ffb072 0%, #ff5a4a 100%)",
};

export function GameTile({ title, caption, by, plays, remixes, tint, children }: Props) {
  const isDark = tint === "dark" || tint === "sunset";
  return (
    <div className="group rounded-chunk border-4 border-ink bg-white shadow-play overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] tile-grid" style={{ background: TINT[tint] }}>
        {children}
        <span
          className={`absolute top-2 left-2 rounded-full border-2 border-ink px-2 py-0.5 text-[10px] font-sans font-bold ${isDark ? "bg-white text-ink" : "bg-ink text-white"}`}
        >
          by {by}
        </span>
        {/* Play + remix affordances slide up on hover. */}
        <div className="absolute inset-x-0 bottom-0 p-2 flex items-center justify-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          <button className="rounded-full border-2 border-ink bg-yellow text-ink text-[11px] font-sans font-extrabold px-3 py-1 shadow-playSm">
            ▶ Play
          </button>
          <button className="rounded-full border-2 border-ink bg-white text-ink text-[11px] font-sans font-extrabold px-3 py-1 shadow-playSm">
            🎨 Remix
          </button>
        </div>
      </div>
      <div className="p-3 border-t-4 border-ink flex-1 flex flex-col gap-1">
        <div className="font-sans font-extrabold text-base leading-tight">{title}</div>
        <div className="italic-serif text-sm text-ink2 leading-snug">&ldquo;{caption}&rdquo;</div>
        <div className="mt-1 flex items-center gap-3 text-[11px] font-sans font-bold text-ink2">
          <span>▶ {plays.toLocaleString()} plays</span>
          <span>🎨 {remixes} remixes</span>
        </div>
      </div>
    </div>
  );
}
