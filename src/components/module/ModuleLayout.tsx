import React, { useEffect, useState } from "react";
import type { Module, InlineCheck as InlineCheckType } from "@/types/curriculum";
import { ActionPrompt } from "./ActionPrompt";
import { ModuleQuiz } from "./ModuleQuiz";
import { WhatsNextCard } from "./WhatsNextCard";
import { ModuleGame } from "./ModuleGame";
import { InlineCheck } from "./InlineCheck";
import { ActionNudge } from "./ActionNudge";
import { LessonFeedback } from "./LessonFeedback";
import { actionNudges } from "@/data/action_nudges";
import { usePointsStore } from "@/store/pointsStore";

interface ModuleLayoutProps {
  module: Module;
  initialActionCompleted: boolean;
  onActionComplete: () => void;
  onQuizComplete: (score: number, responses: Record<string, number>) => void;
  onModuleComplete: () => void;
}

// Inline renderer: splits on **bold** and emits React nodes. Replaces the
// previous regex-into-dangerouslySetInnerHTML pattern so any future module
// body containing literal HTML (or accidental script tags) renders as text
// instead of executing.
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function renderTable(lines: string[], key: string) {
  const rows = lines
    .filter((line) => !/^\s*\|\s*-+/.test(line))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
  const [head, ...body] = rows;
  if (!head) return null;
  return (
    <div key={key} className="overflow-x-auto rounded-xl border border-border my-2">
      <table className="w-full min-w-[400px] text-left text-sm">
        <thead className="bg-primary/10 text-foreground">
          <tr>
            {head.map((cell, i) => (
              <th key={i} className="px-3 py-2 font-semibold">
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {body.map((row, ri) => (
            <tr key={ri} className="bg-card/50">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 text-foreground/75">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactElement[] = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*\|/.test(line)) {
      const tableLines: string[] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        tableLines.push(lines[i]);
        i++;
      }
      const table = renderTable(tableLines, `table-${key++}`);
      if (table) elements.push(table);
      continue;
    }

    if (!line.trim()) {
      elements.push(<div key={key++} className="h-1" />);
      i++;
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);

    if (heading) {
      elements.push(
        <p key={key++} className="font-semibold text-foreground text-sm mt-5 mb-0.5">
          {renderInline(heading[2])}
        </p>
      );
    } else if (/^\*\*[^*]+\*\*$/.test(line.trim())) {
      elements.push(
        <p key={key++} className="font-semibold text-foreground text-sm mt-5 mb-0.5">
          {renderInline(line)}
        </p>
      );
    } else if (line.startsWith("- ") || line.startsWith("→ ") || line.startsWith("✓ ") || line.startsWith("✗ ")) {
      elements.push(
        <div key={key++} className="flex gap-2.5 text-sm leading-relaxed text-foreground/75">
          <span className="shrink-0 mt-px text-foreground/40">{line[0] === "-" ? "·" : line[0]}</span>
          <span>{renderInline(line.replace(/^[-→✓✗]\s/, ""))}</span>
        </div>
      );
    } else {
      elements.push(
        <p key={key++} className="text-foreground/80 leading-relaxed text-sm">
          {renderInline(line)}
        </p>
      );
    }

    i++;
  }

  return elements;
}

function renderTeachingWithChecks(teaching: string, checks?: InlineCheckType[]) {
  if (!checks || checks.length === 0) return renderMarkdown(teaching);

  const parts = teaching.split(/\{\{check:(\d+)\}\}/);
  const out: React.ReactElement[] = [];
  parts.forEach((part, idx) => {
    if (idx % 2 === 0) {
      if (part) out.push(<React.Fragment key={`md-${idx}`}>{renderMarkdown(part)}</React.Fragment>);
    } else {
      const check = checks[parseInt(part, 10) - 1];
      if (check) out.push(<InlineCheck key={`chk-${idx}`} check={check} />);
    }
  });
  return out;
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
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadProgress(Math.min(100, Math.max(0, progress)));
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  function handleQuizComplete(score: number, responses: Record<string, number>) {
    setQuizScore(score);
    setQuizDone(true);
    onQuizComplete(score, responses);
    onModuleComplete();
  }

  return (
    <div className="space-y-8">
      {/* Reading progress bar */}
      <div className="fixed top-0 inset-x-0 z-40 h-1 bg-transparent pointer-events-none">
        <div
          className="h-full bg-primary transition-[width] duration-150"
          style={{ width: `${readProgress}%` }}
          aria-hidden="true"
        />
      </div>

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
        <div className="space-y-2">{renderTeachingWithChecks(module.teaching, module.inlineChecks)}</div>
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

      {/* Action Nudge — real-world next step */}
      {(actionNudges[module.id] ?? module.actionNudge) && (
        <ActionNudge
          nudge={actionNudges[module.id] ?? module.actionNudge!}
          moduleId={module.id}
          onBonus={(amt, reason) => addPoints(amt, reason)}
        />
      )}

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
            currentModuleId={module.id}
            preview={module.whatsNext.preview}
            quizScore={quizScore!}
          />
        )}
      </div>

      {quizDone && <LessonFeedback moduleId={module.id} quizScore={quizScore} />}
    </div>
  );
}
