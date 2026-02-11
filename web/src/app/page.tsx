import Link from 'next/link'
import { api } from '@/lib/api'

export const dynamic = 'force-dynamic'

const exploreLinks = [
  { href: '/realms', title: 'Reinos', desc: 'Listado de reinos configurados.' },
  { href: '/characters', title: 'Personajes', desc: 'Buscar personajes por nombre y nivel.' },
  { href: '/guilds', title: 'Hermandades', desc: 'Hermandades del reino.' },
  { href: '/items', title: 'Objetos', desc: 'Catálogo de objetos e item level.' },
  { href: '/server', title: 'Servidor', desc: 'Estado e información del emulador.' },
  { href: '/register', title: 'Registro', desc: 'Crea tu cuenta de juego en el emulador.' },
]

export default async function HomePage() {
  let stats = null
  let realm = null
  try {
    const [s, r] = await Promise.all([api.server.stats(), api.realms.first().catch(() => null)])
    stats = s
    realm = r
  } catch {
    // API no disponible
  }

  return (
    <div className="font-sans">
      {/* Hero estilo Apple: limpio, espaciado, una idea clara */}
      <section className="relative overflow-hidden px-2 py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            WoW Register
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-400 sm:text-xl">
            Estadísticas del reino, personajes, hermandades y registro de cuentas. Todo en un solo lugar.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-medium text-wow-dark transition-all hover:bg-slate-100 active:scale-[0.98]"
            >
              Crear cuenta de juego
            </Link>
            <Link
              href="/characters"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-transparent px-8 py-3.5 text-base font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-white/5"
            >
              Explorar personajes
            </Link>
          </div>
        </div>
      </section>

      {/* Reino actual: chip discreto */}
      {realm && (
        <section className="mb-16 px-2">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2 rounded-2xl bg-white/5 px-5 py-4 backdrop-blur-sm">
            <span className="text-sm text-slate-500">Reino actual</span>
            <span className="font-medium text-white">{realm.name}</span>
            <span className="text-slate-600">·</span>
            <code className="rounded-lg bg-white/5 px-2 py-1 text-sm text-slate-400">{realm.address}</code>
          </div>
        </section>
      )}

      {/* Estadísticas: números grandes, estilo ficha técnica */}
      {stats && (
        <section className="mb-20 px-2">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
              <Link href="/characters" className="group block text-center no-underline">
                <div className="text-3xl font-semibold tabular-nums tracking-tight text-white transition-colors group-hover:text-wow-gold sm:text-4xl">
                  {stats.totalCharacters.toLocaleString()}
                </div>
                <div className="mt-1 text-sm text-slate-500">Personajes</div>
              </Link>
              <Link href="/characters" className="group block text-center no-underline">
                <div className="text-3xl font-semibold tabular-nums tracking-tight text-white transition-colors group-hover:text-wow-gold sm:text-4xl">
                  {stats.onlineCharacters}
                </div>
                <div className="mt-1 text-sm text-slate-500">En línea</div>
              </Link>
              <Link href="/guilds" className="group block text-center no-underline">
                <div className="text-3xl font-semibold tabular-nums tracking-tight text-white transition-colors group-hover:text-wow-gold sm:text-4xl">
                  {stats.totalGuilds}
                </div>
                <div className="mt-1 text-sm text-slate-500">Hermandades</div>
              </Link>
              <div className="text-center">
                <div className="text-3xl font-semibold tabular-nums tracking-tight text-white sm:text-4xl">
                  {stats.totalAccounts.toLocaleString()}
                </div>
                <div className="mt-1 text-sm text-slate-500">Cuentas</div>
              </div>
              <Link href="/items" className="group block text-center no-underline">
                <div className="text-3xl font-semibold tabular-nums tracking-tight text-white transition-colors group-hover:text-wow-gold sm:text-4xl">
                  {stats.totalItems.toLocaleString()}
                </div>
                <div className="mt-1 text-sm text-slate-500">Objetos</div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {!stats && !realm && (
        <section className="mb-16 px-2">
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-700/50 bg-white/5 px-6 py-5 text-center backdrop-blur-sm">
            <p className="m-0 text-slate-400">
              No se pudo conectar con la API. Asegúrate de que el backend esté en marcha en el puerto 8080.
            </p>
          </div>
        </section>
      )}

      {/* Explorar: grid de tarjetas limpias */}
      <section className="px-2 pb-8">
        <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight text-white">
          Explorar
        </h2>
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exploreLinks.map(({ href, title, desc }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-2xl border border-slate-700/50 bg-white/[0.02] p-6 no-underline transition-all hover:border-slate-600/50 hover:bg-white/[0.04]"
            >
              <h3 className="mb-2 text-lg font-medium text-white transition-colors group-hover:text-wow-gold">
                {title}
              </h3>
              <p className="m-0 flex-1 text-sm leading-relaxed text-slate-500">{desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
