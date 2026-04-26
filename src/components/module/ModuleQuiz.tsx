import { useState } from "react";
import type { ModuleQuizQuestion } from "@/types/curriculum";

interface ModuleQuizProps {
  questions: ModuleQuizQuestion[];
  onComplete: (score: number, responses: Record<string, number>) => void;
}

type AnswerState = "unanswered" | "correct" | "wrong";

export function ModuleQuiz({ questions, onComplete }: ModuleQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const current = questions[currentIndex];

  function handleSelect(optionIndex: number) {
    if (answerState !== "unanswered") return;

    const isCorrect = optionIndex === current.correctIndex;
    setSelectedOption(optionIndex);
    setAnswerState(isCorrect ? "correct" : "wrong");
    setResponses((prev) => ({ ...prev, [current.id]: optionIndex }));

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
        setAnswerState("unanswered");
        setSelectedOption(null);
      } else {
        const allResponses = { ...responses, [current.id]: optionIndex };
        const correctCount = questions.filter(
          (q) => allResponses[q.id] === q.correctIndex
        ).length;
        const score = Math.round((correctCount / questions.length) * 100);
        setDone(true);
        onComplete(score, allResponses);
      }
    }, 1400);
  }

  if (done) return null;

  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm text-foreground/50">
        <span>Quiz</span>
        <span>
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="font-semibold text-foreground leading-snug">{current.text}</p>

      <div className="space-y-2">
        {current.options.map((option, i) => {
          let style =
            "w-full text-left rounded-xl border-2 px-4 py-3 text-sm transition-all ";

          if (answerState === "unanswered") {
            style += "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
          } else if (i === current.correctIndex) {
            style += "border-green-500 bg-green-50 text-green-800 cursor-default";
          } else if (i === selectedOption && answerState === "wrong") {
            style += "border-red-400 bg-red-50 text-red-800 cursor-default";
          } else {
            style += "border-border opacity-50 cursor-default";
          }

          return (
            <button key={i} className={style} onClick={() => handleSelect(i)}>
              <span className="font-medium mr-2 text-foreground/40">
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {answerState !== "unanswered" && (
        <div
          className={`rounded-xl p-4 text-sm leading-relaxed ${
            answerState === "correct"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-amber-50 border border-amber-200 text-amber-800"
          }`}
        >
          <span className="font-semibold mr-1">
            {answerState === "correct" ? "Correct." : "Not quite."}
          </span>
          {current.explanation}
        </div>
      )}
    </div>
  );
}
