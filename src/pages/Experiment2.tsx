import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './CaseStudy.css'
import './CaseStudy0.css'
import './Experiment.css'
import hallucinating_vid from '../assets/experiments/Hallucinating.mp4'
import audio_reactive_vid from '../assets/experiments/Hallucinating_audio.mp4'
import hallucinating_idea1 from '../assets/experiments/Hallucinating_try1.mp4'
import og_set from '../assets/experiments/Hallucinating_Set.mp4'

const Experiment2 = () => {
  const navigate = useNavigate()

  return (
    <div className="experiment-body">
      <button
        onClick={() => navigate('/', { state: { scrollTo: 'experiment-2' } })}
        className="cs0-hero__back-btn"
        aria-label="Go back"
      >
        <ArrowLeft className="cs0-hero__back-icon" />
      </button>
      <div className='experiment_material-container'>
        <div className='experiment_material-main office-main-preview'>
          <video src={hallucinating_vid} className='main1-vid'
            controls
          ></video>
        </div>
        <div className='experiment_material-description'>
          <h1 className='experiment-title'>Hallucinating</h1>
          <h2 className='experiment-tech-text'>MadMapper</h2>
          <p className='experiment-text'>We watch large language models work in real time, but fragments slip through: the latency, the drift, outputs that feel almost alive. This piece began as a question about who is really observing whom. Built around an exploration to a set by artist Asma Kazmi, the projection uses the hallucinating output of an LLM as its primary material, turning surveillance back on itself.</p>
          
        </div>
      </div>
      <div className='experiment_material-grid'>
        <div className='experiment_grid-item grid-item-horizontal'>
          <video src={audio_reactive_vid} className='experiment_grid-media-horiz' controls></video>
          <p className='experiment_grid-caption grid-caption-horizontal'>Eyeball movement and sound waves are driven by audio input, accelerating in response to higher volume levels</p>
        </div>
        <div className='experiment_grid-item grid-item-horizontal'>
          <video src={hallucinating_idea1} className='experiment_grid-media-horiz' controls></video>
          <p className='experiment_grid-caption grid-caption-horizontal'>Initial idea did not have audio reactive elements</p>
        </div>
        <div className='experiment_grid-item grid-item-horizontal'>
          <video src={og_set} className='experiment_grid-media-horiz' controls></video>
          <p className='experiment_grid-caption grid-caption-horizontal'>Asma Kazmi's original set</p>
        </div>
      </div>
    </div>
  )
}

export default Experiment2
