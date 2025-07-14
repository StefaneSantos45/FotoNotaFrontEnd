export interface Aviso {
  id: string
  quiosque: string
  quiosqueNome: string
  sessao?: string
  tipo: string
  nivel: number
  mensagem?: string
  criado: string
  lido: boolean
}

export interface AvisoFormData {
  quiosque: string
  sessao?: string
  tipo: string
  nivel: number
  mensagem?: string
}

export interface FiltrosAviso {
  quiosque?: string
  tipo?: string
  nivel?: number
  dataInicio?: string
  dataFim?: string
}
