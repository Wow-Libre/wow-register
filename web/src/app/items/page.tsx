'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import type { ItemTemplatePublic, PageResponse } from '@/types/api'

export default function ItemsPage() {
  const [data, setData] = useState<PageResponse<ItemTemplatePublic> | null>(null)
  const [page, setPage] = useState(0)
  const [name, setName] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const size = 20

  useEffect(() => {
    setLoading(true)
    setError(null)
    api.items
      .list(page, size, search || undefined)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [page, search])

  return (
    <>
      <h1>Objetos</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Catálogo de objetos del mundo (ordenado por item level).
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
                  <th>Entry</th>
                  <th>Nombre</th>
                  <th>Item level</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.content.map((i) => (
                  <tr key={i.entry}>
                    <td><code>{i.entry}</code></td>
                    <td><strong>{i.name || '—'}</strong></td>
                    <td>{i.itemLevel ?? '—'}</td>
                    <td><Link href={`/items/${i.entry}`}>Ver</Link></td>
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
