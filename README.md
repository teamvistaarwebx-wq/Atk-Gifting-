# Atulya Karigari — Gifting

Next.js 16 (App Router) site for ATK gifting: individual gift boxes, corporate team gifting, Made to Order and quote requests.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Flow

| Route | What it does |
| --- | --- |
| `/` | Landing: hero, gifting paths, thread-to-gift-box journey and craft clusters (both horizontal scrollers), impact, box contents, how it works, occasions, bulk gifting, FAQ |
| `/corporate` | Festival + female/male staff count, then recommendations |
| `/gifting` | In-stock catalogue (All / Women / Men, categories, sort). Floating **Gift Box** pill. **Made to Order** entry on the right |
| `/gift-box` | Quantities, packaging, personalised card, summary, checkout or quote |
| `/checkout` → `/order-placed` | Direct payment for in-stock boxes |
| `/made-to-order` | Made to Order catalogue: indicative unit price + quantity, **Request a quote** only |
| `/admin` | Made to Order lead-time table (editable), quote requests, direct orders |

### Lane A — in-stock, direct payment

- Anything in stock ships in **7–10 working days**, up to 50 pieces included.
- Packaging boxes and printed cards must be in stock for the order's quantity (one box and card per piece for corporate orders); options without enough stock can't be chosen and checkout is blocked.
- Personalised cards: the proof must be approved within **24 hours** to keep the dispatch window.
- Items in the gift box are held for **15 minutes**; after that the hold is released. Pieces are only reserved once payment completes.
- From **30 pieces** the buyer is steered to **Request a quote** (so ATK can hold the pieces). Direct checkout still works.

### Lane B — Request a quote

One form (`src/components/QuoteForm.js`) for every entry point, opened with `actions.openQuote(draft)`:

- From the gifting pages it opens blank (gift box contents are attached for context).
- From a Made to Order product it opens with the product and quantity pre-filled.

Fields include **quantity** and **required-by date**. Nothing is paid on the site: ATK calls the customer and sends a payment link for the advance.

### Made to Order lead times

Lead time depends on quantity, not product. Defaults (`src/lib/leadTime.js`), editable in `/admin`:

| Quantity | Production | Customer sees (production + 15 days QC, packaging, card printing, dispatch) |
| --- | --- | --- |
| Up to 20 units | 30 days | About 45 days |
| 21–50 units | 60 days | About 75 days |
| Above 50 units | — | Quote only, no date |

## Data

Landing-page artisan content:

- `src/data/artisans.js` — the **Meet our artisans** carousel. Add each artisan to `PEOPLE` (name, crafts, photo in `public/artisans/`, a note per craft). Craft communities fill the rest of the carousel until all profiles are in.
- `src/data/crafts.js` — craft clusters and the five thread-to-gift-box stages; line illustrations are in `public/artisans/`.

There is no backend yet. Catalogue data lives in `src/data/`; the gift box, quote requests, orders and admin lead times are kept in `localStorage` through `src/lib/store.js`. Replace `load`/`persist` there with API calls when a backend is added. `/admin` has no login.
