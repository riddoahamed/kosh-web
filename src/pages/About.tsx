import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, BarChart3, Heart, Mail } from "lucide-react";

// ── Hero animation config ──────────────────────────────────────────────────
const SENTENCE_1_SEGMENTS = [
  { text: "Know ", color: "neutral" },
  { text: "your money", color: "green" },
  { text: " before you have ", color: "neutral" },
  { text: "no money", color: "red" },
] as const;

const SENTENCE_2_PREFIX = "We teach you about: ";
const TOPICS = [
  "Personal Finance", "Investing", "Stock Market Investing",
  "Speculating", "Trading", "Hedging", "Bitcoin", "NFTs",
  "Employee Profit Share", "Employee Stock Options", "Saving",
  "Credit Cards", "Loans", "Real Estate Investing", "Forex",
  "Prediction Markets",
];

const S1_FULL = SENTENCE_1_SEGMENTS.map((s) => s.text).join("");
const PAUSE_AFTER_CHARS = "Know your money".length; // pause mid-sentence

// Timing (ms)
const TYPE_SPEED       = 105; // chars per tick — deliberately slow & premium
const MID_PAUSE        = 900; // pause after "Know your money"
const S1_HOLD          = 1400; // brief hold after full sentence before suffix fades
const SUFFIX_FADE_OUT  = 1400; // slow fade of "before you have no money"
const SUFFIX_HOLD      = 1200; // hold "Know your money_" alone before topics
const S2_FADE_IN       = 450; // topic word fade-in duration
const TOPIC_HOLD       = 2400; // how long each topic is fully visible
const S2_FADE_OUT      = 350; // topic word fade-out
const BETWEEN_TOPICS   = 180; // gap between fade-out and next fade-in
const S2_HOLD          = 2800; // hold after last topic before looping back
const RESET_BLANK      = 600; // blank pause before re-typing

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = "typing" | "topics";

interface HeroState {
  phase: Phase;
  charCount: number;      // chars typed in sentence 1
  suffixOpacity: number;  // opacity of "before you have no money"
  topicText: string;      // current topic
  topicOpacity: number;   // 0 or 1
  topicY: number;         // 6 or 0 (slide)
}

function useHeroAnimation() {
  const [state, setState] = useState<HeroState>({
    phase: "typing", charCount: 0, suffixOpacity: 1,
    topicText: "", topicOpacity: 0, topicY: 6,
  });

  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const t = (fn: () => void, ms: number) => {
    timerRef.current = setTimeout(fn, ms);
  };

  useEffect(() => {
    let shuffled = shuffle(TOPICS);

    // ── Sentence 1: typewriter ───────────────────────────────────────────
    const runTyping = () => {
      let i = 0;
      setState({ phase: "typing", charCount: 0, suffixOpacity: 1, topicText: "", topicOpacity: 0, topicY: 6 });

      const tick = () => {
        i++;
        setState((prev) => ({ ...prev, charCount: i }));
        if (i >= S1_FULL.length) {
          // Brief hold, then fade "before you have no money" out slowly
          t(() => {
            setState((prev) => ({ ...prev, suffixOpacity: 0 }));
            // Wait for fade to finish, then hold "Know your money_" alone
            t(() => {
              t(startTopics, SUFFIX_HOLD);
            }, SUFFIX_FADE_OUT + 100);
          }, S1_HOLD);
          return;
        }
        t(tick, i === PAUSE_AFTER_CHARS ? MID_PAUSE : TYPE_SPEED);
      };

      t(tick, TYPE_SPEED);
    };

    // ── Sentence 2: cycling topics ───────────────────────────────────────
    let topicIdx = 0;

    const showTopic = () => {
      if (topicIdx >= shuffled.length) {
        // All topics shown — hold then loop back to typing
        t(() => {
          setState((prev) => ({ ...prev, topicOpacity: 0, topicY: 6 }));
          t(() => {
            shuffled = shuffle(TOPICS);
            topicIdx = 0;
            t(runTyping, RESET_BLANK);
          }, S2_FADE_OUT + 100);
        }, S2_HOLD);
        return;
      }

      const word = shuffled[topicIdx];
      // Fade in
      setState((prev) => ({ ...prev, topicText: word, topicOpacity: 0, topicY: 6 }));
      t(() => {
        setState((prev) => ({ ...prev, topicOpacity: 1, topicY: 0 }));
        // Hold
        t(() => {
          // Fade out
          setState((prev) => ({ ...prev, topicOpacity: 0, topicY: -4 }));
          topicIdx++;
          t(showTopic, S2_FADE_OUT + BETWEEN_TOPICS);
        }, TOPIC_HOLD);
      }, 60); // tiny tick to trigger CSS transition
    };

    const startTopics = () => {
      topicIdx = 0;
      setState((prev) => ({ ...prev, phase: "topics" }));
      showTopic();
    };

    // Boot
    t(runTyping, 700);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}

// ── Static data ────────────────────────────────────────────────────────────
const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Transparency",
    desc: "We provide financial literacy on many levels, in the most non-salesy way in the world. Starting right here in Bangladesh.",
    color: "emerald",
    glass: true,
  },
  {
    icon: BarChart3,
    title: "Measurable & Impact Driven",
    desc: "A score you can track. Real progress over time, not motivation that fades.",
    color: "blue",
    glass: false,
  },
  {
    icon: Heart,
    title: "Built for You",
    desc: "Personal finance is personal. Local instruments, local context, built around your life.",
    color: "violet",
    glass: false,
  },
];

