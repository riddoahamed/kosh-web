import type { Module } from "@/types/curriculum";

export const moduleZ4_1: Module = {
  id: "z4-1",
  zoneId: "zone-4",
  title: "Do you actually owe tax? (Most young earners don't know)",
  tagline: "The tax-free threshold, the slabs, and what you legally owe.",
  estimatedMinutes: 10,
  rateNote: `Tax thresholds and slab rates are set by NBR annually in the national budget. The figures in this module reflect general parameters — always verify current year thresholds at www.nbr.gov.bd before filing.`,
  hook: `"The tax-free threshold in Bangladesh is Tk 3.5 lakh annually (Tk 29,167/month) for general taxpayers. If you earn above this, you might owe income tax. 'Might' — because there are legal ways to reduce taxable income through investments that may bring you below the threshold even at higher salaries. Most young earners have never calculated whether they owe tax. This module is that calculation."`,
  context: `Bangladesh's income tax system is self-assessment based — meaning you are responsible for knowing whether you owe tax and filing accordingly. The National Board of Revenue (NBR) sets the rules. Most young salaried earners are confused about whether they need to file, what rate applies to them, and what deductions they are entitled to.`,
  teaching: `
## Bangladesh income tax basics

Income tax in Bangladesh is levied on total annual income from all sources: salary, business income, rental income, investment returns above certain thresholds.

**Tax-free threshold (general):** Annual income up to Tk 3.5 lakh is tax-free. (Higher for women and senior citizens — verify current rates.)

**Tax slabs (illustrative — verify current year at NBR):**
- Up to Tk 3.5 lakh: 0%
- Tk 3.5 lakh to Tk 4.5 lakh: 5%
- Tk 4.5 lakh to Tk 7.5 lakh: 10%
- Tk 7.5 lakh to Tk 11.5 lakh: 15%
- Tk 11.5 lakh to Tk 16.5 lakh: 20%
- Above Tk 16.5 lakh: 25%

**Source deduction:** Many salaried earners have tax deducted at source by their employer (TDS). If your employer deducts TDS correctly, you may already be paying what you owe — but you still must file a return if your income is above the threshold.

## Investment rebate (tax-saving through investing)

The most important mechanism for reducing tax legally is the investment rebate. You can claim a tax rebate of 15% of your qualifying investments up to a ceiling of 25% of your taxable income or Tk 1 crore (whichever is lower).

Qualifying investments include: DPS, Sanchaypatra, life insurance premiums, approved mutual fund units, and contributions to recognized provident funds.

This means: a person earning Tk 8 lakh annually who invests Tk 1 lakh in qualifying instruments saves approximately Tk 15,000 in tax — a guaranteed 15% return on the invested amount just from the tax saving.

## Do you need to file a return?

Filing a return is required if: your income exceeds the tax-free threshold, you own certain assets (car, property above certain value), or you have a TIN.

Even if you owe zero tax, you may be required to file a "nil return" if you have a TIN or fall into categories NBR has designated for mandatory filing.

The safest approach: if your income is above the threshold, file. The penalty for not filing when required is worse than filing when not strictly required.
  `,
  actionPrompt: {
    text: "Calculate your annual income. Is it above the current tax-free threshold? Check www.nbr.gov.bd for the current year's threshold to be certain.",
    ctaButtonText: "I calculated my tax position",
  },
  quiz: [
    {
      question: "What is the investment rebate rate on qualifying investments in Bangladesh's income tax system?",
      options: ["5%", "10%", "15% of the qualifying investment amount", "25%"],
      correctIndex: 2,
      explanation: "You receive a tax rebate of 15% of qualifying investments. If you invest Tk 1 lakh in DPS or Sanchaypatra, your tax liability reduces by Tk 15,000. This is a guaranteed 15% return purely from tax saving.",
    },
    {
      question: "True or False: If your employer deducts TDS from your salary, you do not need to file a tax return.",
      options: [
        "True — TDS means your tax is already handled",
        "False — you may still be required to file a return even if TDS has been deducted correctly",
      ],
      correctIndex: 1,
      explanation: "TDS covers the tax payment but does not replace the filing requirement. If your income exceeds the threshold, you are required to file a return regardless of whether TDS was deducted.",
    },
    {
      question: "Which of the following qualifies for the investment rebate?",
      options: [
        "Sanchaypatra, DPS, and approved life insurance premiums",
        "Any savings account balance",
        "Stock market investments only",
        "Cash kept at home",
      ],
      correctIndex: 0,
      explanation: "Qualifying investments for rebate include Sanchaypatra, DPS, life insurance premiums for approved products, and approved mutual fund units. Regular savings accounts and stock market investments through BO accounts do not typically qualify for the same rebate treatment.",
    },
    {
      question: "If you have a TIN and earn below the tax-free threshold, do you need to file a return?",
      options: [
        "Never — below threshold means no obligation",
        "Possibly — NBR may require a nil return even at zero tax liability",
        "Only if you also have investment income",
        "Only if you are employed by a large corporation",
      ],
      correctIndex: 1,
      explanation: "Having a TIN creates certain filing obligations that may apply even at zero tax liability. When in doubt, file a nil return — the cost is minimal and the risk of non-compliance is avoided.",
    },
    {
      question: "A salaried person earns Tk 8 lakh per year. They invest Tk 1 lakh in DPS. Their tax saving from the investment rebate is approximately:",
      options: ["Tk 1 lakh", "Tk 8,000", "Tk 15,000", "Tk 80,000"],
      correctIndex: 2,
      explanation: "Investment rebate is 15% of qualifying investment amount. 15% × Tk 1 lakh = Tk 15,000 in tax reduction. This is the incentive the government provides to encourage formal savings products.",
    },
  ],
  whatsNext: {
    nextModuleId: "z4-2",
    preview: "The investment that saves you the most tax might also be the one with the best return. Here's how to combine both.",
  },
};

