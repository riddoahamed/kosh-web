import type { Module } from "@/types/curriculum";

// ─────────────────────────────────────────────────────────────
// ZONE 9 — FINANCIAL PLANNING
// Goal-based planning, insurance deep-dive, retirement, full plan
// 5 modules. Advanced difficulty tier.
// ─────────────────────────────────────────────────────────────

export const z9Game1 = {
  type: "calculator_reveal" as const,
  title: "Your Financial Independence Number",
  instructions:
    "Financial independence means having enough invested assets to live indefinitely from returns without working. The '25x rule' is a rough starting estimate: you need 25 times your annual expenses invested. Enter your monthly essential expenses in Tk. We'll calculate your FI number.",
  correctAnswer: null,
  unit: "Tk",
  isCalculation: true,
  formula: "Monthly expenses × 12 × 25 = Financial Independence target",
  explanation:
    "If your monthly essentials are Tk 40,000: 40,000 × 12 × 25 = Tk 1.2 crore. At a 4% withdrawal rate from a diversified portfolio, Tk 1.2 crore would generate Tk 4.8 lakh annually — exactly Tk 40,000/month — theoretically indefinitely. This is not a precise retirement plan. It is a useful target to understand how large a portfolio you need to make work optional.",
  mangoReward: 30,
};

export const z9Game2 = {
  type: "scenario_verdict" as const,
  title: "Goal or Wish? Classify Each Statement",
  instructions:
    "A SMART financial goal has: Specific amount, Measurable progress, Achievable timeline, Relevant to your life, Time-bound deadline. Tap 'Goal' if it meets these criteria, or 'Wish' if it does not.",
  items: [
    {
      scenario: "I want to save Tk 5 lakh for a car down payment within 3 years by saving Tk 14,000 per month.",
      correct: "goal",
      explanation: "Specific amount (Tk 5 lakh), time-bound (3 years), measurable monthly savings (Tk 14,000). This is a SMART goal.",
    },
    {
      scenario: "I want to be rich someday.",
      correct: "wish",
      explanation: "No amount, no timeline, no measurement. 'Rich' is undefined. This is a wish, not a goal. It cannot be planned toward or measured.",
    },
    {
      scenario: "I want to have Tk 30 lakh saved by age 35 for my children's education, contributing Tk 8,000/month from now.",
      correct: "goal",
      explanation: "Specific target (Tk 30 lakh), time-bound (by age 35), measurable monthly action (Tk 8,000). SMART goal.",
    },
    {
      scenario: "I want to invest more this year.",
      correct: "wish",
      explanation: "'More' is unmeasurable and there is no specific amount or timeline. This cannot be planned toward or evaluated.",
    },
  ],
  mangoReward: 25,
};

