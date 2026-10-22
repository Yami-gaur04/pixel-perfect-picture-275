import heroPortrait from "@/assets/hero-portrait.jpg";
import profile from "@/assets/portrait-profile.jpg";
import macro from "@/assets/skin-macro.jpg";
import interior from "@/assets/clinic-interior.jpg";
import prism from "@/assets/portrait-prism.jpg";
import serum from "@/assets/still-serum.jpg";
import hands from "@/assets/consult-hands.jpg";

export const img = { heroPortrait, profile, macro, interior, prism, serum, hands };

/** Editable clinic details — replace placeholders with verified information. */
export const clinic = {
  name: "Aurelle",
  full: "Aurelle — Dermatology & Aesthetics",
  address: "[Clinic street address], [City] [Postcode]",
  phone: "[+00 000 000 0000]",
  email: "[hello@yourclinic.com]",
  hours: [
    ["Monday – Friday", "[09:00 – 19:00]"],
    ["Saturday", "[10:00 – 16:00]"],
    ["Sunday", "Closed"],
  ] as const,
  doctor: "[Dr. Full Name]",
};

export const nav = [
  { to: "/", label: "Home", img: heroPortrait },
  { to: "/treatments", label: "Treatments", img: serum },
  { to: "/skin-concerns", label: "Skin Concerns", img: macro },
  { to: "/doctor", label: "The Doctor", img: hands },
  { to: "/about", label: "The Clinic", img: interior },
  { to: "/results", label: "Results", img: prism },
  { to: "/journal", label: "Skin Journal", img: profile },
  { to: "/contact", label: "Contact", img: interior },
] as const;

export type Treatment = {
  slug: string;
  title: string;
  kicker: string;
  image: string;
  summary: string;
  concerns: string[];
  suitability: string;
  process: string[];
  preparation: string;
  aftercare: string;
  risks: string;
  faqs: [string, string][];
  related: string[];
};

