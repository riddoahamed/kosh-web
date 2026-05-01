import type { Module } from "@/types/curriculum";

// ─────────────────────────────────────────────────────────────
// ZONE 7 — BEHAVIOURAL FINANCE & PSYCHOLOGY
// 5 modules. Advanced difficulty tier.
// Prerequisite: Any 2 zones completed.
//
// This is Kosh's most distinctive content zone.
// Content philosophy:
// - Universal psychological research first
// - Then specific Bangladesh/emerging market applications
// - Module 7-4 is the one "edgy, Gen Z, honest, funny" module
//   about social media and finfluencer culture
// - Mini-games lean heavily toward interactive simulations of bias
// ─────────────────────────────────────────────────────────────

export const z7Game1 = {
  type: "scenario_verdict" as const,
  title: "Loss Aversion in Action: Which Would You Choose?",
  instructions:
    "Two options are presented. Pick the one you would actually choose — not the one you think is 'correct.' There is no wrong answer. The result reveals something about your psychology.",
  items: [
    {
      scenario:
        "Option A: A guaranteed gain of Tk 5,000.\nOption B: A 50% chance of gaining Tk 12,000 and a 50% chance of gaining nothing.",
      correct: "A",
      explanation:
        "Most people pick A — even though B has a higher expected value (Tk 6,000 on average). This is normal. We prefer certainty to risk when choosing between gains. Note this preference for later.",
    },
    {
      scenario:
        "Option A: A guaranteed loss of Tk 5,000.\nOption B: A 50% chance of losing Tk 12,000 and a 50% chance of losing nothing.",
      correct: "B",
      explanation:
        "Most people pick B here — even though A has a lower expected loss. When losses are involved, we become risk-seeking to avoid a certain loss. This is the core of loss aversion: we treat equivalent losses as worse than equivalent gains.",
    },
    {
      scenario:
        "You bought a stock at Tk 200. It is now at Tk 140. An analyst says the business fundamentals are unchanged. What do you do?",
      correct: "Hold or buy more if your analysis still holds",
      explanation:
        "Most people hold hoping to 'get back to even.' This is loss aversion combined with the sunk cost fallacy. The right question is not 'how do I recover my loss?' but 'is this stock worth Tk 140 today based on its fundamentals?' Those are different questions.",
    },
  ],
  mangoReward: 35,
};

export const z7Game2 = {
  type: "order_steps" as const,
  title: "The Herd Behavior Cycle: Put It in Order",
  instructions:
    "This is the typical sequence of a market bubble driven by herd behavior. Tap the events in the correct chronological order.",
  steps: [
    "A sector (or market) starts genuinely performing well — early investors profit",
    "Stories of gains spread — friends, social media, news coverage amplify the narrative",
    "Late investors rush in, not because of fundamentals, but because 'everyone else is making money'",
    "Prices rise well above what business fundamentals justify",
    "Early investors and smart money start selling quietly",
    "Prices begin to fall — panic sets in and late investors sell at losses",
  ],
  correctOrder: [0, 1, 2, 3, 4, 5],
  explanation:
    "This is the standard bubble-and-crash cycle driven by herd behavior. Bangladesh's 2010 stock market crash followed this exact pattern. Crypto bull runs follow it. Real estate bubbles follow it. Recognizing which stage you're in is the key skill. By the time something is on the news and everyone is talking about it, you are usually in stage 3 or 4.",
  mangoReward: 30,
};

export const z7Game3 = {
  type: "calculator_reveal" as const,
  title: "Anchoring: What Did You Just Think?",
  instructions:
    "A stock's 52-week high was Tk 400. It now trades at Tk 240. Without looking anything else up — does Tk 240 feel 'cheap' or 'expensive' to you? Enter the number you think the stock is 'really worth' based on this information alone.",
  correctAnswer: null,
  unit: "Tk",
  isReflection: true,
  explanation:
    "Whatever number you entered was almost certainly anchored to Tk 400. The 52-week high has zero logical bearing on what the stock is worth today — but research shows that initial numbers bias almost all subsequent estimates, even when people know the anchor is irrelevant. A stock down 40% from its high is not necessarily cheap. It might deserve to be down 40%. Always ask: what does the company actually earn? Not: what was the price before?",
  mangoReward: 25,
};

