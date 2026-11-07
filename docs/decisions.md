# Decisions

Small choices made during the build. Each one: what, why, and the alternative.

| # | What | Why | Alternative |
|---|------|-----|-------------|
| 1 | Next.js 16.4 with App Router, Tailwind 4 and TypeScript, made with create-next-app. | The prompt asks for it, and it is the same stack as the three projects. | Plain HTML. Rejected: the CV route needs a server. |
| 2 | Cache Components (on by default in the template) turned off. | Every page is static text built once. The older model, `generateStaticParams` with `dynamicParams = false`, is simpler to explain and turns unknown languages into a 404. | Keep Cache Components. It adds a caching layer this site does not use. |
| 3 | `experimental.globalNotFound` turned on. | The root layout sits under `app/[lang]`, so a URL that matches nothing needs its own 404 page. This is the case the Next.js docs name for it. | A catch-all route. More code for the same result. |
| 4 | Scaffolded in a temporary folder and copied in. | `private/` already held Knut's CV, and create-next-app refuses a folder with files in it. Nothing in `private/` was read or moved. | Move private/ out and back. Rejected: touches the CV. |
