// Hand-written copy that more than one surface uses (page, JSON-LD,
// llms-full.txt). Every figure here traces to a file under reference/.

export type Faq = { q: string; a: string; more?: { href: string; label: string } }

export const faqs: Faq[] = [
  {
    q: 'What is humanizing-writing?',
    a: "It's a skill for Claude Code that guides how Claude writes prose: docs, READMEs, reports, emails, blog posts, pull request descriptions. It loads whenever Claude is about to write a paragraph or more for a human reader, so the draft comes out without the usual machine habits and there's no separate rewrite step. You can also hand it a finished draft and ask Claude to humanize it. It's free, open source under the MIT licence, and at version 2.1.0 as of October 2026.",
  },
  {
    q: 'Does it get text past AI detectors such as GPTZero or Pangram?',
    a: "No, and we'd rather you read that here than find out later. Current detectors are trained classifiers. Xu et al. (2026) found that GPTZero and Pangram often pass text from base models as human and flag text from the instruction-tuned versions of the same models, which suggests they track the marks of instruction tuning itself. A style guide read by an instruction-tuned model doesn't change that tuning. Pangram also reports catching the output of nineteen humanizer tools more than 90% of the time, though that is the vendor's own figure. If you need a detector score, this is the wrong tool. It's built for the person who reads the text.",
    more: { href: '/tells#detectors', label: 'How detectors work' },
  },
  {
    q: 'How is it different from blader/humanizer and other humanizer skills?',
    a: "Two things, mainly. The widely used ones (blader/humanizer, avoid-ai-writing, stop-slop, no-ai-slop) are rewrite tools you run over a finished draft, and this one applies while Claude is writing. It also has a Scope section that says where the rules stop: API reference, legal text, fiction, marketing copy, someone else's writing, your own voice. And it's weaker than blader's in one clear way — blader reports a blind preference test of 16 out of 16, and ours is 18 pairs over two rounds, judged by Claude models.",
    more: { href: '/compare', label: 'Full comparison' },
  },
  {
    q: 'How do I install it?',
    a: 'Run npx skills add AshwinSathian/humanize-writing-skill in a terminal. Or, inside Claude Code, run /plugin marketplace add AshwinSathian/humanize-writing-skill and then /plugin install humanizing-writing@humanize-writing-skill. You can also clone the repository and symlink it into ~/.claude/skills/humanizing-writing. None of the three needs an account or a review.',
  },
  {
    q: 'Does it work with Codex, Cursor, or models other than Claude?',
    a: "We don't know. The file is a standard SKILL.md, so an agent that reads that format can load it. But it was written against the habits of Claude models, and every test in the repository ran on Claude Haiku, Sonnet, or Opus. Nothing here says how it behaves on another vendor's model.",
  },
  {
    q: 'Does it ban "delve", em dashes, or other words?',
    a: 'No. Word lists go stale. Wikipedia\'s list of AI vocabulary for mid-2025 onward is four words long, and the same page records that "delve" fell sharply in 2025. The rules here are about claims, sentence shape, and endings. An em dash is fine where a comma would hide the break, and a precise term such as "idempotent" always stays.',
  },
  {
    q: 'What do AI writing tells look like in 2026?',
    a: 'They\'ve moved. In July 2026 The Economist compared 55,940 sentences from ChatGPT, Claude, Gemini, and Grok with human journalism and novels. It found long words, long sentences joined with "and", thin punctuation, "not X but Y", and lists of three. Only Claude used more em dashes than human writers. Reinhart et al. (PNAS, 2025) measured the trailing "-ing" clause at 2 to 5 times the human rate.',
    more: { href: '/tells', label: 'Every tell, with its source' },
  },
  {
    q: 'Will it rewrite my own writing or flatten my voice?',
    a: "It shouldn't. When Claude edits text you wrote, the skill tells it to fix what you asked for and leave your hedges, fragments, and rhythm alone. When Claude drafts in your voice from a sample or a voice profile, your habits outrank the rules — if you use dashes and rhetorical questions, the draft does too, at about your rate. The one rule that never yields is the one against making things up.",
  },
  {
    q: 'How was it tested, and how far should I trust the result?',
    a: "Twice, both times blind. Fresh Claude instances wrote three pieces with no skill, with version 1.1.1, and with the current rules, and model judges compared shuffled, unlabelled pairs. With Sonnet and Opus writing, each of two judges preferred the skill's text to the no-skill text in 5 of 6 pairs. With Haiku writing, three judges each preferred it in 3 of 3. Those are small samples and the judges are Claude models. The rules were also revised after earlier drafts did badly on the same three tasks, so the result is partly fitted to them. The pairs, the keys, and the losses are in the repository.",
    more: { href: '/research', label: 'Method, results, limits' },
  },
  {
    q: 'Does it invent facts to make writing sound specific?',
    a: "It's told not to, in the one rule that has no exceptions, and it mostly holds. The rule was earned the hard way: version 1.x of the skill's own examples added a database connection pool and a Retry-After header that the originals never mentioned, and an early 2.0.0 draft produced an invented incident from \"last quarter\". After the rule was widened, no judge flagged an invented fact in a 2.0.0 passage from Sonnet or Opus. Haiku did slip once — a passage for a team it knew nothing about began a sentence with \"Right now a half-finished feature either sits on a long-lived branch or reaches every user at once\", and two of three judges flagged it. So check any claim about your own team or system before you publish.",
    more: { href: '/research#haiku', label: 'The Haiku round' },
  },
  {
    q: 'Does it work for languages other than English?',
    a: "Partly. The rules on claims, structure, and endings carry over. The English word examples don't, and every test so far was on English text.",
  },
  {
    q: 'How do I switch it off for one request?',
    a: "Tell Claude. An explicit instruction from you overrides the skill's defaults. Ask for buzzwords or a mandated template and you'll get them, and they won't be changed back afterwards.",
  },
  {
    q: 'Was this site written with the skill?',
    a: "Yes. Every page here was drafted by Claude with the skill loaded and my voice profile applied, and each figure was checked against the files in the repository. The profile has known misses. Drafts come out with shorter sentences and fewer dashes than I write, so where a page reads a little too tidy, that's why.",
    more: { href: '/#colophon', label: 'The numbers for this site' },
  },
]

