import type { Content } from "./types";

export const da: Content = {
  meta: {
    title: "Knut Barka: økonomistuderende, der bygger økonomiværktøjer med AI",
    description:
      "CV og tre økonomiprojekter: et dashboard til månedsafslutning, et runway-dashboard til en startup og en AML-alarmkø. Hvert projekt har en AI-del, der er kontrolleret.",
    projectTitleSuffix: "Knut Barka",
  },
  nav: {
    cv: "CV",
    menu: "Menu",
    close: "Luk",
    language: "Sprog",
    themeLight: "Skift til lyst tema",
    themeDark: "Skift til mørkt tema",
    skip: "Gå til indhold",
    newTab: "(åbner i en ny fane)",
  },
  hero: {
    line1: "Kandidatstuderende i Economics and Business Administration på SDU, Odense. Færdig i sommeren 2027.",
    line2: "Mit CV og tre økonomiværktøjer, som jeg har bygget med AI.",
    location: "Odense, Danmark",
    seeProjects: "Se projekter",
    fullCv: "Fuldt CV (PDF)",
    linkedin: "LinkedIn",
  },
  projectStrip: {
    heading: "Projekter",
    forWhom: "Til",
  },
  profile: {
    heading: "Profil",
    text: [
      "Cand.merc.-studerende i International Business and Management på SDU med forventet afslutning sommeren 2027, med en bachelor i økonomi og administration og et år med dataanalyse. Bygger økonomiværktøjer med AI. Baggrund i regnskab, økonomistyring og corporate finance, avanceret Excel og praktisk erfaring med afstemning og KYC/AML-arbejde i en reguleret finansiel koncern. Vil gerne starte inden for finance transformation, hvor økonomiprocesser, data og teknologi mødes.",
    ],
  },
  education: {
    heading: "Uddannelse",
    items: [
      {
        place: "Syddansk Universitet (SDU), Odense",
        title: "Cand.merc. i International Business and Management",
        dates: "sep. 2025 til jun. 2027 (forventet)",
        points: [
          "Kernefag: International Business Strategy, International Market Analytics (spørgeskemadesign og statistisk modellering), International Strategic Partnerships, Leading Across International Cultures and Markets.",
          "Efterår 2026: Data Analytics in Accounting (Excel, SQL, Power BI) og AI in Accounting and Business, begge med fokus på, hvordan data og automatisering ændrer økonomifunktionen.",
        ],
      },
      {
        place: "Noroff School of Technology and Digital Media, online",
        title: "Etårig uddannelse i dataanalyse (60 ECTS)",
        dates: "aug. 2024 til jun. 2025",
        points: [
          "Datadrevet beslutningstagning, regneark, statistiske værktøjer, datavisualisering og rapportering af analyser.",
          "Semester- og eksamensprojekter i datarensning, regressionsanalyse og rapportering.",
        ],
      },
      {
        place: "Universitetet i Stavanger",
        title: "Bachelor i økonomi og administration",
        dates: "aug. 2021 til jun. 2024",
        points: [
          "Relevante fag: finansielt regnskab og værdiansættelse, virksomhedsfinansiering, økonomistyring, grundlæggende regnskab og virksomhedsøkonomi, statistik.",
          "Bachelorprojekt: Værdiansættelse af Vår Energi ASA.",
        ],
      },
    ],
  },
  experience: {
    heading: "Erhvervserfaring",
    items: [
      {
        place: "Ria Financial Services (Euronet Worldwide), Odense",
        title: "Kasserer (deltid)",
        dates: "apr. 2026 til nu",
        points: [
          "Afstemmer kontant- og valutabeholdninger mod systemet ved hver lukning og sporer og dokumenterer eventuelle differencer.",
          "Kontrollerer kundernes identitet og udfylder KYC- og AML-dokumentation, før transaktioner frigives, efter interne kontrolprocedurer.",
          "Håndterer fortrolige kunde- og økonomidata i regulerede systemer i en international finansiel koncern.",
        ],
      },
      {
        place: "Odense Teater, Odense",
        title: "Publikumsvært (deltid)",
        dates: "sep. 2025 til nu",
        points: ["Afstemmer billetsalg og kasse mod POS-rapporter ved lukning og koordinerer på tværs af teams på udsolgte aftener."],
      },
      {
        place: "Stavanger Konserthus, Stavanger",
        title: "Publikumsvært",
        dates: "aug. 2023 til aug. 2025",
        points: ["Holdt driften kørende ved flere samtidige arrangementer sammen med sikkerheds-, teknik- og administrativt personale."],
      },
      {
        place: "KIWI og Narvesen, Jørpeland",
        title: "Butiksassistent",
        dates: "okt. 2019 til aug. 2023",
        points: ["Daglig kasseopgørelse og åbne- og lukkerutiner i travl detailhandel, ved siden af skole og studier."],
      },
    ],
  },
  skills: {
    heading: "Kompetencer",
    rows: [
      {
        label: "Økonomi",
        value: "Regnskab og økonomistyring, værdiansættelse, corporate finance, afstemning, KYC/AML-kontroller",
      },
      {
        label: "Værktøjer",
        value:
          "Excel (avanceret), PowerPoint (avanceret), Word (avanceret), SPSS (mellemniveau), SmartPLS (mellemniveau), Python (grundlæggende), SQL og Power BI (under udvikling gennem studiet)",
      },
      { label: "AI", value: "Bygger økonomiværktøjer med Claude Code; bruger Claude og ChatGPT dagligt til at automatisere rutineopgaver" },
    ],
  },
  languages: {
    heading: "Sprog",
    rows: [
      { label: "Norsk", value: "Modersmål" },
      { label: "Engelsk", value: "Flydende (C1)" },
      { label: "Dansk", value: "Flydende" },
    ],
  },
  other: {
    heading: "Andet, jeg har bygget",
    items: [
      { name: "Job scanner", text: "Læser jobmails over IMAP, filtrerer dem og giver hver en score med Gemini." },
      { name: "Bajerbanken", text: "En webapp til en vennegruppe." },
    ],
  },
  contact: {
    heading: "Kontakt",
    text: "Du får lettest fat i mig på LinkedIn.",
    onRequest: "Fuldt CV med kontaktoplysninger på forespørgsel.",
  },
  cvDialog: {
    title: "Fuldt CV (PDF)",
    intro: "Skriv den kode, du har fået, for at hente CV'et.",
    choose: "Vælg et sprog. Vinduet bliver åbent, så du kan hente mere end ét.",
    label: "Kode",
    submit: "Fortsæt",
    checking: "Kontrollerer…",
    wrong: "Forkert kode",
    done: "Downloaden er startet.",
    error: "Noget gik galt. Prøv igen.",
    unavailable: "Det fulde CV fås på forespørgsel.",
    close: "Luk",
  },
  project: {
    openLive: "Åbn dashboardet",
    viewCode: "Se koden på GitHub",
    caseSheet: "Læs case-arket (engelsk)",
    forWhom: "Til",
    englishNote: "Selve dashboardet er på engelsk.",
    problem: "Problemet",
    shows: "Det viser dashboardet",
    findings: "Vigtigste fund",
    ai: "AI-delen og hvordan den blev kontrolleret",
    limits: "Det gør det ikke",
    built: "Sådan blev det bygget",
    builtWith: "Bygget med Claude Code.",
    previous: "Forrige projekt",
    next: "Næste projekt",
    screenshotAlt: "Skærmbillede af dashboardet",
  },
  projects: {
    "variance-cockpit": {
      oneLiner:
        "Et dashboard til månedsafslutning med budget mod faktisk. AI skriver et udkast til en kommentar for hver væsentlig afvigelse, og udkastene bliver gennemgået.",
      forWhom: "Controllere og økonomiafdelinger ved månedsafslutning",
      cardFinding: "Dashboard til månedsafslutning og afvigelser for en fiktiv produktionsvirksomhed. AI skriver udkast til afvigelseskommentarerne, og hvert tal kontrolleres mod hovedbogen. Gennemgik en forhåndsregistreret stikprøve: 16 ud af 18 stemte.",
      dataNote: "Data er fiktive. Odense Demo Manufacturing ApS og dets kunder og leverandører findes ikke.",
      problem:
        "Ved månedsafslutning skal en controller forklare alle store forskelle mellem budget og faktisk. Det meste af arbejdet er at finde leverandøren, kunden eller fakturaen bag hver forskel. En sprogmodel kan skrive udkast til kommentarerne, men kun hvis hvert tal og hver påstand kan kontrolleres mod hovedbogen.",
      shows: [
        "EBITDA mod budget for den valgte måned, med omsætning, EBITDA-margin og antal væsentlige afvigelser.",
        "En EBITDA-bro fra budget til faktisk. Klik på en søjle for at filtrere listen.",
        "Væsentlige afvigelser, største først: mindst 5 % og DKK 50.000 fra budget.",
        "Drill-down for hver afvigelse med posteringerne, AI-udkastet og status for gennemgangen.",
      ],
      findings: [
        "September 2026 lukker med EBITDA på DKK 0,25 mio. mod et budget på DKK 1,55 mio. Lavere omsætning forklarer DKK 0,51 mio. af forskellen, mest fordi én kunde købte mindre.",
        "Den endelige prompt fandt den rigtige årsag i 12 af 15 måneder med en indlagt hændelse.",
        "Version 1 og 2 gav modellen den følgende måned. Det er look-ahead, så deres resultater på 10 og 13 af 15 var for høje.",
      ],
      ai: [
        "Gemini skriver ét udkast for hver væsentlig afvigelse, én gang. Udkastene er gemt, så dashboardet kalder aldrig en model. Modellen ser aldrig en senere måned, for ved lukning findes fremtiden ikke.",
        "Et script uden AI kontrollerer hvert tal i et udkast mod input: 71 af 71 udkast består. Af 55 afvigelser uden en hændelse bag påstår 5 udkast en årsag, der ikke er der. 1 udkast har en fortegnsfejl.",
        "Claude foreslog en status for hvert udkast. Jeg kontrollerede en tilfældig stikprøve på 18, valgt før jeg så på dem, og var enig i 16. Endeligt: 35 godkendt, 30 redigeret, 6 afvist.",
      ],
      limits: [
        "Gennemgangen er mest lavet af en model. 53 af 71 statusser er kun Claudes, og én model, der bedømmer en anden, er ikke en menneskelig gennemgang.",
        "Én kørsel per promptversion. Spredningen mellem kørsler er ikke målt.",
        "En kunde, der køber mindre, bliver overset i juli og september, fordi sammenligningsgrundlaget er et simpelt gennemsnit af tre måneder.",
      ],
      stack: "Python, DuckDB med SQL-views, Gemini, Next.js og Recharts på Vercel.",
    },
    "startup-runway": {
      oneLiner:
        "Et dashboard for kontanter, burn og runway i en fiktiv dansk SaaS-startup, med AI-udkast til investoropdateringer, som et script kontrollerer.",
      forWhom: "Stiftere og økonomifolk i startups og scale-ups",
      cardFinding: "Dashboard for likviditet, burn og runway for en fiktiv SaaS-startup med scenarieskydere og AI-udkast til investoropdateringer. 94 ud af 94 tal kontrolleret.",
      dataNote: "Data er fiktive. Nordlys Analytics ApS findes ikke, og et script har lavet hvert tal.",
      problem:
        "Hver måned skal en stifter vide, hvor længe pengene rækker ved det nuværende forbrug. Investorerne vil så have en kort opdatering om, hvad der har ændret sig. Projektet svarer på begge dele for én fiktiv virksomhed, og hvert tal kan spores til én SQL-fil.",
      shows: [
        "Kontanter i banken, nettoforbrug (net burn), runway ved nuværende burn og ARR for den valgte måned.",
        "Et kontantdiagram med 24 måneders faktiske tal og en fremskrivning på 24 måneder. Skydere ændrer ansættelser, vækst, churn, andre omkostninger og ny finansiering.",
        "En MRR-bro, og hvor pengene går hen hver måned.",
        "Et udkast til investoropdatering for hver måned fra okt. 2025 til sep. 2026 med resultatet af kontrollen.",
      ],
      findings: [
        "I sep. 2026 har virksomheden €1.579.630 i banken og 14,3 måneders runway ved nuværende burn.",
        "Med den nuværende plan slipper pengene op i feb. 2028. Virksomheden skal rejse kapital i løbet af 2027.",
        "Min første omkostning til en studentermedhjælper var regnet baglæns fra et mål. Regnet ud fra en timeløn er den €1.420 om måneden, ned fra €1.900.",
      ],
      ai: [
        "Claude skriver tekstdelene i hver opdatering ud fra et faktaark, der kun har data til og med den måned. Emnelinjen og tabellen med nøgletal kommer fra SQL, ikke fra AI. Når data ikke viser en årsag, efterlader udkastet en pladsholder til stifteren.",
        "Modellen afrundede forkert, for eksempel €55k for €55.811. Nu får den hvert tal færdigformateret og skal kopiere én form.",
        "Et script uden AI kontrollerer hvert tal mod data. Et udkast, der fejler, får én opfølgning, med højst to nye forsøg. 6 af 12 udkast bestod i første forsøg og 12 af 12 efter nye forsøg. Alle 94 tal i de beholdte udkast passer med data. AI kostede i alt omkring USD 0,28.",
      ],
      limits: [
        "Kontrollen tester tal og format, ikke hvor godt teksten er skrevet.",
        "2 af de 6 nye forsøg skyldtes falske alarmer i årsagskontrollen, ikke fejl hos modellen.",
        "Fremskrivningen holder andre omkostninger flade og regner indbetalinger som lig med omsætningen.",
      ],
      stack: "Python, DuckDB med SQL-views, Claude API, Next.js og Recharts på Vercel.",
    },
    "aml-queue": {
      oneLiner:
        "En AML-alarmkø for en fiktiv dansk betalingsvirksomhed. Regler markerer overførsler, AI skriver et udkast til en sagsnote og foreslår et næste skridt, og en analytiker beslutter.",
      forWhom: "Compliance-, AML- og risikoteams",
      cardFinding: "Regelbaserede alarmer og AI-sagsresuméer på syntetiske transaktioner. AI'en prioriterer køen, og en analytiker træffer beslutningen. Den fangede 30 ud af 34 reelt mistænkelige sager.",
      dataNote: "Data er fiktive. Lysbro Pay ApS, dets kunder og alle overførsler er opdigtede.",
      problem:
        "En betalingsvirksomhed skal holde øje med sine overførsler for tegn på hvidvask. Regler fanger adfærd, der ser mistænkelig ud, men de fleste alarmer viser sig at være almindelige. Analytikere læser hver sag og beslutter, hvad der skal eskaleres.",
      shows: [
        "Nøgletal for den valgte måned, blandt andet reglernes præcision og hvor mange indlagte mønstre der blev fanget.",
        "Alarmkøen, sorteret efter risikoscore, med de regler, der slog ud, og AI-forslaget.",
        "Drill-down for hver sag: profil, oplyst formål mod faktisk adfærd, en tidslinje og AI-udkastet.",
        "Reglernes præstation: sager per regel, delt i reelt mistænkelige og falske positiver.",
      ],
      findings: [
        "Reglerne rejste 183 sager. 34 var reelt mistænkelige, en præcision på 18,6 %.",
        "De fangede 27 af de 30 indlagte kunder (recall 90,0 %). De 3, der slap igennem, var svage versioner bygget til at ligge lige under en grænse.",
        "To regler står for de fleste falske positiver: volume spike (70) og high-risk corridor (58).",
      ],
      ai: [
        "For hver sag ser Claude profilen, de regler der slog ud, de udløsende overførsler og de 90 dage før alarmen. Den ser ikke navnet eller noget efter sagsdatoen. Den foreslår at eskalere eller lukke. Den beslutter aldrig.",
        "Et script uden AI kontrollerer hvert tal og hver dato. 134 af 183 udkast bestod i første forsøg og 178 af 183 efter nye forsøg.",
        "Målt mod den indlagte facit foreslog AI at eskalere 30 af 34 reelt mistænkelige sager. Læste man kun de sager, den markerer, ville det være 100 af 183 sager og 4 oversete. Derfor ordner AI køen og lukker ikke sager. Det kostede i alt omkring USD 0,16.",
      ],
      limits: [
        "Data er syntetiske. To regler med 100 % præcision skyldes måden, almindelige kunder blev genereret på.",
        "Der findes ingen beslutninger fra analytikere. Præcision og recall kommer fra en facitliste, og der påstås ingen tidsbesparelse.",
        "Én kørsel med én promptversion. Variationen mellem kørsler er ikke målt.",
      ],
      stack: "Python, DuckDB med SQL-views, Claude API, Next.js og Recharts på Vercel.",
    },
  },
  footer: {
    built: "Bygget med Claude Code af Knut Barka",
    code: "Koden på GitHub",
  },
  notFound: {
    title: "Siden findes ikke",
    text: "Denne side findes ikke.",
    back: "Tilbage til CV'et",
  },
};
