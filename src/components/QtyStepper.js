import { pad2 } from "@/lib/format";

const STYLES = {
  // Maroon pill used on the gift box page
  solid: {
    wrap: "rounded-md bg-maroon text-white",
    button: "px-3 py-2 hover:bg-white/10 disabled:opacity-40",
  },
  // Outlined boxes on the maroon popover
  onDark: {
    wrap: "gap-2 text-white",
    button: "grid h-6 w-6 place-items-center rounded border border-white/70 hover:bg-white/10 disabled:opacity-40",
  },
  // Light outline on white cards
  light: {
    wrap: "rounded-md border border-line bg-white text-ink",
    button: "px-3 py-1.5 text-maroon hover:bg-blush disabled:opacity-40",
  },
  // Butter-yellow counter on the "Gift your team" page
  butter: {
    wrap: "rounded-md bg-gradient-to-b from-[#fbe9ad] to-[#f6d98a] text-maroon",
    button: "px-4 py-2.5 hover:bg-black/5 disabled:opacity-40",
  },
};

export default function QtyStepper({ value, onChange, min = 1, max = Infinity, variant = "solid", label = "quantity" }) {
  const s = STYLES[variant];
  return (
    <div className={`inline-flex items-center font-semibold ${s.wrap}`}>
      <button type="button" className={s.button} aria-label={`Decrease ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)}>
        −
      </button>
      <span className="min-w-8 text-center tabular-nums" aria-live="polite">
        {pad2(value)}
      </span>
      <button type="button" className={s.button} aria-label={`Increase ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}
