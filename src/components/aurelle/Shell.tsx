import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { nav, clinic, img } from "@/lib/content";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`group flex items-baseline gap-2 ${light ? "text-ink-foreground" : "text-foreground"}`} aria-label="Aurelle home">
      <span className="font-display text-2xl italic tracking-tight">Aurelle</span>
      <span className="eyebrow hidden opacity-60 sm:inline">Dermatology &amp; Aesthetics</span>
    </Link>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string>(img.heroPortrait);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference sm:px-10">
        <div className="pointer-events-auto text-ink-foreground"><BrandMark light /></div>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="aurelle-menu"
          className="pointer-events-auto group flex items-center gap-3 text-ink-foreground"
        >
          <span className="eyebrow">{open ? "Close" : "Index"}</span>
          <span className="relative block h-10 w-10 rounded-full border border-current">
            <span className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
            <span className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
          </span>
        </button>
      </header>

      <div
        id="aurelle-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed inset-0 z-40 transition-[clip-path] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] ${open ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0)]"}`}
      >
        <div className="absolute inset-0 bg-ink" />
        <img src={preview} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale transition-opacity duration-700" />
        <div className="glass-dark absolute inset-0" />
        <nav className="relative flex h-full flex-col justify-between overflow-y-auto px-6 pb-8 pt-28 sm:px-12 lg:flex-row lg:items-end">
          <ul className="space-y-1">
            {nav.map((n, i) => (
              <li key={n.to} className="overflow-hidden" style={{ paddingLeft: `${(i % 3) * 6}vw` }}>
                <Link
                  to={n.to}
                  tabIndex={open ? 0 : -1}
                  onMouseEnter={() => setPreview(n.img)}
                  onFocus={() => setPreview(n.img)}
                  className={`group inline-flex items-baseline gap-4 text-ink-foreground ${open ? "animate-rise" : "opacity-0"}`}
                  style={{ animationDelay: `${120 + i * 60}ms` }}
                >
                  <span className="eyebrow opacity-50">0{i + 1}</span>
                  <span className="font-display text-[11vw] leading-[0.95] tracking-tight transition-all duration-500 group-hover:italic group-hover:chrome-text sm:text-[7vw] lg:text-[5.2vw]">
                    {n.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 max-w-xs space-y-6 text-ink-foreground">
            <p className="font-display text-2xl italic leading-snug">Beauty, in a different light.</p>
            <Link to="/book-appointment" tabIndex={open ? 0 : -1} className="glass inline-flex items-center gap-3 rounded-full px-6 py-3 eyebrow text-ink-foreground">
              Book a consultation <span aria-hidden>→</span>
            </Link>
            <p className="eyebrow opacity-60">{clinic.phone} · {clinic.email}</p>
          </div>
        </nav>
      </div>

      <main key={path} className="animate-page">{children}</main>

      <Link
        to="/book-appointment"
        className={`glass fixed bottom-5 right-5 z-30 flex items-center gap-3 rounded-full px-5 py-3 text-foreground transition-opacity sm:bottom-8 sm:right-8 ${path === "/book-appointment" ? "pointer-events-none opacity-0" : ""}`}
      >
        <span className="h-2 w-2 rounded-full bg-rose" aria-hidden />
        <span className="eyebrow">Book</span>
      </Link>

      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink px-6 pb-10 pt-24 text-ink-foreground sm:px-12">
      <p className="font-display text-[18vw] leading-none tracking-tighter chrome-text">Aurelle</p>
      <div className="mt-12 grid gap-10 border-t border-ink-foreground/15 pt-10 text-sm sm:grid-cols-4">
        <div className="space-y-2 opacity-80">
          <p className="eyebrow opacity-60">Visit</p>
          <p>{clinic.address}</p>
          <p>{clinic.phone}</p>
          <p>{clinic.email}</p>
        </div>
        <div className="space-y-2">
          <p className="eyebrow opacity-60">Explore</p>
          {nav.slice(1).map((n) => <Link key={n.to} to={n.to} className="block opacity-80 hover:opacity-100">{n.label}</Link>)}
        </div>
        <div className="space-y-2">
          <p className="eyebrow opacity-60">Policies</p>
          <Link to="/privacy" className="block opacity-80 hover:opacity-100">Privacy Policy</Link>
          <Link to="/terms" className="block opacity-80 hover:opacity-100">Terms of Use</Link>
          <Link to="/cancellation-policy" className="block opacity-80 hover:opacity-100">Cancellation Policy</Link>
          <Link to="/medical-disclaimer" className="block opacity-80 hover:opacity-100">Medical Disclaimer</Link>
        </div>
        <p className="text-xs leading-relaxed opacity-60">
          Information on this website is general and cannot diagnose any condition. Photography is editorial and does not depict treatment results unless stated. © {new Date().getFullYear()} Aurelle.
        </p>
      </div>
    </footer>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="rounded-sm border border-dashed border-rose/60 bg-blush/30 px-1.5 text-[0.9em]">{children}</span>;
}

/** Editorial page opening: oversized title layered over a photograph. */
export function PageIntro({ eyebrow, title, italic, image, children }: { eyebrow: string; title: string; italic?: string; image: string; children?: ReactNode }) {
  return (
    <section className="relative grid min-h-[92vh] grid-cols-12 items-end overflow-hidden px-5 pb-14 pt-32 sm:px-10">
      <div className="absolute right-0 top-0 h-[78%] w-[78%] sm:w-[52%]">
        <img src={image} alt="" aria-hidden className="mono-reveal is-in h-full w-full object-cover" style={{ filter: "grayscale(0.85) contrast(1.05)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      <div className="relative col-span-12 lg:col-span-10">
        <p className="eyebrow mb-6 text-muted-foreground">{eyebrow}</p>
        <h1 className="font-display text-[15vw] leading-[0.86] tracking-tight sm:text-[10vw]">
          {title}
          {italic && <><br /><em className="pl-[8vw] chrome-text">{italic}</em></>}
        </h1>
        {children && <div className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}

export function CTA({ title = "Begin with a conversation." }: { title?: string }) {
  return (
    <section className="relative overflow-hidden px-5 py-32 text-center sm:px-10">
      <p className="eyebrow mb-6 text-muted-foreground">Consultation</p>
      <h2 className="mx-auto max-w-4xl font-display text-6xl leading-[0.95] sm:text-8xl">{title}</h2>
      <Link to="/book-appointment" className="mt-12 inline-flex items-center gap-4 rounded-full bg-primary px-8 py-4 eyebrow text-primary-foreground transition-transform hover:scale-[1.03]">
        Request an appointment <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
