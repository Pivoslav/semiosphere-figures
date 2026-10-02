# Brief: finish bringing the 3D figures in line with the rest of the site

**Internal.** For whoever works in this repo next (mostly Cursor). Written 2026-10-02 after the commit that rewrote the 3D hub and the six 3D pilot pages.

## Where things stand

The 3D hub (`docs/figures_animated_3d.html`) and the six pilots that live only in this repo now look and read like the 2D experiment pages. Each has a breadcrumb line, a plain-language lede, a "How to read this" guide box, glossary popovers on jargon, a source popover on every mention of Lotman or of an outside method, a "Theory tie-in" caption, a numbers table with report keys, and the limits from its 2D twin. Labels are drawn in the 3D scenes, which they weren't before.

That commit also fixed several things that were wrong:

- The MA13 delegation stack drew 26 bar heights from a formula and then sorted them. It now draws the measured `delegations[].compression_ratio` array in report order, the same array as D1 on the 2D page.
- The MA10 isolation page called P0 "corpus shared". P0 is the parent with no subagent.
- The transmission rooms page said four rooms were dashed (three are), and its lede and caption gave different axes. Room heights now carry no meaning and the page says so.
- The MA15 cube claimed colour meant the forward model when each pairing had its own colour. Colour now does mean the forward model, both qwen and gemma ribbons are visible (one each way), and the unused llama corner is gone.
- The MA12 caption quoted the gap as (1 minus recovery) times 180 degrees while the drawing used 207. One constant now drives both.
- `site-nav.js` had page-relative paths in RELATED that resolved to 404s on two pilots, and a duplicate `"index.html"` key that hid the hub link on the home page.
- `scripts/sync_from_thesis_lab.py` would have deleted all six pilots on the next sync, because the prune step keeps only `CURRENT_EMBED`. They are now in a separate `PAGES_ONLY_EMBED` list that the prune step keeps and the copy step skips.

Shared code replaced the copy-pasted blocks: `docs/assets/fig3d.css` (layout), `docs/assets/fig3d.js` (Three.js stage that renders only when something changes and pauses when the figure is off screen or the tab is hidden), `docs/assets/fig-terms.js` (glossary and source popovers), and `docs/assets/fig-quotes.js` (the source registry). Nothing runs an animation loop until someone presses Play.

## Explainer sections on every 3D page

All eleven 3D pages now end with two added sections: "How this figure is made" (collapsible panels with the equations, the constants in the drawing code, and where the data lives) and "In plain words" (what everything in the figure is, what it shows, and why it matters for the dissertation and for AI pipelines).

The text lives in `explain/<page>.html` at the repo root, outside `docs/`, so it is not published on its own. `scripts/sanitize_public_site.py` copies each file into the matching page between `<!-- fig-explain:start` and `<!-- fig-explain:end -->` markers, and adds `assets/fig-explain.css`, `fig-quotes.js` and `fig-terms.js` to the page head if they are missing. Because sanitize runs at the end of every sync, the five pages built in the thesis lab get their sections back each time. Edit the files in `explain/`, then run `python scripts/sanitize_public_site.py`. Never edit between the markers in `docs/`. The script is idempotent, so running it twice changes nothing.

Three statements in those panels need confirming against the thesis lab before anyone cites them:

- The embedding page says the 384-dimensional fingerprint is reduced to three dimensions with PCA (u = W^T(e - mean e)) and then placed at its shell radius. The radius part is checked (every dot sits exactly at 1.35, 2.75 or 3.55). The PCA step is what the site says elsewhere, but the builder is the authority.
- The MA10 panel gives the unsupported-claim rate in a working form and does not define the content-gain baseline. Both should be copied from the MA10 preregistration and report.
- The MA12 and MA15 panels say tokens are compared as sets, "tokenised as in the MA12 harness". If the harness lowercases, strips punctuation or uses a stoplist, say so in `explain/fig-roundtrip-helicoid-3d.html`.

## Section references open a plain-language note

Every mention of a journal section (§13), a figure or panel (figure R1, panel D3, L2), an experiment (MA10) or an open thread (T29) on the 3D pages is a link with class `sec`. The first click opens a short note on what that part of the project is; the second click goes there, if it has a public page. The notes live in `docs/assets/fig-sections.js`. Open threads and planned experiments have no public page, and their popover says so.

