import { createFileRoute } from "@tanstack/react-router";
import { CTA, Placeholder } from "@/components/aurelle/Shell";
import { MonoImage, Reveal } from "@/components/aurelle/motion";
import { clinic, img } from "@/lib/content";

export const Route = createFileRoute("/doctor")({
  head: () => ({
    meta: [
      { title: "The Dermatologist — Aurelle" },
      { name: "description", content: "Meet the dermatologist leading care at Aurelle: qualifications, expertise and treatment philosophy." },
      { property: "og:title", content: "The Dermatologist — Aurelle" },
      { property: "og:description", content: "Qualifications, expertise and philosophy of Aurelle's lead dermatologist." },
    ],
  }),
  component: Doctor,
});

const rows: [string, string[]][] = [
  ["Qualifications", ["[Medical degree, institution, year]", "[Specialist dermatology training]"]],
  ["Medical registration", ["[Regulator name] — [Registration number]"]],
  ["Experience", ["[Previous hospital / clinic roles]", "[Years in practice]"]],
  ["Memberships", ["[Verified professional bodies]"]],
  ["Expertise", ["[e.g. Acne and scarring]", "[e.g. Pigmentation in skin of colour]", "[e.g. Hair and scalp]"]],
  ["Languages", ["[Languages spoken]"]],
];

function Doctor() {
  return (
    <>
      <section className="relative grid min-h-screen grid-cols-12 gap-6 px-5 pb-16 pt-32 sm:px-10">
        <div className="relative col-span-12 md:col-span-6">
          <MonoImage eager src={img.hands} alt="Editorial image of a clinician; official portrait to be supplied" className="h-[80vh] w-full object-cover" />
          <span className="glass eyebrow absolute left-4 top-4 rounded-full px-3 py-1">Portrait to be supplied</span>
        </div>
        <div className="col-span-12 flex flex-col justify-end md:col-span-6">
          <p className="eyebrow mb-6 text-muted-foreground">Lead dermatologist</p>
          <h1 className="font-display text-6xl leading-[0.9] sm:text-8xl"><Placeholder>{clinic.doctor}</Placeholder></h1>
          <p className="mt-10 max-w-lg font-display text-2xl italic leading-snug">"[Treatment philosophy in the doctor's own words. All details on this page must be verified before publishing.]"</p>
        </div>
      </section>
      <section className="px-5 py-24 sm:px-10">
        <dl className="divide-y divide-foreground/15 border-y border-foreground/15">
          {rows.map(([k, v], i) => (
            <Reveal key={k} delay={i * 60} className="grid grid-cols-12 gap-4 py-8">
              <dt className="eyebrow col-span-12 text-muted-foreground md:col-span-3">{k}</dt>
              <dd className="col-span-12 space-y-1 font-display text-2xl md:col-span-9">{v.map((x) => <p key={x}><Placeholder>{x}</Placeholder></p>)}</dd>
            </Reveal>
          ))}
        </dl>
      </section>
      <CTA title="Book with the doctor." />
    </>
  );
}
