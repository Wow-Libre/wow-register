'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomCursor } from './CustomCursor'
import { Hero } from './Hero'
import { Features } from './Features'
import { About } from './About'
import { CTA } from './CTA'
import { Footer } from './Footer'

gsap.registerPlugin(ScrollTrigger)

export function Landing() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const orbs = parallaxRef.current?.querySelectorAll('[data-parallax]')
      if (!orbs?.length) return
      orbs.forEach((orb) => {
        gsap.to(orb, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, parallaxRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <CustomCursor />
      <div ref={parallaxRef} className="min-h-screen">
        <Hero />
        <Features />
        <About />
        <CTA />
        <Footer />
      </div>
    </>
  )
}
