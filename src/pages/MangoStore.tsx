import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePointsStore, MANGOES, REDEMPTION, mangoesToBdt } from "@/store/pointsStore";
import { db } from "@/lib/supabase";

const STORE_KEY = "kosh:first_visit_date";

function getDaysOnPlatform(): number {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) {
      localStorage.setItem(STORE_KEY, new Date().toISOString());
      return 0;
    }
    const first = new Date(raw);
    const now = new Date();
    return Math.floor((now.getTime() - first.getTime()) / (1000 * 60 * 60 * 24));
  } catch {
    return 0;
  }
}

export default function MangoStore() {
  const navigate = useNavigate();
  const { total, streak, history, spendPoints } = usePointsStore();
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [redeemAmount, setRedeemAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [repairMsg, setRepairMsg] = useState<string | null>(null);

  const daysOnPlatform = getDaysOnPlatform();
  const bdtValue = mangoesToBdt(total);
  const mangoProgress = Math.min((total / REDEMPTION.MIN_MANGOES) * 100, 100);
  const daysProgress = Math.min((daysOnPlatform / REDEMPTION.MIN_DAYS) * 100, 100);
  const canRedeem = total >= REDEMPTION.MIN_MANGOES && daysOnPlatform >= REDEMPTION.MIN_DAYS;

  const recentHistory = history.slice(0, 10);

  function handleRepairStreak() {
    if (streak >= 2) {
      setRepairMsg("Your streak is already healthy! Streak repair is for when you miss a day.");
      return;
    }
    const ok = spendPoints(REDEMPTION.STREAK_REPAIR_COST, "Streak repair 🔧");
    if (ok) {
      setRepairMsg(`Done! Spent ${REDEMPTION.STREAK_REPAIR_COST} 🥭 to repair your streak.`);
    } else {
      setRepairMsg(`Not enough mangoes. You need ${REDEMPTION.STREAK_REPAIR_COST} 🥭.`);
    }
  }

  function handleRedeemSubmit() {
    if (!phone.trim() || !redeemAmount) return;
    const amount = parseInt(redeemAmount);
    if (isNaN(amount) || amount < REDEMPTION.MIN_REDEEM_AMOUNT) return;
    if (amount > total) return;

    // Save redemption request to localStorage (Supabase table optional later)
    try {
      const profile = db.getProfile();
      const request = {
        userId: profile?.id ?? "unknown",
        phone: phone.trim(),
        mangoes: amount,
        bdtValue: mangoesToBdt(amount),
        requestedAt: new Date().toISOString(),
        status: "pending",
      };
      const existing = JSON.parse(localStorage.getItem("kosh:redemption_requests") ?? "[]");
      localStorage.setItem("kosh:redemption_requests", JSON.stringify([request, ...existing]));
    } catch { /* ignore */ }

    spendPoints(parseInt(redeemAmount), `Redemption request — Tk ${mangoesToBdt(parseInt(redeemAmount))}`);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 py-8 pb-24 space-y-6">
        {/* Header */}
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-medium text-foreground/60 hover:text-foreground flex items-center gap-1 mb-4"
          >
            ← Dashboard
          </button>
          <h1 className="text-2xl font-bold text-foreground">🥭 Mango Store</h1>
          <p className="text-sm text-muted-foreground mt-1">Earn mangoes by learning. Spend them on perks — or redeem for real Taka.</p>
        </div>

        {/* Balance card */}
        <div className="bg-primary text-white rounded-2xl p-5 space-y-1">
          <p className="text-sm font-semibold opacity-80">Your balance</p>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold">{total.toLocaleString()}</span>
            <span className="text-2xl pb-1">🥭</span>
          </div>
          <p className="text-sm opacity-70">≈ Tk {bdtValue.toFixed(2)} · 1,000 🥭 = Tk 10</p>
        </div>

        {/* Redemption progress */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <h2 className="font-semibold text-foreground">Redemption progress</h2>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Mangoes</span>
              <span className="font-semibold text-foreground">{total.toLocaleString()} / {REDEMPTION.MIN_MANGOES.toLocaleString()}</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700"
                style={{ width: `${mangoProgress}%` }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Days on platform</span>
              <span className="font-semibold text-foreground">{daysOnPlatform} / {REDEMPTION.MIN_DAYS}</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-700"
                style={{ width: `${daysProgress}%` }}
              />
            </div>
          </div>

          {canRedeem ? (
            <button
              onClick={() => setRedeemOpen(true)}
              className="w-full bg-primary text-white rounded-xl py-3 font-semibold text-sm hover:bg-primary/90 transition-all"
            >
              Redeem mangoes →
            </button>
          ) : (
            <div className="bg-muted/60 rounded-xl p-3 text-xs text-muted-foreground text-center">
              Need {REDEMPTION.MIN_MANGOES.toLocaleString()} 🥭 + {REDEMPTION.MIN_DAYS} days to unlock redemption
            </div>
          )}
        </div>

        {/* Spend options */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Spend mangoes</h2>

          {/* Streak repair */}
          <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
            <span className="text-3xl">🔧</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm">Streak Repair</p>
              <p className="text-xs text-muted-foreground">Missed a day? Restore your streak.</p>
              {repairMsg && (
                <p className="text-xs text-primary mt-1 font-medium">{repairMsg}</p>
              )}
            </div>
            <button
              onClick={handleRepairStreak}
              className="shrink-0 bg-primary/10 text-primary rounded-xl px-3 py-2 text-xs font-bold hover:bg-primary/20 transition-all"
            >
              {REDEMPTION.STREAK_REPAIR_COST} 🥭
            </button>
          </div>

          {/* Coming soon */}
          {[
            { emoji: "🎯", title: "Zone Mastery Quiz", desc: "Test your whole zone at once.", cost: 100 },
            { emoji: "📊", title: "Portfolio Review", desc: "Get a personalised review of your finances.", cost: 500 },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 opacity-50"
            >
              <span className="text-3xl">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <span className="shrink-0 bg-muted text-muted-foreground rounded-xl px-3 py-2 text-xs font-bold">
                {item.cost} 🥭
              </span>
            </div>
          ))}
        </div>

        {/* Earn rates */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
          <h2 className="font-semibold text-foreground">How to earn 🥭</h2>
          <div className="space-y-2">
            {[
              { label: "Complete a module", amount: MANGOES.MODULE_READ },
              { label: "Quiz score 100%", amount: MANGOES.QUIZ_100 },
              { label: "Quiz score 67–99%", amount: MANGOES.QUIZ_67 },
              { label: "Complete an action", amount: MANGOES.ACTION_DONE },
              { label: "Skip quiz (pass)", amount: MANGOES.SKIP_QUIZ_PASS },
              { label: "Finish a zone", amount: MANGOES.ZONE_COMPLETE },
              { label: "Daily streak (7+ days)", amount: MANGOES.STREAK_BONUS_7_DAYS },
              { label: "Daily streak (14+ days)", amount: MANGOES.STREAK_BONUS_14_DAYS },
              { label: "Daily streak (30+ days)", amount: MANGOES.STREAK_BONUS_30_DAYS },
              { label: "Come back after 14 days away", amount: MANGOES.REENGAGEMENT_AFTER_14_DAYS },
            ].map(({ label, amount }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="text-foreground/70">{label}</span>
                <span className="font-bold text-primary">+{amount} 🥭</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent history */}
        {recentHistory.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
            <h2 className="font-semibold text-foreground">Recent activity</h2>
            <div className="space-y-2">
              {recentHistory.map((entry, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-foreground/60 truncate pr-2">{entry.reason}</span>
                  <span className={`font-bold shrink-0 ${entry.amount > 0 ? "text-primary" : "text-red-500"}`}>
                    {entry.amount > 0 ? "+" : ""}{entry.amount} 🥭
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Redemption modal */}
      {redeemOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-8">
          <div className="w-full max-w-sm bg-background border border-border rounded-2xl p-6 space-y-5">
            {submitted ? (
              <>
                <div className="text-center space-y-3">
                  <div className="text-5xl">🎉</div>
                  <h3 className="font-bold text-foreground text-lg">Request received!</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll transfer your mangoes to bKash/Nagad within 3–5 working days.
                  </p>
                </div>
                <button
                  onClick={() => { setRedeemOpen(false); setSubmitted(false); }}
                  className="w-full bg-primary text-white rounded-xl py-3 font-semibold"
                >
                  Done
                </button>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Redeem mangoes</h3>
                  <p className="text-xs text-muted-foreground mt-1">Min {REDEMPTION.MIN_REDEEM_AMOUNT.toLocaleString()} 🥭 per request</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-foreground/60 mb-1.5 block">bKash / Nagad number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground/60 mb-1.5 block">
                      Mangoes to redeem (you have {total.toLocaleString()})
                    </label>
                    <input
                      type="number"
                      value={redeemAmount}
                      onChange={(e) => setRedeemAmount(e.target.value)}
                      placeholder={String(REDEMPTION.MIN_REDEEM_AMOUNT)}
                      min={REDEMPTION.MIN_REDEEM_AMOUNT}
                      max={total}
                      className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                    {redeemAmount && !isNaN(parseInt(redeemAmount)) && (
                      <p className="text-xs text-primary mt-1 font-medium">
                        ≈ Tk {mangoesToBdt(parseInt(redeemAmount)).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setRedeemOpen(false)}
                    className="flex-1 border border-border rounded-xl py-3 text-sm font-semibold text-foreground/60 hover:text-foreground transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRedeemSubmit}
                    disabled={!phone || !redeemAmount || parseInt(redeemAmount) < REDEMPTION.MIN_REDEEM_AMOUNT || parseInt(redeemAmount) > total}
                    className="flex-1 bg-primary text-white rounded-xl py-3 text-sm font-semibold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
