"use client"

import { useState, useEffect } from "react"
import type { Quiosque } from "../types"
import { quiosquesService } from "../services/quiosquesService"

export function useQuiosques() {
  const [quiosques, setQuiosques] = useState<Quiosque[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQuiosques = async () => {
    try {
      setLoading(true)
      const data = await quiosquesService.getQuiosques()
      setQuiosques(data)
      setError(null)
    } catch (err) {
      setError("Erro ao carregar quiosques")
    } finally {
      setLoading(false)
    }
  }

  const getQuiosqueById = async (id: string) => {
    try {
      return await quiosquesService.getQuiosqueById(id)
    } catch (err) {
      setError("Erro ao carregar detalhes do quiosque")
      return null
    }
  }

  useEffect(() => {
    fetchQuiosques()
  }, [])

  return {
    quiosques,
    loading,
    error,
    fetchQuiosques,
    getQuiosqueById,
  }
}
