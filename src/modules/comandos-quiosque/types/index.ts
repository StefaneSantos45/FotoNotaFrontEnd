export interface Comando {
  id: number
  comandoId: string
  quiosque: string
  nomeQuiosque: string
  tipo: string
  status: "pendente" | "executando" | "feito" | "erro"
  criadoEm: string
  usuario: string | null
  descricao: string
  duracao: string | null
  resultado: string | null
}

export interface ComandoFilters {
  status: string
  tipo: string
  quiosque: string
  usuario: string
}

export interface ComandoStats {
  total: number
  pendentes: number
  executando: number
  feitos: number
  comErro: number
}
