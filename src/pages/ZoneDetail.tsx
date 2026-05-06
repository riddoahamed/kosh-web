import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getZone } from "@/data/zones";
import { ZONE_MODULE_ORDER, ALL_MODULES } from "@/data/modules";
import { useProgressStore, CORE_MODULES } from "@/store/progressStore";
import { ZoneIcon, accentBg, accentText } from "@/components/shared/ZoneIcon";

export default function ZoneDetail() {
  const { zoneId } = useParams<{ zoneId: string }>();
  const navigate = useNavigate();
  const { load, progress } = useProgressStore();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    load();
    setLoaded(true);
  }, [load]);

  const zone = zoneId ? getZone(zoneId) : undefined;
  const moduleIds = zoneId ? (ZONE_MODULE_ORDER[zoneId] ?? []) : [];
  const zone1Complete = CORE_MODULES.every((id) => progress[id]?.status === "completed");

  if (!zone || !loaded) return null;

  if (zone.status === "coming_soon") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-3">
          <p className="text-4xl">{zone.emoji}</p>
          <h1 className="text-xl font-bold text-foreground">{zone.title}</h1>
          <p className="text-foreground/50 text-sm">This zone is coming soon.</p>
          <button
            onClick={() => navigate("/zones")}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            ← Back to zones
          </button>
        </div>
      </div>
    );
  }

  // Find the first unlocked-but-not-completed module to suggest
  const firstIncomplete = moduleIds.find((id) => {
    const status = progress[id]?.status;
    return status !== "completed";
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/zones")}
            className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors mb-4 flex items-center gap-1"
          >
            ← All zones
          </button>

          <div className="rounded-2xl border-2 p-5 mb-5" style={accentBg(zone.id)}>
            <div className="flex items-start gap-3">
              <ZoneIcon zoneId={zone.id} size="lg" />
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-widest" style={accentText(zone.id)}>
                  Zone {zone.number}
                </span>
                <h1 className="text-xl font-bold text-foreground mt-0.5">{zone.title}</h1>
                <p className="text-foreground/60 text-sm mt-1 leading-relaxed">{zone.description}</p>
              </div>
            </div>
          </div>

          {!zone1Complete && (
            <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 mb-4">
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                🔒 Complete Level 1 (Zone 1) to unlock this zone.
              </p>
            </div>
          )}
        </div>

        {/* Module list */}
        <div className="space-y-3">
          {moduleIds.map((moduleId, idx) => {
            const mod = ALL_MODULES[moduleId];
            if (!mod) return null;

            const rec = progress[moduleId];
            const isCompleted = rec?.status === "completed";
            const isInProgress = rec?.status === "in_progress";

            // Unlock logic: first module unlocked if zone is unlocked, subsequent require prev
            const isZoneUnlocked = zone.id === "zone-1" || zone1Complete;
            const isModuleUnlocked =
              isZoneUnlocked && (idx === 0 || progress[moduleIds[idx - 1]]?.status === "completed");

            return (
              <button
                key={moduleId}
                onClick={() => {
                  if (isModuleUnlocked) navigate(`/module/${moduleId}`);
                }}
                disabled={!isModuleUnlocked}
                className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                  isCompleted
                    ? "border-green-500/30 bg-green-500/8"
                    : isModuleUnlocked && !isInProgress
                    ? "border-border bg-card hover:border-primary/40 hover:bg-primary/3 active:scale-[0.99]"
                    : !isModuleUnlocked
                    ? "border-border bg-card opacity-50 cursor-not-allowed"
                    : ""
                }`}
                style={isInProgress ? accentBg(zone.id, 0.10) : undefined}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Step number / status icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border ${
                        isCompleted
                          ? "bg-primary text-primary-foreground border-transparent"
                          : isInProgress
                          ? "border-transparent"
                          : isModuleUnlocked
                          ? "bg-primary/10 text-primary border-transparent"
                          : "bg-muted text-muted-foreground border-transparent"
                      }`}
                      style={isInProgress ? { ...accentBg(zone.id, 0.18), ...accentText(zone.id) } : undefined}
                    >
                      {isCompleted ? "✓" : idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-tight truncate">
                        {mod.title}
                      </p>
                      <p className="text-xs text-foreground/50 mt-0.5 truncate">{mod.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-foreground/40">~{mod.estimatedMinutes}m</span>
                    {isModuleUnlocked && !isCompleted && (
                      <span className="text-foreground/30">→</span>
                    )}
                    {!isModuleUnlocked && <span className="text-foreground/30">🔒</span>}
                  </div>
                </div>

                {isCompleted && rec?.quizScore !== undefined && (
                  <div className="mt-2 ml-11">
                    <span
                      className={`text-xs font-semibold ${
                        rec.quizScore === 100
                          ? "text-green-600"
                          : rec.quizScore >= 67
                          ? "text-primary"
                          : "text-amber-600"
                      }`}
                    >
                      Quiz: {rec.quizScore}%
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* CTA if zone is unlocked */}
        {zone1Complete && firstIncomplete && (
          <div className="mt-6">
            <button
              onClick={() => navigate(`/module/${firstIncomplete}`)}
              className="w-full rounded-xl bg-primary text-primary-foreground py-3.5 font-semibold text-sm hover:bg-primary/90 active:scale-[0.99] transition-all"
            >
              Continue →
            </button>
          </div>
        )}

        {!zone1Complete && (
          <div className="mt-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full rounded-xl border-2 border-primary text-primary py-3.5 font-semibold text-sm hover:bg-primary/5 transition-all"
            >
              Back to Level 1 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
