import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/aurelle/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "Terms of Use — Aurelle" },
    { name: "description", content: 'Terms governing the use of the Aurelle website.' },
    { property: "og:title", content: "Terms of Use — Aurelle" },
    { property: "og:description", content: 'Terms governing the use of the Aurelle website.' },
  ] }),
  component: () => <LegalPage title="Terms of Use" sections={[['Use of this site','Content is general information only and may change without notice.'],['Intellectual property','Text and imagery belong to Aurelle or its licensors.'],['Liability','[Clinic to complete with legal advice.]']]} />,
});
