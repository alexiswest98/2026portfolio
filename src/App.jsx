import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudy0 from './pages/CaseStudy0'
import CaseStudy1 from './pages/CaseStudy1'
import CaseStudy2 from './pages/CaseStudy2'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study-0" element={<CaseStudy0 />} />
        <Route path="/case-study-1" element={<CaseStudy1 />} />
        <Route path="/case-study-2" element={<CaseStudy2 />} />
      </Routes>
    </Router>
  )
}

export default App
