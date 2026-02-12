import type { Metadata } from 'next'
import { LayoutShell } from '@/components/LayoutShell'
import './globals.css'

export const metadata: Metadata = {
  title: 'WoW Register — Servidor privado',
  description: 'Portal del servidor privado: registro de cuentas, personajes y hermandades. Únete y juega.',
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
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-wow-dark text-slate-200">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}
