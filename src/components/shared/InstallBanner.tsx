import { useEffect, useState } from "react";
import { X, Download, Share } from "lucide-react";

type Platform = "android" | "ios" | null;

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  return null;
}

function isInStandaloneMode(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigator as any).standalone === true
  );
}

export function InstallBanner() {
  const [platform, setPlatform] = useState<Platform>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);

  useEffect(() => {
    if (isInStandaloneMode()) return; // already installed
    if (localStorage.getItem("kosh:install-dismissed")) return;

    setPlatform(detectPlatform());

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function dismiss() {
    setDismissed(true);
    localStorage.setItem("kosh:install-dismissed", "1");
  }

  async function install() {
    if (!deferredPrompt) {
      setShowIOSHint(true);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (deferredPrompt as any).prompt();
    setDeferredPrompt(null);
    dismiss();
  }

  if (dismissed || !platform) return null;

  // Android with native prompt available
  if (platform === "android" && deferredPrompt) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl p-4 flex items-center gap-3 shadow-xl">
          <img src="/logo.png" alt="Kosh" className="h-10 w-10 rounded-xl shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Add Kosh to your home screen</p>
            <p className="text-xs text-muted-foreground">Works like an app — no Play Store needed</p>
          </div>
          <button
            onClick={install}
            className="flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-3 py-2 rounded-xl shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            Install
          </button>
          <button onClick={dismiss} className="text-muted-foreground hover:text-foreground shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // iOS — manual instructions
  if (platform === "ios") {
    if (showIOSHint) {
      return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
          <div className="max-w-lg mx-auto bg-card border border-primary/30 rounded-2xl p-4 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Install on iPhone</p>
              <button onClick={dismiss}><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <ol className="text-sm text-foreground/70 space-y-1 list-none">
              <li>1. Tap the <Share className="h-3.5 w-3.5 inline mb-0.5" /> <strong>Share</strong> button in Safari</li>
              <li>2. Scroll down → tap <strong>"Add to Home Screen"</strong></li>
              <li>3. Tap <strong>Add</strong> — done ✓</li>
            </ol>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl p-4 flex items-center gap-3 shadow-xl">
          <img src="/logo.png" alt="Kosh" className="h-10 w-10 rounded-xl shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Add Kosh to your home screen</p>
            <p className="text-xs text-muted-foreground">Open in Safari to install</p>
          </div>
          <button
            onClick={() => setShowIOSHint(true)}
            className="flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-3 py-2 rounded-xl shrink-0"
          >
            <Share className="h-3.5 w-3.5" />
            How?
          </button>
          <button onClick={dismiss} className="text-muted-foreground hover:text-foreground shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
