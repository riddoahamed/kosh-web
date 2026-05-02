import {
  Layers,
  BarChart3,
  CreditCard,
  Landmark,
  PiggyBank,
  TrendingUp,
  Brain,
  Building2,
  Compass,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// HSL accent per zone
export const ZONE_ACCENT: Record<string, string> = {
  "zone-1": "160 90% 45%",
  "zone-2": "262 83% 58%",
  "zone-3": "347 77% 50%",
  "zone-4": "38  92% 50%",
  "zone-5": "160 90% 45%",
  "zone-6": "217 91% 60%",
  "zone-7": "234 89% 64%",
  "zone-8": "199 89% 48%",
  "zone-9": "187 85% 43%",
};

const ZONE_ICON: Record<string, LucideIcon> = {
  "zone-1": Layers,
  "zone-2": BarChart3,
  "zone-3": CreditCard,
  "zone-4": Landmark,
  "zone-5": PiggyBank,
  "zone-6": TrendingUp,
  "zone-7": Brain,
  "zone-8": Building2,
  "zone-9": Compass,
};

interface ZoneIconProps {
  zoneId: string;
  size?: "sm" | "md" | "lg";
}

export function ZoneIcon({ zoneId, size = "md" }: ZoneIconProps) {
  const hsl = ZONE_ACCENT[zoneId] ?? "160 84% 42%";
  const Icon = ZONE_ICON[zoneId] ?? Layers;

  const dim = size === "sm" ? 32 : size === "lg" ? 56 : 44;
  const iconSize = size === "sm" ? 16 : size === "lg" ? 28 : 22;

  return (
    <div
      style={{
        width: dim,
        height: dim,
        borderRadius: size === "sm" ? 8 : 12,
        background: `hsla(${hsl} / 0.15)`,
        border: `1px solid hsla(${hsl} / 0.30)`,
        boxShadow: `0 0 18px hsla(${hsl} / 0.35), inset 0 1px 0 hsla(${hsl} / 0.15)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon
        size={iconSize}
        strokeWidth={1.75}
        style={{ color: `hsl(${hsl})`, filter: `drop-shadow(0 0 6px hsla(${hsl} / 0.7))` }}
      />
    </div>
  );
}

// Helpers re-exported so pages don't need to duplicate the accent map
export function accentBg(zoneId: string, opacity = 0.08) {
  const h = ZONE_ACCENT[zoneId] ?? "160 84% 42%";
  return { background: `hsla(${h} / ${opacity})`, borderColor: `hsla(${h} / 0.28)` };
}

export function accentText(zoneId: string) {
  const h = ZONE_ACCENT[zoneId] ?? "160 84% 42%";
  return { color: `hsl(${h})` };
}
