import Link from "next/link";
import { HeroDemoB } from "@/components/b/HeroDemoB";
import { GameTileB } from "@/components/b/GameTileB";
import { LandscapeHero } from "@/components/b/LandscapeHero";
import "./bstyles.css";

export default function PageB() {
  return (
    <main className="b8-root min-h-screen flex flex-col">
      <NavBar />

      {/* HERO: full-bleed pixel landscape backdrop with copy overlay. */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LandscapeHero className="w-full h-full" />
        </div>

        <div className="relative z-10 pt-10 md:pt-20 pb-6 px-4 md:px-6">
          <div className="max-w-page mx-auto text-center flex flex-col items-center gap-4">
            <h1 className="font-round font-extrabold text-4xl md:text-7xl leading-[1.02] max-w-4xl text-ink drop-shadow-[3px_3px_0_#fff8e7]">
              Every kid has a<br />
              <span className="text-flower-red">world</span> inside them.
            </h1>
            <p className="font-round font-bold text-lg md:text-2xl max-w-2xl text-ink drop-shadow-[2px_2px_0_#fff8e7]">
              Playcrafter helps them speak it into being.
              Fields, castles, oceans, moons — the world your kid dreams up
              becomes an adventure they can walk into.
            </p>
          </div>
        </div>

        {/* Demo card floats on top of the landscape's grass foreground. */}
        <div className="relative z-10 px-4 md:px-6 pb-12 md:pb-16">
          <HeroDemoB />
        </div>

        <div className="relative z-10 max-w-page mx-auto flex flex-col md:flex-row items-center justify-center gap-3 px-4 pb-16">
          <Link href="#try" className="lp-btn lp-btn-sun">
            ▶ Speak a world into being
          </Link>
          <Link href="#showcase" className="lp-btn lp-btn-paper">
            Wander into a world
          </Link>
        </div>
      </section>

      <Showcase />
      <WhyItsGood />
      <FinalCTA />
      <Footer />
    </main>
  );
}

function NavBar() {
  return (
    <header className="px-4 md:px-6 pt-5 pb-3 relative z-10">
      <div className="max-w-page mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="lp-logo-mark">◉</span>
          <span className="font-round font-extrabold text-xl md:text-2xl text-ink">
            play<span className="text-flower-red">crafter</span>
            <span className="text-ink2">.ai</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="#showcase" className="hidden md:inline-flex font-round font-bold text-sm text-ink2 hover:text-ink px-3 py-2">
            atlas
          </Link>
          <Link href="#why" className="hidden md:inline-flex font-round font-bold text-sm text-ink2 hover:text-ink px-3 py-2">
            for parents
          </Link>
          <Link href="#try" className="lp-btn lp-btn-sm lp-btn-ink">
            Try it →
          </Link>
        </div>
      </div>
    </header>
  );
}

function Showcase() {
  return (
    <section id="showcase" className="px-4 md:px-6 py-16 border-t-[3px] border-ink bg-paper relative overflow-hidden">
      {/* Decorative clouds drifting overhead. */}
      <div className="absolute top-4 left-6 opacity-40 pointer-events-none">
        <svg width="80" height="30" viewBox="0 0 80 30">
          <rect x="0" y="12" width="80" height="8" fill="#d9e6f2" />
          <rect x="10" y="6" width="50" height="8" fill="#ffffff" />
          <rect x="20" y="0" width="30" height="8" fill="#ffffff" />
        </svg>
      </div>

      <div className="max-w-page mx-auto relative">
        <div className="text-center mb-2">
          <span className="lp-chip bg-grass-dark text-paper mb-3">
            🌏 A WORLD ATLAS
          </span>
          <h2 className="font-round font-extrabold text-3xl md:text-5xl leading-tight mt-3 text-ink">
            Worlds dreamed up by <span className="text-flower-red">kids</span>.<br />
            Remixed by their <span className="text-tree">friends</span>.
          </h2>
        </div>

        <RemixFlow />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          <GameTileB title="Cosmic Pizza Shark" caption="a shark that eats pizza slices in outer space" by="Mia, 7" plays={1284} remixes={42} tint="deep">
            <div className="absolute inset-0 flex items-center justify-center text-5xl">🦈</div>
            <div className="absolute top-8 left-6 text-lg">🍕</div>
            <div className="absolute bottom-4 right-6 text-lg">🍕</div>
          </GameTileB>

          <GameTileB title="Whisker Shadow" caption="a ninja cat sneaking through a spooky castle" by="Leo, 9" plays={863} remixes={19} tint="night">
            <div className="absolute bottom-3 left-6 text-4xl">🐱</div>
            <div className="absolute top-4 right-4 text-2xl">👻</div>
          </GameTileB>

          <GameTileB title="Bolt & the Lava Stars" caption="a tiny robot jumping over lava collecting stars" by="Ava, 8" plays={2140} remixes={71} tint="sunset">
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-3xl">🤖</div>
            <div className="absolute top-6 left-6 text-xl">⭐</div>
            <div className="absolute top-10 right-8 text-xl">⭐</div>
          </GameTileB>

          <GameTileB title="Pancake Panic" caption="a dragon that breathes syrup instead of fire" by="Kai, 6" plays={512} remixes={11} tint="meadow">
            <div className="absolute inset-0 flex items-center justify-center text-5xl">🐉</div>
            <div className="absolute bottom-4 left-4 text-2xl">🥞</div>
            <div className="absolute bottom-4 right-4 text-2xl">🥞</div>
          </GameTileB>

          <GameTileB title="Snail Grand Prix" caption="snails racing on the moon with jet packs" by="Nora, 10" plays={1607} remixes={58} tint="sky">
            <div className="absolute bottom-4 left-4 text-3xl">🐌</div>
            <div className="absolute bottom-4 right-4 text-3xl">🐌</div>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xl">🏁</div>
          </GameTileB>

          <GameTileB title="Frog Wizard" caption="a frog that catches bugs with magic spells" by="Owen, 8" plays={927} remixes={24} tint="meadow">
            <div className="absolute inset-0 flex items-center justify-center text-5xl">🐸</div>
            <div className="absolute top-4 right-6 text-xl">✨</div>
            <div className="absolute bottom-6 left-6 text-lg">🪲</div>
          </GameTileB>
        </div>

        <div className="mt-8 text-center">
          <Link href="#try" className="lp-btn lp-btn-paper">
            🎨 Remix a world
          </Link>
        </div>
      </div>
    </section>
  );
}

function RemixFlow() {
  const steps = [
    { emoji: "🔗", label: "Share the world", color: "bg-sky text-paper" },
    { emoji: "▶", label: "A friend walks in", color: "bg-flower-red text-paper" },
    { emoji: "🎨", label: "They remix it", color: "bg-flower-yellow text-ink" },
    { emoji: "🌱", label: "A new world grows", color: "bg-grass-dark text-paper" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 my-8">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2 md:gap-3">
          <span className={`lp-chip ${s.color}`}>
            <span className="text-base">{s.emoji}</span>
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <span className="font-pixel text-lg text-ink">▶</span>
          )}
        </div>
      ))}
    </div>
  );
}

