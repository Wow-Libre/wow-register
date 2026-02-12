'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavLinks } from '@/components/NavLinks'

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLanding = pathname === '/'

  if (isLanding) {
    return <>{children}</>
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 py-4">
        <Link
          href="/"
          className="font-display flex items-center gap-2 text-xl font-bold text-white transition-opacity hover:opacity-90"
        >
          <span className="text-2xl opacity-90">⚔</span>
          WoW Register
        </Link>
        <NavLinks />
      </header>
      <main className="flex-1 pb-12 pt-2">
        {children}
      </main>
      <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        Servidor privado WoW — Registro y estadísticas
      </footer>
    </div>
  )
}
