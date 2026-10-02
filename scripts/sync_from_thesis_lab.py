#!/usr/bin/env python3
"""Copy current dissertation visualizations from peter_htr_experiment into docs/ for GitHub Pages.

Run from repo root:
  python scripts/sync_from_thesis_lab.py

Run only against the thesis lab path configured in this script.
"""
# copy thesis → pages; I live in two folders and pay for both
from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
HTR = Path(
    r"C:\repos\rainmain\1-TSARFOLDER\Peter_I_Letters_Thesis\Peter I Letters\peter_htr_experiment"
)
REPORT = HTR / "report"
THEORY = HTR / "docs" / "theory"
LAB = Path(__file__).resolve().parents[2] / "lab"  # MLCS lab filter copies

CURRENT_REPORT = [
    "filter_model.html",
    "lotman_3d_evidence.html",
    "lotman_evidence_dashboard.html",
]

CURRENT_EMBED = [
    "fig-semiosphere-embedding-3d.html",
    "fig-honest-plain-heatmap.html",
    "fig-theme-vs-register.html",
    "fig-probe-controls.html",
    "fig-partial-map-montreal.html",
    "fig-filter-l1.html",
    "fig-filter-l2.html",
    "fig-lotman-semiosphere-3d.html",
    "fig-lotman-semiosphere-demo-3d.html",
    "fig-lotman-operator-tensor-3d.html",
    "fig-lotman-explosion-3d.html",
    "fig-multi-agent-typing.html",
    "fig-transmission-cells.html",
    "fig-halt-adjudication.html",
    "fig-delegation-corpus.html",
    "fig-roundtrip-asymmetry.html",
    "fig-isolation-laundering.html",
]

# Authored directly in docs/embed with no thesis-lab source. The prune step
# below must keep them, and the copy step must not look for them in the lab.
PAGES_ONLY_EMBED = [
    "fig-roundtrip-helicoid-3d.html",
    "fig-halt-flow-3d.html",
    "fig-ma15-dyad-cube-3d.html",
    "fig-delegation-stack-3d.html",
    "fig-isolation-field-3d.html",
    "fig-transmission-cells-3d.html",
]

THEORY_HTML = [
    "LLM_COGNITION_SEMIOSPHERE.html",
    "LLM_VS_SEMIOSPHERE_VIZ.html",
    "LOTMAN_INTERPRETATION.html",
    "SEMIOTIC_COORDINATE_PLAIN.html",
    "appendix_language_encoding.html",
    "READING_LIST.html",
    "COMPREHENSIVE_READING_LISTS.html",
]

LEGACY_REPORT = ["proposal_evidence_viz.html"]
LEGACY_EMBED_GLOB = "fig-*.html"


def copy_file(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)
    print(f"  {src.name} -> {dst.relative_to(ROOT)}")


def main() -> int:
    if not HTR.is_dir():
        print(f"Thesis lab not found: {HTR}")
        return 1

    (DOCS / "embed").mkdir(parents=True, exist_ok=True)
    (DOCS / "theory").mkdir(parents=True, exist_ok=True)
    legacy_report = DOCS / "legacy"
    legacy_embed = legacy_report / "embed"
    legacy_report.mkdir(parents=True, exist_ok=True)
    legacy_embed.mkdir(parents=True, exist_ok=True)

    print("Current program (report/):")
    for name in CURRENT_REPORT:
        src = REPORT / name
        if src.is_file():
            copy_file(src, DOCS / name)

    print("Current embed/")
    for name in CURRENT_EMBED:
        src = REPORT / "embed" / name
        if src.is_file():
            copy_file(src, DOCS / "embed" / name)

    print("Theory HTML:")
    for name in THEORY_HTML:
        src = THEORY / name
        if src.is_file():
            copy_file(src, DOCS / "theory" / name)

    if (LAB / "filter_model.html").is_file():
        copy_file(LAB / "filter_model.html", DOCS / "filter_model.html")
    if (LAB / "fig-filter-l1.html").is_file():
        copy_file(LAB / "fig-filter-l1.html", DOCS / "fig-filter-l1.html")

    print("Legacy proposal gallery -> docs/legacy/:")
    for name in LEGACY_REPORT:
        src = REPORT / name
        if src.is_file():
            copy_file(src, legacy_report / name)
    embed_dir = REPORT / "embed"
    if embed_dir.is_dir():
        for src in sorted(embed_dir.glob(LEGACY_EMBED_GLOB)):
            if src.name in CURRENT_EMBED or src.name in PAGES_ONLY_EMBED:
                continue
            copy_file(src, legacy_embed / src.name)

    for stale in (DOCS / "proposal_evidence_viz.html", DOCS / "fig-filter-l1.html"):
        if stale.is_file():
            stale.unlink()
            print(f"  removed stale {stale.relative_to(ROOT)}")
    embed_root = DOCS / "embed"
    if embed_root.is_dir():
        keep = set(CURRENT_EMBED) | set(PAGES_ONLY_EMBED)
        for path in embed_root.glob("*.html"):
            if path.name not in keep:
                path.unlink()
                print(f"  removed legacy embed {path.name}")

    legacy_prop = legacy_report / "proposal_evidence_viz.html"
    if legacy_prop.is_file():
        text = legacy_prop.read_text(encoding="utf-8")
        text = text.replace('href="index.html"', 'href="../index.html"')
        text = text.replace('dissertation_proposal.html', '../index.html')
        legacy_prop.write_text(text, encoding="utf-8")

    # sanitize last: lipstick on the public clone
    subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "sanitize_public_site.py")],
        check=True,
    )
    (DOCS / ".nojekyll").touch()
    print("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
