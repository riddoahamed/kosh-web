import type { Module } from "@/types/curriculum";

// ── Zone 5 mini-games ─────────────────────────────────────────────────────

const z5Game1 = {
  type: "scenario_verdict" as const,
  title: "Pick the Right Instrument",
  instructions: "Each person has a specific savings goal. Tap the instrument that fits best.",
  items: [
    {
      scenario: "Kamrul has ৳5,00,000 he won't need for 5 years and wants the maximum safe return available in Bangladesh.",
      correct: "sanchaypatra",
      explanation: "Sanchaypatra gives the highest guaranteed return (9-11%) for money locked 3-5 years — the perfect match.",
    },
    {
      scenario: "Shirin wants to save ৳3,000/month automatically for her daughter's university tuition in 10 years.",
      correct: "dps",
      explanation: "DPS (Deposit Pension Scheme) is exactly this — fixed monthly savings that compound into a lump sum. Banks automate the deduction.",
    },
    {
      scenario: "Rahim got a ৳2,00,000 bonus. He wants higher interest than a savings account for 6 months, then needs it back.",
      correct: "fdr",
      explanation: "FDR is ideal for a defined short period (3-12 months) — more than savings account, with a fixed maturity date.",
    },
    {
      scenario: "A family wants to preserve ৳10 lakh of wealth over decades and pass something tangible to their children.",
      correct: "gold",
      explanation: "Physical gold is Bangladesh's traditional store of value — it preserves purchasing power across generations, though it earns no interest.",
    },
    {
      scenario: "Tanvir needs 3 months of expenses available instantly if he loses his job. He earns ৳35,000/month.",
      correct: "savings_account",
      explanation: "Emergency funds need instant access — a savings account, not FDR or Sanchaypatra which lock your money.",
    },
  ],
  mangoReward: 25,
};

const z5Game2 = {
  type: "order_steps" as const,
  title: "Build the Savings Ladder",
  instructions: "Arrange the savings ladder rungs in the correct priority order — from most urgent (tap first) to long-term.",
  steps: [
    "Emergency fund: 1 month of expenses in a liquid savings account",
    "Clear all high-interest debt (credit cards, mobile loan apps)",
    "Emergency fund: top up to 3 months of expenses",
    "Medium-term savings in FDR or DPS for 1–3 year goals",
    "Tax-advantaged savings (Sanchaypatra, employer-matched schemes)",
    "Long-term locked savings in Sanchaypatra (3–5 years)",
    "Investment portfolio — stocks, mutual funds, real assets",
  ],
  correctOrder: [0, 1, 2, 3, 4, 5, 6],
  explanation: "The ladder works because each rung protects the ones above it. An emergency fund prevents you from breaking long-term savings. Clearing high-interest debt gives you a guaranteed return equal to the interest rate you were paying.",
  mangoReward: 25,
};

// ─────────────────────────────────────────────────────────────────────────────

