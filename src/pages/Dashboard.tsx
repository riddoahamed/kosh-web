import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useProgressStore } from "@/store/progressStore";
import { usePointsStore } from "@/store/pointsStore";
import { db } from "@/lib/supabase";
import { LevelBadge } from "@/components/shared/LevelBadge";
import { getModuleIcon } from "@/data/moduleIcons";
import { Lock, CheckCircle2, Circle, Zap, Flame, Trophy } from "lucide-react";
import type { LevelAssignment } from "@/types/diagnostic";

const CORE_MODULES = [
  { id: "1", title: "Why money feels confusing — the map", minutes: 12 },
  { id: "2", title: "Inflation: why your FDR is quietly losing", minutes: 10 },
  { id: "3", title: "The three buckets", minutes: 11 },
  { id: "4", title: "Hype, scams, and the Grey Zone", minutes: 13 },
  { id: "5", title: "The emergency fund nobody builds", minutes: 10 },
  { id: "6", title: "Real options in Bangladesh (FDR, Sanchaypatra, DPS, gold, DSE)", minutes: 12 },
  { id: "7", title: "Crypto, forex, and what's actually legal in Bangladesh", minutes: 11 },
  { id: "8", title: "Your first money system", minutes: 12 },
];

const RECOVERY_MODULES = [
  { id: "recovery-a", title: "Where are you, actually?", minutes: 10 },
  { id: "recovery-b", title: "Rebuilding from a loss", minutes: 12 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, loadProfile } = useAuthStore();
  const result = db.getDiagnosticResult();
  const greyZoneFlagged = result?.greyZone?.flagged ?? false;
  const { load, isUnlocked, getRecord, allCoreModulesComplete, progress } = useProgressStore();
  const { total: points, streak, load: loadPoints } = usePointsStore();

  useEffect(() => {
    loadProfile();
    load();
    loadPoints();
  }, [loadProfile, load, loadPoints]);

  useEffect(() => {
    if (!profile && !db.getProfile()) {
      navigate("/auth");
    }
  }, [profile, navigate]);

  if (!profile) return null;

  const coreComplete = allCoreModulesComplete();
  const completedCount = CORE_MODULES.filter((m) => progress[m.id]?.status === "completed").length;
  const trackPct = Math.round((completedCount / CORE_MODULES.length) * 100);

  function ModuleCard({
    id, title, minutes, isRecovery = false,
  }: { id: string; title: string; minutes: number; index: number; isRecovery?: boolean }) {
    const unlocked = isUnlocked(id, greyZoneFlagged);
    const record = getRecord(id);
    const completed = record.status === "completed";
    const icon = getModuleIcon(id);

    return (
      <div className="space-y-0">
        <div
          onClick={() => unlocked && navigate(`/module/${id}`)}
          className={`bg-card rounded-xl border p-4 flex items-center gap-3 transition-all ${
            unlocked && !completed
              ? "border-border hover:border-primary/40 cursor-pointer hover:shadow-sm"
              : completed
              ? "border-green-500/30 bg-green-500/5 cursor-pointer"
              : "border-border/50 opacity-50 cursor-default"
          }`}
        >
          {/* Icon */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${icon.bg} ${icon.darkBg}`}>
            {icon.emoji}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-foreground leading-snug">{title}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-muted-foreground">~{minutes} min</span>
              {completed && record.quizScore > 0 && (
                <span className="text-xs text-green-600 font-semibold bg-green-50 rounded-full px-1.5 py-0.5">
                  {record.quizScore}%
                </span>
              )}
            </div>
          </div>

          {/* State icon */}
          {completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
          ) : unlocked ? (
            <Circle className="h-5 w-5 text-border shrink-0" />
          ) : (
            <Lock className="h-4 w-4 text-muted-foreground/40 shrink-0" />
          )}
        </div>

        {/* Prove it button — only on locked non-recovery modules */}
        {!unlocked && !isRecovery && (
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/quiz/${id}`); }}
            className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-primary/70 hover:text-primary py-1.5 transition-colors"
          >
            <Zap className="h-3 w-3" />
            Already know this? Test yourself →
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-background sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/"><img src="/logo.png" alt="Kosh" className="h-8 w-auto" /></Link>
          <div className="flex items-center gap-3">
            {/* Points */}
            <div className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-2.5 py-1 text-xs font-bold">
              <Trophy className="h-3 w-3" />
              {points.toLocaleString()} pts
            </div>
            {/* Streak */}
            {streak > 0 && (
              <div className="flex items-center gap-1 bg-orange-100 text-orange-600 rounded-full px-2.5 py-1 text-xs font-bold">
                <Flame className="h-3 w-3" />
                {streak}d
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* Level + progress card */}
        {result && (
          <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Your level</div>
                <div className="flex items-center gap-3">
                  <LevelBadge level={result.level as LevelAssignment} size="lg" />
                  <span className="font-semibold text-foreground">{result.personalityLabel}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{result.scores.total}%</div>
                <div className="text-xs text-muted-foreground">baseline score</div>
              </div>
            </div>

            {/* Track progress bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Track progress</span>
                <span className="font-semibold text-foreground">{completedCount}/8 modules</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${trackPct}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 30-Day Challenge CTA */}
        <button
          onClick={() => navigate("/challenge")}
          className="w-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-4 hover:border-primary/40 transition-all text-left"
        >
          <span className="text-3xl">🗓️</span>
          <div className="flex-1">
            <div className="font-semibold text-foreground text-sm">30-Day Challenge</div>
            <div className="text-xs text-muted-foreground">Daily actions · +10 points each</div>
          </div>
          <span className="text-primary text-sm font-semibold">Start →</span>
        </button>

        {/* Grey Zone Recovery */}
        {greyZoneFlagged && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-foreground">Grey Zone Recovery</h2>
              <span className="text-xs font-semibold text-violet-600 bg-violet-50 border border-violet-200 rounded-full px-2 py-0.5">
                Unlocks after Module 4
              </span>
            </div>
            {RECOVERY_MODULES.map((mod, i) => (
              <ModuleCard key={mod.id} id={mod.id} title={mod.title} minutes={mod.minutes} index={i} isRecovery />
            ))}
          </div>
        )}

        {/* Core track */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Your 0→1 track</h2>
            {!coreComplete && (
              <button
                onClick={() => navigate("/exam")}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <Zap className="h-3 w-3" />
                Skip the track →
              </button>
            )}
          </div>

          {!coreComplete && (
            <button
              onClick={() => navigate("/exam")}
              className="w-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-3.5 flex items-center gap-3 hover:border-primary/40 transition-all text-left"
            >
              <span className="text-2xl">🎓</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground">Already know this stuff?</div>
                <div className="text-xs text-muted-foreground">Pass the comprehensive exam — unlock all 8 modules instantly</div>
              </div>
              <span className="text-xs font-bold text-primary shrink-0">+400 pts</span>
            </button>
          )}

          {CORE_MODULES.map((mod, i) => (
            <ModuleCard key={mod.id} id={mod.id} title={mod.title} minutes={mod.minutes} index={i} />
          ))}
        </div>

        {/* Track complete CTA */}
        {coreComplete && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-center space-y-3">
            <div className="text-3xl">🎓</div>
            <p className="font-semibold text-foreground">Track complete!</p>
            <p className="text-sm text-muted-foreground">Keep the momentum — do the 30-day challenge and retest on day 30.</p>
            <button
              onClick={() => navigate("/challenge")}
              className="w-full bg-primary text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-primary/90 transition-all"
            >
              Start 30-Day Challenge →
            </button>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground/40 py-2">
          No products. No commissions. No hidden agenda.
        </p>
      </div>
    </div>
  );
}
