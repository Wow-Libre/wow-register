import Link from 'next/link'
import { notFound } from 'next/navigation'
import { api } from '@/lib/api'
import type { CharacterPublic } from '@/types/api'

export const dynamic = 'force-dynamic'

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
  return CLASS_NAMES[id] ?? `Clase ${id}`
}

function getRaceName(id: number): string {
  return RACE_NAMES[id] ?? `Raza ${id}`
}

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-wow-border/50 last:border-0">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-200">{value}</span>
    </div>
  )
}

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ guid: string }>
}) {
  const { guid } = await params
  const id = Number(guid)
  if (Number.isNaN(id)) notFound()

  let character: CharacterPublic
  try {
    character = await api.characters.byGuid(id)
  } catch {
    notFound()
  }

  const isOnline = character.online === 1

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-6">
        <Link
          href="/characters"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-wow-gold"
        >
          <span aria-hidden>←</span>
          ← Personajes del servidor
        </Link>
      </nav>

      <header className="mb-8 rounded-2xl border border-wow-border bg-wow-card/90 px-6 py-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-wide text-white sm:text-4xl">
              {character.name}
            </h1>
            <p className="mt-2 text-slate-400">
              {getRaceName(character.race)} · {getClassName(character.classId)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-lg border border-wow-border bg-wow-dark/80 px-4 py-2 font-display text-xl font-semibold text-wow-gold">
              Nivel {character.level}
            </span>
            <span
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                isOnline
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-slate-500/20 text-slate-400'
              }`}
            >
              {isOnline ? 'En línea' : 'Desconectado'}
            </span>
          </div>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        <section className="rounded-2xl border border-wow-border bg-wow-card/80 overflow-hidden">
          <div className="border-b border-wow-border bg-wow-dark/50 px-5 py-4">
            <h2 className="font-display text-lg font-semibold text-wow-gold">General</h2>
          </div>
          <div className="px-5 py-2">
            <StatRow label="Clase" value={getClassName(character.classId)} />
            <StatRow label="Raza" value={getRaceName(character.race)} />
            <StatRow label="Género" value={character.gender === 0 ? 'Masculino' : 'Femenino'} />
            <StatRow label="Experiencia" value={character.xp?.toLocaleString() ?? '0'} />
            <StatRow
              label="Oro"
              value={
                typeof character.gold === 'number'
                  ? character.gold.toLocaleString()
                  : '0'
              }
            />
          </div>
        </section>

        <section className="rounded-2xl border border-wow-border bg-wow-card/80 overflow-hidden">
          <div className="border-b border-wow-border bg-wow-dark/50 px-5 py-4">
            <h2 className="font-display text-lg font-semibold text-wow-gold">Combate y mundo</h2>
          </div>
          <div className="px-5 py-2">
            <StatRow label="Bajas totales" value={character.totalKills?.toLocaleString() ?? '0'} />
            <StatRow label="Zona" value={character.zone ?? '—'} />
            <StatRow label="Mapa" value={character.map ?? '—'} />
          </div>
        </section>
      </div>
    </div>
  )
}
