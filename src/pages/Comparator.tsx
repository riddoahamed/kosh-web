import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import SignUpNudge from "@/components/shared/SignUpNudge";

interface Instrument {
  id: string;
  name: string;
  nameLocal: string;
  rate: number; // annual %
  taxRate: number; // % withheld at source
  minAmount: number;
  maxAmount: number | null;
  liquidity: "low" | "medium" | "high";
  riskLevel: "none" | "low" | "medium" | "high";
  notes: string;
  color: string;
}

const INSTRUMENTS: Instrument[] = [
  {
    id: "sanchaypatra",
    name: "5-Year Sanchaypatra",
    nameLocal: "সঞ্চয়পত্র",
    rate: 11.28,
    taxRate: 5,
    minAmount: 10000,
    maxAmount: 4500000,
    liquidity: "low",
    riskLevel: "none",
    notes: "Government-backed. Max ৳45L for family savings. TDS 5% on interest.",
    color: "emerald",
  },
  {
    id: "fdr",
    name: "1-Year FDR (Scheduled Bank)",
    nameLocal: "এফডিআর",
    rate: 8.5,
    taxRate: 15,
    minAmount: 50000,
    maxAmount: null,
    liquidity: "medium",
    riskLevel: "low",
    notes: "Scheduled bank. BDIC insured up to ৳1L. 15% TDS on interest. 1% early exit penalty typical.",
    color: "blue",
  },
  {
    id: "dps",
    name: "DPS (Monthly Savings)",
    nameLocal: "ডিপিএস",
    rate: 7.5,
    taxRate: 15,
    minAmount: 500,
    maxAmount: null,
    liquidity: "low",
    riskLevel: "low",
    notes: "Monthly installment plan. Rate quoted is effective annual return on total deposited. Bank-specific rates vary.",
    color: "violet",
  },
  {
    id: "savings",
    name: "Savings Account",
    nameLocal: "সেভিংস অ্যাকাউন্ট",
    rate: 4.0,
    taxRate: 15,
    minAmount: 0,
    maxAmount: null,
    liquidity: "high",
    riskLevel: "none",
    notes: "High liquidity. Rate varies by bank (typically 3.5–5%). 15% TDS on interest.",
    color: "slate",
  },
];

const LIQUIDITY_LABEL: Record<string, string> = {
  low: "Low — locked",
  medium: "Medium — penalty",
  high: "Fully liquid",
};

const RISK_LABEL: Record<string, string> = {
  none: "No risk",
  low: "Low",
  medium: "Medium",
  high: "High",
};

const COLOR_MAP: Record<string, { bg: string; text: string; bar: string; border: string }> = {
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-700 dark:text-emerald-300", bar: "bg-emerald-500", border: "border-emerald-200 dark:border-emerald-700" },
  blue: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-300", bar: "bg-blue-500", border: "border-blue-200 dark:border-blue-700" },
  violet: { bg: "bg-violet-50 dark:bg-violet-900/20", text: "text-violet-700 dark:text-violet-300", bar: "bg-violet-500", border: "border-violet-200 dark:border-violet-700" },
  slate: { bg: "bg-slate-100 dark:bg-slate-800/50", text: "text-slate-600 dark:text-slate-300", bar: "bg-slate-400", border: "border-slate-200 dark:border-slate-700" },
};

function calcReturn(principal: number, rate: number, taxRate: number, years: number) {
  const grossInterest = principal * (rate / 100) * years;
  const tax = grossInterest * (taxRate / 100);
  const netInterest = grossInterest - tax;
  const maturity = principal + netInterest;
  const effectiveRate = (netInterest / principal / years) * 100;
  return { grossInterest, tax, netInterest, maturity, effectiveRate };
}

function fmt(n: number) {
  return "৳" + Math.round(n).toLocaleString("en-BD");
}

