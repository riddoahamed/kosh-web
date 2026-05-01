import type { Module } from "@/types/curriculum";

// ─────────────────────────────────────────────────────────────
// ZONE 8 — ADVANCED INVESTING
// Mutual funds, portfolio construction, real estate thinking
// 5 modules. Advanced difficulty tier.
// ─────────────────────────────────────────────────────────────

export const z8Game1 = {
  type: "allocation" as const,
  title: "Build Your Portfolio: Tk 1 Lakh to Allocate",
  instructions:
    "You have Tk 1 lakh to invest with a 7-year horizon. Allocate it across 4 asset types. Each tap on + adds Tk 5,000 to that category. The total must equal exactly Tk 1 lakh.",
  categories: [
    {
      id: "equity",
      label: "Stocks (DSE equities)",
      description: "Higher return potential, higher volatility",
      suggestedRange: "30-50%",
    },
    {
      id: "sanchaypatra",
      label: "Sanchaypatra",
      description: "Safe, 10-11% return, 3-5 year lock-in",
      suggestedRange: "20-40%",
    },
    {
      id: "mutual_fund",
      label: "Mutual fund (open-end)",
      description: "Diversified equity exposure, professionally managed",
      suggestedRange: "10-20%",
    },
    {
      id: "liquid",
      label: "Savings account / short FDR",
      description: "Liquid reserve for opportunities and emergencies",
      suggestedRange: "10-20%",
    },
  ],
  revealAllocation: {
    conservative: { equity: 20, sanchaypatra: 50, mutual_fund: 10, liquid: 20 },
    moderate: { equity: 40, sanchaypatra: 30, mutual_fund: 20, liquid: 10 },
    growth: { equity: 55, sanchaypatra: 20, mutual_fund: 15, liquid: 10 },
  },
  explanation:
    "There is no single correct allocation — it depends on your risk capacity, income stability, and goals. Compare yours to the three example profiles above. Notice that a 7-year horizon allows meaningfully more equity than a 2-year horizon would.",
  mangoReward: 40,
};

export const z8Game2 = {
  type: "scenario_verdict" as const,
  title: "Open-end or Closed-end? Match the Situation",
  instructions:
    "Each investor situation is described. Tap 'Open-end' or 'Closed-end' to match the best mutual fund structure for that investor. Note: BSEC is phasing out closed-end funds — this is about understanding the difference.",
  items: [
    {
      scenario:
        "An investor wants to be able to exit their mutual fund investment at any time at fair value, without waiting for a fixed term to end.",
      correct: "open_end",
      explanation:
        "Open-end mutual funds allow investors to buy and sell directly with the fund manager at NAV at any time. There is no fixed term. Liquidity is the defining advantage of open-end funds.",
    },
    {
      scenario:
        "An investor does not need liquidity for 10 years and is comfortable with a fixed investment period where they cannot access their money.",
      correct: "closed_end",
      explanation:
        "Closed-end funds have a fixed investment period and are listed on the stock exchange. In theory, this suits patient investors who don't need liquidity. In practice, Bangladesh's closed-end funds have largely traded far below NAV — illustrating why BSEC is phasing them out.",
    },
    {
      scenario:
        "An investor wants to invest a fixed amount monthly over 3 years, then withdraw to fund a specific goal.",
      correct: "open_end",
      explanation:
        "Regular investment and goal-based withdrawal suits open-end funds because of their flexibility. You can invest and withdraw at NAV without waiting for a fixed term.",
    },
  ],
  mangoReward: 30,
};

