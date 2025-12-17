import { Bot, Brain, Gauge, Link2, MessageSquare, Network, Search, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";

export type GlossaryTerm = {
    term: string;
    slug: string;
    definition: string;
    icon: LucideIcon;
    image?: string;
    article?: string;
};

export const terms: GlossaryTerm[] = [
    {
        term: "Answer Engine Optimization (AEO)",
        slug: "aeo-answer-engine-optimization",
        definition: "Optimizing your pages to be the direct answer in AI chat interfaces, voice assistants, and zero-click results. The goal is clarity, structure, and credibility so engines cite you.",
        icon: MessageSquare,
        article: `Answer Engine Optimization (AEO) is the next evolution of SEO. While traditional SEO focuses on ranking blue links on a Search Engine Results Page (SERP), AEO focuses on being the single, definitive answer provided by an AI agent or voice assistant (like ChatGPT, Gemini, Siri, or Alexa).

### Why AEO Matters Now
With the rise of "Zero-Click" search behavior, users want answers immediately. They don't want to click a link, scroll past ads, and read a 2,000-word story to find a recipe. Answer engines capture this demand by synthesizing information and presenting the solution directly. If your content isn't the source of that synthesis, you become invisible.

### How to Optimize for Answer Engines
1. **Result-First Structure**: Put the answer immediately at the top of your content (BLUF - Bottom Line Up Front).
2. **Q&A Formatting**: Use explicit H2s and H3s phrased as questions (e.g., "How does AEO work?") followed by direct, concise answers.
3. **Structured Data**: Use Schema.org markup (FAQPage, HowTo, Article) to make your content machine-readable.
4. **Authority Citations**: Answer engines trust sources that cite other trusted sources. Include statistics, expert quotes, and links to primary data.

### The Future of AEO
As search becomes multimodal (text, voice, video), AEO will dominate. Brands that establish themselves as the "Fact Layer" of their industry will win. Those that rely on fluff and high word counts will lose relevance.`
    },
    {
        term: "Generative Engine Optimization (GEO)",
        slug: "geo-generative-engine-optimization",
        definition: "The process of optimizing content not just for search engines like Google, but for AI answer engines like ChatGPT, Claude, and Gemini. It focuses on citation authority and answerability.",
        icon: Sparkles,
        article: `Generative Engine Optimization (GEO) is the strategy of optimizing content for visibility in generative AI outputs. Unlike SEO, which fights for rank, GEO fights for *citations*. When a user asks ChatGPT, "What are the best CRM tools?", the AI generates a list. GEO determines if your tool is on that list and if your review article is cited as the source.

### Key Factors in GEO
Recent studies (like those from Princeton and Georgia Tech) suggest that Generative Engines favor:
*   **Direct Quotations**: Content that contains clear, quotable statements.
*   **Statistics and Data**: Content that provides hard numbers is easier for LLMs to latch onto as "factual."
*   **Authoritative Tone**: Content written with confidence and expert terminology tends to be weighted higher than generic fluff.

### GEO vs SEO
*   **SEO**: optimize for keywords, backlinks, and click-through rate.
*   **GEO**: optimize for entities, context, and citation rate.

### How to Win at GEO
Stop writing for the median reader and start writing for the expert. LLMs are trained on high-quality literature. To be cited, your content needs to resemble the high-weight nodes in their training data: structured, dense, and accurate.`
    },
    {
        term: "Retrieval-Augmented Generation (RAG)",
        slug: "rag-retrieval-augmented-generation",
        definition: "A technique used by AI models to fetch relevant data from an external knowledge base (like your website) before generating an answer. Optimizing for RAG is key to appearing in AI citations.",
        icon: Search,
    },
    {
        term: "Agentic Workflow",
        slug: "agentic-workflow",
        definition: "A system where autonomous AI agents perform complex tasks—like keyword research, content drafting, and internal linking—without human intervention, often chaining steps together.",
        icon: Bot,
    },
    {
        term: "LLM Hallucination",
        slug: "llm-hallucination",
        definition: "When a Large Language Model generates incorrect or nonsensical information. Modern SEO involves grounding models with high-quality, authoritative content to reduce misinformation about your brand.",
        icon: Brain,
    },
    {
        term: "Knowledge Graph",
        slug: "knowledge-graph",
        definition: "A network of real-world entities (people, places, things) and their relationships. AI engines rely heavily on structured data and consistent entity signals to understand your brand authority.",
        icon: Network,
    },
    {
        term: "Zero-Click Search",
        slug: "zero-click-search",
        definition: "A search result where the answer is displayed directly at the top of the SERP (or in an AI chat), meaning the user never clicks through to a website. GEO aims to win these 'position zero' spots.",
        icon: Search,
    },
    {
        term: "AI Overviews (AIO)",
        slug: "ai-overviews",
        definition: "Google's AI-generated snapshots that appear at the very top of search results, synthesizing information from multiple sources. Ranking here requires concise, answer-focused content structure.",
        icon: Sparkles,
    },
    {
        term: "Perplexity AI",
        slug: "perplexity-ai",
        definition: "A conversational answer engine that provides sourced answers to user queries. Optimizing for Perplexity involves citation management and high domain authority.",
        icon: Search,
    },
    {
        term: "Semantic Search",
        slug: "semantic-search",
        definition: "Search technologies that interpret the meaning and context of user queries (intent) rather than just matching keywords literally.",
        icon: Brain,
    },
    {
        term: "Vector Embeddings",
        slug: "vector-embeddings",
        definition: "Numerical representations of text that allow AI to understand the semantic relationship between words. Used by search engines to match relevant content to queries.",
        icon: Network,
    },
    {
        term: "Token Context Window",
        slug: "token-context-window",
        definition: "The amount of text (tokens) an AI model can process at once. In SEO, this relates to how much of your page content an LLM can 'read' and retain for answering questions.",
        icon: Bot,
    },
    {
        term: "E-E-A-T",
        slug: "eeat",
        definition: "Experience, Expertise, Authoritativeness, and Trustworthiness. Google's quality rater guidelines which are critical for AI grounding and ranking in sensitive topics.",
        icon: Sparkles,
    },
    {
        term: "Structured Data",
        slug: "structured-data",
        definition: "Standardized code (Schema markup) added to webpages to help search engines and AI agents understand the content and context of the page more easily.",
        icon: Network,
    },
    {
        term: "Conversational Keywords",
        slug: "conversational-keywords",
        definition: "Long-tail keywords phrased as natural language questions (e.g., 'How do I fix X?') that align with how users speak to voice assistants and AI chatbots.",
        icon: MessageSquare,
    },
    {
        term: "Entity SEO",
        slug: "entity-seo",
        definition: "Optimizing around real-world entities (brands, products, people, locations) rather than only keywords. Entities help search engines and LLMs connect facts and trust signals.",
        icon: Network,
    },
    {
        term: "Brand Mention (Citation)",
        slug: "brand-mention-citation",
        definition: "When an AI engine or a webpage references your brand as a source. In GEO, mentions often matter as much as links because they shape how models learn and cite authority.",
        icon: Link2,
    },
    {
        term: "Core Web Vitals",
        slug: "core-web-vitals",
        definition: "Google’s user-experience metrics (LCP, INP, CLS) that reflect real page speed and stability. Better CWV improves conversion and reduces ranking friction.",
        icon: Gauge,
    },
    {
        term: "Crawl Budget",
        slug: "crawl-budget",
        definition: "The amount of crawling and indexing attention a search engine allocates to your site. Technical SEO helps make sure important pages get discovered and updated quickly.",
        icon: Search,
    },
    {
        term: "Topical Authority",
        slug: "topical-authority",
        definition: "The credibility you build by covering a subject deeply. It’s an outcome: search engines see your site as a reliable source for a defined topic area.",
        icon: Network,
    },
    {
        term: "Search Intent",
        slug: "search-intent",
        definition: "The 'why' behind a query. Alignment means your page matches the dominant intent Google is rewarding, whether it's informational, commercial, or transactional.",
        icon: Brain,
    },
    {
        term: "Indexability",
        slug: "indexability",
        definition: "Whether a search engine can include a page in its index. Distinct from crawlability, which is just fetching. Indexing requires quality signals.",
        icon: Search,
    },
    {
        term: "Information Gain",
        slug: "information-gain",
        definition: "The unique value a piece of content adds to the web compared to existing search results. Critical for avoiding 'duplicate content' filters in AI search.",
        icon: ShieldCheck,
    },
    {
        term: "Prompt Engineering for SEO",
        slug: "prompt-engineering-seo",
        image: "/images/glossary/prompt-engineering.svg",
        definition: "The art of structuring inputs to AI models to generate high-quality, SEO-optimized content. It involves guiding the AI with context, constraints, and examples.",
        icon: Bot,
        article: `Prompt Engineering for SEO isn't just about getting an AI to write a blog post; it's about getting it to write a *ranking* blog post. It involves understanding how LLMs interpret instructions and how to constrain them to produce output that satisfies search intent and Google's quality guidelines.

### The Structure of a Perfect SEO Prompt
1.  **Role**: "You are an expert technical SEO copywriter..."
2.  **Task**: "Write a comprehensive guide on..."
3.  **Context**: "The audience is B2B marketing managers..."
4.  **Constraints**: "Use short paragraphs. Avoid jargon. Include a table."
5.  **Output Format**: "Markdown."

### Why it Matters
Generic prompts ("Write a blog about SEO") produce generic content. Generic content does not rank. Advanced prompt engineering allows you to inject "Information Gain" by forcing the AI to maintain a specific angle or include unique data points you provide.`
    },
    {
        term: "Neural Information Retrieval",
        slug: "neural-ir",
        image: "/images/glossary/neural-ir.svg",
        definition: "The use of deep neural networks to match search queries to documents based on semantic meaning rather than just keyword matching.",
        icon: Brain,
        article: `Neural Information Retrieval (Neural IR) rewrites the rules of search. Traditional search engines used "lexical matching" (does the word 'cat' appear in this document?). Neural IR uses "semantic matching" (does this document talk about 'feline pets' even if the word 'cat' is missing?).

models like BERT and RankBrain introduced this to Google. They map words to vectors in a high-dimensional space. "King" - "Man" + "Woman" = "Queen". This allows the search engine to understand concepts.

### SEO Implications
You no longer need to stuff the exact keyword 50 times. You need to cover the *topic* comprehensively. If you write about "running shoes," Neural IR expects to see related concepts like "arch support," "cushioning," and "marathon training."`
    },
    {
        term: "Entity Salience",
        slug: "entity-salience",
        image: "/images/glossary/entity-salience.svg",
        definition: "A metric used by Google NLP to determine how important or central a specific entity (person, place, thing) is to the overall meaning of a text.",
        icon: Sparkles,
        article: `Entity Salience answers the question: "Is this page *about* Taylor Swift, or does it just *mention* Taylor Swift?"

If you mention an entity once in the footer, it has low salience. If you mention it in the H1, the first paragraph, and consistently throughout the text, it has high salience.

### Improving Salience
*   **Placement**: Put your main topic in the first sentence.
*   **Frequency**: distinct from keyword stuffing, ensure the *concept* is central.
*   **Relationships**: Connect the main entity to other relevant entities (e.g., connect "Taylor Swift" to "Eras Tour" and "music industry").`
    },
    {
        term: "Tokenization",
        slug: "tokenization",
        image: "/images/glossary/tokenization.svg",
        definition: "The process of breaking text into smaller units (tokens) that AI models can process. Understanding tokens is crucial for managing AI context windows and costs.",
        icon: MessageSquare,
        article: `Tokenization is how LLMs read. They don't see words; they see tokens. A token is roughly 0.75 words. "The" is one token. "Ingenious" might be three tokens ("In", "gen", "ious").

### Why SEOs Should Care
1.  **Context Windows**: If you are feeding content into ChatGPT to analyze, you are limited by tokens.
2.  **Cost**: API costs are per-token.
3.  **Search Processing**: Search engines also tokenize content to index it. Understanding how your brand name breaks down into tokens can sometimes influence how it's retrieved.`
    },
    {
        term: "Zero-Shot Learning",
        slug: "zero-shot-learning",
        image: "/images/glossary/zero-shot-learning.svg",
        definition: "The ability of an AI model to complete a task it has never explicitly been trained on, simply by understanding the instructions.",
        icon: Bot,
        article: `Zero-shot learning is what makes modern LLMs magical. You can ask ChatGPT to "Write a poem about SEO in the style of Shakespeare," and it does it, even if it never saw a Shakespearean SEO poem in its training data.

For SEOs, this means we can use AI for novel categorization tasks without needing to train a custom model. You can give an LLM a list of URLs and say "Categorize these by search intent," and it will perform zero-shot classification reasonably well.`
    },
    {
        term: "Chain-of-Thought (CoT)",
        slug: "chain-of-thought",
        image: "/images/glossary/chain-of-thought.svg",
        definition: "A prompting technique where the AI is encouraged to 'think out loud' and break down its reasoning steps before giving a final answer, improving accuracy.",
        icon: Network,
        article: `Chain-of-Thought (CoT) prompting unlocks higher intelligence in AI. Instead of asking "Is this content good for SEO?", you ask: "Analyze this content. First check the title tag. Then check the H1. Then check the keyword density. Finally, give a score."

By forcing the model to output its reasoning, you reduce hallucinations and get more actionable analysis. This is the foundation of building autonomous SEO agents.`
    },
    {
        term: "Embedding Space",
        slug: "embedding-space",
        image: "/images/glossary/embedding-space.svg",
        definition: "A multi-dimensional geometric space where text is mapped as vectors. Words with similar meanings are located closer together in this space.",
        icon: Network,
        article: `Imagine a 3D graph (but with 1000 dimensions). "Dog" and "Puppy" are dots sitting right next to each other. "Dog" and "Car" are far apart. This is Embedding Space.

Search engines use this to find relevant results even if they don't share keywords. If you search "best places to eat," the engine looks near that vector and finds "restaurants" and "cafes" because they are neighbors in embedding space.

**SEO Tip**: You optimize for embedding space by writing naturally and covering the semantic neighborhood of your topic.`
    },
    {
        term: "Model Fine-Tuning",
        slug: "model-fine-tuning",
        image: "/images/glossary/fine-tuning.svg",
        definition: "Taking a pre-trained AI model (like GPT-4) and training it further on a specific dataset (like your brand's blog) to specialize it for a task.",
        icon: Gauge,
        article: `Fine-tuning is the bridge between a generic AI and a brand-expert AI. You can fine-tune a model on your best-performing SEO articles so that future output matches your tone, structure, and formatting exactly.

While expensive and technical, fine-tuning is the ultimate "programmatic SEO" weapon. It allows you to scale quality content production without sounding like everyone else using the default ChatGPT model.`
    }
];
