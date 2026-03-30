import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import NavSidebar from '../components/NavSidebar'
import ContactLinks from '../components/ContactLinks'
import readBetweenLogo from '../assets/ReadBetweenLogo.png';
import logo_vid from '../assets/name24.mp4';
import ReadingBetweenDemo from '../assets/rbDemo.mp4';
import './Home.css'

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin)

const SECTIONS = [
  { id: 'hero' },
  { id: 'case-study-0' },
  { id: 'case-study-1' },
  { id: 'case-study-2' },
  // { id: 'playground' },
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
    // Capture outside gsap.context so cleanup can restore DOM before revert
    const binaryMap = { linkedin: '10110110', github: '011010', email: '01110' }
    const linkEls = Array.from(contactRef.current.querySelectorAll('.contact-link'))
    const originalTexts = linkEls.map((el) => el.textContent.trim())

    // Set initial binary state
    linkEls.forEach((el, i) => {
      el.textContent = binaryMap[originalTexts[i].toLowerCase()] ?? '01010101'
    })

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
            if (newActive === 'hero') {
              gsap.to('.nav-text.trail1', { y: 0, x: 0, duration: 0.3, overwrite: true })
              gsap.to('.nav-text.trail2', { y: 0, x: 0, duration: 0.45, overwrite: true })
            }
          }

          // Suppress trails entirely at hero and playground
          const suppressTrails = trackedSection === 'hero'
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

      // Load-time scramble: binary → english
      const loadTl = gsap.timeline({ delay: 0.5 })
      linkEls.forEach((el, i) => {
        loadTl.to(el, {
          duration: 1.5,
          scrambleText: { text: originalTexts[i], chars: '01', speed: 0.5 },
          onComplete: () => { el.textContent = originalTexts[i] },
        }, i * 0.3)
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
      heroTl.to('.last-line-wrapper', { y: '-55vh', ease: 'none' }, 0)

      // ── 4. lastLine PIN at ~10vh ───────────────────────────────────────
      ScrollTrigger.create({
        trigger: '.last-line-wrapper',
        start: 'top 3%',
        endTrigger: '#playground',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        pinReparent: true,
      })


      // ── 5. Easing into the pin ──────────
      // gsap.to(lastLineRef.current, {
      //   y: '-55vh', // same as timeline end
      //   scrollTrigger: {
      //     trigger: lastLineRef.current,
      //     start: 'top 30%',
      //     end: 'top 10%',
      //     scrub: true,
      //   },
      // })

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
      // gsap.to(lastLineRef.current, {
      //   opacity: 0,
      //   pointerEvents: 'none',
      //   scrollTrigger: {
      //     trigger: '#playground',
      //     start: 'top 80%',
      //     end: 'top 20%',
      //     scrub: 0.2,
      //   },
      // })

    })

    return () => {
      linkEls.forEach((el, i) => { el.textContent = originalTexts[i] })
      ctx.revert()
    }
  }, [])

  return (
    <div className="portfolio">

      {/* Fixed UI */}
      <NavSidebar activeSection={activeSection} />
      <ContactLinks ref={contactRef} />

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section id="hero" ref={heroRef} className="section section--hero">
        <div className="hero-content">
          {/* <h1 ref={logoRef} className='hero-title'>Alexis West</h1> */}
          <video ref={logoRef} src={logo_vid} className='hero-logo' 
            autoPlay
            loop
            muted
            playsInline>
          </video>

          <div className="hero-tagline">
            <p ref={line1Ref} className='hero-second-line'>
              San Francisco–based UX designer, developer, and <br />
              creative technologist crafting digital experiences that feel
            </p>
            <div className="last-line-wrapper">
              <p ref={lastLineRef} className="hero-last-line">
                intuitive, intentional, and quietly human.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section id="case-study-0" className="section section--placeholder">
        {/* <p className="placeholder-label">CASE STUDY 0</p> */}
        <div className='case-study0-container'>
          <div className='case-study0-left'>
            <img src={readBetweenLogo} alt="Read Between logo" className='rb-logo'/>
            <p>A transparency-first news chrome extension that helps users evaluate articles in under 60 seconds.</p>
            <h3 className='case-study0-problem'> Problem: Readers lack fast, reliable ways to evaluate news credibility</h3>
          </div>
          <div className='case-study0-right'>
            <h3>PRODUCT DESIGN · END-TO-END</h3>
            <video src={ReadingBetweenDemo} className='rb-demo-vid'
              autoPlay
              loop
              muted
              playsInline>
              </video>
              <Link to="/case-study-0" className="cs-link">VIEW PROJECT →</Link>
          </div>
        </div>
      </section>

      <section id="case-study-1" className="section section--placeholder">
        <p className="placeholder-label">CASE STUDY 1</p>
        <Link to="/case-study-1" className="cs-link">VIEW PROJECT →</Link>
      </section>

      <section id="case-study-2" className="section section--placeholder">
        <p className="placeholder-label">CASE STUDY 2</p>
        <Link to="/case-study-2" className="cs-link">VIEW PROJECT →</Link>
      </section>

      {/* Invisible spacer — required for lastLineRef GSAP pin endTrigger */}
      <div id="playground" aria-hidden="true" style={{ height: '100vh', visibility: 'hidden', pointerEvents: 'none' }} />

    </div>
  )
}

export default Home
