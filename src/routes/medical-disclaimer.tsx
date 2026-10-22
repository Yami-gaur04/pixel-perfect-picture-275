import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/aurelle/LegalPage";

export const Route = createFileRoute("/medical-disclaimer")({
  head: () => ({ meta: [
    { title: "Medical Disclaimer — Aurelle" },
    { name: "description", content: 'Website information is not medical advice and cannot diagnose conditions.' },
    { property: "og:title", content: "Medical Disclaimer — Aurelle" },
    { property: "og:description", content: 'Website information is not medical advice and cannot diagnose conditions.' },
  ] }),
  component: () => <LegalPage title="Medical Disclaimer" sections={[['Not a diagnosis','Information on this website cannot diagnose or treat any condition.'],['Individual results','Outcomes vary. No result is guaranteed.'],['Urgent concerns','For rapidly changing moles or urgent symptoms, seek prompt medical care.'],['Imagery','Photography is editorial and does not depict patients or results unless stated.']]} />,
});
