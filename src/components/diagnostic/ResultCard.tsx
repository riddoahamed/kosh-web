import type { DiagnosticResult } from "@/types/diagnostic";
import { PERSONALITY_DESCRIPTIONS } from "@/types/diagnostic";
import { DomainScoreBar } from "@/components/shared/DomainScoreBar";
import { LevelBadge } from "@/components/shared/LevelBadge";
import { getStrongestDomain, getWeakestDomain } from "@/lib/scoring";

interface Props {
  result: DiagnosticResult;
}

// Sharable card — rendered off-screen for html2canvas capture
export function ShareableCard({ result }: Props) {
  return (
    <div
      id="kosh-share-card"
      className="w-[540px] h-[540px] bg-white p-10 flex flex-col justify-between"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="text-2xl font-bold text-primary-600">Kosh কোষ</div>
          <div className="text-xs text-slate-400">Financial Level Check</div>
        </div>
        <div className="text-5xl font-bold text-slate-800 mb-1">
          Level {result.level}
        </div>
        <div className="text-lg text-slate-500 mb-8">
          {PERSONALITY_DESCRIPTIONS[result.level]}
        </div>
        <div className="space-y-4">
          <DomainScoreBar
            label="Knowledge"
            score={result.scores.knowledge}
            color="bg-blue-500"
            delay={100}
          />
          <DomainScoreBar
            label="Behavior"
            score={result.scores.behavior}
            color="bg-emerald-500"
            delay={200}
          />
          <DomainScoreBar
            label="Mindset"
            score={result.scores.confidence}
            color="bg-amber-400"
            delay={300}
          />
        </div>
      </div>
      <div className="text-sm text-slate-400">
        Check yours at{" "}
        <span className="text-primary-600 font-semibold">kosh.app/check</span>
      </div>
    </div>
  );
}

export function ResultCard({ result }: Props) {
  const strongest = getStrongestDomain(result.scores);
  const weakest = getWeakestDomain(result.scores);

  return (
    <div className="space-y-6">
      {/* Main result display */}
      <div className="text-center space-y-2">
        <LevelBadge level={result.level} size="lg" />
        <h2 className="text-3xl font-bold text-foreground">
          You're at Level {result.level}
        </h2>
        <p className="text-muted-foreground text-lg">
          {result.personalityLabel} —{" "}
          {PERSONALITY_DESCRIPTIONS[result.level]}
        </p>
      </div>

      {/* Domain score bars */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
        <DomainScoreBar
          label="Knowledge"
          score={result.scores.knowledge}
          color="bg-blue-500"
          delay={200}
        />
        <DomainScoreBar
          label="Behavior"
          score={result.scores.behavior}
          color="bg-emerald-500"
          delay={400}
        />
        <DomainScoreBar
          label="Mindset"
          score={result.scores.confidence}
          color="bg-amber-400"
          delay={600}
        />
        <div className="pt-2 border-t border-border flex justify-between text-sm text-muted-foreground">
          <span>Total score</span>
          <span className="font-semibold text-foreground">
            {result.scores.total}%
          </span>
        </div>
      </div>

      {/* Personalized gap line */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-sm text-primary">
        Your strongest area is <strong>{strongest}</strong>. Your biggest gap is{" "}
        <strong>{weakest}</strong>. That's the first thing we'll fix.
      </div>

      {/* Grey zone notice */}
      {result.greyZone.flagged && (
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-violet-800">
          <strong>Grey Zone track unlocked.</strong> Based on your answers,
          we'll include a special module for you — honest, no judgment.
        </div>
      )}

      {/* Hidden shareable card for html2canvas */}
      <div
        className="fixed -left-[9999px] -top-[9999px] opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        <ShareableCard result={result} />
      </div>
    </div>
  );
}
