# What Makes Prose Read as Human-Written: Editorial and Practitioner Guidance

Research compiled 2026-08-18. This document surveys well-regarded editorial and practitioner sources on two related questions: (1) what specifically marks prose as AI-generated ("AI tells"), and (2) what positive craft habits make prose read as authentically human (specificity, voice, rhythm, sincerity). Sources are quoted directly where possible, with credibility notes.

## Contents

- Part 1: Wikipedia's "Signs of AI Writing" (content, language/grammar,
  formatting, meta indicators; the essay's own caveats)
- Part 2: Classic prose style guides (Orwell; Strunk & White;
  Hemingway App)
- Part 3: Journalism/editing outlets on LLM prose (The Atlantic; Dreyer;
  Purohit; Forbes; Poynter; Ted Chiang)
- Synthesis: tells to avoid vs. craft to pursue

---

## Part 1: Wikipedia's "Signs of AI Writing" (WP:AICLEANUP)

**Source:** [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), an editorial essay maintained collaboratively by Wikipedia editors as part of the encyclopedia's content-integrity project.

**Credibility note:** Not a peer-reviewed academic source, but the single most systematically maintained, continuously updated, crowd-tested taxonomy of AI-writing tells in existence. It is built from thousands of real cleanup cases across Wikipedia's New Pages Patrol and AfC (Articles for Creation) review process, cross-referenced against known LLM output, and revised as models change. Because it is maintained by editors who deal with this at high volume and must justify judgments to a community, it is unusually rigorous for a "how to spot AI text" resource. It's the closest thing to a field manual that exists.

This is the most exhaustive taxonomy available and repays reading in full. It's organized into content-level, language/grammar, formatting, and meta-level indicators, followed by explicit caveats about detection reliability.

### Content-level indicators

**Undue emphasis on significance and legacy.** AI-generated prose inflates the importance of routine facts by wrapping them in significance-language: "stands/serves as," "is a testament/reminder," "plays a crucial/pivotal/vital/significant/key role," "underscores the importance," "reflects broader [trends]," "symbolizing ongoing/enduring [themes]," "sets the stage for," "marks/shapes," "represents a shift," "a key turning point," "the evolving landscape," "a focal point," "left an indelible mark," "deeply rooted in." The essay's example: describing the founding of a routine regional statistics office as having "represented a significant shift toward regional statistical independence." The tell isn't the vocabulary alone — it's the reflex to editorialize significance onto mundane facts rather than simply stating them.

**Canned notability and attribution emphasis.** Chatbots list what kind of press covered a subject ("independent coverage," "local/regional/national media outlets," "trade publications," "profiled in") as though checking boxes against a notability rubric, and treat "an active social media presence" as a meaningful biographical fact. Example flagged in the essay: "She spoke about AI on CNN, and was featured in Vogue, Wired, Toronto Star": a flat, undifferentiated list of outlet names standing in for actual reporting of what was said or why it mattered.

**Superficial analysis via participial tacked-on clauses.** AI attaches shallow "analysis" to a fact using a dangling "-ing" clause: "emphasizing," "underscoring," "highlighting," "enhancing," "fostering," "cultivating," "ensuring," "reflecting," "contributing to," "encompassing." Example: a mundane population statistic gets dressed up as "with its coastal charm and convenient location, Douera captivates both residents and visitors alike, offering a diverse range of experiences." The participial clause performs the appearance of insight without adding information.

**Promotional/advertisement language ("word salad").** Travel-brochure and press-release vocabulary bleeds into ostensibly neutral text even when the model is explicitly told to be encyclopedic: "boasts a," "vibrant," "rich," "profound," "showcasing," "exemplifies," "commitment to," "natural beauty," "nestled," "in the heart of," "groundbreaking," "renowned," "featuring," "diverse array." Flagship example: "Nestled within the breathtaking region of Gonder in Ethiopia, Alamata Raya Kobo stands as a vibrant town with a rich cultural heritage," applied to what should be a plain geographic stub. The essay notes a chronology here: earlier GPT-4-era output was more bluntly promotional; newer models are subtler but still promotional.

