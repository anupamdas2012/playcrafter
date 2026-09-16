"use client";

import type { ReactNode } from "react";

type Tint = "deep" | "night" | "sunset" | "meadow" | "sky";
type Props = {
  title: string;
  caption: string;
  by: string;
  plays: number;
  remixes: number;
  tint: Tint;
  children: ReactNode;
};

const TINT: Record<Tint, string> = {
  deep: "linear-gradient(180deg, #0b1a3a 0%, #2b5a7f 100%)",
  night: "linear-gradient(180deg, #1a2438 0%, #4d5b7a 100%)",
  sunset: "linear-gradient(180deg, #f5c518 0%, #d4453f 100%)",
  meadow: "linear-gradient(180deg, #a8dc8a 0%, #4fa04d 100%)",
  sky: "linear-gradient(180deg, #7ec0e8 0%, #4a9fe0 100%)",
};

export function GameTileB({ title, caption, by, plays, remixes, tint, children }: Props) {
  const dark = tint === "deep" || tint === "night";
  return (
    <div className="group paper-card overflow-hidden flex flex-col">
      <div
        className="relative aspect-[4/3]"
        style={{ background: TINT[tint] }}
      >
        {children}
        <span className={`absolute top-2 left-2 font-round font-extrabold text-[10px] px-2 py-1 border-[2px] border-ink ${dark ? "bg-paper text-ink" : "bg-ink text-paper"}`}>
          {by}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-2 flex items-center justify-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          <button className="lp-chip bg-flower-yellow text-ink !text-[10px] !py-1 !px-2 !shadow-none border-[2px]">▶ Walk in</button>
          <button className="lp-chip bg-paper text-ink !text-[10px] !py-1 !px-2 !shadow-none border-[2px]">🎨 Remix</button>
        </div>
      </div>
      <div className="p-3 border-t-[3px] border-ink flex-1 flex flex-col gap-1">
        <div className="font-round font-extrabold text-base leading-tight text-ink">{title}</div>
        <div className="font-round italic text-sm text-ink2 leading-snug">&ldquo;{caption}&rdquo;</div>
        <div className="mt-1 flex items-center gap-3 font-pixel text-[9px] text-ink2 tracking-wide">
          <span>▶ {plays.toLocaleString()} visits</span>
          <span>🎨 {remixes} remixes</span>
        </div>
      </div>
    </div>
  );
}
