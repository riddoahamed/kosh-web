import { useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { ExplainerCard, EmptyExplainerState } from "@/components/explainers/ExplainerCard";
import {
  EXPLAINERS,
  getExplainerCategoryMeta,
  isExplainerCategory,
  searchExplainers,
} from "@/data/explainers";

export default function ExplainerCategory() {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [params, setParams] = useSearchParams();
  const tag = params.get("tag") ?? "";
  const [query, setQuery] = useState("");
  const validCategory = isExplainerCategory(category) ? category : "scenario";
  const meta = getExplainerCategoryMeta(validCategory);
  const Icon = meta.icon;
  const tags = useMemo(
    () => [...new Set(EXPLAINERS.filter((item) => item.category === validCategory).flatMap((item) => item.tags))].slice(0, 16),
    [validCategory],
  );
  const explainers = useMemo(() => {
    const base = searchExplainers(query, validCategory);
    if (!tag) return base;
    return base.filter((explainer) => explainer.tags.includes(tag) || explainer.title.toLowerCase().includes(tag.toLowerCase()));
  }, [validCategory, query, tag]);

  if (!isExplainerCategory(category)) {
    return (
      <div className="min-h-screen bg-background px-4 py-12 text-center">
        <p className="text-foreground/60">Explainer category not found.</p>
        <Link to="/explainers" className="mt-4 inline-block text-sm font-semibold text-primary">
          Back to explainers
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 pb-20">
        <button
          onClick={() => navigate("/explainers")}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground/55 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Explainers
        </button>

        <header className="rounded-3xl border border-border bg-card p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary/70">{meta.shortLabel}</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground">{meta.label}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/65">{meta.description}</p>
            </div>
          </div>
        </header>

        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/35" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${meta.shortLabel.toLowerCase()} explainers`}
              className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-primary/50"
            />
          </div>
          {category === "worker-wise" && (
            <Link
              to="/worker-wise"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-4 text-sm font-bold text-primary-foreground"
            >
              Worker Wise view
            </Link>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setParams({})}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
              !tag ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground/55"
            }`}
          >
            All
          </button>
          {tags.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setParams({ tag: item })}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                tag === item ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground/55"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <section className="mt-6">
          {explainers.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {explainers.map((explainer) => (
                <ExplainerCard key={explainer.id} explainer={explainer} large={category === "worker-wise"} />
              ))}
            </div>
          ) : (
            <EmptyExplainerState query={query || tag} />
          )}
        </section>
      </div>
    </div>
  );
}
