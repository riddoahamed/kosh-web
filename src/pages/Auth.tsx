// ─────────────────────────────────────────────────────────────────────────────
// Auth — sign up / log in only. No magic links, no email confirmation,
// no password reset emails. Pure local-first; everything stored on the
// device via src/lib/localAuth.ts.
//
// If you need cross-device sync later, that's a layer on top — this page
// doesn't need to change.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { db } from "@/lib/supabase";
import { localAuth } from "@/lib/localAuth";
import { useAuthStore } from "@/store/authStore";
import { startDemo, isDemoMode, exitDemo } from "@/lib/demo";

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all";

type Tab = "signup" | "login";

export default function Auth() {
  const navigate = useNavigate();
  const { setProfile } = useAuthStore();

  // If user lands here while already logged in, send them to dashboard
  useEffect(() => {
    if (isDemoMode()) {
      exitDemo();
      useAuthStore.getState().loadProfile();
    }
    const active = localAuth.getActiveProfile();
    if (active && !isDemoMode()) {
      navigate("/dashboard", { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Pre-fill email from query string (when user arrives via EmailSignupModal)
  const urlEmail =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("email") ?? ""
      : "";

  // Pre-pick tab based on whether they've signed up before on this device
  const knownEmails = localAuth.listEmails();
  const initialTab: Tab = knownEmails.length > 0 && !urlEmail ? "login" : "signup";
  const initialEmail = urlEmail || (knownEmails[0] ?? "");

  const [tab, setTab]           = useState<Tab>(initialTab);
  const [email, setEmail]       = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [name, setName]         = useState("");
  const [age, setAge]           = useState("");
  const [phone, setPhone]       = useState("");
  const [consent, setConsent]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim())          return setError("Please enter your email.");
    if (password.length < 6)    return setError("Password must be at least 6 characters.");
    if (!name.trim())           return setError("Please enter your name.");
    if (!age || +age < 13)      return setError("Please enter a valid age (13+).");
    if (!consent)               return setError("Please agree to the terms to continue.");

    setLoading(true);

    // Bring along any anonymous diagnostic the user already completed
    const savedResult = db.getDiagnosticResult();

    const result = localAuth.signUp(email, password, {
      name: name.trim(),
      age: parseInt(age),
      phone: phone.trim() || undefined,
      consent_given: true,
      level_assigned: savedResult?.level,
      grey_zone_flagged: savedResult?.greyZone?.flagged,
      grey_zone_exposure: savedResult?.greyZone?.exposures,
      kyc_status: "not_submitted",
    });

    if (!result.success) {
      setError(result.error);
      if (result.error.toLowerCase().includes("already exists")) {
        setTab("login");
        setPassword("");
      }
      setLoading(false);
      return;
    }

    // Success — also write through db.saveProfile so any background Supabase
    // sync gets a chance (silent; failures are logged but don't block).
    db.saveProfile(result.profile);
    setProfile(result.profile);
    navigate("/dashboard", { replace: true });
  }

  function handleLogIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) return setError("Email and password are required.");

    setLoading(true);
    const result = localAuth.logIn(email, password);
    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }
    setProfile(result.profile);
    navigate("/dashboard", { replace: true });
  }

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4 py-12"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 3rem)" }}
    >
      {/* Ambient lime glow at the top */}
      <div
        className="fixed inset-x-0 top-0 h-72 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(87,100%,68%,0.12) 0%, transparent 65%)" }}
      />

      <div className="w-full max-w-sm space-y-6 relative">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          ← Back
        </Link>

        {/* Tab toggle */}
        <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-1 gap-1">
          {(["signup", "login"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); setPassword(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === t ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "signup" ? "Sign up" : "Log in"}
            </button>
          ))}
        </div>

        {/* Form */}
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
                  background:  consent ? "hsla(87,100%,68%,0.06)" : "rgba(255,255,255,0.02)",
                }}
              >
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="sr-only" />
                <div
                  className="relative mt-0.5 shrink-0 h-5 w-5 rounded-md flex items-center justify-center transition-all"
                  style={{
                    background:  consent ? "hsl(var(--primary))" : "rgba(255,255,255,0.04)",
                    border:      consent ? "1.5px solid hsl(var(--primary))" : "1.5px solid hsla(225,29%,97%,0.30)",
                    boxShadow:   consent ? "0 0 12px hsla(87,100%,68%,0.4)" : "none",
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

        <p className="text-xs text-muted-foreground/40 text-center">
          {tab === "signup"
            ? "Your account is saved on this device. No verification email needed."
            : "Don't have an account? Use the Sign up tab above."}
        </p>

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
              border:     "1px solid hsla(213,100%,70%,0.25)",
              color:      "hsl(213,100%,72%)",
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
    </div>
  );
}