// ─── MODULE Z7-1 ─────────────────────────────────────────────
export const moduleZ7_1: Module = {
  id: "z7-1",
  zoneId: "zone-7",
  title: "Loss aversion: why losing Tk 1,000 hurts more than gaining Tk 1,000",
  tagline: "The bias that costs retail investors more than any other.",
  estimatedMinutes: 11,

  hook: `"Daniel Kahneman won the Nobel Prize in Economics for proving that most of what economists assumed about human decision-making is wrong. The most important thing he proved: losing Tk 1,000 hurts approximately twice as much psychologically as gaining Tk 1,000 feels good. This asymmetry is not weakness or irrationality. It is hardwired into most human brains. And it costs investors enormous amounts of money."`,

  context: `Behavioural finance is the field that studies the gap between how people actually make financial decisions and how classical economics assumed they would. The field emerged in the 1970s and 1980s when researchers like Kahneman and Tversky began documenting systematic, predictable errors in human judgment. Understanding these errors does not make you immune to them — but it makes you far more likely to catch yourself before they cost you money.`,

  teaching: `
## What loss aversion actually means

Kahneman and Tversky's prospect theory (1979) established that losses and gains of the same objective size feel very different psychologically. Specifically: the emotional pain of losing Tk 1,000 is roughly twice as intense as the pleasure of gaining Tk 1,000.

This is why:
- People hold losing investments too long ("I'll wait until I get back to even")
- People sell winning investments too early ("I should lock in my profit before it disappears")
- People avoid good investments because of the possibility of loss, even when the expected return is clearly positive

None of these behaviors is irrational from an emotional standpoint. All of them are costly from a financial standpoint.

## The 'get back to even' trap

This is loss aversion's most expensive manifestation in stock investing. A stock bought at Tk 300 falls to Tk 180. The investor holds — not because they believe in the company, but because selling would "make the loss real." They wait. The stock falls to Tk 90. Now selling feels even more impossible.

The correct framework: the purchase price is irrelevant to whether you should hold today. What matters is: at Tk 180, is this company worth owning? If yes (based on fundamentals), hold or buy more. If no, sell — regardless of what you paid. The market does not know or care what you paid.

## Loss aversion in savings decisions

Loss aversion does not only affect stock investors. It affects anyone who has to choose between a certain small return and a potentially larger but uncertain return. The bias toward certainty causes people to accept poor risk-adjusted returns — sitting in 5% savings accounts rather than exploring instruments with better risk-adjusted returns — because the possibility of loss, however small, feels disproportionately bad.

## The practical antidote

**Pre-commitment:** Before buying any investment, write down the conditions under which you would sell. Define your exit criteria when you are emotionally neutral — not when you are watching the price move. Stick to the written criteria.

**Separate the decision from the money.** The question "should I sell this stock?" should be answered by the same analysis you would use if you were deciding whether to buy it fresh today at today's price. What you paid is literally irrelevant to that question.

**Track your decisions, not your portfolio value.** Checking your portfolio daily encourages loss aversion. Tracking your investment rationale and whether the fundamentals have changed is more useful and far less emotionally damaging.
  `,

  bdExample: `Reza bought shares in a construction company in 2022 at Tk 180, believing in the Bangladesh infrastructure boom. By late 2023, the company had reported accounting irregularities and the stock fell to Tk 95. The fundamentals were broken. But Reza held — he couldn't bear locking in a Tk 85 loss. By 2024 the stock was at Tk 40. His colleague Farida bought the same stock at the same time, noticed the accounting red flags early, sold at Tk 120 (a Tk 60 loss), and reinvested in a dividend-paying pharmaceutical company. One year later, Farida's portfolio was recovering. Reza had crystallized an 80% loss. The difference: Farida treated the sell decision as a new buy decision. Reza was trying to recover a sunk cost.`,

  actionPrompt: {
    text: "Look at any investment you currently hold (stocks, DPS, or any financial decision you've made). Write down why you would still make that decision today — not why you made it before. Is the reasoning still valid?",
    ctaButtonText: "I re-evaluated a current holding",
  },

  game: z7Game1,

  quiz: [
    {
      question: "Kahneman and Tversky's research found that the pain of losing Tk 1,000 feels approximately how intense compared to the pleasure of gaining Tk 1,000?",
      options: [
        "The same — gains and losses feel equal",
        "Half as intense — gains feel twice as good",
        "Twice as intense — losses feel twice as bad",
        "Three times as intense",
      ],
      correctIndex: 2,
      explanation:
        "Prospect theory established that losses feel approximately twice as painful as equivalent gains feel pleasurable. This is not weakness — it is a documented feature of human psychology that affects most people regardless of intelligence or experience.",
    },
    {
      question: "You bought a stock at Tk 400. It is now at Tk 250. You are deciding whether to sell. Which information is relevant to that decision?",
      options: [
        "The Tk 400 purchase price — you need to recover that loss",
        "The current business fundamentals, earnings trend, and whether you would buy at Tk 250 fresh today",
        "How long you have held the stock",
        "Whether the price is likely to recover to Tk 400",
      ],
      correctIndex: 1,
      explanation:
        "The purchase price is sunk — it is gone regardless of what you do next. The only relevant question is whether the stock is worth owning at Tk 250 today, based on current fundamentals. Framing it this way strips out loss aversion from the decision.",
    },
    {
      question: "What is the 'get back to even' trap?",
      options: [
        "Trying to buy more of a falling stock to average down",
        "Holding a losing investment not because of its merits but to avoid crystallizing a loss — often resulting in larger losses",
        "Selling a winning stock too early to 'lock in profit'",
        "Comparing your returns to the market index",
      ],
      correctIndex: 1,
      explanation:
        "Holding to 'get back to even' is loss aversion in action. The investment's previous high price has no bearing on its future performance. Waiting for a recovery that may not come, while ignoring the opportunity cost of better alternatives, is a classic and expensive mistake.",
    },
    {
      question: "The best practical tool for reducing loss aversion's impact on investment decisions is:",
      options: [
        "Checking your portfolio multiple times daily to stay aware",
        "Pre-committing in writing to your exit criteria before making the investment",
        "Setting a mental stop-loss in your head",
        "Diversifying across many investments",
      ],
      correctIndex: 1,
      explanation:
        "Written, pre-committed exit criteria set when you are emotionally neutral are much more effective than in-the-moment decisions. When you are watching the price fall, loss aversion takes over. A written criterion removes the emotional decision-making from the equation.",
    },
    {
      question: "Loss aversion affects which financial decisions?",
      options: [
        "Only stock market decisions",
        "Only decisions involving large sums of money",
        "Virtually all financial decisions involving uncertainty, including savings allocation and insurance choices",
        "Only decisions made by inexperienced investors",
      ],
      correctIndex: 2,
      explanation:
        "Loss aversion is a broad cognitive bias affecting decisions across finance, health, relationships, and daily life. It influences whether people take up better-returning investments, whether they buy insurance, and how they negotiate. Awareness reduces but does not eliminate its effect.",
    },
  ],

  whatsNext: {
    nextModuleId: "z7-2",
    preview:
      "You understand loss aversion. Next: why you probably pay too much attention to the first number you see.",
  },
};

