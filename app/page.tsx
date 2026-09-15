import Link from "next/link";
import { HeroDemo } from "@/components/HeroDemo";
import { GameTile } from "@/components/GameTile";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col text-ink">
      <NavBar />

      <section className="px-4 md:px-6 pt-6 md:pt-10 pb-8">
        <div className="max-w-page mx-auto text-center flex flex-col items-center gap-4 mb-8">
          <h1 className="font-sans font-extrabold text-4xl md:text-6xl leading-[1.05] max-w-3xl">
            Kids build games <br className="hidden md:block" />
            with their <span className="italic-serif text-blue">voice</span>.
          </h1>
          <p className="font-sans text-ink2 text-lg md:text-xl max-w-xl">
            Kids practice creative thinking and problem-solving while building
            something they actually get to play.
          </p>
        </div>

        <HeroDemo />

        <div className="max-w-page mx-auto flex flex-col md:flex-row items-center justify-center gap-3 mt-8">
          <Link
            href="#try"
            className="rounded-chunk px-8 py-4 font-sans font-extrabold text-lg bg-yellow text-ink border-4 border-ink shadow-play hover:bg-yellow-soft transition-colors"
          >
            ▶ Start crafting — free
          </Link>
          <Link
            href="#showcase"
            className="rounded-chunk px-6 py-4 font-sans font-bold text-base bg-white text-ink border-4 border-ink shadow-playSm hover:bg-bg2"
          >
            See what kids made
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
    <header className="px-4 md:px-6 pt-5 pb-3">
      <div className="max-w-page mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-yellow border-2 border-ink shadow-playSm text-xl">
            ◉
          </span>
          <span className="font-sans font-extrabold text-2xl tracking-tight">
            play<span className="italic-serif text-blue">crafter</span>
            <span className="text-ink2">.ai</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="#showcase"
            className="hidden md:inline-flex font-sans font-bold text-sm text-ink2 hover:text-ink px-3 py-2"
          >
            showcase
          </Link>
          <Link
            href="#why"
            className="hidden md:inline-flex font-sans font-bold text-sm text-ink2 hover:text-ink px-3 py-2"
          >
            for parents
          </Link>
          <Link
            href="#try"
            className="rounded-full bg-ink text-bg font-sans text-sm font-bold px-4 py-2 border-2 border-ink shadow-playSm hover:bg-dark"
          >
            Try it →
          </Link>
        </div>
      </div>
    </header>
  );
}

function Showcase() {
  return (
    <section id="showcase" className="px-4 md:px-6 py-16">
      <div className="max-w-page mx-auto">
        <div className="text-center mb-2">
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl leading-tight">
            Made by your kid. <span className="italic-serif text-pink">Remixed</span> by their friends.
          </h2>
        </div>

        <RemixFlow />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          <GameTile
            title="Cosmic Pizza Shark"
            caption="a shark that eats pizza slices in outer space"
            by="Mia, 7"
            plays={1284}
            remixes={42}
            tint="dark"
          >
            <div className="absolute inset-0 flex items-center justify-center text-5xl">🦈</div>
            <div className="absolute top-8 left-6 text-lg animate-float">🍕</div>
            <div className="absolute bottom-4 right-6 text-lg animate-float">🍕</div>
          </GameTile>

          <GameTile
            title="Whisker Shadow"
            caption="a ninja cat sneaking through a spooky castle"
            by="Leo, 9"
            plays={863}
            remixes={19}
            tint="dark"
          >
            <div className="absolute bottom-3 left-6 text-4xl">🐱</div>
            <div className="absolute top-4 right-4 text-2xl animate-float">👻</div>
            <div className="absolute top-2 left-3 w-4 h-4 rounded-full bg-yellow-soft" />
          </GameTile>

          <GameTile
            title="Bolt & the Lava Stars"
            caption="a tiny robot jumping over lava collecting stars"
            by="Ava, 8"
            plays={2140}
            remixes={71}
            tint="sunset"
          >
            <div className="absolute bottom-2 left-0 right-0 h-4" style={{ background: "#7a1a1a" }} />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-3xl">🤖</div>
            <div className="absolute top-6 left-6 text-xl animate-float">⭐</div>
            <div className="absolute top-10 right-8 text-xl animate-float">⭐</div>
          </GameTile>

          <GameTile
            title="Pancake Panic"
            caption="a dragon that breathes syrup instead of fire"
            by="Kai, 6"
            plays={512}
            remixes={11}
            tint="yellow"
          >
            <div className="absolute inset-0 flex items-center justify-center text-5xl">🐉</div>
            <div className="absolute bottom-4 left-4 text-2xl">🥞</div>
            <div className="absolute bottom-4 right-4 text-2xl">🥞</div>
          </GameTile>

          <GameTile
            title="Snail Grand Prix"
            caption="snails racing on the moon with jet packs"
            by="Nora, 10"
            plays={1607}
            remixes={58}
            tint="blue"
          >
            <div className="absolute bottom-4 left-4 text-3xl">🐌</div>
            <div className="absolute bottom-4 right-4 text-3xl">🐌</div>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xl">🏁</div>
          </GameTile>

          <GameTile
            title="Frog Wizard"
            caption="a frog that catches bugs with magic spells"
            by="Owen, 8"
            plays={927}
            remixes={24}
            tint="mint"
          >
            <div className="absolute inset-0 flex items-center justify-center text-5xl">🐸</div>
            <div className="absolute top-4 right-6 text-xl animate-float">✨</div>
            <div className="absolute bottom-6 left-6 text-lg">🪲</div>
          </GameTile>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="#try"
            className="inline-flex items-center gap-2 rounded-chunk px-6 py-3 font-sans font-extrabold text-base bg-white text-ink border-4 border-ink shadow-playSm hover:bg-bg2"
          >
            🎨 Remix one of these
          </Link>
        </div>
      </div>
    </section>
  );
}

