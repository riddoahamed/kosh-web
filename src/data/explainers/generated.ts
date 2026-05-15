import type { Explainer } from "@/types/explainer";

export const EXPLAINERS: Explainer[] = [
  {
    "id": "should-i-break-my-fdr-early",
    "slug": "should-i-break-my-fdr-early",
    "category": "scenario",
    "title": "Should I break my FDR early?",
    "subtitle": "This is for someone who already has money locked in an FDR and is wondering whether to move it somewhere else.",
    "tldr": "Do not break an FDR just because another product has a higher rate. First calculate the penalty, lost interest, tax impact, and whether you actually need liquidity.",
    "audience": "This is for someone who already has money locked in an FDR and is wondering whether to move it somewhere else.",
    "readingTimeMinutes": 4,
    "language": "en",
    "difficulty": "medium",
    "tags": ["fdr","premature withdrawal","liquidity","banking","penalty"],
    "mangoReward": 12,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "icon",
      "description": "calculator card + simple decision tree",
      "suggestedIcon": "Calculator",
      "altText": "Should I break my FDR early? visual: calculator card + simple decision tree"
    },
    "sections": [
      {
        "heading": "The quick answer",
        "body": "Breaking an FDR makes sense only when the new option gives you meaningfully better returns after penalty and tax, or when you urgently need the money.\n\nIf the difference is tiny, do not create complexity for no reason.\n\nMost people only compare headline rates. That is the mistake.\n\nThey see:\n\n- Old FDR: 9%\n- New FDR: 10.5%\n\nThen they think switching is obvious.\n\nBut the real question is:\n\n> After penalty, tax, lost interest, and hassle, am I actually better off?"
      },
      {
        "heading": "What to check",
        "body": "1. What is your current FDR rate?\n2. How many months are left?\n3. What penalty will the bank apply?\n4. What rate will you actually get if you break early?\n5. What is the new option paying?\n6. Do you need the money soon?"
      },
      {
        "heading": "Simple example",
        "body": "You have Tk 5 lakh in an FDR at 9%.\n\nA new bank offers 10.5%.\n\nThat sounds better.\n\nBut if breaking early means you lose part of your interest, the gain may not be worth it. Especially if only a few months are left."
      },
      {
        "heading": "What to actually do",
        "body": "Use this rule:\n\n- If the FDR has less than 3 months left, usually wait.\n- If the new rate is only slightly higher, usually wait.\n- If you need emergency money, break only the amount you need.\n- If the FDR is long-term and the new rate is much higher, calculate properly."
      }
    ],
    "actionStep": "Before breaking an FDR, write down the old return, penalty, new return, and time left. If you cannot calculate the difference, do not break it yet.",
    "relatedModules": [
      "1",
      "5",
      "z5-1"
    ],
    "relatedCalculators": [
      "fdr-calculator"
    ]
  },
  {
    "id": "lost-money-in-a-stock",
    "slug": "lost-money-in-a-stock",
    "category": "scenario",
    "title": "What should I do if I lost money in a stock?",
    "subtitle": "This is for someone who bought a stock and is now sitting on a loss.",
    "tldr": "Do not average down just because you are angry. First ask whether the business is still worth owning, or whether you are only trying to feel less wrong.",
    "audience": "This is for someone who bought a stock and is now sitting on a loss.",
    "readingTimeMinutes": 5,
    "language": "en",
    "difficulty": "medium",
    "tags": ["stocks","loss recovery","averaging down","DSE","psychology"],
    "mangoReward": 14,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "icon",
      "description": "emotional decision map",
      "suggestedIcon": "TrendingDown",
      "altText": "What should I do if I lost money in a stock? visual: emotional decision map"
    },
    "sections": [
      {
        "heading": "The quick answer",
        "body": "A stock loss is not automatically a reason to sell.\n\nIt is also not automatically a reason to buy more.\n\nThe loss itself does not tell you what to do.\n\nThe business, valuation, and your original reason for buying tell you what to do."
      },
      {
        "heading": "The trap",
        "body": "Most retail investors do this:\n\n1. Buy from a tip.\n2. Stock goes down.\n3. Feel embarrassed.\n4. Buy more to reduce average cost.\n5. Stock falls more.\n6. Get stuck.\n\nThis is not investing.\n\nThis is emotional repair."
      },
      {
        "heading": "Ask these 5 questions",
        "body": "1. Why did I buy this stock?\n2. Is that reason still true?\n3. Did the company’s earnings, debt, or governance get worse?\n4. Am I buying more because it is cheap, or because I hate seeing red?\n5. If I had cash today, would I buy this stock again?\n\nIf the answer to number 5 is no, averaging down may be a mistake."
      },
      {
        "heading": "What to actually do",
        "body": "Split the decision into three options:\n\n**Hold** if the business is still strong and your reason still makes sense.\n\n**Add** only if you have done fresh analysis and the valuation is genuinely attractive.\n\n**Exit** if the original reason was weak, the business worsened, or you only bought from hype."
      }
    ],
    "actionStep": "Write one sentence: “I bought this stock because…”",
    "relatedModules": [
      "z6-1",
      "z7-1"
    ],
    "relatedCalculators": [
      "portfolio-builder"
    ]
  },
  {
    "id": "family-asks-for-saved-money",
    "slug": "family-asks-for-saved-money",
    "category": "scenario",
    "title": "What should I do when family asks me for money I saved?",
    "subtitle": "This is for people who save money but feel pressure to give it away whenever someone asks.",
    "tldr": "Helping family is normal. Destroying your emergency fund is not. Separate support from self-sabotage.",
    "audience": "This is for people who save money but feel pressure to give it away whenever someone asks.",
    "readingTimeMinutes": 4,
    "language": "en",
    "difficulty": "medium",
    "tags": ["family","savings","boundaries","lending","obligation"],
    "mangoReward": 12,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "icon",
      "description": "boundary-setting conversation card",
      "suggestedIcon": "Users",
      "altText": "What should I do when family asks me for money I saved? visual: boundary-setting conversation card"
    },
    "sections": [
      {
        "heading": "The quick answer",
        "body": "You can help family and still protect your own financial base.\n\nThe problem is not helping.\n\nThe problem is helping with money that was meant for rent, medical emergencies, debt payments, or your own future."
      },
      {
        "heading": "The Bangladesh reality",
        "body": "In many families, the person who saves becomes the emergency bank.\n\nThat can feel respectful at first.\n\nThen it becomes pressure.\n\nThen it becomes resentment.\n\nMoney boundaries are not selfish. They are what keep you stable enough to help again later."
      },
      {
        "heading": "Simple rule",
        "body": "Create three buckets:\n\n1. Emergency money: do not touch.\n2. Future money: education, home, retirement, investing.\n3. Help money: the amount you can give without breaking your plan.\n\nOnly the third bucket is for helping others."
      },
      {
        "heading": "What to say",
        "body": "Use clear language:\n\n> I can help with this much right now, but I cannot use my emergency fund.\n\nOr:\n\n> I cannot give cash, but I can help plan the payment or find a cheaper option."
      }
    ],
    "actionStep": "Decide your monthly “family support limit” before anyone asks. Boundaries are easier before emotion enters the conversation.",
    "relatedModules": [
      "z2-1",
      "z9-1"
    ],
    "relatedCalculators": []
  },
  {
    "id": "personal-loan-to-invest",
    "slug": "personal-loan-to-invest",
    "category": "scenario",
    "title": "Should I take a personal loan to invest?",
    "subtitle": "This is for someone thinking of taking a loan to buy stocks, crypto, gold, or any investment product.",
    "tldr": "Usually no. Borrowed money creates fixed pressure. Investing creates uncertain returns. That mismatch can become dangerous fast.",
    "audience": "This is for someone thinking of taking a loan to buy stocks, crypto, gold, or any investment product.",
    "readingTimeMinutes": 4,
    "language": "en",
    "difficulty": "medium",
    "tags": ["personal loan","investing","leverage","risk","stocks"],
    "mangoReward": 12,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "table",
      "description": "red warning card + loan math table",
      "suggestedIcon": "AlertTriangle",
      "altText": "Should I take a personal loan to invest? visual: red warning card + loan math table"
    },
    "sections": [
      {
        "heading": "The quick answer",
        "body": "A personal loan has guaranteed cost.\n\nAn investment has uncertain return.\n\nThat is the problem.\n\nIf your loan costs 14% a year, your investment must earn more than that after tax, fees, and mistakes just to make sense.\n\nThat is hard even for experienced investors."
      },
      {
        "heading": "The emotional trap",
        "body": "People borrow to invest when they feel late.\n\nThey think:\n\n> Everyone is making money. I need bigger capital.\n\nBut using debt does not make you smarter. It only makes mistakes more expensive."
      },
      {
        "heading": "When it is especially dangerous",
        "body": "Do not borrow to invest if:\n\n- you have no emergency fund\n- you do not fully understand the asset\n- you are buying from social media tips\n- the return sounds guaranteed\n- monthly EMI will create pressure\n- you are trying to recover past losses"
      }
    ],
    "actionStep": "Before borrowing to invest, calculate the monthly EMI. If you would feel stressed paying it from salary alone, do not take the loan.",
    "relatedModules": [
      "z3-1",
      "z6-1"
    ],
    "relatedCalculators": []
  },
  {
    "id": "first-one-lakh-saved",
    "slug": "first-one-lakh-saved",
    "category": "scenario",
    "title": "What should I do with my first Tk 1 lakh saved?",
    "subtitle": "This is for someone who saved their first serious amount and does not want to waste it.",
    "tldr": "Your first Tk 1 lakh should mostly buy safety, not excitement. Build the base before chasing return.",
    "audience": "This is for someone who saved their first serious amount and does not want to waste it.",
    "readingTimeMinutes": 5,
    "language": "en",
    "difficulty": "medium",
    "tags": ["first savings","Tk 1 lakh","beginner","savings allocation","starter"],
    "mangoReward": 15,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "chart",
      "description": "allocation pie chart",
      "suggestedIcon": "ListChecks",
      "altText": "What should I do with my first Tk 1 lakh saved? visual: allocation pie chart"
    },
    "sections": [
      {
        "heading": "The quick answer",
        "body": "Do not put the full Tk 1 lakh into stocks, crypto, or a random business idea.\n\nYour first Tk 1 lakh should create stability.\n\nA simple split can look like this:\n\n- Tk 50,000 emergency fund\n- Tk 25,000 short-term savings/FDR/DPS\n- Tk 15,000 learning-based investing\n- Tk 10,000 flexible cash\n\nThis is not the only answer. But it shows the principle."
      },
      {
        "heading": "Why safety comes first",
        "body": "When you have no cushion, every small problem becomes a financial crisis.\n\nA medical bill, job gap, phone repair, family emergency, or delayed salary can force you into debt.\n\nThat is why the first job of money is protection.\n\nGrowth comes after protection."
      }
    ],
    "actionStep": "Give your Tk 1 lakh four jobs: emergency, short-term goal, learning investment, and flexible cash.",
    "relatedModules": [
      "1",
      "z5-1"
    ],
    "relatedCalculators": []
  },
  {
    "id": "fdr-vs-sanchayapatra-vs-dps",
    "slug": "fdr-vs-sanchayapatra-vs-dps",
    "category": "comparison",
    "title": "FDR vs Sanchayapatra vs DPS",
    "subtitle": "FDR is flexible, Sanchayapatra is government-backed, and DPS builds discipline. The best choice depends on time horizon, liquidity need, and your income pattern.",
    "tldr": "FDR is flexible, Sanchayapatra is government-backed, and DPS builds discipline. The best choice depends on time horizon, liquidity need, and your income pattern.",
    "audience": "comparison",
    "readingTimeMinutes": 5,
    "language": "en",
    "difficulty": "medium",
    "tags": ["FDR","Sanchaypatra","DPS","savings comparison","fixed income"],
    "mangoReward": 15,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "table",
      "description": "comparison table",
      "suggestedIcon": "Scale",
      "altText": "FDR vs Sanchayapatra vs DPS visual: comparison table"
    },
    "sections": [
      {
        "heading": "Quick comparison",
        "body": "| Product | Best for | Main strength | Main weakness |\n|---|---|---|---|\n| FDR | Lump sum savings | Flexible and simple | Bank-dependent rate and penalty |\n| Sanchayapatra | Long-term safe return | Government-backed | Limits and lock-in |\n| DPS | Monthly saving habit | Discipline | Lower flexibility |"
      },
      {
        "heading": "The quick answer",
        "body": "Use FDR when you already have a lump sum and may need the money later.\n\nUse Sanchayapatra when you want stable government-backed returns and can lock the money.\n\nUse DPS when your main problem is not return, but saving regularly."
      },
      {
        "heading": "The mistake",
        "body": "People compare only rates.\n\nBut the better question is:\n\n> What job do I need this money to do?\n\nIf the job is emergency liquidity, Sanchayapatra may be wrong.\n\nIf the job is long-term safe return, keeping everything in a savings account may be wrong.\n\nIf the job is discipline, DPS may be better than waiting to save manually."
      }
    ],
    "actionStep": "Write your money goal first. Then pick the product. Do not pick the product first.",
    "relatedModules": [
      "z5-1"
    ],
    "relatedCalculators": [
      "fdr-calculator",
      "comparator"
    ]
  },
  {
    "id": "gold-vs-fdr-vs-sanchayapatra",
    "slug": "gold-vs-fdr-vs-sanchayapatra",
    "category": "comparison",
    "title": "Gold vs FDR vs Sanchayapatra",
    "subtitle": "Gold can protect value over long periods, but jewellery is not the same as investment gold. FDR and Sanchayapatra are clearer for income and planning.",
    "tldr": "Gold can protect value over long periods, but jewellery is not the same as investment gold. FDR and Sanchayapatra are clearer for income and planning.",
    "audience": "comparison",
    "readingTimeMinutes": 4,
    "language": "en",
    "difficulty": "medium",
    "tags": ["gold","FDR","Sanchaypatra","inflation hedge","comparison"],
    "mangoReward": 12,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "table",
      "description": "three-column comparison card",
      "suggestedIcon": "Scale",
      "altText": "Gold vs FDR vs Sanchayapatra visual: three-column comparison card"
    },
    "sections": [
      {
        "heading": "The quick answer",
        "body": "Gold, FDR, and Sanchayapatra do different jobs.\n\nGold is more like value storage.\n\nFDR is income and liquidity.\n\nSanchayapatra is government-backed long-term saving."
      },
      {
        "heading": "The jewellery problem",
        "body": "Many people say they are “investing in gold” when they are buying jewellery.\n\nBut jewellery has:\n\n- making charges\n- design charges\n- resale deductions\n- purity concerns\n- emotional attachment\n\nSo the gold price can rise, but your actual resale value may still disappoint you."
      },
      {
        "heading": "When gold makes sense",
        "body": "Gold makes sense when:\n\n- you want diversification\n- you can hold for long periods\n- you understand buying/selling spread\n- you are not using emergency money"
      },
      {
        "heading": "When FDR/Sanchayapatra makes more sense",
        "body": "They make more sense when:\n\n- you need predictable return\n- you want clear maturity\n- you need income planning\n- you are saving for a specific goal"
      }
    ],
    "actionStep": "If you buy gold, write whether it is for use, emotion, or investment. Do not confuse the three.",
    "relatedModules": [
      "z5-1",
      "z8-1"
    ],
    "relatedCalculators": [
      "fdr-calculator",
      "comparator"
    ]
  },
  {
    "id": "mutual-funds-vs-direct-stocks-bangladesh",
    "slug": "mutual-funds-vs-direct-stocks-bangladesh",
    "category": "comparison",
    "title": "Mutual funds vs direct stocks in Bangladesh",
    "subtitle": "Direct stocks give control but require skill and time. Mutual funds reduce effort and improve diversification, but fund quality matters a lot.",
    "tldr": "Direct stocks give control but require skill and time. Mutual funds reduce effort and improve diversification, but fund quality matters a lot.",
    "audience": "comparison",
    "readingTimeMinutes": 5,
    "language": "en",
    "difficulty": "medium",
    "tags": ["mutual funds","stocks","DSE","investing","diversification"],
    "mangoReward": 15,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "chart",
      "description": "risk-effort matrix",
      "suggestedIcon": "Scale",
      "altText": "Mutual funds vs direct stocks in Bangladesh visual: risk-effort matrix"
    },
    "sections": [
      {
        "heading": "The quick answer",
        "body": "If you want control and can research companies, direct stocks may fit you.\n\nIf you want exposure without picking individual stocks, mutual funds may fit better.\n\nThe wrong choice is buying either one without understanding the risk."
      },
      {
        "heading": "Direct stocks",
        "body": "Direct stocks work when you can:\n\n- read basic financial statements\n- understand business quality\n- avoid tips and hype\n- handle volatility\n- build a diversified portfolio"
      },
      {
        "heading": "Mutual funds",
        "body": "Mutual funds work when you want:\n\n- diversification\n- professional management\n- lower effort\n- smaller starting amount\n- a more systematic approach"
      },
      {
        "heading": "Bangladesh-specific caution",
        "body": "Bangladesh has had trust issues around some mutual funds, especially closed-end funds and weak governance.\n\nSo the question is not “mutual fund good or bad?”\n\nThe question is:\n\n> Which fund, managed by whom, with what track record, fees, portfolio, and governance?"
      }
    ],
    "actionStep": "Before buying a mutual fund, check: fund type, manager, NAV history, fees, portfolio, and whether it is open-end or closed-end.",
    "relatedModules": [
      "z6-1",
      "z8-1"
    ],
    "relatedCalculators": []
  },
  {
    "id": "home-loan-vs-renting",
    "slug": "home-loan-vs-renting",
    "category": "comparison",
    "title": "Home loan vs renting",
    "subtitle": "Buying a home is not automatically smarter than renting. Compare EMI, down payment, maintenance, flexibility, and what else the money could do.",
    "tldr": "Buying a home is not automatically smarter than renting. Compare EMI, down payment, maintenance, flexibility, and what else the money could do.",
    "audience": "comparison",
    "readingTimeMinutes": 5,
    "language": "en",
    "difficulty": "medium",
    "tags": ["home loan","renting","real estate","EMI","buy vs rent"],
    "mangoReward": 15,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "icon",
      "description": "rent-vs-emi calculator preview",
      "suggestedIcon": "Scale",
      "altText": "Home loan vs renting visual: rent-vs-emi calculator preview"
    },
    "sections": [
      {
        "heading": "The quick answer",
        "body": "A home is both a financial decision and a life decision.\n\nThe mistake is treating it as only one of those.\n\nRenting can be smart when you need flexibility.\n\nBuying can be smart when the EMI is affordable, the location makes sense, and you plan to stay long enough."
      },
      {
        "heading": "The real cost of buying",
        "body": "Buying includes:\n\n- down payment\n- registration cost\n- loan processing fee\n- monthly EMI\n- maintenance\n- repair cost\n- opportunity cost of capital\n\nRent is not the only comparison.\n\nCompare rent against the full ownership cost."
      },
      {
        "heading": "Simple rule",
        "body": "Be careful if your EMI is more than 35–40% of your monthly income.\n\nThat may leave too little room for emergencies, family support, education, and investment."
      }
    ],
    "actionStep": "Before buying, calculate your total monthly housing cost, not just the EMI.",
    "relatedModules": [
      "z3-1",
      "z9-1"
    ],
    "relatedCalculators": [
      "emi-calculator"
    ]
  },
  {
    "id": "canada-building-credit-from-zero",
    "slug": "canada-building-credit-from-zero",
    "category": "diaspora",
    "title": "Canada: building credit from zero",
    "subtitle": "Your Bangladesh financial history usually does not automatically become Canadian credit history. You may be financially responsible but still invisible to the Canadian credit system.",
    "tldr": "Your Bangladesh financial history usually does not automatically become Canadian credit history. You may be financially responsible but still invisible to the Canadian credit system.",
    "audience": "diaspora",
    "readingTimeMinutes": 5,
    "language": "en",
    "difficulty": "medium",
    "tags": ["canada","credit score","newcomer","credit history","immigrant"],
    "mangoReward": 14,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "chart",
      "description": "credit score gauge",
      "suggestedIcon": "Globe2",
      "altText": "Canada: building credit from zero visual: credit score gauge"
    },
    "sections": [
      {
        "heading": "The quick answer",
        "body": "In Canada, credit matters for renting, phone plans, credit cards, car loans, and mortgages.\n\nNewcomers often start with little or no Canadian credit history.\n\nThat is not bad credit.\n\nIt means you need to build visibility."
      },
      {
        "heading": "First steps",
        "body": "1. Open a bank account.\n2. Get a secured or newcomer credit card.\n3. Use the card lightly.\n4. Pay the full balance on time.\n5. Keep utilization low.\n6. Avoid too many applications."
      },
      {
        "heading": "The mistake",
        "body": "Many newcomers avoid credit cards because they think using credit is bad.\n\nBad credit behavior is bad.\n\nResponsible credit usage is how the system learns to trust you."
      }
    ],
    "actionStep": "Use one small recurring expense on your card, then pay it fully every month.",
    "relatedModules": [
      "z3-1"
    ],
    "relatedCalculators": []
  },
  {
    "id": "us-credit-building-bangladeshi-immigrants",
    "slug": "us-credit-building-bangladeshi-immigrants",
    "category": "diaspora",
    "title": "US: credit building for Bangladeshi immigrants",
    "subtitle": "In the US, credit history affects more than loans. It can affect apartments, car financing, credit cards, and sometimes utility deposits.",
    "tldr": "In the US, credit history affects more than loans. It can affect apartments, car financing, credit cards, and sometimes utility deposits.",
    "audience": "diaspora",
    "readingTimeMinutes": 5,
    "language": "en",
    "difficulty": "medium",
    "tags": ["us","credit score","newcomer","FICO","immigrant"],
    "mangoReward": 14,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "flowchart",
      "description": "5-step flowchart",
      "suggestedIcon": "Globe2",
      "altText": "US: credit building for Bangladeshi immigrants visual: 5-step flowchart"
    },
    "sections": [
      {
        "heading": "The quick answer",
        "body": "Start with the basics:\n\n1. Get SSN or ITIN if eligible.\n2. Open a bank account.\n3. Apply for a starter or secured credit card.\n4. Pay on time.\n5. Keep utilization low.\n6. Monitor your credit report."
      },
      {
        "heading": "The key rule",
        "body": "Do not treat the credit limit like extra income.\n\nA $1,000 credit limit does not mean you have $1,000 to spend.\n\nIt means the system is testing whether you can handle access responsibly."
      },
      {
        "heading": "What to avoid",
        "body": "- missing payments\n- maxing out cards\n- applying for too many cards\n- carrying balance for no reason\n- co-signing without understanding risk"
      }
    ],
    "actionStep": "Set auto-pay for at least the minimum payment, then manually pay the full statement balance whenever possible.",
    "relatedModules": [
      "z3-1"
    ],
    "relatedCalculators": []
  },
  {
    "id": "middle-east-sending-money-home-smartly",
    "slug": "middle-east-sending-money-home-smartly",
    "category": "diaspora",
    "title": "Middle East: sending money home smartly",
    "subtitle": "Sending money home is only half the decision. The bigger question is what happens after the money reaches the family.",
    "tldr": "Sending money home is only half the decision. The bigger question is what happens after the money reaches the family.",
    "audience": "diaspora",
    "readingTimeMinutes": 4,
    "language": "en",
    "difficulty": "medium",
    "tags": ["middle east","remittance","RMG","saudi","uae"],
    "mangoReward": 12,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "flowchart",
      "description": "remittance flowchart",
      "suggestedIcon": "Globe2",
      "altText": "Middle East: sending money home smartly visual: remittance flowchart"
    },
    "sections": [
      {
        "heading": "The quick answer",
        "body": "Use formal channels, compare exchange rates, and agree on a family plan before sending large amounts.\n\nRemittance should not disappear into random spending every month.\n\nIt should support:\n\n- household expenses\n- emergency fund\n- debt reduction\n- education\n- land/home goal\n- safe savings"
      },
      {
        "heading": "The family issue",
        "body": "Many migrant workers send money regularly but do not know how it is used.\n\nThat creates frustration.\n\nThe solution is not control. The solution is clarity."
      },
      {
        "heading": "Simple family plan",
        "body": "Every remittance can be split:\n\n- 60% monthly needs\n- 20% savings\n- 10% debt/medical/emergency\n- 10% future goal\n\nAdjust the numbers, but keep the structure."
      }
    ],
    "actionStep": "Before the next remittance, agree with your family on one savings goal and one spending limit.",
    "relatedModules": [],
    "relatedCalculators": []
  },
  {
    "id": "uk-isa-nrb-accounts-bangladeshis",
    "slug": "uk-isa-nrb-accounts-bangladeshis",
    "category": "diaspora",
    "title": "UK: Bangladesh, ISA, and NRB accounts",
    "subtitle": "If you live in the UK, do not only think about sending money home. Learn the UK system too. ISAs, pensions, credit history, and local investing can matter more than you think.",
    "tldr": "If you live in the UK, do not only think about sending money home. Learn the UK system too. ISAs, pensions, credit history, and local investing can matter more than you think.",
    "audience": "diaspora",
    "readingTimeMinutes": 5,
    "language": "en",
    "difficulty": "medium",
    "tags": ["uk","ISA","NRB account","newcomer","savings"],
    "mangoReward": 14,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "table",
      "description": "UK vs Bangladesh account comparison",
      "suggestedIcon": "Globe2",
      "altText": "UK: Bangladesh, ISA, and NRB accounts visual: UK vs Bangladesh account comparison"
    },
    "sections": [
      {
        "heading": "The quick answer",
        "body": "Bangladesh may be your emotional financial base.\n\nBut the UK is your active financial system if you live and earn there.\n\nYou need to understand both."
      },
      {
        "heading": "What to learn first",
        "body": "1. UK current account and savings account\n2. credit score and credit file\n3. workplace pension\n4. ISA basics\n5. remittance costs\n6. NRB account options in Bangladesh"
      },
      {
        "heading": "The common mistake",
        "body": "Many immigrants save aggressively but keep money idle because they do not understand local investment accounts.\n\nThat means they work hard, save well, but miss the system around them."
      }
    ],
    "actionStep": "List your money in two columns: UK system and Bangladesh system. Then decide what each side is for.",
    "relatedModules": [],
    "relatedCalculators": []
  },
  {
    "id": "australia-superannuation-basics-bangladeshis",
    "slug": "australia-superannuation-basics-bangladeshis",
    "category": "diaspora",
    "title": "Australia: superannuation basics for Bangladeshis",
    "subtitle": "Superannuation is not just a deduction from salary. It is one of the main retirement systems in Australia.",
    "tldr": "Superannuation is not just a deduction from salary. It is one of the main retirement systems in Australia.",
    "audience": "diaspora",
    "readingTimeMinutes": 4,
    "language": "en",
    "difficulty": "medium",
    "tags": ["australia","superannuation","retirement","newcomer","tax"],
    "mangoReward": 12,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "icon",
      "description": "retirement bucket graphic",
      "suggestedIcon": "Globe2",
      "altText": "Australia: superannuation basics for Bangladeshis visual: retirement bucket graphic"
    },
    "sections": [
      {
        "heading": "The quick answer",
        "body": "If you work in Australia, your employer contributes to your super.\n\nThat money is meant for retirement.\n\nYou should know:\n\n- which fund you are in\n- fees\n- investment option\n- insurance inside super\n- how much is being contributed"
      },
      {
        "heading": "The mistake",
        "body": "Many new immigrants ignore super because retirement feels far away.\n\nBut ignoring it for years can cost a lot.\n\nFees, bad fund choice, and wrong investment settings can quietly reduce your long-term money."
      }
    ],
    "actionStep": "Log in to your super account and check your balance, fees, and investment option.",
    "relatedModules": [
      "z9-1"
    ],
    "relatedCalculators": []
  },
  {
    "id": "simple-savings-worker-wise",
    "slug": "simple-savings-worker-wise",
    "category": "worker-wise",
    "title": "সহজ সঞ্চয় কৌশল",
    "subtitle": "অল্প টাকা হলেও নিয়মিত জমালে কাজে লাগে। সঞ্চয় বড় অংক দিয়ে শুরু করতে হয় না। অভ্যাস দিয়ে শুরু করতে হয়।",
    "tldr": "অল্প টাকা হলেও নিয়মিত জমালে কাজে লাগে। সঞ্চয় বড় অংক দিয়ে শুরু করতে হয় না। অভ্যাস দিয়ে শুরু করতে হয়।",
    "audience": "workers and new earners",
    "readingTimeMinutes": 3,
    "language": "bn",
    "difficulty": "easy",
    "tags": ["savings","RMG","শ্রমিক","অভ্যাস","small amounts"],
    "mangoReward": 10,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "step-cards",
      "description": "Daily, weekly, monthly savings habits",
      "suggestedIcon": "PiggyBank",
      "altText": "প্রতিদিন অল্প করে সঞ্চয়ের ধাপ",
      "steps": [
        { "icon": "Coins", "label": "প্রতিদিন ২০ টাকা" },
        { "icon": "Calendar", "label": "প্রতি সপ্তাহে ১০০ টাকা" },
        { "icon": "Wallet", "label": "মাসে আলাদা খামে" },
        { "icon": "ShieldCheck", "label": "জরুরি ছাড়া হাত দেবেন না" }
      ]
    },
    "sections": [
      {
        "heading": "মূল কথা",
        "body": "প্রতিদিন ২০ টাকা জমালে মাসে প্রায় ৬০০ টাকা হয়।\n\nপ্রতি সপ্তাহে ১০০ টাকা জমালে মাসে প্রায় ৪০০ টাকা হয়।\n\nটাকা কম হলেও সমস্যা নেই। নিয়মিত হওয়াই আসল।"
      },
      {
        "heading": "কিভাবে করবেন",
        "body": "1. বেতন পাওয়ার দিন একটু টাকা আলাদা রাখুন।\n2. মোবাইল ব্যাংকিং বা আলাদা খামে রাখুন।\n3. জরুরি কাজ ছাড়া এই টাকা খরচ করবেন না।\n4. ছোট লক্ষ্য রাখুন। যেমন: ৩ মাসে ২,০০০ টাকা।"
      }
    ],
    "actionStep": "আজ থেকেই ২০ টাকা আলাদা করে রাখুন।",
    "relatedModules": [],
    "relatedCalculators": []
  },
  {
    "id": "safe-mobile-banking-worker-wise",
    "slug": "safe-mobile-banking-worker-wise",
    "category": "worker-wise",
    "title": "মোবাইল ব্যাংকিং নিরাপদে ব্যবহার",
    "subtitle": "বিকাশ, নগদ বা রকেট ব্যবহার করুন। কিন্তু পিন, ওটিপি, পাসওয়ার্ড কাউকে বলবেন না।",
    "tldr": "বিকাশ, নগদ বা রকেট ব্যবহার করুন। কিন্তু পিন, ওটিপি, পাসওয়ার্ড কাউকে বলবেন না।",
    "audience": "workers and new earners",
    "readingTimeMinutes": 3,
    "language": "bn",
    "difficulty": "easy",
    "tags": ["bKash","Nagad","মোবাইল ব্যাংকিং","নিরাপত্তা","RMG"],
    "mangoReward": 10,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "step-cards",
      "description": "Mobile banking safety steps",
      "suggestedIcon": "Smartphone",
      "altText": "মোবাইল ব্যাংকিং নিরাপদে ব্যবহারের ধাপ",
      "steps": [
        { "icon": "Lock", "label": "পিন কাউকে নয়" },
        { "icon": "Smartphone", "label": "ওটিপি গোপন রাখুন" },
        { "icon": "AlertTriangle", "label": "অপরিচিত লিংকে নয়" },
        { "icon": "Check", "label": "পিন চাপার সময় ঢেকে রাখুন" }
      ]
    },
    "sections": [
      {
        "heading": "মূল কথা",
        "body": "আপনার পিন আপনার টাকা রক্ষা করে।\n\nব্যাংক, বিকাশ, নগদ, পুলিশ — কেউ পিন বা ওটিপি চাইবে না।\n\nযদি কেউ চায়, বুঝবেন সেটা প্রতারণা।"
      },
      {
        "heading": "নিরাপদ থাকার নিয়ম",
        "body": "1. পিন কাউকে বলবেন না।\n2. ফোনে আসা ওটিপি কাউকে বলবেন না।\n3. ভুল নম্বরে টাকা গেলে দ্রুত কাস্টমার কেয়ারে ফোন করুন।\n4. এজেন্টের সামনে পিন চাপার সময় হাত দিয়ে ঢেকে রাখুন।\n5. অপরিচিত লিংকে চাপ দেবেন না।"
      }
    ],
    "actionStep": "আপনার পিন যদি সহজ হয়, আজই বদলে ফেলুন।",
    "relatedModules": [],
    "relatedCalculators": []
  },
  {
    "id": "avoid-high-interest-loans-worker-wise",
    "slug": "avoid-high-interest-loans-worker-wise",
    "category": "worker-wise",
    "title": "বেশি সুদের ঋণ থেকে সাবধান",
    "subtitle": "সহজে ঋণ পাওয়া সব সময় ভালো না। বেশি সুদের ঋণ আপনাকে আরও বিপদে ফেলতে পারে।",
    "tldr": "সহজে ঋণ পাওয়া সব সময় ভালো না। বেশি সুদের ঋণ আপনাকে আরও বিপদে ফেলতে পারে।",
    "audience": "workers and new earners",
    "readingTimeMinutes": 3,
    "language": "bn",
    "difficulty": "easy",
    "tags": ["loan","MFI","মহাজন","সুদ","RMG"],
    "mangoReward": 10,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "step-cards",
      "description": "Questions to ask before taking a loan",
      "suggestedIcon": "AlertTriangle",
      "altText": "ঋণ নেওয়ার আগে যাচাই করার ধাপ",
      "steps": [
        { "icon": "Calculator", "label": "মোট ফেরত - কত?" },
        { "icon": "Calendar", "label": "কত দিনে দিতে হবে?" },
        { "icon": "AlertTriangle", "label": "দেরিতে জরিমানা?" },
        { "icon": "BadgeCheck", "label": "অফিস/ব্যাংক আগে দেখুন" }
      ]
    },
    "sections": [
      {
        "heading": "মূল কথা",
        "body": "কেউ যদি বলে:\n\n“আজ টাকা নিন, পরে আস্তে আস্তে দিবেন”\n\nতাহলে আগে জিজ্ঞেস করুন:\n\n- মোট কত টাকা ফেরত দিতে হবে?\n- কত দিনে দিতে হবে?\n- দেরি হলে জরিমানা আছে কি?"
      },
      {
        "heading": "ভালো বিকল্প",
        "body": "1. পরিবারে আলোচনা করুন।\n2. অফিসের বেতন অগ্রিম আছে কি দেখুন।\n3. ব্যাংক/এনজিওর নিয়মিত ঋণ দেখুন।\n4. জরুরি সঞ্চয় গড়ে তুলুন।"
      }
    ],
    "actionStep": "ঋণ নেওয়ার আগে মোট ফেরত টাকার হিসাব লিখে নিন।",
    "relatedModules": [],
    "relatedCalculators": []
  },
  {
    "id": "employee-finance-basics",
    "slug": "employee-finance-basics",
    "category": "employer",
    "title": "Employee finance basics",
    "subtitle": "Employees do not need complicated finance theory. They need a simple system for salary, savings, debt, and emergencies.",
    "tldr": "Employees do not need complicated finance theory. They need a simple system for salary, savings, debt, and emergencies.",
    "audience": "HR, CSR, NGO, factory training",
    "readingTimeMinutes": 5,
    "language": "en",
    "difficulty": "medium",
    "tags": ["employee","workplace","basics","salary","savings"],
    "mangoReward": 12,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "icon",
      "description": "workplace money map",
      "suggestedIcon": "BriefcaseBusiness",
      "altText": "Employee finance basics visual: workplace money map"
    },
    "sections": [
      {
        "heading": "Core lesson",
        "body": "Every salary should have four jobs:\n\n1. monthly needs\n2. emergency savings\n3. debt payments\n4. future goals\n\nThis helps employees avoid spending everything before the month ends."
      },
      {
        "heading": "Training flow",
        "body": "1. Ask employees where salary goes now.\n2. Introduce the four-job salary system.\n3. Show a sample Tk 20,000 salary split.\n4. Let employees create their own simple split.\n5. End with one action for this month."
      }
    ],
    "actionStep": "Create a one-page salary map before the next payday.",
    "relatedModules": [],
    "relatedCalculators": []
  },
  {
    "id": "employee-scam-awareness",
    "slug": "employee-scam-awareness",
    "category": "employer",
    "title": "Scam awareness for employees",
    "subtitle": "Most scams use speed, fear, greed, or fake authority. Slow down before sending money or sharing information.",
    "tldr": "Most scams use speed, fear, greed, or fake authority. Slow down before sending money or sharing information.",
    "audience": "HR, factory, field staff, NGO program",
    "readingTimeMinutes": 4,
    "language": "en",
    "difficulty": "medium",
    "tags": ["employee","scam","MLM","fraud","awareness"],
    "mangoReward": 12,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "icon",
      "description": "scam warning cards",
      "suggestedIcon": "BriefcaseBusiness",
      "altText": "Scam awareness for employees visual: scam warning cards"
    },
    "sections": [
      {
        "heading": "Core lesson",
        "body": "A scam often sounds urgent.\n\nExamples:\n\n- “Your account will close today.”\n- “You won a prize.”\n- “Send money now.”\n- “Give OTP to verify.”\n- “Guaranteed double money.”"
      },
      {
        "heading": "Safety rule",
        "body": "Never share:\n\n- PIN\n- OTP\n- password\n- NID photo with strangers\n- bank card number"
      }
    ],
    "actionStep": "If a message asks for money or OTP, pause and show it to someone trusted before doing anything.",
    "relatedModules": [],
    "relatedCalculators": []
  },
  {
    "id": "salary-advance-vs-high-interest-loan",
    "slug": "salary-advance-vs-high-interest-loan",
    "category": "employer",
    "title": "Salary advance vs high-interest loan",
    "subtitle": "A salary advance can be safer than a high-interest informal loan, but it still reduces next month’s salary. Use it carefully.",
    "tldr": "A salary advance can be safer than a high-interest informal loan, but it still reduces next month’s salary. Use it carefully.",
    "audience": "employers with worker welfare programs",
    "readingTimeMinutes": 4,
    "language": "en",
    "difficulty": "medium",
    "tags": ["salary advance","loan","employer","MFI","comparison"],
    "mangoReward": 10,
    "lastUpdated": "2026-05-15",
    "visual": {
      "type": "table",
      "description": "pros/cons comparison table",
      "suggestedIcon": "BriefcaseBusiness",
      "altText": "Salary advance vs high-interest loan visual: pros/cons comparison table"
    },
    "sections": [
      {
        "heading": "The quick answer",
        "body": "If an employee needs emergency money, compare options by total repayment amount.\n\nThe cheapest option is not always the easiest option.\n\nThe easiest option is not always safe."
      },
      {
        "heading": "Compare",
        "body": "| Option | Good side | Risk |\n|---|---|---|\n| Salary advance | usually no interest | next salary becomes smaller |\n| NGO/microloan | structured repayment | total cost may be high |\n| Informal lender | fast money | very high interest and pressure |\n| Family support | flexible | relationship pressure |"
      }
    ],
    "actionStep": "Before taking any loan, write: “I borrowed X, I must repay Y, by this date.”",
    "relatedModules": [],
    "relatedCalculators": []
  }
];
