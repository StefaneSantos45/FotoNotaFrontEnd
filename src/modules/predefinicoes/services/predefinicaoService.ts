import type { PredefinicaoQuiosque, PredefinicaoFormData, Departamento } from "../types"

const mockDepartamentos: Departamento[] = [
  { id: "1", nome: "FotoNotaBR (Brasil)" },
  { id: "2", nome: "Departamento A" },
  { id: "3", nome: "Departamento B" },
]

const mockRegioes = [
  "Australia",
  "Brazil",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Dominican Republic",
  "European Union",
  "Honduras",
  "Hong Kong",
  "Kazakhstan",
  "Korea",
  "Laos",
  "Malaysia",
  "Mexico",
  "Panama",
  "Peru",
  "Romania",
  "Russian Federation",
  "Singapore",
  "Taiwan",
  "Thailand",
  "United Kingdom",
  "United States",
]

const mockIdiomas = [
  "Inglês",
  "catalão",
  "Espanhol",
  "italiano",
  "Francês",
  "Português",
  "coreano",
  "romeno",
  "tailandês",
  "Chinês simplificado",
  "malaio",
  "Laos",
  "Brasileiro",
]

const mockPredefinicoes: PredefinicaoQuiosque[] = []

export const predefinicaoService = {
  async getPredefinicoes(): Promise<PredefinicaoQuiosque[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockPredefinicoes
  },

  async getDepartamentos(): Promise<Departamento[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockDepartamentos
  },

  async createPredefinicao(data: PredefinicaoFormData): Promise<PredefinicaoQuiosque> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const novaPredefinicao: PredefinicaoQuiosque = {
      id: Date.now().toString(),
      ...data,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
    }
    mockPredefinicoes.push(novaPredefinicao)
    return novaPredefinicao
  },

  async updatePredefinicao(id: string, data: Partial<PredefinicaoFormData>): Promise<PredefinicaoQuiosque> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const index = mockPredefinicoes.findIndex((p) => p.id === id)
    if (index !== -1) {
      mockPredefinicoes[index] = {
        ...mockPredefinicoes[index],
        ...data,
        atualizadoEm: new Date().toISOString(),
      }
      return mockPredefinicoes[index]
    }
    throw new Error("Predefinição não encontrada")
  },

  async deletePredefinicao(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockPredefinicoes.findIndex((p) => p.id === id)
    if (index !== -1) {
      mockPredefinicoes.splice(index, 1)
    }
  },
}
