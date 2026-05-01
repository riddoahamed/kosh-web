import React, { useState } from "react";
import type { Module } from "@/types/curriculum";
import { ActionPrompt } from "./ActionPrompt";
import { ModuleQuiz } from "./ModuleQuiz";
import { WhatsNextCard } from "./WhatsNextCard";
import { ModuleGame } from "./ModuleGame";
import { usePointsStore } from "@/store/pointsStore";

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
      elements.push(<div key={key++} className="h-1" />);
      continue;
    }

    const boldLine = line.replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-foreground'>$1</strong>");

    // Pure heading: entire line is **...**
    if (/^\*\*[^*]+\*\*$/.test(line.trim())) {
      elements.push(
        <p
          key={key++}
          className="font-semibold text-foreground text-sm mt-5 mb-0.5"
          dangerouslySetInnerHTML={{ __html: boldLine }}
        />
      );
    } else if (line.startsWith("- ") || line.startsWith("→ ") || line.startsWith("✓ ") || line.startsWith("✗ ")) {
      elements.push(
        <div key={key++} className="flex gap-2.5 text-sm leading-relaxed text-foreground/75">
          <span className="shrink-0 mt-px text-foreground/40">{line[0] === "-" ? "·" : line[0]}</span>
          <span dangerouslySetInnerHTML={{ __html: boldLine.replace(/^[-→✓✗]\s/, "") }} />
        </div>
      );
    } else {
      elements.push(
        <p
          key={key++}
          className="text-foreground/80 leading-relaxed text-sm"
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
  const { addPoints } = usePointsStore();
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
      <div className="rounded-2xl bg-primary/10 border border-primary/20 p-5">
        <p className="text-foreground/90 italic leading-relaxed text-[15px]">{module.hook}</p>
      </div>

      {/* Context */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground/35 uppercase tracking-widest">Context</p>
        <p className="text-foreground/70 leading-relaxed text-sm">{module.context}</p>
      </div>

      {/* Teaching */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-foreground/35 uppercase tracking-widest">
          What you need to know
        </p>
        <div className="space-y-2">{renderMarkdown(module.teaching)}</div>
      </div>

      {/* Rate Note (for modules with rate-sensitive info) */}
      {module.rateNote && (
        <div className="rounded-xl border border-blue-500/25 bg-blue-500/8 px-4 py-3 flex gap-2.5">
          <span className="text-blue-500 text-base mt-0.5 shrink-0">ℹ️</span>
          <p className="text-blue-600 dark:text-blue-400 text-xs leading-relaxed">{module.rateNote}</p>
        </div>
      )}

      {/* BD Example */}
      {module.bdExample && (
        <div className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5 space-y-2">
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            Bangladesh Example
          </p>
          <p className="text-foreground/75 text-sm leading-relaxed whitespace-pre-line">
            {module.bdExample}
          </p>
        </div>
      )}

      {/* Mini-game (optional bonus) */}
      {module.game && (
        <ModuleGame
          game={module.game}
          onComplete={(reward) => addPoints(reward, `Game: Module ${module.id} 🎮`)}
        />
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
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <p className="text-xs font-semibold text-foreground/35 uppercase tracking-widest">Quick check</p>
          <div className="h-px flex-1 bg-border" />
        </div>
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
