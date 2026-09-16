"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { GameSceneB } from "./GameSceneB";

type ChipKind = "verb" | "entity" | "world" | "goal" | "new";

type Demo = {
  prompt: string;
  title: string;
  scene: "shark-pizza" | "cat-castle" | "robot-lava";
  chips: { label: string; kind: ChipKind }[];
  refine: { prompt: string; addedChip: { label: string; kind: ChipKind } };
};

const DEMOS: Demo[] = [
  {
    prompt: "a shark that eats pizza slices in outer space",
    title: "Cosmic Pizza Shark",
    scene: "shark-pizza",
    chips: [
      { label: "swim", kind: "verb" },
      { label: "chomp", kind: "verb" },
      { label: "🦈 shark", kind: "entity" },
      { label: "🍕 pizza", kind: "entity" },
      { label: "space", kind: "world" },
      { label: "eat all", kind: "goal" },
    ],
    refine: {
      prompt: "give the shark a laser beam!",
      addedChip: { label: "🔫 laser", kind: "new" },
    },
  },
  {
    prompt: "a ninja cat sneaking through a spooky castle",
    title: "Whisker Shadow",
    scene: "cat-castle",
    chips: [
      { label: "sneak", kind: "verb" },
      { label: "pounce", kind: "verb" },
      { label: "🐱 cat", kind: "entity" },
      { label: "👻 ghost", kind: "entity" },
      { label: "castle", kind: "world" },
      { label: "reach top", kind: "goal" },
    ],
    refine: {
      prompt: "make it snow and add double-jump",
      addedChip: { label: "❄️ snow + jump", kind: "new" },
    },
  },
  {
    prompt: "a tiny robot jumping over lava collecting stars",
    title: "Bolt & Lava Stars",
    scene: "robot-lava",
    chips: [
      { label: "run", kind: "verb" },
      { label: "jump", kind: "verb" },
      { label: "🤖 robot", kind: "entity" },
      { label: "⭐ star", kind: "entity" },
      { label: "volcano", kind: "world" },
      { label: "10 stars", kind: "goal" },
    ],
    refine: {
      prompt: "give the robot a jetpack!",
      addedChip: { label: "🚀 jetpack", kind: "new" },
    },
  },
];

type Phase =
  | "idle"
  | "listening"
  | "thinking"
  | "ready"
  | "refineListening"
  | "refineThinking"
  | "refineReady";

const PHASE_MS: Record<Phase, number> = {
  idle: 800,
  listening: 3000,
  thinking: 1300,
  ready: 3200,
  refineListening: 2800,
  refineThinking: 1200,
  refineReady: 3800,
};

const NEXT_PHASE: Record<Phase, Phase> = {
  idle: "listening",
  listening: "thinking",
  thinking: "ready",
  ready: "refineListening",
  refineListening: "refineThinking",
  refineThinking: "refineReady",
  refineReady: "idle",
};

