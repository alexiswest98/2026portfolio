import { forwardRef } from 'react'
import './ContactLinks.css'

const ContactLinks = forwardRef((props, ref) => {
  return (
    <div className="contact-links" ref={ref}>
      <a
        className="contact-link"
        href="https://www.linkedin.com/in/alexiswest98/"
        target="_blank"
        rel="noopener noreferrer"
      >
        linkedin
      </a>
      <a
        className="contact-link"
        href="https://github.com/alexiswest98"
        target="_blank"
        rel="noopener noreferrer"
      >
        github
      </a>
      <a
        className="contact-link"
        href="mailto:alexishwest98@gmail.com.com"
      >
        email
      </a>
    </div>
  )
})

ContactLinks.displayName = 'ContactLinks'

export default ContactLinks
