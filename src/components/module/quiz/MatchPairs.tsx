import { useState } from "react";
import type { MatchPairsQuestion } from "@/types/curriculum";

interface Props {
  question: MatchPairsQuestion;
  onAnswer: (correctCount: number, total: number) => void;
}

const PAIR_COLORS = [
  "border-primary/60 bg-primary/10",
  "border-amber-500/60 bg-amber-500/10",
  "border-rose-500/60 bg-rose-500/10",
  "border-violet-500/60 bg-violet-500/10",
  "border-cyan-500/60 bg-cyan-500/10",
  "border-emerald-500/60 bg-emerald-500/10",
];

export function MatchPairs({ question, onAnswer }: Props) {
  // pairings[leftIdx] = rightIdx, or undefined
  const [pairings, setPairings] = useState<Record<number, number>>({});
  const [pickedLeft, setPickedLeft] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const allPaired = Object.keys(pairings).length === question.leftItems.length;

  function handleLeftClick(i: number) {
    if (submitted) return;
    if (pairings[i] !== undefined) {
      // Unpair
      const next = { ...pairings };
      delete next[i];
      setPairings(next);
      setPickedLeft(null);
      return;
    }
    setPickedLeft(i);
  }

  function handleRightClick(i: number) {
    if (submitted || pickedLeft === null) return;
    // Remove any other left mapped to this right
    const next: Record<number, number> = {};
    for (const [l, r] of Object.entries(pairings)) {
      if (r !== i) next[Number(l)] = r;
    }
    next[pickedLeft] = i;
    setPairings(next);
    setPickedLeft(null);
  }

  function handleSubmit() {
    setSubmitted(true);
    let correct = 0;
    for (let l = 0; l < question.leftItems.length; l++) {
      if (pairings[l] === question.correctMapping[l]) correct++;
    }
    onAnswer(correct, question.leftItems.length);
  }

  function pairColor(leftIdx: number): string {
    const idx = Object.keys(pairings).map(Number).sort().indexOf(leftIdx);
    return PAIR_COLORS[idx % PAIR_COLORS.length];
  }

  function rightPairColor(rightIdx: number): string | null {
    for (const [l, r] of Object.entries(pairings)) {
      if (r === rightIdx) return pairColor(Number(l));
    }
    return null;
  }

  return (
    <div className="space-y-4">
      <p className="font-semibold text-foreground leading-snug">{question.question}</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {question.leftItems.map((item, i) => {
            const paired = pairings[i] !== undefined;
            const isCorrect = submitted && pairings[i] === question.correctMapping[i];
            const isWrong = submitted && pairings[i] !== question.correctMapping[i];
            let style = "w-full text-left rounded-xl border-2 px-3 py-2.5 text-xs transition-all ";
            if (submitted) {
              style += isCorrect
                ? "border-green-500/60 bg-green-500/10 text-green-700 dark:text-green-400"
                : isWrong
                  ? "border-red-400/60 bg-red-500/10 text-red-600 dark:text-red-400"
                  : "border-border";
            } else if (pickedLeft === i) {
              style += "border-primary bg-primary/15 ring-2 ring-primary/40";
            } else if (paired) {
              style += pairColor(i);
            } else {
              style += "border-border hover:border-primary/40 cursor-pointer";
            }
            return (
              <button key={i} className={style} onClick={() => handleLeftClick(i)} disabled={submitted}>
                {item}
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          {question.rightItems.map((item, i) => {
            const color = rightPairColor(i);
            const usedByLeft = Object.entries(pairings).find(([, r]) => r === i)?.[0];
            const isCorrect = submitted && usedByLeft !== undefined && question.correctMapping[Number(usedByLeft)] === i;
            const isWrong = submitted && usedByLeft !== undefined && question.correctMapping[Number(usedByLeft)] !== i;
            let style = "w-full text-left rounded-xl border-2 px-3 py-2.5 text-xs transition-all ";
            if (submitted) {
              style += isCorrect
                ? "border-green-500/60 bg-green-500/10 text-green-700 dark:text-green-400"
                : isWrong
                  ? "border-red-400/60 bg-red-500/10 text-red-600 dark:text-red-400"
                  : "border-border";
            } else if (color) {
              style += color;
            } else if (pickedLeft !== null) {
              style += "border-border hover:border-primary/40 cursor-pointer";
            } else {
              style += "border-border opacity-70";
            }
            return (
              <button key={i} className={style} onClick={() => handleRightClick(i)} disabled={submitted || pickedLeft === null}>
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allPaired}
          className="w-full bg-primary text-primary-foreground rounded-xl py-3 text-sm font-bold hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          Submit pairs
        </button>
      )}

      {submitted && (
        <div className="rounded-xl p-4 text-sm leading-relaxed bg-muted/40 border border-border text-foreground/75">
          {question.explanation}
        </div>
      )}
    </div>
  );
}
