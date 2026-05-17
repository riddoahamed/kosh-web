import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Building2, Sparkles } from "lucide-react";
import { EMPLOYER_PACKS, getPackExplainers, getPackTotalMinutes } from "@/data/explainers/packs";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function EmployerPacks() {
  const navigate = useNavigate();
  useDocumentTitle(
    "Workplace & NGO Education Packs — Kosh",
    "Three ready-to-deploy financial education bundles for RMG factories, NGO programs, and corporate teams.",
  );

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

        <header className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Building2 className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary/70">
                Workplace & NGO Education Packs
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground">
                Financial education for your workforce
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/65">
                Three ready-to-deploy bundles. Pick the pack that fits your audience —
                factory floor, NGO program, or office team. Complete a full pack to earn
                a 100-mango bonus.
              </p>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {EMPLOYER_PACKS.map((pack) => {
            const explainers = getPackExplainers(pack);
            const totalMin = getPackTotalMinutes(pack);
            const Icon = pack.icon;
            return (
              <Link
                key={pack.id}
                to={`/explainers/employer-pack/${pack.slug}`}
                className={`group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${pack.accent} p-5 transition-all hover:border-primary/40 hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-card text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/45">
                      {pack.languageLabel}
                    </p>
                    <h2 className="mt-1 text-base font-black leading-tight text-foreground">
                      {pack.title}
                    </h2>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-foreground/65">{pack.description}</p>

                <div className="rounded-2xl border border-border bg-card/70 p-3">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/45">
                    Audience
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/70">{pack.audience}</p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 text-[11px] font-semibold text-foreground/55">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {explainers.length} modules · {totalMin} min
                  </span>
                  <span className="inline-flex items-center gap-1 text-primary">
                    <Sparkles className="h-3 w-3" />
                    +{pack.completionReward}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                  View pack
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-card p-5">
          <p className="text-sm font-semibold text-foreground">
            Want this content branded and deployed for your organization?
          </p>
          <p className="mt-1 text-xs leading-relaxed text-foreground/55">
            Kosh works with employers, NGOs, and INGOs on white-label deployments —
            posters with QR codes, payroll inserts, common-room TV loops, and custom
            content for your specific workforce.
          </p>
          <Link
            to="/for-institutions"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary"
          >
            For institutions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
