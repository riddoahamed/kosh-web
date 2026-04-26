import type { Module } from "@/types/curriculum";

export const module8: Module = {
  id: "8",
  title: "Your first money system",
  tagline: "The 4-bucket system, BD-adapted",
  estimatedMinutes: 12,
  hook: `"After 7 modules, you understand money. This is where you build the system. One system, simple, BD-adapted. You'll adjust it for years, but this is where it starts."`,
  context: `Western "50/30/20 rule" Bangladesh-এ কাজ করে না। Family financial support real। Inflation bites hard। Essentials অনেক বেশি percentage নেয়। আমাদের দরকার একটা BD-specific system। এটাই সেটা।`,
  teaching: `**The Kosh 4-Bucket System:**

**Bucket 1 — Essentials (45-55% of income)**
Rent, food, transport, utility bills, family support
→ Non-negotiable। এটা কমানো কঠিন।

**Bucket 2 — Emergency Fund (10-15%, until target reached)**
Separate savings account — আপনার financial safety net
→ Target পূরণ হলে এই % Bucket 3 বা 4-এ যাবে

**Bucket 3 — Future Growth (15-25%)**
DPS, Sanchaypatra, stocks (long-term) — inflation beat করা
→ এই bucket টাকে "করতে হবে" — optional না

**Bucket 4 — Life / Wants (10-20%)**
Food outside, clothes, entertainment, fun
→ এটাও mandatory। এটা ছাড়া system ৩ মাসের মধ্যে ভাঙে।

**কেন 50/30/20 fail করে Bangladesh-এ:**
The Western rule assumes 30% discretionary spending. In Bangladesh, family support obligations, higher food inflation, and urban rent often push essentials to 55-60%. The rule breaks before you start.

**Implementation — 3-month onramp:**
- Month 1: Track everything। কোনো change না। শুধু data।
- Month 2: Calculate what % each bucket actually got
- Month 3: Adjust toward target। Automate where possible।
- Month 4+: Quarterly review। Adjust as income/expenses change।

**Automation hack:**
বেতন পেলেই auto-transfer: Bucket 2 (emergency) → fixed amount। বাকি দিয়ে চলুন। "Pay yourself first।"

**Family support — the real conversation:**
যদি family support দিতে হয়, সেটাকে Bucket 1-এ রাখুন। Negotiate limits। এটা আপনার Bucket 3-কে protect করতে হবে।`,
  bdExample: `সালাহ মাসে Tk 40,000 কামায়। Current: Tk 30,000 spend (survives), Tk 8,000 save randomly, Tk 2,000 random crypto।

New system:
- Bucket 1 (Essentials): Tk 22,000 (55%)
- Bucket 2 (Emergency): Tk 4,000 (10%) → target Tk 75,000, 19 months to go
- Bucket 3 (Growth): Tk 8,000 (20%) via DPS + small stock learning
- Bucket 4 (Life): Tk 6,000 (15%)

Total: Tk 40,000। Same income। But now every taka has a job।`,
  actionPrompt: {
    text: "Draw your own 4-bucket split on paper — not in your head, on paper। Use your actual income। Put it on your wall। Revisit in 30 days।",
    cta: "Done — my 4 buckets are on paper",
  },
  quiz: [
    {
      id: "m8q1",
      text: "Why is the 'Wants' bucket (Bucket 4) necessary — not just optional?",
      options: [
        "Because spending is good for the economy",
        "Without it, people abandon the entire system within months",
        "It helps you save more in the long run",
        "It's not — discipline is enough",
      ],
      correctIndex: 1,
      explanation: "Systems without a 'Life' bucket are too restrictive. People abandon them when they can't enjoy any of their income. A small, protected wants budget keeps the system sustainable.",
    },
    {
      id: "m8q2",
      text: "Emergency fund should be built before aggressive investing because:",
      options: [
        "Banks require it",
        "Emergency forces you to sell investments at the wrong time without it",
        "Investing is illegal before you have savings",
        "Interest rates are higher on savings accounts",
      ],
      correctIndex: 1,
      explanation: "Without an emergency fund, any unexpected cost forces you to liquidate investments — possibly at a loss and at the worst time. The fund is the foundation everything else rests on.",
    },
    {
      id: "m8q3",
      text: "How often should you review and adjust your 4-bucket system?",
      options: [
        "Every day",
        "Every week",
        "Quarterly or when income/expenses change significantly",
        "Never — set it and forget it",
      ],
      correctIndex: 2,
      explanation: "Quarterly reviews balance consistency (don't constantly tinker) with adaptability (respond to real changes in income, expenses, or life circumstances). Major changes — new job, marriage, relocation — warrant an immediate review.",
    },
  ],
  whatsNext: {
    moduleId: "dashboard",
    preview: "You've completed the 0→1 track. Your certificate unlocks after your day-30 retest.",
  },
};
