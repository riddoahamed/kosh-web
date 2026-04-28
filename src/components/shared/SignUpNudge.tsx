import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, Sparkles } from "lucide-react";

const SESSION_KEY = "kosh_nudge_shown";

interface SignUpNudgeProps {
  /** delay in ms before the nudge slides in (default 4000) */
  delay?: number;
  /** headline inside the nudge */
  headline?: string;
  /** subtext */
  sub?: string;
}

export default function SignUpNudge({
  delay = 4000,
  headline = "Save your progress",
  sub = "Free account. No spam. Your results stay yours.",
}: SignUpNudgeProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only show once per browser session
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setMounted(true);
      // Tiny delay so CSS transition fires after mount
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
    setTimeout(() => setMounted(false), 400); // unmount after transition
  };

  if (!mounted) return null;

  return (
    <div
      className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-80"
      style={{
        transform: visible ? "translateY(0)" : "translateY(calc(100% + 24px))",
        opacity: visible ? 1 : 0,
        transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease",
      }}
    >
      <div
        className="relative rounded-2xl border border-white/[0.1] overflow-hidden"
        style={{
          background: "rgba(18, 24, 20, 0.85)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          boxShadow:
            "0 0 0 1px rgba(16,185,129,0.12), 0 8px 40px rgba(0,0,0,0.6), 0 0 60px rgba(16,185,129,0.07)",
        }}
      >
        {/* Subtle top glow line */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(16,185,129,0.5) 50%, transparent)",
          }}
        />

        {/* Ambient blob */}
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.25), transparent)" }}
        />

        <div className="relative p-5">
          {/* Dismiss */}
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 h-6 w-6 rounded-full flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* Icon + headline */}
          <div className="flex items-start gap-3 pr-6">
            <div
              className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border border-primary/25"
              style={{
                background: "rgba(16,185,129,0.12)",
                boxShadow: "0 0 16px rgba(16,185,129,0.25)",
              }}
            >
              <Sparkles
                className="h-4 w-4 text-primary"
                style={{ filter: "drop-shadow(0 0 4px rgba(16,185,129,0.8))" }}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-snug">{headline}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{sub}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-4">
            <Link
              to="/auth"
              onClick={() => sessionStorage.setItem(SESSION_KEY, "1")}
              className="flex-1 text-center text-sm font-semibold text-white py-2.5 rounded-xl transition-all btn-glow"
            >
              Create free account
            </Link>
            <button
              onClick={dismiss}
              className="text-xs text-muted-foreground hover:text-foreground/70 transition-colors px-3 py-2.5 rounded-xl hover:bg-white/[0.05]"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
