import type { Module } from "@/types/curriculum";

export const module1: Module = {
  id: "1",
  title: "Why money feels confusing — the map",
  tagline: "4 categories that explain everything",
  estimatedMinutes: 12,
  hook: `"Money feels confusing in Bangladesh because we mix up four different things and call them all 'investing.' Saving is not investing. Investing is not trading. Trading is not gambling. And hype is none of them. Once you see the map, everything gets clearer."`,
  context: `Bangladesh-এ formal financial education নেই বললেই চলে। School-এ পড়ানো হয় না। পরিবারে বলা হয় "টাকা save করো" — কিন্তু কীভাবে, কোথায়, কেন — সেটা বলা হয় না। এর ফলে আমরা সব কিছু একসাথে গুলিয়ে ফেলি। একটা map থাকলে সব কিছু অনেক সহজ হয়ে যায়।`,
  teaching: `টাকার জগতে মূলত চারটা জিনিস আছে:

**১. Saving (সঞ্চয়)** — Safety-র জন্য টাকা আলাদা রাখা। Short-term goals, liquidity, emergency। Examples: savings account, FDR, বাড়িতে রাখা cash।

**২. Investing (বিনিয়োগ)** — টাকাকে কাজে লাগানো যাতে বছরের পর বছর grow করে। Long-term। Examples: Sanchaypatra, DPS, mutual funds, stocks।

**৩. Trading (ট্রেডিং)** — Short-term price movement থেকে profit করার চেষ্টা। High effort, high risk, full-time attention দরকার। Most retail traders lose money।

**৪. Hype (হাইপ)** — Social pressure, FOMO, guru tips, WhatsApp forwarded messages। এটা কোনো financial activity না — এটা psychological। সবচেয়ে বিপজ্জনক কারণ এটা real লাগে।

**Bangladesh-এ এগুলো কেন mix হয়:**
- কোনো formal education নেই
- English-Bangla terminology confusion
- Brokers এবং scammers aggressive marketing করে
- "আমার বন্ধু এতে profit করেছে" — survivor bias

বেশিরভাগ young Bangladeshis শুধু bucket 1 (savings) আর এক ধরনের hype-এ থাকে। বাকি দুটো বোঝে না।`,
  bdExample: `রাহিম ভাই বেতন পেয়ে Tk 20,000 একটা DPS-এ রাখে এবং Tk 5,000 একটা crypto WhatsApp group-এ দেয়। সে নিজেকে বলে "I'm investing।" আসলে সে একটা কাজে investing করছে, আরেকটায় gambling করছে। দুটো একসাথে করলেও — এগুলো same জিনিস না। পার্থক্য বোঝাটাই প্রথম কাজ।`,
  actionPrompt: {
    text: "List করুন আপনার টাকা এই মুহূর্তে কোথায় কোথায় আছে। প্রতিটার পাশে লিখুন: saving, investing, trading, or hype। Honestly।",
    cta: "Done — I made my list",
  },
  quiz: [
    {
      id: "m1q1",
      text: "'I bought DSE stock last week based on a Facebook group tip and sold 2 days later.' This is closest to:",
      options: ["Saving", "Investing", "Trading", "Hype"],
      correctIndex: 2,
      explanation: "Buying and selling within days based on tips is trading — and when the decision is driven by social proof rather than analysis, it overlaps with hype.",
    },
    {
      id: "m1q2",
      text: "'I put Tk 10,000 in a 5-year Sanchaypatra.' This is closest to:",
      options: ["Hype", "Trading", "Investing", "Saving"],
      correctIndex: 2,
      explanation: "Sanchaypatra is a government-backed instrument held for 5 years to grow wealth — that's investing, with some saving characteristics (capital preservation).",
    },
    {
      id: "m1q3",
      text: "Which category has the highest emotional pressure attached to it?",
      options: ["Saving", "Investing", "Trading", "Hype"],
      correctIndex: 3,
      explanation: "Hype is driven by FOMO, social proof, and urgency — the highest emotional pressure of all four. That's exactly what makes it dangerous.",
    },
  ],
  whatsNext: {
    moduleId: "2",
    preview: "Module 2: Inflation — why the number in your bank account can grow while your wealth shrinks.",
  },
};
