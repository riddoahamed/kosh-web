import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calculator, GraduationCap, Search, X } from "lucide-react";
import { searchKoshContent, type UnifiedSearchResult } from "@/data/explainers";

const RESULT_META: Record<UnifiedSearchResult["type"], {
  icon: typeof BookOpen;
  label: string;
  className: string;
}> = {
  explainer: {
    icon: BookOpen,
    label: "Explainer",
    className: "bg-primary/10 text-primary border-primary/25",
  },
  module: {
    icon: GraduationCap,
    label: "Module",
    className: "bg-sky-500/10 text-sky-500 border-sky-500/25",
  },
  calculator: {
    icon: Calculator,
    label: "Tool",
    className: "bg-teal-500/10 text-teal-500 border-teal-500/25",
  },
};

// Per-category badge tone for explainer results — gives quick visual scanning
// across categories instead of one undifferentiated gray pill.
const EXPLAINER_BADGE_TONE: Record<string, string> = {
  Scenario: "border-amber-500/40 bg-amber-500/12 text-amber-500",
  Comparison: "border-violet-500/40 bg-violet-500/12 text-violet-500",
  Diaspora: "border-sky-500/40 bg-sky-500/12 text-sky-500",
  "Worker Wise": "border-emerald-500/40 bg-emerald-500/12 text-emerald-500",
  Employer: "border-rose-500/40 bg-rose-500/12 text-rose-500",
};

function badgeToneFor(result: UnifiedSearchResult): string {
  if (result.type === "explainer") {
    return EXPLAINER_BADGE_TONE[result.badge] ?? "border-border text-foreground/45";
  }
  return "border-border text-foreground/45";
}

const QUICK_SEARCHES = ["FDR", "remittance", "scam", "tax", "budget"];

interface GlobalSearchProps {
  className?: string;
  autoFocus?: boolean;
  onNavigateComplete?: () => void;
}

export function GlobalSearch({ className = "", autoFocus = false, onNavigateComplete }: GlobalSearchProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const trimmed = query.trim();
  const results = useMemo(() => (trimmed.length >= 2 ? searchKoshContent(trimmed) : []), [trimmed]);

  useEffect(() => {
    if (!autoFocus) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(id);
  }, [autoFocus]);

  function goTo(result: UnifiedSearchResult) {
    setOpen(false);
    setQuery("");
    navigate(result.href);
    onNavigateComplete?.();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (results[0]) goTo(results[0]);
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/35" />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          placeholder="Search Kosh: FDR, scam, remittance..."
          className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm font-medium text-foreground outline-none transition-all placeholder:text-foreground/35 focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
        />
      </form>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/25">
          {trimmed.length < 2 ? (
            <div className="p-3">
              <p className="px-1 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/35">Try searching</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {QUICK_SEARCHES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      setQuery(item);
                      setOpen(true);
                    }}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/65 transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.map((result) => {
                const meta = RESULT_META[result.type];
                const Icon = meta.icon;
                return (
                  <button
                    key={`${result.type}-${result.href}`}
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      goTo(result);
                    }}
                    className="flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-primary/5"
                  >
                    <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${meta.className}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-bold text-foreground">{result.title}</span>
                        <span className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeToneFor(result)}`}>
                          {result.badge || meta.label}
                        </span>
                      </span>
                      <span className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-foreground/55">{result.subtitle}</span>
                      <span className="mt-1 block text-[11px] font-semibold text-primary/75">{result.meta}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-sm text-foreground/55">
              No match yet. Try a broader word like “saving”, “loan”, or “tax”.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function GlobalSearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] px-4 pt-20">
      <button
        type="button"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        aria-label="Close search"
        onClick={onClose}
      />
      <div className="relative mx-auto max-w-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-1 -top-11 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground/60 transition-colors hover:text-foreground"
          aria-label="Close search"
        >
          <X className="h-4 w-4" />
        </button>
        <GlobalSearch autoFocus onNavigateComplete={onClose} />
      </div>
    </div>
  );
}
