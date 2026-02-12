'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

const CURSOR_SIZE = 10
const CURSOR_SIZE_HOVER = 36

export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const x = useSpring(0, { stiffness: 400, damping: 30 })
  const y = useSpring(0, { stiffness: 400, damping: 30 })
  const size = useSpring(CURSOR_SIZE, { stiffness: 400, damping: 30 })

  useEffect(() => {
    setMounted(true)
    if (typeof document !== 'undefined') {
      document.body.classList.add('cursor-landing')
    }
    return () => {
      document.body.classList.remove('cursor-landing')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleMove = (e: MouseEvent) => {
      if (!visible) setVisible(true)
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const handleOver = () => setIsHovering(true)
    const handleOut = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMove)

    const interactive = document.querySelectorAll('a, button, [role="button"], [data-cursor-hover]')
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', handleOver)
      el.addEventListener('mouseleave', handleOut)
    })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', handleOver)
        el.removeEventListener('mouseleave', handleOut)
      })
    }
  }, [mounted, x, y])

  useEffect(() => {
    size.set(isHovering ? CURSOR_SIZE_HOVER : CURSOR_SIZE)
  }, [isHovering, size])

  if (!mounted || !visible) return null

  return (
    <motion.div
      className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full backdrop-blur-sm md:block ${
        isHovering
          ? 'border-2 border-wow-gold bg-wow-gold/10 shadow-[0_0_16px_rgba(212,175,55,0.4)]'
          : 'border border-white/25 bg-white/10'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      style={{
        x,
        y,
        width: size,
        height: size,
        translateX: '-50%',
        translateY: '-50%',
      }}
      aria-hidden
    />
  )
}
