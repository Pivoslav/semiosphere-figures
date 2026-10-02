#!/usr/bin/env python3
"""Turn references to journal sections, figures, experiments and open threads
into popover links (a.sec) on the figure pages and their explainer sections.

    python scripts/link_section_refs.py            # rewrite in place
    python scripts/link_section_refs.py --check    # list what would change

The notes behind each popover live in docs/assets/fig-sections.js. A reference
whose key is not in that file is left as plain text, so add the entry first.

Prose only: headings, summaries, code, form controls and navigation lines
(breadcrumbs, card link rows, jump menus) are left alone, and so is anything
already inside a link. Running it twice changes nothing.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
REGISTRY = DOCS / "assets" / "fig-sections.js"

TARGETS = (
    sorted((ROOT / "explain").glob("*.html"))
    + [DOCS / "figures_animated_3d.html"]
    + [DOCS / "embed" / n for n in (
        "fig-roundtrip-helicoid-3d.html",
        "fig-halt-flow-3d.html",
        "fig-ma15-dyad-cube-3d.html",
        "fig-delegation-stack-3d.html",
        "fig-isolation-field-3d.html",
        "fig-transmission-cells-3d.html",
    )]
)
# Bare R1 to R4 and T1 to T3 are never linked: on these pages they also name
# round-trip conditions, gate rules and open threads. I1, I3, D1 and D3 only
# ever name figure panels.
# Explainers for pages that the gallery shows inside an iframe: links must break out.
TOP_TARGET = {"fig-lotman-semiosphere-3d.html", "fig-lotman-semiosphere-demo-3d.html",
              "fig-lotman-operator-tensor-3d.html", "fig-lotman-explosion-3d.html"}

SKIP_TAGS = {"a", "h1", "h2", "h3", "summary", "code", "option", "select", "script",
             "style", "title", "button", "label", "textarea"}
SKIP_CLASSES = {"embed-back", "site-trail", "links", "foot", "toc-mini", "math-line",
                "legend", "viz-controls", "hint"}
VOID = {"br", "img", "input", "meta", "link", "hr", "wbr", "source", "area", "col",
        "base", "param", "track", "embed"}

TOKEN = re.compile(r"<script\b.*?</script>|<style\b.*?</style>|<!--.*?-->|<[^>]+>|[^<]+",
                   re.S | re.I)
REF = re.compile(
    r"(?P<jour>(?:[Jj]ournal\s+)?(?:§\s?|[Ss]ection\s)(?P<jn>\d{1,2}))\b"
    r"|(?P<fig>(?:2D\s)?(?:[Ff]igures?|[Pp]anels?)\s(?P<fl>[RIDTL])(?P<fn>\d))\b"
    r"|\b(?P<idb>(?P<il>[ID])(?P<inn>[13]))\b"
    r"|(?P<tb>Transmission\sT(?P<tn>[13]))\b"
    r"|\b(?P<lb>L(?P<ln>[123]))\b(?!-)"
    r"|\b(?P<ma>MA(?P<man>4b|4c|7|10|11|12|13|14|15|16))\b"
    r"|\b(?P<thr>T(?P<tnn>5|10|11|13|22|27|28|29|30|31|32|33))\b"
)
HREF_KEYS = (
    (re.compile(r"LOTMAN_INTERPRETATION\.html#s(\d+)$"), "journal-s{}"),
    (re.compile(r"fig-roundtrip-asymmetry\.html#r(\d)$"), "fig-r{}"),
    (re.compile(r"fig-isolation-laundering\.html#i(\d)$"), "fig-i{}"),
    (re.compile(r"fig-delegation-corpus\.html#d(\d)$"), "fig-d{}"),
    (re.compile(r"fig-transmission-cells\.html#t(\d)$"), "fig-t{}"),
)


def load_keys() -> set[str]:
    return set(re.findall(r'^\s*"([a-z0-9-]+)":\s*\{\s*kind:', REGISTRY.read_text(encoding="utf-8"), re.M))


def key_for(m: re.Match) -> str:
    if m.group("jour"):
        return f"journal-s{m.group('jn')}"
    if m.group("fig"):
        return f"fig-{m.group('fl').lower()}{m.group('fn')}"
    if m.group("idb"):
        return f"fig-{m.group('il').lower()}{m.group('inn')}"
    if m.group("tb"):
        return f"fig-t{m.group('tn')}"
    if m.group("lb"):
        return f"fig-l{m.group('ln')}"
    if m.group("ma"):
        return f"ma{m.group('man')}"
    return f"t{m.group('tnn')}"


def link_text(text: str, keys: set[str], top: bool) -> str:
    def repl(m: re.Match) -> str:
        key = key_for(m)
        if key not in keys:
            return m.group(0)
        tgt = ' target="_top"' if top else ""
        return f'<a class="sec" data-sec="{key}"{tgt}>{m.group(0)}</a>'
    return REF.sub(repl, text)


def classes(tag: str) -> set[str]:
    m = re.search(r'\bclass="([^"]*)"', tag)
    return set(m.group(1).split()) if m else set()


def convert_anchor(tag: str, keys: set[str], top: bool) -> str:
    if classes(tag) & {"term", "q", "sec"}:
        return tag
    m = re.search(r'\bhref="([^"]+)"', tag)
    if not m:
        return tag
    for pat, fmt in HREF_KEYS:
        hm = pat.search(m.group(1))
        if hm and fmt.format(hm.group(1)) in keys:
            key = fmt.format(hm.group(1))
            extra = f' class="sec" data-sec="{key}"'
            if top and "target=" not in tag:
                extra += ' target="_top"'
            return tag[:2] + extra + tag[2:]
    return tag


def convert_by_text(tag: str, text: str, keys: set[str]) -> str:
    """A link whose own text names a section (say "MA10" pointing at its 3D page)
    keeps its destination and gains the popover."""
    if classes(tag) & {"term", "q", "sec"}:
        return tag
    m = REF.search(text or "")
    if not m or key_for(m) not in keys:
        return tag
    return tag[:2] + f' class="sec" data-sec="{key_for(m)}"' + tag[2:]


def process(html: str, keys: set[str], top: bool) -> str:
    out, stack = [], []  # stack of (tag name, skip flag)
    tokens = TOKEN.findall(html)
    for idx, tok in enumerate(tokens):
        if not tok.startswith("<"):
            skip = any(flag for _, flag in stack)
            out.append(tok if skip else link_text(tok, keys, top))
            continue
        low = tok[:12].lower()
        if low.startswith(("<script", "<style", "<!--", "<!doctype")):
            out.append(tok)
            continue
        if tok.startswith("</"):
            name = tok[2:].strip(" >").split()[0].lower()
            for i in range(len(stack) - 1, -1, -1):
                if stack[i][0] == name:
                    del stack[i:]
                    break
            out.append(tok)
            continue
        name = re.match(r"<\s*([a-zA-Z0-9]+)", tok)
        name = name.group(1).lower() if name else ""
        in_skip = any(flag for _, flag in stack)
        if name == "a" and not in_skip:
            tok = convert_anchor(tok, keys, top)
            nxt = tokens[idx + 1] if idx + 1 < len(tokens) else ""
            if not nxt.startswith("<"):
                tok = convert_by_text(tok, nxt, keys)
        out.append(tok)
        if name in VOID or tok.endswith("/>"):
            continue
        stack.append((name, name in SKIP_TAGS or bool(classes(tok) & SKIP_CLASSES)))
    return "".join(out)


def main() -> int:
    check = "--check" in sys.argv
    keys = load_keys()
    changed = 0
    for path in TARGETS:
        if not path.is_file():
            continue
        raw = path.read_text(encoding="utf-8")
        new = process(raw, keys, top=path.name in TOP_TARGET and path.parent.name == "explain")
        if new != raw:
            changed += 1
            n = new.count('class="sec"') - raw.count('class="sec"')
            print(f"{'would link' if check else 'linked'} {n:3d} in {path.relative_to(ROOT)}")
            if not check:
                path.write_text(new, encoding="utf-8")
    print(f"{changed} file(s) {'would change' if check else 'changed'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
