import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { auth, db } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all";

type Step = "email" | "sent" | "profile";

export default function Auth() {
  const navigate = useNavigate();
  const { setProfile } = useAuthStore();

  const localProfile = db.getProfile();
  const isReturning = !!localProfile;

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState(localProfile?.email ?? "");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // On load: if already signed in go to dashboard.
  // If user landed here via magic link click, they already have a session —
  // check for profile and either go to dashboard or show profile step.
  useEffect(() => {
    const init = async () => {
      const storeProfile = useAuthStore.getState().profile;
      if (storeProfile) {
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
          // New user who clicked magic link — collect their details
          setEmail(session.user.email ?? "");
          setStep("profile");
        }
      }
    };
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Step 1: send magic link ───────────────────────────────────────────────
  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      const { error: err } = await auth.sendOtp(email.trim().toLowerCase());
      if (err) throw err;
      setStep("sent");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 3: save profile (new users only) ─────────────────────────────────
  const handleProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !consent) return;
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
        age: age ? parseInt(age) : undefined,
        phone: phone.trim() || undefined,
        consent_given: true,
        level_assigned: savedResult?.level,
        grey_zone_flagged: savedResult?.greyZone?.flagged,
        grey_zone_exposure: savedResult?.greyZone?.exposures,
        created_at: new Date().toISOString(),
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

      <div className="w-full max-w-sm space-y-8 relative">

        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          ← Back
        </Link>

        {/* ── Email step ── */}
        {step === "email" && (
          <form onSubmit={handleSendLink} className="space-y-6">
            <div className="space-y-2">
              {isReturning ? (
                <>
                  <span
                    className="inline-block text-xs font-bold tracking-widest text-primary/80 uppercase px-3 py-1 rounded-full border border-primary/20"
                    style={{ background: "rgba(16,185,129,0.08)" }}
                  >
                    Welcome back
                  </span>
                  <h1 className="text-2xl font-bold text-foreground leading-tight">
                    Good to see you again{localProfile?.name ? `, ${localProfile.name.split(" ")[0]}` : ""}.
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    We'll send a sign-in link to your email.
                  </p>
                </>
              ) : (
                <>
                  <span
                    className="inline-block text-xs font-bold tracking-widest text-primary/80 uppercase px-3 py-1 rounded-full border border-primary/20"
                    style={{ background: "rgba(16,185,129,0.08)" }}
                  >
                    Early Access
                  </span>
                  <h1 className="text-2xl font-bold text-foreground leading-tight">
                    You're one of the first.
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Enter your email — we'll send you a one-click sign-in link.
                  </p>
                </>
              )}
            </div>

            <div className="space-y-3">
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
                  : isReturning
                  ? <>Send sign-in link <ArrowRight className="h-4 w-4" /></>
                  : <>Get access <ArrowRight className="h-4 w-4" /></>
                }
              </button>
            </div>

            <p className="text-xs text-muted-foreground/40 text-center">
              Free. No products. No commissions.
            </p>
          </form>
        )}

        {/* ── Sent step ── */}
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
                We sent a sign-in link to{" "}
                <span className="text-foreground/80 font-medium">{email}</span>.
                <br />
                Click the link in the email to continue.
              </p>
            </div>
            <p className="text-xs text-muted-foreground/40">
              Didn't get it? Check spam, or{" "}
              <button
                onClick={() => { setStep("email"); setError(""); }}
                className="underline hover:text-muted-foreground transition-colors"
              >
                try again
              </button>
              .
            </p>
          </div>
        )}

        {/* ── Profile step (new users after clicking magic link) ── */}
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
              <p className="text-sm text-muted-foreground">
                A few quick details and you're in.
              </p>
            </div>

            <div className="space-y-3">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Name</label>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              {/* Age */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Age</label>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="e.g. 24"
                  min={13}
                  max={100}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              {/* Phone — optional */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Phone <span className="text-muted-foreground/40">(optional)</span>
                </label>
                <input
                  type="tel"
                  autoComplete="tel"
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`h-4 w-4 rounded border transition-all ${
                      consent ? "border-primary bg-primary" : "border-white/20 bg-white/[0.04]"
                    }`}
                  >
                    {consent && (
                      <svg className="h-4 w-4 text-white" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  I agree that Kosh may use my learning data to improve the platform. No financial products are sold. No data is sold to third parties.
                </span>
              </label>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading || !name.trim() || !age || !consent}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40"
                style={{
                  background: "linear-gradient(135deg, hsl(160,84%,39%) 0%, hsl(160,84%,30%) 100%)",
                  boxShadow: name.trim() && age && consent ? "0 0 28px rgba(16,185,129,0.25)" : "none",
                }}
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
