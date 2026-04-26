export interface ChallengeDay {
  day: number;
  week: number;
  title: string;
  action: string;
  module: string; // which module it reinforces
}

export const CHALLENGE_DAYS: ChallengeDay[] = [
  // Week 1 — Clarity
  { day: 1, week: 1, title: "Face the numbers", action: "Check your bank balance right now and write it down. Exact amount.", module: "1" },
  { day: 2, week: 1, title: "Subscription audit", action: "List every app, service, or subscription you pay for. Add up the total.", module: "1" },
  { day: 3, week: 1, title: "Food spend", action: "Calculate how much you spent on food last week — delivery, restaurants, groceries.", module: "1" },
  { day: 4, week: 1, title: "Your real return", action: "Find your savings account rate. Subtract BD inflation (~9%). That's your real return.", module: "2" },
  { day: 5, week: 1, title: "Inflation math", action: "If you have Tk 1,00,000 in a savings account at 5%, and inflation is 9% — how much buying power do you lose per year?", module: "2" },
  { day: 6, week: 1, title: "Map your 3 buckets", action: "What % of your income goes to Safety / Growth / Speculation? Write the real numbers.", module: "3" },
  { day: 7, week: 1, title: "Weekly review", action: "Review days 1–6. What surprised you most about your own money habits?", module: "1" },

  // Week 2 — Emergency Fund
  { day: 8,  week: 2, title: "Essential expenses", action: "Calculate your monthly essentials: rent + food + transport + bills. Total only.", module: "5" },
  { day: 9,  week: 2, title: "Your target", action: "Multiply your essentials by 3. That's your emergency fund target. Write it somewhere visible.", module: "5" },
  { day: 10, week: 2, title: "Check your safety net", action: "Honestly: if you lost your income tomorrow, how many months could you survive without borrowing?", module: "5" },
  { day: 11, week: 2, title: "Rate research", action: "Call or check online: what FDR rates are 2 banks near you offering right now?", module: "6" },
  { day: 12, week: 2, title: "Sanchaypatra eligibility", action: "Check your eligibility for Sanchaypatra. Do you have NID + TIN? If not — what's the first step?", module: "6" },
  { day: 13, week: 2, title: "Tell someone", action: "Tell one person (friend, sibling, partner) your emergency fund goal. Saying it out loud makes it real.", module: "5" },
  { day: 14, week: 2, title: "Small start", action: "Transfer even Tk 500 to a separate savings account today. Starting matters more than the amount.", module: "5" },

  // Week 3 — Grey Zone & Investing
  { day: 15, week: 3, title: "Scam pattern check", action: "Think of 3 investment offers you've seen in the last year. Did any show the 3 red flags?", module: "4" },
  { day: 16, week: 3, title: "Signal group audit", action: "Are you in any Telegram/WhatsApp signal or investment groups? List them honestly.", module: "7" },
  { day: 17, week: 3, title: "The math on crypto", action: "If 70-90% of retail traders lose money, and you're in a group of 100 — how many are likely winning?", module: "7" },
  { day: 18, week: 3, title: "One exit", action: "Leave one hype channel, signal group, or 'guru' account today. One.", module: "7" },
  { day: 19, week: 3, title: "DPS calculator", action: "If you saved Tk 2,000/month for 5 years at 8%: what do you get? (Hint: ~Tk 1,47,000)", module: "6" },
  { day: 20, week: 3, title: "DSE basics", action: "Look up the DSE website. What is the market cap today? What was the index 1 year ago?", module: "6" },
  { day: 21, week: 3, title: "1-year goal", action: "Write a specific savings goal for the next 12 months. Amount, purpose, and how (which instrument).", module: "3" },

  // Week 4 — System Building
  { day: 22, week: 4, title: "4-bucket draft", action: "Draw your 4-bucket system for next month on paper. Essentials / Emergency / Growth / Life.", module: "8" },
  { day: 23, week: 4, title: "Budget vs reality", action: "Compare last month's spending to your 4-bucket targets. Which bucket went most over?", module: "8" },
  { day: 24, week: 4, title: "Automate one thing", action: "Set up one auto-transfer — even Tk 500 to your emergency fund on salary day.", module: "8" },
  { day: 25, week: 4, title: "BD scam research", action: "Search '2024 Bangladesh financial scam'. Read one real story. What was the pattern?", module: "4" },
  { day: 26, week: 4, title: "Older wisdom", action: "Ask someone 10+ years older than you: what's one financial mistake they wish they hadn't made?", module: "1" },
  { day: 27, week: 4, title: "Net worth snapshot", action: "Calculate your net worth: all your assets (savings, investments) minus all your debts. Write the number.", module: "8" },
  { day: 28, week: 4, title: "3 decisions", action: "Write 3 financial decisions you made this year — at least 1 bad one, 1 good one. What did you learn?", module: "1" },
  { day: 29, week: 4, title: "6-month goal", action: "Set one specific, measurable financial goal for the next 6 months. Amount + date + purpose.", module: "8" },
  { day: 30, week: 4, title: "Retest day 🎯", action: "Take the Kosh diagnostic again. See exactly how much your knowledge and mindset has improved.", module: "0" },
];

export const WEEK_TITLES: Record<number, string> = {
  1: "Week 1 — Clarity",
  2: "Week 2 — Emergency Fund",
  3: "Week 3 — Grey Zone & Investing",
  4: "Week 4 — System Building",
};