`python scripts/link_section_refs.py` adds the markup to the explainer files, the hub and the six pilots, then `python scripts/sanitize_public_site.py` copies the explainers into the pages. Run them in that order after editing any of those files. A reference with no entry in `fig-sections.js` stays plain text, so add the entry first. Bare R1 to R4 and T1 to T3 are never linked, because on these pages they also name round-trip conditions, gate rules and open threads. Breadcrumbs, card link rows and jump menus are left as plain navigation.

## Before the next sync from the thesis lab

`docs/theory/LOTMAN_INTERPRETATION.html` is mirrored from the thesis lab, so the next sync will overwrite it. The commit added nine glossary entries to the docs copy so the new popover links resolve: `gloss-round-trip`, `gloss-dyad`, `gloss-polyglottism`, `gloss-compression-ratio`, `gloss-content-gain`, `gloss-rule-gate`, `gloss-unsupported-claim`, `gloss-presemiotic`, `gloss-fond`. They sit at the end of the glossary `<dl>` under a comment. Copy them into the thesis-lab source of the journal first, then sync.

The same applies to this note and to `notes/VIZ_3D_CREATIVE_DIRECTION.md`, which are mirrored to thesis `docs/theory/notes/`.

## Things only Sean or the thesis lab can settle

Work through these in order. None of them should be guessed.

1. MA15, gemma out and qwen back, is drawn at 0.52. Nothing else on the site states that number. Check it in `ma15_polyglottism_report.json` or `docs/experiments/MA15_polyglottism/RUN_2026-10-02.md` and fix the page and its numbers table if it differs. There is a TODO comment on the line.
2. The unsupported-claim rate has a working gloss ("the share of an answer's claims that no corpus unit supports") that I wrote from the measure's name. Replace it in the glossary entry and in the two `data-tip` attributes with the wording from the MA10 preregistration.
3. The public pages name P0, P3 and P4 explicitly. The journal's MA10 table implies P1 is "the parent's full sources" and P2 is "typed claims only", but confirm against `ma10_subagent_isolation_report.json` before any page uses those two labels.
4. The 2D T1 chart on `fig-transmission-cells.html` contradicts itself. Its guide text calls I-s/he the "same size, receiver adds little" corner, while its canvas puts I-s/he in the top row, labelled "substantial". The 3D rooms follow the canvas. Decide which is right and fix the other.
5. Journal section 14 says one stretch of thirteen reached a fixed point in R4. The R4 caption on `fig-roundtrip-asymmetry.html` says 2 of 13 on the qwen stack. One of them is stale.
6. Every Lotman entry in `docs/assets/fig-quotes.js` copies the journal's wording and tier, including its "verify wording" notes. Six of them are paraphrases, shown on the pages as "Paraphrase, not a quotation": `lotman-two-channels`, `lotman-presemiotic`, `lotman-round-trip`, `lotman-two-generators`, `lotman-semiotic-person`, `lotman-colour`. For each, find the passage in the edition or scan, put the exact words in `text`, add the page number to `source`, and change `kind` to `"quote"`. The Universe of the Mind entries have no page numbers yet. Fix the journal at the same time so the two stay identical.

## Source popovers: how they work

A claim that leans on a source gets `<a class="q" data-q="KEY">phrase</a>`. The popover shows the exact quotation (or a labelled paraphrase), the full citation, the journal's tier note, and a link to where the journal uses it. Pages load `assets/fig-quotes.js` before `assets/fig-terms.js`, both with `defer`. Inside a page that is shown in the gallery iframe, add `target="_top"` to the link.

Rules for `fig-quotes.js`, also written at the top of the file:

- A `quote` entry is copied verbatim from the journal. Never tidy the wording in the registry. Fix it in the journal against the edition, then copy it across.
- A `paraphrase` entry is the journal's own summary and is labelled as such on the page.
- A `method` entry cites where a measure comes from. The two that exist (Jaccard 1912 for token Jaccard, Pearson 1901 for PCA) were checked against the publisher records.
- Any new author, method or assumption that Sean didn't supply gets an entry, and an assumption that can't be sourced is labelled as an assumption on the page.

Available keys: `method-sbert`, `method-golden-angle`, `lotman-boundary`, `lotman-own-their`, `lotman-explosion`, `lotman-thinking-translation`, `lotman-semiosis-unit`, `lotman-excludes-new`, `lotman-metatexts`, `lotman-two-generators`, `lotman-semiotic-person`, `lotman-two-channels`, `lotman-presemiotic`, `lotman-round-trip`, `lotman-colour`, `method-jaccard`, `method-pca`.

