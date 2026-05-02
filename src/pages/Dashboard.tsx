import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useProgressStore } from "@/store/progressStore";
import { usePointsStore } from "@/store/pointsStore";
import { db } from "@/lib/supabase";
import { LevelBadge } from "@/components/shared/LevelBadge";
import { DemoBanner } from "@/components/shared/DemoBanner";
import { getModuleIcon } from "@/data/moduleIcons";
import { ZoneIcon, ZONE_ACCENT } from "@/components/shared/ZoneIcon";
import { ZONES } from "@/data/zones";
import { ZONE_MODULE_ORDER } from "@/data/modules";
import {
  Lock, CheckCircle2, Circle, Zap, Flame,
  ChevronDown, ChevronUp, Trophy, ArrowRight, BookOpen,
} from "lucide-react";
import type { LevelAssignment } from "@/types/diagnostic";

// ── Core track data ──────────────────────────────────────────────────────────

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

// ── Helpers ──────────────────────────────────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// ── Sub-components ───────────────────────────────────────────────────────────

function CircularProgress({
  pct, size = 80, strokeWidth = 6, accent = "160 90% 45%",
  label, sublabel,
}: {
  pct: number; size?: number; strokeWidth?: number;
  accent?: string; label?: string; sublabel?: string;
}) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={`hsla(${accent} / 0.12)`} strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={`hsl(${accent})`} strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 8px hsla(${accent} / 0.8))`,
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </svg>
      {label && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{ pointerEvents: "none" }}
        >
          <span className="font-bold text-foreground leading-none" style={{ fontSize: size * 0.22 }}>
            {label}
          </span>
          {sublabel && (
            <span className="text-muted-foreground leading-none mt-0.5" style={{ fontSize: size * 0.12 }}>
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ── Module card (used inside zone 1 track) ───────────────────────────────────

function ModuleCard({
  id, title, minutes, isRecovery = false,
  isUnlocked: unlocked, record, onNavigate,
}: {
  id: string; title: string; minutes: number;
  isRecovery?: boolean;
  isUnlocked: boolean;
  record: { status: string; quizScore: number };
  onNavigate: (path: string) => void;
}) {
  const completed = record.status === "completed";
  const icon = getModuleIcon(id);

  return (
    <div className="space-y-0">
      <div
        onClick={() => unlocked && onNavigate(`/module/${id}`)}
        className={`bg-card rounded-xl border p-4 flex items-center gap-3 transition-all ${
          unlocked && !completed
            ? "border-border hover:border-primary/40 cursor-pointer hover:shadow-sm"
            : completed
            ? "border-green-500/30 bg-green-500/5 cursor-pointer"
            : "border-border/50 opacity-50 cursor-default"
        }`}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${icon.bg} ${icon.darkBg}`}>
          {icon.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-foreground leading-snug">{title}</div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground">~{minutes} min</span>
            {completed && record.quizScore > 0 && (
              <span className="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-500/10 rounded-full px-1.5 py-0.5">
                {record.quizScore}%
              </span>
            )}
          </div>
        </div>
        {completed ? (
          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
        ) : unlocked ? (
          <Circle className="h-5 w-5 text-border shrink-0" />
        ) : (
          <Lock className="h-4 w-4 text-muted-foreground/40 shrink-0" />
        )}
      </div>
      {!unlocked && !isRecovery && (
        <button
          onClick={() => onNavigate(`/quiz/${id}`)}
          className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-primary/70 hover:text-primary py-1.5 transition-colors"
        >
          <Zap className="h-3 w-3" />
          Already know this? Test yourself →
        </button>
      )}
    </div>
  );
}

// ── Zone Roadmap node ─────────────────────────────────────────────────────────

