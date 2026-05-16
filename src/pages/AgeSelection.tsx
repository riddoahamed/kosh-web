import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDiagnosticStore } from "@/store/diagnosticStore";
import type { AgeGroup } from "@/types/diagnostic";
import { useAuthStore } from "@/store/authStore";
import { db } from "@/lib/supabase";

const AGE_GROUPS: { id: AgeGroup; title: string; subtitle: string; description: string; icon: string }[] = [
  {
    id: "under_25",
    title: "Under 25",
    subtitle: "First job, getting started",
    description: "You're in the early career phase. Money is starting to make sense — or not.",
    icon: "🌱",
  },
  {
    id: "25_to_35",
    title: "25 to 35",
    subtitle: "Career growing, life decisions ahead",
    description: "You're earning steadily. Big decisions about savings, family, and the future.",
    icon: "🚀",
  },
  {
    id: "over_35",
    title: "35 and up",
    subtitle: "Established, planning the long term",
    description: "You've been managing money for a while. Now it's about optimising and protecting.",
    icon: "🎯",
  },
];

export default function AgeSelection() {
  const navigate = useNavigate();
  const { setAgeGroup } = useDiagnosticStore();
  const { profile, loadProfile } = useAuthStore();

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  function handleSelect(id: AgeGroup) {
    setAgeGroup(id);
    navigate("/check");
  }

  const currentProfile = profile ?? db.getProfile();
  const exitTo = currentProfile ? "/dashboard" : "/";
  const exitLabel = currentProfile ? "← Back to dashboard" : "← Back to home";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-lg w-full mx-auto px-4 py-10 flex flex-col flex-1">

        <div className="mb-6">
          <Link
            to={exitTo}
            className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
          >
            {exitLabel}
          </Link>
        </div>

        <div className="mb-8 space-y-1.5">
          <p className="text-xs font-semibold text-foreground/35 uppercase tracking-widest">
            Before we start
          </p>
          <h1 className="text-2xl font-bold text-foreground leading-tight">
            Where are you in life right now?
          </h1>
          <p className="text-sm text-foreground/60 leading-relaxed">
            We tailor your questions and recommendations to where you are. You can change this anytime.
          </p>
        </div>

        <div className="space-y-3 flex-1">
          {AGE_GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => handleSelect(g.id)}
              className="w-full text-left rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all p-5 space-y-1.5 active:scale-[0.99] group"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{g.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground text-base leading-tight">{g.title}</p>
                  <p className="text-xs font-semibold text-primary/70 mt-0.5">{g.subtitle}</p>
                  <p className="text-sm text-foreground/60 leading-relaxed mt-1">{g.description}</p>
                </div>
                <span className="text-foreground/25 group-hover:text-foreground/60 transition-colors shrink-0 mt-1 text-lg">→</span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-foreground/30 mt-8 leading-relaxed">
          Why are we asking? We tailor your starting questions and recommendations to where you are in life. This doesn't affect your score.
        </p>
      </div>
    </div>
  );
}
