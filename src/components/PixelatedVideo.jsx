import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PixelatedVideo = ({ src, className = '' }) => {
    const wrapperRef = useRef(null)
    const videoRef = useRef(null)
    const gridRef = useRef(null)
    const triggerRef = useRef(null)
    const tweenRef = useRef(null)
    const hideTimeoutRef = useRef(null)
    const [showControls, setShowControls] = useState(false)

    const handleInteraction = () => {
        setShowControls(true)
        clearTimeout(hideTimeoutRef.current)
        hideTimeoutRef.current = setTimeout(() => setShowControls(false), 3000)
    }

    const createGrid = () => {
        const grid = gridRef.current
        if (!grid || grid.offsetHeight === 0) return

        const columns = 12
        const blockSize = grid.offsetWidth / columns
        const rows = Math.ceil(grid.offsetHeight / blockSize)

        grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`
        grid.style.gridTemplateRows = `repeat(${rows}, ${blockSize}px)`
        grid.innerHTML = ''

        for (let i = 0; i < columns * rows; i++) {
            const block = document.createElement('div')
            block.classList.add('pixel-block')
            grid.appendChild(block)
        }
    }

    const initAnimation = () => {
        // Kill only this instance's trigger/tween, not all ScrollTriggers on the page
        triggerRef.current?.kill()
        tweenRef.current?.kill()

        createGrid()

        const blocks = gridRef.current?.querySelectorAll('.pixel-block')
        if (!blocks || blocks.length === 0) return

        gsap.set(blocks, { opacity: 0 })

        tweenRef.current = gsap.to(blocks, {
            opacity: 1,
            ease: 'none',
            stagger: {
                each: 0.02,
                from: 'random',
            },
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: 'bottom 30%',
                end: 'bottom 0%',
                scrub: true,
            },
        })

        triggerRef.current = tweenRef.current.scrollTrigger

        // Recalculate scroll positions — needed when browser restores scroll on back navigation
        ScrollTrigger.refresh()
    }

    useEffect(() => {
        const video = videoRef.current

        const setup = () => {
            requestAnimationFrame(() => initAnimation())
        }

        if (video.readyState >= 1) {
            setup()
        } else {
            video.addEventListener('loadedmetadata', setup, { once: true })
        }

        const handleResize = () => initAnimation()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            triggerRef.current?.kill()
            tweenRef.current?.kill()
            clearTimeout(hideTimeoutRef.current)
        }
    }, [])

    return (
        <div ref={wrapperRef} className={`pixelate-wrapper ${className}`} onClick={handleInteraction} onMouseEnter={handleInteraction}>
            <video
                ref={videoRef}
                src={src}
                className="pixel-video"
                autoPlay
                muted
                loop
                playsInline
                controls={showControls}
            />
            <div ref={gridRef} className="pixel-grid" />
        </div>
    )
}

export default PixelatedVideo
