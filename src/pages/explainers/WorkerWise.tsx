import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2 } from "lucide-react";
import { ExplainerHeroVisual } from "@/components/explainers/ExplainerHeroVisual";
import { getExplainersByCategory } from "@/data/explainers";

export default function WorkerWise() {
  const navigate = useNavigate();
  const explainers = getExplainersByCategory("worker-wise");

  return (
    <div className="min-h-screen bg-background font-bangla">
      <div className="mx-auto max-w-3xl px-4 py-8 pb-20">
        <button
          onClick={() => navigate("/explainers")}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground/55 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Explainers
        </button>

        <header className="rounded-3xl border border-primary/25 bg-primary/10 p-5">
          <p className="text-sm font-bold uppercase tracking-widest text-primary/70">Worker Wise</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-foreground">সহজ ভাষায় টাকার শিক্ষা</h1>
          <p className="mt-3 text-lg leading-relaxed text-foreground/70">
            ছোট লেখা। বড় অক্ষর। দরকারি কথা।
          </p>
        </header>

        <section className="mt-6 grid gap-4">
          {explainers.map((explainer) => (
            <Link
              key={explainer.id}
              to={`/explainers/${explainer.category}/${explainer.slug}`}
              className="rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <ExplainerHeroVisual explainer={explainer} />
              <div className="mt-4">
                <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-primary">
                  <span>{explainer.readingTimeMinutes} মিনিট</span>
                  <span>+{explainer.mangoReward} mangoes</span>
                </div>
                <h2 className="mt-2 text-2xl font-black leading-snug text-foreground">{explainer.title}</h2>
                <p className="mt-2 text-lg leading-relaxed text-foreground/70">{explainer.tldr}</p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/60 px-4 py-3">
                <span className="text-base font-bold text-foreground">পড়ুন</span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/45">
                  <Volume2 className="h-4 w-4" />
                  অডিও শীঘ্রই
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
