import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './CaseStudy.css'
import './CaseStudy0.css'
import './Experiment.css'

const Experiment4 = () => {
  const navigate = useNavigate()

  return (
    <div className="experiment-body">
      <button
        onClick={() => navigate('/', { state: { scrollTo: 'experiment-4' } })}
        className="cs0-hero__back-btn"
        aria-label="Go back"
      >
        <ArrowLeft className="cs0-hero__back-icon" />
      </button>
      <p>TouchSynth — coming soon</p>
    </div>
  )
}

export default Experiment4
