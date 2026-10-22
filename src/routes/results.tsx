import { createFileRoute } from "@tanstack/react-router";
import { BeforeAfter } from "@/components/aurelle/BeforeAfter";
import { CTA, PageIntro } from "@/components/aurelle/Shell";
import { img } from "@/lib/content";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Results Gallery — Aurelle" },
      { name: "description", content: "Genuine, consented patient results with treatment context, published only with authorisation." },
      { property: "og:title", content: "Results — Aurelle" },
      { property: "og:description", content: "An honest results gallery — consented, contextualised, unretouched." },
    ],
  }),
  component: Results,
});

function Results() {
  return (
    <>
      <PageIntro eyebrow="Results" title="Honest" italic="evidence." image={img.prism}>
        This gallery is reserved for genuine, authorised patient photographs, each shown with the treatment, number of sessions and time elapsed. No clinical results have been published yet.
      </PageIntro>
      <section className="grid gap-12 px-5 py-24 sm:px-10 md:grid-cols-3">
        {[img.prism, img.profile, img.heroPortrait].map((s, i) => (
          <div key={i} className={i === 1 ? "md:mt-32" : ""}>
            <BeforeAfter src={s} label="Demonstration of the viewer — editorial photograph, not a patient result." />
          </div>
        ))}
      </section>
      <section className="bg-ivory px-5 py-20 sm:px-10">
        <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p className="eyebrow text-foreground">How we publish results</p>
          <p>Patient images appear only with written consent, may be withdrawn at any time, and are not retouched. Individual results vary; images do not guarantee a similar outcome.</p>
          <p>Approved patient stories will appear here once received and verified.</p>
        </div>
      </section>
      <CTA />
    </>
  );
}