const COLOR_MAP: Record<string, {
  icon: string; glow: string; border: string; bg: string;
  ambient: string; cardShadow: string; cardBorder: string;
}> = {
  emerald: {
    icon: "text-emerald-400",
    glow: "drop-shadow(0 0 6px rgba(52,211,153,0.9))",
    border: "border-emerald-400/40",
    bg: "from-emerald-500/20 to-emerald-900/5",
    ambient: "rgba(16,185,129,0.25)",
    cardShadow: "0 0 0 1px rgba(16,185,129,0.1), 0 8px 32px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.18)",
    cardBorder: "1px solid rgba(16,185,129,0.35)",
  },
  blue: {
    icon: "text-blue-400",
    glow: "drop-shadow(0 0 5px rgba(96,165,250,0.8))",
    border: "border-blue-500/25",
    bg: "from-blue-500/15 to-blue-900/5",
    ambient: "rgba(59,130,246,0.18)",
    cardShadow: "0 0 0 1px rgba(59,130,246,0.08), 0 8px 28px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
    cardBorder: "1px solid rgba(59,130,246,0.25)",
  },
  violet: {
    icon: "text-violet-400",
    glow: "drop-shadow(0 0 5px rgba(167,139,250,0.8))",
    border: "border-violet-500/25",
    bg: "from-violet-500/15 to-violet-900/5",
    ambient: "rgba(139,92,246,0.18)",
    cardShadow: "0 0 0 1px rgba(139,92,246,0.08), 0 8px 28px rgba(139,92,246,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
    cardBorder: "1px solid rgba(139,92,246,0.25)",
  },
};

const WHY_ITEMS = [
  "Most financial content is made to sell you something.",
  "Generic Western advice doesn't fit Bangladesh.",
  "Financial scams are rising and awareness isn't keeping up.",
  "Knowing more about money should be free.",
];

const GREEN = { color: "hsl(160, 84%, 42%)", textShadow: "0 0 20px rgba(16,185,129,0.45)" };
const RED   = { color: "hsl(0, 84%, 62%)",   textShadow: "0 0 20px rgba(239,68,68,0.45)" };

