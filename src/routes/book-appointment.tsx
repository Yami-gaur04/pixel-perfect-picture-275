import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { bookingSchema, SLOTS } from "@/lib/booking";
import { treatments, img } from "@/lib/content";

export const Route = createFileRoute("/book-appointment")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Aurelle" },
      { name: "description", content: "Request a dermatology or aesthetic consultation at Aurelle." },
      { property: "og:title", content: "Book — Aurelle" },
      { property: "og:description", content: "Request your consultation in three short steps." },
    ],
  }),
  component: Book,
});

const field = "w-full border-b border-input bg-transparent py-3 text-lg outline-none focus:border-foreground";
type F = Record<string, string | boolean>;

function Book() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState<F>({ mode: "in-person", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const set = (k: string, v: string | boolean) => setF((p) => ({ ...p, [k]: v }));
  const steps = [["name", "email", "phone"], ["category", "mode"], ["date", "time", "consent"]];

  const check = (final: boolean) => {
    const r = bookingSchema.safeParse(f);
    const errs: Record<string, string> = {};
    if (!r.success) r.error.issues.forEach((i) => { const k = String(i.path[0]); if (final || steps[step]!.includes(k)) errs[k] ??= i.message; });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const Err = ({ k }: { k: string }) => errors[k] ? <p role="alert" className="mt-1 text-sm text-destructive">{errors[k]}</p> : null;

  if (done) return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow text-muted-foreground">Demonstration</p>
      <h1 className="mt-4 font-display text-6xl italic">Request received.</h1>
      <p className="mt-6 max-w-md text-muted-foreground">This is a demonstration flow — no booking has been made and no data was sent. Once a scheduling service is connected, real availability and confirmations will appear here.</p>
      <Link to="/" className="mt-10 eyebrow border-b pb-1">Return home</Link>
    </div>
  );

  return (
    <div className="grid min-h-screen grid-cols-12">
      <div className="relative col-span-12 hidden md:col-span-5 md:block">
        <img src={img.serum} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <p className="glass absolute bottom-10 left-10 right-10 rounded-sm p-5 font-display text-2xl italic">A considered conversation, at your pace.</p>
      </div>
      <form noValidate className="col-span-12 px-5 pb-24 pt-32 sm:px-12 md:col-span-7"
        onSubmit={(e) => { e.preventDefault(); if (step < 2) { if (check(false)) setStep(step + 1); } else if (check(true)) setDone(true); }}>
        <p className="eyebrow text-muted-foreground">Step {step + 1} of 3 · Demonstration booking</p>
        <h1 className="mt-4 font-display text-6xl leading-[0.95]">{["About you", "Your consultation", "Choose a time"][step]}</h1>
        <div className="mt-12 space-y-8">
          {step === 0 && <>
            <label className="block"><span className="eyebrow">Full name</span><input className={field} value={String(f.name ?? "")} onChange={(e) => set("name", e.target.value)} /><Err k="name" /></label>
            <label className="block"><span className="eyebrow">Email</span><input type="email" className={field} value={String(f.email ?? "")} onChange={(e) => set("email", e.target.value)} /><Err k="email" /></label>
            <label className="block"><span className="eyebrow">Phone</span><input type="tel" className={field} value={String(f.phone ?? "")} onChange={(e) => set("phone", e.target.value)} /><Err k="phone" /></label>
          </>}
          {step === 1 && <>
            <label className="block"><span className="eyebrow">Treatment or concern</span>
              <select className={field} value={String(f.category ?? "")} onChange={(e) => set("category", e.target.value)}>
                <option value="">Select…</option>
                {treatments.map((t) => <option key={t.slug} value={t.slug}>{t.title}</option>)}
                <option value="unsure">Not sure yet</option>
              </select><Err k="category" /></label>
            <fieldset><legend className="eyebrow">Consultation type</legend>
              <div className="mt-3 flex gap-3">{(["in-person", "video"] as const).map((m) => (
                <button type="button" key={m} aria-pressed={f.mode === m} onClick={() => set("mode", m)} className={`rounded-full border px-5 py-2 eyebrow ${f.mode === m ? "bg-primary text-primary-foreground" : ""}`}>{m}</button>))}</div>
            </fieldset>
            <label className="block"><span className="eyebrow">Notes (optional)</span><textarea rows={3} maxLength={1000} className={field} value={String(f.notes ?? "")} onChange={(e) => set("notes", e.target.value)} /></label>
          </>}
          {step === 2 && <>
            <label className="block"><span className="eyebrow">Preferred date</span><input type="date" className={field} value={String(f.date ?? "")} onChange={(e) => set("date", e.target.value)} /><Err k="date" /></label>
            <fieldset><legend className="eyebrow">Preferred time (example slots)</legend>
              <div className="mt-3 flex flex-wrap gap-2">{SLOTS.map((s) => (
                <button type="button" key={s} aria-pressed={f.time === s} onClick={() => set("time", s)} className={`rounded-full border px-4 py-2 text-sm ${f.time === s ? "bg-primary text-primary-foreground" : ""}`}>{s}</button>))}</div><Err k="time" />
            </fieldset>
            <label className="flex items-start gap-3 text-sm"><input type="checkbox" className="mt-1" checked={f.consent === true} onChange={(e) => set("consent", e.target.checked)} />
              <span>I consent to Aurelle storing these details to arrange my consultation, and I have read the <Link to="/privacy" className="underline">Privacy Policy</Link> and <Link to="/cancellation-policy" className="underline">Cancellation Policy</Link>.</span></label><Err k="consent" />
          </>}
        </div>
        <div className="mt-12 flex gap-4">
          {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="rounded-full border px-7 py-4 eyebrow">Back</button>}
          <button type="submit" className="rounded-full bg-primary px-7 py-4 eyebrow text-primary-foreground">{step < 2 ? "Continue →" : "Send request"}</button>
        </div>
      </form>
    </div>
  );
}
