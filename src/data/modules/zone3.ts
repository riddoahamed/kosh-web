import type { Module } from "@/types/curriculum";

export const moduleZ3_1: Module = {
  id: "z3-1",
  zoneId: "zone-3",
  title: "Good debt vs bad debt: the line most people miss",
  tagline: "Not all debt is the enemy. Some debt is a tool.",
  estimatedMinutes: 10,
  hook: `"Your chacha says all debt is haram. Your friend says his home loan was the smartest financial decision he made. Your credit card feels like freedom until it doesn't. Debt is probably the most misunderstood financial topic in Bangladesh — because the same instrument that destroys finances can also build them, depending entirely on how it is used."`,
  context: `Bangladesh has a complicated relationship with debt. Religious and cultural attitudes toward borrowing vary widely. At the same time, access to credit — both formal and informal — is expanding rapidly. Most young Bangladeshis navigate debt through intuition and peer advice rather than any framework. This module provides that framework.`,
  teaching: `
## The fundamental question about any debt

Before taking any loan, ask one question: **What is the return on this debt?**

Not "can I afford the monthly payment?" That is the wrong question. The right question is: does the thing I am buying with this money generate a return above the interest rate I am paying?

**Good debt:** The borrowed money creates something worth more than what it costs.
- Home loan at 10%: the property appreciates, or the rental equivalent would have cost more. Can be worth it.
- Education loan for a course that increases earning capacity: the income increase exceeds the loan cost. Potentially worth it.
- Business loan to buy equipment that generates revenue above the EMI: math works if projections hold.

**Bad debt:** The borrowed money funds consumption that returns nothing.
- Personal loan for a wedding that will be "how you want it" but is a one-day event. Costs years to repay.
- Credit card balance for a phone upgrade. You pay 22% interest on a depreciating asset.
- Loan to fund regular monthly expenses. You are structurally spending more than you earn.

## The Bangladesh-specific complications

**Family debt:** Borrowing from family is often interest-free, making it structurally "good debt." But it carries relationship risk. Delayed repayment strains relationships. Treat family loans with at least as much discipline as bank loans.

**Informal lenders (mahajans, NGO microfinance):** Rates are often high (24-36% effective annual). These are almost always bad debt for consumption. They may be acceptable for productive purposes with clear returns — but the math must be verified.

**DPS loans:** Some banks allow you to borrow against your DPS balance. This is one of the cheapest formal credit sources and can be useful for short-term genuine needs.

## The one-question test for any debt decision

"If I did not have access to this loan, would I delay this purchase until I could save for it?"

If yes: consider whether the urgency is real or manufactured by impatience.
If no (genuinely time-sensitive, productive, or emergency): the loan may be appropriate.

The answer most people give is "I would delay" — which means the debt is funding impatience, not genuine necessity.
  `,
  bdExample: `Nadia takes a Tk 2 lakh personal loan at 15% to attend a professional certification course that adds Tk 8,000/month to her salary. Annual EMI cost: approximately Tk 26,000. Annual income increase: Tk 96,000. Return on debt: clearly positive. She takes the loan. Her colleague Rahim takes the same loan to fund his sister's wedding reception. Annual EMI cost: Tk 26,000. Return on debt: zero (the event is over). He is paying for a party that happened 2 years ago. Same loan amount, completely different financial outcome.`,
  actionPrompt: {
    text: "List any loans you currently have or are considering. For each: what return does the borrowed money generate? Is the return above the interest rate?",
    ctaButtonText: "I evaluated my debt decisions",
  },
  quiz: [
    {
      question: "The fundamental question to ask before taking any debt is:",
      options: [
        "Can I afford the monthly EMI payment?",
        "Does the borrowed money generate a return above the interest rate?",
        "Is the interest rate below 15%?",
        "Has my employer approved of me taking this loan?",
      ],
      correctIndex: 1,
      explanation: "Affordability of EMI is the wrong primary question. The right question is whether the borrowed money creates value above its cost. A loan you can 'afford' but that funds consumption with zero return is still bad debt.",
    },
    {
      question: "Which of these is most likely to be 'good debt'?",
      options: [
        "A personal loan to fund a wedding reception",
        "Credit card balance for a phone upgrade",
        "An education loan for a course that demonstrably increases earning capacity",
        "A loan to cover regular monthly living expenses",
      ],
      correctIndex: 2,
      explanation: "An education loan that increases earning capacity creates a return above its cost — the income increase exceeds the interest paid. The others fund consumption or depreciating assets with zero financial return.",
    },
    {
      question: "What is the main risk of borrowing from family (interest-free) in Bangladesh?",
      options: [
        "It is illegal to borrow from family",
        "Family loans charge higher rates than banks",
        "Delayed repayment strains relationships — the relationship risk is the real cost",
        "Family loans do not appear in your CIB record",
      ],
      correctIndex: 2,
      explanation: "Interest-free family loans seem attractive but carry relationship risk. If repayment is delayed or missed, the financial transaction damages a personal relationship. Family loans should be treated with at least as much discipline as bank loans.",
    },
    {
      question: "True or False: If you could save for something by delaying the purchase, taking a loan to buy it now is usually justified.",
      options: [
        "True — credit is a tool to access things sooner",
        "False — if you could simply save for it, the loan is usually funding impatience rather than genuine necessity",
      ],
      correctIndex: 1,
      explanation: "The one-question test: if you could save and buy later, the urgency may be manufactured by impatience. Loans are justified for genuine time-sensitive needs, productive purposes, or emergencies — not for accelerating purchases you could fund with patience.",
    },
    {
      question: "DPS loans (borrowing against your own DPS balance) are considered one of the cheapest formal credit sources because:",
      options: [
        "The government subsidizes DPS loans",
        "You are essentially borrowing against your own savings, so the bank's risk is minimal and rates are lower",
        "DPS loans have a fixed rate below 5%",
        "Bangladesh Bank mandates low DPS loan rates",
      ],
      correctIndex: 1,
      explanation: "When you borrow against your own DPS, the bank's risk is minimal — your savings are the collateral. This allows rates close to the DPS interest rate itself. The net cost is the spread between loan rate and DPS rate, making it one of the cheapest formal borrowing options.",
    },
  ],
  whatsNext: {
    nextModuleId: "z3-2",
    preview: "The credit card is the most misused financial product in Bangladesh. Most people don't understand how the interest actually compounds.",
  },
};

