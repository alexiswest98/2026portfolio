import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import './NavSidebar.css'

gsap.registerPlugin(ScrambleTextPlugin)

const NAV_ITEMS = [
  { label: 'home',  id: 'hero' },
  { label: 'works', id: 'works' },
  { label: 'about', id: 'about' },
]

const binaryMap = {
  'home':  '1001',
  'works': '10110',
  'about': '01101',
}

const NavSidebar = ({ activeSection }) => {
  const navRef = useRef(null)
  const location = useLocation()
  // Line-through only appears after scramble completes
  const [scrambleDone, setScrambleDone] = useState(false)

  const handleClick = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  }

  useEffect(() => {
    // Only run scramble on the home page — nav persists across routes
    if (location.pathname !== '/') return

    const originalTexts = NAV_ITEMS.map(item => item.label)
    const buttons = Array.from(navRef.current.querySelectorAll('.nav-item'))
    const allSpanGroups = buttons.map(btn => Array.from(btn.querySelectorAll('.nav-text')))
    const mainSpans = buttons.map(btn => btn.querySelector('.nav-text.main'))

    // Reset state so line-through doesn't flash during scramble
    setScrambleDone(false)

    // Set all 3 spans per button to binary
    allSpanGroups.forEach((spans, i) => {
      const bin = binaryMap[originalTexts[i]] ?? '01010101'
      spans.forEach(span => { span.textContent = bin })
    })

    // Hide trails — prevents semi-transparent overlay from showing revealed english in main
    gsap.set(navRef.current.querySelectorAll('.nav-text.trail'), { opacity: 0 })

    const loadTl = gsap.timeline({ delay: 0.5 })
    mainSpans.forEach((el, i) => {
      loadTl.to(el, {
        duration: 1.5,
        scrambleText: { text: originalTexts[i], chars: '01', speed: 0.5 },
        onComplete: () => {
          allSpanGroups[i].forEach(span => { span.textContent = originalTexts[i] })
          if (i === NAV_ITEMS.length - 1) {
            gsap.set(navRef.current.querySelectorAll('.nav-text.trail'), { clearProps: 'opacity' })
            setScrambleDone(true)
          }
        },
      }, i * 0.3)
    })

    return () => {
      // Restore English text so spans aren't left binary if navigating away mid-scramble
      allSpanGroups.forEach((spans, i) => {
        spans.forEach(span => { span.textContent = originalTexts[i] })
      })
      loadTl.kill()
    }
  }, [location.pathname])

  return (
    <nav ref={navRef} className="nav-sidebar">
      {NAV_ITEMS.map(({ id }) => (
        <button
          key={id}
          className={`nav-item ${scrambleDone && activeSection === id ? 'nav-item--active' : ''}`}
          onClick={() => handleClick(id)}
        >
          {/* Spans are empty — text is set and managed entirely by GSAP/JS.
              Empty children prevent React from resetting textContent on re-render. */}
          <span className="nav-text main"></span>
          <span className="nav-text trail trail1"></span>
          <span className="nav-text trail trail2"></span>
        </button>
      ))}
    </nav>
  )
}

export default NavSidebar
