export interface Zone {
  id: string;
  number: number;
  title: string;
  tagline: string;
  description: string;
  color: string;          // Tailwind color key
  bgColor: string;        // Tailwind bg class
  borderColor: string;    // Tailwind border class
  textColor: string;      // Tailwind text class
  emoji: string;
  status: "live" | "coming_soon";
  firstModuleId: string | null;
  moduleCount: number;
}

export const ZONES: Zone[] = [
  {
    id: "zone-1",
    number: 1,
    title: "Money Foundations",
    tagline: "The map you were never given.",
    description: "8 modules covering the basics: savings vs investing vs trading, emergency funds, the 4-bucket system, and behavioural traps. Required before all other zones.",
    color: "teal",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    textColor: "text-teal-700",
    emoji: "🏗️",
    status: "live",
    firstModuleId: "1",
    moduleCount: 10,
  },
  {
    id: "zone-2",
    number: 2,
    title: "Tracking & Budgeting",
    tagline: "The system that outlasts motivation.",
    description: "Why budgets fail, how to use your bKash history as a tracker, the 4-bucket system in practice, lifestyle inflation, and the 5-number monthly review.",
    color: "violet",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    textColor: "text-violet-700",
    emoji: "📊",
    status: "live",
    firstModuleId: "z2-1",
    moduleCount: 5,
  },
  {
    id: "zone-3",
    number: 3,
    title: "Debt & Credit",
    tagline: "Good debt vs bad debt. The line most people miss.",
    description: "Good vs bad debt, credit card math, digital lending landscape, debt spirals, and the CIB credit record system in Bangladesh.",
    color: "rose",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    textColor: "text-rose-700",
    emoji: "💳",
    status: "live",
    firstModuleId: "z3-1",
    moduleCount: 5,
  },
  {
    id: "zone-4",
    number: 4,
    title: "Tax & Government Systems",
    tagline: "What you legally owe — and what you're already paying.",
    description: "Income tax basics, investment rebate, how to file a return, the invisible taxes you pay daily, and getting your TIN before you need it.",
    color: "amber",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    emoji: "🏛️",
    status: "live",
    firstModuleId: "z4-1",
    moduleCount: 5,
  },
  {
    id: "zone-5",
    number: 5,
    title: "Savings Products",
    tagline: "Sanchaypatra, FDR, DPS, Gold — finally explained.",
    description: "Deep-dive into each major Bangladesh savings instrument: how they work, when to use them, and how to combine them into a savings ladder.",
    color: "emerald",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    emoji: "💰",
    status: "live",
    firstModuleId: "z5-1",
    moduleCount: 5,
  },
  {
    id: "zone-6",
    number: 6,
    title: "Stock Market Basics",
    tagline: "DSE, BO accounts, and how equity actually works.",
    description: "Understanding the Dhaka Stock Exchange, how to open a BO account, equity fundamentals, and what retail investors get wrong.",
    color: "blue",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    emoji: "📈",
    status: "live",
    firstModuleId: "z6-1",
    moduleCount: 5,
  },
  {
    id: "zone-7",
    number: 7,
    title: "Behavioural Finance",
    tagline: "Your brain is not your friend when it comes to money.",
    description: "Loss aversion, anchoring, FOMO, herd behaviour, and the psychological patterns that cost Bangladeshi investors the most money.",
    color: "indigo",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-700",
    emoji: "🧠",
    status: "live",
    firstModuleId: "z7-1",
    moduleCount: 5,
  },
  {
    id: "zone-8",
    number: 8,
    title: "Advanced Investing",
    tagline: "Mutual funds, portfolio construction, and risk management.",
    description: "Mutual fund types in Bangladesh, portfolio allocation by risk profile, how to think about real estate, and protecting wealth against inflation.",
    color: "sky",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    textColor: "text-sky-700",
    emoji: "🏦",
    status: "live",
    firstModuleId: "z8-1",
    moduleCount: 5,
  },
  {
    id: "zone-9",
    number: 9,
    title: "Financial Planning",
    tagline: "Building a 10-year plan from where you are right now.",
    description: "Goal-based financial planning, insurance basics in Bangladesh, retirement planning for young earners, and making a complete financial plan.",
    color: "cyan",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    textColor: "text-cyan-700",
    emoji: "🗺️",
    status: "live",
    firstModuleId: "z9-1",
    moduleCount: 5,
  },
];

export function getZone(id: string): Zone | undefined {
  return ZONES.find((z) => z.id === id);
}

export const LIVE_ZONES = ZONES.filter((z) => z.status === "live");
export const COMING_SOON_ZONES = ZONES.filter((z) => z.status === "coming_soon");