// ─── MODULE Z8-1 ─────────────────────────────────────────────
export const moduleZ8_1: Module = {
  id: "z8-1",
  zoneId: "zone-8",
  title: "Mutual funds: what they are, what they're not, and what went wrong in Bangladesh",
  tagline: "Professional management, diversification, and a complicated history.",
  estimatedMinutes: 12,

  hook: `"Mutual funds are supposed to solve the two biggest problems individual investors face: they lack diversification (hard to buy 50 stocks with small savings) and they lack time to research stocks properly. Professional fund managers do both, for a fee. The idea is sound. The execution in Bangladesh has been troubled enough that understanding both the concept and the country-specific reality is essential."`,

  context: `Globally, mutual funds are one of the most successful financial innovations — enabling millions of small investors to access professionally managed, diversified portfolios. In Bangladesh, the industry has underperformed significantly, primarily due to structural problems with closed-end funds and governance failures at several fund managers. BSEC is currently reforming the sector. Understanding the global concept and the local reality separately helps you evaluate what has changed and what remains to be cautious about.`,

  teaching: `
## What a mutual fund is

A mutual fund pools money from many investors and invests it across a portfolio of assets (stocks, bonds, or a mix). Each investor owns 'units' of the fund, proportional to their investment. The fund's value — its Net Asset Value (NAV) — is calculated daily based on the total value of assets divided by total units outstanding.

Mutual funds offer:
- **Diversification** — your money is spread across many assets, not concentrated in one
- **Professional management** — a fund manager makes buy/sell decisions
- **Accessibility** — you can invest with relatively small amounts
- **Liquidity** (for open-end funds) — you can exit at any time at NAV

## Open-end vs closed-end

**Open-end funds:** No fixed tenure. No stock exchange listing. Investors buy and sell units directly from the fund manager at daily NAV. This is the global standard and what BSEC now mandates for new funds.

**Closed-end funds:** Fixed tenure (typically 10 years). Listed on the stock exchange. Market price fluctuates based on supply and demand — and can diverge significantly from NAV. Bangladesh has approximately 37 closed-end funds listed on the DSE. BSEC is phasing out this structure.

The closed-end fund problem in Bangladesh: these funds have traded at an average 70% discount to their stated NAV. This means if a fund's portfolio is worth Tk 100, the market price is around Tk 30. This reflects the market's collective distrust of stated asset values and fund management quality. Multiple fund managers have faced allegations of misreporting, insider dealing, and in some cases outright fraud.

## Key metrics for evaluating mutual funds

**Expense ratio** — the annual management fee as a percentage of assets. Lower is better. A fund charging 2.5% annually starts with a significant performance handicap compared to one charging 1%.

**NAV history** — how has the fund's value changed over time? Compare to the DSEX benchmark to understand whether the fund is adding value above what a simple market index would provide.

**Fund manager track record** — who manages the fund? What is their history with this and previous funds?

**Dividend consistency** — has the fund paid regular dividends? Consistent dividend payment is a signal of genuine profitability rather than paper returns.

## The ongoing BSEC reform

BSEC's 2025 draft regulations propose no new closed-end funds and mandate conversion of existing ones to open-end structure at maturity. This moves Bangladesh toward the global standard. For investors, this means:
- Closed-end funds at steep discounts may see value recovery as they convert
- Open-end fund quality is improving under new regulatory scrutiny
- The mutual fund sector is genuinely worth re-evaluating in 2025-2026 compared to its reputation from 2015-2022
  `,

  bdExample: `ICB Asset Management Company (a government subsidiary) manages 10 mutual funds in Bangladesh. Of these, 8 have historically failed to pay dividends despite holding significant assets. In contrast, a well-managed open-end fund like those operated by certain private AMCs have delivered more consistent NAV growth and regular dividend payments. The distinction: governance and manager quality matters enormously in Bangladesh's mutual fund sector — the fund structure (open vs closed) is only part of the story.`,

  actionPrompt: {
    text: "Look up the NAV of any two mutual funds on the DSE website or BSEC. Compare their NAV today to 3 years ago. Which has performed better? Can you find their expense ratios?",
    ctaButtonText: "I compared two mutual fund NAVs",
  },

  game: z8Game2,

  quiz: [
    {
      question: "What is NAV (Net Asset Value) and why does it matter for mutual fund investors?",
      options: [
        "NAV is the stock exchange price of the fund unit",
        "NAV is the total value of the fund's assets minus liabilities, divided by units outstanding — the actual fair value of each unit",
        "NAV is the fund manager's fee structure",
        "NAV is the minimum investment required",
      ],
      correctIndex: 1,
      explanation:
        "NAV represents the true economic value of each fund unit based on the underlying portfolio. In open-end funds, you buy and sell at NAV. In closed-end funds, the market price can diverge widely from NAV — which has been a major problem in Bangladesh where closed-end funds trade at 70%+ discounts to stated NAV.",
    },
    {
      question: "Why have Bangladesh's closed-end mutual funds traded at steep discounts to their NAV?",
      options: [
        "Closed-end funds globally always trade at discounts",
        "The discount reflects market distrust of stated asset values, governance failures, and a history of poor fund management in Bangladesh",
        "BSEC regulations require closed-end funds to trade below NAV",
        "Discounts occur because closed-end funds invest in low-quality assets",
      ],
      correctIndex: 1,
      explanation:
        "The extreme discounts (often 70%+) reflect a genuine loss of investor confidence. Multiple fund managers have faced allegations of misreporting and misuse of funds. The discount is the market collectively saying it does not trust the stated NAV.",
    },
    {
      question: "What is the main advantage of open-end mutual funds over closed-end funds?",
      options: [
        "Open-end funds have higher return potential",
        "Open-end funds are government-guaranteed",
        "Open-end funds allow investors to buy and sell at fair NAV at any time, without being stuck at a steep market discount",
        "Open-end funds have lower management fees",
      ],
      correctIndex: 2,
      explanation:
        "Liquidity at fair value is the defining advantage. You always transact at NAV — you are never forced to sell at a 70% discount to what your portfolio is actually worth, as closed-end investors often are.",
    },
    {
      question: "An expense ratio of 2.5% annually means:",
      options: [
        "The fund gains 2.5% per year",
        "2.5% of your investment is deducted each year as management fees before calculating returns to investors",
        "The fund charges 2.5% commission on each transaction",
        "2.5% of the fund's gains are distributed as dividends",
      ],
      correctIndex: 1,
      explanation:
        "A 2.5% expense ratio means you pay Tk 2,500 per year for every Tk 1 lakh invested, regardless of performance. Over 10 years, this compounds significantly. Expense ratios are a direct drag on returns — lower is always better, all else equal.",
    },
    {
      question: "True or False: The BSEC regulation changes of 2025 mean Bangladesh's mutual fund sector can now be evaluated fresh, separate from its previous poor reputation.",
      options: [
        "True — new regulations mandating open-end structure and improved governance create a genuinely different environment",
        "False — regulatory changes do not improve underlying fund quality",
      ],
      correctIndex: 0,
      explanation:
        "The phasing out of closed-end funds, improved regulatory oversight, and new governance standards create a meaningfully different regulatory environment from 2015-2022. The sector still requires careful due diligence, but blanket avoidance based on the old reputation may cause investors to miss genuinely improved options.",
    },
  ],

  whatsNext: {
    nextModuleId: "z8-2",
    preview: "Mutual funds understood. Now: how to put stocks, funds, and savings products together into a coherent portfolio.",
  },
};