function WhyItsGood() {
  return (
    <section id="why" className="px-4 md:px-6 py-16 border-t-[3px] border-ink bg-sky-soft">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-round font-extrabold text-4xl md:text-6xl leading-[1.05] mb-6 text-ink">
          Not screen time.<br />
          <span className="text-flower-red">World-building time.</span>
        </h2>
        <div className="font-round text-xl md:text-2xl text-ink leading-snug italic">
          &ldquo;I limit screen time. Building an adventure is different — she&apos;s the one dreaming it up.&rdquo;
        </div>
        <div className="mt-3 font-pixel text-xs text-ink2 tracking-widest">
          ALICIA R. · PARENT OF A 7-YEAR-OLD
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="try" className="px-4 md:px-6 py-20 border-t-[3px] border-ink bg-paper">
      <div className="max-w-page mx-auto paper-card-lg bg-grass-dark text-paper p-8 md:p-14 text-center relative overflow-hidden">
        {/* Decorative pixel flowers in the corners. */}
        <span className="absolute top-6 left-6 w-4 h-4 bg-flower-yellow" />
        <span className="absolute top-10 right-10 w-6 h-6 bg-flower-pink" />
        <span className="absolute bottom-8 left-12 w-5 h-5 bg-cloud" />
        <span className="absolute bottom-10 right-8 w-3 h-3 bg-flower-red" />

        <div className="text-6xl mb-4 inline-block">✨</div>
        <h2 className="font-round font-extrabold text-3xl md:text-5xl max-w-2xl mx-auto leading-[1.1] text-paper">
          What world will your kid <span className="text-flower-yellow">build</span> today?
        </h2>
        <p className="font-round font-bold text-lg mt-4 max-w-lg mx-auto text-paper/90">
          Free to try. Works in the browser. No account needed to open the first world.
        </p>
        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-3">
          <Link href="/" className="lp-btn lp-btn-sun">
            ▶ Open Playcrafter
          </Link>
          <Link href="#showcase" className="lp-btn lp-btn-paper">
            Wander the atlas
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 md:px-6 py-8 border-t-[3px] border-ink bg-paper">
      <div className="max-w-page mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="lp-logo-mark sm">◉</span>
          <span className="font-round font-extrabold text-lg text-ink">
            play<span className="text-flower-red">crafter</span>
            <span className="text-ink2">.ai</span>
          </span>
        </div>
        <span className="lp-chip bg-sky text-paper">
          🛡️ Safe by design — no chat, no ads
        </span>
        <div className="flex items-center gap-4 font-round font-bold text-sm text-ink2">
          <Link href="#" className="hover:text-ink">privacy</Link>
          <Link href="#" className="hover:text-ink">schools</Link>
          <Link href="#" className="hover:text-ink">contact</Link>
        </div>
      </div>
    </footer>
  );
}
