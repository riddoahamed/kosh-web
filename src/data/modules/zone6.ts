import type { Module } from "@/types/curriculum";

// ─────────────────────────────────────────────────────────────
// ZONE 6 — STOCK MARKET BASICS
// 5 modules. Applied difficulty tier.
// Prerequisite: Zone 5 (Savings Products) recommended.
//
// Content philosophy for this zone:
// - Explain the universal concept first (how equity markets work globally)
// - Then ground it in Bangladesh-specific reality (DSE, BO accounts, BSEC)
// - Be honest about the DSE's actual performance record without being discouraging
// - Mini-games: one scenario verdict, one calculator reveal, one ordering game
// ─────────────────────────────────────────────────────────────

// ─── MINI-GAME DATA ──────────────────────────────────────────
// Attach these to their respective modules.
// The ModuleLayout component reads module.game and renders <ModuleGame />.

export const z6Game1 = {
  type: "scenario_verdict" as const,
  title: "Stock or Not? Spot the Equity",
  instructions:
    "Each item below is something you could put money into. Tap 'Equity' if it gives you ownership in a company, or 'Not equity' if it does not.",
  items: [
    {
      scenario: "You buy 100 shares of Square Pharmaceuticals on the DSE.",
      correct: "equity",
      explanation:
        "Correct. A share is literally a fraction of ownership. You own a tiny slice of Square Pharma's assets and future profits.",
    },
    {
      scenario:
        "You put Tk 50,000 in a 3-year Fixed Deposit Receipt at a bank.",
      correct: "not_equity",
      explanation:
        "FDR is a loan you give to the bank. They owe you your money plus interest. You own nothing in the bank.",
    },
    {
      scenario:
        "You buy units in an open-end mutual fund that holds 20 stocks.",
      correct: "equity",
      explanation:
        "Mutual fund units give you indirect ownership in the underlying stocks the fund holds.",
    },
    {
      scenario:
        "You buy a 5-year Bangladesh Sanchaypatra from a post office.",
      correct: "not_equity",
      explanation:
        "Sanchaypatra is government debt — you are lending to the government. No ownership involved.",
    },
    {
      scenario:
        "You invest in a startup through an equity crowdfunding platform.",
      correct: "equity",
      explanation:
        "Equity crowdfunding gives you actual ownership shares in a private company, just like a stock market — but unlisted.",
    },
  ],
  mangoReward: 30,
};

export const z6Game2 = {
  type: "calculator_reveal" as const,
  title: "Dividend Yield: Guess Before You See",
  instructions:
    "A company's stock trades at Tk 120 per share. It paid a cash dividend of Tk 6 per share last year. What is the dividend yield? Enter your guess (in %) before seeing the answer.",
  correctAnswer: 5,
  unit: "%",
  formula: "Dividend per share ÷ Share price × 100 = Dividend yield",
  explanation:
    "Tk 6 ÷ Tk 120 × 100 = 5%. Dividend yield tells you how much annual cash return you get relative to what you paid for the stock. A 5% yield from a stable company is meaningful — compare it to FDR rates to decide if the risk is worth it.",
  mangoReward: 25,
};

export const z6Game3 = {
  type: "order_steps" as const,
  title: "Open a BO Account: Put the Steps in Order",
  instructions:
    "These are the real steps to open a BO (Beneficiary Owner) account in Bangladesh. Tap them in the correct order.",
  steps: [
    "Choose a BSEC-licensed stockbroker or brokerage house",
    "Submit NID, TIN, bank account details, and passport photo to the broker",
    "Broker submits your application to Central Depository Bangladesh Limited (CDBL)",
    "CDBL creates your unique BO account number (16 digits)",
    "Fund your account via bank transfer to start trading",
  ],
  correctOrder: [0, 1, 2, 3, 4],
  explanation:
    "Every investor in Bangladesh must have a BO account through CDBL before buying a single share. The broker is your access point — they submit to CDBL on your behalf. Without a BO account, you literally cannot hold shares in Bangladesh.",
  mangoReward: 30,
};

