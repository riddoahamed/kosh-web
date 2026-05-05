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

function getGreeting(): { en: string; bn: string } {
  const h = new Date().getHours();
  if (h < 12)  return { en: "Good morning",   bn: "শুভ সকাল" };
  if (h < 17)  return { en: "Good afternoon", bn: "শুভ অপরাহ্ন" };
  return            { en: "Good evening",   bn: "শুভ সন্ধ্যা" };
}

// ── Bangladesh skyline silhouette — line-art motif ──────────────────────────
// Mosque dome → Padma Bridge cables → modern buildings.
// Used as a subtle band behind the hero. Stroke color inherits via currentColor.
function BangladeshSkyline({ className, opacity = 0.22 }: { className?: string; opacity?: number }) {
  return (
    <svg
      viewBox="0 0 400 60"
      preserveAspectRatio="xMidYEnd slice"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Mosque with dome + minaret */}
        <path d="M14,55 L14,40 Q14,30 22,30 Q30,30 30,40 L30,55" />
        <path d="M14,40 Q22,24 30,40" />
        <line x1="22" y1="30" x2="22" y2="22" />
        <circle cx="22" cy="20" r="1.2" />
        <line x1="9"  y1="55" x2="9"  y2="36" />
        <line x1="35" y1="55" x2="35" y2="36" />

        {/* Low-rise blocks with windows */}
        <path d="M48,55 L48,38 L66,38 L66,55" />
        <path d="M51,42 L51,52 M55,42 L55,52 M59,42 L59,52 M63,42 L63,52" />

        {/* Mid-rise tower */}
        <path d="M74,55 L74,28 L92,28 L92,55" />
        <line x1="92" y1="28" x2="92" y2="18" />

        {/* Padma-style cable-stay bridge */}
        <path d="M108,55 L150,22 L192,55" />
        <line x1="150" y1="22" x2="150" y2="55" />
        <line x1="125" y1="55" x2="150" y2="32" />
        <line x1="138" y1="55" x2="150" y2="40" />
        <line x1="162" y1="40" x2="175" y2="55" />
        <line x1="150" y1="32" x2="174" y2="55" />
        <line x1="105" y1="55" x2="195" y2="55" strokeWidth="0.6" opacity="0.6" />

        {/* Skyscraper — slim spire */}
        <path d="M210,55 L210,12 L213,12 L213,9 L217,9 L217,12 L220,12 L220,55" />

        {/* Office tower */}
        <path d="M232,55 L232,32 L252,32 L252,55" />
        <line x1="237" y1="36" x2="237" y2="52" opacity="0.8" />
        <line x1="242" y1="36" x2="242" y2="52" opacity="0.8" />
        <line x1="247" y1="36" x2="247" y2="52" opacity="0.8" />

        {/* Stepped building */}
        <path d="M262,55 L262,42 L272,42 L272,36 L284,36 L284,55" />

        {/* Second bridge tower (right side) */}
        <path d="M298,55 L330,28 L362,55" />
        <line x1="330" y1="28" x2="330" y2="55" />
        <line x1="312" y1="55" x2="330" y2="36" />
        <line x1="346" y1="44" x2="356" y2="55" />

        {/* Tail buildings */}
        <path d="M372,55 L372,38 L386,38 L386,55" />
        <path d="M390,55 L390,46 L398,46 L398,55" />
      </g>
    </svg>
  );
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
  const greeting  = getGreeting();

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
        <div className="brand-hero rounded-2xl p-5 pb-20 relative overflow-hidden">
          {/* Bangladesh skyline — subtle line-art band along the bottom edge */}
          <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none text-cobalt">
            <BangladeshSkyline className="absolute inset-0 w-full h-full" opacity={0.32} />
            {/* Soft fade so it grounds into the card */}
            <div
              className="absolute inset-x-0 bottom-0 h-8"
              style={{ background: "linear-gradient(to top, hsl(var(--card)) 0%, transparent 100%)" }}
            />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-4">
            {/* Left: greeting + journey steps */}
            <div className="flex-1 min-w-0 space-y-3.5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-primary/70">
                  {greeting.en}
                </p>
                <h1 className="text-2xl font-display font-extrabold text-foreground leading-[1.05] tracking-tight mt-1">
                  Hi, <span className="text-primary" style={{ textShadow: "0 0 24px hsla(var(--kosh-lime) / 0.45)" }}>{firstName}</span>
                </h1>
                <p className="text-[13px] font-bangla text-muted-foreground mt-0.5 leading-snug">
                  {greeting.bn} — {result ? "ready to grow today?" : "take the money check to unlock your level."}
                </p>
              </div>

              {/* Journey steps — Lime active, Teal completed for two-tone identity */}
              <div className="flex items-center gap-0">
                {JOURNEY_STEPS.map((step, i) => {
                  const lime = "hsl(var(--kosh-lime))";
                  const teal = "hsl(var(--kosh-teal))";
                  return (
                    <div key={step.label} className="flex items-center">
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all font-display"
                          style={
                            step.done
                              ? { borderColor: teal, background: "hsla(175,100%,42%,0.18)", color: teal, boxShadow: "0 0 10px hsla(175,100%,42%,0.4)" }
                              : step.active
                              ? { borderColor: lime, background: "hsla(87,100%,68%,0.12)", color: lime, boxShadow: "0 0 12px hsla(87,100%,68%,0.55)" }
                              : { borderColor: "hsla(225,29%,97%,0.18)", background: "transparent", color: "hsl(var(--muted-foreground))" }
                          }
                        >
                          {step.done ? "✓" : i + 1}
                        </div>
                        <span
                          className="text-[9px] font-semibold uppercase tracking-wider"
                          style={
                            step.done ? { color: teal }
                            : step.active ? { color: lime }
                            : { color: "hsl(var(--muted-foreground))", opacity: 0.55 }
                          }
                        >
                          {step.label}
                        </span>
                      </div>
                      {i < JOURNEY_STEPS.length - 1 && (
                        <div
                          className="h-px w-7 mb-4 mx-0.5 transition-all"
                          style={{
                            background: step.done ? teal : "hsla(225,29%,97%,0.16)",
                            opacity: step.done ? 0.9 : 1,
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: level ring */}
            {result ? (
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <CircularProgress
                  pct={trackPct}
                  size={88}
                  strokeWidth={7}
                  accent="87 100% 68%"
                  label={`${trackPct}%`}
                  sublabel="complete"
                />
                <LevelBadge level={result.level as LevelAssignment} size="sm" />
              </div>
            ) : (
              <button
                onClick={() => navigate("/check")}
                className="shrink-0 flex flex-col items-center gap-1.5 rounded-xl px-3 py-3 text-center transition-all hover:scale-[1.02] active:scale-95"
                style={{
                  background: "hsla(87,100%,68%,0.10)",
                  border: "1px solid hsla(87,100%,68%,0.35)",
                  boxShadow: "0 0 18px hsla(87,100%,68%,0.18)",
                }}
              >
                <span className="text-2xl">📊</span>
                <span className="text-[10px] font-bold text-primary leading-tight font-display">Check your<br />level</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Continue Learning ──────────────────────────────────────────── */}
        {nextModule && (
          <button
            onClick={() => navigate(`/module/${nextModule.id}`)}
            className="w-full flex items-center gap-3 rounded-xl p-4 text-left transition-all group"
            style={{
              background: "linear-gradient(135deg, hsla(87,100%,68%,0.08) 0%, hsla(240,70%,51%,0.05) 100%)",
              border: "1px solid hsla(87,100%,68%,0.25)",
              boxShadow: "0 4px 20px hsla(235,60%,4%,0.3)",
            }}
          >
            <div
              className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: "hsla(87,100%,68%,0.16)",
                border: "1px solid hsla(87,100%,68%,0.4)",
                boxShadow: "0 0 16px hsla(87,100%,68%,0.35)",
              }}
            >
              <BookOpen className="h-5 w-5" style={{ color: "hsl(var(--kosh-lime))", filter: "drop-shadow(0 0 5px hsla(87,100%,68%,0.7))" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/80 font-display">Continue Learning</div>
              <div className="text-sm font-semibold text-foreground leading-snug truncate">{nextModule.title}</div>
              <div className="text-xs text-muted-foreground">~{nextModule.minutes} min</div>
            </div>
            <ArrowRight className="h-4 w-4 text-primary/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        )}

        {/* ── Congratulations banner (zone 1 complete) ──────────────────── */}
        {coreComplete && (
          <div
            className="rounded-2xl p-5 space-y-2 relative overflow-hidden"
            style={{
              border: "1px solid hsla(175,100%,42%,0.4)",
              background: "linear-gradient(135deg, hsla(175,100%,42%,0.14) 0%, hsla(87,100%,68%,0.08) 50%, hsl(var(--card)) 100%)",
            }}
          >
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl pointer-events-none"
              style={{ background: "hsla(87,100%,68%,0.18)" }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl pointer-events-none"
              style={{ background: "hsla(175,100%,42%,0.18)" }} />
            <div className="relative flex items-start gap-3">
              <Trophy className="h-6 w-6 shrink-0 mt-0.5" style={{ color: "hsl(var(--kosh-teal))", filter: "drop-shadow(0 0 8px hsla(175,100%,42%,0.9))" }} />
              <div>
                <div className="font-display font-extrabold text-foreground tracking-tight">Zone 1 complete! 🎉</div>
                <div className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                  You've built your money foundation. All advanced zones are now unlocked — keep going!
                </div>
                <p className="text-xs font-bangla text-muted-foreground/80 mt-1.5">
                  ভিত্তি তৈরি — এবার এগিয়ে চলুন।
                </p>
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
                <h2 className="font-display font-extrabold text-foreground text-base leading-tight tracking-tight">Zone 1 · Money Foundations</h2>
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
            <h2 className="font-display font-extrabold text-foreground tracking-tight">Your Learning Journey</h2>
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
          className="w-full rounded-2xl p-4 flex items-center gap-4 transition-all text-left group"
          style={{
            background: "linear-gradient(90deg, hsla(240,70%,51%,0.10) 0%, hsla(87,100%,68%,0.06) 100%)",
            border: "1px solid hsla(240,70%,51%,0.25)",
          }}
        >
          <span className="text-3xl">🗓️</span>
          <div className="flex-1">
            <div className="font-display font-extrabold text-foreground text-sm tracking-tight">30-Day Challenge</div>
            <div className="text-xs text-muted-foreground">Daily actions · +10 points each</div>
          </div>
          <span className="text-primary text-sm font-bold font-display group-hover:translate-x-0.5 transition-transform">Start →</span>
        </button>

        <p className="text-center text-xs text-muted-foreground/40 py-2">
          No products. No commissions. No hidden agenda.
        </p>
      </div>
    </div>
  );
}
