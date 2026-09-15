"use client";

import { motion } from "framer-motion";

type Kind = "shark-pizza" | "cat-castle" | "robot-lava";

export function GameScene({ kind, refined = false }: { kind: Kind; refined?: boolean }) {
  return (
    <div
      className="w-full max-w-md aspect-[16/10] rounded-chunkSm border-4 border-ink overflow-hidden relative tile-grid"
      style={{ background: sceneBg(kind) }}
    >
      {kind === "shark-pizza" && <SharkPizza refined={refined} />}
      {kind === "cat-castle" && <CatCastle refined={refined} />}
      {kind === "robot-lava" && <RobotLava refined={refined} />}
      <HUD kind={kind} />
    </div>
  );
}

function sceneBg(kind: Kind): string {
  switch (kind) {
    case "shark-pizza":
      return "linear-gradient(180deg, #0b1a3a 0%, #3ba7e8 100%)";
    case "cat-castle":
      return "linear-gradient(180deg, #2b1b3f 0%, #6b4f8a 100%)";
    case "robot-lava":
      return "linear-gradient(180deg, #ffb072 0%, #ff5a4a 100%)";
  }
}

function HUD({ kind }: { kind: Kind }) {
  const labels: Record<Kind, string> = {
    "shark-pizza": "🍕 0 / 5",
    "cat-castle": "🗝️ 0 / 3",
    "robot-lava": "⭐ 0 / 10",
  };
  return (
    <div className="absolute top-2 left-2 right-2 flex items-center justify-between font-sans font-bold text-[11px] text-white z-10">
      <span className="bg-ink/70 rounded-full px-2 py-0.5">{labels[kind]}</span>
      <span className="bg-ink/70 rounded-full px-2 py-0.5">❤️ ❤️ ❤️</span>
    </div>
  );
}

function SharkPizza({ refined }: { refined: boolean }) {
  return (
    <>
      {/* stars */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${(i * 37) % 90}%`,
            left: `${(i * 53) % 95}%`,
            opacity: 0.7,
          }}
        />
      ))}
      {[15, 55, 78].map((left, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{ left: `${left}%`, top: `${25 + i * 15}%` }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          🍕
        </motion.div>
      ))}
      {/* shark swims across — bigger + laser when refined */}
      <motion.div
        className="absolute bottom-4 flex items-center gap-0"
        initial={{ x: "-20%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
        style={{ fontSize: refined ? "3.5rem" : "2.25rem" }}
      >
        <span>🦈</span>
        {refined && (
          <motion.span
            className="ml-[-6px] h-[6px] rounded-full bg-red-400"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: [0, 90, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
            style={{ boxShadow: "0 0 10px #ff3355" }}
          />
        )}
      </motion.div>
    </>
  );
}

function CatCastle({ refined }: { refined: boolean }) {
  return (
    <>
      {/* moon */}
      <div className="absolute top-3 right-4 w-6 h-6 rounded-full bg-yellow-soft" />
      {/* castle silhouette */}
      <svg viewBox="0 0 200 100" className="absolute bottom-0 left-0 w-full h-3/5" preserveAspectRatio="none">
        <path
          d="M0,100 L0,60 L15,60 L15,40 L30,40 L30,60 L55,60 L55,25 L75,25 L75,60 L120,60 L120,20 L140,20 L140,60 L170,60 L170,45 L185,45 L185,60 L200,60 L200,100 Z"
          fill="#1a1030"
          stroke="#0F172A"
          strokeWidth="2"
        />
      </svg>
      {/* ghost */}
      <motion.div
        className="absolute text-2xl top-8 left-6"
        animate={{ y: [0, -4, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        👻
      </motion.div>
      {/* snow when refined */}
      {refined &&
        Array.from({ length: 22 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-white text-xs pointer-events-none"
            style={{ left: `${(i * 47) % 100}%`, top: "-8%" }}
            animate={{ y: ["0%", "700%"], opacity: [0, 1, 0.7] }}
            transition={{
              duration: 3 + (i % 5) * 0.4,
              repeat: Infinity,
              delay: (i % 7) * 0.15,
              ease: "linear",
            }}
          >
            ❄
          </motion.span>
        ))}
      {/* cat sneaks — double-jumps arc when refined */}
      <motion.div
        className="absolute text-3xl bottom-3"
        initial={{ x: "5%" }}
        animate={
          refined
            ? { x: ["5%", "30%", "55%", "80%", "80%", "5%"], y: [0, -22, -40, -22, 0, 0] }
            : { x: ["5%", "80%", "80%", "5%"] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        🐱
      </motion.div>
    </>
  );
}

function RobotLava({ refined }: { refined: boolean }) {
  return (
    <>
      {[20, 55, 82].map((left, i) => (
        <motion.div
          key={i}
          className="absolute text-xl"
          style={{ left: `${left}%`, top: "22%" }}
          animate={{ y: [0, -4, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
        >
          ⭐
        </motion.div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 h-6" style={{ background: "#c62828" }} />
      <div className="absolute bottom-6 left-4 w-16 h-3 bg-ink rounded-sm" />
      <div className="absolute bottom-12 left-32 w-16 h-3 bg-ink rounded-sm" />
      <div className="absolute bottom-6 right-6 w-16 h-3 bg-ink rounded-sm" />
      {/* robot — flies high with jetpack when refined */}
      <motion.div
        className="absolute flex flex-col items-center"
        initial={{ x: 20, y: 0 }}
        animate={
          refined
            ? {
                x: [20, 90, 180, 260, 180, 90, 20],
                y: [0, -80, -110, -80, -110, -80, 0],
              }
            : {
                x: [20, 130, 260, 20],
                y: [0, -30, -50, 0],
              }
        }
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "36px" }}
      >
        <span className="text-3xl">🤖</span>
        {refined && (
          <motion.span
            className="text-lg -mt-1"
            animate={{ opacity: [0.6, 1, 0.6], scaleY: [0.8, 1.2, 0.8] }}
            transition={{ duration: 0.35, repeat: Infinity }}
          >
            🔥
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
