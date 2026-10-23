// In-stock catalogue (Lane A). These pieces can be paid for directly and ship
// in 7–10 working days. `stock` is the live count; pieces are only reserved
// once payment completes.

export const CATEGORIES = [
  "Saree",
  "Dupatta",
  "Jewellery",
  "Footwear",
  "Other Collection",
  "Tie",
];

export const PRODUCTS = [
  { id: "silk-saari", name: "Silk Saari", category: "Saree", gender: "women", price: 15000, mrp: 17000, stock: 18 },
  { id: "pashmina-muffler-charcoal", name: "Pashmina Wool Muffler — Charcoal", category: "Other Collection", gender: "men", price: 5999, mrp: 7200, stock: 64 },
  { id: "tussar-tie-ivory", name: "Tussar Silk Tie — Ivory Textured", category: "Tie", gender: "men", price: 2299, stock: 80 },
  { id: "silk-tie-maroon-paisley", name: "Handwoven Silk Tie — Maroon Paisley", category: "Tie", gender: "men", price: 2499, stock: 72 },
  { id: "banarasi-potli", name: "Banarasi Silk Potli Bag", category: "Other Collection", gender: "women", price: 1999, stock: 95 },
  { id: "velvet-mojari", name: "Velvet Mojari with Pearl Detail", category: "Footwear", gender: "women", price: 3299, stock: 40 },
  { id: "zari-juttis", name: "Hand-Embroidered Zari Juttis", category: "Footwear", gender: "women", price: 2799, stock: 52 },
  { id: "temple-necklace", name: "Temple Work Gold-Plated Necklace", category: "Jewellery", gender: "women", price: 17999, stock: 9 },
  { id: "jhumka-earrings", name: "Oxidised Silver Jhumka Earrings", category: "Jewellery", gender: "women", price: 1499, stock: 120 },
  { id: "kundan-choker", name: "Kundan Polki Choker Set with Earrings", category: "Jewellery", gender: "women", price: 24999, mrp: 28500, stock: 6 },
  { id: "indigo-dupatta", name: "Indigo Block-Print Cotton Dupatta", category: "Dupatta", gender: "women", price: 1899, stock: 88 },
  { id: "phulkari-dupatta", name: "Phulkari Hand-Embroidered Dupatta", category: "Dupatta", gender: "women", price: 4299, mrp: 5200, stock: 34 },
  { id: "midnight-linen-saree", name: "Midnight Blue Handloom Linen Saree", category: "Saree", gender: "women", price: 7499, stock: 26 },
  { id: "chanderi-saree-ivory", name: "Ivory Chanderi Cotton Silk Saree", category: "Saree", gender: "women", price: 8999, stock: 31 },
  { id: "teal-banarasi-saree", name: "Deep Teal / Petrol Blue Banarasi Silk Saree", category: "Saree", gender: "women", price: 14559, mrp: 17999, stock: 12 },
  { id: "emerald-tissue-saree", name: "Emerald Green Tissue Silk Saree with Golden Zari", category: "Saree", gender: "women", price: 12729, stock: 15 },
  { id: "rust-tussar-saree", name: "Rust Orange Tussar Silk Saree", category: "Saree", gender: "women", price: 13499, stock: 20 },
  { id: "gold-tissue-dupatta", name: "Gold Tissue Banarasi Dupatta", category: "Dupatta", gender: "women", price: 3499, stock: 46 },
  { id: "kolhapuri-chappals", name: "Hand-Stitched Kolhapuri Chappals", category: "Footwear", gender: "men", price: 1899, stock: 58 },
  { id: "khadi-stole", name: "Handspun Khadi Stole — Ash Grey", category: "Other Collection", gender: "men", price: 1699, stock: 110 },
  { id: "silk-pocket-square", name: "Ikat Silk Pocket Square Set", category: "Other Collection", gender: "men", price: 1299, mrp: 1600, stock: 140 },
];

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);

// Packaging and printed cards are stocked separately; a direct order only
// ships in 7–10 days when there are enough boxes and cards for the quantity.
export const PACKAGING = [
  { id: "kraft", name: "Signature Kraft Box", price: 249, stock: 120 },
  { id: "paper", name: "Handmade Paper Box", price: 449, stock: 40 },
  { id: "silk", name: "Silk Wrapped Box", price: 699, stock: 25 },
  { id: "trunk", name: "Heritage Trunk", price: 1299, stock: 8 },
];

export const CARD_DESIGNS = [
  { id: "marigold", name: "Marigold", price: 49, stock: 200 },
  { id: "zari", name: "Zari Thread", price: 79, stock: 60 },
  { id: "temple", name: "Temple Arch", price: 129, stock: 30 },
];

export const FESTIVALS = ["Diwali", "Rakhi", "New Year"];