## The generated Lotman pages still need the same treatment

`fig-lotman-semiosphere-3d.html`, `fig-lotman-semiosphere-demo-3d.html`, `fig-lotman-operator-tensor-3d.html`, `fig-lotman-explosion-3d.html`, `fig-semiosphere-embedding-3d.html` and `lotman_3d_evidence.html` come from the thesis lab (`build_lotman_3d_visualizations.py` and the other builders listed in the README). Edit the builders, rebuild, then sync. Editing the docs copies is wasted work.

For each of those pages:

- Add a breadcrumb line at the top: Animated 3D hub, Lotman 3D gallery, the 2D twin, the journal section. Use `target="_top"` because the gallery shows these pages in iframes. Suggested 2D twins: L1 to `fig-partial-map-montreal.html`, L2 to `fig-honest-plain-heatmap.html`, the embedding to `fig-theme-vs-register.html`. L3 goes to journal section 4.
- Load `fig-quotes.js` and `fig-terms.js` and put a source popover on every mention of Lotman. The obvious pairings: "Lotman's semiosphere made spatial" with `lotman-semiosis-unit`; "boundary non-equivalence" and the bilingual filter with `lotman-boundary`; the inner and outer shells with `lotman-own-their`; autocommunication with `lotman-two-channels`; explosion with `lotman-explosion`; untranslatability with `lotman-boundary`; PCA with `method-pca`.
- The paragraph that begins "The dissertation tests whether Soviet-era talking points..." appears word for word on L1, L2, L3 and the demo, so the gallery shows it four times. Put it once at the top of the gallery and, on each embed, fold it into a `<details>` titled "What the dissertation is testing".
- Remove every dash used as punctuation, including the " - " that `sanitize_public_site.py` leaves behind when it replaces an em dash. Rewrite the sentence instead.
- Apply the same rules to the click-panel strings inside the page scripts. Phrases worth searching for: "is not a vague", "not a metaphor, a counted gap", "made visible", "The model is honest", "not one story told louder or softer".

Replacement copy for the visible prose follows. Facts are unchanged from the current pages; only the wording moves.

### Shared paragraph (gallery top, and the `<details>` on each embed)

> The dissertation asks whether Soviet talking points about commemorating the famine change in predictable ways as they move from the secret memo to the embassy and Novosti, then to domestic news, and finally to diaspora and scholarly print. It also asks whether that change can be dated and counted. Montreal 1983 is the anchor, and the shift after 1983 is the candidate for Lotman's <a class="q" data-q="lotman-explosion">explosion</a>. These models put Lotman's spatial vocabulary in a form that can turn out wrong, and they read the same JSON as Figures 1 to 12.

### L1, "In plain terms"

> Each document in the pilot corpus is a coloured dot, and the gold spheres around them are Lotman's <a class="q" data-q="lotman-semiosis-unit">semiosphere</a> laid out in space. The innermost shell holds the secret KGB and CC voice. The next holds inward reporting, the institution talking to itself. The third holds Soviet outward channels: the embassy, Novosti, the UN, the domestic news register. The outer shell holds the diaspora, mainstream and scholarly print that argued back. A coloured tube between two dots is a traced relay, a pair-read we can defend with a proof tier in the JSON.

### L1, "What position means"

> Distance from the centre is institutional register and has nothing to do with geography. Montreal is the anchor event. spr. 1206 (24 March 1983) sits on the inner shell, the embassy and Novosti denials sit further out, and diaspora and AP coverage of the commemoration sit furthest out. The faint red plane marks the 1983 boundary, where the memo's scare quotes and its word «сборище» fail to cross outward, which is the site's picture of Lotman's <a class="q" data-q="lotman-boundary">boundary as a filter</a>. A dot with no outward arc can still be evidence. Pravda in 1983 has none: silence at home while the denial ran abroad.

### L1, connections

