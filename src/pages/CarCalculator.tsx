import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Car, Fuel, Wrench, Info, ChevronDown, ChevronUp } from "lucide-react";
import SignUpNudge from "@/components/shared/SignUpNudge";

// ── Car presets (Bangladesh reconditioned market 2024) ─────────────────────
const CAR_PRESETS = [
  { label: "Suzuki Alto / Swift", emoji: "🚗", price: 2000000, fuelEfficiency: 17 },
  { label: "Toyota Axio / Allion", emoji: "🚙", price: 2800000, fuelEfficiency: 14 },
  { label: "Toyota Fielder", emoji: "🚐", price: 3200000, fuelEfficiency: 13 },
  { label: "Honda Fit / Freed", emoji: "🚕", price: 2400000, fuelEfficiency: 15 },
  { label: "Toyota CHR", emoji: "🚘", price: 4500000, fuelEfficiency: 16 },
  { label: "Mitsubishi Pajero", emoji: "🛻", price: 5500000, fuelEfficiency: 9 },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function calcEMI(principal: number, annualRate: number, months: number) {
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function fmt(n: number) {
  if (n >= 10000000) return "৳" + (n / 10000000).toFixed(2) + " cr";
  if (n >= 100000) return "৳" + (n / 100000).toFixed(1) + "L";
  return "৳" + Math.round(n).toLocaleString("en-BD");
}
function fmtM(n: number) {
  return "৳" + Math.round(n).toLocaleString("en-BD") + "/mo";
}

// ── Component ──────────────────────────────────────────────────────────────
export default function CarCalculator() {
  // Purchase inputs
  const [selectedCar, setSelectedCar] = useState(1); // Axio default
  const [carPrice, setCarPrice] = useState(CAR_PRESETS[1].price);
  const [downPaymentPct, setDownPaymentPct] = useState(25);
  const [loanRate, setLoanRate] = useState(13);
  const [loanTenure, setLoanTenure] = useState(48); // months

  // Running cost inputs
  const [monthlyKm, setMonthlyKm] = useState(1500);
  const [fuelEfficiency, setFuelEfficiency] = useState(CAR_PRESETS[1].fuelEfficiency); // km per litre
  const [fuelPrice] = useState(125); // BDT per litre (Bangladesh 2024 octane)
  const [yearsOwned, setYearsOwned] = useState(5);

  const [showBreakdown, setShowBreakdown] = useState(true);

  function handleCarPreset(i: number) {
    setSelectedCar(i);
    setCarPrice(CAR_PRESETS[i].price);
    setFuelEfficiency(CAR_PRESETS[i].fuelEfficiency);
  }

  // ── Calculations ──────────────────────────────────────────────────────────
  const downPayment = (carPrice * downPaymentPct) / 100;
  const loanAmount = carPrice - downPayment;
  const emi = useMemo(() => calcEMI(loanAmount, loanRate, loanTenure), [loanAmount, loanRate, loanTenure]);
  const totalLoanPaid = emi * loanTenure;

  // Monthly running costs
  const monthlyFuel = (monthlyKm / fuelEfficiency) * fuelPrice;
  const monthlyInsurance = (carPrice * 0.025) / 12; // ~2.5% of car value per year
  const monthlyMaintenance = (carPrice * 0.03) / 12; // ~3% per year (BD mechanic, parts)
  const monthlyParking = 3000; // estimated Dhaka parking/garage
  const monthlyFitness = Math.round((carPrice * 0.005) / 12); // fitness renewal, registration ~0.5%/yr
  const totalMonthlyCost = emi + monthlyFuel + monthlyInsurance + monthlyMaintenance + monthlyParking + monthlyFitness;

  // Total cost of ownership over N years
  const totalPurchaseCost = downPayment + totalLoanPaid;
  const totalRunningCost =
    (monthlyFuel + monthlyInsurance + monthlyMaintenance + monthlyParking + monthlyFitness) *
    yearsOwned * 12;
  const totalOwnershipCost = totalPurchaseCost + totalRunningCost;

  // Depreciation estimate (reconditioned cars lose ~8% per year in BD)
  const resaleValue = carPrice * Math.pow(1 - 0.08, yearsOwned);
  const netCostAfterResale = totalOwnershipCost - resaleValue;

  // Cost per km
  const totalKm = monthlyKm * 12 * yearsOwned;
  const costPerKm = totalKm > 0 ? netCostAfterResale / totalKm : 0;

  // Affordability check: monthly cost as % of typical income
  const INCOME_BENCHMARKS = [
    { label: "৳40K/mo income", income: 40000 },
    { label: "৳60K/mo income", income: 60000 },
    { label: "৳1L/mo income", income: 100000 },
  ];

  const isAffordable = (income: number) => totalMonthlyCost / income <= 0.35;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border sticky top-0 bg-background/90 backdrop-blur-sm z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="font-semibold text-sm">Car Affordability</span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">Total cost of ownership, Bangladesh</span>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Car Affordability Calculator</h1>
          <p className="text-sm text-muted-foreground mt-1">
            The sticker price is the smallest part of car ownership. See the real monthly cost and
            total 5-year bill — before you decide.
          </p>
        </div>

        {/* Car presets */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Pick a car (Bangladesh reconditioned market 2024)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CAR_PRESETS.map((car, i) => (
              <button
                key={car.label}
                onClick={() => handleCarPreset(i)}
                className={`text-left text-xs rounded-xl border px-3 py-2.5 transition-all ${
                  selectedCar === i
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                <span className="text-base">{car.emoji}</span>
                <div className="font-semibold mt-0.5 leading-tight text-foreground/90">{car.label}</div>
                <div className="text-muted-foreground/70 mt-0.5">{fmt(car.price)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Purchase inputs */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Car price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">৳</span>
              <input
                type="number"
                min={500000}
                step={100000}
                value={carPrice}
                onChange={(e) => { setCarPrice(Math.max(500000, Number(e.target.value))); setSelectedCar(-1); }}
                className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Down payment — {downPaymentPct}%
              </label>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex gap-1.5">
                {[20, 25, 30, 50].map((p) => (
                  <button
                    key={p}
                    onClick={() => setDownPaymentPct(p)}
                    className={`flex-1 text-xs py-1 rounded-lg border transition-all ${
                      downPaymentPct === p
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/60">
                Down: {fmt(downPayment)} · Loan: {fmt(loanAmount)}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Loan tenure
              </label>
              <input
                type="number"
                min={12}
                max={84}
                step={6}
                value={loanTenure}
                onChange={(e) => setLoanTenure(Math.min(84, Math.max(12, Number(e.target.value))))}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="flex gap-1.5">
                {[24, 36, 48, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => setLoanTenure(m)}
                    className={`flex-1 text-xs py-1 rounded-lg border transition-all ${
                      loanTenure === m
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {m / 12}y
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/60">
                Loan rate: {loanRate}% p.a. (car loans in Bangladesh: 12–15%)
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Loan interest rate (%)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={8}
                max={20}
                step={0.5}
                value={loanRate}
                onChange={(e) => setLoanRate(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="text-sm font-bold text-primary w-12 text-right">{loanRate}%</span>
            </div>
          </div>
        </div>

        {/* Running cost inputs */}
        <div className="bg-muted/40 border border-border rounded-2xl p-4 space-y-4">
          <p className="text-xs font-semibold text-foreground">Monthly running cost inputs</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Monthly driving (km)
              </label>
              <input
                type="number"
                min={200}
                step={100}
                value={monthlyKm}
                onChange={(e) => setMonthlyKm(Math.max(200, Number(e.target.value)))}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="flex gap-1.5">
                {[500, 1000, 1500, 2500].map((v) => (
                  <button
                    key={v}
                    onClick={() => setMonthlyKm(v)}
                    className={`flex-1 text-xs py-1 rounded-lg border transition-all ${
                      monthlyKm === v
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {v >= 1000 ? `${v / 1000}K` : v}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Fuel efficiency (km/L)
              </label>
              <input
                type="number"
                min={5}
                max={30}
                step={1}
                value={fuelEfficiency}
                onChange={(e) => setFuelEfficiency(Math.min(30, Math.max(5, Number(e.target.value))))}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <p className="text-xs text-muted-foreground/60">
                Fuel: ৳{fuelPrice}/L (octane, Bangladesh 2024)
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Years to own
            </label>
            <div className="flex gap-2">
              {[3, 5, 7, 10].map((y) => (
                <button
                  key={y}
                  onClick={() => setYearsOwned(y)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    yearsOwned === y
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

        {/* ── Monthly cost summary ── */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Your monthly car cost</span>
          </div>

          <div className="text-center py-2">
            <div className="text-4xl font-bold text-primary">{fmtM(totalMonthlyCost)}</div>
            <div className="text-xs text-muted-foreground mt-1">total all-in monthly cost</div>
          </div>

          <button
            onClick={() => setShowBreakdown((s) => !s)}
            className="w-full flex items-center justify-between text-xs text-muted-foreground py-1"
          >
            <span className="font-semibold uppercase tracking-wide">Breakdown</span>
            {showBreakdown ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {showBreakdown && (
            <div className="space-y-2 text-xs">
              {[
                { icon: Car, label: "Loan EMI", value: emi, sub: `${fmt(loanAmount)} over ${loanTenure}mo` },
                { icon: Fuel, label: "Fuel", value: monthlyFuel, sub: `${monthlyKm}km at ${fuelEfficiency}km/L` },
                { icon: Wrench, label: "Maintenance", value: monthlyMaintenance, sub: "~3% of car value/yr" },
                { icon: Info, label: "Insurance", value: monthlyInsurance, sub: "~2.5% of car value/yr" },
                { icon: Info, label: "Parking / garage", value: monthlyParking, sub: "Dhaka estimate" },
                { icon: Info, label: "Fitness / renewal", value: monthlyFitness, sub: "BRTA, registration" },
              ].map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex items-start justify-between gap-2 py-1.5 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">{label}</div>
                      <div className="text-muted-foreground/60">{sub}</div>
                    </div>
                  </div>
                  <span className="font-semibold text-foreground shrink-0">{fmtM(value)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total ownership cost */}
        <div className="bg-muted/50 border border-border rounded-2xl p-5 space-y-4">
          <p className="text-sm font-semibold text-foreground">
            Total {yearsOwned}-year cost of ownership
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Purchase cost (EMI + down)", value: totalPurchaseCost },
              { label: "Running costs ({y}yr)".replace("{y}", String(yearsOwned)), value: totalRunningCost },
              { label: "Total spent", value: totalOwnershipCost },
              { label: `Resale value (~8%/yr depreciation)`, value: resaleValue },
            ].map(({ label, value }) => (
              <div key={label} className="bg-background/60 rounded-xl p-3">
                <div className="text-xs text-muted-foreground leading-snug">{label}</div>
                <div className="text-sm font-bold text-foreground mt-1">{fmt(value)}</div>
              </div>
            ))}
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex justify-between items-center">
            <div>
              <div className="text-xs text-muted-foreground">Net cost after resale</div>
              <div className="text-xs text-muted-foreground">Cost per km driven</div>
            </div>
            <div className="text-right">
              <div className="text-base font-bold text-primary">{fmt(netCostAfterResale)}</div>
              <div className="text-xs font-semibold text-muted-foreground">
                ৳{costPerKm.toFixed(1)}/km
              </div>
            </div>
          </div>
        </div>

        {/* Affordability check */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Affordability check (rule: keep car cost under 35% of income)
          </p>
          <div className="grid grid-cols-3 gap-2">
            {INCOME_BENCHMARKS.map((b) => {
              const pct = Math.round((totalMonthlyCost / b.income) * 100);
              const ok = isAffordable(b.income);
              return (
                <div
                  key={b.label}
                  className={`rounded-xl border p-3 text-center ${
                    ok
                      ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  }`}
                >
                  <div className={`text-lg font-bold ${ok ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
                    {pct}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{b.label}</div>
                  <div className={`text-xs font-semibold mt-1 ${ok ? "text-emerald-600" : "text-red-600"}`}>
                    {ok ? "✓ Affordable" : "✗ Too high"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Depreciation note */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex gap-3">
          <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800 dark:text-amber-300 space-y-1">
            <p className="font-semibold">Real cost insight for Bangladesh</p>
            <p>
              In Dhaka, traffic, CNG congestion and toll costs aren't modelled here. Add ৳3–8K/month
              for Dhaka commuting realities. Reconditioned car prices also fluctuate 10–20% with
              exchange rate shifts. Always budget a ৳30–50K emergency repair fund in Year 1.
            </p>
          </div>
        </div>

        <div className="text-center space-y-2">
          <Link to="/emi-calculator" className="text-sm text-primary hover:underline font-medium block">
            Calculate bank loan EMI in detail →
          </Link>
          <Link to="/sip-calculator" className="text-sm text-primary hover:underline font-medium block">
            Plan savings for a down payment →
          </Link>
          <p className="text-xs text-muted-foreground/50">
            All figures are estimates for educational purposes. Verify with your bank and dealer.
          </p>
        </div>
      </div>

      <SignUpNudge
        delay={45000}
        headline="Save your car budget"
        sub="Free account so your numbers are here when you need them."
      />
    </div>
  );
}
