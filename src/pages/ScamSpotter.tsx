import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle2, HelpCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Verdict = "scam" | "grey" | "legit";

interface Scenario {
  id: number;
  title: string;
  description: string;
  redFlags: string[];
  verdict: Verdict;
  verdictLabel: string;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "\"Halal Forex Trading\" WhatsApp Group",
    description:
      "A friend adds you to a WhatsApp group. The admin says they've found a 'halal' forex trading method using a special EA (Expert Advisor) bot. Monthly returns: 15–20%. They show screenshots of ৳50,000 profits. Minimum entry: ৳10,000. They say you can withdraw anytime.",
    redFlags: ["Guaranteed monthly %", "Screenshot 'proof'", "Pressure to recruit friends", "Unlicensed broker"],
    verdict: "scam",
    verdictLabel: "Almost certainly a scam",
    explanation:
      "15–20% monthly returns = 180–240% annually. No legitimate investment does this. Forex is legal in Bangladesh only through licensed banks. 'Halal' framing is often used to disarm skepticism. The WhatsApp group + screenshots pattern is a classic MLM/Ponzi setup. Money withdrawn early is often paid from new victims' deposits.",
  },
  {
    id: 2,
    title: "Sanchaypatra from a Bank Branch",
    description:
      "Your bank offers to help you buy a 5-year Bangladesh Sanchaypatra yielding 11.28% annually. You need a NID, TIN, and bank account. The money is locked for 5 years (or partial early withdrawal at reduced rates). Interest is paid quarterly to your account.",
    redFlags: [],
    verdict: "legit",
    verdictLabel: "Legitimate — government-backed",
    explanation:
      "Bangladesh National Savings Directorate Sanchaypatra is fully government-backed. The 11.28% rate is the official 2024 rate for the 5-year Family Savings Certificate. Interest is taxable at source (5% TDS). Sold directly through banks and post offices. This is one of the safest instruments available for Bangladeshi residents.",
  },
  {
    id: 3,
    title: "Crypto 'Staking' Platform — 2% Daily",
    description:
      "A Telegram channel promotes a crypto staking platform. You deposit USDT and earn 2% daily (~730% annually). The site looks professional, has an English .com domain, and shows 'live' withdrawal transactions. They say it's 'DeFi' and 'fully audited'.",
    redFlags: ["2% daily = impossible sustainable yield", "Anonymous team", "Urgency to 'stake before pool fills'"],
    verdict: "scam",
    verdictLabel: "Scam — classic Ponzi structure",
    explanation:
      "2% daily compounded means ৳10,000 becomes ৳73,000,000 in a year. No protocol generates this. 'Audited' on a Telegram-promoted site means nothing — anyone can fake an audit badge. These are typically HYIP (High Yield Investment Programs) that collapse within 3–6 months. Crypto is also not legally tradeable for Bangladesh residents under Bangladesh Bank guidelines.",
  },
  {
    id: 4,
    title: "10% Monthly MFS Return through a 'Agent'",
    description:
      "Someone claims to invest your bKash balance on your behalf through a 'special agent code' and returns 10% every month. You send money to their personal bKash number. They've been 'paying' your neighbor for 4 months.",
    redFlags: ["Personal bKash number (no institution)", "No paperwork", "Neighbor as social proof"],
    verdict: "scam",
    verdictLabel: "Exit scam in progress",
    explanation:
      "Your neighbor getting paid for 4 months is the classic 'proof phase' of a Ponzi — early investors are paid from new deposits to build trust. Once the base is large enough, withdrawals will be refused and the 'agent' disappears. Sending money to a personal bKash number with no contract gives you zero legal recourse.",
  },
  {
    id: 5,
    title: "FDR at a Scheduled Bank — 8.5%",
    description:
      "Dutch-Bangla Bank offers a 1-year Fixed Deposit Receipt at 8.5% per annum. Minimum ৳50,000. Interest credited at maturity. BDIC-insured up to ৳1 lakh. Early exit incurs a 1% penalty.",
    redFlags: [],
    verdict: "legit",
    verdictLabel: "Legitimate — scheduled bank deposit",
    explanation:
      "Scheduled banks in Bangladesh are regulated by Bangladesh Bank. FDRs are straightforward interest-bearing deposits. 8.5% is within the normal range for 2024. Bangladesh Deposit Insurance Corporation (BDIC) insures deposits up to ৳1 lakh. The 1% early exit penalty is standard and disclosed upfront — a green flag, not a red one.",
  },
  {
    id: 6,
    title: "DSE Stock Tip Group — 'Inside Information'",
    description:
      "A paid Telegram group (৳500/month) claims to share 'insider tips' from broker contacts. They show 80%+ accuracy charts. They say certain stocks will 'circuit up' tomorrow. Past picks have 3x'd.",
    redFlags: ["'Insider' tips = market manipulation", "Paid subscription for signals", "Accuracy claims unverifiable"],
    verdict: "grey",
    verdictLabel: "Grey zone — illegal & high risk",
    explanation:
      "Using or distributing non-public material information (insider trading) is illegal under the Securities and Exchange Ordinance 1969. 'Pump and dump' schemes are common on the Dhaka Stock Exchange. The group likely buys first, then signals to followers who pump the price, then the group exits. You're the exit liquidity. Even if some picks work, you're participating in market manipulation.",
  },
];

