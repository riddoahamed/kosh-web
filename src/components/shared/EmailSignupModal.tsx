import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const SESSION_KEY = "kosh_email_modal_shown";

interface Props {
  delayMs?: number;
}

export default function EmailSignupModal({ delayMs = 28000 }: Props) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const t = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  if (!visible) return null;

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem(SESSION_KEY, "1");
    navigate("/auth", { state: { prefill: value.trim() } });
  };

  return (
    <>
      <style>{`
        @keyframes kosh-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes kosh-card-in {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
        style={{
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)",
          animation: "kosh-backdrop-in 0.5s ease forwards",
        }}
        onClick={dismiss}
      >
        {/* Card — stop propagation so clicks inside don't close */}
        <form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm rounded-2xl border border-white/[0.08] p-6 space-y-5"
          style={{
            background: "rgba(12,18,14,0.94)",
            backdropFilter: "blur(40px)",
            boxShadow:
              "0 0 80px rgba(16,185,129,0.07), 0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
            animation: "kosh-card-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          {/* Shimmer top line */}
          <div
            className="absolute top-0 inset-x-0 h-px rounded-t-2xl"
            style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)" }}
          />

          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="font-semibold text-foreground text-[15px] leading-snug">
                Get early access
              </p>
              <p className="text-xs text-muted-foreground">
                Email or phone. That's it.
              </p>
            </div>
            <button
              type="button"
              onClick={dismiss}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Input */}
          <input
            type="text"
            autoComplete="email"
            placeholder="Email or phone number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
          />

          {/* CTA */}
          <button
            type="submit"
            disabled={!value.trim()}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 disabled:opacity-35 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, hsl(160,84%,39%) 0%, hsl(160,84%,30%) 100%)",
              boxShadow: value.trim() ? "0 0 28px rgba(16,185,129,0.28)" : "none",
            }}
          >
            Continue →
          </button>

        </form>
      </div>
    </>
  );
}
