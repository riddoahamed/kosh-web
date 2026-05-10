// ============================================================
// KOSH — AGE-GROUP DIAGNOSTIC QUESTIONS
// Three variants: Under 25 / 25-35 / 35+
// All English, no Bangla script
// Same domains: knowledge, behavior, confidence, grey-zone
// Different question content calibrated to each group's likely starting point
// ============================================================

import type {
  KnowledgeQuestion,
  BehaviorQuestion,
  ConfidenceQuestion,
} from "@/types/curriculum";
import type { AgeGroup } from "@/types/diagnostic";

// ─────────────────────────────────────────────────────────────
// UNDER 25 — First earner / early career
// Skews toward fundamentals. Tests basic vocabulary and habits.
// Tone: "Let's see where you're starting from."
// ─────────────────────────────────────────────────────────────

export const knowledgeQuestionsUnder25: KnowledgeQuestion[] = [
  {
    id: "k1-u25",
    type: "knowledge",
    domain: "knowledge",
    text: "Inflation in Bangladesh is currently around 9-10%. A typical savings account pays around 5%. What is happening to the real value of money in that account?",
    options: [
      "It's growing in real value every year",
      "It's staying the same",
      "It's actually shrinking — losing purchasing power",
      "It's impossible to tell without more information",
    ],
    correctIndex: 2,
    explanation:
      "Real return = nominal return minus inflation. 5% minus 9% equals negative 4%. The number in your account grows but the purchasing power shrinks.",
  },
  {
    id: "k2-u25",
    type: "knowledge",
    domain: "knowledge",
    text: "What does 'compound interest' mean?",
    options: [
      "Interest charged only on the original amount",
      "Interest earned on the original amount plus previously earned interest",
      "A government tax on savings accounts",
      "A fee banks charge for keeping your money",
    ],
    correctIndex: 1,
    explanation:
      "Compound interest is interest on interest. Over time, this means money grows exponentially rather than linearly — which is why starting early matters so much.",
  },
  {
    id: "k3-u25",
    type: "knowledge",
    domain: "knowledge",
    text: "If you put Tk 10,000 in an FDR for 1 year at 8%, approximately how much do you receive at maturity (before tax)?",
    options: [
      "Tk 10,800",
      "Tk 11,000",
      "Tk 18,000",
      "Tk 80,000",
    ],
    correctIndex: 0,
    explanation:
      "8% of Tk 10,000 is Tk 800. So you receive Tk 10,000 principal plus Tk 800 interest = Tk 10,800. (After 10% source tax on the interest, you'd actually receive Tk 10,720.)",
  },
  {
    id: "k4-u25",
    type: "knowledge",
    domain: "knowledge",
    text: "What is an emergency fund?",
    options: [
      "Money set aside for stock market opportunities",
      "Money you save for buying a house",
      "Money kept liquid (easily accessible) to cover unexpected expenses without going into debt",
      "Money the government provides during natural disasters",
    ],
    correctIndex: 2,
    explanation:
      "An emergency fund is liquid savings — typically 3-6 months of essential expenses — kept accessible so a sudden expense (medical, job loss) doesn't force you into high-interest debt.",
  },
  {
    id: "k5-u25",
    type: "knowledge",
    domain: "knowledge",
    text: "Sanchaypatra is best described as:",
    options: [
      "A type of cryptocurrency available in Bangladesh",
      "A government-issued savings certificate that pays interest at a fixed rate",
      "A high-risk stock market product",
      "An informal lending scheme",
    ],
    correctIndex: 1,
    explanation:
      "Sanchaypatra are savings certificates issued by the Government of Bangladesh. You're essentially lending money to the government in exchange for a fixed interest rate — making them one of the safest investments available in BD.",
  },
];

