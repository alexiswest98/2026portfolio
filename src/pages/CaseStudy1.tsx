import {
  Users,
  Eye,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Target,
  DollarSign,
  ArrowLeft,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './CaseStudy.css'

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
    <div
      className={`${
        isHighlight
          ? 'bg-[#8D2645]/5 border-2 border-[#8D2645]'
          : 'bg-white border border-gray-200'
      } p-6 rounded-lg`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 bg-[#0022FF] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
          {number}
        </div>
        <h4 className="font-semibold text-black leading-tight text-lg">{title}</h4>
      </div>

      <div className="space-y-3 mb-4">
        {quotes.map((quote, idx) => (
          <div key={idx} className="bg-gray-50 p-3 rounded border-l-2 border-[#0022FF]">
            <p className="text-sm italic text-[#535252]">"{quote}"</p>
          </div>
        ))}
      </div>

      <p className={`text-sm ${isHighlight ? 'text-black font-medium' : 'text-[#535252]'}`}>
        {insight}
      </p>
    </div>
  )
}

function PrincipleCard({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg flex items-start gap-3">
      <div className="text-[#0022FF] mt-0.5">{icon}</div>
      <p className="text-sm text-[#535252]">
        <strong className="text-black">{text}</strong>
      </p>
    </div>
  )
}

function FlowHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="bg-gradient-to-r from-[#0022FF]/10 to-transparent p-6 rounded-lg border-l-4 border-[#0022FF] mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#0022FF] text-white rounded-full flex items-center justify-center font-bold">
          {number}
        </div>
        <h3 className="text-2xl font-bold text-black">{title}</h3>
      </div>
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
  const colorMap = {
    red: { bg: 'bg-[#8D2645]/5', border: 'border-[#8D2645]', text: 'text-[#8D2645]' },
    blue: { bg: 'bg-[#0022FF]/5', border: 'border-[#0022FF]', text: 'text-[#0022FF]' },
    green: { bg: 'bg-[#00B60C]/5', border: 'border-[#00B60C]', text: 'text-[#00B60C]' },
  }

  const colors = colorMap[color]

  return (
    <div className={`${colors.bg} p-6 rounded-lg border-l-4 ${colors.border}`}>
      <p className={`text-xs font-bold ${colors.text} uppercase tracking-wide mb-3`}>{label}</p>
      {content && <p className="text-[#535252] mb-3">{content}</p>}
      {items && (
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-sm text-[#535252] flex items-start gap-2">
              <CheckCircle2 className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {conclusion && (
        <p className="text-sm text-black font-medium mt-4 pt-4 border-t border-gray-200">
          {conclusion}
        </p>
      )}
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
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-black mb-1">{title}</h4>
        <p className="text-sm text-[#535252] italic">{subtitle}</p>
      </div>

      {description && <p className="text-sm text-[#535252] mb-4">{description}</p>}

      <ul className="space-y-2 mb-4">
        {metrics.map((metric, idx) => (
          <li key={idx} className="text-sm text-[#535252] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00B60C] mt-0.5 flex-shrink-0" />
            <span>{metric}</span>
          </li>
        ))}
      </ul>

      {highlight && (
        <div className="bg-[#00B60C]/5 p-4 rounded border-l-2 border-[#00B60C]">
          <p className="text-sm italic text-[#535252]">{highlight}</p>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const CaseStudy1 = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white case-study">
      {/* Hero Section */}
      <header className="bg-black text-white py-20 px-8 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-6 mb-4">
            <button
              onClick={() => navigate('/', { state: { scrollTo: 'case-study-1' } })}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-8 h-8" />
            </button>
            <h1 className="text-5xl font-bold">Capital One Mobile Experience</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed ml-14">
            Redesigning financial clarity: Making payment status immediately understandable
          </p>
        </div>
      </header>

      <div className="cs-content">

        {/* Problem */}
        <section>
          <h2 className="text-3xl font-bold text-black mb-8">Problem</h2>
          <div className="bg-gray-50 border-l-4 border-black p-8 rounded-r-lg mb-8">
            <p className="text-lg leading-relaxed text-[#535252]">
              Financial apps don't just help people manage money — they shape how people{' '}
              <strong className="text-black">feel about their financial stability.</strong>
            </p>
          </div>

          <p className="text-[#535252] mb-6 leading-relaxed">
            In the Capital One mobile experience, key payment details—minimum payment, due date, and
            payment status—aren't consistently prioritized in the interface.
          </p>

          <p className="text-[#535252] mb-6 leading-relaxed">They're technically there, but often:</p>

          <div className="space-y-4 mb-8">
            <div className="bg-[#8D2645]/10 border-l-4 border-[#8D2645] p-4 rounded-r-lg">
              <p className="text-[#535252]">Revealed only after interaction</p>
            </div>
            <div className="bg-[#8D2645]/10 border-l-4 border-[#8D2645] p-4 rounded-r-lg">
              <p className="text-[#535252]">Competing with promotional content</p>
            </div>
            <div className="bg-[#8D2645]/10 border-l-4 border-[#8D2645] p-4 rounded-r-lg">
              <p className="text-[#535252]">Positioned lower in the visual hierarchy</p>
            </div>
          </div>

          <div className="bg-[#0022FF]/5 p-6 rounded-lg border-l-4 border-[#0022FF]">
            <p className="text-lg font-semibold text-black">
              "Am I on track, or do I owe something right now?"
            </p>
            <p className="text-sm text-[#535252] mt-2">So something simple becomes effortful</p>
          </div>
        </section>

        {/* Why This Matters */}
        <section>
          <h2 className="text-3xl font-bold text-black mb-8">Why This Matters</h2>

          <p className="text-lg text-[#535252] mb-8 leading-relaxed">
            When this question isn't answered immediately, the issue isn't just usability — it's{' '}
            <strong className="text-black">trust</strong>.
          </p>

          <div className="bg-white border border-gray-200 p-8 rounded-lg">
            <h3 className="font-semibold text-black mb-6">In payment flows:</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#0022FF] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#535252]">What shows up first signals what matters</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#0022FF] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#535252]">What's hidden creates doubt</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#0022FF] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#535252]">What competes for attention creates friction</p>
              </div>
            </div>
            <p className="text-[#535252] mt-6 italic">
              And when that friction shows up around money, users don't just get annoyed — they start
              to question the system itself.
            </p>
          </div>
        </section>

        {/* Key Insight */}
        <section>
          <div className="bg-[#0022FF] text-white p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Key Insight</h3>
            <p className="text-2xl leading-relaxed">
              People aren't opening a finance app to explore, they're opening it for{' '}
              <strong>reassurance.</strong>
            </p>
          </div>
        </section>

        {/* What I Heard from Users */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-black" />
            <h2 className="text-3xl font-bold text-black">What I Heard from Users</h2>
          </div>

          <p className="text-[#535252] mb-8 leading-relaxed">
            I reviewed 50–100 recent app store reviews to understand where the experience breaks down.
            Three patterns showed up consistently:
          </p>

          <div className="space-y-8">
            <UserFeedbackCard
              number="1"
              title="Why is the most important info so hard to find?"
              quotes={[
                'Features that are highest use are buried',
                'I have to go through make a payment just to check my balance',
              ]}
              insight="Basic financial information requires too much effort to access."
            />
            <UserFeedbackCard
              number="2"
              title="I just want to manage my money — not fight the UI"
              quotes={['Bombarded with ads', 'Popups every time']}
              insight="Promotional content is interrupting high-intent tasks."
            />
            <UserFeedbackCard
              number="3"
              title="Can I trust what I'm seeing?"
              quotes={[
                "Payment wasn't successful but the app adjusted everything",
                'Feels like a scam',
              ]}
              insight="This is the real problem. When payment states aren't clear or reliable, users don't just lose clarity — they lose confidence."
              isHighlight
            />
          </div>
        </section>

        {/* Design Approach */}
        <section>
          <h2 className="text-3xl font-bold text-black mb-8">Design Approach</h2>

          <div className="bg-[#0022FF]/5 p-8 rounded-lg border-l-4 border-[#0022FF] mb-8">
            <p className="text-lg text-black">
              Instead of adding features, I focused on restructuring the experience around one goal:
            </p>
            <p className="text-xl font-semibold text-black mt-4">
              Make financial status immediately understandable.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-black mb-4">
            That led to a few guiding decisions:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PrincipleCard
              icon={<Eye className="w-5 h-5" />}
              text="Show payment status up front, not on demand"
            />
            <PrincipleCard
              icon={<Target className="w-5 h-5" />}
              text="Align navigation with user intent, not feature lists"
            />
            <PrincipleCard
              icon={<DollarSign className="w-5 h-5" />}
              text="Separate money tasks from marketing content"
            />
            <PrincipleCard
              icon={<CheckCircle2 className="w-5 h-5" />}
              text="Make every state (including 'no payment due') explicit and unambiguous"
            />
          </div>
        </section>

        {/* Flows Header */}
        <section>
          <div className="bg-gradient-to-r from-[#0022FF] to-[#0022FF]/80 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-2">Design Flows</h2>
            <p className="text-blue-100">
              Restructuring key user journeys for clarity and confidence
            </p>
          </div>
        </section>

        {/* Flow 1 */}
        <section>
          <FlowHeader number="1" title="Home → Payment Clarity" />

          <div className="space-y-6">
            <FlowSection
              label="The Issue"
              content="The home screen tries to do too much at once. Account data, rewards, and promotions all compete for attention, making it harder to answer the one question users actually care about."
              color="red"
            />
            <FlowSection
              label="What I Changed"
              content="I restructured the screen so financial status becomes the entry point:"
              items={[
                'Elevated the account card as the primary focus',
                'Introduced a clear, scannable payment state',
                'Moved secondary content below the fold',
                'Reduced visual competition without removing functionality',
              ]}
              color="blue"
            />
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm font-semibold text-[#535252] mb-3">What This Unlocks</p>
              <p className="text-[#535252] mb-2">The experience shifts from:</p>
              <p className="text-[#535252] italic mb-3">"Let me figure this out"</p>
              <p className="text-[#535252] mb-2">to:</p>
              <p className="text-black font-semibold">"Got it — I'm good" (or "I need to act")</p>
              <p className="text-sm text-[#535252] mt-4">
                That clarity happens immediately, without navigation.
              </p>
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
        </section>

        {/* Flow 2 */}
        <section>
          <FlowHeader number="2" title="Account → Payment & Management" />

          <div className="space-y-6">
            <FlowSection
              label="The Issue"
              content="The account screen functions like a list of features, not a system. Users have to scan, interpret, and piece together where things live — especially when trying to make a payment."
              color="red"
            />
            <FlowSection
              label="What I Changed"
              content="I turned the screen into a structured control surface:"
              items={[
                'Grouped content by intent (Payments, Transactions, Account, Management)',
                'Introduced preview → drill-down patterns',
                'Separated actions from informational content',
                'Standardized navigation patterns across sections',
              ]}
              color="blue"
            />
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm font-semibold text-[#535252] mb-3">What This Unlocks</p>
              <p className="text-[#535252] mb-4">
                Users no longer have to think about <em>where</em> something is. They just act on
                intent:
              </p>
              <div className="space-y-2">
                <div className="bg-white p-3 rounded border-l-2 border-[#0022FF]">
                  <p className="text-sm text-[#535252]">
                    "I need to pay" → <strong className="text-black">Payments</strong>
                  </p>
                </div>
                <div className="bg-white p-3 rounded border-l-2 border-[#0022FF]">
                  <p className="text-sm text-[#535252]">
                    "I want to check activity" → <strong className="text-black">Transactions</strong>
                  </p>
                </div>
                <div className="bg-white p-3 rounded border-l-2 border-[#0022FF]">
                  <p className="text-sm text-[#535252]">
                    "I need to change something about my account" →{' '}
                    <strong className="text-black">Manage Account</strong>
                  </p>
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
        </section>

        {/* Flow 3 */}
        <section>
          <FlowHeader number="3" title="Virtual Card → Control & Trust" />

          <div className="space-y-6">
            <FlowSection
              label="The Issue"
              content="Virtual card features exist, but they don't feel like a cohesive control system. That weakens the perception of security."
              color="red"
            />
            <FlowSection
              label="What I Changed"
              items={[
                'Centralized card controls into a single surface',
                'Grouped actions clearly (lock, view, manage)',
                'Made sensitive actions feel intentional (not passive)',
              ]}
              color="blue"
            />
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm font-semibold text-[#535252] mb-3">What This Unlocks</p>
              <p className="text-[#535252]">
                In financial products, control isn't just functional — it's emotional. When users can
                clearly see and manage their card, trust increases.
              </p>
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
        </section>

        {/* Measurement */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="w-8 h-8 text-black" />
            <h2 className="text-3xl font-bold text-black">How I Measured Success</h2>
          </div>

          <p className="text-[#535252] mb-8 leading-relaxed">
            To evaluate the redesign, I tested it with 10 users across three areas:
          </p>

          <div className="space-y-6">
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
              highlight="Together, these results show that improving information hierarchy didn't just make the interface easier to use — it made users feel more certain about their financial standing."
            />
          </div>
        </section>

        {/* Reflection */}
        <section>
          <h2 className="text-3xl font-bold text-black mb-6">Reflection</h2>

          <div className="bg-[#8D2645] text-white p-8 rounded-xl mb-8">
            <p className="text-lg leading-relaxed mb-4">This project made one thing very clear:</p>
            <p className="text-2xl font-semibold leading-relaxed">
              In financial products, hierarchy is trust.
            </p>
            <p className="text-gray-200 mt-6 leading-relaxed">
              What you show first, what you hide, and what you interrupt with — all shape how users
              interpret their financial reality.
            </p>
            <p className="text-gray-200 mt-4 leading-relaxed">
              By prioritizing clarity and removing competition from high-sensitivity moments, the
              experience becomes quieter, more predictable, and more trustworthy.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-black mb-6">Key Takeaways</h3>

          <div className="space-y-4">
            <div className="bg-white p-6 border-l-4 border-[#0022FF] rounded-r-lg">
              <p className="text-[#535252]">People trust what they can understand instantly</p>
            </div>
            <div className="bg-white p-6 border-l-4 border-[#0022FF] rounded-r-lg">
              <p className="text-[#535252]">Financial clarity should never require effort</p>
            </div>
            <div className="bg-white p-6 border-l-4 border-[#0022FF] rounded-r-lg">
              <p className="text-[#535252]">Promotions have a place — just not during critical tasks</p>
            </div>
            <div className="bg-white p-6 border-l-4 border-[#0022FF] rounded-r-lg">
              <p className="text-[#535252]">Good structure reduces the need for more features</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-black mb-4">What I'd Do Next</h4>
            <p className="text-[#535252] mb-4">
              If this were a real product, I'd focus on validation and edge cases:
            </p>
            <ul className="space-y-2 text-[#535252]">
              <li className="flex items-start gap-2">
                <span className="text-[#0022FF] mt-1">•</span>
                <span>Test how quickly users can confirm their payment status</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0022FF] mt-1">•</span>
                <span>Measure confidence before and after changes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0022FF] mt-1">•</span>
                <span>Explore failure states (delayed payments, processing issues)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0022FF] mt-1">•</span>
                <span>
                  Reintroduce business content in ways that don't interrupt intent
                </span>
              </li>
            </ul>
            <p className="text-[#535252] mt-6 italic">
              Because the real challenge isn't just improving clarity — it's{' '}
              <strong className="text-black">
                maintaining it at scale while balancing business goals
              </strong>
              .
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-8 px-8 md:px-12 mt-24">
        <div className="max-w-5xl mx-auto text-center text-sm">
          <p>Capital One Mobile Experience • UX Case Study</p>
        </div>
      </footer>
    </div>
  )
}

export default CaseStudy1
