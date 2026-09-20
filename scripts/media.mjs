// Derives the site's images from the game repo (SPACEWAR_ROOT, default "..").
// Outputs land in public/img and are committed, so the site builds without the game repo.
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.env.SPACEWAR_ROOT || "..";
const langs = ["ja", "en", "de", "fr", "zh-Hans", "zh-Hant"];
const captures = ["title", "space", "roster", "unique_a", "deck", "city_night", "ground", "starmap"];
const slides = ["01_title", "02_space", "03_unique", "04_ground", "05_city", "06_starmap", "07_hq", "08_clear"];
const out = "public/img";

const src = (...p) => path.join(root, ...p);
const kb = async (f) => Math.round((await stat(f)).size / 1024);

async function shots() {
  for (const lang of langs) {
    await mkdir(`${out}/shots/${lang}`, { recursive: true });
    for (const name of captures) {
      const dst = `${out}/shots/${lang}/${name}.webp`;
      await sharp(src("ios/store/captures/iphone-6.9", lang, `${name}.png`))
        .resize({ width: 640, kernel: "lanczos3" })
        .webp({ quality: 92, effort: 6, smartSubsample: true })
        .toFile(dst);
      console.log(dst, await kb(dst), "KB");
    }
  }
}

async function store() {
  for (const lang of langs) {
    await mkdir(`${out}/store/${lang}`, { recursive: true });
    for (const name of slides) {
      const dst = `${out}/store/${lang}/${name.slice(0, 2)}.webp`;
      await sharp(src("ios/store/screenshots/iphone-6.9", lang, `${name}.png`))
        .resize({ width: 720, kernel: "lanczos3" })
        .webp({ quality: 90, effort: 6, smartSubsample: true })
        .toFile(dst);
      console.log(dst, await kb(dst), "KB");
    }
  }
}

async function icons() {
  const icon = src("ios/Sources/Assets.xcassets/AppIcon.appiconset/icon-1024.png");
  await mkdir("app", { recursive: true });
  await sharp(icon).resize(512).png().toFile("app/icon.png");
  await sharp(icon).resize(180).png().toFile("app/apple-icon.png");
  await sharp(icon).resize(512).png().toFile(`${out}/icon-512.png`);
  await sharp(icon).resize(256).webp({ quality: 92 }).toFile(`${out}/icon-256.webp`);
}

async function plate() {
  const dst = `${out}/plate.webp`;
  await sharp(src("assets/img/title_plate.png")).webp({ quality: 84, effort: 6 }).toFile(dst);
  console.log(dst, await kb(dst), "KB");
}

// The title screen's lockup: MECHA above BURST, BURST pushed right and tucked under MECHA's baseline.
async function wordmark() {
  const mecha = sharp(src("assets/img/title_word_mecha.png"));
  const burst = sharp(src("assets/img/title_word_burst.png"));
  const m = await mecha.metadata();
  const b = await burst.metadata();
  const burstX = 150;
  const burstY = Math.round(m.height * 0.82);
  const w = Math.max(m.width, burstX + b.width);
  const h = burstY + b.height;
  const canvas = sharp({ create: { width: w, height: h, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } });
  const png = await canvas
    .composite([
      { input: await burst.toBuffer(), left: burstX, top: burstY },
      { input: await mecha.toBuffer(), left: 0, top: 0 },
    ])
    .png()
    .toBuffer();
  const dst = `${out}/wordmark.webp`;
  await sharp(png).resize({ width: 1100 }).webp({ quality: 92, alphaQuality: 90, effort: 6 }).toFile(dst);
  console.log(dst, await kb(dst), "KB", `${w}x${h}`);
  return png;
}

async function og(wordmarkPng) {
  const W = 1200, H = 630;
  const bg = await sharp(src("assets/img/title_plate.png"))
    .resize(W, H, { fit: "cover", position: "centre" })
    .modulate({ brightness: 0.62 })
    .toBuffer();
  const mark = await sharp(wordmarkPng).resize({ width: 620 }).toBuffer();
  const mm = await sharp(mark).metadata();
  const dst = `${out}/og.png`;
  await sharp(bg)
    .composite([{ input: mark, left: Math.round((W - mm.width) / 2), top: Math.round((H - mm.height) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(dst);
  console.log(dst, await kb(dst), "KB");
}

await mkdir(out, { recursive: true });
await icons();
await plate();
const mark = await wordmark();
await og(mark);
await shots();
await store();