// ─── MODULE Z6-1 ─────────────────────────────────────────────
export const moduleZ6_1: Module = {
  id: "z6-1",
  zoneId: "zone-6",
  title: "What a stock actually is (and why people buy them)",
  tagline: "Ownership, not a lottery ticket.",
  estimatedMinutes: 11,

  hook: `"Most people who buy stocks do not think of themselves as business owners. They think of themselves as players in a price-guessing game. That mental model is why most of them lose money. The people who make money from stocks over long periods of time think of them completely differently."`,

  context: `Stocks are one of the oldest and most misunderstood financial instruments in the world. In Bangladesh, the word 'share market' carries a specific set of associations — the 2010 crash, tip culture, speculation, loss. Most people know someone who lost money in it. This history shapes how the market is approached and taught. This module separates what stocks actually are from what the Bangladesh stock market experience has made people assume they are.`,

  teaching: `
## What a stock is, fundamentally

A stock (also called a share or equity) is a unit of ownership in a company. When a company wants to raise capital beyond what it can borrow, it can sell portions of itself to the public. Each portion is a share. If a company has 10 million total shares and you own 1,000 of them, you own 0.01% of the company.

This is not a metaphor. It is a legal reality. You are a part-owner of that business. If the business prospers, your ownership stake is worth more. If it pays profits out to shareholders, you receive a proportion of those profits (called a dividend). If it fails, your ownership stake is worth less or nothing.

**The two ways stocks make money for owners:**

**1. Capital appreciation** — the price of the share goes up because the underlying business is worth more. A company that doubles its profits over 5 years is generally worth more than it was 5 years ago.

**2. Dividends** — the company distributes a portion of its profits directly to shareholders as cash payments, usually annually or quarterly.

Not all stocks pay dividends. Growth-oriented companies often reinvest profits back into the business rather than distributing them. Others pay regular, predictable dividends.

## Why companies issue stocks

A private company that wants to expand needs capital. It can borrow (debt) or sell ownership stakes (equity). Equity has a cost — the company gives up partial ownership and future profits. But unlike debt, there is no mandatory repayment schedule. If the business has a bad year, it does not owe the shareholders a fixed return.

The process of a company listing its shares on a public exchange for the first time is called an IPO — Initial Public Offering.

## What stock markets actually do

A stock exchange is simply a marketplace that allows buyers and sellers of shares to find each other efficiently. The Dhaka Stock Exchange (DSE) and the Chittagong Stock Exchange (CSE) are Bangladesh's two exchanges.

Exchanges provide three things: price discovery (what is the share worth right now?), liquidity (can I sell my shares when I want to?), and transparency (information about companies is publicly available).

## The critical distinction: investing vs speculating

**Investing** in stocks means buying ownership in businesses you believe will be worth more over time, based on their actual performance — revenues, profits, growth prospects, quality of management.

**Speculating** means trying to profit from short-term price movements, often based on tips, rumors, or technical patterns — without much concern for the underlying business.

The 2010 Bangladesh stock market crash was largely driven by speculation. Prices detached from business fundamentals. When they snapped back to reality, investors who held inflated stocks suffered enormous losses. The lesson is not that stocks are dangerous. The lesson is that speculating in any market is dangerous.
  `,

  bdExample: `Square Pharmaceuticals is one of Bangladesh's most respected listed companies. It produces medicines used across the country and exports to multiple markets. A long-term investor who bought Square shares a decade ago and held through market ups and downs received regular dividends and saw the share price appreciate alongside the company's genuine business growth. Meanwhile, investors who bought obscure Z-category stocks in 2010 based on tips — regardless of what those companies actually did — lost most of their capital when the market corrected. Same market. Very different outcomes depending on whether you were investing or speculating.`,

  actionPrompt: {
    text: "Look up any one company listed on the DSE website (dse.com.bd). Find its category (A, B, N, Z) and the most recent dividend it paid. What business does this company actually do?",
    ctaButtonText: "I looked up a listed company",
  },

  game: z6Game1,

  quiz: [
    {
      question: "When you buy a company's stock, you become:",
      options: [
        "A creditor — the company owes you money",
        "A part-owner of the company with a claim on its future profits",
        "An employee of the company",
        "A customer with special rights",
      ],
      correctIndex: 1,
      explanation:
        "A shareholder is a part-owner. Unlike creditors (who lend money), shareholders own a slice of the business itself. This is why stock values go up when companies do well — the business you own is worth more.",
    },
    {
      question: "What are the two main ways stocks generate returns for investors?",
      options: [
        "Dividends and capital appreciation",
        "Interest payments and principal repayment",
        "Rental income and loan repayments",
        "Price tips and insider information",
      ],
      correctIndex: 0,
      explanation:
        "Dividends are cash payments from company profits. Capital appreciation is the increase in share price as the business grows. Both require the underlying company to actually perform well.",
    },
    {
      question: "An IPO is:",
      options: [
        "A type of government bond",
        "The first time a company sells its shares to the public on a stock exchange",
        "An international payment order",
        "A mutual fund category",
      ],
      correctIndex: 1,
      explanation:
        "IPO stands for Initial Public Offering — the process by which a private company becomes publicly listed. After the IPO, shares can be bought and sold on the exchange by anyone.",
    },
    {
      question: "What is the primary lesson from Bangladesh's 2010 stock market crash?",
      options: [
        "Stock markets are always dangerous and should be avoided",
        "Speculation — buying based on tips without regard for business fundamentals — is dangerous, not stock investing itself",
        "Only experienced traders should ever enter the stock market",
        "International markets are safer than DSE",
      ],
      correctIndex: 1,
      explanation:
        "The 2010 crash was driven by speculation and price detachment from fundamentals. Investors focused on actual business quality were hurt less than speculators. The lesson is about approach, not about the asset class itself.",
    },
    {
      question: "What does a stock exchange primarily provide?",
      options: [
        "Guaranteed returns for investors",
        "Government backing for all listed companies",
        "A marketplace for price discovery, liquidity, and transparency",
        "Tax advantages for stock investors",
      ],
      correctIndex: 2,
      explanation:
        "Stock exchanges facilitate price discovery (what is the share worth?), liquidity (can you sell when you want?), and transparency (public information access). They do not guarantee returns or back companies.",
    },
  ],

  whatsNext: {
    nextModuleId: "z6-2",
    preview:
      "The DSE has not crossed its 2010 peak in 14 years. Here is the honest picture of what Bangladesh's stock market is — and what it isn't.",
  },
};