// ─── MODULE Z7-2 ─────────────────────────────────────────────
export const moduleZ7_2: Module = {
  id: "z7-2",
  zoneId: "zone-7",
  title: "Anchoring: the first number you see changes everything",
  tagline: "How irrelevant numbers bias every estimate you make.",
  estimatedMinutes: 10,

  hook: `"In a famous experiment, researchers spun a wheel of fortune that landed on either 10 or 65. Then they asked people: what percentage of African countries are in the United Nations? People who saw 10 guessed around 25%. People who saw 65 guessed around 45%. The wheel of fortune had nothing to do with the question. The number still changed the answer. This is anchoring — and it is one of the most powerful biases in financial decision-making."`,

  context: `Anchoring is the tendency to rely too heavily on the first piece of information encountered when making decisions. In investing, the anchor is almost always a price — the price you paid, the 52-week high, the IPO price, the round number milestone. These anchors shape expectations and decisions even when logically they have no bearing on what something is worth today.`,

  teaching: `
## How anchoring works

When you first encounter a number, it becomes a reference point that all subsequent estimates are measured against. You adjust away from the anchor, but rarely enough. Even when you know the anchor is arbitrary or irrelevant, research shows it still exerts influence.

This was demonstrated repeatedly by Kahneman and Tversky and has been replicated in hundreds of studies across cultures, professions, and demographics. Experts anchor just like novices — they are just slightly better at adjusting away from the anchor. Not immune.

## Anchoring in investing

**The 52-week high anchor:** A stock that traded at Tk 400 six months ago and is now at Tk 240 feels "cheap" to many investors — purely because of the Tk 400 anchor. But whether Tk 240 is cheap or expensive has nothing to do with Tk 400. It depends entirely on what the company earns today.

**The purchase price anchor:** An investor who bought at Tk 300 anchors their expectation of "fair value" to Tk 300. They wait for the stock to return to Tk 300 before considering selling — even if the business has fundamentally changed.

**The round number anchor:** Stocks often stall at round numbers (Tk 100, Tk 200, Tk 500) because many investors place buy and sell orders at round numbers due to their psychological significance. This is an anchoring effect creating real market patterns.

**The IPO price anchor:** When a stock IPOs at Tk 150 and trades up to Tk 300, investors who missed the IPO feel it is "expensive." When it falls back to Tk 180, they feel it is "cheap." Both judgments are anchored to Tk 150 — an often arbitrary pricing decision made during the IPO process.

## Anchoring in salary negotiation

Not just investing — anchoring affects every financial negotiation. The first number mentioned in a salary discussion becomes the anchor for the entire negotiation. This is why experienced negotiators are coached to make the first offer (set the anchor favorably) and why counteroffers should be substantively different from the initial anchor, not just slightly adjusted.

## How to reduce anchoring

**Ask a different question.** Instead of "is this cheap relative to the 52-week high?", ask "what would I pay for this company based on its current earnings?" Force yourself to build the valuation from fundamentals up, not from the anchor down.

**Generate your estimate before looking at the price.** In investment analysis: estimate what a company is worth based on its fundamentals, then compare to the market price. Most investors do the opposite — see the price first, then rationalize it.

**Notice the anchors around you.** When a salesperson says "this was Tk 5,000, now only Tk 3,200," the Tk 5,000 is an anchor. When an analyst report says "target price Tk 250," the Tk 250 anchors your perception of value. Be aware that these anchors exist and deliberately question them.
  `,

  bdExample: `A real estate developer in Dhaka advertised apartments with "list price Tk 80 lakh — now available at Tk 62 lakh." The original Tk 80 lakh was strategically chosen to anchor buyers' sense of value. Analysis of comparable apartments in the same area showed actual market value was approximately Tk 58-65 lakh. The "discount" was largely manufactured through the anchor. Buyers who researched comparable prices independently and ignored the stated list price were in a much stronger negotiating position than those who felt they were getting a good deal relative to Tk 80 lakh.`,

  actionPrompt: {
    text: "Think of a recent financial decision — a purchase, an investment, a salary negotiation. What was the first number you heard? How much did that number influence your final decision or expectation?",
    ctaButtonText: "I identified an anchor in a recent decision",
  },

  game: z7Game3,

  quiz: [
    {
      question: "In Kahneman's wheel-of-fortune experiment, why did the random number on the wheel affect people's answers?",
      options: [
        "People were cheating by using the wheel as a hint",
        "The random number anchored their estimate — they adjusted from it, but not enough",
        "The experiment was flawed",
        "People with higher education were not affected",
      ],
      correctIndex: 1,
      explanation:
        "The anchor — even a demonstrably random one — influenced all subsequent estimates. People knew the wheel was random. They still anchored to it. This is the core finding: anchoring is largely automatic and not easily overridden by knowing it exists.",
    },
    {
      question: "A stock was at Tk 350 six months ago. It is now at Tk 200. An investor says it is 'cheap.' What is the error in this reasoning?",
      options: [
        "There is no error — stocks below their highs are always cheaper",
        "The investor is anchoring to Tk 350, which has no bearing on whether Tk 200 represents fair value today",
        "The investor should compare to the 52-week low, not the high",
        "The investor needs more information about other stocks to judge cheapness",
      ],
      correctIndex: 1,
      explanation:
        "Whether Tk 200 is cheap depends entirely on what the company earns and is worth today — not on what the price was previously. The previous price is an anchor, not a reference for current fair value.",
    },
    {
      question: "The best way to reduce anchoring's effect on an investment decision is to:",
      options: [
        "Ignore the current stock price and only look at historical prices",
        "Estimate fundamental value independently from the bottom up, before looking at the current market price",
        "Use the analyst consensus price target as your anchor",
        "Average together multiple anchors to find a better estimate",
      ],
      correctIndex: 1,
      explanation:
        "Building a valuation estimate from fundamentals (earnings, growth, dividends) before seeing the market price forces the analysis to be grounded in business reality. Once you see a price, it anchors you. Do the analysis first.",
    },
    {
      question: "In salary negotiation, who benefits from making the first offer?",
      options: [
        "The employee — it shows confidence",
        "The employer — they have more information",
        "Whoever makes the first offer sets the anchor and typically ends up with a better outcome",
        "Neither — the final salary is always predetermined",
      ],
      correctIndex: 2,
      explanation:
        "The first number in any negotiation becomes the anchor that all subsequent discussion is measured against. Research consistently shows that the party who makes the first offer — whether high or low — gains a negotiating advantage because their number shapes the entire discussion.",
    },
    {
      question: "True or False: Experts are immune to anchoring because their domain expertise overrides the bias.",
      options: [
        "True — expertise and experience eliminate anchoring",
        "False — experts anchor too; they simply adjust slightly more than novices. The bias persists across expertise levels.",
      ],
      correctIndex: 1,
      explanation:
        "Studies on doctors, judges, real estate agents, and experienced investors all show persistent anchoring effects despite expertise. Experts adjust more from anchors but are not immune. Awareness and specific debiasing techniques reduce — but do not eliminate — the effect.",
    },
  ],

  whatsNext: {
    nextModuleId: "z7-3",
    preview:
      "You anchor to numbers. You also follow crowds. The next module explains exactly why — and what it costs.",
  },
};