function ZoneRoadmapNode({
  zone, completedCount, totalCount, isLocked, isFirst,
  onNavigate,
}: {
  zone: typeof ZONES[0];
  completedCount: number;
  totalCount: number;
  isLocked: boolean;
  isFirst: boolean;
  onNavigate: (path: string) => void;
}) {
  const accent = ZONE_ACCENT[zone.id] ?? "160 90% 45%";
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isComplete = completedCount === totalCount && totalCount > 0;

  return (
    <div className="flex gap-3 items-start">
      {/* Zone icon with glow */}
      <div className="flex flex-col items-center gap-0 shrink-0">
        <ZoneIcon zoneId={zone.id} size="md" />
      </div>

      {/* Content card */}
      <div
        className={`flex-1 rounded-xl border p-4 transition-all ${
          isLocked
            ? "border-border/40 opacity-50"
            : isComplete
            ? "border-border"
            : "border-border hover:border-[hsla(var(--primary)/0.3)] cursor-pointer"
        }`}
        style={
          !isLocked && !isFirst
            ? { background: `hsla(${accent} / 0.04)`, borderColor: `hsla(${accent} / 0.2)` }
            : undefined
        }
        onClick={() => !isLocked && onNavigate(`/zones/${zone.id}`)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: `hsl(${accent})`, opacity: isLocked ? 0.5 : 1 }}
              >
                Zone {zone.number}
              </span>
              {isLocked && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground bg-muted border border-border rounded-full px-1.5 py-0.5">
                  <Lock className="h-2.5 w-2.5" /> Locked
                </span>
              )}
              {isComplete && (
                <span
                  className="text-[10px] font-semibold rounded-full px-1.5 py-0.5"
                  style={{
                    color: `hsl(${accent})`,
                    background: `hsla(${accent} / 0.12)`,
                    border: `1px solid hsla(${accent} / 0.3)`,
                  }}
                >
                  Complete ✓
                </span>
              )}
            </div>
            <div className="text-sm font-semibold text-foreground mt-0.5 leading-snug">{zone.title}</div>
            <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{zone.tagline}</div>
          </div>
          {!isLocked && (
            <ArrowRight
              className="h-4 w-4 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5"
              style={{ color: `hsla(${accent} / 0.5)` }}
            />
          )}
        </div>

        {/* Progress bar */}
        {!isLocked && totalCount > 0 && (
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{completedCount}/{totalCount} modules</span>
              <span className="font-semibold" style={{ color: pct > 0 ? `hsl(${accent})` : undefined }}>
                {pct}%
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  background: `hsl(${accent})`,
                  boxShadow: pct > 0 ? `0 0 8px hsla(${accent} / 0.6)` : undefined,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, loadProfile } = useAuthStore();
  const result = db.getDiagnosticResult();
  const greyZoneFlagged = result?.greyZone?.flagged ?? false;
  const { load, isUnlocked, getRecord, allCoreModulesComplete, progress } = useProgressStore();
  const { total: points, streak, load: loadPoints, checkReengagement } = usePointsStore();

  // Zone 1 track starts collapsed when complete
  const [z1Open, setZ1Open] = useState<boolean | null>(null); // null = not yet determined

  useEffect(() => {
    loadProfile();
    load();
    loadPoints();
    checkReengagement();
  }, [loadProfile, load, loadPoints, checkReengagement]);

  useEffect(() => {
    if (!profile && !db.getProfile()) navigate("/auth");
  }, [profile, navigate]);

  // Set initial collapse state once progress loads
  useEffect(() => {
    if (z1Open === null) {
      const complete = CORE_MODULES.every((m) => progress[m.id]?.status === "completed");
      setZ1Open(!complete);
    }
  }, [progress, z1Open]);

  if (!profile) return null;

  const coreComplete = allCoreModulesComplete();
  const completedCount = CORE_MODULES.filter((m) => progress[m.id]?.status === "completed").length;
  const trackPct = Math.round((completedCount / CORE_MODULES.length) * 100);

  // Find next action: first unlocked, not-completed module
  function findNextModule(): { id: string; title: string; minutes: number } | null {
    // Check zone 1 first
    for (const mod of CORE_MODULES) {
      const rec = getRecord(mod.id);
      if (rec.status !== "completed" && isUnlocked(mod.id, greyZoneFlagged)) return mod;
    }
    // Then zones 2-9
    for (const zone of ZONES.slice(1)) {
      const ids = ZONE_MODULE_ORDER[zone.id] ?? [];
      for (const id of ids) {
        const rec = getRecord(id);
        if (rec.status !== "completed" && isUnlocked(id, greyZoneFlagged)) {
          return { id, title: `${zone.title} — Module ${id.split("-")[1]}`, minutes: 10 };
        }
      }
    }
    return null;
  }

  const nextModule = findNextModule();

  // Zone progress helpers
  function getZoneProgress(zoneId: string): { done: number; total: number } {
    const ids = (ZONE_MODULE_ORDER[zoneId] ?? []).filter((id) =>
      !["recovery-a", "recovery-b"].includes(id)
    );
    const done = ids.filter((id) => progress[id]?.status === "completed").length;
    return { done, total: ids.length };
  }

  const firstName = profile?.name?.split(" ")[0] ?? "there";
  const greeting = getGreeting();

  // Journey steps — 4 milestones
  const JOURNEY_STEPS = [
    { label: "Learn", done: completedCount > 0, active: completedCount === 0 },
    { label: "Save", done: coreComplete, active: completedCount > 0 && !coreComplete },
    { label: "Invest", done: false, active: false },
    { label: "Grow", done: false, active: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DemoBanner />

      {/* Nav */}
      <nav className="border-b border-border bg-background sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/"><img src="/logo.png" alt="Kosh" className="h-8 w-auto" /></Link>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/zones")}
              className="text-xs font-semibold text-foreground/60 hover:text-primary transition-colors">
              Zones
            </button>
            <button onClick={() => navigate("/store")}
              className="text-xs font-semibold text-foreground/60 hover:text-primary transition-colors">
              Store
            </button>
            <button
              onClick={() => navigate("/store")}
              className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-2.5 py-1 text-xs font-bold hover:bg-primary/20 transition-all"
            >
              <span>🥭</span>
              {points.toLocaleString()}
            </button>
            {streak > 0 && (
              <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 rounded-full px-2.5 py-1 text-xs font-bold">
                <Flame className="h-3 w-3" />
                {streak}d
              </div>
            )}
            <button
              onClick={() => navigate("/profile")}
              className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary hover:bg-primary/25 transition-all shrink-0"
            >
              {profile?.name?.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase() ?? "?"}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* ── Hero card ──────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl border border-border p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsla(160,90%,45%,0.07) 0%, hsla(0,0%,7%,1) 60%)",
          }}
        >
          {/* Top glow */}
          <div
            className="absolute inset-x-0 top-0 h-24 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 30% 0%, hsla(160,90%,45%,0.12) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 flex items-start justify-between gap-4">
            {/* Left: greeting + journey steps */}
            <div className="flex-1 min-w-0 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">{greeting},</p>
                <h1 className="text-xl font-bold text-foreground tracking-tight leading-tight">
                  {firstName} 👋
                </h1>
                {!result && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Take the money check to unlock your level.
                  </p>
                )}
              </div>

              {/* Journey steps */}
              <div className="flex items-center gap-0">
                {JOURNEY_STEPS.map((step, i) => (
                  <div key={step.label} className="flex items-center">
                    <div className="flex flex-col items-center gap-0.5">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all"
                        style={
                          step.done
                            ? { borderColor: "hsl(160 90% 45%)", background: "hsla(160,90%,45%,0.2)", color: "hsl(160 90% 45%)" }
                            : step.active
                            ? { borderColor: "hsl(160 90% 45%)", background: "transparent", color: "hsl(160 90% 45%)", boxShadow: "0 0 8px hsla(160,90%,45%,0.5)" }
                            : { borderColor: "hsl(var(--border))", background: "transparent", color: "hsl(var(--muted-foreground))" }
                        }
                      >
                        {step.done ? "✓" : i + 1}
                      </div>
                      <span
                        className="text-[9px] font-semibold uppercase tracking-wide"
                        style={
                          step.done || step.active
                            ? { color: "hsl(160 90% 45%)" }
                            : { color: "hsl(var(--muted-foreground))", opacity: 0.5 }
                        }
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < JOURNEY_STEPS.length - 1 && (
                      <div
                        className="h-px w-6 mb-3 mx-0.5 transition-all"
                        style={{
                          background: step.done
                            ? "hsl(160 90% 45%)"
                            : "hsl(var(--border))",
                          opacity: step.done ? 1 : 0.3,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: level ring */}
            {result ? (
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <CircularProgress
                  pct={trackPct}
                  size={84}
                  strokeWidth={7}
                  accent="160 90% 45%"
                  label={`${trackPct}%`}
                  sublabel="complete"
                />
                <LevelBadge level={result.level as LevelAssignment} size="sm" />
              </div>
            ) : (
              <button
                onClick={() => navigate("/check")}
                className="shrink-0 flex flex-col items-center gap-1.5 rounded-xl border border-primary/25 px-3 py-3 text-center hover:border-primary/50 transition-all"
                style={{ background: "hsla(160,90%,45%,0.05)" }}
              >
                <span className="text-2xl">📊</span>
                <span className="text-[10px] font-semibold text-primary leading-tight">Check your<br />level</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Continue Learning ──────────────────────────────────────────── */}
        {nextModule && (
          <button
            onClick={() => navigate(`/module/${nextModule.id}`)}
            className="w-full flex items-center gap-3 rounded-xl border border-primary/20 p-4 text-left hover:border-primary/40 transition-all group"
            style={{ background: "hsla(160,90%,45%,0.06)" }}
          >
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "hsla(160,90%,45%,0.15)", border: "1px solid hsla(160,90%,45%,0.3)", boxShadow: "0 0 14px hsla(160,90%,45%,0.3)" }}
            >
              <BookOpen className="h-5 w-5 text-primary" style={{ filter: "drop-shadow(0 0 4px hsla(160,90%,45%,0.7))" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-primary/60">Continue Learning</div>
              <div className="text-sm font-semibold text-foreground leading-snug truncate">{nextModule.title}</div>
              <div className="text-xs text-muted-foreground">~{nextModule.minutes} min</div>
            </div>
            <ArrowRight className="h-4 w-4 text-primary/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        )}

        {/* ── Congratulations banner (zone 1 complete) ──────────────────── */}
        {coreComplete && (
          <div
            className="rounded-2xl border p-5 space-y-2 relative overflow-hidden"
            style={{
              borderColor: "hsla(160,90%,45%,0.35)",
              background: "linear-gradient(135deg, hsla(160,90%,45%,0.1) 0%, hsla(0,0%,7%,1) 70%)",
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none"
              style={{ background: "hsla(160,90%,45%,0.12)" }} />
            <div className="relative flex items-start gap-3">
              <Trophy className="h-6 w-6 shrink-0 mt-0.5" style={{ color: "hsl(160 90% 45%)", filter: "drop-shadow(0 0 6px hsla(160,90%,45%,0.8))" }} />
              <div>
                <div className="font-bold text-foreground">Zone 1 complete! 🎉</div>
                <div className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                  You've built your money foundation. All advanced zones are now unlocked — keep going!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Zone 1 track (collapsible) ─────────────────────────────────── */}
        <div className="space-y-2">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ZoneIcon zoneId="zone-1" size="sm" />
              <div>
                <h2 className="font-semibold text-foreground text-sm leading-tight">Zone 1 · Money Foundations</h2>
                <p className="text-xs text-muted-foreground">{completedCount}/8 modules · {trackPct}% done</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!coreComplete && (
                <button
                  onClick={() => navigate("/exam")}
                  className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Zap className="h-3 w-3" />
                  Skip →
                </button>
              )}
              <button
                onClick={() => setZ1Open((o) => !o)}
                className="h-7 w-7 rounded-lg border border-border flex items-center justify-center hover:border-primary/40 transition-all"
              >
                {z1Open
                  ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                  : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
              </button>
            </div>
          </div>

          {/* Collapsible content */}
          {z1Open && (
            <div className="space-y-2">
              {/* Skip exam CTA (only if not complete) */}
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
                  <span className="text-xs font-bold text-primary shrink-0">+400 🥭</span>
                </button>
              )}

              {/* Grey Zone Recovery */}
              {greyZoneFlagged && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">Grey Zone Recovery</span>
                    <span className="text-xs font-semibold text-violet-500 bg-violet-500/10 border border-violet-500/25 rounded-full px-2 py-0.5">
                      Unlocks after Module 4
                    </span>
                  </div>
                  {RECOVERY_MODULES.map((mod) => (
                    <ModuleCard
                      key={mod.id}
                      id={mod.id}
                      title={mod.title}
                      minutes={mod.minutes}
                      isRecovery
                      isUnlocked={isUnlocked(mod.id, greyZoneFlagged)}
                      record={getRecord(mod.id)}
                      onNavigate={navigate}
                    />
                  ))}
                </div>
              )}

              {/* Core modules */}
              {CORE_MODULES.map((mod) => (
                <ModuleCard
                  key={mod.id}
                  id={mod.id}
                  title={mod.title}
                  minutes={mod.minutes}
                  isUnlocked={isUnlocked(mod.id, greyZoneFlagged)}
                  record={getRecord(mod.id)}
                  onNavigate={navigate}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Zone Roadmap ───────────────────────────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-foreground">Your Learning Journey</h2>
            {!coreComplete && (
              <span className="text-[10px] font-semibold text-muted-foreground bg-muted border border-border rounded-full px-2 py-0.5">
                Unlocks after Zone 1
              </span>
            )}
          </div>

          {/* Roadmap nodes connected by vertical line */}
          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-[21px] top-10 bottom-10 w-px pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, hsla(160,90%,45%,0.4), hsla(262,83%,58%,0.3), hsla(347,77%,50%,0.2), hsla(0,0%,20%,0.15))",
              }}
            />

            <div className="space-y-4">
              {ZONES.slice(1).map((zone) => {
                const { done, total } = getZoneProgress(zone.id);
                const isLocked = !coreComplete;
                return (
                  <ZoneRoadmapNode
                    key={zone.id}
                    zone={zone}
                    completedCount={done}
                    totalCount={total}
                    isLocked={isLocked}
                    isFirst={false}
                    onNavigate={navigate}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* ── 30-Day Challenge ───────────────────────────────────────────── */}
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

        <p className="text-center text-xs text-muted-foreground/40 py-2">
          No products. No commissions. No hidden agenda.
        </p>
      </div>
    </div>
  );
}
