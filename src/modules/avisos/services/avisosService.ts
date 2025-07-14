import type { Aviso, AvisoFormData } from "../types"

const mockAvisos: Aviso[] = [
  {
    id: "1",
    quiosque: "10200",
    quiosqueNome: "10200 (Loja Recife)",
    sessao: undefined,
    tipo: "quiosque offline",
    nivel: 90,
    mensagem: undefined,
    criado: "2024-11-11 11:15:01",
    lido: false,
  },
  {
    id: "2",
    quiosque: "10200",
    quiosqueNome: "10200 (Loja Recife)",
    sessao: undefined,
    tipo: "quiosque offline",
    nivel: 90,
    mensagem: undefined,
    criado: "2024-11-08 17:35:01",
    lido: false,
  },
  {
    id: "3",
    quiosque: "10200",
    quiosqueNome: "10200 (Loja Recife)",
    sessao: undefined,
    tipo: "quiosque offline",
    nivel: 90,
    mensagem: undefined,
    criado: "2024-11-06 17:35:01",
    lido: false,
  },
  {
    id: "4",
    quiosque: "10200",
    quiosqueNome: "10200 (Loja Recife)",
    sessao: "sessao - 8276543",
    tipo: "printTimeError",
    nivel: 100,
    mensagem: "Erro de tempo de impressão detectado",
    criado: "2024-11-04 18:10:51",
    lido: false,
  },
  {
    id: "5",
    quiosque: "10200",
    quiosqueNome: "10200 (Loja Recife)",
    sessao: undefined,
    tipo: "quiosqueFreeze",
    nivel: 30,
    mensagem: "Quiosque travado detectado",
    criado: "2024-11-04 18:10:50",
    lido: false,
  },
  {
    id: "6",
    quiosque: "10200",
    quiosqueNome: "10200 (Loja Recife)",
    sessao: undefined,
    tipo: "quiosque offline",
    nivel: 90,
    mensagem: undefined,
    criado: "2024-11-04 12:20:02",
    lido: false,
  },
  {
    id: "7",
    quiosque: "10200",
    quiosqueNome: "10200 (Loja Recife)",
    sessao: undefined,
    tipo: "quiosque offline",
    nivel: 90,
    mensagem: undefined,
    criado: "2024-11-01 18:55:02",
    lido: false,
  },
  {
    id: "8",
    quiosque: "10200",
    quiosqueNome: "10200 (Loja Recife)",
    sessao: undefined,
    tipo: "quiosque offline",
    nivel: 90,
    mensagem: undefined,
    criado: "2024-09-20 15:20:01",
    lido: false,
  },
]

export const avisosService = {
  async getAvisos(): Promise<Aviso[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockAvisos
  },

  async getAvisoById(id: string): Promise<Aviso | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockAvisos.find((aviso) => aviso.id === id) || null
  },

  async createAviso(data: AvisoFormData): Promise<Aviso> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const novoAviso: Aviso = {
      id: Date.now().toString(),
      ...data,
      quiosqueNome: `${data.quiosque} (Loja Recife)`,
      criado: new Date().toISOString().replace("T", " ").substring(0, 19),
      lido: false,
    }
    mockAvisos.unshift(novoAviso)
    return novoAviso
  },

  async marcarComoLido(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const aviso = mockAvisos.find((a) => a.id === id)
    if (aviso) {
      aviso.lido = true
    }
  },

  async deleteAviso(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockAvisos.findIndex((a) => a.id === id)
    if (index !== -1) {
      mockAvisos.splice(index, 1)
    }
  },
}
