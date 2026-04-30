import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CHALLENGE_DAYS, WEEK_TITLES } from "@/data/challenge";
import { usePointsStore, MANGOES } from "@/store/pointsStore";

const CHALLENGE_PROGRESS_KEY = "kosh:challenge_progress";

function loadProgress(): Record<number, boolean> {
  try {
    const raw = localStorage.getItem(CHALLENGE_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(p: Record<number, boolean>) {
  localStorage.setItem(CHALLENGE_PROGRESS_KEY, JSON.stringify(p));
}

export default function Challenge() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const { addPoints } = usePointsStore();

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  function toggle(day: number) {
    const next = { ...progress };
    if (next[day]) {
      next[day] = false;
    } else {
      next[day] = true;
      addPoints(MANGOES.CHALLENGE_DAY, `Day ${day} challenge ✓`);
    }
    setProgress(next);
    saveProgress(next);
  }

  const completed = Object.values(progress).filter(Boolean).length;
  const pct = Math.round((completed / 30) * 100);
  const weeks = [1, 2, 3, 4];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 py-8 pb-20 space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <button onClick={() => navigate("/dashboard")} className="text-sm font-medium text-foreground/60 hover:text-foreground flex items-center gap-1 mb-3">
            ← Dashboard
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🗓️</span>
            <div>
              <h1 className="text-2xl font-bold text-foreground">30-Day Challenge</h1>
              <p className="text-muted-foreground text-sm">One action per day. +{MANGOES.CHALLENGE_DAY} 🥭 each.</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">{completed} / 30 days complete</span>
            <span className="text-sm font-bold text-primary">{pct}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          {completed === 30 && (
            <p className="text-sm text-green-600 font-semibold text-center">🎉 Challenge complete! Retest day unlocked.</p>
          )}
        </div>

        {/* Weeks */}
        {weeks.map((week) => {
          const days = CHALLENGE_DAYS.filter((d) => d.week === week);
          const weekComplete = days.filter((d) => progress[d.day]).length;
          return (
            <div key={week} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">{WEEK_TITLES[week]}</h2>
                <span className="text-xs text-muted-foreground">{weekComplete}/{days.length}</span>
              </div>
              <div className="space-y-2">
                {days.map((d) => {
                  const done = !!progress[d.day];
                  return (
                    <button
                      key={d.day}
                      onClick={() => toggle(d.day)}
                      className={`w-full text-left rounded-xl border p-4 flex items-start gap-4 transition-all ${
                        done
                          ? "border-green-500/30 bg-green-500/5"
                          : "border-border bg-card hover:border-primary/30"
                      }`}
                    >
                      <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        done ? "border-green-500 bg-green-500" : "border-border"
                      }`}>
                        {done && <span className="text-white text-xs font-bold">✓</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-muted-foreground">Day {d.day}</span>
                          <span className={`text-xs font-semibold ${done ? "text-green-600" : "text-foreground"}`}>
                            {d.title}
                          </span>
                        </div>
                        <p className={`text-sm leading-relaxed ${done ? "text-foreground/50 line-through" : "text-foreground/70"}`}>
                          {d.action}
                        </p>
                      </div>
                      {!done && (
                        <span className="text-xs text-primary font-semibold shrink-0 mt-1">+{MANGOES.CHALLENGE_DAY} 🥭</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Day 30 CTA */}
        {progress[30] && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-center space-y-3">
            <p className="text-2xl">🎯</p>
            <p className="font-semibold text-foreground">Day 30 — Retest time.</p>
            <p className="text-sm text-muted-foreground">See how much you've improved since your baseline.</p>
            <Link
              to="/check"
              className="block w-full bg-primary text-white rounded-xl py-3 font-semibold hover:bg-primary/90 transition-all"
            >
              Take the retest →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
