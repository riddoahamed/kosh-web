import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Wallet, ChevronDown, ChevronUp } from "lucide-react";
import SignUpNudge from "@/components/shared/SignUpNudge";

const INCOME_PRESETS = [
  { label: "৳15K", value: 15000 },
  { label: "৳25K", value: 25000 },
  { label: "৳40K", value: 40000 },
  { label: "৳60K", value: 60000 },
  { label: "৳1L", value: 100000 },
];

interface Category {
  id: string;
  label: string;
  examples: string;
}

const NEEDS_CATS: Category[] = [
  { id: "rent", label: "Rent / Housing", examples: "Basha, mess, hostel" },
  { id: "food", label: "Food & Groceries", examples: "Bazar, meals, canteen" },
  { id: "transport", label: "Transport", examples: "Rickshaw, Pathao, bus, CNG" },
  { id: "utilities", label: "Utilities & Bills", examples: "Electricity, gas, water, internet" },
  { id: "health", label: "Health / Medicine", examples: "Medicine, doctor visits" },
  { id: "education", label: "Education / Skills", examples: "Tuition, courses, books" },
];

const WANTS_CATS: Category[] = [
  { id: "dining", label: "Dining Out / Delivery", examples: "Foodpanda, Shohoz Food, restaurants" },
  { id: "shopping", label: "Shopping / Clothing", examples: "Daraz, clothes, accessories" },
  { id: "entertainment", label: "Entertainment", examples: "OTT, games, outings, cinema" },
  { id: "subscriptions", label: "Subscriptions & Apps", examples: "Netflix, Spotify, bKash fees" },
  { id: "personal", label: "Personal Care", examples: "Salon, skincare, grooming" },
  { id: "misc", label: "Miscellaneous Wants", examples: "Gifts, hobbies, anything extra" },
];

function fmt(n: number) {
  if (n >= 100000) return "৳" + (n / 100000).toFixed(1) + "L";
  return "৳" + Math.round(n).toLocaleString("en-BD");
}

function ProgressBar({ actual, target, color, goodWhenOver = false }: { actual: number; target: number; color: string; goodWhenOver?: boolean }) {
  const pct = target > 0 ? Math.min((actual / target) * 100, 120) : 0;
  const over = actual > target;
  const isRed = goodWhenOver ? false : over;
  return (
    <div className="h-2 bg-muted rounded-full overflow-hidden relative">
      <div
        className={`h-full rounded-full transition-all duration-500 ${
          isRed ? "bg-red-500" : color
        }`}
        style={{ width: `${Math.min(pct, 100)}%` }}
      />
    </div>
  );
}

function CategoryInput({
  cat,
  value,
  onChange,
}: {
  cat: Category;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-foreground">{cat.label}</div>
        <div className="text-xs text-muted-foreground/60 truncate">{cat.examples}</div>
      </div>
      <div className="relative shrink-0">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
          ৳
        </span>
        <input
          type="number"
          min={0}
          step={500}
          value={value || ""}
          placeholder="0"
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="w-28 pl-5 pr-2 py-1.5 rounded-lg border border-border bg-card text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 text-right"
        />
      </div>
    </div>
  );
}

