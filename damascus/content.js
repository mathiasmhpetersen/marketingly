/* ============================================================================
   content.js — SINGLE SOURCE OF TRUTH for all copy & settings on this page.
   Edit here, not in index.html. See README.md.

   Static rebuild (no build step / no CMS), so this replaces the brief's
   Next.js `content.ts`. Same idea: one typed object, one place to swap copy
   before launch. Danish throughout — do NOT "fix" the tone/typos, it's brand.
   ========================================================================== */

window.CONTENT = {

  /* --- Global contact + meta ---------------------------------------------- */
  meta: {
    email: "mathias@marketingly.dk",
    phone: "+45 30 20 01 21",
    phoneHref: "tel:+4530200121",
    address: "Kochsgade 31D, 5000 Odense C",
    mapsQuery: "Kochsgade 31D, 5000 Odense C",
    trustpilot: "https://dk.trustpilot.com/review/marketingly.dk",
    linkedin: "https://www.linkedin.com/in/mathias-maach-haüser-petersen-5098ab202",
    instagram: "https://www.instagram.com/mathiaspetersen_",
    hippoUrl: "https://hippoproductions.dk",
    cvr: "40 29 06 92", // FILL_IN — verify before launch
  },

  /* --- 0. NAV -------------------------------------------------------------- */
  nav: {
    links: [
      { label: "Resultater jeg har skabt", href: "#cases" },
      { label: "Om Mathias", href: "#brev" },
    ],
    buttons: [
      { label: "Ansøg som kunde", href: "#email-form", variant: "ghost" },
      { label: "+45 30 20 01 21", href: "tel:+4530200121", variant: "ghost" },
    ],
  },

  /* --- 1. HERO ------------------------------------------------------------- */
  hero: {
    /* The last chars fade via a horizontal gradient mask — see .fade-tail. */
    h1: "Marketingpartneren, du stoler på",
    sub: "Menneskelig kommunikation og førende resultater.",
    cta: { label: "Bestil en Growth Evaluation", href: "#email-form" },
  },

  /* --- 2. TRUST PILLS ------------------------------------------------------ */
  trustPills: [
    "Hjulpet virksomheder med +2 mia/årlig oms",
    "Vi har stadig vores første kunde på 5. år",
    "Kunder føler sig “som den eneste kunde”",
    "Endnu ikke modtaget en dårlig anmeldelse",
  ],

  /* --- 3. VIDEO TESTIMONIALS ---------------------------------------------- */
  videoTestimonials: {
    heading: "Vores kunder bruger os gns. i 2,8 år",
    /* Self-hosted client videos (4:5 portrait). The brief specified Vimeo
       embeds with FILL_IN IDs; we self-host the supplied clips instead. */
    videos: [
      {
        src: "video/grejfreak-testimonial.mp4",
        poster: "testimonials/grejfreak-poster.jpg",
        title: "GrejFreak",
        lines: ["Fra 60-91 mio DKK/årlig oms.", "Vi har samarbejdet i 3 år"],
      },
      {
        src: "video/outofbounds-testimonial.mp4",
        poster: "testimonials/outofbounds-poster.jpg",
        title: "Out of Bounds",
        lines: ["Fra 30-100 mio SEK/årlig oms.", "Vi har samarbejdet i 5 år"],
      },
    ],
  },

  /* --- 4. WHY US ----------------------------------------------------------- */
  whyUs: {
    heading: "Det sidste bureau, du vælger",
    cards: [
      { icon: "banknote", title: "Fast månedlig pris", body: "Ingen uforudsete udgifter eller et ur der tæller. Du betaler en fast månedlig pris." },
      { icon: "toggle-left", title: "Ingen binding", body: "0 måneders binding." },
      { icon: "message-circle-heart", title: "Skabt til dit behov", body: "Vi udvælger vores kunder nøje. Derfor har vi rent faktisk tid til at sætte os i jeres case." },
    ],
  },

  /* --- 5. CASES ------------------------------------------------------------ */
  cases: {
    heading: "Vi bygger fremtidens markedsledere",
    items: [
      {
        img: "cases/grejfreak.jpg", alt: "GrejFreak — militær- og jagtudstyr",
        tags: ["Digital Markedsføring", "Content Management"], title: "GrejFreak",
        body: "Markedsleder inden for militær og jagtudstyr. Gennem et tæt samarbejde har vi de sidste 3 år øget Grejfreaks omsætning med +40% YoY og genereret +25.000.000 gennem Meta annoncering.",
      },
      {
        img: "cases/outofbounds.jpg", alt: "Out of Bounds — genbrugte golfbolde",
        tags: ["Digital Markedsføring", "Content Management"], title: "Out of Bounds",
        body: "Markedsleder i Europa inden for genbrugte golfbolde. Vi har de sidste 5 år håndteret al Meta annoncering og content-strategi i Danmark, Sverige, Holland og Tyskland.",
      },
      {
        img: "cases/friluftsland.jpg", alt: "Friluftsland — outdoor-butikskæde",
        tags: ["Digital Markedsføring", "Uddannelse af In-house team"], title: "Friluftsland",
        body: "248 medarbejdere, 13 fysiske butikker og +200.000.000 i årlig/oms. Gennem et Done-With-You samarbejde har vi skabt en Top funnel strategi, der har øget ROAS med +379% på mindre end 4 måneder.",
      },
      {
        img: "cases/ppi.jpg", alt: "Paul Petersens Idrætsinstitut",
        tags: ["Digital Markedsføring", "Leadgenerering"], title: "Paul Petersens Idrætsinstitut",
        body: "Danmarks ældste Idrætsinstitut. Vi hjælper Paul Petersens Idrætsinstitut med deres Brand og Performance Marketing på Meta, Google og TikTok.",
      },
      {
        img: "cases/tajmer.png", alt: "Tajmer — bookingbureau",
        tags: ["Digital Markedsføring", "Organisk strategi"], title: "Tajmer",
        body: "Vi samarbejder med Tajmer, som er Danmarks største bookingbureau. Vi håndterer markedsføring og organisk strategi for alle deres artister og har på 3,5 år solgt billetter for +75.000.000 kr",
      },
      {
        img: "cases/chefmade.png", alt: "Chefmade — private dining",
        tags: ["Digital Markedsføring", "B2B Leadgenerering"], title: "Chefmade",
        body: "Danmarks førende virksomhed inden for private dining. Vi har hjulpet chefmade med at udarbejde en inbound strategi der kontinuerligt genererer top-kvalificerede leads.",
      },
    ],
  },

  /* --- 6. CTA BAND --------------------------------------------------------- */
  ctaBand: {
    heading: ["Klar til at", "høre mere?"],
    buttons: [
      { label: "Ansøg som kunde", href: "#email-form", variant: "primary" },
      { label: "Bestil Growth Evaluation", href: "#email-form", variant: "ghost" },
    ],
  },

  /* --- 7. CONTENT / HIPPO PRODUCTIONS -------------------------------------- */
  contentSection: {
    heading: "Vi skaber indhold til hele din kunderejse",
    video: "video/hippo-bts.mp4",
    paragraphs: [
      "I samarbejde med et af landets førende videobureauer __Hippo Productions__, skaber vi den perfekte kombination mellem videoer fra øverste hylde og principperne bag hvad der rent faktisk genererer salg fra et markedsføringsperspektiv.",
      "Vi udarbejder scripts & storyboards med fokus på salgspsykologi, der resonerer med din virksomheds brandidentitet. Vi arbejder med attention triggers, redigering, colorgrading, B-Roll, call to actions mm.",
      "Foruden samarbejdet med Marketingly, står __Hippo Productions__ bl.a bag produktioner for nogle af landets mest anerkendte brands, herunder Carlsberg, Rynkeby, Summerbird og Shaping New Tomorrow.",
    ],
    stats: [
      { value: 6.71, decimals: 2, suffix: "x", label: "Gns. afkast fra annoncer med vores content" },
      { value: 2384, decimals: 0, prefix: "+", label: "Antal produceret annoncer" },
    ],
  },

  /* --- 8. TESTIMONIAL CAROUSEL --------------------------------------------- */
  testimonials: {
    heading: "Føl dig som den eneste kunde",
    slides: [
      {
        avatar: "testimonials/sofie.png", company: "Tajmer Booking & Management",
        quote: "MATHIAS' ÆGTE INTERESSE I SIT ARBEJDE OG I OS SOM KUNDE SKINNEDE IGENNEM FRA FØRSTE MØDE - ET GENIALT MATCH.",
        name: "Sofie Bennedsen", role: "PRODUKTIONSANSVARLIG",
      },
      {
        avatar: "testimonials/alexander.jpg", company: "OUT OF BOUNDS",
        quote: "OVER DE SIDSTE TRE ÅR HAR MATHIAS VÆRET EN AFGØRENDE FAKTOR I VORES SUCCESFULDE EKSPANSION OVER FIRE MARKEDER",
        name: "Alexander Edsmyr", role: "STIFTER & CMO",
      },
      {
        avatar: "testimonials/casper.png", company: "GREJFREAK",
        quote: "DET FØLES LANGT HEN AD VEJEN SOM OM, AT VI ER MATHIAS' ENESTE KUNDE. OG DET ER RART.",
        name: "Casper Pedersen", role: "STIFTER & MEDEJER",
      },
    ],
  },

  /* --- 9. FOUNDER LETTER --------------------------------------------------- */
  letter: {
    heading: "Et personligt brev fra vores stifter",
    images: [
      { src: "letter/oob-messe.jpg", alt: "Mathias og Alexander ved Out of Bounds-standen på messe" },
      { src: "letter/office-meeting.png", alt: "Møde ved bordet på kontoret" },
      { src: "letter/presentation.jpg", alt: "Mathias præsenterer en funnel-slide" },
      { src: "letter/mathias-portrait.png", alt: "Portræt af Mathias Petersen" },
    ],
    from: "Mathias Petersen, ejer",
    re: "Hvorfor vælge os?",
    /* Body split into blocks; blank-line paragraphs preserved. Each block maps
       to one of the 4 sticky images (evenly) for the crossfade-on-scroll. */
    body: [
      "Godt spørgsmål.",
      "Og jeg kan virkelig godt forstå dig.",
      "Det er sværere end nogensinde at gennemskue, hvem der reelt er dygtige, og hvem der bare er dygtige til at sælge sig selv.",
      "I mange år har dårlige annoncører kunne slippe afsted med manglende marketingforståelse og evnen til at camouflere sig som eksperter, fordi platformene tillod det.",
      "Men spillet har ændret sig.",
      "Metas algoritme ændrer sig konstant, CPM-priserne stiger og folk betaler mere end nogensinde prisen for ikke at tilpasse sin forretning til den øget skepsis der kommer fra kunderne.",
      "Man har kunne se bort fra det i 2024 og 2025, men 2026 bliver året hvor jeg tror vi virkelig kommer til at se nogle folk betale prisen for ikke at tilpasse sig.",
      "Men også året, hvor virksomheder der arbejder med den rigtige strategi, får mulighed for virkelig at komme foran konkurrenterne.",
      "Og netop i et marked, hvor kravene bliver højere, betyder det mere end nogensinde, hvem der står bag strategien.",
      "Jeg tror selv på, at en virksomhed ikke er andet end et spejlbillede af dens ejer, så lad mig sætte et par ord på min egen rejse, og hvordan Marketingly blev til:",
      "Jeg voksede op i en familie præget af stoffer, alkohol, kriminalitet og stort omsorgssvigt. I skolen var jeg ham, de andre ikke måtte lege med, og jeg fik at vide, at det ikke kunne betale sig at redde mig, fordi jeg alligevel ville være død af stoffer, inden jeg fyldte 15 år.",
      "Alligevel formåede jeg at vende mit liv om, mod alle odds. Fordi jeg vidste, at der ikke var nogen andre, der kom og reddede min familie.",
      "Jeg skabte min egen vej, hvor jeg kan bidrage til mine kunders succes, samtidig med at jeg kan være et forbillede for en generation af unge mennesker, som tror, at de skal bære hele verden på deres skuldre, mens deres egne drømme langsomt bliver sat på pause.",
      "Unge mennesker, som desværre ofte bliver glemt i systemet – fordi de ikke er de første til at række ud efter hjælp.",
      "Min unikke historie har givet mig en evig motivation for altid at tage ansvar, udvikle mig og være den hårdeste arbejder i rummet. Fordi jeg har lært hvad det vil sige, at skulle bevise sit værd, når ingen troede på en.",
      "Og det er de selv samme værdier Marketingly er bygget på og som afspejler sig i vores daglige arbejde.",
      "Vi optimerer ikke bare annoncer. Vi tager ansvar og agerer som din eksterne marketingafdeling.",
      "Vi bruger utallige timer hver eneste uge på at dygtiggøre os inde for vores fag - Ofte i vores fritid, fordi vi er passioneret for vores fag og vores konstante personlige udvikling.",
      "Du skal ikke vælge at samarbejde med os, hvis du vil have nogle der altid er enige med dig og som aldrig udfordrer dig på dine synspunkter. Vælg os hvis du vil have en partner der er villig til at gøre alt hvad der skal til for din virksomhed.",
      "Vi praktiserer hvad vi prædiker og alle vores anbefalinger baseret på cases der omsætter for op mod +2 mia/årligt. Vi arbejder i gns. med vores kunder i 2,8 år, på trods af vi har ingen binding har.",
      "Vi har ligeledes endnu ikke fået en dårlig anmeldelse, og det har vi ikke tænkt os at ændre på.",
    ],
  },

  /* --- 10. PRICING --------------------------------------------------------- */
  pricing: {
    heading: "Vælg løsningen, der passer til din virksomhed",
    cards: [
      {
        variant: "standard", title: "Done With You",
        sub: "Eksekver selv med strategisk hjælp fra Mathias",
        cta: { label: "Ansøg som kunde", href: "#email-form", variant: "primary" },
        bullets: ["I varetager selv den eksekverende del", "Fri sparring direkte med Mathias", "Månedlige udviklingsmøder"],
        price: "Fra 10.000 kr/md",
      },
      {
        variant: "recommended", title: "Done For You",
        sub: "Vi driver din marketing for dig, som aldrig før.",
        cta: { label: "Ansøg som kunde", href: "#email-form", variant: "secondary" },
        bullets: ["Vi håndterer din markedsføring for dig", "Rådgivning ift. content strategi", "Erfaring fra virk. med +2 mia i årlig oms."],
        price: "Fra 25.000 kr/md",
      },
    ],
  },

  /* --- 11. CONTACT / GROWTH EVALUATION ------------------------------------ */
  contact: {
    eyebrow: "KONTAKT OS",
    heading: "Få en gratis Growth Evaluation",
    body: "Få en ærlig vurdering af digitale strategi og generelle vækstpotentiale og hør mere om hvordan vi arbejder. Du kommer ikke til at spilde din tid. Trust us.",
    /* Multi-step form: ALWAYS one question at a time (never all fields at once). */
    fields: [
      { name: "navn", label: "Navn", type: "text", placeholder: "Dit navn", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "Din email", required: true },
      { name: "telefon", label: "Telefon", type: "tel", placeholder: "Dit telefon nummer", required: true },
      { name: "virksomhed", label: "Virksomhed", type: "text", placeholder: "Virksomhedsnavn", required: true },
      { name: "omsaetning", label: "Hvor meget omsætter i for?", type: "text", placeholder: "Ex. 2.000.000 kr/md", required: false },
      { name: "budget", label: "Hvad er jeres marketing budget?", type: "text", placeholder: "Ex. 150.000 kr/md", required: false },
      { name: "andet", label: "Er der andet du vil have vi skal tage højde for?", type: "textarea", placeholder: "Skriv her", required: false },
    ],
    submitLabel: "Send",
    successTitle: "Tak — vi vender tilbage inden for 24 timer.",
    /* Where the form posts. Blank => mockup mode: no network call, just success
       state. In production wire a Next.js Server Action → Resend here. */
    endpoint: "",
  },

  /* --- 12. FAQ ------------------------------------------------------------- */
  faq: {
    heading: "Ofte stillede spørgsmål",
    image: "faq/mathias-teaching.jpg",
    items: [
      {
        q: "Hvorfor ikke ansætte en på fuld tid?",
        a: [
          "At ansætte en fuldtidsmedarbejder kan medføre dyre omkostninger, mindre fleksibilitet, mindre erfaring på tværs af brancher og er mere kompliceret at opsige. Vi har en teknisk viden fra øverste hylde, der gør at du ikke skal bekymre dig om hvor effektivt dine annoncekroner bliver brugt.",
          "Vores abonnement tilbyder derudover en fleksibilitet, hvor du nemt og hurtigt kan opsige samarbejdet uden efterfølgende binding.",
        ],
      },
      {
        q: "Hvordan ved jeg om jeg tjener min investering hjem?",
        a: ["Vi plejer at sige “We put our money where our mouth is”, som betyder at vi tilbyder 100% ROAS garanti. Profiterer du ikke på markedsføring drevet af os, betaler du ikke. No BS."],
      },
      {
        q: "Hvem er bag knapperne?",
        a: ["De fleste opgaver løses faktisk af founderen selv, Mathias. Derudover samarbejder vi med nogle af landets dygtigste specialister inden Content og CRO, som alle har +7 års erfaring."],
      },
      {
        q: "Hvorfor vælge Marketingly?",
        a: [
          "I stedet for at forklare, hvorfor du skal vælge os, vil jeg hellere fokusere på det, som vores nuværende samarbejdspartnere har tilfælles:",
          { list: [
            "De har været hos et stort bureau, men følte sig nedprioriteret.",
            "De var trætte af overfladiske relationer og søgte en partner med ægte passion for deres projekt.",
            "De søgte en partner, der var modig nok til at udfordre dem med ærlige og konstruktive tilbagemeldinger.",
            "De drømte om en proaktiv samarbejdspartner, der tog initiativet og ledte vejen fremad.",
            "De ønskede ikke at blive bundet af kontrakter i flere år. De var trætte af bureauer, der var mere ivrige efter at starte tidsuret end at lytte.",
            "De søgte en samarbejdspartner, der værdsatte styrken i et vedvarende forhold og fælles succes frem for kortsigtede gevinster.",
          ] },
          "Ser du.. De fleste bureauer har talegaverne i orden, men når alt er sagt og gjort, ser vi gang på gang, at der er blevet manipuleret med tal eller lignende, alt sammen med det formål at tjene flere penge på dig.",
          "Vi er måske ikke et match for alle, men vi er i hvert fald et bureau med integritet, der ikke lyver for at se bedre ud på papiret.",
          "Vi ønsker at være det bureau, der føles som den in-house medarbejder, du kan stole på, når alt brænder på.",
          "Se vores 100% 5-stjernede anmeldelser på Trustpilot:",
          { link: "https://dk.trustpilot.com/review/marketingly.dk", label: "https://dk.trustpilot.com/review/marketingly.dk" },
          "Du er også altid velkommen til at tage en snak med vores eksisterende samarbejdspartnere.",
        ],
      },
    ],
  },

  /* --- 13. FOOTER ---------------------------------------------------------- */
  footer: {
    tagline: "Marketingpartneren, du stoler på",
    links: [
      { label: "Resultater jeg har skabt", href: "#cases" },
      { label: "Om Mathias", href: "#brev" },
      { label: "Ansøg som kunde", href: "#email-form" },
    ],
    copyright: "© 2026 Marketingly Digital ApS",
  },
};
