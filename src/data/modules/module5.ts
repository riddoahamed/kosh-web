import type { Module } from "@/types/curriculum";

export const module5: Module = {
  id: "5",
  title: "The emergency fund nobody builds",
  tagline: "3-6 months. Separate account. Start now.",
  estimatedMinutes: 10,
  hook: `"Job ends unexpectedly. Hospital emergency. Family crisis. Three things that happen to most Bangladeshis at some point — and that most of us aren't financially ready for. An emergency fund is the single most important financial tool you can build before everything else."`,
  context: `Bangladesh-এ job security অনেক কম। Medical cost unpredictable। পরিবারের pressure real। এই realities মাথায় রেখে emergency fund তৈরি করা শুধু "good advice" না — এটা survival strategy।`,
  teaching: `**Emergency Fund কী:**
3 থেকে 6 মাসের essential expenses, আলাদা savings account-এ রাখা। Daily account থেকে আলাদা — কিন্তু accessible।

**কেন 3-6 মাস:**
- Bangladesh-এ average job search: 2-3 মাস
- Major medical emergency: Tk 50,000–3,00,000 (hospitalization)
- Family crisis (বিয়ে, মৃত্যু, accident): unpredictable

**কোথায় রাখবেন:**
✓ Separate savings account (same bank, different account)
✓ Short-term FDR (90-day break-able)
✗ Same account as daily spending
✗ Cash at home (inflation + family pressure)
✗ Stocks বা crypto (can be down when you need it)

**কেন "jomano taka" (বাড়িতে টাকা) যথেষ্ট না:**
1. Inflation eats it silently
2. Theft risk
3. Family pressure — "একটু দাও" adds up

**কীভাবে শুরু করবেন:**
Step 1: Calculate your monthly essential expenses (rent + food + transport + bills)
Step 2: Target = Step 1 × 3 (minimum) to × 6
Step 3: Open a separate savings account এই সপ্তাহে
Step 4: Salary পেলে আগে সেখানে Tk 1,000-5,000 দিন — বাকি দিয়ে চলুন

2-3 বছর লাগতে পারে পুরো fund তৈরি হতে। সেটা normal। Start করাটাই important।`,
  bdExample: `কারিম-এর মা-কে hospital-এ ভর্তি করাতে হয় হঠাৎ — cost Tk 80,000। Karim-এর emergency fund ছিল Tk 1 lakh, সে সম্পূর্ণ cover করতে পেরেছে without loans বা family chaos।

তার বন্ধু Shakib, একই situation-এ, borrow করতে হয়েছে 2% monthly interest-এ। ১ বছরে সে ফেরত দিয়েছে Tk 1,00,000+ interest।

Same crisis। Two completely different outcomes। একটা emergency fund-এর কারণে।`,
  actionPrompt: {
    text: "এই সপ্তাহে: আপনার monthly essential expenses calculate করুন (rent + food + transport + bills)। সেটার ৩ গুণ = আপনার minimum emergency fund target। আলাদা account আছে? না থাকলে — এই সপ্তাহেই খুলুন।",
    cta: "Done — I calculated my target",
  },
  quiz: [
    {
      id: "m5q1",
      text: "Emergency fund should be at least how many months of essential expenses?",
      options: ["1 month", "3 months", "6 months", "12 months"],
      correctIndex: 1,
      explanation: "3 months is the minimum — covering average job search time and a significant medical emergency. 6 months is better if your income is irregular or your industry is unstable.",
    },
    {
      id: "m5q2",
      text: "Best place to keep your emergency fund:",
      options: [
        "Cash at home — most accessible",
        "Stocks — for better returns",
        "Separate savings account",
        "Crypto — could grow fast",
      ],
      correctIndex: 2,
      explanation: "Emergency funds need to be accessible and stable. Stocks and crypto can drop 30-50% when you need them most. Cash at home loses to inflation and family pressure. A separate savings account is the right balance.",
    },
    {
      id: "m5q3",
      text: "You have Tk 5,000 saved and your emergency fund target is Tk 1,50,000. Is it worth starting now?",
      options: [
        "No — wait until you can save more at once",
        "Yes — Tk 5,000 is still Tk 5,000 of protection",
        "No — the target is too far away",
        "Only if you have no other expenses",
      ],
      correctIndex: 1,
      explanation: "Always start, even small. Tk 5,000 covers a minor emergency. Tk 20,000 covers a bigger one. The fund grows with each contribution. Waiting for the 'right amount' means never starting.",
    },
  ],
  whatsNext: {
    moduleId: "6",
    preview: "Module 6: Real options in Bangladesh — FDR, Sanchaypatra, DPS, gold, DSE explained honestly.",
  },
};
