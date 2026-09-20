// Every language file must expose the same keys and array shapes as the Japanese source,
// and no language may be a leftover copy of another.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const dir = new URL("../content/", import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
const load = (f) => JSON.parse(readFileSync(new URL(f, dir), "utf8"));

function shape(v, path = "") {
  if (Array.isArray(v)) return [`${path}[${v.length}]`, ...v.flatMap((x, i) => shape(x, `${path}[${i}]`))];
  if (v && typeof v === "object") return Object.keys(v).sort().flatMap((k) => shape(v[k], `${path}.${k}`));
  return [`${path}:${typeof v}`];
}

test("content files exist for the six languages", () => {
  assert.deepEqual(files, ["de.json", "en.json", "fr.json", "ja.json", "zh-Hans.json", "zh-Hant.json"]);
});

test("every language matches the Japanese shape", () => {
  const ref = shape(load("ja.json"));
  for (const f of files) assert.deepEqual(shape(load(f)), ref, `${f} shape differs from ja.json`);
});

test("no language is a copy of another", () => {
  const texts = files.map((f) => readFileSync(new URL(f, dir), "utf8"));
  for (let i = 0; i < files.length; i++)
    for (let j = i + 1; j < files.length; j++) assert.notEqual(texts[i], texts[j], `${files[i]} equals ${files[j]}`);
});

test("no string is empty", () => {
  for (const f of files) {
    const walk = (v, path) => {
      if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`));
      else if (v && typeof v === "object") for (const k of Object.keys(v)) walk(v[k], `${path}.${k}`);
      else assert.ok(String(v).trim().length > 0, `${f}${path} is empty`);
    };
    walk(load(f), "");
  }
});
