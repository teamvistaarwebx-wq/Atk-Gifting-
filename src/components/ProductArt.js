// Placeholder product imagery in the brand's maroon until real photography is
// uploaded. Each category gets a simple line motif.

const PALETTES = [
  ["#5e0716", "#9b1b33"],
  ["#4a0a14", "#7a0a1e"],
  ["#6b0f24", "#b0384d"],
];

const MOTIFS = {
  // Folded saree stack with a zari border
  Saree: <path d="M24 62 h52 v10 h-52 Z M28 72 h44 v10 h-44 Z M24 82 h52 v10 h-52 Z M24 66 h52 M28 76 h44 M24 86 h52 M64 62 q10 -14 16 -2" />,
  Dupatta: <path d="M30 40 Q50 60 70 40 L70 90 Q50 72 30 90 Z M34 84 l4 6 M44 80 l2 7 M56 80 l-2 7 M66 84 l-4 6" />,
  Jewellery: <path d="M30 44 Q50 84 70 44 M42 62 a4 4 0 1 0 0.1 0 M50 70 a5 5 0 1 0 0.1 0 M58 62 a4 4 0 1 0 0.1 0" />,
  Footwear: <path d="M28 80 Q30 64 44 64 L58 66 Q72 68 72 80 Z M44 64 Q48 56 56 60" />,
  Tie: <path d="M44 38 h12 l-3 8 l7 36 l-10 10 l-10 -10 l7 -36 Z" />,
  "Other Collection": <path d="M32 50 h36 v34 h-36 Z M32 60 h36 M50 50 v34 M42 50 q8 -12 16 0" />,
};

function hashOf(text) {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

export default function ProductArt({ name, category, className = "" }) {
  const [from, to] = PALETTES[hashOf(name) % PALETTES.length];
  const gid = `g${hashOf(name)}`;

  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={name} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#${gid})`} />
      <g fill="none" stroke="#e7c27d" strokeOpacity="0.35" strokeWidth="1.2">
        {MOTIFS[category] ?? MOTIFS["Other Collection"]}
      </g>
      <line x1="16" y1="26" x2="84" y2="26" stroke="#e7c27d" strokeOpacity="0.5" strokeWidth="0.4" />
      <text x="50" y="22" textAnchor="middle" fill="#f3dfb6" fontSize="8.5" fontStyle="italic" fontFamily="var(--font-cormorant), serif">
        Atulya Karigari
      </text>
    </svg>
  );
}
