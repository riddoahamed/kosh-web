import { create } from "zustand";

const THEME_KEY = "kosh:theme";
const WIDGET_KEY = "kosh:ai_widget_hidden";

export type Theme = "system" | "light" | "dark";

interface UIStore {
  theme: Theme;
  aiWidgetHidden: boolean;
  setTheme: (theme: Theme) => void;
  setAIWidgetHidden: (hidden: boolean) => void;
  loadUI: () => void;
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  if (theme === "dark") root.classList.add("dark");
  else if (theme === "light") root.classList.add("light");
  // "system": let @media prefers-color-scheme handle it
}

export const useUIStore = create<UIStore>((set) => ({
  theme: "system",
  aiWidgetHidden: false,

  loadUI: () => {
    const savedTheme = (localStorage.getItem(THEME_KEY) as Theme) ?? "system";
    const widgetHidden = localStorage.getItem(WIDGET_KEY) === "true";
    applyTheme(savedTheme);
    set({ theme: savedTheme, aiWidgetHidden: widgetHidden });
  },

  setTheme: (theme) => {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
    set({ theme });
  },

  setAIWidgetHidden: (hidden) => {
    localStorage.setItem(WIDGET_KEY, String(hidden));
    set({ aiWidgetHidden: hidden });
  },
}));
