import type { Module } from "@/types/curriculum";

export const moduleZ2_1: Module = {
  id: "z2-1",
  zoneId: "zone-2",
  title: "Why every budget you've tried has failed",
  tagline: "Not your fault. Wrong system design.",
  estimatedMinutes: 9,
  hook: `"You've tried budgeting. You tracked expenses for 10 days, then stopped. Or you made a spreadsheet you never opened again. Or you decided from January 1st and quit by January 19th. You concluded the problem was your discipline. It wasn't. The problem was the system — and nobody told you that."`,
  context: `Budgeting failure is almost universal. Studies of behavioral finance consistently find that rigid category-based budgets fail for most people not because they lack self-control but because the system design conflicts with how humans actually make decisions. Understanding why budgets fail leads directly to designing one that works.`,
  teaching: `
## Why traditional budgets fail

**Reason 1: They require constant decision-making.**
A budget with 12 spending categories means 12 decisions every time you spend. Decision fatigue is real. The system that requires the fewest active decisions wins.

**Reason 2: They punish rather than inform.**
When you exceed a category, most people feel guilty and abandon the budget entirely. The emotional response to "failure" overrides the rational purpose of tracking.

**Reason 3: They are not connected to the moment of spending.**
You write the budget on Sunday. You spend on Thursday. By then, the budget feels theoretical. Tracking after the fact creates regret but does not change behavior.

**Reason 4: The categories do not match your actual life.**
Western budget templates have categories for "dining out," "gym membership," and "car payment" — none of which fit a typical Dhaka household. Budget systems fail faster when the categories feel foreign.

## What actually works: awareness-first tracking

The research on financial behavior change suggests that simply making spending visible — without judgment — changes behavior more reliably than budget enforcement. Before you try to control spending, observe it. The awareness phase typically runs for 2-4 weeks. You track what you spend, categorize it loosely (essential, lifestyle, savings, family), and look at the numbers. No targets. No guilt. Just data.

After 3-4 weeks, patterns become visible. You discover where money actually goes vs where you thought it went. This discovery is more motivating than any budget target because it is based on your real behavior, not an ideal.

## The minimum viable budget

After the awareness phase, the simplest effective budget has three categories, not twelve:
1. **Fixed outgoing:** Rent, EMI, DPS, savings transfers — everything that leaves automatically on fixed dates.
2. **Variable essential:** Food, transport, utility bills — things you need but control through behavior.
3. **Everything else:** This category contains both lifestyle spending and discretionary saving. You manage this entire category with one number: the amount remaining after fixed outgoing and essential estimates.

Three categories. One number to watch. Much easier to maintain.

## The key insight: automate, don't decide

Every spending decision you can automate is a decision that cannot be derailed by willpower. Set up auto-transfer to savings on salary day. Set up auto-debit for DPS and loan EMIs. Auto-pay utility bills where possible. What remains in your account after automation is your spending money — and you have natural visibility through your dwindling balance without active tracking.

This is the system design that outlasts motivation.
  `,
  bdExample: `Rashed tried tracking expenses in a notebook for two weeks, then lost the notebook. He tried a phone app, but it felt like work. He tried asking himself "can I afford this?" before every purchase, which made him anxious. None of these stuck. He switched to one thing: auto-transfer Tk 8,000 to a separate account on salary day, before he can spend it. He never tracks what is in his main account — he just spends freely from what remains. Six months later, he has Tk 48,000 saved without feeling like he was on a budget.`,
  actionPrompt: {
    text: "For the next 7 days, track every transaction without judging it. Use your bKash/Nagad history plus bank app. Just observe. No targets yet.",
    ctaButtonText: "I started my 7-day observation",
  },
  quiz: [
    {
      question: "Research on behavior change and budgeting suggests which approach is more effective?",
      options: [
        "Strict category budgets with weekly review meetings",
        "Awareness-first tracking without judgment, which makes spending visible and naturally changes behavior",
        "Zero-based budgeting where every taka is assigned a category",
        "Cutting all non-essential spending immediately",
      ],
      correctIndex: 1,
      explanation: "Making spending visible without judgment tends to change behavior more reliably than enforcement systems. People who see where their money goes naturally adjust without feeling controlled.",
    },
    {
      question: "The minimum viable budget in this module has how many spending categories?",
      options: ["12", "6", "3 — fixed outgoing, variable essential, everything else", "1"],
      correctIndex: 2,
      explanation: "Three categories: fixed outgoing (automatic deductions), variable essential (food/transport), and everything else. This captures all spending without creating excessive decision points.",
    },
    {
      question: "Why does automating savings on salary day work better than deciding to save each month?",
      options: [
        "Because bank automation earns more interest",
        "Because it eliminates the monthly decision — the money moves before it can be spent",
        "Because it is required by Bangladesh Bank",
        "Because manual savings transfers incur fees",
      ],
      correctIndex: 1,
      explanation: "Every decision is a potential failure point. Automating removes the decision. The money is gone before you have the opportunity not to save it. Automation outlasts motivation.",
    },
    {
      question: "What is the main reason traditional budgets fail for most people?",
      options: [
        "People lack financial education",
        "Budgets are too complicated to understand",
        "They require constant active decisions and punish the human response to 'failure,' leading to abandonment",
        "They do not account for inflation",
      ],
      correctIndex: 2,
      explanation: "Decision fatigue and the emotional response to budget 'failure' (guilt leading to abandonment) are the primary reasons budgets fail. The system design conflicts with human psychology.",
    },
    {
      question: "True or False: Having 12 specific spending categories in a budget is better than 3 broad categories.",
      options: [
        "True — more categories means more precision and control",
        "False — more categories means more decisions, leading to higher abandonment rates",
      ],
      correctIndex: 1,
      explanation: "More categories create more opportunities for decision fatigue and failure. Three broad categories reduce the cognitive load while still capturing all spending.",
    },
  ],
  whatsNext: {
    nextModuleId: "z2-2",
    preview: "You already have 3 months of expense data on your phone. You just have not looked at it that way.",
  },
};

