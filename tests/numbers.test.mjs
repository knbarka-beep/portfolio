// Every number on a project page must be listed in docs/numbers.md with a source,
// and (when the project repos sit next to this one) the quoted words must be in that source file.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { content, strings } from "./helpers.mjs";

const slugs = ["variance-cockpit", "startup-runway", "aml-queue"];
const doc = readFileSync("docs/numbers.md", "utf8");

// Rows per project: | number | source | quote |
const rows = Object.fromEntries(slugs.map((s) => [s, []]));
let current = null;
for (const line of doc.split("\n")) {
  const heading = line.match(/^## (\S+)/);
  if (heading) current = slugs.includes(heading[1]) ? heading[1] : null;
  const cells = line.split("|").map((c) => c.trim());
  if (current && cells.length >= 5 && /^\d/.test(cells[1])) rows[current].push({ number: cells[1], source: cells[2], quote: cells[3] });
}

// The start-page card text is part of the project too.
const numbersOn = (slug) => {
  const found = new Set();
  for (const lang of ["en", "da", "no"]) {
    for (const [, text] of strings(content[lang].projects[slug])) {
      for (const n of text.match(/\d+(?:[.,]\d+)*/g) ?? []) found.add(n);
    }
  }
  return found;
};

for (const slug of slugs) {
  test(`${slug}: every number on the page is in docs/numbers.md`, () => {
    const listed = new Set(rows[slug].map((r) => r.number));
    const missing = [...numbersOn(slug)].filter((n) => !listed.has(n));
    assert.deepEqual(missing, []);
  });

  test(`${slug}: each quote contains its number and is in the source file`, (t) => {
    for (const row of rows[slug]) {
      assert.ok(row.quote.includes(row.number), `quote for ${row.number} does not contain it`);
      assert.ok(row.source.startsWith(`${slug}/`), `${row.number}: source must be in ${slug}`);
    }
    const repo = join("..", slug);
    if (!existsSync(repo)) return t.skip(`../${slug} not found; source files not checked`);
    for (const row of rows[slug]) {
      const source = readFileSync(join("..", row.source), "utf8");
      assert.ok(source.includes(row.quote), `${row.number}: quote not found in ${row.source}`);
    }
  });
}