// ─── MODULE Z8-2 ─────────────────────────────────────────────
export const moduleZ8_2: Module = {
  id: "z8-2",
  zoneId: "zone-8",
  title: "Portfolio construction: putting the pieces together",
  tagline: "How different assets combine — and why the combination matters more than individual picks.",
  estimatedMinutes: 12,

  hook: `"Harry Markowitz won the Nobel Prize for showing mathematically that combining assets intelligently reduces risk without proportionally reducing return. This is the only free lunch in finance. Two assets that independently seem risky can, when combined in the right proportion, produce a portfolio that is less risky than either alone. Understanding this changes how you think about building a collection of investments."`,

  context: `Most beginning investors think about investments one at a time: "Is this stock a good buy?" Portfolio construction asks a different question: "How do these investments work together?" The relationship between assets — specifically, whether they tend to move in the same or different directions — determines how much risk you are actually taking, often independently of the individual assets' risk.`,

  teaching: `
## Correlation: the concept that makes diversification work

Two assets are correlated if they tend to move together. Two assets are uncorrelated (or negatively correlated) if they tend to move independently or in opposite directions.

- Stocks and stocks in the same sector: highly correlated. When one pharma stock falls, others usually follow.
- Stocks and government bonds: often negatively correlated. When stocks fall sharply, government bonds often rise as investors flee to safety.
- Stocks and gold: low correlation in normal periods, sometimes negative correlation in crisis periods.
- DSE stocks and Sanchaypatra: very low correlation — the stock market crash does not affect your Sanchaypatra return.

**The portfolio benefit:** Combining low-correlation assets reduces the volatility of the combined portfolio below the average volatility of its components. This means you can achieve a given expected return with less risk — or a higher return for the same risk — purely through thoughtful combination.

## Risk types in a portfolio

**Systematic risk (market risk):** Risk that affects all investments broadly — economic recession, currency depreciation, inflation shock, global crisis. This cannot be eliminated through diversification within one market. This is why even perfectly diversified DSE portfolios suffered in 2010 and during COVID.

**Unsystematic risk (company-specific risk):** Risk specific to one company — management failure, accounting fraud, sector disruption. This can be largely eliminated through diversification across enough stocks and sectors.

Diversification eliminates unsystematic risk. It does not protect against systematic risk. In practice, for Bangladesh investors, holding some international exposure (gold as a dollar-denominated asset, for example) provides partial systematic risk protection.

## A practical portfolio framework for young Bangladeshi investors

This is not a recommendation — it is an example of how the pieces connect:

**Foundation layer (safe, liquid):** Emergency fund in savings account. Non-negotiable. Size: 3-6 months expenses.

**Stability layer (medium-term, returns above inflation):** Sanchaypatra and/or DPS. Target allocation: 30-40% of long-term savings.

**Growth layer (long-term, equity):** Diversified across 8-12 A-category DSE stocks in different sectors, and/or open-end mutual funds. Target allocation: 30-50% of long-term savings.

**Hedge layer (inflation and currency protection):** Small gold allocation. Target allocation: 5-10% of long-term savings.

The specific percentages shift with: age (younger = more growth layer), income stability (variable income = larger stability layer), and financial goals (specific near-term goals = temporary increase in stability layer).

## Rebalancing

Over time, the growth layer will outperform (in good years) or underperform (in bad years), causing the actual allocation to drift from the intended allocation. Rebalancing means periodically returning to your target allocation — selling what has grown above target and buying what has fallen below.

Annual rebalancing for most investors is sufficient. Quarterly is appropriate for larger portfolios. Rebalancing forces the behaviorally correct action: selling what has gone up (taking profits) and buying what has gone down (buying low). It is one of the few systematic, forced anti-bias mechanisms available to individual investors.
  `,

  bdExample: `In 2022-2023, Bangladesh experienced significant inflation and taka depreciation simultaneously. Investors with all their savings in taka-denominated savings accounts (FDR, DPS, savings account) saw real purchasing power decline. Investors who had allocated 10-15% of their portfolios to gold saw that portion rise in taka terms, partially offsetting the loss. The gold did not outperform as an investment — it served its intended function as a hedge against exactly the kind of macro risk that materialized. Diversification across correlation regimes protected partially even when it did not generate returns.`,

  actionPrompt: {
    text: "Map your current savings across the four layers described: foundation (emergency fund), stability (Sanchaypatra/DPS), growth (stocks/mutual funds), and hedge (gold). What percentage is in each layer? What is missing?",
    ctaButtonText: "I mapped my portfolio layers",
  },

  game: z8Game1,

  quiz: [
    {
      question: "What does 'correlation' mean in the context of a portfolio?",
      options: [
        "The percentage return generated by an asset",
        "How closely two assets tend to move together — high correlation means they move together, low correlation means they move independently",
        "The relationship between an asset's risk and return",
        "The legal connection between two investment instruments",
      ],
      correctIndex: 1,
      explanation:
        "Correlation measures co-movement. Two assets with correlation of +1 always move together. Assets with 0 correlation move independently. Assets with -1 correlation always move in opposite directions. Portfolio theory shows that combining low-correlation assets reduces overall portfolio risk.",
    },
    {
      question: "What is 'systematic risk' and why can't it be eliminated through diversification?",
      options: [
        "Risk from bad individual companies — eliminated by buying more stocks",
        "Risk from market-wide events (recession, crisis, inflation) that affect all investments broadly — diversification within a market cannot help",
        "Risk from not having a system for investing",
        "Risk from regulatory changes by BSEC",
      ],
      correctIndex: 1,
      explanation:
        "Systematic risk affects the entire market — when a financial crisis hits, diversified DSE portfolios still fall. Diversification eliminates company-specific risk (one company fails), not market-wide risk. Some systematic risk protection requires assets with low correlation to the domestic market (gold, international exposure).",
    },
    {
      question: "What does 'rebalancing' a portfolio mean?",
      options: [
        "Selling all investments and starting over annually",
        "Periodically selling assets that have grown above target allocation and buying those below target, returning to intended proportions",
        "Balancing losses against gains for tax purposes",
        "Moving all assets into safer instruments during market downturns",
      ],
      correctIndex: 1,
      explanation:
        "Rebalancing restores the intended allocation when market movements cause drift. It systematically forces you to sell high (what grew above target) and buy low (what fell below target) — the correct behavior that loss aversion and herding typically prevent.",
    },
    {
      question: "Why does combining two low-correlation assets often produce a portfolio with lower risk than either asset alone?",
      options: [
        "Because holding more assets always reduces risk",
        "Because when one asset falls, the uncorrelated asset is likely unchanged or rising — the portfolio's ups and downs are smoothed",
        "Because fund managers are better at managing combined portfolios",
        "Because BSEC provides guarantees for diversified portfolios",
      ],
      correctIndex: 1,
      explanation:
        "Low correlation means the assets don't fall simultaneously. When Asset A drops, Asset B may be flat or rising. The combined portfolio's total value fluctuates less than either individual asset. This is mathematically proven by Markowitz's Modern Portfolio Theory.",
    },
    {
      question: "True or False: Holding 20 different DSE stocks fully eliminates the risk that a global financial crisis will damage your portfolio.",
      options: [
        "True — sufficient diversification eliminates all risk",
        "False — 20 DSE stocks eliminate company-specific risk but not systematic (market-wide) risk from global crises or economic shocks",
      ],
      correctIndex: 1,
      explanation:
        "When the global financial crisis hit in 2008, every stock market in the world fell. When Bangladesh's macro environment deteriorated in 2022-2023, DSE stocks broadly fell together. Diversification within one market does not protect against that market's systemic risk.",
    },
  ],

  whatsNext: {
    nextModuleId: "z8-3",
    preview: "Portfolio constructed. Next: the one asset class almost every young Bangladeshi has an opinion on but few understand — real estate.",
  },
};

