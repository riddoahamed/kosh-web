import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp } from "lucide-react";

type Scheme = "fdr" | "dps" | "sanchaypatra";
type Compound = "monthly" | "quarterly" | "yearly" | "maturity";

interface SchemeConfig {
  label: string;
  labelLocal: string;
  defaultRate: number;
  defaultTerm: number;
  taxRate: number;
  compound: Compound;
  description: string;
  isDPS: boolean;
}

const SCHEMES: Record<Scheme, SchemeConfig> = {
  fdr: {
    label: "FDR — Fixed Deposit",
    labelLocal: "এফডিআর",
    defaultRate: 8.5,
    defaultTerm: 12,
    taxRate: 15,
    compound: "quarterly",
    description: "One-time deposit. Interest compounded quarterly, 15% TDS at source.",
    isDPS: false,
  },
  dps: {
    label: "DPS — Monthly Savings",
    labelLocal: "ডিপিএস",
    defaultRate: 7.5,
    defaultTerm: 36,
    taxRate: 15,
    compound: "maturity",
    description: "Regular monthly installment. Total interest paid at maturity, 15% TDS.",
    isDPS: true,
  },
  sanchaypatra: {
    label: "Sanchaypatra",
    labelLocal: "সঞ্চয়পত্র",
    defaultRate: 11.28,
    defaultTerm: 60,
    taxRate: 5,
    compound: "quarterly",
    description: "Government savings certificate. Quarterly interest payments, 5% TDS.",
    isDPS: false,
  },
};

function calcFDR(principal: number, rate: number, months: number, compound: Compound, taxRate: number) {
  const r = rate / 100;
  const t = months / 12;
  let maturity: number;
  if (compound === "monthly") {
    maturity = principal * Math.pow(1 + r / 12, months);
  } else if (compound === "quarterly") {
    maturity = principal * Math.pow(1 + r / 4, months / 3);
  } else if (compound === "yearly") {
    maturity = principal * Math.pow(1 + r, t);
  } else {
    maturity = principal * (1 + r * t);
  }
  const grossInterest = maturity - principal;
  const tax = grossInterest * (taxRate / 100);
  const netInterest = grossInterest - tax;
  const netMaturity = principal + netInterest;
  return { grossInterest, tax, netInterest, maturity: netMaturity };
}

function calcDPS(monthly: number, rate: number, months: number, taxRate: number) {
  const totalDeposited = monthly * months;
  const r = rate / 100 / 12;
  // Future value of annuity
  const fv = monthly * ((Math.pow(1 + r, months) - 1) / r);
  const grossInterest = fv - totalDeposited;
  const tax = grossInterest * (taxRate / 100);
  const netInterest = grossInterest - tax;
  const netMaturity = totalDeposited + netInterest;
  return { totalDeposited, grossInterest, tax, netInterest, maturity: netMaturity };
}

function fmt(n: number) {
  return "৳" + Math.round(n).toLocaleString("en-BD");
}

