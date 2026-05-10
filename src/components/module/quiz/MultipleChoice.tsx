import type { MultipleChoiceQuestion } from "@/types/curriculum";

interface Props {
  question: MultipleChoiceQuestion;
  selectedOption: number | null;
  answerState: "unanswered" | "correct" | "wrong";
  onSelect: (index: number) => void;
}

export function MultipleChoice({ question, selectedOption, answerState, onSelect }: Props) {
  return (
    <>
      <p className="font-semibold text-foreground leading-snug">
        {question.question ?? question.text}
      </p>
      <div className="space-y-2">
        {question.options.map((option, i) => {
          let style = "w-full text-left rounded-xl border-2 px-4 py-3 text-sm transition-all ";
          if (answerState === "unanswered") {
            style += "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
          } else if (i === question.correctIndex) {
            style += "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400 cursor-default";
          } else if (i === selectedOption && answerState === "wrong") {
            style += "border-red-400 bg-red-500/10 text-red-600 dark:text-red-400 cursor-default";
          } else {
            style += "border-border opacity-40 cursor-default";
          }
          return (
            <button key={i} className={style} onClick={() => onSelect(i)} disabled={answerState !== "unanswered"}>
              <span className="font-medium mr-2 text-foreground/40">{String.fromCharCode(65 + i)}.</span>
              {option}
            </button>
          );
        })}
      </div>
      {answerState !== "unanswered" && (
        <div
          className={`rounded-xl p-4 text-sm leading-relaxed ${
            answerState === "correct"
              ? "bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400"
              : "bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400"
          }`}
        >
          <span className="font-semibold mr-1">{answerState === "correct" ? "Correct." : "Not quite."}</span>
          {question.explanation}
        </div>
      )}
    </>
  );
}