// ─── MODULE Z8-3 ─────────────────────────────────────────────
export const moduleZ8_3: Module = {
  id: "z8-3",
  zoneId: "zone-8",
  title: "Real estate: is 'land never loses value' true?",
  tagline: "The math behind buying vs renting, and why property isn't always the investment it feels like.",
  estimatedMinutes: 11,

  hook: `"'Land never loses value.' 'Real estate is the safest investment.' 'Rent is money wasted.' These three statements are repeated constantly in Bangladesh. They are also partially wrong in ways that cost people significantly. This module does the math that most property enthusiasts never do."`,

  context: `Real estate is the largest financial decision most people will ever make, and one of the least analytically evaluated. Cultural attitudes strongly favor property ownership in Bangladesh — partly for legitimate reasons (physical asset, inflation hedge, family security) and partly due to an incomplete accounting of the real costs of ownership versus renting.`,

  teaching: `
## The rent vs buy math most people don't do

When evaluating whether to buy or rent, most people compare the monthly rent they pay versus the monthly mortgage EMI. This comparison misses several costs of ownership:

**Hidden costs of ownership:**
- Mortgage interest (often 8-12% on home loans in Bangladesh)
- Registration costs (7-10% of property value, paid upfront)
- Maintenance (typically 1-2% of property value annually)
- Building service charge, utility infrastructure costs
- Property tax (if applicable)
- Opportunity cost of the down payment capital

A property that costs Tk 1 crore to buy typically has:
- Down payment: Tk 20-30 lakh (out of pocket immediately)
- Registration/legal: Tk 7-10 lakh (upfront)
- Annual maintenance: Tk 1-2 lakh
- Mortgage EMI for 20 years: significant monthly commitment

The opportunity cost of the Tk 30-40 lakh upfront capital alone — if invested in Sanchaypatra at 10% — is Tk 3-4 lakh per year in foregone income.

**Rent vs buy is not simply EMI vs monthly rent.** The full comparison requires calculating the total cost of ownership (including financing costs and opportunity costs) against rent + what the down payment capital earns if invested instead.

## When buying is right

- You have a long horizon in the same location (8-10+ years)
- You can make a substantial down payment (30%+) to reduce the financing burden
- The property is purchased at or below market value in a genuinely supply-constrained area
- You have evaluated the property for actual rental yield (what could you earn renting it out?)

## Rental yield: the investor's metric

If you are buying property as an investment (not to live in), the relevant metric is rental yield:

Rental yield = Annual rental income ÷ Purchase price × 100

In most of Dhaka's premium residential areas, rental yields are 3-5%. Compare that to Sanchaypatra at 10%+ or FDR at 8-9%. On a pure cash yield basis, Dhaka residential property often underperforms safe government instruments — the investment case for property relies on capital appreciation (the price going up).

## 'Land never loses value' — examined

In nominal terms (taka), land in Dhaka has historically appreciated. In real terms (adjusted for inflation), the picture is more mixed in many areas. More importantly:
- Liquidity is extremely low — property takes months to years to sell
- Transaction costs are very high (7-10% registration)
- Holding costs are real (maintenance, taxes, vacancy)
- Specific locations have seen significant price corrections after speculative runs

Land in the right location has been an excellent investment. Land purchased at inflated prices in the wrong location, or bought with heavy leverage, has produced losses even in 'stable' markets.

## The practical takeaway

Property ownership can be a legitimate, sensible financial decision — particularly for a primary residence with long tenure. It should be evaluated analytically, not emotionally. The key questions:
1. Can you afford the full cost of ownership (not just the EMI)?
2. What is the rental yield if you rented the property out?
3. How does the expected capital appreciation compare to alternative investments?
4. How long will you stay in this location?
  `,

  bdExample: `Taher is comparing renting a Tk 20,000/month apartment in Dhaka versus buying a similar unit for Tk 75 lakh (with a 20 lakh down payment and 55 lakh home loan at 9% for 20 years). The EMI would be approximately Tk 49,000/month — more than double the rent. The Tk 20 lakh down payment, if invested in Sanchaypatra at 10%, would earn Tk 2 lakh annually. Full cost of ownership including maintenance: approximately Tk 65,000/month. Against renting at Tk 20,000. The break-even — the point at which buying is financially equivalent to renting — requires significant capital appreciation in the property. If Taher plans to live there for 3-5 years, the math strongly favors renting. For 15+ years in a supply-constrained area, the math improves for buying.`,

  actionPrompt: {
    text: "For your city or area: look up the approximate purchase price of a flat and the monthly rent for a similar unit. Calculate the rental yield. Then calculate what the down payment would earn annually in Sanchaypatra. Does buying or renting look better financially given your actual timeline?",
    ctaButtonText: "I calculated the rent vs buy comparison",
  },

  quiz: [
    {
      question: "What is 'rental yield' and why is it useful for property investors?",
      options: [
        "The percentage increase in property value annually",
        "Annual rental income divided by purchase price — tells you the cash return from renting out the property",
        "The interest rate on a home loan",
        "The percentage of rental income paid as tax",
      ],
      correctIndex: 1,
      explanation:
        "Rental yield measures the cash-on-cash return of property as an income asset. In Dhaka premium residential areas, yields of 3-5% compare unfavorably to Sanchaypatra yields of 10%+, which means the investment case for residential property relies heavily on capital appreciation, not rental income.",
    },
    {
      question: "What major cost of property ownership is most commonly left out of the 'rent vs buy' comparison?",
      options: [
        "The monthly mortgage payment",
        "The opportunity cost of the down payment capital — what that money would earn if invested elsewhere",
        "The monthly rent alternative",
        "Annual property appreciation",
      ],
      correctIndex: 1,
      explanation:
        "A Tk 20-30 lakh down payment sitting in property earns no income. If invested in Sanchaypatra at 10%, it would generate Tk 2-3 lakh annually. This foregone income is a real cost of ownership that most people never include in their analysis.",
    },
    {
      question: "Registration and legal costs for property purchase in Bangladesh are approximately:",
      options: [
        "0.5-1%",
        "2-3%",
        "7-10% of the property value",
        "15-20%",
      ],
      correctIndex: 2,
      explanation:
        "Transaction costs in Bangladesh property are very high — 7-10% paid upfront. On a Tk 1 crore property, this is Tk 7-10 lakh in non-recoverable costs before you start. This significantly affects the true break-even timeline for buying versus renting.",
    },
    {
      question: "'Land never loses value' is best evaluated by:",
      options: [
        "Asking a real estate agent",
        "Looking at historical nominal price data in your specific area, adjusting for inflation, and accounting for holding and transaction costs",
        "Comparing to historical Dhaka property prices from 1990",
        "Checking BSEC data on real estate investments",
      ],
      correctIndex: 1,
      explanation:
        "Nominal price data in an inflationary environment always shows prices rising. Real returns (inflation-adjusted), specific location performance, and the drag from high transaction costs tell a different and more accurate story.",
    },
    {
      question: "Which scenario most strongly favors buying over renting?",
      options: [
        "You plan to stay in the location for 3-4 years",
        "You can only afford a 5% down payment",
        "You have a 15+ year horizon, a 30%+ down payment, and the property is in a supply-constrained area",
        "Property prices in the area have risen significantly in the last 2 years",
      ],
      correctIndex: 2,
      explanation:
        "Long tenure amortizes the high upfront transaction costs. A large down payment reduces the financing burden and opportunity cost. Supply-constrained areas have better capital appreciation prospects. Recent price rises (option D) actually makes buying less attractive, not more — you'd be buying into an already-appreciated market.",
    },
  ],

  whatsNext: {
    nextModuleId: "z8-4",
    preview: "Assets covered. One more thing you're probably not protecting: your income-generating ability. Insurance is next.",
  },
};

