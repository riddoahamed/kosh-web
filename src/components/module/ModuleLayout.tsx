import React, { useState } from "react";
import type { Module } from "@/types/curriculum";
import { ActionPrompt } from "./ActionPrompt";
import { ModuleQuiz } from "./ModuleQuiz";
import { WhatsNextCard } from "./WhatsNextCard";

interface ModuleLayoutProps {
  module: Module;
  initialActionCompleted: boolean;
  onActionComplete: () => void;
  onQuizComplete: (score: number, responses: Record<string, number>) => void;
  onModuleComplete: () => void;
}

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactElement[] = [];
  let key = 0;

  for (const line of lines) {
    if (!line.trim()) {
      elements.push(<div key={key++} className="h-2" />);
      continue;
    }

    const boldLine = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    if (line.startsWith("**") && line.endsWith("**") && line.indexOf("**", 2) === line.length - 2) {
      elements.push(
        <p
          key={key++}
          className="font-semibold text-foreground mt-4 mb-1"
          dangerouslySetInnerHTML={{ __html: boldLine }}
        />
      );
    } else if (line.startsWith("- ") || line.startsWith("→ ") || line.startsWith("✓ ") || line.startsWith("✗ ")) {
      elements.push(
        <p
          key={key++}
          className="text-foreground/75 pl-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: boldLine }}
        />
      );
    } else {
      elements.push(
        <p
          key={key++}
          className="text-foreground/80 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: boldLine }}
        />
      );
    }
  }

  return elements;
}

export function ModuleLayout({
  module,
  initialActionCompleted,
  onActionComplete,
  onQuizComplete,
  onModuleComplete,
}: ModuleLayoutProps) {
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);

  function handleQuizComplete(score: number, responses: Record<string, number>) {
    setQuizScore(score);
    setQuizDone(true);
    onQuizComplete(score, responses);
    onModuleComplete();
  }

  return (
    <div className="space-y-8">
      {/* Hook */}
      <div className="rounded-2xl bg-primary/8 border border-primary/20 p-5">
        <p className="text-foreground/90 italic leading-relaxed text-[15px]">{module.hook}</p>
      </div>

      {/* Context */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">Context</p>
        <p className="text-foreground/70 leading-relaxed text-sm">{module.context}</p>
      </div>

      {/* Teaching */}
      <div className="space-y-1">
        <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">
          What you need to know
        </p>
        <div className="space-y-0.5">{renderMarkdown(module.teaching)}</div>
      </div>

      {/* Rate Note (for modules with rate-sensitive info) */}
      {module.rateNote && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 flex gap-2.5">
          <span className="text-blue-500 text-base mt-0.5 shrink-0">ℹ️</span>
          <p className="text-blue-800 text-xs leading-relaxed">{module.rateNote}</p>
        </div>
      )}

      {/* BD Example */}
      {module.bdExample && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 space-y-2">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest">
            Bangladesh Example
          </p>
          <p className="text-amber-900/80 text-sm leading-relaxed whitespace-pre-line">
            {module.bdExample}
          </p>
        </div>
      )}

      {/* Action Prompt */}
      <ActionPrompt
        text={module.actionPrompt.text}
        cta={module.actionPrompt.cta ?? module.actionPrompt.ctaButtonText ?? "Done"}
        completed={initialActionCompleted}
        onComplete={onActionComplete}
      />

      {/* Quiz */}
      <div className="space-y-4">
        <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">
          Quick check
        </p>
        {!quizDone ? (
          <ModuleQuiz questions={module.quiz} onComplete={handleQuizComplete} />
        ) : (
          <WhatsNextCard
            moduleId={
              module.whatsNext.moduleId ??
              module.whatsNext.nextModuleId ??
              module.zoneId ??
              "dashboard"
            }
            preview={module.whatsNext.preview}
            quizScore={quizScore!}
          />
        )}
      </div>
    </div>
  );
}
