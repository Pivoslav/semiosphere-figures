#!/usr/bin/env python3
"""Remove meta blurbs, footers, banners, and lab chrome from public docs/.

Substantive body text (including inline paths in argument) is kept.
Figure pages lose timestamp/report blurbs only; titles and charts stay.
"""
# I strip lab chrome so GitHub Pages looks like I have my life together.
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
HOME = "index.html"

ROBOTS_META = '<meta name="robots" content="noindex, nofollow"/>'

# Block common training / AI crawlers; allow fetch so search bots can read noindex in HTML.
ROBOTS_TXT = """\
# Semiosphere figures — shareable link, not a public index target.
# Page HTML includes: meta name=robots content=noindex, nofollow

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: cohere-ai
Disallow: /

User-agent: Amazonbot
Disallow: /

User-agent: FacebookBot
Disallow: /

User-agent: meta-externalagent
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: *
Allow: /
"""


def _home_href(path: Path) -> str:
    depth = len(path.relative_to(DOCS).parts) - 1
    return "../" * depth + HOME if depth else HOME


def _nav_root(path: Path) -> str:
    depth = len(path.relative_to(DOCS).parts) - 1
    return "../" * depth if depth else ""


def inject_site_nav(text: str, path: Path) -> str:
    """Shared burger menu, vapor theme, and drawer on every public HTML page."""
    root = _nav_root(path)
    m = re.search(r"<head[^>]*>", text, re.I)
    if not m:
        return text
    insert_at = m.end()
    parts: list[str] = []
    if "site-nav.css" not in text:
        parts.append(f'<meta name="site-nav-root" content="{root}"/>')
        parts.append(f'<link rel="stylesheet" href="{root}assets/site-nav.css"/>')
        parts.append(f'<script defer src="{root}assets/site-nav.js"></script>')
    if "site-theme-vapor.css" not in text:
        parts.append(f'<link rel="stylesheet" href="{root}assets/site-theme-vapor.css"/>')
        parts.append(f'<script defer src="{root}assets/site-theme-vapor.js"></script>')
    if not parts:
        return text
    block = "\n".join(parts) + "\n"
    return text[:insert_at] + "\n" + block + text[insert_at:]


def _fix_site_paths(text: str, path: Path) -> str:
    if "theory" in path.parts:
        text = text.replace("../../report/embed/", "../embed/")
        text = text.replace("report/embed/", "../embed/")
    text = re.sub(
        r'href="\.\./\.\./report/experiment_semiosphere_feature_space\.html"',
        f'href="{_home_href(path)}"',
        text,
    )
    return text


def inject_robots_meta(text: str) -> str:
    if re.search(r'<meta\s+[^>]*name=["\']robots["\']', text, re.I):
        return text
    m = re.search(r"<head[^>]*>", text, re.I)
    if not m:
        return text
    insert_at = m.end()
    return text[:insert_at] + "\n" + ROBOTS_META + text[insert_at:]


def sanitize_html(text: str, path: Path) -> str:
    # em-dash to hyphen: my HTML linter and I have an arrangement
    text = text.replace("\u2014", "-").replace("\u2013", "-")
    home = _home_href(path)
    text = _fix_site_paths(text, path)

    text = re.sub(
        r'href="(?:\.\./)*(?:report/)?status_dashboard\.html"',
        f'href="{home}"',
        text,
    )
    text = re.sub(
        r'<a class="back" href="[^"]*">← Status dashboard</a>\s*',
        "",
        text,
    )
    text = re.sub(r'<p class="back">.*?</p>\s*', "", text, flags=re.DOTALL)

    # All meta blurbs (header, figure captions, glossary intro, claim tags, etc.)
    text = re.sub(r'<p class="meta"[^>]*>.*?</p>\s*', "", text, flags=re.DOTALL)

    text = re.sub(r'<div class="banner">.*?</div>\s*', "", text, flags=re.DOTALL)
    text = re.sub(r"<footer[^>]*>.*?</footer>\s*", "", text, flags=re.DOTALL)
    text = re.sub(r"<cite>.*?</cite>\s*", "", text, flags=re.DOTALL)
    text = re.sub(
        r'<div class="callout"><strong>Ready for rewrite\?</strong>.*?</div>\s*',
        "",
        text,
        flags=re.DOTALL,
    )

    # Dashboard header taglines and .md / missing lab nav
    text = re.sub(
        r"(<header>\s*<h1>[^<]+</h1>\s*)"
        r'<p style="[^"]*">[^<]*</p>\s*'
        r'(?:<div class="nav">.*?</div>\s*)?',
        r"\1",
        text,
        count=1,
        flags=re.DOTALL,
    )

    # Opening header meta under doc titles
    text = re.sub(
        r'(<header class="doc-head">\s*<h1>[^<]+</h1>\s*)'
        r"(?:\s*<p class=\"meta\">.*?</p>)+",
        r"\1",
        text,
        flags=re.DOTALL,
    )
    text = re.sub(
        r"(<header class=\"doc\">\s*<h1>[^<]+</h1>\s*"
        r"(?:\s*<p class=\"sub\">.*?</p>\s*)?)",
        r"\1",
        text,
        flags=re.DOTALL,
    )

    if path.name == "SEMIOTIC_COORDINATE_PLAIN.html":
        text = re.sub(
            r'<h2 class="section" id="s12">.*?(?=<h2 class="section" id="s13">)',
            "",
            text,
            flags=re.DOTALL,
        )
        text = re.sub(
            r'<h2 class="section" id="s13">.*?(?=<!-- ========== ROADMAP ========== -->)',
            "",
            text,
            flags=re.DOTALL,
        )
        text = re.sub(
            r"\s*<li><a href=\"#s12\">12[^<]*</li>\s*",
            "",
            text,
        )
        text = re.sub(
            r"\s*<li><a href=\"#s13\">13[^<]*</li>\s*",
            "",
            text,
        )

    text = inject_robots_meta(text)
    text = inject_site_nav(text, path)
    return text


def main() -> int:
    drop = [
        DOCS / "status_dashboard.html",
        DOCS / "experiment_semiosphere_feature_space.html",
        DOCS / "relay_cards.html",
    ]
    for f in drop:
        if f.is_file():
            f.unlink()
            print(f"removed {f.relative_to(ROOT)}")

    robots_path = DOCS / "robots.txt"
    if robots_path.read_text(encoding="utf-8") if robots_path.is_file() else "" != ROBOTS_TXT:
        robots_path.write_text(ROBOTS_TXT, encoding="utf-8")
        print(f"wrote {robots_path.relative_to(ROOT)}")

    for html in DOCS.rglob("*.html"):
        raw = html.read_text(encoding="utf-8")
        clean = sanitize_html(raw, html)
        if clean != raw:
            html.write_text(clean, encoding="utf-8")
            print(f"sanitized {html.relative_to(ROOT)}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
