"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_LEAD_TIMES } from "./leadTime";
import { getProduct } from "@/data/products";

// Client-side store persisted to localStorage. There is no backend yet, so the
// gift box, quote requests, orders and the admin lead-time table all live here;
// swap `persist`/`load` for API calls when one exists.

const STORAGE_KEY = "atk.gifting.v1";

export const HOLD_MINUTES = 15;

const initialState = {
  mode: "individual", // "individual" | "corporate"
  team: { festival: "Diwali", female: 5, male: 5 },
  box: [], // [{ id, qty }]
  holdUntil: null,
  holdExpired: false,
  packagingId: "kraft",
  cardId: "marigold",
  message: "",
  leadTimes: DEFAULT_LEAD_TIMES,
  quotes: [],
  orders: [],
  // Session-only (not persisted)
  quoteDraft: null,
  toasts: [],
};

const PERSISTED_KEYS = [
  "mode",
  "team",
  "box",
  "holdUntil",
  "holdExpired",
  "packagingId",
  "cardId",
  "message",
  "leadTimes",
  "quotes",
  "orders",
];

let state = initialState;
let loaded = false;
const listeners = new Set();

function pickPersisted(source) {
  const out = {};
  for (const key of PERSISTED_KEYS) if (key in source) out[key] = source[key];
  return out;
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) state = { ...state, ...pickPersisted(JSON.parse(raw)) };
  } catch {
    // Private mode or corrupt data: start fresh.
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pickPersisted(state)));
  } catch {
    // Storage unavailable; state still works for this session.
  }
}

function set(patch) {
  const next = typeof patch === "function" ? patch(state) : patch;
  state = { ...state, ...next };
  persist();
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  load();
  return state;
}

function getServerSnapshot() {
  return initialState;
}

export function useStore(selector = (s) => s) {
  return selector(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot));
}

const freshHold = () => ({
  holdUntil: Date.now() + HOLD_MINUTES * 60 * 1000,
  holdExpired: false,
});

const newRef = (prefix) =>
  `${prefix}-${Date.now().toString(36).slice(-5).toUpperCase()}`;

let toastId = 0;

export const actions = {
  // Switching between individual and corporate gifting starts a new box.
  // Returns true when a non-empty box was cleared.
  setMode(mode) {
    if (state.mode === mode) return false;
    const cleared = state.box.length > 0;
    set({ mode, box: [], holdUntil: null, holdExpired: false });
    return cleared;
  },

  setTeam(patch) {
    set((s) => ({ team: { ...s.team, ...patch } }));
  },

  toggleInBox(id) {
    set((s) =>
      s.box.some((item) => item.id === id)
        ? { box: s.box.filter((item) => item.id !== id), ...freshHold() }
        : { box: [...s.box, { id, qty: 1 }], ...freshHold() },
    );
  },

  addToBox(id) {
    if (state.box.some((item) => item.id === id)) return;
    set((s) => ({ box: [...s.box, { id, qty: 1 }], ...freshHold() }));
  },

  setQty(id, qty) {
    const stock = getProduct(id)?.stock ?? Infinity;
    const clamped = Math.max(1, Math.min(stock, qty));
    set((s) => ({
      box: s.box.map((item) => (item.id === id ? { ...item, qty: clamped } : item)),
      ...freshHold(),
    }));
  },

  remove(id) {
    set((s) => ({ box: s.box.filter((item) => item.id !== id), ...freshHold() }));
  },

  renewHold() {
    set(freshHold());
  },

  // The 15-minute hold has lapsed: pieces go back to inventory. Items stay in
  // the box, and availability is checked again at checkout.
  expireHold() {
    set({ holdUntil: null, holdExpired: true });
  },

  setPackaging(packagingId) {
    set({ packagingId });
  },

  setCard(cardId) {
    set({ cardId });
  },

  setMessage(message) {
    set({ message });
  },

  // One quote form for every entry point. `draft` may carry a pre-filled
  // product and quantity (Made to Order) or the gift box contents.
  openQuote(draft = {}) {
    set({ quoteDraft: { source: "gifting", ...draft, key: Date.now() } });
  },

  closeQuote() {
    set({ quoteDraft: null });
  },

  submitQuote(request) {
    const ref = newRef("Q");
    set((s) => ({
      quotes: [{ ...request, ref, createdAt: new Date().toISOString(), status: "new" }, ...s.quotes],
    }));
    return ref;
  },

  placeOrder(order) {
    const ref = newRef("ATK");
    set((s) => ({
      orders: [{ ...order, ref, createdAt: new Date().toISOString() }, ...s.orders],
      box: [],
      message: "",
      holdUntil: null,
      holdExpired: false,
    }));
    return ref;
  },

  saveLeadTimes(leadTimes) {
    set({ leadTimes });
  },

  resetLeadTimes() {
    set({ leadTimes: DEFAULT_LEAD_TIMES });
  },

  setQuoteStatus(ref, status) {
    set((s) => ({ quotes: s.quotes.map((q) => (q.ref === ref ? { ...q, status } : q)) }));
  },

  toast(text) {
    const id = ++toastId;
    set((s) => ({ toasts: [...s.toasts, { id, text }] }));
    setTimeout(() => actions.dismissToast(id), 4500);
  },

  dismissToast(id) {
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
  },
};
