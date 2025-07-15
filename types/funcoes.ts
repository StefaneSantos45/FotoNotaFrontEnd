export interface Funcao {
  id: number
  euIa: number
  nome: string
  lesma: string
  permissoes: Permissao[]
  usuarios: number
}

export interface Permissao {
  id: string
  nome: string
  ativo: boolean
  categoria?: string
}

export interface Usuario {
  id: number
  nome: string
  email: string
  ativo: boolean
}

export interface Quiosque {
  id: string
  nome: string
  localizacao: string
  status: "online" | "offline"
  impressoesHoje: number
  impressoesOntem: number
  sessoesHoje: number
  sessoesOntem: number
  ultimaAtividade: string
}
