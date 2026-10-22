import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { articles } from "@/lib/content";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "The Skin Journal — Aurelle" },
      { name: "description", content: "Clinician-reviewed writing on acne, pigmentation, sensitive skin and hair health." },
      { property: "og:title", content: "The Skin Journal — Aurelle" },
      { property: "og:description", content: "An editorial publication on skin, light and care." },
    ],
  }),
  component: Journal,
});

function Journal() {
  const topics = ["All", ...Array.from(new Set(articles.map((a) => a.topic)))];
  const [topic, setTopic] = useState("All");
  const list = articles.filter((a) => topic === "All" || a.topic === topic);
  const [lead, ...rest] = list;
  return (
    <div className="px-5 pb-32 pt-32 sm:px-10">
      <header className="border-b border-foreground/20 pb-8">
        <p className="eyebrow text-muted-foreground">Issue N° 01 — Clinician reviewed</p>
        <h1 className="mt-4 font-display text-[18vw] italic leading-[0.8] tracking-tight md:text-[12vw]">Skin Journal</h1>
        <div className="mt-8 flex flex-wrap gap-2">
          {topics.map((t) => (
            <button key={t} onClick={() => setTopic(t)} aria-pressed={topic === t} className={`rounded-full border px-4 py-1.5 eyebrow ${topic === t ? "bg-primary text-primary-foreground" : ""}`}>{t}</button>
          ))}
        </div>
      </header>
      {lead && (
        <Link to="/journal/$slug" params={{ slug: lead.slug }} className="group mt-16 grid grid-cols-12 gap-6">
          <div className="col-span-12 overflow-hidden md:col-span-8"><img src={lead.image} alt="" className="aspect-[16/10] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" /></div>
          <div className="col-span-12 self-end md:col-span-4">
            <p className="eyebrow text-muted-foreground">Featured · {lead.topic} · {lead.read}</p>
            <h2 className="mt-4 font-display text-6xl leading-[0.95] group-hover:italic">{lead.title}</h2>
            <p className="mt-4 text-muted-foreground">{lead.dek}</p>
          </div>
        </Link>
      )}
      <div className="mt-24 grid gap-x-8 gap-y-16 md:grid-cols-3">
        {rest.map((a, i) => (
          <Link key={a.slug} to="/journal/$slug" params={{ slug: a.slug }} className={`group ${i === 1 ? "md:mt-24" : ""}`}>
            <div className="overflow-hidden"><img src={a.image} alt="" loading="lazy" className="aspect-[3/4] w-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0" /></div>
            <p className="eyebrow mt-5 text-muted-foreground">{a.topic} · {a.read}</p>
            <h3 className="mt-2 font-display text-3xl group-hover:italic">{a.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
