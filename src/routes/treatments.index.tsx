import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CTA } from "@/components/aurelle/Shell";
import { treatments } from "@/lib/content";

export const Route = createFileRoute("/treatments/")({
  head: () => ({
    meta: [
      { title: "Treatments — Aurelle Dermatology & Aesthetics" },
      { name: "description", content: "Medical dermatology, acne care, pigmentation, hair and scalp, peels, microneedling, laser and rejuvenation." },
      { property: "og:title", content: "Treatments — Aurelle" },
      { property: "og:description", content: "Nine categories of dermatologist-led treatment." },
    ],
  }),
  component: Treatments,
});

function Treatments() {
  const [active, setActive] = useState(0);
  const t = treatments[active]!;
  return (
    <>
      <section className="relative grid min-h-screen grid-cols-12 gap-6 px-5 pb-20 pt-32 sm:px-10">
        <div className="col-span-12 md:col-span-7">
          <p className="eyebrow mb-6 text-muted-foreground">Treatment directory — 09 categories</p>
          <ul>
            {treatments.map((x, i) => (
              <li key={x.slug} className="border-b border-foreground/15">
                <Link
                  to="/treatments/$slug" params={{ slug: x.slug }}
                  onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                  className="group flex items-baseline gap-5 py-4"
                >
                  <span className="eyebrow w-8 text-muted-foreground">{x.kicker.split(" — ")[0]}</span>
                  <span className={`font-display text-4xl leading-tight transition-all duration-500 sm:text-6xl ${active === i ? "italic" : "opacity-50"}`}>{x.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sticky top-24 col-span-12 hidden h-[80vh] md:col-span-5 md:block">
          <div className="relative h-full overflow-hidden">
            {treatments.map((x, i) => (
              <img key={x.slug} src={x.image} alt="" aria-hidden className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />
            ))}
            <div className="glass absolute inset-x-5 bottom-5 rounded-sm p-5 text-foreground">
              <p className="eyebrow opacity-70">{t.kicker}</p>
              <p className="mt-2 text-sm leading-relaxed">{t.summary}</p>
            </div>
          </div>
        </div>
      </section>
      <CTA title="Not sure where to begin?" />
    </>
  );
}
