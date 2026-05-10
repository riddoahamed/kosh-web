import { useEffect } from "react";
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
import type { DiagnosticResponse } from "@/types/diagnostic";
import { ChevronLeft } from "lucide-react";

export default function Diagnostic() {
  const navigate = useNavigate();
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
    reset,
  } = useDiagnosticStore();

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
          <DiagnosticProgress />
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <GreyZoneQuestion onSubmit={handleGreyZoneSubmit} />
          </div>
        </div>
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
          <span className="text-xs font-medium text-foreground/40">
            এটা test না — এটা একটা check-in
          </span>
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
    </div>
  );
}
