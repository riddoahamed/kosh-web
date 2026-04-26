import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Users,
  Building2,
  Smartphone,
  Globe,
  Gamepad2,
  CheckCircle2,
  Radar,
  ArrowLeftRight,
  Landmark,
  Crosshair,
  Gauge,
  PieChart,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────


const WHY_ITEMS = [
  {
    icon: BarChart3,
    title: "Baseline → 30-day → 60-day",
    desc: "Real measurement, not vibe-based. See how your knowledge actually improves.",
    color: "blue",
  },
  {
    icon: ShieldCheck,
    title: "No products. No commissions.",
    desc: "Kosh sells nothing. No broker referrals, no investment upsells. Just honest education.",
    color: "emerald",
  },
  {
    icon: Users,
    title: "Built for Bangladesh",
    desc: "Sanchaypatra, FDR, bKash, Evaly scams. Local context, not copy-pasted Western content.",
    color: "violet",
  },
];

interface Tool {
  href: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  tag: string;
  // per-color tokens (precomputed so Tailwind keeps them in the bundle)
  iconColor: string;
  iconGlowFilter: string;
  iconBg: string;
  iconBorder: string;
  iconShadow: string;
  cardBorder: string;
  cardHover: string;
  cardAmbient: string;
  tagStyle: string;
  arrowHover: string;
}

