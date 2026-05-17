import { useState, useEffect, useCallback, useRef, useMemo, Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import EmailSignupModal from "@/components/shared/EmailSignupModal";
import {
  ArrowRight,
  ShieldCheck,
  BarChart3,
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
  Lock,
  TrendingUp,
  Wrench,
  BookOpenCheck,
} from "lucide-react";

// ── Intro questions ────────────────────────────────────────────────────────

const INTRO_KEY = "kosh:intro_v1";

// First question is always fixed; the rest are shuffled each page load
const FIRST_QUESTION = { text: "Have you thought about investing?", hi: ["investing?"] };

const SHUFFLEABLE_QUESTIONS = [
  { text: "Is FDR better or DPS?",                     hi: ["FDR", "DPS?"] },
  { text: "Should I buy Crypto?",                      hi: ["Crypto?"] },
  { text: "Who is Dorbesh?",                           hi: ["Dorbesh?"] },
  { text: "Ei Trading Course ta Kinen",                hi: ["Trading", "Course"] },
  { text: "Where should I keep my savings?",           hi: ["savings?"] },
  { text: "How do I start investing with 5,000 taka?", hi: ["investing", "5,000", "taka?"] },
  { text: "Is the stock market gambling?",             hi: ["stock", "market", "gambling?"] },
  { text: "What even is inflation?",                   hi: ["inflation?"] },
  { text: "How do I actually build wealth?",           hi: ["actually", "wealth?"] },
];

function fisherYates<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const WORD_MS      = 160;  // ms between each word appearing
const HOLD_FIRST   = 3200; // hold time first visit (ms)
const HOLD_REVISIT = 900;  // hold time revisit (ms)
const OUT_MS       = 900;  // fade-out duration (ms)
const REVISIT_MAX  = 6;    // max questions shown on revisit

// Floating brand element wrapper
function FloatingSymbol({
  children, style, className,
}: { children: React.ReactNode; style: React.CSSProperties; className?: string }) {
  return (
    <div className={`absolute pointer-events-none select-none ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
}

// ── Bridge screen — shown after the questions loop ─────────────────────────
const BRIDGE_WORDS = ["Have", "you", "ever", "thought", "of", "investing,", "saving,", "spending?"];
const BRIDGE_HI    = new Set(["investing,", "saving,", "spending?"]);

function BridgeContent({ onDone }: { onDone: () => void }) {
  const [subVisible, setSubVisible] = useState(false);
  const [exiting,    setExiting]    = useState(false);
  const GREEN = "hsl(87,100%,68%)"; // Kosh Lime

  const revealMs = BRIDGE_WORDS.length * WORD_MS + 400;

  useEffect(() => {
    const t1 = setTimeout(() => setSubVisible(true), revealMs + 250);
    const t2 = setTimeout(() => setExiting(true),    revealMs + 250 + 2400);
    const t3 = setTimeout(() => onDone(),             revealMs + 250 + 2400 + OUT_MS + 120);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone, revealMs]);

  return (
    <div
      className="relative z-10 px-6 max-w-3xl mx-auto text-center space-y-5"
      style={{
        marginTop: "-15vh",
        animation: "bridge-rise 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        opacity:    exiting ? 0 : undefined,
        transform:  exiting ? "translateY(-18px)" : undefined,
        filter:     exiting ? "blur(5px)" : undefined,
        transition: exiting ? `opacity ${OUT_MS}ms ease, transform ${OUT_MS}ms ease, filter ${OUT_MS}ms ease` : undefined,
      }}
    >
      {/* Main sentence — typed word by word */}
      <p
        className="font-black leading-[1.15] tracking-tight"
        style={{
          fontFamily: "'Bricolage Grotesque', Inter, sans-serif",
          fontSize: "clamp(2.2rem, 7.5vw, 4.8rem)",
        }}
      >
        {BRIDGE_WORDS.map((word, i) => {
          const isHi = BRIDGE_HI.has(word);
          const isLast = i === BRIDGE_WORDS.length - 1;
          return (
            <span key={i} className="inline-block" style={{ marginRight: "0.24em" }}>
              <span
                className={`inline-block ${isHi ? "lime-glow-text" : ""}`}
                style={{
                  opacity: 0,
                  // Bake delay into the shorthand to avoid React's shorthand+longhand warning.
                  animation: `word-type 0.08s ease ${i * WORD_MS}ms forwards`,
                }}
              >
                {word}
              </span>
              {/* Blinking cursor after last word, visible until exit */}
              {isLast && !exiting && (
                <span
                  className="inline-block font-thin ml-1"
                  style={{
                    color: GREEN,
                    opacity: 0,
                    animation: `word-type 0.08s ease ${BRIDGE_WORDS.length * WORD_MS}ms forwards, cursor-blink 0.9s step-end ${BRIDGE_WORDS.length * WORD_MS + 200}ms infinite`,
                  }}
                >|</span>
              )}
            </span>
          );
        })}
      </p>

      {/* Subtext */}
      <p
        style={{
          fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
          letterSpacing: "0.015em",
          color: "hsl(var(--foreground))",
          opacity:   subVisible ? 0.55 : 0,
          transform: subVisible ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 1s ease, transform 1s ease",
          fontWeight: 500,
        }}
      >
        Then Kosh is for you.
      </p>

      {/* Green divider line */}
      <div
        style={{
          height: "1px",
          width: subVisible ? "80px" : "0px",
          background: `hsl(87,100%,68%)`,
          boxShadow: "0 0 10px hsla(87,100%,68%,0.6)",
          margin: "0 auto",
          transition: "width 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}
      />
    </div>
  );
}

// ── Stock chart data ──────────────────────────────────────────────────────────
// viewBox 0 0 500 100  (y=100 bottom, y=0 top)
// Real market structure: three waves + two corrections, then a parabolic
// "moon" finale that reaches the top-right corner (x=500, y≈3).
// Questions phase reveals x=0→382; bridge phase completes 382→500.
const STOCK_PTS: [number, number][] = [
  // ── Wave 1: initial accumulation + first rally ───────────────────────────
  [ 0, 86], [10, 84], [20, 81], [30, 83], [40, 77],
  [50, 79], [62, 72], [74, 75], [84, 68], [96, 66],
  [106, 64],

  // ── Correction 1: ~15-pt pullback, forms a flag ──────────────────────────
  [116, 68], [126, 72], [136, 76], [145, 73],
  [154, 77], [163, 73],

  // ── Wave 2: recovery through prior high, new peak ────────────────────────
  [173, 67], [183, 69], [193, 62], [202, 58],
  [212, 60], [222, 53], [232, 49], [241, 47],

  // ── Correction 2: bigger shakeout (~20 pts), "scary" dip ─────────────────
  [251, 52], [260, 57], [269, 62], [278, 58],
  [287, 64], [296, 68], [305, 63], [314, 57],

  // ── Wave 3: strong breakout ───────────────────────────────────────────────
  [323, 50], [331, 44], [340, 47], [349, 40],
  [358, 35], [367, 38], [376, 31], [382, 27],

  // ── Moon phase: parabolic final rally — bridge sentence → top-right ───────
  [390, 24], [398, 26], [406, 20], [414, 22],
  [422, 14], [430, 17], [438, 10], [446, 13],
  [454,  7], [462,  9], [470,  5], [478,  7],
  [488,  4], [500,  3],
];

// Questions phase reveals up to x=382; bridge phase completes to x=500
const STOCK_QUESTIONS_END = 382;
const STOCK_END_X         = 500;
const STOCK_LINE_PTS      = STOCK_PTS.map(([x, y]) => `${x},${y}`).join(" ");
const STOCK_AREA_PTS      = `0,100 ${STOCK_LINE_PTS} ${STOCK_END_X},100`;
// (chart uses React-state mask — no SVG <animate> needed)

// ── Main intro section ────────────────────────────────────────────────────────

function IntroSection({ onDone, isFirst }: { onDone: () => void; isFirst: boolean }) {
  const [stage,     setStage]     = useState<"questions" | "bridge">("questions");
  const [qIdx,      setQIdx]      = useState(0);
  const [phase,     setPhase]     = useState<"in" | "hold" | "out">("in");
  const [clipWidth, setClipWidth] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const HOLD_MS = isFirst ? HOLD_FIRST : HOLD_REVISIT;

  // Build question list once: first question fixed, rest shuffled
  const QUESTIONS = useMemo(
    () => [FIRST_QUESTION, ...fisherYates(SHUFFLEABLE_QUESTIONS)],
    []
  );

  const q     = QUESTIONS[qIdx];
  const words = q.text.split(" ");

  // State machine: in → hold → out → next (or bridge)
  useEffect(() => {
    if (stage !== "questions") return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "in") {
      t = setTimeout(() => setPhase("hold"), words.length * WORD_MS + 400);
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("out"), HOLD_MS);
    } else {
      t = setTimeout(() => {
        const isLastQuestion = qIdx >= QUESTIONS.length - 1;
        const isRevisitCap   = !isFirst && qIdx >= REVISIT_MAX - 1;
        if (isLastQuestion || isRevisitCap) {
          setStage("bridge");
        } else {
          setQIdx(i => i + 1);
          setPhase("in");
        }
      }, OUT_MS + 80);
    }
    return () => clearTimeout(t);
  }, [stage, phase, qIdx, words.length, HOLD_MS, isFirst, QUESTIONS.length]);

  // Advance chart reveal with each sentence
  const totalSteps = isFirst ? QUESTIONS.length : REVISIT_MAX;
  useEffect(() => {
    const target = Math.round(((qIdx + 1) / totalSteps) * STOCK_QUESTIONS_END);
    setClipWidth(target);
  }, [qIdx, totalSteps]);
  useEffect(() => {
    // Bridge kicks off the final moon rally to x=500
    if (stage === "bridge") setClipWidth(STOCK_END_X);
  }, [stage]);

  useEffect(() => {
    const t = setTimeout(() => setShowScrollHint(true), 2600);
    return () => clearTimeout(t);
  }, []);

  // Leading dot position — find last chart point whose x ≤ clipWidth
  const CHART_H  = 150;  // px, matches SVG height
  const dotPtIdx = clipWidth <= 0 ? 0
    : STOCK_PTS.reduce((best, [x], i) => (x <= clipWidth ? i : best), 0);
  const [dotSvgX, dotSvgY] = STOCK_PTS[dotPtIdx];
  const dotLeftPct  = (dotSvgX / 500) * 100;            // % of viewport width
  const dotFromBase = CHART_H * (1 - dotSvgY / 100);    // px above chart bottom

  const GREEN = "hsl(87,100%,68%)"; // Kosh Lime

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative select-none overflow-hidden bg-background text-foreground">

      {/* ── Film grain overlay ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        style={{ opacity: 0.038, mixBlendMode: "overlay" as React.CSSProperties["mixBlendMode"] }}
        aria-hidden="true"
      >
        <defs>
          <filter id="intro-grain" x="0%" y="0%" width="100%" height="100%"
            colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.88" numOctaves="4"
              stitchTiles="stitch">
              <animate attributeName="seed" dur="0.35s" from="0" to="40"
                repeatCount="indefinite" calcMode="discrete" />
            </feTurbulence>
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#intro-grain)" />
      </svg>

      {/* ── Radial glow + vignettes ── */}
      <div
        className="absolute inset-x-0 top-0 h-[60%] pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse at 50% -5%, hsla(87,100%,68%,0.13) 0%, transparent 60%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(to top, hsl(var(--background)), transparent)" }}
      />

      {/* ── Dot grid ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.035 }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="kdots" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kdots)" />
      </svg>

      {/* Scanning glow that slowly sweeps across the dot grid */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: 0, left: "-50%",
          width: "50%", height: "100%",
          background: "radial-gradient(ellipse at center, hsla(87,100%,68%,0.055) 0%, transparent 65%)",
          animation: "scan-pass 18s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* ── ৳ BDT — top-left, animated float (theme-adaptive: lime/dark, cobalt/light) ── */}
      <FloatingSymbol
        className="lime-glow-text"
        style={{
          top: "12%", left: "6%",
          fontSize: "96px", fontWeight: 900,
          opacity: 0.22,
          filter: "blur(0.5px)",
          animation: "float-taka 7.5s ease-in-out infinite",
        }}
      >৳</FloatingSymbol>

      {/* ── % — top-right ── */}
      <FloatingSymbol
        className="lime-glow-text"
        style={{
          top: "14%", right: "6%",
          fontSize: "90px", fontWeight: 900,
          opacity: 0.20,
          filter: "blur(0.8px)",
          animation: "float-pct 9.5s ease-in-out infinite",
        }}
      >%</FloatingSymbol>

      {/* ── Bitcoin coin — left side, mid-height ── */}
      {/* Face-on coin: outer rim + inner field + ₿ */}
      <svg
        className="absolute pointer-events-none z-[1]"
        style={{ top: "36%", left: "2.5%", width: 72, height: 72, opacity: 0.09 }}
        viewBox="0 0 72 72" fill="none" aria-hidden="true"
      >
        {/* Outer rim */}
        <circle cx="36" cy="36" r="33" stroke="hsl(38,90%,55%)" strokeWidth="2.2"/>
        {/* Inner field */}
        <circle cx="36" cy="36" r="25" stroke="hsl(38,90%,55%)" strokeWidth="0.9" opacity="0.6"/>
        {/* ₿ symbol */}
        <text
          x="36" y="44"
          textAnchor="middle"
          fontSize="24" fontWeight="900"
          fontFamily="'Bricolage Grotesque', sans-serif"
          fill="hsl(38,90%,55%)"
        >₿</text>
      </svg>

      {/* ── Gold bar — lower-right, proper ingot perspective ── */}
      {/* Single London Good Delivery bar: front face + top face + right side */}
      <svg
        className="absolute pointer-events-none z-[1]"
        style={{ bottom: "22%", right: "3.5%", width: 96, height: 76, opacity: 0.10 }}
        viewBox="0 0 96 76" fill="none" aria-hidden="true"
      >
        {/* Front face */}
        <path d="M0,24 L72,24 L72,60 L0,60 Z" stroke="hsl(38,90%,55%)" strokeWidth="1.4" rx="2"/>
        {/* Top trapezoid face */}
        <path d="M0,24 L10,8 L82,8 L72,24 Z"  stroke="hsl(38,90%,55%)" strokeWidth="1.4"/>
        {/* Right side face */}
        <path d="M72,24 L82,8 L82,44 L72,60 Z" stroke="hsl(38,90%,55%)" strokeWidth="1.2"/>
        {/* Chamfer inset on front face */}
        <path d="M5,28 L67,28 L67,56 L5,56 Z"  stroke="hsl(38,90%,55%)" strokeWidth="0.7" opacity="0.55"/>
        {/* Shine line across top face */}
        <line x1="14" y1="13" x2="76" y2="13"  stroke="hsl(38,90%,55%)" strokeWidth="0.6" opacity="0.5"/>
        {/* "999.9" stamp on front */}
        <text
          x="36" y="45"
          textAnchor="middle"
          fontSize="7.5" fontWeight="600" letterSpacing="1"
          fontFamily="monospace"
          fill="hsl(38,90%,55%)" opacity="0.7"
        >999.9</text>
      </svg>

      {/* ── Full-width climbing stock chart — React-state-driven reveal ── */}
      <svg
        className="absolute pointer-events-none z-[1]"
        style={{ bottom: "9%", left: 0, width: "100%", height: `${CHART_H}px` }}
        viewBox="0 0 500 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="stock-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={GREEN} stopOpacity="0.16" />
            <stop offset="85%"  stopColor={GREEN} stopOpacity="0.02" />
            <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
          </linearGradient>
          {/* CSS-transition-driven mask — updates with each sentence change.
              Questions: 1.9s per step. Bridge moon: 2.2s to land as words finish. */}
          <mask id="stock-mask">
            <rect
              x="0" y="0" height="110"
              style={{
                width: clipWidth,
                transition: stage === "bridge"
                  ? "width 2.2s cubic-bezier(0.25, 0, 0.15, 1)"
                  : "width 1.9s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              fill="white"
            />
          </mask>
        </defs>
        {/* Area fill */}
        <polygon points={STOCK_AREA_PTS} fill="url(#stock-grad)" mask="url(#stock-mask)" />
        {/* Glow copy — wider, lower opacity, picks up theme halo */}
        <polyline
          className="lime-glow-stroke"
          points={STOCK_LINE_PTS}
          stroke={GREEN} strokeWidth="10" fill="none"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.10"
          mask="url(#stock-mask)"
        />
        {/* Main line — class adds cobalt halo in light, lime halo in dark */}
        <polyline
          className="lime-glow-stroke"
          points={STOCK_LINE_PTS}
          stroke={GREEN} strokeWidth="1.8" fill="none"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.95"
          mask="url(#stock-mask)"
        />
      </svg>

      {/* ── Leading dot — absolute div so it's always a perfect circle.
            box-shadow is theme-adaptive via the dot-pulse keyframe (cobalt
            halo on light, lime halo on dark). ── */}
      {clipWidth > 0 && (
        <div
          className="absolute pointer-events-none z-[3]"
          style={{
            width: 9, height: 9,
            borderRadius: "50%",
            background: GREEN,
            left: `${dotLeftPct}%`,
            bottom: `calc(9% + ${dotFromBase - 4.5}px)`,
            transform: "translateX(-50%)",
            transition: stage === "bridge"
              ? "left 2.2s cubic-bezier(0.25,0,0.15,1), bottom 2.2s cubic-bezier(0.25,0,0.15,1)"
              : "left 1.9s cubic-bezier(0.4,0,0.2,1), bottom 1.9s cubic-bezier(0.4,0,0.2,1)",
            animation: "dot-pulse 1.5s ease-in-out infinite",
          }}
        />
      )}

      {/* ── Foreground content (questions OR bridge) ── */}

      {/* Questions phase */}
      {stage === "questions" && (
        <>
          <div
            className="relative z-10 px-6 max-w-3xl mx-auto text-center"
            style={{ marginTop: "-15vh" }}
          >
            <p
              className="font-black leading-[1.1] tracking-tight"
              style={{
                fontFamily: "'Bricolage Grotesque', Inter, sans-serif",
                fontSize: "clamp(2.4rem, 8vw, 5rem)",
              }}
            >
              {words.map((word, i) => {
                const isHi    = q.hi.includes(word);
                const isLast  = i === words.length - 1;
                const hiClass = isHi ? "lime-glow-text" : "";

                return (
                  <span key={`${qIdx}-${i}`} className="inline-block" style={{ marginRight: "0.26em" }}>
                    {/* Word itself — snaps in like typing */}
                    <span
                      className={`inline-block ${hiClass}`}
                      style={
                        phase === "in" ? {
                          opacity: 0,
                          animation: `word-type 0.08s ease ${i * WORD_MS}ms forwards`,
                        } : phase === "hold" ? {
                          opacity: 1,
                        } : {
                          opacity: 0,
                          transition: `opacity ${OUT_MS * 0.6}ms ease ${i * 18}ms`,
                        }
                      }
                    >{word}</span>

                    {/* Blinking cursor after last word during hold */}
                    {isLast && phase === "hold" && (
                      <span
                        className="inline-block font-thin ml-0.5"
                        style={{ color: GREEN, animation: "cursor-blink 0.9s step-end infinite" }}
                      >|</span>
                    )}
                  </span>
                );
              })}
            </p>
          </div>

          {/* Progress dots */}
          <div className="absolute bottom-20 flex gap-2 items-center z-10">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  height: "3px",
                  width: i === qIdx ? "24px" : "6px",
                  background:
                    i < qIdx
                      ? "hsla(87,100%,68%,0.3)"
                      : i === qIdx
                      ? GREEN
                      : "rgba(255,255,255,0.10)",
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Bridge phase */}
      {stage === "bridge" && <BridgeContent onDone={onDone} />}

      {/* Scroll hint — delayed so it helps without interrupting the intro */}
      <p
        className="absolute bottom-8 text-[10px] tracking-[0.22em] uppercase text-foreground/25 z-10 pointer-events-none transition-all duration-1000"
        style={{
          opacity: showScrollHint ? 1 : 0,
          transform: showScrollHint ? "translateY(0)" : "translateY(8px)",
        }}
      >
        scroll to explore
      </p>
    </section>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────

const WHY_ITEMS = [
  {
    icon: TrendingUp,
    title: "Money matters, no matter what anyone says",
    desc: "Whether you earn 20k or 2 lakh, making smart decisions with money changes everything. Kosh gives you the foundation to act, not just worry.",
    color: "emerald",
  },
  {
    icon: BarChart3,
    title: "If you want to make money by investing",
    desc: "FDR, Sanchaypatra, stocks, crypto — you hear these everywhere. Kosh teaches you what they actually are and when they make sense for you.",
    color: "blue",
  },
  {
    icon: ShieldCheck,
    title: "You can make informed financial decisions",
    desc: "No more guessing, no more following random advice. Know the difference between a good opportunity and a Grey Zone scam.",
    color: "violet",
  },
];

interface Tool {
  href: string; icon: React.ElementType; title: string; desc: string; tag: string;
  locked?: boolean;
  iconColor: string; iconGlowFilter: string; iconBg: string; iconBorder: string;
  iconShadow: string; cardBorder: string; cardHover: string; cardAmbient: string;
  tagStyle: string; arrowHover: string;
}

const TOOLS: Tool[] = [
  {
    href: "/scam-spotter", icon: Radar, title: "Scam Spotter",
    desc: "Potential scams in Bangladesh. Can you spot them?", tag: "Game",
    iconColor: "text-red-400", iconGlowFilter: "drop-shadow(0 0 6px rgba(239,68,68,0.9))",
    iconBg: "from-red-500/25 to-red-900/10", iconBorder: "border-red-500/25",
    iconShadow: "shadow-[0_0_18px_rgba(239,68,68,0.3)]",
    cardBorder: "border-border hover:border-red-500/35",
    cardHover: "hover:shadow-[0_0_45px_rgba(239,68,68,0.12),0_2px_8px_rgba(0,0,0,0.4)]",
    cardAmbient: "bg-red-500/8", tagStyle: "bg-red-500/15 text-red-400 border border-red-500/25",
    arrowHover: "group-hover:text-red-400/70",
  },
  {
    href: "/sip-calculator", icon: Crosshair, title: "Goal Based SIP",
    desc: "How much to save monthly to hit your goal.", tag: "Planner",
    iconColor: "text-emerald-400", iconGlowFilter: "drop-shadow(0 0 6px rgba(52,211,153,0.9))",
    iconBg: "from-emerald-500/25 to-emerald-900/10", iconBorder: "border-emerald-500/25",
    iconShadow: "shadow-[0_0_18px_hsla(87,100%,68%,0.3)]",
    cardBorder: "border-border hover:border-emerald-500/35",
    cardHover: "hover:shadow-[0_0_45px_hsla(87,100%,68%,0.12),0_2px_8px_rgba(0,0,0,0.4)]",
    cardAmbient: "bg-emerald-500/8", tagStyle: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
    arrowHover: "group-hover:text-emerald-400/70",
  },
  {
    href: "/budget-planner", icon: PieChart, title: "Budget Planner",
    desc: "See your real savings rate. Bangladesh-specific.", tag: "Planner",
    iconColor: "text-cyan-400", iconGlowFilter: "drop-shadow(0 0 6px rgba(34,211,238,0.9))",
    iconBg: "from-cyan-500/25 to-cyan-900/10", iconBorder: "border-cyan-500/25",
    iconShadow: "shadow-[0_0_18px_rgba(6,182,212,0.3)]",
    cardBorder: "border-border hover:border-cyan-500/35",
    cardHover: "hover:shadow-[0_0_45px_rgba(6,182,212,0.12),0_2px_8px_rgba(0,0,0,0.4)]",
    cardAmbient: "bg-cyan-500/8", tagStyle: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/25",
    arrowHover: "group-hover:text-cyan-400/70",
  },
  {
    href: "/explainers", icon: BookOpenCheck, title: "Kosh Explainers",
    desc: "Fast answers for FDR, remittance, credit, scams, and more.", tag: "3–5 min",
    iconColor: "text-lime-300", iconGlowFilter: "drop-shadow(0 0 6px hsla(87,100%,68%,0.9))",
    iconBg: "from-lime-500/25 to-teal-900/10", iconBorder: "border-lime-500/25",
    iconShadow: "shadow-[0_0_18px_hsla(87,100%,68%,0.3)]",
    cardBorder: "border-border hover:border-lime-500/35",
    cardHover: "hover:shadow-[0_0_45px_hsla(87,100%,68%,0.12),0_2px_8px_rgba(0,0,0,0.4)]",
    cardAmbient: "bg-lime-500/8", tagStyle: "bg-lime-500/15 text-lime-300 border border-lime-500/25",
    arrowHover: "group-hover:text-lime-300/70",
  },
  {
    href: "/explainers/employer", icon: Building2, title: "Workplace Packs",
    desc: "Ready-to-deploy bundles for RMG, NGOs, and corporate teams.", tag: "For teams",
    iconColor: "text-amber-300", iconGlowFilter: "drop-shadow(0 0 6px hsla(38,95%,65%,0.9))",
    iconBg: "from-amber-500/25 to-amber-900/10", iconBorder: "border-amber-500/25",
    iconShadow: "shadow-[0_0_18px_hsla(38,95%,55%,0.3)]",
    cardBorder: "border-border hover:border-amber-500/35",
    cardHover: "hover:shadow-[0_0_45px_hsla(38,95%,55%,0.12),0_2px_8px_rgba(0,0,0,0.4)]",
    cardAmbient: "bg-amber-500/8", tagStyle: "bg-amber-500/15 text-amber-300 border border-amber-500/25",
    arrowHover: "group-hover:text-amber-300/70",
  },
  {
    href: "/comparator", icon: ArrowLeftRight, title: "Savings Compare",
    desc: "FDR vs Sanchaypatra vs DPS — after-tax.", tag: "Calculator", locked: true,
    iconColor: "text-blue-400", iconGlowFilter: "drop-shadow(0 0 6px rgba(96,165,250,0.9))",
    iconBg: "from-blue-500/25 to-blue-900/10", iconBorder: "border-blue-500/25",
    iconShadow: "shadow-[0_0_18px_rgba(59,130,246,0.3)]",
    cardBorder: "border-border hover:border-blue-500/35",
    cardHover: "hover:shadow-[0_0_45px_rgba(59,130,246,0.12),0_2px_8px_rgba(0,0,0,0.4)]",
    cardAmbient: "bg-blue-500/8", tagStyle: "bg-blue-500/15 text-blue-400 border border-blue-500/25",
    arrowHover: "group-hover:text-blue-400/70",
  },
  {
    href: "/emi-calculator", icon: Landmark, title: "EMI Calculator",
    desc: "True cost of a loan before you commit.", tag: "Calculator", locked: true,
    iconColor: "text-violet-400", iconGlowFilter: "drop-shadow(0 0 6px rgba(167,139,250,0.9))",
    iconBg: "from-violet-500/25 to-violet-900/10", iconBorder: "border-violet-500/25",
    iconShadow: "shadow-[0_0_18px_rgba(139,92,246,0.3)]",
    cardBorder: "border-border hover:border-violet-500/35",
    cardHover: "hover:shadow-[0_0_45px_rgba(139,92,246,0.12),0_2px_8px_rgba(0,0,0,0.4)]",
    cardAmbient: "bg-violet-500/8", tagStyle: "bg-violet-500/15 text-violet-400 border border-violet-500/25",
    arrowHover: "group-hover:text-violet-400/70",
  },
  {
    href: "/car-calculator", icon: Gauge, title: "Car Affordability",
    desc: "Real monthly cost of owning a car in Bangladesh.", tag: "Calculator", locked: true,
    iconColor: "text-amber-400", iconGlowFilter: "drop-shadow(0 0 6px rgba(251,191,36,0.9))",
    iconBg: "from-amber-500/25 to-amber-900/10", iconBorder: "border-amber-500/25",
    iconShadow: "shadow-[0_0_18px_rgba(245,158,11,0.3)]",
    cardBorder: "border-border hover:border-amber-500/35",
    cardHover: "hover:shadow-[0_0_45px_rgba(245,158,11,0.12),0_2px_8px_rgba(0,0,0,0.4)]",
    cardAmbient: "bg-amber-500/8", tagStyle: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
    arrowHover: "group-hover:text-amber-400/70",
  },
];

const FOR_ORGS = [
  { icon: Smartphone, title: "White-label mobile app", desc: "Your brand, your colors. Full Kosh education platform deployed to your users as a standalone app on Android and iOS." },
  { icon: Globe, title: "Plug into your existing app", desc: "Paste a single code snippet and Kosh's learning modules appear inside your existing banking app, website, or employee portal. No rebuild needed." },
  { icon: Gamepad2, title: "Gamified learning engine", desc: "Points, streaks, levels, challenges, and leaderboards. The same engagement layer that keeps Kosh learners coming back." },
  { icon: BarChart3, title: "Analytics dashboard", desc: "Track literacy baseline scores, module completion, engagement trends, and real learning outcomes." },
];

const TARGET_PARTNERS = [
  { label: "Banks & NBFIs",    desc: "Boost customer engagement and digital product adoption through embedded financial education." },
  { label: "Fintech Platforms", desc: "Add a financial literacy layer to your app. Educated users transact more confidently and churn less." },
  { label: "MFS Platforms",    desc: "bKash, Nagad, Rocket. Help users understand what they're doing with their money." },
  { label: "NGOs & MFIs",      desc: "Embed financial literacy into microcredit programs and community outreach at scale." },
  { label: "Employers & HR",   desc: "Employee financial wellness programs. Measurable, gamified, and locally relevant." },
];

const WHY_COLORS: Record<string, { icon: string; glow: string; border: string; bg: string }> = {
  blue:    { icon: "text-blue-400",    glow: "drop-shadow(0 0 5px rgba(96,165,250,0.8))",   border: "border-blue-500/20",    bg: "from-blue-500/15 to-blue-900/5"    },
  emerald: { icon: "text-emerald-400", glow: "drop-shadow(0 0 5px rgba(52,211,153,0.8))",   border: "border-emerald-500/20", bg: "from-emerald-500/15 to-emerald-900/5" },
  violet:  { icon: "text-violet-400",  glow: "drop-shadow(0 0 5px rgba(167,139,250,0.8))",  border: "border-violet-500/20",  bg: "from-violet-500/15 to-violet-900/5"  },
};

// ── Component ─────────────────────────────────────────────────────────────

export default function Landing() {
  const profile  = useAuthStore((s) => s.profile);
  const heroRef  = useRef<HTMLElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const userMovedBeforeIntroDone = useRef(false);

  const [isFirstVisit]   = useState(() => !sessionStorage.getItem(INTRO_KEY));
  const [toolsVisible, setToolsVisible] = useState(false);

  const handleIntroDone = useCallback(() => {
    sessionStorage.setItem(INTRO_KEY, "1");
    const target = heroRef.current;
    if (!target) return;
    if (userMovedBeforeIntroDone.current || window.scrollY > 40) return;
    const start = window.scrollY;
    const end   = target.getBoundingClientRect().top + start;
    const duration = 1200; // ms — slow, cinematic scroll
    const startTime = performance.now();
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + (end - start) * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const markManualMove = () => {
      if (window.scrollY > 16) userMovedBeforeIntroDone.current = true;
    };
    window.addEventListener("wheel", markManualMove, { passive: true });
    window.addEventListener("touchmove", markManualMove, { passive: true });
    window.addEventListener("keydown", markManualMove);
    window.addEventListener("scroll", markManualMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", markManualMove);
      window.removeEventListener("touchmove", markManualMove);
      window.removeEventListener("keydown", markManualMove);
      window.removeEventListener("scroll", markManualMove);
    };
  }, []);

  // Trigger tools animation when section scrolls into view
  useEffect(() => {
    const el = toolsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setToolsVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* Global top glow */}
      <div
        className="fixed inset-x-0 top-0 h-[480px] pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at 50% -10%, hsla(87,100%,68%,0.13) 0%, transparent 60%)" }}
      />

      {/* ── Nav ── */}
      <nav
        className="border-b border-border sticky top-0 z-10 backdrop-blur-2xl bg-background/70"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <img src="/logo.png" alt="Kosh" className="h-8 w-auto" />
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-sm font-medium text-foreground/50 hover:text-foreground/90 transition-colors">About</Link>
            <a
              href="#tools"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm font-medium text-foreground/50 hover:text-foreground/90 transition-colors"
            >
              Tools
            </a>
            <Link to="#for-organizations" className="text-sm font-medium text-foreground/50 hover:text-foreground/90 transition-colors hidden sm:block">For Organizations</Link>
            <Link to={profile ? "/dashboard" : "/auth"} className="text-sm font-medium text-foreground/50 hover:text-foreground/90 transition-colors">
              {profile ? "Dashboard" : "Sign in"}
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Animated intro (full-screen, outside max-width) ── */}
      <IntroSection onDone={handleIntroDone} isFirst={isFirstVisit} />

      <main className="max-w-5xl mx-auto px-4">

        {/* ── Hero — fills viewport on scroll-snap arrival ── */}
        <section
          ref={heroRef}
          className="relative flex flex-col items-center justify-center text-center space-y-8 max-w-2xl mx-auto"
          style={{ minHeight: "calc(100vh - 56px)", paddingTop: "clamp(3rem, 8vw, 6rem)", paddingBottom: "clamp(3rem, 8vw, 6rem)" }}
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.15] tracking-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            How well do you{" "}
            <span className="brand-stamp">actually</span>{" "}
            understand money?
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
            15 questions. 5 minutes. Know exactly where you stand — and get a personalized track to fix the gaps.
          </p>

          {/* CTAs — Apple-style: small, subtle, pill */}
          <div className="flex flex-col items-center gap-4 pt-2">
            <div className="flex flex-row flex-wrap gap-3 justify-center">
              <Link
                to="/age-select"
                className="btn-brand inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-sm font-bold tracking-tight active:scale-95"
              >
                Check your money level
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/path"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-primary/25 bg-primary/5 text-sm font-bold text-primary hover:border-primary/45 hover:bg-primary/10 transition-all active:scale-95"
              >
                Find your path
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-primary/25 bg-primary/5 text-sm font-bold text-primary hover:border-primary/45 hover:bg-primary/10 transition-all active:scale-95"
              >
                Sign up free
              </Link>
            </div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground/35">
              scroll to explore
            </p>
          </div>
        </section>

        {/* ── What is Kosh ── */}
        <section className="py-24 border-t border-border">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <Link
              to="/about"
              className="inline-flex items-center gap-1 text-xs font-bold tracking-[0.22em] uppercase text-primary/80 hover:text-primary transition-all hover:gap-1.5"
              style={{ textShadow: "0 0 12px hsla(87,100%,68%,0.35)" }}
            >
              What is Kosh? <ArrowRight className="h-3 w-3" />
            </Link>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground leading-[1.2] tracking-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Bangladesh's first financial literacy platform that actually{" "}
              <span className="brand-stamp">measures</span> where you stand.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Not another YouTube channel. Not a broker. A structured system that measures, teaches, and tracks your money knowledge — from Level 0 to Level 100.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Link
                to="/about"
                className="btn-brand inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-sm font-bold tracking-tight active:scale-95"
              >
                Read the full story <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Tools ── */}
        <section id="tools" className="py-16 border-t border-border" ref={toolsRef}>
          <div className="max-w-4xl mx-auto space-y-8">

            {/* Header — small kicker label + serious headline (no emoji) */}
            <div className="text-center space-y-2">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-700"
                style={{
                  background: "hsla(87,100%,68%,0.08)",
                  border: "1px solid hsla(87,100%,68%,0.25)",
                  color: "hsl(87,90%,42%)",
                  transform: toolsVisible ? "translateY(0)" : "translateY(8px)",
                  opacity: toolsVisible ? 1 : 0,
                }}
              >
                <Wrench className="h-3 w-3" style={{ filter: "drop-shadow(0 0 4px hsla(87,100%,68%,0.7))" }} />
                Free Tools
              </div>
              <h2
                className="text-3xl md:text-4xl font-display font-extrabold text-foreground tracking-tight leading-[1.05]"
                style={{
                  fontFamily: "'Bricolage Grotesque', Manrope, sans-serif",
                  transform: toolsVisible ? "translateY(0)" : "translateY(12px)",
                  opacity: toolsVisible ? 1 : 0,
                  transition: "all 0.6s cubic-bezier(0.16,1,0.3,1) 80ms",
                }}
              >
                Calculators that actually understand{" "}
                <span className="text-primary">Bangladesh</span>.
              </h2>
              <p
                className="text-muted-foreground text-sm max-w-md mx-auto"
                style={{
                  transform: toolsVisible ? "translateY(0)" : "translateY(12px)",
                  opacity: toolsVisible ? 1 : 0,
                  transition: "all 0.6s cubic-bezier(0.16,1,0.3,1) 160ms",
                }}
              >
                Built for FDR, Sanchaypatra, EMI, and savings decisions you actually face.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {TOOLS.map((tool, idx) => {
                const Icon = tool.icon;
                const isLocked = tool.locked && !profile;
                return (
                  <Link
                    key={tool.href}
                    to={isLocked ? "/auth" : tool.href}
                    className={`group relative flex gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden bg-card/60 backdrop-blur-xl ${tool.cardBorder} ${tool.cardHover} ${isLocked ? "opacity-60" : ""}`}
                    style={{
                      opacity: toolsVisible ? undefined : 0,
                      animation: toolsVisible
                        ? `tool-reveal 0.5s cubic-bezier(0.16,1,0.3,1) ${idx * 65}ms forwards`
                        : "none",
                    }}
                  >
                    <div className={`absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl opacity-60 pointer-events-none ${tool.cardAmbient}`} />
                    {isLocked && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-semibold text-muted-foreground bg-muted border border-border px-2 py-0.5 rounded-full">
                        <Lock className="h-2.5 w-2.5" /> Sign in
                      </div>
                    )}
                    <div className={`relative h-11 w-11 rounded-xl bg-gradient-to-br ${tool.iconBg} border ${tool.iconBorder} flex items-center justify-center shrink-0 ${tool.iconShadow}`}>
                      <Icon className={`h-5 w-5 ${tool.iconColor}`} style={{ filter: tool.iconGlowFilter }} />
                    </div>
                    <div className="space-y-1.5 min-w-0 relative">
                      <span className="font-semibold text-sm text-foreground">{tool.title}</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                    </div>
                    {!isLocked && (
                      <ArrowRight className={`h-4 w-4 shrink-0 mt-1 text-white/20 transition-all duration-300 ${tool.arrowHover} group-hover:translate-x-0.5`} />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Why you should try Kosh? ── */}
        <section className="py-16 border-t border-border">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-foreground text-center tracking-tight">
              Why you should try Kosh?
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {WHY_ITEMS.map(({ icon: Icon, title, desc, color }) => {
                const c = WHY_COLORS[color];
                return (
                  <div key={title} className={`relative rounded-2xl border p-5 space-y-4 overflow-hidden bg-card/60 backdrop-blur-lg ${c.border}`}>
                    <div
                      className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-3xl opacity-50 pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${color === "blue" ? "rgba(59,130,246,0.2)" : color === "emerald" ? "hsla(87,100%,68%,0.2)" : "rgba(139,92,246,0.2)"}, transparent)` }}
                    />
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${c.bg} border ${c.border} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${c.icon}`} style={{ filter: c.glow }} />
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

        {/* ── Level track (simplified) ── */}
        <section className="py-16 border-t border-border">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border border-border p-8 space-y-5 bg-card/60 backdrop-blur-xl text-center">
              <span
                className="inline-block text-xs font-bold tracking-widest text-primary/80 uppercase px-3 py-1 rounded-full border border-primary/20"
                style={{ background: "hsla(87,100%,68%,0.08)" }}
              >
                Level Track
              </span>

              <h2 className="text-xl font-bold text-foreground">
                Start at 0. Reach 10.<br />
                <span className="text-primary">Then 100 awaits.</span>
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                <strong className="text-foreground/80">Levels 1→10</strong> build your foundation — inflation, savings instruments, scam patterns, and your first money system.
                <br /><br />
                <strong className="text-foreground/80">Levels 10→100</strong> go deeper — investing, taxes, business finance, and building real wealth.
              </p>

              {/* Progression visual */}
              <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
                {([["Start", "border-border text-muted-foreground"], ["Level 1", "border-primary/30 text-primary bg-primary/8"], ["Level 10", "border-primary/30 text-primary bg-primary/8"], ["Level 100", "border-amber-500/30 text-amber-400 bg-amber-500/8"]] as [string, string][]).map(([label, cls], i, arr) => (
                  <Fragment key={label}>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${cls}`}>{label}</span>
                    {i < arr.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground/30" />}
                  </Fragment>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/auth"
                  className="btn-brand inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-sm font-bold tracking-tight active:scale-95"
                >
                  Sign up and start your track <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <p className="text-xs text-muted-foreground mt-3">
                  Your result becomes the starting point for your learning path.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── For Organizations ── */}
        <section id="for-organizations" className="py-16 border-t border-border">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div
                className="inline-flex items-center gap-2 text-primary text-sm font-semibold px-4 py-1.5 rounded-full border border-primary/25"
                style={{ background: "hsla(87,100%,68%,0.08)" }}
              >
                <Building2 className="h-4 w-4" style={{ filter: "drop-shadow(0 0 4px hsla(87,100%,68%,0.8))" }} />
                For Organizations
              </div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Add financial literacy as a product/service</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Banks, fintechs, NGOs, and employers — bring Kosh's gamified financial education to your users as a white-label app, web embed, or SDK.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {FOR_ORGS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 rounded-2xl border border-border p-5 bg-card/60 backdrop-blur-lg">
                  <div className="h-10 w-10 rounded-xl border border-primary/20 flex items-center justify-center shrink-0" style={{ background: "hsla(87,100%,68%,0.1)", boxShadow: "0 0 14px hsla(87,100%,68%,0.2)" }}>
                    <Icon className="h-5 w-5 text-primary" style={{ filter: "drop-shadow(0 0 4px hsla(87,100%,68%,0.7))" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center">Who it's built for</p>
              <div className="divide-y divide-border rounded-xl border border-border overflow-hidden bg-card/50">
                {TARGET_PARTNERS.map(({ label, desc }) => (
                  <div key={label} className="flex items-center gap-4 px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" style={{ filter: "drop-shadow(0 0 4px hsla(87,100%,68%,0.8))" }} />
                    <span className="text-sm font-semibold text-foreground w-36 shrink-0">{label}</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl border border-primary/15 p-7 space-y-6"
              style={{ background: "hsla(87,100%,68%,0.04)", backdropFilter: "blur(20px)", boxShadow: "0 0 60px hsla(87,100%,68%,0.07), inset 0 1px 0 rgba(255,255,255,0.05)" }}
            >
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                {[
                  { v: "800+", l: "Bangladesh-specific learning modules" },
                  { v: "3",    l: "Ways to deploy (app · website · embed)" },
                  { v: "0→100", l: "Gamified user level journey — from zero to financially literate" },
                ].map(({ v, l }) => (
                  <div key={l}>
                    <div className="text-2xl font-bold text-primary" style={{ textShadow: "0 0 24px hsla(87,100%,68%,0.5)" }}>{v}</div>
                    <div className="text-xs text-muted-foreground mt-1">{l}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border-t border-border pt-5">
                {["Bangla/Banglish content","Points, streaks, levels","Diagnostic + tracking","White-label branding","Analytics dashboard","Scam & grey zone content"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-xs font-medium text-foreground/70 px-3 py-2.5 rounded-xl border border-border bg-muted/40">
                    <CheckCircle2 className="h-3 w-3 text-primary shrink-0" style={{ filter: "drop-shadow(0 0 3px hsla(87,100%,68%,0.7))" }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <a href="mailto:koshinitiative@gmail.com" className="btn-glow inline-flex items-center gap-2 text-white text-sm font-semibold px-7 py-3.5 rounded-xl">
                  Talk to us about a pilot <ArrowRight className="h-4 w-4" />
                </a>
                <p className="text-xs text-muted-foreground mt-3">Onboarding pilot partners now. NGOs, student banks, and MFS platforms prioritized.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col items-center gap-5 text-sm text-foreground/35 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <img src="/logo.png" alt="Kosh" className="h-6 w-auto opacity-60" />
            <a href="https://www.koshbd.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground/55 transition-colors hover:text-primary">
              www.koshbd.com
            </a>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/kosh.initiative/" target="_blank" rel="noopener noreferrer" aria-label="Kosh Instagram" className="transition-colors hover:text-primary">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/koshbd/" target="_blank" rel="noopener noreferrer" aria-label="Kosh LinkedIn" className="transition-colors hover:text-primary">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4v15h-4V8Zm7.5 0h3.8v2.05h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V23h-4v-7.95c0-1.9-.03-4.35-2.65-4.35-2.65 0-3.05 2.07-3.05 4.2V23h-4V8Z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="max-w-sm text-center md:text-left">Beta learning product. Education only, not financial advice. No products. No commissions.</div>
          <div className="flex max-w-md flex-wrap gap-4 justify-center md:justify-end">
            <Link to="/scam-spotter" className="hover:text-foreground/60 transition-colors">Scam Spotter</Link>
            <Link to="/comparator"   className="hover:text-foreground/60 transition-colors">Comparator</Link>
            <Link to="/emi-calculator" className="hover:text-foreground/60 transition-colors">EMI</Link>
            <Link to="/sip-calculator" className="hover:text-foreground/60 transition-colors">SIP</Link>
            <Link to="/car-calculator" className="hover:text-foreground/60 transition-colors">Car</Link>
            <Link to="/budget-planner" className="hover:text-foreground/60 transition-colors">Budget</Link>
            <Link to="/fdr-calculator" className="hover:text-foreground/60 transition-colors">FDR</Link>
            <Link to="/savings-goal"   className="hover:text-foreground/60 transition-colors">Goal Planner</Link>
            <Link to="/portfolio-builder" className="hover:text-foreground/60 transition-colors">Portfolio Builder</Link>
            <Link to="/explainers" className="hover:text-foreground/60 transition-colors">Explainers</Link>
            <Link to="/check"          className="hover:text-foreground/60 transition-colors">Money Check</Link>
            <Link to="/for-institutions" className="hover:text-foreground/60 transition-colors">For Institutions</Link>
          </div>
        </div>
      </footer>

      {!profile && <EmailSignupModal fallbackDelayMs={45000} />}
    </div>
  );
}
