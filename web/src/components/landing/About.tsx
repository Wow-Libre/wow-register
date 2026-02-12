'use client'

import { AnimatedSection } from './AnimatedSection'

export function About() {
  return (
    <section className="relative border-t border-wow-border/50 bg-wow-dark py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-xl border-2 border-wow-border bg-wow-card p-1 shadow-[0_0_32px_rgba(212,175,55,0.08)]">
              <div className="aspect-[4/3] rounded-lg bg-wow-dark">
                <div
                  className="flex h-full items-center justify-center"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.12), transparent 50%),
                      radial-gradient(circle at 70% 70%, rgba(180, 140, 40, 0.08), transparent 50%)
                    `,
                  }}
                >
                  <span className="text-7xl drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">⚔</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-3xl font-bold tracking-wide text-wow-gold sm:text-4xl">
              Tu portal al servidor
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              Portal web de nuestro servidor privado. Aquí te registras y consultas
              personajes, hermandades y estadísticas del servidor.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">
              Rápido, claro y listo para que te unas a la comunidad.
            </p>
            <ul className="mt-8 space-y-3">
              {['Registro de cuentas', 'Personajes del servidor', 'Hermandades'].map(
                (item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-wow-gold shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
