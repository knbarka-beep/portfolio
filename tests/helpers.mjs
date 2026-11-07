import { execSync } from "node:child_process";
import { en } from "../content/en.ts";
import { da } from "../content/da.ts";
import { no } from "../content/no.ts";

export const content = { en, da, no };

// Files git tracks, plus new files that are not ignored.
export const repoFiles = () =>
  execSync("git ls-files --cached --others --exclude-standard", { encoding: "utf8" }).split("\n").filter(Boolean);

// Every string inside an object, with its key path.
export function strings(value, path = "") {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
  if (value && typeof value === "object") return Object.entries(value).flatMap(([k, v]) => strings(v, path ? `${path}.${k}` : k));
  return [];
}

// Key structure without the text, so the three languages can be compared.
export function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  return typeof value;
}
