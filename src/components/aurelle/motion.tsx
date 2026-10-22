import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

/** Progress (0→1) of an element scrolling through the viewport. Calls back on rAF, no re-render. */
export function useScrollProgress<T extends HTMLElement>(
  onProgress: (p: number) => void,
  mode: "sticky" | "through" = "sticky",
) {
  const ref = useRef<T>(null);
  const cb = useRef(onProgress);
  cb.current = onProgress;
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p =
        mode === "sticky"
          ? -r.top / Math.max(1, r.height - vh)
          : (vh - r.top) / (vh + r.height);
      cb.current(Math.min(1, Math.max(0, p)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [mode]);
  return ref;
}

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, set] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { set(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

export function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: { children: ReactNode; as?: ElementType; className?: string; delay?: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <Tag ref={ref} className={`reveal ${inView ? "is-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/** Image that turns from monochrome to colour on entering the viewport. */
export function MonoImage({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [ref, inView] = useInView<HTMLImageElement>(0.35);
  return <img ref={ref} src={src} alt={alt} loading={eager ? "eager" : "lazy"} className={`mono-reveal ${inView ? "is-in" : ""} ${className}`} />;
}

/** Chrome sculpture that drifts with the pointer. */
export function ChromeObject({ src, className = "", strength = 18 }: { src: string; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const on = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, [strength]);
  return (
    <div ref={ref} className={`pointer-events-none transition-transform duration-700 ease-out ${className}`} aria-hidden>
      <img src={src} alt="" className="animate-float h-full w-full object-contain" />
    </div>
  );
}
