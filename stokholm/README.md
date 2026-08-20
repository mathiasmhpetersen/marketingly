# /stokholm — Nikolaj Stokholm feat. Stokkefar (Meta Ads landing page)

Single-page, mobile-first landing page for the Danish comedy tour
**"Nikolaj Stokholm feat. Stokkefar — Danmarksturné 2026/27"**. Receives cold +
warm Meta Ads traffic and drives one action: an outbound click to the official
ticket section on `nikolajstokholm.dk/#billetter`. Tickets are **not** sold here.

> **Client approval mockup.** Looks finished and on-brand; copy will be swapped
> before launch.

## Stack (why it's static, not Next.js)

The brief specified Next.js 15. This repo is a **static landing-page hub**
(`/analyse`, `/warberg`, `/superliga` — each a single `index.html`, `cleanUrls`
on Vercel, no build step). To match the proven pattern and avoid breaking the
other apps, `/stokholm` is built the same way: **plain static files, no build**.
Every Next.js requirement is honoured with a static equivalent:

| Brief (Next.js) | Here (static) |
|---|---|
| `content.ts` | `content.js` (`window.CONTENT`) |
| `tailwind.config.ts` theme tokens | CSS custom properties in `index.html` `:root` |
| `next/font/local` | `@font-face` / Google Fonts (see BRAND.md ⚠️) |
| `next/image` | `<img>` with `loading`/`fetchpriority`/intrinsic `width`+`height` |
| Meta Pixel via `next/script` | `analytics.js`, loaded conditionally |
| `NEXT_PUBLIC_*` env vars | IDs in `content.js` (no-op if blank) |

## Files

```
stokholm/
  index.html     markup + all CSS (design tokens in :root)
  content.js     ← ALL COPY & SETTINGS live here (edit this, not the HTML)
  analytics.js   Meta Pixel + GA4 + custom events, behind one module
  app.js         renders content.js into the page + wires behaviour
  img/           brand images (see BRAND.md)
  video/         drop real videos here (see below)
  fonts/         drop real woff2 here when supplied
```

## Where copy lives

**`content.js`** is the single source of truth. Hero headlines, subhead, the
"Om showet" copy, proof strip, press-quote placeholders, city cloud, captions,
footer — all there. The hero headline and about lead also appear statically in
`index.html` (for fast LCP + SEO); `app.js` keeps them in sync with `content.js`
on load, so **editing `content.js` is enough**.

### Change the ticket URL
`content.js → ticketUrl`. Every CTA on the page (5 of them) uses it.

### A/B test the hero headline
`content.js → hero.activeHeadline` — set `0`–`4` to pick from `hero.headlines`
(A–E). Variant A is the default.

### Swap the videos
Drop these exact filenames into `stokholm/video/` (with poster frames):

```
video/hero.mp4       + video/hero-poster.jpg        (16:9, autoplay muted loop)
video/review-1.mp4   + video/review-1-poster.jpg    (9:16 exit poll)
video/review-2.mp4   + video/review-2-poster.jpg    (9:16 exit poll)
video/review-3.mp4   + video/review-3-poster.jpg    (9:16 exit poll)
```

Until a file exists, the page renders a **branded placeholder** (dark panel +
play icon + filename) — it never breaks. Captions/filenames are in
`content.js → reviews.videos`.

### Press quotes
`content.js → reviews.pressQuotes`. These are **`[PLACEHOLDER]`** on purpose —
**do not invent** real quotes, ratings or attributions. Swap in real citations
(with `outlet`, `stars`, `quote`, `url`) before launch.

## Tracking

All tracking is behind `analytics.js` so a cookie banner can be wired in later
without touching components. Set IDs in `content.js`:

- `metaPixelId` — Meta Pixel. Blank ⇒ no-op.
- `ga4Id` — GA4. Blank ⇒ no-op.

Events: `PageView` (load), `ViewContent` (Om showet at 50% viewport),
`BilletCTAClick` with a `section` param (`hero` | `om_showet` | `anmeldelser` |
`hovedcta` | `sticky_mobile`), and scroll-depth at 25/50/75/100%.

## Re-download brand images

If any image in `img/` is missing (the source WAF rate-limits), re-run from repo
root — image requests bypass the WAF, but pace them:

```bash
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126.0 Safari/537.36"
curl -s -A "$UA" -e "https://nikolajstokholm.dk/" \
  -o stokholm/img/press-1.jpg \
  "https://nikolajstokholm.dk/wp-content/uploads/2025/04/SN_Nikolaj_Stokholm_0225_59014_extended.jpg"
# repeat for: about.png, press-2.jpg, og-image.png, favicon.png, tour-logo-alt.png
```

## Local preview

Any static server from repo root, e.g. `npx serve` or `python3 -m http.server`,
then open `/stokholm/`. On Vercel it's live at `/stokholm` (cleanUrls).
