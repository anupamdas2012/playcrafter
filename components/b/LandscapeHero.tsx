"use client";

/** Dense pixel-art landscape backdrop inspired by the @pixel_art_diaries reference —
 *  layered puffy clouds built from many small pixel-blocks, banded rocky mountains,
 *  distant birds, densely packed wildflowers. All SVG so it stays crisp at any size. */
export function LandscapeHero({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`} aria-hidden>
      <svg
        viewBox="0 0 800 480"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b8c8dc" />
            <stop offset="0.3" stopColor="#8fb6d8" />
            <stop offset="0.7" stopColor="#b4d5ea" />
            <stop offset="1" stopColor="#e5eef5" />
          </linearGradient>
        </defs>

        {/* Sky. */}
        <rect x="0" y="0" width="800" height="480" fill="url(#sky)" />

        {/* Distant birds — scattered across the sky. */}
        <g fill="#3a4f6e">
          <BirdV x={140} y={40} />
          <BirdV x={168} y={54} />
          <BirdV x={200} y={44} />
          <BirdV x={460} y={80} />
          <BirdV x={496} y={92} />
          <BirdV x={540} y={76} />
          <BirdV x={572} y={100} />
          <BirdV x={610} y={84} />
          <BirdV x={640} y={110} />
          <BirdV x={520} y={130} />
          <BirdV x={340} y={160} />
        </g>

        {/* Dominant puffy cloud on right. */}
        <BigCloud x={380} y={10} />
        {/* Second large cloud upper-left. */}
        <BigCloud x={-60} y={40} scale={0.85} />
        {/* Mid-height billowing cloud. */}
        <MidCloud x={220} y={130} />
        <MidCloud x={640} y={200} scale={0.7} />
        {/* Scattered small clouds. */}
        <SmallCloud x={90} y={160} />
        <SmallCloud x={340} y={90} scale={0.8} />
        <SmallCloud x={500} y={180} scale={0.85} />
        <SmallCloud x={720} y={100} scale={0.75} />
        <SmallCloud x={160} y={230} scale={0.6} />
        <SmallCloud x={620} y={40} scale={0.5} />
        {/* Wispy horizon streaks. */}
        <g fill="#e5eef5" opacity="0.75">
          <rect x="0" y="248" width="120" height="3" />
          <rect x="380" y="252" width="140" height="3" />
          <rect x="640" y="244" width="160" height="3" />
        </g>

        {/* Far mountain range. */}
        <PixelMountains y={280} />

        {/* Near rocky mountains on the right. */}
        <RockyMountain x={580} y={300} />
        <RockyMountain x={680} y={310} scale={0.85} />

        {/* Grass mound foreground. */}
        <PixelGrass />

        {/* River trickling down through the grass. */}
        <path
          d="M 410 480 L 416 440 L 400 416 L 424 388 L 404 368"
          stroke="#5aa5d6"
          strokeWidth="12"
          fill="none"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M 410 480 L 416 440 L 400 416 L 424 388 L 404 368"
          stroke="#3a86b8"
          strokeWidth="4"
          fill="none"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />

        {/* Left-side pine trees. */}
        <PixelPine x={76} y={320} />
        <PixelPine x={40} y={344} scale={0.75} />
        <PixelPine x={140} y={340} scale={0.6} />

        {/* Wildflowers scattered across grass. */}
        <WildFlowers />

        {/* Foreground flower clusters. */}
        <FlowerCluster x={120} y={420} />
        <FlowerCluster x={660} y={430} />
        <FlowerCluster x={300} y={440} />
      </svg>
    </div>
  );
}

function BirdV({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="4" height="2" />
      <rect x="-2" y="2" width="2" height="2" />
      <rect x="4" y="2" width="2" height="2" />
      <rect x="-4" y="4" width="2" height="2" />
      <rect x="6" y="4" width="2" height="2" />
    </g>
  );
}

/** Big puffy cloud composed of many small pixel-blocks arranged in an organic silhouette.
 *  Rows are widths of 2px unit blocks; the outline steps in and out to feel fluffy. */
function BigCloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  // Each row is [start-x, width] in 4px pixel-block coords, plus a color-index band.
  // Silhouette is composed rows shaped like: narrow top → wide middle → wispy trail.
  const p = 4; // pixel-block size
  // Full outline: bands top-to-bottom.
  const rows: { xs: number; w: number; c: number }[] = [
    { xs: 26, w: 6, c: 3 }, // top wispy
    { xs: 22, w: 12, c: 3 },
    { xs: 20, w: 18, c: 3 },
    { xs: 16, w: 24, c: 2 },
    { xs: 12, w: 32, c: 2 },
    { xs: 10, w: 38, c: 2 },
    { xs: 8, w: 44, c: 2 },
    { xs: 6, w: 48, c: 1 },
    { xs: 4, w: 52, c: 1 },
    { xs: 4, w: 54, c: 1 },
    { xs: 2, w: 56, c: 1 },
    { xs: 2, w: 58, c: 1 },
    { xs: 4, w: 56, c: 1 },
    { xs: 6, w: 52, c: 1 },
    { xs: 10, w: 46, c: 1 },
    { xs: 16, w: 38, c: 1 },
    { xs: 22, w: 28, c: 0 },
    { xs: 30, w: 14, c: 0 },
  ];
  // Fill colors — bottom to top gets warmer/darker.
  const fill = ["#a8bdd0", "#d9e6f2", "#ffffff", "#ffffff"];

  // Build fluffy silhouette from rows.
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {rows.map((r, i) => (
        <rect
          key={i}
          x={r.xs * p}
          y={i * p}
          width={r.w * p}
          height={p}
          fill={fill[r.c]}
        />
      ))}
      {/* Shadow band along bottom left. */}
      <g fill="#93b0c8">
        <rect x={22 * p} y={16 * p} width={12 * p} height={p} />
        <rect x={26 * p} y={15 * p} width={8 * p} height={p} />
        <rect x={30 * p} y={17 * p} width={16 * p} height={p} />
      </g>
      {/* Bright highlight ridges on top of middle rows. */}
      <g fill="#ffffff">
        <rect x={16 * p} y={7 * p} width={30 * p} height={p} />
        <rect x={20 * p} y={5 * p} width={22 * p} height={p} />
        <rect x={26 * p} y={3 * p} width={12 * p} height={p} />
      </g>
      {/* Tiny wispy dots trailing. */}
      <g fill="#ffffff">
        <rect x={0} y={12 * p} width={2 * p} height={p} />
        <rect x={-3 * p} y={14 * p} width={p} height={p} />
        <rect x={60 * p} y={10 * p} width={3 * p} height={p} />
        <rect x={64 * p} y={12 * p} width={p} height={p} />
      </g>
    </g>
  );
}

function SmallCloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g fill="#c3d4e5">
        <rect x="0" y="12" width="60" height="4" />
        <rect x="4" y="8" width="52" height="4" />
      </g>
      <g fill="#ffffff">
        <rect x="8" y="8" width="44" height="4" />
        <rect x="12" y="4" width="36" height="4" />
        <rect x="20" y="0" width="20" height="4" />
      </g>
    </g>
  );
}

/** Mid-size layered cloud — denser than SmallCloud, simpler than BigCloud. */
function MidCloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const p = 4;
  const rows = [
    { xs: 14, w: 8 },
    { xs: 10, w: 16 },
    { xs: 6, w: 22 },
    { xs: 4, w: 26 },
    { xs: 2, w: 30 },
    { xs: 2, w: 32 },
    { xs: 4, w: 30 },
    { xs: 10, w: 20 },
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* Shadow band. */}
      <g fill="#a8bdd0">
        <rect x={4 * p} y={7 * p} width={26 * p} height={p} />
      </g>
      {/* Mid body. */}
      <g fill="#d9e6f2">
        {rows.map((r, i) => (
          <rect key={i} x={r.xs * p} y={i * p} width={r.w * p} height={p} />
        ))}
      </g>
      {/* Highlight ridge. */}
      <g fill="#ffffff">
        <rect x={8 * p} y={2 * p} width={16 * p} height={p} />
        <rect x={12 * p} y={0} width={10 * p} height={p} />
      </g>
    </g>
  );
}

/** Layered mountain silhouettes with shadow/highlight. */
function PixelMountains({ y }: { y: number }) {
  return (
    <g transform={`translate(0 ${y})`}>
      {/* Very-far range — hazy. */}
      <g fill="#7c9fbe">
        <polygon points="0,40 40,8 90,24 150,-12 210,16 280,-8 350,20 420,-16 490,12 560,-4 640,16 720,-8 800,20 800,80 0,80" />
      </g>
      {/* Mid mountains. */}
      <g fill="#4d7a9e">
        <polygon points="0,80 60,40 130,64 200,20 280,48 360,16 440,52 520,28 600,56 680,20 800,52 800,120 0,120" />
      </g>
      {/* Snow / highlight caps. */}
      <g fill="#c9dce9">
        <polygon points="200,20 210,28 190,28" />
        <polygon points="360,16 372,24 348,24" />
        <polygon points="520,28 530,36 510,36" />
        <polygon points="680,20 692,28 668,28" />
      </g>
      {/* Shadow face of near mountains. */}
      <g fill="#2b5a7f">
        <polygon points="0,80 60,40 60,64 40,80" />
        <polygon points="130,64 200,20 200,48 168,64" />
        <polygon points="280,48 360,16 360,44 324,52" />
        <polygon points="440,52 520,28 520,52 484,56" />
        <polygon points="600,56 680,20 680,48 644,56" />
      </g>
    </g>
  );
}

function RockyMountain({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <polygon points="0,70 40,20 80,40 120,0 160,30 200,70" fill="#6d8db0" />
      <polygon points="0,70 40,20 40,44 20,70" fill="#3a5c7e" />
      <polygon points="80,40 120,0 120,28 96,40" fill="#3a5c7e" />
      <g fill="#e8eef4">
        <polygon points="40,20 48,28 32,28" />
        <polygon points="120,0 132,8 108,8" />
      </g>
      <g fill="#2f4c68">
        <rect x="44" y="36" width="6" height="4" />
        <rect x="60" y="44" width="8" height="4" />
        <rect x="84" y="52" width="6" height="4" />
        <rect x="132" y="16" width="6" height="4" />
        <rect x="144" y="28" width="8" height="4" />
        <rect x="164" y="44" width="6" height="4" />
      </g>
      <g fill="#8ba7c5">
        <rect x="30" y="30" width="4" height="2" />
        <rect x="66" y="20" width="4" height="2" />
        <rect x="102" y="14" width="4" height="2" />
        <rect x="140" y="10" width="4" height="2" />
      </g>
    </g>
  );
}

function PixelGrass() {
  return (
    <g>
      <path
        d="M 0 380 Q 120 356 260 368 Q 420 380 600 360 Q 720 352 800 368 L 800 480 L 0 480 Z"
        fill="#a8dc8a"
      />
      <path
        d="M 0 396 Q 120 376 260 388 Q 420 400 600 380 Q 720 372 800 388 L 800 480 L 0 480 Z"
        fill="#7dc26a"
      />
      <path
        d="M 0 428 Q 120 416 260 424 Q 420 436 600 416 Q 720 412 800 424 L 800 480 L 0 480 Z"
        fill="#4fa04d"
      />
      {/* Grass blade highlights. */}
      <g fill="#c1e69f">
        {Array.from({ length: 160 }).map((_, i) => {
          const x = (i * 11 + (i % 5) * 3) % 800;
          const y = 396 + ((i * 13) % 70);
          return <rect key={i} x={x} y={y} width="2" height="4" />;
        })}
      </g>
      {/* Blade shadows. */}
      <g fill="#367c39">
        {Array.from({ length: 80 }).map((_, i) => {
          const x = (i * 19 + (i % 7) * 3) % 800;
          const y = 420 + ((i * 11) % 50);
          return <rect key={i} x={x} y={y} width="1" height="4" />;
        })}
      </g>
    </g>
  );
}

function PixelPine({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-4" y="60" width="8" height="36" fill="#4a2f1a" />
      <g fill="#2f7145">
        <rect x="-28" y="48" width="56" height="12" />
        <rect x="-24" y="36" width="48" height="12" />
        <rect x="-20" y="24" width="40" height="12" />
        <rect x="-16" y="12" width="32" height="12" />
        <rect x="-12" y="0" width="24" height="12" />
        <rect x="-8" y="-12" width="16" height="12" />
      </g>
      {/* Left shadow side. */}
      <g fill="#1e4d38">
        <rect x="-28" y="48" width="8" height="12" />
        <rect x="-24" y="36" width="8" height="12" />
        <rect x="-20" y="24" width="8" height="12" />
        <rect x="-16" y="12" width="8" height="12" />
        <rect x="-12" y="0" width="8" height="12" />
        <rect x="-8" y="-12" width="8" height="12" />
      </g>
      {/* Right highlight speckle. */}
      <g fill="#4a9e63">
        <rect x="12" y="42" width="4" height="4" />
        <rect x="8" y="28" width="4" height="4" />
        <rect x="4" y="12" width="4" height="4" />
      </g>
    </g>
  );
}

/** Very dense wildflower scatter. */
function WildFlowers() {
  const palette = ["#d4453f", "#f5c518", "#ea99a8", "#ffffff", "#e560a8", "#f28c3a", "#c62872"];
  const items: { x: number; y: number; color: string; big: boolean }[] = [];
  for (let i = 0; i < 500; i++) {
    const x = ((i * 53) % 800 + (i % 11) * 5) % 800;
    const y = 388 + ((i * 17) % 92);
    const big = i % 4 === 0;
    items.push({ x, y, color: palette[i % palette.length], big });
  }
  return (
    <g>
      {items.map((p, i) =>
        p.big ? (
          <g key={i} transform={`translate(${p.x} ${p.y})`}>
            <rect x="0" y="0" width="4" height="4" fill={p.color} />
            <rect x="-2" y="2" width="2" height="2" fill={p.color} />
            <rect x="4" y="2" width="2" height="2" fill={p.color} />
            <rect x="0" y="4" width="2" height="4" fill="#4fa04d" />
          </g>
        ) : (
          <rect key={i} x={p.x} y={p.y} width="2" height="2" fill={p.color} />
        ),
      )}
    </g>
  );
}

function FlowerCluster({ x, y }: { x: number; y: number }) {
  const palette = ["#e560a8", "#ea99a8", "#d4453f", "#f5c518", "#ffffff", "#c62872"];
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 40 }).map((_, i) => {
        const dx = ((i * 11) % 60) - 24;
        const dy = ((i * 7) % 32) - 12;
        const c = palette[i % palette.length];
        return (
          <g key={i} transform={`translate(${dx} ${dy})`}>
            <rect x="0" y="2" width="2" height="4" fill="#4fa04d" />
            <rect x="0" y="0" width="4" height="4" fill={c} />
            <rect x="-2" y="0" width="2" height="2" fill={c} opacity="0.85" />
          </g>
        );
      })}
    </g>
  );
}
