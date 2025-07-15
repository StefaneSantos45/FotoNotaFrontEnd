export interface Moldura {
  id: number
  nome: string
  categoria: string
  tamanho: string
  preco: number
  promocao: boolean
  precoPromocao?: number
  ativa: boolean
  dataCriacao: string
  preview: string
  downloads: number
  grupoId: number
}

export interface Grupo {
  id: number
  nome: string
  icone: string
  cor: string
  molduras: number
  ativo: boolean
  dataCriacao: string
  descricao?: string
}
