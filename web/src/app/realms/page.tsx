import Link from 'next/link'
import { api } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function RealmsPage() {
  let realms: Awaited<ReturnType<typeof api.realms.list>> = []
  try {
    realms = await api.realms.list()
  } catch {
    // fallback
  }

  return (
    <>
      <h1>Reinos</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Reinos configurados en el emulador (un reino en esta instalación).
      </p>

      {realms.length === 0 ? (
        <div className="card">
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            No hay reinos o no se pudo cargar la lista.
          </p>
        </div>
      ) : (
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {realms.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.name}</strong></td>
                  <td><code style={{ fontSize: '0.9rem' }}>{r.address}</code></td>
                  <td><Link href={`/realms/${r.id}`}>Ver</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
