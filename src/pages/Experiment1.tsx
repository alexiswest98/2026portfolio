import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './CaseStudy.css'
import './CaseStudy0.css'
import './Experiment.css'
import office_vid from '../assets/experiments/Office_final_1.mp4'
import paint_img from '../assets/experiments/Office_3dpaint.jpeg'
import blender_model_img from '../assets/experiments/Office_3dmodel.jpeg'
import severance_inspo from '../assets/experiments/Office_Inspo.png'
// import office_oil from '../assets/experiments/Office_oil.jpeg'
// import show from '../assets/experiments/Office_Show.MOV'

const Experiment1 = () => {
  const navigate = useNavigate()

  return (
    <div className="experiment-body">
      <button
        onClick={() => navigate('/', { state: { scrollTo: 'experiment-1' } })}
        className="cs0-hero__back-btn"
        aria-label="Go back"
      >
        <ArrowLeft className="cs0-hero__back-icon" />
      </button>
      <div className='experiment_material-container'>
        <div className='experiment_material-main office-main-preview'>
          <video src={office_vid} className='main1-vid'
            controls
          ></video>
        </div>
        <div className='experiment_material-description'>
          <h1 className='experiment-title'>The Office Ate My Imagination</h1>
          <h2 className='experiment-tech-text'>Blender (3d modeling, character rigging), MadMapper, Oil on Canvas</h2>
          <p className='experiment-text'>What happens to imagination when it's put to work? "The Office Ate My Imagination" is a mixed-media installation that uses projection mapping across four canvases to externalize an interior struggle familiar to many creative workers. A lone character moves through three psychological states: stillness, dream, and collapse, mirroring the cycle of inspiration and burnout that defines life at the intersection of art and industry.</p>
          <p className='experiment-text'>The final piece was exhibited as a part of Gray Area’s Creative Coding Intensive Showcase.</p>
        </div>
      </div>
      <div className='experiment_material-grid'>
        <div className='experiment_grid-item grid-item-horizontal'>
          <img src={paint_img} className='experiment_grid-media-horiz' ></img>
          <p className='experiment_grid-caption grid-caption-horizontal'>Adobe Substance 3D Painter</p>
        </div>
        <div className='experiment_grid-item grid-item-horizontal'>
          <img src={blender_model_img} className='experiment_grid-media-horiz' ></img>
          <p className='experiment_grid-caption grid-caption-horizontal'>Initial model ideation and 3D modeling</p>
        </div>
        <div className='experiment_grid-item grid-item-horizontal'>
          <img src={severance_inspo} className='experiment_grid-media' />
          <p className='experiment_grid-caption'>Inspiration from media, Severance</p>
          {/* <p>highly recommend this show :)</p> */}
        </div>
        {/* <div className='experiment_grid-item grid-item-horizontal'>
          <img src={blender_model_img} className='experiment_grid-media-horiz' ></img>
          <p className='experiment_grid-caption grid-caption-horizontal'>Complete network setup</p>
        </div> */}
      </div>
    </div>
  )
}

export default Experiment1
