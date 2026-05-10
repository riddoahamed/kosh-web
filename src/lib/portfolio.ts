// Portfolio Builder logic — pure functions, no React imports

export type Priority = "safety" | "balanced" | "growth";
export type Horizon = 1 | 3 | 5 | 10;

export const INSTRUMENTS = ["savings", "fdr", "sanchaypatra", "dps", "stocks", "gold"] as const;
export type Instrument = (typeof INSTRUMENTS)[number];

export const INSTRUMENT_LABELS: Record<Instrument, string> = {
  savings: "Savings account",
  fdr: "FDR",
  sanchaypatra: "Sanchaypatra",
  dps: "DPS",
  stocks: "Stocks (DSE)",
  gold: "Gold",
};

export const RETURN_ASSUMPTIONS: Record<Instrument, number> = {
  savings: 0.045,
  fdr: 0.085,
  sanchaypatra: 0.105,
  dps: 0.07,
  stocks: 0.09,
  gold: 0.08,
};

export const INFLATION_ASSUMPTION = 0.075;

type AllocationKey = `${Priority}-${Horizon}`;

// Suggested allocations (percentages summing to 100)
const ALLOCATIONS: Record<AllocationKey, Record<Instrument, number>> = {
  "safety-1":   { savings: 60, fdr: 30, sanchaypatra: 0,  dps: 0,  stocks: 0,  gold: 10 },
  "safety-3":   { savings: 30, fdr: 30, sanchaypatra: 30, dps: 0,  stocks: 0,  gold: 10 },
  "safety-5":   { savings: 20, fdr: 20, sanchaypatra: 50, dps: 0,  stocks: 0,  gold: 10 },
  "safety-10":  { savings: 15, fdr: 15, sanchaypatra: 50, dps: 10, stocks: 0,  gold: 10 },
  "balanced-1": { savings: 50, fdr: 40, sanchaypatra: 0,  dps: 0,  stocks: 0,  gold: 10 },
  "balanced-3": { savings: 25, fdr: 25, sanchaypatra: 30, dps: 10, stocks: 0,  gold: 10 },
  "balanced-5": { savings: 15, fdr: 15, sanchaypatra: 35, dps: 15, stocks: 10, gold: 10 },
  "balanced-10":{ savings: 10, fdr: 10, sanchaypatra: 30, dps: 15, stocks: 25, gold: 10 },
  "growth-1":   { savings: 40, fdr: 30, sanchaypatra: 10, dps: 0,  stocks: 10, gold: 10 },
  "growth-3":   { savings: 20, fdr: 15, sanchaypatra: 25, dps: 10, stocks: 20, gold: 10 },
  "growth-5":   { savings: 10, fdr: 10, sanchaypatra: 25, dps: 15, stocks: 30, gold: 10 },
  "growth-10":  { savings: 5,  fdr: 5,  sanchaypatra: 20, dps: 20, stocks: 40, gold: 10 },
};

export function getSuggestedAllocation(priority: Priority, horizon: Horizon): Record<Instrument, number> {
  return { ...ALLOCATIONS[`${priority}-${horizon}` as AllocationKey] };
}

/** Adjust one slice by delta (rounded to 5%). Redistributes proportionally to non-zero others. */
export function adjustAllocation(
  allocation: Record<Instrument, number>,
  changedKey: Instrument,
  delta: number,
): Record<Instrument, number> {
  const next = { ...allocation };
  const newValue = Math.max(0, Math.min(100, next[changedKey] + delta));
  const actualDelta = newValue - next[changedKey];
  if (actualDelta === 0) return next;

  next[changedKey] = newValue;

  const others = INSTRUMENTS.filter((k) => k !== changedKey);
  const otherTotal = others.reduce((sum, k) => sum + next[k], 0);
  const targetOtherTotal = otherTotal - actualDelta;

  if (otherTotal === 0) {
    // Distribute evenly
    const each = targetOtherTotal / others.length;
    for (const k of others) next[k] = Math.max(0, Math.round(each));
  } else {
    for (const k of others) {
      const share = next[k] / otherTotal;
      next[k] = Math.max(0, Math.round(next[k] + share * -actualDelta));
    }
  }

  // Fix rounding to ensure sum = 100
  const sum = INSTRUMENTS.reduce((s, k) => s + next[k], 0);
  if (sum !== 100) {
    const diff = 100 - sum;
    // Apply diff to first non-changed instrument with capacity
    for (const k of others) {
      if (next[k] + diff >= 0 && next[k] + diff <= 100) {
        next[k] += diff;
        break;
      }
    }
  }

  return next;
}

/** Compute nominal value at a future year given a starting principal and an allocation. */
export function projectNominal(principal: number, allocation: Record<Instrument, number>, years: number): number {
  let total = 0;
  for (const k of INSTRUMENTS) {
    const slicePrincipal = principal * (allocation[k] / 100);
    total += slicePrincipal * Math.pow(1 + RETURN_ASSUMPTIONS[k], years);
  }
  return total;
}

export function projectReal(principal: number, allocation: Record<Instrument, number>, years: number): number {
  const nominal = projectNominal(principal, allocation, years);
  return nominal / Math.pow(1 + INFLATION_ASSUMPTION, years);
}

export interface PortfolioAnalysis {
  riskScore: 1 | 2 | 3 | 4 | 5;
  diversification: "Concentrated" | "Moderately diversified" | "Well diversified";
  alignment: { aligned: boolean; warning?: string };
}

export function analyzePortfolio(
  allocation: Record<Instrument, number>,
  priority: Priority,
  horizon: Horizon,
): PortfolioAnalysis {
  const equityWeight = allocation.stocks + allocation.gold;
  let riskScore: 1 | 2 | 3 | 4 | 5 = 1;
  if (equityWeight >= 60) riskScore = 5;
  else if (equityWeight >= 45) riskScore = 4;
  else if (equityWeight >= 30) riskScore = 3;
  else if (equityWeight >= 15) riskScore = 2;

  const nonZero = INSTRUMENTS.filter((k) => allocation[k] > 0).length;
  const diversification: PortfolioAnalysis["diversification"] =
    nonZero >= 4 ? "Well diversified" : nonZero >= 2 ? "Moderately diversified" : "Concentrated";

  // Alignment heuristics
  let alignment: PortfolioAnalysis["alignment"] = { aligned: true };
  if (priority === "safety" && allocation.stocks >= 20) {
    alignment = { aligned: false, warning: "Safety priority but heavy stock allocation. Consider reducing stocks." };
  } else if (horizon === 1 && (allocation.sanchaypatra >= 20 || allocation.dps >= 20)) {
    alignment = { aligned: false, warning: "1-year horizon but allocated to long-lock instruments (Sanchaypatra/DPS). Liquidity could be a problem." };
  } else if (priority === "growth" && horizon >= 5 && allocation.stocks < 10) {
    alignment = { aligned: false, warning: "Growth priority on a long horizon but very little equity. Real returns may struggle to beat inflation." };
  }

  return { riskScore, diversification, alignment };
}
