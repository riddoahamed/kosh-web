// ────────────────────────────────────────────────────────────────────────────
// Explainer hero visual content.
//
// Lives in the data layer (not the component) so authors can add or edit a
// panel without touching presentation code. The component (ExplainerHeroVisual)
// imports `getExplainerVisualContent` and renders it.
//
// Architecture: prefer the curated entry in VISUAL_CONTENT keyed by slug. If
// none exists, fall through to a heuristic builder that picks reasonable
// defaults from the explainer's visual.description and visual.type. The
// heuristic exists so that newly added explainers never render with empty
// panels — but anything intended to feel art-directed should get a curated
// entry here.
// ────────────────────────────────────────────────────────────────────────────

import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  Calendar,
  Check,
  Coins,
  Edit3,
  GitFork,
  Globe2,
  Heart,
  Home,
  List,
  ListChecks,
  Lock,
  Pause,
  PiggyBank,
  Scale,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Explainer } from "@/types/explainer";

export interface VisualPanel {
  label: string;
  value: string;
}

export interface VisualContent {
  title: string;
  description: string;
  panels: VisualPanel[];
}

// Icon name → component map. Centralized so visual.suggestedIcon and
// step-card icon names work the same way from data files.
export const ICONS: Record<string, LucideIcon> = {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  Calendar,
  Check,
  Coins,
  Edit3,
  GitFork,
  Globe2,
  Heart,
  Home,
  List,
  ListChecks,
  Lock,
  Pause,
  PiggyBank,
  Scale,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
};

export function resolveIcon(name?: string): LucideIcon {
  return (name && ICONS[name]) || ListChecks;
}

