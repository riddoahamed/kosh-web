import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getModule } from "@/data/modules";
import { useProgressStore } from "@/store/progressStore";
import { usePointsStore, POINTS } from "@/store/pointsStore";
import { db } from "@/lib/supabase";
import { ModuleLayout } from "@/components/module/ModuleLayout";

export default function Module() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const startTimeRef = useRef<number>(Date.now());
  const [progressLoaded, setProgressLoaded] = useState(false);

  const { load, startModule, completeQuiz, completeAction, completeModule, isUnlocked, getRecord } =
    useProgressStore();
  const { addPoints } = usePointsStore();
  const greyZoneFlagged = db.getDiagnosticResult()?.greyZone?.flagged ?? false;
  const module = id ? getModule(id) : undefined;

  // Step 1: load persisted progress once on mount
  useEffect(() => {
    load();
    setProgressLoaded(true);
  }, [load]);

  // Step 2: guard + start — only runs after progress is loaded
  useEffect(() => {
    if (!progressLoaded || !module || !id) return;

    if (!isUnlocked(id, greyZoneFlagged)) {
      navigate("/dashboard", { replace: true });
      return;
    }

    startModule(id);
    startTimeRef.current = Date.now();

    return () => {
      // On unmount: save time only if module isn't already completed
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 py-8 pb-20">
        {/* Header */}
        <div className="mb-8 space-y-1">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors mb-4 flex items-center gap-1"
          >
            ← Dashboard
          </button>

          {module.isGreyZoneOnly && (
            <span className="inline-block text-xs font-semibold text-violet-600 bg-violet-50 border border-violet-200 rounded-full px-3 py-0.5 mb-2">
              Grey Zone Recovery
            </span>
          )}

          <h1 className="text-2xl font-bold text-foreground leading-tight">{module.title}</h1>
          <p className="text-foreground/50 text-sm">{module.tagline}</p>
          <p className="text-foreground/35 text-xs">~{module.estimatedMinutes} min</p>
        </div>

        {/* Content */}
        <ModuleLayout
          module={module}
          initialActionCompleted={record.actionCompleted}
          onActionComplete={() => {
            completeAction(id);
            addPoints(POINTS.ACTION_DONE, `Action: Module ${id}`);
          }}
          onQuizComplete={(score, responses) => {
            completeQuiz(id, score, responses);
            const pts = score === 100 ? POINTS.QUIZ_100 : score >= 67 ? POINTS.QUIZ_67 : POINTS.QUIZ_33;
            addPoints(pts, `Quiz: Module ${id} — ${score}%`);
          }}
          onModuleComplete={() => {
            const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
            completeModule(id, Math.max(seconds, 30));
            addPoints(POINTS.MODULE_READ, `Completed Module ${id}`);
          }}
        />
      </div>
    </div>
  );
}
