import { useState, useRef, useEffect } from "react";

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

export default function KoshAssistant() {
  const [open, setOpen] = useState(false);
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

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Kosh AI Assistant"
        className={`fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95 ${
          open ? "bg-foreground text-background" : "bg-primary text-white"
        }`}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <span className="text-xl">✨</span>
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
            <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">AI</span>
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
                      ? "bg-primary text-white rounded-br-sm"
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
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5">
                <p className="text-xs text-red-700">{error}</p>
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
                className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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
