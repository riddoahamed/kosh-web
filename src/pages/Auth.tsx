import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { auth, db } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { startDemoLite, isDemoMode, exitDemo } from "@/lib/demo";

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all";

type Tab = "signup" | "login";
type Step = "form" | "sent" | "profile" | "rate-limited";

export default function Auth() {
  const navigate = useNavigate();
  const { setProfile } = useAuthStore();

  const inDemo = isDemoMode();
  const cachedEmail = inDemo ? "" : (db.getProfile()?.email ?? "");

  const [tab, setTab] = useState<Tab>(cachedEmail ? "login" : "signup");
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState(cachedEmail);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Clear demo state on mount, redirect if already signed in
  useEffect(() => {
    if (inDemo) {
      exitDemo();
      useAuthStore.getState().loadProfile();
    }
    const init = async () => {
      const storeProfile = useAuthStore.getState().profile;
      if (storeProfile && !isDemoMode()) {
        navigate("/dashboard", { replace: true });
        return;
      }
      const session = await auth.getSession();
      if (session?.user) {
        const existing = await db.fetchProfile(session.user.id);
        if (existing) {
          setProfile(existing);
          navigate("/dashboard", { replace: true });
        } else {
          setEmail(session.user.email ?? "");
          setStep("profile");
        }
      }
    };
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function isRateLimitError(err: unknown): boolean {
    const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
    return msg.includes("rate limit") || msg.includes("email rate") ||
      msg.includes("over_email_send_rate_limit") || msg.includes("too many requests");
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      const { error: err } = await auth.sendOtp(email.trim().toLowerCase());
      if (err) throw err;
      setStep("sent");
    } catch (err: unknown) {
      if (isRateLimitError(err)) setStep("rate-limited");
      else setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !age || !consent) return;
    setLoading(true);
    setError("");
    try {
      const user = await auth.getUser();
      if (!user) throw new Error("Session expired. Please sign in again.");
      const savedResult = db.getDiagnosticResult();
      const profile = {
        id: user.id,
        email: user.email,
        name: name.trim(),
        age: parseInt(age),
        phone: phone.trim() || undefined,
        consent_given: true,
        level_assigned: savedResult?.level,
        grey_zone_flagged: savedResult?.greyZone?.flagged,
        grey_zone_exposure: savedResult?.greyZone?.exposures,
        created_at: new Date().toISOString(),
        kyc_status: "not_submitted" as const,
      };
      setProfile(profile);
      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4 py-12"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 3rem)" }}
    >
      {/* Ambient glow */}
      <div
        className="fixed inset-x-0 top-0 h-72 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 65%)" }}
      />

      <div className="w-full max-w-sm space-y-6 relative">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          ← Back
        </Link>

        {/* ── Email form (signup / login) ── */}
        {step === "form" && (
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-1 gap-1">
              {(["signup", "login"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setError(""); if (t === "login") setEmail(cachedEmail); else setEmail(""); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    tab === t
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "signup" ? "Sign up" : "Log in"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSend} className="space-y-3">
              <input
                type="email"
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
              />
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40"
                style={{
                  background: "linear-gradient(135deg, hsl(160,84%,39%) 0%, hsl(160,84%,30%) 100%)",
                  boxShadow: email.trim() ? "0 0 28px rgba(16,185,129,0.25)" : "none",
                }}
              >
                {loading
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : <>{tab === "signup" ? "Get access" : "Send sign-in link"} <ArrowRight className="h-4 w-4" /></>
                }
              </button>
            </form>

            <p className="text-xs text-muted-foreground/40 text-center">
              We'll email you a one-click link. No password needed.
            </p>
          </div>
        )}

        {/* ── Check inbox ── */}
        {step === "sent" && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div
                className="h-16 w-16 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <Mail className="h-7 w-7 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Check your inbox</h1>
              <p className="text-sm text-muted-foreground">
                We sent a sign-in link to <span className="text-foreground/80 font-medium">{email}</span>.
              </p>
            </div>
            <p className="text-xs text-muted-foreground/40">
              Didn't get it? Check spam, or{" "}
              <button onClick={() => { setStep("form"); setError(""); }} className="underline hover:text-muted-foreground transition-colors">
                try again
              </button>.
            </p>
          </div>
        )}

        {/* ── Rate limited: offer demo ── */}
        {step === "rate-limited" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span
                className="inline-block text-xs font-bold tracking-widest text-amber-500 uppercase px-3 py-1 rounded-full border border-amber-500/20"
                style={{ background: "rgba(245,158,11,0.08)" }}
              >
                Email limit reached
              </span>
              <h1 className="text-2xl font-bold text-foreground">Too many sign-in requests</h1>
              <p className="text-sm text-muted-foreground">
                Our email provider has a temporary limit. Wait a few minutes and try again — or explore Kosh now without signing up.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/20 p-5 space-y-4" style={{ background: "rgba(16,185,129,0.05)" }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🥭</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Explore Kosh now</p>
                  <p className="text-xs text-muted-foreground">Start from Module 1 — no email needed</p>
                </div>
              </div>
              <button
                onClick={() => {
                  startDemoLite();
                  useAuthStore.getState().loadProfile();
                  navigate("/dashboard", { replace: true });
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: "linear-gradient(135deg, hsl(160,84%,39%) 0%, hsl(160,84%,30%) 100%)", boxShadow: "0 0 28px rgba(16,185,129,0.25)" }}
              >
                Start exploring <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-muted-foreground/50 text-center">Your progress won't be saved until you sign up.</p>
            </div>

            <p className="text-center text-xs text-muted-foreground/40">
              Ready to try again?{" "}
              <button onClick={() => setStep("form")} className="underline hover:text-muted-foreground transition-colors">
                Go back
              </button>
            </p>
          </div>
        )}

        {/* ── Profile setup (new users after clicking magic link) ── */}
        {step === "profile" && (
          <form onSubmit={handleProfile} className="space-y-6">
            <div className="space-y-2">
              <span
                className="inline-block text-xs font-bold tracking-widest text-primary/80 uppercase px-3 py-1 rounded-full border border-primary/20"
                style={{ background: "rgba(16,185,129,0.08)" }}
              >
                Almost there
              </span>
              <h1 className="text-2xl font-bold text-foreground">Set up your account</h1>
              <p className="text-sm text-muted-foreground">A few quick details and you're in.</p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Name *</label>
                <input type="text" autoComplete="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Age *</label>
                <input type="number" inputMode="numeric" placeholder="e.g. 24" min={13} max={100} value={age} onChange={(e) => setAge(e.target.value)} required className={inputClass} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Phone <span className="text-muted-foreground/40">(optional)</span></label>
                <input type="tel" autoComplete="tel" placeholder="01XXXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
              </div>

              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <div className="relative mt-0.5 shrink-0">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="sr-only" />
                  <div className={`h-4 w-4 rounded border transition-all ${consent ? "border-primary bg-primary" : "border-white/20 bg-white/[0.04]"}`}>
                    {consent && (
                      <svg className="h-4 w-4 text-white" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  I agree that Kosh may use my learning data to improve the platform. No financial products sold. No data sold to third parties.
                </span>
              </label>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading || !name.trim() || !age || !consent}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, hsl(160,84%,39%) 0%, hsl(160,84%,30%) 100%)", boxShadow: name.trim() && age && consent ? "0 0 28px rgba(16,185,129,0.25)" : "none" }}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Go to my dashboard →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