const TOOLS: Tool[] = [
  {
    href: "/scam-spotter",
    icon: Radar,
    title: "Scam Spotter",
    desc: "6 real Bangladesh scenarios. Spot scams: halal forex, bKash Ponzis, Telegram crypto, before they spot you.",
    tag: "Game",
    iconColor: "text-red-400",
    iconGlowFilter: "drop-shadow(0 0 6px rgba(239,68,68,0.9))",
    iconBg: "from-red-500/25 to-red-900/10",
    iconBorder: "border-red-500/25",
    iconShadow: "shadow-[0_0_18px_rgba(239,68,68,0.3)]",
    cardBorder: "border-white/[0.07] hover:border-red-500/35",
    cardHover: "hover:shadow-[0_0_45px_rgba(239,68,68,0.12),0_2px_8px_rgba(0,0,0,0.4)]",
    cardAmbient: "bg-red-500/8",
    tagStyle: "bg-red-500/15 text-red-400 border border-red-500/25",
    arrowHover: "group-hover:text-red-400/70",
  },
  {
    href: "/comparator",
    icon: ArrowLeftRight,
    title: "Savings Comparator",
    desc: "FDR vs Sanchaypatra vs DPS vs savings. After-tax returns with inflation benchmark.",
    tag: "Calculator",
    iconColor: "text-blue-400",
    iconGlowFilter: "drop-shadow(0 0 6px rgba(96,165,250,0.9))",
    iconBg: "from-blue-500/25 to-blue-900/10",
    iconBorder: "border-blue-500/25",
    iconShadow: "shadow-[0_0_18px_rgba(59,130,246,0.3)]",
    cardBorder: "border-white/[0.07] hover:border-blue-500/35",
    cardHover: "hover:shadow-[0_0_45px_rgba(59,130,246,0.12),0_2px_8px_rgba(0,0,0,0.4)]",
    cardAmbient: "bg-blue-500/8",
    tagStyle: "bg-blue-500/15 text-blue-400 border border-blue-500/25",
    arrowHover: "group-hover:text-blue-400/70",
  },
  {
    href: "/emi-calculator",
    icon: Landmark,
    title: "EMI Calculator",
    desc: "Bank loans or credit card EMI for iPhone, bike, PC. Monthly payment and total interest before you borrow.",
    tag: "Calculator",
    iconColor: "text-violet-400",
    iconGlowFilter: "drop-shadow(0 0 6px rgba(167,139,250,0.9))",
    iconBg: "from-violet-500/25 to-violet-900/10",
    iconBorder: "border-violet-500/25",
    iconShadow: "shadow-[0_0_18px_rgba(139,92,246,0.3)]",
    cardBorder: "border-white/[0.07] hover:border-violet-500/35",
    cardHover: "hover:shadow-[0_0_45px_rgba(139,92,246,0.12),0_2px_8px_rgba(0,0,0,0.4)]",
    cardAmbient: "bg-violet-500/8",
    tagStyle: "bg-violet-500/15 text-violet-400 border border-violet-500/25",
    arrowHover: "group-hover:text-violet-400/70",
  },
  {
    href: "/sip-calculator",
    icon: Crosshair,
    title: "Goal-based SIP",
    desc: "Studies abroad, wedding, car down payment. Exact monthly savings needed to hit your goal.",
    tag: "Planner",
    iconColor: "text-emerald-400",
    iconGlowFilter: "drop-shadow(0 0 6px rgba(52,211,153,0.9))",
    iconBg: "from-emerald-500/25 to-emerald-900/10",
    iconBorder: "border-emerald-500/25",
    iconShadow: "shadow-[0_0_18px_rgba(16,185,129,0.3)]",
    cardBorder: "border-white/[0.07] hover:border-emerald-500/35",
    cardHover: "hover:shadow-[0_0_45px_rgba(16,185,129,0.12),0_2px_8px_rgba(0,0,0,0.4)]",
    cardAmbient: "bg-emerald-500/8",
    tagStyle: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
    arrowHover: "group-hover:text-emerald-400/70",
  },
  {
    href: "/car-calculator",
    icon: Gauge,
    title: "Car Affordability",
    desc: "EMI, fuel, insurance and maintenance. See the real monthly cost and 5-year ownership bill before buying.",
    tag: "Calculator",
    iconColor: "text-amber-400",
    iconGlowFilter: "drop-shadow(0 0 6px rgba(251,191,36,0.9))",
    iconBg: "from-amber-500/25 to-amber-900/10",
    iconBorder: "border-amber-500/25",
    iconShadow: "shadow-[0_0_18px_rgba(245,158,11,0.3)]",
    cardBorder: "border-white/[0.07] hover:border-amber-500/35",
    cardHover: "hover:shadow-[0_0_45px_rgba(245,158,11,0.12),0_2px_8px_rgba(0,0,0,0.4)]",
    cardAmbient: "bg-amber-500/8",
    tagStyle: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
    arrowHover: "group-hover:text-amber-400/70",
  },
  {
    href: "/budget-planner",
    icon: PieChart,
    title: "Budget Planner",
    desc: "50% Needs, 30% Wants, 20% Savings. Bangladesh-specific categories to see your real savings rate.",
    tag: "Planner",
    iconColor: "text-cyan-400",
    iconGlowFilter: "drop-shadow(0 0 6px rgba(34,211,238,0.9))",
    iconBg: "from-cyan-500/25 to-cyan-900/10",
    iconBorder: "border-cyan-500/25",
    iconShadow: "shadow-[0_0_18px_rgba(6,182,212,0.3)]",
    cardBorder: "border-white/[0.07] hover:border-cyan-500/35",
    cardHover: "hover:shadow-[0_0_45px_rgba(6,182,212,0.12),0_2px_8px_rgba(0,0,0,0.4)]",
    cardAmbient: "bg-cyan-500/8",
    tagStyle: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/25",
    arrowHover: "group-hover:text-cyan-400/70",
  },
];

const FOR_ORGS = [
  {
    icon: Smartphone,
    title: "White-label mobile app",
    desc: "Your brand, your colors. Full Kosh education platform deployed to your users as a standalone app on Android and iOS.",
  },
  {
    icon: Globe,
    title: "Plug into your existing app",
    desc: "Paste a single code snippet and Kosh's learning modules appear inside your existing banking app, website, or employee portal. No rebuild needed.",
  },
  {
    icon: Gamepad2,
    title: "Gamified learning engine",
    desc: "Points, streaks, levels, challenges, and leaderboards. The same engagement layer that keeps Kosh learners coming back.",
  },
  {
    icon: BarChart3,
    title: "Analytics dashboard",
    desc: "Track literacy baseline scores, module completion, engagement trends, and real learning outcomes.",
  },
];

const TARGET_PARTNERS = [
  { label: "Banks & NBFIs", desc: "Boost customer engagement and digital product adoption through embedded financial education." },
  { label: "Fintech Platforms", desc: "Add a financial literacy layer to your app. Educated users transact more confidently and churn less." },
  { label: "MFS Platforms", desc: "bKash, Nagad, Rocket. Help users understand what they're doing with their money." },
  { label: "NGOs & MFIs", desc: "Embed financial literacy into microcredit programs and community outreach at scale." },
  { label: "Employers & HR", desc: "Employee financial wellness programs. Measurable, gamified, and locally relevant." },
];

