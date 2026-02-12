'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import type { CharacterPublic, PageResponse } from '@/types/api'

const CLASS_NAMES: Record<number, string> = {
  1: 'Guerrero',
  2: 'Paladín',
  3: 'Cazador',
  4: 'Pícaro',
  5: 'Sacerdote',
  6: 'Caballero de la Muerte',
  7: 'Chamán',
  8: 'Mago',
  9: 'Brujo',
  11: 'Druida',
}

const RACE_NAMES: Record<number, string> = {
  1: 'Humano',
  2: 'Orco',
  3: 'Enano',
  4: 'Elfo de la Noche',
  5: 'No muerto',
  6: 'Tauren',
  7: 'Gnomo',
  8: 'Trol',
  10: 'Elfo de Sangre',
  11: 'Draenei',
}

function getClassName(id: number): string {
  return CLASS_NAMES[id] ?? String(id)
}

function getRaceName(id: number): string {
  return RACE_NAMES[id] ?? String(id)
}

const PAGE_SIZES = [10, 20, 50, 100] as const

function Pagination({
  page,
  totalPages,
  totalElements,
  size,
  onPageChange,
  onSizeChange,
}: {
  page: number
  totalPages: number
  totalElements: number
  size: number
  onPageChange: (p: number) => void
  onSizeChange: (s: number) => void
}) {
  const from = totalElements === 0 ? 0 : page * size + 1
  const to = Math.min((page + 1) * size, totalElements)

  const pageNumbers: (number | 'ellipsis')[] = []
  if (totalPages <= 7) {
    for (let i = 0; i < totalPages; i++) pageNumbers.push(i)
  } else {
    pageNumbers.push(0)
    const start = Math.max(1, page - 1)
    const end = Math.min(totalPages - 2, page + 1)
    if (start > 1) pageNumbers.push('ellipsis')
    for (let i = start; i <= end; i++) pageNumbers.push(i)
    if (end < totalPages - 2) pageNumbers.push('ellipsis')
    if (totalPages > 1) pageNumbers.push(totalPages - 1)
  }

  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <p className="text-sm text-slate-500">
          Mostrando <span className="font-medium text-slate-300">{from}</span>
          {' – '}
          <span className="font-medium text-slate-300">{to}</span>
          {' de '}
          <span className="font-medium text-slate-300">{totalElements.toLocaleString()}</span>
          {' personajes del servidor'}
        </p>
        <label className="flex items-center gap-2 text-sm text-slate-500">
          Por página
          <select
            value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            className="rounded-lg border border-wow-border bg-wow-card px-2 py-1.5 text-slate-200 focus:border-wow-gold-dim focus:outline-none focus:ring-1 focus:ring-wow-gold/30"
          >
            {PAGE_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <nav className="flex items-center gap-1" aria-label="Paginación">
        <button
          type="button"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-wow-border bg-wow-card px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-wow-gold-dim hover:bg-wow-card-hover hover:text-wow-gold disabled:cursor-not-allowed disabled:opacity-50"
        >
          Anterior
        </button>
        <div className="mx-2 flex items-center gap-1">
          {pageNumbers.map((n, i) =>
            n === 'ellipsis' ? (
              <span key={`e-${i}`} className="px-2 text-slate-500">
                …
              </span>
            ) : (
              <button
                key={n}
                type="button"
                onClick={() => onPageChange(n)}
                className={`min-w-[2.25rem] rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  n === page
                    ? 'border-wow-gold-dim bg-wow-gold/20 text-wow-gold'
                    : 'border-wow-border bg-wow-card text-slate-300 hover:border-wow-gold-dim hover:text-wow-gold'
                }`}
              >
                {n + 1}
              </button>
            )
          )}
        </div>
        <button
          type="button"
          disabled={page >= totalPages - 1}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-wow-border bg-wow-card px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-wow-gold-dim hover:bg-wow-card-hover hover:text-wow-gold disabled:cursor-not-allowed disabled:opacity-50"
        >
          Siguiente
        </button>
      </nav>
    </div>
  )
}

export default function CharactersPage() {
  const [data, setData] = useState<PageResponse<CharacterPublic> | null>(null)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(20)
  const [name, setName] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    api.characters
      .list(page, size, search || undefined)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [page, size, search])

  const handleSizeChange = (newSize: number) => {
    setSize(newSize)
    setPage(0)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display mb-1 text-2xl font-bold text-slate-100">Personajes del servidor</h1>
      <p className="mb-6 text-slate-400">
        Jugadores y personajes del servidor (ordenados por nivel).
      </p>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <input
          type="search"
          placeholder="Buscar por nombre..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (setSearch(name), setPage(0))}
          className="input-wow max-w-sm"
        />
        <button
          type="button"
          onClick={() => {
            setSearch(name)
            setPage(0)
          }}
          className="btn-secondary"
        >
          Buscar
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-200">
          {error}
        </div>
      )}

      {loading && (
        <div className="rounded-2xl border border-wow-border bg-wow-card/80 py-16 text-center text-slate-500">
          Cargando…
        </div>
      )}

      {!loading && data && (
        <>
          <div className="overflow-hidden rounded-2xl border border-wow-border bg-wow-card/80 shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wider text-wow-gold">
                      Nombre
                    </th>
                    <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wider text-wow-gold">
                      Nivel
                    </th>
                    <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wider text-wow-gold">
                      Clase
                    </th>
                    <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wider text-wow-gold">
                      Raza
                    </th>
                    <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wider text-wow-gold">
                      Oro
                    </th>
                    <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wider text-wow-gold">
                      Kills
                    </th>
                    <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wider text-wow-gold">
                      Estado
                    </th>
                    <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-right font-display text-xs font-semibold uppercase tracking-wider text-wow-gold">
                      {' '}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.content.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                        No hay personajes que coincidan.
                      </td>
                    </tr>
                  ) : (
                    data.content.map((c) => (
                      <tr
                        key={c.guid}
                        className="border-b border-wow-border/80 transition-colors hover:bg-wow-card-hover/50 last:border-0"
                      >
                        <td className="px-4 py-3 font-medium text-slate-200">{c.name}</td>
                        <td className="px-4 py-3 text-slate-300">{c.level}</td>
                        <td className="px-4 py-3 text-slate-300">{getClassName(c.classId)}</td>
                        <td className="px-4 py-3 text-slate-300">{getRaceName(c.race)}</td>
                        <td className="px-4 py-3 text-slate-300">
                          {typeof c.gold === 'number' ? c.gold.toLocaleString() : '0'}
                        </td>
                        <td className="px-4 py-3 text-slate-300">
                          {c.totalKills?.toLocaleString() ?? '0'}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={
                              c.online === 1 ? 'badge-online' : 'badge-offline'
                            }
                          >
                            {c.online === 1 ? 'En línea' : 'Desconectado'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Link
                            href={`/characters/${c.guid}`}
                            className="text-sm font-medium text-wow-gold transition-colors hover:text-wow-gold-light"
                          >
                            Ver
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {data.totalElements > 0 && (
            <Pagination
              page={data.number}
              totalPages={data.totalPages}
              totalElements={data.totalElements}
              size={data.size}
              onPageChange={setPage}
              onSizeChange={handleSizeChange}
            />
          )}
        </>
      )}
    </div>
  )
}
