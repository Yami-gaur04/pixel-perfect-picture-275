import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/aurelle/LegalPage";

export const Route = createFileRoute("/cancellation-policy")({
  head: () => ({ meta: [
    { title: "Cancellation Policy — Aurelle" },
    { name: "description", content: 'Rescheduling and cancellation terms for Aurelle appointments.' },
    { property: "og:title", content: "Cancellation Policy — Aurelle" },
    { property: "og:description", content: 'Rescheduling and cancellation terms for Aurelle appointments.' },
  ] }),
  component: () => <LegalPage title="Cancellation Policy" sections={[['Notice period','[e.g. 48 hours] notice is requested to cancel or reschedule.'],['Late cancellations','[Clinic to define any fee.]'],['Clinic changes','If we must reschedule, we will contact you as early as possible.']]} />,
});
