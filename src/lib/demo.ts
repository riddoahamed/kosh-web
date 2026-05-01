/**
 * Demo mode — populates localStorage with a fully unlocked test account.
 * No Supabase auth required. All Zone 1 modules completed → Zones 2-5 open.
 * A demo banner is shown on Dashboard/Module pages to prompt sign-up.
 */

export const DEMO_PROFILE_ID = "demo-user-kosh";
export const DEMO_KEY = "kosh:demo_mode";

const ALL_MODULE_IDS = [
  // Zone 1 core
  "1", "2", "3", "4", "5", "6", "7", "8",
  // Zone 2 (first 2 done, rest open)
  "z2-1", "z2-2",
  // Zone 3 first module done
  "z3-1",
];

function makeProgress(moduleId: string, score = 80): object {
  return {
    moduleId,
    status: "completed",
    startedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    completedAt: new Date().toISOString(),
    timeSpentSeconds: Math.floor(Math.random() * 400) + 300,
    quizScore: score,
    quizResponses: {},
    actionCompleted: true,
  };
}

export function startDemo() {
  // Profile
  const profile = {
    id: DEMO_PROFILE_ID,
    email: "demo@kosh.com.bd",
    name: "Demo User",
    age: 23,
    occupation: "student",
    division: "Dhaka",
    consent_given: true,
    level_assigned: 1,
    created_at: new Date().toISOString(),
    kyc_status: "not_submitted",
  };
  localStorage.setItem("kosh:profile", JSON.stringify(profile));

  // Diagnostic result so dashboard renders the level card
  const diagnostic = {
    level: 1,
    personalityLabel: "The Curious Learner",
    scores: { total: 58, knowledge: 55, behavior: 60, mindset: 58 },
    greyZone: { flagged: false, exposures: [] },
    responses: {},
    completedAt: new Date().toISOString(),
  };
  localStorage.setItem("kosh:diagnostic_result", JSON.stringify(diagnostic));

  // Module progress — Zone 1 all done, a few Zone 2-3 done
  const progress: Record<string, object> = {};
  const scores: Record<string, number> = {
    "1": 100, "2": 80, "3": 100, "4": 67,
    "5": 80, "6": 100, "7": 67, "8": 80,
    "z2-1": 100, "z2-2": 80,
    "z3-1": 67,
  };
  for (const id of ALL_MODULE_IDS) {
    progress[id] = makeProgress(id, scores[id] ?? 80);
  }
  localStorage.setItem("kosh:module_progress", JSON.stringify(progress));

  // Mangoes
  const mangoes = {
    total: 1240,
    streak: 5,
    lastVisitDate: new Date().toISOString().split("T")[0],
    history: [
      { amount: 150, reason: "Zone 2 partial complete 🎉", date: new Date().toISOString() },
      { amount: 60, reason: "Completed Module 8", date: new Date().toISOString() },
      { amount: 40, reason: "Quiz: Module 8 — 80%", date: new Date().toISOString() },
      { amount: 25, reason: "Action: Module 8", date: new Date().toISOString() },
      { amount: 5, reason: "Day 5 streak 🔥", date: new Date().toISOString() },
    ],
  };
  localStorage.setItem("kosh:mangoes", JSON.stringify(mangoes));

  // Mark as demo
  localStorage.setItem(DEMO_KEY, "true");
}

/**
 * Lite demo — shown to public users who hit the email rate limit.
 * Diagnostic done, level set, NO modules completed → they can actually
 * go through the full learning experience.
 */
export function startDemoLite() {
  const profile = {
    id: DEMO_PROFILE_ID,
    email: "guest@kosh.com.bd",
    name: "Guest",
    occupation: "student",
    division: "Dhaka",
    consent_given: true,
    level_assigned: 1,
    created_at: new Date().toISOString(),
    kyc_status: "not_submitted",
  };
  localStorage.setItem("kosh:profile", JSON.stringify(profile));

  const diagnostic = {
    level: 1,
    personalityLabel: "The Curious Learner",
    scores: { total: 52, knowledge: 48, behavior: 54, mindset: 54 },
    greyZone: { flagged: false, exposures: [] },
    responses: {},
    completedAt: new Date().toISOString(),
  };
  localStorage.setItem("kosh:diagnostic_result", JSON.stringify(diagnostic));

  // No module progress — fresh start so they can learn
  localStorage.setItem("kosh:module_progress", JSON.stringify({}));

  const mangoes = {
    total: 0,
    streak: 0,
    lastVisitDate: new Date().toISOString().split("T")[0],
    history: [],
  };
  localStorage.setItem("kosh:mangoes", JSON.stringify(mangoes));
  localStorage.setItem(DEMO_KEY, "true");
}

export function isDemoMode(): boolean {
  return localStorage.getItem(DEMO_KEY) === "true";
}

export function exitDemo() {
  [
    "kosh:profile", "kosh:diagnostic_result",
    "kosh:module_progress", "kosh:mangoes", DEMO_KEY,
  ].forEach((k) => localStorage.removeItem(k));
}
