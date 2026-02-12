'use client'

import Link from 'next/link'

const links = [
  { href: '/characters', label: 'Personajes' },
  { href: '/guilds', label: 'Hermandades' },
  { href: '/realms', label: 'Conectar' },
  { href: '/server', label: 'Estado' },
  { href: '/register', label: 'Jugar ahora' },
]

export function Footer() {
  return (
    <footer className="border-t border-wow-border/50 bg-wow-dark py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Link
            href="/"
            className="font-display flex items-center gap-2 text-lg font-bold text-wow-gold transition-all hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
          >
            <span className="text-xl">⚔</span>
            WoW Register
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-slate-500 transition-colors hover:text-wow-gold"
                data-cursor-hover
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-center text-sm text-slate-600">
          Servidor privado de World of Warcraft — Registro y comunidad.
        </p>
      </div>
    </footer>
  )
}
