// Made to Order catalogue: only what ATK can weave in bulk. No stock counts and
// no direct purchase — each piece is quoted. `unitPrice` is indicative.

export const MADE_TO_ORDER = [
  {
    id: "mto-banarasi-saree",
    name: "Banarasi Silk Saree",
    category: "Saree",
    gender: "women",
    unitPrice: 12500,
    details: "Pure katan silk with zari buta. Colour and border to your brief.",
  },
  {
    id: "mto-tussar-saree",
    name: "Tussar Silk Saree",
    category: "Saree",
    gender: "women",
    unitPrice: 9800,
    details: "Hand-reeled tussar with a woven pallu in your palette.",
  },
  {
    id: "mto-chanderi-saree",
    name: "Chanderi Cotton Silk Saree",
    category: "Saree",
    gender: "women",
    unitPrice: 6400,
    details: "Light, sheer weave with a gold zari border.",
  },
  {
    id: "mto-handloom-cotton-saree",
    name: "Handloom Cotton Saree",
    category: "Saree",
    gender: "women",
    unitPrice: 3200,
    details: "Everyday handloom cotton, woven in solid or checked bodies.",
  },
  {
    id: "mto-silk-dupatta",
    name: "Banarasi Silk Dupatta",
    category: "Dupatta",
    gender: "women",
    unitPrice: 2900,
    details: "Silk dupatta with a zari border and tassels.",
  },
  {
    id: "mto-cotton-dupatta",
    name: "Block-Print Cotton Dupatta",
    category: "Dupatta",
    gender: "women",
    unitPrice: 1400,
    details: "Hand block-printed in indigo, madder or a colour you pick.",
  },
  {
    id: "mto-silk-tie",
    name: "Handwoven Silk Tie",
    category: "Tie",
    gender: "men",
    unitPrice: 1900,
    details: "Woven on narrow looms; motif and colourway to your brief.",
  },
  {
    id: "mto-pocket-square",
    name: "Silk Pocket Square",
    category: "Other Collection",
    gender: "men",
    unitPrice: 950,
    details: "Ikat or jacquard silk, hand-rolled edges.",
  },
  {
    id: "mto-wool-muffler",
    name: "Handwoven Wool Muffler",
    category: "Other Collection",
    gender: "men",
    unitPrice: 3800,
    details: "Soft wool-blend muffler in herringbone or plain weave.",
  },
  {
    id: "mto-khadi-stole",
    name: "Handspun Khadi Stole",
    category: "Other Collection",
    gender: "men",
    unitPrice: 1350,
    details: "Handspun, handwoven khadi in natural or dyed tones.",
  },
];

export const getMadeToOrder = (id) => MADE_TO_ORDER.find((p) => p.id === id);