export function HeroDemoB() {
  const [demoIdx, setDemoIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [wordsShown, setWordsShown] = useState(0);
  const demo = DEMOS[demoIdx];

  const isRefine =
    phase === "refineListening" || phase === "refineThinking" || phase === "refineReady";
  const activePrompt = isRefine ? demo.refine.prompt : demo.prompt;
  const words = useMemo(() => activePrompt.split(" "), [activePrompt]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (phase === "refineReady") {
        setPhase("idle");
        setDemoIdx((i) => (i + 1) % DEMOS.length);
      } else {
        setPhase(NEXT_PHASE[phase]);
      }
    }, PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const isListening = phase === "listening" || phase === "refineListening";
    if (!isListening) {
      if (phase === "idle") setWordsShown(0);
      else setWordsShown(words.length);
      return;
    }
    setWordsShown(0);
    const duration = phase === "listening" ? PHASE_MS.listening : PHASE_MS.refineListening;
    const perWord = Math.max(120, Math.floor((duration - 400) / words.length));
    const id = setInterval(() => {
      setWordsShown((n) => (n < words.length ? n + 1 : n));
    }, perWord);
    return () => clearInterval(id);
  }, [phase, words]);

  const stepActive: 1 | 2 | 3 =
    phase === "idle" || phase === "listening"
      ? 1
      : phase === "thinking" || phase === "ready"
        ? 2
        : 3;

  return (
    <div className="relative">
      <div className="hidden md:grid grid-cols-3 gap-6 mb-4 max-w-page mx-auto px-2">
        <StepLabel n={1} label="Say the world" active={stepActive === 1} />
        <StepLabel n={2} label="Walk into it" active={stepActive === 2} />
        <StepLabel n={3} label="Reshape it" active={stepActive === 3} />
      </div>

      <div className="relative w-full max-w-page mx-auto paper-card-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[460px]">
          {/* GAME PANEL — top on mobile, right on desktop. */}
          <div className="relative p-4 md:p-8 order-1 md:order-2 border-b-[3px] md:border-b-0 md:border-l-[3px] border-ink bg-paper h-[280px] md:h-auto overflow-hidden">
            <span className="absolute top-3 right-3 font-pixel text-[9px] text-ink2 tracking-widest">
              {phase === "refineReady" ? "WORLD UPDATED" : phase === "refineListening" || phase === "refineThinking" ? "RESHAPING…" : "THE WORLD APPEARS"}
            </span>

            <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
              <AnimatePresence mode="wait">
                {phase === "idle" || phase === "listening" ? (
                  <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3 text-ink2">
                    <div className="text-6xl opacity-40">🌱</div>
                    <div className="font-round font-bold text-lg">…waiting for the world</div>
                  </motion.div>
                ) : phase === "thinking" || phase === "refineThinking" ? (
                  <motion.div key={"think-" + phase} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
                    <div className="text-5xl">✏️</div>
                    <div className="font-round font-extrabold text-lg md:text-xl text-ink">
                      Sparky is <span className="text-sky italic">{phase === "refineThinking" ? "reshaping" : "sketching"}</span>…
                    </div>
                    <ThinkingBar />
                  </motion.div>
                ) : (
                  <motion.div key={"ready-" + demoIdx + "-" + (phase === "refineReady" ? "r" : "b")} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="flex flex-col items-center gap-2 w-full">
                    <div className="font-round font-extrabold text-base md:text-lg flex items-center gap-2 text-ink">
                      <span className="text-sky">{demo.title}</span>
                    </div>
                    <GameSceneB kind={demo.scene} refined={phase === "refineReady"} />
                    <div className="flex flex-wrap gap-1 justify-center max-w-md">
                      {demo.chips.slice(0, 4).map((c, i) => (
                        <motion.span key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className={`lp-mini-chip ${chipClass(c.kind)}`}>
                          {c.label}
                        </motion.span>
                      ))}
                      {phase === "refineReady" && (
                        <motion.span initial={{ opacity: 0, scale: 0.6, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className={`lp-mini-chip ${chipClass("new")}`}>
                          + {demo.refine.addedChip.label}
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* MIC PANEL — bottom on mobile, left on desktop. */}
          <div className="relative p-4 md:p-8 order-2 md:order-1 bg-sky-soft h-[220px] md:h-auto overflow-hidden">
            <span className="absolute top-3 right-3 font-pixel text-[9px] text-ink tracking-widest">
              {isRefine ? "KID RESHAPES" : "KID SPEAKS"}
            </span>

            {/* Subtle pixel-cloud in the mic panel corner. */}
            <div className="absolute -top-2 -left-4 opacity-40">
              <svg width="80" height="34" viewBox="0 0 80 34">
                <rect x="0" y="16" width="80" height="10" fill="#d9e6f2" />
                <rect x="10" y="8" width="50" height="10" fill="#ffffff" />
                <rect x="22" y="0" width="30" height="10" fill="#ffffff" />
              </svg>
            </div>

            <div className="h-full flex flex-col items-center justify-center gap-3 md:gap-6 text-center relative">
              <MicPuck phase={phase} />

              <div className="min-h-[3rem] md:min-h-[6rem] max-w-sm">
                <AnimatePresence mode="wait">
                  {phase === "idle" && (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-round font-bold text-lg text-ink">
                      Tap the mic and describe <span className="italic text-flower-red">any</span> world…
                    </motion.div>
                  )}
                  {phase !== "idle" && (
                    <motion.div key={demoIdx + "-" + (isRefine ? "refine" : "capture")} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-round font-bold italic text-xl md:text-2xl leading-snug text-ink">
                      &ldquo;
                      {phase === "listening" || phase === "refineListening" ? words.slice(0, wordsShown).join(" ") : activePrompt}
                      {(phase === "listening" || phase === "refineListening") && <span className="lp-cursor" />}
                      &rdquo;
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <PhasePill phase={phase} />
            </div>
          </div>
        </div>
      </div>

      {/* Progress dots. */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {DEMOS.map((_, i) => (
          <span key={i} className={`w-3 h-3 border-[2px] border-ink ${i === demoIdx ? "bg-flower-red" : "bg-paper"}`} />
        ))}
      </div>
    </div>
  );
}

function StepLabel({ n, label, active }: { n: number; label: string; active: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-3 transition-all ${active ? "opacity-100" : "opacity-45"}`}>
      <span className={`inline-flex items-center justify-center w-10 h-10 border-[3px] border-ink font-round font-extrabold text-lg ${active ? "bg-flower-yellow" : "bg-paper"}`} style={{ boxShadow: "3px 3px 0 0 #1a2438" }}>
        {n}
      </span>
      <span className="font-round font-extrabold text-lg md:text-xl text-ink">{label}</span>
    </div>
  );
}

function MicPuck({ phase }: { phase: Phase }) {
  const listening = phase === "listening" || phase === "refineListening";
  const thinking = phase === "thinking" || phase === "refineThinking";
  return (
    <div className="relative">
      {listening && <span className="absolute inset-0 bg-flower-red opacity-50 animate-ping" />}
      <div
        className={`relative w-16 h-16 md:w-20 md:h-20 border-[3px] border-ink flex items-center justify-center text-2xl md:text-3xl ${
          listening ? "bg-flower-red text-paper" : thinking ? "bg-sky text-paper" : "bg-paper"
        }`}
        style={{ boxShadow: "4px 4px 0 0 #1a2438" }}
      >
        {thinking ? "…" : "🎤"}
      </div>
    </div>
  );
}

function PhasePill({ phase }: { phase: Phase }) {
  const text =
    phase === "idle" ? "tap to talk"
      : phase === "listening" ? "listening…"
      : phase === "thinking" ? "sketching the world"
      : phase === "ready" ? "step in — or reshape"
      : phase === "refineListening" ? "listening for changes"
      : phase === "refineThinking" ? "reshaping…"
      : "world updated!";
  const bg =
    phase === "listening" || phase === "refineListening" ? "bg-flower-red text-paper"
    : phase === "thinking" || phase === "refineThinking" ? "bg-sky text-paper"
    : phase === "ready" || phase === "refineReady" ? "bg-grass-dark text-paper"
    : "bg-paper text-ink";
  return <span className={`lp-chip ${bg}`}>{text}</span>;
}

function ThinkingBar() {
  return (
    <div className="w-40 h-4 border-[3px] border-ink bg-paper overflow-hidden">
      <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="w-1/2 h-full bg-sky" />
    </div>
  );
}

function chipClass(kind: ChipKind): string {
  switch (kind) {
    case "verb": return "bg-sky text-paper";
    case "entity": return "bg-flower-red text-paper";
    case "world": return "bg-grass text-ink";
    case "goal": return "bg-flower-yellow text-ink";
    case "new": return "bg-ink text-flower-yellow";
  }
}
