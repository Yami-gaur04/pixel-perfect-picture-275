import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { LiquidReveal } from "@/components/aurelle/LiquidReveal";
import { ChromeObject, MonoImage, Reveal, useScrollProgress } from "@/components/aurelle/motion";
import { BeforeAfter } from "@/components/aurelle/BeforeAfter";
import { Placeholder } from "@/components/aurelle/Shell";
import { articles, clinic, img, treatments } from "@/lib/content";
import chrome from "@/assets/chrome.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelle — Beauty, in a different light" },
      { name: "description", content: "Dermatologist-led skin health and considered aesthetic treatments. Book a consultation at Aurelle." },
      { property: "og:title", content: "Aurelle — Dermatology & Aesthetics" },
      { property: "og:description", content: "Your skin. A new perspective. Dermatologist-led care and considered aesthetics." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <SceneReveal />
      <SceneBeneath />
      <SceneTexture />
      <ScenePhilosophy />
      <SceneAtlas />
      <SceneDoctor />
      <SceneResults />
      <SceneJournal />
      <SceneFinal />
    </>
  );
}

/* Scene 1 — the monochrome-to-colour reveal */
function SceneReveal() {
  const progress = useRef(0);
  const t1 = useRef<HTMLDivElement>(null);
  const t2 = useRef<HTMLDivElement>(null);
  const blob = useRef<HTMLDivElement>(null);
  const ref = useScrollProgress<HTMLElement>((p) => {
    progress.current = Math.min(1, p * 1.15);
    if (t1.current) t1.current.style.transform = `translate3d(${-p * 12}vw, ${-p * 10}vh, 0) scale(${1 - p * 0.15})`;
    if (t2.current) t2.current.style.transform = `translate3d(${p * 10}vw, ${p * 6}vh, 0)`;
    if (blob.current) blob.current.style.transform = `translate3d(${-20 + p * 70}vw, ${p * -30}vh, 0) rotate(${p * 90}deg)`;
  });
  return (
    <section ref={ref} className="relative h-[260vh] bg-ivory">
      <div className="sticky top-0 h-screen overflow-hidden grain">
        <div className="absolute inset-y-0 right-0 w-full md:w-[68%]">
          <LiquidReveal src={img.heroPortrait} alt="Editorial beauty portrait, revealed from monochrome into colour" progressRef={progress} />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/10 to-transparent md:via-transparent" />
        </div>

        <div ref={blob} className="pointer-events-none absolute left-0 top-[42%] w-[46vw] max-w-[640px] opacity-90 will-change-transform md:w-[30vw]" aria-hidden>
          <ChromeObject src={chrome} />
        </div>
        <div className="glass animate-float absolute right-[8%] top-[18%] hidden h-40 w-28 rounded-[48%] md:block" aria-hidden />
        <div className="glass animate-float absolute bottom-[14%] right-[30%] hidden h-20 w-20 rounded-full md:block" style={{ animationDelay: "-4s" }} aria-hidden />

        <div className="relative flex h-full flex-col justify-end px-5 pb-[14vh] sm:px-10">
          <p className="eyebrow mb-6 text-foreground/70">N° 01 — Beauty, in a different light</p>
          <div ref={t1} className="origin-bottom-left will-change-transform">
            <h1 className="font-display text-[19vw] leading-[0.82] tracking-[-0.03em] text-foreground md:text-[11.5vw]">
              Your <em className="font-normal">skin.</em>
            </h1>
          </div>
          <div ref={t2} className="will-change-transform md:pl-[18vw]">
            <p className="flex flex-wrap items-baseline gap-x-5 text-foreground">
              <span className="font-sans text-[8vw] font-light uppercase tracking-[0.12em] md:text-[4.2vw]">A new</span>
              <span className="font-display text-[13vw] italic leading-none md:text-[8vw]">perspective.</span>
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link to="/book-appointment" className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 eyebrow text-primary-foreground transition-transform hover:scale-[1.03]">
              Book a consultation <span aria-hidden>→</span>
            </Link>
            <Link to="/treatments" className="eyebrow border-b border-foreground/40 pb-1 text-foreground">Explore treatments</Link>
          </div>
        </div>

        <aside className="glass absolute right-5 top-28 hidden max-w-[220px] rounded-sm p-4 text-xs leading-relaxed text-foreground md:block lg:right-10">
          <p className="eyebrow mb-2 opacity-70">Fig. 1</p>
          Light reveals skin as it is — texture, tone, story. Scroll to bring colour through.
        </aside>
        <p className="eyebrow absolute bottom-6 left-5 text-foreground/60 sm:left-10">Scroll ↓</p>
        <p className="eyebrow absolute bottom-6 right-28 hidden text-foreground/60 md:block">Editorial photography</p>
      </div>
    </section>
  );
}