// ─── MODULE Z9-1 ─────────────────────────────────────────────
export const moduleZ9_1: Module = {
  id: "z9-1",
  zoneId: "zone-9",
  title: "Goal-based financial planning: the system that actually works",
  tagline: "Vague intentions become specific plans. Specific plans become achieved goals.",
  estimatedMinutes: 10,

  hook: `"Most people have financial wishes, not financial goals. 'I want to save more.' 'I want to retire comfortably.' 'I want to buy a house someday.' These are not goals. They are aspirations without a plan. The difference between people who achieve financial goals and those who don't is almost never income — it is specificity. Specific goals can be planned for. Vague aspirations cannot."`,

  context: `Goal-based financial planning is a methodology that starts with your actual life objectives — what you want your money to do — and works backward to determine what savings rate, investment approach, and timeline are required. It is more motivating than abstract wealth-building because every financial action connects to something you actually care about.`,

  teaching: `
## The SMART goal framework applied to finance

A financial goal needs five characteristics to be plannable:

**Specific** — not "save for education" but "save Tk 30 lakh for child's university fees"

**Measurable** — you can track progress numerically each month

**Achievable** — the required monthly savings is realistic given your income and expenses

**Relevant** — it actually matters for your life, not something you think you should want

**Time-bound** — there is a specific deadline

The moment you apply SMART criteria to a financial wish, it either becomes a real goal (you can calculate the monthly savings required) or you discover it is not actually a priority (the required monthly savings is too high relative to other goals).

## Categories of financial goals

**Short-term goals (1-3 years):**
- Emergency fund completion
- Vacation, device purchase, vehicle down payment
- Skill development or course fees
- Debt elimination

**Medium-term goals (3-10 years):**
- Housing down payment
- Children's early education
- Business startup capital
- Marriage expenses

**Long-term goals (10+ years):**
- Children's university fees
- Financial independence / retirement corpus
- Property purchase outright

## Goal stacking: when you have multiple goals

Most people have several financial goals simultaneously. Goal stacking is the process of prioritizing and sequencing them.

**Priority 1 — Non-negotiable foundations:** Emergency fund, elimination of high-interest debt. Always first.

**Priority 2 — Essential protection:** Basic health insurance, term life insurance if dependents exist.

**Priority 3 — Medium-term goals:** Assign specific savings products to each goal (DPS for 5-year goals, Sanchaypatra for 3-5 year goals, savings account for <2 year goals).

**Priority 4 — Long-term wealth building:** Only after 1-3 are in place. Equity, mutual funds, property.

The sequencing matters as much as the amounts.

## The reverse calculation

Once you have a SMART goal, the calculation is simple:

Target amount = Monthly savings required × Savings instrument growth rate × Months remaining

In practice: if you need Tk 20 lakh in 5 years (60 months) and a DPS returns 8% annually, you need to save approximately Tk 27,000/month. If that is too high, you either extend the timeline, reduce the target, or increase income. The calculation forces a real conversation with reality.

## Reviewing and updating goals

Life changes. A goal-based plan reviewed once a year — and immediately when major life events occur — stays relevant. Marriage, children, job change, health events, inheritance: each changes the goal landscape. The plan should change with it.
  `,

  bdExample: `Sharmin is 26 and has three financial goals: (1) emergency fund of Tk 1.8 lakh (currently at Tk 60,000 — needs Tk 1,200/month for 12 months), (2) sister's wedding contribution of Tk 3 lakh in 4 years (needs Tk 5,500/month in a DPS), (3) apartment down payment of Tk 15 lakh in 8 years (needs Tk 13,000/month in a mix of Sanchaypatra and stocks). Total required savings: Tk 19,700/month. Her take-home is Tk 55,000. After essentials (Tk 32,000) and discretionary (Tk 5,000), she has Tk 18,000 available. She adjusts: extends the wedding contribution timeline to 5 years (Tk 4,400/month), puts less in stocks initially. The plan becomes achievable without eliminating any goal.`,

  actionPrompt: {
    text: "Write down your top 3 financial goals with specific amounts and timelines. Then calculate the monthly savings required for each (amount ÷ months remaining, without accounting for interest as a simplification). Does the total fit within what you can save monthly?",
    ctaButtonText: "I wrote my 3 SMART financial goals",
  },

  game: z9Game2,

  quiz: [
    {
      question: "What makes a financial goal 'SMART' rather than just a wish?",
      options: [
        "The goal involves a large amount of money",
        "The goal has a specific amount, measurable progress, achievable timeline, personal relevance, and a deadline",
        "The goal was recommended by a financial advisor",
        "The goal is achievable within 1 year",
      ],
      correctIndex: 1,
      explanation:
        "SMART criteria convert aspirations into plans. Without a specific amount and timeline, you cannot calculate what you need to do monthly. Without measurability, you cannot track progress. The criteria force precision that makes goals achievable.",
    },
    {
      question: "In goal stacking (prioritizing multiple simultaneous goals), which priority is always first?",
      options: [
        "Long-term wealth building in equity",
        "Children's education fund",
        "Emergency fund completion and high-interest debt elimination",
        "Property down payment",
      ],
      correctIndex: 2,
      explanation:
        "Emergency fund and high-interest debt are always the foundation. Without an emergency fund, any financial shock derails all other goals. Without eliminating high-interest debt, investment returns are consumed by debt costs.",
    },
    {
      question: "You need Tk 15 lakh in 5 years (60 months). Ignoring interest, approximately how much do you need to save per month?",
      options: ["Tk 10,000", "Tk 15,000", "Tk 20,000", "Tk 25,000"],
      correctIndex: 3,
      explanation:
        "Tk 1,500,000 ÷ 60 months = Tk 25,000/month. In practice, if invested at 8% annually, the required monthly saving is lower (approximately Tk 20,000) because of interest earnings. But the simple division gives a useful upper-bound estimate.",
    },
    {
      question: "What is the role of an annual financial plan review?",
      options: [
        "To identify underperforming investments and replace them",
        "To update goals, savings amounts, and timelines as life circumstances change — keeping the plan relevant to your actual situation",
        "To comply with Bangladesh Bank requirements",
        "To calculate annual tax liability",
      ],
      correctIndex: 1,
      explanation:
        "Life changes require plan changes. Marriage, children, job changes, health events: all alter the goal landscape, available income, and time horizons. An annual review ensures the plan reflects your actual current situation rather than an outdated snapshot.",
    },
    {
      question: "True or False: Long-term wealth building (equity investment) should be your first financial priority.",
      options: [
        "True — equity provides the best long-term returns",
        "False — foundation (emergency fund, no high-interest debt) and protection (insurance) must come before equity investment",
      ],
      correctIndex: 1,
      explanation:
        "Starting equity investment without an emergency fund means any financial disruption forces selling at the worst time. Carrying high-interest debt while investing in equity earning lower returns destroys net wealth. Foundation and protection first.",
    },
  ],

  whatsNext: {
    nextModuleId: "z9-2",
    preview: "Goals set. Next: the retirement number — what is enough?",
  },
};

