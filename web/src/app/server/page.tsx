import { api } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function ServerPage() {
  let stats = null
  let info = null
  try {
    const [s, i] = await Promise.all([
      api.server.stats(),
      api.server.info().catch(() => null),
    ])
    stats = s
    info = i
  } catch {
    // fallback
  }

  return (
    <>
      <h1 className="font-display mb-1 text-2xl font-bold text-slate-100">Estado del servidor</h1>
      <p className="mb-6 text-slate-400">
        Estadísticas en vivo del servidor privado.
      </p>

      {stats && (
        <div className="card-wow mb-6">
          <h2 className="font-display mb-4 text-lg text-wow-gold">Estadísticas</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <div className="rounded-lg border border-wow-border bg-wow-dark/50 p-4">
              <div className="font-display text-xl text-wow-gold">{stats.totalAccounts.toLocaleString()}</div>
              <div className="text-sm text-slate-500">Cuentas</div>
            </div>
            <div className="rounded-lg border border-wow-border bg-wow-dark/50 p-4">
              <div className="font-display text-xl text-wow-gold">{stats.totalCharacters.toLocaleString()}</div>
              <div className="text-sm text-slate-500">Personajes</div>
            </div>
            <div className="rounded-lg border border-wow-border bg-wow-dark/50 p-4">
              <div className="font-display text-xl text-wow-gold">{stats.onlineCharacters}</div>
              <div className="text-sm text-slate-500">Jugadores en línea</div>
            </div>
            <div className="rounded-lg border border-wow-border bg-wow-dark/50 p-4">
              <div className="font-display text-xl text-wow-gold">{stats.totalGuilds}</div>
              <div className="text-sm text-slate-500">Hermandades</div>
            </div>
          </div>
        </div>
      )}

      {info && (
        <div className="card-wow">
          <h2 className="font-display mb-4 text-lg text-wow-gold">
            Información del servidor
          </h2>
          <p className="mb-2 flex items-center gap-2 text-sm">
            <strong className="text-slate-300">Comando:</strong>
            <code className="rounded bg-wow-dark px-1.5 py-0.5 text-wow-gold">{info.command}</code>
            {info.success ? (
              <span className="badge-online">OK</span>
            ) : (
              <span className="rounded bg-red-500/20 px-2 py-0.5 text-sm font-semibold text-red-400">Error</span>
            )}
          </p>
          <pre className="overflow-auto rounded-lg border border-wow-border bg-wow-dark p-4 text-sm leading-relaxed text-slate-300 whitespace-pre-wrap break-words">
            {info.result || '(sin respuesta)'}
          </pre>
        </div>
      )}

      {!stats && !info && (
        <div className="card-wow">
          <p className="m-0 text-slate-400">No se pudo conectar con el servidor. Intenta más tarde.</p>
        </div>
      )}
    </>
  )
}