export const treatments: Treatment[] = [
  {
    slug: "medical-dermatology", title: "Medical Dermatology", kicker: "I — Diagnosis first", image: hands,
    summary: "Assessment and management of skin conditions such as eczema, psoriasis, rosacea and suspicious moles, led by a dermatologist.",
    concerns: ["Eczema and dermatitis", "Psoriasis", "Rosacea", "Mole and lesion checks", "Rashes and irritation"],
    suitability: "Anyone with a persistent, changing or uncomfortable skin condition. Urgent or rapidly changing lesions should be seen promptly.",
    process: ["Medical history and skin examination", "Dermoscopy where appropriate", "Discussion of diagnosis and options", "Written management plan and follow-up"],
    preparation: "Bring a list of current medications and previous treatments. Arrive without makeup on the area of concern if possible.",
    aftercare: "Follow your written plan. Contact the clinic if symptoms worsen or new concerns appear.",
    risks: "Some conditions require referral, biopsy or longer-term management. Not every condition can be cured; many can be controlled.",
    faqs: [["Do I need a referral?", "[Clinic to confirm referral policy.]"], ["How long is a consultation?", "Typically 30–45 minutes for a first visit."]],
    related: ["acne-care", "skin-rejuvenation"],
  },
  {
    slug: "acne-care", title: "Acne & Acne-Scar Care", kicker: "II — Calm, then refine", image: prism,
    summary: "Medical treatment of active acne and staged approaches to scarring, from prescription regimes to resurfacing.",
    concerns: ["Active acne", "Hormonal breakouts", "Post-inflammatory marks", "Atrophic scarring"],
    suitability: "Teens and adults with persistent acne or residual scarring. Active acne is usually treated before scar procedures.",
    process: ["Assessment of acne type and triggers", "Prescription or in-clinic treatment plan", "Review at 6–12 weeks", "Scar treatment once skin is stable"],
    preparation: "Note your current skincare and any medication. Some treatments require pausing retinoids beforehand.",
    aftercare: "Gentle cleansing, daily sunscreen, and adherence to the plan. Results build gradually.",
    risks: "Irritation, dryness, temporary flare, pigment change. Scar improvement is partial and varies between individuals.",
    faqs: [["How soon will I see change?", "Most medical acne plans need 8–12 weeks to assess."], ["Can scars be removed?", "Scars can often be softened; complete removal is not usually realistic."]],
    related: ["microneedling", "chemical-peels"],
  },
  {
    slug: "pigmentation", title: "Pigmentation & Tone", kicker: "III — Even light", image: profile,
    summary: "Considered treatment of melasma, sun spots and uneven tone, with particular care for deeper skin tones.",
    concerns: ["Melasma", "Sun spots", "Post-inflammatory hyperpigmentation", "Uneven tone"],
    suitability: "Most skin types following assessment. Protocols are adjusted for skin tone and pigment sensitivity.",
    process: ["Pigment assessment under clinical light", "Topical foundation plan", "In-clinic treatment where suitable", "Maintenance strategy"],
    preparation: "Strict sun protection for several weeks beforehand is usually advised.",
    aftercare: "Broad-spectrum sunscreen daily. Avoid heat and friction on treated areas as directed.",
    risks: "Pigment can recur, and some treatments can worsen pigmentation if not appropriately selected.",
    faqs: [["Is melasma curable?", "Melasma is typically managed long-term rather than cured."]],
    related: ["chemical-peels", "laser-treatments"],
  },
  {
    slug: "hair-scalp", title: "Hair & Scalp", kicker: "IV — From the root", image: profile,
    summary: "Evaluation of hair thinning, shedding and scalp conditions, with evidence-based medical options.",
    concerns: ["Hair thinning", "Excess shedding", "Dandruff and seborrhoeic dermatitis", "Scalp irritation"],
    suitability: "Adults experiencing changes in hair density or scalp health.",
    process: ["History and scalp examination", "Trichoscopy where available", "Blood tests if indicated", "Treatment plan and review"],
    preparation: "Avoid washing hair on the day if advised, and bring any previous test results.",
    aftercare: "Consistency matters. Hair cycles are slow; reviews are typically at 3–6 months.",
    risks: "Not all hair loss is reversible. Medications carry side effects that will be discussed in detail.",
    faqs: [["Will my hair grow back?", "It depends on the cause; your dermatologist will explain realistic expectations."]],
    related: ["medical-dermatology"],
  },
  {
    slug: "chemical-peels", title: "Chemical Peels", kicker: "V — Controlled renewal", image: serum,
    summary: "Clinician-selected peels to improve texture, tone and congestion, from superficial to medium depth.",
    concerns: ["Dullness", "Congestion", "Fine texture", "Mild pigmentation"],
    suitability: "Selected after skin assessment. Not suitable during active infection or certain medications.",
    process: ["Assessment and patch test if required", "Cleansing and peel application", "Neutralisation and soothing", "Aftercare guidance"],
    preparation: "Pause retinoids and exfoliants as instructed, usually 3–7 days before.",
    aftercare: "Expect light flaking. Moisturise, avoid picking, and use sunscreen daily.",
    risks: "Redness, peeling, sensitivity, rarely pigment change or infection.",
    faqs: [["Is there downtime?", "Superficial peels: minimal. Deeper peels: several days of visible peeling."]],
    related: ["pigmentation", "skin-rejuvenation"],
  },
  {
    slug: "microneedling", title: "Microneedling", kicker: "VI — Precise stimulus", image: macro,
    summary: "Medical microneedling to support collagen remodelling for texture and selected scars.",
    concerns: ["Acne scarring", "Enlarged pores", "Uneven texture"],
    suitability: "Stable skin without active infection or uncontrolled acne.",
    process: ["Consultation and photographs (with consent)", "Topical numbing", "Treatment", "Course of sessions as advised"],
    preparation: "Avoid retinoids and sun exposure beforehand as directed.",
    aftercare: "Redness for 24–72 hours. Gentle skincare and sun protection.",
    risks: "Redness, swelling, pinpoint bleeding, infection, pigment change in some skin types.",
    faqs: [["How many sessions?", "Typically a course of several sessions spaced weeks apart."]],
    related: ["acne-care", "skin-rejuvenation"],
  },
  {
    slug: "laser-treatments", title: "Laser-Based Treatments", kicker: "VII — Light, directed", image: prism,
    summary: "[Clinic to list devices offered]. Laser and light treatments for pigment, redness and resurfacing.",
    concerns: ["Redness and visible vessels", "Sun damage", "Texture", "Selected pigment"],
    suitability: "Device selection depends on skin type and concern. Assessment is essential.",
    process: ["Skin type assessment", "Test patch where appropriate", "Treatment", "Review"],
    preparation: "Avoid tanning and self-tan. Certain medications must be disclosed.",
    aftercare: "Cooling, gentle skincare, strict sun protection.",
    risks: "Burns, blistering, pigment change, scarring (rare). Risk varies with device and skin type.",
    faqs: [["Is laser safe for darker skin?", "Some devices are suitable; others are not. This is decided at assessment."]],
    related: ["pigmentation", "chemical-peels"],
  },
  {
    slug: "skin-rejuvenation", title: "Skin Rejuvenation", kicker: "VIII — Quiet radiance", image: heroPortrait,
    summary: "Programmes combining medical skincare and in-clinic treatments for skin quality, hydration and luminosity.",
    concerns: ["Dehydration", "Loss of radiance", "Fine lines", "Skin quality"],
    suitability: "Adults seeking healthier-looking skin with natural, gradual results.",
    process: ["Skin-quality consultation", "Personalised programme", "Treatments over time", "Seasonal review"],
    preparation: "Depends on the selected treatments; guidance is given at consultation.",
    aftercare: "Consistent skincare and sun protection sustain results.",
    risks: "Specific to each treatment, discussed in full before consent.",
    faqs: [["Will I look different?", "The aim is healthier skin, not a changed face."]],
    related: ["chemical-peels", "microneedling"],
  },
  {
    slug: "aesthetic-consultation", title: "Aesthetic Consultation", kicker: "IX — A considered conversation", image: interior,
    summary: "An unhurried consultation to discuss goals, options and whether treatment is appropriate at all.",
    concerns: ["Ageing concerns", "Facial balance", "Skin quality", "Treatment planning"],
    suitability: "Adults considering aesthetic treatment. Some people are advised that no treatment is the best choice.",
    process: ["Goals and medical history", "Facial and skin assessment", "Options, risks and costs", "Time to reflect before any treatment"],
    preparation: "Consider what matters to you and bring photos only if helpful for discussion.",
    aftercare: "You will receive a written summary of the options discussed.",
    risks: "None from the consultation itself. No treatment is performed on the same day unless agreed.",
    faqs: [["Is there pressure to book?", "No. A cooling-off period is part of our process."]],
    related: ["skin-rejuvenation", "medical-dermatology"],
  },
];