// ── WHY color tokens ──────────────────────────────────────────────────────
const WHY_COLORS: Record<string, { icon: string; glow: string; border: string; bg: string }> = {
  blue: {
    icon: "text-blue-400",
    glow: "drop-shadow(0 0 5px rgba(96,165,250,0.8))",
    border: "border-blue-500/20",
    bg: "from-blue-500/15 to-blue-900/5",
  },
  emerald: {
    icon: "text-emerald-400",
    glow: "drop-shadow(0 0 5px rgba(52,211,153,0.8))",
    border: "border-emerald-500/20",
    bg: "from-emerald-500/15 to-emerald-900/5",
  },
  violet: {
    icon: "text-violet-400",
    glow: "drop-shadow(0 0 5px rgba(167,139,250,0.8))",
    border: "border-violet-500/20",
    bg: "from-violet-500/15 to-violet-900/5",
  },
};

// ── Component ─────────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Nav ── */}
      <nav className="border-b border-white/[0.06] sticky top-0 z-10 backdrop-blur-2xl bg-background/70">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <img src="/logo.png" alt="Kosh" className="h-8 w-auto" />
          <div className="flex items-center gap-4">
            <Link
              to="/about"
              className="text-sm font-medium text-foreground/50 hover:text-foreground/90 transition-colors"
            >
              About
            </Link>
            <Link
              to="#for-organizations"
              className="text-sm font-medium text-foreground/50 hover:text-foreground/90 transition-colors hidden sm:block"
            >
              For Organizations
            </Link>
            <Link
              to="/auth"
              className="text-sm font-medium text-foreground/50 hover:text-foreground/90 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4">

        {/* ── Hero ── */}
        <section className="relative py-14 md:py-24 text-center space-y-8 max-w-2xl mx-auto">
          {/* Ambient background glow — full-width, positioned outside section overflow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100vw",
              height: "420px",
              background: "radial-gradient(ellipse at 50% 20%, rgba(16,185,129,0.13) 0%, transparent 65%)",
            }}
          />

          <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
            How well do you{" "}
            <span
              className="text-primary"
              style={{ textShadow: "0 0 40px rgba(16,185,129,0.5), 0 0 80px rgba(16,185,129,0.2)" }}
            >
              actually
            </span>{" "}
            understand money?
          </h1>

          <p className="relative text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            15 questions. 5 minutes. Know exactly where you stand on Knowledge,
            Behavior, and Mindset, with a personalized track to fix the gaps.
          </p>

          {/* CTAs */}
          <div className="relative flex flex-row flex-wrap gap-3 justify-center pt-1">
            <Button asChild size="lg" className="gap-2 w-fit">
              <Link to="/check">
                Check your money level
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-fit">
              <Link to="#tools">Explore free tools ↓</Link>
            </Button>
          </div>

        </section>

        {/* ── Tools ── */}
        <section id="tools" className="py-16 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Free financial tools</h2>
              <p className="text-muted-foreground text-sm">
                Try these tools, no sign-up required.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    to={tool.href}
                    className={`group relative flex gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden ${tool.cardBorder} ${tool.cardHover}`}
                    style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}
                  >
                    {/* Corner ambient blob */}
                    <div
                      className={`absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl opacity-60 pointer-events-none ${tool.cardAmbient}`}
                    />

                    {/* Icon container */}
                    <div
                      className={`relative h-11 w-11 rounded-xl bg-gradient-to-br ${tool.iconBg} border ${tool.iconBorder} flex items-center justify-center shrink-0 transition-shadow duration-300 ${tool.iconShadow}`}
                    >
                      <Icon
                        className={`h-5 w-5 ${tool.iconColor}`}
                        style={{ filter: tool.iconGlowFilter }}
                      />
                    </div>

                    {/* Text */}
                    <div className="space-y-1.5 min-w-0 relative">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground">{tool.title}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tool.tagStyle}`}>
                          {tool.tag}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                    </div>

                    {/* Arrow */}
                    <ArrowRight
                      className={`h-4 w-4 shrink-0 mt-1 text-white/20 transition-all duration-300 ${tool.arrowHover} group-hover:translate-x-0.5`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Check preview ── */}
        <section className="py-16 border-t border-white/[0.06]">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-foreground text-center tracking-tight">
              What the check looks like
            </h2>
            <div
              className="rounded-2xl border border-white/[0.08] p-6 space-y-4"
              style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="bg-blue-500/15 text-blue-400 border border-blue-500/25 text-xs font-semibold px-2 py-0.5 rounded-full">
                  Knowledge
                </span>
                <span>Q1 of 15</span>
              </div>
              <p className="text-foreground font-medium">
                Inflation Bangladesh-এ এখন roughly 9-10%. একটা savings account দেয় 5%. তাহলে আপনার টাকা:
              </p>
              <div className="grid gap-2">
                {[
                  "প্রতি বছর growing (বাড়ছে)",
                  "Same থাকছে",
                  "Actually shrinking (real value কমছে)",
                  "এটা বলা possible না",
                ].map((opt, i) => (
                  <div
                    key={i}
                    className={`px-4 py-3 rounded-xl border-2 text-sm transition-all ${
                      i === 2
                        ? "border-primary/50 text-primary font-medium"
                        : "border-white/[0.07] text-foreground/60"
                    }`}
                    style={
                      i === 2
                        ? { background: "rgba(16,185,129,0.08)", boxShadow: "0 0 20px rgba(16,185,129,0.1)" }
                        : { background: "rgba(255,255,255,0.02)" }
                    }
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Kosh ── */}
        <section className="py-16 border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-foreground text-center tracking-tight">
              Why Kosh is different
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {WHY_ITEMS.map(({ icon: Icon, title, desc, color }) => {
                const c = WHY_COLORS[color];
                return (
                  <div
                    key={title}
                    className={`relative rounded-2xl border p-5 space-y-4 overflow-hidden ${c.border}`}
                    style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)" }}
                  >
                    <div
                      className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-3xl opacity-50 pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${color === 'blue' ? 'rgba(59,130,246,0.2)' : color === 'emerald' ? 'rgba(16,185,129,0.2)' : 'rgba(139,92,246,0.2)'}, transparent)` }}
                    />
                    <div
                      className={`h-10 w-10 rounded-xl bg-gradient-to-br ${c.bg} border ${c.border} flex items-center justify-center`}
                    >
                      <Icon
                        className={`h-5 w-5 ${c.icon}`}
                        style={{ filter: c.glow }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1.5">{title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 0→1 Track ── */}
        <section className="py-16 border-t border-white/[0.06]">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-foreground text-center tracking-tight">
              The 0→1 track
            </h2>
            <div className="grid gap-2.5">
              {[
                "Why money feels confusing — the map",
                "Inflation: why your FDR is quietly losing",
                "The three buckets (savings ≠ investing ≠ trading)",
                "Hype, scams, and the Grey Zone",
                "The emergency fund nobody builds",
                "Real options in Bangladesh (FDR, Sanchaypatra, DPS, gold, DSE)",
                "Crypto, forex, and what's actually legal in Bangladesh",
                "Your first money system",
              ].map((mod, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] px-4 py-3 transition-all hover:border-white/[0.12]"
                  style={{ background: "rgba(255,255,255,0.025)" }}
                >
                  <span
                    className="w-7 h-7 rounded-full border border-primary/30 text-primary text-xs font-bold flex items-center justify-center shrink-0"
                    style={{ background: "rgba(16,185,129,0.1)", textShadow: "0 0 12px rgba(16,185,129,0.6)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground/80">{mod}</span>
                </div>
              ))}
            </div>
            <div className="text-center pt-2">
              <Button asChild size="lg" className="gap-2 w-fit">
                <Link to="/check">
                  Start with the check
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── For Organizations ── */}
        <section id="for-organizations" className="py-16 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto space-y-10">

            {/* Header */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div
                className="inline-flex items-center gap-2 text-primary text-sm font-semibold px-4 py-1.5 rounded-full border border-primary/25"
                style={{ background: "rgba(16,185,129,0.08)" }}
              >
                <Building2 className="h-4 w-4" style={{ filter: "drop-shadow(0 0 4px rgba(16,185,129,0.8))" }} />
                For Organizations
              </div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">
                Add financial literacy as a product/service
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Banks, fintechs, NGOs, and employers — bring Kosh's gamified financial education
                to your users as a white-label app, web embed, or SDK. Your brand, your users,
                Kosh's content engine and engagement layer.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid sm:grid-cols-2 gap-3">
              {FOR_ORGS.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-2xl border border-white/[0.07] p-5"
                  style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)" }}
                >
                  <div
                    className="h-10 w-10 rounded-xl border border-primary/20 flex items-center justify-center shrink-0"
                    style={{ background: "rgba(16,185,129,0.1)", boxShadow: "0 0 14px rgba(16,185,129,0.2)" }}
                  >
                    <Icon
                      className="h-5 w-5 text-primary"
                      style={{ filter: "drop-shadow(0 0 4px rgba(16,185,129,0.7))" }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Who it's for */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center">
                Who it's built for
              </p>
              <div className="divide-y divide-white/[0.05] rounded-xl border border-white/[0.06] overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
                {TARGET_PARTNERS.map(({ label, desc }) => (
                  <div key={label} className="flex items-center gap-4 px-4 py-3">
                    <CheckCircle2
                      className="h-4 w-4 text-primary shrink-0"
                      style={{ filter: "drop-shadow(0 0 4px rgba(16,185,129,0.8))" }}
                    />
                    <span className="text-sm font-semibold text-foreground w-36 shrink-0">{label}</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats + CTA */}
            <div
              className="rounded-2xl border border-primary/15 p-7 space-y-6"
              style={{
                background: "rgba(16,185,129,0.04)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 60px rgba(16,185,129,0.07), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                {[
                  { v: "800+", l: "Bangladesh-specific learning modules" },
                  { v: "3", l: "Ways to deploy (app · website · embed)" },
                  { v: "0→1", l: "Measurable literacy score improvement" },
                ].map(({ v, l }) => (
                  <div key={l}>
                    <div
                      className="text-2xl font-bold text-primary"
                      style={{ textShadow: "0 0 24px rgba(16,185,129,0.5)" }}
                    >
                      {v}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{l}</div>
                  </div>
                ))}
              </div>

              {/* Checklist */}
              <div className="grid sm:grid-cols-2 gap-2 border-t border-white/[0.06] pt-5">
                {[
                  "Full Bangla/Banglish content library",
                  "Gamification (points, streaks, levels)",
                  "Diagnostic + progress tracking",
                  "White-label branding & colors",
                  "Analytics dashboard for your team",
                  "Scam awareness & grey zone content",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2
                      className="h-3.5 w-3.5 text-primary shrink-0"
                      style={{ filter: "drop-shadow(0 0 3px rgba(16,185,129,0.7))" }}
                    />
                    {item}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <a
                  href="mailto:hello@kosh.com.bd"
                  className="btn-glow inline-flex items-center gap-2 text-white text-sm font-semibold px-7 py-3.5 rounded-xl"
                >
                  Talk to us about a pilot
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className="text-xs text-muted-foreground mt-3">
                  Onboarding pilot partners now. NGOs, student banks, and MFS platforms prioritized.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] mt-12">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/35">
          <img src="/logo.png" alt="Kosh" className="h-6 w-auto opacity-60" />
          <div>No products. No commissions. No hidden agenda.</div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/scam-spotter" className="hover:text-foreground/60 transition-colors">Scam Spotter</Link>
            <Link to="/comparator" className="hover:text-foreground/60 transition-colors">Comparator</Link>
            <Link to="/emi-calculator" className="hover:text-foreground/60 transition-colors">EMI</Link>
            <Link to="/sip-calculator" className="hover:text-foreground/60 transition-colors">SIP</Link>
            <Link to="/car-calculator" className="hover:text-foreground/60 transition-colors">Car</Link>
            <Link to="/budget-planner" className="hover:text-foreground/60 transition-colors">Budget</Link>
            <Link to="/fdr-calculator" className="hover:text-foreground/60 transition-colors">FDR</Link>
            <Link to="/savings-goal" className="hover:text-foreground/60 transition-colors">Goal Planner</Link>
            <Link to="/check" className="hover:text-foreground/60 transition-colors">Money Check</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
