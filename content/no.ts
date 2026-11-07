import type { Content } from "./types";

// Norwegian bokmål.
export const no: Content = {
  meta: {
    title: "Knut Barka: økonomistudent som bygger økonomiverktøy med AI",
    description:
      "CV og tre økonomiprosjekter: et dashboard for månedsavslutning, et runway-dashboard for en startup og en AML-varselkø. Hvert prosjekt har en AI-del som er kontrollert.",
    projectTitleSuffix: "Knut Barka",
  },
  nav: {
    cv: "CV",
    menu: "Meny",
    close: "Lukk",
    language: "Språk",
    themeLight: "Bytt til lyst tema",
    themeDark: "Bytt til mørkt tema",
    skip: "Gå til innhold",
    newTab: "(åpnes i en ny fane)",
  },
  hero: {
    line1: "Masterstudent i Economics and Business Administration ved SDU i Odense. Ferdig sommeren 2027.",
    line2: "CV-en min og tre økonomiverktøy jeg har bygget med AI.",
    location: "Odense, Danmark",
    seeProjects: "Se prosjekter",
    fullCv: "Full CV (PDF)",
    linkedin: "LinkedIn",
  },
  projectStrip: {
    heading: "Prosjekter",
    forWhom: "For",
  },
  profile: {
    heading: "Profil",
    text: [
      "Jeg tar en master i Economics and Business Administration ved SDU og blir ferdig sommeren 2027. Jeg har en bachelor i økonomi og administrasjon og en ettårig utdanning i dataanalyse. Grunnlaget mitt er regnskap, økonomistyring og finans, og jeg bruker AI hver dag til å bygge økonomiverktøy. Jeg ser etter en studentjobb eller deltidsjobb nå og en nyutdannet-stilling fra sommeren 2027, innen finance transformation, controlling, startup-økonomi eller compliance.",
    ],
  },
  education: {
    heading: "Utdanning",
    items: [
      {
        place: "Syddansk Universitet (SDU), Odense",
        title: "MSc in Economics and Business Administration, International Business and Management",
        dates: "sep. 2025 til jun. 2027 (forventet)",
        points: [
          "Kjerneemner: International Business Strategy, International Market Analytics, International Strategic Partnerships, Leading Across International Cultures and Markets.",
          "Høsten 2026: Data Analytics in Accounting (Excel, SQL, Power BI) og AI in Accounting and Business.",
        ],
      },
      {
        place: "Noroff School of Technology and Digital Media, nettbasert",
        title: "Ettårig fagskole i dataanalyse (60 studiepoeng)",
        dates: "aug. 2024 til jun. 2025",
        points: ["Datadrevne beslutninger, statistiske verktøy, datavisualisering og rapportering."],
      },
      {
        place: "Universitetet i Stavanger",
        title: "Bachelor i økonomi og administrasjon",
        dates: "aug. 2021 til jun. 2024",
        points: [
          "Relevante emner: Financial Accounting and Valuation, Corporate Finance, Management Accounting and Control, Fundamentals of Accounting and Business Economics, Statistics for Business and Economics.",
          "Bacheloroppgave: verdsettelse av Vår Energi ASA.",
        ],
      },
    ],
  },
  experience: {
    heading: "Erfaring",
    items: [
      {
        place: "Ria Financial Services (Euronet Worldwide), Odense",
        title: "Kasserer (deltid)",
        dates: "apr. 2026 til nå",
        points: [
          "Avstemmer kontanter og valuta mot systemet ved hver stenging, og sporer og dokumenterer differanser.",
          "Kontrollerer kundens identitet og fyller ut KYC- og AML-dokumentasjon før transaksjoner frigis.",
          "Håndterer fortrolige kunde- og økonomidata i regulerte systemer.",
        ],
      },
      {
        place: "Odense Teater, Odense",
        title: "Front of House-vert (deltid)",
        dates: "sep. 2025 til nå",
        points: ["Avstemmer billettsalg og kasse mot POS-rapporter ved stenging."],
      },
      {
        place: "Stavanger Konserthus, Stavanger",
        title: "Publikumsvert",
        dates: "aug. 2023 til aug. 2025",
        points: [],
      },
      {
        place: "KIWI og Narvesen, Jørpeland",
        title: "Butikkmedarbeider",
        dates: "okt. 2019 til aug. 2023",
        points: ["Daglig kasseoppgjør og rutiner for åpning og stenging."],
      },
    ],
  },
  skills: {
    heading: "Ferdigheter",
    rows: [
      {
        label: "Økonomi",
        value: "Finansregnskap og økonomistyring, verdsettelse, finans, avstemming, KYC/AML-kontroller",
      },
      {
        label: "Verktøy",
        value:
          "Excel (avansert), PowerPoint (avansert), Word (avansert), SPSS (middels), SmartPLS (middels), Python (grunnleggende), SQL og Power BI (under utvikling gjennom emner)",
      },
      { label: "AI", value: "Claude, Claude Code og ChatGPT daglig, til å bygge verktøy og automatisere repeterende arbeid" },
      { label: "Arbeidstillatelse", value: "Norsk statsborger med full rett til å jobbe i Danmark" },
    ],
  },
  languages: {
    heading: "Språk",
    rows: [
      { label: "Norsk", value: "Morsmål" },
      { label: "Engelsk", value: "Flytende (C1)" },
      { label: "Dansk", value: "Svært god, nesten flytende" },
    ],
  },
  other: {
    heading: "Annet jeg har bygget",
    items: [
      { name: "Job scanner", text: "Leser e-poster om ledige jobber over IMAP, filtrerer dem og gir hver en score med Gemini." },
      { name: "Bajerbanken", text: "En nettapp for en vennegjeng." },
    ],
  },
  contact: {
    heading: "Kontakt",
    text: "Du når meg lettest på LinkedIn.",
    onRequest: "Full CV med kontaktinformasjon på forespørsel.",
  },
  cvDialog: {
    title: "Full CV (PDF)",
    intro: "Skriv inn koden du har fått for å laste ned CV-en.",
    label: "Kode",
    submit: "Last ned",
    checking: "Sjekker…",
    wrong: "Feil kode",
    done: "Nedlastingen har startet.",
    error: "Noe gikk galt. Prøv igjen.",
    unavailable: "Full CV får du på forespørsel.",
    close: "Lukk",
  },
  project: {
    openLive: "Åpne dashboardet",
    viewCode: "Se koden på GitHub",
    caseSheet: "Les case-arket (engelsk)",
    forWhom: "For",
    englishNote: "Selve dashboardet er på engelsk.",
    problem: "Problemet",
    shows: "Dette viser dashboardet",
    findings: "Viktigste funn",
    ai: "AI-delen og hvordan den ble kontrollert",
    limits: "Dette gjør det ikke",
    built: "Slik ble det bygget",
    builtWith: "Bygget med Claude Code.",
    previous: "Forrige prosjekt",
    next: "Neste prosjekt",
    screenshotAlt: "Skjermbilde av dashboardet",
  },
  projects: {
    "variance-cockpit": {
      oneLiner:
        "Et dashboard for månedsavslutning med budsjett mot faktisk. AI skriver et utkast til kommentar for hvert vesentlig avvik, og utkastene blir gjennomgått.",
      forWhom: "Controllere og økonomiavdelinger ved månedsavslutning",
      cardFinding: "September 2026: EBITDA på DKK 0,25 mill. mot et budsjett på DKK 1,55 mill.",
      dataNote: "Dataene er fiktive. Odense Demo Manufacturing ApS og kundene og leverandørene finnes ikke.",
      problem:
        "Ved månedsavslutning må en controller forklare alle store avvik mellom budsjett og faktisk. Det meste av jobben er å finne leverandøren, kunden eller fakturaen bak hvert avvik. En språkmodell kan skrive utkast til kommentarene, men bare hvis hvert tall og hver påstand kan sjekkes mot hovedboken.",
      shows: [
        "EBITDA mot budsjett for valgt måned, med omsetning, EBITDA-margin og antall vesentlige avvik.",
        "En EBITDA-bro fra budsjett til faktisk. Klikk på en søyle for å filtrere listen.",
        "Vesentlige avvik, største først: minst 5 % og DKK 50.000 fra budsjett.",
        "Drill-down for hvert avvik med posteringene, AI-utkastet og status for gjennomgangen.",
      ],
      findings: [
        "September 2026 avsluttes med EBITDA på DKK 0,25 mill. mot et budsjett på DKK 1,55 mill. Lavere omsetning forklarer DKK 0,51 mill. av avviket, mest fordi én kunde kjøpte mindre.",
        "Den endelige prompten fant riktig årsak i 12 av 15 måneder med en innlagt hendelse.",
        "Versjon 1 og 2 ga modellen måneden etter. Det er look-ahead, så resultatene deres på 10 og 13 av 15 var for høye.",
      ],
      ai: [
        "Gemini skriver ett utkast for hvert vesentlige avvik, én gang. Utkastene er lagret, så dashboardet kaller aldri en modell. Modellen ser aldri en senere måned, for ved avslutning finnes ikke fremtiden.",
        "Et skript uten AI sjekker hvert tall i et utkast mot input: 71 av 71 utkast består. Av 55 avvik uten en hendelse bak påstår 5 utkast en årsak som ikke er der. 1 utkast har en fortegnsfeil.",
        "Claude foreslo en status for hvert utkast. Jeg sjekket et tilfeldig utvalg på 18, valgt før jeg så på dem, og var enig i 16. Til slutt: 35 godkjent, 30 redigert, 6 avvist.",
      ],
      limits: [
        "Gjennomgangen er stort sett gjort av en modell. 53 av 71 statuser er bare Claudes, og én modell som vurderer en annen er ikke en menneskelig gjennomgang.",
        "Én kjøring per promptversjon. Spredningen mellom kjøringer er ikke målt.",
        "En kunde som kjøper mindre blir oversett i juli og september, fordi sammenligningsgrunnlaget er et enkelt snitt av tre måneder.",
      ],
      stack: "Python, DuckDB med SQL-views, Gemini, Next.js og Recharts på Vercel.",
    },
    "startup-runway": {
      oneLiner:
        "Et dashboard for kontanter, burn og runway i en fiktiv dansk SaaS-startup, med AI-utkast til investoroppdateringer som et skript sjekker.",
      forWhom: "Gründere og økonomifolk i startups og scale-ups",
      cardFinding: "14,3 måneders runway ved dagens burn i sep. 2026.",
      dataNote: "Dataene er fiktive. Nordlys Analytics ApS finnes ikke, og et skript har laget hvert tall.",
      problem:
        "Hver måned må en gründer vite hvor lenge pengene rekker med dagens forbruk. Investorene vil så ha en kort oppdatering om hva som har endret seg. Prosjektet svarer på begge deler for ett fiktivt selskap, og hvert tall kan spores til én SQL-fil.",
      shows: [
        "Kontanter i banken, netto forbruk (net burn), runway ved dagens burn og ARR for valgt måned.",
        "Et kontantdiagram med 24 måneder faktiske tall og en framskriving på 24 måneder. Glidebrytere endrer ansettelser, vekst, churn, andre kostnader og ny finansiering.",
        "En MRR-bro, og hvor pengene går hver måned.",
        "Et utkast til investoroppdatering for hver måned fra okt. 2025 til sep. 2026, med resultatet av kontrollen.",
      ],
      findings: [
        "I sep. 2026 har selskapet €1.579.630 i banken og 14,3 måneders runway ved dagens burn.",
        "Med dagens plan går pengene tomme i feb. 2028. Selskapet må hente kapital i løpet av 2027.",
        "Min første kostnad for en studentassistent var regnet baklengs fra et mål. Regnet ut fra en timelønn er den €1.420 i måneden, ned fra €1.900.",
      ],
      ai: [
        "Claude skriver tekstdelene i hver oppdatering ut fra et faktaark som bare har data til og med den måneden. Emnelinjen og nøkkeltalltabellen kommer fra SQL, ikke fra AI. Når dataene ikke viser en årsak, legger utkastet igjen en plassholder til gründeren.",
        "Modellen rundet av feil, for eksempel €55k for €55.811. Nå får den hvert tall ferdig formatert og må kopiere én form.",
        "Et skript uten AI sjekker hvert tall mot dataene. Et utkast som feiler får én oppfølging, med høyst to nye forsøk. 6 av 12 utkast besto på første forsøk og 12 av 12 etter nye forsøk. Alle 94 tall i utkastene som ble beholdt stemmer med dataene. AI kostet totalt rundt USD 0,28.",
      ],
      limits: [
        "Kontrollen tester tall og format, ikke hvor godt teksten er skrevet.",
        "2 av de 6 nye forsøkene kom av falske alarmer i årsakskontrollen, ikke av feil hos modellen.",
        "Framskrivingen holder andre kostnader flate og regner innbetalinger som lik omsetningen.",
      ],
      stack: "Python, DuckDB med SQL-views, Claude API, Next.js og Recharts på Vercel.",
    },
    "aml-queue": {
      oneLiner:
        "En AML-varselkø for et fiktivt dansk betalingsselskap. Regler flagger overføringer, AI skriver et utkast til saksnotat og foreslår neste steg, og en analytiker bestemmer.",
      forWhom: "Compliance-, AML- og risikoteam",
      cardFinding: "Reglene fanget 27 av de 30 innlagte kundene.",
      dataNote: "Dataene er fiktive. Lysbro Pay ApS, kundene og alle overføringer er oppdiktet.",
      problem:
        "Et betalingsselskap må følge med på overføringene sine for tegn på hvitvasking. Regler fanger atferd som ser mistenkelig ut, men de fleste varslene viser seg å være vanlige. Analytikere leser hver sak og bestemmer hva som skal eskaleres.",
      shows: [
        "Nøkkeltall for valgt måned, blant annet presisjonen til reglene og hvor mange innlagte mønstre som ble fanget.",
        "Varselkøen, sortert etter risikoscore, med reglene som slo ut og AI-forslaget.",
        "Drill-down for hver sak: profil, oppgitt formål mot faktisk atferd, en tidslinje og AI-utkastet.",
        "Hvordan reglene presterer: saker per regel, delt i reelt mistenkelige og falske positive.",
      ],
      findings: [
        "Reglene ga 183 saker. 34 var reelt mistenkelige, en presisjon på 18,6 %.",
        "De fanget 27 av de 30 innlagte kundene (recall 90,0 %). De 3 som slapp gjennom var svake versjoner laget for å ligge rett under en grense.",
        "To regler står for de fleste falske positive: volume spike (70) og high-risk corridor (58).",
      ],
      ai: [
        "For hver sak ser Claude profilen, reglene som slo ut, de utløsende overføringene og de 90 dagene før varselet. Den ser ikke navnet eller noe etter saksdatoen. Den foreslår å eskalere eller lukke. Den bestemmer aldri.",
        "Et skript uten AI sjekker hvert tall og hver dato. 134 av 183 utkast besto på første forsøk og 178 av 183 etter nye forsøk.",
        "Målt mot fasiten foreslo AI å eskalere 30 av 34 reelt mistenkelige saker. Leste man bare sakene den flagger, ville det vært 100 av 183 saker og 4 oversett. Derfor sorterer AI køen og lukker ikke saker. Det kostet totalt rundt USD 0,16.",
      ],
      limits: [
        "Dataene er syntetiske. To regler med 100 % presisjon skyldes måten vanlige kunder ble generert på.",
        "Det finnes ingen beslutninger fra analytikere. Presisjon og recall kommer fra en fasit, og det påstås ingen tidsbesparelse.",
        "Én kjøring med én promptversjon. Variasjonen mellom kjøringer er ikke målt.",
      ],
      stack: "Python, DuckDB med SQL-views, Claude API, Next.js og Recharts på Vercel.",
    },
  },
  footer: {
    built: "Bygget med Claude Code av Knut Barka",
    code: "Koden på GitHub",
  },
  notFound: {
    title: "Siden finnes ikke",
    text: "Denne siden finnes ikke.",
    back: "Tilbake til CV-en",
  },
};
