import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CTA } from "@/components/aurelle/Shell";
import { Reveal } from "@/components/aurelle/motion";
import { findTreatment } from "@/lib/content";

export const Route = createFileRoute("/treatments/$slug")({
  loader: ({ params }) => {
    const t = findTreatment(params.slug);
    if (!t) throw notFound();
    return { slug: t.slug };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? findTreatment(loaderData.slug) : undefined;
    if (!t) return { meta: [{ title: "Treatment not found — Aurelle" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${t.title} — Aurelle` },
        { name: "description", content: t.summary },
        { property: "og:title", content: `${t.title} — Aurelle` },
        { property: "og:description", content: t.summary },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
      <h1 className="font-display text-5xl italic">Treatment not found</h1>
      <Link to="/treatments" className="eyebrow border-b pb-1">Back to treatments</Link>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const { slug } = Route.useLoaderData();
  const t = findTreatment(slug)!;
  const blocks: [string, React.ReactNode][] = [
    ["Concerns addressed", <ul className="space-y-1">{t.concerns.map((c) => <li key={c}>— {c}</li>)}</ul>],
    ["Suitability", t.suitability],
    ["Consultation process", <ol className="space-y-1">{t.process.map((c, i) => <li key={c}>{i + 1}. {c}</li>)}</ol>],
    ["Preparation", t.preparation],
    ["Aftercare", t.aftercare],
    ["Risks & limitations", t.risks],
  ];
  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-ink text-ink-foreground">
        <img src={t.image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="relative flex min-h-screen flex-col justify-end px-5 pb-16 pt-32 sm:px-10">
          <Link to="/treatments" className="eyebrow mb-10 opacity-70">← All treatments</Link>
          <p className="eyebrow mb-4 opacity-70">{t.kicker}</p>
          <h1 className="font-display text-[14vw] leading-[0.85] tracking-tight md:text-[8vw]">{t.title}</h1>
          <p className="glass-dark mt-10 max-w-xl rounded-sm p-6 text-lg leading-relaxed">{t.summary}</p>
        </div>
      </section>

      <section className="grid grid-cols-12 gap-6 px-5 py-24 sm:px-10">
        <p className="eyebrow col-span-12 text-muted-foreground md:col-span-3">Overview</p>
        <div className="col-span-12 space-y-0 divide-y divide-foreground/15 border-y border-foreground/15 md:col-span-9">
          {blocks.map(([h, body], i) => (
            <Reveal key={h} delay={i * 50} className="grid gap-4 py-8 md:grid-cols-3">
              <h2 className="font-display text-3xl">{h}</h2>
              <div className="leading-relaxed text-muted-foreground md:col-span-2">{body}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ivory px-5 py-24 sm:px-10">
        <h2 className="mb-10 font-display text-5xl italic">Questions</h2>
        <div className="max-w-3xl divide-y divide-foreground/15">
          {t.faqs.map(([q, a]) => (
            <details key={q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-2xl">
                {q}<span className="transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-xs text-muted-foreground">Content to be reviewed by a qualified clinician before publication. Suitability is confirmed only at consultation.</p>
      </section>

      <section className="px-5 py-24 sm:px-10">
        <p className="eyebrow mb-8 text-muted-foreground">Related</p>
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          {t.related.map((r) => {
            const x = findTreatment(r);
            return x && <Link key={r} to="/treatments/$slug" params={{ slug: r }} className="font-display text-4xl hover:italic sm:text-6xl">{x.title} →</Link>;
          })}
        </div>
      </section>
      <CTA title={`Discuss ${t.title.toLowerCase()}.`} />
    </>
  );
}