export const moduleZ5_1: Module = {
  id: "z5-1",
  zoneId: "zone-5",
  title: "Sanchaypatra: the instrument everyone recommends but nobody explains",
  tagline: "4 types, real returns, actual mechanics. Finally.",
  estimatedMinutes: 12,
  rateNote: `Rates mentioned in this module are illustrative examples. Always check the current Sanchaypatra rates at www.nationalsavings.gov.bd before purchasing. Rates change based on government policy.`,
  hook: `"10-11% return. Government-backed. Almost zero default risk. So why do most young Bangladeshis not own any? Because nobody has ever clearly explained the 4 types, who can buy each one, what the limits are, and how to actually purchase one. This module is that explanation."`,
  context: `Sanchaypatra is Bangladesh's most reliable savings instrument — and also its most confusingly described one. Everyone says 'Sanchaypatra is safe.' Almost nobody can tell you the difference between the 5-year Bangladesh Sanchaypatra and the Pensioner Sanchaypatra. Bank managers often give incomplete or wrong information because each type has different rules. The result: many Bangladeshis either avoid it entirely or buy the wrong type for their situation.`,
  teaching: `
## What Sanchaypatra actually is

Sanchaypatra (সঞ্চয়পত্র) are savings certificates issued by the Government of Bangladesh through the National Savings Directorate. When you buy one, you are lending money to the government. In exchange, the government pays you interest at regular intervals and returns your principal at the end of the term. Because the issuer is the government of Bangladesh, the default risk is essentially zero.

## The 4 main types

**1. Bangladesh Sanchaypatra (5-year)**
The most widely available type. Any adult Bangladeshi individual can buy up to Tk 30 lakh (single name) or Tk 60 lakh (joint name). Term is 5 years. Interest is paid quarterly.

**2. 3-month Profit-bearing Sanchaypatra**
Interest is paid every 3 months, making it popular for people who want regular income. Same eligibility as the 5-year type. Investment limit: Tk 30 lakh (single), Tk 60 lakh (joint). Term: 3 years.

**3. Family Sanchaypatra**
Available only to women, and men who are 18+ years old with a female co-holder (wife or mother). The investment limit is higher: Tk 45 lakh (single) or Tk 90 lakh (joint). Designed to encourage family financial security.

**4. Pensioner Sanchaypatra**
Only for government employees who have retired and received their pension as a lump sum. They can invest their retirement benefit in this instrument at a slightly higher rate. This is not available to private sector workers.

## The TIN requirement

Any Sanchaypatra purchase above Tk 2 lakh requires a TIN (Tax Identification Number). Below Tk 2 lakh, no TIN is needed. This is why Zone 4 tells you to get your TIN before you need it.

## How to buy

Three ways:
1. **Post office** — National Savings Directorate offices and designated post offices. Bring: NID, TIN (if above Tk 2 lakh), 2 passport photos, account information for interest payment.
2. **Authorized banks** — Most Bangladeshi commercial banks can process Sanchaypatra applications. Bring the same documents.
3. **Online (limited)** — Jagoron app (www.jagoron.gov.bd) allows some Sanchaypatra purchases digitally. Check current availability.

## The real return calculation

The stated rate sounds high. But Sanchaypatra interest is taxed at source — 10% tax deducted before you receive it. So if the stated rate is 11.28%, your actual after-tax return is approximately 10.15%. Still the highest safe return available in Bangladesh, but not quite as high as the headline suggests.

Also: Sanchaypatra is not liquid. If you cash in early (before term completion), you face a penalty — you receive a lower rate than originally promised. Think of it as money you will not need for 3-5 years.

## Who Sanchaypatra is for

Best for: people who can lock money away for 3-5 years and want the highest safe return with zero default risk.
Not ideal for: emergency funds (not liquid enough), money you might need within 2 years, very large sums above the investment limits.
  `,
  bdExample: `Rahima is a teacher earning Tk 45,000/month. Over 3 years, she saved Tk 8 lakh in a savings account earning 5% interest. Her colleague suggests Sanchaypatra. Rahima buys Tk 8 lakh in 3-month Profit-bearing Sanchaypatra. Every 3 months, she receives interest credited to her account automatically. At the end of 3 years, she receives her principal back and can reinvest. Her total real return was approximately 30% higher than the savings account over the same period — purely from choosing the right instrument.`,
  actionPrompt: {
    text: "Visit www.nationalsavings.gov.bd this week and note the current rates for all 4 Sanchaypatra types. Which type fits your situation? What amount could you realistically lock away for 3-5 years?",
    ctaButtonText: "I checked the current rates",
  },

  game: z5Game1,

  quiz: [
    {
      question: "Which Sanchaypatra type requires the buyer to be a retired government employee?",
      options: ["Bangladesh Sanchaypatra (5-year)", "3-month Profit-bearing", "Family Sanchaypatra", "Pensioner Sanchaypatra"],
      correctIndex: 3,
      explanation: "Pensioner Sanchaypatra is exclusively for government retirees investing their pension lump sum. Private sector workers cannot buy this type regardless of age.",
    },
    {
      question: "You want to buy Sanchaypatra worth Tk 3 lakh. What additional document do you need that a Tk 1.5 lakh purchase does not require?",
      options: ["Passport", "TIN (Tax Identification Number)", "Bank statement", "Employer letter"],
      correctIndex: 1,
      explanation: "Any Sanchaypatra purchase above Tk 2 lakh requires a TIN. Below Tk 2 lakh, only NID is needed. This is one key reason to get your TIN early.",
    },
    {
      question: "If the stated Sanchaypatra rate is 11%, and source tax is 10%, what is your approximate after-tax return?",
      options: ["11%", "10%", "9.9%", "1%"],
      correctIndex: 2,
      explanation: "Tax deducted at source is 10% of the interest amount, not 10 percentage points. So 11% × 0.90 = 9.9%. Still significantly higher than bank savings rates.",
    },
    {
      question: "Sanchaypatra is suitable as an emergency fund. True or false?",
      options: ["True — it's safe and government-backed", "False — early withdrawal means a penalty and lower return", "True — you can access it anytime", "False — it is only for women"],
      correctIndex: 1,
      explanation: "Sanchaypatra has early withdrawal penalties. If you cash out before the term ends, you receive a reduced rate. Your emergency fund must be in a liquid account — savings account or short FDR. Sanchaypatra is for money you will not need for the full term.",
    },
    {
      question: "Meher wants to invest Tk 50 lakh in Sanchaypatra in her own name. Can she do this?",
      options: ["Yes, no limits apply", "No — the limit for a single name is Tk 30 lakh on most types", "Yes — but only if she has a TIN", "No — Sanchaypatra is only for small savers"],
      correctIndex: 1,
      explanation: "Most Sanchaypatra types have a Tk 30 lakh limit for single-name purchases. Above that, she would need a joint account (Tk 60 lakh limit) or split across different types. Investment limits apply per type.",
    },
    {
      question: "Which is the most accurate description of Sanchaypatra's default risk?",
      options: ["High — no insurance backing", "Medium — depends on the bank", "Very low — backed by the Government of Bangladesh", "Zero — all investments are guaranteed"],
      correctIndex: 2,
      explanation: "Sanchaypatra is issued by the Government of Bangladesh. Default would require the government itself to fail. In practice, the default risk is negligible. However 'zero' risk is technically not possible — 'very low' is more accurate.",
    },
  ],
  whatsNext: {
    nextModuleId: "z5-2",
    preview: "FDR is the default savings tool. But when does it actually make sense — and when is it the wrong choice?",
  },
};

