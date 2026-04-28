import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Info } from "lucide-react";
import SignUpNudge from "@/components/shared/SignUpNudge";

// ── Goal presets ───────────────────────────────────────────────────────────
const GOAL_PRESETS = [
  { label: "Emergency Fund", emoji: "🛡️", amount: 150000, years: 2 },
  { label: "Abroad Studies", emoji: "✈️", amount: 2000000, years: 5 },
  { label: "Wedding", emoji: "💍", amount: 800000, years: 4 },
  { label: "Car Down Payment", emoji: "🚗", amount: 600000, years: 3 },
  { label: "Hajj / Umrah", emoji: "🕌", amount: 700000, years: 5 },
  { label: "Home Down Payment", emoji: "🏠", amount: 3000000, years: 7 },
  { label: "Child's Education", emoji: "🎓", amount: 2500000, years: 10 },
  { label: "Retirement Seed", emoji: "🌱", amount: 5000000, years: 15 },
];

// ── Return presets ─────────────────────────────────────────────────────────
const RETURN_PRESETS = [
  { label: "DPS ~7.5%", value: 7.5 },
  { label: "FDR ~8.5%", value: 8.5 },
  { label: "Sanchaypatra ~11.3%", value: 11.28 },
  { label: "Custom", value: 0 },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function calcSIP(goalAmount: number, currentSavings: number, annualRate: number, years: number) {
  const months = years * 12;
  const r = annualRate / 100 / 12;
  const fvSavings = currentSavings * Math.pow(1 + r, months);
  const gap = Math.max(0, goalAmount - fvSavings);
  if (gap <= 0) return { monthly: 0, totalDeposited: 0, totalInterest: 0 };
  if (r === 0) {
    const monthly = gap / months;
    return { monthly, totalDeposited: monthly * months, totalInterest: 0 };
  }
  // PMT = FV * r / ((1+r)^n - 1)
  const monthly = (gap * r) / (Math.pow(1 + r, months) - 1);
  const totalDeposited = monthly * months;
  // FV of the SIP stream (annuity) + FV of existing savings = goalAmount
  const fvSIP = monthly * ((Math.pow(1 + r, months) - 1) / r);
  const totalFV = fvSIP + fvSavings;
  const totalInterest = Math.max(0, totalFV - currentSavings - totalDeposited);
  return { monthly, totalDeposited, totalInterest };
}

// Milestones: value of fund at end of each year
function buildMilestones(monthly: number, currentSavings: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const milestones: { year: number; value: number; deposited: number }[] = [];
  for (let y = 1; y <= years; y++) {
    const n = y * 12;
    const fv =
      currentSavings * Math.pow(1 + r, n) +
      (r > 0 ? monthly * ((Math.pow(1 + r, n) - 1) / r) : monthly * n);
    milestones.push({ year: y, value: fv, deposited: currentSavings + monthly * n });
  }
  return milestones;
}

function fmt(n: number) {
  if (n >= 10000000) return "৳" + (n / 10000000).toFixed(2) + " cr";
  if (n >= 100000) return "৳" + (n / 100000).toFixed(1) + "L";
  return "৳" + Math.round(n).toLocaleString("en-BD");
}
function fmtShort(n: number) {
  return "৳" + Math.round(n).toLocaleString("en-BD");
}

// ── Component ──────────────────────────────────────────────────────────────
export default function SIPCalculator() {
  const [goalAmount, setGoalAmount] = useState(2000000);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [years, setYears] = useState(5);
  const [returnPresetIdx, setReturnPresetIdx] = useState(1); // FDR default
  const [customRate, setCustomRate] = useState(10);
  const [selectedGoal, setSelectedGoal] = useState<number | null>(1); // abroad studies

  const annualRate =
    RETURN_PRESETS[returnPresetIdx].value > 0
      ? RETURN_PRESETS[returnPresetIdx].value
      : customRate;

  function handleGoalPreset(i: number) {
    setSelectedGoal(i);
    setGoalAmount(GOAL_PRESETS[i].amount);
    setYears(GOAL_PRESETS[i].years);
  }

  const { monthly, totalDeposited, totalInterest } = useMemo(
    () => calcSIP(goalAmount, currentSavings, annualRate, years),
    [goalAmount, currentSavings, annualRate, years]
  );

  const alreadyThere = currentSavings >= goalAmount;
  // totalFV ≈ goalAmount; use it as the denominator so bar always sums to 100%
  const totalFV = currentSavings + totalDeposited + totalInterest;

  const milestones = useMemo(
    () => (monthly > 0 ? buildMilestones(monthly, currentSavings, annualRate, years) : []),
    [monthly, currentSavings, annualRate, years]
  );

  const interestPct = totalFV > 0 ? Math.floor((totalInterest / totalFV) * 100) : 0;
  const depositPct = totalFV > 0 ? Math.floor((totalDeposited / totalFV) * 100) : 0;
  const savingsPct = 100 - interestPct - depositPct;

  // Inflation-adjusted goal
  const inflationRate = 9.5;
  const inflationAdjustedGoal = goalAmount * Math.pow(1 + inflationRate / 100, years);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border sticky top-0 bg-background/90 backdrop-blur-sm z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="font-semibold text-sm">SIP / Goal Calculator</span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">Monthly savings needed</span>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Goal-based SIP Calculator</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pick a goal, set a timeline — see exactly how much to save every month to get there.
          </p>
        </div>

        {/* Goal presets */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Pick a goal
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {GOAL_PRESETS.map((g, i) => (
              <button
                key={g.label}
                onClick={() => handleGoalPreset(i)}
                className={`text-left text-xs rounded-xl border px-3 py-2.5 transition-all ${
                  selectedGoal === i
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                <span className="text-base">{g.emoji}</span>
                <div className="font-semibold mt-0.5 leading-tight text-foreground/90">{g.label}</div>
                <div className="text-muted-foreground/70 mt-0.5">{fmt(g.amount)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Goal amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">৳</span>
                <input
                  type="number"
                  min={10000}
                  step={50000}
                  value={goalAmount}
                  onChange={(e) => { setGoalAmount(Math.max(10000, Number(e.target.value))); setSelectedGoal(null); }}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Already saved
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">৳</span>
                <input
                  type="number"
                  min={0}
                  step={10000}
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Timeline — {years} year{years !== 1 ? "s" : ""}
            </label>
            <input
              type="range"
              min={1}
              max={20}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 5, 7, 10, 15].map((y) => (
                <button
                  key={y}
                  onClick={() => setYears(y)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                    years === y
                      ? "border-primary bg-primary/10 text-primary font-semibold"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {y}yr
                </button>
              ))}
            </div>
          </div>

          {/* Return rate */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Expected annual return
            </label>
            <div className="flex flex-wrap gap-2">
              {RETURN_PRESETS.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setReturnPresetIdx(i)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    returnPresetIdx === i
                      ? "border-primary bg-primary/10 text-primary font-semibold"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {RETURN_PRESETS[returnPresetIdx].value === 0 && (
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.5}
                  value={customRate}
                  onChange={(e) => setCustomRate(Number(e.target.value))}
                  className="flex-1 accent-primary"
                />
                <span className="text-sm font-bold text-primary w-12 text-right">{customRate}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        {alreadyThere ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-5 text-center space-y-2">
            <div className="text-3xl">🎉</div>
            <p className="font-bold text-green-700 dark:text-green-300">You've already reached your goal!</p>
            <p className="text-sm text-muted-foreground">Your current savings exceed the target.</p>
          </div>
        ) : (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                To reach {fmt(goalAmount)} in {years} year{years !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="text-center py-2">
              <div className="text-4xl font-bold text-primary">{fmtShort(monthly)}/mo</div>
              <div className="text-xs text-muted-foreground mt-1">
                monthly savings needed at {annualRate}% p.a.
              </div>
            </div>

            {/* Interest breakdown bar */}
            <div className="space-y-2">
              <div className="h-3 rounded-full overflow-hidden flex bg-muted/50">
                {currentSavings > 0 && (
                  <div
                    className="bg-blue-400 h-full transition-all duration-700"
                    style={{ width: `${savingsPct}%` }}
                  />
                )}
                <div
                  className="bg-primary h-full transition-all duration-700"
                  style={{ width: `${depositPct}%` }}
                />
                <div
                  className="bg-emerald-500 h-full transition-all duration-700"
                  style={{ width: `${interestPct}%` }}
                />
              </div>
              <div className="flex flex-wrap justify-between gap-y-1 text-xs text-muted-foreground">
                {currentSavings > 0 && (
                  <span>
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-1" />
                    Head start {fmt(currentSavings)} ({savingsPct}%)
                  </span>
                )}
                <span>
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mr-1" />
                  You deposit {fmt(totalDeposited)} ({depositPct}%)
                </span>
                <span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1" />
                  Interest {fmt(totalInterest)} ({interestPct}%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Monthly</div>
                <div className="text-sm font-bold text-foreground">{fmtShort(monthly)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Total deposited</div>
                <div className="text-sm font-bold text-foreground">{fmt(totalDeposited)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Interest earned</div>
                <div className="text-sm font-bold text-emerald-600">+{fmt(totalInterest)}</div>
              </div>
            </div>

            {/* Inflation note */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-3 py-2.5 flex gap-2">
              <Info className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 dark:text-amber-300">
                Inflation note: in {years} year{years !== 1 ? "s" : ""}, {fmt(goalAmount)} today will
                cost roughly <span className="font-semibold">{fmt(inflationAdjustedGoal)}</span> at 9.5%
                inflation. Consider setting your goal 15–20% higher to stay safe.
              </p>
            </div>
          </div>
        )}

        {/* Year-by-year milestones */}
        {milestones.length > 0 && !alreadyThere && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Year-by-year growth
            </p>
            <div className="space-y-2">
              {milestones.map((m) => {
                const pct = Math.min((m.value / goalAmount) * 100, 100);
                return (
                  <div key={m.year} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground font-medium">Year {m.year}</span>
                      <span className="text-foreground font-semibold">
                        {fmt(m.value)}
                        <span className="text-muted-foreground ml-1">({Math.round(pct)}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          pct >= 100 ? "bg-emerald-500" : "bg-primary"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Where to invest */}
        {!alreadyThere && (
          <div className="bg-muted/40 border border-border rounded-2xl p-4 space-y-2">
            <p className="text-xs font-semibold text-foreground">Where to put this monthly savings?</p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>DPS (7.5%) → monthly SIP</span>
                <span className="font-semibold text-foreground">
                  {fmtShort(calcSIP(goalAmount, currentSavings, 7.5, years).monthly)}/mo
                </span>
              </div>
              <div className="flex justify-between">
                <span>FDR rollover (8.5%)</span>
                <span className="font-semibold text-foreground">
                  {fmtShort(calcSIP(goalAmount, currentSavings, 8.5, years).monthly)}/mo
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sanchaypatra (11.28%)</span>
                <span className="font-semibold text-emerald-600">
                  {fmtShort(calcSIP(goalAmount, currentSavings, 11.28, years).monthly)}/mo
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Sanchaypatra has a ৳45L max and requires NID + TIN. Best rate available with no risk.
            </p>
          </div>
        )}

        <div className="text-center space-y-2">
          <Link to="/comparator" className="text-sm text-primary hover:underline font-medium block">
            Compare savings instruments →
          </Link>
          <Link to="/fdr-calculator" className="text-sm text-primary hover:underline font-medium block">
            Calculate exact FDR / DPS maturity →
          </Link>
          <p className="text-xs text-muted-foreground/50">
            Returns are pre-tax estimates. Use the FDR Calculator for after-tax figures.
          </p>
        </div>
      </div>

      <SignUpNudge
        delay={45000}
        headline="Save your savings plan"
        sub="Free account so your goals are here when you come back."
      />
    </div>
  );
}
