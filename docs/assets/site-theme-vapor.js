(function () {
  "use strict";

  var STORAGE_KEY = "vaporTheme";
  var SHELF_ID = "vapor-reading-shelf";

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
      key.indexOf("embed/fig-isolation") === 0 ||
      key.indexOf("embed/fig-ma15") === 0
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

  function isChromeNode(el) {
    if (!el || el.nodeType !== 1) return true;
    var id = el.id;
    if (id === "site-nav-bar" || id === "site-nav-overlay" || id === "site-nav-drawer" || id === SHELF_ID) {
      return true;
    }
    if (el.classList) {
      if (el.classList.contains("vapor-decor")) return true;
    }
    return false;
  }

  /** One opaque column for all page content (after nav inject). */
  function wrapReadingShelf() {
    if (!isEnabled() || !document.body) return;
    if (document.getElementById(SHELF_ID)) return;

    var body = document.body;
    var shelf = document.createElement("div");
    shelf.id = SHELF_ID;

    var toMove = [];
    for (var i = 0; i < body.children.length; i++) {
      var el = body.children[i];
      if (!isChromeNode(el)) toMove.push(el);
    }
    if (!toMove.length) return;

    var anchor = document.getElementById("site-nav-bar");
    if (anchor && anchor.nextSibling) {
      body.insertBefore(shelf, anchor.nextSibling);
    } else if (anchor) {
      body.appendChild(shelf);
    } else {
      body.insertBefore(shelf, body.firstChild);
    }

    toMove.forEach(function (el) {
      shelf.appendChild(el);
    });
  }

  window.__vaporWrapShelf = wrapReadingShelf;

  function injectDecor(family) {
    if (!isEnabled()) return;

    var scanL = document.createElement("div");
    scanL.className = "vapor-decor vapor-scanlines vapor-scanlines-left";
    scanL.setAttribute("aria-hidden", "true");
    document.body.appendChild(scanL);
    var scanR = document.createElement("div");
    scanR.className = "vapor-decor vapor-scanlines vapor-scanlines-right";
    scanR.setAttribute("aria-hidden", "true");
    document.body.appendChild(scanR);

    var sun = document.createElement("div");
    sun.className = "vapor-decor vapor-sun";
    sun.setAttribute("aria-hidden", "true");
    document.body.appendChild(sun);

    var key = pageKey();
    var sticker = PAGE_STICKERS[key];
    if (sticker) {
      var badge = document.createElement("div");
      badge.className = "vapor-decor vapor-sticker";
      badge.setAttribute("aria-hidden", "true");
      badge.textContent = sticker;
      badge.style.cssText =
        "position:fixed;bottom:1rem;right:1rem;z-index:3;font:bold 11px/1 system-ui,sans-serif;" +
        "letter-spacing:0.12em;padding:0.35rem 0.55rem;color:#01cdfe;" +
        "border:2px solid #ff71ce;background:rgba(26,16,51,0.75);transform:rotate(-4deg);";
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