export const moduleZ5_2: Module = {
  id: "z5-2",
  zoneId: "zone-5",
  title: "FDR strategy: when safe is the wrong choice",
  tagline: "How to use FDR correctly — and when to use something else.",
  estimatedMinutes: 10,
  rateNote: `FDR rates are set by individual banks and change frequently. Always call your bank or check their website for current rates before opening a deposit.`,
  hook: `"FDR is the default answer to 'where should I put my savings?' in Bangladesh. It feels safe. It feels responsible. And it is safe — but safe is not the same as smart. Here's when FDR makes sense, when it costs you money, and how to use it as a strategic tool rather than a lazy default."`,
  context: `Fixed Deposit Receipts are offered by almost every bank in Bangladesh. The concept is simple: you deposit a lump sum for a fixed period and receive a guaranteed interest rate. The problem is that most people use FDR as a one-size-fits-all savings vehicle without thinking about term, rate, liquidity, or alternatives. In some situations FDR is the right tool. In others, the same money in Sanchaypatra or even a DPS would serve you better.`,
  teaching: `
## How FDR actually works

You deposit a lump sum at a bank for a fixed term — typically 1 month, 3 months, 6 months, 1 year, or 2 years. The bank pays you interest at the agreed rate. At maturity, you receive your principal plus the accumulated interest.

Key mechanics to understand:

**Auto-renewal trap.** Most FDRs auto-renew at maturity if you do not instruct the bank otherwise. If rates have changed, you may be renewed at a lower rate without realizing it. Always check what happens at maturity when you open an FDR.

**Premature withdrawal penalty.** If you break an FDR before maturity, most banks pay you the savings account rate (not the FDR rate) for the time your money was held, minus a penalty. A 1-year FDR broken at 8 months might earn you less than a savings account would have.

**Rate variation across banks.** FDR rates vary significantly between banks. Private commercial banks often offer better rates than state-owned banks. Checking 3-4 banks before opening an FDR takes 30 minutes and can earn you 0.5-1.5% more.

## The real comparison

At current approximate rates, FDR returns are lower than Sanchaypatra for terms of 3 years or more. The advantage of FDR is:
- No investment limits (Sanchaypatra has purchase ceilings)
- More flexible terms (1 month to 2 years vs Sanchaypatra's fixed 3 or 5 years)
- Available at any bank (Sanchaypatra requires a specific process)

FDR is better than Sanchaypatra when: you need shorter terms, you have amounts above Sanchaypatra limits, or you need an instrument linked to a bank account for auto-debit purposes.

## The laddering strategy

FDR laddering means splitting one large deposit into multiple smaller FDRs with different maturity dates. Example: instead of Tk 3 lakh in one 1-year FDR, you split into three Tk 1 lakh FDRs maturing at 3 months, 6 months, and 12 months. Benefits:
- You always have something maturing soon (liquidity)
- You can reinvest at new rates as each matures
- If you need cash urgently, you only break the smallest FDR, not everything

## When FDR is the right tool

- Short-term savings (1-12 months) where Sanchaypatra's lock-in is too long
- Large amounts above Sanchaypatra limits
- When you specifically need money in a bank account (for loan collateral, for example)
- When you want to ladder maturities for liquidity management

## When FDR is the wrong tool

- For money you can lock away 3+ years: Sanchaypatra gives better return
- As an emergency fund: savings account is better (FDR penalty on early withdrawal)
- As a primary long-term wealth building tool: over 10+ years, equity investments historically outperform
  `,
  bdExample: `Shafiq has Tk 5 lakh from an inheritance. He wants to keep it safe and accessible. His bank suggests a 2-year FDR. Instead, Shafiq ladders: Tk 1 lakh in 3-month FDR, Tk 1.5 lakh in 6-month FDR, Tk 1 lakh in 1-year FDR, Tk 1.5 lakh in Sanchaypatra (3-year). Six months later, when his mother needs unexpected medical expenses, only the 6-month FDR matures — he uses Tk 1.5 lakh without penalty and without touching the Sanchaypatra.`,
  actionPrompt: {
    text: "Check the FDR rate at your current bank and compare it with one other bank. What is the difference? Is your money currently in the right place?",
    ctaButtonText: "I compared FDR rates",
  },
  quiz: [
    {
      question: "What is the auto-renewal trap in FDR?",
      options: [
        "Banks charge you extra fees every year",
        "FDR automatically renews at maturity, possibly at a lower rate than your original rate",
        "You must visit the bank every month to keep the FDR active",
        "FDR converts to a savings account after maturity",
      ],
      correctIndex: 1,
      explanation: "If you do not give instructions at maturity, most banks renew your FDR automatically at the current rate, which may be lower than when you originally deposited. Always check what happens at maturity.",
    },
    {
      question: "You break a 1-year FDR after 9 months because of an emergency. What return do you most likely receive?",
      options: [
        "The full 1-year FDR rate for 9 months",
        "Zero — you lose all interest",
        "Approximately the savings account rate minus a penalty",
        "Half the FDR rate",
      ],
      correctIndex: 2,
      explanation: "Premature FDR withdrawal typically results in the bank paying the lower savings account interest rate for the time held, usually minus an additional penalty. This can be significantly less than expected.",
    },
    {
      question: "Which situation is FDR BETTER suited for than Sanchaypatra?",
      options: [
        "Locking away money for 5 years at the highest safe return",
        "Investing Tk 50 lakh above Sanchaypatra's purchase limit",
        "Building an emergency fund accessible anytime",
        "Getting a government-backed instrument with no investment ceiling",
      ],
      correctIndex: 1,
      explanation: "Sanchaypatra has purchase limits (Tk 30 lakh per type for single holders). For amounts above this, FDR is the practical alternative. Sanchaypatra usually offers better returns for 3+ year terms, but FDR has no deposit ceiling.",
    },
    {
      question: "What is the main benefit of FDR laddering?",
      options: [
        "It earns compound interest across all deposits simultaneously",
        "It eliminates all risk from FDR",
        "It maintains liquidity — something always matures soon — while still earning FDR rates",
        "It qualifies you for higher bank credit limits",
      ],
      correctIndex: 2,
      explanation: "Laddering splits deposits across different maturity dates. You always have deposits maturing soon, giving you access to cash without breaking all your FDRs. You also benefit from being able to reinvest at new rates as each matures.",
    },
    {
      question: "True or False: All banks in Bangladesh offer the same FDR rate.",
      options: ["True — rates are regulated by Bangladesh Bank", "False — rates vary significantly between banks"],
      correctIndex: 1,
      explanation: "FDR rates are not uniform. Private commercial banks often offer higher rates than state-owned banks. The difference can be 0.5-1.5%, which adds up significantly on large deposits. Always compare before depositing.",
    },
  ],
  whatsNext: {
    nextModuleId: "z5-3",
    preview: "Tk 3,000 a month. 5 years. You'll be surprised what the number becomes — and why DPS is the underrated system-builder.",
  },
};

