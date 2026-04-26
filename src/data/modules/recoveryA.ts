import type { Module } from "@/types/curriculum";

export const recoveryA: Module = {
  id: "recovery-a",
  title: "Where are you, actually?",
  tagline: "Honest self-assessment. No judgment.",
  estimatedMinutes: 10,
  isGreyZoneOnly: true,
  hook: `"If you've put money into crypto, betting, forex, or 'investment schemes,' you're not alone. Thousands of young Bangladeshis have. Let's figure out honestly where you are — no judgment — so you can decide what's next."`,
  context: `এই module শুধু সেই মানুষদের জন্য যারা Grey Zone-এ expose হয়েছে। এখানে কোনো judgment নেই। লক্ষ্য হল honestly বোঝা: আপনি এখন কোথায় আছেন? কারণ না জানলে কোথায় যাওয়া দরকার সেটাও বলা যায় না।`,
  teaching: `**তিনটা honest প্রশ্ন:**

**১. Total কত put in করেছেন?**
সব মিলিয়ে — crypto, betting, forex, scheme — এখন পর্যন্ত কত টাকা দিয়েছেন? Only actual amount — "it was temporary" বা "I'll win it back" count করবেন না।

**২. এই মুহূর্তে কত আছে?**
Peak-এ কত ছিল সেটা না — এখন কত আছে। Realistically।

**৩. এটা কি আপনার দরকারি টাকা?**
যে টাকা রেখেছেন — সেটা কি আপনার হারানোর capacity আছে? Rent, food, family obligation — এগুলো কি safe আছে?

**তিনটা category:**

🟢 **Net positive:** আপনি এখন পর্যন্ত profit-এ আছেন। Good position — কিন্তু সতর্ক থাকুন। Past profit ভবিষ্যতের guarantee না।

🟡 **Down but stable:** কিছু হারিয়েছেন কিন্তু essential life intact। Learning experience — costly কিন্তু manageable।

🔴 **In trouble:** Essential expenses বা debt-এ যাচ্ছে। এখানে সততার সাথে কথা বলতে হবে — নিজের সাথে, এবং সম্ভবত পরিবারের সাথে।

**Sunk cost trap:**
"আমি আরও দিলে recover হবে।" — এটা সবচেয়ে common এবং সবচেয়ে dangerous thought। Tk 50,000 থেকে Tk 2,00,000 হওয়ার pattern এটাই।

**পরিবারের সাথে কথা:**
বেশিরভাগ মানুষ loss লুকায়। এটা pressure আরও বাড়ায়। আংশিক সত্য বলা — কাউকে বলা — এমনকি সেটা relief দেয়।`,
  bdExample: `তামান্না Tk 60,000 দিয়েছে forex signal group-এ গত ৮ মাসে। এখন আছে Tk 15,000। Net loss: Tk 45,000।

সে নিজেকে বলেছে "next month recover হবে।" কিন্তু সে honest number কখনো লেখেনি।

Module-এর পর সে প্রথমবার লিখল: In = Tk 60,000। Out = Tk 15,000। Loss = Tk 45,000। Category: Down, somewhat stable (salary intact)।

এই clarity-ই ছিল প্রথম step।`,
  actionPrompt: {
    text: "এই তিনটা number লিখুন: (1) Total put in, (2) Current value, (3) Net gain/loss। তারপর category বেছে নিন: Positive / Down but stable / In trouble। Private রাখুন — কিন্তু নিজে জানুন।",
    cta: "Done — I wrote the honest numbers",
  },
  quiz: [
    {
      id: "ras1",
      text: "You've lost Tk 40,000 in forex trading. You're considering putting in Tk 20,000 more to 'recover.' This thinking is called:",
      options: [
        "Smart risk management",
        "The sunk cost trap",
        "Dollar-cost averaging",
        "Portfolio rebalancing",
      ],
      correctIndex: 1,
      explanation: "Sunk cost trap — continuing to invest because of past losses, not future prospects. The Tk 40,000 is gone regardless of what you do next. The decision should only be about whether the next Tk 20,000 has a positive expected outcome.",
    },
    {
      id: "ras2",
      text: "What is the most important first step when assessing Grey Zone exposure?",
      options: [
        "Find a better signal group",
        "Write the honest numbers: total in, current value, net",
        "Tell everyone about your losses",
        "Move everything to Bitcoin",
      ],
      correctIndex: 1,
      explanation: "You cannot make good decisions without accurate information. Most people avoid calculating their actual returns because the number is painful. Writing it down is the starting point.",
    },
    {
      id: "ras3",
      text: "Most people hide financial losses from family. What does this usually do?",
      options: [
        "Protects the family from stress",
        "Increases pressure and delays recovery",
        "Has no real effect",
        "Helps you recover faster",
      ],
      correctIndex: 1,
      explanation: "Hiding losses keeps you isolated with the problem and prevents you from getting support. The shame compounds. Even partial honesty — telling one trusted person — relieves pressure and opens options.",
    },
  ],
  whatsNext: {
    moduleId: "recovery-b",
    preview: "Recovery Module B: Rebuilding from a loss — the boring, systematic path that actually works.",
  },
};