export const moduleZ2_2: Module = {
  id: "z2-2",
  zoneId: "zone-2",
  title: "Your bKash history is already a budget",
  tagline: "You have the data. You just haven't read it yet.",
  estimatedMinutes: 9,
  hook: `"Open your bKash app right now. Go to transaction history. Scroll back 3 months. You are looking at where your money went — food, transport, family transfers, bill payments, purchases, withdrawals. Most people have never done this. This module shows you how to turn 3 minutes of scrolling into 3 months of budget data."`,
  context: `Bangladesh's MFS penetration means that a significant portion of everyday spending already flows through bKash, Nagad, or a bank app. This is an untapped data source. Most financial tracking tools are designed for markets where people use credit cards or digital bank accounts for everything. In Bangladesh, the tracking tool most people already have is their MFS history.`,
  teaching: `
## How to use your MFS history for tracking

**Step 1: Open your bKash or Nagad transaction history.** Both apps show at least 3 months of transactions. Some bank apps show 6-12 months.

**Step 2: Export or screenshot.** bKash does not currently export to CSV easily, but you can screenshot monthly views or note the totals. Nagad has some export functionality.

**Step 3: Categorize loosely.** Group every transaction into:
- **Send money (family):** All transfers to family members
- **Bills and payments:** Utility bills, rent, any recurring fixed payments
- **Cash out:** All cash withdrawals — this is the hardest category to track further, as cash spending is opaque
- **Purchases/merchant payments:** Anything you paid a merchant directly through MFS
- **Savings/financial:** DPS, FDR deposits, any financial product payments

**Step 4: Notice the patterns.**
- How much goes to family per month? Is this consistent or variable?
- How much cash do you withdraw? This is your invisible spending.
- Are there merchant payments for things you cannot remember buying?

## The cash problem

The largest tracking challenge in Bangladesh is cash. Most people withdraw cash from bKash or ATM and then have no record of where it went. If your monthly cash withdrawals are Tk 15,000 and you can only account for Tk 8,000 in spending, Tk 7,000 is invisible money.

There is no perfect solution to cash tracking, but a reasonable approach: estimate cash spending categories from memory for one month, then use that estimate as a rough guide going forward. Reduce cash withdrawals where possible and shift to digital payments to improve visibility.

## The bank app tracker

Your bank's mobile app shows all debits and credits on your account. Combined with your bKash/Nagad history, this covers the majority of financial flows for most salaried employees. Ten minutes once a month reviewing both apps gives you a comprehensive picture without active daily tracking.

## Setting one number from the data

After 2-3 months of observation using MFS and bank data, you can identify your typical monthly spending in each loose category. From this, set one number: your "monthly lifestyle spending" total — everything except fixed commitments (rent, EMI, DPS). Track this single number each month going forward. Is it going up? Down? Steady? One number is easier to manage than 12.
  `,
  bdExample: `Sana scrolled through 3 months of bKash history in 15 minutes. She found: Tk 18,000/month in family transfers, Tk 12,000/month in cash withdrawals (mostly unknown destination), Tk 6,000/month in merchant payments (food, transport), Tk 5,000 in utility bills. She didn't know she was sending Tk 18,000/month to family — she thought it was "around Tk 12,000." She didn't realize how much cash she withdrew with no tracking. This 15-minute exercise changed her understanding of her own finances.`,
  actionPrompt: {
    text: "Right now: open bKash or Nagad transaction history. Scroll back 2 months. Pick one month and categorize the transactions loosely. What is your largest spending category?",
    ctaButtonText: "I reviewed my transaction history",
  },
  quiz: [
    {
      question: "What is the biggest limitation of using MFS history for expense tracking in Bangladesh?",
      options: [
        "MFS apps don't keep more than 7 days of history",
        "Cash withdrawals are not further categorized — cash spending remains opaque",
        "MFS history only shows outgoing transactions",
        "Bangladesh Bank does not allow access to transaction history",
      ],
      correctIndex: 1,
      explanation: "Cash withdrawals show as a single line item but the underlying cash spending is untracked. This is the main blind spot in MFS-based tracking — and it is significant because cash is still widely used in Bangladesh.",
    },
    {
      question: "The 'one number' approach to budgeting refers to:",
      options: [
        "Keeping exactly Tk 10,000 in a savings account",
        "Tracking a single 'monthly lifestyle spending' total rather than 12 category breakdowns",
        "Setting a target for savings as a single percentage",
        "Logging one transaction per week",
      ],
      correctIndex: 1,
      explanation: "Instead of tracking 12 categories, you track one aggregate number — total variable spending. This is easier to maintain and still reveals whether your lifestyle spending is trending up, down, or stable.",
    },
    {
      question: "What should you do with cash spending that cannot be precisely tracked?",
      options: [
        "Eliminate all cash use immediately",
        "Ignore it — cash is untraceable anyway",
        "Estimate cash categories from memory, use that as a rough guide, and gradually shift more spending to digital",
        "Count only the cash withdrawals, not what they were spent on",
      ],
      correctIndex: 2,
      explanation: "Perfect cash tracking is not realistic. The practical approach is estimation from memory to get a rough picture, then gradually increasing digital payments to improve visibility over time.",
    },
    {
      question: "How often should you review your bKash/bank history using the method in this module?",
      options: [
        "Daily — every transaction should be logged immediately",
        "Once a month — a 10-minute review of both MFS and bank app",
        "Only at year-end for tax purposes",
        "Weekly — every Sunday morning",
      ],
      correctIndex: 1,
      explanation: "Monthly review is sustainable. Daily tracking is often what kills tracking habits. A monthly 10-minute review of MFS and bank history gives sufficient visibility without becoming a chore.",
    },
    {
      question: "True or False: The goal of MFS-based tracking is to judge and guilt yourself into spending less.",
      options: [
        "True — seeing your spending should make you spend less",
        "False — the goal is awareness without judgment, which naturally changes behavior",
      ],
      correctIndex: 1,
      explanation: "Judgment leads to guilt leads to abandonment. The awareness-first approach means observing spending patterns without self-criticism. Understanding naturally leads to adjustment.",
    },
  ],
  whatsNext: { nextModuleId: "z2-3", preview: "From observation to system. How to build a budget that runs on autopilot." },
};