export const concerns = [
  { slug: "acne", title: "Acne", text: "Inflamed or congested breakouts at any age, influenced by hormones, genetics and skincare.", treatments: ["acne-care", "chemical-peels"], article: "reading-your-breakouts" },
  { slug: "scarring", title: "Scarring", text: "Textural changes left by acne, injury or surgery — rolling, boxcar or ice-pick in type.", treatments: ["microneedling", "acne-care"], article: "reading-your-breakouts" },
  { slug: "pigmentation", title: "Pigmentation", text: "Melasma, sun spots and post-inflammatory marks that create uneven tone.", treatments: ["pigmentation", "laser-treatments"], article: "light-and-melanin" },
  { slug: "sensitive", title: "Sensitive Skin", text: "Skin that stings, burns or reacts easily — often a sign of barrier disruption.", treatments: ["medical-dermatology"], article: "the-quiet-barrier" },
  { slug: "redness", title: "Redness", text: "Flushing, rosacea and visible vessels across the cheeks and nose.", treatments: ["medical-dermatology", "laser-treatments"], article: "the-quiet-barrier" },
  { slug: "ageing", title: "Ageing", text: "Changes in texture, elasticity and radiance that arrive with time and light.", treatments: ["skin-rejuvenation", "aesthetic-consultation"], article: "light-and-melanin" },
  { slug: "hair-loss", title: "Hair Loss", text: "Thinning, shedding or patchy loss with many possible causes.", treatments: ["hair-scalp"], article: "the-scalp-is-skin" },
  { slug: "scalp", title: "Scalp Conditions", text: "Flaking, itching and inflammation of the scalp.", treatments: ["hair-scalp", "medical-dermatology"], article: "the-scalp-is-skin" },
];

export type Article = { slug: string; title: string; topic: string; dek: string; image: string; read: string; body: string[] };

export const articles: Article[] = [
  { slug: "light-and-melanin", title: "Light and Melanin", topic: "Pigmentation", dek: "Why sun protection is the quiet foundation of every pigment plan.", image: profile, read: "6 min",
    body: ["Pigment is skin's response to light, heat and inflammation. For many people, especially those with deeper skin tones, it is also the concern most likely to return.", "Daily broad-spectrum sunscreen, applied generously and reapplied, does more for even tone than any single procedure.", "In clinic, we choose treatments that respect the skin's tendency to over-respond — sometimes that means going slower, and sometimes it means not treating at all."] },
  { slug: "reading-your-breakouts", title: "Reading Your Breakouts", topic: "Acne", dek: "Where, when and how acne appears can tell a dermatologist a great deal.", image: prism, read: "5 min",
    body: ["Acne is not a single condition. Comedonal, inflammatory and hormonal patterns respond to different approaches.", "Treating active acne early is the most effective way to reduce future scarring.", "If over-the-counter products haven't helped within three months, a medical assessment is worthwhile."] },
  { slug: "the-quiet-barrier", title: "The Quiet Barrier", topic: "Sensitive Skin", dek: "A gentler routine is often the most effective one.", image: serum, read: "4 min",
    body: ["The skin barrier keeps water in and irritants out. When it is disrupted, almost everything stings.", "Fewer products, fragrance-free formulas and patience are usually the first prescription.", "Persistent redness or burning deserves assessment — rosacea and dermatitis can look alike."] },
  { slug: "the-scalp-is-skin", title: "The Scalp Is Skin", topic: "Hair & Scalp", dek: "Hair health begins with an examination, not a supplement.", image: hands, read: "5 min",
    body: ["Shedding can follow illness, stress, childbirth or nutritional changes, often months later.", "Patterned thinning has different causes and treatments from sudden shedding.", "A dermatologist can examine the scalp, arrange tests and explain realistic timelines."] },
];

export const findTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
export const findArticle = (slug: string) => articles.find((a) => a.slug === slug);
