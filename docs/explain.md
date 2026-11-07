# How the site works

Plain words, for explaining it in an interview.

## The site in one paragraph

It is a Next.js website. Almost every page is plain HTML that is built once, when the site is deployed, and then served as files. There is no database: all text sits in three files, `content/en.ts`, `content/da.ts` and `content/no.ts`. They share one TypeScript type, so if a Danish or Norwegian text is missing, the build fails. The only part that runs on a server is the CV download.

## Languages

Each language has its own address: `/en`, `/da` and `/no`. When someone opens the bare address `/`, a small piece of code (`proxy.ts`) reads the language the browser asks for. Danish goes to `/da`, any Norwegian (nb, nn or no) goes to `/no`, everything else goes to `/en`. The language switcher in the menu keeps you on the same page. Each page tells search engines about its translations (hreflang tags), and the page language is set correctly for screen readers (`en-GB`, `da`, `nb`).

## Light and dark

Light is the default. On the first visit the site follows the computer's setting. If you press the moon or sun button, the choice is saved in the browser (localStorage, not a cookie). A tiny script runs before the page is drawn, so the colours never flash.

## The CV passcode

- The PDF is stored in a private Vercel Blob store. A private store has no public address: only the server, with a secret token, can read it.
- The passcode is an environment variable, `CV_PASSCODE`, set in Vercel. It is not in the code, not sent to the browser and never written to a log. Knut sets it himself.
- The CV exists in English, Danish and Norwegian. "Full CV (PDF)" opens a small window with one field for the code. The browser sends the code to `/api/cv`, which only checks it.
- Right code: the window shows three buttons, English, Dansk and Norsk, with the page's language first. Each button asks `/api/cv` again, with the code and that language, and downloads the file. The window stays open, so a visitor can take one, two or all three.
- The code is kept only in the page's memory while the window is open. Closing the window forgets it. Nothing is stored in the browser and there is no cookie.
- The server compares the code with `CV_PASSCODE`. It turns both into a fixed-length fingerprint (SHA-256) and compares those in constant time, so the time it takes does not reveal how many characters were right.
- For each download the server checks the code again, reads that language's PDF from Blob (`cv/Knut-Barka-CV-EN.pdf`, `-DA.pdf` or `-NO.pdf`) and sends it as a download with the same name, marked so browsers and proxies do not keep a copy (`Cache-Control: private, no-store`).
- Wrong code: the server waits about one second and answers "Wrong code". No hint. The wait makes guessing slow.
- No cookie: the code is asked for every time. That keeps the site free of cookies and banners.
- If the passcode or the Blob store is missing, the button still shows, and the window says "The full CV is available on request" with a link to LinkedIn. The build does not fail.
- `/api/` is closed to search engines in `robots.txt`, and every answer from `/api/cv` carries a `noindex` header.

**Be honest about what this is.** It is simple protection for a CV, not security for sensitive data. Anyone who gets the code can pass it on, and anyone who gets the PDF can share the file. Knut can change the code at any time in Vercel (Settings, Environment Variables), followed by a redeploy, and every old code stops working.

- Any language value other than en, da or no counts as English. If the chosen language has no file in Blob, the English CV is sent.

The code is in `lib/cv.ts` (the check and the language choice, which tests can run with a fake PDF) and `app/api/cv/route.ts` (reads the real file from Blob). In `next dev` the route reads `private/cv-en.pdf`, `cv-da.pdf` or `cv-no.pdf` instead; `next.config.ts` keeps `private/` out of the build.

## How the PDF stays out of the repo

`private/` and every `*.pdf` file are in `.gitignore`. A test (`tests/pdf.test.mjs`) fails if git tracks any PDF, or if a PDF turns up in `public/` or the build output. The PDF reaches Vercel only through a direct upload to the private Blob store.

## Numbers on the project pages

Every number comes from that project's README or case sheet. `docs/numbers.md` lists each one with the file and the exact sentence it comes from. A test checks that every number on a project page is in that list, and that each sentence really is in the project repo.

## Tests

- `npm test`: no PDF tracked or built; same keys in all three languages; every project number listed with a source; no phone number or email address in the repo; no em dashes; banned words absent; Ria only in Experience; the CV route with right, wrong and missing codes; the language choice for `/`.
- `npm run qa` (after `npm run build`): opens the site in headless Microsoft Edge, takes screenshots, and checks redirects, links, keyboard use, the dialog, 375 px width, Open Graph images and console errors.
