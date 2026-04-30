/**
 * Sticky banner shown to users in demo mode (hit email rate limit).
 * Prompts sign-up so their progress gets saved.
 */

import { useNavigate } from "react-router-dom";
import { isDemoMode, exitDemo } from "@/lib/demo";

export function DemoBanner() {
  const navigate = useNavigate();

  if (!isDemoMode()) return null;

  function handleSignUp() {
    exitDemo();
    navigate("/auth");
  }

  return (
    <div
      className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-xs font-medium"
      style={{
        background: "linear-gradient(90deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.08) 100%)",
        borderBottom: "1px solid rgba(16,185,129,0.2)",
      }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="shrink-0">👋</span>
        <span className="text-foreground/70 truncate">
          You're exploring in demo mode — <span className="text-foreground/90">progress won't be saved.</span>
        </span>
      </div>
      <button
        onClick={handleSignUp}
        className="shrink-0 text-xs font-bold text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
      >
        Sign up free →
      </button>
    </div>
  );
}
