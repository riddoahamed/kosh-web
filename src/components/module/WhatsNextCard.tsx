import { useNavigate } from "react-router-dom";

interface WhatsNextCardProps {
  moduleId: string;
  preview: string;
  quizScore: number;
}

export function WhatsNextCard({ moduleId, preview, quizScore }: WhatsNextCardProps) {
  const navigate = useNavigate();

  const scoreColor =
    quizScore === 100
      ? "text-green-600"
      : quizScore >= 67
      ? "text-primary"
      : "text-amber-600";

  function handleContinue() {
    if (moduleId === "dashboard") {
      navigate("/dashboard");
    } else if (moduleId.startsWith("zone-")) {
      navigate(`/zones/${moduleId}`);
    } else {
      navigate(`/module/${moduleId}`);
    }
  }

  return (
    <div className="rounded-2xl border-2 border-border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground/50 uppercase tracking-wide">
          Module Complete
        </p>
        <span className={`text-sm font-bold ${scoreColor}`}>
          Quiz: {quizScore}%
        </span>
      </div>

      <p className="text-foreground/70 text-sm leading-relaxed">{preview}</p>

      <button
        onClick={handleContinue}
        className="w-full rounded-xl bg-primary text-primary-foreground py-3 font-semibold text-sm hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <span>
          {moduleId === "dashboard"
            ? "Go to Dashboard"
            : moduleId.startsWith("zone-")
            ? "Zone Complete →"
            : "Continue →"}
        </span>
      </button>
    </div>
  );
}
