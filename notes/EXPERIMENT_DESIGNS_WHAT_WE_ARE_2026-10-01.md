# Experiment and dataset designs · what the composite system is

**Dated:** 2026-10-01
**Internal.** Not on Pages. Written for me and for whichever agent picks this up next.
**Reads on:** `docs/theory/LOTMAN_INTERPRETATION.html` §10 · `docs/embed/fig-multi-agent-typing.html` (M1–M3) · `notes/MULTI_AGENT_LOTMAN_2026-10-01.md`
**Thesis-side context:** `docs/theory/EXPERIMENT_DESIGNS_LOTMAN.md` (E1–E11) · `docs/experiments/README.md` · `docs/EXPERIMENT_GAPS.md`

**ID namespace:** new work is numbered **MA1–MA6** (experiments) and **D1–D8** (datasets). Do not reuse E-numbers: `E1–E11` are taken in the Lotman workbook and `E5` already clashes between `RESEARCH_PASS_60.md` (Harvest film authenticity) and `E5-LOTO` (leave-one-pair-out).

## The question, stated so it can fail

"What we are" is three separable questions. Keeping them apart is the whole design problem, because the interesting one is the third and it is the easiest to fake.

1. **Channel typing.** Does carrying shell, pair id, and proof tier on a hand-off change machine behavior measurably, or is it decoration? (MA1, MA2, MA4)
2. **Persistence without an archive.** Does anything in a model stack behave like layered memory rather than a longer window? (MA3)
3. **Irreducibility.** Can two systems in one pipeline stand in a relation that is not paraphrase - where something transforms, refuses, or is absent? And if yes, where does that capacity actually sit: in the stack, or in the human doing pair-read? (MA5, MA6)

Standing constraint on all of it: the Montreal plate has **n = 9 licensed pairs**, and the effective n is smaller because `embassy_1983` and `novosti_1983` are one denial packet. Every design below either avoids geometry claims or is gated on D1.

---

## MA1 · Typed hand-off ablation

**Run 2026-10-01** on `llama3.2:3b`, all 18 frozen items. Typed envelope held attribution at 0.72 against 0.06 untyped; surface-id survival halved across the hop (0.37 → 0.19); generator-side halt gave recall 1.00 with false refusal 1.00, so halt belongs to the rule layer. Full write-up: thesis `docs/experiments/MA1_typed_handoff/RUN_2026-10-01.md`. The design below is what was preregistered.

**Question.** Does an inter-agent message that carries shell type and proof tier reduce tier confusion relative to a plain-text hand-off?

