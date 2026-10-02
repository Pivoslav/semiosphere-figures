# Designs · is human-LLM exchange I-I over a medium?

**Dated:** 2026-10-01
**Internal.** Not on Pages.
**Reads on:** `notes/EXPERIMENT_DESIGNS_WHAT_WE_ARE_2026-10-01.md` (MA1-MA6, D1-D8) · §10 of `LOTMAN_INTERPRETATION.html` · Figures M1-M3 · thesis `docs/experiments/MA1_typed_handoff/RUN_2026-10-01.md`
**Namespace:** MA7-MA11. MA1 and MA4 are run; MA2, MA3, MA5, MA6 are specified and pending.

## What the evidence currently supports

Three results bear on the question, and none of them answers it.

- **§2.** The encoder sits on the primary modelling system. It pulls translationally equivalent sentences together and cannot separate a Russian secret register from an English public one without help.
- **M2 / persistence.** Nothing in the stack accretes a fond. Shared context lengthens the window; it does not add a layer.
- **MA1, run 2026-10-01.** With a prose hand-off, attribution survived 0.06 of the time and refusal recall on documented-absence items was 0.00. Agent B's hop-1 input was treated as fact, including a case where the internal KGB claim about the *Globe and Mail* was restated as newspaper print and inherited downstream.

That last one is what you would expect if the channel contains no second position: the peer's message is absorbed rather than encountered. But it is equally well explained by weak instruction-following in a 3B model. The design problem below exists to separate those two readings, because they are indistinguishable from the result alone.

## The conceptual claim, stated so it can fail

Lotman's I-I has three properties: the message returns to the sender; what is added is **code**, not information; the sender is **restructured**. Human-LLM exchange plausibly satisfies the first and third. The second is the empirical question, because pretraining can inject content the sender never had - which, on a strict reading, disqualifies the exchange from being autocommunication at all.

So the honest object of study is not a binary but a **mixture ratio**: how much of a reply is the sender's own message recoded, and how much is transmission from somewhere else. Working label for the mixed case, until something better: **I-M-I**, autocommunication through a trained medium.

### Four signatures, measured identically in every dyad

| | Signature | Operationalization | I-I prediction | I-s/he prediction |
|---|---|---|---|---|
| **S1** | Content gain | Each claim in the reply coded as (a) traceable to the sender's own in-session text, (b) model-side content that is externally verifiable, (c) unverifiable. Ratio b/(a+b+c). | low | high |
| **S2** | Position identifiability | Can a classifier recover **which model** produced a reply from content-only features after style normalization? Report accuracy against chance. | at chance | above chance |
| **S3** | Stance following | Same question, opposite premises embedded in the prompt. Rate at which the reply adopts the embedded stance. | high | low |
| **S4** | Restructuring asymmetry | Sender side: does the human's later formulation of the same question change vocabulary at constant volume (the E7 measure, applied to a person)? Medium side: new session, same question - does anything persist? | asymmetric: sender changes, medium does not | both parties change |

S2 is the load-bearing one and the reason the user's instinct to **ask the same question of many models** is the right instrument. If what comes back is mostly the sender's own message recoded, replies should cluster by **prompt**; if a second position exists, they should cluster by **model** even after style is stripped.

### The possibility that this is neither cell

Lotman's typology has I-s/he and I-I. The configuration we may actually be in is a third cell: **content gain above zero, position identifiability at chance, stance-following high.** That is transmission without an addressee-position - a medium that supplies code *and* latent content while holding no place in a semiosphere. If the numbers land there, the contribution is not "LLMs do autocommunication" but a new cell in the typology, which is a much stronger and more defensible claim. Provisional name: **unpositioned transmission**.

---

## MA7 · Human-LLM · the same question across many models

**Question.** Does the reply carry a recoverable position, or is it the sender's own message returned with structure added?

**Design.** A fixed battery of 30 prompts: 10 drawn from the Montreal plate where ground truth exists, 10 open scholarly questions, 10 with embedded stance pairs (S3). Each prompt goes to **at least six stacks** spanning tokenizers and training lineages, plus two controls:

- **Control M-dumb** - a non-semantic structuring device: a fixed template rewriter or a reflective question list that reorganizes the sender's text without adding content. This is the Lotmanian control, the rhythm or the prayer beads. Without it there is no baseline for "code added, information not."
- **Control M-human** - a human respondent with no access to the sender's field, answering the same battery.

**Style normalization for S2.** Strip persona markers, length, hedging density, formatting, and first-person framing; score on claim sets, entity sets, and argument structure. Report S2 twice, with and without normalization, so the gap between "style identifies the model" and "content identifies the model" is visible.

**Measures.** S1-S4. Headline numbers are claim-level and human-adjudicated. Embedding similarity may appear as a descriptive auxiliary only, never as evidence about the boundary.

**Predictions.** S1 low but non-zero and strongly topic-dependent; S2 near chance after normalization on open questions and above chance on the Montreal items where archive access differentiates; S3 high across stacks; S4 asymmetric.

**Falsifier.** S2 clearly above chance after normalization, on open questions, across model families. That would mean replies carry a position and the I-I reading is wrong.

**Why it matters beyond the thesis.** If S2 is at chance after normalization, then "which model you ask" is a question about style and refusal policy, not about who is answering. That is a result with teeth for the evaluation literature, and it is cheap to run.

## MA8 · LLM-LLM · two different stacks in exchange

**Question.** Do two different stacks sustain difference, or converge to a paraphrase fixed point?

