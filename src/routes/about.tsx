import { createFileRoute } from "@tanstack/react-router";
import { CTA, PageIntro } from "@/components/aurelle/Shell";
import { MonoImage, Reveal } from "@/components/aurelle/motion";
import { img } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Clinic — Aurelle Dermatology & Aesthetics" },
      { name: "description", content: "Inside Aurelle: our care philosophy, the consultation experience and a calm clinical environment." },
      { property: "og:title", content: "The Clinic — Aurelle" },
      { property: "og:description", content: "A dermatology clinic designed around time, light and honest advice." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageIntro eyebrow="The Clinic" title="A room" italic="full of light." image={img.interior}>
        Aurelle was conceived as the opposite of a rushed appointment: a quiet place where medicine and aesthetics are practised with the same care.
      </PageIntro>

      <section className="relative px-5 py-24 sm:px-10">
        <img src={img.interior} alt="Reception and lounge at the clinic, travertine walls and sheer curtains" loading="lazy" className="h-[80vh] w-full object-cover" />
        <p className="glass absolute bottom-36 left-10 hidden max-w-xs rounded-sm p-5 text-sm md:block">
          Natural materials, filtered daylight and private consultation rooms. <em>[Replace with your actual clinic photography.]</em>
        </p>
      </section>

      <section className="grid grid-cols-12 gap-6 px-5 py-24 sm:px-10">
        <h2 className="col-span-12 font-display text-6xl leading-[0.95] md:col-span-5 md:text-7xl">How a visit <em>unfolds.</em></h2>
        <ol className="col-span-12 space-y-12 md:col-span-6 md:col-start-7">
          {[
            ["Arrive", "A calm welcome, no queues. Forms are completed in advance."],
            ["Listen", "We begin with your history and what matters to you — not with a menu of treatments."],
            ["Examine", "A full assessment under clinical light, with photography only if you consent."],
            ["Decide", "Options, risks, costs and time to reflect. No same-day pressure."],
            ["Follow", "A written plan and scheduled reviews to measure what has actually changed."],
          ].map(([h, t], i) => (
            <Reveal key={h} as="li" delay={i * 80} className="flex gap-8 border-t border-foreground/20 pt-6">
              <span className="font-display text-5xl italic text-rose">{i + 1}</span>
              <div><p className="font-display text-3xl">{h}</p><p className="mt-2 text-muted-foreground">{t}</p></div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="grid grid-cols-12 items-end gap-6 bg-ink px-5 py-24 text-ink-foreground sm:px-10">
        <MonoImage src={img.serum} alt="Skincare still life" className="col-span-12 aspect-[4/5] w-full object-cover md:col-span-4" />
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <p className="eyebrow mb-6 opacity-60">Our principles</p>
          <p className="font-display text-4xl leading-tight sm:text-5xl">We would rather do less, well. We would rather tell you the truth than sell you a treatment.</p>
        </div>
      </section>
      <CTA />
    </>
  );
}
