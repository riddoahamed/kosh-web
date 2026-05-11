import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDiagnosticStore } from "@/store/diagnosticStore";
import { allDiagnosticQuestions, knowledgeQuestions as defaultKnowledgeQuestions } from "@/data/diagnosticQuestions";
import { getDiagnosticQuestions } from "@/data/age_group_diagnostic_questions";
import { QuestionCard } from "@/components/diagnostic/QuestionCard";
import { GreyZoneQuestion } from "@/components/diagnostic/GreyZoneQuestion";
import { DiagnosticProgress } from "@/components/diagnostic/DiagnosticProgress";
import { Button } from "@/components/ui/button";
import { buildDiagnosticResult } from "@/lib/scoring";
import { db } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import type { DiagnosticResponse } from "@/types/diagnostic";
import { ChevronLeft, X } from "lucide-react";

export default function Diagnostic() {
  const navigate = useNavigate();
  const profile = useAuthStore((s) => s.profile);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const {
    ageGroup,
    currentIndex,
    responses,
    showGreyZone,
    isComplete,
    setResponse,
    nextQuestion,
    prevQuestion,
    completeGreyZone,
    setQuestionCount,
    reset,
  } = useDiagnosticStore();

  const exitTo = profile ? "/dashboard" : "/";

  function handleExit() {
    if (responses.length === 0) {
      navigate(exitTo);
    } else {
      setShowExitConfirm(true);
    }
  }

  function confirmExit() {
    reset();
    navigate(exitTo);
  }

  // Redirect to age selection if not set
  useEffect(() => {
    if (!ageGroup) navigate("/age-select", { replace: true });
  }, [ageGroup, navigate]);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (isComplete) navigate("/results");
  }, [isComplete, navigate]);

  // Resolve question set — use age-group questions when available, fall back to defaults
  const questionSet = ageGroup ? getDiagnosticQuestions(ageGroup) : null;
  const diagnosticQuestions = questionSet
    ? [...questionSet.knowledge, ...questionSet.behavior, ...questionSet.confidence]
    : allDiagnosticQuestions;
  const knowledgeQuestions = questionSet?.knowledge ?? defaultKnowledgeQuestions;

  useEffect(() => {
    setQuestionCount(diagnosticQuestions.length);
  }, [diagnosticQuestions.length, setQuestionCount]);

  const currentQuestion = diagnosticQuestions[currentIndex];
  const currentResponse = responses.find((r) => r.questionId === currentQuestion?.id);
  const hasAnsweredCurrent = !!currentResponse;

  const handleAnswer = (response: DiagnosticResponse) => {
    setResponse(response);
    const isKnowledge = currentQuestion?.type === "knowledge";
    const delay = isKnowledge ? 1200 : 400;
    setTimeout(() => nextQuestion(), delay);
  };

  const handleGreyZoneSubmit = (selections: string[]) => {
    const result = buildDiagnosticResult(responses, selections, knowledgeQuestions, ageGroup ?? undefined);
    db.saveDiagnosticResult(result);
    completeGreyZone();
  };

  if (showGreyZone) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="max-w-lg w-full mx-auto px-4 py-6 flex-1 flex flex-col justify-center space-y-6">
          <div className="flex items-center justify-end">
            <button
              onClick={handleExit}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Exit diagnostic"
            >
              <X className="h-3.5 w-3.5" />
              Exit
            </button>
          </div>
          <DiagnosticProgress />
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <GreyZoneQuestion onSubmit={handleGreyZoneSubmit} />
          </div>
        </div>
        {showExitConfirm && <ExitConfirm onCancel={() => setShowExitConfirm(false)} onConfirm={confirmExit} />}
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-lg w-full mx-auto px-4 py-6 flex-1 flex flex-col justify-center space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-foreground/40 hidden sm:inline">
              এটা test না — এটা একটা check-in
            </span>
            <button
              onClick={handleExit}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Exit diagnostic"
            >
              <X className="h-3.5 w-3.5" />
              Exit
            </button>
          </div>
        </div>

        <DiagnosticProgress />

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            onAnswer={handleAnswer}
          />
        </div>

        {hasAnsweredCurrent && currentQuestion.type !== "knowledge" && (
          <Button onClick={nextQuestion} className="w-full" size="lg">
            {currentIndex < diagnosticQuestions.length - 1 ? "Next →" : "Almost done →"}
          </Button>
        )}
      </div>
      {showExitConfirm && <ExitConfirm onCancel={() => setShowExitConfirm(false)} onConfirm={confirmExit} />}
    </div>
  );
}

function ExitConfirm({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 space-y-4 shadow-2xl">
        <h3 className="font-display font-black text-foreground text-lg tracking-tight">Exit the check?</h3>
        <p className="text-sm text-foreground/60 leading-relaxed">
          Your answers so far won't be saved. You can start over anytime.
        </p>
        <div className="flex gap-3 pt-1">
          <button
            onClick={onCancel}
            className="flex-1 border border-border rounded-xl py-2.5 text-sm font-semibold text-foreground/60 hover:text-foreground transition-all"
          >
            Keep going
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-red-600 transition-all"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