export const behaviorQuestionsUnder25: BehaviorQuestion[] = [
  {
    id: "b1-u25",
    type: "behavior",
    domain: "behavior",
    text: "When you receive your salary or income, what typically happens first?",
    options: [
      "I transfer a fixed amount to savings before spending anything",
      "I pay essential bills first, then save what's left at month-end",
      "I spend on what I need and want, save whatever remains",
      "I usually have very little or nothing left to save",
    ],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "b2-u25",
    type: "behavior",
    domain: "behavior",
    text: "How much of your monthly income do you typically save or invest?",
    options: [
      "20% or more",
      "10-20%",
      "Less than 10%",
      "I don't save consistently",
    ],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "b3-u25",
    type: "behavior",
    domain: "behavior",
    text: "If a friend or relative invited you to invest in something they say is 'guaranteed' to triple your money in 6 months, what would you most likely do?",
    options: [
      "Decline immediately — guaranteed high returns are a red flag",
      "Research the opportunity carefully before deciding",
      "Invest a small amount to see if it works",
      "Trust them and invest a meaningful amount",
    ],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "b4-u25",
    type: "behavior",
    domain: "behavior",
    text: "Do you currently track where your money goes each month?",
    options: [
      "Yes, with a system or app — I know my spending categories",
      "Roughly — I have a rough idea but no formal tracking",
      "No — I rarely think about it",
      "Only when I run out of money",
    ],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "b5-u25",
    type: "behavior",
    domain: "behavior",
    text: "If you got a Tk 20,000 bonus tomorrow, what would you most likely do with it?",
    options: [
      "Save or invest most of it according to a plan",
      "Save half, spend half on something I've been wanting",
      "Spend most of it — bonuses are for enjoying",
      "I'd give it to family",
    ],
    correctIndex: 0,
    explanation: "",
  },
];

export const confidenceQuestionsUnder25: ConfidenceQuestion[] = [
  {
    id: "c1-u25",
    type: "confidence",
    domain: "confidence",
    text: "How confident are you in making basic financial decisions on your own?",
    options: ["Very confident", "Somewhat confident", "Not very confident", "Not confident at all"],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "c2-u25",
    type: "confidence",
    domain: "confidence",
    text: "How comfortable do you feel discussing money with family or friends?",
    options: ["Very comfortable", "Somewhat comfortable", "Uncomfortable", "Avoid the topic entirely"],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "c3-u25",
    type: "confidence",
    domain: "confidence",
    text: "If you needed to compare two financial products (say, two FDRs from different banks), how easy would that feel?",
    options: ["Easy — I know what to look at", "Moderate — I'd manage", "Hard — I'd need help", "I wouldn't know where to start"],
    correctIndex: 0,
    explanation: "",
  },
];


// ─────────────────────────────────────────────────────────────
// 25 TO 35 — Established earner / decisions ahead
// Skews toward applied knowledge and optimization.
// Tone: "You're earning. Let's see how well you're using it."
// ─────────────────────────────────────────────────────────────

