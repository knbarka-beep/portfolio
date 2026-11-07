# Knut Barka: portfolio

A web CV and three finance projects in one site, in English, Danish and Norwegian.

- Start page: the CV, with the three projects right under the name.
- Project pages: [Variance cockpit](https://github.com/knbarka-beep/variance-cockpit), [Startup runway](https://github.com/knbarka-beep/startup-runway) and [AML queue](https://github.com/knbarka-beep/aml-queue). What each dashboard shows, the key findings, how the AI part was checked and what it does not do.
- The full CV as a PDF is behind a passcode that Knut sends to employers. The public pages hold no phone number or email address.

## How it is built

Next.js with Tailwind and TypeScript, hosted on Vercel. Every page is static HTML built once. All text lives in `content/en.ts`, `content/da.ts` and `content/no.ts`, which share one type. The only server code is `/api/cv`, which checks the passcode and streams the PDF from a private Vercel Blob store. No database, no analytics, no cookies.

How it works in plain words: [docs/explain.md](docs/explain.md). Every choice made during the build: [docs/decisions.md](docs/decisions.md). Where each project number comes from: [docs/numbers.md](docs/numbers.md).

## Run it

```
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm run build
npm test             # after build: PDF, privacy, text and number checks
npm run qa           # after build: headless Edge, screenshots to docs/screenshots/
```

To try the CV download locally, run `next dev` with `CV_PASSCODE` and `CV_DEV_FILE` (a path to any test PDF) set. In production the PDF comes from Vercel Blob (`BLOB_READ_WRITE_TOKEN`).

Built with Claude Code by Knut Barka. [LinkedIn](https://www.linkedin.com/in/knutbarka)
