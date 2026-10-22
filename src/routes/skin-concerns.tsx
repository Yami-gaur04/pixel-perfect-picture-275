import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CTA } from "@/components/aurelle/Shell";
import { concerns, findArticle, findTreatment, img } from "@/lib/content";

export const Route = createFileRoute("/skin-concerns")({
  head: () => ({
    meta: [
      { title: "Skin Concerns Guide — Aurelle" },
      { name: "description", content: "An interactive guide to acne, scarring, pigmentation, redness, sensitivity, ageing, hair loss and scalp conditions." },
      { property: "og:title", content: "Skin Concerns — Aurelle" },
      { property: "og:description", content: "Understand common skin concerns and the treatments that may help." },
    ],
  }),
  component: Concerns,
});

function Concerns() {
  const [i, setI] = useState(0);
  const c = concerns[i]!;
  const art = findArticle(c.article);
  return (
    <>
      <section className="relative min-h-screen overflow-hidden px-5 pb-20 pt-32 sm:px-10">
        <img src={img.macro} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="relative">
          <p className="eyebrow mb-6 text-muted-foreground">Skin concerns — an interactive guide</p>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Skin concerns">
            {concerns.map((x, j) => (
              <button key={x.slug} role="tab" aria-selected={i === j} onClick={() => setI(j)}
                className={`rounded-full px-5 py-2 eyebrow transition-colors ${i === j ? "bg-primary text-primary-foreground" : "glass text-foreground"}`}>
                {x.title}
              </button>
            ))}
          </div>
          <div key={c.slug} role="tabpanel" className="animate-page mt-16 grid grid-cols-12 gap-6">
            <h1 className="col-span-12 font-display text-[16vw] italic leading-[0.85] md:col-span-7 md:text-[9vw]">{c.title}</h1>
            <div className="col-span-12 space-y-8 md:col-span-4 md:col-start-9">
              <p className="text-lg leading-relaxed">{c.text}</p>
              <div>
                <p className="eyebrow mb-3 text-muted-foreground">Treatments that may help</p>
                {c.treatments.map((s) => { const t = findTreatment(s); return t && <Link key={s} to="/treatments/$slug" params={{ slug: s }} className="block font-display text-2xl hover:italic">{t.title} →</Link>; })}
              </div>
              {art && (
                <div>
                  <p className="eyebrow mb-3 text-muted-foreground">Read</p>
                  <Link to="/journal/$slug" params={{ slug: art.slug }} className="font-display text-2xl hover:italic">{art.title} →</Link>
                </div>
              )}
            </div>
          </div>
          <p className="glass mt-20 max-w-xl rounded-sm p-5 text-sm">
            Online information cannot diagnose a medical condition. If you are concerned about your skin, hair or a changing mole, please book an assessment or speak to your doctor.
          </p>
        </div>
      </section>
      <CTA />
    </>
  );
}
