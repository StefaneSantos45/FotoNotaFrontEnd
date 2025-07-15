export interface NotaBanco {
  id: string
  numero: number
  nome: string
  valor: number
}

export interface Moeda {
  id: string
  numero: number
  nome: string
  valor: number
}

export interface Regiao {
  id: number
  codigo: string
  nome: string
  nomeMoeda: string
  codigoMoeda: string
  moedaStr: string
  taxaCambio: number
  aceitandoNotas: NotaBanco[]
  aceitandoMoedas: Moeda[] // Alterar de any[] para Moeda[]
  ativo: boolean
  criadoEm: Date
  atualizadoEm: Date
}

export interface CreateRegiaoData {
  codigo: string
  nome: string
  nomeMoeda: string
  codigoMoeda: string
  moedaStr: string
  taxaCambio: number
}
