# Open threads · what has not been explored yet

**Dated:** 2026-10-01
**Internal.** Not on Pages.
**Purpose:** one place an agent can land, see what is unexplored, and know the cheapest next action without re-deriving the project.

**Read first:** `notes/README.md` · `notes/SUBAGENTS_AS_METHOD_2026-10-01.md` (new apparatus) (map of these notes) · thesis `docs/theory/EXPLORATION_ROADMAP.md` (phases and its own Q1 to Q5) · thesis `docs/EXPERIMENT_GAPS.md` (what may be claimed today)

**How to use this file.** Threads have stable ids. Do not renumber. When you close one, replace its status with the date and the path to the run write-up, and leave the row in place. `blocked_human` means an agent must not close it: the warrant or the blind coding has to come from a person.

## Status board

| Thread | Area | Status | Cheapest next action |
|---|---|---|---|
| T1 | Rule-layer halt rerun (MA4b) | RUNNING 2026-10-01, four arms incl. a non-model gate | Await `docs/experiments/MA4b_rule_layer_halt/RUN_2026-10-01.md` |
| T2 | Agent to subagent boundary (MA10) | RUNNING 2026-10-01, five context regimes P0 to P4 | Reframed: MA10 is now the control arm of MA14, not standalone |
| T22 | Enforced vs requested isolation (MA14) | open, highest value in backlog | Audits the whole program's method; MA10 supplies level A |
| T23 | Real polyglottism across model families (MA15) | open, runnable now | Subagents can run different families; satisfies Lotman's two-language minimum |
| T24 | Sibling delegation through a parent (MA16) | open, partly instantiated | Four siblings already ran in this session with the parent as sole channel |
| T25 | Parent reorganization after delegation (MA17) | open, run last | Most exposed to the participant problem; needs a human blind pass |
| T3 | Sibling subagents through a parent (MA11) | open, runnable now | Same wrapper, two children, no direct channel |
| T4 | Agent to agent role persistence (MA9) | open, runnable now | Reuse MA1 arms, add asymmetric retrieval |
| T5 | Two stack irreducibility (MA5, MA8) | UNBLOCKED 2026-10-01 | No longer needs a local pull: subagents run different model families (see T23) |
| T6 | Autocommunication audit (MA3) | open, needs session protocol | Fix the protocol before the first session, not after |
| T7 | Human to model signatures (MA7) | open, needs you | Battery of 30 prompts across six stacks, plus the dumb-medium control |
| T8 | Merge-error blind coding (E2, MA2) | blocked_human | Author the rubric pass; generations already exist |
| T9 | Where warrant lives (MA6) | blocked_human | Instrument the pair-read workflow, then run the holdout |
| T10 | Encoder choice as confound | open, runnable now | Rerun the probe under a second frozen encoder; roadmap Q1 |
| T11 | More licensed pairs (D1) | open, archival labor | Target n of 30 or more; everything quantitative waits on this |
| T12 | Peter plate completion (E3) | open, design decision first | Decide what individuates an edge when the third shell is empty |
| T13 | Portability threads (D3 to D8) | open, unscoped | Pick one thread and build ten dated pairs as a feasibility test |
| T14 | Transmission in Lotman and Tartu | closed 2026-10-01, two passes, `notes/TRANSMISSION_LOTMAN_2026-10-01.md` | Journal section 13 is unblocked; 1981 Russian original still wanted |
| T26 | Alternation with suppression (S9) | open, new from the 1983 essay | Lotman's constitutive condition for dialogue; unmeasured by every design so far |
| T27 | Perceptual enlargement after code transfer (S11) | open, highest theoretical payoff | Can a party make a distinction it could not make before receiving the other's code |
| T21 | Round-trip asymmetry across dyads (MA12) | RUNNING 2026-10-01, five conditions R0 to R4 | Await `docs/experiments/MA12_roundtrip_asymmetry/RUN_2026-10-01.md` |
| T15 | Mihhail Lotman rhetoric citation | blocked_human | Section 11 of the journal has a deliberately empty row |
| T16 | Partial map formalism | open, writing | Decide venue: dissertation appendix or separate paper (roadmap Q5) |
| T17 | Intersemiotic relay and derivation loss | open, unformalized | Tape to transcript to chapter is in the data, not in the formalism |
| T18 | Silence as a node type | open, unformalized | The corpus has silence coordinates; the KR has no type for them |
| T19 | Dashboard reorganization | proposed, awaiting decision | Four groups plus renames; probe-controls page is unlinked today |
| T20 | Visual check of figures M1 to M3 | open, trivial | Browser tool was unavailable at authoring time |