export default function BudgetPlanner() {
  const [income, setIncome] = useState(40000);
  const [needsValues, setNeedsValues] = useState<Record<string, number>>({});
  const [wantsValues, setWantsValues] = useState<Record<string, number>>({});
  const [showNeeds, setShowNeeds] = useState(true);
  const [showWants, setShowWants] = useState(true);

  const needsTarget = income * 0.5;
  const wantsTarget = income * 0.3;
  const savingsTarget = income * 0.2;

  const totalNeeds = useMemo(
    () => Object.values(needsValues).reduce((a, b) => a + b, 0),
    [needsValues]
  );
  const totalWants = useMemo(
    () => Object.values(wantsValues).reduce((a, b) => a + b, 0),
    [wantsValues]
  );
  const impliedSavings = income - totalNeeds - totalWants;

  const hasData = totalNeeds > 0 || totalWants > 0;
  const savingsRate = income > 0 ? (impliedSavings / income) * 100 : 0;

  function updateNeeds(id: string, v: number) {
    setNeedsValues((prev) => ({ ...prev, [id]: v }));
  }
  function updateWants(id: string, v: number) {
    setWantsValues((prev) => ({ ...prev, [id]: v }));
  }

  const needsOver = totalNeeds > needsTarget;
  const wantsOver = totalWants > wantsTarget;
  const savingsShort = impliedSavings < savingsTarget;

  function getBucketLabel(actual: number, target: number): string {
    if (actual === 0) return "Not filled yet";
    const diff = actual - target;
    if (diff <= 0) return `৳${Math.abs(Math.round(diff)).toLocaleString("en-BD")} under budget`;
    return `৳${Math.round(diff).toLocaleString("en-BD")} over budget`;
  }

  function getBucketColor(actual: number, target: number, isSavings = false): string {
    if (actual === 0) return "text-muted-foreground";
    if (isSavings) return actual >= target ? "text-green-600" : "text-amber-600";
    return actual <= target ? "text-green-600" : "text-red-600";
  }

  const savingsColor =
    impliedSavings <= 0
      ? "text-red-600"
      : savingsRate >= 20
      ? "text-green-600"
      : savingsRate >= 10
      ? "text-amber-600"
      : "text-red-600";

  const savingsMessage =
    impliedSavings <= 0
      ? "Spending more than you earn — needs urgent review."
      : savingsRate >= 20
      ? "On target. You're building real financial resilience."
      : savingsRate >= 10
      ? "Below the 20% target but a start. Look for cuts in Wants."
      : "Low savings rate. Small cuts to wants can make a big difference.";

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border sticky top-0 bg-background/90 backdrop-blur-sm z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="font-semibold text-sm">Budget Planner</span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">50 / 30 / 20 rule</span>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Monthly Budget Planner</h1>
          <p className="text-sm text-muted-foreground mt-1">
            The 50/30/20 rule: 50% Needs · 30% Wants · 20% Savings. Enter your income and
            actual spending to see where you stand.
          </p>
        </div>

        {/* Income */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Monthly take-home income (after tax / zakat)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
              ৳
            </span>
            <input
              type="number"
              min={5000}
              step={1000}
              value={income}
              onChange={(e) => setIncome(Math.max(5000, Number(e.target.value)))}
              className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {INCOME_PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => setIncome(p.value)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  income === p.value
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Target summary row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "50% Needs", target: needsTarget, actual: totalNeeds, color: "bg-blue-500", textColor: "text-blue-700 dark:text-blue-300", bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800", isSavings: false },
            { label: "30% Wants", target: wantsTarget, actual: totalWants, color: "bg-violet-500", textColor: "text-violet-700 dark:text-violet-300", bg: "bg-violet-50 dark:bg-violet-900/20 border-violet-100 dark:border-violet-800", isSavings: false },
            { label: "20% Savings", target: savingsTarget, actual: hasData ? Math.max(0, impliedSavings) : 0, color: "bg-emerald-500", textColor: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800", isSavings: true },
          ].map((b) => (
            <div key={b.label} className={`rounded-2xl border p-3 space-y-2 ${b.bg}`}>
              <div className={`text-xs font-semibold ${b.textColor}`}>{b.label}</div>
              <div className="text-base font-bold text-foreground">{fmt(b.target)}</div>
              <ProgressBar actual={b.actual} target={b.target} color={b.color} goodWhenOver={b.isSavings} />
              <div className={`text-xs font-medium ${getBucketColor(b.actual, b.target, b.isSavings)}`}>
                {b.actual === 0 ? "—" : b.isSavings ? fmt(b.actual) + " left" : fmt(b.actual) + " used"}
              </div>
            </div>
          ))}
        </div>

        {/* Needs */}
        <div className="rounded-2xl border border-blue-100 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10 overflow-hidden">
          <button
            onClick={() => setShowNeeds((s) => !s)}
            className="w-full flex items-center justify-between px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Needs (50%) — Target {fmt(needsTarget)}
              </span>
              {totalNeeds > 0 && (
                <span className={`text-xs font-semibold ${getBucketColor(totalNeeds, needsTarget)}`}>
                  {getBucketLabel(totalNeeds, needsTarget)}
                </span>
              )}
            </div>
            {showNeeds ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {showNeeds && (
            <div className="px-4 pb-4 space-y-3 border-t border-blue-100 dark:border-blue-800 pt-3">
              {needsOver && (
                <p className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-1.5">
                  Your needs ({fmt(totalNeeds)}) exceed 50% of income. Check rent and food — these are the usual culprits in Bangladesh.
                </p>
              )}
              {NEEDS_CATS.map((cat) => (
                <CategoryInput
                  key={cat.id}
                  cat={cat}
                  value={needsValues[cat.id] || 0}
                  onChange={(v) => updateNeeds(cat.id, v)}
                />
              ))}
              <div className="flex justify-between text-xs text-muted-foreground border-t border-blue-100 dark:border-blue-800 pt-2 mt-1">
                <span>Total needs</span>
                <span className={`font-bold ${getBucketColor(totalNeeds, needsTarget)}`}>
                  {fmt(totalNeeds)} / {fmt(needsTarget)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Wants */}
        <div className="rounded-2xl border border-violet-100 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-900/10 overflow-hidden">
          <button
            onClick={() => setShowWants((s) => !s)}
            className="w-full flex items-center justify-between px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                Wants (30%) — Target {fmt(wantsTarget)}
              </span>
              {totalWants > 0 && (
                <span className={`text-xs font-semibold ${getBucketColor(totalWants, wantsTarget)}`}>
                  {getBucketLabel(totalWants, wantsTarget)}
                </span>
              )}
            </div>
            {showWants ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {showWants && (
            <div className="px-4 pb-4 space-y-3 border-t border-violet-100 dark:border-violet-800 pt-3">
              {wantsOver && (
                <p className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-1.5">
                  Wants ({fmt(totalWants)}) over 30% budget. Dining out and subscriptions are
                  the easiest places to find ৳2–5K savings.
                </p>
              )}
              {WANTS_CATS.map((cat) => (
                <CategoryInput
                  key={cat.id}
                  cat={cat}
                  value={wantsValues[cat.id] || 0}
                  onChange={(v) => updateWants(cat.id, v)}
                />
              ))}
              <div className="flex justify-between text-xs text-muted-foreground border-t border-violet-100 dark:border-violet-800 pt-2 mt-1">
                <span>Total wants</span>
                <span className={`font-bold ${getBucketColor(totalWants, wantsTarget)}`}>
                  {fmt(totalWants)} / {fmt(wantsTarget)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Savings result */}
        <div
          className={`rounded-2xl border p-5 space-y-3 ${
            impliedSavings <= 0
              ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              : savingsRate >= 20
              ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
              : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <Wallet className={`h-4 w-4 ${savingsColor}`} />
            <span className={`text-sm font-semibold ${savingsColor}`}>
              Your savings picture
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-xs text-muted-foreground">Savings target</div>
              <div className="text-base font-bold text-foreground">{fmt(savingsTarget)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Implied savings</div>
              <div className={`text-base font-bold ${savingsColor}`}>
                {fmt(Math.max(0, impliedSavings))}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Savings rate</div>
              <div className={`text-base font-bold ${savingsColor}`}>
                {impliedSavings <= 0 ? "0" : savingsRate.toFixed(1)}%
              </div>
            </div>
          </div>

          <p className={`text-xs leading-relaxed ${savingsColor}`}>{savingsMessage}</p>

          {savingsShort && impliedSavings > 0 && (
            <div className="bg-background/60 rounded-xl px-3 py-2 text-xs text-muted-foreground">
              At {fmt(impliedSavings)}/month in a DPS (~7.5%), you'll have{" "}
              <span className="font-semibold text-foreground">
                {(() => {
                  const r = 0.075 / 12;
                  const fv = impliedSavings * ((Math.pow(1 + r, 12) - 1) / r);
                  const interest = fv - impliedSavings * 12;
                  return fmt(fv - interest * 0.15); // 15% TDS on interest
                })()}
              </span>{" "}
              after 1 year (after 15% tax on interest).
            </div>
          )}
        </div>

        {/* Quick insight */}
        {(totalNeeds > 0 || totalWants > 0) && (
          <div className="bg-muted/50 rounded-2xl border border-border p-4 space-y-2">
            <p className="text-xs font-semibold text-foreground">Full breakdown</p>
            <div className="space-y-1.5">
              {[
                { label: "Income", value: income, color: "text-foreground" },
                { label: "− Needs", value: -totalNeeds, color: "text-blue-600" },
                { label: "− Wants", value: -totalWants, color: "text-violet-600" },
                { label: "= Remaining (savings)", value: impliedSavings, color: impliedSavings >= 0 ? "text-emerald-600" : "text-red-600" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className={`font-semibold ${row.color}`}>
                    {row.value >= 0 ? fmt(row.value) : `−${fmt(Math.abs(row.value))}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center space-y-2">
          <Link to="/savings-goal" className="text-sm text-primary hover:underline font-medium block">
            Now plan your savings goal →
          </Link>
          <Link to="/comparator" className="text-sm text-primary hover:underline font-medium block">
            Compare where to put those savings →
          </Link>
        </div>
      </div>

      <SignUpNudge
        delay={45000}
        headline="Track your budget monthly"
        sub="Free account to revisit and compare your numbers each month."
      />
    </div>
  );
}