function RemixFlow() {
  const steps = [
    { emoji: "🔗", label: "Share", tint: "bg-blue-soft" },
    { emoji: "▶", label: "Play", tint: "bg-pink/40" },
    { emoji: "🎨", label: "Remix", tint: "bg-yellow-soft" },
    { emoji: "🌱", label: "Reimagine", tint: "bg-mint" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 my-8">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2 md:gap-3">
          <span
            className={`inline-flex items-center gap-2 rounded-full border-[3px] border-ink px-3 py-1.5 font-sans font-extrabold text-sm md:text-base shadow-playSm ${s.tint}`}
          >
            <span className="text-base">{s.emoji}</span>
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <span className="text-xl font-extrabold text-ink">→</span>
          )}
        </div>
      ))}
    </div>
  );
}

function WhyItsGood() {
  return (
    <section id="why" className="px-4 md:px-6 py-16 border-t-4 border-ink bg-bg2/60">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-sans font-extrabold text-4xl md:text-6xl leading-[1.05] mb-6">
          Not screen time.<br />
          <span className="italic-serif text-blue">Build-time.</span>
        </h2>
        <div className="italic-serif text-xl md:text-2xl text-ink leading-snug">
          &ldquo;I limit games. Building one is different — she&apos;s building, not zoning out.&rdquo;
        </div>
        <div className="mt-2 font-sans text-sm text-ink2">— Alicia R., parent of a 7-year-old</div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="try" className="px-4 md:px-6 py-20">
      <div className="max-w-page mx-auto rounded-chunk border-4 border-ink bg-yellow shadow-play p-8 md:p-14 text-center relative overflow-hidden">
        <span className="absolute top-6 left-6 w-4 h-4 rounded-full bg-blue" />
        <span className="absolute top-10 right-10 w-6 h-6 rounded-full bg-pink" />
        <span className="absolute bottom-8 left-12 w-5 h-5 rounded-full bg-mint" />
        <span className="absolute bottom-10 right-8 w-3 h-3 rounded-full bg-ink" />

        <div className="text-6xl mb-4 animate-wiggle inline-block">✨</div>
        <h2 className="font-sans font-extrabold text-3xl md:text-5xl max-w-2xl mx-auto leading-tight">
          What will your kid <span className="italic-serif">build</span> today?
        </h2>
        <p className="font-sans text-ink2 mt-3 max-w-lg mx-auto">
          Free to try. Works in the browser. No account needed to make your first game.
        </p>
        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-chunk px-8 py-4 font-sans font-extrabold text-lg bg-ink text-bg border-4 border-ink shadow-play hover:bg-dark"
          >
            ▶ Open Playcrafter
          </Link>
          <Link
            href="#showcase"
            className="rounded-chunk px-6 py-4 font-sans font-bold text-base bg-white text-ink border-4 border-ink shadow-playSm hover:bg-bg2"
          >
            Browse kid-made games
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 md:px-6 py-10 border-t-4 border-ink">
      <div className="max-w-page mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow border-2 border-ink text-sm">
            ◉
          </span>
          <span className="font-sans font-extrabold text-lg">
            play<span className="italic-serif text-blue">crafter</span>
            <span className="text-ink2">.ai</span>
          </span>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mint px-3 py-1 font-sans text-xs font-extrabold shadow-playSm">
          🛡️ Safe by design — no chat, no strangers, no ads
        </span>
        <div className="flex items-center gap-4 font-sans text-sm text-ink2">
          <Link href="#" className="hover:text-ink">privacy</Link>
          <Link href="#" className="hover:text-ink">for schools</Link>
          <Link href="#" className="hover:text-ink">contact</Link>
        </div>
      </div>
    </footer>
  );
}
