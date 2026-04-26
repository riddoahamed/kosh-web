import { useState } from "react";

interface ActionPromptProps {
  text: string;
  cta: string;
  onComplete: () => void;
  completed: boolean;
}

export function ActionPrompt({ text, cta, onComplete, completed }: ActionPromptProps) {
  const [checked, setChecked] = useState(completed);

  function handleCheck() {
    if (!checked) {
      setChecked(true);
      onComplete();
    }
  }

  return (
    <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 space-y-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-primary text-xl">✏️</div>
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
            Your Action
          </p>
          <p className="text-foreground/80 leading-relaxed">{text}</p>
        </div>
      </div>

      <button
        onClick={handleCheck}
        disabled={checked}
        className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 font-semibold text-sm transition-all ${
          checked
            ? "bg-green-100 text-green-700 border-2 border-green-300 cursor-default"
            : "bg-primary text-white hover:bg-primary/90 active:scale-95"
        }`}
      >
        {checked ? (
          <>
            <span>✓</span>
            <span>Done</span>
          </>
        ) : (
          cta
        )}
      </button>
    </div>
  );
}