export const moduleZ3_2: Module = {
  id: "z3-2",
  zoneId: "zone-3",
  title: "Credit card math: why minimum payment is a trap",
  tagline: "The most expensive money you'll ever borrow is sitting in your wallet.",
  estimatedMinutes: 10,
  hook: `"You have a Tk 40,000 credit card balance. The bank asks for Tk 1,200 minimum payment. You pay Tk 1,200. You feel like you are managing it. You are not. You just paid 3% of your balance and the bank will charge you interest on the remaining 97% — including on the part you paid, depending on how your bank calculates it. The minimum payment is designed to keep you paying forever."`,
  context: `Credit cards in Bangladesh are used by a growing number of young professionals. The interest rate structure on unpaid balances is among the highest of any formal financial product — typically 18-24% annually. Yet most cardholders do not understand exactly how this interest compounds. This module makes the math explicit.`,
  teaching: `
## How credit card interest works

When you pay your full statement balance by the due date, you pay zero interest. The bank effectively gives you a 45-55 day interest-free loan.

When you pay less than the full balance (even by Tk 1), several things happen:
1. You lose the grace period for future purchases
2. Interest accrues on the full average daily balance — not just what you did not pay
3. The interest compounds monthly

**The minimum payment trap:**
A Tk 40,000 balance at 22% APR with minimum payment of 3% (~Tk 1,200/month):
- After 12 months of minimum payments: you have paid approximately Tk 14,400 but still owe approximately Tk 37,000
- The balance barely moves because most of each payment is interest
- Total time to payoff making only minimum payments: 10+ years
- Total interest paid: exceeds the original balance

## How the monthly rate translates

Banks advertise monthly rates because they sound smaller: "1.75% per month" sounds reasonable. It is 21% per year (simple) or 23%+ effective annual rate with monthly compounding.

When comparing credit card rates to other options, always convert to annual: monthly rate × 12 = minimum annual rate.

## Cash advances: the worst feature

Cash advances (withdrawing cash from an ATM using your credit card) typically have:
- No grace period — interest starts on the day of withdrawal
- Higher APR than regular purchases (often 24-30%)
- Additional transaction fee (typically 2-3% of amount)

Cash advances should be avoided entirely. They are the most expensive money available from a formal source.

## The only good credit card strategy

Pay the full statement balance every month before the due date.

This means: you should never put anything on a credit card that you cannot pay off with your current bank balance. The card becomes a payment convenience and reward vehicle rather than a credit instrument.

If you cannot pay the full balance this month: stop using the card for new purchases until the balance is cleared. Every new purchase while carrying a balance generates immediate interest from day one.
  `,
  bdExample: `Rana has Tk 50,000 on his credit card at 22% APR. He pays the minimum every month (Tk 1,500). He calculates: at this rate he will make payments for 12+ years and pay Tk 70,000+ in interest — more than the original balance. He stops using the card, takes a bank personal loan at 15% to consolidate (lower rate, fixed payoff date), clears the credit card in 18 months, and saves approximately Tk 40,000 in interest. The personal loan's fixed structure forced him to actually pay down principal each month.`,
  actionPrompt: {
    text: "If you have a credit card: look at your current balance and the minimum payment. How long would it take to pay off making only minimum payments? Most banks show this on the statement.",
    ctaButtonText: "I checked my credit card math",
  },
  quiz: [
    {
      question: "You receive a credit card statement with a balance of Tk 40,000. You pay the minimum (Tk 1,200). Next month, interest is charged on approximately how much?",
      options: [
        "Tk 1,200 (what you paid)",
        "Tk 0 (you made a payment)",
        "Tk 38,800 (remaining balance)",
        "Tk 40,000 (the full original balance, because you did not pay in full)",
      ],
      correctIndex: 3,
      explanation: "When you carry a balance (do not pay in full), most banks in Bangladesh charge interest on the full average daily balance for the period, not just the remaining amount. The grace period is lost once you carry a balance.",
    },
    {
      question: "A bank advertises '1.75% monthly interest rate' on credit cards. What is the approximate effective annual rate?",
      options: ["1.75%", "17.5%", "21% (simple) to 23%+ (compound)", "7.5%"],
      correctIndex: 2,
      explanation: "1.75% × 12 = 21% simple annual rate. With monthly compounding, the effective annual rate is (1 + 0.0175)^12 - 1 ≈ 23.1%. Monthly rates are often advertised to make the cost appear smaller.",
    },
    {
      question: "What is the minimum payment on a credit card designed to do?",
      options: [
        "Help customers manage cash flow responsibly",
        "Maximize the time you spend paying interest, generating maximum revenue for the bank",
        "Match the typical monthly budget of cardholders",
        "Satisfy Bangladesh Bank regulations on minimum repayment",
      ],
      correctIndex: 1,
      explanation: "Minimum payment is set low enough that the bank continues earning maximum interest for as long as possible. It is not designed for your benefit. The only good minimum payment strategy is to pay the full balance.",
    },
    {
      question: "Under what condition is using a credit card financially beneficial for the cardholder?",
      options: [
        "When you use it for large purchases only",
        "When you pay the full statement balance every month before the due date",
        "When you use the emergency credit feature",
        "When your credit limit is high enough that minimum payments are small",
      ],
      correctIndex: 1,
      explanation: "Paying the full balance every month means zero interest paid. You get the 45-55 day float, reward points, and purchase protection. The moment you carry a balance, the cost structure inverts and the bank benefits at your expense.",
    },
    {
      question: "True or False: Cash advances on a credit card usually have the same interest terms as regular purchases.",
      options: [
        "True — the same grace period and APR applies",
        "False — cash advances usually have no grace period, a higher rate, and immediate interest charges",
      ],
      correctIndex: 1,
      explanation: "Cash advances are the most expensive credit card feature. They typically have: no grace period (interest starts immediately), a higher APR than purchases, and additional transaction fees. They should be avoided entirely.",
    },
  ],
  whatsNext: {
    nextModuleId: "z3-3",
    preview: "Your chacha borrowed from a mahajan. You borrow from an app. The interface changed. The math didn't.",
  },
};

