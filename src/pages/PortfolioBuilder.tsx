import { useState } from "react";
import { Link } from "react-router-dom";
import {
  INSTRUMENTS,
  INSTRUMENT_LABELS,
  RETURN_ASSUMPTIONS,
  type Instrument,
  type Priority,
  type Horizon,
  getSuggestedAllocation,
  adjustAllocation,
  projectNominal,
  projectReal,
  analyzePortfolio,
} from "@/lib/portfolio";
import { usePointsStore } from "@/store/pointsStore";

const HORIZONS: Horizon[] = [1, 3, 5, 10];

const PRIORITIES: { id: Priority; label: string; subtitle: string }[] = [
  { id: "safety", label: "Safety first", subtitle: "Protect capital" },
  { id: "balanced", label: "Balanced", subtitle: "Mix safety & growth" },
  { id: "growth", label: "Growth-focused", subtitle: "Beat inflation aggressively" },
];

const INSTRUMENT_COLOR: Record<Instrument, string> = {
  savings: "bg-cyan-500",
  fdr: "bg-blue-500",
  sanchaypatra: "bg-emerald-500",
  dps: "bg-violet-500",
  stocks: "bg-amber-500",
  gold: "bg-yellow-600",
};

const SAVED_KEY = "kosh:saved_portfolios";

function fmtTk(n: number) {
  return "Tk " + Math.round(n).toLocaleString();
}

type Step = "inputs" | "build";