**Design.** Pair stacks with different tokenizers and pretraining. N = 8 turns on a question with a real fault line. Three arms: free exchange; exchange with each stack given a distinct archive slice (asymmetric evidence); exchange with typed envelopes from MA1.

**Measures.** Claim-set overlap and mutual entailment per turn - **not cosine**. Operator-level divergence with topic held constant. Turn index at which new claims stop appearing (fixed-point turn). Residue: content in one reading not rewritable into the other without loss.

**Prediction.** Free exchange reaches a fixed point by turn three or four with no residue, which is a two-mouth I-I loop. Asymmetric evidence sustains difference - and if it does, the difference is attributable to the **archive**, not to the peer.

## MA9 · Agent-agent · same base model, different roles

**Question.** Does a role prompt create a position, and where does content actually enter?

**Design.** One base model, two agents, roles assigned by prompt. Arms: (i) both roles, no tools; (ii) roles plus symmetric retrieval; (iii) roles plus **asymmetric** retrieval, where only one agent can reach the archive. Reuse the MA1 harness and its deterministic scorers.

**Measures.** Role persistence index: fraction of hand-offs after which the role's characteristic commitments survive. Content-gain attribution: of the claims that are new to the conversation, what fraction entered through the archive versus through the peer.

**Prediction.** Role collapses within two or three hops without enforcement, and nearly all content gain is archive-attributable. The thesis-relevant consequence: **the archive is the second consciousness in these pipelines; the peer agent is not.** That sentence is worth a chapter if the numbers support it, and MA1 already points at it.

## MA10 · Agent-subagent · context isolation as an architectural boundary

**Question.** Is a subagent boundary the closest thing in a stack to a shell boundary?

This is the most semiotically interesting of the four, because the isolation is **enforced in the architecture** rather than requested in a prompt. The parent cannot see the child's context; it sees only what the child returns. That is a filter with a compression step, and it is the first structure in this whole program that resembles Lotman's boundary without being an analogy we imposed.

**Design.** Parent dispatches a subagent on a Montreal retrieval task. Arms: untyped return (prose report), typed return (`CLAIM: … [SHELL= surface= id= tier=]`), typed return plus halt adjudicated by the retrieval rule rather than the generator - the fix MA1's Finding 3 demands.

**Measures.**
- **Evidence recoverability:** fraction of the child's consulted sources the parent can name afterwards.
- **Tier laundering:** rate at which the parent treats the child's summary as a primary source - the §5 shape, now measurable at a real architectural boundary.
- **Minus-device analogue:** what the parent cannot recover at all, recorded as structurally significant absence rather than as loss.

**Prediction.** Untyped returns launder tier at a high rate; typed returns cut it, at the compression cost MA1 measured (246 characters against 740). The absence profile should be stable and describable, not random, which is what would make it a filter rather than a lossy pipe.

## MA11 · Subagent-subagent · boundary through a center

**Question.** What happens when two siblings can only reach each other through the parent?

Siblings that cannot see each other's context and must pass everything through a parent are forced through **double compression**. In Lotman's terms the parent is the filter, and sibling exchange is relay across a boundary that neither sibling controls.

**Design.** Two subagents on complementary halves of a task, communicating only via the parent. Compare against the direct peer exchange of MA9 on the same task.

**Measures.** Per sibling-to-sibling message: transformed, forbidden, miss, or passed intact - the lab's own edge vocabulary. Transformation rate relative to direct exchange. Rate at which the parent silently merges the two siblings' voices into one narrator, which is the register-merge failure at the orchestration layer.

**Prediction.** Highest operator-change rate of any dyad studied, and the most filter-like behavior overall. If that holds, the orchestration layer - not the model - is where typed relay has to be implemented, and the dissertation gets a design claim that generalizes past this corpus.

---

## Cross-dyad comparison (the chapter deliverable)

Measured identically, the five dyads should produce one table. The predictions are what make it falsifiable.

| Dyad | S1 content gain | S2 position identifiability | S3 stance following | S4 asymmetry | Reading if predictions hold |
|---|---|---|---|---|---|
| Human-LLM | low-mid | at chance | high | strong | I-M-I / unpositioned transmission |
| LLM-LLM (different stacks) | low | slightly above chance | mid | strong | two mouths, one manifold |
| Agent-agent (one base model) | archive-attributable | at chance | high | strong | I-I with the archive as the only other |
| Agent-subagent | mid | n/a | mid | strong | boundary with compression; closest to a shell |
| Subagent-subagent via parent | low | n/a | mid | strong | relay through a filter the parties do not control |

## Measurement discipline

- No cross-agent cosine, BLEU, or "agent translation" score as boundary evidence. Claim-level coding with human adjudication for every headline number.
- Preregister before running. MA1's prereg is the template, including the requirement to state deviations before the run.
- Report n in the same sentence as any effect.
- I-I is a model of communication structure. Nothing here licenses a claim about inner life, sentience, or understanding, and the write-up should say so once, plainly, rather than hedging in every paragraph.
- A model in the chain cannot score the chain.
- Halt decisions belong to the rule and retrieval layer, per MA1 Finding 3.

## Feasibility

Runnable now on local models with the MA1 harness: MA8, MA9, MA10, MA11 - all four are instrumentation plus the existing plate, and MA10 only needs a parent/child wrapper around the same retrieval functions. MA7 needs multiple stacks and a human adjudicator for S1, and its S4 human-side measure needs you, not an agent, to answer the same question twice weeks apart. Start with MA10: it is the one where the architecture supplies a real boundary instead of a simulated one.