export const VISUAL_CONTENT: Record<string, VisualContent> = {
  "should-i-break-my-fdr-early": {
    title: "FDR break-even check",
    description: "Compare the new rate only after penalty, tax, lost interest, and liquidity needs.",
    panels: [
      { label: "1", value: "Penalty" },
      { label: "2", value: "Lost interest" },
      { label: "3", value: "Better off?" },
    ],
  },
  "lost-money-in-a-stock": {
    title: "Loss decision map",
    description: "Do not let embarrassment decide. Re-check the business, valuation, and your original reason.",
    panels: [
      { label: "Reason", value: "Still true?" },
      { label: "Business", value: "Worse?" },
      { label: "Cash today", value: "Buy again?" },
    ],
  },
  "family-asks-for-saved-money": {
    title: "Boundary guide",
    description: "Help without breaking your own emergency fund or future plan.",
    panels: [
      { label: "Limit", value: "Set first" },
      { label: "Words", value: "Say clearly" },
      { label: "Base", value: "Protect" },
    ],
  },
  "personal-loan-to-invest": {
    title: "Debt risk check",
    description: "Borrowing to invest can turn one bad decision into two payments: market loss plus loan interest.",
    panels: [
      { label: "Loan", value: "Fixed cost" },
      { label: "Market", value: "Uncertain" },
      { label: "Result", value: "Double hit" },
    ],
  },
  "first-one-lakh-saved": {
    title: "First Tk 1 lakh split",
    description: "Give the money jobs before chasing return. Stability first, investing second.",
    panels: [
      { label: "Safety", value: "Emergency" },
      { label: "Clean up", value: "Debt" },
      { label: "Grow", value: "Learn + invest" },
    ],
  },
  "fdr-vs-sanchayapatra-vs-dps": {
    title: "Product fit table",
    description: "The best option depends on access, tax, eligibility, return, and how soon you need the money.",
    panels: [
      { label: "FDR", value: "Flexible" },
      { label: "Sanchayapatra", value: "Rules matter" },
      { label: "DPS", value: "Habit builder" },
    ],
  },
  "gold-vs-fdr-vs-sanchayapatra": {
    title: "Three-way comparison",
    description: "Gold, FDR, and Sanchayapatra solve different problems. Do not compare return alone.",
    panels: [
      { label: "Gold", value: "Hedge" },
      { label: "FDR", value: "Liquidity" },
      { label: "Sanchayapatra", value: "Income" },
    ],
  },
  "mutual-funds-vs-direct-stocks-bangladesh": {
    title: "Risk and effort map",
    description: "Direct stocks need time, temperament, and research. Funds can reduce effort but still carry risk.",
    panels: [
      { label: "Effort", value: "Low to high" },
      { label: "Risk", value: "Still real" },
      { label: "Fit", value: "Time matters" },
    ],
  },
  "home-loan-vs-renting": {
    title: "Rent vs EMI preview",
    description: "Compare cash flow, down payment, job stability, location risk, and maintenance before deciding.",
    panels: [
      { label: "Rent", value: "Flexible" },
      { label: "EMI", value: "Long lock" },
      { label: "Buffer", value: "Required" },
    ],
  },
  "canada-building-credit-from-zero": {
    title: "Credit score path",
    description: "Start small, pay on time, keep usage low, and build history slowly.",
    panels: [
      { label: "Open", value: "Starter card" },
      { label: "Use", value: "Below limit" },
      { label: "Pay", value: "On time" },
    ],
  },
  "us-credit-building-bangladeshi-immigrants": {
    title: "Five-step credit path",
    description: "A thin credit file improves through simple repeatable actions, not shortcuts.",
    panels: [
      { label: "Account", value: "Open" },
      { label: "Credit", value: "Small line" },
      { label: "History", value: "Repeat" },
    ],
  },
  "middle-east-sending-money-home-smartly": {
    title: "Remittance flow",
    description: "Send money with a purpose: household needs, savings, debt, and future goals should be separate.",
    panels: [
      { label: "Send", value: "Official route" },
      { label: "Split", value: "By purpose" },
      { label: "Track", value: "Every month" },
    ],
  },
  "uk-isa-nrb-accounts-bangladeshis": {
    title: "Account comparison",
    description: "Keep UK goals and Bangladesh goals separate so tax, access, and currency risk stay clear.",
    panels: [
      { label: "UK", value: "ISA rules" },
      { label: "BD", value: "NRB access" },
      { label: "FX", value: "Currency risk" },
    ],
  },
  "australia-superannuation-basics-bangladeshis": {
    title: "Retirement bucket",
    description: "Super is long-term money. Treat it differently from remittance, emergency savings, and family support.",
    panels: [
      { label: "Now", value: "Cash buffer" },
      { label: "Home", value: "Remittance" },
      { label: "Future", value: "Super" },
    ],
  },
  "employee-finance-basics": {
    title: "Workplace money map",
    description: "Help employees connect salary, daily spending, emergencies, debt, and savings habits.",
    panels: [
      { label: "Salary", value: "Plan" },
      { label: "Debt", value: "Control" },
      { label: "Savings", value: "Automate" },
    ],
  },
  "employee-scam-awareness": {
    title: "Scam warning cards",
    description: "Teach the repeatable red flags: urgency, secrecy, advance fees, and pressure to act now.",
    panels: [
      { label: "Urgency", value: "Pause" },
      { label: "Fee first", value: "Reject" },
      { label: "Secret", value: "Verify" },
    ],
  },
  "salary-advance-vs-high-interest-loan": {
    title: "Cost comparison",
    description: "A fast loan can feel small today and become expensive across the month.",
    panels: [
      { label: "Advance", value: "Short gap" },
      { label: "Loan", value: "High cost" },
      { label: "Plan", value: "Next salary" },
    ],
  },
  "uk-credit-and-banking-for-newcomers": {
    title: "First 12 months in the UK",
    description: "Bangladesh credit history doesn't transfer. Build from scratch — bank account, electoral roll, credit-builder card.",
    panels: [
      { label: "Open", value: "UK bank" },
      { label: "Register", value: "Electoral roll" },
      { label: "Build", value: "Credit-builder card" },
    ],
  },
  "australia-financial-system-bangladeshi-newcomers": {
    title: "Setup in two weeks",
    description: "TFN before working, employer super contributions, three credit bureaus. Local banking is straightforward.",
    panels: [
      { label: "TFN", value: "Before work" },
      { label: "Super", value: "Employer-funded" },
      { label: "Bank", value: "Within 2 weeks" },
    ],
  },
  "us-investing-401k-ira-vs-bd-options": {
    title: "Tax-advantaged first",
    description: "401(k) employer match is free money. Roth vs traditional matters. Different category from Sanchaypatra.",
    panels: [
      { label: "Match", value: "Always take" },
      { label: "Roth", value: "Tax-free growth" },
      { label: "Traditional", value: "Deduct now" },
    ],
  },
  "canada-tfsa-rrsp-vs-bd-options": {
    title: "TFSA before RRSP",
    description: "TFSA: after-tax in, tax-free out. RRSP: deduct now, taxed later. Newcomers in low-income years start with TFSA.",
    panels: [
      { label: "TFSA", value: "Tax-free growth" },
      { label: "RRSP", value: "Deduct now" },
      { label: "Newcomer", value: "Start TFSA" },
    ],
  },
  "diaspora-investment-comparison-bd-vs-abroad": {
    title: "Where to anchor",
    description: "Returning in 5-10 years? Keep BD exposure. Settling abroad? Local tax-advantaged accounts come first.",
    panels: [
      { label: "Returning", value: "Anchor BD" },
      { label: "Settling", value: "Local first" },
      { label: "Both", value: "Diversify" },
    ],
  },
  "returning-home-financial-checklist": {
    title: "Pre-return checklist",
    description: "Close foreign accounts cleanly, plan year-one cash flow without abroad salary, handle tax residency change.",
    panels: [
      { label: "Close", value: "Foreign accounts" },
      { label: "Transfer", value: "Official channels" },
      { label: "Plan", value: "Year-one cash" },
    ],
  },
  "prepay-home-loan-or-invest": {
    title: "Rate vs net return",
    description: "Loan rate more than 1% above Sanchaypatra net return? Lean prepay. Lower? Lean invest. Never sacrifice the emergency fund.",
    panels: [
      { label: "Loan > +1%", value: "Prepay" },
      { label: "Loan < net", value: "Invest" },
      { label: "Always", value: "Keep buffer" },
    ],
  },
  "bkash-vs-bank-dps-comparison": {
    title: "Which DPS to start",
    description: "MFS DPS is the easier path for first-time small-amount savers. Bank DPS earns more on larger amounts.",
    panels: [
      { label: "MFS", value: "Easier start" },
      { label: "Bank", value: "Better rate" },
      { label: "First-time", value: "Start MFS" },
    ],
  },
  "should-i-open-bo-account-now": {
    title: "Open before you're ready",
    description: "Account opening takes 1-2 weeks. Doing it during a calm period prevents rushed first investments later.",
    panels: [
      { label: "Setup", value: "1-2 weeks" },
      { label: "Cost", value: "Tk 1-1.5k/yr" },
      { label: "Benefit", value: "No rush later" },
    ],
  },
};