// ─── MODULE Z9-2 ─────────────────────────────────────────────
export const moduleZ9_2: Module = {
  id: "z9-2",
  zoneId: "zone-9",
  title: "Retirement planning: what does 'enough' actually mean?",
  tagline: "The number most people never calculate — and why that's the problem.",
  estimatedMinutes: 11,

  hook: `"Most people plan to 'save for retirement' without knowing how much retirement costs. They set vague targets ('as much as possible') without knowing what number would actually allow them to stop working. The result: either they oversave — denying themselves unnecessarily — or they undersave and face a financial shortfall at 65. Calculating your actual number is the first step in making retirement a real plan rather than a vague hope."`,

  context: `Bangladesh does not have a universal pension system for private sector workers. The government pension applies only to civil servants. This means private sector workers — the majority of young Bangladeshi earners — must fund their own retirement entirely from personal savings and investments. Understanding this creates urgency. Understanding the math creates a specific, actionable plan.`,

  teaching: `
## The retirement funding gap in Bangladesh

Most private sector workers in Bangladesh have no formal retirement benefit other than the RJSC gratuity (typically 1 month's salary per year worked, paid by the employer on retirement). A 30-year career produces approximately 30 months of salary — enough for perhaps 2-3 years of retirement expenses, not 20-30 years.

For a 25-year-old who retires at 60 and lives to 80: that is 20 years of retirement to fund. From savings alone.

## Calculating your retirement number

Step 1: Estimate your annual retirement expenses.
What would you need per year to live comfortably in retirement? Think about housing (owned by then?), food, healthcare, family support if any. A common approximation is 70-80% of your current annual income (lower because some costs reduce in retirement).

Step 2: Apply the 25x rule.
Multiply your annual retirement expenses by 25 to get your retirement corpus target. This target, invested in a diversified portfolio yielding approximately 4% annually (after inflation adjustment), can sustain indefinite withdrawals at 4% per year.

Example: Annual retirement expenses of Tk 5 lakh × 25 = Tk 1.25 crore retirement corpus.

Step 3: Calculate the required monthly savings.
Using a retirement calculator (the SIP calculator in Kosh works for this), enter: target amount, years to retirement, expected annual return. The output is your required monthly savings.

Example: Tk 1.25 crore target, 35 years to retirement, 10% annual return → required monthly savings approximately Tk 3,800.

Step 4: Reality-check against current savings rate.
Is the required monthly savings achievable? If not, either extend the working timeline, reduce the retirement expense estimate, plan for part-time work in retirement, or increase savings rate progressively as income grows.

## The inflation problem in retirement planning

All the numbers above need to account for inflation. Tk 5 lakh today buys much more than Tk 5 lakh in 35 years. A target set in today's money needs adjustment.

Practical approach: use a nominal return of 10-12% on investments and apply an inflation rate of 6-8% to your expense estimates. The retirement corpus calculated in today's money, invested in instruments that outpace inflation, remains a reasonable approximation.

Or use the SIP calculator and input a return rate that is already adjusted for inflation (for example, 4% real return instead of 10% nominal — the difference accounts for 6% inflation).

## Sources of retirement income to consider

In Bangladesh, potential retirement income sources include:
- Personal savings and investments (primary for private sector)
- Employer gratuity (typically limited, as noted above)
- Rental income from property (if owned)
- Family support from children (cultural but not financially reliable to plan around)
- Part-time or consulting income (possible but not guaranteed)

Planning assuming family support will cover retirement needs is a financial risk. Adult children may face their own financial constraints. A plan that is self-sufficient is resilient; one that depends on others is fragile.
  `,

  bdExample: `Salam is 28, earns Tk 60,000/month. He estimates retirement expenses of Tk 40,000/month (Tk 4.8 lakh/year) in today's money. His corpus target: Tk 4.8 lakh × 25 = Tk 1.2 crore. He plans to retire at 62 (34 years). Expected portfolio return: 10% annually. Using a SIP calculator: required monthly savings approximately Tk 4,000/month. He currently saves Tk 8,000/month in a DPS (Tk 5,000) and some stocks (Tk 3,000). His retirement savings are ahead of plan. He can afford to also save for a housing goal and his children's education without compromising retirement.`,

  actionPrompt: {
    text: "Estimate your monthly retirement expenses (in today's money). Multiply by 12 then by 25. That is your approximate retirement corpus target. Use Kosh's SIP calculator to find the required monthly savings, using your age, target retirement age, and 10% annual return.",
    ctaButtonText: "I calculated my retirement number",
  },

  game: z9Game1,

  quiz: [
    {
      question: "Why must private sector workers in Bangladesh fund their own retirement almost entirely?",
      options: [
        "Bangladesh law requires private savings",
        "Bangladesh does not have a universal pension system for private sector employees — they receive only a gratuity that covers a few years of retirement at most",
        "Government pensions are available but require special registration",
        "Private sector employees choose to save personally for higher returns",
      ],
      correctIndex: 1,
      explanation:
        "Government pensions apply only to civil servants. Private sector workers receive a gratuity (typically 1 month's salary per year worked) — enough for perhaps 2-3 years of retirement expenses, not 20-30 years. Self-funded retirement is a practical necessity, not a preference.",
    },
    {
      question: "The '25x rule' for retirement corpus means:",
      options: [
        "You should save 25% of your income",
        "You need 25 times your annual retirement expenses invested to sustain indefinite withdrawals at 4% per year",
        "You should start saving 25 years before retirement",
        "Your equity allocation should be 25% at retirement",
      ],
      correctIndex: 1,
      explanation:
        "The 25x rule is derived from the 4% safe withdrawal rate. A portfolio that can sustain 4% annual withdrawals indefinitely (historically shown to work for diversified portfolios) needs to be 25 times the annual withdrawal amount.",
    },
    {
      question: "What is the primary problem with planning retirement around family support from adult children?",
      options: [
        "It is culturally inappropriate in Bangladesh",
        "Adult children may face their own financial constraints — making this an unreliable and fragile planning assumption",
        "Bangladesh Bank regulations prohibit this",
        "Family support reduces your tax benefits",
      ],
      correctIndex: 1,
      explanation:
        "Children's financial situations are uncertain — they may have their own significant expenses, dependents, or financial challenges. A self-sufficient retirement plan that does not require family support is resilient. One that depends on others is fragile and creates family financial stress.",
    },
    {
      question: "If your estimated annual retirement expenses are Tk 6 lakh, what is your approximate retirement corpus target?",
      options: ["Tk 60 lakh", "Tk 1 crore", "Tk 1.5 crore", "Tk 3 crore"],
      correctIndex: 2,
      explanation:
        "Tk 6 lakh × 25 = Tk 1.5 crore. At a 4% withdrawal rate from Tk 1.5 crore, you withdraw Tk 6 lakh per year — exactly your estimated annual expenses.",
    },
    {
      question: "A 26-year-old calculates they need to save Tk 4,000/month for retirement but currently saves Tk 10,000/month. What is the most reasonable interpretation?",
      options: [
        "Their retirement savings are insufficient — always save as much as possible",
        "They can allocate the excess toward other financial goals while maintaining retirement savings",
        "They should retire earlier since they are saving ahead of plan",
        "The calculation must be wrong — Tk 4,000 is too low",
      ],
      correctIndex: 1,
      explanation:
        "Meeting the retirement savings target leaves excess capacity for other goals — housing, education, medium-term goals. Financial planning is about optimizing across multiple goals, not maximizing any single one. Knowing the retirement number allows rational allocation of the surplus.",
    },
  ],

  whatsNext: {
    nextModuleId: "z9-3",
    preview: "You have a retirement number. Next: building a complete one-page financial plan that connects all zones.",
  },
};