// ─── MODULE Z7-3 ─────────────────────────────────────────────
export const moduleZ7_3: Module = {
  id: "z7-3",
  zoneId: "zone-7",
  title: "Herd behavior: why everyone bought at the top and sold at the bottom",
  tagline: "Social proof is useful for restaurants. Catastrophic for investing.",
  estimatedMinutes: 11,

  hook: `"In December 2010, the Dhaka Stock Exchange saw individual investors selling household items, taking out loans, and quitting jobs to trade stocks — because everyone was making money. Two months later, the market had crashed by 30%. The same story plays out in every asset bubble in history: tulips in 1637 Amsterdam, dot-com stocks in 2000, US housing in 2008, crypto in 2021. The pattern is identical. The emotion driving it is identical. The outcome is identical."`,

  context: `Herd behavior in finance refers to the tendency to follow the crowd — to buy because others are buying and sell because others are selling — regardless of independent analysis. It is not stupidity. It is a deeply rational response to social uncertainty: when you are unsure what to do, copying what others are doing is often a good survival strategy. In investing, it is almost always the wrong strategy.`,

  teaching: `
## Why herding happens

Humans are social animals. For most of our evolutionary history, following the group was safe: if everyone was running from something, you should probably run too. If everyone was gathering around a food source, you should join. Social proof — using other people's behavior as information — is a useful heuristic in daily life.

In financial markets, this instinct produces exactly the wrong behavior. Markets are not predators or food sources. When "everyone is buying," prices are usually already high. When "everyone is selling," prices are usually already low. Following the crowd in markets consistently means buying expensive and selling cheap.

## The information cascade

Herding often begins as rational information gathering. Investor A has done research and buys a stock. Investor B notices A buying, assumes A has information, and also buys — even without independent research. Investor C sees both A and B buying and follows. An "information cascade" develops where subsequent investors are following the crowd rather than evaluating the underlying investment. The cascade continues until a triggering event causes the crowd to suddenly sell.

The problem: by the time the cascade is visible — by the time everyone is talking about an investment — most of the price appreciation has usually already happened. The crowd arrives late and exits in panic.

## The cycle in Bangladesh's stock market

Bangladesh's 2010 crash is a textbook information cascade. Genuine early gains in the market attracted more investors. Media coverage amplified the narrative. Retail investors who had never owned stocks before opened BO accounts. Companies with no earnings saw their share prices triple. The fundamental disconnect became extreme — stock prices were multiples of what the underlying businesses could ever justify. When prices began to fall, the same crowd that had driven them up simultaneously sold, creating a self-reinforcing collapse.

The same dynamic has played out repeatedly in crypto markets, where FOMO (fear of missing out) drives late investors to buy near the top, followed by panic selling when the narrative shifts.

## Herding in everyday financial decisions

Herding is not limited to stock markets:
- Buying property because "everyone is buying property and prices only go up"
- Choosing a business to start because "this sector is hot right now"
- Moving savings into gold because "gold is going up and everyone is talking about it"
- Joining an investment scheme because "10 of your friends are already in it"

The common thread: the decision is driven by what others are doing, not by independent evaluation of the opportunity.

## Counter-cyclical thinking

The deliberate antidote to herding is asking: "If everyone is excited about this, is the best opportunity already gone?" When an investment appears in mainstream news, on social media, and in casual conversation, you are almost certainly late to the opportunity — not early.

Warren Buffett's rule: "Be fearful when others are greedy, and greedy when others are fearful." This is psychologically difficult precisely because it requires going against the herd. But it is consistently correct.
  `,

  bdExample: `In 2021, a significant number of Bangladeshi retail investors poured money into cryptocurrency through various channels (mostly through P2P and informal means, since direct crypto trading is not legally permitted). The primary motivation was seeing others profit and fearing missing out. By the time most retail participants entered, Bitcoin had already risen from $10,000 to $65,000. When the market corrected to $16,000, the late arrivals absorbed most of the loss. The early entrants — who bought based on fundamental analysis of a new asset class and sold into the hype — kept their gains. Timing driven by the crowd versus timing driven by analysis produced opposite outcomes.`,

  actionPrompt: {
    text: "Recall a financial decision you made (or nearly made) because others were doing it. What was the outcome? What would independent analysis have suggested at the time?",
    ctaButtonText: "I reflected on a herd behavior moment",
  },

  game: z7Game2,

  quiz: [
    {
      question: "Why does herd behavior produce consistently poor financial outcomes even when individual investors are not irrational?",
      options: [
        "Crowds have less financial knowledge than individual experts",
        "Following the crowd in markets means buying after prices are high and selling after prices have fallen — consistently buying expensive and selling cheap",
        "Herding is only harmful in emerging markets like Bangladesh",
        "Herd behavior is irrational and therefore harmful",
      ],
      correctIndex: 1,
      explanation:
        "By the time an investment is widely discussed and adopted, most appreciation has occurred. Herders arrive late (buying high) and leave simultaneously in panic (selling low). The crowd's collective timing is nearly always wrong, even when individual members are not unintelligent.",
    },
    {
      question: "An 'information cascade' in financial markets refers to:",
      options: [
        "A rapid flow of financial news through media channels",
        "A chain reaction where investors copy each other rather than do independent analysis, creating momentum divorced from fundamentals",
        "The cascade of losses during a market crash",
        "BSEC's process for releasing market information",
      ],
      correctIndex: 1,
      explanation:
        "Information cascades occur when each new investor decides based on what previous investors did, rather than independent evaluation. The crowd's behavior replaces analysis. The price can rise (or fall) far beyond what fundamentals justify.",
    },
    {
      question: "Warren Buffett's counter-cyclical rule ('be fearful when others are greedy, greedy when others are fearful') is psychologically difficult because:",
      options: [
        "It requires advanced financial knowledge most investors do not have",
        "It requires acting against social proof — which triggers discomfort and social risk in addition to financial risk",
        "It only works in developed markets, not Bangladesh",
        "It has been proven wrong in several market cycles",
      ],
      correctIndex: 1,
      explanation:
        "Being greedy when everyone is fearful means buying when markets are collapsing and news is terrible — a position that feels socially and emotionally wrong even when intellectually correct. Being fearful when others are greedy means missing out on gains others appear to be making. Both require going against powerful social instincts.",
    },
    {
      question: "What signal indicates that an investment opportunity is likely past its best entry point?",
      options: [
        "The investment is being discussed in mainstream media, casual conversation, and social media simultaneously",
        "The investment has doubled in value recently",
        "Professional analysts have issued buy recommendations",
        "The investment is available through a major bank",
      ],
      correctIndex: 0,
      explanation:
        "Mainstream cultural saturation — news, social media, and casual conversation all discussing an investment — is a strong indicator that late-stage crowd participation has driven prices up. Early opportunities are not being discussed everywhere. By the time they are, most of the return has been captured by early entrants.",
    },
    {
      question: "Herding applies to which types of financial decisions?",
      options: [
        "Only stock market trading",
        "Only decisions made by retail investors",
        "Virtually all financial decisions influenced by social observation — property, business choices, savings products, investment schemes",
        "Only decisions made by people without financial education",
      ],
      correctIndex: 2,
      explanation:
        "Herding is a domain-general bias that affects property markets, business timing, consumer goods, savings instrument choices, and investment schemes — not just stocks. The mechanism (using others' behavior as a signal) is the same across contexts.",
    },
  ],

  whatsNext: {
    nextModuleId: "z7-4",
    preview:
      "Loss aversion, anchoring, herding. But what happens when social media turns all three up to maximum? This next module does not hold back.",
  },
};