export type Source = { label: string; href: string }

export const sources = {
  economist: {
    label: 'The Economist, "How to Spot AI Writing", 30 July 2026',
    href: 'https://www.economist.com/culture/2026/07/30/how-to-spot-ai-writing',
  },
  reinhart: {
    label: 'Reinhart et al., PNAS, 2025',
    href: 'https://www.pnas.org/doi/10.1073/pnas.2422455122',
  },
  anthropic: {
    label: 'Anthropic, "Prompting Claude Fable 5.1"',
    href: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1',
  },
  wikipedia: {
    label: 'Wikipedia, "Signs of AI writing", read October 2026',
    href: 'https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing',
  },
  explainx: {
    label: 'explainx.ai, summarising Hacker News and r/ClaudeAI threads, August 2026',
    href: 'https://explainx.ai/blog/claude-opus-5-load-bearing-claudisms-writing-tells-2026',
  },
  elattar: { label: 'El Attar et al., 2026', href: 'https://arxiv.org/abs/2606.04177' },
  pangramBlog: {
    label: 'Pangram, "Why Perplexity and Burstiness Fail to Detect AI"',
    href: 'https://www.pangram.com/blog/why-perplexity-and-burstiness-fail-to-detect-ai',
  },
  xu: { label: 'Xu et al., "Base Models Look Human To AI Detectors", 2026', href: 'https://arxiv.org/abs/2605.19516' },
  cheng: { label: 'Cheng et al., "Adversarial Paraphrasing", 2025', href: 'https://arxiv.org/abs/2506.07001' },
  pangramReport: { label: 'Emi and Spero, Pangram technical report, 2024', href: 'https://arxiv.org/abs/2402.14873' },
  shan: { label: 'Shan, Lee, Hao, EMNLP 2026', href: 'https://arxiv.org/abs/2608.27855' },
  russell: { label: 'Russell, Karpinska, Iyyer, 2025', href: 'https://arxiv.org/abs/2501.15654' },
} satisfies Record<string, Source>