// ─── MODULE Z9-3 ─────────────────────────────────────────────
export const moduleZ9_3: Module = {
  id: "z9-3",
  zoneId: "zone-9",
  title: "The salary negotiation nobody taught you",
  tagline: "The highest-return financial action available to most young earners.",
  estimatedMinutes: 9,

  hook: `"Most people spend significant time optimizing investments that earn 8-12% annually. Almost nobody puts equivalent effort into the decision that can increase their income by 15-30% in a single conversation. Salary negotiation compounds across your entire working life — a Tk 10,000 raise at 26, if sustained and grown, produces far more total lifetime wealth than most investment optimizations."`,

  context: `In Bangladesh's professional context, salary negotiation is culturally uncomfortable and strategically underused. The discomfort is real but the cost of not negotiating is also real and compounding. This module covers the practical, Bangladesh-specific approach to salary negotiation — what to say, when to say it, and what outcomes are realistic.`,

  teaching: `
## Why salary matters more than investment returns for young earners

At Tk 50,000/month income with 20% savings rate: savings = Tk 10,000/month.
A 10% investment return improvement on Tk 10,000/month = Tk 1,000/month benefit.
A 20% salary increase to Tk 60,000/month: savings increase to Tk 12,000+, and the savings rate itself can grow.

The math consistently shows that increasing income dominates optimizing investment returns for people early in their careers with relatively small capital bases. The salary is the engine. The investments are what the engine produces.

## When to negotiate (timing is most of the answer)

**Best times:**
- When switching jobs (highest leverage — the new employer is paying to hire you)
- After a significant achievement (project completed, new responsibility taken, client won)
- Annual review (not the day of — request a dedicated conversation about compensation)
- When offered a promotion without compensation change

**Worst times:**
- After a mistake or failure
- When you have expressed you are comfortable
- During colleague conflicts or team instability
- As a reaction to someone else's raise

## How to frame the conversation in Bangladesh

The cultural context: direct salary demands feel uncomfortable in hierarchical professional cultures. The effective framing is not "I want more money" but "I want to understand how to grow my contribution and my compensation together."

**Effective opening:** "I'd like to schedule a conversation about my role and compensation. I want to understand what contributions would justify a salary review and what the timeline for that would look like."

**The evidence-based case:** Before the conversation, prepare: specific contributions you have made, quantifiable impact (projects delivered, cost savings, revenue generated, efficiency improvements), market rate research (what is this role paying in comparable organizations).

**The specific ask:** Never leave a negotiation conversation with "I'd like more money" and no number. A specific number is required. Say: "Based on my research on market rates and my contributions, I believe a salary of [specific number] is appropriate. Is that something we can work toward?"

## What is realistic in Bangladesh's job market

Typical salary increase for strong performers during annual review: 10-15%
Salary increase when switching jobs: 20-40% is common and often expected
Counter-offer success rate for resignations: approximately 50% of employees who receive counter-offers accept them

The moment of resignation or job offer is your strongest negotiation leverage. Use it.

## Negotiating beyond base salary

Total compensation includes: base salary, performance bonus, annual increment policy, health insurance coverage, professional development budget, remote work flexibility, and leave policy. Sometimes negotiating non-cash benefits is more accessible than cash.
  `,

  bdExample: `Faruk works in IT at Tk 65,000/month and has been offered a new role at Tk 82,000/month. He informs his current employer. They offer Tk 75,000 to retain him. Faruk negotiates further: "The competing offer is Tk 82,000 with health insurance included. To stay, I would need Tk 80,000 plus the existing health insurance policy extended to family coverage." The employer agrees to Tk 78,000 plus family health insurance (approximate value: Tk 15,000/year). Faruk's total compensation increases by Tk 28,000/year above the counter-offer — from a 10-minute conversation. His colleague who did not negotiate accepted Tk 75,000 without question.`,

  actionPrompt: {
    text: "Research the market rate for your current role in your city (LinkedIn Salary, Glassdoor Bangladesh data, or industry contacts). Is your current salary at, above, or below market? When is your next review or your next opportunity to negotiate?",
    ctaButtonText: "I researched my market salary",
  },

  quiz: [
    {
      question: "For young earners with relatively small capital bases, which has a larger impact on long-term wealth?",
      options: [
        "Optimizing investment returns from 8% to 10%",
        "Increasing income by 20% through salary negotiation",
        "Switching from FDR to Sanchaypatra",
        "Reducing monthly expenses by 5%",
      ],
      correctIndex: 1,
      explanation:
        "A 20% salary increase changes the entire capital accumulation trajectory — more savings, higher savings rate, and compounding on a larger base for decades. Optimizing investment returns on a small capital base produces far smaller absolute effects.",
    },
    {
      question: "The highest-leverage moment for salary negotiation is:",
      options: [
        "Annual performance review",
        "After receiving a promotion",
        "When switching jobs — the new employer has invested in hiring you and expects negotiation",
        "After 5 years at the same company",
      ],
      correctIndex: 2,
      explanation:
        "At the job offer stage, you have maximum leverage: the employer has committed resources to hiring you, has no replacement, and typically expects negotiation. Accepting the first offer without negotiating almost always leaves money on the table.",
    },
    {
      question: "What should you always do before concluding a salary negotiation conversation?",
      options: [
        "Thank the interviewer for their time",
        "Ask for the decision by the end of the day",
        "State a specific number — not just 'I'd like more' but a precise ask",
        "List all your achievements again",
      ],
      correctIndex: 2,
      explanation:
        "Vague requests produce vague outcomes. A specific number — based on market research and your contributions — gives the employer something concrete to respond to. Without a number, the conversation ends in ambiguity.",
    },
    {
      question: "When switching jobs in Bangladesh, a salary increase of what range is commonly accepted and expected?",
      options: [
        "1-5%",
        "5-10%",
        "20-40%",
        "50%+",
      ],
      correctIndex: 2,
      explanation:
        "In Bangladesh's professional job market, a 20-40% increase when switching employers is common and generally expected. Employers who hire externally expect candidates to move for meaningful compensation improvement. Accepting a lateral or marginal increase undermines the leverage of switching.",
    },
    {
      question: "True or False: Salary negotiation in Bangladesh is only effective for senior professionals.",
      options: [
        "True — junior employees have no negotiation leverage",
        "False — negotiation is effective at all career levels, with different framing and realistic expectations for what is achievable",
      ],
      correctIndex: 1,
      explanation:
        "Even entry-level candidates can negotiate effectively — particularly when switching jobs. The leverage differs (experienced professionals have more) but the principle and the benefit apply at all levels. Not negotiating at any career stage leaves money on the table.",
    },
  ],

  whatsNext: {
    nextModuleId: "z9-4",
    preview: "Salary sorted. One more — building credit responsibly before you actually need it.",
  },
};

