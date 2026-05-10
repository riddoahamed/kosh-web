import { useState } from "react";
import type { ModuleQuizQuestion } from "@/types/curriculum";
import { MultipleChoice } from "./quiz/MultipleChoice";
import { FillBlankInput } from "./quiz/FillBlankInput";
import { ScenarioDecision } from "./quiz/ScenarioDecision";
import { MatchPairs } from "./quiz/MatchPairs";

interface ModuleQuizProps {
  questions: ModuleQuizQuestion[];
  onComplete: (score: number, responses: Record<string, number>) => void;
}

type AnswerState = "unanswered" | "correct" | "wrong";

function getQuestionId(q: ModuleQuizQuestion, idx: number): string {
  return q.id ?? String(idx);
}

export function ModuleQuiz({ questions, onComplete }: ModuleQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [scoreFlags, setScoreFlags] = useState<Record<string, number>>({}); // questionId -> 0 or 1 (or 0..1 fraction)
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const current = questions[currentIndex];

  function advance(thisFlag: number, thisResponseValue: number = 0) {
    const qKey = getQuestionId(current, currentIndex);
    const updatedResponses = { ...responses, [qKey]: thisResponseValue };
    const updatedFlags = { ...scoreFlags, [qKey]: thisFlag };
    setResponses(updatedResponses);
    setScoreFlags(updatedFlags);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
        setAnswerState("unanswered");
        setSelectedOption(null);
      } else {
        const correctSum = Object.values(updatedFlags).reduce((a, b) => a + b, 0);
        const score = Math.round((correctSum / questions.length) * 100);
        setDone(true);
        onComplete(score, updatedResponses);
      }
    }, 1400);
  }

  function handleMCQSelect(i: number) {
    if (answerState !== "unanswered") return;
    const correctIdx = (current as { correctIndex: number }).correctIndex;
    const isCorrect = i === correctIdx;
    setSelectedOption(i);
    setAnswerState(isCorrect ? "correct" : "wrong");
    advance(isCorrect ? 1 : 0, i);
  }

  function handleFillBlankAnswer(correct: boolean) {
    setAnswerState(correct ? "correct" : "wrong");
    advance(correct ? 1 : 0, correct ? 1 : 0);
  }

  function handleMatchPairsAnswer(correctCount: number, total: number) {
    const fraction = total > 0 ? correctCount / total : 0;
    setAnswerState(fraction === 1 ? "correct" : "wrong");
    advance(fraction, correctCount);
  }

  if (done) return null;

  const progress = (currentIndex / questions.length) * 100;
  const type = current.type ?? "multiple_choice";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm text-foreground/50">
        <span>Quiz</span>
        <span>{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {type === "multiple_choice" && (
        <MultipleChoice
          question={current as Extract<ModuleQuizQuestion, { type?: "multiple_choice" }>}
          selectedOption={selectedOption}
          answerState={answerState}
          onSelect={handleMCQSelect}
        />
      )}

      {type === "fill_blank" && (
        <FillBlankInput
          question={current as Extract<ModuleQuizQuestion, { type: "fill_blank" }>}
          onAnswer={handleFillBlankAnswer}
        />
      )}

      {type === "scenario_decision" && (
        <ScenarioDecision
          question={current as Extract<ModuleQuizQuestion, { type: "scenario_decision" }>}
          selectedOption={selectedOption}
          answerState={answerState}
          onSelect={handleMCQSelect}
        />
      )}

      {type === "match_pairs" && (
        <MatchPairs
          question={current as Extract<ModuleQuizQuestion, { type: "match_pairs" }>}
          onAnswer={handleMatchPairsAnswer}
        />
      )}
    </div>
  );
}
