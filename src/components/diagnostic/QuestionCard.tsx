import type { DiagnosticQuestion } from "@/types/curriculum";
import type { DiagnosticResponse } from "@/types/diagnostic";
import { KnowledgeQuestion } from "./KnowledgeQuestion";
import { BehaviorQuestion } from "./BehaviorQuestion";
import { ConfidenceQuestion } from "./ConfidenceQuestion";

const DOMAIN_LABELS: Record<string, string> = {
  knowledge: "Knowledge",
  behavior: "Behavior",
  confidence: "Mindset",
};

const DOMAIN_COLORS: Record<string, string> = {
  knowledge: "bg-blue-100 text-blue-700",
  behavior: "bg-emerald-100 text-emerald-700",
  confidence: "bg-amber-100 text-amber-700",
};

interface Props {
  question: DiagnosticQuestion;
  questionNumber: number;
  onAnswer: (response: DiagnosticResponse) => void;
}

export function QuestionCard({ question, questionNumber, onAnswer }: Props) {
  const handleAnswer = (value: number, rawValue: number | string) => {
    onAnswer({ questionId: question.id, value, rawValue });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-400">
          Q{questionNumber}
        </span>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            DOMAIN_COLORS[question.domain]
          }`}
        >
          {DOMAIN_LABELS[question.domain]}
        </span>
      </div>

      {question.type === "knowledge" && (
        <KnowledgeQuestion question={question} onAnswer={handleAnswer} />
      )}
      {question.type === "behavior" && (
        <BehaviorQuestion question={question} onAnswer={handleAnswer} />
      )}
      {question.type === "confidence" && (
        <ConfidenceQuestion question={question} onAnswer={handleAnswer} />
      )}
    </div>
  );
}
