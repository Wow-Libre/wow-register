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
      <p style={{ marginBottom: '1rem' }}>
        <Link href="/items">← Objetos</Link>
      </p>
      <h1>{item.name || `Objeto #${item.entry}`}</h1>
      <div className="card" style={{ marginTop: '1rem', maxWidth: '400px' }}>
        <p><strong>Entry</strong> {item.entry}</p>
        <p><strong>Nombre</strong> {item.name || '—'}</p>
        <p><strong>Item level</strong> {item.itemLevel ?? '—'}</p>
      </div>
    </>
  )
}