// ─── MODULE Z8-4 ─────────────────────────────────────────────
export const moduleZ8_4: Module = {
  id: "z8-4",
  zoneId: "zone-8",
  title: "Insurance: protecting what your portfolio cannot replace",
  tagline: "Why insurance is not an investment — and why that's exactly why you need it.",
  estimatedMinutes: 10,

  hook: `"Insurance is the financial product designed to fail. The ideal outcome for the buyer is that they never need to use it. This makes it psychologically easy to skip — especially when money is tight or you feel young and invincible. But a single uninsured medical emergency or income loss can set a financial plan back by years. Insurance does not generate returns. It prevents catastrophic setbacks."`,

  context: `Insurance in Bangladesh is significantly underpenetrated relative to income levels. The insurance sector has historically suffered from poor product quality, aggressive mis-selling, and a culture of distrust. Understanding what insurance is actually for — and distinguishing it clearly from investment — allows you to evaluate it objectively rather than either dismissing it or being mis-sold a product.`,

  teaching: `
## What insurance is for (and not for)

Insurance is a risk transfer mechanism. You pay a premium to transfer the financial risk of a specific adverse event (illness, death, accident) to an insurance company. In exchange, the insurer pays out if that event occurs.

Insurance is not an investment. It does not build wealth. It does not generate returns you can plan your retirement on. Its entire purpose is to prevent a specific catastrophic financial outcome.

This distinction matters because many insurance products in Bangladesh are marketed as "insurance + investment" (endowment plans, unit-linked insurance plans). These almost always provide poor insurance coverage and poor investment returns — trying to do both jobs badly rather than one job well.

**The correct framework:** buy insurance for pure risk protection; buy investment products separately for wealth building. Never buy a single product that claims to do both.

## Types of insurance worth understanding

**Health insurance:** Covers hospitalization and medical costs. A single serious illness or accident can cost Tk 5-20 lakh in Bangladesh. Without insurance, this becomes either debt or savings liquidation.

In Bangladesh, individual health insurance is available from several private insurers. Some employers provide group health coverage. Corporate-linked health insurance is typically better value than individual retail products.

**Term life insurance:** Pure death benefit — if the insured person dies, the beneficiaries receive a lump sum. No savings component. No returns if you survive. Very low annual premiums relative to the coverage amount. This is the only type of life insurance worth considering for most young earners.

A person earning Tk 60,000/month with family dependents should consider a term policy covering 10-15 times annual income (approximately Tk 72-108 lakh). The annual premium for this level of coverage for a healthy 28-year-old is relatively modest.

**What to avoid:** Endowment policies, whole life policies with premium savings elements, unit-linked insurance plans that mix investment with coverage. These products tend to charge high fees, provide inadequate coverage, and produce poor investment returns. Mis-selling of these products is common in Bangladesh.

## Evaluating a health insurance product

Before buying any health insurance:
- What is the cashless hospitalization network? (Which hospitals accept the insurance directly?)
- What is the sub-limit structure? (Does the policy cap individual treatments below the overall limit?)
- Is there a waiting period for pre-existing conditions?
- What is the claim settlement ratio of the insurer? (What percentage of valid claims do they pay?)
- Is the premium fixed or does it rise significantly with age?

## The self-insurance alternative

For young, healthy individuals with a fully funded emergency fund (6 months or more of expenses), self-insurance — using savings to cover unexpected events — is a legitimate alternative to paying insurance premiums. The emergency fund effectively provides the first Tk 3-6 lakh of coverage.

Insurance becomes more critical when: you have dependents, your emergency fund is insufficient to cover a likely adverse event, or you have specific high-risk factors (health history, lifestyle, occupation).
  `,

  bdExample: `Nadia is 27, earns Tk 55,000/month, and has no health insurance. She considers insurance premiums "money wasted." In 2024, she requires surgery and 10 days of hospitalization — total cost: Tk 4.8 lakh. She has Tk 2 lakh in savings. She borrows Tk 2.8 lakh from family. Her financial plan — which had been on track with a DPS and modest stock investments — is set back approximately 18 months. A basic health insurance policy would have cost her approximately Tk 12,000-18,000 annually. The insurance would have been the most important financial decision she had made.`,

  actionPrompt: {
    text: "Check whether your employer provides health insurance. If yes, what is the coverage limit? If no, look up one individual health insurance product from a licensed Bangladeshi insurer and note the annual premium and coverage limit.",
    ctaButtonText: "I checked my health insurance status",
  },

  quiz: [
    {
      question: "What is the fundamental purpose of insurance?",
      options: [
        "To generate investment returns over time",
        "To save money tax-efficiently",
        "To transfer the financial risk of a specific adverse event to an insurer in exchange for a premium",
        "To build wealth while protecting against risk simultaneously",
      ],
      correctIndex: 2,
      explanation:
        "Insurance transfers risk. You pay a known, manageable premium to avoid an unpredictable, potentially catastrophic cost. It is not an investment — it is a financial protection mechanism.",
    },
    {
      question: "Why should insurance and investment be bought as separate products?",
      options: [
        "Regulators require them to be separate",
        "Products that try to do both (endowment plans, ULIPs) typically provide inadequate coverage and poor investment returns — doing both jobs poorly instead of one job well",
        "Insurance companies don't want competition from mutual funds",
        "Investment returns within insurance are not taxable",
      ],
      correctIndex: 1,
      explanation:
        "Mixed products add fees and complexity without delivering either good coverage or good returns. The correct approach: buy pure term life insurance and pure health insurance for protection; buy separate investment products for wealth building.",
    },
    {
      question: "Term life insurance differs from whole life or endowment insurance in that:",
      options: [
        "Term insurance is more expensive",
        "Term insurance provides only a death benefit with no savings component — pure risk coverage at low cost",
        "Term insurance is only available to people over 40",
        "Term insurance covers both death and disability",
      ],
      correctIndex: 1,
      explanation:
        "Term insurance is pure protection. You pay premiums; if you die, beneficiaries receive the sum assured. If you survive the term, you receive nothing — which is the optimal outcome. Very low premiums relative to coverage amount make this the most efficient form of life insurance.",
    },
    {
      question: "What is the 'claim settlement ratio' for an insurance company and why does it matter?",
      options: [
        "The percentage of premium that goes to the insurance company as profit",
        "The percentage of valid claims that the insurer actually pays — a measure of insurance company reliability",
        "The time taken to settle claims",
        "The maximum claim amount as a percentage of the insured sum",
      ],
      correctIndex: 1,
      explanation:
        "A company with a 95% claim settlement ratio pays 95% of valid claims. A company with 70% ratio denies 30% of valid claims. Before buying any insurance, check the claim settlement ratio — a high premium is worthless if the company routinely rejects claims.",
    },
    {
      question: "True or False: A fully funded 6-month emergency fund can serve as a form of self-insurance for small to medium adverse events.",
      options: [
        "True — for minor and moderate events, a funded emergency fund can absorb costs without formal insurance",
        "False — insurance is legally required for all financial risks",
      ],
      correctIndex: 0,
      explanation:
        "Self-insurance through a funded emergency fund is a legitimate strategy for young, healthy individuals. As family dependents increase, health complexity rises, or emergency funds prove insufficient for potential adverse events, formal insurance becomes increasingly important.",
    },
  ],

  whatsNext: {
    nextModuleId: "z8-5",
    preview:
      "Stocks, funds, property, insurance. One zone left in this section: how to pull it together into a long-term plan.",
  },
};

