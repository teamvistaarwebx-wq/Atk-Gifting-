// Line illustrations in the style of the landing-page cards.

const stroke = {
  fill: "none",
  stroke: "#7a0a1e",
  strokeWidth: 1.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeOpacity: 0.7,
};

export function GiftBoxSketch(props) {
  return (
    <svg viewBox="0 0 240 170" aria-hidden {...props}>
      <g {...stroke}>
        <path d="M30 70 L170 50 L182 140 L44 165 Z" />
        <path d="M30 70 L20 20 L160 4 L170 50" />
        <path d="M26 28 L156 12 M24 40 L158 25" strokeOpacity="0.35" />
        <path d="M50 100 Q80 85 120 92 T176 82 L180 120 Q140 128 100 124 T48 140 Z" />
        <path d="M56 112 Q90 100 128 106 M54 126 Q94 114 140 118" strokeOpacity="0.45" />
        <circle cx="70" cy="110" r="1.4" />
        <circle cx="95" cy="104" r="1.4" />
        <circle cx="120" cy="108" r="1.4" />
        <rect x="140" y="60" width="28" height="22" rx="3" />
        <circle cx="154" cy="71" r="6" />
        <path d="M40 150 l-14 18 M52 150 l-8 20 M64 148 l-4 20" />
        <path d="M200 120 q8 -20 0 -40 M206 118 q14 -14 10 -34 M212 124 q16 -4 18 -20" />
      </g>
    </svg>
  );
}

export function TeamSketch(props) {
  return (
    <svg viewBox="0 0 240 170" aria-hidden {...props}>
      <g {...stroke}>
        <circle cx="60" cy="40" r="14" />
        <path d="M40 110 Q42 68 60 64 Q78 68 82 110" />
        <circle cx="128" cy="34" r="13" />
        <path d="M118 22 Q128 10 142 26 Q146 50 136 58" />
        <path d="M108 110 Q110 62 128 58 Q146 62 150 110" />
        <circle cx="196" cy="30" r="14" />
        <path d="M176 110 Q178 58 196 54 Q216 58 220 110" />
        <circle cx="96" cy="88" r="12" />
        <path d="M76 168 Q78 116 96 110 Q114 116 118 168" />
        <rect x="136" y="96" width="34" height="26" rx="2" />
        <path d="M136 106 h34 M153 96 v26 M146 96 q7 -10 7 0 q0 -10 7 0" />
        <rect x="190" y="130" width="40" height="36" rx="2" />
        <path d="M190 142 h40 M210 130 v36" />
      </g>
    </svg>
  );
}

export function GiftPhoto({ variant = 0, className = "" }) {
  const tints = [
    ["#3a1d14", "#7a3b26"],
    ["#4a0a14", "#8f2a3d"],
    ["#5a3420", "#a0623b"],
    ["#2f2a1c", "#7d6a3a"],
  ][variant % 4];
  return (
    <svg viewBox="0 0 160 110" className={className} aria-hidden>
      <defs>
        <linearGradient id={`gp${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tints[0]} />
          <stop offset="1" stopColor={tints[1]} />
        </linearGradient>
      </defs>
      <rect width="160" height="110" fill={`url(#gp${variant})`} />
      <g transform="translate(50 28)">
        <rect x="0" y="22" width="60" height="44" rx="2" fill="#7a0a1e" />
        <rect x="-4" y="12" width="68" height="14" rx="2" fill="#8f1a2e" />
        <rect x="26" y="12" width="8" height="54" fill="#d9b26a" />
        <path d="M30 12 q-18 -18 -22 -2 q4 6 22 2 q18 4 22 -2 q-4 -16 -22 2" fill="#d9b26a" />
      </g>
    </svg>
  );
}