function fallbackVisualTitle(explainer: Explainer): string {
  const description = explainer.visual.description.toLowerCase();
  if (description.includes("boundary")) return "Boundary guide";
  if (description.includes("warning")) return "Red flag guide";
  if (description.includes("credit")) return "Credit-building path";
  if (description.includes("allocation") || description.includes("windfall")) return "Allocation lens";
  if (description.includes("remittance")) return "Money flow";
  if (explainer.visual.type === "table") return "Comparison lens";
  if (explainer.visual.type === "chart") return "Tradeoff map";
  if (explainer.visual.type === "flowchart") return "Step-by-step path";
  if (explainer.visual.type === "checklist") return "Quick checklist";
  return "Decision lens";
}

function fallbackVisualDescription(explainer: Explainer): string {
  const description = explainer.visual.description.toLowerCase();
  if (description.includes("calculator")) {
    return "Run the numbers first. Compare after penalty, tax, lost interest, and liquidity.";
  }
  if (description.includes("boundary")) {
    return "Help without breaking your own emergency fund or future plan.";
  }
  if (description.includes("warning")) {
    return "Spot the danger signs before the offer feels urgent.";
  }
  if (description.includes("comparison") || explainer.visual.type === "table") {
    return "Compare fit, flexibility, return, risk, and access before choosing.";
  }
  if (description.includes("allocation") || description.includes("windfall")) {
    return "Split money by purpose before chasing return.";
  }
  if (description.includes("credit")) {
    return "Build slowly: account, small credit line, on-time payments, low usage.";
  }
  if (explainer.visual.type === "flowchart") {
    return "Follow the steps in order instead of deciding from pressure.";
  }
  return "Use this lens to turn the explainer into one clear next move.";
}

function fallbackVisualPanels(explainer: Explainer): VisualPanel[] {
  const description = explainer.visual.description.toLowerCase();
  if (description.includes("calculator")) return [
    { label: "1", value: "Calculate" },
    { label: "2", value: "Compare" },
    { label: "3", value: "Decide" },
  ];
  if (description.includes("boundary")) return [
    { label: "1", value: "Set limit" },
    { label: "2", value: "Say clearly" },
    { label: "3", value: "Protect base" },
  ];
  if (description.includes("warning")) return [
    { label: "1", value: "Pause" },
    { label: "2", value: "Check math" },
    { label: "3", value: "Walk away" },
  ];
  if (description.includes("credit")) return [
    { label: "1", value: "Open" },
    { label: "2", value: "Pay on time" },
    { label: "3", value: "Use less" },
  ];
  if (description.includes("allocation") || description.includes("windfall")) return [
    { label: "1", value: "Pause" },
    { label: "2", value: "Split" },
    { label: "3", value: "Act slowly" },
  ];
  if (explainer.visual.type === "table") return [
    { label: "1", value: "Compare" },
    { label: "2", value: "Check fit" },
    { label: "3", value: "Choose" },
  ];
  if (explainer.visual.type === "flowchart") return [
    { label: "1", value: "Start" },
    { label: "2", value: "Check" },
    { label: "3", value: "Next step" },
  ];
  return [
    { label: "1", value: "Read" },
    { label: "2", value: "Apply" },
    { label: "3", value: "Save" },
  ];
}

/**
 * Returns the panel-style visual content for an explainer. Prefers the curated
 * VISUAL_CONTENT entry; falls back to heuristic defaults so an unmapped
 * explainer never renders an empty hero.
 */
export function getExplainerVisualContent(explainer: Explainer): VisualContent {
  return VISUAL_CONTENT[explainer.slug] ?? {
    title: fallbackVisualTitle(explainer),
    description: fallbackVisualDescription(explainer),
    panels: fallbackVisualPanels(explainer),
  };
}
