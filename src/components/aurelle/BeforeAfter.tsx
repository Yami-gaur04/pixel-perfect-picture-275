import { useState } from "react";

/** Accessible comparison slider. Shows the same editorial photo in mono vs colour — never a treatment result. */
export function BeforeAfter({ src, label }: { src: string; label: string }) {
  const [v, setV] = useState(50);
  return (
    <figure className="relative">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover grayscale" loading="lazy" />
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 0 0 ${v}%)` }} loading="lazy" />
        <div className="chrome-line absolute inset-y-0 w-[3px]" style={{ left: `${v}%` }} aria-hidden />
        <div className="glass pointer-events-none absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full" style={{ left: `${v}%` }} aria-hidden>
          <span className="eyebrow text-foreground">⇆</span>
        </div>
        <span className="glass eyebrow absolute left-3 top-3 rounded-full px-3 py-1 text-foreground">Monochrome</span>
        <span className="glass eyebrow absolute right-3 top-3 rounded-full px-3 py-1 text-foreground">Colour</span>
        <input
          type="range" min={0} max={100} value={v}
          onChange={(e) => setV(Number(e.target.value))}
          aria-label={`Comparison slider: ${label}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-xs text-muted-foreground">{label}</figcaption>
    </figure>
  );
}