> Each arc is a pair-read stored in the JSON. Two texts share a topic (the famine, the symposium, the gathering) and we record how the wording travelled between them, or how it refused to. So every arc is a claim with a proof tier attached: proven thematic relay, proven verbatim, memo-claim only, and so on.
>
> Read together, the arcs say four things. The memo's hostility stays on the inner shell: scare quotes hit 48 times across three internal memos and 0 times on the embassy, Novosti and UN surfaces. The outward Soviet channels share their denial frames with each other (drought, kulak sabotage, no artificial famine). The diaspora and rival press keep the commemorative language the outward line rejects. And Soviet domestic newsprint in 1983 says almost nothing about the denial, which shows up here as missing arcs; tier-B tracks there may catch stray quotation marks from the 1933 idiom, and those are not relay. Together they describe one institution running two different stories, one for inside and one for abroad.
>
> The missing line between spr. 1206 and Pravda counts as evidence too. The denial went abroad, and no verified domestic clip in the anniversary window carries it. Silence and pending tiers are left visible rather than filled in.

### L1 and demo, legend lines

> Sky blue, thematic relay: same topic, operators transformed on the way. This is the main finding.
> Green, verbatim relay: outward channels copying each other. It shows coordination abroad and says nothing about reach at home.
> Purple, <a class="q" data-q="lotman-two-channels">autocommunication</a>: loops inside the fond. Only the demo has these until inward companions are ingested.
> Violet, dialogue: two semiospheres projecting onto each other without being able to translate.
> Magenta, rival uptake: commemoration carrying on in the press the memo was written against.

### L2, "In plain terms" and axes

> This is a 3D heatmap of operators. Each bar is one wording habit (scare quotes, the drought frame, genocide commemoration and others) in one document, and a taller bar means more matches. On the internal memo columns the bars form a ridge, highest for scare quotes on spr. 1206. On the embassy column, in the same row, the ridge drops to zero. The topics are the same three (famine, symposium, gathering) and the readings they require are incompatible. That drop is untranslatability, counted, in the sense of what Lotman's <a class="q" data-q="lotman-boundary">boundary</a> will not pass.
>
> Left to right: document surfaces, from the secret memo through the outward Soviet lines to diaspora press. Front to back: operator type. Height: the raw hit count O[operator, surface] from the corpus JSON. Colour: register family (internal blue, outward green, press orange, rival red).

### L2, connections

> No arcs are drawn here; the comparison is spatial. Look along a row from the tall internal scare-quote bar to the flat embassy bar and you are testing a relay by eye: did the operator travel outward? The count says no, 48 internal against 0 at the embassy. The denial frames (drought, kulak, no artificial famine) rise on the outward columns instead. That skew is the dissertation's operator evidence for untranslatability, and it is a gap you can count.

The "Thesis link" box on L2 repeats "In plain terms" almost word for word. Delete it.

### L3, "In plain terms" and connections

> Two phrase networks, one above the other. The lower plane is the memos from before 1983, and there are only two of them. The upper plane is the fourteen memos after. Each dot is a cluster of wording habits and each line means two clusters turn up in the same memo. Red lines are pairings that did not exist before Montreal. Grey pillars join topics that carry on across the break at the same spot.
>
> Before 1983, three topics travel together in a tight triangle: operational vocabulary, references to OUN actors, and scare quotes. After 1983 new nodes appear, a quoted «artificial famine» and a hostile «gathering», and new lines tie them to the old ones. The institution did more than write more memos. It changed which phrases travel together once the commemoration went ahead despite its countermeasures. That is Lotman's <a class="q" data-q="lotman-explosion">explosion</a> as a dated claim you can count.

### L3, "Thesis significance" (keep only this paragraph)

> The upper-plane lines are internal to the fond. They don't show that the outward press changed line by line. They show that the secret register's phrase network split after 1983. For the full argument, pair this figure with L1 (outward relay) and L2 (operator skew): non-equivalence at the edge of the shell, and a rewiring inside the archive after the outside story won.

### Demo, intro, "What this adds" and "Why fabricate"

> This one is made up on purpose. The extra documents and arcs are fabricated to show what a complete Lotman semiosphere could look like once every shell, register and relay type has something in it. None of it is a count. Compare it with Figure L1, the empirical pilot.
>
> L1 is sparse by design: 13 surfaces, an empty autocommunication shell, and five traced relay arcs (two proven thematic, one verbatim outward packet, two Farisei-tier memo-claim links, so the proof tiers are mixed). The demo adds companions the dissertation expects to ingest later: autocommunication loops on shell 2 (purple), silences on Pravda and Izvestiia, a dialogue arc between spr. 1206 and CIUS 1986 (violet), a tier-A Globe clip, an exile broadcast and an MFA circular. It shows the target shape, and nothing in it comes from a file.
>
> Supervisors and readers need to see what Lotman's vocabulary looks like when it is populated, or the pilot looks like a few dots and lines. The demo answers one question: if the checklist succeeds, what shape does the evidence take? Every made-up arc uses the same relay types and the same click-panel fields as L1 (what it tells us, what it does not prove, thesis significance), so the reading habit carries over when real companions arrive.

