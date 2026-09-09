# Marketingly.dk homepage (repo root)

> Served at the site root `/` (www.marketingly.dk). Originally built under
> `/damascus`; promoted to the root, so these files now live at the repo root.
> The internal landing-page hub moved to `/overview`.


A 1:1 content/structure rebuild of the **marketingly.dk** homepage, with the
motion/interaction polish elevated toward [archetypelab.io](https://archetypelab.io):
text-swap buttons, cards that lift + cursor-glow, scroll reveals, a drifting hero
gradient blob, animated count-ups, a testimonial carousel, a crossfading founder-letter
image column, an animated-border pricing card, a multi-step contact form and an
animated FAQ accordion.

> **Client approval mockup.** Looks finished and on-brand; copy is verbatim from the
> brief (Danish, incl. the client's own phrasing — not "corrected").

## Stack (why it's static, not Next.js)

The brief specified Next.js 15 + Tailwind v4 + motion + Lenis. This repo is a
**static landing-page hub** (`/analyse`, `/warberg`, `/stokholm`, `/superliga` — each a
single `index.html`, `cleanUrls` on Vercel, **no build step**). To match the proven
pattern and not break the other apps, the homepage is built the same way: **plain static
files** (served at the root). Every brief requirement is honoured with a static equivalent:

| Brief (Next.js) | Here (static) |
|---|---|
| `content.ts` (typed copy object) | `content.js` (`window.CONTENT`) |
| Tailwind v4 theme tokens | CSS custom properties in `index.html` `:root` |
| `motion` / Framer whileInView | `IntersectionObserver` + CSS transitions (`--ease-out-expo`) |
| Lenis smooth scroll | native `scroll-behavior:smooth` + JS anchor offset |
| `lucide-react` | inline lucide SVG paths (`ICON` map in `app.js`) |
| `next/font` (Manrope + Inter) | Google Fonts `<link>` |
| `next/image` (fill + sizes, priority) | `<img>` with `loading="lazy"`, intrinsic `object-fit` |
| Server Action → Resend | `content.js → contact.endpoint` (blank = mockup: success state only) |
| `dataLayer` push | same (`growth_evaluation_submitted` on submit) |

Respects `prefers-reduced-motion` (reveals → instant, blob/parallax/count-ups off).

## Files

```
/  (repo root)
  index.html     markup + ALL CSS (design tokens in :root)
  content.js     ← ALL COPY & SETTINGS live here (edit this, not the HTML)
  app.js         renders content.js + wires every interaction
  cases/         6 case images (scraped from the live Webflow CDN)
  testimonials/  3 avatars + 2 generated video posters
  letter/        founder-letter photos
  faq/           mathias-teaching.jpg
  video/         2 self-hosted testimonial clips + hippo-bts.mp4 (+ posters)
  img/           logo-marketingly.png
  ASSET-SCRAPE-LOG.md   provenance of every downloaded asset
```

## Where copy lives

**`content.js`** is the single source of truth — hero, trust pills, cases, the founder
letter, pricing, FAQ, footer, and the contact-form fields all live there. `app.js`
renders it into the section skeletons in `index.html`.

## Fidelity vs. the live marketingly.dk

Built from the brief's copy/asset list, then reconciled 1:1 against the actual live
page (recovered from the Webflow CDN + Wayback capture — the site is unpublished):

- **Restored a whole section the brief omitted:** "VORES SERVICE — Kanaler vi skaber
  stor succes på" with the channel-logo strip (Meta, TikTok, Snapchat, Google,
  Pinterest, Klaviyo), rendered as an infinite marquee. Sits after the Content stats,
  before the testimonials, exactly as on the live site.
- **Case-card copy differs from the live site on purpose.** The brief supplied newer,
  more specific case descriptions + tags (e.g. GrejFreak "+40% YoY / +25.000.000",
  Tajmer "+75.000.000") and said to use them verbatim, so those are what's shipped.
  The live site's older wording is in `ASSET-SCRAPE-LOG.md` if you'd rather revert.
- **Skipped Webflow template leftovers** that aren't real content (a stray "Basic plan
  $10 / professional $14" pricing block from the BRIX template).
- The contact section has **no map** (removed at the client's request). The address
  still shows as a text row.

## Things worth knowing before launch

- **Videos.** The two portrait testimonial clips (GrejFreak, Out of Bounds) are the
  client-supplied files, self-hosted (the brief's Vimeo IDs were never filled in).
  `hippo-bts.mp4` is the real hero/BTS video pulled from the live Webflow CDN, reused as
  the Content-section loop. Posters for the testimonial clips were generated from the
  video frames.
- **Contact form is multi-step** — one question at a time (7 steps), not one big form.
  It's a mockup: set `content.js → contact.endpoint` to a real endpoint (or wire a
  Resend Server Action when this moves to Next.js) to actually send.
- **Missing assets** (documented in `ASSET-SCRAPE-LOG.md`): the live site had no
  `og-image` (OG now points at `cases/outofbounds.jpg`). The founder-letter column shows
  3 photos. No SVG logo exists on the site — the nav uses the same CSS "M" mark as the
  rest of this repo; `logo-marketingly.png` (white wordmark) is included if you'd rather
  swap it in.
- **CVR in the footer** (`content.js → meta.cvr`) is a placeholder — verify before launch.
```
