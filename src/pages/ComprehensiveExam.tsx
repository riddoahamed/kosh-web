import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EXAM_QUESTIONS, PASS_THRESHOLD, EXAM_POINTS, type ExamQuestion } from "@/data/comprehensiveExam";
import { useProgressStore } from "@/store/progressStore";
import { usePointsStore } from "@/store/pointsStore";
import { CheckCircle2, XCircle, BookOpen, Zap, Trophy, ChevronRight } from "lucide-react";

type Phase = "intro" | "quiz" | "pass" | "fail";

const TOTAL = EXAM_QUESTIONS.length;
const PASS_COUNT = Math.ceil(TOTAL * PASS_THRESHOLD); // 12

export default function ComprehensiveExam() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongIds, setWrongIds] = useState<string[]>([]);

  const { completeAllCoreModules } = useProgressStore();
  const { addPoints } = usePointsStore();

  const question: ExamQuestion = EXAM_QUESTIONS[currentQ];
  const progressPct = Math.round((currentQ / TOTAL) * 100);
  const score = Math.round((correctCount / TOTAL) * 100);

  function handleSelect(optionIndex: number) {
    if (revealed) return;
    setSelected(optionIndex);
    setRevealed(true);

    const isCorrect = optionIndex === question.correctIndex;
    const newCorrect = isCorrect ? correctCount + 1 : correctCount;
    if (isCorrect) setCorrectCount(newCorrect);
    else setWrongIds((prev) => [...prev, question.id]);

    setTimeout(() => {
      if (currentQ < TOTAL - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setRevealed(false);
      } else {
        // Final score
        const finalCorrect = isCorrect ? correctCount + 1 : correctCount;
        const finalScore = Math.round((finalCorrect / TOTAL) * 100);
        if (finalCorrect >= PASS_COUNT) {
          completeAllCoreModules(finalScore);
          addPoints(EXAM_POINTS, "Comprehensive exam passed 🎓");
          setPhase("pass");
        } else {
          setPhase("fail");
        }
      }
    }, 1400);
  }

  // ── INTRO ────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="max-w-lg w-full mx-auto px-4 py-10 flex-1 flex flex-col justify-center space-y-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-medium text-foreground/60 hover:text-foreground flex items-center gap-1 self-start"
          >
            ← Dashboard
          </button>

          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
              🎓
            </div>
            <h1 className="text-3xl font-bold text-foreground leading-tight">
              Comprehensive Exam
            </h1>
            <p className="text-foreground/60 leading-relaxed">
              Think you already know your personal finance fundamentals? Pass this exam and unlock the entire 0→1 track instantly — no modules required.
            </p>
          </div>

          {/* Rules card */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">{TOTAL}</div>
                <div className="text-xs text-muted-foreground">Questions</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">{PASS_COUNT}/{TOTAL}</div>
                <div className="text-xs text-muted-foreground">To pass</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">+{EXAM_POINTS}</div>
                <div className="text-xs text-muted-foreground">Points</div>
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-2 text-sm text-foreground/70">
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Pass (75%+) → all 8 modules unlocked immediately</span>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-foreground/40 shrink-0 mt-0.5" />
                <span>Fail → start from Module 1 (takes 10–12 min each)</span>
              </div>
              <div className="flex items-start gap-2">
                <Trophy className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                <span>+{EXAM_POINTS} 🥭 mangoes for passing — biggest single reward</span>
              </div>
            </div>
          </div>

          {/* Topics covered */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Topics covered</p>
            <div className="flex flex-wrap gap-1.5">
              {["The Money Map","Inflation","Three Buckets","Scam Detection","Emergency Fund","Bangladesh Options","Crypto & Law","Money System"].map((t) => (
                <span key={t} className="text-xs bg-muted text-foreground/70 rounded-full px-2.5 py-1 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setPhase("quiz")}
            className="w-full bg-primary text-primary-foreground rounded-xl py-3.5 font-semibold hover:bg-primary/90 transition-all text-base"
          >
            Start exam →
          </button>
        </div>
      </div>
    );
  }

  // ── PASS ─────────────────────────────────────────────────────────
  if (phase === "pass") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-sm w-full space-y-6">
          <div className="text-center space-y-3">
            <div className="text-6xl">🎓</div>
            <h1 className="text-2xl font-bold text-foreground">You passed.</h1>
            <p className="text-muted-foreground">
              {correctCount}/{TOTAL} correct — {score}%. The entire 0→1 track is now unlocked.
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Score</span>
              <span className="text-2xl font-bold text-primary">{score}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${score}%` }} />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-semibold text-foreground">+{EXAM_POINTS} 🥭 mangoes earned</span>
            </div>
          </div>

          {wrongIds.length > 0 && (
            <div className="bg-card border border-border rounded-2xl p-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Missed {wrongIds.length} question{wrongIds.length > 1 ? "s" : ""} — worth reviewing
              </p>
              {EXAM_QUESTIONS.filter((q) => wrongIds.includes(q.id)).map((q) => (
                <div key={q.id} className="flex items-start gap-2 text-sm">
                  <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-foreground/70">{q.moduleTitle}: {q.text.slice(0, 60)}…</span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-semibold hover:bg-primary/90 transition-all"
            >
              Go to dashboard →
            </button>
            <button
              onClick={() => navigate("/challenge")}
              className="w-full text-sm text-muted-foreground py-2 hover:text-foreground transition-colors"
            >
              Start the 30-Day Challenge
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── FAIL ─────────────────────────────────────────────────────────
  if (phase === "fail") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-sm w-full space-y-6">
          <div className="text-center space-y-3">
            <div className="text-6xl">📖</div>
            <h1 className="text-2xl font-bold text-foreground">Good effort.</h1>
            <p className="text-muted-foreground">
              {correctCount}/{TOTAL} correct — {score}%. You need {PASS_COUNT} to pass. The modules will fill in the gaps — and they're worth reading.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Your score</span>
              <span className="text-2xl font-bold text-foreground">{score}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-foreground/30 rounded-full" style={{ width: `${score}%` }} />
            </div>
            <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
              <span>Pass mark: {Math.round(PASS_THRESHOLD * 100)}% ({PASS_COUNT}/{TOTAL})</span>
            </div>
          </div>

          {/* Missed topics breakdown */}
          {wrongIds.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-4 space-y-2">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                Review these areas
              </p>
              {EXAM_QUESTIONS.filter((q) => wrongIds.includes(q.id)).map((q) => (
                <div key={q.id} className="flex items-start gap-2 text-sm">
                  <ChevronRight className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-amber-800 dark:text-amber-300 font-medium">{q.moduleTitle}</span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <button
              onClick={() => navigate("/module/1")}
              className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-semibold hover:bg-primary/90 transition-all"
            >
              Start from Module 1 →
            </button>
            <button
              onClick={() => {
                setPhase("intro");
                setCurrentQ(0);
                setSelected(null);
                setRevealed(false);
                setCorrectCount(0);
                setWrongIds([]);
              }}
              className="w-full text-sm text-muted-foreground py-2 hover:text-foreground transition-colors"
            >
              Retake the exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ ─────────────────────────────────────────────────────────
  const isCorrect = selected === question.correctIndex;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-lg w-full mx-auto px-4 py-8 flex-1 flex flex-col gap-6">

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="font-medium">🎓 Comprehensive Exam</span>
            <span>{currentQ + 1} / {TOTAL}</span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground/60">{question.moduleTitle}</span>
            <span>·</span>
            <span>{correctCount} correct so far</span>
          </div>
        </div>

        {/* Question card */}
        <div className="bg-card rounded-2xl border border-border p-6 flex-1 flex flex-col gap-5">
          <p className="font-semibold text-foreground leading-snug text-lg">{question.text}</p>

          <div className="space-y-2">
            {question.options.map((opt, i) => {
              let cls = "w-full text-left rounded-xl border-2 px-4 py-3 text-sm transition-all ";
              if (!revealed) {
                cls += "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
              } else if (i === question.correctIndex) {
                cls += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 cursor-default";
              } else if (i === selected && !isCorrect) {
                cls += "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 cursor-default";
              } else {
                cls += "border-border opacity-40 cursor-default";
              }
              return (
                <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={revealed}>
                  <span className="font-bold text-foreground/30 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {revealed && (
            <div
              className={`rounded-xl p-4 text-sm flex items-start gap-2 ${
                isCorrect
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 text-green-800 dark:text-green-300"
                  : "bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300"
              }`}
            >
              {isCorrect
                ? <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                : <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
              }
              <div>
                <span className="font-semibold mr-1">{isCorrect ? "Correct." : "Not quite."}</span>
                {question.explanation}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
