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

  /* ---------- FOOTER ---------- */
  function renderFooter() {
    var f = C.footer;
    setText("foot-trust", f.trustLine);
    var fb = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>';
    var ig = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.33-.28.81-.32 1.71C3.21 8.5 3.2 8.85 3.2 12s.01 3.5.07 4.74c.04.9.19 1.38.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.33.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.33.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.38-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.33-.13-.81-.28-1.71-.32C15.5 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zm5.14-.94a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z"/></svg>';
    var el = $("socials");
    if (el) el.innerHTML =
      '<a href="' + f.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + fb + "</a>" +
      '<a href="' + f.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + ig + "</a>";
  }

  /* ---------- VIDEO PLAYERS (hero + om showet) ----------
     No autoplay. The poster shows with a play button; the user clicks to play,
     and it starts WITH SOUND. Only one video plays at a time. Wrapped in
     try/catch so a video quirk can never break the rest of the page. */
  function setupVideos() {
    try {
      var wraps = Array.prototype.slice.call(document.querySelectorAll(".video-wrap"));
      wraps.forEach(function (wrap) {
        var video = wrap.querySelector("video");
        if (!video) return;

        var btn = wrap.querySelector("[data-mute]");
        var syncMute = function () {
          if (video.muted) { wrap.classList.remove("sound"); if (btn) btn.setAttribute("aria-label", "Slå lyd til"); }
          else { wrap.classList.add("sound"); if (btn) btn.setAttribute("aria-label", "Slå lyd fra"); }
        };

        var startWithSound = function () {
          // Stop every other player so only one has sound at a time.
          wraps.forEach(function (w) {
            if (w !== wrap) { var v = w.querySelector("video"); if (v) v.pause(); }
          });
          video.muted = false;
          syncMute();
          var p = video.play();
          if (p && p.catch) p.catch(function () {
            // Sound-on blocked → fall back to muted playback so it still plays.
            video.muted = true; syncMute();
            var p2 = video.play(); if (p2 && p2.catch) p2.catch(function () {});
          });
        };

        video.addEventListener("play", function () { wrap.classList.add("playing"); });
        video.addEventListener("pause", function () { wrap.classList.remove("playing"); });

        // Click the poster / play button → play with sound. Click again → pause.
        wrap.addEventListener("click", function (e) {
          if (e.target.closest && e.target.closest("[data-mute]")) return;
          if (video.paused) startWithSound();
          else video.pause();
        });

        syncMute();
        if (btn) btn.addEventListener("click", function (ev) {
          ev.stopPropagation();
          video.muted = !video.muted;
          syncMute();
        });
      });
    } catch (e) { /* never let video wiring break the page */ }
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
