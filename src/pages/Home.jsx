import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NavSidebar from '../components/NavSidebar'
import ContactLinks from '../components/ContactLinks'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { id: 'hero' },
  { id: 'case-study-0' },
  { id: 'case-study-1' },
  { id: 'case-study-2' },
  { id: 'playground' },
]

const Home = () => {
  const [activeSection, setActiveSection] = useState('hero')

  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const line1Ref = useRef(null)
  const lastLineRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 1. Active section + nav velocity ───────────────────────────────
      let trackedSection = 'hero'
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const v = Math.min(Math.abs(self.getVelocity()) / 1500, 1)

          gsap.to('.nav-text.main', {
            y: 0,
            duration: 0.2,
            overwrite: true,
          })

          gsap.to('.nav-text.trail1', {
            y: v * 6,
            x: v * 2,
            duration: 0.3,
            overwrite: true,
          })

          gsap.to('.nav-text.trail2', {
            y: v * 12,
            x: v * 4,
            duration: 0.45,
            overwrite: true,
          })

          const scrollMid = window.scrollY + window.innerHeight * 0.5
          let newActive = 'hero'

          for (const { id } of SECTIONS) {
            const el = document.getElementById(id)
            if (el && el.offsetTop <= scrollMid) newActive = id
          }

          if (newActive !== trackedSection) {
            trackedSection = newActive
            setActiveSection(newActive)
          }
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

      heroTl.to(contactRef.current, { y: '-110vh', ease: 'none' }, 0)

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
        start: 'top+=20 10%',
        endTrigger: '#playground',
        end: 'top top',
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
          start: 'top 90%',
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
            <p ref={line1Ref}>
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
      </section>

      <section id="case-study-1" className="section section--placeholder">
        <p className="placeholder-label">CASE STUDY 1</p>
      </section>

      <section id="case-study-2" className="section section--placeholder">
        <p className="placeholder-label">CASE STUDY 2</p>
      </section>

      <section id="playground" className="section section--placeholder">
        <p className="placeholder-label">PLAYGROUND MODE</p>
      </section>

    </div>
  )
}

export default Home
