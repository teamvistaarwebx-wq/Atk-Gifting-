import Image from "next/image";
import { JOURNEY } from "@/data/crafts";
import HScroller from "../HScroller";

// "From thread to gift box": the five illustrated stages, scrolled sideways
// along a loose thread.
export default function CraftJourney() {
  return (
    <section className="bg-petal py-16">
      <HScroller
        label="From thread to gift box, five stages"
        trackClassName="thread-line [background-attachment:local] [background-position:0_7rem]"
        header={
          <>
            <p className="eyebrow text-maroon">From thread to gift box</p>
            <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Many hands make one gift</h2>
            <p className="mt-3 text-muted">
              Before a saree reaches your box, it passes through the hands of spinners, dyers, weavers and finishers.
              Scroll along the thread to follow it.
            </p>
          </>
        }
      >
        {JOURNEY.map((stage, i) => (
          <article key={stage.title} className="w-[17rem] shrink-0 snap-start select-none sm:w-[19rem]">
            <div className="grid h-56 place-items-center">
              <Image src={stage.image} alt="" width={334} height={240} draggable={false} className="max-h-52 w-auto" />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-maroon/70">
              Stage {i + 1} of {JOURNEY.length}
            </p>
            <h3 className="mt-1 font-serif text-xl text-maroon">{stage.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{stage.body}</p>
          </article>
        ))}
      </HScroller>
    </section>
  );
}
