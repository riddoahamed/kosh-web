// ============================================================
// KOSH — ACTION NUDGES
// Concrete next-step suggestions for every module
// Rules:
//   - Never name specific banks or brokers (vendor-neutral)
//   - Always give steps the user can verify themselves
//   - Specify small amounts (Tk 500 - Tk 5,000) when money is involved
//   - Frame as "if you have X, here's what you could do" — never as advice
//   - Keep text under 4 sentences
// ============================================================

import type { ActionNudge } from "@/types/curriculum";

export const actionNudges: Record<string, ActionNudge> = {

  // ─────────────────────────────────────────────────────────
  // ZONE 1 — Money Foundations
  // ─────────────────────────────────────────────────────────

  "1": {
    text: "Open your bank app and your bKash or Nagad app right now. Look at the last 30 days of transactions. Don't categorize, don't judge — just see where your money has actually been going. This 5-minute exercise is the foundation of every other financial decision you'll make.",
    ctaText: "I'll do this today",
    estimatedTime: "5 minutes",
    category: "review",
  },

  "2": {
    text: "Find out the current inflation rate in Bangladesh by visiting bb.org.bd (Bangladesh Bank) or searching 'Bangladesh inflation rate'. Compare it to the interest rate on your savings account. If your savings account rate is lower than inflation, your money is shrinking in real value — and you now have a number to prove it.",
    ctaText: "I checked the gap",
    estimatedTime: "5 minutes",
    category: "research",
  },

  "3": {
    text: "If you don't already have one, open a second bank account at a different bank from your main one this week. Even with zero balance to start. This becomes your emergency fund account — separate so you can't accidentally spend it. Most banks let you open online or with one branch visit.",
    ctaText: "I'll set this up",
    estimatedTime: "30 minutes",
    category: "setup",
  },

  "4": {
    text: "Right now, ignore one financial 'opportunity' that came to you recently — a WhatsApp tip, a friend's MLM pitch, a 'guaranteed' scheme. Just notice that you have the option to walk away. This is the most underrated financial skill: doing nothing when something feels off.",
    ctaText: "I'll practice this",
    estimatedTime: "1 minute",
    category: "review",
  },

  "5": {
    text: "Calculate your essential monthly expenses (rent, food, transport, utilities, family support). Multiply by 3. That's your minimum emergency fund target. If you have less than this in liquid savings right now, your first financial priority is filling this gap — even at Tk 1,000 per month.",
    ctaText: "I calculated my number",
    estimatedTime: "10 minutes",
    category: "review",
  },

  "6": {
    text: "Visit nationalsavings.gov.bd this week and note the current rates for Sanchaypatra. Then check your bank's website for current FDR and DPS rates. You now have real numbers — your starting point for any future savings decision.",
    ctaText: "I noted the rates",
    estimatedTime: "15 minutes",
    category: "research",
  },

  "7": {
    text: "If you've ever considered crypto, online betting, or 'forex trading' platforms — visit Bangladesh Bank's website and search for their current position on these. Save what you find. Next time you're tempted by such an opportunity, you'll have official information instead of just instinct.",
    ctaText: "I researched this",
    estimatedTime: "10 minutes",
    category: "research",
  },

  "8": {
    text: "Set up one automatic transfer to a savings account on your salary day. Start with Tk 1,000 if that's what fits. The amount matters less than the automation — money you never see is money you never spend. Most banks let you set this up in 5 minutes through their app.",
    ctaText: "I set up auto-transfer",
    estimatedTime: "15 minutes",
    category: "setup",
  },

  "recovery-a": {
    text: "Write down — on paper or in your phone — exactly what happened to your money. Amount lost, what you tried, what you'd do differently. This isn't to feel bad. It's so the lesson actually transfers. Most people skip this step and repeat the mistake.",
    ctaText: "I'll write it down",
    estimatedTime: "20 minutes",
    category: "review",
  },

  "recovery-b": {
    text: "Identify one small, boring, slow financial action you can take this week. Open a savings account. Put Tk 500 into it. Yes, just Tk 500. The point is rebuilding the habit of money decisions that don't promise anything dramatic. Boring is the path back.",
    ctaText: "I'll do one boring thing",
    estimatedTime: "30 minutes",
    category: "small_action",
  },

  // ─────────────────────────────────────────────────────────
  // ZONE 2 — Tracking & Budgeting
  // ─────────────────────────────────────────────────────────

  "z2-1": {
    text: "For 7 days starting tomorrow, write down every transaction Tk 100 or above. Don't categorize, don't judge — just observe. Use any notes app, paper, or your bank's automatic statement. After 7 days, you'll know more about your spending than 90% of people your age.",
    ctaText: "I'll start observing",
    estimatedTime: "1 minute per day",
    category: "review",
  },

  "z2-2": {
    text: "Open your bKash or Nagad transaction history right now. Scroll back 60 days. Group transactions roughly into: family transfers, bills, cash withdrawals, merchant purchases. This 15-minute exercise gives you 2 months of free budget data you didn't know you had.",
    ctaText: "I categorized 60 days",
    estimatedTime: "15 minutes",
    category: "review",
  },

  "z2-3": {
    text: "Set up your account structure this week. You need: one main account where salary lands, one separate account at a different bank for emergency fund. If you only have one account, opening the second is your immediate next step. Most banks let you open online with NID + photo.",
    ctaText: "I'll set up the second account",
    estimatedTime: "30 minutes",
    category: "setup",
  },

  "z2-4": {
    text: "Compare your monthly expenses now to two years ago (estimate if no records). By how much did income increase? By how much did expenses increase? If expenses grew faster than income — you have lifestyle inflation. The fix starts with knowing the number.",
    ctaText: "I calculated my drift",
    estimatedTime: "20 minutes",
    category: "review",
  },

  "z2-5": {
    text: "Pick a date this month — say the 1st or the 15th — to do your first 5-number monthly check-in. Write the date in your calendar with a reminder. The first one will take 20 minutes. After that, 10 minutes each month. This single habit will change how you see your money in 6 months.",
    ctaText: "I scheduled my check-in",
    estimatedTime: "5 minutes to schedule",
    category: "setup",
  },

  // ─────────────────────────────────────────────────────────
  // ZONE 3 — Debt & Credit
  // ─────────────────────────────────────────────────────────

  "z3-1": {
    text: "List every debt or loan you currently have. For each, write: amount owed, annual interest rate, and what it was used for. If any debt is at 18% or higher and was used for consumption (not productive purposes), make it your priority to address. The list itself is the action.",
    ctaText: "I listed my debts",
    estimatedTime: "20 minutes",
    category: "review",
  },

  "z3-2": {
    text: "If you have a credit card, find the actual annual interest rate (APR or monthly rate × 12). Most BD credit cards charge 20-24% annually. If you're carrying a balance, calculate what you've paid in interest over the last 6 months. This number is real money out of your pocket.",
    ctaText: "I found my actual rate",
    estimatedTime: "10 minutes",
    category: "review",
  },

  "z3-3": {
    text: "If you've used any digital lending (bKash credit, salary loan apps, BNPL) in the last year, find the actual annual interest rate of that product. Most charge 18-36% annually when calculated properly. Knowing the real cost changes how you'll use them next time.",
    ctaText: "I checked the real cost",
    estimatedTime: "15 minutes",
    category: "research",
  },

  "z3-4": {
    text: "Calculate your total monthly debt service (all loan EMIs + minimum credit card payments) divided by your take-home income. If this is above 35%, you have a structural debt issue requiring active attention. If below 25%, you're in safe territory. The number tells you what you're actually dealing with.",
    ctaText: "I calculated my ratio",
    estimatedTime: "10 minutes",
    category: "review",
  },

  "z3-5": {
    text: "Bangladesh Bank's CIB maintains a record of your loan history. You can request your own report through your bank or directly from Bangladesh Bank. If you're planning a major loan in the next 2 years (home loan, business loan), checking your record now lets you fix any errors before they cost you.",
    ctaText: "I'll check my CIB",
    estimatedTime: "Form takes 30 minutes",
    category: "research",
  },

  // ─────────────────────────────────────────────────────────
  // ZONE 4 — Tax & Government Systems
  // ─────────────────────────────────────────────────────────

  "z4-1": {
    text: "Calculate your total annual income from all sources. If it exceeds Tk 3.5 lakh (the current tax-free threshold for general taxpayers), you may owe income tax. Go to nbr.gov.bd to check the current threshold and slabs. Knowing whether you owe tax is step one — most young earners don't know.",
    ctaText: "I checked my position",
    estimatedTime: "15 minutes",
    category: "research",
  },

  "z4-2": {
    text: "Calculate 25% of your annual taxable income — that's your maximum qualifying investment for tax rebate. Then total your current qualifying investments (DPS, Sanchaypatra, life insurance premiums, approved mutual funds). The gap is unclaimed tax savings. At 15% rebate, every Tk 10,000 of unclaimed gap is Tk 1,500 in foregone benefit.",
    ctaText: "I calculated my gap",
    estimatedTime: "20 minutes",
    category: "review",
  },

  "z4-3": {
    text: "Find your local tax circle office (based on your residential area) and locate the current year's return form at nbr.gov.bd. You don't need to file right now. Just know where to find what you'd need when filing season comes. NBR also runs Tax Fairs in October-November where filing assistance is provided.",
    ctaText: "I located my tax circle",
    estimatedTime: "15 minutes",
    category: "research",
  },

  "z4-4": {
    text: "Look at your last mobile recharge and a recent restaurant bill where VAT was charged. Estimate how much in indirect tax you've paid this month across mobile, food, and other VAT-charged services. Most people pay Tk 2,000-5,000 monthly in invisible taxes without realizing it. Awareness is the action.",
    ctaText: "I estimated my indirect taxes",
    estimatedTime: "10 minutes",
    category: "review",
  },

  "z4-5": {
    text: "If you don't have a TIN, register for one online at secure.incometax.gov.bd this week. You need NID, an email, and a phone number. The process takes 30 minutes and costs nothing. There's no income threshold to register, and having a TIN saves you 5% on bank interest deductions immediately.",
    ctaText: "I'll get my TIN",
    estimatedTime: "30 minutes",
    category: "setup",
  },

  // ─────────────────────────────────────────────────────────
  // ZONE 5 — Savings Products Deep-Dive
  // ─────────────────────────────────────────────────────────

  "z5-1": {
    text: "If you have Tk 5,000 or more that you genuinely won't need for 3 years, you can buy a Bangladesh Sanchaypatra at any post office or authorized bank this week. Bring your NID and TIN. The 30-minute process gives you one of the highest safe returns available in Bangladesh — backed by the government.",
    ctaText: "I'll research this further",
    estimatedTime: "30 minutes for purchase",
    category: "small_action",
  },

  "z5-2": {
    text: "Call your bank or visit their website and ask for their current FDR rates across different terms (3-month, 6-month, 1-year, 2-year). Compare to one other bank. The rate difference of even 0.5-1% adds up significantly on larger deposits. Knowing your alternatives means you're never locked into a sub-optimal rate.",
    ctaText: "I compared rates",
    estimatedTime: "20 minutes",
    category: "research",
  },

  "z5-3": {
    text: "Most BD banks let you open a DPS with as little as Tk 500 monthly. If you can commit to Tk 1,000-3,000 monthly without affecting your essentials, opening a DPS is a way to lock in the savings habit. Set the auto-debit on your salary day. The system saves before you can decide not to.",
    ctaText: "I'll explore DPS",
    estimatedTime: "1 hour for setup",
    category: "small_action",
  },

  "z5-4": {
    text: "If you currently hold gold (jewelry or otherwise), estimate its market value as a percentage of your total savings. If you don't hold gold and want some inflation hedge, even Tk 5,000-10,000 in BAJUS-certified gold (bars or coins, not jewelry) is enough to start. Buy from certified jewelers only and keep the receipt.",
    ctaText: "I assessed my position",
    estimatedTime: "20 minutes",
    category: "review",
  },

  "z5-5": {
    text: "Sketch your personal savings ladder: Rung 1 (emergency fund — savings account), Rung 2 (short-term — FDR), Rung 3 (medium-term — Sanchaypatra/DPS), Rung 4 (long-term — equity, gold). Mark which rungs you've built and which are empty. Your next financial action becomes obvious.",
    ctaText: "I sketched my ladder",
    estimatedTime: "15 minutes",
    category: "review",
  },

  // ─────────────────────────────────────────────────────────
  // ZONE 6 — Stock Market Basics
  // ─────────────────────────────────────────────────────────

  "z6-1": {
    text: "Visit dse.com.bd this week. Look up any one company in the A-category — pick one whose products or services you actually use. Find its current share price, EPS, and most recent dividend. You're now researching a stock the right way: starting with what the company does, not what its price is doing.",
    ctaText: "I researched a company",
    estimatedTime: "20 minutes",
    category: "research",
  },

  "z6-2": {
    text: "On the DSE website, find the current breakdown of A, B, N, and Z category stocks. What percentage of listed companies are in Z category? Knowing this number changes how you'll think about 'cheap' stocks — many are cheap for legitimate reasons.",
    ctaText: "I checked the breakdown",
    estimatedTime: "10 minutes",
    category: "research",
  },

  "z6-3": {
    text: "Research one BSEC-licensed stockbroker that has an online trading platform (verify licensing at sec.gov.bd). Note their account opening requirements and brokerage commission. You don't need to open an account today — just know what the process looks like and what it costs.",
    ctaText: "I researched a broker",
    estimatedTime: "30 minutes",
    category: "research",
  },

  "z6-4": {
    text: "Pick any A-category stock and calculate its P/E ratio (share price ÷ EPS) and dividend yield (annual dividend ÷ share price × 100). Compare to the DSE average P/E (around 11-14). You're now reading stocks the way long-term investors read them — by what the business actually earns.",
    ctaText: "I calculated the metrics",
    estimatedTime: "15 minutes",
    category: "research",
  },

  "z6-5": {
    text: "Before any stock investment, verify these are in place: emergency fund fully funded, no high-interest debt, savings products for medium-term goals running. If yes, decide what percentage of your long-term savings would fit equity. If no, stocks are not your next priority — fixing the foundation is.",
    ctaText: "I assessed my readiness",
    estimatedTime: "15 minutes",
    category: "review",
  },

  // ─────────────────────────────────────────────────────────
  // ZONE 7 — Behavioural Finance
  // ─────────────────────────────────────────────────────────

  "z7-1": {
    text: "Look at any current investment you hold (stocks, savings products, anything). Write down — in one sentence — why you would still make this investment today, knowing what you know now. If you can't articulate it, the holding is running on inertia, not analysis. Either commit again with reasoning or reconsider.",
    ctaText: "I re-evaluated a holding",
    estimatedTime: "20 minutes",
    category: "review",
  },

  "z7-2": {
    text: "Recall a recent financial decision — purchase, salary negotiation, investment. What was the first number you encountered? How much did that number influence your final choice? Just notice it. Awareness of anchoring is the foundation of resisting it.",
    ctaText: "I identified an anchor",
    estimatedTime: "10 minutes",
    category: "review",
  },

  "z7-3": {
    text: "Think of one financial decision you nearly made or did make because others were doing it. Property in a hot area, a stock everyone was buying, a scheme friends were joining. What happened or would have happened? Independent of outcome, was the reasoning yours or borrowed?",
    ctaText: "I reflected on this",
    estimatedTime: "15 minutes",
    category: "review",
  },

  "z7-4": {
    text: "Pick one financial content creator you follow (Instagram, YouTube, anywhere). Find 3 specific investment calls they made more than 6 months ago. What actually happened to those recommendations? Be honest. The result almost always changes how you'll consume their content.",
    ctaText: "I tracked their record",
    estimatedTime: "30 minutes",
    category: "research",
  },

  "z7-5": {
    text: "Write a simple decision checklist for your next investment decision — even three questions you commit to answering before acting. Save it where you'll see it (notes app, physical paper at your desk). The pre-committed process is what protects you from in-the-moment emotional decisions.",
    ctaText: "I wrote my checklist",
    estimatedTime: "15 minutes",
    category: "setup",
  },

  // ─────────────────────────────────────────────────────────
  // ZONE 8 — Advanced Investing
  // ─────────────────────────────────────────────────────────

  "z8-1": {
    text: "Look up the NAV history of any two open-end mutual funds available in Bangladesh. Compare their NAV today to 3 years ago. Note their expense ratios. You're now evaluating mutual funds the way professionals do — by performance and cost, not by the fund company's marketing.",
    ctaText: "I compared two funds",
    estimatedTime: "30 minutes",
    category: "research",
  },

  "z8-2": {
    text: "Map your current savings across these layers: foundation (emergency fund), stability (Sanchaypatra/DPS/FDR), growth (stocks/mutual funds), hedge (gold). What percentage is in each? Which layer is missing or under-built? The gap analysis points directly to your next financial priority.",
    ctaText: "I mapped my layers",
    estimatedTime: "20 minutes",
    category: "review",
  },

  "z8-3": {
    text: "For your city: look up the approximate purchase price of a flat and the monthly rent for a similar unit. Calculate the rental yield. Calculate what the down payment would earn annually if invested in Sanchaypatra. The math reveals whether buying or renting makes sense for your specific timeline.",
    ctaText: "I ran the calculation",
    estimatedTime: "30 minutes",
    category: "review",
  },

  "z8-4": {
    text: "Check whether your employer provides health insurance, and the coverage limit. If not, get a quote from one BD-licensed insurer for individual coverage. A serious medical event without insurance can wipe out years of savings — knowing the cost of coverage tells you what protection is available.",
    ctaText: "I checked insurance",
    estimatedTime: "30 minutes",
    category: "research",
  },

  "z8-5": {
    text: "Use a compound interest calculator. Calculate what Tk 2,000/month invested at 10% annually becomes in 20, 30, and 40 years. Then calculate what Tk 5,000/month becomes in 20 and 30 years. Notice how many years of head start beats how much higher monthly investment. The answer changes your priorities.",
    ctaText: "I ran the math",
    estimatedTime: "15 minutes",
    category: "review",
  },

  // ─────────────────────────────────────────────────────────
  // ZONE 9 — Financial Planning
  // ─────────────────────────────────────────────────────────

  "z9-1": {
    text: "Write down your top 3 financial goals using SMART criteria: specific amount, deadline, monthly savings required to get there. If the total monthly required is more than you can save, adjust the timelines or amounts until it fits. Goals that fit reality are goals that get achieved.",
    ctaText: "I wrote 3 SMART goals",
    estimatedTime: "30 minutes",
    category: "setup",
  },

  "z9-2": {
    text: "Estimate your monthly retirement expenses in today's money. Multiply by 12 then by 25. That's your retirement corpus target. Use the SIP calculator with your age, target retirement age, and 10% return to find the required monthly savings. You now have a real number to work toward.",
    ctaText: "I calculated my number",
    estimatedTime: "20 minutes",
    category: "review",
  },

  "z9-3": {
    text: "Research the market salary for your role in your city using LinkedIn Salary, Glassdoor Bangladesh data, or industry contacts. Compare to your current pay. If you're below market, your next salary review or job change is your highest-leverage financial action this year — far more impact than investment optimization.",
    ctaText: "I researched my market rate",
    estimatedTime: "30 minutes",
    category: "research",
  },

  "z9-4": {
    text: "Build your one-page financial plan using the structure in this module: current position, top 3 goals, monthly allocation, one action this month, review date. Set a reminder for 90 days from today to review it. The plan only works if you actually use it.",
    ctaText: "I built my plan",
    estimatedTime: "30 minutes",
    category: "setup",
  },

  "z9-5": {
    text: "List every financial account you have — bank, FDR, Sanchaypatra, BO account, mutual funds, life insurance, property. For each, identify the named nominee. If any nominee is outdated or missing, update them this month. This 1-hour exercise prevents months of legal complications for your family in the worst case.",
    ctaText: "I reviewed my nominees",
    estimatedTime: "1 hour",
    category: "review",
  },
};

// Helper function for ModuleLayout integration
export function getActionNudgeForModule(moduleId: string): ActionNudge | null {
  return actionNudges[moduleId] ?? null;
}
