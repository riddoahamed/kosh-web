import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Check, Clock3, Sparkles } from "lucide-react";
import { ExplainerCard } from "@/components/explainers/ExplainerCard";
import {
  getEmployerPack,
  getPackExplainers,
  getPackTotalMinutes,
  isPackAwarded,
  markPackAwarded,
} from "@/data/explainers/packs";
import { getExplainerProgress } from "@/lib/explainerProgress";
import { usePointsStore } from "@/store/pointsStore";

export default function EmployerPackDetail() {
  const navigate = useNavigate();
  const { packSlug } = useParams<{ packSlug: string }>();
  const pack = getEmployerPack(packSlug);
  const { addPoints } = usePointsStore();
  const [readSlugs, setReadSlugs] = useState<Set<string>>(new Set());

  const explainers = useMemo(() => (pack ? getPackExplainers(pack) : []), [pack]);
  const totalMinutes = useMemo(() => (pack ? getPackTotalMinutes(pack) : 0), [pack]);

  useEffect(() => {
    if (!pack) return;
    const next = new Set<string>();
    for (const exp of explainers) {
      if (getExplainerProgress(exp.id).read) next.add(exp.slug);
    }
    setReadSlugs(next);
  }, [pack, explainers]);

  useEffect(() => {
    if (!pack || explainers.length === 0) return;
    const allRead = explainers.every((exp) => readSlugs.has(exp.slug));
    if (allRead && !isPackAwarded(pack.slug)) {
      markPackAwarded(pack.slug);
      addPoints(pack.completionReward, `Pack complete: ${pack.shortLabel} 🎉`);
    }
  }, [pack, explainers, readSlugs, addPoints]);

  if (!pack) {
    return (
      <div className="min-h-screen bg-background px-4 py-12 text-center">
        <p className="text-foreground/60">Pack not found.</p>
        <Link to="/explainers/employer" className="mt-4 inline-block text-sm font-semibold text-primary">
          Back to packs
        </Link>
      </div>
    );
  }

  const Icon = pack.icon;
  const completed = explainers.filter((exp) => readSlugs.has(exp.slug)).length;
  const allRead = completed === explainers.length;
  const awarded = isPackAwarded(pack.slug);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 pb-24">
        <button
          onClick={() => navigate("/explainers/employer")}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground/55 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Workplace packs
        </button>

        <header className={`rounded-3xl border border-border bg-gradient-to-br ${pack.accent} p-6`}>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-card text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/45">
                {pack.languageLabel}
              </p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-foreground">{pack.title}</h1>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{pack.description}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card/70 p-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/45">
                Modules
              </p>
              <p className="mt-1 text-base font-bold text-foreground">{explainers.length}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/70 p-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/45">
                Total time
              </p>
              <p className="mt-1 inline-flex items-center gap-1 text-base font-bold text-foreground">
                <Clock3 className="h-4 w-4 text-primary" />
                {totalMinutes} min
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/70 p-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/45">
                Completion bonus
              </p>
              <p className="mt-1 inline-flex items-center gap-1 text-base font-bold text-primary">
                <Sparkles className="h-4 w-4" />
                +{pack.completionReward}
              </p>
            </div>
          </div>
        </header>

        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/55">
              <BookOpen className="h-4 w-4" />
              Sequence ({completed}/{explainers.length} read)
            </h2>
            {allRead && awarded && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-bold text-primary">
                <Check className="h-3 w-3" />
                Pack complete
              </span>
            )}
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {explainers.map((exp, idx) => (
              <div key={exp.id} className="relative">
                <span
                  className={`absolute -left-2 -top-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 text-[11px] font-black ${
                    readSlugs.has(exp.slug)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground/55"
                  }`}
                >
                  {readSlugs.has(exp.slug) ? <Check className="h-3 w-3" /> : idx + 1}
                </span>
                <ExplainerCard explainer={exp} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-card p-5">
          <p className="text-sm font-semibold text-foreground">How to deploy this pack</p>
          <p className="mt-1 text-xs leading-relaxed text-foreground/55">
            Each explainer has share buttons and a stable URL. Use them in payroll inserts,
            QR-code posters, common-room TV loops, or WhatsApp groups. For branded deployment
            with your organization's logo, contact the institutional team.
          </p>
          <Link
            to="/for-institutions"
            className="mt-3 inline-block text-sm font-bold text-primary"
          >
            For institutions →
          </Link>
        </section>
      </div>
    </div>
  );
}
