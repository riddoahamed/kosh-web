import type { ExternalLink } from "@/types/explainer";

export const EXPLAINER_EXTERNAL_LINKS: Record<string, ExternalLink[]> = {
  "fdr-vs-sanchayapatra-vs-dps": [
    {
      title: "Bangladesh Bank — Sanchaypatra rates",
      href: "https://nationalsavings.gov.bd",
      description: "Current Sanchaypatra rates by scheme, updated by the Directorate.",
      type: "official",
    },
  ],
  "gold-vs-fdr-vs-sanchayapatra": [
    {
      title: "BAJUS — Bangladesh gold price",
      href: "https://www.bajus.org",
      description: "Daily reference price published by Bangladesh Jewellers Association.",
      type: "official",
    },
    {
      title: "Bangladesh Bank — Sanchaypatra schemes",
      href: "https://nationalsavings.gov.bd",
      type: "official",
    },
  ],
  "should-i-open-bo-account-now": [
    {
      title: "BSEC — broker registry",
      href: "https://sec.gov.bd",
      description: "Confirm any broker is BSEC-licensed before opening a BO account.",
      type: "official",
    },
    {
      title: "CDBL — Central Depository Bangladesh",
      href: "https://www.cdbl.com.bd",
      description: "Authority that issues BO account numbers.",
      type: "official",
    },
  ],
  "canada-building-credit-from-zero": [
    {
      title: "Equifax Canada — free annual credit report",
      href: "https://www.equifax.ca/personal/products/credit-report-and-score/free-equifax-credit-report/",
      type: "tool",
    },
    {
      title: "TransUnion Canada — free credit report",
      href: "https://www.transunion.ca/credit-help/credit-report",
      type: "tool",
    },
  ],
  "us-credit-building-bangladeshi-immigrants": [
    {
      title: "AnnualCreditReport.com — official free reports",
      href: "https://www.annualcreditreport.com",
      description: "The only federally authorized site for free credit reports from Equifax, Experian, and TransUnion.",
      type: "official",
    },
  ],
  "diaspora-investment-comparison-bd-vs-abroad": [
    {
      title: "Bangladesh Bank — NRB section",
      href: "https://www.bb.org.bd/en/index.php/services/nrb",
      description: "Official NRB accounts, bonds, and remittance product list.",
      type: "official",
    },
  ],
  "safe-mobile-banking-worker-wise": [
    {
      title: "বিকাশ - সচেতনতা / ফ্রড সম্পর্কে",
      href: "https://www.bkash.com/safety",
      description: "bKash-এর প্রতারণা সতর্কতা পেইজ।",
      type: "official",
    },
    {
      title: "Bangladesh Bank — Mobile Financial Services",
      href: "https://www.bb.org.bd/en/index.php/financialactivity/mfs",
      type: "official",
    },
  ],
  "employee-scam-awareness": [
    {
      title: "Cyber Police Centre, Bangladesh",
      href: "https://www.police.gov.bd/en/cyber_crime",
      description: "Where to report investment fraud and online scams.",
      type: "official",
    },
    {
      title: "BSEC — investor alerts",
      href: "https://sec.gov.bd",
      type: "official",
    },
  ],
};
