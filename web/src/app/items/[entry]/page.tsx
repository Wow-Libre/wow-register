import Link from 'next/link'
import { notFound } from 'next/navigation'
import { api } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ entry: string }>
}) {
  const { entry } = await params
  const numEntry = Number(entry)
  if (Number.isNaN(numEntry)) notFound()

  let item
  try {
    item = await api.items.byEntry(numEntry)
  } catch {
    notFound()
  }

  return (
    <>
      <p className="mb-4">
        <Link href="/items" className="text-wow-gold hover:text-wow-gold-dim">← Objetos</Link>
      </p>
      <h1 className="font-display mb-6 text-2xl font-bold text-slate-100">
        {item.name || `Objeto #${item.entry}`}
      </h1>
      <div className="card-wow max-w-md">
        <ul className="space-y-2 text-slate-300">
          <li><strong className="text-slate-200">Entry</strong> {item.entry}</li>
          <li><strong className="text-slate-200">Nombre</strong> {item.name || '—'}</li>
          <li><strong className="text-slate-200">Item level</strong> {item.itemLevel ?? '—'}</li>
        </ul>
      </div>
    </>
  )
}