export const moduleZ4_2: Module = {
  id: "z4-2",
  zoneId: "zone-4",
  title: "Tax-saving investments: the ones that pay you twice",
  tagline: "Some investments reduce your tax AND earn returns. Most people miss this.",
  estimatedMinutes: 10,
  rateNote: `Rates and rebate percentages are subject to annual NBR budget changes. Verify current year figures at www.nbr.gov.bd before making decisions based on tax calculations.`,
  hook: `"There is a category of financial decision in Bangladesh that most young earners ignore: investments that simultaneously earn a market return AND reduce your tax liability. Sanchaypatra + investment rebate is not just a savings instrument — it is a tax-optimization tool. Understanding this means your effective return on certain investments is higher than the stated rate."`,
  context: `The combination of qualifying investment returns plus the investment rebate creates a dual-benefit structure that most people underutilize simply because nobody explains the math clearly. This module shows the combined return calculation.`,
  teaching: `
## How dual-benefit investments work

When you invest in a qualifying instrument (Sanchaypatra, DPS, life insurance), two things happen:

1. The instrument earns its stated interest rate over the term.
2. Your income tax liability reduces by 15% of the amount invested (investment rebate).

The combined effect: the effective return on the investment is higher than the stated rate.

**Example calculation (illustrative):**
You invest Tk 1 lakh in Sanchaypatra at approximately 10% annual (post-tax rate after source deduction). Additionally, your income tax bill decreases by Tk 15,000 (15% rebate on Tk 1 lakh invested). Your effective first-year benefit: Tk 10,000 (interest) + Tk 15,000 (tax saving) = Tk 25,000 on a Tk 1 lakh investment — a 25% effective first-year return. In subsequent years, only the interest applies — but the rebate benefit resets if you make new qualifying investments annually.

## Which instruments qualify

**Sanchaypatra:** Fully qualifying. Every taka in Sanchaypatra earns both interest and rebate eligibility.

**DPS:** Qualifying. Monthly DPS installments count toward the rebate calculation at year-end.

**Life insurance premiums:** Annual premiums on approved life insurance policies qualify. This creates a dual benefit: you are insuring yourself and reducing tax simultaneously.

**Provident fund contributions:** Employee contributions to recognized provident funds are qualifying investments. Many formal sector employees have this deducted at source without realizing the tax benefit.

**Mutual funds (approved):** Investments in Bangladesh Securities Exchange Commission-approved mutual fund units qualify.

## Ceiling on the rebate

The maximum qualifying investment for rebate purposes is the lower of: (a) 25% of your taxable income or (b) Tk 1 crore. For most young earners, limit (a) applies. If your taxable income is Tk 8 lakh, the maximum qualifying investment is Tk 2 lakh (25% × Tk 8 lakh).

## Practical planning

At the start of each financial year, calculate your rebate ceiling. Plan qualifying investments to maximize rebate utilization. If you are already investing in DPS and Sanchaypatra, you may be claiming the rebate without realizing it — or you may be leaving rebate savings unclaimed because your investments are below the ceiling.

## What does NOT qualify

Regular bank savings accounts and FDRs do not qualify for the investment rebate. Direct stock purchases through BO accounts do not qualify. Real estate purchases do not qualify. Only specific approved instruments qualify.
  `,
  actionPrompt: {
    text: "Estimate your taxable income and calculate your maximum qualifying investment amount (25% of taxable income). Compare this to your actual current qualifying investments. Are you fully utilizing the rebate?",
    ctaButtonText: "I calculated my rebate opportunity",
  },
  quiz: [
    {
      question: "If you invest Tk 2 lakh in qualifying instruments, your income tax reduces by approximately:",
      options: ["Tk 2 lakh", "Tk 50,000", "Tk 30,000 (15% of Tk 2 lakh)", "Tk 10,000"],
      correctIndex: 2,
      explanation: "Investment rebate = 15% of qualifying investment. 15% × Tk 2 lakh = Tk 30,000 reduction in tax liability.",
    },
    {
      question: "Does a regular bank FDR qualify for the investment rebate?",
      options: [
        "Yes — all savings instruments qualify",
        "No — only Sanchaypatra, DPS, life insurance, and approved mutual funds qualify",
        "Yes — but only for amounts above Tk 50,000",
        "Only if the FDR term is more than 3 years",
      ],
      correctIndex: 1,
      explanation: "Bank FDRs do not qualify for the investment rebate. Qualifying instruments are specifically: Sanchaypatra, DPS, life insurance premiums, approved mutual fund units, and provident fund contributions.",
    },
    {
      question: "What is the maximum qualifying investment ceiling for someone with taxable income of Tk 6 lakh?",
      options: ["Tk 6 lakh", "Tk 1 crore", "Tk 1.5 lakh (25% of Tk 6 lakh)", "Tk 90,000"],
      correctIndex: 2,
      explanation: "Qualifying investment ceiling = 25% of taxable income or Tk 1 crore, whichever is lower. 25% × Tk 6 lakh = Tk 1.5 lakh. Investments above this ceiling do not yield additional rebate.",
    },
    {
      question: "True or False: The investment rebate benefit repeats every year as long as you make new qualifying investments.",
      options: [
        "True — new annual investments generate new rebate claims each year",
        "False — the rebate applies only in the first year of investment",
      ],
      correctIndex: 0,
      explanation: "The rebate applies annually to new qualifying investments made in that financial year. If you invest Tk 1 lakh in DPS annually, you claim the rebate on each year's contribution.",
    },
    {
      question: "Which combination creates the highest effective return from a tax perspective?",
      options: [
        "FDR only",
        "Sanchaypatra (high interest) + investment rebate claim",
        "Savings account only",
        "Stock market investments only",
      ],
      correctIndex: 1,
      explanation: "Sanchaypatra earns the highest safe interest rate AND qualifies for the 15% investment rebate. The combined first-year effective return exceeds any non-qualifying alternative. This dual benefit is the most tax-efficient savings choice for most Bangladeshis.",
    },
  ],
  whatsNext: { nextModuleId: "z4-3", preview: "You know what you owe. Now learn how to tell the government — step by step." },
};