export const moduleZ2_3: Module = {
  id: "z2-3",
  zoneId: "zone-2",
  title: "The 4-bucket system in practice",
  tagline: "From the idea in Level 1 to the system running in your bank account.",
  estimatedMinutes: 10,
  hook: `"Level 1's Module 8 gave you the 4-bucket concept. Most people who read it said 'that makes sense' and then went back to their one-account chaos. This module converts the concept into a concrete operational system — what to do on salary day, which transfers to set up, and what each account is called."`,
  context: `The 4-bucket system (essentials, emergency fund, growth, life) is a framework, not a calendar. This module makes it operational by addressing the specific mechanics: which bank accounts to use, what to name them, exactly what to do on salary day, and how to handle variable income months.`,
  teaching: `
## The operational setup

You need 3-4 accounts, not one. Most Bangladeshis use a single current/savings account for everything, which makes behavioral separation impossible.

**Account 1 — Income receiving account (existing):** Your salary lands here. This is a transactional account. You do not leave money here long-term.

**Account 2 — Emergency fund account (new, separate bank):** Keep this at a different bank from your main account. The friction of switching banks prevents impulse withdrawals from the emergency fund. This account is boring by design.

**Account 3 — DPS/Sanchaypatra linkage (existing financial product):** Your medium-term savings auto-debit from Account 1 on salary day.

**Account 4 — Spending account (optional but helpful):** After transferring fixed amounts to Accounts 2 and 3 plus savings products, what remains in Account 1 is your spending money for the month.

## The salary day protocol (10 minutes, once a month)

1. Salary arrives in Account 1.
2. Auto-debit transfers to Account 2 (emergency fund top-up, until funded).
3. Auto-debit transfers to DPS, Sanchaypatra, or other savings products.
4. Auto-payment of loan EMIs and fixed bills.
5. What remains in Account 1 is this month's spending money.

Steps 2-4 should be automated. The goal is that you wake up on the day after salary day with all savings and commitments already transferred.

## Handling variable income months

Some months have extra expenses — Eid, weddings, annual bills. The system accommodates these through a simple rule: if a known extra expense is coming next month, reduce the voluntary savings transfer proportionally this month. The emergency fund is not the right source for planned large expenses — create a specific short-term FDR for predictable large expenses instead.

## Family obligations in the system

In Bangladesh, family financial support is a real monthly expense that the 4-bucket system must include, not exclude. Include family transfers in Bucket 1 (essentials) — not as a guilt expense but as a legitimate, planned outflow. If family support is irregular, estimate a monthly average and treat it as a fixed commitment.

## The minimum viable version

If managing 3-4 accounts feels overwhelming, do just one thing first: auto-transfer a fixed amount to a separate account on salary day, before you can spend it. Even Tk 2,000/month creates the habit. Add more structure once this feels natural.
  `,
  bdExample: `Jasmine earns Tk 55,000. On salary day: Tk 3,000 auto-transfers to her emergency fund account at a different bank. Tk 4,000 auto-debits to her DPS. Tk 5,000 auto-pays her family monthly transfer. Her loan EMI of Tk 7,500 auto-debits. She wakes up the next morning with Tk 35,500 in her main account and knows that is exactly her spending money for the month. No tracking, no decisions, no guilt.`,
  actionPrompt: {
    text: "Set up one automatic transfer this week — even if it's Tk 1,000 to a separate account on the day after salary day. This is the first real step.",
    ctaButtonText: "I set up an automatic transfer",
  },
  quiz: [
    {
      question: "Why should the emergency fund account be at a different bank from your main account?",
      options: [
        "Different banks offer higher interest rates for emergency funds",
        "The friction of switching banks prevents impulse withdrawals from the emergency fund",
        "Bangladesh Bank requires emergency funds at separate institutions",
        "Your main bank account cannot hold savings",
      ],
      correctIndex: 1,
      explanation: "The behavioral design is intentional. If your emergency fund is in the same app, on the same screen, one tap away — it gets spent. The inconvenience of a different bank makes you pause before accessing it, preserving the fund for genuine emergencies.",
    },
    {
      question: "In the salary day protocol, what should happen to savings transfers the day after salary day?",
      options: [
        "You should manually decide how much to transfer based on that month's expenses",
        "All savings and fixed commitments should already have auto-transferred before you can spend the money",
        "You should wait until month-end to see how much is left for saving",
        "Savings transfers should happen weekly, not monthly",
      ],
      correctIndex: 1,
      explanation: "Automation means savings happen before spending. If you wait to see what's left at month-end, there is usually nothing left. The system must move savings before you can spend the money.",
    },
    {
      question: "How should family financial support be categorized in the 4-bucket system?",
      options: [
        "As a voluntary expense that can be skipped if money is tight",
        "In Bucket 1 (essentials) as a planned, legitimate monthly outflow",
        "It should not be part of the formal system",
        "As a savings outflow in Bucket 2",
      ],
      correctIndex: 1,
      explanation: "Family support is a real obligation for most Bangladeshis. Including it as a planned essential — not as a guilt expense — makes it budgeable. Excluding it from the system means the system will never work for BD households.",
    },
    {
      question: "What is the minimum viable first step if the full 4-account system feels overwhelming?",
      options: [
        "Open 4 bank accounts immediately",
        "Set up one automatic transfer to a separate account on salary day, even if it's Tk 2,000",
        "Track every expense for 30 days before doing anything else",
        "Hire a financial advisor",
      ],
      correctIndex: 1,
      explanation: "Starting small with one automatic transfer builds the habit and the account structure. You can add complexity once the basic automation is working. One automatic transfer on salary day is the minimum viable version of the system.",
    },
    {
      question: "True or False: The goal of the salary day protocol is to have all savings and fixed commitments transferred before you have the opportunity to spend the money.",
      options: [
        "True — savings before spending is the core principle",
        "False — you should assess your spending needs first, then save what remains",
      ],
      correctIndex: 0,
      explanation: "Saving before spending (paying yourself first) is the central principle. Saving what remains at month-end consistently fails because expenses expand to fill available funds. Automation locks in savings before spending begins.",
    },
  ],
  whatsNext: { nextModuleId: "z2-4", preview: "You earn more than last year. But you don't feel richer. This is not a coincidence." },
};

