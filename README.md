# Semiosphere figures (GitHub Pages)

<!-- I mirror thesis HTML here so Pages stays pretty; source comments are where I'm honest -->

Static export of **current** dissertation visualizations (semiotic coordinate plain, relay geometry).

## Publish

GitHub Pages: branch **`master`**, folder **`/docs`**.

Site: https://pivoslav.github.io/semiosphere-figures/

Pages are **shareable by URL** but marked **noindex** and listed in `docs/robots.txt` with blocks for common AI crawlers. `scripts/sanitize_public_site.py` applies both on sync.

## Sync from thesis lab

From repo root (Windows path in script points at `peter_htr_experiment`):

```bash
python scripts/sync_from_thesis_lab.py
```

Rebuild figures in the lab first when needed, e.g.:

```bash
cd path/to/peter_htr_experiment
.venv/Scripts/python.exe scripts/build_status_visualizations.py
.venv/Scripts/python.exe scripts/build_cognition_semiosphere_viz.py
.venv/Scripts/python.exe scripts/build_lotman_3d_visualizations.py
.venv/Scripts/python.exe scripts/build_filter_model.py
```

Then run `sync_from_thesis_lab.py` and commit `docs/`.

## Layout

- **`docs/index.html`** - home (points at current program)
- **`docs/status_dashboard.html`** - hub for interactive figures
- **`docs/theory/`** - LLM cognition / semiosphere theory HTML
- **`docs/embed/`** - current embed figures (3D embedding, heatmaps, Lotman 3D, filters)
- **`docs/legacy/`** - superseded Peter I proposal operator/press gallery
