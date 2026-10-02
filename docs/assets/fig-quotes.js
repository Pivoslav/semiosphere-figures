/* Source quotations behind claims on the figure pages, keyed by id.
   Used by fig-terms.js: <a class="q" data-q="lotman-round-trip" href="...">...</a>

   Rules for this file:
   - "quote" entries are copied verbatim from the research journal
     (theory/LOTMAN_INTERPRETATION.html), including its tier and its
     "verify wording" notes. Do not tidy the wording here; fix it in the
     journal against the edition first, then copy it back.
   - "paraphrase" entries are the journal's own summaries of a passage.
     They are shown as paraphrase. Replace with an exact quotation (and
     change kind to "quote") once the passage is checked in the edition.
   - "method" entries cite the origin of a measure or technique the
     pages use. Each one was checked against the publisher record.
   Paths in "where" are relative to docs/. */
window.FIG_QUOTES = {
  "lotman-boundary": {
    kind: "quote", who: "Juri Lotman",
    text: "The boundary of semiotic space is the most important functional and structural position, giving substance to its semiotic mechanism. The boundary is a bilingual mechanism, translating external communications into the internal language of the semiosphere and vice versa.",
    source: "Juri Lotman, \"On the Semiosphere\" (1984), trans. Wilma Clark, Sign Systems Studies 33, no. 1 (2005).",
    tier: "B", note: "Verify clause order against the Clark translation.",
    where: "theory/LOTMAN_INTERPRETATION.html#s1"
  },
  "lotman-own-their": {
    kind: "quote", who: "Juri Lotman",
    text: "Every culture begins by dividing the world into ‘its own’ internal space and ‘their’ external space.",
    source: "Juri Lotman, Universe of the Mind: A Semiotic Theory of Culture (1990), trans. Ann Shukman, section \"The Notion of Boundary.\"",
    tier: "A", note: "",
    where: "theory/LOTMAN_INTERPRETATION.html#s3"
  },
  "lotman-explosion": {
    kind: "quote", who: "Juri Lotman",
    text: "The moment of explosion is the moment of unpredictability.",
    source: "Juri Lotman, Culture and Explosion (1992), trans. Wilma Clark (Berlin: Mouton de Gruyter, 2009).",
    tier: "B", note: "Verify wording. The surrounding argument contrasts gradual with explosive processes and locates unpredictability at the moment of change.",
    where: "theory/LOTMAN_INTERPRETATION.html#s4"
  },
  "lotman-thinking-translation": {
    kind: "quote", who: "Juri Lotman",
    text: "The elementary act of thinking is translation.",
    source: "Juri Lotman, Universe of the Mind: A Semiotic Theory of Culture (1990), trans. Ann Shukman.",
    tier: "A", note: "",
    where: "theory/LOTMAN_INTERPRETATION.html#s5"
  },
  "lotman-semiosis-unit": {
    kind: "quote", who: "Juri Lotman",
    text: "The unit of semiosis, the smallest functioning mechanism, is not the separate language but the whole semiotic space of the culture in question.",
    source: "Juri Lotman, \"On the Semiosphere\" (1984), trans. Wilma Clark, Sign Systems Studies 33, no. 1 (2005).",
    tier: "B", note: "Verify wording.",
    where: "theory/LOTMAN_INTERPRETATION.html#s6"
  },
  "lotman-excludes-new": {
    kind: "quote", who: "Juri Lotman",
    text: "not only does not explain, but also directly excludes, the possibility of the production of new messages within the addresser-addressee chain",
    source: "Juri Lotman, \"Culture as Collective Intellect and the Problems of Artificial Intelligence,\" trans. Ann Shukman, in Dramatic Structure: Poetic and Cognitive Semantics, ed. Lawrence Michael O'Toole and Ann Shukman, Russian Poetics in Translation 6 (Oxford: Holdan Books, 1979), 84-96.",
    tier: "B", note: "Verify wording against Shukman.",
    where: "theory/LOTMAN_INTERPRETATION.html#s13"
  },
  "lotman-metatexts": {
    kind: "quote", who: "Juri Lotman",
    text: "an exchange of metatexts, of codes, which are transmitted from one \"hemisphere\" of culture to another",
    source: "Juri Lotman, \"Asimmetriya i dialog,\" Trudy po znakovym sistemam 16, Tekst i kul’tura (Tartu, 1983): 15-30, printed p. 28.",
    tier: "B", note: "English rendering by the author of this site from the Russian scan.",
    where: "embed/fig-transmission-cells.html#t2"
  },
  "lotman-two-generators": {
    kind: "paraphrase", who: "Juri Lotman",
    text: "Culture is a minimally two-channel structure linking raznostrukturnye semiotic generators, generators that are differently structured.",
    source: "Juri Lotman, \"Asimmetriya i dialog,\" Trudy po znakovym sistemam 16, Tekst i kul’tura (Tartu, 1983): 15-30, printed p. 26.",
    tier: "B", note: "The Russian term is Lotman's; the English rendering is the site author's.",
    where: "theory/LOTMAN_INTERPRETATION.html#s13"
  },
  "lotman-semiotic-person": {
    kind: "paraphrase", who: "Juri Lotman",
    text: "The other is necessary precisely because it gives a different model of the same reality, a different modelling language, and a different transformation of the same text; a thinking device must itself be a semiotic person and needs another semiotic person.",
    source: "Juri Lotman, \"Mozg - tekst - kul’tura - iskusstvennyj intellekt,\" Semiotika i informatika 17 (1981): 3-17, consulted via Rinaldo Acosta's Spanish translation, \"Cerebro-texto-cultura-inteligencia artificial,\" Semiosfera: humanidades-tecnologias (UC3M), no. 2 (1994): 73-100, at 98-99.",
    tier: "B", note: "No English translation located; renderings are the site author's. The journal records a divergence from the volume number often cited secondhand.",
    where: "theory/LOTMAN_INTERPRETATION.html#s13"
  },
  "lotman-two-channels": {
    kind: "paraphrase", who: "Juri Lotman",
    text: "In the I-I channel the message does not transmit new information to another party; it is reformulated and acquires new meaning for the sender, whose self-organisation is the actual output of the act.",
    source: "Juri Lotman, Universe of the Mind: A Semiotic Theory of Culture (1990), trans. Ann Shukman, chapter on autocommunication and the two communicative models.",
    tier: "C", note: "Concept is Lotman's; the formulation is the journal's.",
    where: "theory/LOTMAN_INTERPRETATION.html#s5"
  },
  "lotman-presemiotic": {
    kind: "paraphrase", who: "Juri Lotman",
    text: "He describes a recipient valued for transparency, for adding nothing of its own.",
    source: "Juri Lotman, Universe of the Mind: A Semiotic Theory of Culture (1990), trans. Ann Shukman, autocommunication chapter (I-I vs I-s/he vs binding).",
    tier: "A", note: "Verify wording.",
    where: "theory/LOTMAN_INTERPRETATION.html#s15"
  },
  "lotman-round-trip": {
    kind: "paraphrase", who: "Juri Lotman",
    text: "For an artificial language, translating a text out and back returns the original, which is why within logic you cannot say anything new. For a creative system the reverse translation does not return the input; there is instead a space of interpretations, and the transformation is asymmetrical.",
    source: "Juri Lotman, Universe of the Mind: A Semiotic Theory of Culture, trans. Ann Shukman (Bloomington: Indiana University Press, 1990), chapter on the three functions of the text.",
    tier: "A", note: "Verify wording.",
    where: "theory/LOTMAN_INTERPRETATION.html#s14"
  },
  "lotman-colour": {
    kind: "paraphrase", who: "Juri Lotman",
    text: "A language of distinctions is worked out, passes across as code, and the receiver then sees shades of the colour range it previously could not distinguish.",
    source: "Juri Lotman, \"Asimmetriya i dialog,\" Trudy po znakovym sistemam 16, Tekst i kul’tura (Tartu, 1983): 15-30, printed p. 18.",
    tier: "B", note: "Rendering by the site author from the Russian scan.",
    where: "theory/LOTMAN_INTERPRETATION.html#s13"
  },
  "method-jaccard": {
    kind: "method", who: "Paul Jaccard",
    text: "The Jaccard index of two sets is the size of their overlap divided by the size of their union. Token Jaccard on this site compares the word tokens of the original stretch with those of the returned text.",
    source: "Paul Jaccard, \"The Distribution of the Flora in the Alpine Zone,\" New Phytologist 11, no. 2 (1912): 37-50, https://doi.org/10.1111/j.1469-8137.1912.tb05611.x.",
    tier: "", note: "",
    where: "theory/LOTMAN_INTERPRETATION.html#s14"
  },
  "method-sbert": {
    kind: "method", who: "Nils Reimers and Iryna Gurevych",
    text: "Sentence-Transformers encodes a sentence by running it through a transformer and averaging the token vectors into one fixed-length fingerprint. The site uses the frozen checkpoint paraphrase-multilingual-MiniLM-L12-v2.",
    source: "Nils Reimers and Iryna Gurevych, \"Sentence-BERT: Sentence Embeddings Using Siamese BERT-Networks,\" in Proceedings of the 2019 Conference on Empirical Methods in Natural Language Processing and the 9th International Joint Conference on Natural Language Processing (EMNLP-IJCNLP) (Hong Kong: Association for Computational Linguistics, 2019), 3982-92.",
    tier: "", note: "Citation as given in the site's language-encoding appendix.",
    where: "theory/appendix_language_encoding.html"
  },
  "method-golden-angle": {
    kind: "method", who: "H. Vogel",
    text: "Turning by the golden angle, \u03c0(3 \u2212 \u221a5) radians or about 137.5 degrees, between successive points spreads them evenly without lining them up. Vogel used it to model sunflower seeds; the L1 page wraps the same rule onto a sphere.",
    source: "H. Vogel, \"A Better Way to Construct the Sunflower Head,\" Mathematical Biosciences 44 (1979): 179-89, https://doi.org/10.1016/0025-5564(79)90080-4.",
    tier: "", note: "",
    where: ""
  },
  "method-pca": {
    kind: "method", who: "Karl Pearson",
    text: "Principal component analysis finds the few directions along which a cloud of points spreads the most, so high-dimensional vectors can be drawn on two or three axes.",
    source: "Karl Pearson, \"On Lines and Planes of Closest Fit to Systems of Points in Space,\" Philosophical Magazine, 6th ser., 2, no. 11 (1901): 559-72, https://doi.org/10.1080/14786440109462720.",
    tier: "", note: "",
    where: "theory/appendix_language_encoding.html"
  }
};