export const moduleZ2_4: Module = {
  id: "z2-4",
  zoneId: "zone-2",
  title: "Lifestyle inflation: why earning more doesn't fix it",
  tagline: "The ratchet that catches everyone.",
  estimatedMinutes: 9,
  hook: `"You earn Tk 50,000 now. Last year you earned Tk 35,000. You saved Tk 2,000/month then. You save Tk 2,500/month now. Salary went up 43%. Savings went up 25%. But monthly expenses went up 40%. This is lifestyle inflation — and it is operating in your finances whether or not you have noticed it."`,
  context: `Lifestyle inflation (also called lifestyle creep) is the tendency for spending to increase proportionally with income. It is not a moral failing — it is a documented behavioral pattern. Understanding its mechanics makes it possible to design around it rather than fight it with willpower.`,
  teaching: `
## How lifestyle inflation works

When income rises, people upgrade their lifestyle in ways that feel reasonable in isolation: a better phone, a nicer apartment, more eating out, upgraded clothing, more frequent transportation by Uber instead of CNG. Each individual upgrade seems justified. Collectively, they consume the entire income increase.

The mathematics: if income increases by Tk 15,000/month and lifestyle spending increases by Tk 12,000/month, savings increase by only Tk 3,000/month — despite a large income gain. Over 10 years, the person earning Tk 50,000 who started at Tk 30,000 may have barely more savings than when they started, despite having earned millions more in total.

## The ratchet effect

Lifestyle spending has an asymmetric quality: it is easy to ratchet up and very hard to ratchet down. Downgrading from a Tk 30,000 apartment to a Tk 20,000 apartment after living in the nicer one for 2 years feels like a loss, even though Tk 20,000 was perfectly adequate before. This asymmetry means that lifestyle upgrades have long-term financial consequences that feel temporary in the moment.

## The specific BD pattern: social lifestyle inflation

In Bangladesh, a unique pressure drives lifestyle inflation: social expectations tied to professional status. When you get promoted or move to a better job, there are social expectations about what that means — phone, clothing, restaurant choices, venue for family events. These are not purely personal choices; they are social performances with real financial costs.

Being aware of social lifestyle inflation does not eliminate it, but it changes the nature of the decision. You can choose to meet some social expectations while drawing limits around others.

## The automatic hedge

The best mechanism against lifestyle inflation is designing your savings rate to grow automatically with income. Example: Commit to saving 50% of every income increase. If your salary rises by Tk 10,000, auto-transfer Tk 5,000 additional to savings immediately and before any lifestyle upgrade. The remaining Tk 5,000 is available for lifestyle — and this feels acceptable because you are experiencing an improvement while also saving more.

This principle is easier to implement at the moment of salary increase than retroactively.

## Distinguishing genuine quality improvement from lifestyle inflation

Not all increased spending is lifestyle inflation. Some increases are genuine quality-of-life improvements with lasting value — better health care, education for children, a genuinely safe and comfortable living situation. The question to ask about any spending increase: "Would I still choose this if I were choosing from scratch today, knowing what I know?" Spending that answers yes is genuine preference. Spending that answers "I've just gotten used to it" may be lifestyle inflation.
  `,
  bdExample: `Alim went from Tk 30,000 to Tk 55,000 over 3 years. His rent went from Tk 8,000 to Tk 18,000, his phone from Tk 15,000 to Tk 60,000 every 18 months, his food from home cooking to mostly restaurants. His monthly expenses went from Tk 28,000 to Tk 52,000. His savings went from Tk 2,000 to Tk 3,000. Despite a massive income gain, his savings rate dropped from 6.7% to 5.4%. He applied the automatic hedge rule: when he received his next raise, he auto-transferred 50% of the increase immediately. For the first time, his savings grew proportionally with income.`,
  actionPrompt: {
    text: "Compare your monthly spending now vs 2 years ago (estimate if you don't have records). By how much did income increase? By how much did spending increase? What was the ratio?",
    ctaButtonText: "I estimated my lifestyle inflation rate",
  },
  quiz: [
    {
      question: "What is the 'ratchet effect' in lifestyle spending?",
      options: [
        "Spending always ratchets down when income falls",
        "Lifestyle spending is easy to increase but psychologically very hard to reduce once established",
        "All spending automatically increases with inflation",
        "Bank account fees ratchet up each year",
      ],
      correctIndex: 1,
      explanation: "The ratchet effect describes the asymmetry: upgrades feel easy and natural; downgrades feel like losses even if the previous lifestyle was perfectly adequate. This makes lifestyle inflation particularly hard to reverse.",
    },
    {
      question: "The 'automatic hedge' against lifestyle inflation means:",
      options: [
        "Refusing all lifestyle upgrades when income rises",
        "Committing to saving a fixed percentage (e.g., 50%) of every income increase before any lifestyle adjustment",
        "Hedging against inflation by buying gold with income increases",
        "Automatically reducing savings when income rises to allow for lifestyle improvement",
      ],
      correctIndex: 1,
      explanation: "Setting a rule (50% of any raise goes to savings, auto-transferred immediately) means you benefit from both improving lifestyle and growing savings with each income increase. It is easier to implement at the moment of increase than retroactively.",
    },
    {
      question: "What is a BD-specific driver of lifestyle inflation beyond personal preference?",
      options: [
        "Bangladesh Bank policies on consumer spending",
        "Social expectations tied to professional status — visible consumption as social performance",
        "Mandatory spending required by employers",
        "Inflation making all products more expensive",
      ],
      correctIndex: 1,
      explanation: "In Bangladesh, professional advancement carries social expectations about visible markers of status — phone, apartment, restaurant choices, event venues. These social performances add real financial pressure beyond purely personal preference.",
    },
    {
      question: "True or False: All increased spending with higher income is lifestyle inflation and should be avoided.",
      options: [
        "True — any spending increase indicates lifestyle creep",
        "False — genuine quality improvements with lasting value (healthcare, education, housing safety) are not lifestyle inflation",
      ],
      correctIndex: 1,
      explanation: "Not all increased spending is inflation — some is genuine improvement. The distinction: would you choose this spending from scratch with current knowledge? If yes, it's a genuine preference. If 'I've just gotten used to it,' it may be lifestyle inflation.",
    },
    {
      question: "Someone's salary increased from Tk 40,000 to Tk 60,000. They save 50% of the increase automatically. How much additional savings per month is this?",
      options: ["Tk 60,000", "Tk 10,000", "Tk 5,000", "Tk 20,000"],
      correctIndex: 1,
      explanation: "Income increase = Tk 20,000/month. 50% of increase = Tk 10,000 to savings. The remaining Tk 10,000 is available for lifestyle improvement. Both goals are served simultaneously.",
    },
  ],
  whatsNext: { nextModuleId: "z2-5", preview: "5 numbers. 10 minutes. Monthly. That's the entire financial review system." },
};

