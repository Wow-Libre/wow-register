import type {
  RealmPublic,
  CharacterPublic,
  GuildPublic,
  ServerStats,
  SoapCommandResult,
  PageResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/types/api'

const BASE = '/api'

async function get<T>(path: string, params?: Record<string, string | number>): Promise<T> {
  const url = new URL(path, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))
  }
  const res = await fetch(url.toString(), { credentials: 'include', cache: 'no-store' })
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText))
  return res.json() as Promise<T>
}

async function post<T>(path: string, body: object): Promise<T> {
  const url = new URL(path, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = (data as { message?: string }).message ?? res.statusText
    throw new Error(msg)
  }
  return data as T
}

export const api = {
  realms: {
    list: () => get<RealmPublic[]>(`${BASE}/realms`),
    first: () => get<RealmPublic>(`${BASE}/realms/first`),
    byId: (id: number) => get<RealmPublic>(`${BASE}/realms/${id}`),
  },
  characters: {
    list: (page = 0, size = 20, name?: string) =>
      get<PageResponse<CharacterPublic>>(
        `${BASE}/characters`,
        { page: String(page), size: String(size), ...(name ? { name } : {}) }
      ),
    count: () => get<number>(`${BASE}/characters/count`),
    online: () => get<number>(`${BASE}/characters/online`),
    byGuid: (guid: number) => get<CharacterPublic>(`${BASE}/characters/${guid}`),
  },
  guilds: {
    list: (page = 0, size = 20, name?: string) =>
      get<PageResponse<GuildPublic>>(
        `${BASE}/guilds`,
        { page: String(page), size: String(size), ...(name ? { name } : {}) }
      ),
    count: () => get<number>(`${BASE}/guilds/count`),
    byId: (id: number) => get<GuildPublic>(`${BASE}/guilds/${id}`),
  },
  server: {
    stats: () => get<ServerStats>(`${BASE}/server/stats`),
    info: () => get<SoapCommandResult>(`${BASE}/server/info`),
  },
  register: (body: RegisterRequest) =>
    post<RegisterResponse>(`${BASE}/register`, body),
}