/* Scene 2 — beneath the surface: circular lens transition to second portrait */
function SceneBeneath() {
  const lens = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLHeadingElement>(null);
  const glassA = useRef<HTMLDivElement>(null);
  const ref = useScrollProgress<HTMLElement>((p) => {
    const r = 8 + p * 90;
    if (lens.current) lens.current.style.clipPath = `circle(${r}% at 50% 55%)`;
    if (word.current) word.current.style.transform = `translate3d(0, ${(0.5 - p) * 30}vh, 0)`;
    if (glassA.current) glassA.current.style.transform = `translate3d(${(p - 0.5) * 30}vw, ${(0.5 - p) * 20}vh, 0) rotate(${p * 30}deg)`;
  });
  return (
    <section ref={ref} className="relative h-[220vh] bg-ink text-ink-foreground">
      <div className="sticky top-0 h-screen overflow-hidden">
        <h2 ref={word} className="absolute inset-x-0 top-[12%] z-0 text-center font-display text-[22vw] italic leading-none tracking-tighter opacity-20">Beneath</h2>
        <div ref={lens} className="absolute inset-0 z-10 will-change-[clip-path]" style={{ clipPath: "circle(8% at 50% 55%)" }}>
          <img src={img.profile} alt="Editorial portrait in warm rim light" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
        </div>
        <div ref={glassA} className="glass absolute left-[12%] top-[30%] z-20 h-[38vh] w-[22vw] min-w-40 rounded-[40%_60%_55%_45%]" aria-hidden />
        <div className="absolute bottom-[10%] left-5 z-30 max-w-lg sm:left-10">
          <p className="eyebrow mb-4 opacity-70">N° 02 — Beneath the surface</p>
          <p className="font-display text-4xl leading-tight sm:text-6xl">What you see is only <em>the first layer.</em></p>
        </div>
        <div className="glass absolute bottom-[12%] right-5 z-30 hidden max-w-[240px] rounded-sm p-4 text-xs leading-relaxed text-ink-foreground sm:right-10 md:block">
          Every assessment begins with the skin's history: medical, environmental, personal.
        </div>
      </div>
    </section>
  );
}

