// After `npm run build`, every internal link and asset reference in out/ must resolve to a file.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const out = new URL("../out/", import.meta.url).pathname;

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === "_next" ? [] : htmlFiles(p);
    return name.endsWith(".html") ? [p] : [];
  });
}

function resolves(ref) {
  const path = ref.split(/[?#]/)[0];
  const target = join(out, path);
  if (!existsSync(target)) return false;
  return statSync(target).isDirectory() ? existsSync(join(target, "index.html")) : true;
}

test("internal references resolve", { skip: !existsSync(out) && "run npm run build first" }, () => {
  const pages = htmlFiles(out);
  assert.ok(pages.length >= 20, `only ${pages.length} pages built`);
  const missing = new Set();
  for (const page of pages) {
    const html = readFileSync(page, "utf8");
    for (const m of html.matchAll(/(?:href|src|poster)="(\/[^"]*)"/g)) {
      if (!resolves(m[1])) missing.add(`${page.replace(out, "")} → ${m[1]}`);
    }
    for (const m of html.matchAll(/<source[^>]*src="(\/[^"]*)"/g)) {
      if (!resolves(m[1])) missing.add(`${page.replace(out, "")} → ${m[1]}`);
    }
  }
  assert.deepEqual([...missing], []);
});

test("pages carry canonical and hreflang links", { skip: !existsSync(out) && "run npm run build first" }, () => {
  for (const lang of ["ja", "en", "de", "fr", "zh-Hans", "zh-Hant"]) {
    for (const slug of ["", "support/", "privacy/"]) {
      const html = readFileSync(join(out, lang, slug, "index.html"), "utf8");
      assert.match(html, new RegExp(`<html lang="${lang}"`), `${lang}/${slug} html lang`);
      assert.match(html, new RegExp(`rel="canonical" href="https://mechaburst.com/${lang}/${slug}"`), `${lang}/${slug} canonical`);
      assert.match(html, /hreflang="x-default"/i, `${lang}/${slug} x-default`);
      assert.match(html, /property="og:image"/, `${lang}/${slug} og:image`);
    }
  }
});

test("Pages conventions are present", { skip: !existsSync(out) && "run npm run build first" }, () => {
  for (const f of ["_headers", "404.html", "index.html", "support/index.html", "privacy/index.html", "robots.txt", "sitemap.xml", "img/og.png", "media/preview-ja.mp4", "media/preview-en.mp4"]) {
    assert.ok(existsSync(join(out, f)), `${f} missing from out/`);
  }
  assert.match(readFileSync(join(out, "404.html"), "utf8"), /SIGNAL LOST/);
});