export default function Comparator() {
  const [principal, setPrincipal] = useState(100000);
  const [years, setYears] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["sanchaypatra", "fdr", "dps", "savings"])
  );

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const active = INSTRUMENTS.filter((i) => selected.has(i.id));
  const results = active.map((inst) => ({
    inst,
    ...calcReturn(principal, inst.rate, inst.taxRate, years),
  }));

  const maxMaturity = Math.max(...results.map((r) => r.maturity));

  // Current inflation benchmark
  const inflationRate = 9.5;
  const inflationAdjustedValue = principal * Math.pow(1 + inflationRate / 100, years);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border sticky top-0 bg-background/90 backdrop-blur-sm z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="font-semibold text-sm">Savings Comparator</span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">Bangladesh savings instruments</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Compare Savings Instruments</h1>
          <p className="text-sm text-muted-foreground mt-1">
            After-tax returns for Bangladeshi savings options. Rates as of 2024.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Principal amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">৳</span>
              <input
                type="number"
                min={1000}
                step={10000}
                value={principal}
                onChange={(e) => setPrincipal(Math.max(1000, Number(e.target.value)))}
                className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[50000, 100000, 500000, 1000000].map((v) => (
                <button
                  key={v}
                  onClick={() => setPrincipal(v)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                    principal === v
                      ? "border-primary bg-primary/10 text-primary font-semibold"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {v >= 100000 ? `${v / 100000}L` : `${v / 1000}K`}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Duration
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 5].map((y) => (
                <button
                  key={y}
                  onClick={() => setYears(y)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    years === y
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {y}yr
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Instrument toggles */}
        <div className="flex flex-wrap gap-2">
          {INSTRUMENTS.map((inst) => {
            const c = COLOR_MAP[inst.color];
            const on = selected.has(inst.id);
            return (
              <button
                key={inst.id}
                onClick={() => toggle(inst.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                  on ? `${c.bg} ${c.text} ${c.border}` : "border-border text-muted-foreground"
                }`}
              >
                {inst.name}
              </button>
            );
          })}
        </div>

        {/* Results bars */}
        <div className="space-y-3">
          {results
            .sort((a, b) => b.maturity - a.maturity)
            .map(({ inst, maturity, netInterest, tax, effectiveRate }) => {
              const c = COLOR_MAP[inst.color];
              const barPct = (maturity / maxMaturity) * 100;
              const beatsInflation = maturity > inflationAdjustedValue;
              return (
                <div key={inst.id} className={`rounded-2xl border p-4 space-y-3 ${c.bg} ${c.border}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className={`font-bold text-sm ${c.text}`}>{inst.name}</div>
                      <div className="text-xs text-muted-foreground">{inst.nameLocal} · {inst.rate}% gross · {inst.taxRate}% TDS</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-lg font-bold ${c.text}`}>{fmt(maturity)}</div>
                      <div className="text-xs text-muted-foreground">maturity value</div>
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="h-2 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${c.bar}`}
                      style={{ width: `${barPct}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>Net interest: <span className="font-semibold text-foreground">{fmt(netInterest)}</span></span>
                    <span>Tax paid: <span className="font-semibold text-foreground">{fmt(tax)}</span></span>
                    <span>Effective rate: <span className="font-semibold text-foreground">{effectiveRate.toFixed(2)}%</span></span>
                    <span>Liquidity: <span className="font-semibold text-foreground">{LIQUIDITY_LABEL[inst.liquidity]}</span></span>
                    <span>Risk: <span className="font-semibold text-foreground">{RISK_LABEL[inst.riskLevel]}</span></span>
                    {beatsInflation ? (
                      <span className="text-green-600 font-semibold">✓ Beats inflation</span>
                    ) : (
                      <span className="text-amber-600 font-semibold">⚠ Below inflation</span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Inflation reference */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex gap-3">
          <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800 dark:text-amber-300 space-y-1">
            <p className="font-semibold">Inflation reference: ~9.5% (Bangladesh, 2024)</p>
            <p>
              To maintain purchasing power, {fmt(principal)} needs to grow to{" "}
              <span className="font-semibold">{fmt(inflationAdjustedValue)}</span> over {years} year{years > 1 ? "s" : ""}. Only instruments that beat this line preserve your real wealth.
            </p>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Notes</p>
          {active.map((inst) => (
            <div key={inst.id} className="flex gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground shrink-0">{inst.name}:</span>
              <span>{inst.notes}</span>
            </div>
          ))}
          <p className="text-xs text-muted-foreground/60 mt-2">
            Rates are indicative and for educational purposes only. Verify current rates before investing.
          </p>
        </div>

        <div className="text-center pt-4">
          <Link to="/check" className="text-sm text-primary hover:underline font-medium">
            Take the Money Check to see where you actually stand →
          </Link>
        </div>
      </div>

      <SignUpNudge
        delay={45000}
        headline="Save your comparison"
        sub="Free account to bookmark your best savings option."
      />
    </div>
  );
}
