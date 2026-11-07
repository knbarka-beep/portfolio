// The passcode route logic, with a fake PDF instead of Vercel Blob. Also the start-language choice.
import { test } from "node:test";
import assert from "node:assert/strict";
import { codesMatch, handleCvRequest } from "../lib/cv.ts";
import { pickLocale } from "../lib/locale.ts";

const fakePdf = new TextEncoder().encode("fake pdf bytes");
const post = (body) =>
  new Request("http://x/api/cv", { method: "POST", body: typeof body === "string" ? body : JSON.stringify(body) });
const opts = { passcode: "fjord-lighthouse-42", readPdf: async () => fakePdf, wrongCodeDelayMs: 50 };

const disposition = (lang) => `attachment; filename="Knut-Barka-CV-${lang}.pdf"`;

test("right code streams the PDF as an attachment, never cached", async () => {
  const res = await handleCvRequest(post({ code: "fjord-lighthouse-42" }), opts);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("content-type"), "application/pdf");
  assert.equal(res.headers.get("content-disposition"), disposition("EN"));
  assert.equal(res.headers.get("cache-control"), "private, no-store");
  assert.match(res.headers.get("x-robots-tag"), /noindex/);
  assert.deepEqual(new Uint8Array(await res.arrayBuffer()), fakePdf);
});

test("lang picks the file; unknown lang gives English; a missing language falls back to English", async () => {
  const asked = [];
  const files = { en: fakePdf, da: new TextEncoder().encode("da pdf") };
  const readPdf = async (lang) => (asked.push(lang), files[lang] ?? null);
  const run = (lang) => handleCvRequest(post({ code: "fjord-lighthouse-42", lang }), { ...opts, readPdf });

  const da = await run("da");
  assert.equal(da.headers.get("content-disposition"), disposition("DA"));
  assert.equal(await da.text(), "da pdf");

  for (const lang of ["de", "../x", 7, undefined]) {
    asked.length = 0;
    const res = await run(lang);
    assert.equal(res.headers.get("content-disposition"), disposition("EN"));
    assert.deepEqual(asked, ["en"], "unknown lang never reaches readPdf");
  }

  asked.length = 0;
  const no = await run("no");
  assert.equal(no.status, 200);
  assert.equal(no.headers.get("content-disposition"), disposition("EN"));
  assert.deepEqual(asked, ["no", "en"]);
});

test("wrong, empty, too long or broken input gives 'Wrong code' after the delay", async () => {
  for (const body of [{ code: "fjord-lighthouse-41" }, { code: "" }, {}, { code: "x".repeat(500) }, "not json", { code: 42 }]) {
    const t0 = Date.now();
    const res = await handleCvRequest(post(body), opts);
    assert.equal(res.status, 401);
    assert.equal(await res.text(), "Wrong code");
    assert.ok(Date.now() - t0 >= 45, "waits before answering");
    assert.equal(res.headers.get("cache-control"), "private, no-store");
  }
});

test("missing passcode or missing PDF: available on request", async () => {
  const noCode = await handleCvRequest(post({ code: "anything" }), { ...opts, passcode: undefined });
  assert.equal(noCode.status, 503);
  const noPdf = await handleCvRequest(post({ code: "fjord-lighthouse-42" }), { ...opts, readPdf: async () => null });
  assert.equal(noPdf.status, 503);
  assert.match(await noPdf.text(), /on request/);
});

test("codesMatch compares exactly", () => {
  assert.ok(codesMatch("abc", "abc"));
  assert.ok(!codesMatch("abc", "abcd"));
  assert.ok(!codesMatch("ABC", "abc"));
});

test("start language from Accept-Language", () => {
  assert.equal(pickLocale(null), "en");
  assert.equal(pickLocale("da-DK,da;q=0.9,en;q=0.8"), "da");
  assert.equal(pickLocale("nb-NO"), "no");
  assert.equal(pickLocale("nn"), "no");
  assert.equal(pickLocale("no,en;q=0.5"), "no");
  assert.equal(pickLocale("de-DE,de;q=0.9"), "en");
  assert.equal(pickLocale("de,da;q=0.5"), "da");
  assert.equal(pickLocale("en-GB,da;q=0.9"), "en");
  assert.equal(pickLocale("da;q=0,nb;q=0.4"), "no");
});
