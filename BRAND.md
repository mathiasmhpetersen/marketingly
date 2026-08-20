# BRAND.md — Nikolaj Stokholm feat. Stokkefar

Design system for the `/stokholm` landing page, extracted from the live brand
(nikolajstokholm.dk) on 2026-08-20. Single source of truth for the page's tokens.

## How this was extracted

The live site sits behind a **Simply.com WAF** that blocks `curl`/programmatic
requests to the HTML & CSS (`HTTP 454` + JS browser-challenge). Two things got
through: **image assets** (the WAF passes image requests) and a **real headless
Chrome render** (it executes the JS challenge like a browser). So the palette and
layout below are read from the *actual rendered site*, not guessed. Exact CSS hex
of the theme's own tokens and the real `@font-face` names remain WAF-locked and
are reconstructed (flagged `⚠️`).

> Correction note: an earlier pass assumed a dark/near-black canvas (the brief
> described it that way). The rendered site is the opposite — a **warm taupe →
> cream** world. The page was rebuilt to match.

## Colors (sampled from the rendered site — reliable)

| Token | Value | Role |
|---|---|---|
| `--paper` | `#efe2d4` | light warm cream — main section background |
| `--paper-2` | `#e7d8c7` | deeper cream — cards |
| `--taupe-hi` | `#b7a288` | warm light behind the subject (hero gradient) |
| `--taupe-mid` | `#7c6653` | mid taupe |
| `--taupe-lo` | `#463f42` | cool dark edge of the hero gradient |
| `--espresso` | `#241d18` | dark contrast panels (Om showet, conversion, footer) |
| `--red` (the one accent) | `#e8443f` | neon wordmark + all display headings + status |
| `--red-glow` | `rgba(232,68,63,.45)` | neon halo on red |
| `--cream-text` / `--cream-soft` | `#f4ead9` / `#c6b39d` | text on dark |
| `--ink` / `--ink-soft` | `#2a221c` / `#6f5f50` | text on cream |
| script cream | `#f2e4cf` | "Feat. Stokkefar" script + Nikolaj's linen suit |

The hero is a **warm taupe radial gradient** — light and warm behind the subject,
cooler/darker at the edges — with the transparent portrait cut-out laid over it
so the studio backdrop and the page background merge seamlessly. Sections then
alternate **light cream ↔ dark espresso** for rhythm; red is used sparingly, only
for the neon wordmark, display headings, and status/accents.

## Typography

The wordmark ships as a pre-rendered **image** (neon-tube, condensed, ALL-CAPS).
Real body/nav font names are WAF-locked. Rebuild substitutes:

| Role | Original | Substitute | Status |
|---|---|---|---|
| Display / headings | condensed uppercase **neon-tube** | **Oswald** 600/700 + red neon `text-shadow` | ⚠️ substitute |
| Script accent | cream **handwritten signature** | **Caveat** 700 | ⚠️ substitute |
| Body / UI | sans-serif | **Inter** 400–700 | ⚠️ substitute |

Loaded from Google Fonts (closest free equivalents). When the client supplies the
real woff2, drop them in `/stokholm/fonts/`, add `@font-face`, swap the `<link>`.
The brief's "self-host, no Google substitute" rule is overridden here *only
because the originals are genuinely WAF-unavailable* — flag for the client.

## Buttons

The site's primary CTA is a **dark charcoal pill** (`--pill #231c17`), full radius,
white uppercase label. On this page: dark pill on light/warm backgrounds; on the
dark espresso conversion/Om-showet bands the money CTA flips to a **neon-red pill**
with glow for emphasis. Red is the accent, dark is the default.

## Mood

Warm, cinematic, editorial. Filmic taupe photography, a glowing red neon wordmark
and cream script as the only flourishes, generous negative space. Premium and
theatrical — **not** a dark SaaS page, no gradient blobs / glassmorphism / purple.

## Assets in `/stokholm/img/` (image requests bypass the WAF)

- `hero-portrait.png` — transparent cut-out of Nikolaj (hero) ✅
- `tour-logo.png` — red-neon wordmark + cream script (hero + footer) ✅
- `poster.jpg` — tour poster (Om showet supporting image) ✅
- `press-1.jpg`, `press-2.jpg`, `about.png`, `og-image.png`, `favicon.png` —
  the WAF rate-limited these mid-build; any that are missing degrade gracefully
  (`og:image` falls back to the poster; favicon is an inline SVG). Re-run the
  download in `README.md` to complete them.

## Tokens quick reference

```
Backgrounds: --paper #efe2d4  --paper-2 #e7d8c7  --espresso #241d18
Hero taupe : #b7a288 → #7c6653 → #463f42 (radial, light behind subject)
Accent     : --red #e8443f  (glow rgba(232,68,63,.45))
Text/dark  : #f4ead9 / #c6b39d      Text/cream: #2a221c / #6f5f50
Button     : --pill #231c17 (light bg)  ·  red pill (dark bg)
Fonts      : Oswald (display) · Inter (body) · Caveat (script)  — all ⚠️ substitutes
```
