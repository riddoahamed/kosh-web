import { Component, type ReactNode } from "react";

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches React render-time errors and shows a friendly fallback instead of
 * a blank/black screen. Errors are logged to the console so they're visible
 * during diagnosis. The "Refresh" button hard-reloads the app.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Surface the failure so we can debug from DevTools console
    console.error("[kosh] render error:", error);
    console.error("[kosh] component stack:", info.componentStack);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  hardReload = () => {
    // Clear sessionStorage flags that gate one-time animations so the user
    // doesn't get stuck behind the cinematic intro on retry.
    try { sessionStorage.clear(); } catch (_) { /* ignore */ }
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "hsl(235, 50%, 11%)", color: "hsl(225, 29%, 97%)" }}
      >
        <div className="max-w-md w-full text-center space-y-5">
          <div
            className="inline-flex items-center justify-center h-16 w-16 rounded-2xl mx-auto"
            style={{
              background: "hsla(0, 75%, 55%, 0.12)",
              border: "1px solid hsla(0, 75%, 55%, 0.30)",
            }}
          >
            <span className="text-3xl">⚠</span>
          </div>
          <div className="space-y-2">
            <h1
              className="text-2xl font-extrabold tracking-tight"
              style={{ fontFamily: "Manrope, Inter, sans-serif" }}
            >
              Something glitched.
            </h1>
            <p className="text-sm" style={{ color: "hsla(225, 29%, 97%, 0.65)" }}>
              The page hit an error and stopped rendering. Refresh to try again — your progress is saved.
            </p>
          </div>

          <button
            onClick={this.hardReload}
            className="btn-brand inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-tight"
          >
            Refresh app
          </button>

          {this.state.error && (
            <details
              className="text-left text-xs leading-relaxed mt-6 p-3 rounded-lg"
              style={{
                background: "hsla(225, 29%, 97%, 0.04)",
                border: "1px solid hsla(225, 29%, 97%, 0.08)",
                color: "hsla(225, 29%, 97%, 0.55)",
              }}
            >
              <summary className="cursor-pointer font-semibold">Technical details</summary>
              <pre className="whitespace-pre-wrap mt-2 break-all">
                {this.state.error.message}
                {"\n\n"}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }
}