export default function PortfolioBuilder() {
  const { addPoints } = usePointsStore();
  const [step, setStep] = useState<Step>("inputs");

  const [amount, setAmount] = useState(100000);
  const [horizon, setHorizon] = useState<Horizon>(3);
  const [priority, setPriority] = useState<Priority>("balanced");
  const [allocation, setAllocation] = useState<Record<Instrument, number>>(getSuggestedAllocation("balanced", 3));
  const [showWhy, setShowWhy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [actionPlan, setActionPlan] = useState(false);

  function handleBuild() {
    setAllocation(getSuggestedAllocation(priority, horizon));
    setStep("build");
    addPoints(100, "Portfolio Builder: first build 📊");
  }

  function handleAdjust(key: Instrument, delta: number) {
    setAllocation((a) => adjustAllocation(a, key, delta));
  }

  function handleSave() {
    if (saved) return;
    try {
      const existing = JSON.parse(localStorage.getItem(SAVED_KEY) ?? "[]");
      existing.unshift({ amount, horizon, priority, allocation, savedAt: new Date().toISOString() });
      localStorage.setItem(SAVED_KEY, JSON.stringify(existing.slice(0, 20)));
    } catch { /* ignore */ }
    setSaved(true);
  }

  function handleActionPlan() {
    if (actionPlan) return;
    setActionPlan(true);
    addPoints(50, "Portfolio Builder: action plan 🎯");
  }

  const analysis = analyzePortfolio(allocation, priority, horizon);
  const sum = INSTRUMENTS.reduce((s, k) => s + allocation[k], 0);

  if (step === "inputs") {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-xl mx-auto px-4 py-10 space-y-8">
          <div>
            <Link to="/dashboard" className="text-sm font-medium text-foreground/60 hover:text-foreground">← Dashboard</Link>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground/35 uppercase tracking-widest">Portfolio Builder</p>
            <h1 className="text-2xl font-bold text-foreground">Build a sample portfolio</h1>
            <p className="text-sm text-foreground/60 leading-relaxed">
              See how a Bangladesh-specific allocation could look for your goals. This is education, not advice — see the disclaimer below.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Amount you want to allocate</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={5000}
                max={1000000}
                step={5000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="font-bold text-foreground text-sm w-32 text-right">{fmtTk(amount)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Time horizon</label>
            <div className="grid grid-cols-4 gap-2">
              {HORIZONS.map((h) => (
                <button
                  key={h}
                  onClick={() => setHorizon(h)}
                  className={`rounded-xl border-2 py-3 text-sm font-bold transition-all ${
                    horizon === h ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground/60 hover:border-primary/40"
                  }`}
                >
                  {h === 10 ? "10+ yr" : `${h} yr`}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Priority</label>
            <div className="space-y-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className={`w-full text-left rounded-xl border-2 px-4 py-3 transition-all ${
                    priority === p.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                  }`}
                >
                  <p className="font-bold text-sm text-foreground">{p.label}</p>
                  <p className="text-xs text-foreground/55">{p.subtitle}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleBuild}
            className="w-full bg-primary text-primary-foreground rounded-xl py-3.5 font-bold hover:opacity-90 transition-opacity"
          >
            Build my portfolio →
          </button>

          <Disclaimer />
        </div>
      </div>
    );
  }

  // Build step
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 py-10 pb-24 space-y-8">
        <div>
          <button onClick={() => setStep("inputs")} className="text-sm font-medium text-foreground/60 hover:text-foreground">
            ← Change inputs
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-semibold text-foreground/35 uppercase tracking-widest">
            {priority} · {horizon === 10 ? "10+ years" : `${horizon} years`} · {fmtTk(amount)}
          </p>
          <h1 className="text-xl font-bold text-foreground">Suggested allocation</h1>
        </div>

        {/* Allocation bars */}
        <div className="space-y-3">
          {INSTRUMENTS.map((k) => {
            const pct = allocation[k];
            const value = (amount * pct) / 100;
            return (
              <div key={k} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">{INSTRUMENT_LABELS[k]}</span>
                  <span className="text-foreground/60 text-xs">
                    {pct}% · {fmtTk(value)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAdjust(k, -5)}
                    disabled={pct <= 0}
                    className="w-8 h-8 rounded-lg border border-border text-sm font-bold disabled:opacity-30 hover:bg-muted/50"
                  >−</button>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${INSTRUMENT_COLOR[k]} transition-all duration-200`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <button
                    onClick={() => handleAdjust(k, 5)}
                    disabled={pct >= 100}
                    className="w-8 h-8 rounded-lg border border-border text-sm font-bold disabled:opacity-30 hover:bg-muted/50"
                  >+</button>
                </div>
              </div>
            );
          })}
          <p className="text-xs text-foreground/40 text-center pt-2">Total: {sum}%</p>
        </div>

        {/* Projections */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-foreground/35 uppercase tracking-widest">Projected value</p>
          <div className="grid grid-cols-3 gap-2">
            {[1, 3, 5].map((y) => {
              const nom = projectNominal(amount, allocation, y);
              const real = projectReal(amount, allocation, y);
              return (
                <div key={y} className="rounded-xl border border-border bg-card p-3 text-center space-y-1">
                  <p className="text-xs text-foreground/50">{y} year{y > 1 ? "s" : ""}</p>
                  <p className="font-bold text-foreground text-sm">{fmtTk(nom)}</p>
                  <p className="text-[11px] text-foreground/50">real {fmtTk(real)}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Analysis */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
          <p className="text-xs font-semibold text-foreground/35 uppercase tracking-widest">Analysis</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-foreground/50">Risk score</p>
              <p className="font-bold text-foreground">{analysis.riskScore} / 5</p>
            </div>
            <div>
              <p className="text-xs text-foreground/50">Diversification</p>
              <p className="font-bold text-foreground text-sm">{analysis.diversification}</p>
            </div>
          </div>
          {!analysis.alignment.aligned && analysis.alignment.warning && (
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/25 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
              ⚠ {analysis.alignment.warning}
            </div>
          )}
          {analysis.alignment.aligned && (
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/25 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-400">
              ✓ Allocation aligns with your stated priority and horizon.
            </div>
          )}
        </div>

        {/* Why this allocation */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <button
            onClick={() => setShowWhy((v) => !v)}
            className="w-full text-left flex items-center justify-between"
          >
            <span className="font-semibold text-foreground text-sm">Why this allocation?</span>
            <span className="text-foreground/40 text-xs">{showWhy ? "Hide" : "Show"}</span>
          </button>
          {showWhy && (
            <div className="space-y-1.5 text-xs text-foreground/70 leading-relaxed pt-2">
              {INSTRUMENTS.filter((k) => allocation[k] > 0).map((k) => (
                <p key={k}>
                  <span className="font-semibold">{INSTRUMENT_LABELS[k]} ({allocation[k]}%):</span>{" "}
                  ~{Math.round(RETURN_ASSUMPTIONS[k] * 100)}% historical return assumption.
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Save */}
        <div className="space-y-3">
          <button
            onClick={handleSave}
            disabled={saved}
            className={`w-full rounded-xl py-3 font-bold text-sm transition-all ${
              saved ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400" : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {saved ? "✓ Saved to your dashboard" : "Save this portfolio"}
          </button>

          <button
            onClick={handleActionPlan}
            disabled={actionPlan}
            className={`w-full rounded-xl py-3 font-semibold text-sm transition-all ${
              actionPlan ? "border border-primary/30 bg-primary/5 text-primary" : "border border-border hover:border-primary/40 text-foreground/70"
            }`}
          >
            {actionPlan ? "✓ Action plan revealed below" : "What would I actually do to build this?"}
          </button>
        </div>

        {actionPlan && (
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-3">
            <p className="text-xs font-semibold text-primary/60 uppercase tracking-widest">Real-world steps</p>
            <ul className="space-y-2 text-sm text-foreground/80 leading-relaxed">
              {INSTRUMENTS.filter((k) => allocation[k] > 0).map((k) => (
                <li key={k} className="flex gap-2">
                  <span className="text-primary">→</span>
                  <span>
                    <span className="font-semibold">{INSTRUMENT_LABELS[k]}:</span>{" "}
                    {actionStepFor(k)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Disclaimer />
      </div>
    </div>
  );
}

function actionStepFor(k: Instrument): string {
  switch (k) {
    case "savings":
      return "Open or use a separate savings account at a different bank from your main one.";
    case "fdr":
      return "Compare 1-year FDR rates at 2–3 banks. Apply via app or branch with NID + TIN.";
    case "sanchaypatra":
      return "Visit a post office or authorised bank with NID + TIN. 30-minute purchase, 5-year lock.";
    case "dps":
      return "Set up a DPS at any bank for monthly auto-debit on salary day. Most start at Tk 500/mo.";
    case "stocks":
      return "Open a BO account via a BSEC-licensed broker (verify at sec.gov.bd). Start with A-category companies.";
    case "gold":
      return "Buy from BAJUS-certified jewellers; insist on a receipt. Bars/coins, not jewellery, for investment purposes.";
  }
}

function Disclaimer() {
  return (
    <p className="text-xs text-foreground/40 leading-relaxed italic border-t border-border pt-4">
      Returns shown are based on historical averages and are not guarantees. Actual returns vary significantly.
      This tool is for education only — it is not investment advice. Always do your own research and consider
      your specific situation before making financial decisions.
    </p>
  );
}
