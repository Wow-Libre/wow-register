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
      <h1 className="font-display mb-1 text-2xl font-bold text-slate-100">Conectar al servidor</h1>
      <p className="mb-6 text-slate-400">
        Dirección para conectar tu cliente de WoW al servidor privado.
      </p>

      {realms.length === 0 ? (
        <div className="card-wow">
          <p className="m-0 text-slate-400">No hay reinos disponibles o no se pudo cargar la lista.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-wow-border shadow-wow-card">
          <table className="w-full border-collapse bg-wow-card">
            <thead>
              <tr>
                <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-left font-display text-xs uppercase tracking-wider text-wow-gold">
                  Nombre
                </th>
                <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-left font-display text-xs uppercase tracking-wider text-wow-gold">
                  Dirección
                </th>
                <th className="border-b border-wow-border bg-wow-dark/80 px-4 py-3 text-right font-display text-xs uppercase tracking-wider text-wow-gold">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {realms.map((r) => (
                <tr key={r.id} className="border-b border-wow-border transition-colors hover:bg-wow-card-hover last:border-0">
                  <td className="px-4 py-3 font-medium text-slate-200">{r.name}</td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-wow-dark px-1.5 py-0.5 text-sm text-slate-400">{r.address}</code>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/realms/${r.id}`} className="text-wow-gold hover:text-wow-gold-dim">Ver</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
