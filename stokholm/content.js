/* ============================================================================
   content.js — SINGLE SOURCE OF TRUTH for all copy & settings on this page.
   Edit here, not in index.html. See README.md.
   Static mockup (no build step / no CMS), so this replaces the brief's
   Next.js `content.ts`. Same idea: one place to swap copy before launch.
   ========================================================================== */

window.CONTENT = {

  /* --- The only action on this page. Every CTA points here. ----------------- */
  ticketUrl: "https://nikolajstokholm.dk/#billetter",

  /* --- Tracking. Leave blank to no-op silently (safe for the mockup). ------- */
  /* In a real deploy these come from env; here you paste the IDs before launch */
  metaPixelId: "",   // e.g. "1234567890"
  ga4Id: "",         // e.g. "G-XXXXXXXXXX"

  /* --- HERO ---------------------------------------------------------------- */
  hero: {
    /* Five headline variants for A/B testing. index.html renders `activeHeadline`.
       To switch the live headline, change `activeHeadline` (0–4). */
    activeHeadline: 0,
    headlines: [
      "Hele Danmarks Stokkefar er tilbage. Og denne gang er han ikke alene.",                                  // A (default)
      "Tre shows. 120.000 solgte billetter. Nu kommer det fjerde.",                                            // B
      "Han lover at det bliver det sjoveste til dato. Han plejer ikke at love noget, han ikke holder.",        // C
      "Størstedelen af turnéen er allerede udsolgt. Der er stadig byer tilbage.",                              // D
      "Er det den samme person? Ingen ved det. Alle spørger.",                                                 // E
    ],
    subheadline:
      "Nikolaj Stokholm feat. Stokkefar — Danmarksturné 2026/27. Fjerde onemanshow. Over 40 byer fra Frederikshavn til Sønderborg.",
    ctaLabel: "Køb billet",
    trustLine: "Officielt billetsalg via nikolajstokholm.dk",
  },

  /* --- OM SHOWET ----------------------------------------------------------- */
  about: {
    heading: "Hvad kan man forvente?",
    /* Client's own copy — verbatim, do not rewrite. */
    lead:
      "Så sker det endelig. Dét, som en hel nation har ventet på. I denne tid, hvor man bare har brug for at sætte sig ned, grine og glemme alt omkring sig, er der kun én, som kan løse denne umulige opgave. Og det er gode gamle Stokkefar. Med tre succesfulde shows bag sig er forventningerne enorme. Og det ved han godt.",
    pullQuote:
      "For at være 100 % sikker på, at du får dit livs sjoveste aften, tager jeg selvfølgelig også den uforudsigelige Stokkefar med på scenen. Er det den samme person? Ingen ved det. Alle spørger. Men du spørger ikke – for du skal jo se det.",
    pullQuoteAuthor: "Nikolaj Stokholm",
    credibility:
      "Siden debuten i 2007 er Nikolaj Stokholm blevet en af landets mest folkekære entertainere med sin skæve, selvironiske og uforudsigelige humor. Tre storsælgende onemanshows — det seneste solgte 120.000 billetter. Nu er han klar med det fjerde.",
    proof: [
      "Siden 2007",
      "4. onemanshow",
      "120.000 billetter solgt på seneste turné",
      "40+ byer i Danmark",
    ],
    ctaLabel: "Køb billet",
  },

  /* --- ANMELDELSER & EXIT POLLS -------------------------------------------- */
  reviews: {
    heading: "Hvad siger publikum?",
    sub: "Exit polls fra salen — og hvad pressen skrev.",
    /* 9:16 phone-shot exit polls. Files dropped in /video later. */
    videos: [
      { src: "video/review-1.mp4", poster: "video/review-1-poster.jpg", caption: "Publikum efter showet i Aarhus" },
      { src: "video/review-2.mp4", poster: "video/review-2-poster.jpg", caption: "Publikum efter showet i København" },
      { src: "video/review-3.mp4", poster: "video/review-3-poster.jpg", caption: "Publikum efter showet i Aalborg" },
    ],
    /* PLACEHOLDER — do NOT invent real quotes/ratings/attributions.
       Swap in real citations before launch. */
    pressQuotes: [
      { outlet: "BT",          stars: 5, quote: "[PLACEHOLDER — afventer rigtigt citat]", url: "" },
      { outlet: "Ekstra Bladet", stars: 5, quote: "[PLACEHOLDER — afventer rigtigt citat]", url: "" },
      { outlet: "Politiken",   stars: 4, quote: "[PLACEHOLDER — afventer rigtigt citat]", url: "" },
    ],
  },

  /* --- HOVED-CTA: Køb billet til din by ------------------------------------ */
  conversion: {
    heading: "Køb billet til din by",
    sub: "Turnéen spiller i over 40 byer i hele landet — fra Frederikshavn til Sønderborg. Størstedelen af showene er udsolgt, og der åbnes løbende ekstra shows.",
    ctaLabel: "Se alle datoer og køb billet",
    /* Display-only text chips. NOT links, NOT live data. Proof of scale only. */
    cities: [
      "København", "Aarhus", "Odense", "Aalborg", "Esbjerg", "Vejle", "Kolding", "Randers", "Herning",
      "Silkeborg", "Horsens", "Roskilde", "Næstved", "Helsingør", "Greve", "Ringsted", "Rødovre",
      "Svendborg", "Sønderborg", "Aabenraa", "Frederikshavn", "Thisted", "Skive", "Viborg",
      "Slagelse", "Maribo", "Hillerød", "Holstebro",
    ],
    cloudNote: "Se de aktuelle datoer og ledige billetter på nikolajstokholm.dk",
  },

  /* --- STICKY MOBILE BAR --------------------------------------------------- */
  sticky: { ctaLabel: "Køb billet" },

  /* --- FOOTER -------------------------------------------------------------- */
  footer: {
    trustLine: "Officielt billetsalg via nikolajstokholm.dk",
    booking: "PR, management og booking: Tajmer Booking & Management — tajmer.dk",
    bookingUrl: "https://www.tajmer.dk/",
    facebook: "https://www.facebook.com/nikolaj.stokholm",
    instagram: "https://www.instagram.com/nikolajstokholm/",
  },
};
