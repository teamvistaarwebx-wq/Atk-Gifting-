const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const HeartIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
  </svg>
);

export const UserIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
  </svg>
);

export const BagIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}>
    <rect x="4.5" y="6.5" width="15" height="13.5" rx="2" />
    <path d="M9 10a3 3 0 0 0 6 0M9 6.5V6a3 3 0 0 1 6 0v.5" />
  </svg>
);

export const ArrowRight = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} strokeWidth={2} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const CheckIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} strokeWidth={2.2} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const CloseIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} strokeWidth={2} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const PhoneIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} strokeWidth={1.8} {...p}>
    <path d="M5 4h3.5l1.6 4-2.2 1.4a11 11 0 0 0 6.7 6.7l1.4-2.2 4 1.6V19a1.5 1.5 0 0 1-1.5 1.5A16.5 16.5 0 0 1 3.5 5.5 1.5 1.5 0 0 1 5 4z" />
  </svg>
);

export const SlidersIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} strokeWidth={1.8} {...p}>
    <path d="M4 7h10M18 7h2M4 17h4M12 17h8M14 4.5v5M8 14.5v5" />
  </svg>
);

export const ChevronDown = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" {...base} strokeWidth={2} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const ClockIcon = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" {...base} strokeWidth={1.8} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const TruckIcon = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" {...base} strokeWidth={1.8} {...p}>
    <path d="M3 6.5h11v9H3zM14 9.5h3.5L21 13v2.5h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);

export const LoomIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M4 4v16M20 4v16M4 7h16M4 17h16M8 7v10M12 7v10M16 7v10" />
  </svg>
);
