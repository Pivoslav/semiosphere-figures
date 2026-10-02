(function () {
  "use strict";

  var root = (document.querySelector('meta[name="site-nav-root"]') || {}).content;
  if (root === undefined || root === null) root = "";

  function href(path) {
    if (!path) return root + "index.html";
    if (/^https?:\/\//.test(path)) return path;
    if (path.charAt(0) === "#") return path;
    return root + path;
  }

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
    if (p === "" || p === "index.html") return "index.html";
    return p;
  }

  var NAV = [
    {
      label: "Start",
      children: [{ label: "Figures home", href: "index.html" }],
    },
    {
      label: "Research journal",
      href: "theory/LOTMAN_INTERPRETATION.html",
      children: [
        { label: "Journal (full document)", href: "theory/LOTMAN_INTERPRETATION.html" },
        { label: "§10 Multi-agent and bilingual filter", href: "theory/LOTMAN_INTERPRETATION.html#s10" },
        { label: "§11 Sources and tiers", href: "theory/LOTMAN_INTERPRETATION.html#s11" },
        { label: "§12 Typed hand-off (MA1)", href: "theory/LOTMAN_INTERPRETATION.html#s12" },
        { label: "§13 Transmission (MA4b, MA13)", href: "theory/LOTMAN_INTERPRETATION.html#s13" },
        { label: "§14 Round-trip (MA12)", href: "theory/LOTMAN_INTERPRETATION.html#s14" },
        { label: "§15 Isolation (MA10)", href: "theory/LOTMAN_INTERPRETATION.html#s15" },
      ],
    },
    {
      label: "Experiment figures",
      children: [
        { label: "Multi-agent hand-offs vs bilingual relay", href: "embed/fig-multi-agent-typing.html" },
        { label: "Round-trip asymmetry (MA12)", href: "embed/fig-roundtrip-asymmetry.html" },
        { label: "Where refusal is decided (MA4b)", href: "embed/fig-halt-adjudication.html" },
        { label: "Transmission cells (MA4b, MA13)", href: "embed/fig-transmission-cells.html" },
        { label: "Delegation corpus (MA13)", href: "embed/fig-delegation-corpus.html" },
        { label: "Isolation and laundering (MA10)", href: "embed/fig-isolation-laundering.html" },
      ],
    },
    {
      label: "Montreal pilot figures",
      children: [
        { label: "Semiosphere 3D embedding", href: "embed/fig-semiosphere-embedding-3d.html" },
        { label: "Partial map (Montreal)", href: "embed/fig-partial-map-montreal.html" },
        { label: "Theme vs register", href: "embed/fig-theme-vs-register.html" },
        { label: "Honest plain heatmap", href: "embed/fig-honest-plain-heatmap.html" },
        { label: "Filter L1", href: "embed/fig-filter-l1.html" },
        { label: "Filter L2", href: "embed/fig-filter-l2.html" },
        { label: "Probe controls", href: "embed/fig-probe-controls.html" },
        { label: "Lotman semiosphere 3D", href: "embed/fig-lotman-semiosphere-3d.html" },
        { label: "Operator tensor 3D", href: "embed/fig-lotman-operator-tensor-3d.html" },
        { label: "Explosion 3D", href: "embed/fig-lotman-explosion-3d.html" },
        { label: "Semiosphere demo 3D", href: "embed/fig-lotman-semiosphere-demo-3d.html" },
      ],
    },
    {
      label: "Theory and reading",
      children: [
        { label: "Semiotic coordinate plain", href: "theory/SEMIOTIC_COORDINATE_PLAIN.html" },
        { label: "Appendix: language encoding", href: "theory/appendix_language_encoding.html" },
        { label: "LLM cognition in semiosphere space", href: "theory/LLM_COGNITION_SEMIOSPHERE.html" },
        { label: "LLM vs semiosphere viz", href: "theory/LLM_VS_SEMIOSPHERE_VIZ.html" },
        { label: "Reading list (site citations)", href: "theory/READING_LIST.html" },
        { label: "Comprehensive reading lists", href: "theory/COMPREHENSIVE_READING_LISTS.html" },
      ],
    },
    {
      label: "Dashboards and models",
      children: [
        { label: "Filter model (L1/L2)", href: "filter_model.html" },
        { label: "Lotman 3D gallery", href: "lotman_3d_evidence.html" },
        { label: "Lotman evidence dashboard", href: "lotman_evidence_dashboard.html" },
      ],
    },
    {
      label: "Legacy figures",
      children: [
        { label: "Legacy proposal viz", href: "legacy/proposal_evidence_viz.html" },
        { label: "Legacy embed gallery (channel, network, …)", href: "legacy/embed/fig-channel.html" },
      ],
    },
  ];

  var RELATED = {
    "embed/fig-multi-agent-typing.html": [
      { t: "Journal §10", h: "theory/LOTMAN_INTERPRETATION.html#s10" },
      { t: "Journal §12 (MA1)", h: "theory/LOTMAN_INTERPRETATION.html#s12" },
      { t: "Round-trip MA12", h: "embed/fig-roundtrip-asymmetry.html" },
      { t: "Halt MA4b", h: "embed/fig-halt-adjudication.html" },
      { t: "Delegation MA13", h: "embed/fig-delegation-corpus.html" },
    ],
    "embed/fig-roundtrip-asymmetry.html": [
      { t: "Journal §14", h: "theory/LOTMAN_INTERPRETATION.html#s14" },
      { t: "Multi-agent §10", h: "embed/fig-multi-agent-typing.html" },
      { t: "Isolation MA10", h: "embed/fig-isolation-laundering.html" },
      { t: "Transmission §13", h: "embed/fig-transmission-cells.html" },
    ],
    "embed/fig-halt-adjudication.html": [
      { t: "Journal §12", h: "theory/LOTMAN_INTERPRETATION.html#s12" },
      { t: "Journal §13 (MA4c)", h: "theory/LOTMAN_INTERPRETATION.html#s13" },
      { t: "Transmission T3", h: "embed/fig-transmission-cells.html#t3" },
      { t: "Multi-agent typing", h: "embed/fig-multi-agent-typing.html" },
    ],
    "embed/fig-transmission-cells.html": [
      { t: "Journal §13", h: "theory/LOTMAN_INTERPRETATION.html#s13" },
      { t: "Halt MA4b/MA4c", h: "embed/fig-halt-adjudication.html" },
      { t: "Delegation MA13", h: "embed/fig-delegation-corpus.html" },
      { t: "Multi-agent §10", h: "embed/fig-multi-agent-typing.html" },
    ],
    "embed/fig-delegation-corpus.html": [
      { t: "Journal §13", h: "theory/LOTMAN_INTERPRETATION.html#s13" },
      { t: "Transmission T1", h: "embed/fig-transmission-cells.html#t1" },
      { t: "Isolation MA10", h: "embed/fig-isolation-laundering.html" },
      { t: "Multi-agent §10", h: "embed/fig-multi-agent-typing.html" },
    ],
    "embed/fig-isolation-laundering.html": [
      { t: "Journal §15", h: "theory/LOTMAN_INTERPRETATION.html#s15" },
      { t: "Journal §12", h: "theory/LOTMAN_INTERPRETATION.html#s12" },
      { t: "Round-trip MA12", h: "embed/fig-roundtrip-asymmetry.html" },
      { t: "Transmission §13", h: "embed/fig-transmission-cells.html" },
    ],
    "theory/LOTMAN_INTERPRETATION.html": [
      { t: "Multi-agent §10", h: "embed/fig-multi-agent-typing.html" },
      { t: "Transmission §13", h: "embed/fig-transmission-cells.html" },
      { t: "Round-trip §14", h: "embed/fig-roundtrip-asymmetry.html" },
      { t: "Halt / MA4c", h: "embed/fig-halt-adjudication.html" },
      { t: "Delegation MA13", h: "embed/fig-delegation-corpus.html" },
      { t: "Isolation §15", h: "embed/fig-isolation-laundering.html" },
      { t: "Figures home", h: "index.html" },
    ],
    "index.html": [
      { t: "Research journal", h: "theory/LOTMAN_INTERPRETATION.html" },
      { t: "Multi-agent hand-offs", h: "embed/fig-multi-agent-typing.html" },
      { t: "Montreal 3D embedding", h: "embed/fig-semiosphere-embedding-3d.html" },
      { t: "Partial map", h: "embed/fig-partial-map-montreal.html" },
    ],
    "embed/fig-partial-map-montreal.html": [
      { t: "Journal §1-3", h: "theory/LOTMAN_INTERPRETATION.html#s1" },
      { t: "Theme vs register", h: "embed/fig-theme-vs-register.html" },
      { t: "3D embedding", h: "embed/fig-semiosphere-embedding-3d.html" },
      { t: "Coordinate plain", h: "theory/SEMIOTIC_COORDINATE_PLAIN.html" },
    ],
    "embed/fig-theme-vs-register.html": [
      { t: "Partial map", h: "embed/fig-partial-map-montreal.html" },
      { t: "Journal §2", h: "theory/LOTMAN_INTERPRETATION.html#s2" },
      { t: "3D embedding", h: "embed/fig-semiosphere-embedding-3d.html" },
    ],
    "embed/fig-semiosphere-embedding-3d.html": [
      { t: "Partial map", h: "embed/fig-partial-map-montreal.html" },
      { t: "Filter model", h: "filter_model.html" },
      { t: "Appendix encoders", h: "theory/appendix_language_encoding.html" },
    ],
    "filter_model.html": [
      { t: "Filter L1 figure", h: "embed/fig-filter-l1.html" },
      { t: "Filter L2 figure", h: "embed/fig-filter-l2.html" },
      { t: "Journal §6", h: "theory/LOTMAN_INTERPRETATION.html#s6" },
    ],
    "theory/SEMIOTIC_COORDINATE_PLAIN.html": [
      { t: "Journal", h: "theory/LOTMAN_INTERPRETATION.html" },
      { t: "Partial map", h: "embed/fig-partial-map-montreal.html" },
      { t: "Reading list", h: "theory/READING_LIST.html" },
    ],
  };

  function isCurrent(linkHref) {
    var key = pageKey();
    var hash = window.location.hash || "";
    var pathOnly = linkHref.split("#")[0];
    var linkHash = linkHref.indexOf("#") >= 0 ? linkHref.slice(linkHref.indexOf("#")) : "";
    if (pathOnly === "" || pathOnly === "index.html") {
      return key === "index.html" && (!linkHash || linkHash === hash);
    }
    if (key !== pathOnly) return false;
    if (linkHash) return linkHash === hash;
    return !hash;
  }

  function buildDrawerNav() {
    var ul = document.createElement("ul");
    ul.className = "site-nav-group";
    NAV.forEach(function (group) {
      var gl = document.createElement("li");
      gl.className = "group-label";
      gl.textContent = group.label;
      ul.appendChild(gl);
      var items = group.children || [group];
      items.forEach(function (item) {
        var li = document.createElement("li");
        if (group.children && item.href && item.href.indexOf("#") >= 0) {
          li.className = "sub";
        }
        var a = document.createElement("a");
        a.href = href(item.href);
        a.textContent = item.label;
        if (isCurrent(item.href)) a.setAttribute("aria-current", "page");
        li.appendChild(a);
        ul.appendChild(li);
      });
    });
    return ul;
  }

  function injectChrome() {
    if (document.getElementById("site-nav-bar")) return;

    document.body.classList.add("has-site-nav");

    var bar = document.createElement("div");
    bar.id = "site-nav-bar";
    bar.innerHTML =
      '<button type="button" id="site-nav-burger" aria-label="Open site menu" aria-expanded="false" aria-controls="site-nav-drawer">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      "<path d=\"M4 7h16M4 12h16M4 17h16\"/>" +
      "</svg></button>" +
      '<a class="site-nav-title" href="' +
      href("index.html") +
      '">Semiosphere figures</a>' +
      '<span class="site-nav-here" id="site-nav-here"></span>';

    var overlay = document.createElement("div");
    overlay.id = "site-nav-overlay";
    overlay.hidden = true;

    var drawer = document.createElement("aside");
    drawer.id = "site-nav-drawer";
    drawer.setAttribute("aria-label", "Site pages");
    drawer.hidden = true;
    drawer.innerHTML =
      "<header><strong>All pages</strong><span>Research journal, experiment figures, Montreal pilot</span></header>";
    drawer.appendChild(buildDrawerNav());

    document.body.insertBefore(bar, document.body.firstChild);
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    var here = document.getElementById("site-nav-here");
    if (here) {
      var t = document.title || "";
      here.textContent = t.replace(/\s*[·|–-]\s*semiosphere.*/i, "").trim();
    }

    var open = false;
    function setOpen(on) {
      open = on;
      drawer.classList.toggle("open", on);
      overlay.classList.toggle("open", on);
      drawer.hidden = !on;
      overlay.hidden = !on;
      document.getElementById("site-nav-burger").setAttribute("aria-expanded", on ? "true" : "false");
      document.body.style.overflow = on ? "hidden" : "";
    }

    document.getElementById("site-nav-burger").addEventListener("click", function () {
      setOpen(!open);
    });
    overlay.addEventListener("click", function () {
      setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && open) setOpen(false);
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  function injectTrail() {
    var key = pageKey();
    var links = RELATED[key];
    if (!links || !links.length) return;
    if (document.querySelector("p.site-trail")) return;

    var p = document.createElement("p");
    p.className = "site-trail";
    p.innerHTML = "Related: ";
    links.forEach(function (item, i) {
      if (i) p.appendChild(document.createTextNode(" · "));
      var a = document.createElement("a");
      a.href = href(item.h);
      a.textContent = item.t;
      p.appendChild(a);
    });

    var back = document.querySelector(".embed-back");
    if (back && back.parentNode) {
      back.parentNode.insertBefore(p, back.nextSibling);
    } else {
      var main = document.querySelector("main") || document.querySelector(".wrap") || document.body;
      var h1 = main.querySelector && main.querySelector("h1");
      if (h1 && h1.parentNode) {
        h1.parentNode.insertBefore(p, h1.nextSibling);
      } else {
        main.insertBefore(p, main.firstChild);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      injectChrome();
      injectTrail();
    });
  } else {
    injectChrome();
    injectTrail();
  }
})();