// ─── MODULE Z6-2 ─────────────────────────────────────────────
export const moduleZ6_2: Module = {
  id: "z6-2",
  zoneId: "zone-6",
  title: "The DSE: what Bangladesh's stock market actually looks like",
  tagline: "Honest numbers. Real context. No hype.",
  estimatedMinutes: 12,

  hook: `"The DSE benchmark index has not crossed its 2010 record high in 14 years. An investor who put $100 into Bangladesh equities at the wrong time has $41 left in dollar terms. This is the reality. It does not mean you should never invest in Bangladesh stocks — but it does mean you need to understand exactly what you are working with before you put any money in."`,

  context: `Bangladesh's stock market is one of the few in the world that has underperformed its 2010 peak for over a decade. This is not a random fact — it reflects specific structural issues: a small universe of quality stocks, repeated regulatory interventions that distorted prices, a weak corporate governance culture, and retail investor behavior driven more by speculation than analysis. Understanding these issues does not require you to avoid the market. It requires you to approach it with clear eyes.`,

  teaching: `
## The scale of the DSE

The Dhaka Stock Exchange has approximately 360 listed companies. This sounds like a lot until you compare it to India's BSE (5,000+ companies) or even Vietnam's Ho Chi Minh Stock Exchange (500+ companies). More importantly, of those 360 companies, a meaningful fraction are in the Z (junk) category — companies that have not paid dividends in years, have serious compliance issues, or are essentially defunct.

The investable universe — companies with genuine business quality, reasonable transparency, and consistent dividends — is considerably smaller. Analysts typically identify 20-50 companies as genuinely quality investments on the DSE at any given time.

## Stock categories you must understand

BSEC categorizes DSE-listed companies into:

- **A category** — companies that hold annual general meetings on time, declare dividends of at least 10%, and have no default loans. These are the investable stocks.
- **B category** — companies that hold AGMs but fail on dividend criteria. Use caution.
- **N category** — newly listed companies (within one year of IPO). Track record is limited.
- **Z category** — companies that fail to hold AGMs or have serious compliance failures. These are largely uninvestable for ordinary investors. About 23% of DSE-listed companies are in Z category.

## The honest DSE performance picture

The DSEX (DSE's benchmark index) peaked at 8,918 points in December 2010. As of 2025, it trades around 5,000-6,000 points — still significantly below the 2010 peak, 14 years later.

In dollar terms, the picture is starker. MSCI data shows Bangladesh equity has returned roughly minus 3.34% annually since November 2009 — versus positive returns for frontier markets and global indices. This underperformance reflects a combination of taka depreciation, weak earnings growth at many companies, regulatory distortions (particularly the floor price mechanism used from 2022-2024), and a narrow quality stock universe.

**What this means practically:** The DSE is not like the US S&P 500 or India's Sensex, which have delivered consistent long-term returns by broadly tracking economic growth. Bangladesh's stock market has structural challenges that require stock-specific research rather than broad market exposure.

## Why people still invest — and why some do well

Despite the aggregate underperformance, certain companies have delivered genuine returns. Square Pharmaceuticals, BRAC Bank, Grameenphone, and a handful of others have demonstrated consistent profitability, regular dividends, and genuine business growth. Long-term investors who focused on these companies specifically — not the market as a whole — have done reasonably well.

The lesson: in the DSE context, individual company quality matters far more than broad market timing.

## What BSEC is doing about it

Bangladesh Securities and Exchange Commission is actively reforming. Key recent moves:
- Eliminating floor prices (which had prevented price discovery)
- Phasing out closed-end mutual funds (which had trapped investors' money)
- Increasing enforcement against manipulation
- Pushing for better corporate governance and financial reporting standards

These reforms take time to translate into market performance, but the direction is positive.
  `,

  bdExample: `A salaried employee in Dhaka bought Tk 1 lakh of Z-category stocks in 2021 based on tips from a WhatsApp group. By 2023, those stocks had lost 60% of their value. In the same period, a colleague who bought BRAC Bank and Square Pharmaceuticals — A-category, dividend-paying, fundamentally sound companies — saw modest positive returns plus annual dividends. Same market, same period, dramatically different outcomes based on a single factor: whether the investor did basic research on company quality.`,

  actionPrompt: {
    text: "Go to dse.com.bd. Look up the 'Market Summary' section. How many companies are in each category (A, B, N, Z) today? What percentage are in Z category?",
    ctaButtonText: "I checked the DSE category breakdown",
  },

  quiz: [
    {
      question: "What is a Z-category stock on the DSE?",
      options: [
        "A high-performing stock with the highest returns",
        "A company that has failed to hold AGMs or has serious compliance failures",
        "A foreign company listed in Bangladesh",
        "A newly listed company in its first year",
      ],
      correctIndex: 1,
      explanation:
        "Z-category means the company fails basic compliance: no regular AGMs, no dividends for years, possible financial misreporting. Approximately 23% of DSE stocks are in this category. Most ordinary investors should avoid them entirely.",
    },
    {
      question: "Why has the DSE benchmark index not recovered its 2010 peak after 14 years?",
      options: [
        "Bangladesh's economy has not grown",
        "A combination of structural issues: narrow quality stock universe, regulatory distortions, weak corporate governance, and speculation-driven retail behavior",
        "International sanctions on Bangladesh markets",
        "Bangladesh Bank restricts stock market participation",
      ],
      correctIndex: 1,
      explanation:
        "The underperformance reflects multiple structural factors, not a single cause. Economy and earnings are different things — Bangladesh's GDP has grown, but many listed companies have not translated that into shareholder returns.",
    },
    {
      question: "For an ordinary investor in Bangladesh, which approach has historically given better results on the DSE?",
      options: [
        "Buying the broadest possible range of stocks to diversify",
        "Following Z-category stocks for high volatility returns",
        "Focusing on fundamentally sound A-category companies with consistent dividends",
        "Trading frequently based on price movements",
      ],
      correctIndex: 2,
      explanation:
        "DSE data consistently shows that companies with strong fundamentals, AGM compliance, and regular dividends — primarily A-category — have outperformed the broader market. Stock selection matters far more in Bangladesh than in markets with consistently rising indices.",
    },
    {
      question: "What was the BSEC floor price mechanism and why was it problematic?",
      options: [
        "A minimum investment requirement for new investors",
        "A price ceiling that prevented stocks from rising too fast",
        "A regulatory mechanism that prevented stock prices from falling below a set level, distorting price discovery",
        "A fee charged by BSEC on each transaction",
      ],
      correctIndex: 2,
      explanation:
        "Floor prices prevented stocks from falling below artificial levels. This distorted true market pricing, trapped investors in overvalued positions, and reduced foreign investor confidence. BSEC removed floor prices in 2024 as part of market reforms.",
    },
    {
      question: "True or False: Investing in DSE stocks is similar to investing in the US S&P 500 — broad exposure to the market will generally deliver good long-term returns.",
      options: [
        "True — all stock markets broadly track economic growth",
        "False — the DSE has unique structural issues that make stock-specific research far more important than broad market exposure",
      ],
      correctIndex: 1,
      explanation:
        "The S&P 500 contains 500 large, diversified, quality-screened companies. The DSE has approximately 20-50 quality investable companies among 360 listed. Broad DSE exposure includes a lot of junk. Research matters much more here.",
    },
  ],

  whatsNext: {
    nextModuleId: "z6-3",
    preview:
      "Theory done. Here is the practical guide to actually opening a BO account and placing your first trade.",
  },
};

