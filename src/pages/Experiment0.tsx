import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './CaseStudy.css'
import './CaseStudy0.css'
import './Experiment.css'
import frank_vid from '../assets/experiments/Frank_web.mp4'
import tems_vid from '../assets/experiments/Tems_Web.mp4'
import tartaro_vid from '../assets/experiments/tartaro_web.mp4'
import network_pic from '../assets/experiments/sound_waves-network.png'

const Experiment0 = () => {
  const navigate = useNavigate()

  return (
    <div className="experiment-body">
      <button
        onClick={() => navigate('/', { state: { scrollTo: 'experiment-0' } })}
        className="cs0-hero__back-btn"
        aria-label="Go back"
      >
        <ArrowLeft className="cs0-hero__back-icon" />
      </button>
      <div className='experiment_material-container'>
        <div className='experiment_material-main'>
          <video src={frank_vid} className='main-vid'
          controls
          ></video>
          <p><strong>Frank Ocean,</strong> Nights </p>
        </div>
        <div className='experiment_material-description'>
          <h1 className='experiment-title'>Audio Reactive Sound Waves</h1>
          <h2 className='experiment-tech-text'>TouchDesigner</h2>
          <p className='experiment-text'>Inspired by sound wave's natural shape, this version utilizes the high frequencies and fast spectral density of the song's audio analysis to affect how the noise particles translate on the 4D and merge with each other.</p>
        </div>
      </div>
      <div className='experiment_material-grid'>
        <div className='experiment_grid-item'>
          <video src={tems_vid} className='experiment_grid-media' controls></video>
          <p className='experiment_grid-caption'><strong>Dave and Tems,</strong> Raindance</p>
        </div>
        <div className='experiment_grid-item'>
          <video src={tartaro_vid} className='experiment_grid-media' controls></video>
          <p className='experiment_grid-caption'><strong>Buscabulla,</strong> Tártaro</p>
        </div>
        <div className='experiment_grid-item'>
          <img src={network_pic} className='experiment_grid-media' alt="sound waves network" />
          <p className='experiment_grid-caption'>Complete network setup</p>
        </div>
      </div>
    </div>
  )
}

export default Experiment0