export const knowledgeQuestions25to35: KnowledgeQuestion[] = [
  {
    id: "k1-2535",
    type: "knowledge",
    domain: "knowledge",
    text: "You have Tk 5 lakh sitting in a savings account at 5% interest. Inflation is approximately 9%. Over 5 years, what happens to the real value of this money if you leave it untouched?",
    options: [
      "It grows by approximately 25%",
      "It stays roughly the same",
      "It loses approximately 18-20% of its purchasing power",
      "Impossible to estimate without more data",
    ],
    correctIndex: 2,
    explanation:
      "Real return is approximately negative 4% annually. Over 5 years, this compounds to roughly negative 18-20%. The number in the account grows but real purchasing power shrinks meaningfully.",
  },
  {
    id: "k2-2535",
    type: "knowledge",
    domain: "knowledge",
    text: "What is the main difference between a DPS and an FDR?",
    options: [
      "FDR pays higher interest than DPS in all cases",
      "DPS requires monthly installments while FDR is a lump-sum deposit",
      "DPS is government-issued while FDR is from private banks",
      "There is no meaningful difference between them",
    ],
    correctIndex: 1,
    explanation:
      "DPS (Deposit Pension Scheme) is built on monthly recurring deposits over a fixed term. FDR (Fixed Deposit Receipt) is a single lump-sum deposit. DPS suits incremental savers; FDR suits people with a lump sum to deploy.",
  },
  {
    id: "k3-2535",
    type: "knowledge",
    domain: "knowledge",
    text: "Bangladesh's investment rebate on qualifying investments is approximately what percentage?",
    options: [
      "5%",
      "10%",
      "15% of qualifying investment amount",
      "25%",
    ],
    correctIndex: 2,
    explanation:
      "You receive a 15% tax rebate on qualifying investments (Sanchaypatra, DPS, life insurance premiums, approved mutual funds) up to a ceiling. This is essentially a guaranteed 15% return purely from the tax savings.",
  },
  {
    id: "k4-2535",
    type: "knowledge",
    domain: "knowledge",
    text: "If you carry a Tk 50,000 balance on a credit card at 22% APR and only make minimum payments, approximately how long does it take to repay (and what is the total cost)?",
    options: [
      "About 1 year, total cost approximately Tk 55,000",
      "About 3 years, total cost approximately Tk 70,000",
      "Approximately 7-8 years, total cost approximately Tk 85,000",
      "Doesn't matter — minimum payments are interest-free",
    ],
    correctIndex: 2,
    explanation:
      "Minimum payments are designed to keep you paying interest as long as possible. On a 22% APR balance with 3% minimum payment, repayment takes 7-8 years and total cost is roughly Tk 30,000-35,000 above the original balance.",
  },
  {
    id: "k5-2535",
    type: "knowledge",
    domain: "knowledge",
    text: "What does 'P/E ratio' mean for a stock?",
    options: [
      "Profit margin minus expenses",
      "Share price divided by earnings per share — what you pay for each unit of company earnings",
      "Performance evaluation rating from BSEC",
      "Personal equity ratio of the investor",
    ],
    correctIndex: 1,
    explanation:
      "P/E (Price-to-Earnings) ratio = share price divided by earnings per share. A P/E of 10 means you're paying Tk 10 for every Tk 1 of annual company earnings. Lower P/E generally indicates cheaper valuation, though context matters.",
  },
];

export const behaviorQuestions25to35: BehaviorQuestion[] = [
  {
    id: "b1-2535",
    type: "behavior",
    domain: "behavior",
    text: "Do you have a fully funded emergency fund (3-6 months of essential expenses in liquid savings)?",
    options: [
      "Yes, fully funded and kept separate from spending money",
      "Partially funded — working toward it",
      "Not really — I have some savings but not specifically for emergencies",
      "No — I don't have meaningful savings reserved for emergencies",
    ],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "b2-2535",
    type: "behavior",
    domain: "behavior",
    text: "Across all your financial accounts (savings, FDR, DPS, Sanchaypatra, stocks, etc.), do you know your approximate total net worth?",
    options: [
      "Yes — I can give you a number within 10% accuracy",
      "Roughly — I have a general sense but haven't calculated recently",
      "No — I haven't tracked this",
      "I prefer not to think about it",
    ],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "b3-2535",
    type: "behavior",
    domain: "behavior",
    text: "When was the last time you reviewed your bank statements or transaction history specifically to understand your spending?",
    options: [
      "Within the last month",
      "Within the last 3 months",
      "Within the last year",
      "I don't review them",
    ],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "b4-2535",
    type: "behavior",
    domain: "behavior",
    text: "Do you have any high-interest debt (credit card balances, personal loans above 15% interest)?",
    options: [
      "No high-interest debt",
      "Yes, but I'm actively paying it down with a plan",
      "Yes, and I make minimum payments only",
      "Yes, and I'm not sure how to handle it",
    ],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "b5-2535",
    type: "behavior",
    domain: "behavior",
    text: "Do you have a TIN (Tax Identification Number)?",
    options: [
      "Yes, and I file my returns regularly",
      "Yes, but I haven't filed in some time",
      "No, but I've been meaning to get one",
      "No — I don't think I need one",
    ],
    correctIndex: 0,
    explanation: "",
  },
];

