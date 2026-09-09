# Marketingly.dk — Asset Scrape Log

**Date:** 2026-09-07
**Target site:** https://marketingly.dk

## Important: live site is DOWN

The live domain (`marketingly.dk` and `www.marketingly.dk`) returns a **Webflow 404
"Page not found" page on every path** (root, `/home`, `/forside`, `/da`, `robots.txt`,
`sitemap.xml`), served through Cloudflare. The `marketingly.webflow.io` staging
subdomain also 404s. The Webflow project appears to be unpublished.

**Fallback used:** The most recent Wayback Machine capture
(`20260413164049`, 2026-04-13, HTTP 200) of `https://www.marketingly.dk/` was fetched
raw (`.../web/20260413164049id_/...`) to enumerate every asset URL.

**Good news:** the Webflow asset CDN (`cdn.prod.website-files.com`) is a separate host
and **still serves the original files directly** even though the site domain is dead.
All image/video downloads below were pulled live from that CDN at full/original
resolution (the un-suffixed original, i.e. larger than any `-p-500/800/1080` variant).

---

## (a) Target → Source → Status

| Target file | Source URL (cdn.prod.website-files.com/...) | Status |
|---|---|---|
| cases/grejfreak.jpg | `659e9ce097b2b48a1465345b/659e9ce097b2b48a14653537_grejfreak.dk_1654971019_2858426440611440145_5914399798.jpg` | OK — JPEG, 475 KB |
| cases/outofbounds.jpg | `659e9ce097b2b48a1465345b/659e9ce097b2b48a14653538_gruppbild-1200px-2023.jpg` | OK — JPEG, 728 KB (Out of Bounds team group photo) |
| cases/friluftsland.jpg | `659e9ce097b2b48a1465345b/659e9ce097b2b48a14653539_friluftsland_1640804163_2739586341392231691_484642621.jpg` | OK — JPEG, 384 KB |
| cases/ppi.jpg | `659e9ce097b2b48a1465345b/659e9ce097b2b48a1465353a_paulpetersensidraetsinstitut_1689679168_3149579598555057500_1233829479.jpg` | OK — JPEG, 388 KB |
| cases/tajmer.**png** | `659e9ce097b2b48a1465345b/659e9ce097b2b48a1465353b_Instagram (3).png` | OK — PNG 1980x1080, 3.7 MB. **Ext mismatch:** source is PNG, target asked .jpg. Kept .png (no conversion). |
| cases/chefmade.**png** | `659e9ce097b2b48a1465345b/65a14b750f6ed8ed073c5d1d_chefmade.png` | OK — PNG 770x440, 564 KB. **Ext mismatch:** kept .png. |
| testimonials/casper.**png** | `659e9ce097b2b48a14653437/659e9ce097b2b48a146535a2_casper_pedersen.png` | OK — PNG 250x310, 92 KB (Casper Pedersen, GrejFreak). **Ext mismatch:** kept .png. |
| testimonials/alexander.jpg | `659e9ce097b2b48a14653437/659e9ce097b2b48a146535a3_alexander-e-23.jpg` | OK — JPEG 401x…, 119 KB (Alexander Edsmyr, Out of Bounds) |
| testimonials/sofie.**png** | `659e9ce097b2b48a14653437/659e9ce097b2b48a146535a5_Design uden navn (69).png` | OK — PNG 1080x1080, 615 KB. Confirmed = Sofie Bennedsen, Tajmer testimonial avatar. **Ext mismatch:** kept .png. |
| letter/oob-messe.jpg | `659e9ce097b2b48a14653437/6963e0b81c7325da511efed9_IMG_0130.JPG` | OK — JPEG 3024x4032, 3.5 MB. Visually confirmed: Mathias + Alexander at the Out-of-Bounds trade-show stand. |
| letter/office-meeting.**png** | `659e9ce097b2b48a14653437/6963e072182cbccedfd14a8a_19.png` | OK — PNG 1080x1080, 2.3 MB. Visually confirmed: meeting at the wooden table. **Ext mismatch:** source is PNG, target asked .jpg. Kept .png. |
| letter/presentation.jpg | `659e9ce097b2b48a14653437/65a1541ad663a8386bce1fb1_mathiaspetersen__1655276081_2860985595104405649_1720430084.jpg` | OK — JPEG, 180 KB. Visually confirmed: Mathias presenting the Awareness/Engagement/Conversion funnel slide. |
| letter/office-chair.jpg | — | **NOT-FOUND.** No photo of Mathias sitting in an office chair exists on the page. (See notes.) |
| faq/mathias-teaching.jpg | `659e9ce097b2b48a14653437/65afbf397896c313d3f7e550_mathiaspetersen__1655276081_2860985595104488650_1720430084 (1).jpg` | OK — JPEG, 132 KB. Visually confirmed: Mathias teaching/presenting (used beside the FAQ "Ofte stillede spørgsmål" heading). |
| img/logo-marketingly.**png** | `659e9ce097b2b48a14653437/659e9ce097b2b48a14653571_marketingly-white.png` | OK — PNG 1567x280, 20 KB (white "M" mark + wordmark, used in nav). **Ext mismatch:** no SVG logo exists on the site; only this PNG. |
| img/og-image.jpg | — | **NOT-FOUND.** The page has `og:title`, `og:type`, `twitter:card=summary_large_image` but **no `og:image` / `twitter:image` meta tag** at all. |
| video/hippo-bts.mp4 | `659e9ce097b2b48a14653437/65a14619dfbfd2af6bc5d1fd_Design uden navn (22)-transcode.mp4` | OK — MP4, 2.9 MB. This is the hero background/BTS-style video (Webflow `w-background-video`). |
| video/hippo-bts-poster.jpg *(bonus)* | `659e9ce097b2b48a14653437/65a14619dfbfd2af6bc5d1fd_Design uden navn (22)-poster-00001.jpg` | OK — JPEG, 21 KB. Poster frame for the hero video (saved alongside, not in original target list). |
| letter/mathias-portrait.png *(bonus)* | `659e9ce097b2b48a14653437/659e9ce097b2b48a14653572_spejlvendt hasberg.png` | OK — PNG 1080x1080, 1.7 MB. A smiling Mathias headshot (with headphones). No target slot; saved as a bonus since it's a genuine usable portrait. |