export const moduleZ5_3: Module = {
  id: "z5-3",
  zoneId: "zone-5",
  title: "DPS: the tool most people set up and forget — until they see the number",
  tagline: "Monthly installments. Surprisingly real returns. The system that builds itself.",
  estimatedMinutes: 10,
  rateNote: `DPS rates vary by bank, term length, and installment amount. Check current rates at your bank before opening. MFS DPS rates (bKash, Nagad) are usually published on their apps.`,
  hook: `"Tk 3,000 a month. 5 years. Most people guess the final amount and get it wrong — because they forget that the bank pays interest on each installment from the day it's deposited. The real number is higher than the arithmetic. Here's how DPS actually works, why it beats willpower-savings every time, and when it's better than FDR."`,
  context: `Deposit Pension Scheme (DPS) is a recurring deposit product offered by banks and some MFS providers. You commit to depositing a fixed amount every month for a fixed term — typically 3, 5, or 10 years. At the end, you receive your accumulated deposits plus interest. The behavioral design is its main advantage: the commitment structure makes saving automatic and breaking it psychologically costly.`,
  teaching: `
## How DPS actually works

You open a DPS account at a bank, agree to deposit a fixed monthly amount (minimum usually Tk 500-1,000 depending on bank), and select a term. Each monthly installment earns interest from the day it's deposited for the remaining term. The bank calculates interest on each installment separately — installment 1 earns interest for the full term, installment 2 earns for term minus one month, and so on.

This means your effective return is not the same as the stated annual rate. The stated rate applies to each installment for its specific duration, and the average duration of your installments is half the total term. Your effective annual yield on the total invested amount is roughly 55-60% of the stated rate.

Example (illustrative — check current rates):
- Monthly installment: Tk 5,000
- Term: 5 years (60 installments)
- Total deposited: Tk 3,00,000
- At a stated rate of 8%, maturity amount: approximately Tk 3,65,000-3,70,000
- Effective return on total invested: approximately 4.5% annually

This is lower than Sanchaypatra. But DPS has an advantage that Sanchaypatra does not: it builds the savings habit systematically.

## DPS vs FDR — when each wins

DPS wins when:
- You don't have a lump sum — you want to build savings incrementally
- You need the commitment mechanism — monthly installments are harder to skip than deciding to save voluntarily
- You're building a specific goal (car down payment, emergency fund) over 3-5 years

FDR wins when:
- You already have a lump sum to deploy
- You want better liquidity options
- You want to compound at a higher rate on the full amount from day one

## The missed installment problem

If you miss an installment, most banks charge a penalty and continue the scheme. Miss multiple installments and banks may close the account prematurely, paying you a reduced rate on what you've accumulated. Before opening DPS, set up an auto-debit from your salary account on salary day.

## MFS DPS (bKash, Nagad)

Both bKash and Nagad offer DPS products linked to their wallets. The rates are typically slightly lower than bank DPS, but the convenience is higher — you can set up auto-debit from your mobile wallet and manage everything on your phone. For someone without easy access to a bank branch, MFS DPS is a legitimate alternative.

## The tax on DPS interest

Like FDR, DPS interest is subject to 10% source tax. The maturity amount you receive is after this deduction.
  `,
  bdExample: `Rafiq is 24 and just got his first job at Tk 35,000/month. He opens a DPS at Tk 3,000/month on his first salary day, auto-debited so he never has to decide. After 5 years, he has accumulated Tk 1,80,000 in deposits and receives approximately Tk 2,10,000 at maturity. He started building his emergency fund plus first investing capital without ever having to make a monthly decision to save. The system did it.`,
  actionPrompt: {
    text: "What amount could you commit to saving monthly without it affecting your essentials? Even Tk 1,000/month is a start. Check your bank's DPS options this week.",
    ctaButtonText: "I checked DPS options",
  },
  quiz: [
    {
      question: "Why is the effective annual return on DPS lower than the stated rate?",
      options: [
        "Banks charge hidden fees on DPS",
        "Because each installment only earns interest from when it's deposited, so later installments earn interest for less time",
        "The government taxes DPS at 50%",
        "DPS rates are misleadingly advertised",
      ],
      correctIndex: 1,
      explanation: "Each installment earns interest for a different duration — early installments earn for the full term, later ones earn for less time. The average duration is roughly half the total term. So your effective yield on total invested is less than the stated rate.",
    },
    {
      question: "You earn Tk 40,000/month. Which DPS setup prevents you from accidentally skipping a month?",
      options: [
        "Manual transfer on the 15th of each month",
        "Reminding yourself in your phone calendar",
        "Auto-debit from your salary account on salary day",
        "Asking a family member to remind you",
      ],
      correctIndex: 2,
      explanation: "Auto-debit on salary day removes the decision entirely. The money leaves your account before you can spend it. Manual methods rely on willpower, which runs out. Automation is always more reliable.",
    },
    {
      question: "When is DPS a BETTER choice than FDR?",
      options: [
        "When you already have Tk 5 lakh to invest as a lump sum",
        "When you want the highest possible return on savings",
        "When you don't have a lump sum and need to build savings incrementally over time",
        "When you need to access money within 6 months",
      ],
      correctIndex: 2,
      explanation: "FDR requires a lump sum. DPS is designed for incremental monthly savings. If you're building wealth from a monthly salary without a large existing sum, DPS is the right tool.",
    },
    {
      question: "What happens to most DPS accounts if you miss several consecutive installments?",
      options: [
        "Nothing — you can skip installments freely",
        "The bank waits indefinitely with no penalty",
        "The account may be closed prematurely with a reduced return rate",
        "Your installments are refunded in full",
      ],
      correctIndex: 2,
      explanation: "Missed installments typically result in penalties. Multiple missed installments can cause premature closure, where you receive interest calculated at a lower rate than agreed. This is why auto-debit setup is critical.",
    },
    {
      question: "Compared to bank DPS, bKash or Nagad DPS typically offers:",
      options: [
        "Identical rates — all providers follow Bangladesh Bank rules",
        "Higher rates because mobile banking is more efficient",
        "Slightly lower rates but greater convenience, especially for those without easy bank access",
        "No interest — MFS DPS only returns your principal",
      ],
      correctIndex: 2,
      explanation: "MFS DPS (bKash, Nagad) is a legitimate savings product but typically offers slightly lower interest rates than bank DPS. The tradeoff is convenience — fully managed on your phone, no branch visit needed.",
    },
  ],
  whatsNext: {
    nextModuleId: "z5-4",
    preview: "Your grandmother kept gold because she didn't trust banks. You might keep it because it outpaces inflation. But the reasons matter.",
  },
};