// ── Component ──────────────────────────────────────────────────────────────
export default function About() {
  const { phase, charCount, suffixOpacity, topicText, topicOpacity, topicY } = useHeroAnimation();

  // Render sentence 1 — first 2 segments always visible, last 2 fade out
  const renderS1 = () => {
    let cursor = 0;
    const prefix: React.ReactNode[] = [];   // "Know your money"
    const suffix: React.ReactNode[] = [];   // " before you have no money"

    SENTENCE_1_SEGMENTS.forEach((seg, i) => {
      const start = cursor;
      cursor += seg.text.length;
      const visible = Math.max(0, Math.min(charCount - start, seg.text.length));
      if (visible <= 0) return;
      const style = seg.color === "green" ? GREEN : seg.color === "red" ? RED : {};
      const node = <span key={i} style={style}>{seg.text.slice(0, visible)}</span>;
      if (i < 2) prefix.push(node); else suffix.push(node);
    });

    return (
      <>
        {prefix}
        <span
          style={{
            opacity: suffixOpacity,
            transition: `opacity ${SUFFIX_FADE_OUT}ms ease`,
            display: "inline",
          }}
        >
          {suffix}
        </span>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background relative">

      {/* Nav */}
      <nav className="border-b border-white/[0.06] sticky top-0 z-10 backdrop-blur-2xl bg-background/70">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link to="/"><img src="/logo.png" alt="Kosh" className="h-8 w-auto" /></Link>
          </div>
          <Link to="/auth" className="text-sm font-medium text-foreground/50 hover:text-foreground/90 transition-colors">
            Sign in
          </Link>
        </div>
      </nav>

      {/* Gradient flush to top — positioned relative to the page wrapper, not the section */}
      <div className="absolute inset-x-0 top-14 h-72 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.18) 0%, transparent 70%)" }}
      />

      <main className="max-w-2xl mx-auto px-4 pt-8 pb-16 space-y-16 relative z-[1]">

        {/* ── Hero ── */}
        <section className="relative text-center space-y-5">

          <p className="relative text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            About Kosh
          </p>

          {/* Fixed-height h1 container — prevents topic word size from shifting layout */}
          <div className="relative" style={{ minHeight: "8rem" }}>

            {/* Sentence 1 — typewriter */}
            <h1
              className="absolute inset-x-0 text-4xl md:text-5xl font-bold text-foreground leading-[1.15] tracking-tight text-center"
              style={{
                opacity: phase === "typing" ? 1 : 0,
                transition: "opacity 0.5s ease",
                pointerEvents: phase === "topics" ? "none" : "auto",
              }}
            >
              {renderS1()}
              <span
                className="text-primary/60 ml-px font-light"
                style={{ animation: "blink-caret 0.9s step-end infinite" }}
              >_</span>
            </h1>

            {/* Sentence 2 — topic cycling, same fixed slot */}
            <h1
              className="absolute inset-x-0 text-4xl md:text-5xl font-bold text-foreground leading-[1.15] tracking-tight text-center"
              style={{
                opacity: phase === "topics" ? 1 : 0,
                transition: "opacity 0.5s ease",
                pointerEvents: phase === "typing" ? "none" : "auto",
              }}
            >
            <span className="text-foreground/70 font-normal">{SENTENCE_2_PREFIX}</span>
            <span
              style={{
                ...GREEN,
                opacity: topicOpacity,
                transform: `translateY(${topicY}px)`,
                display: "inline-block",
                transition: `opacity ${topicOpacity === 1 ? S2_FADE_IN : S2_FADE_OUT}ms ease, transform ${topicOpacity === 1 ? S2_FADE_IN : S2_FADE_OUT}ms ease`,
              }}
            >
              {topicText}
            </span>
            <span
              className="text-primary/60 ml-px font-light"
              style={{ animation: "blink-caret 0.9s step-end infinite" }}
            >_</span>
          </h1>

          </div>{/* end fixed-height container */}

          <p className="relative text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
            Kosh is a free financial literacy initiative built for Bangladesh. Honest tools, honest education.
          </p>
        </section>

        {/* ── Why we built this ── */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            Why we <span style={GREEN}>built</span> this
          </h2>
          <div className="space-y-2">
            {WHY_ITEMS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] px-4 py-3.5"
                style={{ background: "rgba(255,255,255,0.025)" }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: "rgba(16,185,129,0.9)", boxShadow: "0 0 6px rgba(16,185,129,0.8)" }}
                />
                <span className="text-sm text-foreground/80">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── What we stand for ── */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            What we <span style={GREEN}>stand</span> for
          </h2>
          <div className="grid md:grid-cols-3 gap-3">
            {PRINCIPLES.map(({ icon: Icon, title, desc, color, glass }) => {
              const c = COLOR_MAP[color];
              return glass ? (
                <div
                  key={title}
                  className="relative rounded-2xl p-5 space-y-3 overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                    border: "1px solid rgba(16,185,129,0.35)",
                    boxShadow: "0 0 0 1px rgba(16,185,129,0.1), 0 8px 32px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.18)",
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.6) 50%, transparent)" }} />
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-50 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.3), transparent)" }} />
                  <div className={`relative h-9 w-9 rounded-xl bg-gradient-to-br ${c.bg} border ${c.border} flex items-center justify-center`} style={{ boxShadow: "0 0 14px rgba(16,185,129,0.3)" }}>
                    <Icon className={`h-4 w-4 ${c.icon}`} style={{ filter: c.glow }} />
                  </div>
                  <div className="relative">
                    <h3 className="font-semibold text-foreground text-sm mb-1" style={GREEN}>{title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ) : (
                <div
                  key={title}
                  className="relative rounded-2xl p-5 space-y-3 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: c.cardBorder, boxShadow: c.cardShadow }}
                >
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-3xl opacity-40 pointer-events-none" style={{ background: `radial-gradient(circle, ${c.ambient}, transparent)` }} />
                  <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${c.bg} border ${c.border} flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 ${c.icon}`} style={{ filter: c.glow }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="text-center space-y-4 pb-4">
          <p className="text-sm text-muted-foreground">Questions or partnerships?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://www.instagram.com/kosh.initiative/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="3"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              @kosh.initiative
            </a>
            <span className="hidden sm:block text-white/20">·</span>
            <a href="mailto:koshinitiative@gmail.com" className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline" style={GREEN}>
              <Mail className="h-4 w-4" />
              koshinitiative@gmail.com
            </a>
          </div>
        </section>

      </main>

      <style>{`
        @keyframes blink-caret { from, to { opacity: 1; } 50% { opacity: 0; } }
      `}</style>

      <footer className="border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-xs text-foreground/30">
          No products. No commissions.
        </div>
      </footer>
    </div>
  );
}
