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

// Exactly the levels in private/cv-en.pdf, cv-da.pdf and cv-no.pdf. Tools are row 2 of Skills.
const levels = {
  en: {
    tools: "Excel (advanced), PowerPoint (advanced), Word (advanced), SPSS (intermediate), SmartPLS (intermediate), Python (basic), SQL and Power BI (in development through coursework)",
    languages: ["Native", "Fluent (C1)", "Fluent"],
  },
  da: {
    tools: "Excel (avanceret), PowerPoint (avanceret), Word (avanceret), SPSS (mellemniveau), SmartPLS (mellemniveau), Python (grundlæggende), SQL og Power BI (under udvikling gennem studiet)",
    languages: ["Modersmål", "Flydende (C1)", "Flydende"],
  },
  no: {
    tools: "Excel (avansert), PowerPoint (avansert), Word (avansert), SPSS (middels), SmartPLS (middels), Python (grunnleggende), SQL og Power BI (under utvikling gjennom studiet)",
    languages: ["Morsmål", "Flytende (C1)", "Flytende"],
  },
};

test("skill and language levels are exactly as on the CV", () => {
  for (const lang of langs) {
    assert.equal(content[lang].skills.rows[1].value, levels[lang].tools, `${lang} tools`);
    assert.deepEqual(content[lang].languages.rows.map((r) => r.value), levels[lang].languages, `${lang} languages`);
  }
});

test("no work permit line", () => {
  for (const lang of langs) {
    for (const [path, text] of strings(content[lang])) {
      assert.ok(!/work permit|right to work|arbejdstilladelse|arbeidstillatelse|statsborger/i.test(text), `${lang} ${path}`);
    }
  }
});
