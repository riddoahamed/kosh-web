// ============================================================
// KOSH v5 — Explainer additions
// To be merged into src/data/explainers/generated.ts
// 
// Structure: 20+ new Explainer objects
// - 5 Worker Wise (Bangla, with step-cards visuals)
// - 7 Diaspora country-specific (Canada, US, UK, Australia, Middle East)
// - 2 Middle East Bangla siblings
// - 3 New comparison/scenario gaps fill
// - 3 Employer pack additions
// 
// Tagging strategy: 4-7 high-signal tags per piece
// All 3-5 min reading time
// ============================================================

import type { Explainer } from "@/types/explainer";

export const v5ExplainerAdditions: Explainer[] = [

  // ════════════════════════════════════════════════════════════
  // WORKER WISE — 5 new Bangla explainers
  // All have step-cards visual for low-text accessibility
  // ════════════════════════════════════════════════════════════

  {
    id: "family-money-pressure-worker-wise",
    slug: "family-money-pressure-worker-wise",
    category: "worker-wise",
    title: "পরিবার থেকে টাকার চাপ এলে কী করবেন",
    subtitle: "পরিবার থেকে বারবার টাকার চাহিদা এলে অনেক সময় না বলা কঠিন হয়। কিন্তু নিজের জন্যও কিছু রাখা জরুরি।",
    tldr: "পরিবারকে সাহায্য করা ভালো। কিন্তু নিজের জন্যও কিছু রাখা জরুরি। মাসে কত দেবেন আগে ঠিক করুন। চাপে এসে সিদ্ধান্ত নেবেন না।",
    audience: "RMG কর্মী, শ্রমিক, নতুন উপার্জনকারী",
    readingTimeMinutes: 3,
    language: "bn",
    difficulty: "easy",
    tags: ["family pressure", "boundary setting", "RMG", "পরিবার", "সঞ্চয়"],
    mangoReward: 10,
    lastUpdated: "2026-05-15",
    visual: {
      type: "step-cards",
      description: "4-step approach to family money pressure",
      suggestedIcon: "Users",
      altText: "পরিবার থেকে টাকার চাপের সমাধান",
      steps: [
        { icon: "Calculator", label: "মাসে কত দেবেন - ঠিক করুন" },
        { icon: "Wallet", label: "আগেই আলাদা করে রাখুন" },
        { icon: "Heart", label: "জরুরি বনাম শখ - আলাদা করুন" },
        { icon: "ShieldCheck", label: "নিজের ভবিষ্যতের জন্যও রাখুন" },
      ],
    },
    sections: [
      {
        heading: "একটা সাধারণ ভাগ",
        body: "আপনি যা রোজগার করেন তা থেকে -\n\n- নিজের প্রয়োজনীয় খরচ\n- পরিবারে নির্দিষ্ট পরিমাণ\n- নিজের সঞ্চয় (অল্প হলেও)\n\nতিনটাই গুরুত্বপূর্ণ।",
      },
      {
        heading: "যখন বাড়তি টাকার চাহিদা আসে",
        body: "প্রথমে নিজেকে জিজ্ঞাসা করুন -\n\n1. এটা কি সত্যিকারের জরুরি (হাসপাতাল, মৃত্যু)?\n2. নাকি শখের কিছু (নতুন ফোন, অনুষ্ঠান)?\n\nজরুরি হলে - দেবেন।\nশখের জন্য - 'এখন পারছি না' বলতে শিখুন।",
      },
      {
        heading: "কথা বলার সহজ উপায়",
        body: "মা-বাবার সাথে: \"মা, আমি প্রতি মাসে এই টাকা দিচ্ছি। বাড়তি কিছু লাগলে অবশ্যই বলবে।\"\n\nভাই-বোনের সাথে: \"আমি যা পারি দিচ্ছি। তুমিও কিছু রোজগার করো।\"\n\nস্পষ্ট কথা সম্পর্ক ভালো রাখে।",
      },
    ],
    actionStep: "আজই ঠিক করুন - প্রতি মাসে পরিবারকে কত পাঠাবেন। সেই পরিমাণ স্বয়ংক্রিয়ভাবে পাঠানোর ব্যবস্থা করুন।",
    relatedModules: [],
    relatedCalculators: ["budget-planner"],
  },

  {
    id: "salary-advance-loans-worker-wise",
    slug: "salary-advance-loans-worker-wise",
    category: "worker-wise",
    title: "টাকা দরকার? কোনটা নিরাপদ - কারখানার অগ্রিম না MFI ঋণ?",
    subtitle: "জরুরি টাকার দরকার হলে অনেক জায়গা থেকে নেওয়া যায়। কিন্তু সব জায়গা সমান নিরাপদ না।",
    tldr: "জরুরি টাকার দরকার হলে - কারখানার অগ্রিম সবচেয়ে ভালো। তারপর bKash/Nagad ঋণ। MFI ঋণ ছোট ব্যবসার জন্য ভালো। অনিবন্ধিত মহাজন এড়িয়ে চলুন।",
    audience: "RMG কর্মী, শ্রমিক, নতুন উপার্জনকারী",
    readingTimeMinutes: 4,
    language: "bn",
    difficulty: "easy",
    tags: ["salary advance", "MFI", "loan", "RMG", "ঋণ", "অগ্রিম"],
    mangoReward: 10,
    lastUpdated: "2026-05-15",
    visual: {
      type: "step-cards",
      description: "Loan source comparison from safest to riskiest",
      suggestedIcon: "BadgeCheck",
      altText: "ঋণের উৎস তুলনা",
      steps: [
        { icon: "Building2", label: "১: কারখানার অগ্রিম (সবচেয়ে ভালো)" },
        { icon: "Smartphone", label: "২: bKash/Nagad ঋণ" },
        { icon: "BadgeCheck", label: "৩: MFI - BRAC/ASA/Grameen" },
        { icon: "AlertTriangle", label: "৪: মহাজন/স্থানীয় - এড়িয়ে চলুন" },
      ],
    },
    sections: [
      {
        heading: "কারখানার অগ্রিম সবচেয়ে ভালো কেন",
        body: "- সুদ নেই বা খুব কম\n- বেতন থেকে আস্তে আস্তে কাটা হয়\n- লিখিত কাগজ থাকে\n- কেউ চাপ দেয় না\n\nপ্রথমে HR বা ম্যানেজারের সাথে কথা বলুন।",
      },
      {
        heading: "bKash বা Nagad থেকে ঋণ",
        body: "- ছোট পরিমাণ (২,০০০-৩০,০০০ টাকা)\n- সুদ স্পষ্ট লেখা থাকে\n- অ্যাপেই সব হয়\n- দেরি হলে জরিমানা আছে\n\nএটা ভালো বিকল্প যদি কারখানা অগ্রিম না দেয়।",
      },
      {
        heading: "MFI ঋণ কখন নেবেন",
        body: "BRAC, ASA, গ্রামীণ ব্যাংক - এগুলো নিবন্ধিত।\n\nছোট ব্যবসা শুরু করতে চাইলে এদের কাছে যান।\n\nশুধু খরচের জন্য MFI ঋণ - না নেওয়াই ভালো।",
      },
      {
        heading: "যা এড়িয়ে চলবেন",
        body: "- স্থানীয় মহাজন (অনেক বেশি সুদ)\n- 'সুদ নেই' বলা যেকোনো প্রস্তাব\n- লিখিত কাগজ ছাড়া ঋণ\n- পরিচিত মানুষের নাম দিয়ে চাপ\n\nএগুলোতে পরে অনেক বড় সমস্যা হয়।",
      },
    ],
    actionStep: "টাকা দরকার হলে - প্রথমে কারখানার HR-এর সাথে কথা বলুন। তারপর bKash বা Nagad অ্যাপ দেখুন।",
    relatedModules: [],
    relatedCalculators: ["emi-calculator"],
  },

  {
    id: "first-job-money-decisions-worker-wise",
    slug: "first-job-money-decisions-worker-wise",
    category: "worker-wise",
    title: "প্রথম বেতন পেলেন? প্রথম ৩ মাসে কী করবেন",
    subtitle: "প্রথম বেতন পাওয়া বিশেষ অনুভূতি। কিন্তু এই ৩ মাসের অভ্যাসই পরের কয়েক বছর ঠিক করবে।",
    tldr: "প্রথম বেতনের দিন বড় সিদ্ধান্ত নিন - প্রতি মাসে কিছু জমাবেন। ৫০০ টাকা দিয়ে শুরু করুন। প্রথম ৩ মাসেই অভ্যাস তৈরি হয়।",
    audience: "নতুন উপার্জনকারী, প্রথম চাকরিতে যোগ দেওয়া কর্মী",
    readingTimeMinutes: 3,
    language: "bn",
    difficulty: "easy",
    tags: ["first job", "new earner", "habit building", "প্রথম বেতন", "সঞ্চয় শুরু"],
    mangoReward: 10,
    lastUpdated: "2026-05-15",
    visual: {
      type: "step-cards",
      description: "First 3 months action plan",
      suggestedIcon: "Sparkles",
      altText: "প্রথম ৩ মাসের পরিকল্পনা",
      steps: [
        { icon: "Calendar", label: "মাস ১: ৫০০ টাকা জমানো শুরু" },
        { icon: "PiggyBank", label: "মাস ২: DPS খুলে ফেলুন" },
        { icon: "ShieldCheck", label: "মাস ৩: জরুরি তহবিল ১,০০০ টাকা" },
        { icon: "TrendingUp", label: "মাস ৪+: প্রতি বেতনে একই নিয়ম" },
      ],
    },
    sections: [
      {
        heading: "প্রথম মাস: ছোট থেকে শুরু",
        body: "প্রথম বেতন পেলেই -\n\n1. ৫০০ টাকা আলাদা রাখুন (যেকোনো জায়গায়)\n2. বাকি টাকা দিয়ে চলুন\n3. মাস শেষে দেখুন - ৫০০ টাকা আছে\n\nএই ছোট সাফল্যই বড় অভ্যাসের শুরু।",
      },
      {
        heading: "দ্বিতীয় মাস: DPS খুলুন",
        body: "bKash অ্যাপে বা ব্যাংকে গিয়ে DPS খুলুন।\n\n- ন্যূনতম মাসে ৫০০ টাকা\n- প্রতি মাসে বেতনের দিনে স্বয়ংক্রিয়ভাবে কাটবে\n- ৫ বছর পরে সব টাকা ফেরত পাবেন সুদসহ\n\nএক ঘণ্টার কাজ। পরের ৫ বছর কিছু করতে হবে না।",
      },
      {
        heading: "তৃতীয় মাস: জরুরি তহবিল",
        body: "DPS-এর বাইরে আরেকটু আলাদা রাখুন।\n\nঅসুখ, পরিবারে দরকার, কাজ বন্ধ - এসব হঠাৎ হয়।\n\nহাতে অন্তত ১,০০০ টাকা জমা থাকলে এসব সামলাতে পারবেন।\n\nছোট থেকে শুরু করুন। ছয় মাসে অনেক হবে।",
      },
      {
        heading: "একটা সতর্কতা",
        body: "প্রথম বেতন পেয়ে সবাই বড় কিছু কিনতে চায়।\n\nনতুন ফোন, ভালো জামা, বন্ধুদের সাথে ঘোরা।\n\nএক-দুইটা ছোট আনন্দ ঠিক আছে।\n\nকিন্তু প্রথম তিন মাসে অভ্যাস তৈরি না হলে - পুরো বছর হবে না।",
      },
    ],
    actionStep: "এই মাসেই ৫০০ টাকা আলাদা করুন। যেকোনো জায়গায় - bKash, ব্যাংক, খামে। শুধু আলাদা করুন।",
    relatedModules: [],
    relatedCalculators: ["savings-goal"],
  },

  {
    id: "bkash-dps-step-by-step-worker-wise",
    slug: "bkash-dps-step-by-step-worker-wise",
    category: "worker-wise",
    title: "bKash-এ DPS খোলার সহজ ধাপ",
    subtitle: "bKash অ্যাপ দিয়েই DPS খুলতে পারেন। ১৫ মিনিটে কাজ শেষ। NID লাগবে।",
    tldr: "bKash অ্যাপ ব্যবহার করে DPS খুলতে পারেন। NID, ছবি, আর ৫০০ টাকা লাগবে। প্রতি মাসে স্বয়ংক্রিয়ভাবে কাটবে।",
    audience: "RMG কর্মী, শ্রমিক, যারা DPS শুরু করতে চান",
    readingTimeMinutes: 3,
    language: "bn",
    difficulty: "easy",
    tags: ["bKash", "DPS", "savings", "step-by-step", "সঞ্চয়", "tutorial"],
    mangoReward: 10,
    lastUpdated: "2026-05-15",
    visual: {
      type: "step-cards",
      description: "bKash DPS opening process",
      suggestedIcon: "Smartphone",
      altText: "bKash DPS খোলার ধাপ",
      steps: [
        { icon: "Smartphone", label: "১: bKash অ্যাপ খুলুন" },
        { icon: "Search", label: "২: 'Savings' বা 'সঞ্চয়' খুঁজুন" },
        { icon: "Edit3", label: "৩: পরিমাণ ও মেয়াদ দিন" },
        { icon: "Check", label: "৪: NID দিয়ে নিবন্ধন করুন" },
      ],
    },
    sections: [
      {
        heading: "শুরু করার আগে যা লাগবে",
        body: "- আপনার NID (Smart Card)\n- bKash অ্যাকাউন্ট\n- ফোনে ক্যামেরা (ছবি তুলতে হবে)\n- ৫০০ টাকা প্রথম মাসের কিস্তির জন্য\n\nসব হাতের কাছে রাখুন।",
      },
      {
        heading: "ধাপে ধাপে কী করবেন",
        body: "**ধাপ ১:** bKash অ্যাপ খুলুন। নিচে দেখুন - 'More' বা 'আরো' আছে।\n\n**ধাপ ২:** সেখানে 'Savings', 'DPS' বা 'সঞ্চয়' অপশন খুঁজুন।\n\n**ধাপ ৩:** কয় বছরের মেয়াদ বেছে নিন (২, ৩, ৫ বছর)। বেশিরভাগের জন্য ৩-৫ বছর ভালো।\n\n**ধাপ ৪:** প্রতি মাসে কত দেবেন বেছে নিন (৫০০, ১০০০, ১৫০০ টাকা)।\n\n**ধাপ ৫:** NID-এর সামনের আর পেছনের ছবি তুলুন। নিজের একটা সেলফি।",
      },
      {
        heading: "প্রতি মাসে কী হবে",
        body: "DPS খোলার পরে -\n\n- প্রতি মাসে নির্দিষ্ট দিনে টাকা স্বয়ংক্রিয়ভাবে কাটবে\n- bKash ব্যালেন্সে টাকা থাকতে হবে কাটার দিনে\n- মেয়াদ শেষে পুরো টাকা সুদসহ ফেরত পাবেন\n\nভুলে গেলেও সমস্যা না - bKash মনে রাখবে।",
      },
      {
        heading: "কিছু সতর্কতা",
        body: "- কাটার দিনে যদি টাকা না থাকে - জরিমানা হতে পারে\n- মেয়াদ শেষের আগে ভাঙলে কম সুদ পাবেন\n- বেতনের দিনের পরেই কাটার তারিখ ঠিক করুন",
      },
    ],
    actionStep: "আজই bKash অ্যাপ খুলে দেখুন। NID হাতের কাছে রাখুন। ১৫ মিনিটে কাজ হবে।",
    relatedModules: [],
    relatedCalculators: [],
  },

  {
    id: "emergency-fund-tk-200-worker-wise",
    slug: "emergency-fund-tk-200-worker-wise",
    category: "worker-wise",
    title: "মাসে ২০০ টাকা দিয়ে জরুরি তহবিল শুরু",
    subtitle: "জরুরি তহবিল মানে - হঠাৎ দরকারে যে টাকা কাজে লাগবে। অনেক টাকা লাগবে না শুরু করতে।",
    tldr: "জরুরি তহবিল শুরু করতে অনেক টাকা লাগে না। মাসে ২০০ টাকা দিয়েই শুরু করুন। এক বছরে ২,৪০০ টাকা হবে। এটাই অনেক কিছু সামলাবে।",
    audience: "যারা সঞ্চয় শুরু করতে চান কিন্তু মনে করেন বেশি টাকা লাগবে",
    readingTimeMinutes: 3,
    language: "bn",
    difficulty: "easy",
    tags: ["emergency fund", "small savings", "habit", "জরুরি তহবিল", "ছোট সঞ্চয়"],
    mangoReward: 10,
    lastUpdated: "2026-05-15",
    visual: {
      type: "step-cards",
      description: "Emergency fund growth at Tk 200/month",
      suggestedIcon: "ShieldCheck",
      altText: "জরুরি তহবিল বৃদ্ধি",
      steps: [
        { icon: "Coins", label: "মাস ১: ২০০ টাকা" },
        { icon: "Wallet", label: "মাস ৬: ১,২০০ টাকা" },
        { icon: "PiggyBank", label: "১ বছর: ২,৪০০ টাকা" },
        { icon: "ShieldCheck", label: "২ বছর: ৫,০০০+ টাকা" },
      ],
    },
    sections: [
      {
        heading: "জরুরি তহবিল কী",
        body: "এটা হলো - হঠাৎ দরকারের জন্য আলাদা রাখা টাকা।\n\nযেমন:\n- হঠাৎ অসুখ\n- বাড়িতে কেউ অসুস্থ\n- কাজ হঠাৎ বন্ধ\n- জরুরি কোনো খরচ\n\nএই টাকা স্বাভাবিক খরচে ব্যবহার করবেন না।",
      },
      {
        heading: "কতটুকু লাগবে",
        body: "শুরুতে অনেক না।\n\nএক মাসের খাবার আর ভাড়ার টাকা থাকলেই অনেক।\n\nধরুন আপনার মাসিক প্রয়োজনীয় খরচ ৫,০০০ টাকা।\n\nতাহলে শুরুতে লক্ষ্য - এক মাসের খরচ (৫,০০০ টাকা) জমানো।\n\nমাসে ২০০ টাকা দিলে - ২ বছরে হয়ে যাবে।",
      },
      {
        heading: "কোথায় রাখবেন",
        body: "এই টাকা DPS-এ রাখবেন না। কারণ - হঠাৎ লাগলে তুলতে অসুবিধা হবে।\n\nরাখুন:\n- সাধারণ সঞ্চয়ী ব্যাংক অ্যাকাউন্টে\n- bKash বা Nagad-এ\n\nতবে এটা আপনার স্বাভাবিক খরচের অ্যাকাউন্ট থেকে আলাদা হওয়া ভালো।",
      },
      {
        heading: "একটা গুরুত্বপূর্ণ নিয়ম",
        body: "এই টাকা শখের জন্য ব্যবহার করবেন না।\n\n- নতুন জামা - না\n- ঈদ-পূজার অনুষ্ঠান - না\n- কাউকে ধার - না\n- নতুন ফোন - না\n\nশুধু সত্যিকারের জরুরি অবস্থায় ব্যবহার করুন।",
      },
    ],
    actionStep: "এই মাসেই ২০০ টাকা আলাদা করে রাখুন। যেকোনো জায়গায় - শুধু আপনার মূল অ্যাকাউন্ট থেকে আলাদা।",
    relatedModules: [],
    relatedCalculators: ["savings-goal"],
  },

  // ════════════════════════════════════════════════════════════
  // DIASPORA — Country-specific expansion
  // 7 new explainers + 2 Middle East Bangla siblings
  // ════════════════════════════════════════════════════════════

  {
    id: "uk-credit-and-banking-for-newcomers",
    slug: "uk-credit-and-banking-for-newcomers",
    category: "diaspora",
    title: "UK: credit and banking when you're a newcomer",
    subtitle: "Arriving in the UK with a clean financial history in Bangladesh, but you'll start from zero on UK credit. The system isn't hostile — but it has specific rules you should know in your first 6 months.",
    tldr: "UK credit history starts when you arrive — your Bangladesh record doesn't transfer. Open a UK bank account first (some accept newly-arrived Bangladeshi citizens), get on the electoral roll if eligible, use a credit-builder card responsibly. Most newcomers build adequate credit within 12-18 months.",
    audience: "Bangladeshis recently arrived in the UK or moving in the next 6 months",
    readingTimeMinutes: 5,
    language: "en",
    difficulty: "medium",
    tags: ["country:uk", "credit-building", "newcomer", "banking", "diaspora"],
    mangoReward: 14,
    lastUpdated: "2026-05-15",
    visual: {
      type: "checklist",
      description: "First 6 months UK financial setup checklist",
      suggestedIcon: "ListChecks",
      altText: "UK newcomer financial setup checklist",
    },
    sections: [
      {
        heading: "The quick answer",
        body: "UK credit history is built from your UK address, UK bank account, and UK borrowing behavior. Your Bangladesh financial history (even excellent) won't show up on UK credit reports automatically.\n\nThis means newly-arrived Bangladeshis appear as 'thin file' or 'no file' applicants. Landlords, lenders, and even some utility providers may ask for guarantors or larger deposits.\n\nThe fix isn't complicated — but it takes 12-18 months of consistent action.",
      },
      {
        heading: "First 30 days",
        body: "1. **Open a UK bank account.** Major banks (HSBC, Barclays, Lloyds, NatWest) offer 'newcomer' accounts. Some require proof of address (rental agreement is enough), others accept passport + visa. Monzo and Starling are app-based and often faster to set up.\n\n2. **Get a UK phone number and address.** These two anchor your identity in the UK system.\n\n3. **Apply for a National Insurance Number** if working — required for employment and tax.",
      },
      {
        heading: "Months 2-6: start building credit",
        body: "1. **Register on the electoral roll** if you're eligible to vote (Commonwealth citizens with settled status can register). This is one of the strongest credit-building signals.\n\n2. **Get a credit-builder credit card.** Aqua, Capital One, Vanquis offer cards designed for thin-file applicants. Use it for small purchases (£20-50/month), pay the full balance every month.\n\n3. **Check your credit report.** Free at Experian, ClearScore (uses Equifax), Credit Karma (uses TransUnion). All three UK credit bureaus report independently.\n\n4. **Avoid credit applications you don't need.** Each application leaves a 'hard search' that temporarily lowers your score.",
      },
      {
        heading: "After 12 months",
        body: "With consistent use of a credit-builder card and no missed payments, your credit file becomes substantial. Most newcomers can:\n\n- Get approved for standard credit cards\n- Apply for mobile contracts (not pay-as-you-go)\n- Have stronger position for renting flats\n- Begin considering a mortgage if planning to stay long-term\n\nThis isn't fast, but it's predictable.",
      },
    ],
    actionStep: "Open a UK bank account in your first 2 weeks. Get on the electoral roll if eligible. Apply for one credit-builder card 60-90 days after arrival.",
    relatedModules: [],
    relatedCalculators: [],
    sourceNotes: ["UK credit reporting rules and credit bureau practices verified at Money Saving Expert and Citizens Advice."],
  },

  {
    id: "australia-financial-system-bangladeshi-newcomers",
    slug: "australia-financial-system-bangladeshi-newcomers",
    category: "diaspora",
    title: "Australia: financial system basics for Bangladeshi newcomers",
    subtitle: "Australia's financial system is well-organised but has specific quirks: superannuation is mandatory, tax file numbers anchor everything, and credit scores work differently from the US or UK.",
    tldr: "In Australia you need a Tax File Number (TFN) before working, your employer must contribute to a superannuation fund for retirement, and credit scores are reported by three bureaus. Banking is generally straightforward — most Bangladeshi newcomers can set up within 2 weeks.",
    audience: "Bangladeshis recently arrived in Australia or planning to move",
    readingTimeMinutes: 5,
    language: "en",
    difficulty: "medium",
    tags: ["country:australia", "TFN", "superannuation", "newcomer", "diaspora"],
    mangoReward: 14,
    lastUpdated: "2026-05-15",
    visual: {
      type: "country-card",
      description: "Australia financial system components",
      suggestedIcon: "Globe2",
      altText: "Australia financial overview for newcomers",
    },
    sections: [
      {
        heading: "The quick answer",
        body: "Australia's financial system has three things newcomers need to understand:\n\n1. **TFN (Tax File Number)** — every person needs one. Apply via the ATO website using your visa and passport.\n\n2. **Superannuation** — Australia's compulsory retirement system. Your employer must pay 11-12% of your salary into a super fund of your choice (or a default fund). This continues your entire working life and becomes your retirement income.\n\n3. **Credit reporting** — three bureaus (Equifax, Experian, illion) track your credit. Scores typically range 0-1200.",
      },
      {
        heading: "First 2 weeks setup",
        body: "1. **Apply for a TFN** as soon as you have your visa. Online application takes 10 minutes; the actual number arrives in 28 days. Without it, your employer must withhold tax at the highest rate.\n\n2. **Open an Australian bank account.** The 'Big Four' (Commonwealth Bank, Westpac, ANZ, NAB) all offer newcomer accounts. Most can be opened online before arrival, then verified in-branch after you land.\n\n3. **Choose a superannuation fund** within 60 days of starting work. If you don't choose, your employer puts contributions into a default fund — usually fine but not optimised for you.",
      },
      {
        heading: "Building credit in Australia",
        body: "Credit reporting in Australia is 'comprehensive' — both positive and negative behavior is reported. Just paying bills on time builds a positive credit history.\n\nUseful for newcomers:\n\n- Get a mobile contract (not prepaid) in your name — this reports payments to credit bureaus\n- Pay utility bills on time\n- Avoid applying for multiple credit products in a short period\n- Wait 6-12 months before applying for major credit (car loan, mortgage)\n\nUnlike the US, you don't need to actively use credit cards to build a score in Australia.",
      },
      {
        heading: "Investment options vs Bangladesh",
        body: "Once settled, you have access to:\n\n- **High-interest savings accounts** — typically 4-5%, FDIC-equivalent guarantee through APRA\n- **Term deposits** — Australian FDR equivalent, similar rates\n- **Australian shares (ASX)** — straightforward via brokers like CommSec, SelfWealth\n- **ETFs and index funds** — low-cost diversified investing, popular with newcomers\n- **Property** — possible but expensive; Bangladeshi newcomers often face additional foreign-buyer restrictions in first years\n\nFor most newcomers, the priority sequence is: emergency fund → super contributions (often the best return given employer match) → low-cost index fund investing.",
      },
    ],
    actionStep: "Apply for your TFN within your first week. Pick a superannuation fund within 60 days of starting work — research at the ATO's YourSuper comparison tool.",
    relatedModules: [],
    relatedCalculators: [],
    sourceNotes: ["Australian financial system basics verified via Australian Taxation Office (ATO) and APRA published guidance."],
  },

  {
    id: "us-investing-401k-ira-vs-bd-options",
    slug: "us-investing-401k-ira-vs-bd-options",
    category: "diaspora",
    title: "US: 401(k), IRA, and how they compare to Bangladesh's options",
    subtitle: "The US retirement system gives Bangladeshi immigrants powerful tax-advantaged savings tools — but only if you understand the rules and your employer match. Many newcomers miss free money in their first job.",
    tldr: "In the US, 401(k) and IRA accounts give tax advantages no Bangladesh product matches. Employer 401(k) match is free money — contribute at least up to the match. Roth vs traditional choice matters. Don't compare these to Sanchaypatra — different categories entirely.",
    audience: "Bangladeshi immigrants in the US, especially in their first 2 years of employment",
    readingTimeMinutes: 6,
    language: "en",
    difficulty: "medium",
    tags: ["country:us", "401k", "IRA", "retirement", "investing", "diaspora"],
    mangoReward: 14,
    lastUpdated: "2026-05-15",
    visual: {
      type: "table",
      description: "401(k), IRA, and Sanchaypatra comparison",
      suggestedIcon: "Scale",
      altText: "Retirement account comparison table",
    },
    sections: [
      {
        heading: "The quick answer",
        body: "If your US employer offers a 401(k) match, contributing up to the match is the highest-return action available to you. Typical match: employer adds 50-100% of your contribution up to 3-6% of your salary. This is genuinely free money — many Bangladeshi newcomers don't claim it because they don't understand the option.\n\nIRAs (Roth and Traditional) give you tax-advantaged retirement savings beyond what your employer offers. Both have annual contribution limits but the tax benefits compound dramatically over a working life.",
      },
      {
        heading: "What is a 401(k)?",
        body: "A 401(k) is an employer-sponsored retirement account. Contributions come directly from your paycheck before tax (or after tax for Roth 401(k)). The money grows tax-deferred until retirement.\n\nKey features:\n\n- 2026 contribution limit: $23,000/year (verify current — IRS adjusts annually)\n- Employer match: contributed by your employer based on your contribution\n- Withdrawal before age 59.5 typically incurs 10% penalty plus tax\n- Investment options typically include mutual funds and target-date funds\n\nThe employer match is the critical part — if your employer matches 50% up to 6% of salary, contributing 6% means you effectively receive a 50% return immediately on the matched portion.",
      },
      {
        heading: "What is an IRA?",
        body: "An Individual Retirement Account (IRA) is yours, not your employer's. You can open one at any US brokerage.\n\nTwo main types:\n\n**Traditional IRA** — contributions are tax-deductible (reduce current taxable income), grow tax-deferred, taxed when withdrawn in retirement.\n\n**Roth IRA** — contributions are made with after-tax money, grow tax-free, withdrawals in retirement are completely tax-free.\n\nFor most newcomers in their first US years (relatively low income), the Roth IRA is often the better choice — you pay tax now at low rates, never pay tax on the growth.\n\nContribution limit: $7,000/year (verify current — adjusted by IRS).",
      },
      {
        heading: "How these compare to Bangladesh options",
        body: "These are categorically different from Sanchaypatra or DPS:\n\n- US options are investments (stocks, bonds, funds with variable returns), not fixed-return savings products\n- US options offer tax advantages no Bangladesh product offers\n- US options have lock-in until retirement age, not just maturity dates\n\nIf you maintain Bangladesh investments alongside US ones:\n\n- Keep emergency fund in US for accessibility\n- Bangladesh Sanchaypatra still works as part of a diversified picture for NRBs (verify US tax treatment of foreign investment income)\n- Don't try to replicate Sanchaypatra in US — instead use Treasury bonds or high-yield savings for safe US allocation",
      },
      {
        heading: "What to actually do in your first US job",
        body: "1. **In week one of employment**, check whether your employer offers a 401(k) and what the match is. Ask HR if it's not clear.\n\n2. **Contribute at least up to the match.** If they match 100% up to 4%, contribute 4%. This is the most important financial action of your first year.\n\n3. **Open a Roth IRA at any major brokerage** (Vanguard, Fidelity, Schwab). Even contributing $50/month builds a tax-free retirement asset.\n\n4. **Don't try to optimise from year one.** Get the match. Get a Roth started. Worry about specific fund selection in year 2 once you understand the system.\n\n5. **Don't withdraw from these accounts** unless genuinely necessary. The penalties are severe and they compound over time.",
      },
    ],
    actionStep: "If you're employed in the US, log into your benefits portal this week and verify your 401(k) contribution is at least at the employer match level.",
    relatedModules: [],
    relatedCalculators: [],
    sourceNotes: ["IRS contribution limits and rules verified at irs.gov; general 401(k)/IRA structure widely documented in US financial education resources."],
  },

  {
    id: "canada-tfsa-rrsp-vs-bd-options",
    slug: "canada-tfsa-rrsp-vs-bd-options",
    category: "diaspora",
    title: "Canada: TFSA, RRSP, and what to use them for",
    subtitle: "Canada gives newcomers two powerful tax-advantaged accounts: TFSA (flexible, tax-free) and RRSP (retirement-focused). The choice depends on your income and timeline. Most Bangladeshi newcomers benefit from TFSA in their first 5 years.",
    tldr: "TFSA contributions are after-tax, but growth and withdrawals are completely tax-free — flexible and excellent for general savings. RRSP gives upfront tax deduction but withdrawals are taxed. For most newcomers in their first 5 years (lower income), TFSA is the better starting choice.",
    audience: "Bangladeshi immigrants in Canada, particularly in early-career years",
    readingTimeMinutes: 5,
    language: "en",
    difficulty: "medium",
    tags: ["country:canada", "TFSA", "RRSP", "investing", "retirement", "diaspora"],
    mangoReward: 14,
    lastUpdated: "2026-05-15",
    visual: {
      type: "table",
      description: "TFSA vs RRSP comparison",
      suggestedIcon: "Scale",
      altText: "TFSA and RRSP comparison",
    },
    sections: [
      {
        heading: "The quick answer",
        body: "TFSA (Tax-Free Savings Account) and RRSP (Registered Retirement Savings Plan) are Canada's two main tax-advantaged investment accounts.\n\n**TFSA:** You contribute money you've already paid tax on. Investments grow tax-free. Withdrawals are completely tax-free, anytime.\n\n**RRSP:** You contribute pre-tax money (or get a tax refund). Investments grow tax-free. Withdrawals are taxed as income in retirement.\n\nBoth are available to permanent residents and Canadian citizens. Most Bangladeshi newcomers in their first 5 years should prioritise TFSA.",
      },
      {
        heading: "Why TFSA first for most newcomers",
        body: "TFSA's main advantage: complete flexibility.\n\n- Withdraw anytime for any reason — no penalty, no tax\n- Withdrawn amounts add back to your contribution room next year\n- No mandatory withdrawals ever\n\nFor newcomers, this matters because your situation may change. You might:\n\n- Need to access money for unexpected immigration costs\n- Move provinces and need to relocate\n- Decide to return to Bangladesh\n- Buy your first home\n\nTFSA accommodates all of these without penalty. RRSP withdrawals before retirement are taxed as income, making them expensive for the same use cases.",
      },
      {
        heading: "When RRSP makes more sense",
        body: "Consider RRSP-first when:\n\n- Your income is in higher tax brackets (50%+ effective rate when including provincial tax)\n- You have stable long-term employment in Canada with no plan to return to Bangladesh\n- You want the immediate tax refund the RRSP deduction provides\n- You're planning to use the Home Buyers' Plan (which lets you withdraw RRSP for first home down payment)\n\nFor most newcomers in their first 5 years (typically lower income while establishing career), the upfront tax deduction is less valuable than TFSA flexibility.",
      },
      {
        heading: "Contribution room",
        body: "Both accounts have annual contribution limits:\n\n**TFSA:** $7,000/year as of 2026 (verify current limit at canada.ca). Unused room carries forward forever. Newcomers accumulate TFSA room starting from the year they become a Canadian resident.\n\n**RRSP:** 18% of previous year's earned income, up to an annual maximum ($31,560 for 2026 — verify current). Unused room carries forward.\n\nYour personal contribution room is shown on your CRA My Account portal. Always verify before contributing — exceeding the limit triggers penalty tax.",
      },
      {
        heading: "What to invest in within these accounts",
        body: "The account is the wrapper — you choose what to invest inside.\n\nFor newcomers focused on long-term wealth building:\n\n- Low-cost index ETFs (Vanguard VFV, VEQT, or similar TSX-listed funds)\n- High-interest savings within TFSA for emergency fund portion\n- Avoid individual stock picking in your first years\n- Avoid mutual funds with high management fees (>1%)\n\nMost major Canadian banks (RBC, TD, Scotiabank, BMO, CIBC) and online brokers (Wealthsimple, Questrade) offer TFSA and RRSP accounts. Wealthsimple's robo-advisor option is popular with newcomers for its simplicity.",
      },
    ],
    actionStep: "Open a TFSA at your bank or a low-fee broker. Start with $50-100/month into a broad market index ETF. Increase as your income grows.",
    relatedModules: [],
    relatedCalculators: [],
    sourceNotes: ["TFSA and RRSP contribution limits verified at canada.ca/cra. Investment account options widely documented in Canadian personal finance resources."],
  },

  {
    id: "middle-east-saving-while-on-contract",
    slug: "middle-east-saving-while-on-contract",
    category: "diaspora",
    title: "Middle East: saving while you're on contract",
    subtitle: "Bangladeshis on Middle East contracts (UAE, Saudi, Qatar) typically have 2-5 years of high savings opportunity before returning home. The savings strategy is different from someone settling permanently abroad.",
    tldr: "Middle East contracts give you a finite window to save. Send a fixed portion home monthly to Sanchaypatra or DPS in family member's name. Keep a smaller portion in local UAE/Saudi accounts for emergencies. NRB products in Bangladesh often beat what's available locally for safe savings.",
    audience: "Bangladeshi workers on Middle East contracts (UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman)",
    readingTimeMinutes: 5,
    language: "en",
    difficulty: "easy",
    tags: ["country:middle-east", "contract worker", "remittance", "savings", "RMG", "diaspora"],
    mangoReward: 14,
    lastUpdated: "2026-05-15",
    siblingExplainerSlug: "middle-east-saving-while-on-contract-bn",
    visual: {
      type: "step-cards",
      description: "Middle East contract savings plan",
      suggestedIcon: "Wallet",
      altText: "Middle East contract savings strategy",
      steps: [
        { icon: "Calendar", label: "Plan: 60% home, 30% emergency, 10% you" },
        { icon: "Send", label: "Send fixed amount monthly" },
        { icon: "PiggyBank", label: "Use Sanchaypatra/DPS in BD" },
        { icon: "Home", label: "Have a return plan" },
      ],
    },
    sections: [
      {
        heading: "The quick answer",
        body: "Most Bangladeshi workers in the Middle East are on time-limited contracts — usually 2-5 years before returning home. This creates a specific savings opportunity: high earning potential abroad, plus zero or low local tax in Gulf states, plus access to NRB-favorable products in Bangladesh.\n\nThe key is to structure your savings from your first month, not figure it out as you go. Workers who plan have meaningful savings on return. Workers who don't often return with little more than what they arrived with.",
      },
      {
        heading: "A simple monthly allocation",
        body: "From your monthly salary, plan a fixed split (adjust percentages to your specific situation):\n\n- **60% sent home** to designated Bangladesh savings — Sanchaypatra in your name, DPS in family member's name, or both\n- **30% kept locally** for living expenses + local emergency fund\n- **10% personal** for small comforts and unexpected needs\n\nThe specific percentages depend on your contract value and family obligations. The principle is fixed: send most home, keep just enough for emergencies, give yourself a small allowance.",
      },
      {
        heading: "Why NRB Bangladesh products often beat local Gulf options",
        body: "Most Gulf banks pay low interest on savings accounts (often 1-3%). Some offer fixed deposits at slightly better rates. Stock market access for foreign workers is often restricted.\n\nBangladesh NRB products offer:\n\n- USD-denominated NFCD accounts paying 5-7% (verify current rates with Bangladesh Bank)\n- Wage Earner Development Bond paying taka-denominated returns above 10%\n- Sanchaypatra purchases in your name through family with TIN\n- Gold or property investment alongside savings\n\nFor a Bangladeshi contract worker, channelling savings through NRB-friendly products in Bangladesh almost always produces better returns than keeping money in a UAE or Saudi savings account.",
      },
      {
        heading: "Building emergency capacity",
        body: "Keep enough in your local account to handle:\n\n- 2-3 months of basic living expenses\n- Flight home if needed unexpectedly\n- Local medical co-pay if your employer's insurance has gaps\n\nThis is typically equivalent to 1-2 months of full salary. Anything beyond that should flow home — it earns more there and is harder to lose to local spending temptation.",
      },
      {
        heading: "The return plan",
        body: "Before your contract ends, three things should be in place:\n\n1. **Final remittance plan** — what's the closing transfer when you receive end-of-service gratuity\n2. **Return investment** — where the gratuity will land (Sanchaypatra purchase, FDR, business capital)\n3. **Local closure** — closing accounts properly, getting tax clearance if needed, having transit funds\n\nGratuity is often a substantial amount (several months of salary). Workers who plan for it deploy it productively. Workers who don't often spend it within months of returning.",
      },
    ],
    actionStep: "Open an NRB-friendly Bangladesh account if you don't have one. Set up an automatic monthly transfer of a fixed amount from your Middle East account.",
    relatedModules: [],
    relatedCalculators: [],
    sourceNotes: ["NRB product details from Bangladesh Bank guidance. Remittance practices documented across Bangladesh-Gulf corridor research."],
  },

  {
    id: "middle-east-saving-while-on-contract-bn",
    slug: "middle-east-saving-while-on-contract-bn",
    category: "diaspora",
    title: "মধ্যপ্রাচ্যে চাকরিতে থাকাকালীন কীভাবে সঞ্চয় করবেন",
    subtitle: "মধ্যপ্রাচ্যে কন্ট্রাক্টে কাজ করছেন? ২-৫ বছরের একটা সুযোগ আছে অনেক টাকা জমানোর। কিন্তু পরিকল্পনা থাকতে হবে প্রথম মাস থেকেই।",
    tldr: "প্রতি মাসে নির্দিষ্ট অনুপাতে ভাগ করুন - ৬০% দেশে পাঠান (সঞ্চয়পত্র বা DPS), ৩০% সেখানে রাখুন (জরুরি তহবিল), ১০% নিজের জন্য। মধ্যপ্রাচ্যের ব্যাংকে রাখার চেয়ে দেশের NRB-বান্ধব পণ্যে বেশি সুদ পাবেন।",
    audience: "মধ্যপ্রাচ্যে কন্ট্রাক্টে কাজ করা বাংলাদেশি কর্মী (UAE, সৌদি, কাতার, কুয়েত, বাহরাইন, ওমান)",
    readingTimeMinutes: 5,
    language: "bn",
    difficulty: "easy",
    tags: ["country:middle-east", "contract worker", "remittance", "প্রবাসী", "সঞ্চয়পত্র", "RMG"],
    mangoReward: 14,
    lastUpdated: "2026-05-15",
    siblingExplainerSlug: "middle-east-saving-while-on-contract",
    visual: {
      type: "step-cards",
      description: "মধ্যপ্রাচ্য কন্ট্রাক্ট সঞ্চয় পরিকল্পনা",
      suggestedIcon: "Wallet",
      altText: "মধ্যপ্রাচ্যে সঞ্চয় কৌশল",
      steps: [
        { icon: "Calendar", label: "৬০% দেশে, ৩০% সেখানে, ১০% নিজে" },
        { icon: "Send", label: "প্রতি মাসে নির্দিষ্ট পরিমাণ পাঠান" },
        { icon: "PiggyBank", label: "সঞ্চয়পত্র বা DPS ব্যবহার করুন" },
        { icon: "Home", label: "ফেরার পরিকল্পনা রাখুন" },
      ],
    },
    sections: [
      {
        heading: "মূল কথা",
        body: "মধ্যপ্রাচ্যে কাজের কন্ট্রাক্ট সাধারণত ২-৫ বছরের।\n\nএই সময়ে আপনার সুযোগ আছে - বেতন ভালো, সেখানে ট্যাক্স নেই বা কম, আর দেশে NRB-বিশেষ পণ্য আছে।\n\nকিন্তু প্রথম মাস থেকেই পরিকল্পনা থাকতে হবে। যারা পরিকল্পনা করে - ফিরে আসার সময় ভালো জমা থাকে। যারা করে না - শূন্য হাতে ফেরে।",
      },
      {
        heading: "প্রতি মাসের ভাগ-বাঁটোয়ারা",
        body: "একটা সহজ নিয়ম মেনে চলুন:\n\n- **৬০% দেশে পাঠান** - আপনার নামে সঞ্চয়পত্র, পরিবারের সদস্যের নামে DPS\n- **৩০% সেখানে রাখুন** - মাসিক খরচ + জরুরি তহবিল\n- **১০% নিজের জন্য** - ছোট আনন্দ, অপ্রত্যাশিত খরচ\n\nএই শতাংশ আপনার নিজের অবস্থা অনুযায়ী বদলাতে পারেন। মূল কথা - বেশিরভাগ দেশে পাঠান, জরুরি অবস্থার জন্য কিছু সেখানে রাখুন।",
      },
      {
        heading: "দেশের NRB পণ্য কেন বেশি লাভজনক",
        body: "মধ্যপ্রাচ্যের ব্যাংকগুলো সাধারণত কম সুদ দেয় (১-৩%)।\n\nবাংলাদেশের NRB-বান্ধব পণ্যে আপনি পাবেন:\n\n- **NFCD অ্যাকাউন্ট** - USD-তে রাখলে ৫-৭% সুদ (বর্তমান হার বাংলাদেশ ব্যাংক থেকে যাচাই করুন)\n- **Wage Earner Development Bond** - টাকায় ১০%+ সুদ\n- **সঞ্চয়পত্র** - পরিবারের TIN-ধারী সদস্যের মাধ্যমে কেনা যায়\n\nএজন্যই মধ্যপ্রাচ্যের ব্যাংকে রাখার চেয়ে দেশে পাঠানো বেশি লাভজনক।",
      },
      {
        heading: "সেখানে কতটা রাখা উচিত",
        body: "জরুরি অবস্থার জন্য সেখানেও কিছু রাখুন -\n\n- ২-৩ মাসের মূল খরচ\n- হঠাৎ দেশে ফেরার টিকেটের টাকা\n- চিকিৎসার অতিরিক্ত খরচ যদি কোম্পানি না দেয়\n\nএক-দুই মাসের পুরো বেতনের সমপরিমাণ যথেষ্ট। তার বেশি হলে দেশে পাঠান।",
      },
      {
        heading: "ফেরার পরিকল্পনা",
        body: "কন্ট্রাক্ট শেষ হওয়ার আগে তিনটি জিনিস ঠিক রাখুন:\n\n1. **শেষ রেমিটেন্স** - গ্র্যাচুইটি পাওয়ার পর কীভাবে পাঠাবেন\n2. **দেশে কোথায় বিনিয়োগ করবেন** - সঞ্চয়পত্র, FDR, ছোট ব্যবসা?\n3. **সেখানের শেষ কাজ** - অ্যাকাউন্ট ঠিকমতো বন্ধ, ফেরার ব্যবস্থা\n\nগ্র্যাচুইটি অনেক টাকা হতে পারে (কয়েক মাসের বেতন)। যারা পরিকল্পনা করে - তারা এই টাকা ভালোভাবে ব্যবহার করে। যারা করে না - কয়েক মাসেই খরচ হয়ে যায়।",
      },
    ],
    actionStep: "যদি এখনো NRB-বান্ধব দেশের অ্যাকাউন্ট না থাকে - এই মাসেই খুলুন। প্রতি মাসে নির্দিষ্ট পরিমাণ পাঠানোর ব্যবস্থা করুন।",
    relatedModules: [],
    relatedCalculators: [],
    sourceNotes: ["NRB পণ্যের বিস্তারিত তথ্য বাংলাদেশ ব্যাংকের নির্দেশিকা থেকে।"],
  },

  {
    id: "diaspora-investment-comparison-bd-vs-abroad",
    slug: "diaspora-investment-comparison-bd-vs-abroad",
    category: "diaspora",
    title: "Diaspora investing: Bangladesh vs your country of residence",
    subtitle: "Should you invest in Bangladesh, in your country of residence, or both? The answer depends on your timeline, your tax situation, and what you plan to do long-term.",
    tldr: "If you plan to return to Bangladesh in 5-10 years, keep meaningful Bangladesh investments — they hold value in the currency you'll eventually use. If you're settling permanently abroad, prioritise local tax-advantaged accounts but maintain some Bangladesh exposure for family support and diversification.",
    audience: "Diaspora Bangladeshis weighing where to invest savings",
    readingTimeMinutes: 5,
    language: "en",
    difficulty: "medium",
    tags: ["diaspora", "investing", "comparison", "NRB", "tax", "currency"],
    mangoReward: 14,
    lastUpdated: "2026-05-15",
    visual: {
      type: "table",
      description: "BD vs abroad investment comparison by scenario",
      suggestedIcon: "Scale",
      altText: "Investment location comparison",
    },
    sections: [
      {
        heading: "The fundamental question",
        body: "Where you should invest as a diaspora Bangladeshi depends on three things:\n\n1. **Your timeline** — are you returning to Bangladesh in 5-10 years, or permanently settled abroad?\n\n2. **Your tax situation** — does your country of residence tax worldwide income? Most do (US, UK, Canada, Australia). Gulf states generally don't.\n\n3. **Your purpose** — building retirement savings, supporting family, eventually buying property in Bangladesh, leaving wealth to children?\n\nThe answer is rarely 'all here' or 'all there.' It's typically a structured split based on these factors.",
      },
      {
        heading: "If you plan to return to Bangladesh",
        body: "Keep meaningful investments in Bangladesh:\n\n- **Currency match** — your eventual expenses will be in taka. Holding Bangladesh investments means no currency conversion risk at the moment you need them.\n\n- **NRB products** often beat what's available locally for safe returns (NFCD, Sanchaypatra equivalents through family)\n\n- **Property pre-purchase** if buying eventually — but with thorough due diligence (see Diaspora property explainer)\n\nKeep abroad:\n\n- Emergency fund in local currency\n- Tax-advantaged retirement accounts (worth their tax savings even if you withdraw early on return)\n- Investments that benefit from your local tax treaty status",
      },
      {
        heading: "If you're settling permanently abroad",
        body: "Prioritise your country of residence's tax-advantaged options:\n\n- **US**: 401(k) match first, then Roth IRA\n- **Canada**: TFSA first (for flexibility), RRSP as income grows\n- **UK**: ISA (Individual Savings Account) and pension contributions\n- **Australia**: Superannuation choice + voluntary contributions\n\nMaintain Bangladesh investments for specific purposes:\n\n- Family support backbone (DPS in parents' or sibling's name)\n- Diversification from concentration risk in your country of residence\n- Connection to home for eventual visits or partial return\n\nDon't try to outperform local options by sending all savings to Bangladesh. The tax advantages abroad usually outweigh the rate advantages.",
      },
      {
        heading: "If you're in the Gulf (tax-free residence)",
        body: "Different math entirely. With zero or near-zero personal tax in UAE, Saudi, Qatar, etc., your effective returns abroad and at home are more comparable.\n\nBangladesh NRB products in this case often produce the best after-tax return because:\n\n- Bangladesh NRB returns aren't taxed in Bangladesh\n- They're also not taxed in your Gulf residence\n- Local Gulf bank rates are typically low\n\nFor most Gulf-based Bangladeshi workers, sending the bulk of savings to Bangladesh NRB products is the optimal financial choice.",
      },
      {
        heading: "Currency risk — the often-missed factor",
        body: "Currency movements affect diaspora wealth significantly:\n\n- Taka has historically depreciated against major currencies (USD, EUR, GBP)\n- This means money you have in Bangladesh loses value in USD/GBP terms over time\n- Conversely, money in USD/GBP gains value in taka terms over time\n\nIf you're eventually returning, depreciating taka is irrelevant — you're returning to a taka economy.\n\nIf you're settling abroad, holding too much in taka can erode your effective wealth in your residence currency.\n\nDon't pick BD investments purely for the higher rate without considering currency drift over your time horizon.",
      },
    ],
    actionStep: "Write down: 1) Your timeline (return year or permanent abroad), 2) Your current investment locations and amounts, 3) Your purpose. Compare the split against this guide.",
    relatedModules: [],
    relatedCalculators: [],
    sourceNotes: ["Cross-border investment strategy frameworks adapted from general diaspora financial planning literature."],
  },

  {
    id: "returning-home-financial-checklist",
    slug: "returning-home-financial-checklist",
    category: "diaspora",
    title: "Returning to Bangladesh: financial checklist before you fly",
    subtitle: "Returning home after years abroad is exciting but financially complex. The 3-6 months before return determine whether you start strong or spend the first year fixing problems.",
    tldr: "Before returning to Bangladesh, close or transition foreign accounts properly, transfer funds through official channels, plan your first-year cash flow without your abroad salary, and prepare for tax residency change. The financial mistakes of returnees are mostly preventable with a checklist.",
    audience: "Diaspora Bangladeshis planning to return to Bangladesh permanently within the next 12 months",
    readingTimeMinutes: 5,
    language: "en",
    difficulty: "medium",
    tags: ["diaspora", "return migration", "tax residency", "remittance", "transition"],
    mangoReward: 14,
    lastUpdated: "2026-05-15",
    visual: {
      type: "checklist",
      description: "Pre-return financial checklist",
      suggestedIcon: "ListChecks",
      altText: "Returning home financial checklist",
    },
    sections: [
      {
        heading: "The 6-month window before return",
        body: "Returning home is rarely a single-day event financially. The transition typically takes 3-6 months of planning before the actual return date, plus another 3-6 months of settling afterward.\n\nGetting this window right means you arrive home with:\n\n- All money already transferred safely\n- Foreign accounts properly closed or transitioned to non-resident status\n- A clear picture of your tax obligations on both sides\n- Cash flow planned for the first 6-12 months without abroad salary\n- Insurance and healthcare gaps identified\n\nReturnees who skip this planning often spend the first year abroad solving problems they could have prevented.",
      },
      {
        heading: "6 months before: foreign account planning",
        body: "Each country has different rules for accounts held by non-residents:\n\n- **US accounts** — most can be maintained but require US address for some services. 401(k) and IRAs can continue but withdrawals incur penalties. Check with your provider.\n\n- **Canada accounts** — TFSA contributions stop when you become non-resident. RRSP funds can continue growing. Some banks will close accounts of non-residents.\n\n- **UK accounts** — ISAs lose their tax-advantaged status when you become non-resident. Pension funds remain.\n\n- **Australia accounts** — superannuation continues but contributions stop. Bank accounts can be maintained.\n\nDon't wait until the last week. Some closures take 30+ days, and some require in-person verification you can only do while still in the country.",
      },
      {
        heading: "3-4 months before: money transfer planning",
        body: "Plan your final remittance schedule:\n\n1. Keep abroad enough to cover final 2-3 months of expenses + flight + emergency buffer\n\n2. Transfer the rest in scheduled installments rather than one large transfer — this gives you better aggregate exchange rates and avoids triggering single-large-transaction scrutiny\n\n3. Use official channels — bank transfers, licensed remittance services. Document everything.\n\n4. Don't carry large amounts of cash on the flight home — customs declaration requirements above certain amounts, plus theft risk.\n\n5. Time large transfers around favorable exchange rate windows if you have flexibility.",
      },
      {
        heading: "Final months: tax residency transition",
        body: "Your tax residency status changes when you move. This has real implications:\n\n- **Tax year split** — your country of residence's tax year continues until your departure date. You typically need to file a final 'departing resident' or partial-year return.\n\n- **Foreign income reporting** — until your departure date, your home country considers you a tax resident. Income earned in Bangladesh after departure but before tax year-end may need reporting.\n\n- **Bangladesh tax residency** — kicks in based on physical presence (182-day rule typically). You may have a partial-year split where you're partially resident in both countries.\n\n- **Year of return tax return in Bangladesh** — file with NBR for the tax year of return, reporting BD-sourced income for that portion of the year.\n\nThis is genuinely complex. A one-time consultation with a tax professional in both countries (cost: USD 200-500 in country of residence, Tk 3,000-10,000 in Bangladesh) is almost always worth it.",
      },
      {
        heading: "First 90 days after arrival",
        body: "1. **Verify all transfers landed correctly** in Bangladesh accounts\n\n2. **Reactivate or update Bangladesh accounts** — your home address, phone number, KYC may have been pending\n\n3. **Get health insurance** — abroad coverage usually ends on departure. Bangladesh health insurance needs to be in place before any medical event.\n\n4. **Plan first-year cash flow without abroad income** — most returnees overestimate how quickly they'll earn equivalent income locally\n\n5. **Don't make major financial commitments in the first 3 months** — property purchase, business investment, etc. Settle first, decide later.\n\nThe transition is psychological as much as financial. Returnees who make big moves in their first 90 days often regret them.",
      },
    ],
    actionStep: "If you're planning return within 12 months, start the checklist now. Foreign account decisions and tax planning take time — don't wait until the final month.",
    relatedModules: [],
    relatedCalculators: [],
    sourceNotes: ["Cross-border tax transition principles from general international tax frameworks. Specific country rules require local professional advice."],
  },

  // ════════════════════════════════════════════════════════════
  // CONTENT GAPS — fill missing scenario/comparison topics
  // ════════════════════════════════════════════════════════════

  {
    id: "windfall-what-to-do",
    slug: "windfall-what-to-do",
    category: "scenario",
    title: "Sudden Tk 10 lakh? What to do with a windfall",
    subtitle: "Receiving a large unexpected sum — inheritance, gratuity, bonus, property sale — triggers specific psychological biases. The 30-day rule prevents most regret-decisions.",
    tldr: "Don't decide immediately. Park the entire amount in a savings account for 30 days. Use that time to inventory debts, top up emergency fund, identify tax-advantaged opportunities. Then allocate by goal, not by emotion.",
    audience: "Anyone who has recently received or is about to receive an unexpected large sum",
    readingTimeMinutes: 4,
    language: "en",
    difficulty: "easy",
    tags: ["windfall", "inheritance", "bonus", "decision-making", "allocation"],
    mangoReward: 12,
    lastUpdated: "2026-05-15",
    visual: {
      type: "step-cards",
      description: "Windfall decision framework",
      suggestedIcon: "Sparkles",
      altText: "Windfall allocation steps",
      steps: [
        { icon: "Pause", label: "Step 1: 30-day pause" },
        { icon: "List", label: "Step 2: Inventory situation" },
        { icon: "Calculator", label: "Step 3: Run the math" },
        { icon: "ArrowRight", label: "Step 4: Allocate by goal" },
      ],
    },
    sections: [
      {
        heading: "The 30-day rule",
        body: "Behavioral finance research consistently shows: decisions made within the first week of receiving a windfall are often regretted within a year.\n\nTwo specific biases drive this:\n\n- **House money effect** — money that arrives 'free' feels less real than money you worked for. You take risks with it you wouldn't take with your regular savings.\n\n- **Mental accounting** — the windfall feels separate from your normal financial life, so it gets spent on things you'd never spend regular income on.\n\nThe fix: park the entire amount in a savings account. Don't decide. Don't spend. Don't lend. Don't invest. Wait 30 days.",
      },
      {
        heading: "What to do in those 30 days",
        body: "**Week 1**: Inventory your situation — all debts with interest rates, current savings locations, emergency fund status, top 3 goals.\n\n**Week 2**: Run the math — how much would clear debt above 12%? How much would top up emergency fund to 6 months? How much would max your tax investment rebate?\n\n**Week 3**: Talk to one trusted person — not someone who benefits from your decision. Get a second perspective.\n\n**Week 4**: Decide and execute. By now you can decide rationally instead of emotionally.",
      },
      {
        heading: "Standard allocation framework",
        body: "After the 30 days, for a typical Tk 10 lakh windfall:\n\n1. **Clear high-interest debt** (anything above 14%) — guaranteed return equal to the debt rate\n\n2. **Top up emergency fund** to 6 months of essential expenses\n\n3. **Max tax-advantaged investments** — Sanchaypatra/DPS to fill your investment rebate ceiling (25% of taxable income × 15% rebate = significant tax saving)\n\n4. **Allocate remainder by goal**:\n   - 1-2 year goals → FDR or laddered short-term products\n   - 3-5 year goals → Sanchaypatra\n   - Long-term wealth → mix of Sanchaypatra, equity, small gold\n\nIf truly unsure, default to Sanchaypatra. When in doubt, choose certainty.",
      },
      {
        heading: "What to avoid",
        body: "- **Lifestyle upgrade** — new car, renovation, upgraded apartment. Not wrong purchases per se, but wrong as immediate windfall responses.\n\n- **Lending to family/friends without process** — they often appear quickly when a windfall is known. Have a clear policy: documented, repayment schedule, capped at a percentage you've decided.\n\n- **One big bet** — entire amount in one stock, one business, one scheme. Concentration risk plus house money bias = path to losing it all.\n\n- **Telling extended family the exact amount** — at least until your plan is set.",
      },
    ],
    actionStep: "Move the windfall to a separate savings account today. Set a calendar reminder for 30 days from now to make the decision.",
    relatedModules: ["z2-3", "z8-2"],
    relatedCalculators: ["portfolio-builder"],
  },

  {
    id: "prepay-home-loan-or-invest",
    slug: "prepay-home-loan-or-invest",
    category: "scenario",
    title: "Should I prepay my home loan or invest the money instead?",
    subtitle: "Compare your loan rate to your expected investment return after tax. The decision is closer than people think. A hybrid approach often beats both extremes.",
    tldr: "If your loan rate is more than 1% above Sanchaypatra net return, lean toward prepayment. If Sanchaypatra net return is higher, lean toward investing. Within 1%, do a hybrid. Never sacrifice your emergency fund for prepayment.",
    audience: "Homeowners with active home loans considering prepayment",
    readingTimeMinutes: 5,
    language: "en",
    difficulty: "medium",
    tags: ["home loan", "prepayment", "investment decision", "opportunity cost"],
    mangoReward: 12,
    lastUpdated: "2026-05-15",
    visual: {
      type: "table",
      description: "Prepay vs invest decision matrix",
      suggestedIcon: "GitFork",
      altText: "Home loan prepayment decision matrix",
    },
    sections: [
      {
        heading: "The simple decision rule",
        body: "Compare:\n\n- Your home loan interest rate (typically 9-12% in Bangladesh)\n- Sanchaypatra net return after TDS (typically 9-9.5%)\n\nIf loan rate is more than 1% above Sanchaypatra net: lean toward prepayment\nIf Sanchaypatra net is higher than loan rate: lean toward investing\nWithin 1% either way: hybrid approach often works best\n\nBut numbers don't tell the whole story.",
      },
      {
        heading: "Three factors that complicate the math",
        body: "1. **Risk profile** — Sanchaypatra is government-backed (very safe). Equity investments aren't guaranteed.\n\n2. **Liquidity** — Money in Sanchaypatra is recoverable (with penalty). Money paid against your loan is gone permanently — you'd need a new loan to access it.\n\n3. **Psychological cost** — Debt creates real mental burden. Many people significantly underestimate the value of being debt-free.",
      },
      {
        heading: "Case for prepayment",
        body: "- **Guaranteed return** — prepaying a 10% loan is mathematically a 10% guaranteed return. No safe investment offers that.\n\n- **Psychological freedom** — removing the loan often improves life quality more than the math captures.\n\n- **Forced-seller protection** — if your income disrupts, having no mortgage means much less financial pressure.",
      },
      {
        heading: "Case for investing instead",
        body: "- **Liquidity preservation** — investment funds remain accessible (with penalty); prepaid amounts are gone.\n\n- **Diversification** — all-in on real estate is concentration risk.\n\n- **Tax advantage** — Sanchaypatra investments qualify for 15% rebate, effectively adding 1.5% to post-tax return.",
      },
      {
        heading: "The hybrid approach",
        body: "For many homeowners, the best answer is 'both, partially':\n\n1. Maintain your emergency fund — don't drain it for prepayment\n2. Continue monthly Sanchaypatra/DPS for tax benefits\n3. Direct lump sums (Eid bonus, annual bonus, gratuity) 70% to prepayment and 30% to additional investment\n4. Re-evaluate annually\n\nThis avoids the all-or-nothing trap and matches how most people actually feel about their money.",
      },
      {
        heading: "The mistake to avoid",
        body: "Aggressive prepayment at the cost of emergency reserves. Example: you have Tk 5 lakh, use Tk 4 lakh for prepayment. Then a Tk 2 lakh medical bill hits. You're forced to take a personal loan at 16% to cover it.\n\nYou effectively swapped 10% home loan debt for 16% personal loan debt. Always keep reserves before any prepayment.",
      },
    ],
    actionStep: "Find your exact home loan rate. Compare against current Sanchaypatra net return. Apply the simple rule. If considering significant prepayment, verify your emergency fund first.",
    relatedModules: ["z3-1", "z8-3"],
    relatedCalculators: ["emi-calculator"],
  },

  {
    id: "bkash-vs-bank-dps-comparison",
    slug: "bkash-vs-bank-dps-comparison",
    category: "comparison",
    title: "bKash DPS vs bank DPS: which one for you?",
    subtitle: "bKash, Nagad, and traditional banks all offer DPS now. They're similar in structure but different in convenience, rates, and access. The choice mostly depends on how you'll actually use it.",
    tldr: "bKash and Nagad DPS are convenient for app-based users with smaller monthly amounts — easier signup, fully mobile. Bank DPS often has slightly higher rates and better for larger amounts. For most first-time savers, MFS DPS is the easier path to actually start.",
    audience: "Anyone considering starting a DPS — first-time savers especially",
    readingTimeMinutes: 4,
    language: "en",
    difficulty: "easy",
    tags: ["DPS", "bKash", "Nagad", "comparison", "savings"],
    mangoReward: 12,
    lastUpdated: "2026-05-15",
    visual: {
      type: "table",
      description: "MFS DPS vs Bank DPS comparison",
      suggestedIcon: "Scale",
      altText: "DPS comparison table",
    },
    sections: [
      {
        heading: "The quick answer",
        body: "**Choose MFS (bKash/Nagad) DPS if:**\n- You're comfortable with mobile apps\n- Monthly amount is Tk 500-3,000\n- You want quick setup without bank visits\n- You're new to formal savings products\n\n**Choose Bank DPS if:**\n- Monthly amount is Tk 5,000+\n- You prefer in-person banking\n- You're already a customer with the bank\n- You want slightly higher interest rate (typically 0.5-1% more)\n\nBoth are legitimate. The structural promise is the same: fixed monthly deposit + compound interest + lump sum at maturity. Differences are operational, not fundamental.",
      },
      {
        heading: "How they're similar",
        body: "- Both lock you into monthly contributions for a fixed term (typically 3-10 years)\n- Both pay compound interest\n- Both penalize early withdrawal with lower returns\n- Both qualify for the 15% tax investment rebate\n- Both auto-debit from your account on the scheduled day\n- Both deliver the maturity amount in one lump sum",
      },
      {
        heading: "How they differ",
        body: "**bKash/Nagad DPS:**\n- Open in 10-15 minutes via app with NID\n- Minimum often Tk 500/month\n- Maximum typically Tk 3,000-5,000/month\n- Interest rates around 6-7.5%\n- Funds auto-deduct from MFS wallet\n- Some require minimum wallet balance for auto-debit\n\n**Bank DPS:**\n- Requires bank visit usually (some banks have online opening for existing customers)\n- Minimum often Tk 500-1,000/month\n- Maximum can be higher (Tk 20,000-50,000/month at major banks)\n- Interest rates around 7-9%\n- Funds auto-deduct from your bank account\n- More flexibility in tenure choices typically",
      },
      {
        heading: "Common mistakes",
        body: "**Mistake 1:** Opening MFS DPS without keeping minimum balance for auto-debit. Each failed deduction may incur a fee or skip — disrupting the compounding.\n\n**Mistake 2:** Setting the auto-debit date before your salary lands. If salary is on the 5th and DPS deducts on the 1st, you'll have failed months.\n\n**Mistake 3:** Choosing too long a tenure for an uncertain income. Better to start with 3-year DPS than commit to 10-year if your job is unstable.\n\n**Mistake 4:** Treating MFS DPS as your only savings. The interest rate is decent but not the highest available. Use as a foundation, not a maximum.",
      },
    ],
    actionStep: "If you're starting your first DPS, open one on bKash or Nagad this week — start at Tk 500-1,000/month. You can always add a higher-amount bank DPS later as income grows.",
    relatedModules: ["z5-3"],
    relatedCalculators: [],
    sourceNotes: ["MFS DPS terms vary by provider — verify current rates and limits in the respective app."],
  },

  {
    id: "should-i-open-bo-account-now",
    slug: "should-i-open-bo-account-now",
    category: "scenario",
    title: "Should I open a BO account before I'm ready to invest?",
    subtitle: "Many people delay opening a BO account because they're not ready to invest. The opposite is often the right move — open the infrastructure now, decide on investments later without paperwork pressure.",
    tldr: "Open your BO account now even if you don't plan to invest immediately. Account opening takes 1-2 weeks. Doing it during a calm period prevents rushed first investments when an opportunity or tip arrives. Annual maintenance is minimal (~Tk 1,000-1,500).",
    audience: "Adults considering future stock investment, even if not ready today",
    readingTimeMinutes: 4,
    language: "en",
    difficulty: "easy",
    tags: ["BO account", "DSE", "infrastructure", "preparation", "stocks"],
    mangoReward: 12,
    lastUpdated: "2026-05-15",
    visual: {
      type: "checklist",
      description: "BO account opening checklist",
      suggestedIcon: "ListChecks",
      altText: "BO account preparation checklist",
    },
    sections: [
      {
        heading: "Why people delay — and why it costs them",
        body: "The classic pattern:\n\n1. Read about stocks → get interested → 'I'll look into it later'\n2. Months pass\n3. A hot tip arrives via WhatsApp or friend\n4. Scramble to open BO account quickly\n5. Either miss the opportunity or rush into a bad first investment because you don't want the setup effort to feel wasted\n\nBoth outcomes are bad. The fix: open the infrastructure during a calm period, decide on investments later without time pressure.",
      },
      {
        heading: "What opening a BO account involves",
        body: "Process takes 1-2 weeks:\n\n1. Choose a BSEC-licensed broker (verify at sec.gov.bd)\n2. Submit documents: NID, TIN, bank details, 2 passport photos, nominee info\n3. KYC verification (some brokers have eKYC, others require in-person)\n4. Broker submits to CDBL\n5. CDBL creates your 16-digit BO account number\n6. You can now trade\n\nThere's no fee at most brokers to open. Some require small initial deposit (Tk 5,000-25,000) which becomes your trading balance.",
      },
      {
        heading: "Cost of having an inactive BO account",
        body: "Most brokers charge:\n- Annual maintenance fee: Tk 500-1,000\n- CDBL annual fee: Tk 500\n\nSo roughly Tk 1,000-1,500/year for the infrastructure.\n\nFor most adults who plan to invest within the next 12-24 months, this is reasonable optionality cost. If you're certain you won't invest in stocks for 2+ years, the maintenance fees may not be worth it.",
      },
      {
        heading: "Benefits of having an open account",
        body: "- **Time to research without paperwork pressure** — you can spend months studying potential investments before deciding\n\n- **Buy small test positions** — even Tk 5,000-10,000 trades let you learn the mechanics with low stakes\n\n- **IPO participation** — some IPOs require existing BO account\n\n- **Inheritance and gifts** — you need a BO account to hold any shares legally if someone gifts or bequeaths them to you\n\n- **Better first-investment quality** — calm research beats rushed decisions",
      },
    ],
    actionStep: "Research 2-3 BSEC-licensed brokers this week. Choose one and start the account opening process. You don't have to invest anything to have an account ready.",
    relatedModules: ["z6-3"],
    relatedCalculators: [],
    sourceNotes: ["BO account opening process documented at sec.gov.bd and CDBL guidelines."],
  },

];
