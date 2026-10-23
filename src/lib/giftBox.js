import { CARD_DESIGNS, PACKAGING, getProduct } from "@/data/products";

// Lane A rules for in-stock gift boxes.
export const DISPATCH_TEXT = "Ships in 7–10 working days";
// Pieces are not reserved until payment, so from this many pieces we steer the
// buyer to a quote (so ATK can hold the pieces). Direct checkout still works.
export const BULK_QUOTE_THRESHOLD = 30;
export const PROOF_APPROVAL_TEXT =
  "Personalised cards: we'll send you a proof. Approve it within 24 hours to keep the 7–10 working day dispatch.";

export function boxLines(box) {
  return box
    .map((item) => {
      const product = getProduct(item.id);
      return product ? { ...product, qty: item.qty } : null;
    })
    .filter(Boolean);
}

export const pieceCount = (lines) => lines.reduce((n, l) => n + l.qty, 0);

export const itemsTotal = (lines) => lines.reduce((n, l) => n + l.qty * l.price, 0);

// An individual order is one personal box; a corporate order is one box (and
// one printed card) per piece.
export const boxesNeeded = (mode, pieces) =>
  mode === "corporate" ? pieces : pieces > 0 ? 1 : 0;

export function genderCounts(lines) {
  return lines.reduce(
    (acc, l) => ({ ...acc, [l.gender]: (acc[l.gender] ?? 0) + l.qty }),
    { women: 0, men: 0 },
  );
}

// Everything the gift box page, popover and checkout need in one place.
export function summarise(state) {
  const lines = boxLines(state.box);
  const pieces = pieceCount(lines);
  const boxes = boxesNeeded(state.mode, pieces);
  const packaging = PACKAGING.find((p) => p.id === state.packagingId) ?? PACKAGING[0];
  const card = CARD_DESIGNS.find((c) => c.id === state.cardId) ?? CARD_DESIGNS[0];
  const items = itemsTotal(lines);
  const packagingTotal = packaging.price * boxes;
  const cardTotal = card.price * boxes;

  const problems = [];
  for (const l of lines) {
    if (l.qty > l.stock) problems.push(`${l.name}: only ${l.stock} in stock.`);
  }
  if (boxes > packaging.stock)
    problems.push(`${packaging.name}: only ${packaging.stock} boxes in stock for ${boxes} boxes.`);
  if (boxes > card.stock)
    problems.push(`${card.name} card: only ${card.stock} cards in stock for ${boxes} boxes.`);

  return {
    lines,
    pieces,
    boxes,
    packaging,
    card,
    items,
    packagingTotal,
    cardTotal,
    total: items + packagingTotal + cardTotal,
    stockProblems: problems,
    bulk: pieces >= BULK_QUOTE_THRESHOLD,
    gender: genderCounts(lines),
  };
}

// Gift box contents in the shape the quote form attaches to a request.
export const linesForQuote = (lines) =>
  lines.map((l) => ({ id: l.id, name: l.name, qty: l.qty, price: l.price }));
