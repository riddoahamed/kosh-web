import { create } from "zustand";
import type { DiagnosticResponse, AgeGroup } from "@/types/diagnostic";
interface DiagnosticStore {
  ageGroup: AgeGroup | null;
  totalQuestions: number;
  currentIndex: number;
  responses: DiagnosticResponse[];
  greyZoneSelections: string[];
  showGreyZone: boolean;
  isComplete: boolean;

  setAgeGroup: (group: AgeGroup) => void;
  setQuestionCount: (count: number) => void;
  setResponse: (response: DiagnosticResponse) => void;
  setGreyZoneSelections: (selections: string[]) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  completeGreyZone: () => void;
  reset: () => void;
  progress: () => number;
}

export const useDiagnosticStore = create<DiagnosticStore>((set, get) => ({
  ageGroup: null,
  totalQuestions: 15,
  currentIndex: 0,
  responses: [],
  greyZoneSelections: [],
  showGreyZone: false,
  isComplete: false,

  setAgeGroup: (group) => set({ ageGroup: group }),

  setQuestionCount: (count) => set({ totalQuestions: count }),

  setResponse: (response) => {
    set((state) => {
      const existing = state.responses.findIndex(
        (r) => r.questionId === response.questionId
      );
      if (existing >= 0) {
        const updated = [...state.responses];
        updated[existing] = response;
        return { responses: updated };
      }
      return { responses: [...state.responses, response] };
    });
  },

  setGreyZoneSelections: (selections) => {
    set({ greyZoneSelections: selections });
  },

  nextQuestion: () => {
    const { currentIndex, totalQuestions } = get();
    if (currentIndex < totalQuestions - 1) {
      set({ currentIndex: currentIndex + 1 });
    } else if (currentIndex === totalQuestions - 1) {
      set({ showGreyZone: true });
    }
  },

  prevQuestion: () => {
    const { currentIndex, showGreyZone } = get();
    if (showGreyZone) {
      set({ showGreyZone: false });
    } else if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },

  completeGreyZone: () => {
    set({ isComplete: true });
  },

  reset: () => {
    set((s) => ({
      ageGroup: s.ageGroup, // preserve across retakes
      currentIndex: 0,
      responses: [],
      greyZoneSelections: [],
      showGreyZone: false,
      isComplete: false,
    }));
  },

  progress: () => {
    const { currentIndex, showGreyZone, totalQuestions } = get();
    if (showGreyZone) return 100;
    return Math.round((currentIndex / totalQuestions) * 100);
  },
}));
