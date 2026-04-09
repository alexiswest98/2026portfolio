import readBetweenLogo from '../assets/ReadBetweenLogo.png';
// import paywall_img from '../assets/rb_PaywallState.png'
import paywall_demo from '../assets/RB_demo_paywall.mp4';
import demo_vid from '../assets/RB_demo_final.mp4';
import rb_font_brainstorm from '../assets/rb-font-brainstorm.png';
import {
  Search,
  Users,
  FileText,
  Eye,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Layers,
  GitBranch,
  Zap,
  Shield,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CaseStudy.css'
import './CaseStudy0.css'

gsap.registerPlugin(ScrollTrigger)

const CS0_NAV = [
  { label: 'The Problem',             id: 'cs0-problem' },
  { label: 'Design Approach',         id: 'cs0-design' },
  { label: 'System Architecture',     id: 'cs0-architecture' },
  { label: 'Key Technical Decisions', id: 'cs0-tech-decisions' },
  { label: 'Results',                 id: 'cs0-results' },
  { label: 'Reflections',             id: 'cs0-reflection' },
]

// ── Supporting Components ─────────────────────────────────────────────────────

function InsightCard({
  number,
  title,
  items,
  quote,
  highlight,
}: {
  number: string
  title: string
  items?: string[]
  quote?: string
  highlight?: string
}) {
  return (
    <div className="insight-card">
      <div className="insight-card__header">
        <div className="insight-number-badge">{number}</div>
        <h4 className="insight-card__title">{title}</h4>
      </div>

      {items && (
        <ul className="insight-card__items">
          {items.map((item, idx) => (
            <li key={idx} className="insight-card__item">
              <span className="insight-card__bullet">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {quote && (
        <div className="insight-card__quote">
          <p className="insight-card__quote-text">"{quote}"</p>
        </div>
      )}

      {highlight && (
        <div className="insight-card__highlight">
          <p className="insight-card__highlight-text">{highlight}</p>
        </div>
      )}
    </div>
  )
}

function SolutionCard({
  icon,
  title,
  subtitle,
  // description,
  impact,
  highlight,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  // description: string
  impact: string
  highlight?: string
}) {
  return (
    <div className="solution-card">
      <div className="solution-card__inner">
        <div className="solution-card__icon">{icon}</div>
        <div className="solution-card__content">
          <div className="solution-card__title-row">
            <h3 className="solution-card__title">{title}</h3>
            <span className="solution-card__subtitle">{subtitle}</span>
          </div>
          {/* <p className="solution-card__description">{description}</p> */}
          <div className="solution-card__impact">
            <p className="solution-card__impact-label">Why it matters:</p>
            <p className="solution-card__impact-text">{impact}</p>
          </div>
          {highlight && (
            <div className="solution-card__highlight">
              <p className="solution-card__highlight-text">{highlight}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ArchitectureStage({
  stage,
  title,
  timing,
  items,
  note,
}: {
  stage: string
  title: string
  timing?: string
  items: string[]
  note?: string
}) {
  return (
    <div className="arch-stage">
      <div className="arch-stage__header">
        <div className="arch-stage-badge">{stage}</div>
        <div className="arch-stage__content">
          <div className="arch-stage__title-row">
            <h4 className="arch-stage__title">{title}</h4>
            {timing && <span className="arch-stage__timing">({timing})</span>}
          </div>
          <ul className="arch-stage__items">
            {items.map((item, idx) => (
              <li key={idx} className="arch-stage__item">
                <span className="arch-stage__bullet">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {note && (
            <div className="arch-stage__note">
              <p className="arch-stage__note-text">{note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TechnicalDecision({
  title,
  tradeoff,
  decision,
  impacts,
}: {
  title: string
  tradeoff?: string
  decision: string
  impacts: string[]
}) {
  return (
    <div className="tech-decision">
      <h4 className="tech-decision__title">{title}</h4>

      {tradeoff && (
        <div className="tech-decision__block">
          <p className="tech-decision__label">TRADEOFF</p>
          <p className="tech-decision__text">{tradeoff}</p>
        </div>
      )}

      <div className="tech-decision__block">
        <p className="tech-decision__label">DECISION</p>
        <p className="tech-decision__decision-text">{decision}</p>
      </div>

      <div>
        <p className="tech-decision__label--blue">IMPACT</p>
        <ul className="tech-decision__impacts">
          {impacts.map((impact, idx) => (
            <li key={idx} className="tech-decision__impact-item">
              <CheckCircle2 className="tech-decision__check-icon" />
              <span>{impact}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ResultMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="result-metric">
      <div className="result-metric__value">{value}</div>
      <div className="result-metric__label">{label}</div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const CaseStudy0 = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('')

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Velocity trail effect — trails lag on scroll, snap back when stopped
      let resetTimer: ReturnType<typeof setTimeout>
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          clearTimeout(resetTimer)
          const v = Math.min(Math.abs(self.getVelocity()) / 800, 1)
          gsap.to('.cs0-nav-text.trail1', { y: v * 6, duration: 0.3, overwrite: true })
          gsap.to('.cs0-nav-text.trail2', { y: v * 12, duration: 0.45, overwrite: true })
          resetTimer = setTimeout(() => {
            gsap.to('.cs0-nav-text.trail1', { y: 0, duration: 0.3, overwrite: true })
            gsap.to('.cs0-nav-text.trail2', { y: 0, duration: 0.45, overwrite: true })
          }, 120)
        },
      })

      // Active section tracking
      CS0_NAV.forEach(({ id }) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="cs0-root case-study">
      {/* Hero Section */}
      <header className="cs0-hero">
        <button
          onClick={() => navigate('/', { state: { scrollTo: 'case-study-0' } })}
          className="cs0-hero__back-btn"
          aria-label="Go back"
        >
          <ArrowLeft className="cs0-hero__back-icon" />
        </button>
        <div className="cs0-hero__inner">
          <div className="cs0-hero__top">
              <img src={readBetweenLogo} alt="Read Between logo" className='rb0-logo'/>
              <p className="cs0-hero__subtitle">
                A transparency-first news analysis tool that helps users evaluate articles in under 60 seconds
              </p>
            <div>
              <div className='case-study0-tags-container extra-tags-border'>
                <div className='case-study0-tags'> PRODUCT DESIGN</div>
                <div className='case-study0-tags'>END-TO-END</div>
                <div className='case-study0-tags tag-blue'>DEV</div>
                <div className='case-study0-tags tag-blue'>CHROME EXTENSION</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="cs0-body">
        <aside className="cs0-nav-aside">
          <nav className="cs0-nav">
            {CS0_NAV.map(({ label, id }) => (
              <button
                key={id}
                className={`cs0-nav-item${activeSection === id ? ' cs0-nav-item--active' : ''}`}
                onClick={() => handleNavClick(id)}
              >
                <span className="cs0-nav-text main">{label}</span>
                <span className="cs0-nav-text trail trail1">{label}</span>
                <span className="cs0-nav-text trail trail2">{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="cs-content">

        {/* The Problem */}
        <section id="cs0-problem">
          <h2 className="cs0-h2">The Problem</h2>
          <div className="cs0-overview-callout">
            <h3 className="cs0-overview-callout__title">
              News today is optimized for speed, not clarity. 
            </h3>
            <p className="cs0-overview-callout__text">
              Most tools try to fix this by summarizing
              articles, but summaries alone don't address a deeper issue:{' '} <strong className='cs0-overview-callout__text-stronger'> how information is structured, framed, and interpreted. </strong>
            </p>
          </div>
          <p className="cs0-intro cs0-intro--mb8">
              Three gaps emerged:
          </p>

          <div className="cs0-problem-list">
            <div className="cs0-problem-card">
              <h3 className="cs0-problem-card__title">1. Content is compressed, not clarified</h3>
              <p className="cs0-problem-card__text">Summaries reduce length, but don't improve understanding</p>
            </div>
            <div className="cs0-problem-card">
              <h3 className="cs0-problem-card__title">2. Structure goes unnoticed</h3>
              <p className="cs0-problem-card__text">Readers rarely recognize how stories guide attention</p>
            </div>
            <div className="cs0-problem-card">
              <h3 className="cs0-problem-card__title">3. Missing context is invisible</h3>
              <p className="cs0-problem-card__text">Omitted perspectives and background are rarely surfaced</p>
            </div>
          </div>

          <div className='cs0-media1'> 
              <p className='cs0-problem-media__text'>How it works</p>
              <video src={demo_vid} className='cs0-media-link1'
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              ></video>
          </div>
        </section>

        {/* Research */}
        <section>
          <div className="cs0-section-header">
            <Users className="cs0-section-header__icon" />
            <h2 className="cs0-section-header__h2">
              Understanding How People Actually Read News
            </h2>
          </div>

          <p className="cs0-intro cs0-intro--mb12">
            Before designing, I conducted user interviews to understand how people consume, trust, and
            interpret news today. Participants ranged from casual readers to highly skeptical users,
            revealing a wide spectrum of behaviors—but consistent underlying patterns.
          </p>

          <div className="cs0-insights-container">
            <h3 className="cs0-h3">Key Insights</h3>

            <div className="cs0-grid-2col">
              <InsightCard
                number="1"
                title="Trust is fragmented and personal"
                items={[
                  'Trust is personal and heuristic-driven (authors, investors, tone)',
                  'Institutional trust is low across the board',
                  'Many users assume bias is always present',
                ]}
                quote="I don't even trust their weather analysis."
              />
              <InsightCard
                number="2"
                title="Readers scan before they commit"
                items={[
                  'Most users decide within seconds if an article is worth reading',
                  'Headlines, structure, and early signals are critical',
                ]}
                quote="15–30 seconds. If the intro is strong, I'll keep reading."
              />
              <InsightCard
                number="3"
                title="Structure and formatting heavily impact comprehension"
                items={[
                  'Large text blocks reduce engagement',
                  'Clear sections and visual breaks improve readability',
                  'Users prefer scannable formats',
                ]}
              />
              <InsightCard
                number="4"
                title="Bias is felt, but hard to articulate"
                items={[
                  'Users recognize tone, framing, and narrative patterns',
                  'But struggle to explain why something feels biased',
                ]}
                quote="You can tell by the language… but I don't know how to explain it."
              />
            </div>
          </div>
        </section>

        {/* Design Direction */}
        <section id="cs0-design">
          <h2 className="cs0-h2">Design Approach</h2>
          <div className="cs0-design-callout">
            <div className="cs0-grid-3col">
              <div className="cs0-design-card">
                <div className="cs0-design-card__number">1. Content </div>
                
                <p className="cs0-design-card__desc">What is explicitly being reported</p>
              </div>
              <div className="cs0-design-card">
                <div className="cs0-design-card__number">2. Structure</div>
                <p className="cs0-design-card__desc">How the story is constructed and framed</p>
              </div>
              <div className="cs0-design-card">
                  <div className="cs0-design-card__number">3. Context</div>
                <p className="cs0-design-card__desc">What is not included</p>
              </div>
            </div>
          </div>
          <div className='cs0-media2'>
              <h3 className='cs0-media2-title'>Exploring how trust and interpretation could be visually communicated</h3>
              <img src={rb_font_brainstorm} className='cs0-media2-img'></img>
          </div>
        </section>

        {/* Solution */}
        <section>
          <h2 className="cs0-h2 cs0-h2--mb4">Solution</h2>
          <p className="cs0-intro cs0-intro--lg">
            A Chrome extension that analyzes articles in real time and presents insights through
            structured cards.
          </p>

          <div className="cs0-solution-list">
            <SolutionCard
              icon={<FileText />}
              title="What's Being Reported"
              subtitle="Content Layer"
              // description="Extracts key claims from the article and prioritizes factual, neutral statements"
              impact="Gives users a quick understanding of what the article actually says, without interpretation."
            />
            <SolutionCard
              icon={<Users />}
              title="Sources & Attribution"
              subtitle="Credibility Layer"
              // description="Identifies who is speaking and maps quotes to named sources"
              impact="Helps users understand whose perspectives are shaping the narrative."
            />
            <SolutionCard
              icon={<AlertCircle />}
              title="What's Not Included"
              subtitle="Context Layer"
              // description="Surfaces missing perspectives and background, highlights gaps in coverage"
              impact="Encourages critical reading beyond the surface."
              highlight="This became the most differentiating feature, shifting the system from summarization to interpretation."
            />
            <SolutionCard
              icon={<Layers />}
              title="How the Story is Structured"
              subtitle="Structure Layer"
              // description="Analyzes how attention is guided and identifies framing choices and emphasis"
              impact="Articles don't just present information—they organize it to influence interpretation."
            />
            <SolutionCard
              icon={<MessageSquare />}
              title="Tone Indicators"
              subtitle="Language Layer"
              // description="Detects emotionally loaded language, highlights moral and certainty framing, surfaces notable rhetorical patterns"
              impact="Language subtly shapes perception, even when content appears neutral."
            />
            <SolutionCard
              icon={<Search />}
              title="Similar Coverage"
              subtitle="Comparative Layer"
              // description="Shows how other publishers report the same story"
              impact="Provides external perspective without requiring manual research."
            />
          </div>
        </section>

        {/* Attribution Deep Dive */}
        {/* <section className="cs0-attribution-section">
          <h3 className="cs0-h3">
            Behind the Scenes: Attribution Isn't Straightforward
          </h3>

          <p className="cs0-intro cs0-intro--mb8">
            Mapping quotes to speakers seems simple, but in practice it introduced a key constraint.
            Journalistic attribution is often:
          </p>

          <div className="cs0-attribution-grid">
            <div className="cs0-attribution-card">
              <p className="cs0-attribution-card__type">Indirect</p>
              <p className="cs0-attribution-card__example">"he said"</p>
            </div>
            <div className="cs0-attribution-card">
              <p className="cs0-attribution-card__type">Delayed</p>
              <p className="cs0-attribution-card__example">quote first, speaker later</p>
            </div>
            <div className="cs0-attribution-card">
              <p className="cs0-attribution-card__type">Split</p>
              <p className="cs0-attribution-card__example">quote → attribution → new quote</p>
            </div>
          </div>

          <div className="cs0-design-decision-box">
            <h4 className="cs0-design-decision-box__title">Design Decision: Prioritize Trust Over Coverage</h4>
            <p className="cs0-design-decision-box__text">
              Only show sources when attribution is reasonably reliable
            </p>
          </div>

          <div className="cs0-check-grid">
            <div className="cs0-check-card">
              <CheckCircle2 className="cs0-check-card__icon" />
              <h5 className="cs0-check-card__title">Skip unclear speakers</h5>
              <p className="cs0-check-card__text">
                Quotes without a confident name are excluded → avoids misleading outputs like "he" or
                "several voters"
              </p>
            </div>
            <div className="cs0-check-card">
              <CheckCircle2 className="cs0-check-card__icon" />
              <h5 className="cs0-check-card__title">Use local context</h5>
              <p className="cs0-check-card__text">
                Attribution is resolved within a paragraph → prevents incorrect cross-article
                assumptions
              </p>
            </div>
          </div>

          <div className="cs0-tradeoff-callout">
            <p className="cs0-tradeoff-callout__title">Tradeoff</p>
            <p className="cs0-tradeoff-callout__text">
              Fewer total sources shown, but significantly higher confidence in each one
            </p>
          </div>
        </section> */}

        {/* System Architecture */}
        <section id="cs0-architecture">
          <div className="cs0-section-header cs0-section-header--mb6">
            <GitBranch className="cs0-section-header__icon" />
            <h2 className="cs0-section-header__h2">System Architecture</h2>
          </div>

          <p className="cs0-intro cs0-intro--mb8">
            Many of these architectural decisions were driven not just by performance, but by a need to
            balance <strong>speed, interpretability, and user trust</strong>. We did this by combining
            deterministic processing with staged AI analysis.
          </p>

          <div className="cs0-pipeline-block">
            <p className="cs0-pipeline-text">
              Input → Extraction → Preprocessing → Signal Processing → AI Analysis → Structured Output → UI
            </p>
          </div>
          <div>
            <div className="cs0-arch-stages">
              {/* <ArchitectureStage
                stage="1"
                title="Extraction"
                timing="Instant"
                items={['DOM parsing of article content', 'Metadata extraction (headline, author, date)']}
              /> */}
              {/* <ArchitectureStage
                stage="2"
                title="Preprocessing"
                items={['Removes boilerplate content', 'Deduplicates text', 'Normalizes formatting']}
              /> */}
              <ArchitectureStage
                stage="3"
                title="Signal Processing"
                timing="Deterministic, Parallel"
                items={[
                  'Source detection using regex-based attribution',
                  'Language analysis using word-level dictionaries',
                ]}
                note="This layer ensures consistent results without relying on AI."
              />

              <div className="cs0-ai-stage">
                <div className="cs0-ai-stage__header">
                  <div className="cs0-ai-badge">4</div>
                  <h4 className="cs0-ai-stage__title">AI Analysis (Layered + Prioritized)</h4>
                </div>

                <div className="cs0-ai-stage-list">
                  <div className="cs0-ai-stage-item">
                    <div className="cs0-ai-stage-item__header">
                      <Zap className="cs0-ai-stage-item__zap" />
                      <p className="cs0-ai-stage-item__label">
                        Stage 1 — Critical Path (Blocking UI)
                      </p>
                    </div>
                    <p className="cs0-ai-stage-item__desc">Reported points • Missing context</p>
                    <p className="cs0-ai-stage-item__note">→ Delivers immediate value to the user</p>
                  </div>
                  <div className="cs0-ai-stage-item cs0-ai-stage-item--secondary">
                    <p className="cs0-ai-stage-item__label--standalone">
                      Stage 2 — Background (Enrichment)
                    </p>
                    <p className="cs0-ai-stage-item__desc">
                      Narrative structure • Tone observations
                    </p>
                    <p className="cs0-ai-stage-item__note">→ Adds depth without delaying interaction</p>
                  </div>
                  <div className="cs0-ai-stage-item cs0-ai-stage-item--tertiary">
                    <p className="cs0-ai-stage-item__label--standalone">
                      Stage 3 — Background + Web
                    </p>
                    <p className="cs0-ai-stage-item__desc">Similar coverage via live search</p>
                    <p className="cs0-ai-stage-item__note">→ Expands perspective beyond the article</p>
                  </div>
                </div>
              </div>

              {/* <ArchitectureStage
                stage="5"
                title="Structured Output"
                items={['Strict JSON schema', 'Validated outputs']}
                note="Ensures consistency between system layers and UI rendering"
              /> */}
              {/* <ArchitectureStage
                stage="6"
                title="UI Rendering"
                items={[
                  'Progressive loading',
                  'Cards appear in order of importance',
                  'Deeper insights load asynchronously',
                ]}
              /> */}
            </div>
          </div>
          <div className='cs0-media1'>
              <p style={{ marginBottom: '0.5rem' }}>Paywall State</p>
              {/* <img src={paywall_img} alt='paywall result in extension' className='cs0-media3'></img> */}
              <video src={paywall_demo}
                className='cs0-media-link1'
                autoPlay
                loop
                muted
                playsInline
                preload="auto">
              </video>
          </div>
        </section>

        {/* Technical Decisions */}
        <section id="cs0-tech-decisions">
          <div className="cs0-section-header">
            <Shield className="cs0-section-header__icon" />
            <h2 className="cs0-section-header__h2">Key Technical Decisions</h2>
          </div>

          <div className="cs0-grid-2col-tech">
            <TechnicalDecision
              title="Layered Analysis vs Single Request"
              tradeoff="Simpler architecture vs performance + control"
              decision="Split analysis into stages"
              impacts={[
                'Faster time to first insight',
                'Reduced token usage',
                'Better perceived performance',
              ]}
            />
            <TechnicalDecision
              title="Deterministic + AI Hybrid System"
              tradeoff="Fully AI-driven vs predictable outputs"
              decision="Use deterministic methods where reliability matters, AI where interpretation is needed"
              impacts={['More stable results', 'Reduced hallucination risk', 'Better system control']}
            />
            {/* <TechnicalDecision
              title="Schema-Constrained Outputs"
              tradeoff="Flexibility vs consistency"
              decision="Enforce strict JSON schema"
              impacts={['Reliable UI rendering', 'Easier debugging and iteration']}
            /> */}
            <TechnicalDecision
              title="Context Gap Detection Constraints"
              tradeoff="Richer insights vs risk of speculation"
              decision="Limit outputs to absence-based framing"
              impacts={['Preserves trust', 'Avoids hallucinated context']}
            />
            <TechnicalDecision
              title="Progressive Rendering Strategy"
              tradeoff="Full results vs immediate feedback"
              decision="Load critical insights first, enrich later"
              impacts={['Faster perceived performance', 'Better user engagement']}
            />
            {/* <TechnicalDecision
              title="Fallback & Resilience Design"
              decision="Build fallback logic for AI-dependent features"
              impacts={[
                'System remains functional under failure',
                'Avoids empty or broken states',
              ]}
            /> */}
          </div>
        </section>

        {/* Results */}
        <section id="cs0-results" className="cs0-results-section">
          <div className="cs0-section-header">
            <TrendingUp className="cs0-section-header__icon cs0-section-header__icon--green" />
            <h2 className="cs0-section-header__h2">Results (Projected)</h2>
          </div>

          <div className="cs0-results-grid">
            <ResultMetric value="98%" label="Successful article structuring" />
            <ResultMetric value="~4s" label="Time to first insight" />
            <ResultMetric value="99%" label="Schema validation success" />
            <ResultMetric value="~12%" label="Fallback usage rate" />
          </div>
        </section>

        {/* Reflection */}
        <section id="cs0-reflection">
          <h2 className="cs0-h2">Reflection</h2>

          <div className="cs0-reflection-callout">
            <p className="cs0-reflection-callout__text">
                This project evolved from summarization into helping users understand how information is constructed.
            </p>
            <p className="cs0-reflection-callout__subtext">
                Through building the system, I realized that <strong> clarity</strong> doesn't <strong>come from</strong> reducing content,
              but from <strong>exposing structure, attribution, and gaps</strong>.
            </p>
          </div>

          <h3 className="cs0-takeaways-heading">Key Takeaways</h3>

          <div className="cs0-takeaways-list">
            {/* <div className="cs0-takeaway-card">
              <h4 className="cs0-takeaway-card__title">
                Understanding comes from structure, not just content
              </h4>
              <p className="cs0-takeaway-card__text">
                The way information is organized shapes interpretation as much as the information itself.
              </p>
            </div> */}
            <div className="cs0-takeaway-card">
              <h4 className="cs0-takeaway-card__title">Constraints improve trust</h4>
              <p className="cs0-takeaway-card__text">
                Limiting what the system shows—especially in attribution and context detection—led to
                more reliable, predictable outputs.
              </p>
            </div>
            <div className="cs0-takeaway-card">
              <h4 className="cs0-takeaway-card__title">UX decisions extend into system design</h4>
              <p className="cs0-takeaway-card__text">
                Choices like progressive loading, layered analysis, and deterministic parsing weren't
                just technical—they directly shaped how users experience clarity and confidence.
              </p>
            </div>
          </div>

          <div className="cs0-looking-forward">
            <h4 className="cs0-looking-forward__title">Looking Forward</h4>
            <p className="cs0-looking-forward__intro">
              There are still open questions I'm interested in exploring:
            </p>
            <ul className="cs0-looking-forward__list">
              <li className="cs0-looking-forward__item">
                <span className="cs0-looking-forward__bullet">•</span>
                <span>How users interpret and act on "missing context"</span>
              </li>
              <li className="cs0-looking-forward__item">
                <span className="cs0-looking-forward__bullet">•</span>
                <span>How comparative coverage influences trust in a single article</span>
              </li>
              <li className="cs0-looking-forward__item">
                <span className="cs0-looking-forward__bullet">•</span>
                <span>How this system could adapt to different reading behaviors over time</span>
              </li>
            </ul>
          </div>
        </section>
      <div className='cs0-footer'>
            <a className='footer-link' href='https://github.com/alexiswest98/ReadingBetween_ChromeExtension' target="_blank" rel="noopener noreferrer">github repo</a>
            <a className='footer-link' href='https://www.figma.com/design/qJEcmboSRUfWgc2c4jQlv7/Read-Between-AI-Chrome-Extension?node-id=513-601&t=Hn30t3EncrA5FyAQ-1' target="_blank" rel="noopener noreferrer">figma files</a>
      </div>
        </div> {/* cs-content */}
      </div> {/* cs0-body */}
      
    </div>
  )
}

export default CaseStudy0
