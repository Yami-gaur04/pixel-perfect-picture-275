import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/aurelle/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy — Aurelle" },
    { name: "description", content: 'How Aurelle collects and protects personal and health information.' },
    { property: "og:title", content: "Privacy Policy — Aurelle" },
    { property: "og:description", content: 'How Aurelle collects and protects personal and health information.' },
  ] }),
  component: () => <LegalPage title="Privacy Policy" sections={[['Information we collect','[Clinic to complete] Contact details, appointment preferences and, at consultation, medical information you choose to share.'],['How we use it','To arrange and deliver care, and to contact you about your appointments.'],['Your rights','You may request access, correction or deletion of your data by contacting the clinic.']]} />,
});