/* Scene 3 — skin as texture */
function SceneTexture() {
  const imgRef = useRef<HTMLImageElement>(null);
  const line = useRef<SVGPathElement>(null);
  const ref = useScrollProgress<HTMLElement>((p) => {
    if (imgRef.current) imgRef.current.style.transform = `scale(1.15) translate3d(0, ${(p - 0.5) * -8}%, 0)`;
    if (line.current) line.current.style.strokeDashoffset = String(1000 - p * 1400);
  }, "through");
  return (
    <section ref={ref} className="relative min-h-[130vh] overflow-hidden bg-ivory">
      <img ref={imgRef} src={img.macro} alt="Macro photograph of natural skin texture" className="absolute inset-0 h-full w-full object-cover will-change-transform" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-transparent to-ivory" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden>
        <path ref={line} d="M0,700 C200,560 320,820 520,620 S820,380 1000,460" fill="none" stroke="var(--ink)" strokeWidth="0.8" strokeDasharray="1000" strokeDashoffset="1000" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="relative grid min-h-[130vh] grid-cols-12 px-5 py-28 sm:px-10">
        <div className="col-span-12 self-start md:col-span-7">
          <p className="eyebrow mb-6 text-foreground/70">N° 03 — Skin as texture</p>
          <h2 className="font-display text-[14vw] leading-[0.85] tracking-tight md:text-[8vw]">Health,<br /><span className="pl-[10vw] italic">then</span> beauty.</h2>
        </div>
        <div className="col-span-12 space-y-8 self-end md:col-span-4 md:col-start-9">
          {[["01", "Diagnosis precedes treatment", "We treat conditions, not just appearances."],
            ["02", "Fewer, better interventions", "A plan should be as small as it can be and as large as it needs to be."],
            ["03", "Honest expectations", "We explain what is realistic — including when the answer is no."]].map(([n, h, t], i) => (
            <Reveal key={n} delay={i * 120} className="border-t border-foreground/25 pt-4">
              <p className="eyebrow text-foreground/60">{n}</p>
              <p className="mt-2 font-display text-2xl">{h}</p>
              <p className="mt-1 text-sm text-foreground/75">{t}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Scene 4 — philosophy: words reveal with scroll */
const PHIL = "Every skin has a story. Every treatment deserves a reason.".split(" ");
function ScenePhilosophy() {
  const words = useRef<(HTMLSpanElement | null)[]>([]);
  const obj = useRef<HTMLDivElement>(null);
  const ref = useScrollProgress<HTMLElement>((p) => {
    words.current.forEach((w, i) => {
      if (!w) return;
      const local = Math.min(1, Math.max(0, p * 1.4 * PHIL.length - i));
      w.style.opacity = String(0.12 + local * 0.88);
      w.style.filter = `blur(${(1 - local) * 6}px)`;
    });
    if (obj.current) obj.current.style.transform = `translate3d(${(p - 0.5) * 60}vw, ${(0.5 - p) * 30}vh, 0) rotate(${p * -120}deg)`;
  });
  return (
    <section ref={ref} className="relative h-[220vh] bg-pearl">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-5 sm:px-10">
        <div ref={obj} className="absolute left-1/2 top-1/2 w-[60vw] max-w-[700px] -translate-x-1/2 -translate-y-1/2 opacity-70" aria-hidden>
          <img src={chrome} alt="" className="w-full" loading="lazy" />
        </div>
        <p className="eyebrow absolute left-5 top-24 text-muted-foreground sm:left-10">N° 04 — Philosophy</p>
        <h2 className="relative font-display text-[11vw] leading-[0.95] tracking-tight md:text-[7.2vw]">
          {PHIL.map((w, i) => (
            <span key={i} ref={(el) => { words.current[i] = el; }} className={`inline-block pr-[0.25em] transition-[filter] ${i === 4 || i === 9 ? "italic" : ""}`} style={{ opacity: 0.12 }}>
              {w}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}

/* Scene 5 — treatment atlas with varied compositions */
function SceneAtlas() {
  const featured = treatments.slice(0, 5);
  const [a, b, c, d, e] = featured;
  return (
    <section className="bg-ivory px-5 py-32 sm:px-10">
      <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-4 text-muted-foreground">N° 05 — Treatment atlas</p>
          <h2 className="font-display text-7xl leading-[0.9] sm:text-9xl">The <em>atlas.</em></h2>
        </div>
        <Link to="/treatments" className="eyebrow border-b border-foreground/40 pb-1">All nine categories →</Link>
      </div>

      <div className="grid grid-cols-12 gap-x-6 gap-y-24">
        <AtlasItem t={a} className="col-span-12 md:col-span-7" aspect="aspect-[4/5]" />
        <div className="col-span-12 flex flex-col justify-end md:col-span-4 md:col-start-9">
          <AtlasItem t={b} aspect="aspect-[3/4]" />
        </div>
        <Link to="/treatments/$slug" params={{ slug: c.slug }} className="group col-span-12 block border-y border-foreground/20 py-12">
          <p className="eyebrow text-muted-foreground">{c.kicker}</p>
          <p className="mt-3 font-display text-[12vw] leading-none tracking-tight transition-all duration-700 group-hover:italic group-hover:tracking-normal md:text-[8vw]">{c.title}</p>
          <p className="mt-4 max-w-xl text-muted-foreground opacity-70 transition-opacity group-hover:opacity-100">{c.summary}</p>
        </Link>
        <AtlasItem t={d} className="col-span-12 md:col-span-5 md:col-start-2" aspect="aspect-square" />
        <AtlasItem t={e} className="col-span-12 md:col-span-5 md:mt-40" aspect="aspect-[4/5]" />
      </div>
    </section>
  );
}

function AtlasItem({ t, className = "", aspect }: { t: (typeof treatments)[number]; className?: string; aspect: string }) {
  return (
    <Link to="/treatments/$slug" params={{ slug: t.slug }} className={`group block ${className}`}>
      <div className={`relative overflow-hidden ${aspect}`}>
        <img src={t.image} alt="" loading="lazy" className="h-full w-full object-cover grayscale transition-all duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06] group-hover:grayscale-0" />
        <span className="absolute inset-3 border border-pearl/0 transition-all duration-700 group-hover:inset-5 group-hover:border-pearl/70" aria-hidden />
        <span className="glass eyebrow absolute bottom-5 left-5 translate-y-3 rounded-full px-4 py-2 text-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">View treatment →</span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-3xl sm:text-4xl">{t.title}</h3>
        <span className="eyebrow shrink-0 text-muted-foreground">{t.kicker.split(" — ")[0]}</span>
      </div>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{t.summary}</p>
    </Link>
  );
}

/* Scene 6 — the dermatologist */
function SceneDoctor() {
  return (
    <section className="relative grid grid-cols-12 items-center gap-6 overflow-hidden bg-ink px-5 py-32 text-ink-foreground sm:px-10">
      <div className="relative col-span-12 md:col-span-5">
        <MonoImage src={img.hands} alt="Dermatologist preparing for an examination (editorial image; portrait of the doctor to be supplied)" className="aspect-[4/5] w-full object-cover" />
        <span className="glass-dark eyebrow absolute left-4 top-4 rounded-full px-3 py-1">Portrait to be supplied</span>
      </div>
      <div className="col-span-12 md:col-span-6 md:col-start-7">
        <p className="eyebrow mb-6 opacity-60">N° 06 — The dermatologist</p>
        <h2 className="font-display text-6xl leading-[0.95] sm:text-7xl"><Placeholder>{clinic.doctor}</Placeholder></h2>
        <p className="mt-4 eyebrow opacity-70">[Qualifications] · [Registration no.]</p>
        <blockquote className="mt-10 border-l border-champagne pl-6 font-display text-2xl italic leading-snug sm:text-3xl">
          "[Personal statement from the doctor — to be written and approved by the clinician.]"
        </blockquote>
        <Link to="/doctor" className="mt-10 inline-flex eyebrow border-b border-ink-foreground/40 pb-1">Full profile →</Link>
      </div>
    </section>
  );
}

/* Scene 7 — results (honest) */
function SceneResults() {
  return (
    <section className="grid grid-cols-12 gap-6 bg-pearl px-5 py-32 sm:px-10">
      <div className="col-span-12 md:col-span-5">
        <p className="eyebrow mb-6 text-muted-foreground">N° 07 — Results</p>
        <h2 className="font-display text-6xl leading-[0.95] sm:text-7xl">Real results,<br /><em>with consent.</em></h2>
        <p className="mt-8 max-w-md text-muted-foreground">
          Our gallery will show only genuine, authorised patient photographs with treatment context. Until those are published, the slider demonstrates the viewer using an editorial photograph.
        </p>
        <Link to="/results" className="mt-8 inline-flex eyebrow border-b border-foreground/40 pb-1">Visit the gallery →</Link>
      </div>
      <div className="col-span-12 md:col-span-5 md:col-start-8">
        <BeforeAfter src={img.prism} label="Demonstration only — editorial photograph, not a treatment result." />
      </div>
    </section>
  );
}

/* Scene 8 — the Skin Journal */
function SceneJournal() {
  const [lead, ...rest] = articles;
  return (
    <section className="bg-ivory px-5 py-32 sm:px-10">
      <div className="mb-16 flex items-end justify-between border-b border-foreground/20 pb-6">
        <h2 className="font-display text-6xl italic sm:text-8xl">The Skin Journal</h2>
        <Link to="/journal" className="eyebrow hidden sm:block">All articles →</Link>
      </div>
      <div className="grid grid-cols-12 gap-8">
        <Link to="/journal/$slug" params={{ slug: lead.slug }} className="group col-span-12 md:col-span-7">
          <div className="overflow-hidden"><img src={lead.image} alt="" loading="lazy" className="aspect-[16/11] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" /></div>
          <p className="eyebrow mt-6 text-muted-foreground">{lead.topic} · {lead.read}</p>
          <h3 className="mt-3 font-display text-5xl leading-tight group-hover:italic">{lead.title}</h3>
          <p className="mt-3 max-w-lg text-muted-foreground">{lead.dek}</p>
        </Link>
        <div className="col-span-12 divide-y divide-foreground/15 md:col-span-4 md:col-start-9">
          {rest.map((a) => (
            <Link key={a.slug} to="/journal/$slug" params={{ slug: a.slug }} className="group flex gap-5 py-6">
              <img src={a.image} alt="" loading="lazy" className="h-24 w-20 object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
              <div>
                <p className="eyebrow text-muted-foreground">{a.topic}</p>
                <p className="mt-2 font-display text-2xl leading-tight group-hover:italic">{a.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Scene 9 — the final encounter */
function SceneFinal() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink text-center text-ink-foreground">
      <img src={img.interior} alt="The Aurelle clinic interior" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" />
      <div className="absolute -right-20 top-10 w-[40vw] max-w-[520px] opacity-80"><ChromeObject src={chrome} strength={30} /></div>
      <div className="relative px-5">
        <p className="eyebrow mb-8 opacity-70">N° 09 — Begin</p>
        <h2 className="font-display text-[16vw] leading-[0.85] tracking-tight md:text-[10vw]">See yourself<br /><em className="chrome-text">differently.</em></h2>
        <Link to="/book-appointment" className="glass mt-14 inline-flex items-center gap-4 rounded-full px-9 py-5 eyebrow text-ink-foreground transition-transform hover:scale-[1.04]">
          Request a consultation <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