// ─── MODULE Z9-4 ─────────────────────────────────────────────
export const moduleZ9_4: Module = {
  id: "z9-4",
  zoneId: "zone-9",
  title: "Your financial plan on one page",
  tagline: "Every strategy from every zone, synthesized into a single actionable summary.",
  estimatedMinutes: 10,

  hook: `"The point of learning about money is not to understand money. It is to do something different with it. This module takes every concept from every Kosh zone and puts it on one page — your actual personal financial plan. Not a template. A plan with your numbers, your goals, your timeline."`,

  context: `Most financial plans exist as vague intentions or detailed documents that are reviewed once and never updated. An effective personal financial plan is simple enough to remember, specific enough to act on, and reviewed regularly enough to stay relevant. This module walks through building one.`,

  teaching: `
## The one-page financial plan structure

**Section 1: Your current position (5 minutes to fill out)**
- Monthly take-home income: Tk ___
- Monthly fixed commitments (rent, EMI, family): Tk ___
- Monthly savings (all products): Tk ___
- Current savings products and balances: ___
- Emergency fund status: Tk ___ of Tk ___ target (___%)
- Outstanding debts: Tk ___ at ___% interest
- Grey Zone exposure (crypto/betting losses to address): ___

**Section 2: Your goals (3 goals maximum to start)**
| Goal | Target amount | Timeline | Monthly required |
|------|--------------|----------|-----------------|
| 1.   |              |          |                 |
| 2.   |              |          |                 |
| 3.   |              |          |                 |

**Section 3: Your current allocation (how each savings amount maps to each goal)**
- Tk ___ goes to [emergency fund / goal 1 / goal 2 / goal 3 / retirement]
- Tk ___ goes to [same breakdown]
- Total monthly savings: Tk ___

**Section 4: Your one action this month**
Not a list of 10 improvements — just one. The most important thing to change, start, or stop this month.

**Section 5: Review date**
The date you will look at this plan again: ___

## How to use the plan

Post it somewhere you see it. Your phone lock screen, your desk, a note on your wall. The plan cannot work if you never look at it.

Review monthly: check that savings transfers happened, check goal progress.

Review annually: update amounts as income changes, add or modify goals as life changes.

Revise immediately when major life events occur: marriage, child, job change, health event.

## What makes this plan different from a spreadsheet

A plan on one page is one page. Spreadsheets with 40 tabs are never reviewed. Complexity does not improve a financial plan — it usually prevents one from existing at all. Start with one page, one page always.

## The financial behaviors that matter most across your whole life

Research on financial outcomes consistently identifies a short list of behaviors that explain most of the variance between people who achieve financial security and those who don't:

1. Spending less than you earn — consistently, across all income levels
2. Starting to save early — even small amounts, even imperfect instruments
3. Avoiding catastrophic mistakes — high-interest debt spirals, falling for Ponzi schemes, liquidating investments in panic
4. Protecting against major risks — health insurance, emergency fund
5. Staying the course during market downturns — not panic-selling

Technical knowledge of investment instruments matters less than these five behaviors. Most of what Kosh has taught you is designed to make these five behaviors easier and more informed.
  `,

  bdExample: `Nadia, 27, completes her one-page plan in 15 minutes. Current position: Tk 52,000 income, Tk 34,000 fixed commitments, Tk 8,000 savings, Tk 45,000 emergency fund (75% complete). Goals: (1) emergency fund complete — Tk 15,000 in 12 months, (2) sister's wedding contribution Tk 2 lakh in 3 years, (3) apartment deposit Tk 8 lakh in 7 years. Allocation: Tk 1,250/month emergency top-up, Tk 4,000/month DPS for wedding, Tk 2,750/month Sanchaypatra for apartment. One action this month: set up the DPS auto-debit. Review date: 3 months. The plan took 15 minutes to create. It replaced years of vague financial intention.`,

  actionPrompt: {
    text: "Build your one-page plan using the structure in this module. Fill in all five sections. Set a reminder on your phone for 90 days from today to review it.",
    ctaButtonText: "I completed my one-page financial plan",
  },

  quiz: [
    {
      question: "Why is a financial plan limited to one page more effective than a detailed spreadsheet for most people?",
      options: [
        "One-page plans contain less information and are therefore less accurate",
        "Simple plans are reviewed regularly; complex plans are made once and abandoned — simplicity enables consistent use",
        "Spreadsheets are not appropriate tools for financial planning",
        "One-page plans are recommended by Bangladesh Bank",
      ],
      correctIndex: 1,
      explanation:
        "A financial plan only works if it is used. Complexity creates friction that prevents use. A simple, memorable, visually accessible plan is reviewed and updated regularly — which produces far better financial outcomes than a sophisticated plan that sits unopened.",
    },
    {
      question: "The 'one action this month' in a financial plan serves what purpose?",
      options: [
        "It limits your financial planning to one improvement per month",
        "It focuses execution energy on the single highest-priority change, preventing overwhelm that leads to inaction",
        "It is a regulatory requirement for financial plans",
        "It ensures you never make more than one financial change at a time",
      ],
      correctIndex: 1,
      explanation:
        "Overwhelm from a long action list produces inaction. One prioritized action produces results. The most common reason well-designed financial plans fail is attempting too many changes simultaneously.",
    },
    {
      question: "Research on financial outcomes suggests which behaviors explain most of the difference between financially secure and financially struggling individuals?",
      options: [
        "Investment instrument selection and market timing",
        "Income level and education",
        "Spending less than you earn, starting early, avoiding catastrophic mistakes, protecting against major risks, and not panic-selling",
        "Access to financial advice and technology tools",
      ],
      correctIndex: 2,
      explanation:
        "Behavioral factors dominate technical knowledge and income level in explaining financial outcomes. The five behaviors listed apply across income levels and are largely within an individual's control, unlike market conditions or economic circumstances.",
    },
    {
      question: "When should a financial plan be revised immediately (not waiting for the annual review)?",
      options: [
        "When the stock market falls more than 10%",
        "When you hear about a new investment opportunity",
        "When major life events occur: marriage, child, job change, significant health event, inheritance",
        "When your bank changes FDR rates",
      ],
      correctIndex: 2,
      explanation:
        "Major life events fundamentally change goals, timelines, income, expenses, and risk profiles. Waiting for the annual review after such events means operating on an outdated plan for months. Immediate revision keeps the plan relevant.",
    },
    {
      question: "True or False: Advanced knowledge of investment instruments is more important for long-term financial security than consistently practicing the five core financial behaviors.",
      options: [
        "True — knowledge of compound interest, diversification, and tax optimization drives outcomes",
        "False — behavioral consistency (spending less than earned, starting early, avoiding disasters, protecting against risks, staying calm) explains most financial outcomes",
      ],
      correctIndex: 1,
      explanation:
        "Research is consistent: behavior dominates knowledge in financial outcomes. A person with basic knowledge who consistently saves, avoids major mistakes, and protects against catastrophic risks will almost always outperform someone with sophisticated investment knowledge who lacks behavioral discipline.",
    },
  ],

  whatsNext: {
    nextModuleId: "z9-5",
    preview: "Plan built. One final module: understanding what happens to your money after you.",
  },
};

