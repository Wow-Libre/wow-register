'use client'

import Link from 'next/link'
import { AnimatedSection } from './AnimatedSection'

const features = [
  {
    title: 'Personajes',
    description: 'Consulta los personajes del servidor. Busca por nombre y nivel.',
    href: '/characters',
    icon: '⚔',
  },
  {
    title: 'Hermandades',
    description: 'Listado de hermandades del servidor con miembros y líder.',
    href: '/guilds',
    icon: '🛡',
  },
  {
    title: 'Registro',
    description: 'Crea tu cuenta para entrar al juego. Gratis y en segundos.',
    href: '/register',
    icon: '🔐',
  },
]

export function Features() {
  return (
    <section className="relative border-t border-wow-border/50 bg-wow-card/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <h2 className="font-display text-center text-3xl font-bold tracking-wide text-wow-gold sm:text-4xl md:text-5xl">
            Todo para jugar
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-400">
            Registro, personajes y hermandades de nuestro servidor privado.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.href} delay={i * 0.1}>
              <Link
                href={feature.href}
                className="group flex h-full flex-col rounded-xl border-2 border-wow-border bg-wow-card/80 p-6 shadow-wow-card backdrop-blur-sm transition-all hover:border-wow-gold-dim hover:bg-wow-card hover:shadow-[0_0_24px_rgba(212,175,55,0.12)]"
                data-cursor-hover
              >
                <span className="text-3xl opacity-90 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)] transition-transform group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]">
                  {feature.icon}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                  {feature.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-wow-gold transition-all group-hover:text-wow-gold-light group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                  Explorar →
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
