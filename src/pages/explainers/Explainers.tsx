import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Building2, Compass, Search, Sparkles } from "lucide-react";
import { ExplainerCard, EmptyExplainerState } from "@/components/explainers/ExplainerCard";
import {
  EXPLAINER_CATEGORIES,
  EXPLAINER_PATH_OPTIONS,
  EXPLAINERS,
  searchKoshContent,
} from "@/data/explainers";
import { EMPLOYER_PACKS } from "@/data/explainers/packs";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function Explainers() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const searchResults = useMemo(() => searchKoshContent(query), [query]);

  useDocumentTitle(
    "Kosh Explainers — fast answers for real money questions",
    "Short, Bangladesh-first explainers for the moments when a full module is too much and random advice is too risky.",
  );
  const featured = EXPLAINERS.slice(0, 6);
  const recent = [...EXPLAINERS].sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated)).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 pb-20">
        <button
          onClick={() => navigate("/")}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground/55 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </button>

        <section className="space-y-5">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary/70">Kosh Explainers</p>
            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              Fast answers for real money questions.
            </h1>
            <p className="text-base leading-relaxed text-foreground/65">
              Short, Bangladesh-first explainers for the moments when a full module is too much and random advice is too risky.
            </p>
          </div>

          <div className="relative max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/35" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search FDR, remittance, credit, gold..."
              className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-primary/50"
            />
          </div>
        </section>

        {query.trim() && (
          <section className="mt-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">Search results</p>
            {searchResults.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2">
                {searchResults.map((result) => (
                  <Link
                    key={`${result.type}-${result.href}`}
                    to={result.href}
                    className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                        {result.badge}
                      </span>
                      <span className="text-xs text-foreground/45">{result.meta}</span>
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-foreground">{result.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-foreground/60">{result.subtitle}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyExplainerState query={query} />
            )}
          </section>
        )}

        <section className="mt-8 grid gap-3 md:grid-cols-2">
          <Link
            to="/path"
            className="group relative flex flex-col gap-3 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 to-primary/5 p-5 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary/70">New</p>
                <h2 className="text-base font-black leading-tight text-foreground">Find your path</h2>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-foreground/65">
              Three quick questions and we'll point you straight at the right explainer or tool.
              Skip the browse.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
              Start the wizard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          <Link
            to="/explainers/employer"
            className="group relative flex flex-col gap-3 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-amber-500/10 via-card to-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-card text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/45">
                  Workplace & NGO
                </p>
                <h2 className="text-base font-black leading-tight text-foreground">
                  Education packs for your team
                </h2>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-foreground/65">
              {EMPLOYER_PACKS.length} ready-to-deploy bundles for RMG factories, NGO programs, and
              corporate teams. Complete a pack to earn a 100-mango bonus.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
              View packs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-5">
          {EXPLAINER_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const count = EXPLAINERS.filter((explainer) => explainer.category === category.id).length;
            return (
              <Link
                key={category.id}
                to={category.path}
                className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
              >
                <Icon className="h-5 w-5 text-primary" />
                <p className="mt-4 text-sm font-bold text-foreground">{category.shortLabel}</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/55">{category.description}</p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-foreground/35">{count} explainers</p>
              </Link>
            );
          })}
        </section>

        <section className="mt-10 rounded-3xl border border-primary/20 bg-primary/8 p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-xs font-bold uppercase tracking-widest text-primary/70">Choose your path</p>
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-3">
            {EXPLAINER_PATH_OPTIONS.map((option) => (
              <button
                key={`${option.category}-${option.tag}`}
                type="button"
                onClick={() => navigate(option.category === "worker-wise" ? "/worker-wise" : `/explainers/${option.category}?tag=${encodeURIComponent(option.tag)}`)}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
              >
                <span>{option.label}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-foreground/35" />
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black text-foreground">Featured explainers</h2>
            <Link to="/explainers/scenario" className="text-sm font-semibold text-primary">
              View all
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((explainer) => (
              <ExplainerCard key={explainer.id} explainer={explainer} />
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-black text-foreground">Recently updated</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {recent.map((explainer) => (
              <ExplainerCard key={explainer.id} explainer={explainer} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
