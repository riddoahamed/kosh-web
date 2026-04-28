import type { Module } from "@/types/curriculum";

export const module7: Module = {
  id: "7",
  title: "Crypto, forex, and what's actually legal in Bangladesh",
  tagline: "The law. The math. The honest picture.",
  estimatedMinutes: 11,
  hook: `"Crypto is the most-talked-about, least-understood money topic among young Bangladeshis. Let's separate three things: what crypto actually is, what the law says in Bangladesh, and what happens to most retail traders. All three are usually mixed up in conversation."`,
  context: `বাংলাদেশে crypto এবং forex নিয়ে দুটো extreme দেখা যায়: এক দল বলে "এটাই ভবিষ্যৎ, সব invest করো," আরেক দল বলে "এটা হারাম, সব scam।" সত্যটা দুটোর মাঝখানে — এবং অনেক বেশি nuanced। Kosh-এর কাজ এই nuance explain করা।`,
  teaching: `**Crypto কী:**
Digital assets যার কোনো central issuer নেই। Bitcoin সবচেয়ে পরিচিত — কিন্তু thousands of cryptocurrencies আছে। Mostly speculative assets। High volatility।

**Crypto কী না:**
- Daily currency (Bangladesh-এ use করার উপায় নেই practically)
- Safe store of value (short-term — huge volatility)
- Guaranteed return (price prediction কেউ reliably করতে পারে না)

**Bangladesh-এর legal status:**
Bangladesh Bank 2017 সাল থেকে বলে আসছে যে retail cryptocurrency trading permitted না। ২০২৪-২৫ সালেও এই position same আছে। Enforcement inconsistent — কিন্তু legal risk real।

P2P workaround (USDT buy/sell via bKash) technically এই restriction circumvent করে — এবং সেটাও legally grey।

**Forex-এর situation:**
Currency pair trading (EUR/USD etc.) retail-এ Bangladesh-এ generally permitted না। বেশিরভাগ "forex mentorship" programs হয় scam অথবা survivor-bias education বিক্রি করছে।

**কী math বলছে:**
Global studies: 70-90% retail crypto/forex traders ১ বছরের মধ্যে net loss করে। Bangladesh-এ probably worse কারণ:
- Less financial education
- More predatory signal groups
- Currency exposure adds risk

**Kosh-এর honest position:**
Kosh anti-crypto না। Kosh pro-informed-decision। যদি engage করতে চান:
1. Legal situation জানুন
2. Mathematical odds জানুন
3. Specific Bangladesh scam patterns জানুন
4. কেউ price reliably predict করতে পারে না — এটা accept করুন`,
  bdExample: `ফারহান একটা Telegram group-এ join করলো যেখানে 'signals' দিত কোন coin কখন কিনতে হবে। First month সে 30% profit করলো। সে Tk 2 lakh invest করলো।

Next month signals miss হলো। সে Tk 80,000 হারালো। Group admin বলল "just wait, more signals coming।" ৬ মাস পর Farhan-এর total loss: Tk 1.3 lakh।

Group-এ 2,000 members। 10-15 জন loudly profit share করে। 1,985 জন silent। সেটাই pattern।`,
  actionPrompt: {
    text: "যদি আপনার crypto exposure থাকে: actual total return calculate করুন — সব trades এর পর। মনে নেই — actually calculate করুন। বেশিরভাগ মানুষ এটা avoid করে।",
    cta: "Done — I calculated my real return",
  },
  quiz: [
    {
      id: "m7q1",
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
      id: "m7q2",
      text: "The main reason crypto/forex 'signal groups' appear successful is:",
      options: [
        "The signals genuinely work",
        "Survivor bias — you only see the winners, losers leave quietly",
        "The admin is very skilled",
        "Crypto always goes up eventually",
      ],
      correctIndex: 1,
      explanation: "Survivor bias is the key. In a group of 2,000, even random guessing would produce some big winners. Those winners post loudly. The 1,900+ losers leave quietly. You're seeing a biased sample.",
    },
    {
      id: "m7q3",
      text: "True or false: With the right technical analysis strategy, you can reliably predict short-term crypto prices.",
      options: [
        "True — experienced traders can do this",
        "False — no credible evidence this works sustainably",
        "True — but only for Bitcoin",
        "Depends on market conditions",
      ],
      correctIndex: 1,
      explanation: "There is no credible, reproducible evidence that retail traders can reliably predict short-term crypto prices. If such a strategy existed and worked consistently, institutional money would use it until the edge disappeared.",
    },
  ],
  whatsNext: {
    moduleId: "8",
    preview: "Module 8: Your first money system — put everything together into one simple Bangladesh-adapted framework.",
  },
};