export const moduleZ4_3: Module = {
  id: "z4-3",
  zoneId: "zone-4",
  title: "Filing a tax return: the step-by-step nobody taught you",
  tagline: "15 minutes of reading. Less anxiety about tax for the rest of your life.",
  estimatedMinutes: 12,
  rateNote: `Return filing deadlines and procedures are established by NBR and may change annually. Always confirm the current year's deadline and form requirements at www.nbr.gov.bd.`,
  hook: `"There is no class in Bangladesh that clearly explains how to file a tax return. No YouTube video that covers it completely for salaried earners. No friend who has done it and can explain it plainly. This module is that missing explanation. After reading it, you will know exactly what to do, what documents to gather, and where to submit."`,
  context: `Most Bangladeshi young adults who need to file returns either avoid it (creating risk of penalties) or pay a tax consultant for a simple return they could file themselves. This module covers return filing for salaried employees — the most common situation for Kosh users.`,
  teaching: `
## Who needs to file

You must file if: income exceeds the tax-free threshold, you have a TIN (may require nil return), you own certain specified assets. When in doubt: file. The penalty for not filing when required is larger than the effort of filing.

## Documents to gather

- NID (National Identity Card)
- TIN certificate (if you don't have one, get it first — Module Z4-5 covers this)
- Salary certificate from employer (showing gross salary, TDS deducted)
- Bank account statements for the financial year
- Investment proofs: DPS passbook, Sanchaypatra purchase receipts, life insurance premium payment receipts
- Any other income documents (rental income, freelance payments, dividends)

## The return form

NBR has multiple return forms. For most salaried individuals, the relevant form is the IT-11GA or its current equivalent. NBR updates the forms — download the current version from www.nbr.gov.bd in the return filing season (typically August-November for the July-June financial year).

## Where to submit

**Option 1 — Tax office (manual):** Find the tax circle office responsible for your area. This is based on your residential address. Bring documents, fill the form, submit with proof of payment if any tax is owed. Get receipt.

**Option 2 — e-Return (online):** NBR's e-return system at etaxnbr.gov.bd allows online filing. Create an account with your TIN and NID. The system guides you through each section. This is faster and avoids queues.

**Option 3 — Tax consultant:** For straightforward salaried returns, this costs Tk 300-1,000 at most. If your tax situation is simple, it is unnecessary but reasonable if you are overwhelmed the first time.

## Deadline

The standard deadline for individual returns is November 30th each year for the July-June financial year. NBR may extend deadlines — check the current year's deadline each October.

## If you owe tax

If your employer has deducted TDS correctly, you likely owe minimal or zero additional tax. If you owe additional tax, pay it via a bank challan at an authorized bank before or during submission. Keep the payment receipt.

## After filing

You receive an acknowledgment receipt. Keep this. NBR also conducts return submission events at Tax Fairs around the country in October-November — these are well-organized, have volunteers to help, and are a practical option for first-time filers.

## Common mistakes to avoid

- Forgetting to claim investment rebate (leaving money on the table)
- Not reporting bank interest income (banks report this to NBR)
- Missing the deadline and then not filing at all (file late rather than not filing)
- Using the wrong form (check NBR website for current forms)
  `,
  actionPrompt: {
    text: "Find your tax circle office (based on your residential area) and locate the current year's return form at www.nbr.gov.bd. Just know where they are before you need them.",
    ctaButtonText: "I know my tax circle and found the form",
  },
  quiz: [
    {
      question: "What is the safest approach regarding filing a return when you are unsure if you are required to?",
      options: [
        "Wait until NBR contacts you",
        "File — the penalty for not filing when required exceeds the effort of filing",
        "Ask a friend who is in the same salary bracket",
        "File only if your employer tells you to",
      ],
      correctIndex: 1,
      explanation: "When in doubt, file. Late filing or non-filing penalties are more costly than the time required to file. Erring toward filing is the lower-risk choice.",
    },
    {
      question: "What document from your employer is essential for filing a salaried tax return?",
      options: [
        "Employment contract",
        "Salary certificate showing gross salary and TDS deducted",
        "Monthly payslips only",
        "Letter from HR confirming employment",
      ],
      correctIndex: 1,
      explanation: "The salary certificate (often called TDS certificate) shows your total annual salary and the total TDS deducted — the two key inputs for the return calculation. Most employers provide this on request.",
    },
    {
      question: "The e-return system for Bangladesh tax filing is available at:",
      options: ["nrb.gov.bd", "bangladeshbank.gov.bd", "etaxnbr.gov.bd", "taxoffice.gov.bd"],
      correctIndex: 2,
      explanation: "NBR's online e-return filing system is at etaxnbr.gov.bd. You need your TIN and NID to register. Online filing avoids queues and creates a digital record.",
    },
    {
      question: "If you owe additional tax beyond what was deducted at source, when should you pay it?",
      options: [
        "After submitting the return",
        "Before or during return submission, via bank challan at an authorized bank",
        "Within 30 days of receiving an NBR notice",
        "You can pay monthly installments with no deadline",
      ],
      correctIndex: 1,
      explanation: "Any additional tax due should be paid before or during submission via a treasury challan. The payment receipt is attached to the return as proof of payment.",
    },
    {
      question: "True or False: If you miss the return filing deadline, the best course of action is to skip filing for that year.",
      options: [
        "True — late filing has higher penalties than not filing",
        "False — late filing with a penalty is better than not filing at all",
      ],
      correctIndex: 1,
      explanation: "Late filing has a specific late penalty. Not filing when required creates a larger liability including potential prosecution for non-compliance. Always file, even late, rather than not filing.",
    },
    {
      question: "Sanchaypatra interest income is reported to NBR automatically. You must:",
      options: [
        "Also report it in your return as part of total income",
        "Not report it since tax is already deducted at source",
        "Only report it if it is above Tk 50,000",
        "Report it only if you sold the Sanchaypatra during the year",
      ],
      correctIndex: 0,
      explanation: "All income — including income from Sanchaypatra — must be reported in your return as total income. Source-deducted tax reduces your liability but does not remove the reporting requirement.",
    },
  ],
  whatsNext: { nextModuleId: "z4-4", preview: "Most people think they are not paying tax. They are — they just don't know what it's called." },
};

