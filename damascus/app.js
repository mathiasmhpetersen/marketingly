/* ============================================================================
   app.js — renders content.js into the page and wires all behaviour.
   Static equivalent of the brief's motion/interaction spec (motion / Framer +
   Lenis translated to vanilla: IntersectionObserver reveals, CSS text-swap,
   requestAnimationFrame count-ups). See README.md.
   ========================================================================== */
(function () {
  "use strict";
  var C = window.CONTENT || {};
  var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  /* Root-absolute asset base. cleanUrls + trailingSlash:false serves this page at
     "/damascus" (no slash), so relative asset paths would resolve against "/".
     Prefix every local asset with /damascus/ so it loads regardless of trailing slash. */
  var BASE = "/damascus/";
  function asset(p) { return (!p || /^(https?:|\/|data:|mailto:|tel:)/.test(p)) ? p : BASE + p; }

  /* ---------- lucide icon paths (only the ones we use) ---------- */
  var ICON = {
    "circle-check": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    "banknote": '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
    "toggle-left": '<rect width="20" height="12" x="2" y="6" rx="6"/><circle cx="8" cy="12" r="2"/>',
    "message-circle-heart": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M15.8 9.2a2.1 2.1 0 0 0-2.8-.1l-.5.4-.5-.4a2.1 2.1 0 0 0-2.8 3.1l3.3 3.3 3.3-3.3a2.1 2.1 0 0 0-.2-3"/>',
    "mail": '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    "phone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    "map-pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    "arrow-left": '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    "play": '<polygon points="6 3 20 12 6 21 6 3"/>',
    "pause": '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    "check": '<path d="M20 6 9 17l-5-5"/>',
    "linkedin": '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    "instagram": '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>'
  };
  function icon(name, size) {
    var s = size || 22;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICON[name] || "") + "</svg>";
  }

  /* ---------- button with text-swap ---------- */
  function button(cfg) {
    var v = cfg.variant || "primary";
    var a = el("a", "btn btn-" + v);
    a.href = cfg.href || "#";
    a.innerHTML = '<span class="swap"><span>' + cfg.label + '</span><span aria-hidden="true">' + cfg.label + "</span></span>";
    if (/^#/.test(a.getAttribute("href"))) a.addEventListener("click", smoothTo);
    return a;
  }

  /* ---------- smooth anchor scroll (Lenis stand-in) ---------- */
  function smoothTo(e) {
    var id = this.getAttribute("href");
    if (!id || id.charAt(0) !== "#" || id === "#") return;
    var t = document.getElementById(id.slice(1));
    if (!t) return;
    e.preventDefault();
    var y = t.getBoundingClientRect().top + window.pageYOffset - 76;
    window.scrollTo({ top: y, behavior: RM ? "auto" : "smooth" });
    closeMenu();
  }

  /* ═══ NAV ═══ */
  function renderNav() {
    var links = $("#nav-links"), actions = $("#nav-actions"), menu = $("#mobile-menu");
    (C.nav.links || []).forEach(function (l) {
      var a = el("a", null, l.label); a.href = l.href; a.addEventListener("click", smoothTo); links.appendChild(a);
    });
    (C.nav.buttons || []).forEach(function (b) { actions.appendChild(button(b)); });
    // mobile menu = links + buttons
    (C.nav.links || []).forEach(function (l) {
      var a = el("a", null, l.label); a.href = l.href; a.addEventListener("click", smoothTo); menu.appendChild(a);
    });
    (C.nav.buttons || []).forEach(function (b) { menu.appendChild(button(b)); });

    var nav = $("#nav"), burger = $("#burger");
    var onScroll = function () { nav.classList.toggle("scrolled", window.pageYOffset > 40); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open"); menu.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
  }
  function closeMenu() {
    var nav = $("#nav"); if (!nav.classList.contains("open")) return;
    nav.classList.remove("open"); $("#mobile-menu").classList.remove("open");
    $("#burger").setAttribute("aria-expanded", "false"); document.body.style.overflow = "";
  }

  /* ═══ HERO ═══ */
  function renderHero() {
    var h = C.hero, h1 = $("#hero-h1");
    var words = h.h1.split(" ");
    words.forEach(function (w, i) {
      var span = el("span", "word", (i === 0 ? '<span class="fade-tail">' + w + "</span>" : w));
      span.style.transitionDelay = (0.06 * i) + "s";
      h1.appendChild(span); h1.appendChild(document.createTextNode(" "));
    });
    var sub = $("#hero-sub"), sw = h.sub.split(" ");
    sub.innerHTML = sw.map(function (w, i) { return i >= sw.length - 1 ? '<span class="fade-dim">' + w + "</span>" : w; }).join(" ");
    $("#hero-cta").appendChild(button(h.cta));

    // entrance: stagger words in, then cta
    if (!RM) {
      requestAnimationFrame(function () {
        $$(".hero h1 .word").forEach(function (w) { w.style.opacity = 1; w.style.transform = "none"; w.style.transition = "opacity .7s var(--ease-out-expo),transform .7s var(--ease-out-expo)"; });
        var cta = $("#hero-cta"); cta.style.transition = "opacity .6s var(--ease-out-expo) .5s,transform .6s var(--ease-out-expo) .5s"; cta.style.opacity = 1; cta.style.transform = "none";
      });
      // blob parallax
      var blob = $("#hero-blob");
      window.addEventListener("mousemove", function (e) {
        var x = (e.clientX / window.innerWidth - 0.5) * 30, y = (e.clientY / window.innerHeight - 0.5) * 30;
        blob.style.transform = "translate(" + x + "px," + y + "px)";
      }, { passive: true });
    } else {
      $$(".hero h1 .word").forEach(function (w) { w.style.opacity = 1; w.style.transform = "none"; });
      $("#hero-cta").style.opacity = 1;
    }
  }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ═══ TRUST PILLS ═══ */
  function renderTrust() {
    var g = $("#trust-grid");
    (C.trustPills || []).forEach(function (t, i) {
      var p = el("div", "pill reveal", icon("circle-check", 24) + "<span>" + t + "</span>");
      p.style.transitionDelay = (i * 0.08) + "s"; g.appendChild(p);
    });
  }

  /* ═══ VIDEO TESTIMONIALS ═══ */
  function renderVideoTestimonials() {
    var v = C.videoTestimonials; $("#vt-h").textContent = v.heading;
    var wrap = $("#vids");
    (v.videos || []).forEach(function (d, i) {
      var box = el("div", "vid reveal"); box.style.transitionDelay = (i * 0.1) + "s";
      var lines = d.lines.map(function (l) { return "<span>" + l + "</span>"; }).join("<br>");
      box.innerHTML =
        '<div class="vid-frame"><video playsinline preload="none"' + (d.poster ? ' poster="' + asset(d.poster) + '"' : "") + ' src="' + asset(d.src) + '"></video>' +
        '<button class="vid-play" aria-label="Afspil video">' + icon("play", 28) + "</button></div>" +
        '<div class="vid-meta"><h3>' + d.title + "</h3><p>" + lines + "</p></div>";
      wrap.appendChild(box);
    });
    // one-at-a-time playback with sound
    var frames = $$(".vid-frame", wrap);
    frames.forEach(function (frame) {
      var video = $("video", frame);
      frame.addEventListener("click", function () {
        if (video.paused) {
          frames.forEach(function (f) { if (f !== frame) { var o = $("video", f); o.pause(); f.classList.remove("playing"); } });
          video.muted = false; var p = video.play();
          if (p && p.catch) p.catch(function () { video.muted = true; video.play(); });
          frame.classList.add("playing");
        } else { video.pause(); frame.classList.remove("playing"); }
      });
      video.addEventListener("pause", function () { frame.classList.remove("playing"); });
      video.addEventListener("play", function () { frame.classList.add("playing"); });
    });
  }

  /* ═══ WHY US ═══ */
  function renderWhy() {
    var w = C.whyUs; $("#why-h").textContent = w.heading;
    var g = $("#why-grid");
    (w.cards || []).forEach(function (c, i) {
      var card = el("div", "card glow why-card reveal");
      card.style.transitionDelay = (i * 0.1) + "s";
      card.innerHTML = '<div class="why-icon">' + icon(c.icon, 32) + "</div><h3>" + c.title + "</h3><p>" + c.body + "</p>";
      attachGlow(card); g.appendChild(card);
    });
  }
  function attachGlow(card) {
    card.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  }

  /* ═══ CASES ═══ */
  function renderCases() {
    var cs = C.cases; $("#cases-h").textContent = cs.heading;
    var g = $("#cases-grid");
    (cs.items || []).forEach(function (c, i) {
      var card = el("div", "case reveal"); card.style.transitionDelay = ((i % 2) * 0.08) + "s";
      var tags = c.tags.map(function (t) { return '<span class="tag">' + t + "</span>"; }).join("");
      card.innerHTML =
        '<div class="case-img"><img src="' + asset(c.img) + '" alt="' + c.alt + '" loading="lazy"></div>' +
        '<div class="card case-body"><div class="case-tags">' + tags + "</div><h3>" + c.title + "</h3><p>" + c.body + "</p></div>";
      fallbackImg($("img", card), c.title);
      g.appendChild(card);
    });
  }

  /* ═══ CTA BAND ═══ */
  function renderCtaBand() {
    var b = C.ctaBand;
    $("#ctaband-h").innerHTML = b.heading.join("<br>");
    var a = $("#ctaband-actions"); (b.buttons || []).forEach(function (btn) { a.appendChild(button(btn)); });
  }

  /* ═══ CONTENT / HIPPO ═══ */
  function renderHippo() {
    var h = C.contentSection; $("#hippo-h").textContent = h.heading;
    var box = $("#hippo-paras");
    (h.paragraphs || []).forEach(function (t) {
      var html = t.replace(/__(.+?)__/g, '<a href="' + C.meta.hippoUrl + '" target="_blank" rel="noopener">$1</a>');
      box.appendChild(el("p", null, html));
    });
    var stats = $("#hippo-stats");
    (h.stats || []).forEach(function (s) {
      var t = el("div", "stat reveal");
      t.innerHTML = '<div class="num" data-val="' + s.value + '" data-dec="' + s.decimals + '" data-pre="' + (s.prefix || "") + '" data-suf="' + (s.suffix || "") + '">' + fmt(0, s.decimals) + (s.suffix ? '<span class="x">' + s.suffix + "</span>" : "") + '</div><div class="lbl">' + s.label + "</div>";
      stats.appendChild(t);
    });
    // count-up on view
    countUpObserver();
    // BTS video: autoplay muted loop when in view; toggle button
    var vid = $("#hippo-video"), toggle = $("#hippo-toggle");
    vid.poster = asset("video/hippo-bts-poster.jpg");
    vid.src = asset(h.video);
    var setIcon = function () { toggle.innerHTML = icon(vid.paused ? "play" : "pause", 20); };
    vid.addEventListener("error", function () {
      $("#hippo-video-wrap").innerHTML = placeholder("Hippo BTS");
    });
    toggle.addEventListener("click", function () { if (vid.paused) vid.play(); else vid.pause(); setIcon(); });
    vid.addEventListener("play", setIcon); vid.addEventListener("pause", setIcon);
    if (!RM && "IntersectionObserver" in window) {
      new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { var p = vid.play(); if (p && p.catch) p.catch(function(){}); } else vid.pause(); });
      }, { threshold: 0.4 }).observe(vid);
    }
    setIcon();
  }
  function fmt(n, dec) {
    return Number(n).toLocaleString("da-DK", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }
  function countUpObserver() {
    if (!("IntersectionObserver" in window)) { $$(".num").forEach(setFinal); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { animateNum($(".num", e.target) || e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    $$(".stat").forEach(function (s) { io.observe(s); });
  }
  function setFinal(n) { var v = +n.dataset.val, d = +n.dataset.dec; n.innerHTML = n.dataset.pre + fmt(v, d) + (n.dataset.suf ? '<span class="x">' + n.dataset.suf + "</span>" : ""); }
  function animateNum(n) {
    if (RM) return setFinal(n);
    var target = +n.dataset.val, dec = +n.dataset.dec, pre = n.dataset.pre, suf = n.dataset.suf, dur = 1200, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts; var p = Math.min((ts - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3); // ease-out
      n.innerHTML = pre + fmt(target * e, dec) + (suf ? '<span class="x">' + suf + "</span>" : "");
      if (p < 1) requestAnimationFrame(step); else setFinal(n);
    }
    requestAnimationFrame(step);
  }

  /* ═══ CHANNELS / MARQUEE ═══ */
  function renderChannels() {
    var c = C.channels; if (!c) return;
    $("#channels-eyebrow").textContent = c.eyebrow;
    $("#channels-h").textContent = c.heading;
    $("#channels-body").textContent = c.body;
    var track = $("#channels-track");
    var logos = c.logos || [];
    // duplicate the set so the loop is seamless (translateX -50%)
    logos.concat(logos).forEach(function (lg, i) {
      var img = el("img"); img.src = asset(lg.src); img.alt = lg.alt; img.loading = "lazy";
      if (i >= logos.length) img.setAttribute("aria-hidden", "true");
      fallbackImg(img, lg.alt);
      track.appendChild(img);
    });
    $("#channels-cta").appendChild(button(c.cta));
  }

  /* ═══ TESTIMONIAL CAROUSEL ═══ */
  function renderTestimonials() {
    var t = C.testimonials; $("#tc-h").textContent = t.heading;
    var slides = t.slides || [], cur = 0;
    var root = $("#tcarousel");
    root.innerHTML =
      '<button class="tarrow prev" aria-label="Forrige">' + icon("arrow-left", 24) + "</button>" +
      '<div class="tcard tcard-slide"></div>' +
      '<button class="tarrow next" aria-label="Næste">' + icon("arrow-right", 24) + "</button>";
    var card = $(".tcard", root);
    var dotsWrap = $("#tdots");
    slides.forEach(function (_, i) { var b = el("button"); b.setAttribute("aria-label", "Gå til " + (i + 1)); b.addEventListener("click", function () { go(i); }); dotsWrap.appendChild(b); });

    function paint() {
      var s = slides[cur];
      card.style.opacity = 0; card.style.transform = "translateX(12px)";
      setTimeout(function () {
        card.innerHTML =
          '<img class="avatar" src="' + asset(s.avatar) + '" alt="' + s.name + '" loading="lazy">' +
          '<div class="company">' + s.company + "</div>" +
          '<blockquote class="quote">“' + s.quote + '”</blockquote>' +
          '<div class="name">' + s.name + '</div><div class="role">' + s.role + "</div>";
        fallbackImg($(".avatar", card), s.name);
        card.style.opacity = 1; card.style.transform = "none";
      }, RM ? 0 : 180);
      $$("button", dotsWrap).forEach(function (d, i) { d.classList.toggle("active", i === cur); });
    }
    function go(i) { cur = (i + slides.length) % slides.length; paint(); }
    $(".prev", root).addEventListener("click", function () { go(cur - 1); });
    $(".next", root).addEventListener("click", function () { go(cur + 1); });
    // keyboard
    document.addEventListener("keydown", function (e) {
      if (!inView($("#testimonials"))) return;
      if (e.key === "ArrowLeft") go(cur - 1); else if (e.key === "ArrowRight") go(cur + 1);
    });
    // swipe
    var x0 = null;
    card.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    card.addEventListener("touchend", function (e) {
      if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1)); x0 = null;
    });
    paint();
  }
  function inView(elm) { if (!elm) return false; var r = elm.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }

  /* ═══ FOUNDER LETTER ═══ */
  function renderLetter() {
    var l = C.letter; $("#letter-h").textContent = l.heading;
    var body = $("#letter-body");
    body.appendChild(el("div", "letter-meta", '<span class="k">Fra:</span> ' + l.from + '<br><span class="k">Re:</span> ' + l.re));
    var n = l.body.length, per = Math.ceil(n / l.images.length);
    l.body.forEach(function (para, i) {
      var short = para.length < 60;
      var p = el("p", short ? "tight" : null, para);
      p.dataset.img = Math.min(l.images.length - 1, Math.floor(i / per));
      body.appendChild(p);
    });
    var fig = $("#letter-figure");
    l.images.forEach(function (im, i) {
      var img = el("img"); img.src = asset(im.src); img.alt = im.alt; img.loading = "lazy";
      if (i === 0) img.classList.add("active");
      fallbackImg(img, "Foto " + (i + 1));
      fig.appendChild(img);
    });
    // crossfade as paragraphs enter
    if ("IntersectionObserver" in window) {
      var imgs = $$("img", fig);
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) {
          if (e.isIntersecting) {
            var idx = +e.target.dataset.img;
            imgs.forEach(function (im, i) { im.classList.toggle("active", i === idx); });
          }
        });
      }, { rootMargin: "-45% 0px -45% 0px" });
      $$("p[data-img]", body).forEach(function (p) { io.observe(p); });
    }
  }

  /* ═══ PRICING ═══ */
  function renderPricing() {
    var pr = C.pricing; $("#price-h").textContent = pr.heading;
    var g = $("#price-grid");
    (pr.cards || []).forEach(function (c, i) {
      var card = el("div", "card price-card reveal" + (c.variant === "recommended" ? " rec" : ""));
      card.style.transitionDelay = (i * 0.15) + "s";
      var bullets = c.bullets.map(function (b) { return "<li>" + icon("circle-check", 20) + "<span>" + b + "</span></li>"; }).join("");
      card.innerHTML = "<h3>" + c.title + '</h3><p class="price-sub">' + c.sub + "</p>";
      card.appendChild(button(c.cta));
      card.insertAdjacentHTML("beforeend", '<div class="price-divider"></div><ul class="price-bullets">' + bullets + '</ul><div class="price-val">' + c.price + "</div>");
      g.appendChild(card);
    });
  }

  /* ═══ CONTACT + MULTI-STEP FORM ═══ */
  function renderContact() {
    var c = C.contact, m = C.meta;
    $("#contact-eyebrow").textContent = c.eyebrow;
    $("#contact-h").textContent = c.heading;
    $("#contact-body").textContent = c.body;
    var rows = $("#contact-rows");
    [["mail", m.email, "mailto:" + m.email], ["phone", m.phone, m.phoneHref], ["map-pin", m.address, null]].forEach(function (r) {
      var node = r[2] ? el("a", "contact-row") : el("div", "contact-row");
      if (r[2]) node.href = r[2];
      node.innerHTML = icon(r[0], 20) + "<span>" + r[1] + "</span>";
      rows.appendChild(node);
    });
    $("#contact-map").src = "https://www.google.com/maps?q=" + encodeURIComponent(m.mapsQuery) + "&output=embed";

    // ---- multi-step form (ALWAYS one question at a time) ----
    var fields = c.fields || [], step = 0, data = {};
    var wrap = $("#form-card");
    wrap.innerHTML =
      '<div class="form-progress"><i id="fp"></i></div>' +
      '<form id="ge-form" novalidate>' +
      '<div class="hp"><label>Lad dette felt være tomt<input type="text" name="company_url" tabindex="-1" autocomplete="off"></label></div>' +
      '<div id="steps"></div>' +
      '<div class="form-err" id="ferr"></div>' +
      '<div class="form-nav" id="fnav"></div>' +
      "</form>" +
      '<div class="form-success" id="fsuccess"><div class="check">' + icon("check", 34) + "</div><h3>" + c.successTitle + "</h3></div>";

    var stepsWrap = $("#steps", wrap);
    fields.forEach(function (f, i) {
      var s = el("div", "form-step" + (i === 0 ? " active" : ""));
      var input = f.type === "textarea"
        ? '<textarea id="f-' + f.name + '" name="' + f.name + '" placeholder="' + f.placeholder + '"></textarea>'
        : '<input id="f-' + f.name + '" type="' + f.type + '" name="' + f.name + '" placeholder="' + f.placeholder + '" autocomplete="' + autoc(f) + '">';
      s.innerHTML = '<div class="form-count">Trin ' + (i + 1) + " / " + fields.length + '</div><label for="f-' + f.name + '">' + f.label + (f.required ? "" : " <span style=\"color:#a9a6bd;font-weight:600\">(valgfrit)</span>") + "</label>" + input;
      stepsWrap.appendChild(s);
    });

    var nav = $("#fnav", wrap), err = $("#ferr", wrap), bar = $("#fp", wrap), form = $("#ge-form", wrap);
    function progress() { bar.style.width = ((step) / fields.length * 100) + "%"; }
    function showStep() {
      $$(".form-step", stepsWrap).forEach(function (s, i) { s.classList.toggle("active", i === step); });
      err.textContent = "";
      nav.innerHTML = "";
      if (step > 0) { var back = el("button", "form-back", "← Tilbage"); back.type = "button"; back.addEventListener("click", prev); nav.appendChild(back); }
      var next = el("button", "btn btn-primary", '<span class="swap"><span>' + (step === fields.length - 1 ? C.contact.submitLabel : "Videre") + '</span><span aria-hidden="true">' + (step === fields.length - 1 ? C.contact.submitLabel : "Videre") + "</span></span>");
      next.type = "button"; next.id = "fnext"; next.addEventListener("click", nextStep); nav.appendChild(next);
      progress();
      var inp = $("#f-" + fields[step].name, stepsWrap); if (inp && !RM) setTimeout(function () { inp.focus(); }, 60);
    }
    function validate() {
      var f = fields[step], inp = $("#f-" + f.name, stepsWrap), val = (inp.value || "").trim();
      if (f.required && !val) { err.textContent = "Udfyld venligst dette felt."; return false; }
      if (f.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { err.textContent = "Indtast en gyldig email."; return false; }
      if (f.type === "tel" && val && val.replace(/[^0-9]/g, "").length < 6) { err.textContent = "Indtast et gyldigt telefonnummer."; return false; }
      data[f.name] = val; err.textContent = ""; return true;
    }
    function nextStep() { if (!validate()) return; if (step < fields.length - 1) { step++; showStep(); } else submit(); }
    function prev() { if (step > 0) { step--; showStep(); } }
    // Enter advances (except textarea)
    form.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") { e.preventDefault(); nextStep(); }
    });
    function submit() {
      if (form.company_url && form.company_url.value) return; // honeypot
      var btn = $("#fnext", nav); if (btn) { btn.disabled = true; btn.innerHTML = '<span class="swap"><span>Sender…</span></span>'; }
      var done = function () {
        $("#ge-form", wrap).style.display = "none"; $(".form-progress", wrap).style.display = "none";
        $("#fsuccess", wrap).classList.add("show");
        (window.dataLayer = window.dataLayer || []).push({ event: "growth_evaluation_submitted", virksomhed: data.virksomhed || "" });
      };
      if (C.contact.endpoint) {
        fetch(C.contact.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw 0; done(); })
          .catch(function () { err.textContent = "Noget gik galt. Prøv igen eller skriv til " + C.meta.email + "."; if (btn) { btn.disabled = false; showStep(); } });
      } else { setTimeout(done, 500); } // mockup mode
    }
    showStep();
  }
  function autoc(f) { return ({ navn: "name", email: "email", telefon: "tel", virksomhed: "organization" })[f.name] || "off"; }

  /* ═══ FAQ ═══ */
  function renderFaq() {
    var f = C.faq;
    $("#faq-h").innerHTML = fadeLastWord(f.heading);
    var img = $("#faq-img"); img.src = asset(f.image); fallbackImg(img, "Mathias");
    var acc = $("#acc");
    (f.items || []).forEach(function (it, i) {
      var item = el("div", "acc-item" + (i === 0 ? " open" : ""));
      var body = it.a.map(blockToHtml).join("");
      item.innerHTML =
        '<button class="acc-q" aria-expanded="' + (i === 0) + '"><span>' + it.q + "</span><span class=\"chev\">" + icon("chevron-down", 22) + "</span></button>" +
        '<div class="acc-panel"><div class="acc-inner">' + body + "</div></div>";
      acc.appendChild(item);
    });
    // accordion behaviour
    $$(".acc-item", acc).forEach(function (item) {
      var q = $(".acc-q", item), panel = $(".acc-panel", item);
      if (item.classList.contains("open")) panel.style.height = "auto";
      q.addEventListener("click", function () {
        var open = item.classList.contains("open");
        // close others
        $$(".acc-item", acc).forEach(function (o) {
          if (o !== item && o.classList.contains("open")) {
            var op = $(".acc-panel", o); op.style.height = op.scrollHeight + "px"; requestAnimationFrame(function () { op.style.height = "0px"; });
            o.classList.remove("open"); $(".acc-q", o).setAttribute("aria-expanded", "false");
          }
        });
        if (open) {
          panel.style.height = panel.scrollHeight + "px"; requestAnimationFrame(function () { panel.style.height = "0px"; });
          item.classList.remove("open"); q.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("open"); q.setAttribute("aria-expanded", "true");
          panel.style.height = panel.scrollHeight + "px";
          panel.addEventListener("transitionend", function te() { panel.style.height = "auto"; panel.removeEventListener("transitionend", te); });
        }
      });
    });
  }
  function blockToHtml(b) {
    if (typeof b === "string") return "<p>" + b + "</p>";
    if (b.list) return "<ol>" + b.list.map(function (li) { return "<li>" + li + "</li>"; }).join("") + "</ol>";
    if (b.link) return '<p><a href="' + b.link + '" target="_blank" rel="noopener">' + b.label + "</a></p>";
    return "";
  }
  function fadeLastWord(str) {
    var w = str.split(" "); if (w.length < 2) return str;
    var last = w.pop(); return w.join(" ") + ' <span class="fade-dim">' + last + "</span>";
  }

  /* ═══ FOOTER ═══ */
  function renderFooter() {
    var f = C.footer, m = C.meta;
    var links = f.links.map(function (l) { return '<a href="' + l.href + '">' + l.label + "</a>"; }).join("");
    $("#footer-top").innerHTML =
      '<div><a class="nav-logo" href="#top"><span class="mark">M</span>Marketingly</a><p class="footer-tag">' + f.tagline + "</p>" +
        '<div class="footer-socials"><a href="' + m.linkedin + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + icon("linkedin", 18) + '</a><a href="' + m.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + icon("instagram", 18) + "</a></div></div>" +
      '<div class="footer-col"><h4>Kontakt</h4><a href="mailto:' + m.email + '">' + m.email + '</a><a href="' + m.phoneHref + '">' + m.phone + "</a><span>" + m.address + "</span></div>" +
      '<div class="footer-col"><h4>Genveje</h4>' + links + '<a href="' + m.trustpilot + '" target="_blank" rel="noopener">Trustpilot</a></div>';
    $("#footer-bottom").innerHTML = "<span>" + f.copyright + "</span><span>CVR: " + m.cvr + "</span>";
    $$("#footer-top a[href^='#']").forEach(function (a) { a.addEventListener("click", smoothTo); });
  }

  /* ═══ helpers: reveal + image fallback ═══ */
  function revealObserver() {
    var nodes = $$(".reveal");
    if (RM || !("IntersectionObserver" in window)) { nodes.forEach(function (n) { n.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "-10% 0px", threshold: 0.05 });
    nodes.forEach(function (n) { io.observe(n); });
  }
  function placeholder(label) {
    return '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#161618;color:#6E6E73;font-family:var(--sans);font-size:14px;text-align:center;padding:16px">' + label + "</div>";
  }
  function fallbackImg(img, label) {
    if (!img) return;
    img.addEventListener("error", function () {
      var box = img.parentElement;
      if (box) { box.style.position = "relative"; img.style.display = "none"; box.insertAdjacentHTML("beforeend", placeholder(label)); }
    });
  }

  /* ═══ boot ═══ */
  function init() {
    renderNav(); renderHero(); renderTrust(); renderVideoTestimonials(); renderWhy();
    renderCases(); renderCtaBand(); renderHippo(); renderChannels(); renderTestimonials(); renderLetter();
    renderPricing(); renderContact(); renderFaq(); renderFooter();
    revealObserver();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
