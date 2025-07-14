"use client"

import { useState, useEffect } from "react"
import type { Comando } from "../types"
import { getComandos, refreshComandos } from "../services/comandos.service"

export const useComandos = () => {
  const [comandos, setComandos] = useState<Comando[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadComandos = async () => {
    try {
      setLoading(true)
      const data = await getComandos()
      setComandos(data)
    } catch (error) {
      console.error("Erro ao carregar comandos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    try {
      setRefreshing(true)
      const data = await refreshComandos()
      setComandos(data)
    } catch (error) {
      console.error("Erro ao atualizar comandos:", error)
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadComandos()
  }, [])

  return {
    comandos,
    loading,
    refreshing,
    handleRefresh,
  }
}
