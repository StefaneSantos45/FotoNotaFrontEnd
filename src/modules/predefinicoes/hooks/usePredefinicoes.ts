"use client"

import { useState, useEffect } from "react"
import type { PredefinicaoQuiosque, PredefinicaoFormData, Departamento } from "../types"
import { predefinicaoService } from "../services/predefinicaoService"

export function usePredefinicoes() {
  const [predefinicoes, setPredefinicoes] = useState<PredefinicaoQuiosque[]>([])
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPredefinicoes = async () => {
    try {
      setLoading(true)
      const [predefinicaoData, departamentoData] = await Promise.all([
        predefinicaoService.getPredefinicoes(),
        predefinicaoService.getDepartamentos(),
      ])
      setPredefinicoes(predefinicaoData)
      setDepartamentos(departamentoData)
      setError(null)
    } catch (err) {
      setError("Erro ao carregar predefinições")
    } finally {
      setLoading(false)
    }
  }

  const createPredefinicao = async (data: PredefinicaoFormData) => {
    try {
      const novaPredefinicao = await predefinicaoService.createPredefinicao(data)
      setPredefinicoes((prev) => [...prev, novaPredefinicao])
      return novaPredefinicao
    } catch (err) {
      throw new Error("Erro ao criar predefinição")
    }
  }

  const updatePredefinicao = async (id: string, data: Partial<PredefinicaoFormData>) => {
    try {
      const predefinicaoAtualizada = await predefinicaoService.updatePredefinicao(id, data)
      setPredefinicoes((prev) => prev.map((p) => (p.id === id ? predefinicaoAtualizada : p)))
      return predefinicaoAtualizada
    } catch (err) {
      throw new Error("Erro ao atualizar predefinição")
    }
  }

  const deletePredefinicao = async (id: string) => {
    try {
      await predefinicaoService.deletePredefinicao(id)
      setPredefinicoes((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      throw new Error("Erro ao excluir predefinição")
    }
  }

  useEffect(() => {
    fetchPredefinicoes()
  }, [])

  return {
    predefinicoes,
    departamentos,
    loading,
    error,
    fetchPredefinicoes,
    createPredefinicao,
    updatePredefinicao,
    deletePredefinicao,
  }
}
