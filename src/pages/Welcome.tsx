import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { BookOpen, TrendingUp, Target, ChevronRight, Sparkles } from "lucide-react";
import { useEffect } from "react";

const FEATURES = [
  {
    icon: BookOpen,
    label: "Budget",
    desc: "Know where every taka goes",
    hsl: "160 90% 45%",
  },
  {
    icon: TrendingUp,
    label: "Invest",
    desc: "DSE, FDR, Sanchaypatra & more",
    hsl: "217 91% 60%",
  },
  {
    icon: Target,
    label: "Plan",
    desc: "Build real financial goals",
    hsl: "347 77% 50%",
  },
];

export default function Welcome() {
  const navigate = useNavigate();
  const { profile } = useAuthStore();

  useEffect(() => {
    if (!profile) navigate("/auth", { replace: true });
  }, [profile, navigate]);

  if (!profile) return null;

  const firstName = profile.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-sm mx-auto w-full px-5 py-10 flex flex-col flex-1">

        {/* Skip */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-xs font-semibold text-foreground/35 hover:text-foreground/60 transition-colors"
          >
            Skip →
          </button>
        </div>

        {/* Logo / brand mark */}
        <div className="flex justify-center mb-8">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: "hsla(160 90% 45% / 0.12)",
              border: "1.5px solid hsla(160 90% 45% / 0.35)",
              boxShadow:
                "0 0 40px hsla(160 90% 45% / 0.25), 0 0 80px hsla(160 90% 45% / 0.10), inset 0 1px 0 hsla(160 90% 45% / 0.15)",
            }}
          >
            <span
              className="text-4xl font-black tracking-tighter"
              style={{
                color: "hsl(160 90% 45%)",
                textShadow: "0 0 20px hsla(160 90% 45% / 0.8), 0 0 40px hsla(160 90% 45% / 0.4)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              K
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/35 mb-3">
            Welcome to Kosh
          </p>
          <h1 className="text-3xl font-black text-foreground leading-tight">
            Hey {firstName} 👋
          </h1>
          <p className="text-foreground/50 text-sm mt-3 leading-relaxed">
            School taught you algebra.{" "}
            <span className="text-foreground/75 font-medium">Not this.</span>
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-border my-8" />

        {/* What you'll learn */}
        <div className="space-y-3 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-foreground/35 mb-4">
            What you'll learn
          </p>
          {FEATURES.map(({ icon: Icon, label, desc, hsl }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-xl p-4"
              style={{
                background: `hsla(${hsl} / 0.07)`,
                border: `1px solid hsla(${hsl} / 0.20)`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `hsla(${hsl} / 0.15)`,
                  border: `1px solid hsla(${hsl} / 0.30)`,
                  boxShadow: `0 0 16px hsla(${hsl} / 0.25)`,
                }}
              >
                <Icon
                  size={18}
                  strokeWidth={1.75}
                  style={{ color: `hsl(${hsl})`, filter: `drop-shadow(0 0 5px hsla(${hsl} / 0.6))` }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground">{label}</p>
                <p className="text-xs text-foreground/50 mt-0.5">{desc}</p>
              </div>
              <ChevronRight size={14} className="text-foreground/20 shrink-0" />
            </div>
          ))}
        </div>

        {/* Quick stat */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {[
            { value: "9", label: "Zones" },
            { value: "40+", label: "Modules" },
            { value: "~45m", label: "To start" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p
                className="text-xl font-black"
                style={{ color: "hsl(160 90% 45%)" }}
              >
                {value}
              </p>
              <p className="text-[10px] font-semibold text-foreground/40 uppercase tracking-wider mt-0.5">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full rounded-xl py-4 font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: "hsl(160 90% 45%)",
              color: "#000",
              boxShadow: "0 0 28px hsla(160 90% 45% / 0.40)",
            }}
          >
            <Sparkles size={16} />
            Start learning
          </button>
          <p className="text-center text-[10px] text-foreground/30">
            Free · No credit card · Progress saved automatically
          </p>
        </div>
      </div>
    </div>
  );
}
