// UI check in headless Microsoft Edge over the DevTools protocol (no extra dependency).
// Local: `npm run build`, then `node tests/qa_edge.mjs` (starts `next start` on port 3100 itself).
// Live, run ONCE (do not poll): `node tests/qa_edge.mjs https://knutbarka.vercel.app`
// Screenshots go to docs/screenshots/ (local) or docs/screenshots/live/ (live).
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const LIVE = (process.argv[2] ?? "").replace(/\/$/, "");
const SITE_PORT = 3100, CDP_PORT = 9334, BASE = LIVE || `http://127.0.0.1:${SITE_PORT}`;
const SHOTS = LIVE ? "docs/screenshots/live" : "docs/screenshots";
mkdirSync(SHOTS, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const server = LIVE ? null : spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(SITE_PORT)], { stdio: "ignore" });
const profile = join(tmpdir(), `qa-edge-portfolio-${Date.now()}`);
const edge = spawn(EDGE, ["--headless=new", `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${profile}`,
  "--no-first-run", "--disable-gpu", "about:blank"], { stdio: "ignore" });

let ws, id = 0;
const pending = new Map(), consoleErrors = [];
const results = [];
const check = (name, ok, detail = "") => { results.push({ name, ok, detail }); console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` (${detail})` : ""}`); };

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const msgId = ++id;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
}
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.value;

async function connect() {
  for (let i = 0; i < 60; i++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json();
      const page = targets.find((t) => t.type === "page");
      if (page) {
        ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise((r) => ws.addEventListener("open", r, { once: true }));
        ws.addEventListener("message", (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id && pending.has(msg.id)) {
            const p = pending.get(msg.id);
            pending.delete(msg.id);
            msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
          } else if (msg.method === "Runtime.exceptionThrown") {
            consoleErrors.push(msg.params.exceptionDetails.text);
          } else if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
            consoleErrors.push(msg.params.args.map((a) => a.value ?? a.description).join(" "));
          } else if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") {
            consoleErrors.push(`${msg.params.entry.text} ${msg.params.entry.url ?? ""}`);
          }
        });
        return;
      }
    } catch {}
    await sleep(500);
  }
  throw new Error("Edge did not start");
}

async function waitForSite() {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(`${BASE}/en`)).ok) return; } catch {}
    await sleep(500);
  }
  throw new Error("Site did not start");
}

async function setViewport(width, height = 900, mobile = false) {
  viewport = { width, height, mobile };
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
}
async function setSystemDark(dark) {
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: dark ? "dark" : "light" }] });
}
async function go(path) {
  await send("Page.navigate", { url: BASE + path });
  for (let i = 0; i < 40; i++) {
    await sleep(150);
    if ((await evaluate("document.readyState")) === "complete") break;
  }
  // Reveal everything (scroll-in animation) and wait for images.
  await evaluate(`(async () => {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager' });
    const visible = [...document.images].filter((i) => i.offsetParent);
    await Promise.race([Promise.all(visible.map((i) => i.decode().catch(() => {}))), new Promise((r) => setTimeout(r, 4000))]);
  })()`);
  await sleep(600);
}
let viewport = { width: 1440, height: 900, mobile: false };
async function shot(name, fullPage = true) {
  if (fullPage) {
    // Grow the viewport to the full page, capture, then restore.
    const height = await evaluate("document.documentElement.scrollHeight");
    await send("Emulation.setDeviceMetricsOverride", { width: viewport.width, height, deviceScaleFactor: 1, mobile: viewport.mobile });
    await sleep(400);
  }
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(`${SHOTS}/${name}.png`, Buffer.from(data, "base64"));
  if (fullPage) await setViewport(viewport.width, viewport.height, viewport.mobile);
}
const setTheme = (theme) => evaluate(`(() => { localStorage.setItem('theme', '${theme}'); document.documentElement.dataset.theme = '${theme}'; return true })()`);

try {
  await connect();
  if (!LIVE) await waitForSite();
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");

  // Redirect from / follows the browser language.
  for (const [accept, expected] of [["en-GB,en;q=0.9", "/en"], ["da-DK,da;q=0.9", "/da"], ["nb-NO,nb;q=0.9", "/no"], ["de-DE", "/en"]]) {
    const res = await fetch(BASE + "/", { redirect: "manual", headers: { "accept-language": accept } });
    const location = new URL(res.headers.get("location") ?? "", BASE).pathname;
    check(`/ redirects ${accept} to ${expected}`, [307, 308].includes(res.status) && location === expected, `${res.status} ${location}`);
  }

  // Screenshots: start page and one project page, light, dark and 375 px, in all three languages.
  for (const lang of ["en", "da", "no"]) {
    for (const [page, path] of [["start", `/${lang}`], ["variance-cockpit", `/${lang}/projects/variance-cockpit`]]) {
      await setSystemDark(false);
      await setViewport(1440);
      await go(path);
      await setTheme("light");
      await shot(`${lang}-${page}-light`);
      await setTheme("dark");
      await sleep(300);
      await shot(`${lang}-${page}-dark`);
      await setTheme("light");
      await setViewport(375, 812, true);
      await go(path);
      const scroll = await evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth");
      check(`${path} no horizontal scroll at 375 px`, scroll <= 0, `overflow ${scroll}px`);
      await shot(`${lang}-${page}-375`);
    }
  }

  // Every page: html lang, hreflang, OG image tag, and the live dashboard link.
  const live = { "variance-cockpit": "https://variance-cockpit.vercel.app", "startup-runway": "https://nordlys-runway.vercel.app", "aml-queue": "https://lysbro-aml.vercel.app" };
  await setViewport(1440);
  for (const lang of ["en", "da", "no"]) {
    for (const slug of ["", ...Object.keys(live)]) {
      const path = slug ? `/${lang}/projects/${slug}` : `/${lang}`;
      await go(path);
      const info = await evaluate(`(() => ({
        lang: document.documentElement.lang,
        hreflang: [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => l.hreflang).sort().join(','),
        og: document.querySelector('meta[property="og:image"]')?.content ?? '',
        title: document.title,
        liveHref: [...document.querySelectorAll('a.pill-accent')].map((a) => a.href)[0] ?? '',
        navLinks: [...document.querySelectorAll('header a')].map((a) => a.getAttribute('href')),
      }))()`);
      const expectLang = { en: "en-GB", da: "da", no: "nb" }[lang];
      check(`${path} html lang ${expectLang}`, info.lang === expectLang, info.lang);
      check(`${path} hreflang en, da, nb, x-default`, info.hreflang === "da,en,nb,x-default", info.hreflang);
      check(`${path} has og:image and title`, info.og.includes("opengraph-image") && info.title.length > 10, info.title);
      if (slug) check(`${path} live link`, info.liveHref.replace(/\/$/, "") === live[slug], info.liveHref);
      else check(`${path} nav reaches all three projects`, Object.keys(live).every((s) => info.navLinks.includes(`/${lang}/projects/${s}`)));
      const ogPath = new URL(info.og).pathname;
      const og = await fetch(BASE + ogPath);
      check(`${path} OG image returns 200`, og.status === 200, `${og.status} ${ogPath}`);
    }
  }

  // Keyboard: Tab order on the start page, visible focus ring, dialog focus trap and Esc.
  await go("/en");
  const tabOrder = [];
  for (let i = 0; i < 14; i++) {
    await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    tabOrder.push(await evaluate(`(() => { const a = document.activeElement; const s = getComputedStyle(a); return (a.textContent.trim() || a.getAttribute('aria-label') || a.tagName).slice(0, 30) + (s.outlineStyle !== 'none' && s.outlineWidth !== '0px' ? ' [ring]' : ' [NO RING]') })()`));
  }
  console.log("Tab order:", tabOrder.join(" > "));
  check("Tab order starts with skip link, then nav", tabOrder[0].startsWith("Skip to content") && tabOrder[1].startsWith("Knut Barka"), tabOrder.slice(0, 3).join(" > "));
  check("Visible focus ring on every tab stop", tabOrder.every((t) => t.endsWith("[ring]")));
  await shot("en-focus-ring", false);

  const opened = await evaluate(`(() => { const b = [...document.querySelectorAll('button')].find((x) => x.textContent.includes('Full CV')); b.click(); return document.querySelector('dialog').open })()`);
  check("CV dialog opens", opened);
  await sleep(200);
  const inside = [];
  for (let i = 0; i < 6; i++) {
    await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    inside.push(await evaluate("!!document.activeElement.closest('dialog[open]') || document.activeElement === document.body"));
  }
  check("Dialog keeps focus inside while open", inside.every(Boolean), inside.join(","));
  await shot("en-cv-dialog", false);
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await sleep(200);
  check("Esc closes the dialog", await evaluate("![...document.querySelectorAll('dialog')].some((d) => d.open)"));

  // CV route: a wrong code gets "Wrong code" after about a second; the PDF is never public.
  const t0 = Date.now();
  const wrong = await fetch(BASE + "/api/cv", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code: "not-the-code" }) });
  const wrongText = await wrong.text();
  if (LIVE) check("/api/cv wrong code", wrong.status === 401 && wrongText === "Wrong code" && Date.now() - t0 >= 900, `${wrong.status} ${wrongText}`);
  else check("/api/cv answers without passcode configured", [401, 503].includes(wrong.status), `${wrong.status} ${wrongText}`);
  check("/api/cv sends noindex", (wrong.headers.get("x-robots-tag") ?? "").includes("noindex"));
  for (const p of ["/cv.pdf", "/Knut-Barka-CV.pdf", "/private/cv.pdf", "/cv/Knut-Barka-CV.pdf", "/api/cv"]) {
    const r = await fetch(BASE + p);
    const type = r.headers.get("content-type") ?? "";
    check(`GET ${p} gives no PDF`, !type.includes("pdf"), `${r.status} ${type}`);
  }
  const robots = await (await fetch(BASE + "/robots.txt")).text();
  check("robots.txt disallows /api/", robots.includes("Disallow: /api/"));
  const notFound = await fetch(BASE + "/en/projects/nothing");
  check("Unknown project gives 404", notFound.status === 404, String(notFound.status));
  await go("/xyz");
  await shot("404", false);

  // Console errors from the site's own scripts.
  const own = consoleErrors.filter((e) => !/favicon|chrome-extension/i.test(e) && !/status of 40[14]/.test(e));
  check("No console errors", own.length === 0, own.slice(0, 3).join(" | "));
} catch (error) {
  check("QA run", false, error.message);
} finally {
  ws?.close();
  edge.kill();
  if (server) spawn("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  await sleep(500);
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length} of ${results.length} checks passed.`);
  process.exit(failed.length ? 1 : 0);
}
