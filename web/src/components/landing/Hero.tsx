'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const VIDEO_PATH = '/Quiero_que_tomes_202602121634_oj3co.mp4'
const SCROLL_SECTION_HEIGHT = 3 // 300vh

const headline = 'Únete a nuestro servidor.'
const words = headline.split(' ')

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
}

const wordMotion = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [duration, setDuration] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const rafId = useRef<number | null>(null)
  const ticking = useRef(false)
  const lastTimeRef = useRef<number>(-1)
  const SAFE_END = 0.5 // segundos antes del final para no trabar
  const SEEK_THRESHOLD = 0.06 // solo buscar si el tiempo cambió más que esto

  const updateVideoTime = useCallback(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video || duration <= 0) return

    const rect = section.getBoundingClientRect()
    const sectionHeight = rect.height
    const viewportHeight = window.innerHeight
    const maxScroll = sectionHeight - viewportHeight

    if (maxScroll <= 0) {
      video.currentTime = 0
      lastTimeRef.current = 0
      ticking.current = false
      return
    }

    const scrolled = -rect.top
    const progress = Math.max(0, Math.min(1, scrolled / maxScroll))
    const targetTime = Math.min(progress * duration, duration - SAFE_END)
    const time = Math.max(0, targetTime)

    if (!Number.isFinite(time) || time < 0) {
      ticking.current = false
      return
    }

    // Evitar seeks innecesarios (pueden trabar al final) y solo actualizar si cambió bastante
    if (Math.abs(lastTimeRef.current - time) > SEEK_THRESHOLD) {
      video.currentTime = time
      lastTimeRef.current = time
    }
    ticking.current = false
  }, [duration])

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
      if (!isReady && Number.isFinite(video.duration) && video.duration > 0) {
        setDuration(video.duration)
        setIsReady(true)
      }
    }

    const onLoadedData = () => {
      if (!isReady && Number.isFinite(video.duration) && video.duration > 0) {
        setDuration(video.duration)
        setIsReady(true)
      }
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('loadeddata', onLoadedData)

    if (video.readyState >= 2 && Number.isFinite(video.duration) && video.duration > 0) {
      setDuration(video.duration)
      setIsReady(true)
    }

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('loadeddata', onLoadedData)
    }
  }, [isReady])

  useEffect(() => {
    if (!isReady) return
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.currentTime = 0
    video.play().then(() => {
      video.pause()
    }).catch(() => {})
  }, [isReady])

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
    updateVideoTime()
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [updateVideoTime, isReady])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${SCROLL_SECTION_HEIGHT * 100}vh` }}
    >
      {/* Sticky viewport: video de fondo + contenido del hero encima */}
      <div className="sticky top-0 left-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pt-20">
        {/* Video como background (debajo de todo) */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_PATH}
          preload="auto"
          playsInline
          muted
          aria-label="Video de fondo del hero"
        />

        {/* Capa oscura sobre el video para legibilidad */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `
              linear-gradient(to bottom, rgba(10,12,15,0.6) 0%, rgba(10,12,15,0.75) 100%),
              radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212, 175, 55, 0.12), transparent 50%)
            `,
          }}
        />

        {/* Orbes suaves encima del video */}
        <div
          data-parallax
          className="pointer-events-none absolute left-1/4 top-1/3 z-[1] h-80 w-80 rounded-full bg-wow-gold/10 blur-[110px]"
        />
        <div
          data-parallax
          className="pointer-events-none absolute bottom-1/4 right-1/4 z-[1] h-96 w-96 rounded-full bg-amber-600/5 blur-[120px]"
        />

        {/* Nav */}
        <nav className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-6 py-5 md:px-12">
          <Link
            href="/"
            className="font-display flex items-center gap-2 text-lg font-bold text-wow-gold transition-all hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]"
            data-cursor-hover
          >
            <span className="text-2xl drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">⚔</span>
            WoW Register
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/characters"
              className="text-sm text-slate-400 transition-colors hover:text-wow-gold"
              data-cursor-hover
            >
              Personajes
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-gradient-to-b from-wow-gold to-wow-gold-dim px-5 py-2.5 text-sm font-semibold text-wow-dark shadow-[0_2px_16px_rgba(212,175,55,0.4)] transition-all hover:brightness-110 hover:shadow-[0_4px_24px_rgba(212,175,55,0.5)] active:scale-[0.98]"
              data-cursor-hover
            >
              Jugar ahora
            </Link>
          </div>
        </nav>

        {/* Contenido del hero encima del video */}
        <motion.div
          className="relative z-10 max-w-4xl text-center"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.h1
            className="font-display text-4xl font-bold tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl"
            variants={container}
          >
            {words.map((word, i) => (
              <motion.span key={i} className="mr-[0.2em] inline-block" variants={wordMotion}>
                <span className="bg-gradient-to-r from-wow-gold via-wow-gold-light to-amber-200 bg-clip-text text-transparent drop-shadow-md">
                  {word}
                </span>
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg text-slate-300 sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Regístrate gratis, explora personajes y hermandades. Todo para jugar en nuestro servidor privado.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <Link
              href="/register"
              className="group relative inline-flex items-center justify-center rounded-lg bg-gradient-to-b from-wow-gold to-wow-gold-dim px-8 py-4 text-base font-bold text-wow-dark shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all hover:brightness-110 hover:shadow-[0_6px_28px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 active:scale-[0.98]"
              data-cursor-hover
            >
              <motion.span
                className="relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                Crear cuenta y jugar
              </motion.span>
            </Link>
            <Link
              href="/characters"
              className="inline-flex items-center justify-center rounded-lg border-2 border-wow-border bg-wow-card/80 px-8 py-4 text-base font-semibold text-slate-200 backdrop-blur-sm transition-all hover:border-wow-gold-dim hover:text-wow-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
              data-cursor-hover
            >
              Ver personajes
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <motion.div
            className="h-10 w-6 rounded-full border-2 border-wow-border"
            initial={{ y: 0 }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div className="mx-auto mt-2 h-1.5 w-1.5 rounded-full bg-wow-gold" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
