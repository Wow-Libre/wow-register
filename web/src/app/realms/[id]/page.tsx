import Link from 'next/link'
import { notFound } from 'next/navigation'
import { api } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function RealmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const numId = Number(id)
  if (Number.isNaN(numId)) notFound()

  let realm
  try {
    realm = await api.realms.byId(numId)
  } catch {
    notFound()
  }

  return (
    <>
      <p style={{ marginBottom: '1rem' }}>
        <Link href="/realms">← Reinos</Link>
      </p>
      <h1>{realm.name}</h1>
      <div className="card" style={{ marginTop: '1rem', maxWidth: '400px' }}>
        <p><strong>Nombre</strong> {realm.name}</p>
        <p><strong>Dirección</strong> <code>{realm.address}</code></p>
      </div>
    </>
  )
}
