import type { Metadata } from 'next'
import Link from 'next/link'
import { NavLinks } from '@/components/NavLinks'
import './globals.css'

export const metadata: Metadata = {
  title: 'WoW Register — Reino',
  description: 'Estadísticas y datos públicos del reino (personajes, hermandades, objetos).',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="layout">
          <header className="header">
            <Link href="/" className="logo">
              <span className="logoIcon">⚔</span>
              WoW Register
            </Link>
            <NavLinks />
          </header>
          <main className="main">
            {children}
          </main>
          <footer className="footer">
            WoW Register — Datos del reino (sin autenticación)
          </footer>
        </div>
      </body>
    </html>
  )
}
