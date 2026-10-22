import { z } from "zod";

export const SLOTS = ["09:30", "10:30", "11:30", "14:00", "15:00", "16:30"] as const;

const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().regex(/^[+\d][\d\s()-]{6,19}$/, "Please enter a valid phone number"),
  category: z.string().min(1, "Please choose a treatment or concern"),
  mode: z.enum(["in-person", "video"]),
  date: z.string().refine((v) => {
    const d = new Date(v + "T00:00:00");
    return !Number.isNaN(d.getTime()) && d > today() && d.getDay() !== 0;
  }, "Choose a future date (we are closed on Sundays)"),
  time: z.enum(SLOTS, { errorMap: () => ({ message: "Choose a time" }) }),
  notes: z.string().max(1000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required to proceed" }) }),
});

export type Booking = z.infer<typeof bookingSchema>;
