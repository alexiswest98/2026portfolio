import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import NavSidebar from '../components/NavSidebar'
import ContactLinks from '../components/ContactLinks'
import readBetweenLogo from '../assets/ReadBetweenLogo.png';
import './Home.css'

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin)

const SECTIONS = [
  { id: 'hero' },
  { id: 'case-study-0' },
  { id: 'case-study-1' },
  { id: 'case-study-2' },
  { id: 'playground' },
]

const Home = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const location = useLocation()

  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const line1Ref = useRef(null)
  const lastLineRef = useRef(null)
  const contactRef = useRef(null)

  // Scroll to section when navigating back from a case study page
  useEffect(() => {
    const target = location.state?.scrollTo
    if (!target) return
    requestAnimationFrame(() => {
      const el = document.getElementById(target)
      if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
    })
  }, [location.state])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 1. Active section + nav velocity ───────────────────────────────
      let trackedSection = 'hero'
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          // Section detection first so velocity suppression uses current section
          const scrollMid = window.scrollY + window.innerHeight * 0.5
          let newActive = 'hero'
          for (const { id } of SECTIONS) {
            const el = document.getElementById(id)
            if (el && el.offsetTop <= scrollMid) newActive = id
          }
          if (newActive !== trackedSection) {
            trackedSection = newActive
            setActiveSection(newActive)
            // Immediately cancel in-flight trail tweens at boundary sections
            if (newActive === 'hero' || newActive === 'playground') {
              gsap.to('.nav-text.trail1', { y: 0, x: 0, duration: 0.3, overwrite: true })
              gsap.to('.nav-text.trail2', { y: 0, x: 0, duration: 0.45, overwrite: true })
            }
          }

          // Suppress trails entirely at hero and playground
          const suppressTrails = trackedSection === 'hero' || trackedSection === 'playground'
          const v = suppressTrails ? 0 : Math.min(Math.abs(self.getVelocity()) / 1500, 1)

          gsap.to('.nav-text.main', { y: 0, duration: 0.2, overwrite: true })
          gsap.to('.nav-text.trail1', { y: v * 6, x: v * 2, duration: 0.3, overwrite: true })
          gsap.to('.nav-text.trail2', { y: v * 12, x: v * 4, duration: 0.45, overwrite: true })
        },
      })

      // ── 2. Hero pin (logo + line1 move together) ───────────────────────
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: true,
        },
      })

      // Contact links: hold position while title starts moving, then scramble to binary + slide out
      const binaryMap = { linkedin: '10110110', github: '011010', email: '01110' }
      const linkEls = Array.from(contactRef.current.querySelectorAll('.contact-link'))
      const originalTexts = linkEls.map((el) => el.textContent.trim())

      // Scramble fires as a real-time tween (not scrubbed) so rightToLeft works correctly.
      // Triggers at ~36% of the 180% hero pin scroll (≈ 65vh past hero top).
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top+=65% top',
        onEnter: () => {
          linkEls.forEach((el, i) => {
            gsap.to(el, {
              duration: 0.5,
              scrambleText: {
                text: binaryMap[originalTexts[i].toLowerCase()] ?? '01010101',
                rightToLeft: true,
                chars: '01',
                speed: 1.5,
                revealDelay: 0.2,
              },
            })
          })
        },
        onLeaveBack: () => {
          linkEls.forEach((el, i) => {
            gsap.killTweensOf(el)
            el.textContent = originalTexts[i]
          })
        },
      })

      // Scrubbed exit: y + opacity (starts at same scroll point as scramble trigger)
      heroTl.to(contactRef.current, { y: '-110vh', opacity: 0, ease: 'none', duration: 0.35 }, 0.27)

      heroTl.to(line1Ref.current, {
        y: '-55vh',
        color: '#aaaaaa',
        ease: 'none',
      }, 0)

      heroTl.to(logoRef.current, {
        y: '-55vh',
        opacity: 0,
        ease: 'none',
      }, 0.025)

      // lastLine joins the same timeline at position 0 — perfectly synced with line1 and logo
      heroTl.to(lastLineRef.current, { y: '-55vh', ease: 'none' }, 0)

      // ── 4. lastLine PIN at ~10vh ───────────────────────────────────────
      ScrollTrigger.create({
        trigger: lastLineRef.current,
        start: 'top 7%',
        endTrigger: '#playground',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        pinReparent: true,
      })

      // ── 5. Optional polish: subtle opacity shift when locking ──────────
      // gsap.fromTo(
      //   lastLineRef.current,
      //   { opacity: 0.6 },
      //   {
      //     opacity: 1,
      //     scrollTrigger: {
      //       trigger: lastLineRef.current,
      //       start: 'top 20%',
      //       end: 'top 10%',
      //       scrub: true,
      //     },
      //   }
      // )

      // ── 6. Fade out at playground ──────────────────────────────────────
      gsap.to(lastLineRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        scrollTrigger: {
          trigger: '#playground',
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.2,
        },
      })

    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="portfolio">

      {/* Fixed UI */}
      <NavSidebar activeSection={activeSection} />
      <ContactLinks ref={contactRef} />

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section id="hero" ref={heroRef} className="section section--hero">
        <div className="hero-content">
          <h1 ref={logoRef} className='hero-title'>Alexis West</h1>

          <div className="hero-tagline">
            <p ref={line1Ref} className='hero-second-line'>
              San Francisco–based UX designer, developer, and <br />
              creative technologist crafting digital experiences that feel
            </p>

            <p ref={lastLineRef} className="hero-last-line">
              intuitive, intentional, and quietly human.
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section id="case-study-0" className="section section--placeholder">
        <p className="placeholder-label">CASE STUDY 0</p>
        <div>
          <div>
            <img src={readBetweenLogo} alt="Read Between logo" className='rb-logo'/>
            <p>A transparency-first news chrome extension that helps users evaluate articles in under 60 seconds.</p>
            <h3>Problem: Readers lack fast, reliable ways to evaluate news credibility</h3>
          </div>
          <div>
            <h3>PRODUCT DESIGN · END-TO-END</h3>
            <iframe style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }} width="800" height="450" src="https://embed.figma.com/proto/R3J73lHqd9VbDAPel9IRPH/ReadingBetween-Mockup?node-id=6-0&viewport=-385%2C-227%2C0.63&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share" allowFullScreen></iframe>
          </div>
        </div>
        <Link to="/case-study-0" className="cs-link">VIEW PROJECT →</Link>
      </section>

      <section id="case-study-1" className="section section--placeholder">
        <p className="placeholder-label">CASE STUDY 1</p>
        <Link to="/case-study-1" className="cs-link">VIEW PROJECT →</Link>
      </section>

      <section id="case-study-2" className="section section--placeholder">
        <p className="placeholder-label">CASE STUDY 2</p>
        <Link to="/case-study-2" className="cs-link">VIEW PROJECT →</Link>
      </section>

      <section id="playground" className="section section--placeholder">
        <p className="placeholder-label">PLAYGROUND MODE</p>
      </section>

    </div>
  )
}

export default Home
