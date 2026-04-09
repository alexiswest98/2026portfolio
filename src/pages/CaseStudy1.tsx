import {
  Users,
  Eye,
  CheckCircle2,
  BarChart3,
  Target,
  CircleDollarSign,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CaseStudy.css';
import './CaseStudy0.css';
import './CaseStudy1.css';
import CapitalOne_logo from '../assets/CapitalOne_logo.png';
import CO_oldAccount from '../assets/CO_oldAccount.png';
import DEMO_bank from '../assets/todayDEMO_bank.mp4';
import C0_manage_account from '../assets/CO_NewManageAccount.png';
import CO_new_home from '../assets/CO_NewHomeScreen.png';
import CO_virtual_card from '../assets/CO_virtual_card.png';
import CO_account_home from '../assets/CO_NewAccountHome.png';

gsap.registerPlugin(ScrollTrigger)

const CS1_NAV = [
  { label: 'Problem',         id: 'cs1-problem' },
  { label: 'User Research',   id: 'cs1-research' },
  { label: 'Design Approach', id: 'cs1-design' },
  { label: 'Design Flows',    id: 'cs1-flows' },
  { label: 'Measurement',     id: 'cs1-measurement' },
  { label: 'Reflection',      id: 'cs1-reflection' },
]

// ── Supporting Components ─────────────────────────────────────────────────────

function UserFeedbackCard({
  number,
  title,
  quotes,
  insight,
  isHighlight = false,
}: {
  number: string
  title: string
  quotes: string[]
  insight: string
  isHighlight?: boolean
}) {
  return (
    <div className={`insight-card${isHighlight ? ' insight-card--highlight' : ''}`}>
      <div className="insight-card__header">
        <div className="insight-number-badge">{number}</div>
        <h4 className="insight-card__title">{title}</h4>
      </div>
      <ul className="insight-card__items">
        {quotes.map((quote, idx) => (
          <li key={idx} className="insight-card__quote">
            <p className="insight-card__quote-text">"{quote}"</p>
          </li>
        ))}
      </ul>
      {isHighlight ? (
        <div className="insight-card__highlight">
          <p className="insight-card__highlight-text">{insight}</p>
        </div>
      ) : (
        <p className="insight-card__body-text">{insight}</p>
      )}
    </div>
  )
}


function FlowHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="cs0-section-header">
      <div className="arch-stage-badge">{number}</div>
      <h3 className="cs0-section-header__h2">{title}</h3>
    </div>
  )
}

