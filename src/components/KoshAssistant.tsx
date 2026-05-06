import { useState, useRef, useEffect } from "react";
import { useUIStore } from "@/store/uiStore";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const EDGE_FN_URL = import.meta.env.VITE_SUPABASE_URL
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/kosh-assistant`
  : null;

const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";

const STARTERS = [
  "What's the difference between FDR and Sanchaypatra?",
  "How do I calculate my EMI?",
  "Should I pay off debt or invest?",
  "What is lifestyle inflation?",
];

// First-visit greeting nudge — shown once per device after a delay so users
// notice the AI exists. Persists with localStorage so it doesn't spam.
const NUDGE_KEY      = "kosh:ai_nudge_seen";
const NUDGE_DELAY_MS = 5500;   // wait this long before showing
const NUDGE_LIFE_MS  = 8500;   // auto-dismiss after this long

export default function KoshAssistant() {
  const { aiWidgetHidden } = useUIStore();
  const [open, setOpen] = useState(false);
  const [nudgeOpen, setNudgeOpen]    = useState(false);
  const [nudgeExiting, setNudgeExiting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Focus input when opening
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  // First-visit greeting nudge orchestration
  useEffect(() => {
    if (aiWidgetHidden) return;
    if (typeof window === "undefined") return;
    if (localStorage.getItem(NUDGE_KEY)) return; // already shown before

    const showT = setTimeout(() => setNudgeOpen(true), NUDGE_DELAY_MS);
    const exitT = setTimeout(() => setNudgeExiting(true), NUDGE_DELAY_MS + NUDGE_LIFE_MS);
    const hideT = setTimeout(() => {
      setNudgeOpen(false);
      localStorage.setItem(NUDGE_KEY, "1");
    }, NUDGE_DELAY_MS + NUDGE_LIFE_MS + 350);

    return () => { clearTimeout(showT); clearTimeout(exitT); clearTimeout(hideT); };
  }, [aiWidgetHidden]);

  // Dismiss nudge as soon as the user opens the assistant
  useEffect(() => {
    if (open && nudgeOpen) {
      setNudgeExiting(true);
      const t = setTimeout(() => {
        setNudgeOpen(false);
        localStorage.setItem(NUDGE_KEY, "1");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open, nudgeOpen]);

  function dismissNudge() {
    setNudgeExiting(true);
    setTimeout(() => {
      setNudgeOpen(false);
      localStorage.setItem(NUDGE_KEY, "1");
    }, 300);
  }

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      if (!EDGE_FN_URL) throw new Error("AI assistant is not configured.");

      // Use anon key (edge function validates it)
      const token = ANON_KEY;

      const response = await fetch(EDGE_FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error ?? `Request failed (${response.status})`);
      }

      const data = await response.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.content ?? "Sorry, I couldn't generate a response.",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function handleStarter(q: string) {
    sendMessage(q);
  }

  if (aiWidgetHidden) return null;

  return (
    <>
      {/* First-visit greeting nudge — appears after a short delay so users
          notice the AI exists. Click bubble = open assistant. ✕ = dismiss. */}
      {nudgeOpen && (
        <div
          className="fixed bottom-20 right-5 z-40 max-w-[260px]"
          style={{
            animation: nudgeExiting
              ? "ai-bubble-out 0.3s ease forwards"
              : "ai-bubble-in 0.45s cubic-bezier(0.16,1,0.3,1) forwards",
            transformOrigin: "bottom right",
          }}
        >
          <button
            onClick={() => { dismissNudge(); setOpen(true); }}
            className="relative w-full text-left rounded-2xl px-3.5 py-3 pr-9 text-[13px] leading-snug font-medium transition-all hover:scale-[1.02] active:scale-[0.99]"
            style={{
              background: "linear-gradient(135deg, hsl(235, 50%, 12%) 0%, hsl(240, 60%, 14%) 100%)",
              color: "hsl(225, 29%, 97%)",
              border: "1px solid hsla(87, 100%, 68%, 0.35)",
              boxShadow:
                "0 0 24px hsla(87, 100%, 68%, 0.25), 0 8px 28px hsla(235, 60%, 4%, 0.5), inset 0 1px 0 hsla(225, 29%, 97%, 0.06)",
            }}
          >
            <span style={{ color: "hsl(87,100%,68%)", fontWeight: 700, fontFamily: "Manrope, Inter, sans-serif" }}>
              Hi! I'm Kosh AI{" "}
              <span style={{ filter: "drop-shadow(0 0 4px hsla(87,100%,68%,0.6))" }}>✨</span>
            </span>
            <br />
            <span style={{ opacity: 0.75 }}>
              Stuck on a money question? Just ask.
            </span>

            {/* tail pointing to the AI button */}
            <span
              aria-hidden="true"
              className="absolute"
              style={{
                bottom: -7,
                right: 18,
                width: 14,
                height: 14,
                background: "hsl(235, 50%, 12%)",
                borderRight: "1px solid hsla(87, 100%, 68%, 0.35)",
                borderBottom: "1px solid hsla(87, 100%, 68%, 0.35)",
                transform: "rotate(45deg)",
              }}
            />
          </button>
          {/* dismiss × */}
          <button
            onClick={(e) => { e.stopPropagation(); dismissNudge(); }}
            aria-label="Dismiss"
            className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-opacity hover:opacity-100"
            style={{
              background: "hsla(225, 29%, 97%, 0.08)",
              color: "hsl(225, 29%, 97%)",
              opacity: 0.6,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating button — cobalt blue + neon lime */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Kosh AI Assistant"
        className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
        style={{
          background: open ? "#1e293b" : "#1d4ed8",
          boxShadow: open
            ? "0 0 0 1.5px #a3e635, 0 4px 16px rgba(29,78,216,0.3)"
            : nudgeOpen
            ? "0 0 0 2px #a3e635, 0 0 22px rgba(163,230,53,0.55), 0 0 36px rgba(29,78,216,0.5), 0 4px 12px rgba(0,0,0,0.3)"
            : "0 0 16px rgba(29,78,216,0.5), 0 0 32px rgba(163,230,53,0.15), 0 4px 12px rgba(0,0,0,0.3)",
          border: "1.5px solid #a3e635",
        }}
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <span className="text-base" style={{ filter: "drop-shadow(0 0 4px #a3e635)" }}>✨</span>
        )}
      </button>

      {/* Chat drawer */}
      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-[min(360px,calc(100vw-2.5rem))] flex flex-col rounded-2xl shadow-2xl border border-border bg-background overflow-hidden"
          style={{ maxHeight: "min(520px, calc(100dvh - 130px))" }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-card flex items-center justify-between shrink-0">
            <div>
              <p className="text-sm font-bold text-foreground">Kosh Assistant</p>
              <p className="text-xs text-foreground/50">Ask anything about money in Bangladesh</p>
            </div>
            <span
              className="text-xs font-bold px-2.5 py-0.5 rounded-full"
              style={{ background: "rgba(29,78,216,0.15)", color: "#a3e635", border: "1px solid rgba(163,230,53,0.3)" }}
            >AI</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-xs text-foreground/50 text-center pt-2">
                  Hi! I'm here to help you understand personal finance in Bangladesh. Try a question:
                </p>
                <div className="space-y-2">
                  {STARTERS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleStarter(q)}
                      className="w-full text-left text-xs rounded-xl border border-border px-3 py-2.5 text-foreground/70 hover:border-primary/40 hover:bg-primary/3 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card border border-border text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 pb-3 pt-2 border-t border-border shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question…"
                rows={1}
                disabled={loading}
                className="flex-1 resize-none rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/60 transition-colors leading-relaxed max-h-28 overflow-y-auto disabled:opacity-60"
                style={{ minHeight: "42px" }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-foreground/30 text-center mt-1.5">
              AI responses are educational, not financial advice.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
