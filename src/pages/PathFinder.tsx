import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Compass,
  Flag,
  GraduationCap,
  Globe2,
  RotateCcw,
  Scale,
  Search,
  Users,
  Waypoints,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  getNextQuestion,
  getPathFinderRecommendation,
  pathFinderQ1,
  type PathFinderOption,
  type PathFinderQuestion,
} from "@/data/pathFinder";

const ICONS: Record<string, LucideIcon> = {
  Waypoints,
  Scale,
  Globe2,
  Users,
  GraduationCap,
  Search,
  Flag,
  BadgeCheck,
};

const PATH_FINDER_USE_KEY = "kosh:pathfinder_uses";

function recordPathFinderUse() {
  try {
    const raw = localStorage.getItem(PATH_FINDER_USE_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    list.push(new Date().toISOString());
    localStorage.setItem(PATH_FINDER_USE_KEY, JSON.stringify(list.slice(-25)));
  } catch {
    /* ignore */
  }
}

export default function PathFinder() {
  const navigate = useNavigate();
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);

  const nextQuestion: PathFinderQuestion | null = useMemo(() => {
    if (!q1) return pathFinderQ1;
    if (!q2) return getNextQuestion(q1) ?? null;
    if (!q3) {
      const candidate = getNextQuestion(q1, q2);
      return candidate ?? null;
    }
    return null;
  }, [q1, q2, q3]);

  const recommendation = useMemo(() => {
    if (!q1) return null;
    const needsQ2 = getNextQuestion(q1) !== null;
    const needsQ3 = q2 ? getNextQuestion(q1, q2) !== null : false;
    if (needsQ2 && !q2) return null;
    if (needsQ3 && !q3) return null;
    return getPathFinderRecommendation({ q1, q2: q2 ?? undefined, q3: q3 ?? undefined });
  }, [q1, q2, q3]);

  useEffect(() => {
    if (recommendation) recordPathFinderUse();
  }, [recommendation]);

  function handleSelect(option: PathFinderOption) {
    if (!q1) {
      setQ1(option.id);
      return;
    }
    if (!q2 && getNextQuestion(q1)) {
      setQ2(option.id);
      return;
    }
    setQ3(option.id);
  }

  function reset() {
    setQ1(null);
    setQ2(null);
    setQ3(null);
  }

  function back() {
    if (q3) setQ3(null);
    else if (q2) setQ2(null);
    else if (q1) setQ1(null);
  }

  const stepIndex = (q1 ? 1 : 0) + (q2 ? 1 : 0) + (q3 ? 1 : 0);
  const totalSteps = q1 ? (q2 && getNextQuestion(q1, q2) ? 3 : getNextQuestion(q1) ? 2 : 1) : 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8 pb-20">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground/55 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
            <Compass className="h-3 w-3" />
            Path Finder
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Three quick questions. One direct answer.
          </h1>
          <p className="text-sm leading-relaxed text-foreground/65">
            Skip the browse. Tell us what you came for and we'll point you straight at the right
            explainer or tool.
          </p>
        </header>

        {nextQuestion && (
          <section className="mt-8 space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/45">
                Question {stepIndex + 1} of {Math.max(totalSteps, stepIndex + 1)}
              </p>
              {(q1 || q2 || q3) && (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/55 hover:text-foreground"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Previous
                </button>
              )}
            </div>

            <h2 className="text-xl font-black text-foreground">{nextQuestion.question}</h2>

            <div className="grid gap-3">
              {nextQuestion.options.map((option) => {
                const Icon = option.icon ? ICONS[option.icon] ?? Waypoints : Waypoints;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-foreground">{option.label}</p>
                      {option.description && (
                        <p className="mt-1 text-xs leading-relaxed text-foreground/55">
                          {option.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="mt-2.5 h-4 w-4 shrink-0 text-foreground/35" />
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {!nextQuestion && recommendation && (
          <section className="mt-8 space-y-5">
            <div className="rounded-3xl border border-primary/30 bg-primary/8 p-6">
              <p className="text-[11px] font-bold uppercase tracking-widest text-primary/70">
                Your match
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                {recommendation.primaryLabel}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {recommendation.primaryReason}
              </p>
              <Link
                to={recommendation.primaryHref}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
              >
                Take me there
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {recommendation.alternatives.length > 0 && (
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/45">
                  Other useful options
                </p>
                <div className="grid gap-2">
                  {recommendation.alternatives.map((alt) => (
                    <Link
                      key={alt.href}
                      to={alt.href}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-foreground">{alt.label}</span>
                        <span className="block text-[11px] uppercase tracking-widest text-foreground/40">
                          {alt.type}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-foreground/45" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/55 hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              Start over
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
