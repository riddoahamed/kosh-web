import { Building2, HeartHandshake, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Explainer } from "@/types/explainer";
import { EXPLAINERS } from "./index";

export interface EmployerPack {
  id: string;
  slug: string;
  title: string;
  shortLabel: string;
  audience: string;
  description: string;
  language: "bn" | "mixed" | "en";
  languageLabel: string;
  icon: LucideIcon;
  accent: string;
  explainerSlugs: string[];
  completionReward: number;
}

export const EMPLOYER_PACKS: EmployerPack[] = [
  {
    id: "pack-rmg",
    slug: "pack-rmg",
    title: "RMG / Garment Workforce Pack",
    shortLabel: "RMG Pack",
    audience: "Factory HR teams, BGMEA / BKMEA partners, ILO programs",
    description:
      "Bangla-first explainers built for low-text accessibility. Designed for common-room TV loops, payroll inserts, and QR-code posters on the factory floor.",
    language: "bn",
    languageLabel: "বাংলা",
    icon: Building2,
    accent: "from-amber-500/20 to-orange-500/10",
    explainerSlugs: [
      "simple-savings-worker-wise",
      "safe-mobile-banking-worker-wise",
      "avoid-high-interest-loans-worker-wise",
      "bkash-dps-step-by-step-worker-wise",
      "emergency-fund-tk-200-worker-wise",
    ],
    completionReward: 100,
  },
  {
    id: "pack-ngo",
    slug: "pack-ngo",
    title: "NGO / INGO Financial Inclusion Pack",
    shortLabel: "NGO Pack",
    audience: "BRAC, ASA, World Vision, Plan, UNDP partners and similar programs",
    description:
      "Financial literacy for MFI customers, women's economic-empowerment groups, and low-income beneficiaries. Mixes Bangla worker-wise content with broader money decisions.",
    language: "mixed",
    languageLabel: "Bangla + English",
    icon: HeartHandshake,
    accent: "from-emerald-500/20 to-teal-500/10",
    explainerSlugs: [
      "avoid-high-interest-loans-worker-wise",
      "family-money-pressure-worker-wise",
      "safe-mobile-banking-worker-wise",
      "salary-advance-loans-worker-wise",
      "simple-savings-worker-wise",
      "first-job-money-decisions-worker-wise",
    ],
    completionReward: 100,
  },
  {
    id: "pack-corporate",
    slug: "pack-corporate",
    title: "Corporate / Office Staff Pack",
    shortLabel: "Corporate Pack",
    audience: "Corporate HR, CSR teams at banks, tech companies, multinationals",
    description:
      "Workplace financial literacy for white-collar employees. Covers salary basics, scam awareness, infrastructure decisions, and the loan-vs-invest tradeoff.",
    language: "en",
    languageLabel: "English",
    icon: Briefcase,
    accent: "from-sky-500/20 to-indigo-500/10",
    explainerSlugs: [
      "employee-finance-basics",
      "employee-scam-awareness",
      "salary-advance-vs-high-interest-loan",
      "should-i-open-bo-account-now",
      "prepay-home-loan-or-invest",
    ],
    completionReward: 100,
  },
];

export function getEmployerPack(slug: string | undefined): EmployerPack | undefined {
  return EMPLOYER_PACKS.find((pack) => pack.slug === slug);
}

export function getPackExplainers(pack: EmployerPack): Explainer[] {
  return pack.explainerSlugs
    .map((slug) => EXPLAINERS.find((item) => item.slug === slug))
    .filter((item): item is Explainer => Boolean(item));
}

export function getPackTotalMinutes(pack: EmployerPack): number {
  return getPackExplainers(pack).reduce((total, item) => total + item.readingTimeMinutes, 0);
}

const PACK_COMPLETION_KEY = "kosh:pack_completion";

interface PackCompletionRecord {
  awardedAt: string;
}

function readPackCompletion(): Record<string, PackCompletionRecord> {
  try {
    return JSON.parse(localStorage.getItem(PACK_COMPLETION_KEY) ?? "{}") as Record<string, PackCompletionRecord>;
  } catch {
    return {};
  }
}

function writePackCompletion(records: Record<string, PackCompletionRecord>) {
  localStorage.setItem(PACK_COMPLETION_KEY, JSON.stringify(records));
}

export function isPackAwarded(packSlug: string): boolean {
  return Boolean(readPackCompletion()[packSlug]);
}

export function markPackAwarded(packSlug: string) {
  const records = readPackCompletion();
  records[packSlug] = { awardedAt: new Date().toISOString() };
  writePackCompletion(records);
}
