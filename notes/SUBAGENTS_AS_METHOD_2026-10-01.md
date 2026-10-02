# Subagent delegation as an experimental method

**Dated:** 2026-10-01
**Internal.** Not on Pages. Raw transcripts must never reach the public repo; derived counts only.
**First result already in:** thesis `docs/experiments/MA13_real_subagent_corpus/RUN_2026-10-01.md`, n = 26.
**Threads:** opens T22 to T25, changes the status of T2 and T5.

## The point

Every dyad experiment in this program so far has built its boundary by prompting one local model twice and calling the two calls agent A and agent B. That boundary is requested, not enforced. If the model ignores the request, there is no boundary, and MA1's collapsed halt arm is what that failure looks like.

The agent running this project can delegate to subagents whose context isolation is a property of the harness. A subagent cannot see the parent's conversation, cannot see the user's messages, and cannot see the parent's prior reasoning. That is the first boundary in this project not imposed by analogy, and it is available for use rather than for hypothesizing.

Two further affordances matter as much:

- **Real polyglottism.** Subagents can be launched on different model families, not two personas of one base model. Lotman's requirement of a minimum of two languages becomes literally satisfiable.
- **A standing corpus.** Delegations are written to disk as structured transcripts. Twenty six already existed before anyone thought of measuring them, which is why MA13 could be run retrospectively on uncontaminated data.

## What the corpus actually contains

Per delegation: the exact instruction sent, the exact final report returned, and every tool call the child made with its inputs. Intermediate reasoning is redacted. Tool results are absent.

Those two absences set hard limits. The child's process is unobservable, and content the child returned cannot be separated into "read from a file" and "produced from pretraining". Any measure that depends on that distinction has to come from a live run where the harness controls what the child can see, not from this corpus.

A third hazard, learned the hard way: a transcript of a delegation that is still running ends in a progress note, not a report. Measuring a live directory silently mixes unfinished work into the sample. Filter on a terminal success status.

## What MA13 found, in one paragraph

The boundary expands rather than compresses, unanimously: median report is 4.4 times the length of its instruction and the minimum across 26 delegations is 1.25, so the filter language used elsewhere in the journal is wrong at the level of volume for this boundary. Reports are mostly new vocabulary, gain ratio 0.84 median. Raw parent retention of that new vocabulary looked like 0.94 and collapsed to a six point effect against a matched permutation null, though the direction was consistent in 25 of 26 cases, so the effect is small and reliable rather than large. Most usefully, the dyad splits Lotman's criteria: volume increases, which rules out I-s/he, while the child contributes a great deal of its own, which rules out I-I. It is not presemiotic binding either, since the child acts autonomously. That is measured support for the third-cell hypothesis rather than another assertion of it.

## The honest problem with this method

I am the parent. I write the instructions, I read the reports, and I am writing this file. That is participant observation, and it has three specific consequences that have to be stated wherever this method appears.

1. **No blinding is possible.** The protection substituted for it is that measures are deterministic and frozen in a prereg before the data is touched. That is weaker than blinding and should be described as weaker.
2. **Instruction quality is a free variable I control.** A delegation that returns little may reflect a bad instruction rather than a property of the boundary. Fixing this needs an instruction set written once and reused unchanged across conditions, which is what the designs below do.
3. **n = 1 parent.** Every result is about one parent agent on one task family. Cross-parent variation is not merely unmeasured, it is unmeasurable from inside.

There is a fourth consequence that is more interesting than it is damaging. If I delegate to a subagent running the same base model, the child is not a second position; it is the same position with a different context window. On Lotman's account that is closer to autocommunication than to dialogue, which means my own use of subagents is a candidate instance of the phenomenon under study, not a neutral instrument for studying it. The way to keep that from being a fatal circularity is to make the model identity a manipulated variable, which is exactly what MA14 does.

## Designs

### MA14 · Enforced versus requested isolation

The two-level comparison that MA13 makes possible. Same task, same instruction text, two kinds of boundary.

- Level A, requested: MA10's conditions, one local model prompted twice, isolation asked for in the prompt.
- Level B, enforced: real subagents, isolation guaranteed by the harness.

Measures carried over from MA10 unchanged so the levels are comparable: content gain, unsupported claim rate, autonomy, blindness report rate, tag retention, id survival.

