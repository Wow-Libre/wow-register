import type { Metadata } from 'next'
import Link from 'next/link'
import { NavLinks } from '@/components/NavLinks'
import './globals.css'

export const metadata: Metadata = {
  title: 'WoW Register — Reino',
  description: 'Estadísticas del reino, personajes, hermandades y registro de cuentas de juego.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-wow-dark text-slate-200">
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
            WoW Register — Datos del reino y registro de cuentas
          </footer>
        </div>
      </body>
    </html>
  )
}
