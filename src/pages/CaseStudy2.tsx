import {
  Heart,
  CheckCircle2,
  TrendingUp,
  Target,
  ArrowLeft,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CaseStudy.css'
import './CaseStudy0.css'
import './CaseStudy1.css'
import './CaseStudy2.css'
import MHASF_logo from '../assets/MHASF_logo.png'

gsap.registerPlugin(ScrollTrigger)

const CS2_NAV = [
  { label: 'The Problem',                   id: 'cs2-problem' },
  { label: 'Key Insight',                   id: 'cs2-insight' },
  { label: 'Designing for Sensitive Contexts', id: 'cs2-sensitive' },
  { label: 'Approach',                      id: 'cs2-approach' },
  { label: 'Impact',                        id: 'cs2-impact' },
  { label: 'Reflection',                    id: 'cs2-reflection' },
]

// ── Supporting Components ─────────────────────────────────────────────────────

function ApproachCard({
  number,
  title,
  description,
  insight,
  changes,
  outcome,
}: {
  number: string
  title: string
  description?: string
  insight?: string
  changes: string[]
  outcome?: string
}) {
  return (
    <div className="arch-stage">
      <div className="arch-stage__header">
        <div className="arch-stage-badge">{number}</div>
        <div className="arch-stage__content">
          <div className="arch-stage__title-row">
            <h4 className="arch-stage__title">{title}</h4>
          </div>
          {description && <p className="cs0-intro" style={{ marginBottom: '0.75rem' }}>{description}</p>}
          {insight && (
            <div className="insight-card__quote" style={{ marginBottom: '0.75rem' }}>
              <p className="insight-card__quote-text">{insight}</p>
            </div>
          )}
          <p className="tech-decision__label" style={{ marginBottom: '0.4rem' }}>Changes</p>
          <ul className="arch-stage__items">
            {changes.map((change, idx) => (
              <li key={idx} className="arch-stage__item">
                <CheckCircle2 className="tech-decision__check-icon" size={14} />
                <span>{change}</span>
              </li>
            ))}
          </ul>
          {outcome && (
            <div className="arch-stage__note" style={{ marginTop: '0.75rem' }}>
              <p className="arch-stage__note-text">{outcome}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ExecutionCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="cs0-check-card">
      <h4 className="cs0-check-card__title">{title}</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {items.map((item, idx) => (
          <li key={idx} className="cs0-check-card__text" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
            <span className="cs0-looking-forward__bullet" style={{ marginTop: '0.2rem' }}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
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

const CaseStudy2 = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('')

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      CS2_NAV.forEach(({ id }) => {
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

      {/* Hero */}
      <header className="cs0-hero">
        <button
          onClick={() => navigate('/', { state: { scrollTo: 'works' } })}
          className="cs0-hero__back-btn"
          aria-label="Go back"
        >
          <ArrowLeft className="cs0-hero__back-icon" />
        </button>
        <div className="cs0-hero__inner">
          <div className="cs0-hero__top">
            <a href="https://www.mentalhealthsf.org/" target="_blank" rel="noopener noreferrer">
              <img src={MHASF_logo} alt="MHASF logo" className="rb2-logo" />
            </a>
            <h1 className="cs2-hero-title">Rebuilding a Mental Health Platform Without Structure</h1>
            <p className="cs0-hero__subtitle">
              Bringing clarity, trust, and structure to a platform used in high-stress, real-world situations
            </p>
            <div>
              <div className="case-study0-tags-container extra-tags-border">
                <div className="case-study0-tags">UX DESIGN</div>
                <div className="case-study0-tags tag-blue">INFORMATION ARCHITECTURE</div>
                <div className="case-study0-tags tag-blue">ACCESIBILITY</div>
                <div className="case-study0-tags tag-blue">STAKEHOLDER COLLABORATION</div>
              </div>
            <div className="cs2-hero-meta">
              <div className='cs2-hero-containers'>
                <span className="cs2-hero-meta__label">Role</span>
                <span className="cs2-hero-meta__value">Web Developer / UX Designer</span>
              </div>
              <div className='cs2-hero-containers'>
                <span className="cs2-hero-meta__label">Timeline</span>
                <span className="cs2-hero-meta__value">2 years (2023–2025)</span>
              </div>
              <div className='cs2-hero-containers'>
                <span className="cs2-hero-meta__label">Organization</span>
                <span className="cs2-hero-meta__value">Mental Health Association of San Francisco</span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </header>

      <div className="cs0-body">

        {/* Left nav */}
        <aside className="cs0-nav-aside">
          <nav className="cs0-nav">
            {CS2_NAV.map(({ label, id }) => (
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

          {/* ── The Problem (includes Overview) ──────────────────────────── */}
          <section id="cs2-problem">
            <h2 className="cs0-h2">The Problem</h2>

            {/* Overview callout */}
            <div className="cs0-overview-callout">
              <p className="cs0-overview-callout__text">
                From 2023–2025, I worked as a Web Developer / UX Designer at the Mental Health
                Association of San Francisco, leading the redesign of a website used by individuals{' '}
                <strong className="cs0-overview-callout__text-stronger">
                  actively seeking mental health support—but struggling to find it quickly.
                </strong>
              </p>
            </div>

            <p className="cs0-intro cs0-intro--mb8">
              This was not a typical redesign. The challenge was bringing clarity, trust, and structure
              to a platform used in high-stress, real-world situations—without existing systems in place.
            </p>

            {/* Constraints */}
            <div className="cs2-constraint-card">
              <h3 className="cs2-constraint-card__title">Constraints</h3>
              <ul className="cs2-constraint-card__items">
                <li className="cs2-constraint-card__item">
                  <span className="cs2-constraint-card__bullet">•</span>
                  <span>No design system or consistent patterns</span>
                </li>
                <li className="cs2-constraint-card__item">
                  <span className="cs2-constraint-card__bullet">•</span>
                  <span>Outdated, fragmented content across teams</span>
                </li>
                <li className="cs2-constraint-card__item">
                  <span className="cs2-constraint-card__bullet">•</span>
                  <span>No ownership over site updates</span>
                </li>
                <li className="cs2-constraint-card__item">
                  <span className="cs2-constraint-card__bullet">•</span>
                  <span>Sensitive subject matter requiring careful communication</span>
                </li>
              </ul>
            </div>

            <p className="cs0-intro cs0-intro--mb8">
              The website acted as a critical entry point for support—but made access harder than it
              should be.
            </p>

            <div className="cs0-problem-list">
              <div className="cs1-problem-card">
                <p className="cs0-problem-card__text">Deeply nested pages</p>
              </div>
              <div className="cs1-problem-card">
                <p className="cs0-problem-card__text">Unclear pathways to key resources</p>
              </div>
              <div className="cs1-problem-card">
                <p className="cs0-problem-card__text">Outdated or inconsistent information</p>
              </div>
            </div>

            <div className="cs1-flow-section cs1-flow-section--blue" style={{ marginTop: '2rem' }}>
              <p className="cs1-flow-section__label">Result</p>
              <p className="cs0-overview-callout__text-stronger" style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                Friction at the exact moment users needed clarity.
              </p>
              <p className="insight-card__body-text">
                The platform struggled with clarity, trust, and accessibility—especially for users in
                vulnerable mental health states.
              </p>
            </div>
          </section>

          {/* ── Key Insight ──────────────────────────────────────────────── */}
          <section id="cs2-insight">
            <div className="cs1-callout-yellow">
              <p className="cs1-callout-yellow__label">Key Insight</p>
              <p className="cs1-callout-yellow__text">
                Users weren't exploring, they were trying to act quickly.
              </p>
              <ul className="insight-card__items" style={{ marginTop: '1.25rem' }}>
                <li className="insight-card__item">
                  <CheckCircle2 size={16} className="insight-card__bullet" />
                  <span>Scanning instead of reading</span>
                </li>
                <li className="insight-card__item">
                  <CheckCircle2 size={16} className="insight-card__bullet" />
                  <span>Looking for immediate support (Warm Line Number, Program Contacts, Resources Available)</span>
                </li>
                <li className="insight-card__item">
                  <CheckCircle2 size={16} className="insight-card__bullet" />
                  <span>Dropping off when information wasn't obvious</span>
                </li>
              </ul>
              <p className="cs0-overview-callout__text-stronger" style={{ marginTop: '1.25rem', fontSize: '1rem' }}>
                This shifted the goal from "informational website" → action-oriented support system
              </p>
            </div>
          </section>

          {/* ── Designing for Sensitive Contexts ─────────────────────────── */}
          <section id="cs2-sensitive">
            <div className="cs0-section-header">
              <Heart className="cs0-section-header__icon" size={32} />
              <h2 className="cs0-section-header__h2">Designing for Sensitive Contexts</h2>
            </div>

            <p className="cs0-intro cs0-intro--mb12">
              This work required a high level of care beyond standard UX decisions.
            </p>

            <div className="cs0-arch-stages">
              {/* Tone & Language */}
              <div className="cs2-sensitive-card">
                <h3 className="cs2-sensitive-card__title">Tone & Language</h3>
                <p className="cs2-sensitive-card__text">Content needed to feel:</p>
                <div className="cs2-sensitive-card__tags">
                  <div className="cs2-sensitive-card__tag">Non-judgmental</div>
                  <div className="cs2-sensitive-card__tag">Clear and human</div>
                  <div className="cs2-sensitive-card__tag">Emotionally safe</div>
                </div>
                <div className="insight-card__quote">
                  <p className="insight-card__quote-text" style={{ marginBottom: '0.5rem' }}>
                    Example (Hoarding content): "Blaming someone for having too many possessions… is like
                    blaming a person with schizophrenia for hearing voices."
                  </p>
                  <p className="insight-card__highlight-text">This reframing reduced stigma and built trust.</p>
                </div>
              </div>

              {/* Visual Considerations */}
              <div className="cs2-sensitive-card">
                <h3 className="cs2-sensitive-card__title">Visual Considerations</h3>
                <p className="cs2-sensitive-card__text">Even small design choices carried weight.</p>
                <ul className="cs2-sensitive-card__items">
                  <li className="cs2-sensitive-card__item">
                    <span className="cs2-sensitive-card__bullet">•</span>
                    <span>Avoided imagery with unintended associations (e.g., telephone wires)</span>
                  </li>
                  <li className="cs2-sensitive-card__item">
                    <span className="cs2-sensitive-card__bullet">•</span>
                    <span>Used illustration to better represent diverse communities</span>
                  </li>
                  <li className="cs2-sensitive-card__item">
                    <span className="cs2-sensitive-card__bullet">•</span>
                    <span>Designed to reduce overwhelm rather than attract attention</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Guiding Principles */}
            <div className="cs0-design-callout" style={{ marginTop: '1.5rem' }}>
              <p className="cs0-design-callout__text">Guiding Principles</p>
              <div className="cs0-grid-2col">
                <div className="cs0-design-card">
                  <p className="cs0-design-card__desc">Reduce cognitive load</p>
                </div>
                <div className="cs0-design-card">
                  <p className="cs0-design-card__desc">Prioritize clarity over completeness</p>
                </div>
                <div className="cs0-design-card">
                  <p className="cs0-design-card__desc">Avoid triggering or ambiguous language</p>
                </div>
                <div className="cs0-design-card">
                  <p className="cs0-design-card__desc">Design for emotional safety</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Approach (includes Execution + Key Decisions) ─────────────── */}
          <section id="cs2-approach">
            <h2 className="cs0-h2">Approach</h2>

            <div className="cs0-arch-stages">
              <ApproachCard
                number="1"
                title="Restructuring Information Architecture"
                changes={[
                  'Reduced nested navigation',
                  'Prioritized immediate access to support (Warm Line, Services)',
                  'Organized content around user intent, not internal teams',
                ]}
                outcome="Faster access to critical resources"
              />
              <ApproachCard
                number="2"
                title="Aligning Content with Behavior"
                insight="Users scan for help—they don't read to understand systems."
                changes={[
                  'Shortened content blocks drastically',
                  'Clear entry points to action',
                  'Removed unnecessary friction',
                ]}
              />
              <ApproachCard
                number="3"
                title="Building Internal Systems"
                description="The biggest long-term issue wasn't design—it was maintenance."
                changes={[
                  'Cross-team content syncs',
                  'Notion tracking for updates',
                  'A lightweight ticketing system',
                  'Clear ownership across site sections',
                ]}
                outcome="The website became maintainable, not static"
              />
            </div>

            {/* Execution sub-section */}
            <div className="cs2-subsection-header">
              <h3 className="cs0-section-header__h2">Execution</h3>
            </div>
            <p className="cs0-intro cs0-intro--mb8">Key implementation decisions and technical work.</p>
            <div className="cs0-check-grid">
              <ExecutionCard
                title="Platform Migration"
                items={['WordPress → Framer', 'Faster design to prod', 'Reduced plugin bloat to improve load performance']}
              />
              <ExecutionCard
                title="Design System"
                items={[
                  'Created a design system with hi-fidelity wireframes in Figma',
                  'Introduced core components, typography, and layout patterns',
                  'Created consistency across pages',
                ]}
              />
              <ExecutionCard
                title="Content & Media"
                items={[
                  'Migrated and restructured blog and media content in the CMS',
                  'Improved resource discoverability through SEO optimization',
                  'Designed inclusive graphics in Adobe Illustrator to address limited media assets'
                ]}
              />
              <ExecutionCard
                title="Support Access"
                items={[
                  'Implemented a multi-channel support widget (chat, call, text) with API integration',
                  'Reduced friction in reaching help',
                  'Integrated interactive calendars for support groups'
                ]}
              />
            </div>

            {/* Key Decisions sub-section */}
            <div className="cs2-subsection-header">
              <Target className="cs0-section-header__icon" size={28} />
              <h3 className="cs0-section-header__h2">Key Decisions</h3>
            </div>
            <div className="cs0-takeaways-list">
              <div className="cs0-takeaway-card">
                <p className="cs0-takeaway-card__text">Prioritized access over aesthetics</p>
              </div>
              <div className="cs0-takeaway-card">
                <p className="cs0-takeaway-card__text">Simplified language for accessibility</p>
              </div>
              <div className="cs0-takeaway-card">
                <p className="cs0-takeaway-card__text">Designed for scanning, not reading</p>
              </div>
              <div className="cs0-takeaway-card">
                <p className="cs0-takeaway-card__text">Expanded support channels (call, text, chat)</p>
              </div>
              <div className="cs0-takeaway-card">
                <p className="cs0-takeaway-card__text">Focused on systems, not just screens</p>
              </div>
            </div>
          </section>

          {/* ── Impact ───────────────────────────────────────────────────── */}
          <section id="cs2-impact">
            <div className="cs0-results-section">
              <div className="cs0-section-header">
                <TrendingUp className="cs0-section-header__icon cs0-section-header__icon--green" size={32} />
                <h2 className="cs0-section-header__h2">Impact</h2>
              </div>
              <div className="cs0-results-grid">
                <ResultMetric value="+45.61%" label="Increase in engagement time" />
                <ResultMetric value="+160,000" label="Users year-over-year" />
                <ResultMetric value="+1,100" label="Newsletter sign-ups (1,300 → 2,400)" />
                <ResultMetric value="+30%" label="Training Program client contacts (supported revenue retention)" />
              </div>
              <div className="arch-stage__note" style={{ marginTop: '1.5rem' }}>
                <p className="arch-stage__note-text">
                  These results indicate users were able to find relevant information faster and engage
                  more meaningfully with support resources.
                </p>
              </div>
            </div>
          </section>

          {/* ── Reflection ───────────────────────────────────────────────── */}
          <section id="cs2-reflection">
            <h2 className="cs0-h2">Reflection</h2>

            <div className="cs1-callout-yellow" style={{ marginBottom: '2rem' }}>
              <p className="cs1-callout-yellow__label">This project shifted how I think about design—from screens to systems.</p>
              <p className="cs1-callout-yellow__text" style={{ fontSize: '1rem' }}>
                I learned how to operate in ambiguity, align multiple teams, and design for sensitive,
                real-world use cases.
              </p>
            </div>

            <h3 className="cs0-h3">Key Takeaways</h3>
            <div className="cs0-takeaways-list" style={{ marginBottom: '3rem' }}>
              <div className="cs0-takeaway-card">
                <p className="cs0-takeaway-card__title">Operate in ambiguity</p>
                <p className="cs0-takeaway-card__text">Navigate complex situations without clear frameworks</p>
              </div>
              <div className="cs0-takeaway-card">
                <p className="cs0-takeaway-card__title">Align multiple teams</p>
                <p className="cs0-takeaway-card__text">Build systems that work across organizations</p>
              </div>
              <div className="cs0-takeaway-card">
                <p className="cs0-takeaway-card__title">Design for real-world use</p>
                <p className="cs0-takeaway-card__text">Handle sensitive contexts with care and intention</p>
              </div>
            </div>

            <div className="cs0-looking-forward">
              <h4 className="cs0-looking-forward__title">If Revisited Today</h4>
              <ul className="cs0-looking-forward__list">
                <li className="cs0-looking-forward__item">
                  <span className="cs0-looking-forward__bullet">•</span>
                  <span>Strengthen visual hierarchy and interaction patterns</span>
                </li>
                <li className="cs0-looking-forward__item">
                  <span className="cs0-looking-forward__bullet">•</span>
                  <span>Introduce usability testing earlier</span>
                </li>
                <li className="cs0-looking-forward__item">
                  <span className="cs0-looking-forward__bullet">•</span>
                  <span>Further refine accessibility standards</span>
                </li>
                <li className="cs0-looking-forward__item">
                  <span className="cs0-looking-forward__bullet">•</span>
                  <span>Elevate design with cleaner visuals and a more human-centered approach</span>
                </li>
              </ul>
            </div>

            {/* <div className="cs1-callout-yellow" style={{ marginTop: '3rem' }}>
              <p className="cs1-callout-yellow__label">Takeaway</p>
              <p className="cs1-callout-yellow__text">
                I brought structure, clarity, and measurable impact to a complex, low-resource
                environment—turning a fragmented website into a more accessible and maintainable
                support platform.
              </p>
            </div> */}
          </section>

        </div>
      </div>


    </div>
  )
}

export default CaseStudy2
