import Link from "next/link";
import { HeroDemo } from "@/components/HeroDemo";
import { GameTile } from "@/components/GameTile";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col text-ink">
      <NavBar />

      <section className="px-4 md:px-6 pt-6 md:pt-10 pb-8">
        <div className="max-w-page mx-auto text-center flex flex-col items-center gap-4 mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1 font-sans text-xs font-bold shadow-playSm">
            <span className="w-2 h-2 rounded-full bg-pink" />
            for kids 5–12 · no coding needed
          </span>
          <h1 className="font-sans font-extrabold text-4xl md:text-6xl leading-[1.05] max-w-3xl">
            Kids invent games <br className="hidden md:block" />
            with their <span className="italic-serif text-blue">voice</span>.
          </h1>
          <p className="font-sans text-ink2 text-lg md:text-xl max-w-xl">
            Say an idea. Get a game. Then say what to change — and it changes.
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

      <HowItWorks />
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

function HowItWorks() {
  const steps = [
    {
      emoji: "🎤",
      title: "Say the idea",
      body: "Kid taps the mic and describes anything — a fire-breathing pancake, a race between snails on the moon. No wrong answers.",
      tint: "bg-pink",
    },
    {
      emoji: "✏️",
      title: "Sparky designs it",
      body: "Our AI turns the idea into a real game plan — characters, world, goals, controls — and shows the kid what it made.",
      tint: "bg-yellow",
    },
    {
      emoji: "🎮",
      title: "Play & tinker",
      body: "The game actually runs. Something not right? Tap the mic again: “make the boss bigger,” “add ice powers” — the game updates.",
      tint: "bg-mint",
    },
  ];
  return (
    <section className="px-4 md:px-6 py-16 bg-bg2/60 border-y-4 border-ink">
      <div className="max-w-page mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block text-xs font-sans font-bold tracking-wider text-ink2 mb-2">
            HOW IT WORKS
          </div>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl">
            Three steps. <span className="italic-serif text-blue">Zero</span> coding.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div
              key={i}
              className="rounded-chunk border-4 border-ink bg-white shadow-play p-6 flex flex-col gap-3"
            >
              <div
                className={`w-14 h-14 rounded-full border-4 border-ink shadow-playSm flex items-center justify-center text-2xl ${s.tint}`}
              >
                {s.emoji}
              </div>
              <div className="font-sans font-extrabold text-xl">
                {i + 1}. {s.title}
              </div>
              <p className="font-sans text-ink2">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section id="showcase" className="px-4 md:px-6 py-16">
      <div className="max-w-page mx-auto">
        <div className="text-center mb-4">
          <div className="inline-block text-xs font-sans font-bold tracking-wider text-ink2 mb-2">
            SHARE · PLAY · REMIX
          </div>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl">
            Every kid&apos;s game is a <span className="italic-serif text-pink">starting point</span>.
          </h2>
          <p className="font-sans text-ink2 mt-3 max-w-xl mx-auto">
            Kids share their games with a link. Friends play them, then <em className="italic-serif not-italic">remix</em> them —
            &ldquo;make the shark rainbow,&rdquo; &ldquo;add a boss at the end&rdquo; — and pass a new version along. Every game is a
            seed for the next one.
          </p>
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
    {
      tint: "bg-blue-soft",
      emoji: "🔗",
      title: "Share",
      body: "One tap → a link. Send it to a friend or your class.",
    },
    {
      tint: "bg-pink/40",
      emoji: "▶",
      title: "Play",
      body: "Friends play in the browser. No download, no account.",
    },
    {
      tint: "bg-yellow-soft",
      emoji: "🎨",
      title: "Remix",
      body: "&ldquo;Make the boss bigger.&rdquo; &ldquo;Add a rainbow trail.&rdquo; Their version, saved as a fork.",
    },
    {
      tint: "bg-mint",
      emoji: "🌱",
      title: "Reimagine",
      body: "Every remix inspires the next one. The idea keeps growing.",
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 my-8">
      {steps.map((s, i) => (
        <div
          key={i}
          className="relative rounded-chunkSm border-4 border-ink bg-white shadow-playSm p-4 flex flex-col items-start gap-2"
        >
          <div
            className={`w-10 h-10 rounded-full border-2 border-ink flex items-center justify-center text-lg ${s.tint}`}
          >
            {s.emoji}
          </div>
          <div className="font-sans font-extrabold text-base">{s.title}</div>
          <p
            className="font-sans text-sm text-ink2 leading-snug"
            dangerouslySetInnerHTML={{ __html: s.body }}
          />
          {i < steps.length - 1 && (
            <span className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-2xl font-extrabold text-ink z-10">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function WhyItsGood() {
  const bullets = [
    {
      emoji: "🧠",
      title: "Creative confidence",
      body: "Kids see their imagination become real in seconds. That loop — think it, see it, tweak it — builds the muscle of ‘I can make things.’",
    },
    {
      emoji: "🧩",
      title: "Problem-solving in disguise",
      body: "The boss too hard? Level too short? Kids diagnose what’s wrong and describe a fix. That’s debugging — they just don’t know it yet.",
    },
    {
      emoji: "🗣️",
      title: "Language & articulation",
      body: "To make the game they want, kids have to describe it precisely. Vague ideas become specific goals, characters, and rules.",
    },
    {
      emoji: "🛡️",
      title: "Safe by design",
      body: "No open chat, no strangers, no ads. Just a mic, an AI helper, and games your kid actually built.",
    },
  ];
  return (
    <section id="why" className="px-4 md:px-6 py-16 border-t-4 border-ink bg-bg2/60">
      <div className="max-w-page mx-auto grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="text-xs font-sans font-bold tracking-wider text-ink2 mb-2">
            FOR PARENTS
          </div>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl leading-tight mb-4">
            Screen time that <span className="italic-serif text-blue">makes</span> something.
          </h2>
          <p className="font-sans text-ink2 text-lg">
            Playcrafter turns the tablet from a place kids consume into a place they create.
            Every session ends with a game they invented — not a scroll session they can’t remember.
          </p>
          <div className="mt-6 rounded-chunk border-4 border-ink bg-white shadow-playSm p-5">
            <div className="italic-serif text-lg text-ink leading-snug">
              &ldquo;My daughter used to ask for YouTube. Now she asks to ‘make a game where the octopus fights broccoli.’
              It&apos;s the first app I&apos;ve been genuinely happy to hand over.&rdquo;
            </div>
            <div className="mt-2 font-sans text-sm text-ink2">— Alicia R., parent of a 7-year-old</div>
          </div>
        </div>
        <div className="grid gap-4">
          {bullets.map((b, i) => (
            <div
              key={i}
              className="rounded-chunk border-4 border-ink bg-white shadow-playSm p-5 flex gap-4"
            >
              <div className="w-12 h-12 shrink-0 rounded-full border-4 border-ink bg-yellow-soft flex items-center justify-center text-2xl">
                {b.emoji}
              </div>
              <div>
                <div className="font-sans font-extrabold text-lg">{b.title}</div>
                <p className="font-sans text-ink2">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
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
          What will your kid <span className="italic-serif">invent</span> today?
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
        <div className="font-sans text-sm text-ink2">
          Built for curious kids · © {new Date().getFullYear()}
        </div>
        <div className="flex items-center gap-4 font-sans text-sm text-ink2">
          <Link href="#" className="hover:text-ink">privacy</Link>
          <Link href="#" className="hover:text-ink">for schools</Link>
          <Link href="#" className="hover:text-ink">contact</Link>
        </div>
      </div>
    </footer>
  );
}
