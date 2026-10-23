"use client";

import { useRouter } from "next/navigation";
import { FESTIVALS } from "@/data/products";
import { actions, useStore } from "@/lib/store";
import TalkBanner from "@/components/TalkBanner";
import QtyStepper from "@/components/QtyStepper";
import BulkHelp from "@/components/BulkHelp";
import { ArrowRight } from "@/components/Icons";

export default function CorporatePage() {
  const router = useRouter();
  const team = useStore((s) => s.team);
  const total = team.female + team.male;

  const getRecommendations = () => {
    if (actions.setMode("corporate")) actions.toast("Gift box cleared — you've switched to corporate gifting.");
    router.push("/gifting");
  };

  return (
    <>
      <TalkBanner />
      <section className="container-atk max-w-3xl pb-20 pt-12">
        <h1 className="font-serif text-3xl text-ink">Gift your team</h1>
        <p className="mt-2 text-muted">Tell us the occasion and your staff split, and we&apos;ll build recommendations for you.</p>

        <p className="eyebrow mt-8">Festival</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {FESTIVALS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={team.festival === f}
              onClick={() => actions.setTeam({ festival: f })}
              className={`rounded-full border px-5 py-2 text-sm ${team.festival === f ? "border-maroon bg-maroon text-white" : "border-line hover:border-maroon/40"}`}
            >
              {f}
            </button>
          ))}
        </div>

        <p className="eyebrow mt-8">Team member count</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {[
            ["female", "Female Staff"],
            ["male", "Male Staff"],
          ].map(([key, label]) => (
            <div key={key} className="panel flex flex-col items-center gap-3 py-6">
              <span className="text-ink">{label}</span>
              <QtyStepper variant="butter" min={0} value={team[key]} onChange={(n) => actions.setTeam({ [key]: n })} label={label} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-sm text-ink">
          Total: <strong>{total}</strong> Team Members
        </p>

        <div className="mt-8 grid grid-cols-[1fr_2fr] gap-3">
          <button type="button" className="btn-outline" onClick={() => router.push("/")}>
            Back
          </button>
          <button type="button" className="btn-primary" disabled={total === 0} onClick={getRecommendations}>
            Get Recommendations <ArrowRight />
          </button>
        </div>

        <BulkHelp source="corporate" className="mt-8" />
      </section>
    </>
  );
}
