(function () {
  "use strict";

  var STORAGE_KEY = "vaporTheme";

  function pageKey() {
    var p = window.location.pathname || "";
    var marker = "/docs/";
    var i = p.indexOf(marker);
    if (i >= 0) p = p.slice(i + marker.length);
    else {
      var bases = ["/semiosphere-figures/", "/semiosphere-figures"];
      for (var b = 0; b < bases.length; b++) {
        if (p.indexOf(bases[b]) === 0) {
          p = p.slice(bases[b].length);
          break;
        }
      }
    }
    p = p.replace(/^\//, "");
    if (!p || p === "index.html") return "index.html";
    return p;
  }

  function vaporFamily(key) {
    if (key === "index.html") return "home";
    if (key.indexOf("legacy/") === 0) return "legacy";
    if (key.indexOf("theory/LOTMAN") === 0) return "journal";
    if (key.indexOf("theory/") === 0) return "theory";
    if (
      key.indexOf("embed/fig-multi-agent") === 0 ||
      key.indexOf("embed/fig-roundtrip") === 0 ||
      key.indexOf("embed/fig-halt") === 0 ||
      key.indexOf("embed/fig-transmission") === 0 ||
      key.indexOf("embed/fig-delegation") === 0 ||
      key.indexOf("embed/fig-isolation") === 0
    ) {
      return "experiment";
    }
    if (
      key.indexOf("embed/fig-semiosphere") === 0 ||
      key.indexOf("embed/fig-partial-map") === 0 ||
      key.indexOf("embed/fig-theme-vs") === 0 ||
      key.indexOf("embed/fig-honest") === 0 ||
      key.indexOf("embed/fig-filter") === 0 ||
      key.indexOf("embed/fig-lotman") === 0 ||
      key.indexOf("embed/fig-probe") === 0
    ) {
      return "montreal";
    }
    if (key.indexOf("lotman_") === 0 || key === "filter_model.html") return "montreal";
    return "theory";
  }

  var PAGE_STICKERS = {
    "embed/fig-roundtrip-asymmetry.html": "MA12",
    "embed/fig-halt-adjudication.html": "MA4b",
    "embed/fig-transmission-cells.html": "TX",
    "embed/fig-multi-agent-typing.html": "M1-3",
    "embed/fig-isolation-laundering.html": "MA10",
    "embed/fig-delegation-corpus.html": "MA13",
  };

  function isEnabled() {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "off") return false;
    } catch (e) {}
    return true;
  }

  function injectDecor(family) {
    if (!isEnabled()) return;

    var scan = document.createElement("div");
    scan.className = "vapor-scanlines";
    scan.setAttribute("aria-hidden", "true");
    document.body.appendChild(scan);

    if (family === "home") {
      var sun = document.createElement("div");
      sun.className = "vapor-decor vapor-sun";
      sun.setAttribute("aria-hidden", "true");
      document.body.appendChild(sun);
    }

    if (family === "journal") {
      var stripe = document.createElement("div");
      stripe.className = "vapor-decor vapor-textbook-stripe";
      stripe.setAttribute("aria-hidden", "true");
      document.body.appendChild(stripe);
    }

    var key = pageKey();
    var sticker = PAGE_STICKERS[key];
    if (sticker) {
      var badge = document.createElement("div");
      badge.className = "vapor-decor vapor-sticker";
      badge.setAttribute("aria-hidden", "true");
      badge.textContent = sticker;
      badge.style.cssText =
        "position:fixed;bottom:1rem;right:1rem;z-index:1;font:600 10px/1 system-ui,sans-serif;" +
        "letter-spacing:0.08em;padding:0.3rem 0.5rem;color:#5c564c;" +
        "border:1px solid #c8c0b0;background:rgba(255,253,250,0.92);transform:rotate(-2deg);";
      document.body.appendChild(badge);
    }
  }

  function applyTheme() {
    var html = document.documentElement;
    var body = document.body;
    if (!body) return;

    if (!isEnabled()) {
      html.classList.add("vapor-theme-off");
      return;
    }

    html.classList.add("has-vapor-theme");
    body.classList.add("has-vapor-theme");
    var family = vaporFamily(pageKey());
    body.setAttribute("data-vapor-family", family);
    injectDecor(family);
  }

  window.__vaporThemeToggle = function () {
    try {
      var off = window.localStorage.getItem(STORAGE_KEY) === "off";
      window.localStorage.setItem(STORAGE_KEY, off ? "on" : "off");
      window.location.reload();
    } catch (e) {}
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTheme);
  } else {
    applyTheme();
  }
})();