export default function FDRCalculator() {
  const [scheme, setScheme] = useState<Scheme>("fdr");
  const [principal, setPrincipal] = useState(100000);
  const [monthlyInstallment, setMonthlyInstallment] = useState(5000);
  const [rate, setRate] = useState(SCHEMES.fdr.defaultRate);
  const [term, setTerm] = useState(SCHEMES.fdr.defaultTerm);

  const cfg = SCHEMES[scheme];

  function handleSchemeChange(s: Scheme) {
    setScheme(s);
    setRate(SCHEMES[s].defaultRate);
    setTerm(SCHEMES[s].defaultTerm);
  }

  const result = useMemo(() => {
    if (cfg.isDPS) {
      return calcDPS(monthlyInstallment, rate, term, cfg.taxRate);
    }
    return calcFDR(principal, rate, term, cfg.compound, cfg.taxRate);
  }, [scheme, principal, monthlyInstallment, rate, term, cfg]);

  const totalInvested = cfg.isDPS
    ? (result as ReturnType<typeof calcDPS>).totalDeposited
    : principal;

  const returnPct = ((result.netInterest / totalInvested) * 100 * (12 / term)).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border sticky top-0 bg-background/90 backdrop-blur-sm z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="font-semibold text-sm">FDR / DPS Calculator</span>
          </div>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">FDR / DPS / Sanchaypatra Calculator</h1>
          <p className="text-sm text-muted-foreground mt-1">
            After-tax returns for Bangladesh savings instruments.
          </p>
        </div>

        {/* Scheme selector */}
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(SCHEMES) as Scheme[]).map((s) => (
            <button
              key={s}
              onClick={() => handleSchemeChange(s)}
              className={`py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all text-center leading-tight ${
                scheme === s
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              <div>{SCHEMES[s].label.split("—")[0].trim()}</div>
              <div className="font-normal opacity-70">{SCHEMES[s].labelLocal}</div>
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground bg-muted/50 rounded-xl px-3 py-2">{cfg.description}</p>

        {/* Inputs */}
        <div className="space-y-4">
          {cfg.isDPS ? (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Monthly Installment
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">৳</span>
                <input
                  type="number"
                  min={500}
                  step={500}
                  value={monthlyInstallment}
                  onChange={(e) => setMonthlyInstallment(Math.max(500, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex gap-2">
                {[2000, 5000, 10000, 20000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setMonthlyInstallment(v)}
                    className={`flex-1 text-xs py-1.5 rounded-lg border transition-all ${
                      monthlyInstallment === v
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {v >= 1000 ? `${v / 1000}K` : v}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Principal Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">৳</span>
                <input
                  type="number"
                  min={10000}
                  step={10000}
                  value={principal}
                  onChange={(e) => setPrincipal(Math.max(10000, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex gap-2">
                {[50000, 100000, 500000, 1000000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setPrincipal(v)}
                    className={`flex-1 text-xs py-1.5 rounded-lg border transition-all ${
                      principal === v
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {v >= 100000 ? `${v / 100000}L` : `${v / 1000}K`}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Annual Rate (%)
              </label>
              <input
                type="number"
                min={1}
                max={20}
                step={0.1}
                value={rate}
                onChange={(e) => setRate(Math.min(20, Math.max(1, Number(e.target.value))))}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Term (months)
              </label>
              <input
                type="number"
                min={1}
                max={120}
                step={1}
                value={term}
                onChange={(e) => setTerm(Math.min(120, Math.max(1, Number(e.target.value))))}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="flex gap-1.5">
                {(cfg.isDPS ? [12, 24, 36, 60] : [6, 12, 24, 60]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setTerm(m)}
                    className={`flex-1 text-xs py-1 rounded-lg border transition-all ${
                      term === m
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result card */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-semibold">Result after {term} months</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Total invested</div>
              <div className="text-lg font-bold text-foreground">{fmt(totalInvested)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Maturity value</div>
              <div className="text-2xl font-bold text-primary">{fmt(result.maturity)}</div>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Gross interest</div>
              <div className="font-semibold text-foreground">{fmt(result.grossInterest)}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Tax ({cfg.taxRate}% TDS)</div>
              <div className="font-semibold text-red-500">−{fmt(result.tax)}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Net profit</div>
              <div className="font-semibold text-green-600">{fmt(result.netInterest)}</div>
            </div>
          </div>

          <div className="bg-background/60 rounded-xl px-4 py-2.5 text-center">
            <span className="text-xs text-muted-foreground">Effective annual return: </span>
            <span className="text-sm font-bold text-primary">{returnPct}% p.a. (after tax)</span>
          </div>

          {parseFloat(returnPct) < 9.5 && (
            <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-xl px-3 py-2">
              ⚠️ This return ({returnPct}%) is below Bangladesh's current inflation (~9.5%). Your real purchasing power is shrinking.
            </p>
          )}
        </div>

        <div className="text-center space-y-2">
          <Link to="/comparator" className="text-sm text-primary hover:underline font-medium block">
            Compare all instruments side-by-side →
          </Link>
          <p className="text-xs text-muted-foreground/50">
            For educational purposes. Verify rates with your bank before investing.
          </p>
        </div>
      </div>
    </div>
  );
}
