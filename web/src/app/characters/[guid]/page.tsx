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
      <p className="mb-4">
        <Link href="/characters" className="text-wow-gold hover:text-wow-gold-dim">← Personajes</Link>
      </p>
      <h1 className="font-display mb-2 text-2xl font-bold text-slate-100">{character.name}</h1>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="card-wow">
          <h3 className="font-display mb-3 text-lg text-wow-gold">General</h3>
          <ul className="space-y-2 text-slate-300">
            <li><strong className="text-slate-200">Nivel</strong> {character.level}</li>
            <li><strong className="text-slate-200">Clase</strong> {character.classId}</li>
            <li><strong className="text-slate-200">Raza</strong> {character.race}</li>
            <li><strong className="text-slate-200">Género</strong> {character.gender}</li>
            <li><strong className="text-slate-200">XP</strong> {character.xp}</li>
            <li><strong className="text-slate-200">Oro</strong> {character.gold?.toLocaleString() ?? 0}</li>
            <li>
              <strong className="text-slate-200">Estado</strong>{' '}
              <span className={character.online === 1 ? 'badge-online' : 'badge-offline'}>
                {character.online === 1 ? 'En línea' : 'Desconectado'}
              </span>
            </li>
          </ul>
        </div>
        <div className="card-wow">
          <h3 className="font-display mb-3 text-lg text-wow-gold">Combate / Mundo</h3>
          <ul className="space-y-2 text-slate-300">
            <li><strong className="text-slate-200">Total kills</strong> {character.totalKills ?? 0}</li>
            <li><strong className="text-slate-200">Zona</strong> {character.zone ?? '—'}</li>
            <li><strong className="text-slate-200">Mapa</strong> {character.map ?? '—'}</li>
          </ul>
        </div>
      </div>
    </>
  )
}
