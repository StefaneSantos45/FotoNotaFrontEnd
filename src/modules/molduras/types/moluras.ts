export interface MolduraCompleta {
  id: number
  descricao: string
  grupoId: number
  grupoNome: string
  backgroundColor: string
  foregroundImage?: string
  posicaoX: number
  posicaoY: number
  tamanhoImagem: number
  rotacaoImagem: number
  ativa: boolean
  dataCriacao: string
  dataAtualizacao: string
}

export interface MolduraFilters {
  grupoId: string
  ativa: string
  descricao: string
}

export interface NovamolduraForm {
  descricao: string
  grupoId: number
  backgroundFile?: File
  foregroundFile?: File
  backgroundColor: string
  posicaoX: number
  posicaoY: number
  tamanhoImagem: number
  rotacaoImagem: number
}
