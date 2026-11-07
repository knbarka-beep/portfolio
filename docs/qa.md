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
