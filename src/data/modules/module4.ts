import type { Module } from "@/types/curriculum";

export const module4: Module = {
  id: "4",
  title: "Hype, scams, and the Grey Zone",
  tagline: "3 signals. Any scam. 60 seconds.",
  estimatedMinutes: 13,
  hook: `"Bangladesh has seen Destiny, Evaly, e-orange, and countless forex Facebook groups. Every scam has the same three ingredients. Once you know them, you can spot any scam within 60 seconds."`,
  context: `বাংলাদেশে financial scam নতুন কিছু না। কিন্তু প্রতিবার একটু নতুন রূপে আসে — crypto, forex signal, halal investment scheme। তবুও core pattern একই থাকে। এই তিনটা signal জানলে আপনি যেকোনো নতুন scheme-ও চিনতে পারবেন।`,
  teaching: `**The 3-Signal Scam Framework:**

**Signal 1 — Guaranteed Return (গ্যারান্টিড রিটার্ন)**
Finance-এ কিছুই guaranteed না, inflation beat করার উপরে। যে কেউ "guaranteed 15% monthly" বা "100% halal guaranteed return" বলছে — সে হয় মিথ্যা বলছে অথবা জানে না। Walk away।

**Signal 2 — Time Pressure (সময়ের চাপ)**
"Offer আজকেই শেষ" / "মাত্র 3টা seat বাকি" / "কাল price বাড়বে।" Real investment-এ urgency থাকে না। Urgency দিয়ে আপনার due diligence এড়ানোর চেষ্টা করা হয়।

**Signal 3 — Paid Through Recruitment (recruitment দিয়ে আয়)**
যদি আপনি মূলত অন্যদের নিয়ে এসে আয় করেন — pyramid scheme। Destiny, Evaly, বেশিরভাগ MLM এই pattern follow করে।

**কেন আমরা পড়ি:**
- Financial insecurity + aspiration + social proof = একটা powerful combination
- WhatsApp/Telegram group-এ শুধু winners দেখা যায় — losers চুপ থাকে (survivor bias)
- "আমার cousin profit করেছে" — আপনি সেই information দিয়ে ভুল decision নিচ্ছেন

**Grey Zone:**
Crypto exchanges, betting apps, forex signal groups। এগুলো সব scam না — কিন্তু বেশিরভাগ retail user lose করে। Math আপনার বিরুদ্ধে। `,
  bdExample: `একটা Facebook ad বলছে: "Join our forex mentorship, students making Tk 2 lakh in first month. Limited seats at Tk 25,000 fee।"

Three signals apply করুন:
1. ✓ Guaranteed-ish returns (student screenshots)
2. ✓ Urgency ("limited seats")
3. ✓ Revenue comes from your Tk 25,000 fee, not from their trading profits

তিনটাই আছে। এটা একটা information business dressed up as a trading business। যদি trading-ই কাজ করত, courses বেচার দরকার হত না।`,
  actionPrompt: {
    text: "আপনার WhatsApp বা Facebook-এ এই সপ্তাহে কোনো 'investment opportunity' এসেছে? ৩টা signal দিয়ে check করুন। কোনটা কি থামিয়ে দিচ্ছে?",
    cta: "Done — I ran the 3-signal test",
  },
  quiz: [
    {
      id: "m4q1",
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
      id: "m4q2",
      text: "A 'mentor' earns primarily from Tk 25,000 course fees, not from their own trading. What does this tell you?",
      options: [
        "They are very generous sharing knowledge",
        "Their actual trading strategy may not work reliably",
        "The course is expensive because it's high quality",
        "This is normal for educators",
      ],
      correctIndex: 1,
      explanation: "If their trading strategy worked as claimed, selling courses would be a distraction. The business model reveals the truth: the revenue is selling hope, not trading profits.",
    },
    {
      id: "m4q3",
      text: "In a Telegram group of 5,000 'successful' forex traders posting wins — why is the real average likely a loss?",
      options: [
        "Forex is illegal in Bangladesh",
        "Survivor bias — you only see the winners, losers leave silently",
        "The group admin is cheating",
        "5,000 is too many people to all win",
      ],
      correctIndex: 1,
      explanation: "Survivors post. Losers leave quietly. In any group, you're seeing a biased sample — only the people who are winning (or want to look like they are) speak up.",
    },
  ],
  whatsNext: {
    moduleId: "5",
    preview: "Module 5: The emergency fund nobody builds — and why it's the single most important financial tool you can have.",
  },
};
