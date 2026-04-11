import { useRef } from 'react'
import './NavSidebar.css'

const NAV_ITEMS = [
  { label: 'home',         id: 'hero' },
  { label: 'case studies', id: 'works' },
  { label: 'about',        id: 'about' },
  { label: 'experiments',  id: 'experiments' },
]

const NavSidebar = ({ activeSection }) => {
  const navRef = useRef(null)

  const handleClick = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - window.innerHeight * 0.10, behavior: 'smooth' })
  }

  return (
    <nav ref={navRef} className="nav-sidebar">
      {NAV_ITEMS.map(({ label, id }) => (
        <button
          key={id}
          className={`nav-item ${activeSection === id ? 'nav-item--active' : ''}`}
          onClick={() => handleClick(id)}
        >
          <span className="nav-text main">{label}</span>
          <span className="nav-text trail trail1">{label}</span>
          <span className="nav-text trail trail2">{label}</span>
        </button>
      ))}
    </nav>
  )
}

export default NavSidebar
