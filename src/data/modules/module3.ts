import type { Module } from "@/types/curriculum";

export const module3: Module = {
  id: "3",
  title: "The three buckets",
  tagline: "Every taka should have a job",
  estimatedMinutes: 11,
  hook: `"Every taka you earn should have a job. Most people have one big pile and hope. People who feel in control of money divide it into three buckets with three different jobs."`,
  context: `Bangladesh-এ বেশিরভাগ young professional-এর money system দেখতে এরকম: এক জায়গায় save, বাকি সব spend, আর কখনও কখনও একটু crypto বা random investment। কোনো structure নেই। Bucket system structure দেয় — এবং সেটাই control-এর feeling তৈরি করে।`,
  teaching: `**তিনটা bucket, তিনটা job:**

**Bucket 1 — Safety (সঞ্চয়)**
- জন্য: Emergency, short-term goals, liquidity
- কতটুকু: 3-6 মাসের essential expenses
- কোথায়: Separate bank savings account, short FDR
- এর job: Unexpected কিছু হলে আপনাকে protect করা

**Bucket 2 — Growth (বিনিয়োগ)**
- জন্য: 3+ বছরের future goals — retirement, বাড়ি, সন্তানের education
- কতটুকু: Income-এর 15-25%
- কোথায়: Sanchaypatra, DPS, selected stocks, mutual funds
- এর job: Inflation beat করে wealth grow করা

**Bucket 3 — Speculation (optional)**
- জন্য: Scratch the itch — learning, high-risk high-reward
- কতটুকু: MAX 5-10% of total savings — money you can FULLY lose
- কোথায়: Crypto, direct stock trading, anything speculative
- এর job: Not wreck you financially while letting you learn

**Bangladesh-এর common problem:**
বেশিরভাগ মানুষের শুধু Bucket 1 (savings) আর Bucket 3 (random hype) আছে। **Bucket 2 missing।** এটাই সবচেয়ে বড় gap।

**কেন এই order:**
Bucket 1 ছাড়া Bucket 2-এ crisis হলে বিক্রি করতে হয়। Bucket 2 ছাড়া Bucket 3 হলে সব হারিয়ে ফেলার risk।`,
  bdExample: `রিনা মাসে Tk 50,000 কামায়। Current system: Tk 10,000 save (savings account), Tk 5,000 crypto, বাকি spend।

New system after this module:
- Bucket 1: Tk 8,000 (emergency fund building — target: 3 months × Tk 25,000 = Tk 75,000)
- Bucket 2: Tk 5,000 DPS + Tk 2,000 Sanchaypatra
- Bucket 3: Tk 2,000 (crypto/learning)
- Remaining: Tk 33,000 for living

Same income। কিন্তু এখন প্রতিটা taka-র একটা job আছে।`,
  actionPrompt: {
    text: "আপনার current money কোথায় আছে সেটা তিনটা bucket-এ ভাগ করুন। Bucket 2 কি missing? সেটাই এই মাসে শুরু করার জায়গা।",
    cta: "Done — I mapped my buckets",
  },
  quiz: [
    {
      id: "m3q1",
      text: "An emergency fund belongs in which bucket?",
      options: ["Bucket 3 — Speculation", "Bucket 2 — Growth", "Bucket 1 — Safety", "None — keep it in cash"],
      correctIndex: 2,
      explanation: "Emergency funds must be liquid and accessible — that's Bucket 1. Never put emergency money in growth or speculation vehicles that might be down when you need them.",
    },
    {
      id: "m3q2",
      text: "You have Tk 20,000 in stocks that you might need in 4 months. What's the problem?",
      options: [
        "Stocks are always risky",
        "Short-term money in a long-term vehicle — you may need to sell at a loss",
        "Stocks don't pay dividends",
        "Nothing, this is fine",
      ],
      correctIndex: 1,
      explanation: "Short-term needs require liquid, stable money (Bucket 1). Stocks can drop 20-30% over 4 months — if you need the money, you're forced to sell at the wrong time.",
    },
    {
      id: "m3q3",
      text: "What is the maximum recommended percentage of total savings to put in Bucket 3 (speculation)?",
      options: ["50%", "25%", "5-10%", "0% — speculation is never okay"],
      correctIndex: 2,
      explanation: "5-10% max — money you can afford to lose entirely. This keeps you learning without risking your financial stability. Higher percentages turn speculation into a crisis risk.",
    },
  ],
  whatsNext: {
    moduleId: "4",
    preview: "Module 4: Hype, scams, and the Grey Zone — the 3-signal framework that spots any scam in 60 seconds.",
  },
};
