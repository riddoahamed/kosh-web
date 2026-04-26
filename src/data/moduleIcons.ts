export interface ModuleIcon {
  emoji: string;
  bg: string;       // Tailwind bg class
  text: string;     // Tailwind text class
  darkBg: string;   // Dark mode bg
}

export const MODULE_ICONS: Record<string, ModuleIcon> = {
  "1": { emoji: "🗺️", bg: "bg-blue-100",    text: "text-blue-700",   darkBg: "dark:bg-blue-900/40" },
  "2": { emoji: "📉", bg: "bg-orange-100",  text: "text-orange-700", darkBg: "dark:bg-orange-900/40" },
  "3": { emoji: "🪣", bg: "bg-emerald-100", text: "text-emerald-700",darkBg: "dark:bg-emerald-900/40" },
  "4": { emoji: "🚨", bg: "bg-red-100",     text: "text-red-700",    darkBg: "dark:bg-red-900/40" },
  "5": { emoji: "🛡️", bg: "bg-teal-100",    text: "text-teal-700",   darkBg: "dark:bg-teal-900/40" },
  "6": { emoji: "🏦", bg: "bg-indigo-100",  text: "text-indigo-700", darkBg: "dark:bg-indigo-900/40" },
  "7": { emoji: "₿",  bg: "bg-yellow-100",  text: "text-yellow-700", darkBg: "dark:bg-yellow-900/40" },
  "8": { emoji: "⚙️", bg: "bg-purple-100",  text: "text-purple-700", darkBg: "dark:bg-purple-900/40" },
  "recovery-a": { emoji: "🔍", bg: "bg-violet-100", text: "text-violet-700", darkBg: "dark:bg-violet-900/40" },
  "recovery-b": { emoji: "🔄", bg: "bg-violet-100", text: "text-violet-700", darkBg: "dark:bg-violet-900/40" },
};

export function getModuleIcon(id: string): ModuleIcon {
  return MODULE_ICONS[id] ?? { emoji: "📖", bg: "bg-muted", text: "text-foreground/60", darkBg: "" };
}
