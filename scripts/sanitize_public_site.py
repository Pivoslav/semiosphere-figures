#!/usr/bin/env python3
"""Strip lab-only chrome from docs/ before publish."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"

HOME = "index.html"


def _home_href(path: Path) -> str:
    depth = len(path.relative_to(DOCS).parts) - 1
    return "../" * depth + HOME if depth else HOME


def sanitize_html(text: str, path: Path) -> str:
    text = text.replace("\u2014", "-").replace("\u2013", "-")
    home = _home_href(path)

    text = re.sub(
        r'href="(?:\.\./)*(?:report/)?status_dashboard\.html"',
        f'href="{home}"',
        text,
    )
    text = re.sub(
        r'href="\.\./\.\./report/[^"]+\.html"',
        f'href="{home}"',
        text,
    )
    text = re.sub(
        r'<a class="back" href="[^"]*">← Status dashboard</a>\s*',
        "",
        text,
    )
    text = re.sub(
        r'(<header class="doc-head">\s*<h1>[^<]+</h1>\s*)'
        r"(?:\s*<p class=\"meta\">.*?</p>)+",
        r"\1",
        text,
        flags=re.DOTALL,
    )
    text = re.sub(
        r"(<header class=\"doc\">\s*<h1>[^<]+</h1>\s*"
        r"(?:\s*<p class=\"sub\">.*?</p>\s*)?)"
        r"\s*<p class=\"meta\">.*?</p>",
        r"\1",
        text,
        flags=re.DOTALL,
    )
    text = re.sub(r'<div class="banner">.*?</div>\s*', "", text, flags=re.DOTALL)
    text = re.sub(r'<p class="meta">Generated[^<]*</p>\s*', "", text)
    text = re.sub(r'<p class="meta">Full report:[^<]*</p>\s*', "", text)
    text = re.sub(
        r'<p class="meta">Source: <code>[^<]*</code>[^<]*</p>\s*',
        "",
        text,
    )
    text = re.sub(
        r'<p class="meta">Flat 2D view:[^<]*</p>\s*',
        "",
        text,
    )
    text = re.sub(
        r'<p class="meta">(?:PCA|Frozen|L2 operator|T<sub>)[^<]*</p>\s*',
        "",
        text,
    )
    text = re.sub(
        r'<p class="meta">Universal template:[^<]*</p>\s*',
        "",
        text,
    )
    text = re.sub(
        r'<p class="meta">Interpretation: <code>[^<]*</code>[^<]*</p>\s*',
        "",
        text,
    )
    text = re.sub(r'<p class="meta">File: <code>docs/theory/[^<]*</p>\s*', "", text)
    text = re.sub(
        r"See <code>docs/theory/[^<]+</code>[^.<]*\.\s*",
        "",
        text,
    )
    text = re.sub(r"<footer[^>]*>.*?</footer>\s*", "", text, flags=re.DOTALL)
    text = re.sub(r"<cite>.*?</cite>\s*", "", text, flags=re.DOTALL)
    text = re.sub(
        r'<div class="callout"><strong>Ready for rewrite\?</strong>.*?</div>\s*',
        "",
        text,
        flags=re.DOTALL,
    )
    text = re.sub(
        r"<tr><td>Script</td><td><code>scripts/[^<]+</code></td></tr>\s*",
        "",
        text,
    )
    text = re.sub(
        r"<li><strong>Use in prose:</strong>[^<]*(?:SSHRC|dissertation lede)[^<]*</li>\s*",
        "",
        text,
    )
    text = re.sub(
        r"<tr><td>Report</td><td><a href=\"[^\"]+\">experiment_semiosphere[^<]*</a></td></tr>\s*",
        "",
        text,
    )

    if path.name == "SEMIOTIC_COORDINATE_PLAIN.html":
        text = re.sub(
            r"\s*<li><a href=\"#s10\">10[^<]*</li>\s*",
            "",
            text,
        )
        text = re.sub(
            r"\s*<li><a href=\"#roadmap\">Exploration roadmap</a>.*?</li>\s*",
            "",
            text,
            flags=re.DOTALL,
        )
        text = re.sub(
            r'<h2 class="section" id="s10">.*?(?=<!-- ========== ROADMAP ========== -->)',
            "",
            text,
            flags=re.DOTALL,
        )
        text = re.sub(
            r"<!-- ========== ROADMAP ========== -->.*?(?=<section class=\"glossary\" id=\"glossary\">)",
            "",
            text,
            flags=re.DOTALL,
        )
        text = re.sub(
            r"<li>Do not promote probe numbers into SSHRC prose or comprehensive exam lists\.</li>\s*",
            "",
            text,
        )
        text = re.sub(
            r" \(<code>scripts/run_semiosphere_feature_space\.py</code>\)\.",
            ".",
            text,
        )
        text = re.sub(
            r" See <a href=\"[^\"]+\.md\">EXPERIMENT_LOG_semiosphere_feature_space\.md</a>\.",
            ".",
            text,
        )
        text = re.sub(
            r'<p class="meta">Run 2026-09-17: <code>phase0_report\.json</code>[^<]*</p>\s*',
            "",
            text,
        )
        text = re.sub(
            r"<p><strong>Exit criterion:</strong>[^<]*<code>docs/EXPERIMENT_GAPS\.md</code>[^<]*</p>\s*",
            "",
            text,
        )

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

    for html in DOCS.rglob("*.html"):
        raw = html.read_text(encoding="utf-8")
        clean = sanitize_html(raw, html)
        if clean != raw:
            html.write_text(clean, encoding="utf-8")
            print(f"sanitized {html.relative_to(ROOT)}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
