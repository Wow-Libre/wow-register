'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import type { GuildPublic, PageResponse } from '@/types/api'

export default function GuildsPage() {
  const [data, setData] = useState<PageResponse<GuildPublic> | null>(null)
  const [page, setPage] = useState(0)
  const [name, setName] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const size = 20

  useEffect(() => {
    setLoading(true)
    setError(null)
    api.guilds
      .list(page, size, search || undefined)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [page, search])

  return (
    <>
      <h1>Hermandades</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Hermandades del reino.
      </p>

      <div className="searchBar">
        <input
          type="search"
          placeholder="Buscar por nombre..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && setSearch(name)}
        />
        <button
          type="button"
          onClick={() => { setSearch(name); setPage(0) }}
          style={{ marginLeft: '0.5rem', padding: '0.6rem 1rem' }}
        >
          Buscar
        </button>
      </div>

      {error && (
        <div className="errorBox" style={{ marginBottom: '1rem' }}>{error}</div>
      )}

      {loading && <div className="loading">Cargando...</div>}

      {!loading && data && (
        <>
          <div className="tableWrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Líder</th>
                  <th>Miembros</th>
                  <th>Banco</th>
                  <th>Acceso</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.content.map((g) => (
                  <tr key={g.id}>
                    <td><strong>{g.name}</strong></td>
                    <td>{g.leaderName}</td>
                    <td>{g.memberCount}</td>
                    <td>{g.bankMoneyFormatted || '—'}</td>
                    <td>{g.publicAccess ? 'Público' : 'Privado'}</td>
                    <td><Link href={`/guilds/${g.id}`}>Ver</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.totalPages > 1 && (
            <div className="pagination">
              <button
                type="button"
                disabled={data.first}
                onClick={() => setPage((p) => p - 1)}
              >
                Anterior
              </button>
              <span>
                Página {data.number + 1} de {data.totalPages} ({data.totalElements} en total)
              </span>
              <button
                type="button"
                disabled={data.last}
                onClick={() => setPage((p) => p + 1)}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}
