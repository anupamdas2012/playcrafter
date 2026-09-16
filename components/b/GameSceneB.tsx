"use client";

import { motion } from "framer-motion";

type Kind = "shark-pizza" | "cat-castle" | "robot-lava";

export function GameSceneB({ kind, refined = false }: { kind: Kind; refined?: boolean }) {
  return (
    <div
      className="w-full max-w-[220px] md:max-w-md aspect-[16/10] border-[3px] border-ink overflow-hidden relative"
      style={{ background: sceneBg(kind), boxShadow: "4px 4px 0 0 #1a2438" }}
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
      return "linear-gradient(180deg, #0b1a3a 0%, #4a9fe0 100%)";
    case "cat-castle":
      return "linear-gradient(180deg, #1a2438 0%, #4d5b7a 100%)";
    case "robot-lava":
      return "linear-gradient(180deg, #f5c518 0%, #d4453f 100%)";
  }
}

function HUD({ kind }: { kind: Kind }) {
  const labels: Record<Kind, string> = {
    "shark-pizza": "🍕 0/5",
    "cat-castle": "🗝️ 0/3",
    "robot-lava": "⭐ 0/10",
  };
  return (
    <div className="absolute top-1 left-1 right-1 flex items-center justify-between font-pixel text-[8px] text-white z-10">
      <span className="bg-black/60 px-1.5 py-0.5">{labels[kind]}</span>
      <span className="bg-black/60 px-1.5 py-0.5">♥♥♥</span>
    </div>
  );
}

function SharkPizza({ refined }: { refined: boolean }) {
  return (
    <>
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-[2px] h-[2px] bg-white"
          style={{ top: `${(i * 37) % 90}%`, left: `${(i * 53) % 95}%` }}
        />
      ))}
      {[15, 55, 78].map((left, i) => (
        <motion.div
          key={i}
          className="absolute text-xl"
          style={{ left: `${left}%`, top: `${25 + i * 15}%` }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          🍕
        </motion.div>
      ))}
      <motion.div
        className="absolute bottom-3 flex items-center"
        initial={{ x: "-20%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
        style={{ fontSize: refined ? "2.75rem" : "1.75rem" }}
      >
        <span>🦈</span>
        {refined && (
          <motion.span
            className="ml-[-4px] h-[4px]"
            style={{ background: "#f5c518" }}
            initial={{ width: 0 }}
            animate={{ width: [0, 70, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </motion.div>
    </>
  );
}

function CatCastle({ refined }: { refined: boolean }) {
  return (
    <>
      <div className="absolute top-2 right-3 w-4 h-4 bg-flower-yellow" />
      <svg viewBox="0 0 200 100" className="absolute bottom-0 left-0 w-full h-3/5" preserveAspectRatio="none">
        <path
          d="M0,100 L0,60 L15,60 L15,40 L30,40 L30,60 L55,60 L55,25 L75,25 L75,60 L120,60 L120,20 L140,20 L140,60 L170,60 L170,45 L185,45 L185,60 L200,60 L200,100 Z"
          fill="#1a2438"
          stroke="#000"
          strokeWidth="2"
        />
      </svg>
      <motion.div
        className="absolute text-lg top-6 left-4"
        animate={{ y: [0, -3, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        👻
      </motion.div>
      {refined &&
        Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-white text-[10px] pointer-events-none"
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
      <motion.div
        className="absolute text-2xl bottom-2"
        initial={{ x: "5%" }}
        animate={
          refined
            ? { x: ["5%", "30%", "55%", "80%", "80%", "5%"], y: [0, -16, -28, -16, 0, 0] }
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
          className="absolute text-sm"
          style={{ left: `${left}%`, top: "22%" }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
        >
          ⭐
        </motion.div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-flower-yellow" />
      <div className="absolute bottom-4 left-3 w-12 h-2 bg-ink" />
      <div className="absolute bottom-10 left-20 w-12 h-2 bg-ink" />
      <div className="absolute bottom-4 right-4 w-12 h-2 bg-ink" />
      <motion.div
        className="absolute flex flex-col items-center"
        initial={{ x: 14, y: 0 }}
        animate={
          refined
            ? { x: [14, 60, 120, 170, 120, 60, 14], y: [0, -50, -70, -50, -70, -50, 0] }
            : { x: [14, 80, 170, 14], y: [0, -18, -34, 0] }
        }
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "24px" }}
      >
        <span className="text-2xl">🤖</span>
        {refined && (
          <motion.span className="text-sm -mt-1" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 0.3, repeat: Infinity }}>
            🔥
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
