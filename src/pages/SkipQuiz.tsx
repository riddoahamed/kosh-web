import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getModule } from "@/data/modules";
import { useProgressStore } from "@/store/progressStore";
import { usePointsStore, POINTS } from "@/store/pointsStore";
import { db } from "@/lib/supabase";

type Phase = "intro" | "quiz" | "pass" | "fail";

export default function SkipQuiz() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const module = id ? getModule(id) : undefined;
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const { completeModule, completeQuiz, isUnlocked } = useProgressStore();
  const { addPoints } = usePointsStore();
  const greyZoneFlagged = db.getDiagnosticResult()?.greyZone?.flagged ?? false;

  if (!module || !id) return null;

  const questions = module.quiz;
  const question = questions[currentQ];

  function handleSelect(optionIndex: number) {
    if (revealed) return;
    setSelected(optionIndex);
    setRevealed(true);
    const qKey = question.id ?? String(currentQ);
    const newResponses = { ...responses, [qKey]: optionIndex };
    setResponses(newResponses);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setRevealed(false);
      } else {
        // Score it
        const correct = questions.filter((q, idx) => newResponses[q.id ?? String(idx)] === q.correctIndex).length;
        const score = Math.round((correct / questions.length) * 100);
        if (score >= 67) {
          // Pass
          completeQuiz(id!, score, newResponses);
          completeModule(id!, 0);
          addPoints(POINTS.SKIP_QUIZ_PASS, `Skipped Module ${id!} by quiz ⚡`);
          setPhase("pass");
        } else {
          setPhase("fail");
        }
      }
    }, 1200);
  }

  if (phase === "pass") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center space-y-6">
          <div className="text-6xl">⚡</div>
          <h1 className="text-2xl font-bold text-foreground">You already knew this.</h1>
          <p className="text-muted-foreground">Module unlocked. +{POINTS.SKIP_QUIZ_PASS} Kosh points earned.</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-primary text-white rounded-xl py-3 font-semibold hover:bg-primary/90 transition-all"
          >
            Back to dashboard →
          </button>
        </div>
      </div>
    );
  }

  if (phase === "fail") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center space-y-6">
          <div className="text-6xl">📖</div>
          <h1 className="text-2xl font-bold text-foreground">Almost there.</h1>
          <p className="text-muted-foreground">You need 2/3 to skip. Read the module first — it takes 10 min and the knowledge sticks better.</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                if (isUnlocked(id, greyZoneFlagged)) {
                  navigate(`/module/${id}`);
                } else {
                  navigate("/dashboard");
                }
              }}
              className="w-full bg-primary text-white rounded-xl py-3 font-semibold hover:bg-primary/90 transition-all"
            >
              Read the module →
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full text-muted-foreground text-sm py-2 hover:text-foreground"
            >
              Back to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-sm w-full space-y-6">
          <button onClick={() => navigate("/dashboard")} className="text-sm text-foreground/60 hover:text-foreground">
            ← Dashboard
          </button>
          <div className="space-y-3">
            <div className="text-4xl">⚡</div>
            <h1 className="text-2xl font-bold text-foreground">Think you know this?</h1>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">{module.title}</strong> — take the 3-question quiz. Score 2/3 or better and the module unlocks instantly.
            </p>
          </div>
          <div className="bg-muted/50 border border-border rounded-xl p-4 text-sm text-foreground/70 space-y-1">
            <p>✓ Pass (2/3) → module unlocked + {POINTS.SKIP_QUIZ_PASS} points</p>
            <p>✗ Fail → you'll read the module (10 min, worth it)</p>
          </div>
          <button
            onClick={() => setPhase("quiz")}
            className="w-full bg-primary text-white rounded-xl py-3 font-semibold hover:bg-primary/90 transition-all"
          >
            Take the quiz →
          </button>
        </div>
      </div>
    );
  }

  // Quiz phase
  const isCorrect = selected === question.correctIndex;
  const progress = (currentQ / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-lg w-full mx-auto px-4 py-8 flex-1 flex flex-col space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>⚡ Skip quiz — {module.title}</span>
            <span>{currentQ + 1} / {questions.length}</span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 space-y-5 flex-1">
          <p className="font-semibold text-foreground leading-snug text-lg">{question.text}</p>
          <div className="space-y-2">
            {question.options.map((opt, i) => {
              let cls = "w-full text-left rounded-xl border-2 px-4 py-3 text-sm transition-all ";
              if (!revealed) {
                cls += "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
              } else if (i === question.correctIndex) {
                cls += "border-green-500 bg-green-50 text-green-800 cursor-default";
              } else if (i === selected && !isCorrect) {
                cls += "border-red-400 bg-red-50 text-red-800 cursor-default";
              } else {
                cls += "border-border opacity-40 cursor-default";
              }
              return (
                <button key={i} className={cls} onClick={() => handleSelect(i)}>
                  <span className="font-bold text-foreground/30 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
          {revealed && (
            <div className={`rounded-xl p-4 text-sm ${isCorrect ? "bg-green-50 border border-green-200 text-green-800" : "bg-amber-50 border border-amber-200 text-amber-800"}`}>
              <span className="font-semibold mr-1">{isCorrect ? "Correct." : "Not quite."}</span>
              {question.explanation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
