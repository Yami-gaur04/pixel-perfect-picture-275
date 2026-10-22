import { useEffect, useId, useRef } from "react";

/**
 * Two perfectly aligned copies of the same photograph inside one SVG:
 * a grayscale base and a colour layer clipped by a moving, displaced liquid boundary.
 * `progress` drives the boundary; a pointer lens adds a secondary reveal on desktop.
 */
export function useLiquidPath() {
  const W = 1000, H = 1200;
  return (p: number, t: number) => {
    // boundary sweeps from left (-15%) to right (115%)
    const base = -150 + p * (W + 300);
    const pts: string[] = [];
    const steps = 24;
    for (let i = 0; i <= steps; i++) {
      const y = (H / steps) * i;
      const x = base + Math.sin(i * 0.55 + t) * 60 + Math.sin(i * 0.21 - t * 0.7) * 90 * (1 - Math.abs(p - 0.5));
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return { d: `M-50,0 L${pts.join(" L")} L-50,${H} Z`, edge: `M${pts.join(" L")}` };
  };
}

export function LiquidReveal({ src, alt, progressRef }: { src: string; alt: string; progressRef: React.MutableRefObject<number> }) {
  const id = useId().replace(/:/g, "");
  const fill = useRef<SVGPathElement>(null);
  const edge = useRef<SVGPathElement>(null);
  const edge2 = useRef<SVGPathElement>(null);
  const lens = useRef<SVGCircleElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const build = useLiquidPath();

  useEffect(() => {
    let raf = 0;
    let shown = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loop = (ms: number) => {
      shown += (progressRef.current - shown) * 0.09;
      const { d, edge: e } = build(shown, reduce ? 0 : ms / 1400);
      fill.current?.setAttribute("d", d);
      edge.current?.setAttribute("d", e);
      edge2.current?.setAttribute("d", e);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const fine = window.matchMedia("(pointer:fine)").matches;
    const move = (ev: PointerEvent) => {
      const r = svg.current?.getBoundingClientRect();
      if (!r || !lens.current) return;
      // map client coords to viewBox with slice scaling
      const s = Math.max(r.width / 1000, r.height / 1200);
      const ox = (r.width - 1000 * s) / 2, oy = (r.height - 1200 * s) / 2;
      lens.current.setAttribute("cx", String((ev.clientX - r.left - ox) / s));
      lens.current.setAttribute("cy", String((ev.clientY - r.top - oy) / s));
      lens.current.setAttribute("r", "130");
    };
    const leave = () => lens.current?.setAttribute("r", "0");
    if (fine) { window.addEventListener("pointermove", move); document.addEventListener("pointerleave", leave); }
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); };
  }, [build, progressRef]);

  return (
    <svg ref={svg} viewBox="0 0 1000 1200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" role="img" aria-label={alt}>
      <defs>
        <filter id={`gray-${id}`}><feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncR type="linear" slope="1.08" intercept="-0.03" /><feFuncG type="linear" slope="1.08" intercept="-0.03" /><feFuncB type="linear" slope="1.08" intercept="-0.03" /></feComponentTransfer></filter>
        <filter id={`liquid-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="2" seed="4">
            <animate attributeName="baseFrequency" dur="18s" values="0.008 0.02;0.012 0.03;0.008 0.02" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="70" />
        </filter>
        <filter id={`chrome-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.03" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="70" result="d" />
          <feGaussianBlur in="d" stdDeviation="1.2" />
        </filter>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.98 0.005 260)" />
          <stop offset="0.3" stopColor="oklch(0.7 0.02 20)" />
          <stop offset="0.5" stopColor="oklch(0.99 0.01 80)" />
          <stop offset="0.7" stopColor="oklch(0.62 0.02 260)" />
          <stop offset="1" stopColor="oklch(0.95 0.04 20)" />
        </linearGradient>
        <mask id={`mask-${id}`}>
          <g filter={`url(#liquid-${id})`}>
            <path ref={fill} fill="white" />
          </g>
          <circle ref={lens} r="0" cx="-500" cy="-500" fill="white" filter={`url(#liquid-${id})`} style={{ transition: "r 0.6s cubic-bezier(.22,1,.36,1)" }} />
        </mask>
      </defs>
      <image href={src} width="1000" height="1200" preserveAspectRatio="xMidYMid slice" filter={`url(#gray-${id})`} />
      <image href={src} width="1000" height="1200" preserveAspectRatio="xMidYMid slice" mask={`url(#mask-${id})`} />
      <g filter={`url(#chrome-${id})`} style={{ mixBlendMode: "screen" }}>
        <path ref={edge2} fill="none" stroke={`url(#grad-${id})`} strokeWidth="26" strokeOpacity="0.35" />
        <path ref={edge} fill="none" stroke={`url(#grad-${id})`} strokeWidth="5" />
      </g>
    </svg>
  );
}