// ─── MODULE Z7-4 (The edgy, Gen Z, honest one) ────────────────
export const moduleZ7_4: Module = {
  id: "z7-4",
  zoneId: "zone-7",
  title: "The finfluencer problem: why your feed is making you poorer",
  tagline: "They're not lying. They're just not telling you the full story.",
  estimatedMinutes: 12,

  hook: `"Here's something nobody in the financial education space will say directly: most finance content on Instagram, YouTube, and TikTok is optimized to make you feel informed while keeping you just confused enough to need the creator's course, app, or affiliate product. Not because the creators are evil. Because that is literally how the attention economy works. This module is the one that breaks down how it works and what to do about it."`,

  context: `This module is different from the others. It is less about investing theory and more about the information environment young investors in Bangladesh and globally actually navigate. The research is clear: finfluencers significantly influence Gen Z investment decisions, often in ways that amplify behavioral biases rather than reduce them. Understanding the mechanics of financial social media is a legitimate financial literacy skill.`,

  teaching: `
## How financial social media actually works

Financial content creators on Instagram, YouTube, and TikTok are optimized by algorithms for one thing: engagement. Engagement means comments, shares, saves, and time spent. 

Content that generates high engagement tends to share specific characteristics:
- Bold claims ("this stock will 3x")
- Emotional stakes ("I turned Tk 10,000 into Tk 3 lakh")
- Simplification that feels empowering ("the secret they don't want you to know")
- Fear or FOMO ("act before it's too late")

Notice that none of these characteristics correlate with the content actually being correct or useful. A creator who consistently says "this is complex and the right answer depends on your specific situation" will have far fewer followers than one who gives confident, simple, actionable-sounding advice.

## Survivor bias in finfluencer content

Most finance influencers built their audience by sharing wins. The losses are either not shown, not disclosed, or framed as "learning experiences" that led to eventual success. When you see a creator's journey from "I knew nothing about money" to "I'm financially free," you are seeing a curated highlight reel.

Research on retail investor outcomes consistently shows that the vast majority of active traders lose money over time. But you do not see content from the people who followed financial social media advice and lost their savings. They are not posting about it. You only see the survivors — which makes the strategy look far more reliable than it actually is.

## The finfluencer revenue model

Understanding how financial content creators make money helps you understand their incentives:

**Advertising:** Creators earn money when you watch ads on their content. More views = more revenue. This incentivizes volume and emotional content over accuracy.

**Affiliate marketing:** Creators earn commission when you sign up for a trading platform, broker, or financial app through their link. This creates a direct financial incentive to promote platforms regardless of whether those platforms are in your best interest.

**Courses and communities:** "Join my trading course for Tk 5,000" or "premium group with exclusive signals." The irony: if the strategy reliably works, selling it is irrational. The actual business model is selling the dream, not the strategy.

**Sponsored content:** Financial products, apps, and platforms pay creators to feature them. This is often disclosed (legally required in many markets) but the disclosure is frequently buried or minimized.

None of these revenue streams require the creator's financial advice to actually be correct.

## What finfluencers are not telling you

**They are not sharing their actual portfolio performance.** Screenshots of winning trades are easy. Audited, complete portfolio returns are rare. Studies of professional fund managers — who have actual incentives to perform and actual oversight — show that the majority underperform simple index funds over time. Retail finfluencers have no comparable performance accountability.

**They are amplifying your biases, not reducing them.** Confidence content amplifies overconfidence. FOMO content amplifies herding. "This is the only stock you need" content amplifies concentration risk. Loss aversion content often recommends holding losers too long. Good financial education should reduce these biases. Engagement-optimized content tends to exploit them.

**The disclaimers are real.** When a financial content creator says "this is not financial advice" — that disclaimer exists for a reason. It is legally protecting the creator from liability for the advice they just gave. Take the disclaimer as seriously as you take the advice.

## How to consume financial media without being exploited by it

**Verify claims independently before acting.** A creator says "this stock is going to rise 30%." Where is that analysis from? What assumptions does it rest on? Can you find the opposing case? If the only source is the creator's confidence, the claim is not evidence.

**Follow creators who explain their reasoning, not just their conclusions.** "Buy this" is worthless. "Here is how I valued this company, here are the assumptions, here is what would make me wrong" is useful.

**Track what happens after recommendations.** If you follow a creator who makes investment calls, actually track the performance of those calls over time. The result almost always reduces confidence in the creator.

**Use financial social media for education, not signals.** Understanding a concept (what is a P/E ratio?) from a well-made video is genuinely useful. Taking a specific trade or investment action based on social media without independent analysis is almost always the wrong move.
  `,

  bdExample: `A popular Instagram account in Bangladesh posts regularly about "passive income from the stock market" with screenshots of impressive monthly returns. The account has 180,000 followers. The account also sells a Tk 3,500 "stock market masterclass." Analysis of the specific trade calls posted publicly over 6 months showed: 4 calls that gained, 7 calls that lost, and several where the creator stopped posting updates entirely after the stock fell. The net performance of following all public calls was negative. The creator's income — from course sales and brand partnerships with two brokers — was substantial regardless of whether the recommendations made money for followers. The business model and the follower's interest are not aligned.`,

  actionPrompt: {
    text: "Pick one financial content creator you follow (Instagram, YouTube, anywhere). Find 3 specific investment calls they made more than 6 months ago. What happened to those recommendations? Be honest.",
    ctaButtonText: "I tracked a creator's past calls",
  },

  quiz: [
    {
      question: "Why does financial social media content tend to be overconfident and emotionally charged rather than nuanced and balanced?",
      options: [
        "Financial creators have poor academic training",
        "Content algorithms reward engagement (emotional content, bold claims) regardless of accuracy — creating incentive to produce confident-sounding content",
        "Complex financial concepts cannot be explained simply",
        "Regulators require simple language in financial content",
      ],
      correctIndex: 1,
      explanation:
        "Platform algorithms optimize for engagement. Bold claims, emotional stories, and FOMO-inducing content generate more comments, shares, and views than balanced, nuanced analysis. Creators who produce the former grow faster — regardless of whether their content is accurate.",
    },
    {
      question: "What is 'survivor bias' in the context of finfluencer success stories?",
      options: [
        "Creators surviving financial crashes through diversification",
        "Only people who succeeded with a strategy post about it — those who failed are invisible — making strategies look more reliable than they are",
        "Creators surviving algorithm changes on social media",
        "Investors who survived the 2010 DSE crash sharing their lessons",
      ],
      correctIndex: 1,
      explanation:
        "You see the people who succeeded with a strategy, not the majority who tried and failed. This makes the success rate appear much higher than it actually is. In finance, this is especially misleading because the downside stories are often never shared publicly.",
    },
    {
      question: "When a financial content creator says 'this is not financial advice,' what does this disclaimer actually mean?",
      options: [
        "The advice is too general to apply to your specific situation",
        "The creator is being modest about their knowledge",
        "The disclaimer protects the creator from legal liability — it should cause you to take the subsequent advice less seriously, not more",
        "The content has not been reviewed by financial regulators",
      ],
      correctIndex: 2,
      explanation:
        "The disclaimer exists to protect the creator legally. It is often placed immediately before or after specific advice — which creates the paradox of disclaiming advice while giving it. Treat the disclaimer as a signal: this is not professionally vetted guidance you can rely on.",
    },
    {
      question: "A creator's trading course costs Tk 4,000 and promises to teach 'the strategy I used to 10x my investment.' If the strategy reliably worked, why would selling it be irrational?",
      options: [
        "Teaching is more profitable than trading",
        "If the strategy reliably 10x'd investments, the creator could generate far more wealth by using it personally than by selling it for Tk 4,000",
        "Most trading strategies only work with very large capital",
        "Bangladesh regulations prevent traders from keeping all their profits",
      ],
      correctIndex: 1,
      explanation:
        "A genuinely reliable 10x strategy is worth more applied to capital than sold as a Tk 4,000 course. If someone with unlimited access to a reliable high-return strategy chooses to sell it to retail investors for a small fee, the rational explanation is that the strategy is not as reliable as claimed, or the real business model is course sales.",
    },
    {
      question: "What is the most useful way to consume financial content from social media creators?",
      options: [
        "Follow only creators with more than 100,000 followers — their popularity indicates reliability",
        "Use content to understand concepts and frameworks, but verify any specific investment claim independently before acting",
        "Only follow creators who are chartered financial analysts (CFA)",
        "Avoid all financial social media — the information is uniformly misleading",
      ],
      correctIndex: 1,
      explanation:
        "Financial social media can be genuinely useful for learning concepts, hearing different perspectives, and staying informed. The problem is taking specific investment calls without independent verification. Separate the educational value from the signal value — the former is real, the latter is usually unreliable.",
    },
  ],

  whatsNext: {
    nextModuleId: "z7-5",
    preview:
      "You know the biases. You know the information environment. Now: what does a decision-making process that actually accounts for all of this look like?",
  },
};