export const moduleZ4_4: Module = {
  id: "z4-4",
  zoneId: "zone-4",
  title: "The taxes you're already paying without knowing it",
  tagline: "VAT, TDS, and the invisible tax load on every transaction.",
  estimatedMinutes: 9,
  hook: `"Most people think they pay no tax because they have not filed a return. In reality, they pay taxes every day — on their mobile recharge, on restaurant bills, on bank interest, at the petrol pump. This invisible tax load adds up to tens of thousands of taka annually for many middle-income earners. Understanding it does not reduce what you owe, but it changes how you think about the relationship between you and the tax system."`,
  context: `Bangladesh has multiple layers of taxation beyond income tax. VAT, excise duties, and source deductions touch nearly every economic transaction. Most people have no mental model of this and therefore cannot evaluate whether their total tax burden is reasonable or how government services relate to their contributions.`,
  teaching: `
## VAT (Value Added Tax)

Bangladesh has a standard VAT rate of 15% on most goods and services at the retail level. This is embedded in prices at registered VAT-paying businesses. When you buy at a restaurant, pay for a hotel, purchase from a formal retailer, or use certain services, 15% of what you pay is VAT — which the business collects and remits to NBR.

You do not separately "pay" VAT — it is included in the price. But it is a real tax on consumption. A dinner out costing Tk 1,000 at a VAT-registered restaurant includes approximately Tk 130 in VAT.

**Mobile recharge:** VAT and supplementary duty are applied to mobile recharge. When you recharge Tk 100, a portion goes to taxes — leaving less than Tk 100 of actual airtime. The combined tax on mobile services (VAT + supplementary duty + surcharges) is significant — estimates suggest 25-30% of recharge value goes to taxes.

## TDS on bank interest

Your FDR and savings account interest is subject to source deduction: 10% for TIN holders, 15% for non-TIN holders. This is automatically deducted by the bank before paying you interest. This is why having a TIN reduces the tax on your bank interest.

If your savings account shows Tk 2,000 interest credited, the actual gross interest was approximately Tk 2,222 (if TDS was 10%) — the bank deducted Tk 222 before crediting you.

## Source tax on Sanchaypatra

Sanchaypatra interest is subject to 10% source deduction. Your stated return is before this deduction.

## Salary TDS

Most formally employed Bangladeshis have income tax deducted at source by their employer each month. This is the most visible form of direct taxation for salaried earners — but it is automatic and therefore easy to overlook in terms of its actual magnitude.

## Customs duties and supplementary duties

Import duties and supplementary duties are embedded in the prices of imported goods. When you buy an imported phone, a significant portion of the price is import duty. Bangladesh has some of the highest mobile device import duties in the region — contributing to why flagship phones cost substantially more here than in neighboring countries.

## Why this matters

Knowing your total tax contribution — direct taxes (income tax, TDS) plus indirect taxes (VAT, duties, levies) — creates a clearer picture of your relationship with government services and infrastructure. Most Bangladeshis are paying considerably more in total taxes than they realize.
  `,
  actionPrompt: {
    text: "Look at your last mobile recharge. Look at the last restaurant bill where VAT was charged. Estimate how much in indirect tax you have paid this month.",
    ctaButtonText: "I estimated my indirect tax load",
  },
  quiz: [
    {
      question: "When you pay Tk 1,000 at a VAT-registered restaurant in Bangladesh, approximately how much of that is VAT?",
      options: ["Tk 130-150 (15% VAT rate)", "Tk 0 — restaurants don't charge VAT", "Tk 300", "Exactly Tk 100"],
      correctIndex: 0,
      explanation: "Bangladesh standard VAT rate is 15%. At a VAT-registered restaurant, approximately Tk 130 of a Tk 1,000 bill is VAT (the exact amount depends on whether VAT is included in the displayed price or added on top).",
    },
    {
      question: "Why do TIN holders pay a lower source deduction rate on bank interest (10% vs 15%)?",
      options: [
        "TIN holders are rewarded for compliance with the tax system",
        "TIN holders have lower income",
        "Bangladesh Bank applies this differential",
        "It's a banking promotion for TIN registration",
      ],
      correctIndex: 0,
      explanation: "The 10% vs 15% differential is an NBR incentive for tax compliance. Having a TIN means you are registered in the tax system, which earns the lower source deduction rate on interest income.",
    },
    {
      question: "Mobile recharge of Tk 100 in Bangladesh typically gives you approximately how much actual airtime?",
      options: ["Exactly Tk 100", "Tk 90", "Tk 70-75 due to combined VAT, supplementary duty, and surcharges", "Tk 50"],
      correctIndex: 2,
      explanation: "The combined tax burden on mobile services in Bangladesh — VAT (15%) plus supplementary duties and surcharges — results in roughly 25-30% of the recharge amount going to taxes. Actual airtime value is typically Tk 70-75 per Tk 100 recharge.",
    },
    {
      question: "True or False: If your employer deducts TDS from your salary, you have already paid all taxes you owe to the government.",
      options: [
        "True — TDS is your complete tax payment",
        "False — TDS covers income tax at source but VAT, duties, and other indirect taxes are paid separately through consumption",
      ],
      correctIndex: 1,
      explanation: "TDS covers your direct income tax liability. Indirect taxes (VAT, duties, levies) are paid through everyday consumption regardless of income tax status. Your total tax contribution includes both direct and indirect taxes.",
    },
    {
      question: "Which of the following is NOT subject to source tax deduction (TDS) at the point of payment in Bangladesh?",
      options: [
        "Bank FDR interest",
        "Sanchaypatra interest",
        "Salary income above the tax threshold",
        "Cash kept in your wallet at home",
      ],
      correctIndex: 3,
      explanation: "Cash holdings are not taxable events in themselves. TDS applies at the point of earning income: bank interest, Sanchaypatra interest, salary. Static cash savings are not subject to TDS — though income used to accumulate them may have already been taxed.",
    },
  ],
  whatsNext: { nextModuleId: "z4-5", preview: "One number. 30 minutes. Required for Sanchaypatra, property, vehicles, and credit. Get it before you need it." },
};