function FlowSection({
  label,
  content,
  items,
  conclusion,
  color = 'blue',
}: {
  label: string
  content?: string
  items?: string[]
  conclusion?: string
  color?: 'red' | 'blue' | 'green'
}) {
  return (
    <div className={`cs1-flow-section cs1-flow-section--${color}`}>
      <p className="cs1-flow-section__label">{label}</p>
      {content && <p className="cs1-flow-section__content">{content}</p>}
      {items && (
        <ul className="cs1-flow-section__items">
          {items.map((item, idx) => (
            <li key={idx} className="cs1-flow-section__item">
              <CheckCircle2 className="cs1-flow-section__item-icon" size={16} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {conclusion && <p className="cs1-flow-section__conclusion">{conclusion}</p>}
    </div>
  )
}

function MeasurementCard({
  title,
  subtitle,
  description,
  metrics,
  highlight,
}: {
  title: string
  subtitle: string
  description?: string
  metrics: string[]
  highlight?: string
}) {
  return (
    <div className="cs1-measurement-card">
      <h4 className="cs1-measurement-card__title">{title}</h4>
      <p className="cs1-measurement-card__subtitle">{subtitle}</p>
      {description && <p className="cs1-measurement-card__desc">{description}</p>}
      <ul className="cs1-measurement-card__items">
        {metrics.map((metric, idx) => (
          <li key={idx} className="cs1-measurement-card__item">
            <CheckCircle2 className="cs1-measurement-card__item-icon" size={16} />
            <span>{metric}</span>
          </li>
        ))}
      </ul>
      {highlight && (
        <div className="cs1-measurement-card__highlight">
          <p className="cs1-measurement-card__highlight-text">{highlight}</p>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const CaseStudy1 = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('')
  const [flowImg, setFlowImg] = useState(0)
  const flowImages = [CO_account_home, C0_manage_account]

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

      CS1_NAV.forEach(({ id }) => {
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
          onClick={() => navigate('/', { state: { scrollTo: 'case-study-1' } })}
          className="cs0-hero__back-btn"
          aria-label="Go back"
        >
          <ArrowLeft className="cs0-hero__back-icon" />
        </button>
        <div className="cs0-hero__inner">
          <div className="cs0-hero__top">
            <img src={CapitalOne_logo} alt="Capital Onelogo" className='rb1-logo'></img>
            <h1 className="cs1-hero-title">Mobile Experience</h1>
            <p className="cs0-hero__subtitle">
              Redesigning financial clarity: Making payment status immediately understandable
            </p>
            <div>
              <div className="case-study0-tags-container extra-tags-border">
                <div className="case-study0-tags">UX/UI DESIGN</div>
                <div className="case-study0-tags">FINTECH DESIGN</div>
                <div className="case-study0-tags tag-blue">UX AUDIT</div>
                <div className="case-study0-tags tag-blue">INFORMATION ARCHITECTURE</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="cs0-body">
        {/* Left nav */}
        <aside className="cs0-nav-aside">
          <nav className="cs0-nav">
            {CS1_NAV.map(({ label, id }) => (
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

          {/* ── Problem ─────────────────────────────────────────────────── */}
          <section id="cs1-problem">
            <h2 className="cs0-h2">Problem</h2>
            <div className="cs0-overview-callout">
              <h3 className="cs0-overview-callout__title">
                Financial apps don't just help people manage money, they shape how people{' '}
                feel about their financial stability.
              </h3>
              <p className="cs0-overview-callout__text">
                In the Capital One mobile experience, <strong className="cs0-overview-callout__text-stronger"> key payment details</strong>—minimum payment, due date, and
                payment status—<strong className="cs0-overview-callout__text-stronger">aren't consistently prioritized in the interface.</strong>
            </p>
            </div>
            <p className="cs0-intro cs0-intro--mb8">They're technically there, but often:</p>
            <div className='cs0-problem-container'>
              <div className='cs0-problem-container-left'>
                <div className="cs0-problem-list">
                  <div className="cs1-problem-card">
                    <p className="cs0-problem-card__text">Revealed only after interaction</p>
                  </div>
                  <div className="cs1-problem-card">
                    <p className="cs0-problem-card__text">Competing with promotional content</p>
                  </div>
                  <div className="cs1-problem-card">
                    <p className="cs0-problem-card__text">Positioned lower in the visual hierarchy</p>
                  </div>
                  <div className="cs1-problem-card">
                    <p className="cs0-problem-card__text">Section labels don’t align with user mental models, making key information harder to locate</p>
                  </div>
                </div>
                <div className="cs1-flow-section cs1-flow-section--blue cs0-intro--mb8" style={{ marginTop: '2rem' }}>
                  <p className="cs0-overview-callout__text-stronger" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    "Am I on track, or do I owe something right now?"
                  </p>
                  <p className="insight-card__body-text">So something simple becomes effortful</p>
                </div>
              </div>
              <div className='cs0-problem-container-right'>
                <p className='cs0-problem-media__text'><strong>Before redesign</strong></p>
                <p className='cs0-problem-media__subtext'>3+ interactions required to reach payment details</p>
                <img src={CO_oldAccount} alt='Current Capital One Mobile Account View' className='cs1-media1'></img>
              </div>
            </div>
          </section>

          {/* ── Why This Matters ────────────────────────────────────────── */}
          <section>
            <h2 className="cs0-h2">Why This Matters</h2>
            <p className="cs0-intro cs0-intro--lg">
              When this question isn't answered immediately, the issue isn't just usability—it's{' '}
              <strong>trust</strong>.
            </p>
            <div className="cs1-why-card">
              <h3 className="cs1-why-card__title">In payment flows:</h3>
              <div className="cs1-why-card__items">
                <div className="cs1-why-card__item">
                  <div className="cs1-why-card__bullet" />
                  <p className="cs1-why-card__item-text">What shows up first signals what matters</p>
                </div>
                <div className="cs1-why-card__item">
                  <div className="cs1-why-card__bullet" />
                  <p className="cs1-why-card__item-text">What's hidden creates doubt</p>
                </div>
                <div className="cs1-why-card__item">
                  <div className="cs1-why-card__bullet" />
                  <p className="cs1-why-card__item-text">What competes for attention creates friction</p>
                </div>
              </div>
              {/* <p className="cs1-why-card__note">
                And when that friction shows up around money, users don't just get annoyed—they start
                to question the system itself.
              </p> */}
              <div className='cs1-business-implic'>
                <h3 className="cs1-bus__title">Business impact:</h3>
                <p>In a competitive market, hidden payment details can shake user confidence, risking churn and missed payments.<strong> Clear, immediate information strengthens trust and retention.</strong></p>
              </div>
            </div>
          </section>

          {/* ── Key Insight ─────────────────────────────────────────────── */}
          <section>
            <div className="cs1-callout-yellow">
              <p className="cs1-callout-yellow__label">Key Insight</p>
              <p className="cs1-callout-yellow__text">
                People aren't opening a finance app to explore, they're opening it for{' '}
                reassurance.
              </p>
            </div>
          </section>

          {/* ── User Research ────────────────────────────────────────────── */}
          <section id="cs1-research">
            <div className="cs0-section-header">
              <Users className="cs0-section-header__icon" size={32} />
              <h2 className="cs0-section-header__h2">What I Heard from Users</h2>
            </div>
            <p className="cs0-intro cs0-intro--mb12">
              I reviewed 50–100 recent app store reviews to understand where the experience breaks down.
              Three patterns showed up consistently:
            </p>
            <div className="cs0-solution-list">
              <UserFeedbackCard
                number="1"
                title="Why is the most important info so hard to find?"
                quotes={[
                  'Features that are highest use are buried',
                  'I have to go through make a payment just to check my balance',
                ]}
                // insight="Basic financial information requires too much effort to access."
              />
              <UserFeedbackCard
                number="2"
                title="I just want to manage my money—not fight the UI"
                quotes={['Bombarded with ads', 'Popups every time']}
                // insight="Promotional content is interrupting high-intent tasks."
              />
              <UserFeedbackCard
                number="3"
                title="Can I trust what I'm seeing?"
                quotes={[
                  "Payment wasn't successful but the app adjusted everything",
                  'Feels like a scam',
                ]}
                insight="This is the real problem. When payment states aren't clear or reliable, users don't just lose clarity—they lose confidence."
                isHighlight
              />
            </div>
          </section>

          {/* ── Design Approach ──────────────────────────────────────────── */}
          <section id="cs1-design">
            <h2 className="cs0-h2">Design Approach</h2>
            <div className="cs0-design-callout">
              <p className="cs0-design-callout__text">
                Instead of adding features, I focused on restructuring the experience around one goal:{' '}
                <strong>make financial status immediately understandable.</strong>
              </p>
              <div className="cs0-grid-2col">
                <div className="cs0-design-card">
                  <div className="cs0-design-card__number"><Eye size={18} style={{ display: 'inline', marginRight: '0.4rem' }} />Visibility</div>
                  <p className="cs0-design-card__desc">Show payment status up front, not on demand</p>
                </div>
                <div className="cs0-design-card">
                  <div className="cs0-design-card__number"><Target size={18} style={{ display: 'inline', marginRight: '0.4rem' }} />Intent</div>
                  <p className="cs0-design-card__desc">Align navigation with user intent, not feature lists</p>
                </div>
                <div className="cs0-design-card">
                  <div className="cs0-design-card__number"><CircleDollarSign size={18} style={{ display: 'inline', marginRight: '0.4rem' }} />Separation</div>
                  <p className="cs0-design-card__desc">Separate money tasks from marketing content</p>
                </div>
                <div className="cs0-design-card">
                  <div className="cs0-design-card__number"><CheckCircle2 size={18} style={{ display: 'inline', marginRight: '0.4rem' }} />Clarity</div>
                  <p className="cs0-design-card__desc">Make every state (including "no payment due") explicit and unambiguous</p>
                </div>
              </div>
            </div>
            <div className='cs1-media2-container'>
              <video src={DEMO_bank} className='cs1-media2'
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              ></video>
            </div>
          </section>

          {/* ── Design Flows ─────────────────────────────────────────────── */}
          <section id="cs1-flows">
            <div className="cs1-callout-blue">
              <h2 className="cs0-h2" >Design Flows</h2>
              <p className="cs1-callout-blue__subtitle">
                Restructuring key user journeys for clarity and confidence
              </p>
            </div>

            {/* Flow 1 */}
            <div className="cs1-flow-group">
              <FlowHeader number="1" title="Home → Payment Clarity" />
              <div className="cs1-flow-stack">
                <FlowSection
                  label="The Issue"
                  content="The home screen tries to do too much at once. Account data, rewards, and promotions all compete for attention, making it harder to answer the one question users actually care about."
                  color="red"
                />
                <div className='cs1-flow1-gold'>
                  <div className='cs1-flow1-gold-left'>
                    <FlowSection
                      label="What I Changed"
                      content="I restructured the screen so financial status becomes the entry point:"
                      items={[
                        'Introduced a clear, scannable payment state',
                        'Moved secondary content below the fold',
                        'Reduced visual competition without removing functionality',
                      ]}
                      color="blue"
                    />
                    <div className="cs1-flow-unlocks">
                      <p className="cs1-flow-unlocks__label">What This Unlocks</p>
                      <p className="cs1-flow-unlocks__text">The experience shifts from:</p>
                      <div className="cs1-flow-unlocks__exchange">
                        <p className="cs1-flow-unlocks__before">"Let me figure this out"</p>
                        <p className="cs1-flow-unlocks__arrow">to:</p>
                        <p className="cs1-flow-unlocks__after">"Got it! I'm good." (or "I need to act")</p>
                      </div>
                      <p className="cs1-flow-unlocks__note">That clarity happens immediately, without navigation.</p>
                    </div>
                  </div>
                  <div className="cs1-img-carousel">
                    <img src={CO_new_home} alt='New Home Screen Layout' className='cs1-flow-gold-img'></img>
                  </div>

                </div>


                <FlowSection
                  label="Result"
                  content="In usability testing (n=10):"
                  items={[
                    '10/10 users identified their payment status without scrolling',
                    '8/10 users understood their status in under 5 seconds',
                    'No users hesitated before interpreting whether action was needed',
                  ]}
                  conclusion="This confirmed that prioritizing payment hierarchy reduced the need for scanning and interpretation."
                  color="green"
                />
              </div>
            </div>

            {/* Flow 2 */}
            <div className="cs1-flow-group">
              <FlowHeader number="2" title="Account → Payment & Management" />
              <div className="cs1-flow-stack">
                <FlowSection
                  label="The Issue"
                  content="The account screen functions like a list of features, not a system. Users have to scan, interpret, and piece together where things live—especially when trying to make a payment."
                  color="red"
                />
                <div className='cs1-flow1-gold'>
                  <div className='cs1-flow1-gold-left'>
                    <FlowSection
                      label="What I Changed"
                      content="I turned the screen into a structured control surface:"
                      items={[
                        'Grouped content by intent (Payments, Transactions, Account Management)',
                        'Consolidated all account tasks (credit line, authorized users, balance transfers, statements & documents) into one Manage Account section',
                        'Introduced preview → drill-down patterns',
                        'Separated actions from informational content'
                      ]}
                      color="blue"
                    />
                    <div className="cs1-flow-unlocks">
                      <p className="cs1-flow-unlocks__label">What This Unlocks</p>
                      <p className="cs1-flow-unlocks__text">
                        Users no longer have to think about <em>where</em> something is. They just act on intent:
                      </p>
                      <div className="cs1-flow-unlocks__items">
                        <div className="cs1-flow-unlocks__item">
                          "I need to pay" → <strong>Payments</strong>
                        </div>
                        <div className="cs1-flow-unlocks__item">
                          "I want to check activity" → <strong>Transactions</strong>
                        </div>
                        <div className="cs1-flow-unlocks__item">
                          "I need to change something about my account" → <strong>Manage Account</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cs1-img-carousel">
                    <img src={flowImages[flowImg]} className="cs1-flow-gold-img" alt="Flow 2 screen" />
                    <div className="cs1-img-carousel__controls">
                      <button
                        className="cs1-img-carousel__btn"
                        onClick={() => setFlowImg(i => (i - 1 + flowImages.length) % flowImages.length)}
                        aria-label="Previous image"
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <span className="cs1-img-carousel__counter">{flowImg + 1}/{flowImages.length}</span>
                      <button
                        className="cs1-img-carousel__btn"
                        onClick={() => setFlowImg(i => (i + 1) % flowImages.length)}
                        aria-label="Next image"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <FlowSection
                  label="Result"
                  content="In testing (n=10):"
                  items={[
                    'Users initiated "Make Payment" faster, with reduced navigation backtracking',
                    '9/10 users navigated directly to the correct section on first attempt',
                    'Users no longer relied on trial-and-error to locate actions',
                  ]}
                  conclusion="Grouping by intent improved both speed and confidence in navigation."
                  color="green"
                />
              </div>
            </div>

            {/* Flow 3 */}
            <div className="cs1-flow-group">
              <FlowHeader number="3" title="Virtual Card → Control & Trust" />
              <div className="cs1-flow-stack">
                <FlowSection
                  label="The Issue"
                  content="Virtual card features exist, but they don't feel like a cohesive control system. That weakens the perception of security."
                  color="red"
                />
                <div className='cs1-flow1-gold'>
                  <div className='cs1-flow1-gold-left'>
                    <FlowSection
                      label="What I Changed"
                      items={[
                        'Centralized card controls into a single surface',
                        'Grouped actions clearly (lock, view, manage)',
                        'Made sensitive actions feel intentional (not passive)',
                      ]}
                      color="blue"
                    />
                    <div className="cs1-flow-unlocks">
                      <p className="cs1-flow-unlocks__label">What This Unlocks</p>
                      <p className="cs1-flow-unlocks__text">
                        In financial products, control isn't just functional—it's emotional. When users can
                        clearly see and manage their card, trust increases.
                      </p>
                    </div>
                  </div>
                  <div className="cs1-img-carousel">
                    <img src={CO_virtual_card} alt='New Virtual Card Function' className='cs1-flow-gold-img'></img>
                  </div>
                </div>


                <FlowSection
                  label="Result"
                  items={[
                    'Users were able to locate card controls without assistance',
                    'Increased confidence in managing card settings',
                    'Reduced hesitation when interacting with sensitive actions',
                  ]}
                  color="green"
                />
              </div>
            </div>
          </section>

          {/* ── Measurement ──────────────────────────────────────────────── */}
          <section id="cs1-measurement">
            <div className="cs0-section-header">
              <BarChart3 className="cs0-section-header__icon" size={32} />
              <h2 className="cs0-section-header__h2">How I Measured Success</h2>
            </div>
            <p className="cs0-intro cs0-intro--mb12">
              To evaluate the redesign, I tested it with 10 users across three areas:
            </p>
            <div className="cs0-arch-stages">
              <MeasurementCard
                title="Structure"
                subtitle="Is the information where users expect it?"
                metrics={[
                  '10/10 users saw payment obligations within the first viewport',
                  'No scrolling required to access critical payment details',
                  'Fewer competing elements reduced visual ambiguity',
                ]}
              />
              <MeasurementCard
                title="Behavior"
                subtitle="Can users act quickly and confidently?"
                metrics={[
                  '8/10 users understood their payment status in under 5 seconds',
                  'Users initiated "Make Payment" with fewer steps',
                  'Navigation backtracking was significantly reduced',
                ]}
              />
              <MeasurementCard
                title="Perception"
                subtitle="Do users feel more confident?"
                description='Using a Likert scale (1–5): "How confident do you feel about your payment status?"'
                metrics={[
                  '9/10 users reported confidence levels of 4 or higher',
                  '100% correctly understood the "No Payment Due" state',
                  'Users reported noticeably lower anxiety during payment tasks',
                ]}
                highlight="Together, these results show that improving information hierarchy didn't just make the interface easier to use—it made users feel more certain about their financial standing."
              />
            </div>
          </section>

          {/* ── Reflection ───────────────────────────────────────────────── */}
          <section id="cs1-reflection">
            <h2 className="cs0-h2">Reflection</h2>
            <div className="cs1-reflection-callout">
              {/* <p className="cs1-reflection-callout__intro">This project made one thing very clear:</p> */}
              <p className="cs1-reflection-callout__headline">
                In financial products, hierarchy is trust.
              </p>
              <p className="cs1-reflection-callout__subtext">
                What you show first, what you hide, and what you interrupt with—all shape how users
                interpret their financial reality.
                By prioritizing clarity and removing competition from high-sensitivity moments, the
                experience becomes more user-centered, predictable, and trustworthy.
              </p>
            </div>
            <h3 className="cs0-h3">Key Takeaways</h3>
            <div className="cs0-takeaways-list">
              <div className="cs0-takeaway-card">
                <p className="cs0-takeaway-card__text">People trust what they can understand instantly</p>
              </div>
              <div className="cs0-takeaway-card">
                <p className="cs0-takeaway-card__text">Financial clarity should never require effort</p>
              </div>
              <div className="cs0-takeaway-card">
                <p className="cs0-takeaway-card__text">Promotions have a place—just not during critical tasks</p>
              </div>
              <div className="cs0-takeaway-card">
                <p className="cs0-takeaway-card__text"><strong> Good structure reduces the need for more features</strong></p>
              </div>
            </div>
            <div className="cs0-looking-forward">
              <h4 className="cs0-looking-forward__title">What I'd Do Next</h4>
              <ul className="cs0-looking-forward__list">
                <li className="cs0-looking-forward__item">
                  <span className="cs0-looking-forward__bullet">•</span>
                  <span>Test how quickly users can confirm their payment status</span>
                </li>
                <li className="cs0-looking-forward__item">
                  <span className="cs0-looking-forward__bullet">•</span>
                  <span>Measure confidence before and after changes</span>
                </li>
                <li className="cs0-looking-forward__item">
                  <span className="cs0-looking-forward__bullet">•</span>
                  <span>Explore failure states (delayed payments, processing issues)</span>
                </li>
                <li className="cs0-looking-forward__item">
                  <span className="cs0-looking-forward__bullet">•</span>
                  <span>Reintroduce business content in ways that don't interrupt intent</span>
                </li>
              </ul>
              <p className="cs0-looking-forward__intro" style={{ marginTop: '1.5rem', fontStyle: 'italic' }}>
                Because the real challenge isn't just improving clarity—it's{' '}
                <strong style={{ fontStyle: 'normal' }}>
                  maintaining it at scale while balancing business goals
                </strong>
                .
              </p>
            </div>
          </section>
          <div className='cs0-footer'>
            <a className='footer-link' href='https://www.figma.com/design/y8UZpDTVwpwbJyATi4qCcj/CapitalOne-Mobile-App?node-id=5-18&t=HtOFHqNt9vsmiWPF-1'>figma files</a>
          </div>
          
        </div>
      </div>

    </div>
  )
}

export default CaseStudy1
