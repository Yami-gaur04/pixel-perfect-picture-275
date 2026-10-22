import { describe, expect, it } from "vitest";
import { bookingSchema } from "@/lib/booking";

const future = (days: number) => { const d = new Date(); d.setDate(d.getDate() + days); if (d.getDay() === 0) d.setDate(d.getDate() + 1); return d.toISOString().slice(0, 10); };
const base = { name: "Ana Silva", email: "ana@example.com", phone: "+44 7700 900123", category: "acne-care", mode: "in-person" as const, date: future(3), time: "10:30" as const, consent: true as const };

describe("booking rules", () => {
  it("accepts a complete request", () => expect(bookingSchema.safeParse(base).success).toBe(true));
  it("requires consent", () => expect(bookingSchema.safeParse({ ...base, consent: false }).success).toBe(false));
  it("rejects past dates", () => expect(bookingSchema.safeParse({ ...base, date: "2020-01-01" }).success).toBe(false));
  it("rejects Sundays", () => {
    const d = new Date(); d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7));
    expect(bookingSchema.safeParse({ ...base, date: d.toISOString().slice(0, 10) }).success).toBe(false);
  });
});
