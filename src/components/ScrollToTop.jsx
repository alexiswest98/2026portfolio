import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to top on every route change, except when returning to home with
// a scrollTo state (that case is handled by Home.jsx's own effect).
const ScrollToTop = () => {
  const { pathname, state } = useLocation()

  useEffect(() => {
    if (pathname === '/' && state?.scrollTo) return
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
