// ============================================================
// KOSH — PATH FINDER
// 3-question wizard that routes users to the most relevant explainer/zone
// 
// Flow:
//   Q1: What brought you here? (6 options)
//   Q2: Refinement (depends on Q1)
//   Q3: (rare) further refinement for scenario decisions
//   → Direct link to recommended explainer + 2-3 alternatives
// ============================================================

export type PathFinderIntent =
  | "decide"        // specific money decision
  | "compare"       // weighing options
  | "diaspora"      // abroad / NRB
  | "teach"         // employer/NGO packs
  | "learn"         // systematic learning → diagnostic
  | "browse";       // just looking

export interface PathFinderOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;       // lucide icon name
}

export interface PathFinderQuestion {
  id: string;
  question: string;
  options: PathFinderOption[];
}

export interface PathFinderRecommendation {
  primaryHref: string;      // direct route to the best match
  primaryLabel: string;     // human-readable label of the destination
  primaryReason: string;    // 1-sentence explanation of why this fits
  alternatives: Array<{
    href: string;
    label: string;
    type: "explainer" | "module" | "calculator" | "zone";
  }>;
}

// ─────────────────────────────────────────────────────────────
// Q1: ENTRY POINT
// ─────────────────────────────────────────────────────────────

export const pathFinderQ1: PathFinderQuestion = {
  id: "intent",
  question: "What brought you here today?",
  options: [
    {
      id: "decide",
      label: "I need to make a specific money decision",
      description: "FDR, loan, investment, family money question",
      icon: "Waypoints",
    },
    {
      id: "compare",
      label: "I want to compare options before choosing",
      description: "Side-by-side product comparisons",
      icon: "Scale",
    },
    {
      id: "diaspora",
      label: "I'm Bangladeshi living abroad (or planning to move)",
      description: "Credit, taxes, sending money home, investing",
      icon: "Globe2",
    },
    {
      id: "teach",
      label: "I want to teach my team or community",
      description: "Workplace, NGO, blue-collar workforce education",
      icon: "Users",
    },
    {
      id: "learn",
      label: "I want to learn systematically from the start",
      description: "Take the diagnostic and follow a path",
      icon: "GraduationCap",
    },
    {
      id: "browse",
      label: "I just want to browse",
      description: "Show me everything",
      icon: "Search",
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Q2: BRANCHED BY Q1
// ─────────────────────────────────────────────────────────────

export const pathFinderQ2_decide: PathFinderQuestion = {
  id: "decide_topic",
  question: "What kind of decision?",
  options: [
    {
      id: "savings",
      label: "Where to put my savings",
      description: "FDR, Sanchaypatra, DPS, gold — which one",
    },
    {
      id: "debt",
      label: "Dealing with debt or a loan",
      description: "Personal loan, home loan, credit card balance",
    },
    {
      id: "investing",
      label: "First-time investing",
      description: "Stocks, mutual funds, getting started",
    },
    {
      id: "family",
      label: "Family-related money question",
      description: "Family asking for money, parents' finances",
    },
    {
      id: "scam",
      label: "I think I'm being targeted by a scam",
      description: "MLM, suspicious investment, pressure to invest",
    },
    {
      id: "windfall",
      label: "I just received a large amount",
      description: "Inheritance, bonus, gratuity, sudden money",
    },
  ],
};

export const pathFinderQ2_compare: PathFinderQuestion = {
  id: "compare_topic",
  question: "What are you comparing?",
  options: [
    {
      id: "savings_products",
      label: "Sanchaypatra vs FDR vs DPS",
      description: "The main safe savings options",
    },
    {
      id: "dps_providers",
      label: "bKash DPS vs bank DPS",
      description: "Mobile money DPS vs traditional bank DPS",
    },
    {
      id: "inflation_hedges",
      label: "Gold vs FDR vs Sanchaypatra",
      description: "Which actually protects against inflation",
    },
    {
      id: "rent_buy",
      label: "Renting vs buying property",
      description: "Home purchase math",
    },
    {
      id: "mutual_stocks",
      label: "Mutual funds vs direct stocks",
      description: "Which way to enter the equity market",
    },
  ],
};

export const pathFinderQ2_diaspora: PathFinderQuestion = {
  id: "diaspora_country",
  question: "Which country?",
  options: [
    { id: "canada", label: "Canada", icon: "Flag" },
    { id: "us", label: "United States", icon: "Flag" },
    { id: "uk", label: "United Kingdom", icon: "Flag" },
    { id: "australia", label: "Australia", icon: "Flag" },
    { id: "middle_east", label: "Middle East (UAE, Saudi, Qatar, etc.)", icon: "Flag" },
    { id: "other", label: "Somewhere else or not yet decided", icon: "Globe2" },
  ],
};

export const pathFinderQ2_teach: PathFinderQuestion = {
  id: "teach_audience",
  question: "Who are you teaching?",
  options: [
    {
      id: "rmg",
      label: "RMG / garment factory workers",
      description: "Bangla-first content, simple and visual",
    },
    {
      id: "ngo",
      label: "NGO / INGO beneficiaries",
      description: "Financial inclusion content for MFI customers, women's groups",
    },
    {
      id: "corporate",
      label: "Corporate office staff",
      description: "Workplace financial literacy for white-collar employees",
    },
  ],
};

// Q1 = browse or learn → no Q2, direct routing
// (handled in route resolution below)

// ─────────────────────────────────────────────────────────────
// Q3: ONLY FOR SAVINGS DECISIONS (most granular branch)
// ─────────────────────────────────────────────────────────────

export const pathFinderQ3_savings: PathFinderQuestion = {
  id: "savings_situation",
  question: "What's your current situation?",
  options: [
    {
      id: "first_savings",
      label: "I'm saving my first Tk 1 lakh",
      description: "Building the initial savings foundation",
    },
    {
      id: "have_fdr",
      label: "I have an active FDR considering early withdrawal",
      description: "Break the FDR or wait?",
    },
    {
      id: "have_savings_account",
      label: "I have Tk 2-10 lakh sitting in a savings account",
      description: "Should I move it to higher-return products?",
    },
    {
      id: "starting_dps",
      label: "I want to start a DPS but don't know which one",
      description: "bKash vs bank DPS, what to choose",
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// ROUTING TABLE — maps answers to recommendations
// ─────────────────────────────────────────────────────────────

export function getPathFinderRecommendation(answers: {
  q1: string;
  q2?: string;
  q3?: string;
}): PathFinderRecommendation {

  // Q1 direct routes
  if (answers.q1 === "browse") {
    return {
      primaryHref: "/explainers",
      primaryLabel: "Browse all explainers",
      primaryReason: "All categories in one place — search or filter to find what you need.",
      alternatives: [
        { href: "/zones", label: "Browse all zones", type: "zone" },
        { href: "/dashboard", label: "Your dashboard", type: "module" },
      ],
    };
  }

  if (answers.q1 === "learn") {
    return {
      primaryHref: "/age-select",
      primaryLabel: "Start the diagnostic",
      primaryReason: "A short assessment helps Kosh recommend the right starting point for you.",
      alternatives: [
        { href: "/zones", label: "Browse zones without diagnostic", type: "zone" },
        { href: "/module/1", label: "Skip to Module 1", type: "module" },
      ],
    };
  }

  // Q1 = decide
  if (answers.q1 === "decide") {
    switch (answers.q2) {
      case "savings":
        // Drill into Q3
        switch (answers.q3) {
          case "first_savings":
            return rec("/explainers/scenario/first-one-lakh-saved", "What to do with your first Tk 1 lakh",
              "Building your foundation correctly matters more than the specific instrument choice.",
              [
                { href: "/explainers/comparison/fdr-vs-sanchayapatra-vs-dps", label: "Compare safe savings options", type: "explainer" },
                { href: "/portfolio-builder", label: "Try the Portfolio Builder", type: "calculator" },
              ]);
          case "have_fdr":
            return rec("/explainers/scenario/should-i-break-my-fdr-early", "Should I break my FDR early?",
              "The math of premature withdrawal is rarely what people expect.",
              [
                { href: "/fdr-calculator", label: "FDR Calculator", type: "calculator" },
              ]);
          case "have_savings_account":
            return rec("/explainers/comparison/fdr-vs-sanchayapatra-vs-dps", "FDR vs Sanchaypatra vs DPS",
              "Compare the three main safe savings instruments side by side.",
              [
                { href: "/explainers/scenario/first-one-lakh-saved", label: "What to do with savings", type: "explainer" },
                { href: "/comparator", label: "Savings Comparator tool", type: "calculator" },
              ]);
          case "starting_dps":
            return rec("/explainers/comparison/bkash-vs-bank-dps-comparison", "bKash DPS vs bank DPS",
              "Both are legitimate — the choice depends on how you'll actually use it.",
              [
                { href: "/savings-goal", label: "Savings Goal calculator", type: "calculator" },
              ]);
          default:
            return rec("/explainers/comparison/fdr-vs-sanchayapatra-vs-dps", "FDR vs Sanchaypatra vs DPS",
              "The main safe savings options compared.", []);
        }

      case "debt":
        return rec("/explainers/scenario/prepay-home-loan-or-invest", "Prepay loan or invest?",
          "Compare your loan rate to your investment return to decide.",
          [
            { href: "/emi-calculator", label: "EMI Calculator", type: "calculator" },
            { href: "/explainers/scenario/personal-loan-to-invest", label: "Personal loan to invest in stocks?", type: "explainer" },
          ]);

      case "investing":
        return rec("/explainers/scenario/should-i-open-bo-account-now", "Should I open a BO account now?",
          "Most first-time investors should open the infrastructure before they're 'ready'.",
          [
            { href: "/portfolio-builder", label: "Portfolio Builder", type: "calculator" },
            { href: "/explainers/scenario/personal-loan-to-invest", label: "Personal loan to invest?", type: "explainer" },
          ]);

      case "family":
        return rec("/explainers/scenario/family-asks-for-saved-money", "Family asks for saved money",
          "Helping family without sacrificing your own financial future.",
          [
            { href: "/explainers/worker-wise/family-money-pressure-worker-wise", label: "পরিবার থেকে টাকার চাপ (Bangla)", type: "explainer" },
          ]);

      case "scam":
        return rec("/scam-spotter", "Scam Spotter",
          "Interactive tool that helps you recognize common scam patterns.",
          [
            { href: "/explainers/worker-wise/avoid-high-interest-loans-worker-wise", label: "Avoid high-interest loans (Bangla)", type: "explainer" },
          ]);

      case "windfall":
        return rec("/explainers/scenario/windfall-what-to-do", "What to do with a windfall",
          "The 30-day rule prevents most regret-decisions on sudden large sums.",
          [
            { href: "/portfolio-builder", label: "Portfolio Builder", type: "calculator" },
          ]);

      default:
        return rec("/explainers/scenario", "Browse scenario explainers", "Specific situations and what to do about them.", []);
    }
  }

  // Q1 = compare
  if (answers.q1 === "compare") {
    switch (answers.q2) {
      case "savings_products":
        return rec("/explainers/comparison/fdr-vs-sanchayapatra-vs-dps", "FDR vs Sanchaypatra vs DPS",
          "The main safe savings options compared.", []);
      case "dps_providers":
        return rec("/explainers/comparison/bkash-vs-bank-dps-comparison", "bKash DPS vs bank DPS",
          "Comparing convenience, rates, and access.", []);
      case "inflation_hedges":
        return rec("/explainers/comparison/gold-vs-fdr-vs-sanchayapatra", "Gold vs FDR vs Sanchaypatra",
          "Which one actually protects against inflation.", []);
      case "rent_buy":
        return rec("/explainers/comparison/home-loan-vs-renting", "Home loan vs renting",
          "The full math beyond just comparing EMI to rent.", []);
      case "mutual_stocks":
        return rec("/explainers/comparison/mutual-funds-vs-direct-stocks-bangladesh", "Mutual funds vs direct stocks",
          "Two paths into the BD equity market.", []);
      default:
        return rec("/explainers/comparison", "Browse all comparisons",
          "Side-by-side product breakdowns.", []);
    }
  }

  // Q1 = diaspora
  if (answers.q1 === "diaspora") {
    switch (answers.q2) {
      case "canada":
        return rec("/explainers/diaspora/canada-building-credit-from-zero", "Canada: building credit from zero",
          "The first step for most Bangladeshi newcomers to Canada.",
          [
            { href: "/explainers/diaspora/canada-tfsa-rrsp-vs-bd-options", label: "TFSA, RRSP vs BD options", type: "explainer" },
          ]);
      case "us":
        return rec("/explainers/diaspora/us-credit-building-bangladeshi-immigrants", "US: credit building for immigrants",
          "Credit history affects more than loans in the US.",
          [
            { href: "/explainers/diaspora/us-investing-401k-ira-vs-bd-options", label: "401(k), IRA vs BD options", type: "explainer" },
          ]);
      case "uk":
        return rec("/explainers/diaspora/uk-credit-and-banking-for-newcomers", "UK: credit and banking for newcomers",
          "Setting up correctly in the first 6 months.", []);
      case "australia":
        return rec("/explainers/diaspora/australia-financial-system-bangladeshi-newcomers", "Australia: financial system basics",
          "TFN, super, and the local credit system.", []);
      case "middle_east":
        return rec("/explainers/diaspora/middle-east-saving-while-on-contract", "Middle East: saving while on contract",
          "Contract workers have a specific 2-5 year savings window. Also available in Bangla.",
          [
            { href: "/explainers/diaspora/middle-east-saving-while-on-contract-bn", label: "একই কন্টেন্ট বাংলায়", type: "explainer" },
            { href: "/explainers/diaspora/middle-east-sending-money-home-smartly", label: "Sending money home smartly", type: "explainer" },
          ]);
      case "other":
        return rec("/explainers/diaspora/diaspora-investment-comparison-bd-vs-abroad", "BD vs abroad investing",
          "Framework for where to invest based on your timeline and tax situation.",
          [
            { href: "/explainers/diaspora", label: "Browse all diaspora content", type: "explainer" },
          ]);
      default:
        return rec("/explainers/diaspora", "Browse diaspora content",
          "Country-specific and universal diaspora topics.", []);
    }
  }

  // Q1 = teach
  if (answers.q1 === "teach") {
    switch (answers.q2) {
      case "rmg":
        return rec("/explainers/employer-pack/pack-rmg", "RMG / Garment workforce pack",
          "Bangla content designed for factory deployment — payroll inserts, common-room TV loops, QR-code posters.",
          [
            { href: "/explainers/employer", label: "Compare all three packs", type: "explainer" },
          ]);
      case "ngo":
        return rec("/explainers/employer-pack/pack-ngo", "NGO / INGO financial inclusion pack",
          "Content for MFI customers, women's groups, and financial inclusion programs.",
          [
            { href: "/explainers/employer", label: "Compare all three packs", type: "explainer" },
          ]);
      case "corporate":
        return rec("/explainers/employer-pack/pack-corporate", "Corporate office staff pack",
          "Workplace financial literacy for white-collar employees — salary basics, scam awareness, infrastructure decisions.",
          [
            { href: "/explainers/employer", label: "Compare all three packs", type: "explainer" },
          ]);
      default:
        return rec("/explainers/employer", "Browse all workplace packs",
          "Three pack types for different deployment contexts.", []);
    }
  }

  // Fallback
  return rec("/explainers", "Browse all explainers",
    "Start with what interests you most.", []);
}

// Helper
function rec(
  href: string,
  label: string,
  reason: string,
  alternatives: PathFinderRecommendation["alternatives"]
): PathFinderRecommendation {
  return { primaryHref: href, primaryLabel: label, primaryReason: reason, alternatives };
}

// ─────────────────────────────────────────────────────────────
// FLOW CONTROLLER (for the page component to use)
// ─────────────────────────────────────────────────────────────

export function getNextQuestion(
  q1: string,
  q2?: string
): PathFinderQuestion | null {
  // If Q1 is browse or learn — no further questions
  if (q1 === "browse" || q1 === "learn") return null;

  // If we're answering Q1 and need Q2
  if (!q2) {
    switch (q1) {
      case "decide": return pathFinderQ2_decide;
      case "compare": return pathFinderQ2_compare;
      case "diaspora": return pathFinderQ2_diaspora;
      case "teach": return pathFinderQ2_teach;
      default: return null;
    }
  }

  // If Q2 needs Q3 (only for decide + savings)
  if (q1 === "decide" && q2 === "savings") {
    return pathFinderQ3_savings;
  }

  return null;
}
