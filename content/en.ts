import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Knut Barka: economics student who builds finance tools with AI",
    description:
      "CV and three finance projects: a month-end variance dashboard, a startup runway dashboard and an AML alert queue. Each one has an AI part that is checked.",
    projectTitleSuffix: "Knut Barka",
  },
  nav: {
    cv: "CV",
    menu: "Menu",
    close: "Close",
    language: "Language",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
    skip: "Skip to content",
    newTab: "(opens in a new tab)",
  },
  hero: {
    line1: "MSc student in Economics and Business Administration at SDU, Odense. Graduating summer 2027.",
    line2: "My CV and three finance tools I have built with AI.",
    location: "Odense, Denmark",
    seeProjects: "See projects",
    fullCv: "Full CV (PDF)",
    linkedin: "LinkedIn",
  },
  projectStrip: {
    heading: "Projects",
    forWhom: "For",
  },
  profile: {
    heading: "Profile",
    text: [
      "MSc student in Economics and Business Administration (International Business and Management) graduating summer 2027, with a bachelor in economics and business administration and a year of data analytics. Builds finance tools with AI. Background in accounting, management control and corporate finance, advanced Excel, and hands-on reconciliation and KYC/AML work in a regulated financial services group. Looking to start in finance transformation, where finance processes, data and technology meet.",
    ],
  },
  education: {
    heading: "Education",
    items: [
      {
        place: "University of Southern Denmark (SDU), Odense",
        title: "MSc in Economics and Business Administration, International Business and Management",
        dates: "Sep 2025 to Jun 2027 (expected)",
        points: [
          "Core courses: International Business Strategy, International Market Analytics (survey design and statistical modelling), International Strategic Partnerships, Leading Across International Cultures and Markets.",
          "Autumn 2026: Data Analytics in Accounting (Excel, SQL, Power BI) and AI in Accounting and Business, both focused on how data and automation change the finance function.",
        ],
      },
      {
        place: "Noroff School of Technology and Digital Media, online",
        title: "One-Year Vocational Degree in Data Analytics (60 ECTS)",
        dates: "Aug 2024 to Jun 2025",
        points: [
          "Data-driven decision-making, spreadsheet fundamentals, statistical tools, data visualisation and analysis reporting.",
          "Semester and exam projects in data cleaning, regression analysis and reporting.",
        ],
      },
      {
        place: "University of Stavanger",
        title: "BSc in Economics and Business Administration",
        dates: "Aug 2021 to Jun 2024",
        points: [
          "Relevant courses: Financial Accounting and Valuation, Corporate Finance, Management Accounting and Control, Fundamentals of Accounting and Business Economics, Statistics for Business and Economics.",
          "Bachelor thesis: Valuation of Vår Energi ASA.",
        ],
      },
    ],
  },
  experience: {
    heading: "Experience",
    items: [
      {
        place: "Ria Financial Services (Euronet Worldwide), Odense",
        title: "Cashier (part-time)",
        dates: "Apr 2026 to present",
        points: [
          "Reconcile cash and currency holdings against system records at every close, and trace and document any differences.",
          "Verify customer identity and complete KYC and AML documentation before transactions are released, following internal control procedures.",
          "Handle confidential customer and financial data in regulated systems within an international financial services group.",
        ],
      },
      {
        place: "Odense Teater, Odense",
        title: "Front of House Host (part-time)",
        dates: "Sep 2025 to present",
        points: ["Reconcile ticket sales and till takings against POS reports at close, and coordinate across teams on sold-out nights."],
      },
      {
        place: "Stavanger Konserthus, Stavanger",
        title: "Front of House Attendant",
        dates: "Aug 2023 to Aug 2025",
        points: ["Kept operations running across simultaneous events with security, technical and administrative staff."],
      },
      {
        place: "KIWI and Narvesen, Jørpeland",
        title: "Store Assistant",
        dates: "Oct 2019 to Aug 2023",
        points: ["Daily till settlement and opening and closing routines in high-volume retail, alongside school and university."],
      },
    ],
  },
  skills: {
    heading: "Skills",
    rows: [
      {
        label: "Finance",
        value: "Financial and management accounting, valuation, corporate finance, reconciliation, KYC/AML controls",
      },
      {
        label: "Tools",
        value:
          "Excel (advanced), PowerPoint (advanced), Word (advanced), SPSS (intermediate), SmartPLS (intermediate), Python (basic), SQL and Power BI (in development through coursework)",
      },
      { label: "AI", value: "Build finance tools with Claude Code; use Claude and ChatGPT daily to automate repetitive work" },
    ],
  },
  languages: {
    heading: "Languages",
    rows: [
      { label: "Norwegian", value: "Native" },
      { label: "English", value: "Fluent (C1)" },
      { label: "Danish", value: "Fluent" },
    ],
  },
  other: {
    heading: "Other things I've built",
    items: [
      { name: "Job scanner", text: "Reads job emails over IMAP, filters them and scores each one with Gemini." },
      { name: "Bajerbanken", text: "A web app for a group of friends." },
    ],
  },
  contact: {
    heading: "Contact",
    text: "The easiest way to reach me is on LinkedIn.",
    onRequest: "Full CV with contact details on request.",
  },
  cvDialog: {
    title: "Full CV (PDF)",
    intro: "Enter the code you received to download the CV.",
    choose: "Choose a language. The window stays open, so you can download more than one.",
    label: "Code",
    submit: "Continue",
    checking: "Checking…",
    wrong: "Wrong code",
    done: "The download has started.",
    error: "Something went wrong. Please try again.",
    unavailable: "The full CV is available on request.",
    close: "Close",
  },
  project: {
    openLive: "Open live dashboard",
    viewCode: "View code on GitHub",
    caseSheet: "Read the case sheet",
    forWhom: "For",
    englishNote: "",
    problem: "The problem",
    shows: "What the dashboard shows",
    findings: "Key findings",
    ai: "The AI part and how it was checked",
    limits: "What it does not do",
    built: "How it was built",
    builtWith: "Built with Claude Code.",
    previous: "Previous project",
    next: "Next project",
    screenshotAlt: "Screenshot of the dashboard",
  },
  projects: {
    "variance-cockpit": {
      oneLiner:
        "A month-end close dashboard for budget against actual. AI drafts a comment on each significant variance, and the drafts are reviewed.",
      forWhom: "Controllers and finance teams at month-end close",
      cardFinding: "Month-end variance dashboard for a fictional manufacturer. AI drafts the variance comments, and every figure is checked against the ledger. Reviewed a pre-registered sample: 16 of 18 agreed.",
      dataNote: "Data is fictional. Odense Demo Manufacturing ApS and its customers and suppliers do not exist.",
      problem:
        "At month-end close a controller must explain every large gap between budget and actual. Most of the work is finding the supplier, customer or invoice behind each gap. A language model can draft the comments, but only if every number and claim can be checked against the ledger.",
      shows: [
        "EBITDA against budget for the chosen month, with revenue, EBITDA margin and the number of significant variances.",
        "An EBITDA bridge from budget to actual. Click a bar to filter the list.",
        "Significant variances, largest first: at least 5 % and DKK 50.000 from budget.",
        "A drill-down per variance with the ledger lines, the AI draft and its review status.",
      ],
      findings: [
        "September 2026 closes with EBITDA of DKK 0,25m against a budget of DKK 1,55m. Lower revenue explains DKK 0,51m of the gap, mostly one customer buying less.",
        "The final prompt found the right cause in 12 of 15 planted event months.",
        "Versions 1 and 2 gave the model the following month. That is look-ahead, so their scores of 10 and 13 of 15 were too high.",
      ],
      ai: [
        "Gemini writes one draft per significant variance, once. The drafts are stored, so the dashboard never calls a model. The model never sees a later month, because at close the future does not exist.",
        "A script with no AI checks every number in a draft against the input: 71 of 71 drafts pass. Of 55 variances with no event behind them, 5 drafts claim a cause that is not there. 1 draft has a sign error.",
        "Claude suggested a review status for each draft. I checked a random sample of 18, fixed before I looked, and agreed with 16. Final counts: 35 approved, 30 edited, 6 rejected.",
      ],
      limits: [
        "The review is mostly done by a model. 53 of 71 statuses are Claude's alone, and one model grading another is not human review.",
        "One run per prompt version. The spread between runs has not been measured.",
        "A customer buying less is missed in July and September, because the baseline is a plain three-month average.",
      ],
      stack: "Python, DuckDB with SQL views, Gemini, Next.js and Recharts on Vercel.",
    },
    "startup-runway": {
      oneLiner:
        "A cash, burn and runway dashboard for a fictional Danish SaaS startup, with AI-drafted investor updates that a script checks.",
      forWhom: "Founders and finance staff at startups and scale-ups",
      cardFinding: "Cash, burn and runway dashboard for a fictional SaaS startup, with scenario sliders and AI-drafted investor updates. 94 of 94 figures checked.",
      dataNote: "Data is fictional. Nordlys Analytics ApS does not exist, and a script generated every figure.",
      problem:
        "Every month a startup founder has to know how long the cash will last at the current burn. Investors then want a short update on what changed. This project answers both for one fictional company, and every number traces back to one SQL file.",
      shows: [
        "Cash in bank, net burn, runway at current burn and ARR for the selected month.",
        "A cash chart with 24 months of actuals and a 24-month projection. Sliders change hires, growth, churn, other costs and new funding.",
        "An MRR bridge and where the money goes each month.",
        "A draft investor update for each month from Oct 2025 to Sep 2026, with the result of its check.",
      ],
      findings: [
        "At Sep 2026 the company has €1.579.630 in the bank and 14,3 months of runway at current burn.",
        "With the current plan, cash runs out in Feb 2028. The company has to raise money during 2027.",
        "My first cost for a student assistant was set backwards from a target. Recalculated from an hourly wage it is €1.420 a month, down from €1.900.",
      ],
      ai: [
        "Claude writes the text parts of each update from a fact sheet that holds only data up to that month. The subject line and the metrics table come from SQL, not from AI. Where the data shows no cause, the draft leaves a placeholder for the founder.",
        "The model rounded numbers wrongly, for example €55k for €55.811. It now gets every number pre-formatted and must copy one form.",
        "A script without AI checks every number against the data. A failing draft gets one follow-up, with at most two retries. 6 of 12 drafts passed on the first attempt and 12 of 12 after retries. All 94 numbers in the kept drafts match the data. Total AI cost was about USD 0,28.",
      ],
      limits: [
        "The checker tests numbers and format, not writing quality.",
        "2 of the 6 retries came from false flags in the cause check, not from model errors.",
        "The projection keeps other costs flat and treats collections as equal to revenue.",
      ],
      stack: "Python, DuckDB with SQL views, the Claude API, Next.js and Recharts on Vercel.",
    },
    "aml-queue": {
      oneLiner:
        "An AML alert queue for a fictional Danish payment company. Rules flag transfers, AI drafts a case note and suggests a next step, and an analyst decides.",
      forWhom: "Compliance, AML and risk teams",
      cardFinding: "Rule-based alerts and AI case summaries on synthetic transactions. The AI orders the queue and an analyst decides. It flagged 30 of 34 truly suspicious cases.",
      dataNote: "Data is fictional. Lysbro Pay ApS, its customers and every transfer are invented.",
      problem:
        "A payment company must watch its transfers for signs of money laundering. Rules catch behaviour that looks suspicious, but most alerts turn out to be ordinary. Analysts read every case to decide what to escalate.",
      shows: [
        "Key figures for the selected month, including rule precision and planted patterns caught.",
        "The alert queue, sorted by risk score, with the rules hit and the AI suggestion.",
        "A drill-down per case: profile, declared purpose against actual behaviour, a timeline and the AI draft.",
        "Rule performance: cases per rule, split into truly suspicious and false positives.",
      ],
      findings: [
        "The rules raised 183 cases. 34 were truly suspicious, a precision of 18,6 %.",
        "They caught 27 of the 30 planted customers (recall 90,0 %). The 3 misses were weak versions built to sit just under a threshold.",
        "Two rules make most of the false positives: volume spike (70) and high-risk corridor (58).",
      ],
      ai: [
        "For each case, Claude sees the profile, the rules hit, the triggering transfers and the 90 days before the alert. It does not see the name or anything after the case date. It suggests escalate or close. It never decides.",
        "A script without AI checks every number and date. 134 of 183 drafts passed on the first attempt and 178 of 183 after retries.",
        "Against the planted truth, the AI suggested escalating 30 of 34 truly suspicious cases. Reading only the cases it flags would mean 100 of 183 cases and 4 missed. So the AI orders the queue and does not close cases. Total cost was about USD 0,16.",
      ],
      limits: [
        "The data is synthetic. Two rules at 100 % precision are an artefact of how normal customers were generated.",
        "No analyst decisions exist. Precision and recall come from an answer key, and no time saving is claimed.",
        "One run with one prompt version. Variation between runs is not measured.",
      ],
      stack: "Python, DuckDB with SQL views, the Claude API, Next.js and Recharts on Vercel.",
    },
  },
  footer: {
    built: "Built with Claude Code by Knut Barka",
    code: "Code on GitHub",
  },
  notFound: {
    title: "Page not found",
    text: "This page does not exist.",
    back: "Back to the CV",
  },
};
