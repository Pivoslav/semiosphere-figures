# Notes · map for whoever picks this up

Internal working notes for `semiosphere-figures`. Nothing in this folder is published to Pages. The public pages live in `docs/`; the thesis-side source of truth is `C:\repos\rainmain\1-TSARFOLDER\Peter_I_Letters_Thesis\Peter I Letters\peter_htr_experiment`.

## Start here, in order

1. `OPEN_THREADS.md` · what is unexplored, with stable thread ids and the cheapest next action for each. Also lists what is closed, so nothing gets redone.
2. `docs/theory/LOTMAN_INTERPRETATION.html` · the research journal. Sections one to eleven are the 2026-09-26 battery; section twelve is the MA1 and MA4 run.
3. `MULTI_AGENT_LOTMAN_2026-10-01.md` · scratchpad behind journal section ten, plus the figure inventory for M1 to M3.
4. `EXPERIMENT_DESIGNS_WHAT_WE_ARE_2026-10-01.md` · MA1 to MA6 and datasets D1 to D8. MA1 and MA4 are run; the rest are specified.
5. `DESIGNS_II_COMMUNICATION_2026-10-01.md` · MA7 to MA11. Whether human to model exchange is autocommunication through a medium, and the four signatures measured identically across five dyads.

## Conventions an agent should not break

- Experiment ids: `E1` to `E11` belong to the thesis Lotman workbook, `MA*` to the multi-agent series here. `E5` is already ambiguous across two documents; do not add to the confusion.
- Preregister before running. `docs/experiments/MA1_typed_handoff/PREREG.md` in the thesis repo is the template, including the requirement to state design deviations before the run.
- A model in the chain may not score the chain. Threads marked `blocked_human` in `OPEN_THREADS.md` stay blocked.
- No cross-agent cosine, BLEU, or similarity score as evidence about a boundary.
- An unpaired claim stays open. Do not close it with a synthetic clip.
- Report n in the same sentence as any effect.
- Probe math and the unpublished 2026 manuscript stay off the comps lists.
- Schematic figures stay labeled schematic.

## Where things are written

| Output | Location |
|---|---|
| Public figures and theory | `docs/` in this repo, mirrored from the thesis repo for most files |
| Experiment preregs and run findings | thesis `docs/experiments/<ID>/` |
| Report JSON | thesis `data/bc_corpus/benchmarks/` |
| Probe lab log | thesis `docs/EXPERIMENT_LOG_semiosphere_feature_space.md` |
| Claim tiers, what may be cited | thesis `docs/EXPERIMENT_GAPS.md` |
| Phases and older open questions | thesis `docs/theory/EXPLORATION_ROADMAP.md` |
| These notes, mirrored | thesis `docs/theory/notes/` |

## Publishing

`scripts/sync_from_thesis_lab.py` copies current figures and theory HTML from the thesis repo into `docs/`, then runs `scripts/sanitize_public_site.py`, which strips lab-only links, converts em dashes to hyphens, injects the noindex meta tag, injects the shared burger menu (`docs/assets/site-nav.css` / `site-nav.js`), and writes `docs/robots.txt`. A file authored directly in `docs/embed/` must be added to `CURRENT_EMBED` in the sync script or the prune step will delete it. New public pages: add to `site-nav.js` NAV (and RELATED if part of the experiment trail).
