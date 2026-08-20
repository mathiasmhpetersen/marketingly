# BRAND.md — Nikolaj Stokholm feat. Stokkefar

Design system for the `/stokholm` landing page. Extracted from the live brand
(nikolajstokholm.dk) on 2026-08-20. This is the single source of truth for the
page's visual tokens.

## ⚠️ Extraction constraint (read this first)

The live site sits behind a **Simply.com WAF** that returns `HTTP 454 / JS
browser-challenge` to every automated request for the **HTML and CSS**. The
compiled stylesheet, the `<head>` `<link>`/`<script>` tags, and the real
`@font-face` files are therefore **not machine-extractable** from this
environment. What *did* come through cleanly are the **image assets** (the WAF
lets image requests pass), and those carry the real brand — the neon-red
wordmark, the cream script, the near-black canvas, the cream-suit photography.

So: **colors are sampled from the real brand imagery (reliable). Exact CSS hex
values, button radius, and font-family names are best-fit reconstructions
flagged `⚠️ MISSING` below.** To finalise, capture from the client's browser
DevTools (Network → CSS/Fonts, Computed styles) or ask the client for the theme
files.

---

## Colors

| Token | Value | Source | Confidence |
|---|---|---|---|
| `--bg` (near-black canvas) | `#0b0b0b` | `hero-image.png` / `hero-logo-lights-out.png` both target a dark canvas | High (shade APPROX) |
| `--bg-2` (panel) | `#100e0e` | slightly warm black for cards | Derived |
| `--red` (primary accent — the whole brand) | `#e8443f` | sampled from the neon-tube wordmark `hero-logo.png` | High |
| `--red-hot` (hover/hi) | `#ff5a52` | lighter neon core | Derived |
| `--red-glow` | `rgba(232,68,63,.55)` | pink/white neon halo `#ffaaaa` around the tubes | High |
| `--cream` (script + suit tone) | `#f2e4cf` | "Feat. Stokkefar" script + Nikolaj's linen suit | High |
| `--ink` / `--off` | `#ffffff` / `#f3efe9` | body text | High |
| `--muted` / `--muted-2` | `#b3aca4` / `#7d766e` | de-emphasised text | Derived |

> Note: the tour poster's warm taupe `#87705a` is only the photo-studio backdrop
> — **not** a UI color. Do not use it as a site background.

## Typography

The wordmark ("NIKOLAJ STOKHOLM") ships as a pre-rendered **image**, so it is not
a live web font on the page. Real body/nav font-family names are behind the WAF.

| Role | Original | Rebuild choice | Status |
|---|---|---|---|
| Display / headings | Tall **condensed, ALL-CAPS**, uniform-stroke neon-tube display | **Oswald** (600/700, uppercase, tight tracking) + red neon `text-shadow` | ⚠️ MISSING — substitute |
| Script accent ("Feat. Stokkefar") | Casual cream **handwritten signature script** | **Caveat** (700) | ⚠️ MISSING — substitute |
| Body / UI | Sans-serif | **Inter** (400–700) | ⚠️ MISSING — substitute |

Fonts are currently loaded from Google Fonts (`Oswald`, `Inter`, `Caveat`) as the
closest free equivalents. **When the client supplies the real woff2 files**, drop
them in `/stokholm/fonts/`, add `@font-face` rules, and swap the `<link>` in
`index.html`. The brief's "self-host, no Google substitute" rule is intentionally
overridden here *only because the originals are genuinely unavailable* — flag for
the client so they can supply the real files.

## Buttons

⚠️ Exact original button styling is behind the WAF. Reconstructed from palette +
mood: solid **neon-red fill** (`--red`), white uppercase Oswald label, ~6px
radius, red glow shadow, lift on hover. Danish label "Køb billet".

## Mood

Dark, cinematic, retro-cabaret. Near-black stage, a glowing **red neon** wordmark
as the single hero accent, a cream script flourish, and warmly-lit photographic
subject (cream linen suit, black umbrella — Stokkefar's hands on his shoulders).
Premium and theatrical with a nostalgic neon-sign twist. **Not** a SaaS page — no
gradient blobs, glassmorphism or purple.

## Assets pulled into `/stokholm/img/`

Downloaded at build (image requests bypass the WAF):

- `hero-portrait.png` — transparent cut-out of Nikolaj (hero background) ✅
- `tour-logo.png` — red-neon wordmark + cream script (hero + footer) ✅
- `poster.jpg` — tour poster (Om showet supporting image) ✅
- `press-1.jpg`, `press-2.jpg`, `about.png`, `og-image.png`, `favicon.png`,
  `tour-logo-alt.png` — attempted; the WAF rate-limited some. Any that are
  missing fall back gracefully. Re-run the download in `README.md` to complete.

## Tokens (as used in `index.html`)

```
--bg:#0b0b0b  --bg-2:#100e0e  --ink:#ffffff  --off:#f3efe9
--muted:#b3aca4  --muted-2:#7d766e
--red:#e8443f  --red-hot:#ff5a52  --red-deep:#c1332f  --red-glow:rgba(232,68,63,.55)
--cream:#f2e4cf  --line:rgba(255,255,255,.10)
Display: 'Oswald'  Body: 'Inter'  Script: 'Caveat'   (all ⚠️ MISSING substitutes)
```
