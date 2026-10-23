const WAYS = [
  {
    title: "Bought from the maker",
    body: "ATK buys from artisans directly, cutting out middlemen so they are paid fairly for their work.",
  },
  {
    title: "Yarn and training",
    body: "Artisans get raw material and technical training that keep their looms and workshops running.",
  },
  {
    title: "New buyers",
    body: "Online stores, including India's ONDC network, put village crafts in front of buyers across the country.",
  },
];

export default function Impact() {
  return (
    <section className="bg-cream py-16">
      <div className="container-atk grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <p className="eyebrow text-maroon">Your gift, their livelihood</p>
          <p className="mt-4 font-serif text-7xl leading-none text-maroon sm:text-8xl">8,000+</p>
          <p className="mt-3 max-w-sm text-lg text-ink">
            handloom and handicraft artisans supported through Atulya Karigari since it began during the COVID pandemic.
          </p>
          <p className="mt-3 text-xs text-muted">Figure from Annapurna Finance&apos;s CSR reporting.</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {WAYS.map((w) => (
            <li key={w.title} className="rounded-xl border border-maroon/15 bg-white p-5">
              <span className="block h-1 w-10 rounded-full bg-ochre" aria-hidden />
              <h3 className="mt-4 font-serif text-lg text-maroon">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
