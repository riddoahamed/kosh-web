import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Building2, Info } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type Mode = "loan" | "card";

interface LoanPreset {
  label: string;
  rate: number;
  tenureMonths: number;
  notes: string;
  color: string;
}

interface GadgetPreset {
  label: string;
  emoji: string;
  amount: number;
  note: string;
}

// ── Bank loan presets ──────────────────────────────────────────────────────
const LOAN_PRESETS: LoanPreset[] = [
  {
    label: "Personal Loan",
    rate: 16,
    tenureMonths: 36,
    notes: "Scheduled bank personal loan (2024 typical: 14–18%). Requires salary slip / NID.",
    color: "blue",
  },
  {
    label: "Home Loan",
    rate: 10,
    tenureMonths: 240,
    notes: "Housing finance from banks (DBBL, BRAC, Islami Bank). Rate: 9–12%. Down payment 20–30%.",
    color: "emerald",
  },
  {
    label: "Car / Vehicle",
    rate: 13,
    tenureMonths: 60,
    notes: "Vehicle financing. Rate: 12–15%. Banks require 20–30% down payment.",
    color: "violet",
  },
  {
    label: "bKash / Nagad Credit",
    rate: 24,
    tenureMonths: 6,
    notes: "Mobile micro-credit (bKash, Nagad). Very high effective rate — avoid for large amounts.",
    color: "red",
  },
  {
    label: "Education Loan",
    rate: 9,
    tenureMonths: 60,
    notes: "Some banks offer subsidized education loans (7–12%). Government schemes also exist.",
    color: "amber",
  },
];

// ── Credit card / gadget presets ───────────────────────────────────────────
// BD banks 2024: DBBL Nexus 0% EMI (1.5% monthly processing fee ≈ 20% effective),
// City Bank Amex Easy Pay 14–16%, Standard Chartered 12–15%, BRAC Flexi EMI 14%
const CARD_PRESETS: LoanPreset[] = [
  {
    label: "Easy Pay (0% EMI)",
    rate: 18,
    tenureMonths: 12,
    notes:
      "Most BD banks offer '0% EMI' at partner merchants but charge 1.25–1.5% monthly processing fee — effective annual rate ~15–20%. Rate here is the effective annual equivalent.",
    color: "violet",
  },
  {
    label: "City Bank / StanChart",
    rate: 14,
    tenureMonths: 12,
    notes: "City Bank Amex Easy Pay and Standard Chartered EMI: ~12–16% p.a. on credit card EMI.",
    color: "blue",
  },
  {
    label: "BRAC Flexi EMI",
    rate: 14,
    tenureMonths: 12,
    notes: "BRAC Bank credit card Flexi EMI: ~14% p.a. on eligible purchases at partner merchants.",
    color: "emerald",
  },
  {
    label: "Standard Revolving",
    rate: 22,
    tenureMonths: 12,
    notes:
      "If you don't pay in full and carry a revolving balance, most BD banks charge 20–24% p.a. This is the most expensive way to buy on credit.",
    color: "red",
  },
];

const GADGET_PRESETS: GadgetPreset[] = [
  { label: "iPhone 15 Pro", emoji: "📱", amount: 170000, note: "Approx ৳1.6–2L in BD (2024)" },
  { label: "Laptop / MacBook", emoji: "💻", amount: 130000, note: "Mid-range ৳80K–1.5L" },
  { label: "Motorcycle (125cc)", emoji: "🏍️", amount: 200000, note: "Hero, Yamaha, TVS: ৳1.5–3.5L" },
  { label: "Camera Gear", emoji: "📷", amount: 180000, note: "Mirrorless + lens: ৳1–3L" },
  { label: "Gaming PC", emoji: "🖥️", amount: 100000, note: "Build cost ৳80K–1.5L" },
  { label: "Smart TV (55\")", emoji: "📺", amount: 75000, note: "Samsung/LG 55\": ৳60K–1L" },
];

// ── Color map ──────────────────────────────────────────────────────────────
const COLOR_MAP: Record<string, { bg: string; text: string; bar: string; badge: string }> = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-700 dark:text-blue-300",
    bar: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-700 dark:text-emerald-300",
    bar: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-900/20",
    text: "text-violet-700 dark:text-violet-300",
    bar: "bg-violet-500",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
  red: {
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-700 dark:text-red-300",
    bar: "bg-red-500",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-700 dark:text-amber-300",
    bar: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────
function calcEMI(principal: number, annualRate: number, months: number) {
  const r = annualRate / 100 / 12;
  if (r === 0) {
    const emi = principal / months;
    return { emi, totalPaid: emi * months, totalInterest: 0 };
  }
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalPaid = emi * months;
  const totalInterest = totalPaid - principal;
  return { emi, totalPaid, totalInterest };
}

function buildSchedule(principal: number, annualRate: number, months: number, emi: number) {
  const r = annualRate / 100 / 12;
  const rows: { month: number; interest: number; principal: number; balance: number }[] = [];
  let balance = principal;
  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    const principalPart = emi - interest;
    balance = Math.max(0, balance - principalPart);
    rows.push({ month: m, interest, principal: principalPart, balance });
  }
  return rows;
}

