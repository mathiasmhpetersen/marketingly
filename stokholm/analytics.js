/* ============================================================================
   analytics.js — all tracking behind ONE module so consent can be wired in
   later without touching the page. Conversion happens off-site, so the
   outbound CTA click is our conversion event.

   Meta Pixel + GA4 are loaded ONLY if their IDs are set in content.js.
   If unset, every function no-ops silently — safe for the client mockup.

   To add a cookie banner later: gate Analytics.init() behind consent.
   ========================================================================== */

window.Analytics = (function () {
  var C = window.CONTENT || {};
  var pixelId = C.metaPixelId || "";
  var gaId = C.ga4Id || "";
  var scrollFired = {}; // dedupe scroll-depth thresholds

  function loadMetaPixel() {
    if (!pixelId) return;
    // Standard Meta Pixel bootstrap
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", pixelId);
  }

  function loadGA4() {
    if (!gaId) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gaId);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", gaId);
  }

  function fbq() { if (pixelId && window.fbq) window.fbq.apply(null, arguments); }
  function gtagEvent(name, params) { if (gaId && window.gtag) window.gtag("event", name, params || {}); }

  return {
    init: function () {
      loadMetaPixel();
      loadGA4();
      this.pageView();
      this.initScrollDepth();
    },

    pageView: function () {
      fbq("track", "PageView");
      gtagEvent("page_view");
    },

    // Fired when "Om showet" hits 50% viewport
    viewContent: function () {
      fbq("track", "ViewContent", { content_name: "om_showet" });
      gtagEvent("view_content", { content_name: "om_showet" });
    },

    // Every ticket CTA click. section = hero|om_showet|anmeldelser|hovedcta|sticky_mobile
    billetCtaClick: function (section) {
      fbq("trackCustom", "BilletCTAClick", { section: section });
      gtagEvent("billet_cta_click", { section: section });
    },

    initScrollDepth: function () {
      var thresholds = [25, 50, 75, 100];
      var onScroll = function () {
        var doc = document.documentElement;
        var scrollable = doc.scrollHeight - doc.clientHeight;
        if (scrollable <= 0) return;
        var pct = (doc.scrollTop / scrollable) * 100;
        thresholds.forEach(function (t) {
          if (pct >= t && !scrollFired[t]) {
            scrollFired[t] = true;
            fbq("trackCustom", "ScrollDepth", { percent: t });
            gtagEvent("scroll_depth", { percent: t });
          }
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    },
  };
})();