const VERDICT_CONFIG: Record<Verdict, { color: string; icon: typeof AlertTriangle; bg: string }> = {
  scam: {
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
    icon: AlertTriangle,
  },
  grey: {
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800",
    icon: HelpCircle,
  },
  legit: {
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
    icon: CheckCircle2,
  },
};

export default function ScamSpotter() {
  const [current, setCurrent] = useState(0);
  const [guess, setGuess] = useState<Verdict | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const scenario = SCENARIOS[current];
  const total = SCENARIOS.length;

  function handleGuess(v: Verdict) {
    if (revealed) return;
    setGuess(v);
    setRevealed(true);
    if (v === scenario.verdict) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= total) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setGuess(null);
      setRevealed(false);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setGuess(null);
    setRevealed(false);
    setScore(0);
    setDone(false);
  }

  if (done) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border sticky top-0 bg-background/90 backdrop-blur-sm z-10">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="font-semibold text-sm">Scam Spotter</span>
          </div>
        </nav>
        <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
          <div className="text-5xl">{pct >= 80 ? "🎯" : pct >= 50 ? "📚" : "⚠️"}</div>
          <h2 className="text-2xl font-bold text-foreground">
            {score}/{total} — {pct}%
          </h2>
          <p className="text-muted-foreground">
            {pct >= 80
              ? "Strong scam radar. You know the red flags."
              : pct >= 50
              ? "Decent awareness, but some grey zones tripped you up — that's normal."
              : "Worth going through the explanations again. Scammers are sophisticated."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleRestart} variant="outline">Try again</Button>
            <Button asChild>
              <Link to="/check">Take the full Money Check →</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const cfg = VERDICT_CONFIG[scenario.verdict];
  const VerdictIcon = cfg.icon;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border sticky top-0 bg-background/90 backdrop-blur-sm z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="font-semibold text-sm">Scam Spotter</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {current + 1} / {total}
          </span>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
        {/* Progress */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((current) / total) * 100}%` }}
          />
        </div>

        {/* Scenario card */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">🔍</span>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">
                Scenario {current + 1}
              </p>
              <h2 className="font-bold text-foreground text-base leading-snug">{scenario.title}</h2>
            </div>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{scenario.description}</p>

          {scenario.redFlags.length > 0 && !revealed && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Red flags to consider</p>
              <div className="flex flex-wrap gap-2">
                {scenario.redFlags.map((f) => (
                  <span key={f} className="text-xs bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-full px-2.5 py-0.5 font-medium">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Guess buttons */}
        {!revealed && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center font-medium uppercase tracking-wide">Your verdict</p>
            <div className="grid grid-cols-3 gap-3">
              {(["scam", "grey", "legit"] as Verdict[]).map((v) => {
                const c = VERDICT_CONFIG[v];
                const Icon = c.icon;
                const labels = { scam: "🚨 Scam", grey: "⚠️ Grey zone", legit: "✅ Legit" };
                return (
                  <button
                    key={v}
                    onClick={() => handleGuess(v)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-border hover:border-primary/50 transition-all text-sm font-semibold text-foreground/80 hover:bg-muted/50`}
                  >
                    <Icon className={`h-5 w-5 ${c.color}`} />
                    {labels[v]}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Revealed verdict */}
        {revealed && (
          <div className={`rounded-2xl border p-5 space-y-3 ${cfg.bg}`}>
            <div className="flex items-center gap-2">
              <VerdictIcon className={`h-5 w-5 ${cfg.color}`} />
              <span className={`font-bold text-sm ${cfg.color}`}>{scenario.verdictLabel}</span>
              {guess === scenario.verdict ? (
                <span className="ml-auto text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/40 rounded-full px-2 py-0.5">+1 correct</span>
              ) : (
                <span className="ml-auto text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/40 rounded-full px-2 py-0.5">incorrect</span>
              )}
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{scenario.explanation}</p>
            <Button onClick={handleNext} className="w-full gap-2" size="sm">
              {current + 1 < total ? "Next scenario" : "See results"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Score tracker */}
        <p className="text-center text-xs text-muted-foreground">
          Score: <span className="font-semibold text-foreground">{score}/{current + (revealed ? 1 : 0)}</span>
        </p>
      </div>
    </div>
  );
}
