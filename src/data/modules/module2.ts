import type { Module } from "@/types/curriculum";

export const module2: Module = {
  id: "2",
  title: "Inflation: why your FDR is quietly losing",
  tagline: "Real return = nominal return − inflation",
  estimatedMinutes: 10,
  hook: `"If your bank gives you 5% interest and prices go up 9% this year, you didn't earn 5%. You lost 4% in real value. Most Bangladeshis don't realize their savings account is a slow leak."`,
  context: `Bangladesh-এ inflation এখন 8-11% range-এ আছে। Bank savings account দেয় 4-6%। FDR দেয় 7-9%। Surface-এ দেখলে মনে হয় টাকা grow করছে — কিন্তু real value-তে হিসাব করলে অন্য ছবি। এই concept না জানলে আপনি technically সব ঠিক করেও actually পিছিয়ে যাবেন।`,
  teaching: `**Inflation মানে কী?**
সময়ের সাথে জিনিসপত্রের দাম বাড়া। ২০১৫ সালে ১ কেজি চাল যদি Tk 50 হত, এখন সেটা Tk 75+।

**Real return formula:**
Real return = Nominal return − Inflation rate
- Bank 5% interest, inflation 9% → Real return = **−4%**
- FDR 8%, inflation 9% → Real return = **−1%**
- Sanchaypatra 10.5%, inflation 9% → Real return = **+1.5%** ✓

**Bangladesh-এর current picture:**
| Product | Nominal Return | Real Return (9% inflation) |
|---|---|---|
| Savings account | 4-6% | −3% to −5% |
| FDR | 7-9% | −0% to −2% |
| Sanchaypatra | 10.5-11% | +1.5% to +2% |
| Stock market (avg) | Variable | Potentially positive |

**কী beat করে inflation (সাধারণত):**
Equities (stocks), real estate, gold, Sanchaypatra — এগুলো inflation-এর সাথে পাল্লা দিতে পারে।

**কী beat করে না:**
Cash, savings account, regular FDR — এগুলো safe কিন্তু real value হারায়।

**Important nuance:** "Safe" মানে এই না যে real value ঠিক থাকবে। Bank account theft থেকে safe — inflation থেকে না।`,
  bdExample: `Tk 10,000 রাখলেন savings account-এ, 5% interest। ১ বছর পর account-এ Tk 10,500। কিন্তু যা কিনতে পারতেন Tk 10,000 দিয়ে, এখন সেটা কিনতে লাগবে Tk 10,900। আপনার টাকা কমেনি, কিন্তু আপনার purchasing power কমেছে Tk 400। Bank statement সবুজ — কিন্তু আপনি আসলে পিছিয়েছেন।`,
  actionPrompt: {
    text: "আপনার bank-এর current savings rate খুঁজে বের করুন। সেখান থেকে 9% বাদ দিন। সেটাই আপনার real return। যদি negative হয় — আপনার টাকা এখন কতটা আছে সেটা কি reconsider করা দরকার?",
    cta: "Done — I checked my real return",
  },
  quiz: [
    {
      id: "m2q1",
      text: "Inflation 10%, FDR interest 8%. What is the real return?",
      options: ["+18%", "+2%", "−2%", "0%"],
      correctIndex: 2,
      explanation: "Real return = 8% − 10% = −2%. Your money grows in number but shrinks in purchasing power.",
    },
    {
      id: "m2q2",
      text: "If you keep all your savings in a standard bank account for 10 years in Bangladesh, your wealth will (in real terms):",
      options: ["Grow significantly", "Stay the same", "Shrink", "Double"],
      correctIndex: 2,
      explanation: "If inflation consistently outpaces your savings interest rate — which it has in Bangladesh — your real purchasing power shrinks year after year.",
    },
    {
      id: "m2q3",
      text: "True or false: Keeping money in a bank savings account is 'safe.'",
      options: [
        "True — banks are guaranteed",
        "False — it's safe from theft but not from inflation",
        "True — interest always beats inflation",
        "False — banks can fail anytime",
      ],
      correctIndex: 1,
      explanation: "Bank deposits are safe from theft and bank failure (up to limits). But they are NOT safe from inflation eroding purchasing power. Both risks exist — and inflation is the one most people ignore.",
    },
  ],
  whatsNext: {
    moduleId: "3",
    preview: "Module 3: The three buckets — a simple system to organize every taka you earn.",
  },
};
