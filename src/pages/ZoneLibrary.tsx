import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ZONES } from "@/data/zones";
import { useProgressStore, CORE_MODULES } from "@/store/progressStore";
import { ZoneIcon, accentBg, accentText } from "@/components/shared/ZoneIcon";

export default function ZoneLibrary() {
  const navigate = useNavigate();
  const { load, progress } = useProgressStore();
  useEffect(() => { load(); }, [load]);

  const zone1Complete = CORE_MODULES.every((id) => progress[id]?.status === "completed");
  const comingSoon = ZONES.filter((z) => z.status === "coming_soon");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors mb-4 flex items-center gap-1"
          >
            ← Dashboard
          </button>
          <h1 className="text-2xl font-bold text-foreground">Learning Zones</h1>
          <p className="text-foreground/50 text-sm mt-1">
            9 zones. Pick any live zone after finishing Zone 1.
          </p>
        </div>

        {/* Zone 1 — always first */}
        {ZONES.filter((z) => z.id === "zone-1").map((zone) => (
          <div key={zone.id} className="mb-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full text-left rounded-2xl border-2 p-5 transition-all hover:shadow-md active:scale-[0.99]"
              style={accentBg(zone.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <ZoneIcon zoneId={zone.id} size="md" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest" style={accentText(zone.id)}>
                        Zone {zone.number} · Required
                      </span>
                      {zone1Complete && (
                        <span className="text-xs font-semibold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/25 px-2 py-0.5 rounded-full">
                          ✓ Complete
                        </span>
                      )}
                    </div>
                    <h2 className="text-base font-bold text-foreground">{zone.title}</h2>
                    <p className="text-foreground/55 text-xs mt-0.5">{zone.tagline}</p>
                    <p className="text-foreground/45 text-xs mt-2 leading-relaxed">{zone.description}</p>
                  </div>
                </div>
                <span className="text-foreground/30 text-lg mt-1">→</span>
              </div>
              <div className="mt-3 ml-[56px]">
                <span className="text-xs text-foreground/40">{zone.moduleCount} modules</span>
              </div>
            </button>
          </div>
        ))}

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">
            {zone1Complete ? "All zones unlocked" : "Unlocks after Zone 1"}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Zones 2–9 (live) */}
        <div className="space-y-3">
          {ZONES.filter((z) => z.id !== "zone-1" && z.status === "live").map((zone) => {
            const isLocked = !zone1Complete;
            return (
              <button
                key={zone.id}
                onClick={() => { if (!isLocked) navigate(`/zones/${zone.id}`); }}
                disabled={isLocked}
                className="w-full text-left rounded-2xl border-2 p-5 transition-all hover:shadow-md active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                style={isLocked ? {} : accentBg(zone.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <ZoneIcon zoneId={zone.id} size="md" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-bold uppercase tracking-widest"
                          style={isLocked ? {} : accentText(zone.id)}
                        >
                          Zone {zone.number}
                        </span>
                        {isLocked && (
                          <span className="text-xs text-foreground/40">🔒 Finish Zone 1 first</span>
                        )}
                      </div>
                      <h2 className="text-base font-bold text-foreground">{zone.title}</h2>
                      <p className="text-foreground/55 text-xs mt-0.5">{zone.tagline}</p>
                    </div>
                  </div>
                  {!isLocked && <span className="text-foreground/30 text-lg mt-1">→</span>}
                </div>
                <div className="mt-3 ml-[56px]">
                  <span className="text-xs text-foreground/40">{zone.moduleCount} modules</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Coming soon — only if any exist */}
        {comingSoon.length > 0 && (
          <div className="mt-6 space-y-2">
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">
              Coming soon
            </p>
            {comingSoon.map((zone) => (
              <div
                key={zone.id}
                className="rounded-xl border border-dashed border-border p-4 flex items-center gap-3 opacity-60"
              >
                <ZoneIcon zoneId={zone.id} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-foreground/60">
                    Zone {zone.number}: {zone.title}
                  </p>
                  <p className="text-xs text-foreground/40">{zone.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
