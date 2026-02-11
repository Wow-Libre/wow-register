import Link from 'next/link'
import { api } from '@/lib/api'

export const dynamic = 'force-dynamic'

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
    <>
      <h1 style={{ marginBottom: '0.5rem' }}>WoW Register</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Estadísticas y datos públicos del reino.
      </p>

      {realm && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.1rem', color: 'var(--gold)' }}>Reino actual</h2>
          <p style={{ margin: 0 }}><strong>{realm.name}</strong> — {realm.address}</p>
        </div>
      )}

      {stats && (
        <div className="statsRow">
          <Link href="/characters" className="statBox card" style={{ textDecoration: 'none' }}>
            <div className="value">{stats.totalCharacters.toLocaleString()}</div>
            <div className="label">Personajes</div>
          </Link>
          <Link href="/characters" className="statBox card" style={{ textDecoration: 'none' }}>
            <div className="value">{stats.onlineCharacters}</div>
            <div className="label">Conectados ahora</div>
          </Link>
          <Link href="/guilds" className="statBox card" style={{ textDecoration: 'none' }}>
            <div className="value">{stats.totalGuilds}</div>
            <div className="label">Hermandades</div>
          </Link>
          <div className="statBox">
            <div className="value">{stats.totalAccounts.toLocaleString()}</div>
            <div className="label">Cuentas</div>
          </div>
          <Link href="/items" className="statBox card" style={{ textDecoration: 'none' }}>
            <div className="value">{stats.totalItems.toLocaleString()}</div>
            <div className="label">Objetos</div>
          </Link>
        </div>
      )}

      {!stats && !realm && (
        <div className="card">
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            No se pudo conectar con la API. Asegúrate de que el backend esté en marcha en el puerto 8080.
          </p>
        </div>
      )}

      <div className="cardGrid" style={{ marginTop: '2rem' }}>
        <Link href="/realms" className="card">
          <h3 style={{ marginTop: 0, color: 'var(--gold)' }}>Reinos</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Listado de reinos configurados.
          </p>
        </Link>
        <Link href="/characters" className="card">
          <h3 style={{ marginTop: 0, color: 'var(--gold)' }}>Personajes</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Buscar personajes por nombre y nivel.
          </p>
        </Link>
        <Link href="/guilds" className="card">
          <h3 style={{ marginTop: 0, color: 'var(--gold)' }}>Hermandades</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Hermandades del reino.
          </p>
        </Link>
        <Link href="/items" className="card">
          <h3 style={{ marginTop: 0, color: 'var(--gold)' }}>Objetos</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Catálogo de objetos (item level).
          </p>
        </Link>
        <Link href="/server" className="card">
          <h3 style={{ marginTop: 0, color: 'var(--gold)' }}>Servidor</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Estado e información del emulador vía SOAP.
          </p>
        </Link>
      </div>
    </>
  )
}
