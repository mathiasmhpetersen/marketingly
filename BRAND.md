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

## Colors (client-supplied codes — authoritative)

The client provided three brand codes; the page is built on them:

| Token | Value | Role |
|---|---|---|
| `--paper` | `#e3d2ca` | light warm ground — main section backgrounds |
| `--tan` | `#b19379` | warm tan — accent, conversion band, footer headings |
| `--dark` | `#434343` | charcoal — **all buttons + the footer** |
| `--ink` / `--ink-soft` | `#434343` / `#6f625a` | text on light |
| `--cream-text` / `--cream-soft` | `#efe4da` / `#c8b6a6` | text on dark (footer) |
| logo red | `#e8443f` | only in the neon wordmark image (kept as the single accent pop) |

Rhythm: warm cream/tan hero gradient → light cream Om showet → tan `#b19379`
conversion band → charcoal `#434343` footer. Buttons are charcoal `#434343`
everywhere. The red only survives inside the pre-rendered neon wordmark image.

> Earlier passes used a taupe→espresso + neon-red-heading scheme sampled from the
> live site. The client then supplied the three codes above, so headings are now
> charcoal on light / tan on dark (no red neon glow), matching the supplied footer.

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