export const moduleZ5_4: Module = {
  id: "z5-4",
  zoneId: "zone-5",
  title: "Gold in Bangladesh: why you hold it determines whether it works",
  tagline: "The oldest store of value. Still relevant. Often misunderstood.",
  estimatedMinutes: 10,
  hook: `"Your grandmother kept gold because she didn't trust banks, needed something she could physically hold, and wanted an asset her daughter could wear. You might consider gold because it historically outpaces inflation in Bangladesh. These are both valid reasons — but they lead to very different decisions about how much to hold, in what form, and where to keep it."`,
  context: `Gold has been a financial instrument in Bangladesh for centuries, long before formal banking existed. Today it occupies an unusual space: part cultural asset (jewelry for weddings, gifts), part emergency reserve, part inflation hedge. Understanding which role your gold is playing helps you make better decisions about buying, storing, and selling it.`,
  teaching: `
## Gold as an inflation hedge

Over the last 20 years in Bangladesh, gold price in taka has broadly tracked or outpaced inflation. When the taka weakens or inflation rises, gold priced in taka tends to rise. This is not guaranteed or linear — there are multi-year periods where gold underperforms — but over long horizons, gold has historically preserved purchasing power better than cash savings.

The mechanism: gold is priced in USD globally. When the taka depreciates against USD (which happens during inflationary periods), the BDT price of gold rises. This makes gold a natural hedge against currency depreciation.

## Physical vs other forms

**Physical gold (jewelry):** Combines asset value with usability. Problems: making charges (নকশা) when buying add 10-25% above gold content value and are non-recoverable when selling. If you buy jewelry to sell later as an investment, you pay a premium to buy and receive only melt value when selling.

**Physical gold (bars/coins):** Available from BAJUS certified dealers. No making charges — you pay close to the gold content price. Better if your purpose is purely investment, not wearing.

**Brokerage-linked gold accounts:** Some platforms now offer digital gold products in Bangladesh (check your bank or MFS provider for availability). You buy and sell gold without physically holding it. Lower cost, more liquid. Verify the provider is regulated before using.

## Hallmarking — the one thing you must check

Bangladesh has a hallmarking system for gold purity: 18K, 21K, 22K, 24K. Always buy from jewelers displaying the BJCS (Bangladesh Jewel Crafts Society) or BAJUS certification. Fake or impure gold is a real risk in unregulated markets. Never buy gold without a receipt that states purity and weight.

## Storage risk

Physical gold held at home is an asset that can be stolen. The insurance system in Bangladesh does not commonly cover household gold theft comprehensively. Options: bank lockers (annual fee, good security), trusted family members, professional vault storage.

## How much gold is reasonable?

No universal rule, but a reasonable guideline for most young Bangladeshis:
- 0-5% of total savings in gold if you're primarily focused on building your financial base
- 5-15% if you're in a higher-inflation environment or have accumulated a solid emergency fund and DPS/Sanchaypatra already
- Above 15% only if you have specific reasons

Gold produces no income. It earns no interest. It does not compound. It can only preserve and grow purchasing power over long periods. Keep this in mind when comparing against Sanchaypatra or equity.
  `,
  bdExample: `Sultana inherited Tk 2 lakh in gold jewelry from her mother. Rather than selling it, she keeps it as a reserve. She correctly does not count it as part of her emergency fund (not liquid quickly enough) or investment portfolio. She thinks of it as a separate category: family reserve asset. When her cousin tries to sell her more gold "as an investment," she knows enough to ask: what form, what purity, and at what premium above gold content price?`,
  actionPrompt: {
    text: "Do you currently hold any gold? If yes, estimate its current market value as a percentage of your total savings. Is it playing the role you intended?",
    ctaButtonText: "I assessed my gold position",
  },
  quiz: [
    {
      question: "Why does gold in Bangladesh tend to rise in BDT price during high inflation periods?",
      options: [
        "Bangladesh Bank increases the official gold price during inflation",
        "Gold demand from jewelers rises during inflation",
        "Gold is priced globally in USD — when the taka depreciates, more taka are needed to buy the same gold",
        "Inflation increases gold mining output which raises prices",
      ],
      correctIndex: 2,
      explanation: "Gold has a global USD price. When the taka weakens against USD during inflationary periods, the BDT price of gold rises proportionally. This is the currency hedge mechanism.",
    },
    {
      question: "You want to buy gold purely as an investment, not for wearing. Which form is better?",
      options: [
        "Jewelry from a premium shop — better quality",
        "Gold bars or coins — no making charges, you pay closer to gold content value",
        "It does not matter — all gold is priced the same",
        "Digital gold — but only if you can see it physically",
      ],
      correctIndex: 1,
      explanation: "Jewelry includes making charges (10-25% above gold value) that you cannot recover when selling — you receive melt value, not retail value. For investment purposes, bars and coins eliminate this premium.",
    },
    {
      question: "What should you always verify when buying gold in Bangladesh?",
      options: [
        "The shop's Facebook page rating",
        "BJCS or BAJUS certification and a receipt stating purity and weight",
        "Whether the shop has air conditioning",
        "The shop owner's personal recommendation",
      ],
      correctIndex: 1,
      explanation: "Hallmarking certification (BJCS or BAJUS) and a written receipt with purity and weight stated are the minimum requirements. Impure gold is a real risk in unregulated markets.",
    },
    {
      question: "What does gold NOT do that Sanchaypatra and DPS do?",
      options: [
        "Protect against inflation",
        "Earn regular income or compound interest",
        "Preserve value over long periods",
        "Act as an emergency reserve",
      ],
      correctIndex: 1,
      explanation: "Gold produces no interest, no dividends, no coupon payments. It can only appreciate in price. Sanchaypatra and DPS pay regular interest that compounds. For income generation and compounding, gold is not the right tool.",
    },
    {
      question: "True or False: Gold jewelry bought for Tk 80,000 can be resold for Tk 80,000 if the gold price has not changed.",
      options: [
        "True — you paid the market price",
        "False — the making charges (design/labor premium) are not recoverable on resale",
      ],
      correctIndex: 1,
      explanation: "Jewelry includes making charges that can be 10-25% of the purchase price. When selling, you receive approximately the gold content value at melt rates, not the retail price you paid. This is why buying jewelry 'as an investment' usually loses value before the gold price changes.",
    },
  ],
  whatsNext: {
    nextModuleId: "z5-5",
    preview: "You now understand each instrument. The last module brings them together into a system that works for your actual life.",
  },
};

