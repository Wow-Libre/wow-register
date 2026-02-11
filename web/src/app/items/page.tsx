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
      <h1 className="font-display mb-1 text-2xl font-bold text-slate-100">Objetos</h1>
      <p className="mb-4 text-slate-400">Catálogo de objetos del mundo (ordenado por item level).</p>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          type="search"
          placeholder="Buscar por nombre..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && setSearch(name)}
          className="input-wow max-w-sm"
        />
        <button type="button" onClick={() => { setSearch(name); setPage(0) }} className="btn-secondary">
          Buscar
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-red-200">{error}</div>
      )}

      {loading && <p className="py-8 text-center text-slate-500">Cargando...</p>}

      {!loading && data && (
        <>
          <div className="overflow-hidden rounded-xl border border-wow-border shadow-wow-card">
            <table className="w-full border-collapse bg-wow-card">
              <thead>
                <tr>
                  <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-left font-display text-xs uppercase tracking-wider text-wow-gold">Entry</th>
                  <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-left font-display text-xs uppercase tracking-wider text-wow-gold">Nombre</th>
                  <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-left font-display text-xs uppercase tracking-wider text-wow-gold">Item level</th>
                  <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-right font-display text-xs uppercase tracking-wider text-wow-gold"></th>
                </tr>
              </thead>
              <tbody>
                {data.content.map((i) => (
                  <tr key={i.entry} className="border-b border-wow-border transition-colors hover:bg-wow-card-hover last:border-0">
                    <td className="px-4 py-3"><code className="text-slate-400">{i.entry}</code></td>
                    <td className="px-4 py-3 font-medium text-slate-200">{i.name || '—'}</td>
                    <td className="px-4 py-3 text-slate-300">{i.itemLevel ?? '—'}</td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/items/${i.entry}`} className="text-wow-gold hover:text-wow-gold-dim">Ver</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.totalPages > 1 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button type="button" disabled={data.first} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-wow-border bg-wow-card px-4 py-2 text-sm text-slate-300 hover:border-wow-gold-dim hover:text-wow-gold disabled:opacity-50">Anterior</button>
              <span className="text-sm text-slate-500">Página {data.number + 1} de {data.totalPages} ({data.totalElements} en total)</span>
              <button type="button" disabled={data.last} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-wow-border bg-wow-card px-4 py-2 text-sm text-slate-300 hover:border-wow-gold-dim hover:text-wow-gold disabled:opacity-50">Siguiente</button>
            </div>
          )}
        </>
      )}
    </>
  )
}