// ─── MODULE Z6-3 ─────────────────────────────────────────────
export const moduleZ6_3: Module = {
  id: "z6-3",
  zoneId: "zone-6",
  title: "Opening a BO account: the practical guide",
  tagline: "CDBL, brokers, and your first real trade.",
  estimatedMinutes: 10,

  hook: `"Before you can buy a single share in Bangladesh, you need a BO account. Most people who want to invest in stocks do not know what that means or how to get one. Here is the complete practical guide — what a BO account is, how to open it, what documents you need, and how to choose a broker."`,

  context: `Bangladesh's stock market uses a centralized depository system through CDBL (Central Depository Bangladesh Limited). Every share bought or sold on the DSE or CSE is held digitally in your BO (Beneficiary Owner) account rather than as a physical certificate. You access the market through a licensed broker who connects you to the exchange.`,

  teaching: `
## What a BO account is

BO stands for Beneficiary Owner. Your BO account is a digital account maintained by CDBL that holds all the shares you own. When you buy shares, they are credited to your BO account. When you sell, they are debited. Your BO account number is 16 digits and is unique to you across both DSE and CSE.

Think of your BO account like a bank account, but for shares instead of cash.

## Choosing a broker

You cannot buy shares directly from the exchange — you must go through a BSEC-licensed broker. There are over 250 licensed brokerage houses in Bangladesh. Key selection criteria:

**Research the basics before choosing:**
- Is the broker BSEC-licensed? (Check the BSEC website: sec.gov.bd)
- Do they have an online trading platform or mobile app?
- What is their brokerage commission? (Typically 0.25%-0.5% of transaction value, minimum Tk 10-50)
- Do they offer research reports on listed companies?
- Is the account opening process straightforward?

Well-known established brokers with online platforms include IDLC Securities, LankaBangla Securities, UCB Stock Brokerage, and MTB Securities among others. Check recent reviews and BSEC compliance status before opening.

## Documents required

Standard BO account opening documents:
- NID (National Identity Card) — original and photocopy
- TIN certificate
- Bank account details (cheque leaf or bank statement)
- 2 passport-sized photographs
- Nominee information (NID of your chosen nominee)

Some brokers now offer eKYC (electronic Know Your Customer) through their apps, reducing the need for physical document submission.

## The account opening process

1. Visit the broker's office or complete their online application
2. Submit documents and complete KYC verification
3. Broker submits your application to CDBL
4. CDBL creates your BO account (can take 1-7 business days)
5. You receive your 16-digit BO account number
6. Transfer funds to your broker's designated account
7. You are now ready to place orders

## Understanding order types

**Market order** — buy or sell immediately at the current market price. Fastest execution but you accept whatever price is available.

**Limit order** — you specify the maximum price you will pay (buy) or minimum price you will accept (sell). Order executes only if the market reaches your price. More control, potentially no execution.

Most beginner investors start with limit orders to avoid paying more than intended in fast-moving markets.

## The trading day

DSE trading runs Monday to Thursday, 10 AM to 2:30 PM. There is a pre-opening session from 9:45 AM. Trades settle on a T+2 basis — if you buy on Monday, the shares appear in your BO account and your cash clears on Wednesday.
  `,

  bdExample: `Nadia has saved Tk 50,000 she wants to invest in stocks. She goes to a BSEC-licensed broker's office in Dhaka, submits her NID, TIN, bank details, and photos. Within 3 days, her BO account is active. She transfers Tk 50,000 to the broker's account. On trading day, she places a limit order to buy 200 shares of a company at Tk 245 each (total Tk 49,000). The order executes when the price hits her limit. Two days later (T+2), the shares appear in her BO account and the remaining Tk 1,000 stays in her trading account. She is now a shareholder.`,

  actionPrompt: {
    text: "Go to sec.gov.bd and look up the list of licensed stock dealers and brokers. Find one that has an online trading platform. What documents does their website say you need to open a BO account?",
    ctaButtonText: "I researched a licensed broker",
  },

  game: z6Game3,

  quiz: [
    {
      question: "What is CDBL and what role does it play in Bangladesh's stock market?",
      options: [
        "Central Depository Bangladesh Limited — it maintains all digital share ownership records",
        "Credit Development Bangladesh Limited — it provides loans for stock purchases",
        "Chittagong DSE Brokerage Limited — it runs the Chittagong exchange",
        "Capital Development Board of Listed companies — it approves IPOs",
      ],
      correctIndex: 0,
      explanation:
        "CDBL maintains the central registry of all share ownership in Bangladesh. When you buy shares, CDBL updates your BO account to reflect your ownership. Without CDBL, there would be no reliable record of who owns what.",
    },
    {
      question: "What does T+2 settlement mean in Bangladesh's stock market?",
      options: [
        "You must hold a stock for at least 2 years before selling",
        "Trades execute 2 minutes after you place the order",
        "After a trade, shares and cash are exchanged 2 business days later",
        "You pay 2% commission on every transaction",
      ],
      correctIndex: 2,
      explanation:
        "T+2 means 'trade date plus 2 business days.' If you buy on Monday, the shares arrive in your BO account and cash is debited on Wednesday. This is standard practice across most global stock markets.",
    },
    {
      question: "What is the advantage of a limit order over a market order?",
      options: [
        "Limit orders always execute faster",
        "Limit orders give you price control — you buy only at or below your specified price",
        "Limit orders have lower brokerage commission",
        "Limit orders work outside of trading hours",
      ],
      correctIndex: 1,
      explanation:
        "A market order buys at whatever the current price is. A limit order only executes at your specified price or better. In volatile markets, limit orders prevent you from overpaying — though the order may not execute if the price never reaches your limit.",
    },
    {
      question: "DSE trading runs on which days and during which hours?",
      options: [
        "Sunday to Thursday, 9 AM to 5 PM",
        "Monday to Thursday, 10 AM to 2:30 PM",
        "Sunday to Thursday, 10 AM to 4 PM",
        "Monday to Friday, 10 AM to 2:30 PM",
      ],
      correctIndex: 1,
      explanation:
        "DSE trading hours are Monday to Thursday, 10 AM to 2:30 PM Bangladesh time. This is shorter than many global exchanges. Fridays and Saturdays are the weekend in Bangladesh.",
    },
    {
      question: "Before choosing a broker, which check is most important?",
      options: [
        "Whether the broker's office is in a nice building",
        "Whether the broker is BSEC-licensed (verifiable on sec.gov.bd)",
        "Whether the broker has been on television",
        "Whether the broker's brokerage commission is the lowest available",
      ],
      correctIndex: 1,
      explanation:
        "BSEC licensing is the fundamental requirement. An unlicensed broker has no regulatory oversight — your funds and shares have no protection. Commission rate matters, but never before verifying legitimacy.",
    },
  ],

  whatsNext: {
    nextModuleId: "z6-4",
    preview:
      "BO account open. Next: how to actually evaluate whether a company is worth buying.",
  },
};

