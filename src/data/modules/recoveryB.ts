import type { Module } from "@/types/curriculum";

export const recoveryB: Module = {
  id: "recovery-b",
  title: "Rebuilding from a loss",
  tagline: "Boring, systematic, slow — exactly the opposite of what got you here.",
  estimatedMinutes: 12,
  isGreyZoneOnly: true,
  hook: `"The path back isn't exciting. There's no 'one trick.' No shortcut. No recovery signal group. It's slow, boring, and works. That's the whole pitch."`,
  context: `Grey Zone থেকে বের হওয়ার path কেউ exciting করে বলে না — কারণ এটা exciting না। কিন্তু এটা কাজ করে। এই module সেই ৬টা step cover করে। কেউ কেউ ১টা করে। কেউ সব। যেটা possible সেটা দিয়ে শুরু।`,
  teaching: `**Step 1 — Stop adding**
নতুন কোনো crypto, forex, scheme-এ যাবেন না। "Just this one more" — এটাই সবচেয়ে expensive thought। Existing position থাকলে আপাতত hold করুন — কিন্তু আর add করবেন না।

**Step 2 — Accept the loss**
Tk 30,000 গেছে। Tk 1 lakh গেছে। এটা gone। "Recover করব" মানে নতুন জুয়া। Accept করা মানে হার মানা না — এটা clear head দিয়ে এগোনো।

একটা কাজ: লিখুন — "আমি _____ টাকা হারিয়েছি। এটা আর নেই। আমি এখন থেকে forward দেখছি।"

**Step 3 — Build emergency fund first**
যা হারিয়েছেন তা recover করার আগে: ৩ মাসের emergency fund। কারণ emergency fund ছাড়া পরের crisis-এ আবার বাজে decision নেবেন।

Target: Monthly essentials × 3। Separate account। Start করুন — Tk 500 হলেও।

**Step 4 — Restart 4-bucket system**
Module 8-এর system। এখন extra bucket নেই। Grey Zone money stop হওয়া মানে সেই টাকা suddenly অন্য bucket-এ যাবে। Map করুন।

**Step 5 — Distance from the community**
Telegram group। WhatsApp signals। "Guru" follow। এগুলো mute করুন। Unfollow করুন। Leave করুন।

সহজ না। কিন্তু necessary। FOMO real — কিন্তু সেই group-এ 2,000 জনের মধ্যে ৯০%+ quietly losing।

**Step 6 — If debt is involved**
Loan নিয়ে invest করলে এটা urgent। Priority order:
1. Stop borrowing more
2. বিশ্বস্ত পরিবারকে জানান
3. আয় থেকে একটু করে systematic repayment শুরু করুন

Debt hide করলে সুদ বাড়ে। জানানো কঠিন — কিন্তু লুকানো আরো কঠিন।

**Mental health note:**
Financial loss-এর সাথে shame, anxiety, depression আসতে পারে। এটা weakness না।
- **কান পেতে রই (Kaan Pete Roi):** 01779-554391 (বাংলায় emotional support)
- **Moner Bondhu:** monerbondhu.com (professional mental health)`,
  bdExample: `রাফি ৮ মাসে Tk 90,000 হারিয়েছে crypto-তে। Family জানে না। Loan আছে Tk 30,000।

Step 1: আর কোনো new position নেয়নি।
Step 2: বন্ধুকে বলেছে — first time মুখে বলা।
Step 3: Emergency fund শুরু করেছে Tk 1,000/month।
Step 4: Salary এলে auto-transfer করে।
Step 5: Signal group সব leave করেছে।
Step 6: মাকে ছোট করে জানিয়েছে — পরিমাণটা নয়, situation টা।

১৮ মাসে loan শেষ হয়েছে। Emergency fund Tk 18,000 হয়েছে। Crypto নেই।

"আমি rich হইনি। কিন্তু আমি stable।" — এটাই জয়।`,
  actionPrompt: {
    text: "৬টা step-এর মধ্যে আজ কোনটা নিতে পারবেন? একটা বেছে নিন। শুধু একটা। এখনই।",
    cta: "Done — I picked one step to take today",
  },
  quiz: [
    {
      id: "rbq1",
      text: "You've lost Tk 80,000 in crypto. The best first step is:",
      options: [
        "Find a better strategy to win it back",
        "Stop adding any new money and accept the loss as gone",
        "Tell everyone what happened",
        "Move to a different platform",
      ],
      correctIndex: 1,
      explanation: "Acceptance is the foundation. 'Winning it back' usually means more losses — it's the sunk cost trap. Accept it as gone, then rebuild forward.",
    },
    {
      id: "rbq2",
      text: "Why build an emergency fund BEFORE trying to recover trading losses?",
      options: [
        "Banks require it",
        "Emergency funds earn higher interest",
        "Without it, the next crisis forces another bad decision",
        "It's required by law",
      ],
      correctIndex: 2,
      explanation: "Without a safety net, any financial emergency pushes you back to high-risk 'quick returns.' The emergency fund breaks that cycle.",
    },
    {
      id: "rbq3",
      text: "Leaving signal groups and unfollowing crypto 'gurus' is recommended because:",
      options: [
        "It's illegal to follow them",
        "FOMO from those communities drives further bad decisions",
        "The information is always wrong",
        "You should only follow banks",
      ],
      correctIndex: 1,
      explanation: "FOMO is real and constant in these communities. Distance reduces the emotional pull to 'get back in.' The groups amplify survivor stories — most members are quietly losing.",
    },
  ],
  whatsNext: {
    moduleId: "5",
    preview: "Module 5: The emergency fund nobody builds — your next concrete financial step.",
  },
};
