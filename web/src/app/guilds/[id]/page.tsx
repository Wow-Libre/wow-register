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
      <p style={{ marginBottom: '1rem' }}>
        <Link href="/guilds">← Hermandades</Link>
      </p>
      <h1>{guild.name}</h1>
      <p style={{ color: 'var(--text-muted)' }}>
        Líder: <strong>{guild.leaderName}</strong> · {guild.memberCount} miembros
      </p>

      <div className="cardGrid" style={{ marginTop: '1rem' }}>
        <div className="card">
          <h3 style={{ marginTop: 0, color: 'var(--gold)' }}>Información</h3>
          <p><strong>Mensaje del día</strong></p>
          <p style={{ marginTop: '0.25rem' }}>{guild.motd || '—'}</p>
          <p><strong>Descripción</strong></p>
          <p style={{ marginTop: '0.25rem' }}>{guild.info || '—'}</p>
          <p><strong>Fecha de creación</strong> {created}</p>
          <p><strong>Acceso</strong> {guild.publicAccess ? 'Público' : 'Privado'}</p>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0, color: 'var(--gold)' }}>Recursos</h3>
          <p><strong>Banco</strong> {guild.bankMoneyFormatted || '—'}</p>
          {guild.discord && (
            <p><strong>Discord</strong> {guild.discord}</p>
          )}
        </div>
      </div>
    </>
  )
}
