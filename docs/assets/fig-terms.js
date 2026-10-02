/* Popovers for two kinds of link.
   a.term  : glossary word. data-tip holds the short definition; href points at
             the full entry in the journal glossary.
   a.q     : source behind a claim. data-q is a key into window.FIG_QUOTES
             (assets/fig-quotes.js), which holds the exact quotation or the
             labelled paraphrase, the citation, and the journal's tier note.
   a.sec   : reference to a journal section, figure, experiment or open thread.
             data-sec is a key into window.FIG_SECTIONS (assets/fig-sections.js),
             which holds a plain-language note on what it is; optional data-why
             says why it is mentioned at that spot.
   Same behaviour as the inline script on embed/fig-transmission-cells.html:
   first click shows the popover, second click follows the link, Escape closes. */
(function () {
  "use strict";

  var CSS =
    "a.term{color:var(--accent,#2a4a6f);text-decoration:none;border-bottom:1px dotted var(--accent,#2a4a6f);cursor:help}" +
    "a.term:hover{background:rgba(42,74,111,.08)}" +
    "#term-popover{display:none;position:fixed;z-index:9999;max-width:22rem;padding:.65rem .85rem;background:#fff;" +
    "border:1px solid #d8d0c4;box-shadow:0 4px 18px rgba(0,0,0,.12);font-family:system-ui,sans-serif;font-size:.88rem;line-height:1.45;color:#1a1814}" +
    "#term-popover.visible{display:block}" +
    "#term-popover strong{display:block;margin-bottom:.35rem;color:var(--accent,#2a4a6f);font-size:.95rem}" +
    "#term-popover .more{display:inline-block;margin-top:.45rem;font-size:.85rem;color:var(--accent,#2a4a6f)}" +
    "a.q{color:inherit;text-decoration:none;border-bottom:1px dashed #8b6914;cursor:help}" +
    "a.q:hover{background:rgba(139,105,20,.1)}" +
    "#term-popover.quote{max-width:27rem}" +
    "#term-popover blockquote{margin:.2rem 0 .45rem;padding-left:.65rem;border-left:3px solid #c9a227;font-family:Georgia,serif;font-size:.92rem;color:#2b2722}" +
    "#term-popover .para{font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;color:#8b6914;margin-bottom:.15rem}" +
    "#term-popover .src{font-size:.8rem;color:#5c564c}" +
    "#term-popover .tier{font-size:.78rem;color:#7a5a12;margin-top:.3rem}" +
    "a.sec{color:inherit;text-decoration:none;border-bottom:1px solid rgba(42,74,111,.5);cursor:help}" +
    "a.sec:hover{background:rgba(42,74,111,.08)}" +
    "#term-popover .kind{font-size:.7rem;text-transform:uppercase;letter-spacing:.05em;color:#5c564c;margin-bottom:.15rem}" +
    "#term-popover .why{font-size:.82rem;color:#3b4a5c;margin-top:.4rem;padding-top:.35rem;border-top:1px dashed #d8d0c4}";

  function siteRoot() {
    var m = document.querySelector('meta[name="site-nav-root"]');
    return m ? m.getAttribute("content") || "" : "";
  }

  function init() {
    var QUOTES = window.FIG_QUOTES || {};
    var root = siteRoot();
    Array.prototype.forEach.call(document.querySelectorAll("a.q"), function (a) {
      var q = QUOTES[a.getAttribute("data-q")];
      if (!q) { if (window.console) console.warn("fig-terms: no source entry for", a.getAttribute("data-q")); return; }
      if (!a.getAttribute("href") && q.where) a.setAttribute("href", root + q.where);
      if (!a.getAttribute("href")) { a.setAttribute("tabindex", "0"); a.setAttribute("role", "button"); }
    });
    var SECTIONS = window.FIG_SECTIONS || {};
    Array.prototype.forEach.call(document.querySelectorAll("a.sec"), function (a) {
      var sec = SECTIONS[a.getAttribute("data-sec")];
      if (!sec) { if (window.console) console.warn("fig-terms: no section entry for", a.getAttribute("data-sec")); return; }
      if (!a.getAttribute("href") && sec.where) a.setAttribute("href", root + sec.where);
      if (!a.getAttribute("href")) { a.setAttribute("tabindex", "0"); a.setAttribute("role", "button"); }
    });
    var terms = document.querySelectorAll("a.term, a.q, a.sec");
    if (!terms.length) return;

    if (!document.getElementById("fig-terms-css")) {
      var st = document.createElement("style");
      st.id = "fig-terms-css";
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var pop = document.getElementById("term-popover");
    if (!pop) {
      pop = document.createElement("div");
      pop.id = "term-popover";
      pop.setAttribute("role", "dialog");
      pop.setAttribute("aria-hidden", "true");
      document.body.appendChild(pop);
    }
    var openTerm = null;

    function hide() {
      pop.classList.remove("visible");
      pop.setAttribute("aria-hidden", "true");
      openTerm = null;
    }

    function el(tag, cls, text) {
      var e = document.createElement(tag);
      if (cls) e.className = cls;
      if (text) e.textContent = text;
      return e;
    }

    function fillQuote(q) {
      pop.appendChild(el("strong", "", q.who + (q.kind === "paraphrase" ? ", in paraphrase" : "")));
      if (q.kind === "paraphrase") pop.appendChild(el("div", "para", "Paraphrase, not a quotation"));
      if (q.kind === "method") pop.appendChild(el("div", "", q.text));
      else pop.appendChild(el("blockquote", "", q.kind === "quote" ? "“" + q.text + "”" : q.text));
      pop.appendChild(el("div", "src", q.source));
      if (q.tier) pop.appendChild(el("div", "tier", "Journal source tier " + q.tier + (q.note ? ". " + q.note : ".")));
      else if (q.note) pop.appendChild(el("div", "tier", q.note));
    }

    function show(term, x, y) {
      var isQ = term.classList.contains("q");
      var isSec = term.classList.contains("sec");
      var q = isQ ? QUOTES[term.getAttribute("data-q")] : null;
      var sec = isSec ? SECTIONS[term.getAttribute("data-sec")] : null;
      if ((isQ && !q) || (isSec && !sec)) return;
      pop.textContent = "";
      pop.classList.toggle("quote", isQ || isSec);
      if (isQ) {
        fillQuote(q);
      } else if (isSec) {
        pop.appendChild(el("div", "kind", sec.kind));
        pop.appendChild(el("strong", "", sec.title));
        pop.appendChild(el("div", "", sec.what));
        var why = term.getAttribute("data-why");
        if (why) pop.appendChild(el("div", "why", "Why it comes up here: " + why));
        if (!sec.where) pop.appendChild(el("div", "why", "Internal working note or planned work; there is no public page for it yet."));
      } else {
        pop.appendChild(el("strong", "", term.textContent.replace(/\s+/g, " ").trim()));
        pop.appendChild(el("div", "", term.getAttribute("data-tip") || ""));
      }
      var href = term.getAttribute("href");
      if (href) {
        var more = el("a", "more", isQ ? "Where the journal uses this →" : (isSec ? "Go to it →" : "Full glossary entry →"));
        more.href = href;
        if (term.target) more.target = term.target;
        pop.appendChild(more);
      }
      pop.classList.add("visible");
      pop.setAttribute("aria-hidden", "false");
      pop.style.left = Math.max(8, Math.min(x, window.innerWidth - pop.offsetWidth - 8)) + "px";
      var below = y + 12, h = pop.offsetHeight;
      pop.style.top = (below + h > window.innerHeight - 8 ? Math.max(8, y - h - 30) : below) + "px";
      openTerm = term;
    }

    Array.prototype.forEach.call(terms, function (term) {
      term.addEventListener("click", function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        if (openTerm === term && pop.classList.contains("visible")) {
          hide();
          var go = term.getAttribute("href");
          if (go) {
            if (term.target === "_top" && window.top) window.top.location.assign(term.href);
            else window.location.assign(go);
          }
          return;
        }
        var r = term.getBoundingClientRect();
        show(term, r.left, r.bottom);
      });
    });

    document.addEventListener("click", function (e) {
      if (!pop.contains(e.target) && !e.target.closest("a.term, a.q, a.sec")) hide();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") hide();
      if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("a.q[role=button], a.sec[role=button]")) {
        e.preventDefault();
        e.target.click();
      }
    });
    window.addEventListener("scroll", hide, { passive: true });
  }

  /* Wait for the DOM and for every deferred registry script (fig-quotes.js,
     fig-sections.js), whatever order the page lists them in. */
  var started = false;
  function go() { if (started) return; started = true; init(); }
  if (document.readyState === "complete") go();
  else { document.addEventListener("DOMContentLoaded", go); window.addEventListener("load", go); }
})();