export const moduleZ4_5: Module = {
  id: "z4-5",
  zoneId: "zone-4",
  title: "The TIN: get it before you need it",
  tagline: "30 minutes. Free. Required for more things than you think.",
  estimatedMinutes: 8,
  hook: `"No TIN, no Sanchaypatra above Tk 2 lakh. No TIN, no property registration. No TIN, no vehicle registration. No TIN, higher interest deduction on your bank account. No TIN, certain bank account and financial product restrictions. The TIN costs nothing to obtain and takes 30 minutes online. There is no good reason to not have one."`,
  context: `A Tax Identification Number (TIN) is issued by the National Board of Revenue (NBR) and is required for a growing list of financial and legal transactions in Bangladesh. Many young earners do not have one because they assume it is only for people who file taxes or earn above a certain threshold. This assumption is incorrect and increasingly costly.`,
  teaching: `
## What a TIN is

A TIN (Tax Identification Number) is a unique identification number assigned to each taxpayer by NBR. It is used to track financial transactions, cross-reference income sources, and identify individuals in the tax system. Having a TIN does not obligate you to pay tax if your income is below the threshold — it simply registers you in the system.

## Where you need a TIN

The list of transactions requiring a TIN has expanded significantly. Current requirements include (verify complete current list at www.nbr.gov.bd):
- Sanchaypatra purchase above Tk 2 lakh
- Property (land or apartment) registration
- Vehicle (car, motorcycle) registration
- Opening certain types of bank accounts
- Credit card applications (many banks)
- Company registration
- Trade license applications
- Import/export licenses
- Filing any tax return

## The bank interest difference

As covered in Z4-4: TIN holders face 10% source deduction on bank interest vs 15% for non-TIN holders. If you have Tk 5 lakh in FDR at 8% interest (Tk 40,000/year), the difference between 10% and 15% TDS is Tk 2,000/year in additional take-home interest. Over 5 years, this is Tk 10,000 — simply from having a TIN.

## How to get a TIN online

1. Go to www.secure.incometax.gov.bd/TINHome
2. Click "Register as a new taxpayer"
3. Select category: "Individual"
4. Enter NID number, date of birth, name as on NID
5. Fill in the required fields: address, income source description
6. Submit — TIN is issued immediately (or within a short processing period)
7. Download and save the TIN certificate

Required: NID, an email address, a phone number. No income threshold. No tax payment required. No visit to an office.

## If you already have a TIN you forgot about

If you have ever been formally employed by a large company, obtained a bank loan, or purchased property, you may already have a TIN without realizing it. Check at the NBR website by entering your NID number.

## What having a TIN does NOT mean

- It does not mean you owe tax (if income is below threshold)
- It does not mean you must file a return (though above-threshold earners with TINs should file)
- It does not mean NBR will audit you
- It is not a commitment to pay anything

It is simply identification in the tax system — similar to having an NID in the civil registration system.
  `,
  actionPrompt: {
    text: "Check if you already have a TIN at www.secure.incometax.gov.bd. If you do not have one, register this week. It takes 30 minutes and costs nothing.",
    ctaButtonText: "I checked/obtained my TIN",
  },
  quiz: [
    {
      question: "What is the minimum income required to obtain a TIN in Bangladesh?",
      options: [
        "Tk 3.5 lakh annually",
        "Tk 1 lakh annually",
        "There is no minimum income requirement — anyone can obtain a TIN",
        "Only employed people can obtain a TIN",
      ],
      correctIndex: 2,
      explanation: "There is no income threshold for obtaining a TIN. Any adult Bangladeshi can register. The TIN does not create an obligation to pay tax unless your income exceeds the taxable threshold.",
    },
    {
      question: "Without a TIN, which of the following is restricted?",
      options: [
        "Opening any bank account",
        "Purchasing Sanchaypatra above Tk 2 lakh",
        "Making mobile payments",
        "Receiving salary from an employer",
      ],
      correctIndex: 1,
      explanation: "Sanchaypatra purchases above Tk 2 lakh require a TIN. Without it, you are limited to below this threshold per purchase transaction.",
    },
    {
      question: "What is the financial benefit of a TIN for someone with Tk 3 lakh in FDR earning 8% interest?",
      options: [
        "No benefit — TIN only matters for tax filing",
        "Reduced source tax on interest: 10% vs 15%, saving approximately Tk 1,200 in annual interest deductions",
        "Higher interest rate from the bank",
        "Access to a special government savings scheme",
      ],
      correctIndex: 1,
      explanation: "TIN holders pay 10% TDS on bank interest vs 15% for non-TIN holders. On Tk 3 lakh FDR at 8% = Tk 24,000 interest/year. 5% difference in TDS = Tk 1,200 more in take-home interest annually.",
    },
    {
      question: "How long does it take to register for a TIN online?",
      options: [
        "Several weeks — requires in-person visits",
        "Approximately 30 minutes online with NID and basic information",
        "It must be done through a tax consultant",
        "Only possible during annual tax fair season",
      ],
      correctIndex: 1,
      explanation: "Online TIN registration at secure.incometax.gov.bd takes approximately 30 minutes. You need your NID and basic information. The TIN is issued immediately or within a short processing window.",
    },
    {
      question: "True or False: Getting a TIN means NBR will automatically audit your finances.",
      options: [
        "True — NBR monitors all TIN holders closely",
        "False — a TIN is simply registration in the tax system, not a trigger for automatic audit",
      ],
      correctIndex: 1,
      explanation: "A TIN is an identification number, not an audit trigger. NBR uses TINs to process returns and cross-reference income sources when investigating specific cases. Routine registration does not trigger audit.",
    },
  ],
  whatsNext: {
    nextModuleId: null,
    preview: "Zone 4 complete. You now understand income tax basics, tax-saving investments, how to file a return, the invisible taxes you pay daily, and how to obtain a TIN. Most Bangladeshis your age have none of this knowledge.",
  },
};
