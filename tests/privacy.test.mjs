// No phone numbers or email addresses anywhere in the repo.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { repoFiles } from "./helpers.mjs";

const binary = /\.(png|jpe?g|webp|avif|ico|gif|woff2?)$/i;
const email = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g;
const phones = [
  /\+\d{2}[\s-]?\d{2}[\s-]?\d{2}[\s-]?\d{2}[\s-]?\d{2}\b/, // country code, then eight digits
  /(?<![\d.,])\d{2}[\s-]\d{2}[\s-]\d{2}[\s-]\d{2}(?![\d.,])/, // four pairs of digits
  /(?<![\d.,\w])\d{3}[\s-]\d{2}[\s-]\d{3}(?![\d.,])/, // three, two and three digits
];
// The only addresses allowed: GitHub noreply (git config) and example domains.
const allowedEmail = /@users\.noreply\.github\.com$|@example\./i;

test("no email addresses or phone numbers in repo files", () => {
  const hits = [];
  for (const file of repoFiles()) {
    if (binary.test(file)) continue;
    // SVG path data is only coordinates, so lines with d="..." are skipped for the phone check.
    const text = readFileSync(file, "utf8");
    const noSvg = text.split("\n").filter((l) => !/\sd="/.test(l)).join("\n");
    for (const match of text.match(email) ?? []) if (!allowedEmail.test(match)) hits.push(`${file}: ${match}`);
    for (const re of phones) {
      const m = noSvg.match(re);
      if (m) hits.push(`${file}: phone-like "${m[0]}"`);
    }
  }
  assert.deepEqual(hits, []);
});