function fmt(n: number) {
  if (n >= 10000000) return "৳" + (n / 10000000).toFixed(2) + " cr";
  if (n >= 100000) return "৳" + (n / 100000).toFixed(2) + "L";
  return "৳" + Math.round(n).toLocaleString("en-BD");
}
function fmtFull(n: number) {
  return "৳" + Math.round(n).toLocaleString("en-BD");
}

// ── Component ──────────────────────────────────────────────────────────────
export default function EMICalculator() {
  const [mode, setMode] = useState<Mode>("loan");

  // Loan mode state
  const [loanPresetIdx, setLoanPresetIdx] = useState(0);
  const [loanPrincipal, setLoanPrincipal] = useState(500000);
  const [loanRate, setLoanRate] = useState(LOAN_PRESETS[0].rate);
  const [loanTenure, setLoanTenure] = useState(LOAN_PRESETS[0].tenureMonths);

  // Card mode state
  const [cardPresetIdx, setCardPresetIdx] = useState(0);
  const [gadgetPresetIdx, setGadgetPresetIdx] = useState<number | null>(null);
  const [cardPrincipal, setCardPrincipal] = useState(170000);
  const [cardRate, setCardRate] = useState(CARD_PRESETS[0].rate);
  const [cardTenure, setCardTenure] = useState(12);

  const [showSchedule, setShowSchedule] = useState(false);

  // Active values
  const activePreset = mode === "loan" ? LOAN_PRESETS[loanPresetIdx] : CARD_PRESETS[cardPresetIdx];
  const principal = mode === "loan" ? loanPrincipal : cardPrincipal;
  const rate = mode === "loan" ? loanRate : cardRate;
  const tenure = mode === "loan" ? loanTenure : cardTenure;
  const c = COLOR_MAP[activePreset.color];

  function handleLoanPreset(i: number) {
    setLoanPresetIdx(i);
    setLoanRate(LOAN_PRESETS[i].rate);
    setLoanTenure(LOAN_PRESETS[i].tenureMonths);
  }
  function handleCardPreset(i: number) {
    setCardPresetIdx(i);
    setCardRate(CARD_PRESETS[i].rate);
  }
  function handleGadget(i: number) {
    setGadgetPresetIdx(i);
    setCardPrincipal(GADGET_PRESETS[i].amount);
  }

  const { emi, totalPaid, totalInterest } = useMemo(
    () => calcEMI(principal, rate, tenure),
    [principal, rate, tenure]
  );

  const principalPct = Math.round((principal / totalPaid) * 100);
  const interestPct = 100 - principalPct;

  const schedule = useMemo(
    () => (showSchedule ? buildSchedule(principal, rate, tenure, emi) : []),
    [showSchedule, principal, rate, tenure, emi]
  );

  const scheduleDisplay = useMemo(() => {
    if (!showSchedule || schedule.length === 0) return [];
    if (schedule.length <= 12) return schedule;
    const highlights = new Set<number>();
    [0, 1, 2].forEach((i) => highlights.add(i));
    for (let m = 12; m < schedule.length; m += 12) highlights.add(m);
    highlights.add(schedule.length - 1);
    return [...highlights].sort((a, b) => a - b).map((i) => schedule[i]);
  }, [schedule, showSchedule]);

  const isHighCost = totalInterest / principal > 0.3;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border sticky top-0 bg-background/90 backdrop-blur-sm z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="font-semibold text-sm">EMI Calculator</span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">Bangladesh loan & credit</span>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">EMI / Loan Calculator</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Know your monthly payment — and total interest cost — before you borrow.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setMode("loan")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
              mode === "loan"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40"
            }`}
          >
            <Building2 className="h-4 w-4" />
            Bank Loan
          </button>
          <button
            onClick={() => setMode("card")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
              mode === "card"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40"
            }`}
          >
            <CreditCard className="h-4 w-4" />
            Credit Card / Gadget
          </button>
        </div>

        {/* Loan mode */}
        {mode === "loan" && (
          <>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Loan type
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {LOAN_PRESETS.map((p, i) => {
                  const pc = COLOR_MAP[p.color];
                  return (
                    <button
                      key={p.label}
                      onClick={() => handleLoanPreset(i)}
                      className={`text-left text-xs rounded-xl border px-3 py-2.5 transition-all font-medium ${
                        loanPresetIdx === i
                          ? `${pc.bg} ${pc.badge} border-current`
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {p.label}
                      <div className="font-bold mt-0.5 text-foreground/70">{p.rate}% p.a.</div>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground/60 mt-2 leading-relaxed">
                {LOAN_PRESETS[loanPresetIdx].notes}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Loan amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">৳</span>
                <input
                  type="number"
                  min={10000}
                  step={10000}
                  value={loanPrincipal}
                  onChange={(e) => setLoanPrincipal(Math.max(10000, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {[100000, 300000, 500000, 1000000, 3000000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setLoanPrincipal(v)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                      loanPrincipal === v
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {v >= 100000 ? `${v / 100000}L` : `${v / 1000}K`}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Annual rate (%)
                </label>
                <input
                  type="number"
                  min={1}
                  max={36}
                  step={0.5}
                  value={loanRate}
                  onChange={(e) => setLoanRate(Math.min(36, Math.max(1, Number(e.target.value))))}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={0.5}
                  value={loanRate}
                  onChange={(e) => setLoanRate(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Tenure (months)
                </label>
                <input
                  type="number"
                  min={1}
                  max={360}
                  step={1}
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Math.min(360, Math.max(1, Number(e.target.value))))}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <div className="flex gap-1.5">
                  {[12, 24, 36, 60, 120].map((m) => (
                    <button
                      key={m}
                      onClick={() => setLoanTenure(m)}
                      className={`flex-1 text-xs py-1 rounded-lg border transition-all ${
                        loanTenure === m
                          ? "border-primary bg-primary/10 text-primary font-semibold"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {m >= 12 ? `${m / 12}y` : `${m}m`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Credit card / gadget mode */}
        {mode === "card" && (
          <>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                What are you buying?
              </p>
              <div className="grid grid-cols-3 gap-2">
                {GADGET_PRESETS.map((g, i) => (
                  <button
                    key={g.label}
                    onClick={() => handleGadget(i)}
                    className={`text-left text-xs rounded-xl border px-3 py-2.5 transition-all ${
                      gadgetPresetIdx === i
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <span className="text-base">{g.emoji}</span>
                    <div className="font-semibold mt-0.5 leading-tight">{g.label}</div>
                    <div className="text-muted-foreground/60 mt-0.5">{fmt(g.amount)}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Purchase price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">৳</span>
                <input
                  type="number"
                  min={5000}
                  step={5000}
                  value={cardPrincipal}
                  onChange={(e) => { setCardPrincipal(Math.max(5000, Number(e.target.value))); setGadgetPresetIdx(null); }}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Credit card / EMI scheme
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CARD_PRESETS.map((p, i) => {
                  const pc = COLOR_MAP[p.color];
                  return (
                    <button
                      key={p.label}
                      onClick={() => handleCardPreset(i)}
                      className={`text-left text-xs rounded-xl border px-3 py-2.5 transition-all font-medium ${
                        cardPresetIdx === i
                          ? `${pc.bg} ${pc.badge} border-current`
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {p.label}
                      <div className="font-bold mt-0.5 text-foreground/70">~{p.rate}% eff. p.a.</div>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground/60 mt-2 leading-relaxed">
                {CARD_PRESETS[cardPresetIdx].notes}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                EMI tenure (months)
              </label>
              <div className="flex gap-2">
                {[3, 6, 9, 12, 18, 24].map((m) => (
                  <button
                    key={m}
                    onClick={() => setCardTenure(m)}
                    className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                      cardTenure === m
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── Result card ── */}
        <div className={`rounded-2xl border p-5 space-y-4 ${c.bg}`}>
          <div className="flex items-center gap-2">
            <CreditCard className={`h-4 w-4 ${c.text}`} />
            <span className={`text-sm font-semibold ${c.text}`}>
              {tenure} month{tenure !== 1 ? "s" : ""} repayment
            </span>
          </div>

          <div className="text-center py-2">
            <div className={`text-4xl font-bold ${c.text}`}>{fmtFull(emi)}</div>
            <div className="text-xs text-muted-foreground mt-1">monthly EMI</div>
          </div>

          <div className="space-y-2">
            <div className="h-3 rounded-full overflow-hidden flex bg-white/30 dark:bg-black/20">
              <div className="bg-primary/70 h-full transition-all duration-700" style={{ width: `${principalPct}%` }} />
              <div className={`h-full transition-all duration-700 ${c.bar}`} style={{ width: `${interestPct}%` }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mr-1" />
                Principal {principalPct}% — {fmt(principal)}
              </span>
              <span>
                <span className={`inline-block w-2 h-2 rounded-full ${c.bar} mr-1`} />
                Interest {interestPct}% — {fmt(totalInterest)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-background/50 rounded-xl p-3 text-center">
              <div className="text-xs text-muted-foreground">Total paid</div>
              <div className="text-base font-bold text-foreground">{fmt(totalPaid)}</div>
            </div>
            <div className="bg-background/50 rounded-xl p-3 text-center">
              <div className="text-xs text-muted-foreground">Interest cost</div>
              <div className={`text-base font-bold mt-0.5 ${isHighCost ? "text-red-600" : "text-foreground"}`}>
                {fmt(totalInterest)}
              </div>
            </div>
          </div>
        </div>

        {/* Warning blocks */}
        {activePreset.color === "red" && mode === "loan" && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex gap-3">
            <Info className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs text-red-800 dark:text-red-300 space-y-1">
              <p className="font-semibold">High-cost credit warning</p>
              <p>
                bKash/Nagad at ~24% p.a. costs you{" "}
                <span className="font-semibold">{fmt(totalInterest)}</span> in interest here.
                A scheduled bank personal loan (~14–16%) would save significant money for amounts above ৳50K.
              </p>
            </div>
          </div>
        )}

        {mode === "card" && CARD_PRESETS[cardPresetIdx].color === "red" && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex gap-3">
            <Info className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs text-red-800 dark:text-red-300 space-y-1">
              <p className="font-semibold">Revolving balance — very expensive</p>
              <p>
                Carrying a revolving credit card balance at 20–24% means you're paying{" "}
                <span className="font-semibold">{fmt(totalInterest)}</span> extra. Switch to an Easy Pay
                or Flexi EMI scheme to cut this significantly.
              </p>
            </div>
          </div>
        )}

        {mode === "card" && totalInterest > 0 && CARD_PRESETS[cardPresetIdx].color !== "red" && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex gap-3">
            <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800 dark:text-amber-300">
              <p className="font-semibold mb-1">The "free EMI" isn't always free</p>
              <p>
                Even '0% EMI' schemes charge a processing fee that translates to {rate}% effective
                annually. You're paying{" "}
                <span className="font-semibold">{fmt(totalInterest)}</span> above the sticker price.
                If you can save {fmtFull(emi)}/month in a DPS first, you avoid this cost entirely.
              </p>
            </div>
          </div>
        )}

        {/* Repayment schedule */}
        <button
          onClick={() => setShowSchedule((s) => !s)}
          className="w-full text-sm text-primary border border-primary/30 rounded-xl py-2.5 hover:bg-primary/5 transition-colors font-medium"
        >
          {showSchedule ? "Hide" : "Show"} repayment schedule
        </button>

        {showSchedule && scheduleDisplay.length > 0 && (
          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-3 py-2 text-muted-foreground font-semibold">Month</th>
                    <th className="text-right px-3 py-2 text-muted-foreground font-semibold">Principal</th>
                    <th className="text-right px-3 py-2 text-muted-foreground font-semibold">Interest</th>
                    <th className="text-right px-3 py-2 text-muted-foreground font-semibold">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleDisplay.map((row, idx) => {
                    const prev = idx > 0 ? scheduleDisplay[idx - 1] : null;
                    const gap = prev && row.month - prev.month > 1;
                    return (
                      <>
                        {gap && (
                          <tr key={`gap-${idx}`}>
                            <td colSpan={4} className="text-center text-muted-foreground/40 py-1">···</td>
                          </tr>
                        )}
                        <tr
                          key={row.month}
                          className={`border-t border-border/50 ${row.month % 12 === 0 ? "bg-primary/5" : ""}`}
                        >
                          <td className="px-3 py-2 text-foreground font-medium">
                            {row.month}
                            {row.month % 12 === 0 && (
                              <span className="ml-1 text-primary/60">yr {row.month / 12}</span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-right text-foreground">{fmtFull(row.principal)}</td>
                          <td className="px-3 py-2 text-right text-red-500">{fmtFull(row.interest)}</td>
                          <td className="px-3 py-2 text-right text-foreground font-medium">{fmtFull(row.balance)}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="text-center space-y-2">
          <Link to="/comparator" className="text-sm text-primary hover:underline font-medium block">
            Compare where to park savings instead →
          </Link>
          <p className="text-xs text-muted-foreground/50">
            For educational purposes. Verify current rates with your bank before borrowing.
          </p>
        </div>
      </div>
    </div>
  );
}
