export interface ExamQuestion {
  id: string;
  module: string;
  moduleTitle: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// 16 questions — 2 per core module (1–8)
// Passing threshold: 75% = 12/16 correct
export const PASS_THRESHOLD = 0.75;
export const EXAM_POINTS = 400;

export const EXAM_QUESTIONS: ExamQuestion[] = [
  // ── Module 1: The Map ──────────────────────────────────────────
  {
    id: "eq1",
    module: "1",
    moduleTitle: "The Map",
    text: "'I bought DSE stock last week based on a Facebook group tip and sold 2 days later.' This is closest to:",
    options: ["Saving", "Investing", "Trading", "Hype"],
    correctIndex: 2,
    explanation: "Buying and selling within days based on tips is trading — and when the decision is driven by social proof rather than analysis, it overlaps with hype.",
  },
  {
    id: "eq2",
    module: "1",
    moduleTitle: "The Map",
    text: "Which category has the highest emotional pressure attached to it?",
    options: ["Saving", "Investing", "Trading", "Hype"],
    correctIndex: 3,
    explanation: "Hype is driven by FOMO, social proof, and urgency — the highest emotional pressure of all four. That's exactly what makes it dangerous.",
  },

  // ── Module 2: Inflation ────────────────────────────────────────
  {
    id: "eq3",
    module: "2",
    moduleTitle: "Inflation",
    text: "Inflation 10%, FDR interest 8%. What is your real return?",
    options: ["+18%", "+2%", "−2%", "0%"],
    correctIndex: 2,
    explanation: "Real return = 8% − 10% = −2%. Your money grows in number but shrinks in purchasing power.",
  },
  {
    id: "eq4",
    module: "2",
    moduleTitle: "Inflation",
    text: "True or false: Keeping money in a bank savings account is 'safe.'",
    options: [
      "True — banks are guaranteed",
      "False — it's safe from theft but not from inflation",
      "True — interest always beats inflation",
      "False — banks can fail anytime",
    ],
    correctIndex: 1,
    explanation: "Bank deposits are safe from theft and bank failure (up to limits). But they are NOT safe from inflation eroding purchasing power — and inflation is the risk most people ignore.",
  },

  // ── Module 3: The Three Buckets ────────────────────────────────
  {
    id: "eq5",
    module: "3",
    moduleTitle: "The Three Buckets",
    text: "An emergency fund belongs in which bucket?",
    options: ["Bucket 3 — Speculation", "Bucket 2 — Growth", "Bucket 1 — Safety", "None — keep it in cash"],
    correctIndex: 2,
    explanation: "Emergency funds must be liquid and accessible — that's Bucket 1. Never put emergency money in growth or speculation vehicles that might be down when you need them.",
  },
  {
    id: "eq6",
    module: "3",
    moduleTitle: "The Three Buckets",
    text: "What is the maximum recommended percentage of your total savings to put in Bucket 3 (speculation)?",
    options: ["50%", "25%", "5–10%", "0% — speculation is never okay"],
    correctIndex: 2,
    explanation: "5–10% max — money you can afford to lose entirely. Higher percentages turn speculation into a crisis risk for your financial stability.",
  },

  // ── Module 4: Hype, Scams & Grey Zone ─────────────────────────
  {
    id: "eq7",
    module: "4",
    moduleTitle: "Hype & Scams",
    text: "'Guaranteed 10% monthly return' — what's the primary red flag?",
    options: [
      "Monthly payments are unusual",
      "No legitimate investment guarantees fixed returns above inflation",
      "10% is too low to be interesting",
      "Only new companies do this",
    ],
    correctIndex: 1,
    explanation: "No legitimate investment can guarantee consistent double-digit monthly returns. Anyone promising this is either running a Ponzi scheme or doesn't understand finance.",
  },
  {
    id: "eq8",
    module: "4",
    moduleTitle: "Hype & Scams",
    text: "A 'mentor' earns primarily from Tk 25,000 course fees, not from their own trading. What does this tell you?",
    options: [
      "They are generous sharing knowledge",
      "Their actual trading strategy may not work reliably",
      "The course is expensive because it's high quality",
      "This is normal for educators",
    ],
    correctIndex: 1,
    explanation: "If their strategy worked as claimed, selling courses would be a distraction. The business model reveals the truth: the revenue is selling hope, not trading profits.",
  },

  // ── Module 5: Emergency Fund ───────────────────────────────────
  {
    id: "eq9",
    module: "5",
    moduleTitle: "Emergency Fund",
    text: "An emergency fund should be at least how many months of essential expenses?",
    options: ["1 month", "3 months", "6 months", "12 months"],
    correctIndex: 1,
    explanation: "3 months is the minimum — covering average job search time and a significant medical emergency. 6 months is better if your income is irregular.",
  },
  {
    id: "eq10",
    module: "5",
    moduleTitle: "Emergency Fund",
    text: "Best place to keep your emergency fund:",
    options: [
      "Cash at home — most accessible",
      "Stocks — for better returns",
      "Separate savings account",
      "Crypto — could grow fast",
    ],
    correctIndex: 2,
    explanation: "Emergency funds need to be accessible and stable. Stocks and crypto can drop 30–50% when you need them most. A separate savings account is the right balance.",
  },

  // ── Module 6: BD Options ───────────────────────────────────────
  {
    id: "eq11",
    module: "6",
    moduleTitle: "Real Options in Bangladesh",
    text: "Among the 'safe' options (not stocks), which currently offers the highest typical return in Bangladesh?",
    options: ["FDR", "DPS", "Sanchaypatra", "Savings account"],
    correctIndex: 2,
    explanation: "Sanchaypatra currently offers 10.5–11.5% — the highest among government-backed/bank instruments and closest to inflation-neutral.",
  },
  {
    id: "eq12",
    module: "6",
    moduleTitle: "Real Options in Bangladesh",
    text: "Best option for someone who wants to save Tk 2,000/month systematically for 5 years:",
    options: ["Gold", "DPS", "DSE stocks", "FDR"],
    correctIndex: 1,
    explanation: "DPS (Deposit Pension Scheme) is designed for exactly this — monthly contributions over a fixed term. It builds the savings habit and offers a predictable return.",
  },

  // ── Module 7: Crypto & Forex ───────────────────────────────────
  {
    id: "eq13",
    module: "7",
    moduleTitle: "Crypto & Forex",
    text: "Cryptocurrency trading for retail users in Bangladesh is currently:",
    options: [
      "Fully legal — anyone can trade",
      "Not legally permitted per Bangladesh Bank guidance",
      "Legal only on international exchanges",
      "Legal if you pay taxes on profits",
    ],
    correctIndex: 1,
    explanation: "Bangladesh Bank has maintained since 2017 that retail cryptocurrency trading is not legally permitted. Enforcement is inconsistent, but the legal risk is real.",
  },
  {
    id: "eq14",
    module: "7",
    moduleTitle: "Crypto & Forex",
    text: "The main reason crypto/forex 'signal groups' appear successful is:",
    options: [
      "The signals genuinely work",
      "Survivor bias — you only see the winners, losers leave quietly",
      "The admin is very skilled",
      "Crypto always goes up eventually",
    ],
    correctIndex: 1,
    explanation: "In a group of 2,000, even random guessing produces some big winners. Those winners post loudly. The 1,900+ losers leave quietly. You're seeing a biased sample.",
  },

  // ── Module 8: Your First Money System ─────────────────────────
  {
    id: "eq15",
    module: "8",
    moduleTitle: "Your First Money System",
    text: "Why is the 'Wants' bucket (Bucket 4) necessary — not just optional?",
    options: [
      "Because spending is good for the economy",
      "Without it, people abandon the entire system within months",
      "It helps you save more in the long run",
      "It's not — discipline is enough",
    ],
    correctIndex: 1,
    explanation: "Systems without a 'Life' bucket are too restrictive. People abandon them when they can't enjoy any of their income. A small protected wants budget keeps the system sustainable.",
  },
  {
    id: "eq16",
    module: "8",
    moduleTitle: "Your First Money System",
    text: "Emergency fund should be built before aggressive investing because:",
    options: [
      "Banks require it",
      "Without it, emergencies force you to sell investments at the worst time",
      "Investing is illegal before you have savings",
      "Interest rates are higher on savings accounts",
    ],
    correctIndex: 1,
    explanation: "Without an emergency fund, any unexpected cost forces you to liquidate investments — possibly at a loss and at the worst time. The fund is the foundation everything else rests on.",
  },
];
