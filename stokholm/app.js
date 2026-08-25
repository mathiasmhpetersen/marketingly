/* ============================================================================
   app.js — renders content.js into the page and wires all behaviour.
   Primary hero/about copy is also present statically in index.html (for LCP +
   SEO); this script fills the data-driven bits and keeps everything in sync
   with content.js.
   ========================================================================== */
(function () {
  var C = window.CONTENT || {};
  var A = window.Analytics || { init: function () {}, viewContent: function () {}, billetCtaClick: function () {} };
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };
  var setText = function (id, txt) { var el = $(id); if (el) el.textContent = txt; };

  /* ---------- CTAs: one destination, tracked per section ---------- */
  function wireCtas() {
    var url = C.ticketUrl || "#";
    document.querySelectorAll("a[data-cta]").forEach(function (a) {
      a.href = url;
      var section = a.getAttribute("data-cta");
      var lbl = a.querySelector(".lbl");
      if (lbl) {
        if (section === "hero") lbl.textContent = C.hero.ctaLabel;
        else if (section === "om_showet") lbl.textContent = C.about.ctaLabel;
        else if (section === "hovedcta") lbl.textContent = C.conversion.ctaLabel;
        else if (section === "sticky_mobile") lbl.textContent = C.sticky.ctaLabel;
      }
      a.addEventListener("click", function () { A.billetCtaClick(section); });
    });
  }

  /* ---------- HERO ---------- */
  function renderHero() {
    var h = C.hero;
    var idx = Math.min(Math.max(h.activeHeadline | 0, 0), h.headlines.length - 1);
    setText("hero-headline", h.headlines[idx]);
    setText("hero-sub", h.subheadline);
    setText("hero-trust", h.trustLine);
  }

  /* ---------- OM SHOWET ---------- */
  function renderAbout() {
    var a = C.about;
    setText("about-heading", a.heading);
    setText("about-lead", a.lead);
    setText("about-pull", "„" + a.pullQuote + "”");
    setText("about-pull-author", "— " + a.pullQuoteAuthor);
    setText("about-cred", a.credibility);
    var strip = $("proof-strip");
    if (strip) a.proof.forEach(function (p) {
      var span = document.createElement("span");
      span.className = "proof-item";
      span.textContent = p;
      strip.appendChild(span);
    });
  }

  /* ---------- HOVED-CTA ---------- */
  function renderConversion() {
    var c = C.conversion;
    setText("convert-heading", c.heading);
    setText("convert-sub", c.sub);
    setText("cloud-note", c.cloudNote);
    var cloud = $("city-cloud");
    if (cloud) c.cities.forEach(function (city) {
      var chip = document.createElement("span");
      chip.className = "city-chip";
      chip.textContent = city;
      cloud.appendChild(chip);
    });
  }

  /* ---------- ANMELDELSER (native review cards) ----------
     Rebuilt from Facebook screenshot crops into on-brand components. */
  function initials(name) {
    var parts = String(name || "").trim().split(/\s+/);
    var first = parts[0] ? parts[0][0] : "";
    var last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }
  function renderReviews() {
    var r = C.reviews;
    if (!r) return;
    setText("reviews-heading", r.heading);
    var attr = $("reviews-attr");
    if (attr) { var s = attr.querySelector("span"); if (s) s.textContent = r.attribution; }
    var grid = $("reviews");
    if (!grid || !r.items) return;
    r.items.forEach(function (it) {
      var card = document.createElement("figure");
      card.className = "review-card";

      var head = document.createElement("div");
      head.className = "review-head";
      var av = document.createElement("span");
      av.className = "review-avatar";
      av.setAttribute("aria-hidden", "true");
      av.textContent = initials(it.name);
      var who = document.createElement("div");
      who.className = "review-name";
      who.textContent = it.name;
      head.appendChild(av); head.appendChild(who);

      var body = document.createElement("blockquote");
      body.className = "review-body";
      body.textContent = it.text;

      card.appendChild(head); card.appendChild(body);
      grid.appendChild(card);
    });
  }

  /* ---------- FOOTER (stripped: logo + trust + one credit line) ---------- */
  function renderFooter() {
    var f = C.footer || {};
    setText("foot-trust", f.trustLine);
    setText("foot-credit", f.credit);
  }

  /* ---------- VERTICAL VIDEO PLAYERS (hero + om showet) ----------
     autoplay muted loop; branded placeholder until the real file loads;
     per-player unmute toggle (unmuting one mutes the others). */
  function setupVideos() {
    var players = Array.prototype.slice.call(document.querySelectorAll("[data-video]"));
    players.forEach(function (wrap) {
      var video = wrap.querySelector("video");
      if (!video) return;

      var reveal = function () { wrap.classList.add("has-video"); wrap.dataset.loaded = "1"; };
      video.addEventListener("loadeddata", reveal);
      if (video.readyState >= 2) reveal();

      if (!prefersReducedMotion) {
        video.muted = true;
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
      }

      var btn = wrap.querySelector("[data-mute]");
      if (!btn) return;
      var sync = function () {
        if (video.muted) { wrap.classList.remove("sound"); btn.setAttribute("aria-label", "Slå lyd til"); }
        else { wrap.classList.add("sound"); btn.setAttribute("aria-label", "Slå lyd fra"); }
      };
      sync();
      btn.addEventListener("click", function () {
        if (video.muted) {
          // mute every other player so only one has sound
          players.forEach(function (w) {
            if (w !== wrap) { var v = w.querySelector("video"); if (v) v.muted = true; w.classList.remove("sound"); }
          });
        }
        video.muted = !video.muted;
        if (!video.muted && video.paused) { var pp = video.play(); if (pp && pp.catch) pp.catch(function () {}); }
        sync();
      });
    });
  }

  /* ---------- STICKY MOBILE BAR: show after hero ---------- */
  function setupStickyBar() {
    var bar = $("sticky-bar");
    var hero = $("top");
    if (!bar || !hero) return;
    var updatePad = function () {
      document.documentElement.style.setProperty("--sticky-h", bar.classList.contains("show") ? bar.offsetHeight + "px" : "0px");
    };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        bar.classList.toggle("show", !entries[0].isIntersecting);
        updatePad();
      }, { threshold: 0, rootMargin: "-40% 0px 0px 0px" });
      io.observe(hero);
    } else {
      bar.classList.add("show"); updatePad();
    }
  }

  /* ---------- ViewContent when Om showet hits 50% ---------- */
  function setupViewContent() {
    var el = $("om-showet");
    if (!el || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { A.viewContent(); io.disconnect(); }
      });
    }, { threshold: 0.5 });
    io.observe(el);
  }

  /* ---------- boot ---------- */
  function init() {
    renderHero();
    renderAbout();
    renderConversion();
    renderReviews();
    renderFooter();
    wireCtas();
    setupVideos();
    setupStickyBar();
    A.init();
    setupViewContent();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
