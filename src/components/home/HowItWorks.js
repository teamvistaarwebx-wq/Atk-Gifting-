import { GiftPhoto } from "../Illustrations";

const STEPS = [
  {
    title: "Choose your gifting path",
    body: "Building a personal gift, or gifting your whole team — pick the journey that fits, and we tailor everything after this to it.",
  },
  {
    title: "Pick pieces or get recommendations",
    body: "Browse sarees, dupattas, and jewellery yourself, or let us recommend a set based on your team's headcount and split.",
  },
  {
    title: "Add packaging & a personal card",
    body: "Every order includes your choice of packaging and a complimentary card — full custom box design unlocks at 50+ units.",
  },
  {
    title: "Checkout or request a quote",
    body: "In-stock boxes check out right away and ship in 7–10 working days. Made to Order and larger orders get a quote and a call from our team.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-maroon py-16 text-white">
      <div className="container-atk">
        <p className="text-center text-sm">How it works</p>
        <h2 className="mt-1 text-center font-serif text-2xl text-[#f3dfb6]">From selection to your doorstep, in four steps</h2>
        <ol className="mt-12 space-y-16">
          {STEPS.map((step, i) => (
            <li key={step.title} className={`flex flex-col items-center gap-8 md:flex-row ${i % 2 ? "md:flex-row-reverse" : ""}`}>
              <div className={`w-64 shrink-0 rounded-md bg-white p-2 shadow-xl ${i % 2 ? "rotate-[-6deg]" : "rotate-[-8deg]"}`}>
                <GiftPhoto variant={i} className="block w-full rounded-sm" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl sm:text-3xl">{step.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-white/85">{step.body}</p>
              </div>
              <span className="font-serif text-6xl font-bold text-white/60 sm:text-7xl">{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