**Vague attributions and overgeneralization.** Opinions get attached to unnamed authorities ("industry reports," "observers have cited," "experts argue," "some critics argue") and source quantity gets inflated ("such as," "several sources" when only one or two exist). Example: "Due to its unique characteristics, the Haolai River is of interest to researchers and conservationists" — interest from whom, specifically, is never said.

**Formulaic "Challenges and Future Outlook" sections.** A rigid template recurs at the end of AI-written articles regardless of topic: "Despite its [positive qualities], [subject] faces several challenges, including [list]. With its [strengths] and ongoing initiatives, [subject] continues to [vague positive verb]." Section headers "Challenges and Legacy," "Future Outlook," and "Future Prospects" are red flags in isolation.

**Treating a list or broad title as if it names a standalone entity.** AI often opens an article by defining its own title as though it were a proper noun with independent existence: "Catchment area (health) refers to the geographic area…", "EuroGames editions is the chronological list…", "The 'List of songs about Mexico' is a curated compilation…"

**"Awards and recognition" as ubiquitous section header**, reflecting the model's fixation on legacy and third-party validation as organizing principles.

### Language and grammar indicators

**High-density "AI vocabulary," which shifts by model era**, itself a useful diagnostic, since the specific words in vogue change every 6–12 months as models are retrained:
- **2023–mid-2024 (GPT-4 era):** "additionally" (especially sentence-initial), "boasts," "bolstered," "crucial," "delve," "emphasizing," "enduring," "garner," "intricate/intricacies," "interplay," "key," "landscape" (used abstractly), "meticulous/meticulously," "pivotal," "underscore" (as a verb), "tapestry" (used abstractly), "testament," "valuable," "vibrant."
- **Mid-2024–mid-2025 (GPT-4o era):** "align with," "bolstered," "crucial," "emphasizing," "enhance," "enduring," "fostering," "highlighting," "pivotal," "showcasing," "underscore," "vibrant."
- **Mid-2025 onward (GPT-5 era):** "emphasizing," "enhance," "highlighting," "showcasing," plus the notability/media vocabulary above.
- **Grok specifically** overuses "causal," "empirical," "correlate," and continues to lean on "underscore."

The essay notes these words co-occur — spotting one raises the likelihood of finding others nearby — and that a measurable ~10% drop in "is"/"are" frequency in academic writing was documented starting in 2023, with no comparable shift in prior years. That's a genuinely quantitative signal, not just impressionistic pattern-matching.

**Avoidance of the plain copula ("is"/"are").** Models systematically substitute elaborate stand-ins for a plain "is": "serves as," "stands as," "marks," "functions as," "operates as," "represents [a]," "boasts," "features," "maintains," "offers." A before/after example given in the essay: an original human sentence, "Gallery 825…is LAAA's exhibition arm…There are four individual gallery spaces," gets machine-revised to "Gallery 825 serves as LAAA's exhibition space…The gallery features four separate spaces." The replacement verbs are marketing verbs, not neutral ones: "features" and "offers" imply the subject is presenting itself for approval, exactly the promotional register discussed above. Notably, the essay observes this same decline in "is/are" frequency creeping into ordinary Wikipedia copyedits, i.e., human editors "fixing" prose in the AI's direction because the elaborate verb now reads as more polished to them.

**Negative parallelism / false-contrast constructions**, in three shapes:
1. *"Not just X, but also Y"*: implies the writer is correcting a misconception nobody had. Example: "This choice of language is not only dismissive but also unnecessarily harsh and confrontational."
2. *"Not X, but Y"*: flatly denies the first term applies at all. Example: "The viewer is presented with a self-image that is not grounded in visual mastery, but in what Amelia Jones terms 'the performative enactment of subjectivity.'"
3. *"X rather than Y"*: the reversed form, noted as especially common in Grok output. Example: "prioritizing empirical consolidation of power amid fragmented loyalties rather than ideological purity."

