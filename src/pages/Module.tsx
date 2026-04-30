import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getModule } from "@/data/modules";
import { useProgressStore } from "@/store/progressStore";
import { usePointsStore, MANGOES } from "@/store/pointsStore";
import { db } from "@/lib/supabase";
import { ModuleLayout } from "@/components/module/ModuleLayout";
import { getZone } from "@/data/zones";

export default function Module() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const startTimeRef = useRef<number>(Date.now());
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [zoneBanner, setZoneBanner] = useState<string | null>(null);

  const { load, startModule, completeQuiz, completeAction, completeModule, isUnlocked, getRecord, checkZoneCompletion } =
    useProgressStore();
  const { addPoints } = usePointsStore();
  const greyZoneFlagged = db.getDiagnosticResult()?.greyZone?.flagged ?? false;
  const module = id ? getModule(id) : undefined;

  useEffect(() => {
    load();
    setProgressLoaded(true);
  }, [load]);

  useEffect(() => {
    if (!progressLoaded || !module || !id) return;

    if (!isUnlocked(id, greyZoneFlagged)) {
      navigate("/dashboard", { replace: true });
      return;
    }

    startModule(id);
    startTimeRef.current = Date.now();

    return () => {
      const current = useProgressStore.getState().progress[id];
      if (current?.status !== "completed") {
        const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
        if (seconds > 5) completeModule(id, seconds);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressLoaded, id]);

  if (!module || !id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/50">Module not found.</p>
      </div>
    );
  }

  if (!progressLoaded) return null;

  const record = getRecord(id);
  const backTarget = module.zoneId && module.zoneId !== "zone-1"
    ? `/zones/${module.zoneId}`
    : "/dashboard";
  const backLabel = module.zoneId && module.zoneId !== "zone-1"
    ? `← Zone ${getZone(module.zoneId)?.number ?? ""}`
    : "← Dashboard";

  return (
    <div className="min-h-screen bg-background">
      {/* Zone completion banner */}
      {zoneBanner && (
        <div className="fixed top-0 inset-x-0 z-50 bg-primary text-white text-center px-4 py-3 text-sm font-semibold animate-in slide-in-from-top duration-300">
          🎉 Zone complete! +{MANGOES.ZONE_COMPLETE} 🥭 mangoes earned
          <button onClick={() => setZoneBanner(null)} className="ml-3 opacity-70 hover:opacity-100">✕</button>
        </div>
      )}

      <div className="max-w-xl mx-auto px-4 py-8 pb-20">
        {/* Header */}
        <div className="mb-8 space-y-1">
          <button
            onClick={() => navigate(backTarget)}
            className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors mb-4 flex items-center gap-1"
          >
            {backLabel}
          </button>

          {module.isGreyZoneOnly && (
            <span className="inline-block text-xs font-semibold text-violet-500 bg-violet-500/10 border border-violet-500/25 rounded-full px-3 py-0.5 mb-2">
              Grey Zone Recovery
            </span>
          )}

          {module.zoneId && module.zoneId !== "zone-1" && (
            <span className="inline-block text-xs font-semibold text-primary/60 bg-primary/8 rounded-full px-2.5 py-0.5 mb-1">
              Zone {getZone(module.zoneId)?.number} · {getZone(module.zoneId)?.title}
            </span>
          )}

          <h1 className="text-2xl font-bold text-foreground leading-tight">{module.title}</h1>
          <p className="text-foreground/60 text-sm leading-relaxed">{module.tagline}</p>
          <p className="text-foreground/35 text-xs">~{module.estimatedMinutes} min read</p>
        </div>

        {/* Content */}
        <ModuleLayout
          module={module}
          initialActionCompleted={record.actionCompleted}
          onActionComplete={() => {
            completeAction(id);
            addPoints(MANGOES.ACTION_DONE, `Action: Module ${id}`);
          }}
          onQuizComplete={(score, responses) => {
            completeQuiz(id, score, responses);
            const pts = score === 100 ? MANGOES.QUIZ_100 : score >= 67 ? MANGOES.QUIZ_67 : MANGOES.QUIZ_33;
            addPoints(pts, `Quiz: Module ${id} — ${score}%`);
          }}
          onModuleComplete={() => {
            const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
            completeModule(id, Math.max(seconds, 30));
            addPoints(MANGOES.MODULE_READ, `Completed Module ${id}`);

            // Check if this completion finishes a whole zone
            const completedZone = checkZoneCompletion(id);
            if (completedZone) {
              addPoints(MANGOES.ZONE_COMPLETE, `Zone ${completedZone} complete! 🎉`);
              setZoneBanner(completedZone);
            }
          }}
        />
      </div>
    </div>
  );
}
