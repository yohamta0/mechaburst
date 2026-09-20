// `next build` emits its own out/404.html; Cloudflare Pages serves that file for
// every unmatched path, so the branded page from public/ takes its place.
import { copyFile } from "node:fs/promises";

await copyFile("public/404.html", "out/404.html");
console.log("out/404.html ← public/404.html");
