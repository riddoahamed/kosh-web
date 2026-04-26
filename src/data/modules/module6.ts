import type { Module } from "@/types/curriculum";

export const module6: Module = {
  id: "6",
  title: "Real options in Bangladesh",
  tagline: "FDR, Sanchaypatra, DPS, gold, DSE — honestly compared",
  estimatedMinutes: 12,
  hook: `"Every Bangladeshi has heard these words: FDR, Sanchaypatra, DPS, gold, DSE. Few people know what they actually are, who they're for, and how they compare. Here's the 10-minute version you should've learned in school."`,
  context: `বাংলাদেশে legitimate financial products সম্পর্কে সঠিক তথ্য পাওয়া কঠিন। Bank-রা নিজেদের product sell করে। Brokers commission চায়। Guru-রা "sure thing" বলে। Kosh কিছু বেচছে না — শুধু options-গুলো honestly explain করছে।`,
  teaching: `**FDR (Fixed Deposit Receipt)**
- কী: Bank-এ নির্দিষ্ট মেয়াদে fixed rate-এ টাকা রাখা
- মেয়াদ: 3 months থেকে 3 years
- Rate: 7-9% (বর্তমান)
- ভালো কারণ: Safe, predictable, FDIC-equivalent guarantee
- সীমাবদ্ধতা: Inflation থেকে সামান্য হলেও পিছিয়ে, early withdrawal penalty
- কার জন্য: Short-medium term savings যা সহজে দরকার হবে না

**Sanchaypatra (সঞ্চয়পত্র)**
- কী: Bangladesh government-এর savings certificate
- Rate: 10.5-11.5% (currently — সরকারি rate, বাজারের best)
- মেয়াদ: সাধারণত 3-5 years
- ভালো কারণ: সর্বোচ্চ safe return, government guarantee, inflation-কাছাকাছি
- সীমাবদ্ধতা: Purchase limit আছে (NID-based), TIN required, early withdrawal সম্ভব কিন্তু penalty
- কার জন্য: Stable income যাদের, 3-5 বছর দরকার নেই এমন টাকার জন্য

**DPS (Deposit Pension Scheme)**
- কী: Bank-এ monthly installment savings, নির্দিষ্ট মেয়াদে
- Rate: 6-9%
- মেয়াদ: 3-10 years
- ভালো কারণ: Forced discipline, automatic savings, predictable
- সীমাবদ্ধতা: FDR বা Sanchaypatra-র চেয়ে কম rate, premature closure costly
- কার জন্য: যাদের monthly salary থেকে নিয়মিত save করতে চান

**Gold (সোনা)**
- কী: Physical বা digital gold ownership
- Return: Historically inflation-resistant in BD
- ভালো কারণ: Inflation hedge, recognizable asset, cultural acceptance
- সীমাবদ্ধতা: No regular income, storage cost/risk (physical), spread between buy/sell
- কার জন্য: Long-term store of value, portfolio diversification

**DSE (Dhaka Stock Exchange)**
- কী: Listed company-র shares কেনা
- Return: Variable — positive over long term historically, but volatile
- ভালো কারণ: Ownership of real companies, dividend income, inflation-beating potential
- সীমাবদ্ধতা: Requires real knowledge, time, risk management। Most retail investors lose money without education।
- কার জন্য: Long-term (5+ years), willing to learn seriously

**Kosh-এর position:** আমরা কোনো specific product recommend করি না। প্রত্যেকের situation আলাদা। এই module-এর কাজ: options সম্পর্কে honest বোঝাপড়া।`,
  bdExample: `তিনজনের তিন situation:
- **Arif (24, first job):** Emergency fund নেই → DPS শুরু করুক, Sanchaypatra পরে
- **Nila (28, stable job, emergency fund আছে):** Sanchaypatra + DSE index fund (small amount, learning)
- **Rahim (35, irregular income):** FDR (flexible maturity) + Sanchaypatra → most suitable

Same advice সবার জন্য কাজ করে না।`,
  actionPrompt: {
    text: "এই পাঁচটার মধ্যে একটা বেছে নিন যেটা আপনি এই মাসে আরও ভালো বুঝতে চান। Cohort group-এ বলুন — পরের call-এ সেটা নিয়ে আলোচনা করব।",
    cta: "Done — I picked one to research",
  },
  quiz: [
    {
      id: "m6q1",
      text: "Among the 'safe' options (not stocks), which currently offers the highest typical return in Bangladesh?",
      options: ["FDR", "DPS", "Sanchaypatra", "Savings account"],
      correctIndex: 2,
      explanation: "Sanchaypatra currently offers 10.5-11.5% — the highest among government-backed/bank instruments. It's also the closest to inflation-neutral.",
    },
    {
      id: "m6q2",
      text: "Best option for someone who wants to save Tk 2,000/month systematically for 5 years:",
      options: ["Gold", "DPS", "DSE stocks", "FDR"],
      correctIndex: 1,
      explanation: "DPS (Deposit Pension Scheme) is designed for exactly this — monthly contributions over a fixed term. It builds the savings habit and offers a predictable return.",
    },
    {
      id: "m6q3",
      text: "For a 20-year financial goal, which is historically most likely to beat inflation?",
      options: [
        "FDR — safest option",
        "Savings account — most liquid",
        "Stocks or gold — higher long-term return potential",
        "DPS — most disciplined",
      ],
      correctIndex: 2,
      explanation: "Over 20 years, equities (stocks) and gold have historically outpaced inflation globally and in Bangladesh. FDR and savings accounts generally don't — safe but slow.",
    },
  ],
  whatsNext: {
    moduleId: "7",
    preview: "Module 7: Crypto, forex, and what's actually legal in Bangladesh — the honest breakdown.",
  },
};
