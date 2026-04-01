import {
  Heart,
  CheckCircle2,
  TrendingUp,
  Target,
  ArrowLeft,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './CaseStudy.css'

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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-[#0022FF]/5 p-6 border-l-4 border-[#0022FF]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-[#0022FF] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
            {number}
          </div>
          <h3 className="text-xl font-semibold text-black">{title}</h3>
        </div>
        {description && <p className="text-[#535252] mt-3">{description}</p>}
        {insight && (
          <div className="bg-white p-4 rounded mt-4 border-l-2 border-[#0022FF]">
            <p className="text-sm italic text-[#535252]">{insight}</p>
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="text-xs font-bold text-[#535252] uppercase tracking-wide mb-3">Changes</p>
        <ul className="space-y-2 mb-4">
          {changes.map((change, idx) => (
            <li key={idx} className="text-sm text-[#535252] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00A20B] mt-0.5 flex-shrink-0" />
              <span>{change}</span>
            </li>
          ))}
        </ul>

        {outcome && (
          <div className="bg-[#00A20B]/5 p-4 rounded border-l-2 border-[#00A20B]">
            <p className="text-xs font-bold text-[#00A20B] uppercase tracking-wide mb-1">Outcome</p>
            <p className="text-sm font-medium text-black">{outcome}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ExecutionCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h4 className="font-semibold text-black mb-4">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm text-[#535252] flex items-start gap-2">
            <span className="text-[#0022FF] mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DecisionCard({ text }: { text: string }) {
  return (
    <div className="bg-white p-4 border-l-4 border-[#0022FF] rounded-r-lg">
      <p className="text-[#535252]">
        <strong className="text-black">{text}</strong>
      </p>
    </div>
  )
}

function ResultMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-[#00A20B]/30 text-center">
      <div className="text-4xl font-bold text-[#00A20B] mb-2">{value}</div>
      <div className="text-sm text-[#535252]">{label}</div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const CaseStudy2 = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white case-study">
      {/* Hero Section */}
      <header className="bg-black text-white py-20 px-8 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-4">
            <button
              onClick={() => navigate('/', { state: { scrollTo: 'case-study-2' } })}
              className="mt-2 hover:bg-white/10 p-2 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-8 h-8" />
            </button>
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-4">
                Rebuilding a Mental Health Platform Without Structure
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed mb-6 ml-14">
            Bringing clarity, trust, and structure to a platform used in high-stress, real-world
            situations
          </p>
          <div className="flex flex-wrap gap-6 text-sm ml-14">
            <div>
              <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">Role</p>
              <p className="text-white">Web Developer / UX Designer</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">Timeline</p>
              <p className="text-white">2 years (2023–2025)</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">Organization</p>
              <p className="text-white">Mental Health Association of San Francisco</p>
            </div>
          </div>
        </div>
      </header>

      <div className="cs-content">

        {/* Overview */}
        <section>
          <h2 className="text-3xl font-bold text-black mb-8">Overview</h2>
          <div className="bg-gray-50 border-l-4 border-black p-8 rounded-r-lg mb-8">
            <p className="text-lg leading-relaxed text-[#535252]">
              From 2023–2025, I worked as a Web Developer / UX Designer at the Mental Health
              Association of San Francisco, leading the redesign of a website used by individuals
              actively seeking mental health support.
            </p>
          </div>

          <p className="text-lg text-black mb-6 leading-relaxed">
            This was not a typical redesign. The challenge was bringing clarity, trust, and structure
            to a platform used in high-stress, real-world situations—without existing systems in place.
          </p>

          <div className="bg-[#8D2645]/10 border border-[#8D2645] p-6 rounded-lg">
            <h3 className="font-semibold text-black mb-4">Constraints</h3>
            <ul className="space-y-2">
              <li className="text-[#535252] flex items-start gap-2">
                <span className="text-[#8D2645] mt-1">•</span>
                <span>No design system or consistent patterns</span>
              </li>
              <li className="text-[#535252] flex items-start gap-2">
                <span className="text-[#8D2645] mt-1">•</span>
                <span>Outdated, fragmented content across teams</span>
              </li>
              <li className="text-[#535252] flex items-start gap-2">
                <span className="text-[#8D2645] mt-1">•</span>
                <span>No ownership over site updates</span>
              </li>
              <li className="text-[#535252] flex items-start gap-2">
                <span className="text-[#8D2645] mt-1">•</span>
                <span>Sensitive subject matter requiring careful communication</span>
              </li>
            </ul>
          </div>
        </section>

        {/* The Problem */}
        <section>
          <h2 className="text-3xl font-bold text-black mb-8">The Problem</h2>

          <p className="text-lg text-[#535252] mb-6 leading-relaxed">
            The website acted as a critical entry point for support—but made access harder than it
            should be.
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-[#8D2645]/10 border-l-4 border-[#8D2645] p-6 rounded-r-lg">
              <p className="text-[#535252]">Deeply nested pages</p>
            </div>
            <div className="bg-[#8D2645]/10 border-l-4 border-[#8D2645] p-6 rounded-r-lg">
              <p className="text-[#535252]">Unclear pathways to key resources</p>
            </div>
            <div className="bg-[#8D2645]/10 border-l-4 border-[#8D2645] p-6 rounded-r-lg">
              <p className="text-[#535252]">Outdated or inconsistent information</p>
            </div>
          </div>

          <div className="bg-[#0022FF] text-white p-8 rounded-xl">
            <p className="text-sm uppercase tracking-wide text-blue-200 mb-2">Result</p>
            <p className="text-xl leading-relaxed">Friction at the exact moment users needed clarity.</p>
            <p className="text-blue-100 mt-4 leading-relaxed">
              The platform struggled with clarity, trust, and accessibility—especially for users in
              vulnerable mental health states.
            </p>
          </div>
        </section>

        {/* Key Insight */}
        <section>
          <div className="bg-gradient-to-br from-[#0022FF]/5 to-[#0022FF]/10 p-8 rounded-xl border-l-4 border-[#0022FF]">
            <h3 className="text-xl font-semibold text-black mb-4">Key Insight</h3>
            <p className="text-lg text-[#535252] mb-4">
              Users weren't exploring—they were trying to act quickly.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0022FF] mt-0.5 flex-shrink-0" />
                <p className="text-[#535252]">Scanning instead of reading</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0022FF] mt-0.5 flex-shrink-0" />
                <p className="text-[#535252]">Looking for immediate support (Warm Line, programs)</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0022FF] mt-0.5 flex-shrink-0" />
                <p className="text-[#535252]">Dropping off when information wasn't obvious</p>
              </div>
            </div>
            <p className="text-black font-semibold mt-6 text-lg">
              This shifted the goal from "informational website" → action-oriented support system
            </p>
          </div>
        </section>

        {/* Designing for Sensitive Contexts */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-8 h-8 text-black" />
            <h2 className="text-3xl font-bold text-black">Designing for Sensitive Contexts</h2>
          </div>

          <p className="text-[#535252] mb-8 leading-relaxed">
            This work required a high level of care beyond standard UX decisions.
          </p>

          <div className="space-y-8">
            <div className="bg-white border border-gray-200 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-black mb-4">Tone & Language</h3>
              <p className="text-[#535252] mb-4">Content needed to feel:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-black">Non-judgmental</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-black">Clear and human</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-black">Emotionally safe</p>
                </div>
              </div>
              <div className="bg-[#0022FF]/5 p-6 rounded-lg border-l-4 border-[#0022FF]">
                <p className="text-sm text-[#535252] mb-2">Example (Hoarding content):</p>
                <p className="text-[#535252] italic">
                  "Blaming someone for having too many possessions… is like blaming a person with
                  schizophrenia for hearing voices."
                </p>
                <p className="text-sm text-black font-medium mt-3">
                  This reframing reduced stigma and built trust.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-black mb-4">Visual Considerations</h3>
              <p className="text-[#535252] mb-4">Even small design choices carried weight.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#0022FF] mt-1">•</span>
                  <span className="text-[#535252]">
                    Avoided imagery with unintended associations (e.g., telephone wires)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0022FF] mt-1">•</span>
                  <span className="text-[#535252]">
                    Used illustration to better represent diverse communities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0022FF] mt-1">•</span>
                  <span className="text-[#535252]">
                    Designed to reduce overwhelm rather than attract attention
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0022FF] text-white p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-6">Guiding Principles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0022FF]/70 p-4 rounded-lg border border-blue-400">
                  <p className="text-white">Reduce cognitive load</p>
                </div>
                <div className="bg-[#0022FF]/70 p-4 rounded-lg border border-blue-400">
                  <p className="text-white">Prioritize clarity over completeness</p>
                </div>
                <div className="bg-[#0022FF]/70 p-4 rounded-lg border border-blue-400">
                  <p className="text-white">Avoid triggering or ambiguous language</p>
                </div>
                <div className="bg-[#0022FF]/70 p-4 rounded-lg border border-blue-400">
                  <p className="text-white">Design for emotional safety</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section>
          <h2 className="text-3xl font-bold text-black mb-8">Approach</h2>

          <div className="space-y-8">
            <ApproachCard
              number="1"
              title="Restructuring Information Architecture"
              changes={[
                'Reduced nested navigation',
                'Prioritized immediate access to support (Warm Line, services)',
                'Organized content around user intent, not internal teams',
              ]}
              outcome="Faster access to critical resources"
            />
            <ApproachCard
              number="2"
              title="Aligning Content with Behavior"
              insight="Users scan for help—they don't read to understand systems."
              changes={[
                'Shortened content blocks',
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
        </section>

        {/* Execution */}
        <section>
          <div className="bg-gradient-to-r from-[#0022FF] to-[#0022FF]/80 text-white p-8 rounded-xl mb-8">
            <h2 className="text-3xl font-bold mb-2">Execution</h2>
            <p className="text-blue-100">Key implementation decisions and technical work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExecutionCard
              title="Platform Migration"
              items={['WordPress → Framer', 'Faster iteration and easier content updates']}
            />
            <ExecutionCard
              title="Design System"
              items={[
                'Introduced core components, typography, and layout patterns',
                'Created consistency across pages',
              ]}
            />
            <ExecutionCard
              title="Content & Media"
              items={[
                'Migrated and restructured blog + media content',
                'Improved discoverability of resources',
              ]}
            />
            <ExecutionCard
              title="Support Access"
              items={[
                'Added chat alongside call + text options',
                'Reduced friction in reaching help',
              ]}
            />
          </div>
        </section>

        {/* Key Decisions */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-8 h-8 text-black" />
            <h2 className="text-3xl font-bold text-black">Key Decisions</h2>
          </div>

          <div className="space-y-4">
            <DecisionCard text="Prioritized access over aesthetics" />
            <DecisionCard text="Simplified language for accessibility" />
            <DecisionCard text="Designed for scanning, not reading" />
            <DecisionCard text="Expanded support channels (call, text, chat)" />
            <DecisionCard text="Focused on systems, not just screens" />
          </div>
        </section>

        {/* Impact */}
        <section className="bg-gradient-to-br from-[#00A20B]/5 to-[#00A20B]/10 -mx-8 md:-mx-12 px-8 md:px-12 py-12 md:rounded-xl">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-[#00A20B]" />
            <h2 className="text-3xl font-bold text-black">Impact</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ResultMetric value="+45.61%" label="Increase in engagement time" />
            <ResultMetric value="+160,000" label="Users year-over-year" />
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#00A20B]/30">
            <p className="text-[#535252] leading-relaxed">
              These results indicate users were able to find relevant information faster and engage
              more meaningfully with support resources.
            </p>
          </div>
        </section>

        {/* Reflection */}
        <section>
          <h2 className="text-3xl font-bold text-black mb-6">Reflection</h2>

          <div className="bg-[#8D2645] text-white p-8 rounded-xl mb-8">
            <p className="text-lg leading-relaxed mb-4">
              This project shifted how I think about design—from screens to systems.
            </p>
            <p className="text-red-100 leading-relaxed">
              I learned how to operate in ambiguity, align multiple teams, and design for sensitive,
              real-world use cases.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-black mb-6">What I Learned</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-white p-6 border-l-4 border-[#0022FF] rounded-r-lg">
              <p className="font-semibold text-black mb-2">Operate in ambiguity</p>
              <p className="text-sm text-[#535252]">
                Navigate complex situations without clear frameworks
              </p>
            </div>
            <div className="bg-white p-6 border-l-4 border-[#0022FF] rounded-r-lg">
              <p className="font-semibold text-black mb-2">Align multiple teams</p>
              <p className="text-sm text-[#535252]">
                Build systems that work across organizations
              </p>
            </div>
            <div className="bg-white p-6 border-l-4 border-[#0022FF] rounded-r-lg">
              <p className="font-semibold text-black mb-2">Design for real-world use cases</p>
              <p className="text-sm text-[#535252]">
                Handle sensitive contexts with care and intention
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h4 className="text-lg font-semibold text-black mb-4">If Revisited Today</h4>
            <ul className="space-y-2 text-[#535252]">
              <li className="flex items-start gap-2">
                <span className="text-[#0022FF] mt-1">•</span>
                <span>Strengthen visual hierarchy and interaction patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0022FF] mt-1">•</span>
                <span>Introduce usability testing earlier</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0022FF] mt-1">•</span>
                <span>Further refine accessibility standards</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-[#0022FF]/5 to-[#0022FF]/10 p-8 rounded-xl border-l-4 border-[#0022FF]">
            <h3 className="text-xl font-semibold text-black mb-4">Takeaway</h3>
            <p className="text-lg text-[#535252] leading-relaxed">
              I brought structure, clarity, and measurable impact to a complex, low-resource
              environment—turning a fragmented website into a more accessible and maintainable support
              platform.
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-8 px-8 md:px-12 mt-24">
        <div className="max-w-5xl mx-auto text-center text-sm">
          <p>Mental Health Platform Redesign • UX Case Study</p>
        </div>
      </footer>
    </div>
  )
}

export default CaseStudy2
