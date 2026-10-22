import { createFileRoute, Link } from "@tanstack/react-router";
import { clinic, img } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Visit — Aurelle" },
      { name: "description", content: "Address, opening hours, directions and accessibility information for Aurelle." },
      { property: "og:title", content: "Contact — Aurelle" },
      { property: "og:description", content: "Find and contact the Aurelle clinic." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="grid grid-cols-12 gap-6 px-5 pb-24 pt-32 sm:px-10">
      <div className="col-span-12 md:col-span-6">
        <p className="eyebrow text-muted-foreground">Contact</p>
        <h1 className="mt-4 font-display text-[16vw] italic leading-[0.85] md:text-[8vw]">Find us.</h1>
        <dl className="mt-12 space-y-8">
          <div><dt className="eyebrow text-muted-foreground">Address</dt><dd className="mt-2 font-display text-2xl">{clinic.address}</dd></div>
          <div><dt className="eyebrow text-muted-foreground">Phone</dt><dd className="mt-2 font-display text-2xl">{clinic.phone}</dd></div>
          <div><dt className="eyebrow text-muted-foreground">Email</dt><dd className="mt-2 font-display text-2xl">{clinic.email}</dd></div>
          <div><dt className="eyebrow text-muted-foreground">Hours</dt><dd className="mt-2 space-y-1">{clinic.hours.map(([d, h]) => <p key={d} className="flex justify-between border-b py-1"><span>{d}</span><span>{h}</span></p>)}</dd></div>
          <div><dt className="eyebrow text-muted-foreground">Accessibility</dt><dd className="mt-2 text-muted-foreground">[Step-free access, lift, parking and transport details to be confirmed.]</dd></div>
        </dl>
        <Link to="/book-appointment" className="mt-12 inline-flex rounded-full bg-primary px-7 py-4 eyebrow text-primary-foreground">Book a consultation →</Link>
      </div>
      <div className="col-span-12 space-y-6 md:col-span-6">
        <img src={img.interior} alt="Clinic interior" className="h-[50vh] w-full object-cover" />
        <iframe title="Map" className="h-[40vh] w-full grayscale" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-0.15%2C51.50%2C-0.12%2C51.52&layer=mapnik" />
        <p className="text-xs text-muted-foreground">Map location is a placeholder until the clinic address is confirmed.</p>
      </div>
    </div>
  );
}