export const moduleZ5_5: Module = {
  id: "z5-5",
  zoneId: "zone-5",
  title: "The savings ladder: building a system that works at every time horizon",
  tagline: "One account for each job. The whole system in one picture.",
  estimatedMinutes: 11,
  hook: `"Most people have money in two places: a savings account they never touch and a wallet they spend from daily. A savings ladder gives every taka a specific job at a specific time horizon — so your money is working as hard as possible at every duration without sacrificing the access you actually need."`,
  context: `This is the capstone module for Zone 5. By now you understand each instrument individually. The savings ladder is the framework for combining them into a coherent, intentional system. The key insight: different instruments are suited to different time horizons. Using the right instrument for each horizon maximizes return without sacrificing liquidity where you need it.`,
  teaching: `
## The core principle: match instrument to time horizon

Every taka you save has an implicit time horizon — when you will need it. Emergency funds need to be accessible within days. A car down payment fund might have a 2-year horizon. Retirement savings have a 20-year horizon. The mistake most people make is using the same instrument for all three — usually a savings account — which underperforms for all time horizons except the shortest.

## The four rungs of the ladder

**Rung 1 — Immediate access (0-3 months)**
Purpose: Emergency fund, monthly buffer, known upcoming expenses.
Instrument: Bank savings account. Accept the lower rate (4-6%) because you need instant access. This money should equal 3-6 months of essential expenses.

**Rung 2 — Short-term (3-18 months)**
Purpose: Specific goals with known timelines — wedding contribution, device purchase, travel, short-term goal.
Instrument: FDR, laddered for the target date. Select maturity dates that match when you need the money.

**Rung 3 — Medium-term (2-5 years)**
Purpose: Building serious savings — house down payment, business capital, larger financial goals.
Instrument: Sanchaypatra (best return) or DPS (if building incrementally). The 3-5 year time horizon earns the highest safe returns.

**Rung 4 — Long-term (5+ years)**
Purpose: Wealth building, retirement foundation, major life goals.
Instrument: Combination of Sanchaypatra (safe component) + equity (market-linked component, covered in later zones) + gold (small hedge component).

## Building the ladder on a real salary

The ladder does not require large sums. It requires intentional allocation from each salary. Example on a Tk 45,000/month salary:

- Essentials: Tk 25,000
- Rung 1 top-up (until 3-month emergency fund complete): Tk 5,000
- Rung 2 FDR installment (18-month goal): Tk 5,000
- Rung 3 DPS (5-year): Tk 5,000
- Discretionary/wants: Tk 5,000

Total: Tk 45,000. Every taka assigned. Each instrument doing a different job.

## When to restructure

The savings ladder is not permanent. It should change when:
- Emergency fund is complete (stop contributing to Rung 1, redirect to Rung 3)
- A major goal is achieved (FDR matures, redirect proceeds to next priority)
- Salary changes significantly (rebalance all rungs proportionally)
- Life changes (marriage, children, illness) shift your time horizons

Review the ladder every 6 months. It takes 20 minutes.

## The most common mistake

Building Rung 3 before Rung 1 is complete. Many people want the higher returns of Sanchaypatra before they have an emergency fund. If you do this and an emergency hits, you either break the Sanchaypatra early (losing the return advantage) or go into debt. Always fill Rung 1 first.
  `,
  bdExample: `Diya is 26, earns Tk 50,000/month, and has been saving randomly for 2 years. She has Tk 1.8 lakh in a savings account and Tk 80,000 in a DPS she opened impulsively. After this module, she reorganizes: Tk 1.2 lakh stays in the savings account (her 3-month emergency fund), Tk 60,000 goes into a 6-month FDR for a planned laptop purchase, and the DPS continues as her medium-term rung. She now has a ladder with three separate rungs, each doing a specific job, instead of random savings with no structure.`,
  actionPrompt: {
    text: "Sketch your personal savings ladder right now. Which rungs are complete? Which are empty? What is the next rung you need to build?",
    ctaButtonText: "I sketched my savings ladder",
  },

  game: z5Game2,

  quiz: [
    {
      question: "Which instrument belongs in Rung 1 (0-3 month emergency fund)?",
      options: [
        "Sanchaypatra — highest safe return",
        "Bank savings account — immediate access despite lower return",
        "DPS — automatic monthly savings",
        "Gold — holds value over time",
      ],
      correctIndex: 1,
      explanation: "Rung 1 needs instant access. The lower return of a savings account is the price of liquidity. Breaking Sanchaypatra or DPS early means penalties. Emergency funds must be instantly accessible.",
    },
    {
      question: "Why is it a mistake to build Rung 3 (Sanchaypatra/DPS) before Rung 1 (emergency fund) is complete?",
      options: [
        "It is not a mistake — higher returns should always come first",
        "Because Sanchaypatra has purchase limits",
        "Because if an emergency hits, you either break the Rung 3 instrument with penalties or go into debt",
        "Because banks require emergency funds before opening Sanchaypatra",
      ],
      correctIndex: 2,
      explanation: "Without an emergency fund, any unexpected expense forces you to either break your long-term instruments early (losing the return premium) or borrow. The emergency fund is insurance for your higher-return savings.",
    },
    {
      question: "Diya's 5-year DPS has matured. She has no specific goal for the money in the next 2 years. Which is the best next step?",
      options: [
        "Keep it in a savings account for flexibility",
        "Invest in Sanchaypatra (3 or 5 year term) since she does not need it soon",
        "Spend it — she has earned it after 5 years of saving",
        "Convert to gold for inflation protection",
      ],
      correctIndex: 1,
      explanation: "With a 2+ year horizon and no specific short-term need, Sanchaypatra offers the best safe return. The savings account gives accessibility she does not need. Gold earns no interest. Her horizon matches Rung 3.",
    },
    {
      question: "When should you restructure your savings ladder?",
      options: [
        "Every week to optimize returns",
        "Only when you change banks",
        "When major life events change your time horizons or when specific goals are achieved",
        "Never — once set up, a savings ladder should not change",
      ],
      correctIndex: 2,
      explanation: "The ladder is not permanent — it evolves with your life. Marriage, salary changes, completed goals, and new priorities all warrant a review. Approximately every 6 months is a good cadence for most people.",
    },
    {
      question: "A savings ladder assigns each taka to a specific instrument based on:",
      options: [
        "How much interest each instrument pays",
        "The time horizon for when that money will be needed",
        "What your bank recommends",
        "The government's investment guidelines",
      ],
      correctIndex: 1,
      explanation: "The core principle of the savings ladder is matching instrument to time horizon. Short horizons need liquid instruments (savings account). Medium horizons need FDR. Long horizons earn the higher return of Sanchaypatra. Time horizon is the organizing principle.",
    },
    {
      question: "Which zone's content builds on the savings ladder foundation by adding equity investments?",
      options: [
        "Zone 2 (Tracking & Budgeting)",
        "Zone 4 (Tax)",
        "Zones 7-9 (advanced zones)",
        "The savings ladder is complete as described — no further zones needed",
      ],
      correctIndex: 2,
      explanation: "The savings ladder in this module covers safe, fixed-return instruments (Rungs 1-3). Adding market-linked assets to Rung 4 is covered in Zones 7-9 after you understand risk, behavioral finance, and market mechanics properly.",
    },
  ],
  whatsNext: {
    nextModuleId: null,
    preview: "Zone 5 complete. You now have a full understanding of Bangladesh's core savings instruments and how to build a system with them. Choose your next zone.",
  },
};
