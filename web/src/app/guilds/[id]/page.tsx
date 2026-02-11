import Link from 'next/link'
import { notFound } from 'next/navigation'
import { api } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function GuildDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const numId = Number(id)
  if (Number.isNaN(numId)) notFound()

  let guild
  try {
    guild = await api.guilds.byId(numId)
  } catch {
    notFound()
  }

  const created = guild.createDate
    ? new Date(guild.createDate * 1000).toLocaleDateString('es')
    : '—'

  return (
    <>
      <p className="mb-4">
        <Link href="/guilds" className="text-wow-gold hover:text-wow-gold-dim">← Hermandades</Link>
      </p>
      <h1 className="font-display mb-1 text-2xl font-bold text-slate-100">{guild.name}</h1>
      <p className="mb-6 text-slate-400">
        Líder: <strong className="text-slate-300">{guild.leaderName}</strong> · {guild.memberCount} miembros
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="card-wow">
          <h3 className="font-display mb-3 text-lg text-wow-gold">Información</h3>
          <p className="mb-1 text-slate-400"><strong className="text-slate-300">Mensaje del día</strong></p>
          <p className="mb-4 text-slate-300">{guild.motd || '—'}</p>
          <p className="mb-1 text-slate-400"><strong className="text-slate-300">Descripción</strong></p>
          <p className="mb-4 text-slate-300">{guild.info || '—'}</p>
          <p className="text-slate-300"><strong className="text-slate-200">Fecha de creación</strong> {created}</p>
          <p className="text-slate-300"><strong className="text-slate-200">Acceso</strong> {guild.publicAccess ? 'Público' : 'Privado'}</p>
        </div>
        <div className="card-wow">
          <h3 className="font-display mb-3 text-lg text-wow-gold">Recursos</h3>
          <p className="text-slate-300"><strong className="text-slate-200">Banco</strong> {guild.bankMoneyFormatted || '—'}</p>
          {guild.discord && (
            <p className="mt-2 text-slate-300"><strong className="text-slate-200">Discord</strong> {guild.discord}</p>
          )}
        </div>
      </div>
    </>
  )
}
