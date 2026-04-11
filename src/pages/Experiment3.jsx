import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './CaseStudy.css'
import './CaseStudy0.css'
import './Experiment.css'
import './Experiment3.css'

// ── Constants ──────────────────────────────────────────────────────────────
const TOUCH_THRESHOLD = 30
const CANVAS_WIDTH = 740
const CANVAS_HEIGHT = 580

const FINGER_INDICES = {
  THUMB: 4,
  INDEX: 8,
  MIDDLE: 12,
  RING: 16,
  PINKY: 20,
}

// Sorted most-specific first so getBestMatchingCombo returns the richest match
const FINGER_COMBINATIONS = [
  { name: 'thumb-all',              fingers: [4, 8, 12, 16, 20], notes: ['C4', 'E4', 'G4', 'B4', 'D5'] },
  { name: 'thumb-index-middle-ring',  fingers: [4, 8, 12, 16],   notes: ['C4', 'E4', 'G4', 'B4'] },
  { name: 'thumb-index-middle-pinky', fingers: [4, 8, 12, 20],   notes: ['G4', 'B4', 'D5', 'F5'] },
  { name: 'thumb-index-ring-pinky',   fingers: [4, 8, 16, 20],   notes: ['F4', 'A4', 'C5', 'E5'] },
  { name: 'thumb-middle-ring-pinky',  fingers: [4, 12, 16, 20],  notes: ['D4', 'F4', 'A4', 'C5'] },
  { name: 'thumb-index-middle',       fingers: [4, 8, 12],       notes: ['C4', 'E4', 'G4'] },
  { name: 'thumb-index-ring',         fingers: [4, 8, 16],       notes: ['F4', 'A4', 'C5'] },
  { name: 'thumb-index-pinky',        fingers: [4, 8, 20],       notes: ['G4', 'B4', 'D5'] },
  { name: 'thumb-middle-ring',        fingers: [4, 12, 16],      notes: ['D4', 'F4', 'A4'] },
  { name: 'thumb-middle-pinky',       fingers: [4, 12, 20],      notes: ['E4', 'G4', 'B4'] },
  { name: 'thumb-ring-pinky',         fingers: [4, 16, 20],      notes: ['A4', 'C5', 'E5'] },
  { name: 'thumb-index',             fingers: [4, 8],            notes: ['C4', 'D4'] },
  { name: 'thumb-middle',            fingers: [4, 12],           notes: ['C4', 'E4'] },
  { name: 'thumb-ring',              fingers: [4, 16],           notes: ['C4', 'F4'] },
  { name: 'thumb-pinky',             fingers: [4, 20],           notes: ['C4', 'G4'] },
]

const fingerNotes = new Map([
  [4,  'C4'],
  [8,  'D4'],
  [12, 'E4'],
  [16, 'F4'],
  [20, 'G4'],
])

