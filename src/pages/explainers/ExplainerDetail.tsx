import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Calculator, Clock3, ExternalLink as ExternalLinkIcon, Sparkles } from "lucide-react";
import { ExplainerActions } from "@/components/explainers/ExplainerActions";
import { ExplainerCard } from "@/components/explainers/ExplainerCard";
import { ExplainerHeroVisual } from "@/components/explainers/ExplainerHeroVisual";
import { MarkdownLite } from "@/components/explainers/MarkdownLite";
import {
  CALCULATOR_LINKS,
  EXPLAINERS,
  getExplainer,
  getExplainerCategoryMeta,
  getRelatedExplainers,
  resolveModuleTitle,
} from "@/data/explainers";
import { markExplainerAction } from "@/lib/explainerProgress";
import { db } from "@/lib/supabase";
import { usePointsStore } from "@/store/pointsStore";

export default function ExplainerDetail() {
  const navigate = useNavigate();
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const explainer = getExplainer(category, slug);
  const { addPoints } = usePointsStore();
  const [readAwarded, setReadAwarded] = useState(false);

  const related = useMemo(() => (explainer ? getRelatedExplainers(explainer) : []), [explainer]);

  useEffect(() => {
    if (!explainer) return;
    const current = explainer;
    db.trackToolUsage(`explainer:view:${current.id}`);
    function onScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      if (progress < 0.8 || readAwarded) return;
      const { firstTime } = markExplainerAction(current.id, "read");
      if (firstTime) addPoints(current.mangoReward, `Read explainer: ${current.title}`);
      setReadAwarded(true);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [addPoints, explainer, readAwarded]);

  if (!explainer) {
    return (
      <div className="min-h-screen bg-background px-4 py-12 text-center">
        <p className="text-foreground/60">Explainer not found.</p>
        <Link to="/explainers" className="mt-4 inline-block text-sm font-semibold text-primary">
          Back to explainers
        </Link>
      </div>
    );
  }

  const meta = getExplainerCategoryMeta(explainer.category);
  const workerWise = explainer.category === "worker-wise";
  const bodyFont = workerWise ? "font-bangla" : "";
  const sibling = explainer.siblingExplainerSlug
    ? EXPLAINERS.find((item) => item.slug === explainer.siblingExplainerSlug)
    : undefined;

  return (
    <div className={`min-h-screen bg-background ${bodyFont}`}>
      <div className="mx-auto max-w-3xl px-4 py-8 pb-24">
        <button
          onClick={() => navigate(explainer.category === "worker-wise" ? "/worker-wise" : `/explainers/${explainer.category}`)}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground/55 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {meta.shortLabel}
        </button>

        <header className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
              {meta.shortLabel}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-[11px] font-semibold text-foreground/50">
              <Clock3 className="h-3 w-3" />
              {explainer.readingTimeMinutes} min
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-[11px] font-semibold text-primary">
              <Sparkles className="h-3 w-3" />
              +{explainer.mangoReward}
            </span>
            {sibling && (
              <div className="ml-auto inline-flex overflow-hidden rounded-full border border-border text-[11px] font-bold">
                <span className="bg-primary px-3 py-1 text-primary-foreground">
                  {explainer.language === "bn" ? "বাংলা" : "English"}
                </span>
                <Link
                  to={`/explainers/${sibling.category}/${sibling.slug}`}
                  className="px-3 py-1 text-foreground/55 hover:bg-card"
                >
                  {sibling.language === "bn" ? "বাংলা" : "English"}
                </Link>
              </div>
            )}
          </div>

          <div>
            <h1 className={`${workerWise ? "text-4xl" : "text-3xl sm:text-4xl"} font-black tracking-tight text-foreground`}>
              {explainer.title}
            </h1>
            <p className="mt-3 text-sm text-foreground/45">Updated {explainer.lastUpdated}</p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/8 p-4">
            <p className={`${workerWise ? "text-lg" : "text-sm"} font-semibold leading-relaxed text-foreground`}>
              {explainer.tldr}
            </p>
          </div>

          <ExplainerHeroVisual explainer={explainer} />
        </header>

        {workerWise && (
          <div className="mt-5 rounded-2xl border border-border bg-card p-4">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-base font-bold text-primary-foreground"
            >
              <BookOpen className="h-5 w-5" />
              অডিও আসছে শীঘ্রই
            </button>
          </div>
        )}

        <main className="mt-8 space-y-8">
          {explainer.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className={`${workerWise ? "text-2xl" : "text-xl"} font-black text-foreground`}>{section.heading}</h2>
              <MarkdownLite text={section.body} compact={workerWise} />
            </section>
          ))}
        </main>

        <section className="mt-8 rounded-2xl border border-primary/25 bg-primary/8 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-primary/70">{workerWise ? "আজকের কাজ" : "Action step"}</p>
          <p className={`${workerWise ? "text-lg" : "text-sm"} mt-2 leading-relaxed text-foreground`}>{explainer.actionStep}</p>
        </section>

        <section className="mt-6">
          <ExplainerActions explainer={explainer} />
        </section>

        {(explainer.relatedModules.length > 0 || explainer.relatedCalculators.length > 0) && (
          <section className="mt-8 grid gap-3 md:grid-cols-2">
            {explainer.relatedModules.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-bold text-foreground">Go deeper</h2>
                </div>
                <div className="mt-3 space-y-2">
                  {explainer.relatedModules.map((id) => (
                    <Link key={id} to={`/module/${id}`} className="block rounded-xl border border-border bg-background/60 px-3 py-2 text-sm font-semibold text-foreground/75 hover:border-primary/40">
                      {resolveModuleTitle(id)}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {explainer.relatedCalculators.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-bold text-foreground">Useful tools</h2>
                </div>
                <div className="mt-3 space-y-2">
                  {explainer.relatedCalculators.map((id) => {
                    const item = CALCULATOR_LINKS[id];
                    if (!item) return null;
                    return (
                      <Link key={id} to={item.href} className="block rounded-xl border border-border bg-background/60 px-3 py-2 text-sm font-semibold text-foreground/75 hover:border-primary/40">
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-10 space-y-3">
            <h2 className="text-xl font-black text-foreground">Related explainers</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {related.map((item) => (
                <ExplainerCard key={item.id} explainer={item} />
              ))}
            </div>
          </section>
        )}

        {explainer.externalLinks && explainer.externalLinks.length > 0 && (
          <section className="mt-8 rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-bold text-foreground">Verify with official sources</h2>
            <p className="mt-1 text-xs leading-relaxed text-foreground/55">
              External links open in a new tab. Kosh has no affiliation with these sites.
            </p>
            <div className="mt-3 space-y-2">
              {explainer.externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm hover:border-primary/40"
                >
                  <ExternalLinkIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0">
                    <span className="block font-semibold text-foreground">{link.title}</span>
                    {link.description && (
                      <span className="mt-0.5 block text-xs text-foreground/55">{link.description}</span>
                    )}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8 rounded-2xl border border-border bg-card p-4">
          <p className="text-sm font-semibold text-foreground">Still confused?</p>
          <p className="mt-1 text-xs leading-relaxed text-foreground/55">
            Ask Kosh Assistant about your exact situation from the floating button.
          </p>
        </section>
      </div>
    </div>
  );
}
