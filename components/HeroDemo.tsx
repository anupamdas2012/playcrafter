"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { GameScene } from "./GameScene";

type ChipKind = "verb" | "entity" | "world" | "goal" | "new";

type Demo = {
  prompt: string;
  title: string;
  scene: "shark-pizza" | "cat-castle" | "robot-lava";
  chips: { label: string; kind: ChipKind }[];
  refine: {
    prompt: string;
    addedChip: { label: string; kind: ChipKind };
  };
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
      { label: "eat all slices", kind: "goal" },
    ],
    refine: {
      prompt: "actually, give the shark a laser beam!",
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
      { label: "reach the tower", kind: "goal" },
    ],
    refine: {
      prompt: "make it snow, and the cat can double-jump",
      addedChip: { label: "❄️ snow + double-jump", kind: "new" },
    },
  },
  {
    prompt: "a tiny robot jumping over lava collecting stars",
    title: "Bolt & the Lava Stars",
    scene: "robot-lava",
    chips: [
      { label: "run", kind: "verb" },
      { label: "jump", kind: "verb" },
      { label: "🤖 robot", kind: "entity" },
      { label: "⭐ star", kind: "entity" },
      { label: "volcano", kind: "world" },
      { label: "collect 10 stars", kind: "goal" },
    ],
    refine: {
      prompt: "give the robot a jetpack so it can fly!",
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

export function HeroDemo() {
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

  // Word-by-word typing during either listen phase.
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
      {/* Step pills. */}
      <div className="hidden md:grid grid-cols-3 gap-4 mb-3 max-w-page mx-auto px-2">
        <StepLabel n={1} label="Say it out loud" active={stepActive === 1} />
        <StepLabel n={2} label="Play it" active={stepActive === 2} />
        <StepLabel n={3} label="Change it — just talk" active={stepActive === 3} />
      </div>

      <div className="relative w-full max-w-page mx-auto rounded-chunk border-4 border-ink bg-white shadow-play overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[460px]">
          {/* LEFT: kid talking to the mic. */}
          <div className="relative p-6 md:p-8 border-b-4 md:border-b-0 md:border-r-4 border-ink bg-bg2">
            <span className="absolute top-4 right-4 text-[10px] font-sans font-bold tracking-wider text-ink2">
              {isRefine ? "KID SAYS A CHANGE" : "KID SPEAKS"}
            </span>
            <span className="absolute top-6 left-6 w-3 h-3 rounded-full bg-blue" />
            <span className="absolute bottom-8 left-10 w-4 h-4 rounded-full bg-mint" />
            <span className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-yellow" />

            <div className="h-full flex flex-col items-center justify-center gap-6 text-center">
              <MicPuck phase={phase} />

              <div className="min-h-[6rem] max-w-sm">
                <AnimatePresence mode="wait">
                  {phase === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-sans text-ink2"
                    >
                      Tap the mic and say <span className="italic-serif text-ink">any</span> game idea…
                    </motion.div>
                  )}
                  {phase !== "idle" && (
                    <motion.div
                      key={demoIdx + "-" + (isRefine ? "refine" : "capture")}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="italic-serif text-2xl leading-snug text-ink"
                    >
                      &ldquo;
                      {phase === "listening" || phase === "refineListening"
                        ? words.slice(0, wordsShown).join(" ")
                        : activePrompt}
                      {(phase === "listening" || phase === "refineListening") && (
                        <span className="inline-block w-2 h-6 align-[-4px] bg-ink ml-1 animate-pulse" />
                      )}
                      &rdquo;
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <PhasePill phase={phase} />
            </div>
          </div>

          {/* RIGHT: what you get. */}
          <div className="relative p-6 md:p-8 bg-white">
            <span className="absolute top-4 right-4 text-[10px] font-sans font-bold tracking-wider text-ink2">
              {phase === "refineReady"
                ? "GAME UPDATED"
                : phase === "refineListening" || phase === "refineThinking"
                  ? "UPDATING…"
                  : "YOU GET A GAME"}
            </span>

            <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
              <AnimatePresence mode="wait">
                {phase === "idle" || phase === "listening" ? (
                  <motion.div
                    key="waiting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-3 text-ink2"
                  >
                    <div className="text-6xl opacity-40">🎮</div>
                    <div className="font-sans text-sm">…waiting for the idea</div>
                  </motion.div>
                ) : phase === "thinking" || phase === "refineThinking" ? (
                  <motion.div
                    key={"think-" + phase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="text-6xl animate-wiggle">✏️</div>
                    <div className="font-sans font-extrabold text-xl md:text-2xl">
                      Sparky is{" "}
                      <span className="italic-serif text-blue">
                        {phase === "refineThinking" ? "updating" : "designing"}
                      </span>
                      …
                    </div>
                    <ThinkingBar />
                  </motion.div>
                ) : (
                  <motion.div
                    key={"ready-" + demoIdx + "-" + (phase === "refineReady" ? "r" : "b")}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center gap-3 w-full"
                  >
                    <div className="font-sans font-extrabold text-xl md:text-2xl flex items-center gap-2">
                      <span className="italic-serif text-blue">{demo.title}</span>
                      {phase === "refineReady" && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="rounded-full border-2 border-ink bg-mint px-2 py-0.5 text-[10px] font-sans font-extrabold"
                        >
                          UPDATED
                        </motion.span>
                      )}
                    </div>
                    <GameScene kind={demo.scene} refined={phase === "refineReady"} />
                    <div className="flex flex-wrap gap-1.5 justify-center max-w-md">
                      {demo.chips.map((c, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * i }}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-sans font-semibold border-2 border-ink ${chipColor(c.kind)}`}
                        >
                          {c.label}
                        </motion.span>
                      ))}
                      {phase === "refineReady" && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.6, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 18 }}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-sans font-extrabold border-2 border-ink ${chipColor(
                            "new",
                          )} shadow-playSm`}
                        >
                          + {demo.refine.addedChip.label}
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Progress dots for the demo cycle. */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {DEMOS.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full border-2 border-ink ${i === demoIdx ? "bg-yellow" : "bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
}

function StepLabel({ n, label, active }: { n: number; label: string; active: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 font-sans text-sm transition-colors ${active ? "text-ink" : "text-ink2"}`}
    >
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-ink text-xs font-extrabold ${active ? "bg-yellow" : "bg-white"}`}
      >
        {n}
      </span>
      <span className="font-bold">{label}</span>
    </div>
  );
}

function MicPuck({ phase }: { phase: Phase }) {
  const listening = phase === "listening" || phase === "refineListening";
  const thinking = phase === "thinking" || phase === "refineThinking";
  return (
    <div className="relative">
      {listening && (
        <>
          <span className="absolute inset-0 rounded-full bg-pink/50 animate-ping" />
          <span className="absolute inset-0 rounded-full bg-pink/30 animate-ping [animation-delay:200ms]" />
        </>
      )}
      <div
        className={`relative w-24 h-24 rounded-full border-4 border-ink shadow-play flex items-center justify-center text-4xl ${
          listening ? "bg-pink animate-breathe" : thinking ? "bg-yellow" : "bg-white"
        }`}
      >
        {thinking ? "…" : "🎤"}
      </div>
    </div>
  );
}

function PhasePill({ phase }: { phase: Phase }) {
  const text =
    phase === "idle"
      ? "tap to talk"
      : phase === "listening"
        ? "listening…"
        : phase === "thinking"
          ? "cooking up your game"
          : phase === "ready"
            ? "done — play or change it!"
            : phase === "refineListening"
              ? "listening for a change…"
              : phase === "refineThinking"
                ? "applying your change"
                : "updated!";
  const cls =
    phase === "listening" || phase === "refineListening"
      ? "bg-pink"
      : phase === "thinking" || phase === "refineThinking"
        ? "bg-yellow"
        : phase === "ready" || phase === "refineReady"
          ? "bg-mint"
          : "bg-white";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-2 border-ink px-3 py-1 text-xs font-sans font-bold ${cls}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-ink" />
      {text}
    </span>
  );
}

function ThinkingBar() {
  return (
    <div className="w-40 h-3 rounded-full border-2 border-ink bg-white overflow-hidden">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className="w-1/2 h-full bg-blue"
      />
    </div>
  );
}

function chipColor(kind: ChipKind): string {
  switch (kind) {
    case "verb":
      return "bg-blue-soft";
    case "entity":
      return "bg-pink/40";
    case "world":
      return "bg-mint";
    case "goal":
      return "bg-yellow-soft";
    case "new":
      return "bg-yellow";
  }
}
