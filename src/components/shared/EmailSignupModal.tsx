import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";

const SESSION_KEY = "kosh_nudge_v2";

interface Props {
  /** Ref to the element that triggers the nudge when scrolled past */
  triggerRef?: React.RefObject<HTMLElement | null>;
  /** Fallback delay in ms if no triggerRef (default 18s) */
  fallbackDelayMs?: number;
}

export default function EmailSignupModal({
  triggerRef,
  fallbackDelayMs = 18000,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const shown = useRef(false);

  const show = () => {
    if (shown.current || sessionStorage.getItem(SESSION_KEY)) return;
    shown.current = true;
    setVisible(true);
  };

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    // Scroll-based trigger
    if (triggerRef) {
      const observer = new IntersectionObserver(
        ([entry]) => { if (!entry.isIntersecting) show(); },
        { threshold: 0 }
      );
      if (triggerRef.current) observer.observe(triggerRef.current);
      return () => observer.disconnect();
    }

    // Fallback: time-based
    const t = setTimeout(show, fallbackDelayMs);
    return () => clearTimeout(t);
  }, [triggerRef, fallbackDelayMs]);

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setDismissed(true);
    setTimeout(() => setVisible(false), 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem(SESSION_KEY, "1");
    navigate("/auth", { state: { prefill: email.trim() } });
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes nudge-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes nudge-out {
          from { opacity: 1; transform: translateY(0);    }
          to   { opacity: 0; transform: translateY(24px); }
        }
      `}</style>

      {/* Floating container — bottom sheet on mobile, bottom-right card on desktop */}
      <div
        className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:left-auto z-50 sm:w-80"
        style={{
          animation: `${dismissed ? "nudge-out" : "nudge-up"} 0.5s cubic-bezier(0.16,1,0.3,1) forwards`,
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="relative rounded-t-2xl sm:rounded-2xl border border-white/[0.08] px-5 pt-5 pb-6 sm:pb-5 space-y-4"
          style={{
            background: "rgba(10,16,12,0.96)",
            backdropFilter: "blur(40px)",
            boxShadow: "0 -4px 40px rgba(0,0,0,0.4), 0 0 0 1px hsla(87,100%,68%,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Shimmer line */}
          <div
            className="absolute top-0 inset-x-0 h-px rounded-t-2xl"
            style={{ background: "linear-gradient(90deg, transparent 10%, hsla(87,100%,68%,0.5) 50%, transparent 90%)" }}
          />

          {/* Dismiss */}
          <button
            type="button"
            onClick={dismiss}
            className="absolute top-4 right-4 text-white/25 hover:text-white/60 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* Copy */}
          <div className="space-y-0.5 pr-4">
            <p className="text-sm font-semibold text-foreground leading-snug">
              Join Kosh.
            </p>
            <p className="text-xs text-muted-foreground">Free early access.</p>
          </div>

          {/* Input + button */}
          <div className="flex gap-2">
            <input
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-sm text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
            />
            <button
              type="submit"
              disabled={!email.trim()}
              className="px-3.5 py-2.5 rounded-xl text-sm font-semibold shrink-0 transition-all disabled:opacity-30"
              style={{
                background: "linear-gradient(135deg, hsl(87,95%,62%) 0%, hsl(175,100%,42%) 100%)",
                color: "hsl(235,60%,8%)",
                boxShadow: email.trim() ? "0 0 20px hsla(87,100%,68%,0.3)" : "none",
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
