@AGENTS.md

# Portfolio site: rules for this repo

Knut Barka's portfolio: a web CV as the start page and one page per project (variance-cockpit, startup-runway, aml-queue), in English, Danish and Norwegian bokmål. Knut is an economics student, not a developer. Every technical choice must be simple enough for him to explain in an interview.

Write code, docs and commits in British English. Record every self-made choice in `docs/decisions.md` (what, why, alternative).

## Hard rules

- The sibling project repos are read-only from here. Copy content and screenshots, never change them.
- Commit with the GitHub noreply address only.
- `private/` and every `*.pdf` are gitignored. The CV PDF must never be committed, copied into `public/`, bundled into the build or logged. `tests/pdf.test.mjs` fails if a PDF is tracked or in the build output.
- No phone number and no email address anywhere on the site or in the repo (the noreply address in git config is the only exception).
- Ria Financial Services is named only in the CV section (Experience). Never mention Ria, KYC work at Ria or anything from that job on the project pages, least of all near the AML project.
- Nothing about the master thesis, ECIT or course assignments beyond course names in Education.
- Skill levels exactly as on the CV. Never upgrade them.
- Every number on a project page comes from that project's README, case sheet or docs, and is listed in `docs/numbers.md` with its source. No invented results, users or time saved.
- Text in all three languages: short sentences, plain words, no em dashes, no hype or filler words (exciting, passionate, innovative, seamless, leverage, robust, cutting-edge, powerful, journey), no rhetorical lists of three, no "I am excited to". English is British English. Numbers and dates European: 1.234,56, 31.12.2026, Sep 2026.
- Norwegian is bokmål, never nynorsk. Danish is standard Danish.
- Project names, dashboard labels and quoted UI text stay in English in all languages.
- No analytics and no cookies. The CV passcode lives only in the `CV_PASSCODE` environment variable in Vercel: never in the repo, the browser bundle or a log.
- Never push, create a remote or deploy unless Knut is present and has said yes in that session.

## Where things are

- `content/en.ts`, `content/da.ts`, `content/no.ts`: all text, same type (`content/types.ts`), so a missing translation fails the type check.
- `lib/site.ts`: languages, project links, accent colours, screenshots.
- `app/[lang]/`: the pages. `app/api/cv/route.ts` + `lib/cv.ts`: the passcode route.
- `docs/explain.md`: how it works in plain words. `docs/numbers.md`: where each project number comes from.

## Before saying something is done

`npm run lint`, `npm run typecheck`, `npm run build`, then `npm test`. Say what ran and the result.
