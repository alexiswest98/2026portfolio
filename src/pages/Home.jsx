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

      // ── 1 + 2. Active section tracker + nav velocity (single onUpdate) ──────
      let trackedSection = 'hero'
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          // Nav velocity drop shadow
          const v = Math.min(Math.abs(self.getVelocity()) / 2000, 1)
          gsap.to('.nav-item', {
            textShadow: `0 0 ${v * 12}px rgba(0, 34, 255, ${v * 2})`,
            duration: 0.1,
            overwrite: true,
          })

          // Active section: find the last section whose offsetTop <= viewport midpoint
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

      // ── 3. Hero pin — all elements scroll up together ─────────────────────
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1,
        },
      })

      // Contact links scroll up and out with the hero content
      heroTl.to(contactRef.current, { y: '-110vh', ease: 'none' }, 0)

      // line1 leads — starts moving first
      heroTl.to(line1Ref.current, { y: '-55vh', color: '#aaaaaa', ease: 'none' }, 0)

      // Logo starts slightly after line1 has begun (overlap)
      heroTl.to(logoRef.current, { y: '-55vh', opacity: 0, ease: 'none' }, 0.025)

      // ── 4. lastLine — dedicated ScrollTrigger, decoupled from heroTl ────────
      // Driving y manually lets us freeze it precisely at the threshold
      // without heroTl fighting position: fixed on every scroll tick
      const freezeTopPx = window.innerHeight * 0.08 // 8vh
      let lastLineFixed = false

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=180%',
        onUpdate: (self) => {
          if (lastLineFixed) return
          // lastLine lags behind logo/line1 (kicks in at 15% scroll progress)
          const p = Math.max(0, (self.progress - 0.15) / 0.85)
          gsap.set(lastLineRef.current, { y: `${p * -55}vh`, color: '#333333' })

          const rect = lastLineRef.current.getBoundingClientRect()
          if (rect.top <= freezeTopPx) {
            lastLineFixed = true
            gsap.set(lastLineRef.current, {
              position: 'fixed',
              top: freezeTopPx,
              left: '50%',
              xPercent: -50,
              y: 0,
              zIndex: 150,
            })
          }
        },
        onLeave: () => {
          if (!lastLineFixed) {
            lastLineFixed = true
            gsap.set(lastLineRef.current, {
              position: 'fixed',
              top: freezeTopPx,
              left: '50%',
              xPercent: -50,
              y: 0,
              zIndex: 150,
            })
          }
        },
        onEnterBack: () => {
          lastLineFixed = false
          // clearProps removes all GSAP inline styles — element snaps back to
          // its natural CSS position (below line1) and onUpdate drives y from there
          gsap.set(lastLineRef.current, {
            clearProps: 'position,top,left,xPercent,y,zIndex,opacity',
          })
        },
      })

      // ── 5. lastLine fades out when playground enters ──────────────────────
      gsap.to(lastLineRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        scrollTrigger: {
          trigger: '#playground',
          start: 'top 90%',
          end: 'top 10%',
          scrub: 0.6,
        },
      })

    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="portfolio">

      {/* Fixed UI — nav + contacts */}
      <NavSidebar activeSection={activeSection} />
      <ContactLinks ref={contactRef} />

      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section id="hero" ref={heroRef} className="section section--hero">
        <div className="hero-content">
          <h1 ref={logoRef} className='hero-title'>Alexis West</h1>
          {/* <img className="hero-logo" ref={logoRef} src="src/assets/namelogo.png" alt="Alexis West" /> */}
          <div className="hero-tagline">
            <p ref={line1Ref}>San Francisco–based UX designer, developer, and <br /> creative technologist crafting digital experiences that feel</p>
            <p ref={lastLineRef} className="hero-last-line">intuitive, intentional, and quietly human.</p>
          </div>
        </div>
      </section>

      {/* ── Case Study 0 ──────────────────────────────────────────────────── */}
      <section id="case-study-0" className="section section--placeholder">
        <p className="placeholder-label">CASE STUDY 0</p>
      </section>

      {/* ── Case Study 1 ──────────────────────────────────────────────────── */}
      <section id="case-study-1" className="section section--placeholder">
        <p className="placeholder-label">CASE STUDY 1</p>
      </section>

      {/* ── Case Study 2 ──────────────────────────────────────────────────── */}
      <section id="case-study-2" className="section section--placeholder">
        <p className="placeholder-label">CASE STUDY 2</p>
      </section>

      {/* ── Playground ────────────────────────────────────────────────────── */}
      <section id="playground" className="section section--placeholder">
        <p className="placeholder-label">PLAYGROUND MODE</p>
      </section>

    </div>
  )
}

export default Home
