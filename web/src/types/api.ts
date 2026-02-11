export interface RealmPublic {
  id: number
  name: string
  address: string
}

export interface CharacterPublic {
  guid: number
  name: string
  race: number
  classId: number
  gender: number
  level: number
  xp: number
  gold: number
  online: number
  totalKills: number
  zone: number
  map: number
}

export interface GuildPublic {
  id: number
  name: string
  leaderName: string
  emblemStyle: number
  emblemColor: number
  borderStyle: number
  borderColor: number
  info: string
  motd: string
  createDate: number
  bankMoneyFormatted: string
  memberCount: number
  publicAccess: boolean
  discord: string
}

export interface ItemTemplatePublic {
  entry: number
  name: string
  itemLevel: number
}

export interface ServerStats {
  totalAccounts: number
  totalCharacters: number
  onlineCharacters: number
  totalGuilds: number
  totalItems: number
}

export interface SoapCommandResult {
  command: string
  result: string
  success: boolean
}

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}

export interface RegisterRequest {
  username: string
  password: string
  email?: string
}

export interface RegisterResponse {
  success: boolean
  message: string
  username: string
}