// ─── MODULE Z9-5 ─────────────────────────────────────────────
export const moduleZ9_5: Module = {
  id: "z9-5",
  zoneId: "zone-9",
  title: "Wills, nominees, and what happens to your money after you",
  tagline: "The financial planning conversation everyone avoids and nearly everyone needs.",
  estimatedMinutes: 9,

  hook: `"Nominee and heir are not the same thing. In Bangladesh, millions of people have named nominees on their bank accounts, Sanchaypatra, and BO accounts without understanding that a nominee is not legally the owner of those assets after you die — your legal heirs are. The confusion costs families significant time, money, and conflict during the most difficult periods of their lives."`,

  context: `Estate planning — deciding what happens to your financial assets when you die — is culturally avoided in Bangladesh as 'bad luck' to discuss. The practical consequence is widespread nominee confusion, protracted legal disputes over assets, and family members unable to access money they need during crises. Basic estate planning is not morbid. It is an act of care for the people who depend on you.`,

  teaching: `
## Nominee vs heir: the critical distinction

**Nominee:** The person you designate to receive an asset or handle proceedings on behalf of your estate. A nominee is not automatically the legal owner after you die.

**Legal heirs:** People who inherit your assets according to law (or according to your will). In Bangladesh, this follows Islamic inheritance law for Muslims (unless a different arrangement is legally made) or Hindu succession law for Hindus.

The distinction matters: if you name your spouse as nominee on your bank account, but you have three children, the legal heirs under inheritance law may include all three children. The nominee (spouse) can access the account and then has a legal obligation to distribute appropriately among legal heirs.

In practice: conflicts arise when nominees and legal heirs are different people, or when family members are unaware of the legal framework.

## What a will can do in Bangladesh

A properly executed will — called a 'Wasiyat' in Islamic law — allows you to direct how specific assets are distributed, with some constraints. Under Islamic law, you can freely allocate only up to one-third of your estate by will. The remaining two-thirds must follow the prescribed Islamic inheritance rules.

For non-Muslims, succession laws provide more flexibility for will-based allocation.

A will must be:
- Written and signed by the testator (the person making the will)
- Witnessed by at least two adult witnesses (not beneficiaries)
- Registered at a Sub-Registrar's office for greater legal protection (not mandatory but strongly recommended)

## Practical steps for basic estate planning

**Step 1:** Create a list of all your financial assets: bank accounts, FDR, Sanchaypatra, BO account and stockholdings, mutual fund units, property, life insurance policies, and any other assets.

**Step 2:** Ensure nominees are correctly named on each asset. Verify the documents — many people have incorrect, outdated, or no nominees.

**Step 3:** Inform a trusted family member where this list is kept and the nature of each asset. They cannot access it, but they need to know where to look if needed.

**Step 4:** For anyone with significant assets or family complexity, consult a lawyer about whether a registered will is appropriate.

**Step 5:** Update all nominations and documents after major life events: marriage, death of a previous nominee, divorce, birth of children.

## The digital asset problem

Increasingly, financial value exists in digital form: mobile banking accounts, investment platform accounts, cryptocurrency (if any). These have unique challenges — if no one knows the login, the assets may become inaccessible.

Practical approach: maintain a physical record (not on a phone or computer) of critical account information that a trusted person can access if needed, stored somewhere secure. This is not sharing passwords — it is ensuring someone knows what exists.
  `,

  bdExample: `Hasan died unexpectedly at 38. He had Tk 15 lakh in a bank account with his mother named as nominee, Tk 8 lakh in Sanchaypatra with no nominee listed, and a BO account with Tk 6 lakh in stocks with his brother as nominee. He left a wife and two children. Legal heirs under Islamic inheritance law: wife (one-eighth share), children (the rest). The nominee designations do not automatically override the inheritance law. The family spent 18 months in legal proceedings to clarify ownership of all assets. The costs of lawyers and court fees consumed approximately Tk 3 lakh. Hasan's 15-minute conversation with a lawyer five years earlier — to register a will and correctly designate nominees — would have prevented all of it.`,

  actionPrompt: {
    text: "List all your financial accounts and assets. For each, identify who is currently named as nominee. Is any nominee outdated (e.g., a deceased relative, an old friend)? Update any incorrect nominations this week.",
    ctaButtonText: "I reviewed my nominee designations",
  },

  quiz: [
    {
      question: "What is the legal difference between a 'nominee' and a 'legal heir' in Bangladesh?",
      options: [
        "There is no legal difference — a nominee is always the legal heir",
        "A nominee is designated to access or manage assets; legal heirs are those entitled to inherit under law — the two can differ",
        "Nominees have higher legal priority than heirs in all cases",
        "Nominees only apply to bank accounts, not to property",
      ],
      correctIndex: 1,
      explanation:
        "Nominees receive or manage assets initially but may have legal obligations to distribute to legal heirs. In Bangladesh, legal inheritance is primarily governed by Islamic law for Muslims. Nominee designations do not override inheritance law.",
    },
    {
      question: "Under Islamic inheritance law in Bangladesh, what portion of your estate can you freely allocate in a will?",
      options: [
        "The entire estate",
        "One-half",
        "Up to one-third",
        "Whatever you choose regardless of religious law",
      ],
      correctIndex: 2,
      explanation:
        "Islamic inheritance law (applicable to Muslim Bangladeshis) allows free allocation of only up to one-third of the estate. The remaining two-thirds is distributed according to prescribed shares for specific family members.",
    },
    {
      question: "Which step is most important immediately after naming a nominee on a financial account?",
      options: [
        "Registering the nomination at a Sub-Registrar's office",
        "Informing the nominee of their designation and ensuring they know the account exists",
        "Opening a separate account for the nominee",
        "Notifying Bangladesh Bank",
      ],
      correctIndex: 1,
      explanation:
        "A nominee who doesn't know they are nominated — or doesn't know the account exists — cannot access the assets when needed. Basic communication of what exists and where to look is the practical step that makes nominations useful.",
    },
    {
      question: "Why is the 'digital asset problem' increasingly important for estate planning?",
      options: [
        "Digital assets are not legally recognized in Bangladesh",
        "Financial value in digital accounts (mobile banking, investment platforms) may be inaccessible if no one knows the account exists or how to access it",
        "Digital assets are automatically transferred to the government after death",
        "Only cryptocurrency presents this problem, not regular mobile banking",
      ],
      correctIndex: 1,
      explanation:
        "If no one knows an account exists, or knows how to access it after someone's death, the assets may become permanently inaccessible. A physical record of what accounts exist — without sharing passwords — ensures trusted family members know where to look.",
    },
    {
      question: "True or False: Discussing estate planning and wills is bad luck in financial planning and should be postponed until necessary.",
      options: [
        "True — cultural norms suggest avoiding this topic",
        "False — estate planning is an act of financial responsibility and care for dependents; postponing it creates preventable legal and financial problems for family",
      ],
      correctIndex: 1,
      explanation:
        "Cultural discomfort with discussing death is understandable. The financial consequences of not planning — protracted inheritance disputes, inaccessible assets, family conflict during grief — are real and preventable. The discomfort of one conversation is far smaller than the cost of avoiding it.",
    },
  ],

  whatsNext: {
    nextModuleId: null,
    preview:
      "Zone 9 complete. You have now covered everything from foundations to estate planning. Kosh's full curriculum is complete. Your financial education continues — but now it is built on a genuine foundation.",
  },
};

export const zone9Modules = [
  moduleZ9_1,
  moduleZ9_2,
  moduleZ9_3,
  moduleZ9_4,
  moduleZ9_5,
];
