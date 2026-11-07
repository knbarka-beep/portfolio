// The CV PDF must never be tracked by git or end up in the build output.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, statSync, openSync, readSync, closeSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { repoFiles } from "./helpers.mjs";

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "cache") continue; // .next/cache holds only image and compiler caches
      yield* walk(full);
    } else yield full;
  }
}

const startsWithPdfHeader = (file) => {
  const fd = openSync(file, "r");
  const buf = Buffer.alloc(5);
  readSync(fd, buf, 0, 5, 0);
  closeSync(fd);
  return buf.toString("latin1") === "%PDF-";
};

test("no PDF is tracked or waiting to be committed", () => {
  const pdfs = repoFiles().filter((f) => f.toLowerCase().endsWith(".pdf"));
  assert.deepEqual(pdfs, []);
  const tracked = execSync("git ls-files", { encoding: "utf8" });
  assert.ok(!/^private\//m.test(tracked), "nothing in private/ may be tracked");
});

test("private/ and *.pdf are gitignored", () => {
  const ignored = execSync("git check-ignore private/cv.pdf any/where/file.pdf", { encoding: "utf8" });
  assert.match(ignored, /private\/cv\.pdf/);
  assert.match(ignored, /any\/where\/file\.pdf/);
});

test("no PDF in public/ or the build output", () => {
  const dirs = ["public", ".next", ".vercel/output"].filter(existsSync);
  assert.ok(dirs.includes(".next"), "run `npm run build` first so the build output can be checked");
  const found = [];
  for (const dir of dirs) {
    for (const file of walk(dir)) {
      if (file.toLowerCase().endsWith(".pdf") || startsWithPdfHeader(file)) found.push(file);
    }
  }
  assert.deepEqual(found, []);
});
