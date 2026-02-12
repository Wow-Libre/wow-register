'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedSection } from './AnimatedSection'

export function CTA() {
  return (
    <section className="relative border-t border-wow-border/50 bg-wow-card/30 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-2xl border-2 border-wow-border bg-wow-card/90 p-12 shadow-[0_0_40px_rgba(212,175,55,0.08)] md:p-16">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold tracking-wide text-wow-gold sm:text-4xl md:text-5xl">
                ¿Listo para jugar?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
                Regístrate gratis y conecta tu cliente al servidor.
              </p>
              <motion.div
                className="mt-10"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-b from-wow-gold to-wow-gold-dim px-10 py-4 text-base font-bold text-wow-dark shadow-[0_4px_24px_rgba(212,175,55,0.4)] transition-all hover:brightness-110 hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] hover:-translate-y-0.5"
                  data-cursor-hover
                >
                  Crear cuenta y jugar
                </Link>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
