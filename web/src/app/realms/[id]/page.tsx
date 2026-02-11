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
      <p className="mb-4">
        <Link href="/realms" className="text-wow-gold hover:text-wow-gold-dim">← Reinos</Link>
      </p>
      <h1 className="font-display mb-6 text-2xl font-bold text-slate-100">{realm.name}</h1>
      <div className="card-wow max-w-md">
        <ul className="space-y-2 text-slate-300">
          <li><strong className="text-slate-200">Nombre</strong> {realm.name}</li>
          <li><strong className="text-slate-200">Dirección</strong> <code className="rounded bg-wow-dark px-1.5 py-0.5 text-slate-400">{realm.address}</code></li>
        </ul>
      </div>
    </>
  )
}
