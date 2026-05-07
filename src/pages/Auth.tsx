import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { auth, db } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { startDemo, isDemoMode, exitDemo } from "@/lib/demo";

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all";

type Tab = "signup" | "login";
type Step = "form" | "profile" | "reset" | "reset-sent" | "set-new-password" | "confirm-email";

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setProfile } = useAuthStore();

  const inDemo = isDemoMode();
  const urlEmail = searchParams.get("email") ?? "";
  const cachedEmail = inDemo ? "" : (db.getProfile()?.email ?? "");
  const initialEmail = urlEmail || cachedEmail;

  const [tab, setTab] = useState<Tab>(cachedEmail && !urlEmail ? "login" : "signup");
  const [step, setStep] = useState<Step>(searchParams.get("reset") === "1" ? "set-new-password" : "form");

  // Form fields
  const [email, setEmail]       = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [name, setName]         = useState("");
  const [age, setAge]           = useState("");
  const [phone, setPhone]       = useState("");
  const [consent, setConsent]   = useState(false);
  const [newPw, setNewPw]       = useState("");

  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [resending, setResending] = useState(false);
  const [resendOk, setResendOk]   = useState(false);
  const [needsConfirmEmail, setNeedsConfirmEmail] = useState(false);

  // On mount: if already signed in, redirect to dashboard.
  useEffect(() => {
    if (inDemo) {
      exitDemo();
      useAuthStore.getState().loadProfile();
    }
    const init = async () => {
      // Skip auto-redirect if user is here for password reset
      if (searchParams.get("reset") === "1") return;

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
          // Active session but no profile yet — finish setup
          setEmail(session.user.email ?? "");
          setStep("profile");
        }
      }
    };
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sign up (email + password + profile fields, all in one go) ──────────
  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (!name.trim())         { setError("Please enter your name.");                  return; }
    if (!age || +age < 13)    { setError("Please enter a valid age (13+).");          return; }
    if (!consent)             { setError("Please agree to the terms to continue.");   return; }

    setLoading(true);
    try {
      const { data, error: err } = await auth.signUpWithPassword(email, password);
      if (err) throw err;

      const user = data.user;
      if (!user) throw new Error("Sign-up failed. Please try again.");

      // Build the profile (saved to localStorage + per-user cache + Supabase)
      const savedResult = db.getDiagnosticResult();
      const profile = {
        id: user.id,
        email: user.email ?? email.trim().toLowerCase(),
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

      if (data.session) {
        // Email confirmation OFF in Supabase → instant session. Save profile
        // (this also writes to Supabase since session is live) and ship them
        // to the dashboard.
        setProfile(profile);
        navigate("/dashboard", { replace: true });
      } else {
        // Email confirmation IS on. The Supabase RLS policies will block the
        // profile write because there's no live session. Cache the profile
        // locally so it's ready the moment they log in (after confirming).
        // Then route them to the "check your email" step.
        db.saveLocalOnlyProfile(profile);
        setNeedsConfirmEmail(true);
        setStep("confirm-email");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Try again.";
      const lower = msg.toLowerCase();
      if (lower.includes("already registered") || lower.includes("already exists") || lower.includes("user already")) {
        setError("An account with this email already exists. Try logging in instead.");
        setTab("login");
      } else if (lower.includes("rate limit") || lower.includes("too many requests")) {
        setError("Too many attempts. Wait a minute and try again.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setResending(true);
    setResendOk(false);
    setError("");
    try {
      const { error: err } = await auth.resendConfirmation(email);
      if (err) throw err;
      setResendOk(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Couldn't resend confirmation.");
    } finally {
      setResending(false);
    }
  }

  // ── Log in (email + password) ──────────────────────────────────────────
  async function handleLogIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }
    setLoading(true);
    try {
      const { data, error: err } = await auth.signInWithPassword(email, password);
      if (err) throw err;
      if (!data.user) throw new Error("Login failed. Please try again.");

      // Pull profile (Supabase first, then per-user cache fallback)
      const existing = await db.fetchProfile(data.user.id);
      if (existing) {
        setProfile(existing);
        navigate("/dashboard", { replace: true });
      } else {
        // Authenticated but no profile yet — complete it
        setStep("profile");
      }
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : String(err);
      const lower = raw.toLowerCase();
      if (lower.includes("invalid login") || lower.includes("invalid credentials")) {
        setError("Wrong email or password. Try again, or reset your password below.");
      } else if (lower.includes("email not confirmed") || lower.includes("not confirmed")) {
        // The account exists but email isn't confirmed yet. Send them to the
        // confirmation screen with a Resend button so they can recover.
        setNeedsConfirmEmail(true);
        setStep("confirm-email");
        setError("");
      } else {
        setError(raw);
      }
    } finally {
      setLoading(false);
    }
  }

  // ── Profile completion (only shown if user has session but no profile) ──
  async function handleProfile(e: React.FormEvent) {
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
        email: user.email ?? email.trim().toLowerCase(),
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
  }

  // ── Forgot password: send reset email ──────────────────────────────────
  async function handleSendReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Enter your email first."); return; }
    setLoading(true);
    try {
      const { error: err } = await auth.resetPassword(email);
      if (err) throw err;
      setStep("reset-sent");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Couldn't send reset email.");
    } finally {
      setLoading(false);
    }
  }

  // ── Set new password (after clicking reset link in email) ──────────────
  async function handleSetNewPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (newPw.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const { error: err } = await auth.updatePassword(newPw);
      if (err) throw err;
      // Reset successful — go to dashboard
      const user = await auth.getUser();
      if (user) {
        const existing = await db.fetchProfile(user.id);
        if (existing) {
          setProfile(existing);
          navigate("/dashboard", { replace: true });
        } else {
          setStep("profile");
        }
      } else {
        navigate("/auth", { replace: true });
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Couldn't update password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4 py-12"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 3rem)" }}
    >
      {/* Ambient glow */}
      <div
        className="fixed inset-x-0 top-0 h-72 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(87,100%,68%,0.12) 0%, transparent 65%)" }}
      />

      <div className="w-full max-w-sm space-y-6 relative">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          ← Back
        </Link>

        {/* ── Sign up / Log in ── */}
        {step === "form" && (
          <div className="space-y-5">
            {/* Tab toggle */}
            <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-1 gap-1">
              {(["signup", "login"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setError(""); setPassword(""); if (t === "login" && cachedEmail) setEmail(cachedEmail); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    tab === t
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "signup" ? "Sign up" : "Log in"}
                </button>
              ))}
            </div>

            <form onSubmit={tab === "signup" ? handleSignUp : handleLogIn} className="space-y-3">
              <input
                type="email"
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
              />
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  autoComplete={tab === "signup" ? "new-password" : "current-password"}
                  placeholder={tab === "signup" ? "Create a password (min 6)" : "Your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className={inputClass + " pr-12"}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {tab === "signup" && (
                <>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={inputClass}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="Age"
                      min={13}
                      max={100}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                      className={inputClass}
                    />
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="Phone (optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <label
                    className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border transition-all"
                    style={{
                      borderColor: consent ? "hsla(87,100%,68%,0.45)" : "hsla(225,29%,97%,0.12)",
                      background: consent ? "hsla(87,100%,68%,0.06)" : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="sr-only" />
                    <div
                      className="relative mt-0.5 shrink-0 h-5 w-5 rounded-md flex items-center justify-center transition-all"
                      style={{
                        background: consent ? "hsl(var(--primary))" : "rgba(255,255,255,0.04)",
                        border: consent ? "1.5px solid hsl(var(--primary))" : "1.5px solid hsla(225,29%,97%,0.30)",
                        boxShadow: consent ? "0 0 12px hsla(87,100%,68%,0.4)" : "none",
                      }}
                    >
                      {consent && (
                        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" style={{ color: "hsl(var(--primary-foreground))" }}>
                          <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-foreground/85 leading-relaxed">
                      <span className="font-semibold text-foreground">I agree</span> Kosh may use my learning data to improve the platform. No financial products sold. No data sold to third parties.
                    </span>
                  </label>
                </>
              )}

              {error && <p className="text-xs text-red-400 leading-relaxed">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="btn-brand w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold tracking-tight disabled:opacity-50"
              >
                {loading
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : <>{tab === "signup" ? "Create account" : "Log in"} <ArrowRight className="h-4 w-4" /></>
                }
              </button>
            </form>

            {tab === "login" && (
              <div className="text-center">
                <button
                  onClick={() => { setStep("reset"); setError(""); }}
                  className="text-xs text-muted-foreground/60 hover:text-primary transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Demo account quick-start */}
            <div className="pt-3 mt-2 border-t border-white/[0.06] space-y-2">
              <p className="text-xs text-muted-foreground/55 text-center">
                Just want to look around?
              </p>
              <button
                type="button"
                onClick={() => {
                  startDemo();
                  useAuthStore.getState().loadProfile();
                  navigate("/dashboard", { replace: true });
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-white/[0.06] active:scale-[0.99]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid hsla(213,100%,70%,0.25)",
                  color: "hsl(213,100%,72%)",
                }}
              >
                <span>✨</span>
                Try demo account (no signup)
              </button>
              <p className="text-[11px] text-muted-foreground/45 text-center leading-relaxed">
                Pre-loaded progress · Zone 1 complete · 1,240 mangoes.<br/>
                Demo data is local — sign up later to keep your real progress.
              </p>
            </div>
          </div>
        )}

        {/* ── Forgot password (request reset) ── */}
        {step === "reset" && (
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="text-2xl font-display font-extrabold text-foreground tracking-tight">Reset your password</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and we'll send you a link to set a new password.
              </p>
            </div>
            <form onSubmit={handleSendReset} className="space-y-3">
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
                className="btn-brand w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold tracking-tight disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send reset link <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
            <div className="text-center">
              <button onClick={() => { setStep("form"); setError(""); }} className="text-xs text-muted-foreground/60 hover:text-primary transition-colors">
                ← Back to log in
              </button>
            </div>
          </div>
        )}

        {/* ── Reset email sent confirmation ── */}
        {step === "reset-sent" && (
          <div className="space-y-5 text-center">
            <div className="flex justify-center">
              <div
                className="h-16 w-16 rounded-2xl flex items-center justify-center"
                style={{ background: "hsla(87,100%,68%,0.12)", border: "1px solid hsla(87,100%,68%,0.25)" }}
              >
                <CheckCircle2 className="h-7 w-7 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-display font-extrabold text-foreground tracking-tight">Check your inbox</h1>
              <p className="text-sm text-muted-foreground">
                We sent a password-reset link to <span className="text-foreground/80 font-medium">{email}</span>.
              </p>
            </div>
            <button
              onClick={() => { setStep("form"); setError(""); }}
              className="text-xs text-muted-foreground/60 hover:text-primary transition-colors"
            >
              ← Back to log in
            </button>
          </div>
        )}

        {/* ── Confirm email (signup with email-confirmation enabled, OR
              login attempt before user confirmed) ── */}
        {step === "confirm-email" && (
          <div className="space-y-5 text-center">
            <div className="flex justify-center">
              <div
                className="h-16 w-16 rounded-2xl flex items-center justify-center"
                style={{ background: "hsla(213,100%,70%,0.12)", border: "1px solid hsla(213,100%,70%,0.30)" }}
              >
                <CheckCircle2 className="h-7 w-7" style={{ color: "hsl(213,100%,72%)" }} />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-display font-extrabold text-foreground tracking-tight">
                Check your email
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {needsConfirmEmail
                  ? <>We sent a confirmation link to <span className="text-foreground/85 font-medium">{email}</span>. Click it to activate your account, then log in.</>
                  : <>Almost there.</>
                }
              </p>
              <p className="text-xs text-muted-foreground/55 leading-relaxed">
                Didn't get it? Check spam, then resend below.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleResend}
                disabled={resending || resendOk}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
                style={{
                  background: "hsla(213,100%,70%,0.10)",
                  border: "1px solid hsla(213,100%,70%,0.30)",
                  color: "hsl(213,100%,72%)",
                }}
              >
                {resending ? <Loader2 className="h-4 w-4 animate-spin" />
                  : resendOk ? "Resent — check your inbox"
                  : "Resend confirmation email"}
              </button>
              {error && <p className="text-xs text-red-400">{error}</p>}
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => { setStep("form"); setTab("login"); setError(""); setResendOk(false); }}
                className="text-xs text-muted-foreground/70 hover:text-primary transition-colors"
              >
                Already confirmed? Log in →
              </button>
              <p className="text-[11px] text-muted-foreground/40 leading-relaxed pt-2 border-t border-white/[0.06]">
                Your name & progress are saved locally. The moment you confirm
                your email and log in, everything will sync.
              </p>
            </div>
          </div>
        )}

        {/* ── Set new password (landed here from reset email) ── */}
        {step === "set-new-password" && (
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="text-2xl font-display font-extrabold text-foreground tracking-tight">Set a new password</h1>
              <p className="text-sm text-muted-foreground">Pick something at least 6 characters long.</p>
            </div>
            <form onSubmit={handleSetNewPassword} className="space-y-3">
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="New password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  required
                  minLength={6}
                  className={inputClass + " pr-12"}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={loading || newPw.length < 6}
                className="btn-brand w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold tracking-tight disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update password"}
              </button>
            </form>
          </div>
        )}

        {/* ── Profile completion (active session, no profile yet) ── */}
        {step === "profile" && (
          <form onSubmit={handleProfile} className="space-y-6">
            <div className="space-y-2">
              <span
                className="inline-block text-xs font-bold tracking-widest text-primary/80 uppercase px-3 py-1 rounded-full border border-primary/20"
                style={{ background: "hsla(87,100%,68%,0.08)" }}
              >
                Almost there
              </span>
              <h1 className="text-2xl font-display font-extrabold text-foreground tracking-tight">Set up your account</h1>
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

              <label
                className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border transition-all"
                style={{
                  borderColor: consent ? "hsla(87,100%,68%,0.45)" : "hsla(225,29%,97%,0.12)",
                  background: consent ? "hsla(87,100%,68%,0.06)" : "rgba(255,255,255,0.02)",
                }}
              >
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="sr-only" />
                <div
                  className="relative mt-0.5 shrink-0 h-5 w-5 rounded-md flex items-center justify-center transition-all"
                  style={{
                    background: consent ? "hsl(var(--primary))" : "rgba(255,255,255,0.04)",
                    border: consent ? "1.5px solid hsl(var(--primary))" : "1.5px solid hsla(225,29%,97%,0.30)",
                    boxShadow: consent ? "0 0 12px hsla(87,100%,68%,0.4)" : "none",
                  }}
                >
                  {consent && (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" style={{ color: "hsl(var(--primary-foreground))" }}>
                      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-foreground/85 leading-relaxed">
                  <span className="font-semibold text-foreground">I agree</span> that Kosh may use my learning data to improve the platform. No financial products sold. No data sold to third parties.
                </span>
              </label>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading || !name.trim() || !age || !consent}
                className="btn-brand w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold tracking-tight disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Go to my dashboard →"}
              </button>

              {!loading && (!name.trim() || !age || !consent) && (
                <p className="text-[11px] text-muted-foreground/55 text-center pt-1">
                  {!name.trim() ? "Add your name." : !age ? "Add your age." : "Tick the consent box to continue."}
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
