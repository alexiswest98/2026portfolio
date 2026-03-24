import './NavSidebar.css'

const NAV_ITEMS = [
  { label: 'HOME', id: 'hero' },
  { label: 'CASE STUDY 0', id: 'case-study-0' },
  { label: 'CASE STUDY 1', id: 'case-study-1' },
  { label: 'CASE STUDY 2', id: 'case-study-2' },
  { label: 'PLAYGROUND', id: 'playground' },
]

const NavSidebar = ({ activeSection }) => {
  const handleClick = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  }

  return (
    <nav className="nav-sidebar">
      {NAV_ITEMS.map(({ label, id }) => (
        // <button
        //   key={id}
        //   className={`nav-item ${activeSection === id ? 'nav-item--active' : ''}`}
        //   onClick={() => handleClick(id)}
        // >
        //   {label}
        // </button>
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
