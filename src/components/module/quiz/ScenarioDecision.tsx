import type { ScenarioDecisionQuestion } from "@/types/curriculum";

interface Props {
  question: ScenarioDecisionQuestion;
  selectedOption: number | null;
  answerState: "unanswered" | "correct" | "wrong";
  onSelect: (index: number) => void;
}

export function ScenarioDecision({ question, selectedOption, answerState, onSelect }: Props) {
  const revealed = answerState !== "unanswered";

  return (
    <>
      <div className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-4 space-y-1">
        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Scenario</p>
        <p className="text-sm text-foreground/85 leading-relaxed">{question.scenario}</p>
      </div>

      <p className="font-semibold text-foreground leading-snug">{question.question}</p>

      <div className="space-y-2">
        {question.options.map((option, i) => {
          let style = "w-full text-left rounded-xl border-2 px-4 py-3 text-sm transition-all ";
          if (!revealed) {
            style += "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
          } else if (i === question.correctIndex) {
            style += "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400 cursor-default";
          } else if (i === selectedOption) {
            style += "border-red-400 bg-red-500/10 text-red-600 dark:text-red-400 cursor-default";
          } else {
            style += "border-border opacity-50 cursor-default";
          }
          return (
            <button key={i} className={style} onClick={() => onSelect(i)} disabled={revealed}>
              <span className="font-medium mr-2 text-foreground/40">{String.fromCharCode(65 + i)}.</span>
              {option}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="space-y-2">
          {question.options.map((_opt, i) => (
            <div
              key={i}
              className={`rounded-lg p-3 text-xs leading-relaxed ${
                i === question.correctIndex
                  ? "bg-green-500/8 border border-green-500/25 text-green-700 dark:text-green-400"
                  : i === selectedOption
                    ? "bg-red-500/8 border border-red-500/25 text-red-600 dark:text-red-400"
                    : "bg-muted/40 border border-border text-foreground/55"
              }`}
            >
              <span className="font-semibold mr-1.5">{String.fromCharCode(65 + i)}.</span>
              {question.optionExplanations[i] ?? ""}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
