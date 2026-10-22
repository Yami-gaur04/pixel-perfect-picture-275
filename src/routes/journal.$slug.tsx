import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CTA } from "@/components/aurelle/Shell";
import { articles, findArticle } from "@/lib/content";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    if (!findArticle(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const a = loaderData ? findArticle(loaderData.slug) : undefined;
    if (!a) return { meta: [{ title: "Article unavailable — Aurelle" }, { name: "robots", content: "noindex" }] };
    return { meta: [
      { title: `${a.title} — The Skin Journal` },
      { name: "description", content: a.dek },
      { property: "og:title", content: a.title },
      { property: "og:description", content: a.dek },
      { property: "og:type", content: "article" },
    ] };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <h1 className="font-display text-5xl italic">Article not found</h1>
      <Link to="/journal" className="eyebrow border-b pb-1">Back to the Journal</Link>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useLoaderData();
  const a = findArticle(slug)!;
  const related = articles.filter((x) => x.slug !== slug).slice(0, 2);
  return (
    <>
      <article>
        <header className="grid grid-cols-12 gap-6 px-5 pb-12 pt-32 sm:px-10">
          <div className="col-span-12 md:col-span-6">
            <Link to="/journal" className="eyebrow text-muted-foreground">← The Skin Journal</Link>
            <p className="eyebrow mt-10 text-muted-foreground">{a.topic} · {a.read}</p>
            <h1 className="mt-4 font-display text-7xl leading-[0.9] sm:text-8xl">{a.title}</h1>
            <p className="mt-6 font-display text-2xl italic text-muted-foreground">{a.dek}</p>
            <p className="eyebrow mt-10">By the Aurelle clinical team · <span className="text-muted-foreground">[Reviewer name, credentials]</span></p>
          </div>
          <img src={a.image} alt="" className="col-span-12 h-[70vh] w-full object-cover md:col-span-6" />
        </header>
        <div className="mx-auto max-w-2xl space-y-6 px-5 py-16 text-lg leading-[1.8]">
          {a.body.map((p, i) => <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-none" : ""}>{p}</p>)}
          <p className="border-t pt-6 text-sm text-muted-foreground">This article is general information and must be reviewed by a qualified clinician before publication. It is not a substitute for individual medical advice.</p>
        </div>
      </article>
      <section className="grid gap-8 bg-ivory px-5 py-20 sm:px-10 md:grid-cols-2">
        {related.map((r) => (
          <Link key={r.slug} to="/journal/$slug" params={{ slug: r.slug }} className="group flex gap-6">
            <img src={r.image} alt="" loading="lazy" className="h-40 w-32 object-cover grayscale group-hover:grayscale-0" />
            <div><p className="eyebrow text-muted-foreground">{r.topic}</p><p className="mt-2 font-display text-3xl group-hover:italic">{r.title}</p></div>
          </Link>
        ))}
      </section>
      <CTA />
    </>
  );
}
