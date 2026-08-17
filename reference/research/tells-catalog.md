# Catalog of AI-Writing Tells

A ranked, sourced catalog of concrete signals that a piece of writing was
produced (or heavily assisted) by a large language model. Every tell below
is backed by at least two independent sources — never a single blogger's
pet peeve — drawn from a mix of peer-reviewed research, investigative
journalism, Wikipedia's crowd-audited editorial guidance, and detection-industry
analysis. Ranking is a rough composite of (a) strength/independence of
evidence and (b) how often the tell shows up in practice. Weaker or
contested tells are grouped at the end with the disagreement flagged
explicitly.

**A note on source tiers**, since credibility varies a lot across this
literature:

- **Tier 1 — peer-reviewed / large-scale empirical**: published journal
  articles, arXiv preprints from academic groups with quantitative corpus
  analysis (e.g., Kobak et al., the FSU "delve" paper).
- **Tier 2 — institutional journalism / vetted editorial process**: NPR,
  Forbes, The Conversation, Reuters Institute (Oxford), Wikipedia's
  community-maintained essay (built from thousands of logged real cases and
  continuously revised by editors).
- **Tier 3 — independent technical blogs**: individual practitioners
  (software engineers, professional editors) publishing original analysis
  with data, even without institutional affiliation.
- **Tier 4 — AI-detection/humanizer vendor blogs**: Pangram, GPTZero,
  DeGPT, and similar. Useful because they analyze large text corpora
  computationally, but commercially motivated to make AI text sound
  detectable, so treated as corroborating rather than primary evidence.
- **Tier 5 — SEO/marketing listicles**: lowest-credibility tier, used
  sparingly and only to show a claim has entered general circulation, never
  as a tell's sole backing.

Every tell below cites at least two sources from Tier 1–3 where possible;
Tier 4–5 sources are added as supplementary corroboration and labeled as
such.

---

## Part 1: Word- and Phrase-Level Tells

### 1. "Delve" (delve into, delves, delving)

The single most cited AI tell in existence. Usage of "delve" in scientific
abstracts and general text spiked immediately after ChatGPT's late-2022
release and has stayed elevated.

