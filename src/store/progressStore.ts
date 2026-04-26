import { create } from "zustand";
import { db, type ModuleProgressRecord } from "@/lib/supabase";

const ORDERED_MODULES = ["1", "2", "3", "4", "recovery-a", "recovery-b", "5", "6", "7", "8"];
const CORE_MODULES = ["1", "2", "3", "4", "5", "6", "7", "8"];

function getPrevModuleId(moduleId: string): string | null {
  const idx = ORDERED_MODULES.indexOf(moduleId);
  if (idx <= 0) return null;
  return ORDERED_MODULES[idx - 1];
}

interface ProgressStore {
  progress: Record<string, ModuleProgressRecord>;
  load: () => void;
  startModule: (moduleId: string) => void;
  completeQuiz: (moduleId: string, score: number, responses: Record<string, number>) => void;
  completeAction: (moduleId: string) => void;
  completeModule: (moduleId: string, timeSpentSeconds: number) => void;
  completeAllCoreModules: (examScore: number) => void;
  isUnlocked: (moduleId: string, greyZoneFlagged: boolean) => boolean;
  getRecord: (moduleId: string) => ModuleProgressRecord;
  allCoreModulesComplete: () => boolean;
}

function defaultRecord(moduleId: string): ModuleProgressRecord {
  return {
    moduleId,
    status: "not_started",
    timeSpentSeconds: 0,
    quizScore: 0,
    quizResponses: {},
    actionCompleted: false,
  };
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  progress: {},

  load: () => {
    const all = db.getAllProgress();
    set({ progress: all });
  },

  startModule: (moduleId) => {
    const existing = get().progress[moduleId];
    if (existing?.status === "completed") return;
    const record: ModuleProgressRecord = {
      ...(existing ?? defaultRecord(moduleId)),
      status: "in_progress",
      startedAt: existing?.startedAt ?? new Date().toISOString(),
    };
    db.saveModuleProgress(record);
    set((s) => ({ progress: { ...s.progress, [moduleId]: record } }));
  },

  completeQuiz: (moduleId, score, responses) => {
    const existing = get().progress[moduleId] ?? defaultRecord(moduleId);
    const record: ModuleProgressRecord = {
      ...existing,
      quizScore: score,
      quizResponses: responses,
    };
    db.saveModuleProgress(record);
    set((s) => ({ progress: { ...s.progress, [moduleId]: record } }));
  },

  completeAction: (moduleId) => {
    const existing = get().progress[moduleId] ?? defaultRecord(moduleId);
    const record: ModuleProgressRecord = { ...existing, actionCompleted: true };
    db.saveModuleProgress(record);
    set((s) => ({ progress: { ...s.progress, [moduleId]: record } }));
  },

  completeModule: (moduleId, timeSpentSeconds) => {
    const existing = get().progress[moduleId] ?? defaultRecord(moduleId);
    const record: ModuleProgressRecord = {
      ...existing,
      status: "completed",
      completedAt: new Date().toISOString(),
      timeSpentSeconds,
    };
    db.saveModuleProgress(record);
    set((s) => ({ progress: { ...s.progress, [moduleId]: record } }));
  },

  completeAllCoreModules: (examScore) => {
    const now = new Date().toISOString();
    const updates: Record<string, ModuleProgressRecord> = {};
    for (const moduleId of CORE_MODULES) {
      const existing = get().progress[moduleId] ?? defaultRecord(moduleId);
      if (existing.status === "completed") continue;
      const record: ModuleProgressRecord = {
        ...existing,
        status: "completed",
        completedAt: now,
        quizScore: examScore,
        timeSpentSeconds: 0,
      };
      db.saveModuleProgress(record);
      updates[moduleId] = record;
    }
    set((s) => ({ progress: { ...s.progress, ...updates } }));
  },

  isUnlocked: (moduleId, greyZoneFlagged) => {
    const { progress } = get();
    if (moduleId === "1") return true;
    if (moduleId === "recovery-a") {
      return greyZoneFlagged && progress["4"]?.status === "completed";
    }
    if (moduleId === "recovery-b") {
      return greyZoneFlagged && progress["recovery-a"]?.status === "completed";
    }
    const prev = getPrevModuleId(moduleId);
    if (!prev) return false;
    // Skip recovery modules in unlock chain for non-flagged users
    if ((prev === "recovery-a" || prev === "recovery-b") && !greyZoneFlagged) {
      return progress["4"]?.status === "completed";
    }
    return progress[prev]?.status === "completed";
  },

  getRecord: (moduleId) => {
    return get().progress[moduleId] ?? defaultRecord(moduleId);
  },

  allCoreModulesComplete: () => {
    const { progress } = get();
    return CORE_MODULES.every((id) => progress[id]?.status === "completed");
  },
}));