// ─── MODULE Z6-4 ─────────────────────────────────────────────
export const moduleZ6_4: Module = {
  id: "z6-4",
  zoneId: "zone-6",
  title: "Reading a stock: the four numbers that matter most",
  tagline: "EPS, P/E, dividend yield, NAV. Everything else is noise for beginners.",
  estimatedMinutes: 13,

  hook: `"Thousands of people bought Tk 200 shares in 2010 that are worth Tk 20 today. Almost none of them looked at the company's earnings before buying. They looked at the price going up. The two most common mistakes in stock investing are: (1) buying because the price is rising, and (2) selling because the price is falling. Both get worse when you don't know what you're actually looking at."`,

  context: `Fundamental analysis is the practice of evaluating a company's financial health to estimate whether its stock is priced appropriately. It doesn't guarantee returns — markets can be irrational for long periods. But it dramatically reduces the probability of buying into something that has no business basis for its price. Four numbers are enough to start.`,

  teaching: `
## Number 1: EPS (Earnings Per Share)

EPS = Company's net profit ÷ Total number of shares

This tells you how much profit the company earns for each share that exists. A company with 10 million shares and Tk 500 million in net profit has an EPS of Tk 50.

EPS is the foundation of everything. Rising EPS over multiple years means the company is genuinely growing its profitability. Declining EPS is a warning sign regardless of what the share price is doing.

**Where to find it:** DSE website (company financials section), annual reports, brokerage research reports.

## Number 2: P/E Ratio (Price-to-Earnings Ratio)

P/E = Share price ÷ EPS

If a share costs Tk 200 and EPS is Tk 20, the P/E ratio is 10. This means you are paying Tk 10 for every Tk 1 of annual earnings.

P/E tells you how expensive the stock is relative to what the company earns. A lower P/E means you're paying less for each unit of profit.

**What is a 'normal' P/E on the DSE?** The DSE broadly trades around a P/E of 11-14. A stock with a P/E of 8 may be cheap. A stock with a P/E of 40 would need unusually high growth expectations to justify its price.

**Important caution:** P/E is only meaningful when EPS is positive and the company is genuinely profitable. A Z-category company can have a P/E that looks attractive because the stock is extremely cheap — but cheap for a company losing money is not necessarily good value.

## Number 3: Dividend Yield

Dividend yield = Dividend per share ÷ Share price × 100

If a company pays Tk 10 dividend annually and the share price is Tk 200, the dividend yield is 5%.

Dividend yield tells you what annual cash return you receive just from dividends, regardless of share price movement. In an environment where FDR rates are around 8-9%, a stock yielding 5% plus potential capital appreciation can be competitive — but only if the dividend is sustainable (which requires the company to actually be profitable).

**Look for consistency.** A company that paid dividends every year for 10 years is more reliable than one that paid a large dividend once. Check the dividend history, not just the most recent payment.

## Number 4: NAV (Net Asset Value per share)

NAV per share = (Total assets - Total liabilities) ÷ Number of shares

NAV represents the accounting book value of the company per share. If a share trades below its NAV, you are technically buying the company's assets for less than their stated book value.

On the DSE, many companies trade below NAV. This can signal deep value — or it can signal that the market does not trust the stated asset values (which is a legitimate concern given Bangladesh's history of financial misreporting).

**Use NAV as a sanity check**, not as a primary valuation tool.

## How to read these together

A quality stock typically shows:
- Rising EPS over 3-5 years (the business is growing)
- P/E that is reasonable relative to DSE average and the company's growth rate
- Consistent dividend yield above 3-4%
- Share price not wildly above NAV without a clear growth justification

No single number tells the full story. All four together start to form a picture.
  `,

  bdExample: `Two companies: Company A has an EPS of Tk 30, trades at Tk 150 (P/E = 5), pays Tk 15 dividend (yield = 10%), and its NAV is Tk 160. Company B has an EPS of Tk 2, trades at Tk 100 (P/E = 50), has never paid a dividend, and has a NAV of Tk 40. Company B's share price is lower in absolute terms — but Company A is dramatically cheaper relative to what it actually earns and owns. Most people buying based on the nominal price would be wrong about which is the better value.`,

  actionPrompt: {
    text: "Look up any A-category company on the DSE website. Find its most recent EPS, current share price, most recent dividend, and calculate its P/E ratio and dividend yield.",
    ctaButtonText: "I calculated P/E and dividend yield for a stock",
  },

  game: z6Game2,

  quiz: [
    {
      question: "A company has net profit of Tk 200 million and 5 million shares. What is its EPS?",
      options: ["Tk 4", "Tk 20", "Tk 40", "Tk 200"],
      correctIndex: 2,
      explanation:
        "EPS = Net profit ÷ Shares = Tk 200,000,000 ÷ 5,000,000 = Tk 40 per share.",
    },
    {
      question: "A share trades at Tk 300 and has an EPS of Tk 15. What is the P/E ratio?",
      options: ["5", "10", "20", "45"],
      correctIndex: 2,
      explanation:
        "P/E = Share price ÷ EPS = 300 ÷ 15 = 20. You are paying Tk 20 for every Tk 1 of annual earnings.",
    },
    {
      question: "Two companies: Company A has P/E of 8. Company B has P/E of 35. Everything else being equal, which appears cheaper?",
      options: [
        "Company B — lower price per share",
        "Company A — you pay less for each unit of earnings",
        "They are the same — P/E doesn't indicate value",
        "Cannot determine without knowing the share price",
      ],
      correctIndex: 1,
      explanation:
        "P/E measures what you pay per unit of earnings, not per share. Company A at P/E 8 means you pay Tk 8 for each Tk 1 of profit — much cheaper than Company B at Tk 35 per Tk 1 of profit.",
    },
    {
      question: "A stock pays Tk 8 dividend annually and trades at Tk 160. What is the dividend yield?",
      options: ["1.25%", "5%", "8%", "20%"],
      correctIndex: 1,
      explanation:
        "Dividend yield = Tk 8 ÷ Tk 160 × 100 = 5%. This is the annual cash return you receive purely from dividends, independent of share price changes.",
    },
    {
      question: "Why should you check a company's multi-year EPS trend rather than just the most recent EPS?",
      options: [
        "Older EPS numbers are more accurate than recent ones",
        "A single year's profit can be exceptional or exceptionally bad — the trend shows whether growth is consistent",
        "BSEC requires investors to check historical EPS",
        "EPS is only meaningful when compared to a competitor",
      ],
      correctIndex: 1,
      explanation:
        "One good year can be coincidental. Five years of rising EPS suggests the company is structurally improving. One bad year in a rising trend might be temporary. The trend tells the story better than any single data point.",
    },
    {
      question: "True or False: A stock trading below its NAV is always a good buy.",
      options: [
        "True — you're buying assets for less than they're worth",
        "False — below-NAV can indicate the market doesn't trust the stated asset values, or the company is genuinely poor quality",
      ],
      correctIndex: 1,
      explanation:
        "Below NAV sounds like a bargain, but it can mean the market knows something. Bangladesh has a history of inflated asset valuations. A company trading at 50% of NAV might be cheap — or the NAV might be overstated. Use it as one signal among several.",
    },
  ],

  whatsNext: {
    nextModuleId: "z6-5",
    preview:
      "Numbers understood. One question left: how much of your money should actually go into stocks?",
  },
};

