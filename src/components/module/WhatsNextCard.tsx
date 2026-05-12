import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { ALL_MODULES, ZONE_MODULE_ORDER } from "@/data/modules";
import { getZone } from "@/data/zones";
import { useProgressStore } from "@/store/progressStore";
import { db, type ModuleProgressRecord } from "@/lib/supabase";

interface WhatsNextCardProps {
  moduleId: string;
  currentModuleId: string;
  preview: string;
  quizScore: number;
}

type ProgressMap = Record<string, ModuleProgressRecord>;

interface NextTarget {
  kind: "module" | "zone" | "dashboard";
  id: string;
  eyebrow: string;
  title: string;
  detail: string;
  button: string;
}

const ALL_ORDERED_MODULES = Object.values(ZONE_MODULE_ORDER).flat();

function findFirstAvailableModule(
  ids: string[],
  progress: ProgressMap,
  isUnlocked: (moduleId: string, greyZoneFlagged: boolean) => boolean,
  greyZoneFlagged: boolean,
  currentModuleId: string,
) {
  return ids.find((id) => {
    if (id === currentModuleId) return false;
    if (progress[id]?.status === "completed") return false;
    return isUnlocked(id, greyZoneFlagged);
  });
}

function resolveNextTarget(
  moduleId: string,
  currentModuleId: string,
  preview: string,
  progress: ProgressMap,
  isUnlocked: (moduleId: string, greyZoneFlagged: boolean) => boolean,
): NextTarget {
  const greyZoneFlagged = db.getDiagnosticResult()?.greyZone?.flagged ?? false;

  const fallbackModuleId = findFirstAvailableModule(
    ALL_ORDERED_MODULES,
    progress,
    isUnlocked,
    greyZoneFlagged,
    currentModuleId,
  );

  if (moduleId.startsWith("zone-")) {
    const zone = getZone(moduleId);
    const nextInZone = findFirstAvailableModule(
      ZONE_MODULE_ORDER[moduleId] ?? [],
      progress,
      isUnlocked,
      greyZoneFlagged,
      currentModuleId,
    );

    if (nextInZone && ALL_MODULES[nextInZone]) {
      const next = ALL_MODULES[nextInZone];
      return {
        kind: "module",
        id: nextInZone,
        eyebrow: zone ? `Zone ${zone.number} unlocked` : "Next lesson",
        title: next.title,
        detail: next.tagline,
        button: "Start next lesson",
      };
    }

    if (zone) {
      return {
        kind: "zone",
        id: moduleId,
        eyebrow: "Zone complete",
        title: zone.title,
        detail: preview,
        button: "Choose your next zone",
      };
    }
  }

  const requestedModule = ALL_MODULES[moduleId];
  if (requestedModule && progress[moduleId]?.status !== "completed" && isUnlocked(moduleId, greyZoneFlagged)) {
    return {
      kind: "module",
      id: moduleId,
      eyebrow: "Next best lesson",
      title: requestedModule.title,
      detail: preview || requestedModule.tagline,
      button: "Start next lesson",
    };
  }

  if (fallbackModuleId && ALL_MODULES[fallbackModuleId]) {
    const next = ALL_MODULES[fallbackModuleId];
    const zone = next.zoneId ? getZone(next.zoneId) : null;
    return {
      kind: "module",
      id: fallbackModuleId,
      eyebrow: zone ? `Next in Zone ${zone.number}` : "Next best lesson",
      title: next.title,
      detail: next.tagline,
      button: "Start next lesson",
    };
  }

  return {
    kind: "dashboard",
    id: "dashboard",
    eyebrow: "Track updated",
    title: "Your Kosh map is up to date",
    detail: preview,
    button: "Go to Dashboard",
  };
}

export function WhatsNextCard({ moduleId, currentModuleId, preview, quizScore }: WhatsNextCardProps) {
  const navigate = useNavigate();
  const { progress, isUnlocked } = useProgressStore();
  const target = resolveNextTarget(moduleId, currentModuleId, preview, progress, isUnlocked);

  const scoreColor =
    quizScore === 100
      ? "text-green-600"
      : quizScore >= 67
      ? "text-primary"
      : "text-amber-600";
  const scoreLabel = quizScore === 100 ? "Clean pass" : quizScore >= 67 ? "Solid pass" : "Keep going";

  function handleContinue() {
    if (target.kind === "dashboard") {
      navigate("/dashboard");
    } else if (target.kind === "zone") {
      navigate(`/zones/${target.id}`);
    } else {
      navigate(`/module/${target.id}`);
    }
  }

  return (
    <div className="rounded-2xl border-2 border-primary/20 bg-card p-5 space-y-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-foreground">Lesson complete</p>
            <span className={`text-xs font-bold ${scoreColor}`}>{quizScore}%</span>
          </div>
          <p className="mt-1 text-xs text-foreground/55">{scoreLabel} · progress saved</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background/65 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary/70">
            {target.eyebrow}
          </p>
        </div>
        <h3 className="text-base font-bold leading-snug text-foreground">{target.title}</h3>
        <p className="text-sm leading-relaxed text-foreground/65">{target.detail}</p>
      </div>

      <button
        onClick={handleContinue}
        className="w-full rounded-xl bg-primary text-primary-foreground py-3 font-semibold text-sm hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <span>{target.button}</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
