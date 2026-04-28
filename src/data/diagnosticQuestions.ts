import type {
  KnowledgeQuestion,
  BehaviorQuestion,
  ConfidenceQuestion,
  DiagnosticQuestion,
  GreyZoneQuestion,
} from "@/types/curriculum";

export const knowledgeQuestions: KnowledgeQuestion[] = [
  {
    id: "k1",
    type: "knowledge",
    domain: "knowledge",
    text: "Inflation Bangladesh-এ এখন roughly 9-10%. একটা savings account দেয় 5%. তাহলে আপনার টাকা:",
    options: [
      "প্রতি বছর growing (বাড়ছে)",
      "Same থাকছে",
      "Actually shrinking (real value কমছে)",
      "এটা বলা possible না",
    ],
    correctIndex: 2,
    explanation:
      "Real return = nominal return − inflation. 5% − 9% = −4%. Your money loses purchasing power even as the number grows.",
  },
  {
    id: "k2",
    type: "knowledge",
    domain: "knowledge",
    text: "Compound interest মানে কী?",
    options: [
      "Interest only on the original amount",
      "Interest on the original amount plus previous interest (interest-on-interest)",
      "A government tax on savings",
      "Bank charges for keeping money",
    ],
    correctIndex: 1,
    explanation:
      "Compound interest earns interest on your interest — so money grows exponentially over time, not just linearly.",
  },
  {
    id: "k3",
    type: "knowledge",
    domain: "knowledge",
    text: "Diversification বলতে investment-এ কী বোঝায়?",
    options: [
      "সব টাকা এক জায়গায় রাখা যাতে monitor করা সহজ হয়",
      "বিভিন্ন ধরনের asset-এ টাকা ছড়িয়ে দেওয়া যাতে risk কমে",
      "শুধু বেশি return-এর জায়গায় invest করা",
      "Monthly interest রাখা",
    ],
    correctIndex: 1,
    explanation:
      "Diversification spreads risk — if one investment loses, others may hold steady or gain.",
  },
  {
    id: "k4",
    type: "knowledge",
    domain: "knowledge",
    text: "একজন আপনাকে বলছে: 'আমাদের কোম্পানিতে 1 লাখ টাকা রাখলে প্রতি মাসে 15% return পাবেন, guaranteed.' এটা সাধারণত:",
    options: [
      "A great investment opportunity",
      "Normal for emerging markets like Bangladesh",
      "A classic Ponzi/scam pattern",
      "Only risky if the company is new",
    ],
    correctIndex: 2,
    explanation:
      "15% monthly = 180% annual. No legitimate investment guarantees this. 'Guaranteed returns' above inflation is a classic scam signal.",
  },
  {
    id: "k5",
    type: "knowledge",
    domain: "knowledge",
    text: "Sanchaypatra সম্পর্কে নিচের কোনটি সত্য?",
    options: [
      "এটা শুধু government employees কিনতে পারে",
      "এটা একটা government-backed savings instrument, ব্যক্তি কিনতে পারেন (limits আছে)",
      "এটা stock market-এর একটা product",
      "এটা শুধু 60 বছরের পর pension হিসেবে পাওয়া যায়",
    ],
    correctIndex: 1,
    explanation:
      "Sanchaypatra is a government-backed savings certificate available to individual Bangladeshis, with purchase limits and typically 5-year terms.",
  },
];

export const behaviorQuestions: BehaviorQuestion[] = [
  {
    id: "b1",
    type: "behavior",
    domain: "behavior",
    text: "মাসে আপনি কতবার track করেন আপনি কোথায় কত খরচ করেছেন?",
    frequencyLabels: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: "b2",
    type: "behavior",
    domain: "behavior",
    text: "আপনার কি একটা emergency fund আছে (৩-৬ মাসের খরচ, আলাদা রাখা)?",
    frequencyLabels: [
      "No",
      "Thinking about it",
      "Building it",
      "Partly ready",
      "Fully ready",
    ],
  },
  {
    id: "b3",
    type: "behavior",
    domain: "behavior",
    text: "মাসে salary পাওয়ার পর প্রথম কাজ কী?",
    frequencyLabels: [
      "Spend first, save what's left",
      "Nothing specific",
      "Pay bills first",
      "Save a fixed amount first",
      "Save + invest on a system",
    ],
  },
  {
    id: "b4",
    type: "behavior",
    domain: "behavior",
    text: "কোনো financial decision নেওয়ার আগে (যেমন বড় খরচ, investment) research করেন?",
    frequencyLabels: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: "b5",
    type: "behavior",
    domain: "behavior",
    text: "কেউ আপনাকে একটা investment opportunity বললে কী করেন?",
    frequencyLabels: [
      "Trust and put money in",
      "Ask friends",
      "Search online briefly",
      "Research deeply + check legitimacy",
      "Wait and research over days",
    ],
  },
];

export const confidenceQuestions: ConfidenceQuestion[] = [
  {
    id: "c1",
    type: "confidence",
    domain: "confidence",
    text: "'আমি আমার financial future-এর উপর control feel করি।'",
    likertLabels: [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree",
    ],
  },
  {
    id: "c2",
    type: "confidence",
    domain: "confidence",
    text: "'আমি পরিবারের সাথে money নিয়ে honestly কথা বলতে comfortable।'",
    likertLabels: [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree",
    ],
  },
  {
    id: "c3",
    type: "confidence",
    domain: "confidence",
    text: "'আমি investment decision নিজেই নিতে পারব, কাউকে blindly follow করতে হবে না।'",
    likertLabels: [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree",
    ],
  },
  {
    id: "c4",
    type: "confidence",
    domain: "confidence",
    text: "'আমি বুঝি আমার টাকা inflation-এর সাথে কীভাবে react করছে।'",
    likertLabels: [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree",
    ],
  },
  {
    id: "c5",
    type: "confidence",
    domain: "confidence",
    text: "'যদি আজই job চলে যায়, আমি কিছু মাস financially manage করতে পারব।'",
    likertLabels: [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree",
    ],
  },
];

export const greyZoneQuestion: GreyZoneQuestion = {
  id: "grey-zone-branch",
  text: "Have you ever put money into any of these? (Select all that apply)",
  options: [
    { value: "crypto", label: "Crypto (Binance, Coinbase, or similar)" },
    { value: "forex", label: "Forex trading or signal groups" },
    {
      value: "betting",
      label: "Online betting or gambling apps (1xBet, Melbet, etc.)",
    },
    {
      value: "schemes",
      label: "'Investment schemes' promising fixed monthly returns",
    },
    { value: "none", label: "None of the above" },
  ],
};

export const allDiagnosticQuestions: DiagnosticQuestion[] = [
  ...knowledgeQuestions,
  ...behaviorQuestions,
  ...confidenceQuestions,
];