// ─── MODULE Z6-5 ─────────────────────────────────────────────
export const moduleZ6_5: Module = {
  id: "z6-5",
  zoneId: "zone-6",
  title: "How much of your money should be in stocks?",
  tagline: "Risk tolerance, time horizon, and the honest answer for most people.",
  estimatedMinutes: 11,

  hook: `"The most dangerous moment in investing is when you've just learned enough to be confident but not enough to be careful. Stocks can genuinely build wealth over long periods. They can also wipe out years of savings if you invest more than you can afford to lose, need the money at the wrong time, or panic-sell when prices fall. This module is about position-sizing — the question most beginner investors never ask."`,

  context: `Most financial education focuses on how to invest in stocks. Very little focuses on how much to invest in stocks relative to everything else you have and owe. Position sizing — deciding what fraction of your total savings belongs in equities — is one of the most important and least discussed decisions in personal finance.`,

  teaching: `
## Two concepts you must understand first

**Risk tolerance** — your psychological ability to watch your investment drop 30% without panic-selling. This is partly personality and partly experience. Most people overestimate their tolerance until they actually see the loss.

**Risk capacity** — your financial ability to absorb a loss without it materially affecting your life. Someone with a 6-month emergency fund, no high-interest debt, and a stable job can absorb a stock market drop much better than someone without those.

Risk tolerance and risk capacity are different. You might be psychologically comfortable with risk (high tolerance) but financially unable to sustain a loss (low capacity). Your actual position in stocks should be limited by whichever is lower.

## The time horizon rule

Stocks are a long-term instrument. By long term, most research suggests a minimum holding period of 5 years — ideally 7-10 years or more. Over short periods (1-3 years), stock prices are volatile and unpredictable. Over long periods, fundamentally sound companies tend to reflect their actual business value.

The rule: **money you might need within 3 years should not be in stocks.** Your emergency fund — savings account. Your short-term goal money — FDR or Sanchaypatra. Only money with a genuinely long horizon belongs in equities.

## A simple allocation framework

There is no universal right answer, but here is a reasonable starting framework for a young Bangladeshi earner:

**Before investing in stocks, ensure:**
- Emergency fund is fully funded (3-6 months of expenses)
- No high-interest debt (credit cards, informal loans above 15%)
- Basic savings products in place (DPS or Sanchaypatra for medium-term goals)

**Then, equity allocation by situation:**
- Age 20s, stable income, no dependents: up to 20-30% of long-term savings in stocks
- Age 20s, supporting family, variable income: 10-15% maximum
- Any age, not yet financially stable: 0% — build the foundation first

These are guidelines, not rules. The key principle: stocks should be the last layer added to a financial plan, not the first.

## Diversification within stocks

Within your equity allocation, diversify across:
- At least 5-8 different companies (reduces single-company risk)
- Different sectors (banking, pharmaceuticals, telecoms, consumer goods)
- No single stock should be more than 20-25% of your equity portfolio

On the DSE, you do not need 50 stocks to be diversified. Given the limited quality universe, 8-12 well-researched A-category companies across sectors is reasonable diversification.

## The mistake to avoid above all others

Investing money in stocks that you cannot afford to have locked up or potentially reduced in value. The forced seller is always the loser — someone who bought good stocks but needs the money when prices are down. The market does not care about your timing needs. Position sizing correctly means you are never a forced seller.
  `,

  bdExample: `Kamal earns Tk 60,000/month. He has a 3-month emergency fund (Tk 1.5 lakh), no debt, and a DPS running for 2 years. He has Tk 3 lakh in savings he does not need for at least 7 years. His situation: young, stable income, financial base in place. A reasonable equity allocation: Tk 60,000-90,000 (20-30% of his long-term savings) across 6-8 quality DSE stocks. He starts with Tk 10,000-15,000 in each of 6 companies — enough to learn with real money, small enough that a 50% loss would not derail his financial plan. Three years later, with more knowledge and experience, he can increase his allocation.`,

  actionPrompt: {
    text: "Before any stock investment: are your emergency fund fully funded and high-interest debts cleared? If yes, what percentage of your current long-term savings would fit the framework in this module?",
    ctaButtonText: "I assessed my stock readiness",
  },

  quiz: [
    {
      question: "What is the difference between risk tolerance and risk capacity?",
      options: [
        "They mean the same thing",
        "Risk tolerance is psychological comfort with loss; risk capacity is the financial ability to sustain a loss",
        "Risk tolerance is for stocks; risk capacity is for bonds",
        "Risk capacity is regulated by BSEC; risk tolerance is personal",
      ],
      correctIndex: 1,
      explanation:
        "You can be comfortable with the idea of loss (high tolerance) but financially unable to absorb it (low capacity). Your equity allocation should be limited by whichever is lower.",
    },
    {
      question: "What is the minimum recommended time horizon for money invested in stocks?",
      options: [
        "6 months",
        "1-2 years",
        "At least 3-5 years, ideally 7-10 years",
        "Time horizon doesn't matter for stocks",
      ],
      correctIndex: 2,
      explanation:
        "Short-term stock prices are volatile and unpredictable. Long-term, fundamentally sound companies tend to reflect actual business value. Money you might need within 3 years should not be in stocks.",
    },
    {
      question: "Which condition should be met BEFORE putting money into stocks?",
      options: [
        "Having read at least 5 books on investing",
        "Having a fully funded emergency fund and no high-interest debt",
        "Having at least Tk 5 lakh to invest",
        "Having a broker recommendation",
      ],
      correctIndex: 1,
      explanation:
        "Stocks are the last layer of a financial plan, not the first. Without an emergency fund, any financial shock forces you to sell stocks at the worst possible time — when you need money most, which is often when markets are down.",
    },
    {
      question: "Why is the 'forced seller' always at a disadvantage in the stock market?",
      options: [
        "Forced sellers pay higher brokerage commission",
        "Someone who must sell due to a financial need has no choice about timing — they may be forced to sell good stocks at depressed prices",
        "Forced sellers cannot access the DSE directly",
        "BSEC restrictions prevent forced sellers from getting fair prices",
      ],
      correctIndex: 1,
      explanation:
        "The market doesn't care about your financial needs. Someone who needs money during a market downturn must sell at low prices regardless of how good their stocks fundamentally are. Proper position sizing means you are never in this position.",
    },
    {
      question: "For reasonable diversification on the DSE quality universe, what is a practical approach?",
      options: [
        "Buy as many stocks as possible to maximize diversification",
        "Focus all money on the single best company you have researched",
        "Hold 8-12 well-researched A-category companies across different sectors",
        "Only buy stocks that are in the DSEX benchmark index",
      ],
      correctIndex: 2,
      explanation:
        "Given the DSE's limited quality universe, 8-12 companies across sectors provides meaningful diversification without the complexity of tracking too many positions. No single stock should exceed 20-25% of the equity portion of your portfolio.",
    },
  ],

  whatsNext: {
    nextModuleId: null,
    preview:
      "Zone 6 complete. You understand what stocks are, what the DSE actually looks like, how to open a BO account, how to read basic fundamentals, and how to position-size appropriately. Choose your next zone.",
  },
};

export const zone6Modules = [
  moduleZ6_1,
  moduleZ6_2,
  moduleZ6_3,
  moduleZ6_4,
  moduleZ6_5,
];
