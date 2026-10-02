# 3D and motion for experiment figures (not site chrome)

**Internal.** Vapor/CSS animation was the wrong layer. This note is where “more animation” lives: **WebGL, time, and spatial metaphor** tied to preregistered measures.

## Principle

Each figure should answer: *what quantity is encoded in which axis, and what would falsify the reading if the geometry were wrong?* Motion shows **process** (relay, round trip, gate closure, drift); static 3D shows **structure** (shells, tensors, cells). Prefer the same JSON keys as the 2D charts.

## Experiment → spatial models (backlog)

| Run | 2D today | 3D / motion direction |
|-----|----------|------------------------|
| **MA12** round-trip | Bars, loss chart | **Open orbits** — done: `fig-roundtrip-helicoid-3d.html`. |
| **MA15** polyglottism | (tables) | **Dyad cube** — pilot: `fig-ma15-dyad-cube-3d.html` (sync full matrix from JSON when expanded). |
| **MA4b/MA4c** halt | Pipeline canvas, bars | **Flow model** — pilot: `fig-halt-flow-3d.html` (B2 vs D2); next: scoped MA4c second manifold. |
| **MA13** delegation | Corpus strips | **Stack height** = unsupported-claim rate; time = hand-off index; subagent as lateral branch that rejoins or dead-ends. |
| **MA10** isolation | Gain bars | **Source field**: empty hemisphere vs filled; “laundering” as color bleed from unlicensed node into outward shell. |
| **Montreal** embedding | PCA 2D/3D | **Relay pulse** on thematic arcs — done in `fig-lotman-semiosphere-3d.html` (2026-10-02). |
| **Transmission cells** | Cell diagram | **3D rooms** — pilot: `fig-transmission-cells-3d.html`. |
| **Filter L1/L2** | Shell diagrams | **Pair-or-miss** as two surfaces that only intersect on licensed pairs; miss = ray that exits semiosphere. |

## Technical stack

- **Three.js** (same 0.128 CDN as Lotman L1 figures), `OrbitControls`, optional `CSS2DRenderer` for labels.
- **No theme animation** on text; figure stage uses `#faf8f4` / white canvas only.
- **Reduced motion**: `prefers-reduced-motion: reduce` → static frame, scrubber instead of autoplay.
- **Accessibility**: `role="img"` + prose caption with all numbers; motion is illustrative.

## Quality bar before committee-facing

1. Numbers on 3D view match report JSON (linked in caption).
2. One sentence in caption: what axis/animation encodes what measure.
3. 2D chart remains on page (3D is companion, not replacement) until T20 QA passes.

## Related threads

- T20 visual QA (include new 3D pilots).
- T31 agent edges vs instructions (MA15 3D dyad cube when report is stable).
