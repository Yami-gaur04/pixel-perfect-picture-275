export function LegalPage({ title, sections }: { title: string; sections: [string, string][] }) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-32 pt-36">
      <p className="eyebrow text-muted-foreground">Policy · Draft for legal review</p>
      <h1 className="mt-4 font-display text-6xl italic leading-[0.95] sm:text-7xl">{title}</h1>
      <div className="mt-16 space-y-10">
        {sections.map(([h, t]) => (
          <section key={h} className="border-t pt-6">
            <h2 className="font-display text-2xl">{h}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