// ─── MODULE Z8-5 ─────────────────────────────────────────────
export const moduleZ8_5: Module = {
  id: "z8-5",
  zoneId: "zone-8",
  title: "Asset allocation by life stage: your portfolio in your 20s, 30s, and 40s",
  tagline: "The one variable that changes everything: how much time you have.",
  estimatedMinutes: 10,

  hook: `"The most powerful force in investing is not stock selection or market timing. It is time. A 23-year-old who invests Tk 3,000 per month for 40 years will almost certainly retire wealthier than a 40-year-old who invests Tk 10,000 per month for 25 years — despite investing less in total. The math of compounding is so counterintuitive that most people do not believe it until they see it."`,

  context: `Asset allocation — the division of a portfolio across asset types — changes appropriately as you move through life stages. The reason: time horizon is the primary determinant of how much risk you can rationally take. More time allows more recovery from market downturns, which means a younger person can hold more growth-oriented (volatile) assets than an older person approaching a specific financial goal.`,

  teaching: `
## The compound growth reality

Compound growth works by earning returns on previous returns. The effect is exponential over long periods. Three examples using a 10% annual return (roughly what a balanced equity-plus-safe-instruments portfolio might target in Bangladesh):

- Tk 3,000/month for 40 years: approximately Tk 1.6 crore
- Tk 3,000/month for 30 years: approximately Tk 65 lakh
- Tk 3,000/month for 20 years: approximately Tk 23 lakh

The first 20 years generate Tk 23 lakh. The last 20 years generate Tk 1.37 crore — nearly six times as much from the same monthly investment. The exponential nature of compounding means the later years are dramatically more productive than the early ones. Starting early is not a vague platitude. It is the most important quantitative factor in long-term wealth.

## Asset allocation in your 20s

Primary advantage: time. A 20-something has 30-40 years before any retirement-type goal. Even a 40-50% portfolio decline in the stock market — the kind that has happened historically — is recoverable over a 30-year horizon.

**Appropriate allocation characteristics:**
- Higher equity weighting (40-60% of long-term savings) — maximize the growth advantage of time
- Establish the financial foundation first: emergency fund, zero high-interest debt
- DPS or Sanchaypatra as the stable base (30-40%)
- Small gold position (5-10%) as long-term hedge
- Focus more on income-building (career, skills) than on optimizing portfolio structure at small scale

**Common 20s mistake:** Putting savings in a bank account because stocks "feel risky" — and then watching inflation slowly erode the value of savings that were kept "safe."

## Asset allocation in your 30s

Typically: higher income but more obligations. Mortgage, children's education, family financial responsibilities. The financial plan needs to accommodate multiple near-term goals alongside long-term wealth building.

**Appropriate allocation characteristics:**
- Moderate equity weighting (30-45%) — still significant growth orientation, but lower than 20s
- Specific goal-linked savings: separate accounts or instruments for education goals, housing down payment
- Life insurance becomes critical if dependents exist
- Health insurance non-negotiable with family
- Tax efficiency matters more as income rises — maximize investment rebate through Sanchaypatra and DPS

## Asset allocation in your 40s and beyond

Time horizon shortens meaningfully. A target retirement or drawdown age begins to drive portfolio structure. Volatility tolerance falls not because people become more fearful, but because they genuinely have less time to recover from a major portfolio decline.

**Appropriate allocation characteristics:**
- Gradually reduce equity weighting (20-35%) as financial goals approach within 10-15 years
- Increase stability layer (Sanchaypatra, FDR, bonds if available)
- Insurance review: is existing coverage adequate for changed family situation?
- Begin thinking about withdrawal strategy, not just accumulation strategy

## The one rule across all stages

Never sacrifice the emergency fund or incur high-interest debt to invest more aggressively. The emergency fund is structural protection that makes all other investment decisions more rational.
  `,

  bdExample: `Rima started a DPS of Tk 2,000/month at age 22. At 32, the DPS matured with approximately Tk 3.2 lakh including interest. She reinvested this in Sanchaypatra and started a new DPS of Tk 5,000/month as her income grew. At 42, her combined savings products plus a small equity portfolio have accumulated to approximately Tk 35 lakh — from a total investment of about Tk 24 lakh over 20 years. Her colleague Jamal started saving at 32 but invested Tk 8,000/month (more than Rima), and at 42 has approximately Tk 14 lakh. The 10-year head start was worth more than doubling the monthly investment.`,

  actionPrompt: {
    text: "Using any compound interest calculator, calculate what Tk 2,000/month invested at 10% annual return becomes in 20, 30, and 40 years. Then calculate what Tk 5,000/month becomes in 20 and 30 years. Note how many years of head start equals how much more monthly investment.",
    ctaButtonText: "I ran the compound growth calculation",
  },

  quiz: [
    {
      question: "Why does starting to invest early matter more than investing larger amounts later?",
      options: [
        "Younger people get better interest rates",
        "Compound growth is exponential — the later years of a long investment horizon generate dramatically more than the earlier years",
        "Tax rates are lower for younger investors",
        "Financial markets perform better for younger investors",
      ],
      correctIndex: 1,
      explanation:
        "Exponential compounding means later years produce far more growth than earlier years on the same monthly investment. A 10-year head start outperforms doubling your monthly investment starting later, in most real-world scenarios.",
    },
    {
      question: "Why should equity allocation typically be higher in your 20s than in your 40s?",
      options: [
        "Younger people are naturally better at stock picking",
        "Younger people have more time to recover from market downturns, making the short-term volatility of equity a manageable risk",
        "Stocks outperform other assets in the short term",
        "Financial regulations favor younger equity investors",
      ],
      correctIndex: 1,
      explanation:
        "Risk capacity depends on time to recover. A 50% portfolio drop at 25 can be recovered over decades. The same drop at 55, close to when funds are needed, may not recover in time. Time horizon is the rational basis for equity allocation decisions.",
    },
    {
      question: "In your 30s, what financial priority typically becomes more important that was less critical in your 20s?",
      options: [
        "Opening a BO account for stock trading",
        "Specific goal-linked savings for education, housing, and life insurance as dependents appear",
        "Moving all savings to equity for maximum growth",
        "Reducing savings rate to enjoy higher current income",
      ],
      correctIndex: 1,
      explanation:
        "The 30s typically bring dependents (children) and major financial goals (housing). These create specific near-term liabilities that require dedicated, goal-linked savings strategies alongside long-term wealth building.",
    },
    {
      question: "The rule that applies across all life stages in portfolio management is:",
      options: [
        "Always maximize equity allocation",
        "Always prioritize safety over growth",
        "Never sacrifice the emergency fund or incur high-interest debt to invest more aggressively",
        "Follow your bank manager's allocation advice",
      ],
      correctIndex: 2,
      explanation:
        "The emergency fund prevents forced selling of investments at the worst time. High-interest debt (credit cards, informal loans) carries a guaranteed cost that investment returns must overcome before any net wealth creation occurs. These foundations remain non-negotiable across all life stages.",
    },
    {
      question: "True or False: A 45-year-old with a 20-year investment horizon should hold zero equity because they are 'too old for risk.'",
      options: [
        "True — risk should decrease dramatically after 40",
        "False — a 20-year horizon still supports meaningful equity allocation, though lower than in one's 20s",
      ],
      correctIndex: 1,
      explanation:
        "A 20-year horizon still provides significant recovery time from market downturns. 20-35% equity allocation at 45 is reasonable depending on specific goals and risk capacity. The gradual reduction in equity should align with actual approaching financial goals, not arbitrary age cutoffs.",
    },
  ],

  whatsNext: {
    nextModuleId: null,
    preview:
      "Zone 8 complete. You now understand mutual funds, portfolio construction, real estate analysis, insurance, and life-stage asset allocation. Choose your next zone.",
  },
};

export const zone8Modules = [
  moduleZ8_1,
  moduleZ8_2,
  moduleZ8_3,
  moduleZ8_4,
  moduleZ8_5,
];

