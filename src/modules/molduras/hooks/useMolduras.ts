"use client"

import { useEffect, useMemo, useState } from "react"
import { getMolduras } from "@/modules/molduras/services/molduras"
import { MolduraCompleta, MolduraFilters } from "../types/moluras"

export function useMolduras() {
  const [molduras, setMolduras] = useState<MolduraCompleta[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<MolduraFilters>({
    grupoId: "todos",
    ativa: "todas",
    descricao: "",
  })

  useEffect(() => {
    fetchMolduras()
  }, [])

  const fetchMolduras = async () => {
    setIsLoading(true)
    const data = await getMolduras()
    setMolduras(data)
    setIsLoading(false)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchMolduras()
    setIsRefreshing(false)
  }

  const applyFilters = (data: MolduraCompleta[]) => {
    return data.filter((moldura) => {
      if (filters.grupoId !== "todos" && moldura.grupoId !== Number.parseInt(filters.grupoId)) return false
      if (filters.ativa === "ativas" && !moldura.ativa) return false
      if (filters.ativa === "inativas" && moldura.ativa) return false
      if (filters.descricao && !moldura.descricao.toLowerCase().includes(filters.descricao.toLowerCase())) return false
      return true
    })
  }

  const filteredData = useMemo(() => {
    const searchFiltered = molduras.filter(
      (moldura) =>
        moldura.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        moldura.grupoNome.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    return applyFilters(searchFiltered)
  }, [molduras, searchTerm, filters])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  return {
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    isLoading,
    isRefreshing,
    showFilters,
    setShowFilters,
    filters,
    setFilters,
    filteredData,
    currentData,
    totalPages,
    startIndex,
    endIndex,
    handleRefresh,
  }
}
