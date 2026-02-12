'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const SCROLL_SECTION_HEIGHT = 3 // 300vh = 3
const VIDEO_PATH = '/Quiero_que_tomes_202602121634_oj3co.mp4'

export function ScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [duration, setDuration] = useState<number>(0)
  const [isReady, setIsReady] = useState(false)
  const rafId = useRef<number | null>(null)
  const ticking = useRef(false)

  const updateVideoTime = useCallback(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video || !isReady || duration <= 0) return

    const rect = section.getBoundingClientRect()
    const sectionHeight = rect.height
    const viewportHeight = window.innerHeight
    const maxScroll = sectionHeight - viewportHeight

    if (maxScroll <= 0) {
      video.currentTime = 0
      return
    }

    // Progreso 0 (inicio) cuando el top de la sección está en top viewport
    // Progreso 1 (fin) cuando el bottom de la sección llega al top viewport
    const scrolled = -rect.top
    const progress = Math.max(0, Math.min(1, scrolled / maxScroll))
    const time = progress * duration
    if (Number.isFinite(time) && time >= 0) {
      video.currentTime = time
    }
    ticking.current = false
  }, [duration, isReady])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onLoadedMetadata = () => {
      const d = video.duration
      if (Number.isFinite(d) && d > 0) {
        setDuration(d)
        setIsReady(true)
      }
    }

    const onCanPlay = () => {
      if (!duration && Number.isFinite(video.duration)) {
        setDuration(video.duration)
        setIsReady(true)
      }
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('canplay', onCanPlay)
    if (video.readyState >= 1 && Number.isFinite(video.duration)) {
      setDuration(video.duration)
      setIsReady(true)
    }
    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('canplay', onCanPlay)
    }
  }, [duration])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScrollOrResize = () => {
      if (ticking.current) return
      ticking.current = true
      rafId.current = requestAnimationFrame(() => {
        updateVideoTime()
        rafId.current = null
      })
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    onScrollOrResize()
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [updateVideoTime])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${SCROLL_SECTION_HEIGHT * 100}vh` }}
    >
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_PATH}
          preload="metadata"
          playsInline
          muted
          aria-label="Video controlado por scroll"
        />
      </div>
    </section>
  )
}
