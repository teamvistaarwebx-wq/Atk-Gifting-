import { CRAFTS } from "./crafts";

// "Meet our artisans" carousel.
//
// `person` entries are real ATK artisans: add each one with their photo in
// /public/artisans and the crafts on their profile card. Until every profile
// is in, the carousel is filled out with the craft communities ATK sources
// from (`community` entries), drawn with the line illustrations.

const PEOPLE = [
  {
    id: "md-rakib",
    kind: "person",
    name: "Md. Rakib",
    crafts: ["Bhagalpuri Silk", "Tussar & Matka", "Linen", "Gicha"],
    image: "/artisans/md-rakib.jpg",
    notes: [
      {
        craft: "Bhagalpuri Silk",
        text: "Tussar silk woven in and around Bhagalpur, Bihar, a weaving centre long known as India's Silk City.",
      },
      {
        craft: "Tussar & Matka",
        text: "Tussar is wild silk with a natural gold sheen. Matka is spun by hand from leftover silk, which gives it a coarse, nubby texture.",
      },
      {
        craft: "Linen",
        text: "Woven from flax yarn: crisp and breathable, and softer with every wash.",
      },
      {
        craft: "Gicha",
        text: "Gicha yarn is reeled by hand from tussar cocoons, giving the cloth an uneven, textured surface.",
      },
    ],
    giftIdeas: "Tussar sarees, stoles and ties",
  },
];

// Which line illustration stands in for each community's portrait.
const COMMUNITY = {
  khandua: { name: "Khandua weavers", image: "/artisans/journey-3.png" },
  sambalpuri: { name: "Bandha dyers & weavers", image: "/artisans/journey-1.png" },
  tussar: { name: "Tussar reelers & weavers", image: "/artisans/journey-2.png" },
  pipili: { name: "Pipili appliqué artisans", image: "/artisans/journey-4.png" },
  banarasi: { name: "Banarasi brocade weavers", image: "/artisans/journey-3.png" },
  phulkari: { name: "Phulkari embroiderers", image: "/artisans/journey-4.png" },
  "block-print": { name: "Bagru block printers", image: "/artisans/journey-4.png" },
  kolhapuri: { name: "Kolhapuri leatherworkers", image: "/artisans/journey-5.png" },
};

const COMMUNITIES = CRAFTS.map((craft) => ({
  id: `community-${craft.id}`,
  kind: "community",
  name: COMMUNITY[craft.id].name,
  crafts: [craft.name],
  image: COMMUNITY[craft.id].image,
  place: `${craft.place}, ${craft.state}`,
  process: craft.process,
  fact: craft.fact,
  giftIdeas: craft.madeInto,
}));

export const ARTISANS = [...PEOPLE, ...COMMUNITIES];