export type Tell = {
  name: string
  example?: string
  note: string
  rule: string
  source: Source
}

export const tellGroups: { id: string; title: string; intro: string; tells: Tell[] }[] = [
  {
    id: 'measured',
    title: 'Measured against human writing',
    intro:
      'These come from published corpus comparisons. They are the strongest evidence on this page, and they still have limits: The Economist measured news journalism, and the Reinhart figures are from 2024 models.',
    tells: [
      {
        name: 'Long, noun-heavy vocabulary',
        example: '"the implementation of", "utilization", "significant", "increasingly"',
        note: 'Polysyllables, Latinate suffixes, and nouns made from verbs. All four models in the study do it; Gemini and Claude do it most. Reinhart et al. put nominalisations at 1.5 to 2 times the human rate.',
        rule: 'Use the plain verb and the common word.',
        source: sources.economist,
      },
      {
        name: 'Long sentences chained with "and"',
        note: '"And" is the most overused word in the study, and paragraphs are rarely broken by a short statement.',
        rule: 'Let sentence length follow the content.',
        source: sources.economist,
      },
      {
        name: 'Thin punctuation',
        note: 'Fewer commas and semicolons than human writers, and almost no parentheses.',
        rule: 'Put asides in commas or parentheses.',
        source: sources.economist,
      },
      {
        name: '"Not X but Y", "not only but also", and lists of three',
        example: '"It\'s not just a defensive measure — it\'s a foundational component."',
        note: 'ChatGPT and Claude use these most per 1,000 sentences.',
        rule: 'Deny X only when this reader is likely to believe X.',
        source: sources.economist,
      },
      {
        name: 'The trailing "-ing" clause',
        example: '"..., underscoring its importance"',
        note: 'Measured at 2 to 5 times the human rate. It attaches significance to a fact without giving evidence for it.',
        rule: 'Make claims specific and checkable.',
        source: sources.reinhart,
      },
      {
        name: 'The em dash, in Claude only',
        note: 'Of the four models, only Claude uses more em dashes than human writers. ChatGPT uses fewer than any other writer in the study. The article gives no figure for the size of the gap.',
        rule: 'Use an em dash only for a break that a comma would hide.',
        source: sources.economist,
      },
      {
        name: 'No quoted experts',
        example: '"studies show", "experts say"',
        note: 'The models do not quote named people.',
        rule: 'Replace "experts say" with the fact and who said it.',
        source: sources.economist,
      },
    ],
  },
  {
    id: 'vendor',
    title: "Described by the model's own vendor",
    intro:
      'Anthropic describing its own model. It is not a measurement, and it compares the model with its predecessor, not with people.',
    tells: [
      {
        name: 'Mannered prose',
        example: '"a dial worth turning" for "a parameter worth varying"',
        note: "Metaphor and flourish in place of direct statement. Anthropic's guide names the habit and gives this example in its suggested prompt.",
        rule: 'Replace a figure of speech with the fact it stands for.',
        source: sources.anthropic,
      },
      {
        name: 'Dense prose',
        note: 'Sentences run longer and there are fewer paragraph breaks than in the previous model.',
        rule: 'Break a paragraph where the subject changes.',
        source: sources.anthropic,
      },
    ],
  },
  {
    id: 'reported',
    title: 'Reported by readers, unmeasured',
    intro:
      'These come from two blog posts summarising forum threads about Claude Opus 5. Nobody has counted them, and one widely shared post can make a habit look more common than it is.',
    tells: [
      {
        name: 'Stock figurative phrases',
        example: '"load-bearing", "carries the argument"',
        note: 'None of these is a banned word. "Load-bearing" is the right term for a wall.',
        rule: 'Replace a figure of speech with the fact it stands for.',
        source: sources.explainx,
      },
      {
        name: 'Announced candour',
        example: '"worth stating plainly", "honestly", "frankly"',
        note: 'A sentence that says the next one will be direct.',
        rule: 'Cut fillers and candour markers.',
        source: sources.explainx,
      },
      {
        name: 'Fragments for drama',
        example: '"Not a detail. A design decision."',
        note: 'A short sentence that repeats the one before it for effect.',
        rule: 'Write a short sentence when it has something new to say.',
        source: sources.explainx,
      },
    ],
  },
  {
    id: 'faded',
    title: 'Tells that have faded or did not hold up',
    intro: 'A rule built on any of these is aimed at 2023.',
    tells: [
      {
        name: '"Delve", "tapestry", "testament", "intricate"',
        note: 'These sit on Wikipedia\'s list for 2023 to mid-2024. Its list for mid-2025 onward is four words: "emphasizing", "enhance", "highlighting", "showcasing". The page records that "delve" fell sharply in 2025.',
        rule: 'No rule. The skill keeps a short table and bans no word.',
        source: sources.wikipedia,
      },
      {
        name: 'Uniform sentence length',
        note: 'Version 1.x called this the strongest signal, on the strength of one 2024 study of Mistral, Falcon, and LLaMA. A 2026 test of 284 features across 27 models found most proposed indicators depended heavily on context.',
        rule: 'Removed in 2.0.0. "Vary rhythm on purpose" produced closers and fragments.',
        source: sources.elattar,
      },
      {
        name: 'Perplexity and burstiness',
        note: 'Pangram, whose detector does best in independent tests, argues that both are unreliable and does not use them.',
        rule: 'No rule.',
        source: sources.pangramBlog,
      },
    ],
  },
]