export const moduleZ3_3: Module = {
  id: "z3-3",
  zoneId: "zone-3",
  title: "bKash credit, salary loans, BNPL: the new debt landscape",
  tagline: "The digital skin on old-fashioned debt math.",
  estimatedMinutes: 9,
  hook: `"Your chacha borrowed from a mahajan at 5% per month when he needed cash quickly. You can borrow from a bKash menu in 30 seconds. The interface changed completely. The underlying math did not. The dress looks different. The cost structure is recognizable."`,
  context: `Bangladesh's digital lending landscape expanded significantly since 2020. MFS providers (bKash, Nagad), bank apps, and BNPL platforms now offer credit with minimal friction. Speed and convenience are real improvements over the old informal lending system. But the interest rate burden on high-risk, short-term digital loans is often comparable to or worse than bank rates — just hidden behind smooth UI.`,
  teaching: `
## bKash and Nagad credit products

Both major MFS providers in Bangladesh now offer some form of credit. These products are typically small loans (Tk 1,000 to Tk 20,000) for short durations (30-90 days). The rate structures are not always clearly displayed in the main user interface.

Before using any MFS credit product, find the actual annual rate. A fee of 1.5% per month is 18% annually. A fee of 3% per 30 days is 36% annually. Check the product's terms and conditions in the app, or call the provider.

MFS credit is appropriate for: genuine short-term cash flow gaps where you are certain of repayment within the stated term and you have verified the actual cost. It is not appropriate for: covering regular expenses, funding consumption you cannot afford, or bridging a recurring income shortfall.

## Bank personal loans

Banks offer personal loans typically from Tk 50,000 to several lakh. Terms range from 1 to 5 years. Interest rates in Bangladesh for personal loans are typically 12-18% (check current rates). The bank evaluates your salary, employment stability, and credit history before approving.

Key points:
- **Processing fees** — typically 1-2% of the loan amount, charged upfront. This increases your effective interest rate.
- **Early repayment fees** — some banks charge a fee if you repay the loan before the agreed term. Check this before taking the loan if you might prepay.
- **Insurance requirements** — some banks require you to take life insurance alongside the loan. This adds to the effective cost.

Always ask for the total cost of the loan in taka — total amount repaid minus amount borrowed — before agreeing.

## Salary loans and employer advances

Some employers and MFIs offer salary advances — early access to earned but unpaid salary. These are usually zero interest and are essentially prepayments of your own money. They are not debt in the traditional sense.

However, systematic use of salary advances means you are permanently 2-4 weeks behind on your own finances. If you receive your salary advance every month, you are effectively earning one month less per year because you are always spending money you have not yet received. This makes savings impossible.

## BNPL (Buy Now Pay Later) apps

Several BNPL platforms have entered Bangladesh in recent years. The typical model: you buy something, the platform pays the merchant, and you repay in 3-6 monthly installments. The "0% interest" offers that some platforms advertise often include merchant fees, late fees, and in some cases deferred interest.

Rules for BNPL: use it only for planned purchases you would have made anyway, ensure you have the full amount in savings before using, and never use BNPL for impulse purchases.

## The universal test for digital lending

No matter how easy the interface, no matter how small the transaction, apply the same test as any other debt:
1. What is the annual interest rate?
2. Is this debt for something with a return above this rate?
3. If the return does not materialize, can you service this from income?
  `,
  bdExample: `Mila needs Tk 8,000 for a medical expense two weeks before her salary. She has two options: bKash credit at what looks like a "small fee" (actually 2.5% per month = 30% annually), or ask her mother to lend from family savings. She chooses bKash because she doesn't want to ask family. She repays on salary day. Total cost: Tk 200 in fees. For a one-time genuine emergency with guaranteed short-term repayment, this was acceptable. If she uses bKash credit every month for expenses, the Tk 200/month becomes Tk 2,400/year — her salary increase gone to interest.`,
  actionPrompt: {
    text: "If you have used bKash credit, a bank app loan, or BNPL in the last year, find the actual annual interest rate for that product. Was it worth the cost?",
    ctaButtonText: "I found the actual rate",
  },
  quiz: [
    {
      question: "A bKash credit product charges 2% for 30 days. What is the approximate annual rate?",
      options: ["2%", "24%", "12%", "4%"],
      correctIndex: 1,
      explanation: "2% per month × 12 = 24% annually (simple). With compounding, the effective rate is higher. This is comparable to some credit card rates and significantly higher than bank personal loan rates.",
    },
    {
      question: "What is the main hidden cost risk of 'Buy Now Pay Later' products in Bangladesh?",
      options: [
        "They require a high credit score",
        "Late fees or deferred interest that applies retroactively if you miss any payment",
        "They are only available for purchases above Tk 50,000",
        "Banks report BNPL usage to reduce your loan eligibility",
      ],
      correctIndex: 1,
      explanation: "Many BNPL products advertise '0% interest' but include late fees that can be substantial, and some have deferred interest clauses where full interest charges retroactively apply if any payment is missed. Read the full terms before using.",
    },
    {
      question: "Reza takes an employer salary advance every month to cover expenses. What is the financial consequence over a full year?",
      options: [
        "No consequence — it is his own money",
        "He effectively earns one less month of income per year because he is always spending ahead of earnings, making saving impossible",
        "His bank account earns interest on the advance",
        "He builds credit history with his employer",
      ],
      correctIndex: 1,
      explanation: "Systematic salary advances mean you are perpetually two weeks ahead of your income. You never have a full month of earnings to budget with — one month of the year is already spent before it arrives. This prevents emergency fund building entirely.",
    },
    {
      question: "Which question is most important before taking any digital loan?",
      options: [
        "How good is the app interface?",
        "Has a friend used it?",
        "What is the actual annual interest rate including all fees?",
        "How quickly will the money arrive?",
      ],
      correctIndex: 2,
      explanation: "Interface quality and speed are irrelevant to whether a loan is a good decision. The annual cost, the purpose of the debt, and your ability to service it are the only factors that matter.",
    },
    {
      question: "Bank personal loans in Bangladesh typically require which of the following before approval?",
      options: [
        "No documentation — completely automated",
        "Salary information, employment verification, and sometimes credit history",
        "Collateral equal to the loan amount",
        "Minimum salary of Tk 1 lakh",
      ],
      correctIndex: 1,
      explanation: "Banks evaluate salary level, employment stability, and sometimes credit history (CIB) before approving personal loans. They set their own minimum salary thresholds, typically Tk 20,000-30,000 for most products.",
    },
  ],
  whatsNext: {
    nextModuleId: "z3-4",
    preview: "Most debt spirals do not start with one large bad decision. They start with a sensible-seeming first loan and then a second one to cover the first.",
  },
};