The question is whether requested isolation behaves like enforced isolation. If it does, prompt-simulated dyads are a valid cheap proxy and the whole program's method is vindicated. If it does not, every earlier dyad result is a claim about instruction compliance rather than about structure, and that has to be said plainly. This is the single highest-value experiment in the current backlog because it audits the method rather than extending it.

MA10 is therefore no longer a standalone run. It is the control arm of MA14.

### MA15 · Real polyglottism across model families

Lotman: a minimal thinking system requires two languages, and the harder the translation between them, the more useful each is to the whole. Prompt personas cannot test this. Different pretraining can.

The 1981 and 1983 essays, acquired after this note was first written, give the criterion in a form that settles the design question. Culture is a minimally two-channel structure linking *raznostrukturnye semioticheskie generatory*, differently-structured semiotic generators, so the minimum is not two generators but two generators built differently. And the other is necessary, in his words, precisely because it gives a different model of the same reality, a different modelling language, and a different transformation of the same text. A thinking device, he adds, must itself be a semiotic person and needs another semiotic person.

That is decisive for this method. A subagent on the same base model is not another semiotic person; it is the same person with a different context window. Model family is therefore not one variable among several in this design, it is the variable that decides whether the dyad qualifies as a dyad at all.

Launch the same instruction to subagents on genuinely different model families, with the family as the only manipulated variable. Then measure, deterministically:

- Position identifiability after style normalization. Strip surface markers and ask whether the source family is still recoverable from content alone. This is the S2 signature from the I-I designs, and it is the crux: if families remain distinguishable after normalization, there are two positions; if not, there is one position in two costumes.
- Round-trip asymmetry, MA12's measure, run across families rather than across registers. Lotman's prediction is that greater distance between languages yields less recovery, and that the non-recovery is where new material comes from.
- Disagreement that survives aggregation. Per the transmission reading, residual non-understanding may index complexity rather than failure, so convergence between families is to be reported as a loss and not as a success.

Two measures added from the second reading pass, both cheap and both available only with real subagents:

- **Alternation with suppression.** Lotman's own condition for dialogue, taken from Newson: the parties act in turn, and during reception each suppresses its own activity and orients to the partner. A delegation where the parent continues its own line through the child's turn fails a constitutive condition, and the transcripts record enough to tell.
- **Perceptual enlargement after code transfer.** After receiving a code from the other family, can a party make a distinction it demonstrably could not make before? This follows Lotman's colour example, where a transmitted code changes what the receiver can see. It is the one measure in the whole program that could show a dyad doing something neither party could do alone, which is the claim the dissertation most needs and least has.

Forbidden here, as everywhere in this project: cross-model embedding cosine. The spaces are not comparable and no amount of normalization makes them so.

### MA16 · Sibling delegation through a parent

The architectural version of MA11. Two subagents, no direct channel, parent as the only path between them. Already instantiated incidentally: four siblings ran in parallel in this session with every cross-sibling fact passing through me.

Measure what reaches sibling B of what sibling A produced, and what the parent drops in between. The parent is a filter here in the structural sense even though MA13 showed it is not one in the volume sense, and separating those two senses is the contribution.

Preregister the delegation protocol before running, because the temptation to improve a sibling's instruction after reading the other sibling's report is exactly the contamination this design cannot survive.

### MA17 · The parent's own reorganization

The autocommunication measure, turned on the method itself. After a delegation, does the parent's account of the problem change in structure rather than only gain facts?

Lotman's criterion for I-I is that the message is recoded into elements of its own structure and the personality is reorganized, not merely informed. The operational version: compare the parent's framing of a question before and after a delegation, scoring change in claim structure and operator vocabulary rather than change in content. MA13 measured vocabulary crossing the boundary; this measures whether the frame moved.

This one is the most exposed to the participant problem and should be run last, with the scoring rule fixed in advance and ideally with a human doing a blind pass on the before and after pairs.

## Practical conventions for anyone using this method

- Filter transcripts on terminal success. Never measure a live directory.
- Freeze every measure in a prereg before touching the corpus. It is the only protection available.
- Keep raw transcripts out of git entirely, and out of the public Pages repo absolutely. Derived counts only.
- Write the instruction once and reuse it verbatim across conditions. An instruction edited between conditions converts an experiment into an anecdote.
- Record the model family per subagent. Without it MA15 cannot be reconstructed later.
- State the single-parent limit in every writeup. It does not go away by being mentioned once.
- Do not let a subagent score another subagent's output. The no-model-scoring rule applies with more force here, not less, because the scorer and the scored would share a base model.