// ── Component ──────────────────────────────────────────────────────────────
const Experiment3 = () => {
  const navigate = useNavigate()
  const [btnState, setBtnState] = useState('idle') // 'idle' | 'starting' | 'ready'
  const synthRef = useRef(null)
  const isAudioReadyRef = useRef(false)
  const handPoseRef = useRef(null)
  const videoRef = useRef(null)

  const startTone = async () => {
    setBtnState('starting')
    const Tone = window.Tone
    try {
      await Tone.start()
      console.log('Audio is ready')

      synthRef.current = new Tone.PolySynth(Tone.MonoSynth, {
        oscillator: { type: 'fmsquare5', modulationType: 'triangle', modulationIndex: 2, harmonicity: 0.5 },
        filter: { Q: 1, type: 'lowpass', rolloff: -24 },
        envelope: { attack: 0.01, decay: 0.01, sustain: 0.4, release: 2 },
        filterEnvelope: { attack: 0.01, decay: 0.1, sustain: 0.8, release: 1.5, baseFrequency: 40, octaves: 4 },
      })
      synthRef.current.toDestination()
      isAudioReadyRef.current = true
      setBtnState('ready')
    } catch (error) {
      console.log('Audio not ready:', error)
      setBtnState('idle')
    }
  }

  useEffect(() => {
    const p5Constructor = window.p5
    const ml5 = window.ml5

    const sketch = (p) => {
      let handPose;
      let video;
      let hands = [];
      let activeNotes = new Map();
      let lastHandDetectionTime = 0;
      const HAND_TIMEOUT = 500;

      // ── Helpers ────────────────────────────────────────────────────────
      function gotHands(results) {
        hands = results
        if (results.length > 0) lastHandDetectionTime = p.millis()
      }

      function getValidHands() {
        return hands.filter(hand => {
          if (!hand.keypoints || hand.keypoints.length < 21) return false
          const requiredTips = [FINGER_INDICES.THUMB, FINGER_INDICES.INDEX,
            FINGER_INDICES.MIDDLE, FINGER_INDICES.RING, FINGER_INDICES.PINKY]
          return requiredTips.every(tipIndex => {
            const kp = hand.keypoints[tipIndex]
            return kp && kp.x >= 0 && kp.x <= CANVAS_WIDTH && kp.y >= 0 && kp.y <= CANVAS_HEIGHT
          })
        })
      }

      function checkKeyPointOverlap(p1x, p1y, p2x, p2y) {
        return p.dist(p1x, p1y, p2x, p2y) < TOUCH_THRESHOLD
      }

      function getTouchingFingers(hand) {
        const thumbKp = hand.keypoints[FINGER_INDICES.THUMB]
        if (!thumbKp) return new Set()
        const touching = new Set()
        ;[FINGER_INDICES.INDEX, FINGER_INDICES.MIDDLE, FINGER_INDICES.RING, FINGER_INDICES.PINKY].forEach(fingerIdx => {
          const kp = hand.keypoints[fingerIdx]
          if (kp && checkKeyPointOverlap(thumbKp.x, thumbKp.y, kp.x, kp.y)) touching.add(fingerIdx)
        })
        return touching
      }

      function getBestMatchingCombo(touchingFingers) {
        if (touchingFingers.size === 0) return null
        for (const combo of FINGER_COMBINATIONS) {
          const nonThumb = combo.fingers.filter(f => f !== FINGER_INDICES.THUMB)
          if (nonThumb.length > 0 && nonThumb.every(f => touchingFingers.has(f))) return combo
        }
        return null
      }

      function clearAllActiveNotes() {
        if (activeNotes.size === 0) return
        const allActive = []
        activeNotes.forEach(notes => allActive.push(...notes))
        const unique = [...new Set(allActive)]
        if (unique.length > 0) synthRef.current.triggerRelease(unique)
        activeNotes.clear()
        console.log('Cleared all active notes — no hands detected')
      }

      function checkFingerTouches(hand) {
        if (!hand.keypoints || hand.keypoints.length < 21) return
        const touchingFingers = getTouchingFingers(hand)
        const bestCombo = getBestMatchingCombo(touchingFingers)

        if (bestCombo && !activeNotes.has(bestCombo.name)) {
          synthRef.current.triggerAttack(bestCombo.notes)
          activeNotes.set(bestCombo.name, bestCombo.notes)
        }

        const notesToRelease = []
        activeNotes.forEach((notes, comboName) => {
          if (!bestCombo || comboName !== bestCombo.name) {
            notesToRelease.push(...notes)
            activeNotes.delete(comboName)
          }
        })
        if (notesToRelease.length > 0) synthRef.current.triggerRelease([...new Set(notesToRelease)])
      }

function drawConnections(hand) {
        const touchingFingers = getTouchingFingers(hand)
        const bestCombo = getBestMatchingCombo(touchingFingers)
        if (!bestCombo) return
        const thumbKp = hand.keypoints[FINGER_INDICES.THUMB]
        if (!thumbKp) return
        bestCombo.fingers.filter(f => f !== FINGER_INDICES.THUMB).forEach(fingerIdx => {
          const kp = hand.keypoints[fingerIdx]
          if (kp) {
            p.stroke(255, 230, 0)
            p.strokeWeight(3)
            p.line(p.width - thumbKp.x, thumbKp.y, p.width - kp.x, kp.y)
            p.noStroke()
          }
        })
      }

      function drawHandPoints(hand) {
        for (let kp of hand.keypoints) {
          p.fill(252, 123, 3)
          p.noStroke()
          p.circle(p.width - kp.x, kp.y, 12)
        }
        Object.values(FINGER_INDICES).forEach(tip => {
          if (hand.keypoints[tip]) {
            p.fill(22, 5, 255)
            // p.circle(p.width - kp.x, kp.y, 10)
            p.circle(p.width - hand.keypoints[tip].x, hand.keypoints[tip].y, 12)
          }
        })
        for (let [fingerIndex, note] of fingerNotes) {
          if (hand.keypoints[fingerIndex]) {
            p.fill(0)
            p.text(note, p.width - hand.keypoints[fingerIndex].x, hand.keypoints[fingerIndex].y - 20)
          }
        }
        drawConnections(hand)
      }

      // ── p5 lifecycle ───────────────────────────────────────────────────
      p.preload = () => {
        handPose = ml5.handPose()
        handPoseRef.current = handPose
      }

      p.setup = () => {
        const canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
        canvas.parent('canvas-container')
        // Scale canvas visually to fill container while keeping internal resolution
        canvas.elt.style.width = '100%'
        canvas.elt.style.height = 'auto'

        video = p.createCapture({ video: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT, facingMode: 'user' } })
        video.size(CANVAS_WIDTH, CANVAS_HEIGHT)
        video.hide()
        videoRef.current = video
        video.elt.addEventListener('loadedmetadata', () => {
          console.log('Camera ready, starting hand detection')
          handPose.detectStart(video, gotHands)
        })
      }

      p.draw = () => {
        if (video.loadedmetadata === false) {
          p.fill(255)
          p.textAlign(p.CENTER)
          p.textSize(20)
          p.text('Loading camera...', p.width / 2, p.height / 2)
          return
        }

        p.push()
        p.scale(-1, 1)
        p.image(video, -p.width, 0, p.width, p.height)
        p.pop()

        if (isAudioReadyRef.current && p.millis() - lastHandDetectionTime > HAND_TIMEOUT && activeNotes.size > 0) {
          clearAllActiveNotes()
        }

        const validHands = getValidHands()
        for (let hand of validHands) {
          drawHandPoints(hand)
          if (isAudioReadyRef.current) checkFingerTouches(hand)
        }

        p.fill(255)
        p.textSize(16)
        p.textAlign(p.LEFT)
        p.text(isAudioReadyRef.current ? 'Audio Ready! Touch fingers to play.' : 'Click Start to begin', 10, 30)

        if (validHands.length === 0 && isAudioReadyRef.current) {
          p.fill(255, 100, 100)
          p.text('No hands detected — show your hand to the camera', 10, 60)
        }
      }
    }

    const p5Instance = new p5Constructor(sketch)
    return () => {
      handPoseRef.current?.detectStop()
      videoRef.current?.elt?.srcObject?.getTracks()?.forEach(t => t.stop())
      handPoseRef.current = null
      videoRef.current = null
      p5Instance.remove()
    }
  }, [])

  return (
    <div className="experiment-body">
      <button
        onClick={() => navigate('/', { state: { scrollTo: 'experiment-3' } })}
        className="cs0-hero__back-btn"
        aria-label="Go back"
      >
        <ArrowLeft className="cs0-hero__back-icon" />
      </button>
      <h1 id='touch_synth-title'>TouchSynth</h1>

      <div id="main-layout">
        <div id="instructions">
          <h3 className='experiment3-tech-text'>How to Play:</h3>
          <p>Touch one or more fingers to your <strong>thumb tip</strong> to play. The more fingers you add, the richer the chord — only the most specific combo sounds at once.</p>
          <div className="finger-mapping"><strong>1 finger + thumb:</strong> Two-note interval</div>
          <div className="finger-mapping"><strong>2 fingers + thumb:</strong> Triad</div>
          <div className="finger-mapping"><strong>3 fingers + thumb:</strong> 7th chord</div>
          <div className="finger-mapping"><strong>4 fingers + thumb:</strong> 9th chord</div>
          <p><strong>Tips:</strong></p>
          <ul>
            <li>Keep your hand flat and visible in frame</li>
            <li>Notes release as soon as fingers separate from the thumb</li>
          </ul>
        </div>
        <div id="right-panel">
          <div id="canvas-container"></div>
          {btnState !== 'ready' && (
            <button
              id="start-button"
              onClick={startTone}
              disabled={btnState === 'starting'}
            >
              {btnState === 'starting' ? 'Starting...' : 'Start Hand Instrument'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Experiment3
