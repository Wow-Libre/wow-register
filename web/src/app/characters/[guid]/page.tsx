import Link from 'next/link'
import { notFound } from 'next/navigation'
import { api } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ guid: string }>
}) {
  const { guid } = await params
  const id = Number(guid)
  if (Number.isNaN(id)) notFound()

  let character
  try {
    character = await api.characters.byGuid(id)
  } catch {
    notFound()
  }

  return (
    <>
      <p style={{ marginBottom: '1rem' }}>
        <Link href="/characters">← Personajes</Link>
      </p>
      <h1>{character.name}</h1>
      <div className="cardGrid" style={{ marginTop: '1rem' }}>
        <div className="card">
          <h3 style={{ marginTop: 0, color: 'var(--gold)' }}>General</h3>
          <p><strong>Nivel</strong> {character.level}</p>
          <p><strong>Clase</strong> {character.classId}</p>
          <p><strong>Raza</strong> {character.race}</p>
          <p><strong>Género</strong> {character.gender}</p>
          <p><strong>XP</strong> {character.xp}</p>
          <p><strong>Oro</strong> {character.gold?.toLocaleString() ?? 0}</p>
          <p>
            <strong>Estado</strong>{' '}
            <span className={`badge ${character.online === 1 ? 'badgeOnline' : 'badgeOffline'}`}>
              {character.online === 1 ? 'En línea' : 'Desconectado'}
            </span>
          </p>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0, color: 'var(--gold)' }}>Combate / Mundo</h3>
          <p><strong>Total kills</strong> {character.totalKills ?? 0}</p>
          <p><strong>Zona</strong> {character.zone ?? '—'}</p>
          <p><strong>Mapa</strong> {character.map ?? '—'}</p>
        </div>
      </div>
    </>
  )
}