export const confidenceQuestions25to35: ConfidenceQuestion[] = [
  {
    id: "c1-2535",
    type: "confidence",
    domain: "confidence",
    text: "How confident are you that you're using the right mix of savings products for your situation?",
    options: ["Very confident", "Somewhat confident", "Not very confident", "I don't know what mix would be right"],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "c2-2535",
    type: "confidence",
    domain: "confidence",
    text: "If your income suddenly stopped, how long could you maintain your current lifestyle from existing savings?",
    options: ["6+ months", "3-6 months", "1-3 months", "Less than 1 month"],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "c3-2535",
    type: "confidence",
    domain: "confidence",
    text: "How prepared do you feel for a major life expense in the next 5 years (wedding, child, property)?",
    options: ["Well prepared", "Partially prepared", "Not very prepared", "Not at all prepared"],
    correctIndex: 0,
    explanation: "",
  },
];


// ─────────────────────────────────────────────────────────────
// OVER 35 — Established / planning long-term
// Skews toward planning, optimization, and protection.
// Tone: "You've been managing money for a while. Let's see the full picture."
// ─────────────────────────────────────────────────────────────

export const knowledgeQuestionsOver35: KnowledgeQuestion[] = [
  {
    id: "k1-o35",
    type: "knowledge",
    domain: "knowledge",
    text: "When evaluating a long-term financial plan, the 'real return' is calculated as:",
    options: [
      "Nominal return plus inflation",
      "Nominal return minus inflation",
      "Average return across all asset classes",
      "Return after subtracting brokerage fees only",
    ],
    correctIndex: 1,
    explanation:
      "Real return = nominal return minus inflation. This is the actual increase in purchasing power. Most long-term plans should target a positive real return — meaning beating inflation, not just earning interest.",
  },
  {
    id: "k2-o35",
    type: "knowledge",
    domain: "knowledge",
    text: "If you want to retire and live comfortably on Tk 5 lakh per year, the 25x rule suggests you need approximately:",
    options: [
      "Tk 25 lakh in invested assets",
      "Tk 1.25 crore in invested assets",
      "Tk 5 crore in invested assets",
      "Tk 50 lakh in invested assets",
    ],
    correctIndex: 1,
    explanation:
      "The 25x rule: Tk 5 lakh × 25 = Tk 1.25 crore. At a 4% safe withdrawal rate, this corpus generates approximately Tk 5 lakh per year indefinitely. This is a starting estimate, not a precise plan.",
  },
  {
    id: "k3-o35",
    type: "knowledge",
    domain: "knowledge",
    text: "In Bangladesh, what is the difference between a 'nominee' and a 'legal heir' on a financial account?",
    options: [
      "There is no legal difference — they mean the same thing",
      "A nominee is designated to receive or manage assets, but legal heirs are determined by inheritance law and can differ",
      "Nominees only apply to bank accounts; legal heirs apply to property only",
      "Nominees are appointed by the government; legal heirs are chosen by the account holder",
    ],
    correctIndex: 1,
    explanation:
      "A nominee can receive or manage assets but is not automatically the legal owner. Legal heirs are determined by inheritance law (Islamic inheritance law for Muslims, Hindu succession for Hindus, etc.). The two can differ — a common source of family disputes.",
  },
  {
    id: "k4-o35",
    type: "knowledge",
    domain: "knowledge",
    text: "Which of the following best describes 'diversification' in investing?",
    options: [
      "Buying as many stocks as possible to reduce risk",
      "Holding investments across different asset types and sectors so that no single asset's failure ruins your portfolio",
      "Putting all your money in the safest possible investments",
      "Switching investments frequently based on market trends",
    ],
    correctIndex: 1,
    explanation:
      "Diversification spreads risk across different asset types (stocks, bonds, property, cash) and within asset types (different sectors, different companies). The goal is that no single failure can cause catastrophic loss to the whole portfolio.",
  },
  {
    id: "k5-o35",
    type: "knowledge",
    domain: "knowledge",
    text: "When evaluating whether to buy property versus rent in Bangladesh, what is often the most overlooked cost?",
    options: [
      "The monthly EMI on a home loan",
      "The opportunity cost of the down payment capital — what it could earn if invested elsewhere",
      "The price of the property itself",
      "The cost of property insurance",
    ],
    correctIndex: 1,
    explanation:
      "Most rent-vs-buy comparisons compare EMI to monthly rent. They miss that the Tk 20-30 lakh down payment, if invested in Sanchaypatra at 10%, would generate Tk 2-3 lakh annually. This foregone income is a real cost of ownership rarely included in family conversations.",
  },
];

