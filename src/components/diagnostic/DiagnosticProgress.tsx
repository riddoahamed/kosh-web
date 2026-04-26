import { Progress } from "@/components/ui/progress";
import { useDiagnosticStore } from "@/store/diagnosticStore";
import { allDiagnosticQuestions } from "@/data/diagnosticQuestions";

export function DiagnosticProgress() {
  const { currentIndex, showGreyZone } = useDiagnosticStore();
  const total = allDiagnosticQuestions.length + 1;
  const current = showGreyZone ? total : currentIndex + 1;
  const percent = Math.round((current / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Question {current} of {total}</span>
        <span>{percent}%</span>
      </div>
      <Progress value={percent} />
    </div>
  );
}