export const moduleZ2_5: Module = {
  id: "z2-5",
  zoneId: "zone-2",
  title: "Your monthly financial check-in: 5 numbers in 10 minutes",
  tagline: "You don't need an accountant. You need a dashboard.",
  estimatedMinutes: 8,
  hook: `"The CEO of a 10,000 crore company reviews 5 financial numbers every month. You need the same system. Not because you are running a company — but because without regular review, all the saving, tracking, and system-building in this zone slowly drifts back to chaos. 10 minutes a month keeps everything on track."`,
  context: `Financial systems decay without maintenance. The monthly review is the mechanism that keeps the 4-bucket system running, the savings targets on track, and the emergency fund growing. Most people skip financial reviews because they feel complicated. This module reduces it to exactly 5 numbers.`,
  teaching: `
## The 5 numbers (and why each matters)

**Number 1: Net savings this month**
Total income received - total outgoings = what was actually added to savings accounts/products this month. This should be positive and approximately match your target savings rate. If it's consistently below target, something is pulling money out — find it.

**Number 2: Emergency fund balance**
How many months of expenses does this cover? Target: 3-6 months. If it's below target, prioritize topping it up before anything else.

**Number 3: Total debt balance (and direction)**
Sum of all outstanding loan balances this month vs last month. Is it going down? By how much? This number should be declining consistently if you are in debt repayment mode.

**Number 4: Savings products total**
Total value of DPS + Sanchaypatra + FDR + other savings products. Is this growing? This is your medium and long-term wealth building number.

**Number 5: Lifestyle spending percentage**
Total spending on non-fixed, non-essential items (the "everything else" bucket) as a percentage of income. Is this stable? Rising? This is your early warning indicator for lifestyle inflation.

## The 10-minute check-in process

1. Open bank and bKash/Nagad apps
2. Note current balances and calculate net savings (Number 1)
3. Check emergency fund balance and months-covered (Number 2)
4. Open loan app or statement — note total outstanding (Number 3)
5. Check DPS statement or Sanchaypatra passbook balance (Number 4)
6. Estimate this month's discretionary spending from MFS history (Number 5)
7. Compare each number to last month

This takes 10 minutes. The insight from doing it monthly for 6 months is worth more than reading 10 finance books.

## What to do when numbers look wrong

- **Net savings negative or zero:** Find the category that exceeded expectations and address it specifically, not globally.
- **Emergency fund not growing:** Something is pulling money out. Check if you are treating it as a general savings account.
- **Debt balance not declining:** Minimum payments only — restructure to pay extra on one account.
- **Savings products declining:** You have made an early withdrawal. Identify whether this was emergency or lifestyle, and address accordingly.
- **Lifestyle spending rising:** Review last month's MFS history. Identify the category that increased.

## Storing the numbers

A simple notes app, a Google Sheet, or even a paper notebook. Write the 5 numbers each month with the date. After 3 months, trends become visible. After 6 months, patterns are clear. After 12 months, you have a financial history that tells you more about your money than any app could.
  `,
  bdExample: `Tariq spent 6 months avoiding financial review because "looking at the numbers made him anxious." He started doing the 5-number check-in instead of a full review. Month 1: uncomfortable. Month 2: less so. Month 3: he noticed his lifestyle spending had increased by Tk 3,000 without any specific reason. He looked at his MFS history, found he had been ordering food 3x/week instead of cooking, cut to once a week, and recovered Tk 2,000/month. The 10-minute review found a problem he had been feeling but could not identify.`,
  actionPrompt: {
    text: "Do the 5-number check-in right now. Even if you don't know the exact figures, estimate. Write them down. Note the date. Do it again in 30 days.",
    ctaButtonText: "I did my monthly check-in",
  },
  quiz: [
    {
      question: "What does 'net savings this month' measure?",
      options: [
        "Your total bank account balance",
        "Total income received minus total outgoings — what was actually added to savings this month",
        "Interest earned on your savings account",
        "Your salary amount",
      ],
      correctIndex: 1,
      explanation: "Net savings = income - outgoings. It tells you whether you actually saved anything this month regardless of where the money went. A positive number is required for wealth building.",
    },
    {
      question: "The 'lifestyle spending percentage' in the 5-number check-in is most useful for detecting:",
      options: [
        "How much you spend on food specifically",
        "Whether lifestyle inflation is occurring — spending as a percentage of income trending upward",
        "Your savings rate",
        "Inflation in prices",
      ],
      correctIndex: 1,
      explanation: "Tracking lifestyle spending as a percentage of income over months reveals lifestyle inflation before it becomes a major problem. An absolute number rising with income may look stable — only the percentage reveals the trend.",
    },
    {
      question: "What is the minimum information storage required for the monthly check-in to provide useful trend data?",
      options: [
        "A professional accounting software subscription",
        "A dedicated financial tracking app with bank integration",
        "The 5 numbers written down with a date, in any format, every month",
        "Detailed categorization of every transaction",
      ],
      correctIndex: 2,
      explanation: "The minimum viable record is 5 numbers and a date, in any format. After 3 months, trends are visible. Complexity adds friction that leads to abandonment.",
    },
    {
      question: "Your emergency fund is covering 1.5 months of expenses. According to the 5-number framework, what should you prioritize?",
      options: [
        "Start investing in the stock market",
        "Open a DPS for long-term savings",
        "Top up the emergency fund to 3 months before any other savings priority",
        "Put money into Sanchaypatra for higher returns",
      ],
      correctIndex: 2,
      explanation: "Emergency fund completion comes before any other savings priority. At 1.5 months coverage, a single major unexpected expense would wipe it out. Reaching 3 months first provides the financial floor that makes all other savings stable.",
    },
    {
      question: "True or False: If all 5 numbers look good this month, you don't need to do the check-in next month.",
      options: [
        "True — no problems means no review needed",
        "False — the value of the check-in is trend detection over multiple months, which requires consistent monthly review",
      ],
      correctIndex: 1,
      explanation: "One good month tells you little. The check-in's value is in the trend — are numbers consistently good, improving, or slowly deteriorating? This requires monthly data over time, not just checking when something feels wrong.",
    },
  ],
  whatsNext: { nextModuleId: null, preview: "Zone 2 complete. You have a tracking system, a salary day protocol, a lifestyle inflation hedge, and a monthly review process. These are the fundamentals that most Bangladeshis never build." },
};
