// Craft clusters behind the pieces in ATK gift boxes. Shown on the landing
// page's horizontally scrolling artisans section. Replace or extend with ATK's
// own artisan profiles (names, photos, quotes) when they are available.

export const CRAFTS = [
  {
    id: "khandua",
    name: "Khandua Silk Ikat",
    place: "Nuapatna & Maniabandha, Cuttack",
    region: "odisha",
    state: "Odisha",
    madeInto: "Silk sarees and dupattas",
    process:
      "Silk threads are tied in bundles and dyed before weaving, so the pattern is set in the yarn. On the loom, the weaver lines each thread up by eye until the motif appears.",
    fact: "Khandua bands woven with verses of the Gita Govinda are offered to Lord Jagannath at Puri.",
    colors: ["#7a0a1e", "#d9a441"],
  },
  {
    id: "sambalpuri",
    name: "Sambalpuri Bandha",
    place: "Bargarh & Sambalpur",
    region: "odisha",
    state: "Odisha",
    madeInto: "Cotton and silk sarees",
    process:
      "Both warp and weft are tie-dyed before they reach the loom. Shankha, chakra and phula motifs are worked out thread by thread, then woven together.",
    fact: "The design exists in the dyed yarn before a single row of cloth is woven.",
    colors: ["#1f3a5f", "#c8553d"],
  },
  {
    id: "tussar",
    name: "Tussar Silk",
    place: "Gopalpur, Jajpur",
    region: "odisha",
    state: "Odisha",
    madeInto: "Sarees, stoles and ties",
    process:
      "Wild tussar cocoons are boiled and the silk is reeled by hand, giving the cloth its slubbed texture and natural gold sheen.",
    fact: "Tussar comes from silkworms that feed on forest trees, not mulberry.",
    colors: ["#9a6b2f", "#f0d9a8"],
  },
  {
    id: "pipili",
    name: "Pipili Appliqué",
    place: "Pipili, Puri",
    region: "odisha",
    state: "Odisha",
    madeInto: "Potlis, bags and décor",
    process:
      "Coloured cloth is cut into elephants, parrots and flowers, then hemmed and stitched onto a base fabric, often with small mirrors.",
    fact: "The craft grew around the canopies and umbrellas made for Puri's Rath Yatra.",
    colors: ["#b3202f", "#f2c14e"],
  },
  {
    id: "banarasi",
    name: "Banarasi Brocade",
    place: "Varanasi",
    region: "india",
    state: "Uttar Pradesh",
    madeInto: "Silk sarees and dupattas",
    process:
      "Gold and silver zari is woven into the silk as extra weft, motif by motif. A richly worked saree can stay on the loom for weeks.",
    fact: "Many Banarasi looms still use punched cards to guide the pattern.",
    colors: ["#5e0716", "#e2b553"],
  },
  {
    id: "phulkari",
    name: "Phulkari",
    place: "Patiala & Amritsar",
    region: "india",
    state: "Punjab",
    madeInto: "Embroidered dupattas",
    process:
      "Floss silk is darned from the back of the cloth in long and short stitches, building geometric flowers that catch the light.",
    fact: "Phulkari means flower work, and was traditionally stitched for weddings.",
    colors: ["#c2410c", "#facc6b"],
  },
  {
    id: "block-print",
    name: "Hand Block Print",
    place: "Bagru",
    region: "india",
    state: "Rajasthan",
    madeInto: "Cotton dupattas and stoles",
    process:
      "Carved wooden blocks are dipped in dye and pressed by hand, one impression at a time, with indigo and madder among the natural colours.",
    fact: "A single print can need a separate block for each colour.",
    colors: ["#1e3a8a", "#e5d3b3"],
  },
  {
    id: "kolhapuri",
    name: "Kolhapuri Leatherwork",
    place: "Kolhapur",
    region: "india",
    state: "Maharashtra",
    madeInto: "Hand-stitched chappals",
    process:
      "Vegetable-tanned leather is cut, plaited and stitched by hand, without nails, so the sole softens to the wearer's foot.",
    fact: "A good pair is shaped to last years of daily wear.",
    colors: ["#7c4a1e", "#e8c99b"],
  },
];

// The five stages of the illustrated thread-to-gift-box journey.
export const JOURNEY = [
  {
    title: "It Begins with the Thread",
    body: "Cotton, silk and tussar yarn is sorted and prepared by hand. For ikat, it is tied and dyed before weaving starts.",
    image: "/artisans/journey-1.png",
  },
  {
    title: "Spun with Skill",
    body: "On the charkha, fibre is twisted into yarn even and strong enough for the loom.",
    image: "/artisans/journey-2.png",
  },
  {
    title: "Woven by Hand",
    body: "Every pass of the shuttle is the weaver's own. A single handloom saree can take days, or weeks.",
    image: "/artisans/journey-3.png",
  },
  {
    title: "Crafted with Care",
    body: "Printing, embroidery and finishing, then a check piece by piece before it leaves the cluster.",
    image: "/artisans/journey-4.png",
  },
  {
    title: "Ready to Be Cherished",
    body: "Packed by hand into your gift box with your personalised card, and dispatched in 7–10 working days.",
    image: "/artisans/journey-5.png",
  },
];