(See Part 3 below for The Atlantic's deep dive into exactly this construction, independently identified as the single hardest AI tell to shake.)

**The "rule of three."** Compulsive three-item listing ("adjective, adjective, and adjective" or "phrase, phrase, and phrase") used to manufacture a feeling of thoroughness. Example structure quoted in the essay:
> "Construction and Renovation: For cutting drywall, plywood, and other construction materials. Electrical and Plumbing: To create openings for electrical outlets, switches, and plumbing fixtures. Hobby and Craft: Used in model making, woodworking, and other craft projects."
Each item follows an identical rhythmic template: the triadic structure is doing the work that specific, differentiated content should be doing.

**Lexical diversity / "elegant variation" from repetition-penalty tuning.** Where a human writer would naturally repeat a term for clarity, AI text swaps in synonyms to avoid repetition, a side effect of training-time repetition penalties. The essay compares pre-2023 Wikipedia prose (comfortable repeating a term like "Soviet artistic constraints") against post-2023 AI-influenced prose, which cycles through several near-synonymous phrasings for the same idea within one paragraph. (Caveat noted: non-native English speakers taught in some European school systems are also trained to avoid repetition, so this signal isn't dispositive alone.)

### Formatting and markup indicators
Placing the article title as a redundant heading before the body; Title-Casing section headings instead of sentence case; headings that contain only sub-headings and no prose; overuse of bold text; "inline-header vertical lists" (a bolded mini-heading followed immediately by a bullet list); overuse of em dashes; emoji used as visual separators rather than for meaning; non-standard table use; curly/smart quotation marks appearing where straight ones are house style; skipped heading levels (e.g., H1 straight to H3); too many top-level headings instead of a nested hierarchy; and unnecessary horizontal-rule section breaks.

### Meta / communication indicators
Addressing the reader directly in a conversational, collaborative register ("we," "let's"); disclaimers about training-data cutoff dates leaking into the prose; unfilled template placeholders left in final text; and, in edit summaries specifically, performative assurances of policy compliance and oddly specific claims about "preserving" or "retaining" content, mechanical-sounding language that a human editing their own work wouldn't normally produce.

### What the essay says about human-side "positive" indicators
The essay is notably humble here: it lists few reliable positive markers. It flags that text predating ChatGPT's November 2022 launch cannot be modern-LLM output; that editors who can articulate specific, idiosyncratic reasoning for their choices on talk pages are behaving in a way current models don't easily fake; and it gestures at certain human syntactic patterns being rare in AI output without fully enumerating them, an honest admission that "signs of humanity" are harder to catalog than "signs of AI."

### The essay's own caveats (important, and often skipped by people citing this page)
- AI-detection tools (GPTZero, Pangram, etc.) beat random chance but have "non-trivial error rates" and are fooled by paraphrasing, markup changes, and unfamiliar models. High detector scores alone are explicitly deemed insufficient grounds for Wikipedia's speedy-deletion criterion G15.
- A 2025 study cited in the essay found that **humans, on average, do no better than chance at distinguishing AI from human text** — heavy LLM users score around 90% accuracy, but non-users are barely above chance. Human speech itself is now visibly influenced by LLM patterns, which is eroding the distinction from the other direction.
- Crucially, the essay insists these signs are **symptoms, not the disease**: they point to underlying policy problems (unreliable sourcing, synthesis, lack of real judgment) rather than being objectionable purely as surface style. Scrubbing the vocabulary without fixing the underlying shallowness "obscures the actual concerns," a warning directly relevant to any de-AI-ifying process that only find-and-replaces flagged words.

---

## Part 2: Classic Prose Style Guides

### Orwell, "Politics and the English Language" (1946)

**Source:** George Orwell, "Politics and the English Language," *Horizon*, 1946. Full text at [americanliterature.com](https://americanliterature.com/author/george-orwell/essay/politics-and-the-english-language) and widely anthologized.

**Credibility note:** The single most-cited essay in the English language on prose decay and its causes. Written eight decades before LLMs existed, but strikingly prophetic about *why* formulaic, padded, abstraction-heavy prose happens: it argued bad prose results from thinking too little, or from evading the responsibility of precise thought, and that hackneyed language is a symptom of hackneyed (or absent) thinking, a diagnosis that maps disconcertingly well onto LLM output, which is, definitionally, generated without a thinking subject behind it at all.

Orwell identifies four families of prose faults, all still visibly present in AI-generated text:

1. **Dying metaphors**: figures of speech so overused they've lost their evocative force and now just save the writer the trouble of composing an actual phrase: "ring the changes on," "take up the cudgel for," "toe the line," "ride roughshod over," "stand shoulder to shoulder with," "play into the hands of," "no axe to grind," "grist to the mill," "fishing in troubled waters." Orwell: these are "worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves."

2. **Operators, or verbal false limbs**: padded, multi-word phrases substituted for a single plain verb: "render inoperative," "militate against," "make contact with," "be subjected to," "give rise to," "have the effect of," "play a leading part in." Orwell's summary line: "The keynote is the elimination of simple verbs." (Compare directly to the Wikipedia essay's "avoidance of the plain copula," the same underlying reflex, the same fix.)

3. **Pretentious diction**: reaching for Latinate or Greek-derived words over plain Saxon ones to sound more scientific or authoritative than the content warrants: "phenomenon," "element," "objective," "categorical," "utilize," "liquidate," plus imported phrases like "cul de sac," "deus ex machina," "weltanschauung." Orwell: "Bad writers…are nearly always haunted by the notion that Latin or Greek words are grander than Saxon ones."

4. **Meaningless words**: terms so overloaded with contradictory senses that they communicate almost nothing, mostly in political writing: he singles out "Fascism" as having "now no meaning except in so far as it signifies 'something not desirable,'" alongside "democracy," "freedom," and "justice," each of which carries "several different meanings which cannot be reconciled with one another."

On the positive side, Orwell's core argument about imagery is directly useful for craft guidance: **"A newly invented metaphor assists thought by evoking a visual image,"** whereas exhausted, secondhand language obscures meaning by trading in abstraction instead of concrete pictures. This is essentially the same instinct behind "show, don't tell," restated as a claim about cognition, not just aesthetics.

The essay closes with six practical rules, the sixth of which is the most important and most often dropped when people cite this list:

1. Never use a metaphor, simile, or other figure of speech which you are used to seeing in print.
2. Never use a long word where a short one will do.
3. If it is possible to cut a word out, always cut it out.
4. Never use the passive where you can use the active.
5. Never use a foreign phrase, a scientific word, or a jargon word if you can think of an everyday English equivalent.
6. **Break any of these rules sooner than say anything outright barbarous.**

Rule 6 matters because it's the rule most "de-AI" advice implicitly forgets: mechanically banning "delve" or the em dash is itself a form of the pretentious-diction reflex Orwell is diagnosing, just inverted. The point was never the specific words — it's whether the sentence was actually thought through.

### Strunk & White, *The Elements of Style*

**Source:** William Strunk Jr. and E. B. White, *The Elements of Style* (4th ed.), Allyn and Bacon. Quotes verified via [Wikiquote: The Elements of Style](https://en.wikiquote.org/wiki/The_Elements_of_Style).

**Credibility note:** The best-selling and most institutionally canonized English prose style guide of the 20th century, assigned in composition courses for generations; Strunk wrote the original 1918 rules, White (his former student, later a *New Yorker* essayist) expanded it in 1959. It's occasionally criticized by linguists for prescriptivist overreach on grammar specifics, but its core stylistic counsel (concision, concreteness, and a suspicion of hedging) remains the dominant American reference point for "good prose," and it's the guide most directly echoed by tools like Hemingway App.

**On cutting words (Strunk, Rule 17):** "Vigorous writing is concise. A sentence should contain no unnecessary words, a paragraph no unnecessary sentences, for the same reason that a drawing should have no unnecessary lines and a machine no unnecessary parts." This is the origin of "omit needless words," probably the single most quoted line in American writing instruction.

**On concreteness (Strunk, Rule 16):** "The surest way to arouse and hold the reader's attention is by being specific, definite, and concrete." This is directly opposed to the "vague attribution" and "abstract landscape/tapestry" tells cataloged above — Strunk's positive rule is the mirror image of the AI-writing failure mode.

**On qualifiers (White, Rule 8):** "Rather, very, little, pretty — these are the leeches that infest the pond of prose, sucking the blood of words." A useful, still-underused complement to the "cut needless words" rule: it targets *hedging intensifiers* specifically, which is relevant because LLM output tends toward hedge-heavy, softened claims rather than blunt statements.

**On voice and sincerity (White, Ch. V, "An Approach to Style"):** "Style has no such separate entity; it is nondetachable, unfilterable… The approach to style is by way of plainness, simplicity, orderliness, sincerity." White is explicit that style isn't a decorative layer applied on top of content: it's inseparable from the writer's actual character and judgment, which is precisely what generated text structurally lacks (there is no persistent "someone" whose judgment the words reflect).

**On the reader relationship:** "No one can write decently who is distrustful of the reader's intelligence, or whose attitude is patronizing." Directly relevant to the Wikipedia essay's "collaborative communication" and hand-holding tells (over-explaining, disclaimer-adding, excessive signposting): those habits are, in Strunk & White's terms, a form of patronizing the reader.

**On adjectives (White, Rule 4):** "The adjective hasn't yet been built that can pull a weak or inaccurate noun out of a tight place," i.e., piling on modifiers ("vibrant," "rich," "profound," "significant") can't rescue an imprecise or unearned claim; you need the right noun/verb, not more adjectives stacked on the wrong one.

### Hemingway App and Hemingway-style guidance

**Source:** [Hemingway Editor](https://hemingwayapp.com/), created by Adam and Ben Long; site content and secondary coverage via [Reedsy](https://reedsy.com/blog/guide/book-writing-software/hemingway-app-review/), [Kindlepreneur](https://kindlepreneur.com/hemingway-editor-review/), and [ScribeCount](https://scribecount.com/author-resource/writing-tools-for-authors/hemingway-app-for-authors).

**Credibility note:** Not an editorial institution but a widely adopted practitioner tool (millions of users, standard recommendation in freelance-writing and content-editing circles) whose entire design encodes a specific, defensible theory of readable prose descended explicitly from journalism craft: the Longs built it around the plain-sentence discipline Hemingway learned as a cub reporter at the *Kansas City Star*, whose style sheet famously demanded short sentences, short first paragraphs, vigorous English, and no wasted words.

The app's tagline is explicit about its values: **"Hemingway Editor makes your writing bold and clear."** Mechanically, it operationalizes readability as a small set of measurable penalties:
- **Sentence length/complexity**: long, hard-to-parse sentences are flagged yellow (hard to read) or red (very hard to read), with a nudge to split them.
- **Passive voice**: flagged green, with a push toward active constructions (echoing Orwell's rule 4 and Strunk & White's active-voice preference directly).
- **Adverbs**: flagged blue, on the theory that adverb-heavy writing signals a weak verb doing too little work ("walked quickly" instead of "hurried").
- **Weak/complex-word substitutions**: flagged purple, nudging toward plainer word choices, i.e., Orwell's "never use a long word where a short one will do" turned into an algorithm.
- **Grade-level readability score**, used as a proxy for overall density/clarity.

What's useful about Hemingway App for this research specifically: it's the practical, mechanical descendant of exactly the Strunk/Orwell tradition above, applied at sentence granularity — it doesn't catch AI-specific tics like negative parallelism or vague attribution, but it directly targets two of the most common LLM failure modes (padded/hedged sentences and weak-verb-plus-adverb constructions in place of one strong verb).

---

## Part 3: Journalism and Editing Outlets on LLM Prose Specifically

### The Atlantic: "The Most Famous AI Writing Tic Is Also the Most Mysterious"

**Source:** Will Oremus, *The Atlantic*, July 13, 2026. `theatlantic.com/technology/2026/07/ai-chatbot-writing-tic-negative-parallelism/687892/` (paywalled; details corroborated across multiple independent secondary summaries, including AI Weekly's coverage).

**Credibility note:** *The Atlantic* is a long-established general-interest magazine with rigorous fact-checking standards; this is a reported technology piece, not an opinion blog, and it cites named sources at OpenAI plus independent datasets (Washington Post message corpus, Barron's SEC-filing tally).

The piece's central claim, corroborating and extending the Wikipedia essay's "negative parallelism" category: the "It's not X; it's Y" construction (classical rhetoric calls it *antithesis*) is **the single most recognizable and most stubbornly persistent AI writing tell**, more reliable than the em dash or "delve." It's spread well beyond chatbot output into places where humans are now unconsciously imitating it: variations of "not just X, but Y" appeared in roughly 6% of a large sample of July 2026 messages in a Washington Post dataset (an unusually large share for one specific rhetorical shape) and the same construction's use in Fortune 500 SEC filings climbed from about 50 instances in 2023 to over 200 in 2025.

Notably, the article reports that **nobody, including the model developers, has a confirmed explanation for why LLMs reach for this construction so heavily.** The leading theories: it was disproportionately common in training data, or human raters (in RLHF) tended to score responses using it more highly because the "not X, but Y" shape *reads* as nuanced and thoughtful even when it isn't. OpenAI's Laurentia Romaniuk, a product manager for model behavior, calls it "contrastive phrasing" and confirms the company is actively working to reduce it. The piece also notes a cognitive-psychology wrinkle: studies on negated-noun processing (dating back to at least 2003) suggest readers process the negated term first, meaning the construction may land less crisply than writers using it intend — a real cost, not just an aesthetic tic, even when a human deploys it.

**Practical implication for craft:** avoid reflexively negating a straw version of a claim before asserting the real one. State the claim directly. If contrast is genuinely useful, it should come from real specificity ("X costs $40; Y costs $4"), not from a rhetorical shape borrowed for its cadence.

### Benjamin Dreyer, "Dash It All"

**Source:** Benjamin Dreyer, [personal Substack](https://benjamindreyer.substack.com/p/dash-it-all).

**Credibility note:** Dreyer was Random House's longtime copy chief and is the author of *Dreyer's English*, a widely respected trade style guide; this gives him unusual standing as a working editor commenting on the "em dash = AI" claim specifically, and his take is a useful corrective to the more simplistic version of that claim circulating on social media.

Dreyer pushes back hard on em-dash panic, calling the "em dashes mean AI" claim "social media blather" unsupported by real evidence: he went looking for "charts and graphs and proofs" and couldn't find any. Examining sample AI prose himself, he found nothing anomalous: "That's not a lot of em dashes over the course of thirteen lines, and there's nothing weird about their use." His broader point is about what dashes are *for*: they "isolate, highlight, emphasize" in ways commas and parentheses structurally can't, and a skilled writer should keep using them for that reason regardless of AI-detection anxiety. He's specifically worried this false signal is corrosive pedagogically: that anxious student writers are now self-censoring a legitimate punctuation mark out of fear of false accusation, which is a cost with no corresponding benefit since the em dash was never a reliable signal in the first place.

**Practical implication:** the em dash itself is not the tell (contra popular belief); it's *volume and function*: using it compulsively, in place of ordinary commas or full stops, as connective tissue between clauses, rather than for genuine emphasis or interruption.

### Rhea Purohit, "What the Em Dash Says About AI-assisted Writing—And Us"

**Source:** Rhea Purohit, *Every* (every.to), December 17, 2025. [every.to/learning-curve/what-em-dashes-say-about-ai-writing-and-us](https://every.to/learning-curve/what-em-dashes-say-about-ai-writing-and-us).

**Credibility note:** *Every* is a respected tech/business-writing publication with a strong editorial voice; this piece was widely discussed (front-paged on Hacker News), and it's useful precisely because it reframes the em-dash debate away from pure tell-spotting toward the underlying reader psychology, arguably the more important question for anyone trying to write prose that *feels* trustworthy rather than merely evading detectors.

Purohit's core argument: anxiety about superficial AI markers (em dashes above all) is really anxiety about **trust and evident care**: "the question of how something was made threatens to eclipse what it's trying to say." She frames a well-placed em dash as a signal that "I thought about this, and I cared. You can trust that I did" — the punctuation is a proxy for perceptible authorial attention, not a stylistic fingerprint in itself. On rhythm specifically, she notes dashes create "quick, seamless transitions, and a rhythm that adds emphasis" when a human is genuinely reaching for one, which is different from a model inserting them as a default connective tic. Her practical recommendation, generalized: evaluate (and produce) writing by the quality of thought it embodies, not by pattern-matching against a list of banned words or punctuation marks.

### Charlie Fink, "The Seven Deadly Tells Of AI Writing"

**Source:** Charlie Fink, *Forbes*, June 12, 2025. [forbes.com/sites/charliefink/2025/06/12/the-seven-tells-of-ai-writing](https://www.forbes.com/sites/charliefink/2025/06/12/the-seven-tells-of-ai-writing/).

**Credibility note:** Forbes contributor content (lower editorial bar than staff journalism, worth flagging), but Fink is an established media/tech industry writer, and the list is concrete, example-driven, and consistent with the more rigorously sourced Wikipedia and Atlantic material above, useful as a compact, quotable checklist rather than as an authoritative primary source on its own.

His seven tells, each with a worked example:

1. **Contrastive rhetorical framing**: "Amazon isn't just buying content. They're buying credibility." (The same "not X, it's Y" pattern The Atlantic investigated in depth.)
2. **Asking and answering rhetorical questions**: "What changed? The math did." Converts a plain declarative into unnecessary Q&A theater.
3. **Dashes deployed for no structural reason**: substituting a dash for what should be a comma or period, purely for cadence.
4. **Triplet framing**: "Not for advertising. Not for distribution. For AI training." Three-beat fragments used to manufacture rhetorical weight the content doesn't independently have.
5. **The "inspirational pivot"**: swerving from a concrete, specific detail into an abstract, vaguely profound closer ("...and ultimately, it's about humanity"), used to paper over a lack of a real conclusion.
6. **Universal authority without a real source**: "Studies show that storytelling is 22 times more memorable than facts," stated with a suspiciously precise number and no citation, laundering an unverified claim as settled fact.
7. **Quotes without real attribution**: confidently attributing a quote (Fink's example: "AI is the new electricity" to Musk) that turns out to be fabricated or unverifiable under scrutiny.

Fink's overall advice is to read AI-flavored text with active suspicion toward exactly this kind of empty rhetorical scaffolding (question-and-answer theater, triplets, unearned pivots to profundity) rather than toward any single banned word.

### Mario Garcia, "What the iconic writers of New Journalism can teach us in the AI era"

**Source:** Mario Garcia (adjunct professor, Columbia Journalism School), *Poynter*, 2025. [poynter.org/reporting-editing/2025/new-journalism-human-senses-gay-talese-ai-storytelling](https://www.poynter.org/reporting-editing/2025/new-journalism-human-senses-gay-talese-ai-storytelling/).

**Credibility note:** Poynter is one of the most respected journalism-standards and media-ethics institutes in the US, and this piece is craft guidance from a journalism educator, not opinion punditry: it's the most direct positive-craft counterpart to all the "tells to avoid" material above, focused entirely on what to do rather than what to cut.

Garcia's argument is that the New Journalism writers of the 1960s–70s (Gay Talese above all, via "Frank Sinatra Has a Cold") demonstrate an advantage AI structurally cannot replicate: **sensory, embodied observation of specific, unrepeatable detail.** He organizes the craft advice around the five senses, each anchored to a concrete Talese example:
- **Sight:** "spot the details bots ignore": Talese notices Sinatra's "watery" eyes and his incongruous "Game Warden boots," small physical specifics that reveal character obliquely rather than through direct assertion.
- **Smell:** atmospheric, scene-setting sensory detail: "smoke and semidarkness" to establish mood without stating it.
- **Sound:** embedding auditory texture ("the clack of billiard balls," vocal rhythm) to carry a scene's tension.
- **Touch:** tactile specificity: Sinatra's fingers described as "nubby and raw" from arthritis, a physical detail that does emotional work no adjective could.
- **Taste:** small gustatory details (Sinatra's dislike of ketchup) used to reveal character through the concrete rather than the abstract.

Garcia's opening-line example ("FRANK SINATRA, holding a glass of bourbon in one hand and a cigarette in the other, stood in a dark corner…") is offered as a model of establishing scene and character simultaneously through specific, chosen physical detail rather than through summary or generalization. His practical advice: "stake your claim in the opening lines… via descriptions that unveil what you see, hear, smell," i.e., lead with irreducibly specific sensory fact, which is exactly the register AI-generated prose defaults away from (toward the abstract "landscape/tapestry/significance" vocabulary cataloged in Part 1).

### Ted Chiang, "Why A.I. Isn't Going to Make Art"

**Source:** Ted Chiang, *The New Yorker*, August 2024 ("Weekend Essay").

**Credibility note:** Chiang is a Hugo- and Nebula-winning science-fiction writer (*Exhalation*, and the story behind the film *Arrival*) with a long-standing sideline as one of the most careful, widely respected public thinkers on AI's actual capabilities and limits: his essays get cited across both literary and technical circles precisely because he avoids both hype and reflexive dismissal. Note: I was unable to directly fetch the full original text (paywalled/blocked in this environment) and am relying on corroborated secondary reporting for the direct quotes below, which should be verified against the original before being treated as exact wording in any downstream published material.

Chiang's argument, as reported: writing (like art generally) is valuable *because* of the many small, effortful choices a human makes in producing it, choices that constitute thought, not just output. He's specifically skeptical of using AI to shortcut essay-writing, offering the analogy that using ChatGPT to write an essay is "like bringing a forklift into the weight room" — you'll move the weight, but you won't build the strength the exercise was for. The underlying craft claim, useful beyond the education context he was writing about: what makes prose read as authored is the evidence of accumulated, specific choices behind it, which is also, read against Part 1 and Part 2 above, precisely what's structurally absent from generated text and what the "vague attribution," "generic significance language," and "elegant variation" tells all end up revealing by omission.

---

## Synthesis: Tells to Avoid vs. Craft to Pursue

Reading these sources together, two things stand out.

**First, the tells converge across completely independent sources.** Wikipedia's crowd-sourced taxonomy, The Atlantic's reported investigation, Forbes's practitioner checklist, and Orwell's 80-year-old essay on political prose all independently arrive at overlapping diagnoses: avoidance of the plain verb in favor of an inflated one ("serves as" for "is"); false-contrast rhetorical shapes used as a substitute for a real point ("not X, it's Y"); vague, unearned appeals to significance or authority ("plays a crucial role," "experts argue," "studies show"); triadic list padding that performs thoroughness without delivering it; and abstraction reached for in place of concrete, checkable specifics. That convergence (across a wiki essay, 1940s political criticism, and 2026 tech journalism) is itself evidence that these aren't superficial "words to avoid" so much as symptoms of a deeper default: writing that gestures at meaning instead of committing to a specific, falsifiable claim.

**Second, no source treats tell-avoidance as sufficient on its own.** Orwell's sixth rule ("break any of these rules sooner than say anything outright barbarous"), Wikipedia's own caveat that fixing surface symptoms "obscures the actual concerns," Dreyer's warning against em-dash panic corroding real craft, and Purohit's reframing toward "quality of thought" all converge on the same point from different angles: mechanically stripping flagged vocabulary produces prose that merely evades pattern-matching, not prose that reads as human. The positive craft guidance — Strunk & White's concreteness and sincerity, Zinsser-style warmth (four commandments: clarity, simplicity, brevity, humanity), Garcia's sensory specificity, Hemingway App's operationalized plainness — all point toward the same underlying move: replace the generic and the hedged with the specific, the chosen, and the committed. That's a harder, slower fix than a find-and-replace on "delve" and em dashes, but it's the one every source above, independently, ends up recommending.
