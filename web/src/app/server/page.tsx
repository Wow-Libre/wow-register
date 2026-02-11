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
      <h1>Servidor</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Estadísticas del reino e información del emulador (vía SOAP).
      </p>

      {stats && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.1rem', color: 'var(--gold)' }}>Estadísticas</h2>
          <div className="statsRow">
            <div className="statBox">
              <div className="value">{stats.totalAccounts.toLocaleString()}</div>
              <div className="label">Cuentas</div>
            </div>
            <div className="statBox">
              <div className="value">{stats.totalCharacters.toLocaleString()}</div>
              <div className="label">Personajes</div>
            </div>
            <div className="statBox">
              <div className="value">{stats.onlineCharacters}</div>
              <div className="label">Conectados</div>
            </div>
            <div className="statBox">
              <div className="value">{stats.totalGuilds}</div>
              <div className="label">Hermandades</div>
            </div>
            <div className="statBox">
              <div className="value">{stats.totalItems.toLocaleString()}</div>
              <div className="label">Objetos</div>
            </div>
          </div>
        </div>
      )}

      {info && (
        <div className="card">
          <h2 style={{ marginTop: 0, fontSize: '1.1rem', color: 'var(--gold)' }}>
            Información del emulador (SOAP)
          </h2>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Comando:</strong> <code>{info.command}</code>
            {info.success ? (
              <span className="badge badgeOnline" style={{ marginLeft: '0.5rem' }}>OK</span>
            ) : (
              <span className="badge" style={{ marginLeft: '0.5rem', background: 'rgba(192,57,43,0.25)', color: 'var(--danger)' }}>Error</span>
            )}
          </p>
          <pre
            style={{
              background: 'var(--bg-dark)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1rem',
              overflow: 'auto',
              fontSize: '0.9rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {info.result || '(sin respuesta)'}
          </pre>
        </div>
      )}

      {!stats && !info && (
        <div className="card">
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            No se pudo conectar con la API del backend.
          </p>
        </div>
      )}
    </>
  )
}
