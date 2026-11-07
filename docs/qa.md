# QA log

## Part A, 07.11.2026 (local production build)

| Check | Result |
|---|---|
| `npm run lint` | Clean |
| `npm run typecheck` | Clean |
| `npm run build` | Succeeds. 9 HTML pages, 12 Open Graph images, sitemap and robots built static; `/api/cv` is the only server route. |
| `npm test` | 21 of 21 pass: no PDF tracked or in the build output; da and no have the same keys as en; every project number in `docs/numbers.md`, and every quote found in its source file; no email or phone pattern in the repo; no em dashes; banned words absent; Ria only in Experience; no thesis or ECIT; skill levels exact; CV route; start language. |
| `npm run qa` (headless Edge) | 85 of 85 pass. Redirect from `/` for en, da, nb and other languages; html lang and hreflang on all 12 pages; OG image 200 on all 12; live dashboard links; nav reaches all three projects; no horizontal scroll at 375 px (6 pages); Tab order and visible focus ring; dialog keeps focus and Esc closes it; `/api/cv` noindex; no PDF at any guessed public URL; 404 for unknown pages; no console errors. |
| Tab order on the start page | Skip to content > Knut Barka > CV > Variance cockpit > Startup runway > AML queue > EN > DA > NO > theme > See projects > Full CV (PDF) > LinkedIn > first project card |
| CV route in `next dev` with a dummy PDF from outside the repo | Wrong code: 401 "Wrong code" after about 1 s. Right code: 200, `application/pdf`, `attachment; filename="Knut-Barka-CV.pdf"`, `private, no-store`, `noindex`. The dummy file was outside the repo; nothing in `private/` was read or changed. |
| Lighthouse 13.6 (mobile preset, local `next start`, Edge) | Start page: performance 85, accessibility 100, best practices 100, SEO 100. Variance cockpit page: 93, 100, 100, 100. Logged, not tuned. |

Screenshots: `docs/screenshots/`, `{en,da,no}-{start,variance-cockpit}-{light,dark,375}.png`, plus `en-focus-ring.png`, `en-cv-dialog.png` (shows the "on request" state, since no passcode is set locally) and `404.png`.

Not checked in Part A: the right passcode against the real Blob store (Knut does that in Part B), and the live site.

## Part B live check, 07.11.2026, https://knutbarka.vercel.app (run once)

85 of 85 checks pass with `node tests/qa_edge.mjs https://knutbarka.vercel.app`:

- `/` redirects (307) to /en, /da or /no by browser language; other languages go to /en.
- All three languages load, with the right html lang and hreflang tags on all 12 pages.
- The nav reaches all three project pages. "Open live dashboard" points to variance-cockpit.vercel.app, nordlys-runway.vercel.app and lysbro-aml.vercel.app (hrefs checked, the dashboards were not visited).
- `/api/cv` with a wrong code: 401 "Wrong code" after about 1 s, with a noindex header. The right code was not tested; Knut does that in his browser.
- No PDF at /cv.pdf, /Knut-Barka-CV.pdf, /private/cv.pdf, /cv/Knut-Barka-CV.pdf or GET /api/cv. The Blob URL itself returns 403 without a token.
- No horizontal scroll at 375 px; Open Graph images return 200 on all 12 pages; keyboard, focus ring and dialog checks pass; no console errors.

Screenshots: `docs/screenshots/live/`.

## Fix round, 07.11.2026 (local production build)

| Check | Result |
|---|---|
| `npm run lint`, `npm run typecheck`, `npm run build` | Clean |
| `npm test` | 21 of 21 pass |
| `npm run qa` (headless Edge) | 123 of 123 pass on two runs in a row. One earlier run had 122 of 123: a single console error with no message ("Uncaught"). It did not come back in two full runs or three hero and theme runs, so the source is unknown. The QA now logs the full error text, so a repeat will name it. |
| New: theme across navigation | Set dark, then click EN > DA > NO > a project page > EN: dark after every switch. No light frame in 165 samples (every animation frame plus every change to `<html>`). Before the fix the same check failed: theme lost on every switch, light frames drawn. |
| New: hero | The buttons stay above the fold at 1440 x 900 (bottom at 521 px) and 375 x 667 (bottom at 451 to 479 px) in all three languages. The screenshot stack links to all three project pages. |
| New: external links | On all 12 pages every link to another site has `target="_blank"`, `rel="noopener noreferrer"` and the hidden "(opens in a new tab)" text in the page language. No internal link opens a new tab. |
| Tab order on the start page | Skip to content > Knut Barka > CV > Variance cockpit > Startup runway > AML queue > EN > DA > NO > theme > See projects > Full CV (PDF) > LinkedIn (opens in a new tab) > hero stack (Variance cockpit, Startup runway, AML queue) > project cards |

Screenshots retaken: `docs/screenshots/{en,da,no}-start-{light,dark,375}.png`, the project pages, and `en-hero-1440x900.png` and `en-hero-375x667.png` for the fold.

## Fix round live check, 07.11.2026, https://knutbarka.vercel.app (run once, 2 minutes after the deploy was ready)

120 of 123. The 3 failures were one check on the three start pages, and the fault was in the check, not the site:

- The check read the first hidden text inside any outside link and expected "(opens in a new tab)".
- Live, the passcode is set, so the CV dialog shows the code form and has no LinkedIn link. The first hidden text was then the hero LinkedIn icon's name, "LinkedIn".
- The part that matters passed: no link lacked `target`, `rel` or the note.

Every other live check passed, including:

- Dark theme kept across EN > DA > NO > project > EN, with no light frame.
- Hero buttons above the fold.
- External links on the project pages.
- `/api/cv` "Wrong code" and no public PDF.

Fix: the check now looks for the note inside each outside link's own text. It was not rerun on the live site, since the live check is run once per round. Instead, a local build in the live state (dummy passcode and token, so the dialog shows the form) passed 123 of 123, with 4 outside links on each start page, all correct.
