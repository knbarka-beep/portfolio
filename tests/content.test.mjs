// Text rules for all three languages.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { content, shape, strings } from "./helpers.mjs";

const langs = ["en", "da", "no"];

test("da and no have exactly the same keys and list lengths as en", () => {
  assert.deepEqual(shape(content.da), shape(content.en));
  assert.deepEqual(shape(content.no), shape(content.en));
});

test("no em dashes or en dashes in the content files", () => {
  for (const lang of langs) {
    const raw = readFileSync(`content/${lang}.ts`, "utf8");
    assert.ok(!/[—–]/.test(raw), `${lang}.ts contains an em or en dash`);
  }
});

const banned = [
  // English
  "exciting", "excited", "passionate", "passion", "innovative", "seamless", "leverage", "robust", "cutting-edge", "powerful", "journey", "revolutionary",
  // Danish
  "spændende", "passioneret", "innovativ", "sømløs", "gnidningsfri", "banebrydende", "kraftfuld", "rejsen", "revolutionerende",
  // Norwegian
  "spennende", "lidenskap", "banebrytende", "kraftig", "kraftfull", "reisen", "revolusjonerende",
];

test("banned words are absent in every language", () => {
  for (const lang of langs) {
    for (const [path, text] of strings(content[lang])) {
      for (const word of banned) {
        assert.ok(!new RegExp(`(^|[^\\p{L}])${word}`, "iu").test(text), `${lang} ${path}: "${word}"`);
      }
      assert.ok(!/I am excited to/i.test(text), `${lang} ${path}`);
    }
  }
});

test("Ria and the KYC job appear only in Experience, never on project pages", () => {
  for (const lang of langs) {
    for (const [path, text] of strings(content[lang])) {
      if (path.startsWith("experience.")) continue;
      assert.ok(!/\bRia\b|Euronet/.test(text), `${lang} ${path} names Ria`);
    }
    for (const [path, text] of strings(content[lang].projects)) {
      assert.ok(!/\bKYC\b|\bcashier\b|kasserer/i.test(text), `${lang} projects.${path}`);
    }
  }
});

test("no master thesis or ECIT", () => {
  for (const lang of langs) {
    for (const [path, text] of strings(content[lang])) {
      assert.ok(!/ECIT|master'?s? thesis|masteroppgave|speciale|kandidatafhandling/i.test(text), `${lang} ${path}`);
    }
  }
});

test("skill and language levels are exactly as on the CV", () => {
  const tools = content.en.skills.rows.find((r) => r.label === "Tools").value;
  assert.equal(
    tools,
    "Excel (advanced), PowerPoint (advanced), Word (advanced), SPSS (intermediate), SmartPLS (intermediate), Python (basic), SQL and Power BI (in development through coursework)",
  );
  assert.deepEqual(content.en.languages.rows.map((r) => r.value), ["Native", "Fluent (C1)", "Very good, near-fluent"]);
});