### Embedding page (it currently has no links at all)

> Drag empty space to rotate and scroll to zoom. Click a dot (a short click, not a drag) to see its details in the panel. There is no hover picking, which keeps the camera still. Green arcs are licensed Russian to English relays, orange arcs are contrasts, purple are intersemiotic, and violet dots carry audio.
>
> Distance from the centre is the register shell, from secret at the centre to rival press at the edge. Direction on each shell comes from the theme embedding, flattened with <a class="q" data-q="method-pca">PCA</a>. You can see the bilingual filter working where green arcs jump from Russian dots on the inner shells to English dots further out and the scare-quote grammar does not come with them.

### Gallery intro and blurbs

> These four models put the dissertation's main claim into space. Soviet talking points about commemorating the famine change in predictable ways as they cross from the secret memo to the embassy and Novosti, then to domestic news and to diaspora and scholarly print. The change can be dated and counted, with Montreal 1983 as the anchor and the rewiring of the memo phrase network after 1983 as the candidate for Lotman's <a class="q" data-q="lotman-explosion">explosion</a>.
>
> Each model opens with a few paragraphs on what it means for the thesis, mostly about what the connections mean. A connection here is a pair-read with a proof tier stored in open JSON, which is a stronger thing than a line between two dots. Hover for a label. Click any dot, bar, arc or line for the full argument in the side panel, and use Hide panel (top right) to get it out of the way.

> L1: Thirteen surfaces and five traced relay arcs: two proven thematic, one verbatim outward packet, two Farisei-tier memo-claim links. Shell 2 (autocommunication) stays empty until inward CC and KGB companions arrive. Click a sky-blue arc from spr. 1206 to watch internal hostility turn into outward denial without the scare quotes. Pravda's missing arc is the domestic-silence finding. CIUS 1986 and the dialogue arcs live in L1-demo until CIUS is in the register-relay JSON.

> L1-demo: The target state, with fabricated companions: an autocommunication shell, silences, the CIUS dialogue arc, an exile broadcast. It uses the same click panels as L1, so you can see what the full checklist would produce.

> L2: Operator skew as a 3D heatmap: tall internal scare-quote towers next to flat embassy columns in the same row. There are no arcs; the connections are the comparisons you make between columns.

> L3: Phrase co-occurrence inside the fond, before and after 1983. Red lines on the upper plane are pairings that first appear after Montreal. The structure changes while the word counts barely move.

## House rules for any new figure page

- Voice: plain and a little dry, like `fig-transmission-cells.html`. Say what the figure shows and what it is for. One "Committee translation" wink per page at most.
- No em dashes, en dashes, or " - " used as a dash. Straight quotes in prose you write. Sentence-case headings.
- Every number on a page appears in its numbers table with a report key and file. If a number has no key, it doesn't go on the page.
- Every 3D page links to the hub, its 2D twin and its journal section, and says in one line what is measured and what is drawn.
- First use of a jargon word gets an `a.term`. Every mention of Lotman, or of any author, method or assumption Sean didn't supply, gets an `a.q` backed by `fig-quotes.js`.
- New pages authored in `docs/embed/` go in `PAGES_ONLY_EMBED` in the sync script and in `NAV` and `RELATED` in `site-nav.js` (paths in RELATED are from the site root).

## Done means

- `grep -rnP "\x{2014}|\x{2013}| - " docs/figures_animated_3d.html docs/embed/*-3d.html` finds nothing in visible prose.
- Every `a.term` and `a.q` resolves (file exists and the anchor exists), and no `data-q` key is missing from the registry. The browser console warns about missing keys.
- Each 3D page opens with no console errors, shows its labels, and does nothing until Play is pressed. With reduced motion switched on, Play is disabled and the page still reads correctly.
- A dry run of the sync keeps all six pilots.
- Items 1 to 6 above are settled, or still listed here as open.