## Threads in detail

### T1 · Rule-layer halt (MA4b)

MA1 Finding 3: licensing refusal in the prompt gave recall 1.00 and false refusal 1.00 at 3B. The generator refused all eighteen items. Move the decision to where the retrieval experiment already makes it, in `e2_e4_corpus.retrieve` under condition `C_warrant_on_halt`, and give the generator only the halt string when the rule fires. Entry point: `scripts/run_ma1_typed_handoff.py`, add arm `C2b_rule_halt`. This is the single highest-value hour in the backlog because it converts a collapsed arm into a usable one.

### T2, T3 · The subagent boundary

The most promising unexplored area in the whole program. Context isolation between a parent and a child is enforced by architecture rather than requested in a prompt, which makes it the first boundary in this project that we did not impose by analogy. Measure evidence recoverability across the boundary, tier laundering of the child's report, and what the parent cannot recover at all, recorded as structurally significant absence. Sibling subagents add forced double compression with the parent as the filter. Design: `notes/DESIGNS_II_COMMUNICATION_2026-10-01.md` MA10 and MA11.

### T4, T5 · Peer exchange

MA9 asks whether a role prompt creates a position and where content actually enters; its asymmetric-retrieval arm exists to kill the claim that the archive is the only genuine other. MA5 and MA8 need a second stack with a different tokenizer and training lineage, scored on claim sets and entailment, never on cross-agent cosine.

### T6, T7 · Autocommunication and the human side

MA3 needs a session protocol fixed in advance or it is anecdote. MA7 needs multiple stacks, a human adjudicator for content gain, and the control that makes the whole thing falsifiable: a non-semantic structuring device standing in for the medium.

### T8, T9 · The human-gated pair

E2 generations exist (36 records, local backend). What does not exist is the blind human coding against `docs/experiments/E2_merge_error_eval/RUBRIC.md`. MA2 extends the same rubric along hop depth. MA6 instruments pair-read itself and asks what fraction of licensed edges only a person can create. Neither may be closed by an agent. An agent may prepare materials: coding sheets, shuffled order, blinding.

### T10 · Encoder choice

Every geometric result in the project rests on one frozen encoder. Roadmap Q1 is still blank. Until a second encoder is run, no one can say whether a negative result is about register or about `paraphrase-multilingual-MiniLM-L12-v2`. Cheap, mechanical, and it strengthens the retraction rather than threatening it.

### T11, T12, T13 · The data ceiling

n = 9 licensed pairs, and the effective n is smaller because the embassy and Novosti items are one denial packet. Every quantitative retraction traces here. D1 raises n on the existing plate; E3 is a second plate blocked on an edge-individuation decision rather than on ingest; D3 to D8 are portability threads, none scoped. Do not relax the pair-read standard to fill any of them.

### T14 to T18 · Theory not yet done

Transmission is being read now. The rhetoric-as-generation claim still has no citable formulation and the journal says so on purpose. The partial-map formalism has no venue. Intersemiotic relay (U-matic tape to derived transcript to published chapter) is in the data with derivation loss noted in prose but not typed in the formalism. Silence coordinates are in the corpus and have no node type in the knowledge representation, which is the formal gap behind the minus-device argument.

### T19, T20 · Site

The reorganization proposal groups cards into start-here, Montreal evidence with counts, schematic models, and reference, and would link `docs/embed/fig-probe-controls.html`, which no page currently reaches. Figures M1 to M3 were verified arithmetically, not visually.

## Do not re-explore

Closed, with write-ups. Do not redo these as if they were open.

- Orthogonal Procrustes secret to outward map: retracted, fails its matched permutation null (p = 0.394).
- Cross-shell nearest-neighbour separation as boundary evidence: retracted, direction-reversing under topic blocking.
- Flat versus typed retrieval on unpaired-family queries: run, 6/6 tier confusion flat, 100 percent miss-or-target typed.
- Typed versus untyped hand-off: run 2026-10-01, `docs/experiments/MA1_typed_handoff/RUN_2026-10-01.md`.
- Generator-side halt: run, collapsed. Reopen only as T1, at the rule layer.
- Operator change without volume change, 1983 to 1987: run, E7 report in benchmarks.