- **"Why Does ChatGPT 'Delve' So Much? Exploring the Sources of Lexical
  Overrepresentation in Large Language Models,"** Diwakar Yalpi et al.
  (Florida State University; published in *Proceedings of the 31st
  International Conference on Computational Linguistics*), [arxiv.org/html/2412.11385v1](https://arxiv.org/html/2412.11385v1)
  — *Tier 1.* Peer-reviewed computational-linguistics paper. Identifies
  "delve" among 21 "focal words," systematically rules out training-data
  and model-architecture explanations, and lands on RLHF (human raters
  preferring the word during fine-tuning) as the likeliest mechanism.
- **Kobak, González-Márquez, Horvát & Lause, "Delving into LLM-assisted
  writing in biomedical publications through excess vocabulary,"**
  *Science Advances* 11(27), 2025, [science.org/doi/10.1126/sciadv.adt3813](https://www.science.org/doi/10.1126/sciadv.adt3813)
  — *Tier 1.* Peer-reviewed, analyzed 15+ million PubMed abstracts
  (2010–2024); found "delve" and related stylistic words surged
  post-2022, estimating 13.5%+ of 2024 abstracts show LLM involvement.
- **"On-screen and now IRL: FSU researchers find evidence of ChatGPT
  buzzwords turning up in everyday speech,"** Florida State University
  News, [news.fsu.edu](https://news.fsu.edu/news/education-society/2025/08/26/on-screen-and-now-irl-fsu-researchers-find-evidence-suggesting-chatgpt-influences-how-we-speak/)
  — *Tier 2.* University press coverage of a peer-reviewed follow-up
  study finding these buzzwords ("delve," "boast," "meticulous," "swift,"
  "comprehend") now appear more often in *spoken* human language
  (podcasts, YouTube talks) too — evidence the tell is bleeding into human
  writing via imitation, which both explains why it's becoming less
  reliable over time and confirms it started as a machine signature.

**Mechanism**: The FSU paper's strongest evidence points to RLHF —
during human-feedback fine-tuning, annotators (plausibly, English-language
raters with variety-specific usage patterns) rated responses containing
these words more favorably, and the preference got baked into the model.
The paper explicitly tested and ruled out "these words are just common in
training data" as an explanation.

---

### 2. The excess-vocabulary cluster: "boast(s)," "showcase(s)," "underscore(s),"
"intricate," "meticulous," "commendable," "pivotal," "realm," "garner(ed),"
"foster(ing)," "align(s) with"

These words travel together — corpus studies find them co-occurring far
above baseline in the same LLM-influenced texts.

- **Kobak et al., *Science Advances* (2025)**, as above — *Tier 1.*
  Same study; found "meticulously" up 137%, "intricate" up 117%,
  "commendable" up 83%, "meticulous" up 59% year-over-year following
  ChatGPT's release, across a 14-million-abstract PubMed corpus.
- **"How much are LLMs changing the language of academic papers after
  ChatGPT? A multi-database and full text analysis,"** *Scientometrics*
  (Springer Nature), [link.springer.com/article/10.1007/s11192-026-05601-5](https://link.springer.com/article/10.1007/s11192-026-05601-5)
  — *Tier 1.* Peer-reviewed, independent replication across multiple
  databases; found "delve" up ~1,500%, "underscore" up ~1,000%, and
  "intricate" up ~700% between 2022–2024 — corroborating Kobak's
  magnitude with a different dataset and methodology.
- **"Delving into PubMed records: some terms in medical writing have
  drastically changed after the arrival of ChatGPT,"** medRxiv preprint,
  [medrxiv.org/content/10.1101/2024.05.14.24307373](https://www.medrxiv.org/content/10.1101/2024.05.14.24307373.full.pdf)
  — *Tier 1 (preprint).* Independent third analysis of the same
  phenomenon in medical writing specifically, reinforcing the pattern
  outside a single research group.
- **Ritesh Chugh (Associate Professor of ICT, CQUniversity Australia),
  "ChatGPT is changing the way we write. Here's how – and why it's a
  problem,"** *The Conversation*, [theconversation.com](https://theconversation.com/chatgpt-is-changing-the-way-we-write-heres-how-and-why-its-a-problem-239601)
  — *Tier 2.* Academic-editorial outlet, author-credentialed. Quotes an
  editor saying "I no longer believe there's a way to innocently use the
  word 'tapestry'" — illustrating how thoroughly these words have been
  coded as machine-generated in professional editing circles.

**Mechanism**: Same RLHF/statistical-likelihood explanation as "delve" —
these are semi-formal, faintly academic-sounding words that models default
to because they're common in the more formal registers of training data
(academic writing, journalism) and were reinforced during alignment
training, which optimizes for words annotators rate as sounding
articulate or thorough.

---

### 3. "[X] is a testament to..." / "stands as a reminder" / "serves as a testament"

- **Wikipedia:Signs of AI writing**, English Wikipedia community essay,
  [en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
  — *Tier 2.* Built and continuously revised by Wikipedia editors from
  thousands of real flagged cases of undisclosed AI content; lists
  "is a testament/reminder," "stands/serves as" among the core markers of
  what it calls "undue emphasis on significance."
- **Pangram, "Walking Through AI's Most Overused Phrases,"**
  [pangram.com/blog/walking-through-ai-phrases](https://www.pangram.com/blog/walking-through-ai-phrases)
  — *Tier 4.* Quantifies "serves as a testament" as ~4,000x more common
  in AI text than human baselines and "as a powerful reminder" as ~43,000x
  more common, drawn from Pangram's detection corpus.

**Mechanism**: Both sources link this to models defaulting to
"significance-inflation" — turning a plain statement of fact into a
statement about what the fact *means*, which pads a sentence with
apparent weight without adding information. The Wikipedia essay frames it
as models "regressing toward statistical likelihood," replacing specific
claims with generic importance-signaling because vague grandiosity is
safer (harder to be factually wrong about) than a specific claim.

---

### 4. Ornate/vague nouns: "tapestry," "landscape," "realm," "journey"

- **Wikipedia:Signs of AI writing** — *Tier 2.* Lists "tapestry" among
  its highest-confidence 2023–mid-2024 vocabulary markers, alongside
  "landscape" as part of promotional/travel-guide-register language
  ("vibrant," "rich," "nestled," "in the heart of").
- **Pangram, comprehensive guide** — *Tier 4.* Independently lists
  "tapestry," "landscape," "journey," "realm" among its "overused nouns"
  category based on frequency analysis of its detection corpus.
- **Ritesh Chugh, *The Conversation*** — *Tier 2.* Same "tapestry" editor
  quote as above, treating the word as effectively retired for careful
  writers.

**Mechanism**: These words let a model gesture at scope and depth
("explores the vast landscape of...") without committing to a specific
claim — abstraction as a hedge against being wrong, which happens to
read as padding to a human reader who wants the specific claim.

---

### 5. Copula avoidance — "serves as," "stands as," "functions as," "represents"
instead of plain "is"

- **Wikipedia:Signs of AI writing** — *Tier 2.* Documents "over 10%
  documented decrease in is/are usage in AI-generated academic writing
  since 2023," attributing it to models preferring more ornate verb
  constructions over the plain copula.
- **tropes.fyi, "AI Writing Tropes: Directory"** (community-maintained
  gist/reference, [tropes.fyi/directory](https://tropes.fyi/directory))
  — *Tier 3.* Independently names this the "'Serves As' dodge" — using
  pompous alternatives to basic copulas — as a distinct, catalogued trope.

**Mechanism**: Wikipedia's essay argues the avoidance is a byproduct of
the same significance-inflation pattern (#3): "X serves as Y" implies a
functional, purposeful relationship, which sounds more analytical than
the flat, neutral "X is Y" — even when no such relationship is being
argued for.

---

### 6. Stock transitions: "Moreover," "Furthermore," "Additionally," opening
consecutive sentences/paragraphs

- **Reuters Institute for the Study of Journalism (University of Oxford),
  "How AI-generated prose diverges from human writing and why it
  matters,"** [reutersinstitute.politics.ox.ac.uk](https://reutersinstitute.politics.ox.ac.uk/news/how-ai-generated-prose-diverges-human-writing-and-why-it-matters)
  — *Tier 2.* Academic-journalism research institute; identifies
  overuse of formal glue-words and connects it to training data skewed
  toward academic and formal registers.
- **Wikipedia:Signs of AI writing** — *Tier 2.* Separately lists
  "Additionally" as a top-tier vocabulary marker in its own
  frequency-based era breakdown (2023–mid-2024 cohort).
- **GPTZero, AI writing pattern guidance** — *Tier 4.* Names "in
  addition," "overall," and "it is important to note" as broad
  transitions its detector reacts to, corroborating the same cluster from
  a commercial-detection angle.

**Mechanism**: Reuters Institute's piece argues LLMs' training skew
toward academic papers, Wikipedia, and formal journalism means that when
a model needs to connect two ideas, it reaches for the statistically most
common connector in that register — "furthermore," "moreover" — rather
than the more varied, sometimes connector-free transitions a human writer
uses in less formal registers.

---

### 7. Hedge fillers: "It's important to note that," "It's worth noting,"
"Generally speaking"

- **Wikipedia:Signs of AI writing** — *Tier 2.* Groups "highlighting/
  underscoring/emphasizing... ensuring... reflecting" style filler under
  "superficial analysis" — present-participle phrases that create the
  appearance of synthesis without adding a real claim.
- **tropes.fyi directory** — *Tier 3.* Independently names "'It's worth
  noting': Filler transitions with no actual connective function" as a
  distinct catalogued item.
- **DeGPT, "The Ultimate ChatGPT Tells List,"**
  [degpt.app/blog/chatgpt-tells-phrases-list](https://www.degpt.app/blog/chatgpt-tells-phrases-list)
  — *Tier 4.* Independently flags "It's important to note that..." as
  "verbal filler, adds nothing," part of its removable-phrase list built
  from its detection/cleanup tool.

**Mechanism**: These phrases perform the *appearance* of epistemic care
(flagging that something is noteworthy) without doing epistemic work —
they're a hedge reflex rather than a hedge tied to actual uncertainty
about the specific claim being made.

---

### 8. Sycophantic chat-style openers: "Certainly!," "Of course!," "Great
question!," "Absolutely!"

- **CleanTextTools, "Remove ChatGPT Filler Phrases,"**
  [cleantexttools.com/remove-chatgpt-filler-phrases](https://cleantexttools.com/remove-chatgpt-filler-phrases)
  — *Tier 4.* Built as a cleanup tool specifically targeting these
  openers because of how reliably they mark ChatGPT-assisted text pasted
  without editing.
- **DeGPT, "The Ultimate ChatGPT Tells List"** — *Tier 4.* Independently
  documents the same set ("Sure! Here's...", "Certainly! I'd be happy
  to...", "Of course! Let me...") and explicitly likens the tone to
  "customer service automation."

**Mechanism**: Both sources attribute this to assistant-style RLHF
training, where responses that open with warm, deferential acknowledgment
of the user's request are consistently rated higher by human raters —
the model learns the acknowledgment is expected even when the content
that follows doesn't need it, and the pattern survives into prose the
model is asked to write in other voices.

---

### 9. Formulaic sign-offs: "I hope this helps!", "Feel free to reach out /
let me know if you need anything else"

- **CleanTextTools** — *Tier 4.* Same source as above; "I hope this
  helps!" flagged as the paradigm example of an automatic chat closer
  with no content function.
- **DeGPT, "The Ultimate ChatGPT Tells List"** — *Tier 4.* Independently
  calls it "the #1 ChatGPT signature phrase" and flags "Feel free to
  reach out if you have questions!" as unrealistic in contexts (like
  finished prose or emails) where the writer isn't actually offering an
  open-ended support channel.

**Mechanism**: Same as #8 — a conversational-assistant closing ritual
that gets carried over into contexts (essays, articles, reports) where a
sign-off addressed to "you, the reader, who might have follow-up
questions" doesn't fit the genre.

---

## Part 2: Sentence- and Rhetorical-Construction Tells

### 10. "It's not just X, it's Y" (negative parallelism / contrastive framing)

Possibly the most viscerally recognized tell of 2025–2026, per multiple
independent sources describing it as "everywhere."

- **Wikipedia:Signs of AI writing** — *Tier 2.* Documents both "not
  only X but also Y" and "not X, but Y" as catalogued patterns, explaining
  the effect as manufacturing "contrast that can feel dramatic or
  persuasive" without new information.
- **"Once You Notice ChatGPT's Weird Way of Talking, You Start to See It
  Everywhere,"** *Futurism*, [futurism.com/chatgpt-weird-way-talking-see-it-everywhere](https://futurism.com/chatgpt-weird-way-talking-see-it-everywhere)
  — *Tier 2.* Tech-news outlet reporting on the pattern's viral
  recognizability, describing it as having become a "biggest tell" in
  casual reader perception.
- **"The Seven Deadly Tells Of AI Writing,"** Charlie Fink, *Forbes*,
  [forbes.com/sites/charliefink/2025/06/12/the-seven-tells-of-ai-writing](https://www.forbes.com/sites/charliefink/2025/06/12/the-seven-tells-of-ai-writing/)
  — *Tier 2.* Names "Contrastive Rhetorical Framing" ("isn't just...
  they're") as tell #1, with the example "Amazon isn't just buying
  content. They're buying credibility" — arguing it "manufactures drama
  without substance."
- **tropes.fyi directory** — *Tier 3.* Independently catalogues
  "Negative parallelism: The 'It's not X -- it's Y' pattern repeated
  excessively" as a distinct trope.

**Mechanism**: The construction is a "contrastive reframe" — it
signposts the sentence's main point by first raising and then knocking
down a straw expectation, which reads as insight because it *mimics* the
rhetorical shape of a correction or revelation, even when no actual
misconception was in play. Multiple sources note it's efficient for a
model because it fills sentence length while foregrounding whatever claim
comes second, without requiring evidence for either half.

---

### 11. Rule-of-three / tricolon overuse (things always come in threes)

- **GPTZero, "How to Break Free from GPT's Rule of Three in Writing,"**
  [gptzero.me/news/the-rule-of-three](https://gptzero.me/news/the-rule-of-three/)
  — *Tier 4.* Detection vendor's own analysis, naming triplet phrasing
  ("clear, concise, actionable") as one of the most common patterns their
  detector flags, and noting AI "often extend[s]" the classic rule of
  three "to four or five" in a way that breaks the rhetorical device's
  original elegance.
- **Wikipedia:Signs of AI writing** — *Tier 2.* Separately documents
  "Rule of Three Overuse... Triple repetitions in 'adjective, adjective,
  adjective' format... Purpose: Makes superficial analysis appear
  comprehensive."
- **tropes.fyi directory** — *Tier 3.* Independently lists "Rule of
  Three pattern: Overextended tricolons and similar repetitive
  structures" and, separately, "Triplet framing" in Forbes's list below.
- **Charlie Fink, *Forbes*, "Seven Deadly Tells"** — *Tier 2.*
  Documents "Triplet Framing" as tell #4: "Relies on three-part
  structures with rhythmic, alliterative qualities to suggest authority...
  feel clever but lack genuine insight."

**Mechanism**: A tricolon (three-part list) is a legitimate, ancient
rhetorical device that human writers use sparingly for emphasis. Sources
converge on the idea that LLMs default to it constantly because the
pattern is statistically over-represented as "well-formed, satisfying"
phrasing in training data (it appears everywhere in professional and
marketing writing), so the model reaches for it as a default list-length
rather than a deliberate choice — producing "three items" even when two
or five would fit the actual content better.

---

### 12. Rhetorical question immediately self-answered ("What changed? The math
did.")

- **Charlie Fink, *Forbes*, "Seven Deadly Tells"** — *Tier 2.* Names
  "Asking and Answering Rhetorical Questions" as tell #2: "A human writer
  would simply state the premise directly rather than pose it as a query
  first."
- **tropes.fyi directory** — *Tier 3.* Independently catalogues "'The
  X? A Y.': Self-posed rhetorical questions answered immediately after."

**Mechanism**: Both sources treat this as a manufactured-suspense device
— it dresses up a flat declarative statement as a mini reveal, creating
a false sense of build-up and payoff in a single beat, which reads as
punchy in isolation but mechanical when repeated across a piece.

---

### 13. Vapid scene-setting openers: "In today's fast-paced world," "In the
ever-evolving landscape of..."

- **"The Field Guide to AI Slop,"** Charlie Guo,
  [ignorance.ai/p/the-field-guide-to-ai-slop](https://www.ignorance.ai/p/the-field-guide-to-ai-slop)
  — *Tier 3.* Independent technical/culture writer; catalogues "vapid
  openers" as a class, giving "As technology continues to evolve" and "In
  today's fast-paced world" as paradigm examples.
- **Pangram, comprehensive guide** — *Tier 4.* Independently flags "In
  the ever-evolving [X]" as a hollow-transition/cliché pattern in its
  detection corpus (quantified elsewhere on Pangram's site at ~11,000x
  overrepresentation vs. human baseline).
- **Wikipedia:Signs of AI writing** — *Tier 2.* Lists "evolving
  landscape" directly among its catalogued vocabulary markers.

**Mechanism**: These openers are maximally safe, generically applicable
first sentences — they commit to nothing specific about the actual topic,
which makes them a low-risk default for a model uncertain what concrete,
specific opening a human writer would choose. Multiple sources frame this
as a symptom of models regressing to the most generic plausible
completion rather than the most informative one.

---

### 14. "Despite these challenges" + silver-lining/optimistic-close formula

- **Wikipedia:Signs of AI writing** — *Tier 2.* Documents this
  explicitly as "Outline-like Challenge/Future Sections": "formulaic
  sections reading 'Despite its [positive trait], [subject] faces
  challenges...' ending with vague positive reassurance," calling out
  "Despite these challenges" as the specific watchword.
- **tropes.fyi directory** — *Tier 3.* Independently catalogues
  "'Despite its challenges...': Rigid formulas acknowledging then
  dismissing problems" as a distinct trope, separate from Wikipedia's
  observation.

**Mechanism**: Both sources describe this as a template the model falls
back into whenever a topic requires acknowledging a downside — rather
than genuinely weighing the downside, the model pivots to reassurance on
a fixed schedule (acknowledge, pivot, resolve positively), producing
structurally identical "Challenges and Future Outlook" sections across
completely unrelated topics.

---

### 15. Grandiose stakes inflation ("marks a turning point," "underscores the
importance of," legacy/significance framing on mundane subjects)

- **Wikipedia:Signs of AI writing** — *Tier 2.* Its largest single
  category ("Undue Emphasis on Significance/Legacy/Broader Trends") is
  built from thousands of logged cases where AI-written Wikipedia drafts
  inflate a subject's importance with phrases like "key turning point,"
  "shaping," "setting the stage for," "evolving landscape."
- **tropes.fyi directory** — *Tier 3.* Independently names "Grandiose
  stakes inflation: Inflating mundane arguments to world-historical
  significance" as a catalogued trope.
- **Charlie Fink, *Forbes*, "Seven Deadly Tells"** — *Tier 2.*
  Independently documents a related pattern, "The Inspirational Pivot" —
  "Shifts abruptly from specific technical discussion to abstract
  humanistic themes... elevat[ing] mundane subjects into faux-profound
  territory."

**Mechanism**: Wikipedia's essay frames this as LLMs "regressing toward
statistical likelihood" — when uncertain how significant a subject
actually is, the safest completion is a vague significance claim that's
almost impossible to verify as wrong, rather than a specific, falsifiable
claim about the subject's actual importance.

---

### 16. Vague/weasel attribution: "industry experts say," "studies show,"
"observers have noted" (without naming a source)

- **Wikipedia:Signs of AI writing** — *Tier 2.* Names this "Vague
  Attribution/Weasel Words" directly: "Industry reports," "Observers have
  cited," "Experts argue" — flagged as "attribut[ing] opinions to
  undefined authorities."
- **Charlie Fink, *Forbes*, "Seven Deadly Tells"** — *Tier 2.*
  Independently documents "Universal Authority Without Source": "Makes
  confident claims about research without identifying studies or origins
  ... launders speculation into apparent fact."
- **tropes.fyi directory** — *Tier 3.* Independently catalogues "Vague
  attributions: Invoking unnamed 'experts' and 'observers' without
  specifics."

**Mechanism**: Models can generate plausible-sounding claims far more
easily than they can produce a real, checkable citation, so they default
to attributing claims to an unspecified collective authority — sounding
sourced without being falsifiable or checkable.

---

### 17. Excessive lexical variation / synonym cycling (avoiding repeating the
same term for a fixed referent)

- **Wikipedia:Signs of AI writing** — *Tier 2.* Documents this directly:
  "avoiding word repetition through synonym substitution... Example:
  'artistic constraints,' then 'Non-conformist artists,' then 'Their
  creativity' instead of natural repetition." Links it to "repetition-
  penalty" decoding settings used in generation, and cites a documented,
  measurable increase in lexical diversity in Wikipedia's own corpus
  post-2023.
- **tropes.fyi directory** — *Tier 3.* Independently names "Synonym
  cycling: Swapping synonyms for one referent instead of using consistent
  terminology" as a distinct catalogued trope, and separately "Self-echo:
  Reusing vocabulary from earlier passages" as its opposite failure mode.

**Mechanism**: This is one of the few tells with a plausible *decoding-
parameter* explanation rather than a purely stylistic one: repetition
penalties (a real, common generation setting that discourages a model
from reusing the same token/phrase) push the model toward synonym
substitution even where a human writer would just repeat the plain term
for clarity — producing writing that reads as unnaturally thesaurus-
driven.

---

## Part 3: Punctuation Tells

### 18. Em dash overuse (—)

The most widely reported and most contested-on-mechanism (though not
contested-on-existence) tell in this catalog.

- **"Em Dashes — Useful for Writers, Overused by AI,"** *The Reporter*
  (Rochester Institute of Technology's student magazine),
  [reporter.rit.edu/7526/views/em-dashes-useful-for-writers-overused-by-ai](https://reporter.rit.edu/7526/views/em-dashes-useful-for-writers-overused-by-ai/)
  — *Tier 2.* Institutional student-journalism outlet; cites GPT-4.1
  having 3.28x higher em-dash frequency than standard human essays.
- **"Inside the unofficial movement to save the em dash — from A.I.,"**
  *NPR*, [npr.org/2025/11/10/nx-s1-5596088](https://www.npr.org/2025/11/10/nx-s1-5596088/inside-the-unofficial-movement-to-save-the-em-dash-from-a-i)
  — *Tier 2.* National broadcaster; documents the em dash becoming a
  cultural signal strong enough that writers now deliberately avoid it
  and HR teams reportedly flag it in résumés.
- **Sean Goedecke, "Why do AI models use so many em-dashes?"**,
  [seangoedecke.com/em-dashes](https://www.seangoedecke.com/em-dashes/)
  — *Tier 3.* Independent technical blog with original data analysis
  (comparing Nigerian-English corpora, historical print-book punctuation
  frequency, and GPT-3.5 vs. GPT-4o em-dash rates).
- **Lia Erisson, "Why Did LLMs Steal Our Em-Dashes?"**, McGill University
  Office for Science and Society, [mcgill.ca/oss](https://www.mcgill.ca/oss/article/critical-thinking-student-contributors-technology/why-did-llms-steal-our-em-dashes)
  — *Tier 2.* Published by an academic science-communication office
  (though written by a student contributor); independently confirms the
  overuse phenomenon.

**Mechanism — sources explicitly disagree here.** All four sources
agree the em dash is genuinely overused by AI relative to typical human
prose. They diverge sharply on *why*:
- Goedecke argues it's a **training-data era shift**: pre-2024 pirated
  book corpora skewed toward contemporary writing (which under-uses em
  dashes), but as labs ran out of fresh data they digitized older
  (1800s–1950s) print books, which used em dashes far more heavily —
  and GPT-3.5 (trained before this shift) did *not* overuse them the way
  GPT-4o does, which he argues undercuts the RLHF/annotator-preference
  theory.
- McGill's OSS piece and the RIT Reporter piece instead favor an
  **RLHF/clarity-reinforcement** explanation: annotators reward clear,
  well-paced explanatory prose, and em dashes are an efficient tool for
  that, so the preference gets reinforced during alignment regardless of
  base training-data frequency.
- This is a case where the *tell itself* is extremely well-corroborated
  but the *causal story* is genuinely unsettled and worth flagging as
  such rather than repeating one explanation as settled fact.

---

### 19. Semicolon usage — contested direction of the signal

This tell is included specifically because sources **disagree on which
way the signal points**, which is itself useful information.

- **Sam Woolfe, "Has AI Spoiled the Use of the Em Dash and Semicolon?"**,
  [samwoolfe.com](https://www.samwoolfe.com/2026/03/ai-use-of-em-dash-semicolon.html)
  — *Tier 3.* Independent writer; argues AI shows semicolon *avoidance*
  in casual/conversational output but semicolon *overuse* specifically in
  formal/academic-register output, because those models were trained
  heavily on academic writing that itself overuses semicolons.
- **Wordsmith HK, "How to easily tell if content is written by AI,"**
  [wordsmith.hk](http://wordsmith.hk/wordwise-blog/2024/5/29/how-to-easily-tell-if-content-is-written-by-ai)
  — *Tier 3.* Professional copywriting/speechwriting consultancy blog;
  argues the opposite — that AI output under-uses "outdated" punctuation
  like semicolons and colons relative to how a careful human editor would,
  in the specific context of conversational marketing copy.
- **Pangram, comprehensive guide** — *Tier 4.* Sides with the avoidance
  camp: "Rare semicolons and parentheses: Machine text avoids these
  marks, showing mechanical sentence construction."

**Verdict**: Treat semicolon frequency as **register-dependent and not
a reliable standalone signal** — the disagreement across sources tracks
a real underlying split between formal/academic AI output (semicolon-
heavy, inherited from academic training data) and conversational/
marketing AI output (semicolon-light). Note this explicitly rather than
listing semicolons as a clean tell.

---

### 20. Curly/smart quotation marks and apostrophes instead of straight marks

- **Wikipedia:Signs of AI writing** — *Tier 2.* Lists "Curly Quotation
  Marks and Apostrophes" directly as a markup-level tell specific to
  content pasted from a chat interface into a plain-text context (like
  wikitext), where straight quotes are the convention.
- **Leap AI, "AI Text Formatter — Remove Em-Dashes, Smart Quotes, and
  ChatGPT Artifacts,"** [tryleap.ai/tools/ai-text-formatter](https://www.tryleap.ai/tools/ai-text-formatter)
  — *Tier 4.* A purpose-built tool whose entire function is stripping
  curly quotes, em dashes, and markdown bold/italic markers specifically
  because they're recognized ChatGPT output artifacts.

**Mechanism**: This is less a stylistic tell than a **provenance
artifact** — chat interfaces render typographically "smart" punctuation
by default, and text copy-pasted directly out of ChatGPT/Claude carries
that formatting into contexts (Wikipedia wikitext, plain-text email,
straight-quote house styles) where it stands out as obviously
copy-pasted rather than natively typed.

---

## Part 4: Structural and Formatting Tells

### 21. Title Case Section Headers (Capitalizing Every Word Like This)

- **Wikipedia:Signs of AI writing** — *Tier 2.* Explicitly contrasts
  this with Wikipedia's sentence-case convention for headers, flagging
  Title Case headings as a routine AI tell in flagged drafts.
- **Deborah MT, "Title Case is your accidental AI tell,"**
  [deborahmt.medium.com](https://deborahmt.medium.com/title-case-is-your-accidental-ai-tell-2e83bbe46fe3)
  — *Tier 3.* Independent creative strategist (Ph.D., Computing Arts &
  Design); argues title-case headers "make writing look like it's trying
  too hard" and specifically critiques the "capitals give emphasis"
  justification as unpersuasive.
- **tropes.fyi directory** — *Tier 3.* Independently catalogues "Title
  case headings: Capitalizing every word instead of standard case" as a
  distinct formatting trope.

**Mechanism**: Chat assistants default to a marketing/listicle house
style (title case, like a blog post or slide deck) regardless of the
target genre, because that's the dominant convention in the web content
their formatting habits were shaped by — it reads as artificial mainly
by genre mismatch, not because title case is inherently wrong.

---

### 22. Bold-lead-in bullet stacks ("**Term:** explanation" repeated as a list)

- **"How list formatting makes ChatGPT-style writing easy to spot,"**
  *Popular AI*, [popularai.org](https://www.popularai.org/p/how-list-formatting-makes-chatgpt-style-writing-easy-to-spot)
  — *Tier 3.* Independent AI-culture newsletter; identifies the specific
  pattern — "a bullet-point stack with a bold mini-heading, a colon, and
  a tidy explanation underneath" — as one editors now spot on sight.
- **Charlie Guo, "The Field Guide to AI Slop"** — *Tier 3.* Independently
  documents "excessive bullet points" and unmotivated bolding as a
  distinct AI tell, particularly noting GPT-4o exhibits this more than
  earlier models.
- **Wikipedia:Signs of AI writing** — *Tier 2.* Documents the same
  structural pattern from a different angle: "Inline-Header Vertical
  Lists: Header followed immediately by bulleted list with no
  introductory text" and "Overuse of Boldface."

**Mechanism**: Popular AI's piece traces this to RLHF: annotators rate
responses containing bullet points and bold formatting as more helpful/
scannable on average, which reinforces list-formatting regardless of
whether the content is actually list-shaped — producing lists in place
of connected argument even in genres (essays, narrative) where a human
writer would build a paragraph instead.

---

### 23. Uniform paragraph length / low "burstiness" (unnaturally consistent
sentence-length rhythm)

- **GPTZero, AI writing-pattern guidance** — *Tier 4.* States plainly
  that "humans rarely write content where every sentence or paragraph is
  perfectly uniform in length or structure, while only AI tends to do
  that consistently," describing this as a core signal their detector
  measures.
- **Pangram, comprehensive guide** — *Tier 4.* Independently documents
  "Uniform paragraph length: Very organized paragraphs that are all about
  the same length" and "Uniform sentence rhythm... sentences are
  monotonous and do not vary much in length or style" as separate,
  corroborating observations.
- **Charlie Guo, "The Field Guide to AI Slop"** — *Tier 3.* Independently
  names "Monotony... uniform sentence lengths and paragraph rhythm...
  rarely switches between person/tense naturally" as a distinct
  structural tell.

**Mechanism**: This connects to the formal "perplexity/burstiness"
framework used by AI detectors: because next-token prediction tends
toward the statistically likely continuation at every point, generated
text has lower variance in sentence length and structural complexity than
human writing, where sentence length varies more because human writers
mix short punchy sentences with long complex ones somewhat
unpredictably. Multiple detection-tool explainers (QuillBot, TryLeap)
independently describe burstiness as one of the two classic detection
signals alongside perplexity, though note it also produces false
positives on formal/non-native human writing — a caveat worth carrying
into any practical use of this signal.

---

### 24. Signposted, restating conclusions ("In conclusion," "Overall," "To sum
up" followed by a recap of everything already said)

- **GPTZero, "How to Break Free from GPT's Rule of Three"** — *Tier 4.*
  Explicitly argues "competent writing doesn't need to tell you it's
  concluding — it's organic," framing explicit conclusion-signposting as
  a tell that the writer (the model) is following a template rather than
  landing a real point.
- **Pangram, comprehensive guide** — *Tier 4.* Independently documents
  "Formulaic conclusions: The conclusion is often very long, starts with
  'Overall,' or 'In Conclusion', or 'In summary', and repeats most of
  what was already written."
- **tropes.fyi directory** — *Tier 3.* Independently catalogues
  "Signposted conclusion: Explicitly announcing 'In conclusion' rather
  than landing organically" as well as the related "Fractal summaries:
  Restating arguments at every hierarchical level" and "The Tie-Back:
  Closing by restating answers already given."

**Mechanism**: All three sources converge on the same explanation —
models are trained heavily on formats (essays, reports, structured
answers) where an explicit "in conclusion" signal is pedagogically
expected, so the model produces the signpost as a genre reflex rather
than because the content actually needs framing at that point.

---

### 25. Perfect, uniform grammar with no contractions or sentence fragments

- **Pangram, comprehensive guide** — *Tier 4.* Documents this directly:
  "It is very rare for AI to make spelling errors," text "avoids
  fragment[s], run-ons, starting sentences with 'And' or 'But,'" and
  "Machine writing rarely uses 'we've' or similar compressed forms" —
  contrasted with human writing's "occasional grammatical imperfection."
- **Reuters Institute (Oxford), "How AI-generated prose diverges from
  human writing"** — *Tier 2.* Independently documents the same pattern
  from an academic-journalism angle: AI systems "avoid slang and
  contractions ('gonna,' 'wanna'), minimize colloquial language, and
  reduce passive voice usage" relative to comparable human text.

**Mechanism**: Both sources link this to RLHF optimizing for a
consistently "professional," formally correct register by default — the
model isn't actually incapable of contractions or fragments, but its
default completions skew toward the more careful, textbook-correct
register that alignment training rewards, unless a casual voice is
explicitly requested.

---

### 26. Emoji or Unicode characters used as structural/formatting devices
(section dividers, bullet substitutes, decorative arrows)

- **Wikipedia:Signs of AI writing** — *Tier 2.* Documents "Emoji as
  Formatting: Using emoji for visual separation or emphasis instead of
  proper Wikipedia formatting" as a distinct catalogued tell.
- **Charlie Guo, "The Field Guide to AI Slop"** — *Tier 3.* Independently
  documents "Unicode characters for styling (𝗯𝗼𝗹𝗱, 𝘪𝘵𝘢𝘭𝘪𝘤, arrows →,
  multiplication ×)" and emoji-led bullet lists "especially in
  professional contexts" as a separate, corroborating tell, specifically
  noting GPT-4o does this more than predecessor models.

**Mechanism**: Chat interfaces render emoji and Unicode symbols cleanly
and models have learned these are rated as friendly/scannable in
assistant-style responses; the habit transfers into written genres
(professional documents, articles) where such decoration reads as
conspicuously informal or gimmicky relative to the surrounding register.

---

### 27. False-balance / generic hedging regardless of actual evidence weight
("on one hand... on the other hand...", inserting a caveat even when the
evidence clearly leans one way)

Included last, and flagged explicitly, because the evidence here is
genuinely mixed and weaker than the rest of this catalog.

- **"Hedges and Boosters in AI and Human Writing: A Comparative
  Analysis,"** *KNOWLEDGE – International Journal*, 65(5), 2024,
  [ojs.ikm.mk/index.php/kij/article/view/6979](https://ojs.ikm.mk/index.php/kij/article/view/6979)
  — *Tier 1 (peer-reviewed, smaller regional journal).* Found AI text
  used hedges like "may" at high frequency but almost never used
  boosters ("clearly," "definitely," "certainly") relative to human
  comparison text — i.e., AI writing hedges more and asserts less.
- **Amirjalili, Neysani & Nikbakht, "Exploring the boundaries of
  authorship: a comparative analysis of AI-generated text and human
  academic writing,"** *Frontiers in Education*, March 2024,
  [frontiersin.org/journals/education/articles/10.3389/feduc.2024.1347421](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1347421/full)
  — *Tier 1 (peer-reviewed).* In this single-essay case-study comparison,
  found the **opposite** direction: the human student text used *more*
  hedges (12 vs. 7) and *more* boosters (7 vs. 5) than ChatGPT's version,
  i.e., ChatGPT read as more confidently assertive, not less, in that
  sample.

**Sources explicitly disagree here.** The two peer-reviewed studies
point in opposite directions on whether AI hedges more or less than
humans, likely because hedging behavior is highly sensitive to genre,
prompt, and sample size (the Frontiers study is a single-essay
comparison; the KNOWLEDGE journal study used a larger, though still
modest, corpus). **This tell should be treated as unreliable as a
standalone signal** — worth knowing the pattern exists in the literature,
but not worth relying on the way "delve" or em-dash frequency can be
relied on.

---

## Summary Table

| # | Tell | Category | Corroborating sources | Consensus strength |
|---|------|----------|----------------------|---------------------|
| 1 | "Delve" | Word | FSU/ACL paper, Kobak *Sci. Adv.*, FSU News | Very strong |
| 2 | boast/showcase/underscore/intricate/meticulous/commendable/pivotal/realm/garner/foster/align cluster | Word | Kobak *Sci. Adv.*, *Scientometrics*, medRxiv, The Conversation | Very strong |
| 3 | "testament to" / "stands as a reminder" | Phrase | Wikipedia, Pangram | Strong |
| 4 | "tapestry" / "landscape" / "realm" / "journey" | Word | Wikipedia, Pangram, The Conversation | Strong |
| 5 | Copula avoidance ("serves as" not "is") | Phrase | Wikipedia, tropes.fyi | Moderate |
| 6 | Stock transitions (moreover/furthermore/additionally) | Phrase | Reuters Institute, Wikipedia, GPTZero | Strong |
| 7 | "it's important/worth noting" hedge filler | Phrase | Wikipedia, tropes.fyi, DeGPT | Moderate |
| 8 | Sycophantic openers ("Certainly!", "Great question!") | Phrase | CleanTextTools, DeGPT | Moderate (vendor-only) |
| 9 | "I hope this helps!" sign-off | Phrase | CleanTextTools, DeGPT | Moderate (vendor-only) |
| 10 | "It's not X, it's Y" | Construction | Wikipedia, Futurism, Forbes, tropes.fyi | Very strong |
| 11 | Rule-of-three / tricolon overuse | Construction | GPTZero, Wikipedia, Forbes, tropes.fyi | Strong |
| 12 | Rhetorical question, self-answered | Construction | Forbes, tropes.fyi | Moderate |
| 13 | "In today's fast-paced world" / vapid openers | Construction | ignorance.ai, Pangram, Wikipedia | Strong |
| 14 | "Despite these challenges" + silver lining | Structure | Wikipedia, tropes.fyi | Moderate |
| 15 | Grandiose stakes inflation | Construction | Wikipedia, Forbes, tropes.fyi | Strong |
| 16 | Vague/weasel attribution ("experts say") | Construction | Wikipedia, Forbes, tropes.fyi | Strong |
| 17 | Synonym cycling / excess lexical variation | Construction | Wikipedia, tropes.fyi | Moderate |
| 18 | Em dash overuse | Punctuation | RIT Reporter, NPR, Goedecke, McGill OSS | Very strong (mechanism contested) |
| 19 | Semicolon frequency | Punctuation | samwoolfe.com, Wordsmith HK, Pangram | Contested — direction disputed |
| 20 | Curly/smart quotes | Punctuation | Wikipedia, TryLeap | Moderate |
| 21 | Title Case headers | Formatting | Wikipedia, Deborah MT, tropes.fyi | Strong |
| 22 | Bold-lead-in bullet stacks | Formatting | Popular AI, ignorance.ai, Wikipedia | Strong |
| 23 | Uniform paragraph length / low burstiness | Formatting | GPTZero, Pangram, ignorance.ai | Strong |
| 24 | Signposted restating conclusions | Formatting | GPTZero, Pangram, tropes.fyi | Strong |
| 25 | Perfect grammar, no contractions/fragments | Style | Pangram, Reuters Institute | Moderate |
| 26 | Emoji/Unicode as structural device | Formatting | Wikipedia, ignorance.ai | Moderate |
| 27 | False-balance/generic hedging | Construction | *KNOWLEDGE* journal, *Frontiers in Education* | Weak — sources disagree on direction |

---

## Key sources referenced throughout (full citations)

- **Wikipedia:Signs of AI writing** — English Wikipedia community essay.
  <https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing>
- Yalpi et al., "Why Does ChatGPT 'Delve' So Much? Exploring the Sources
  of Lexical Overrepresentation in Large Language Models," Florida State
  University / ACL 2025. <https://arxiv.org/html/2412.11385v1>
- Kobak, González-Márquez, Horvát, Lause, "Delving into LLM-assisted
  writing in biomedical publications through excess vocabulary," *Science
  Advances* 11(27), 2025. <https://www.science.org/doi/10.1126/sciadv.adt3813>
- "How much are LLMs changing the language of academic papers after
  ChatGPT?," *Scientometrics* (Springer Nature).
  <https://link.springer.com/article/10.1007/s11192-026-05601-5>
- "Delving into PubMed records: some terms in medical writing have
  drastically changed after the arrival of ChatGPT," medRxiv.
  <https://www.medrxiv.org/content/10.1101/2024.05.14.24307373.full.pdf>
- Ritesh Chugh, "ChatGPT is changing the way we write. Here's how – and
  why it's a problem," *The Conversation*.
  <https://theconversation.com/chatgpt-is-changing-the-way-we-write-heres-how-and-why-its-a-problem-239601>
- Reuters Institute for the Study of Journalism (Oxford), "How
  AI-generated prose diverges from human writing and why it matters."
  <https://reutersinstitute.politics.ox.ac.uk/news/how-ai-generated-prose-diverges-human-writing-and-why-it-matters>
- Charlie Fink, "The Seven Deadly Tells Of AI Writing," *Forbes*.
  <https://www.forbes.com/sites/charliefink/2025/06/12/the-seven-tells-of-ai-writing/>
- "Once You Notice ChatGPT's Weird Way of Talking, You Start to See It
  Everywhere," *Futurism*.
  <https://futurism.com/chatgpt-weird-way-talking-see-it-everywhere>
- "Em Dashes — Useful for Writers, Overused by AI," *The Reporter* (RIT).
  <https://reporter.rit.edu/7526/views/em-dashes-useful-for-writers-overused-by-ai/>
- "Inside the unofficial movement to save the em dash — from A.I.," NPR.
  <https://www.npr.org/2025/11/10/nx-s1-5596088/inside-the-unofficial-movement-to-save-the-em-dash-from-a-i>
- Sean Goedecke, "Why do AI models use so many em-dashes?"
  <https://www.seangoedecke.com/em-dashes/>
- Lia Erisson, "Why Did LLMs Steal Our Em-Dashes?," McGill University
  Office for Science and Society.
  <https://www.mcgill.ca/oss/article/critical-thinking-student-contributors-technology/why-did-llms-steal-our-em-dashes>
- Sam Woolfe, "Has AI Spoiled the Use of the Em Dash and Semicolon?"
  <https://www.samwoolfe.com/2026/03/ai-use-of-em-dash-semicolon.html>
- Wordsmith HK, "How to easily tell if content is written by AI."
  <http://wordsmith.hk/wordwise-blog/2024/5/29/how-to-easily-tell-if-content-is-written-by-ai>
- Deborah MT, "Title Case is your accidental AI tell."
  <https://deborahmt.medium.com/title-case-is-your-accidental-ai-tell-2e83bbe46fe3>
- "How list formatting makes ChatGPT-style writing easy to spot,"
  *Popular AI*.
  <https://www.popularai.org/p/how-list-formatting-makes-chatgpt-style-writing-easy-to-spot>
- Charlie Guo, "The Field Guide to AI Slop."
  <https://www.ignorance.ai/p/the-field-guide-to-ai-slop>
- tropes.fyi, "AI Writing Tropes: Directory" (community reference).
  <https://tropes.fyi/directory>
- Pangram, "Walking Through AI's Most Overused Phrases."
  <https://www.pangram.com/blog/walking-through-ai-phrases>
- Pangram, "Comprehensive Guide to Spotting AI Writing Patterns."
  <https://www.pangram.com/blog/comprehensive-guide-to-spotting-ai-writing-patterns>
- GPTZero, "How to Break Free from GPT's Rule of Three in Writing."
  <https://gptzero.me/news/the-rule-of-three/>
- DeGPT, "The Ultimate ChatGPT Tells List: 50+ Phrases That Reveal AI
  Usage." <https://www.degpt.app/blog/chatgpt-tells-phrases-list>
- CleanTextTools, "Remove ChatGPT Filler Phrases."
  <https://cleantexttools.com/remove-chatgpt-filler-phrases/>
- Leap AI, "AI Text Formatter — Remove Em-Dashes, Smart Quotes, and
  ChatGPT Artifacts." <https://www.tryleap.ai/tools/ai-text-formatter>
- "Hedges and Boosters in AI and Human Writing: A Comparative Analysis,"
  *KNOWLEDGE – International Journal* 65(5), 2024.
  <https://ojs.ikm.mk/index.php/kij/article/view/6979>
- Amirjalili, Neysani, Nikbakht, "Exploring the boundaries of authorship:
  a comparative analysis of AI-generated text and human academic writing
  in English literature," *Frontiers in Education*, 2024.
  <https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1347421/full>

---

## Notes on what's deliberately excluded

- **AI self-referential leakage** ("As an AI language model, I cannot...")
  was found well-documented (Pangram quantifies it at up to 294,000x
  overrepresentation) but excluded from the main ranked list because it's
  a refusal/disclosure artifact rather than a tell that shows up in
  finished, edited prose — not useful for a "does this reads like AI"
  audit of a completed piece of writing, only for catching obviously
  unedited pastes.
- **Fabricated citations/hallucinated sources** are a real and
  well-documented AI signature (Forbes's "Unattributed Quotations" tell,
  Wikipedia's citation-issues section) but were judged out of scope here
  since they're a factual-accuracy problem rather than a *style* tell —
  they don't make writing *read* as AI-generated the way a phrase or
  structural habit does.
- Several SEO/marketing listicle sites (HumanizeThisAI, Embryo,
  ContentBeta, Tenorshare) surfaced repeatedly across searches with
  overlapping word lists. They were used only as tertiary, non-cited
  color where they corroborated Tier 1–3 findings, never as sole backing
  for any tell, per the credibility-tiering approach above.
