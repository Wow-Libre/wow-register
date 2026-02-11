'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/', label: 'Inicio' },
  { href: '/realms', label: 'Reinos' },
  { href: '/characters', label: 'Personajes' },
  { href: '/guilds', label: 'Hermandades' },
  { href: '/items', label: 'Objetos' },
  { href: '/server', label: 'Servidor' },
  { href: '/register', label: 'Registro', cta: true },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-wrap items-center gap-1">
      {nav.map(({ href, label, cta }) =>
        cta ? (
          <Link
            key={href}
            href={href}
            className="rounded-full bg-white px-5 py-2 text-sm font-medium text-wow-dark transition-all hover:bg-slate-100"
          >
            {label}
          </Link>
        ) : (
          <Link
            key={href}
            href={href}
            className={`rounded-lg px-4 py-2 text-sm transition-colors ${
              pathname === href || (href !== '/' && pathname.startsWith(href))
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {label}
          </Link>
        )
      )}
    </nav>
  )
}
