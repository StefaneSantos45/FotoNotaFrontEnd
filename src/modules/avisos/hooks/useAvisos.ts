"use client"

import { useState, useEffect } from "react"
import type { Aviso, AvisoFormData } from "../types"
import { avisosService } from "../services/avisosService"

export function useAvisos() {
  const [avisos, setAvisos] = useState<Aviso[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAvisos = async () => {
    try {
      setLoading(true)
      const data = await avisosService.getAvisos()
      setAvisos(data)
      setError(null)
    } catch (err) {
      setError("Erro ao carregar avisos")
    } finally {
      setLoading(false)
    }
  }

  const getAvisoById = async (id: string) => {
    try {
      return await avisosService.getAvisoById(id)
    } catch (err) {
      throw new Error("Erro ao carregar aviso")
    }
  }

  const createAviso = async (data: AvisoFormData) => {
    try {
      const novoAviso = await avisosService.createAviso(data)
      setAvisos((prev) => [novoAviso, ...prev])
      return novoAviso
    } catch (err) {
      throw new Error("Erro ao criar aviso")
    }
  }

  const marcarComoLido = async (id: string) => {
    try {
      await avisosService.marcarComoLido(id)
      setAvisos((prev) => prev.map((a) => (a.id === id ? { ...a, lido: true } : a)))
    } catch (err) {
      throw new Error("Erro ao marcar aviso como lido")
    }
  }

  const deleteAviso = async (id: string) => {
    try {
      await avisosService.deleteAviso(id)
      setAvisos((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      throw new Error("Erro ao excluir aviso")
    }
  }

  useEffect(() => {
    fetchAvisos()
  }, [])

  return {
    avisos,
    loading,
    error,
    fetchAvisos,
    getAvisoById,
    createAviso,
    marcarComoLido,
    deleteAviso,
  }
}