export const moduleZ3_4: Module = {
  id: "z3-4",
  zoneId: "zone-3",
  title: "The debt spiral: how it starts and how to stop it",
  tagline: "Understanding the trap that catches smart people.",
  estimatedMinutes: 11,
  hook: `"Most debt spirals do not start with a reckless decision. They start with a reasonable one — a loan for a genuine need. Then a second loan to cover a gap the first loan created. Then minimum payments on both while a third need arises. The math makes the spiral almost mechanical once it starts. But understanding it lets you see the signs early — and stop it before it compounds."`,
  context: `Debt spirals are common across all income levels in Bangladesh. The pattern is not unique to low earners — salaried professionals earning Tk 60,000-80,000/month frequently find themselves servicing 3-4 loans simultaneously, with a significant portion of income consumed by interest before basic expenses. The spiral is a mechanical outcome of compounding and insufficient income margin — not primarily a character failing.`,
  teaching: `
## How a debt spiral forms — the mechanics

**Stage 1:** A genuine need arises — medical expense, family obligation, unexpected cost. You take a loan that seems manageable.

**Stage 2:** The loan payment reduces your monthly cash flow. You have less buffer for the next unexpected event.

**Stage 3:** Another expense arises. You take a second, smaller loan to cover it — or you start paying only minimum on loan 1.

**Stage 4:** Now you are paying interest on interest on the first loan, plus full interest on the second. Monthly cash flow is further reduced.

**Stage 5:** The pattern repeats. Each new loan is for a smaller amount but at a higher effective cost because you are now a higher-risk borrower. You start borrowing from informal sources.

At this stage, a significant portion of income goes to debt service — often 30-50% — before food, rent, or family obligations. Saving becomes mathematically impossible.

## The two debt payoff strategies

**Snowball method:** Pay minimum on all debts. Put all extra money toward the smallest debt balance first. When the smallest is cleared, roll that payment into the next smallest. Psychological wins from clearing accounts create momentum.

**Avalanche method:** Pay minimum on all debts. Put all extra money toward the highest interest rate debt first. Mathematically optimal — you pay less total interest. Slower emotional wins.

Research on behavior in debt repayment suggests the snowball method leads to higher completion rates for most people, despite being mathematically suboptimal. Use the method you will actually follow, not the technically optimal one.

## How to recognize you are in a spiral

Warning signs:
- More than 30-35% of monthly income goes to debt service (EMI + minimum payments)
- You are borrowing to cover regular monthly expenses, not one-time emergencies
- You have taken a new loan within 3 months of taking the previous one
- You know the exact minimum payment dates for 3 or more accounts
- You feel anxious when you see your bank balance mid-month

## Breaking the spiral

**Step 1 — Stop adding debt.** No new borrowing until existing debt is addressed. This is the hardest step psychologically because new debt feels like relief.

**Step 2 — List all debts.** Amount, interest rate, minimum payment, term remaining for each.

**Step 3 — Calculate actual debt service ratio.** Total monthly debt payments ÷ monthly take-home income. If above 35%, you have a structural problem.

**Step 4 — Choose snowball or avalanche.** Commit to one method. Automate minimum payments on all accounts to avoid missed payment penalties.

**Step 5 — Address the root cause.** Most debt spirals have an underlying cause — insufficient emergency fund, income-expense mismatch, or a specific large expense. Addressing this prevents re-entry after payoff.

**Step 6 — Speak honestly with family if needed.** In Bangladesh, family often provides interest-free support during genuine financial difficulty. A difficult conversation early is better than a financial crisis later.
  `,
  bdExample: `Farhan earns Tk 55,000. He has a personal loan (Tk 8,000/month EMI), a credit card minimum (Tk 2,500/month), and a bKash credit repayment (Tk 1,500/month). Total debt service: Tk 12,000/month = 22% of income. He lists all three debts: credit card is Tk 35,000 at 22% APR, personal loan balance Tk 1.2 lakh at 15%, bKash Tk 15,000 at 24%. He attacks the credit card first (snowball — smallest balance, also highest rate). Once cleared in 4 months, he redirects Tk 2,500 + the freed cash to the bKash balance. The debt service ratio drops as each account closes.`,
  actionPrompt: {
    text: "List every debt you currently have. Calculate your total monthly debt service as a percentage of your take-home income. Is it below 30%? Between 30-50%? Above 50%?",
    ctaButtonText: "I calculated my debt service ratio",
  },
  quiz: [
    {
      question: "What is the debt service ratio, and what threshold suggests a structural problem?",
      options: [
        "Total savings ÷ monthly income. Above 50% is a problem.",
        "Total monthly debt payments ÷ monthly take-home income. Above 35% suggests a structural problem.",
        "Total debt balance ÷ annual salary. Above 2x is problematic.",
        "Monthly loan EMI ÷ monthly salary. Above 10% is dangerous.",
      ],
      correctIndex: 1,
      explanation: "The debt service ratio is total monthly debt payments divided by take-home income. Above 35% means more than a third of income is going to debt service before food, rent, and necessities — a structural problem requiring either income increase or debt restructuring.",
    },
    {
      question: "The avalanche debt payoff method prioritizes:",
      options: [
        "The smallest balance first for psychological wins",
        "The highest interest rate first to minimize total interest paid",
        "The most recent debt first",
        "Family debts before institutional debts",
      ],
      correctIndex: 1,
      explanation: "Avalanche = highest interest rate first. This minimizes total interest paid over the payoff period. It is mathematically optimal but produces fewer quick wins than the snowball method.",
    },
    {
      question: "Research on debt repayment behavior suggests:",
      options: [
        "The avalanche method leads to higher completion rates",
        "The snowball method (smallest balance first) leads to higher completion rates due to psychological wins from clearing accounts",
        "Both methods have identical completion rates",
        "Automatic payment systems eliminate the difference",
      ],
      correctIndex: 1,
      explanation: "The snowball method produces quicker wins — clearing an account creates motivation. Research suggests this leads to higher completion rates even though the avalanche method minimizes total interest. Use the method you will actually stick with.",
    },
    {
      question: "Which is the first and most critical step in breaking a debt spiral?",
      options: [
        "Take a consolidation loan to combine all debts",
        "Contact a credit counselor immediately",
        "Stop adding new debt, even if new borrowing feels like temporary relief",
        "Close all credit card accounts",
      ],
      correctIndex: 2,
      explanation: "Adding new debt while trying to clear existing debt perpetuates the spiral. Every new loan — even well-intentioned — increases the total debt load and the monthly service burden. The spiral cannot be exited without stopping new debt first.",
    },
    {
      question: "True or False: Debt spirals primarily happen to people who make poor financial decisions.",
      options: [
        "True — debt spirals are the result of irresponsible spending",
        "False — they often start with a reasonable response to a genuine need and become mechanical through compounding",
      ],
      correctIndex: 1,
      explanation: "Debt spirals frequently begin with sensible decisions — a medical emergency, a family obligation, an income disruption. The spiral becomes mechanical through compounding and reduced cash flow margins. Framing them as purely behaviorally caused prevents people from seeking help.",
    },
    {
      question: "If someone is in a debt spiral in Bangladesh, which step is often avoided due to social stigma but is frequently effective?",
      options: [
        "Hiring a financial advisor",
        "Applying for debt consolidation at a bank",
        "Speaking honestly with family about the situation",
        "Closing all bank accounts",
      ],
      correctIndex: 2,
      explanation: "In Bangladesh, family often provides interest-free financial support during genuine difficulty. The social stigma around admitting debt prevents many from having this conversation until the situation has compounded significantly. An early honest conversation often prevents a financial crisis.",
    },
  ],
  whatsNext: {
    nextModuleId: "z3-5",
    preview: "Bangladesh has a credit bureau. Most people have never checked their record. Here's why it matters before you ever need a loan.",
  },
};

