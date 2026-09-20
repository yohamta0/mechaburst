# MECHA BURST — official site

Static marketing, support and privacy pages for the iOS game, served by a
Cloudflare Worker (static assets) at https://mechaburst.com. Built with Next.js (static
export); no server code, no analytics, no cookies.

## Pages

| URL | Purpose |
|---|---|
| `/` | picks the visitor's language, lands on `/<lang>/` |
| `/<lang>/` | landing page (App Store Connect: Marketing URL) |
| `/<lang>/support/` | contact + FAQ (App Store Connect: Support URL) |
| `/<lang>/privacy/` | privacy policy (App Store Connect: Privacy Policy URL) |

`<lang>` is one of `ja`, `en`, `de`, `fr`, `zh-Hans`, `zh-Hant`. Use the
matching language's URL for each App Store locale.

## Layout

- `app/[lang]/` — layout and the three pages; `app/sitemap.ts`
- `components/` — header, hero, phone bezel, badge, footer
- `content/<lang>.json` — every string, one file per language (same shape, checked by tests)
- `lib/site.ts` — domain, contact email, developer name, App Store id, video map
- `public/` — media derived from the game repo (`img/`, `media/`), Apple badges, `_headers`, root redirect, 404
- `scripts/media.mjs`, `scripts/video.sh` — regenerate `public/img` and `public/media` from the game repo

## Commands

```sh
pnpm install
pnpm build       # → out/
pnpm test            # content shape + built-output link checks
pnpm dev         # local preview with hot reload
pnpm deploy      # build and upload out/ to the Pages project "mechaburst"
```

Regenerating media needs the game repo and ffmpeg:

```sh
SPACEWAR_ROOT=/path/to/spacewar-go pnpm media
```

## Deploying

Cloudflare Workers with static assets. With the Git integration (Workers &
Pages → Create → Worker → import this repo) set:

- Build command: `pnpm build`
- Deploy command: `npx wrangler deploy`

Every push to `main` then deploys. Locally:

```sh
npx wrangler login   # once
pnpm deploy          # build + wrangler deploy
```

`mechaburst.com` is attached to the Worker under Settings → Domains & Routes.

## When the App Store listing is live

Set `app.storeId` in `lib/site.ts` to the numeric Apple ID (App Store Connect →
App Information). The badges then link to the listing instead of showing
"coming soon".
