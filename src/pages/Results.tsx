import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "@/lib/supabase";
import type { DiagnosticResult } from "@/types/diagnostic";
import { ResultCard } from "@/components/diagnostic/ResultCard";
import { ShareButton } from "@/components/shared/ShareButton";
import { Button } from "@/components/ui/button";
import SignUpNudge from "@/components/shared/SignUpNudge";
import { RotateCcw } from "lucide-react";
import { getRecommendedPath, getWeakestDomain } from "@/lib/scoring";

export default function Results() {
  const navigate = useNavigate();
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  useEffect(() => {
    const saved = db.getDiagnosticResult();
    if (!saved) {
      navigate("/check");
      return;
    }
    setResult(saved);
  }, [navigate]);

  if (!result) return null;
  const path = getRecommendedPath(result.scores.total, result.ageGroup);
  const weakest = getWeakestDomain(result.scores);
  const educationLayer =
    result.level === 0
      ? "Foundation"
      : result.level === 1
      ? "Core system"
      : "Advanced track";
  const startLabel = path.startModuleId.startsWith("z")
    ? `Zone ${path.startModuleId.slice(1, 2)}`
    : path.startModuleId === "1"
    ? "Zone 1"
    : `Module ${path.startModuleId}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <div className="text-center">
          <Link to="/" className="text-xl font-bold text-primary">
            Kosh কোষ
          </Link>
        </div>

        <ResultCard result={result} />

        <div className="space-y-3">
          <Button asChild className="w-full" size="lg">
            <Link to="/auth">Start your Kosh track →</Link>
          </Button>
          <ShareButton
            targetId="kosh-share-card"
            shareText={`আমি Kosh-এ আমার financial level check করলাম — Level ${result.level}! Check yours: app.koshbd.com/check`}
            filename="kosh-result.png"
          />
          <button
            onClick={() => navigate("/check")}
            className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground py-2"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Retake the check
          </button>
          <Link
            to="/path"
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 py-2"
          >
            Want quick answers instead? Try Path Finder →
          </Link>
        </div>

        <div className="bg-primary/5 border border-primary/25 rounded-2xl p-5 space-y-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-primary/60 uppercase tracking-widest">Your education layer</p>
            <p className="font-bold text-foreground">{educationLayer}</p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Recommended start: {path.headline}. Your biggest gap is {weakest.toLowerCase()}, so Kosh will prioritize that first.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              ["Now", startLabel],
              ["Next", result.greyZone.flagged ? "Recovery" : "Tools"],
              ["Soon", "More content"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-border bg-background/50 px-2 py-3">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
                <p className="text-xs font-bold text-foreground mt-1">{value}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Some deeper lessons are still being added during beta. If a topic is missing, tell us — your feedback shapes the next modules.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
          <h3 className="font-semibold text-foreground">What happens next?</h3>
          <div className="space-y-2 text-sm text-foreground/70">
            <div className="flex gap-3">
              <span className="text-primary font-bold mt-0.5">1.</span>
              <span>Create a free account — takes 60 seconds, no card needed</span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary font-bold mt-0.5">2.</span>
              <span>Start your personalized 0→1 track — 8 modules, 10 min each</span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary font-bold mt-0.5">3.</span>
              <span>Retest in 30 days and see your improvement — real numbers, not vibes</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-foreground/30">
          Kosh (কোষ) — No products. No commissions. No hidden agenda.
        </p>
      </div>

      <SignUpNudge
        delay={3000}
        headline="Save your results"
        sub="Free account. See how your score improves over 30 days."
      />
    </div>
  );
}
