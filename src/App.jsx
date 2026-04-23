import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudy0 from './pages/CaseStudy0'
import CaseStudy1 from './pages/CaseStudy1'
import CaseStudy2 from './pages/CaseStudy2'
import Experiment0 from './pages/Experiment0'
import Experiment1 from './pages/Experiment1'
import Experiment2 from './pages/Experiment2'
import Experiment3 from './pages/Experiment3'
import Experiment4 from './pages/Experiment4'
import ScrollToTop from './components/ScrollToTop'
import VideoAutoplayManager from './components/VideoAutoplayManager'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <VideoAutoplayManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study-0" element={<CaseStudy0 />} />
        <Route path="/case-study-1" element={<CaseStudy1 />} />
        <Route path="/case-study-2" element={<CaseStudy2 />} />
        <Route path="/experiment-0" element={<Experiment0 />} />
        <Route path="/experiment-1" element={<Experiment1 />} />
        <Route path="/experiment-2" element={<Experiment2 />} />
        <Route path="/experiment-3" element={<Experiment3 />} />
        <Route path="/experiment-4" element={<Experiment4 />} />
      </Routes>
    </Router>
  )
}

export default App
