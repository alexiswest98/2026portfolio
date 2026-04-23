import { useEffect } from 'react'

export default function VideoAutoplayManager() {
  useEffect(() => {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (entry.isIntersecting) {
            video.muted = true           // set property, not just HTML attribute
            video.play().catch(() => {}) // ignore if browser still blocks
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.1 }
    )

    const observeAllVideos = () => {
      document.querySelectorAll('video').forEach((v) => videoObserver.observe(v))
    }

    observeAllVideos()

    // Catch videos added dynamically by React route changes
    const mutationObserver = new MutationObserver(observeAllVideos)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      videoObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}