export const behaviorQuestionsOver35: BehaviorQuestion[] = [
  {
    id: "b1-o35",
    type: "behavior",
    domain: "behavior",
    text: "Do you have a written or clearly documented financial plan covering your savings, investments, and key goals?",
    options: [
      "Yes, regularly reviewed and updated",
      "Yes, but it hasn't been reviewed recently",
      "Roughly — it's in my head but not written down",
      "No — I haven't formally planned this",
    ],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "b2-o35",
    type: "behavior",
    domain: "behavior",
    text: "Do you have life insurance and health insurance with adequate coverage for your family situation?",
    options: [
      "Yes, both with coverage I've reviewed against my actual needs",
      "Yes, but I'm not sure if the coverage is adequate",
      "Partially — one but not the other, or basic coverage only",
      "No insurance currently",
    ],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "b3-o35",
    type: "behavior",
    domain: "behavior",
    text: "Have you specifically planned for retirement or financial independence (calculated a target corpus, monthly savings rate, timeline)?",
    options: [
      "Yes, with specific numbers and a tracked plan",
      "I've thought about it but no specific calculation",
      "Not yet — I assume I'll figure it out as I get older",
      "I rely on family/property/business income for old age",
    ],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "b4-o35",
    type: "behavior",
    domain: "behavior",
    text: "Are nominees correctly listed and updated on your significant financial accounts (bank, FDR, Sanchaypatra, property)?",
    options: [
      "Yes, all reviewed in the last 1-2 years",
      "Mostly — but I haven't checked in some time",
      "Not sure — I think they were set up at account opening",
      "No nominees, or nominees are outdated",
    ],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "b5-o35",
    type: "behavior",
    domain: "behavior",
    text: "When did you last consult a tax professional or carefully review your tax filing strategy?",
    options: [
      "Within the last year",
      "Within the last 2-3 years",
      "Longer than that",
      "Never — I file basic returns or don't file",
    ],
    correctIndex: 0,
    explanation: "",
  },
];

export const confidenceQuestionsOver35: ConfidenceQuestion[] = [
  {
    id: "c1-o35",
    type: "confidence",
    domain: "confidence",
    text: "How confident are you that your current portfolio is appropriate for your time horizon and goals?",
    options: ["Very confident", "Somewhat confident", "Not very confident", "I haven't thought about it that way"],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "c2-o35",
    type: "confidence",
    domain: "confidence",
    text: "If something happened to you tomorrow, how confident are you that your family would be financially supported?",
    options: ["Very confident — coverage and plans are in place", "Somewhat — basic provisions but gaps exist", "Not very — they would face significant difficulty", "I haven't planned for this"],
    correctIndex: 0,
    explanation: "",
  },
  {
    id: "c3-o35",
    type: "confidence",
    domain: "confidence",
    text: "How prepared do you feel for major upcoming financial milestones (children's education, retirement, healthcare in older age)?",
    options: ["Well prepared with specific plans", "Partially prepared", "Not very prepared", "I haven't planned this in detail"],
    correctIndex: 0,
    explanation: "",
  },
];


// ─────────────────────────────────────────────────────────────
// HELPER FUNCTION
// ─────────────────────────────────────────────────────────────

export function getDiagnosticQuestions(ageGroup: AgeGroup) {
  switch (ageGroup) {
    case "under_25":
      return {
        knowledge: knowledgeQuestionsUnder25,
        behavior: behaviorQuestionsUnder25,
        confidence: confidenceQuestionsUnder25
      };
    case "25_to_35":
      return {
        knowledge: knowledgeQuestions25to35,
        behavior: behaviorQuestions25to35,
        confidence: confidenceQuestions25to35
      };
    case "over_35":
      return {
        knowledge: knowledgeQuestionsOver35,
        behavior: behaviorQuestionsOver35,
        confidence: confidenceQuestionsOver35
      };
  }
}