**All 18 mapped/bonus files verified with `file` as real JPEG/PNG/MP4 — none were HTML error pages or 0-byte.**

## (b) Vimeo IDs discovered

Two Vimeo videos are embedded (via embed.ly/embedly widgets, testimonial/case video section):

- **1019472251** — thumbnail `i.vimeocdn.com/video/1937854849-...-d_960`
- **1040009348** — thumbnail `i.vimeocdn.com/video/1962494878-...-d_960`

These are hosted on Vimeo (not on the Webflow CDN); the raw MP4s are not directly
downloadable from the HTML. If needed for the rebuild, pull them from
`https://vimeo.com/1019472251` and `https://vimeo.com/1040009348`.

## (c) Asset URLs found but NOT mapped to a target (decorative / UI / brand logos)

All under `cdn.prod.website-files.com/659e9ce097b2b48a14653437/` unless noted:

- `659e9ce097b2b48a14653546_bg3.png`, `659e9ce097b2b48a14653555_bg4.png` — decorative section backgrounds
- `659e9ce097b2b48a14653560_blg.png` — decorative purple/orange gradient blob (not a photo, not the logo)
- `659e9ce097b2b48a146535b3_Screenshot 2024-01-04 at 15.56.27.png` — a dashboard/analytics screenshot used as a full-width background
- Platform/partner brand logos (row): `659e9ce097b2b48a146535ad_Facebook-Logo-2019.png`, `659e9ce097b2b48a146535b6_2560px-TikTok_logo.svg.png`, `659e9ce097b2b48a146535b7_snapchat-text-logo-png-pic-22.png`, `659e9ce097b2b48a146535b9_klaviyo-primary-logo-charcoal-medium.png`, `..._google-logo-color-brix-templates.svg`, `..._pinterest-logo-color-brix-templates.svg`
- `673f3e1fe9f94441f117b516_Design uden navn (27).png` — favicon / apple-touch-icon (in `<link>` in `<head>`)
- UI/icon SVGs: `Play-24.svg`, `Pause.svg` (video controls), `instra.svg`, `tu.svg`, `facebook.svg`, `CheckCircle.svg`, `Bill 2.svg`, `Horizontal Toggle Button.svg`, `Chat Bubble Oval Favorite Heart.svg`, `line-rounded-phone/email/check-circle/mark`, `left/right-arrow-line-icon` (BRIX template icons)

## (d) Important assets with no target slot in the brief

- **Hero background video poster** — saved as `video/hippo-bts-poster.jpg` (real frame for `hippo-bts.mp4`).
- **Two Vimeo videos** (IDs above) — the actual video content in the case/testimonial section; not fetchable via curl from the page.
- **Platform logo strip** (Facebook, TikTok, Snapchat, Klaviyo, Google, Pinterest) — the "channels we run" trust row; may be wanted for the rebuild.
- **Dashboard screenshot** (`Screenshot 2024-01-04...`) — used as a large background/proof element.
- **Extra Mathias portrait** (`spejlvendt hasberg.png`) — saved as bonus `letter/mathias-portrait.png`.

## Notes / discrepancies

- `office-chair.jpg` and `og-image.jpg`: **no matching asset on the site** (documented above).
- Six targets requested `.jpg` but the source files are PNG (tajmer, chefmade, casper, sofie, office-meeting) or the logo is PNG not SVG. Per instructions, nothing was converted — original extensions kept and each mismatch noted in the table.
- Case-image → client mapping was confirmed by DOM position against the case-grid copy
  (GrejFreak → Out of Bounds → Friluftsland → Paul Petersens → Tajmer → chefmade).
- Letter/FAQ photo identities were confirmed by **visually inspecting** each downloaded
  candidate, not just alt text (alt attributes were empty).