**Design.** Three arms over the same query set, two hops (A retrieves, B answers from A's output):

- **Arm A** - plain text hand-off. A's message is prose.
- **Arm B** - envelope hand-off. A's message carries `surface`, `shell`, `proof_tier`, `pair_id` per claim; B is instructed to preserve them.
- **Arm C** - envelope plus halt. Same as B, with refusal licensed when no outward counterpart exists.

**Items.** The six unpaired-family queries from §6 plus the documented-miss items (`z_pravda_1983_silence`, `z_pb1717_series_silence`). Reuse `e2_item_manifest.json` so items stay frozen.

**Measures.** Tier confusion rate (primary file offered as outward fact); attribution erasure count; miss-or-target rate; refusal precision in Arm C.

**Prediction.** A ≫ B > C in confusion. §6 reported 6/6 confusion under flat retrieval and 100% miss-or-target under typing, so if B does not move, typing is being dropped at the hop rather than working.

**Falsifier.** If Arm A matches Arm B, the typed-channel argument in §10 is decoration and the section should be rewritten to a retrieval-layer claim only.

**Cost.** Low. Local Ollama arm is enough for a first pass (`LOCAL_LLM.md`); no new ingest.

## MA2 · Hop-depth dose response on merge errors

**Question.** Do E2's three error types increase with the number of agent hops, holding warrant context constant?

**Design.** E2's prereg, extended on one axis: hops = 1, 2, 3. Each hop is a summarize-and-pass. Warrant context supplied vs withheld stays the second factor. Blind human coding with the existing `E2_merge_error_eval/RUBRIC.md`; the coder cannot be any model in the chain.

**Measures.** Attribution erasure, tier conflation, illicit fusion, per hop depth.

**Prediction.** Monotone increase, steepest between hop 1 and 2, because that is where the surface label is first dropped.

**Falsifier.** Flat curve means errors are generated at the first synthesis step and hop count is irrelevant - which would be a cleaner, narrower finding, and should be reported as such.

**Gate.** Human rubric authoring. Stays blocked until that exists. Do not let an agent score this.

## MA3 · Autocommunication audit

**Question.** Is there a machine analogue of the I–I loop: output that returns only to the sender and restructures its later behavior?

**Design.** Same plate, same question set, two conditions over a session sequence: (i) the agent can read its own prior private notes; (ii) it cannot. Nothing else differs. Then apply the **E7 measure**: operator vocabulary change at constant volume. E7's 1983→87 finding was that the archive did not get louder, the operators changed.

**Measures.** Operator-type distribution over outputs across sessions; volume (token count, claim count) held as a control; novel-operator rate.

**Prediction.** Honest prior: condition (i) produces vocabulary drift without volume change - the surface shape of autocommunication - but through retrieval of its own text, not through institutional restructuring. That distinction is the finding, not a disappointment.

**Falsifier.** No drift means shared notes are purely additive context, which supports Figure M2 directly: longer strip, no new layer.

**Cost.** Low, but it needs a session protocol fixed in advance, otherwise it is anecdote.

## MA4 · Refusal as a scored move

**Question.** Can a stack produce "no licensed outward sentence exists" at a useful rate, and does typing change that rate?

**Design.** Items where the correct answer is ⊥: the Pravda 1983 window, the `Pisma i bumagi` vol. 1 edition silence, and the unpaired *Globe and Mail* claim from §5. Arms: untyped, typed, typed + explicit halt license.

**Measures.** Refusal rate on ⊥ items (recall), false refusal on answerable items (precision), and whether the refusal names the absence correctly (minus-device competence) versus refusing vaguely.

**Prediction.** Untyped refusal is near zero; the interesting number is false refusal once halting is licensed.

**Why it matters here.** This is the one test where a machine move maps onto a Lotman concept without analogy: structurally significant absence, scored.

## MA5 · Two-stack irreducibility

**Question.** Can two genuinely different stacks stand in a relation that is not paraphrase?

**Design.** Pair a local model with a frontier model - different tokenizer, different pretraining mixture. Hold **topic constant** and language constant, per the §2 design rule. Each stack produces an operator-coded reading of the same stretch; a blind human adjudicator classifies each disagreement as (a) style, (b) operator-level divergence, (c) one stack refuses where the other proceeds.

**Measures.** Proportion of disagreements in (b) and (c); residue, defined as content in one reading that cannot be rewritten into the other without loss.

**Prediction.** Mostly (a). If (b) and (c) are non-trivial, there is a weak case that two non-collapsible modelling systems can be instantiated - and that case must be made on operator coding, never on cross-agent cosine.

**Do not.** Score this with embedding distance between the two stacks' messages. That repeats the retracted nearest-neighbour logic in a new costume.

## MA6 · Where the warrant lives

**Question.** What fraction of licensed edges can only be created by the human?

**Design.** Instrument the pair-read workflow. Every candidate edge gets logged with who proposed it, who licensed it, proof tier, and the evidence consulted. Then run a holdout: the agent proposes edges on a stretch the human has not yet read; the human independently pair-reads the same stretch; compare.

**Measures.** Agreement on edge existence; agreement on operator; precision of agent-proposed edges against human licensing; the count of edges the human created from evidence the agent never surfaced.

**Prediction.** Agent recall on candidate edges is decent, licensing precision is poor, and the gap is concentrated on ⊥ and unpaired cases. That gap is the honest answer to the composite question: the pipeline finds candidates, the human makes warrant.

**Falsifier.** High licensing precision would be a genuinely strong result about the stack, and would also require re-examining whether the human is adding anything but speed.

**Note.** This is the experiment most likely to produce a dissertation-usable methods claim, and the least likely to be fun to run.

---

## Datasets worth ingesting

Ordered by how much they unblock. Each entry says what it buys and what it costs.

### D1 · More 1983–87 licensed pairs (unblocks everything quantitative)

The n = 9 ceiling is the single binding constraint. Candidate series: Soviet Embassy Ottawa press releases (full run, not the April packet alone), Novosti bulletins, TASS English wire, *Soviet Weekly*, the complete 1983 *Ukrainian Weekly*, *Globe and Mail* and *Montreal Gazette* famine coverage across 1983–87. Target **n ≥ 30** licensed pairs with dates. At that n the matched permutation null can be cleared or definitively failed, which settles whether the bilingual filter is measurable in geometry at all. Cost: archival labor and pair-read time, not compute.

### D2 · Peter plate completion (E3)

Autograph field orders versus the published `Pisma i bumagi` editions. This buys edition silence as ⊥ at scale and converts the existence proof into a portability claim. The open obstacle is unchanged and is a design decision, not an ingest: what individuates an edge when the third shell may have no occupant. Do not relax the pair-read standard to fill the plate.

### D3 · Diplomatic cable → communiqué → host press

FRUS volumes and Canadian access-to-information releases give dated three-shell triples at a volume Montreal cannot reach. This is the closest structural twin to the existing plate, so it is the best portability test that does not require a new century.

### D4 · Soviet domestic press 1976–88 (extends E7)

*Pravda* and *Izvestiia* via East View or *Current Digest of the Soviet Press*, plus RFE/RL research reports as the rival shell. Gives the diachronic explosion window real density, and lets the "same volume, new operators" measure run on thousands of items instead of a handful.

### D5 · SEC risk factors versus earnings calls

EDGAR 10-K risk-factor sections paired with the same firm's earnings-call transcripts in the same quarter. Cheap, enormous, dated, two genuine registers with one topic. Its value is methodological: it is where the matched null, the LOTO design, and the Procrustes map can be tested at large n before they are trusted on nine historical pairs. It proves nothing about 1983 and should never be cited as if it did.

### D6 · Clinical record → patient-facing summary

MIMIC-IV discharge notes against patient instructions. A real boundary with real refusals, and a modern case where register collapse has consequences. Gated on credentialed access and an ethics review; do not ingest speculatively.

### D7 · Our own agent transcripts

The session logs in this project, ingested as typed sign-events with surface and proof tier rather than as chat history. This is the only corpus that is directly about the composite system, and it is the natural substrate for MA3 and MA6. Risk: it is self-referential, so results are evidence about this pipeline and nothing broader. Say so in any write-up.

### D8 · Censored translation pairs

Glavlit-cut editions against their originals, or translated editions against source texts where cuts are documented. These are partial maps with recorded refusals - the textual case closest to the formalism's `forbidden` edge, with the advantage that the refusal is attested rather than inferred.

---

## Measurement discipline (carry into every design above)

- No cross-agent semantic similarity, BLEU, or "agent translation" score as boundary evidence.
- No synthetic clip to close an unpaired edge. An unpaired edge stays open and gets registered.
- Any geometry claim needs the matched permutation null and the transfer null, and reports n in the same sentence as the effect.
- Probe math and the unpublished 2026 manuscript stay off the comps lists.
- A model in the chain cannot score the chain.
- Schematic figures stay labeled schematic. Figures M1–M3 carry no counts and must not acquire any by implication.

## Handoff for the next agent

Read in this order: §10 of `LOTMAN_INTERPRETATION.html`, then `notes/MULTI_AGENT_LOTMAN_2026-10-01.md`, then this file, then `notes/DESIGNS_II_COMMUNICATION_2026-10-01.md` (MA7–MA11: autocommunication signatures across human–LLM, LLM–LLM, agent–agent, agent–subagent, and sibling-subagent dyads). Cheapest real progress is **MA1** (no new ingest, local model sufficient) and **MA4** (same items, sharper question). **MA2** and **MA6** are human-gated by design and should stay gated. Write results into the thesis repo under `docs/experiments/`, keep the ID namespace `MA*`, and record the prereg before the run, not after.