export const moduleZ3_5: Module = {
  id: "z3-5",
  zoneId: "zone-3",
  title: "Your credit record: what Bangladesh's CIB knows about you",
  tagline: "Every loan you've taken is on file. Here's how to use that to your advantage.",
  estimatedMinutes: 9,
  hook: `"Bangladesh Bank maintains a database of every loan you have taken from any regulated institution — the Credit Information Bureau. Every bank checks it before approving your loan application. And most young Bangladeshis have never looked at their own record. Knowing what's in it, how it works, and how to build a positive record puts you ahead of most borrowers in the country."`,
  context: `The Credit Information Bureau (CIB) under Bangladesh Bank is the centralized credit database for the country. When you apply for any bank loan — personal, home, business, or credit card — the bank queries CIB before making a decision. A clean, positive CIB record makes borrowing cheaper and easier. A negative record can result in rejection even from banks you have never dealt with.`,
  teaching: `
## What the CIB contains

CIB records include: all loans taken from scheduled banks, non-bank financial institutions (NBFIs), and microfinance institutions (MFIs) — including the loan amount, outstanding balance, repayment history, and any defaults or classified status.

When you apply for a loan, the bank checks whether you have existing loans, whether you have any classified loans (overdue or defaulted), and your total credit exposure relative to your income.

CIB does not currently record: informal loans, MFS credit products, or credit cards in the same way as traditional loans in all cases (coverage is expanding). But all formal bank loans are recorded.

## Loan classification in Bangladesh

Bangladesh Bank classifies loans into categories that banks must report:
- **Standard:** Current, paid on time.
- **Special Mention Account (SMA):** 1-90 days overdue.
- **Substandard:** 90-180 days overdue.
- **Doubtful:** 180-360 days overdue.
- **Bad/Loss:** More than 360 days overdue.

Any classification below Standard creates a negative CIB record. Substandard and below can result in immediate rejection from most banks. These classifications remain on record even after the debt is paid.

## How to build a positive CIB record

Counterintuitively, having no loan history is not optimal. Banks prefer applicants with a track record of borrowing and repaying — because it demonstrates you are a low-risk borrower.

Practical ways to build credit history in Bangladesh:
1. **Take a small FDR-backed loan.** Deposit Tk 50,000 in an FDR, then take a loan against it (banks typically offer 80-90% of FDR value at slightly above FDR rate). Repay on schedule. This creates a clean repayment record at minimal net interest cost.
2. **Use a credit card and pay in full monthly.** Establishes responsible credit use without interest cost.
3. **Maintain any existing loans flawlessly.** No missed EMI payments, ever.

## How to check your own CIB record

You can request a CIB report from Bangladesh Bank or through your bank. The process requires a formal application with NID and fee payment. This is worth doing once before applying for any significant loan, to ensure there are no errors or unexpected entries in your record.

## What ruins your CIB record

- Any loan payment more than 90 days overdue
- Guaranteeing someone else's loan that defaults (if you are a guarantor on a defaulted loan, this appears on your record)
- Having a loan account in any bank that becomes classified

The guarantor risk is underappreciated. Many young Bangladeshis have co-signed loans for relatives as a favor. If that relative defaults, the guarantor's CIB record is affected. Before agreeing to guarantee any loan, understand that you are assuming full liability for that debt.
  `,
  bdExample: `Imran wants a home loan from a bank in 5 years. He is 28 with no loan history. His banker tells him: "You have no CIB record, which makes you an unknown risk." Imran takes a planned approach: he deposits Tk 30,000 in an FDR and takes a Tk 25,000 loan against it. He repays in 12 equal installments. Total interest cost: approximately Tk 2,500. Total benefit: a clean CIB repayment record. When he applies for his home loan 5 years later, his record shows responsible credit use — and he gets a better rate.`,
  actionPrompt: {
    text: "Do you know your current CIB status? Have you ever guaranteed someone else's loan? If yes to the second question, do you know the current status of that loan?",
    ctaButtonText: "I reviewed my credit exposure",
  },
  quiz: [
    {
      question: "What does the Credit Information Bureau (CIB) record?",
      options: [
        "Only defaulted loans",
        "All loans from scheduled banks and regulated financial institutions, including repayment history and classification status",
        "Only loans above Tk 5 lakh",
        "Only credit card balances",
      ],
      correctIndex: 1,
      explanation: "CIB records all loans from scheduled banks and regulated institutions — amounts, outstanding balances, repayment history, and loan classification status. It is a comprehensive credit database, not just a list of defaults.",
    },
    {
      question: "A loan is classified as 'Substandard.' This means:",
      options: [
        "The loan is for a substandard purpose",
        "The borrower has been overdue on repayments for 90-180 days",
        "The bank does not accept the collateral",
        "The interest rate is below market rate",
      ],
      correctIndex: 1,
      explanation: "Bangladesh Bank's loan classification system: Standard (current), SMA (1-90 days overdue), Substandard (90-180 days overdue), Doubtful (180-360 days), Bad/Loss (360+ days). Substandard and below creates serious negative CIB record.",
    },
    {
      question: "You agree to be a loan guarantor for your cousin. Your cousin defaults. What happens to you?",
      options: [
        "Nothing — you are only a guarantor, not the borrower",
        "Your CIB record is affected because as guarantor you assumed full liability for that debt",
        "The bank contacts you but cannot affect your credit record",
        "You owe 50% of the outstanding amount",
      ],
      correctIndex: 1,
      explanation: "A guarantor assumes full liability for the loan. If the primary borrower defaults, the bank can pursue the guarantor for the full amount, and the default appears in the guarantor's CIB record. Never guarantee a loan without understanding this risk.",
    },
    {
      question: "Which approach builds a positive CIB record at minimal real cost?",
      options: [
        "Taking the largest loan possible and repaying slowly",
        "Taking an FDR-backed loan (borrowing against your own deposit) and repaying on schedule",
        "Avoiding all borrowing — no history is better than any risk",
        "Co-signing a family member's loan",
      ],
      correctIndex: 1,
      explanation: "FDR-backed loans are the safest way to build credit history. You borrow against your own deposit, the net interest cost is minimal (the difference between the loan rate and FDR rate), and repayment creates a clean track record.",
    },
    {
      question: "True or False: Having no loan history at all is the optimal CIB status for getting a new bank loan.",
      options: [
        "True — no history means no risk",
        "False — banks prefer borrowers with a positive repayment track record, as it reduces uncertainty about credit behavior",
      ],
      correctIndex: 1,
      explanation: "No credit history is 'unknown risk' to a bank. They prefer applicants who have previously borrowed and repaid responsibly — it demonstrates low-risk credit behavior. Building a clean CIB record intentionally before you need a major loan gives you a significant advantage.",
    },
  ],
  whatsNext: {
    nextModuleId: null,
    preview: "Zone 3 complete. You now understand the full debt landscape — how it works, what it costs, how spirals form, and how to build the credit record that makes future borrowing easier and cheaper.",
  },
};
