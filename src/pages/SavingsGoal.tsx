import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Calendar, TrendingUp } from "lucide-react";

function MonthLabel({ months }: { months: number }) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return <>{m} month{m !== 1 ? "s" : ""}</>;
  if (m === 0) return <>{y} year{y !== 1 ? "s" : ""}</>;
  return <>{y}y {m}m</>;
}

function fmt(n: number) {
  if (n >= 10000000) return "৳" + (n / 10000000).toFixed(2) + " crore";
  if (n >= 100000) return "৳" + (n / 100000).toFixed(2) + "L";
  return "৳" + Math.round(n).toLocaleString("en-BD");
}

function fmtShort(n: number) {
  return "৳" + Math.round(n).toLocaleString("en-BD");
}

const PRESET_GOALS = [
  { label: "Emergency fund (3 months)", emoji: "🛡️", amount: 60000 },
  { label: "Laptop / device", emoji: "💻", amount: 80000 },
  { label: "Wedding fund", emoji: "💍", amount: 500000 },
  { label: "Hajj savings", emoji: "🕌", amount: 600000 },
  { label: "Home down payment", emoji: "🏠", amount: 2000000 },
  { label: "Child's education", emoji: "🎓", amount: 1500000 },
];

const RATE_PRESETS = [
  { label: "Savings a/c ~4%", value: 4 },
  { label: "FDR ~8.5%", value: 8.5 },
  { label: "DPS ~7.5%", value: 7.5 },
  { label: "Sanchaypatra ~11.28%", value: 11.28 },
];