export type CompareRow = {
  name: string
  href?: string
  runs: string
  mechanism: string
  scope: string
  test: string
  better: string
}

// As surveyed in reference/oss-skills-review.md section 5, October 2026.
export const compareRows: CompareRow[] = [
  {
    name: 'humanizing-writing',
    runs: 'While Claude writes, and on request over a draft',
    mechanism: 'Eleven rules on claims, sentence shape, and endings. About 1,150 words loaded per use',
    scope: 'Ten named cases, from API reference to fiction to your own voice',
    test: '18 blind pairs over two rounds, on Haiku, Sonnet, and Opus. Claude judges. Losses published',
    better: '',
  },
  {
    name: 'blader/humanizer',
    href: 'https://github.com/blader/humanizer',
    runs: 'After the draft exists',
    mechanism: 'One explanation of why model text sounds as it does, then 26 patterns ordered by strength. About 4,200 words per use',
    scope: 'One paragraph on genre. Voice matching from a sample',
    test: 'Reports a blind preference test, 16 of 16',
    better: 'A larger blind test, about 55,000 stars of use behind it, and install paths for more agents.',
  },
  {
    name: 'conorbronsdon/avoid-ai-writing',
    href: 'https://github.com/conorbronsdon/avoid-ai-writing',
    runs: 'After the draft exists. Rewrite, detect, and edit modes',
    mechanism: 'A tiered word list makes up most of it',
    scope: 'Protects code, quotes, and tables. English only by its own statement',
    test: 'Not covered in our survey',
    better: 'It reports which checks ran, what was left alone, and why editing stopped.',
  },
  {
    name: 'hardikpandya/stop-slop',
    href: 'https://github.com/hardikpandya/stop-slop',
    runs: 'After the draft exists',
    mechanism: 'Names rhetorical moves ("cut quotables", "false agency") instead of phrases',
    scope: 'No genre exceptions. Bans em dashes outright',
    test: 'A self-scored rubric, 35 of 50 to pass, with no source for the number',
    better: 'Naming the move, not the phrase. We took the closer and the colon reveal from it.',
  },
  {
    name: 'petergyang/no-ai-slop',
    href: 'https://github.com/petergyang/no-ai-slop',
    runs: 'After the draft exists',
    mechanism: 'Minimum-change editing',
    scope: 'Keeps a writer\'s "I think", fragments, and digressions. Caps em dashes at "1-2 max" with no source',
    test: 'Not covered in our survey',
    better: 'The lightest touch on a person\'s own draft. We took "keep a real hedge" from it.',
  },
]