// ─── MODULE Z7-5 ─────────────────────────────────────────────
export const moduleZ7_5: Module = {
  id: "z7-5",
  zoneId: "zone-7",
  title: "Building a decision process that works despite your biases",
  tagline: "You cannot eliminate your biases. You can design around them.",
  estimatedMinutes: 10,

  hook: `"Every professional investor in the world — every hedge fund, every pension manager, every wealth advisor — uses a written process for investment decisions. Not because they are smarter than you. Because they know that smart people who trust their in-the-moment judgment consistently make worse decisions than people following a pre-committed systematic process. The process is the advantage."`,

  context: `Knowing about behavioral biases does not make you immune to them. Kahneman, who spent his career studying these biases, said in interviews that he still falls for many of them. The solution is not willpower or knowledge — it is system design. A pre-committed, written investment process acts as an external check that substitutes structure for unreliable in-the-moment judgment.`,

  teaching: `
## Why knowledge alone isn't enough

A study of experienced financial professionals — people who knew about anchoring, loss aversion, and overconfidence — found they were still significantly affected by these biases when making real decisions. Knowing about a bias is not the same as being able to override it in the moment.

This is because behavioral biases are largely automatic, system 1 processes (fast, emotional, intuitive) while applying corrective knowledge requires system 2 thinking (slow, deliberate, analytical). When emotions are running high — when a stock is crashing, when everyone else appears to be making money — system 2 is suppressed. The bias takes over.

The solution is to do the system 2 thinking in advance, when you are calm, and encode it in rules you commit to following regardless of how you feel in the moment.

## The pre-mortem technique

Before making any significant investment decision, conduct a pre-mortem: assume the investment has failed dramatically — imagine it is 18 months later and you have lost 50% of the amount invested. Now ask: what happened? What were the reasons this went wrong?

This exercise forces you to surface the risks you are likely to be minimizing due to overconfidence and optimism bias. It does not prevent you from making the investment — it ensures you have explicitly considered the downside scenarios rather than unconsciously filtering them out.

## The written investment thesis

For any investment in stocks, write down before buying:
1. Why this company is worth owning (specific business reasons)
2. What you believe the company is worth (your valuation)
3. What conditions would cause you to sell (price fall below X, fundamentals change in Y way)
4. What would prove your thesis wrong

The sell criteria in point 3 are the most important. When the stock falls 30%, you will not want to re-analyze objectively — loss aversion will make you want to hold. The pre-committed sell criteria remove the in-the-moment emotional decision.

## The waiting period rule

Impose a mandatory waiting period between deciding to make an investment and actually making it. Research on impulse decisions suggests that even a 48-72 hour delay significantly reduces decisions driven by emotion and social pressure.

For any investment above a certain size (set your own threshold), commit to waiting at least 72 hours after your decision. If the reasoning still holds after 72 hours, proceed. If urgency was driving the decision, 72 hours will reveal that urgency as artificial.

## The 'opposite argument' requirement

Before finalizing any investment decision, you must be able to articulate — in your own words — the strongest case against the investment. Why might this be a bad idea? What do smart investors who disagree with you believe?

This requirement counteracts confirmation bias (the tendency to seek information that confirms existing beliefs) and overconfidence. If you cannot clearly state the opposing case, your analysis is incomplete.

## Tracking decisions, not outcomes

Track the quality of your decisions separately from the outcomes. A good decision can produce a bad outcome (you correctly analyzed a company and it was blindsided by an external shock). A bad decision can produce a good outcome (you bought based on a tip and it happened to go up).

Tracking decisions against your written criteria over time reveals whether your process is working — independent of short-term market luck.
  `,

  bdExample: `Mita starts investing with a personal rule: she writes a one-page investment thesis for any stock she buys. In it, she commits: "I will sell if EPS falls for two consecutive quarters, or if the share price drops more than 40% while fundamentals remain sound." Six months after buying, her stock drops 25%. Without her written criteria, she would have panic-sold (below her 40% threshold) or frozen (loss aversion). Instead, she checks: has EPS fallen for two consecutive quarters? No. Is the business fundamentally sound? Yes. According to her pre-committed process, she holds. Twelve months later, the stock has recovered to her entry price and continued higher. Her process overrode her emotion — which would have had her sell at the worst moment.`,

  actionPrompt: {
    text: "Write a simple decision checklist for your next investment decision — even if it's just 3 questions you will answer before acting. Post it somewhere visible.",
    ctaButtonText: "I wrote my investment checklist",
  },

  quiz: [
    {
      question: "Why does knowing about behavioral biases not make you immune to them?",
      options: [
        "Financial knowledge is not relevant to behavioral biases",
        "Biases are largely automatic, fast processes — corrective knowledge requires slow deliberate thinking that is suppressed when emotions run high",
        "Knowing about biases actually makes them worse by creating overconfidence",
        "Only biases you have not heard of affect you",
      ],
      correctIndex: 1,
      explanation:
        "System 1 thinking (fast, automatic, emotional) and System 2 thinking (slow, deliberate, analytical) compete. Under stress or emotional pressure — when biases are most dangerous — System 2 is suppressed. Pre-committed rules substitute System 2 decisions made in advance for unreliable in-the-moment judgment.",
    },
    {
      question: "What is a 'pre-mortem' in investment decision-making?",
      options: [
        "A post-trade analysis of what went wrong",
        "A risk assessment done before making an investment by imagining the investment has already failed and asking why",
        "A technical analysis of price patterns before buying",
        "A conversation with a financial advisor before investing",
      ],
      correctIndex: 1,
      explanation:
        "A pre-mortem forces you to surface risks you would otherwise minimize. By assuming failure and working backwards, you generate risk scenarios that optimism bias and overconfidence would normally filter out. It is a deliberate debiasing technique used by professional investors and intelligence analysts.",
    },
    {
      question: "The most important part of a written investment thesis is:",
      options: [
        "The analysis of the company's historical performance",
        "The pre-committed sell criteria — the conditions under which you will exit",
        "The comparison to industry peers",
        "The estimated target price",
      ],
      correctIndex: 1,
      explanation:
        "Pre-committed sell criteria eliminate the in-the-moment emotional decision when prices are falling (loss aversion) or rising beyond your thesis. Entry decisions are made with reasonable calm. Exit decisions happen when emotions are highest. Committing in advance is the protection.",
    },
    {
      question: "The 'opposite argument' requirement before finalizing an investment counteracts which bias?",
      options: [
        "Loss aversion",
        "Anchoring",
        "Confirmation bias — the tendency to seek only information that supports existing beliefs",
        "Herding",
      ],
      correctIndex: 2,
      explanation:
        "Requiring yourself to clearly articulate the strongest case against your investment forces you to engage with contrary evidence rather than filtering it out. Confirmation bias causes investors to see what they want to see in an investment — the opposite argument exercise directly counteracts this.",
    },
    {
      question: "Why is tracking decision quality separately from investment outcomes important?",
      options: [
        "Investment outcomes are not relevant to long-term performance",
        "Good decisions can have bad outcomes due to luck, and bad decisions can have good outcomes — tracking decisions separately reveals whether your process is sound",
        "BSEC requires separate tracking of decisions and outcomes",
        "It helps with tax calculations",
      ],
      correctIndex: 1,
      explanation:
        "If you evaluate your process only by outcomes, good luck makes a bad process look sound and bad luck makes a good process look flawed. Tracking the quality of your analysis against your written criteria — independent of whether the stock went up or down — accurately reveals whether your decision-making is improving.",
    },
  ],

  whatsNext: {
    nextModuleId: null,
    preview:
      "Zone 7 complete. You understand loss aversion, anchoring, herd behavior, how social media exploits these biases, and how to build a process that accounts for them. Choose your next zone.",
  },
};

export const zone7Modules = [
  moduleZ7_1,
  moduleZ7_2,
  moduleZ7_3,
  moduleZ7_4,
  moduleZ7_5,
];