export default function SavingsGoal() {
  const [goalAmount, setGoalAmount] = useState(500000);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [monthlyContrib, setMonthlyContrib] = useState(10000);
  const [annualRate, setAnnualRate] = useState(8.5);
  const [mode, setMode] = useState<"timeline" | "monthly">("timeline");

  // Mode: timeline — given monthly contribution, how long to reach goal?
  // Mode: monthly — given target date (months), what monthly contribution is needed?
  const [targetMonths, setTargetMonths] = useState(36);

  const r = annualRate / 100 / 12;
  const gap = Math.max(0, goalAmount - currentSavings);

  const timelineResult = useMemo(() => {
    if (gap <= 0) return { months: 0, totalContrib: 0, totalInterest: 0 };
    if (r === 0) {
      const months = Math.ceil(gap / monthlyContrib);
      return { months, totalContrib: monthlyContrib * months, totalInterest: 0 };
    }
    // FV of annuity + current savings grown: find n such that PV*(1+r)^n + PMT*((1+r)^n-1)/r >= gap
    let months = 1;
    while (months <= 600) {
      const fv = currentSavings * Math.pow(1 + r, months) + monthlyContrib * ((Math.pow(1 + r, months) - 1) / r);
      if (fv >= goalAmount) break;
      months++;
    }
    const totalContrib = monthlyContrib * months;
    const fv = currentSavings * Math.pow(1 + r, months) + monthlyContrib * ((Math.pow(1 + r, months) - 1) / r);
    const totalInterest = fv - currentSavings - totalContrib;
    return { months, totalContrib, totalInterest: Math.max(0, totalInterest) };
  }, [gap, monthlyContrib, r, currentSavings, goalAmount]);

  const monthlyResult = useMemo(() => {
    if (gap <= 0) return { needed: 0, totalContrib: 0, totalInterest: 0 };
    if (r === 0) {
      const needed = gap / targetMonths;
      return { needed, totalContrib: needed * targetMonths, totalInterest: 0 };
    }
    // PMT = (FV - PV*(1+r)^n) * r / ((1+r)^n - 1)
    const grown = currentSavings * Math.pow(1 + r, targetMonths);
    const needed = (goalAmount - grown) * r / (Math.pow(1 + r, targetMonths) - 1);
    const totalContrib = needed * targetMonths;
    const totalInterest = goalAmount - currentSavings - totalContrib;
    return { needed: Math.max(0, needed), totalContrib: Math.max(0, totalContrib), totalInterest: Math.max(0, totalInterest) };
  }, [gap, targetMonths, r, currentSavings, goalAmount]);

  const inflationRate = 9.5;
  const inflationAdjustedGoal = goalAmount * Math.pow(1 + inflationRate / 100, (mode === "timeline" ? timelineResult.months : targetMonths) / 12);


  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border sticky top-0 bg-background/90 backdrop-blur-sm z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="font-semibold text-sm">Savings Goal Planner</span>
          </div>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Savings Goal Planner</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Figure out exactly how long it takes — or how much you need to save monthly.
          </p>
        </div>

        {/* Goal presets */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Quick goals</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PRESET_GOALS.map((g) => (
              <button
                key={g.label}
                onClick={() => setGoalAmount(g.amount)}
                className={`text-left text-xs rounded-xl border px-3 py-2.5 transition-all ${
                  goalAmount === g.amount
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                <span className="mr-1">{g.emoji}</span>
                {g.label}
                <div className={`font-bold mt-0.5 ${goalAmount === g.amount ? "text-primary" : "text-foreground"}`}>
                  {fmt(g.amount)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Goal amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">৳</span>
                <input
                  type="number"
                  min={1000}
                  step={10000}
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(Math.max(1000, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Already saved</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">৳</span>
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
          </div>

          {/* Rate */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Annual return rate</label>
            <div className="flex flex-wrap gap-2">
              {RATE_PRESETS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setAnnualRate(p.value)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    annualRate === p.value
                      ? "border-primary bg-primary/10 text-primary font-semibold"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={15}
                step={0.1}
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="text-sm font-bold text-primary w-12 text-right">{annualRate}%</span>
            </div>
          </div>

          {/* Mode toggle */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMode("timeline")}
              className={`py-2.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                mode === "timeline"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              <Calendar className="h-4 w-4" />
              How long?
            </button>
            <button
              onClick={() => setMode("monthly")}
              className={`py-2.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                mode === "monthly"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              How much/month?
            </button>
          </div>

          {mode === "timeline" ? (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Monthly savings</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">৳</span>
                <input
                  type="number"
                  min={500}
                  step={500}
                  value={monthlyContrib}
                  onChange={(e) => setMonthlyContrib(Math.max(500, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex gap-2">
                {[5000, 10000, 15000, 20000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setMonthlyContrib(v)}
                    className={`flex-1 text-xs py-1.5 rounded-lg border transition-all ${
                      monthlyContrib === v
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {v / 1000}K
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Target timeline (months)</label>
              <input
                type="number"
                min={1}
                max={360}
                step={1}
                value={targetMonths}
                onChange={(e) => setTargetMonths(Math.min(360, Math.max(1, Number(e.target.value))))}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="flex gap-2">
                {[12, 24, 36, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => setTargetMonths(m)}
                    className={`flex-1 text-xs py-1.5 rounded-lg border transition-all ${
                      targetMonths === m
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Result */}
        {gap <= 0 ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-5 text-center space-y-2">
            <div className="text-3xl">🎉</div>
            <p className="font-bold text-green-700 dark:text-green-300">You've already reached your goal!</p>
            <p className="text-sm text-muted-foreground">Your current savings exceed the target.</p>
          </div>
        ) : mode === "timeline" ? (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Timeline to reach {fmt(goalAmount)}</span>
            </div>
            {timelineResult.months >= 600 ? (
              <p className="text-sm text-amber-600">At {fmtShort(monthlyContrib)}/month, you won't reach this goal within 50 years. Increase your monthly contribution or rate.</p>
            ) : (
              <>
                <div className="text-center py-2">
                  <div className="text-4xl font-bold text-primary">
                    <MonthLabel months={timelineResult.months} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">at {fmtShort(monthlyContrib)}/month</div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">You save</div>
                    <div className="text-sm font-bold text-foreground">{fmt(currentSavings + timelineResult.totalContrib)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Interest earned</div>
                    <div className="text-sm font-bold text-green-600">+{fmt(timelineResult.totalInterest)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Goal</div>
                    <div className="text-sm font-bold text-primary">{fmt(goalAmount)}</div>
                  </div>
                </div>
                <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-xl px-3 py-2">
                  ⚠️ Inflation note: in {Math.floor(timelineResult.months / 12)} year{Math.floor(timelineResult.months / 12) !== 1 ? "s" : ""}, {fmt(goalAmount)} today will cost roughly <span className="font-bold">{fmt(inflationAdjustedGoal)}</span>.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                To reach {fmt(goalAmount)} in <MonthLabel months={targetMonths} />
              </span>
            </div>
            <div className="text-center py-2">
              <div className="text-4xl font-bold text-primary">{fmtShort(monthlyResult.needed)}/mo</div>
              <div className="text-xs text-muted-foreground mt-1">monthly savings needed</div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Total saved</div>
                <div className="text-sm font-bold text-foreground">{fmt(currentSavings + monthlyResult.totalContrib)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Interest</div>
                <div className="text-sm font-bold text-green-600">+{fmt(monthlyResult.totalInterest)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Inflation-adj. goal</div>
                <div className="text-sm font-bold text-amber-600">{fmt(inflationAdjustedGoal)}</div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center space-y-2">
          <Link to="/fdr-calculator" className="text-sm text-primary hover:underline font-medium block">
            Calculate exact FDR / DPS returns →
          </Link>
          <p className="text-xs text-muted-foreground/50">
            Returns are estimates. Tax not included in this planner — use the FDR Calculator for after-tax figures.
          </p>
        </div>
      </div>
    </div>
  );
}
