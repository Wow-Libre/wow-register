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
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="nav">
      {nav.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          data-active={pathname === href || (href !== '/' && pathname.startsWith(href))}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
