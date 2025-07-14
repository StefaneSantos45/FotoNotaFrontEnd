"use client"

import { useState, useMemo } from "react"
import { useComandos } from "@/modules/comandos-quiosque/hooks/useComandos"
import { usePagination } from "@/modules/comandos-quiosque/hooks/usePagination"
import { PageHeader } from "@/modules/comandos-quiosque/components/PageHeader"
import { StatsCards } from "@/modules/comandos-quiosque/components/StatsCards"
import { SearchAndFilters } from "@/modules/comandos-quiosque/components/SearchAndFilters"
import { AdvancedFilters } from "@/modules/comandos-quiosque/components/AdvancedFilters"
import { ComandosTable } from "@/modules/comandos-quiosque/components/ComandosTable"
import { Pagination } from "@/modules/comandos-quiosque/components/Pagination"
import { ComandoDetailsModal } from "@/modules/comandos-quiosque/components/ComandoDetailsModal"
import type { Comando, ComandoFilters } from "@/modules/comandos-quiosque/types"

export default function ComandosQuiosquePage() {
  const { comandos, loading, refreshing, handleRefresh } = useComandos()
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedComando, setSelectedComando] = useState<Comando | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const [filters, setFilters] = useState<ComandoFilters>({
    status: "todos",
    tipo: "todos",
    quiosque: "todos",
    usuario: "todos",
  })

  // Aplicar filtros e pesquisa
  const filteredComandos = useMemo(() => {
    return comandos.filter((comando) => {
      // Filtro de pesquisa
      const matchesSearch =
        comando.quiosque.includes(searchTerm) ||
        comando.nomeQuiosque.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comando.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comando.usuario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comando.descricao.toLowerCase().includes(searchTerm.toLowerCase())

      if (!matchesSearch) return false

      // Filtros avançados
      if (filters.status !== "todos" && comando.status !== filters.status) return false
      if (filters.tipo !== "todos" && comando.tipo !== filters.tipo) return false
      if (filters.quiosque !== "todos" && comando.quiosque !== filters.quiosque) return false

      if (filters.usuario !== "todos") {
        if (filters.usuario === "com_usuario" && !comando.usuario) return false
        if (filters.usuario === "sem_usuario" && comando.usuario) return false
      }

      return true
    })
  }, [comandos, searchTerm, filters])

  // Paginação
  const itemsPerPage = 10
  const { currentPage, totalPages, startIndex, endIndex, goToPage, resetPage } = usePagination({
    totalItems: filteredComandos.length,
    itemsPerPage,
  })

  const currentData = filteredComandos.slice(startIndex, endIndex)

  // Estatísticas
  const stats = useMemo(
    () => ({
      total: filteredComandos.length,
      pendentes: filteredComandos.filter((c) => c.status === "pendente").length,
      executando: filteredComandos.filter((c) => c.status === "executando").length,
      feitos: filteredComandos.filter((c) => c.status === "feito").length,
      comErro: filteredComandos.filter((c) => c.status === "erro").length,
    }),
    [filteredComandos],
  )

  // Verificar se há filtros ativos
  const hasActiveFilters = Object.values(filters).some((v) => v !== "todos")

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    resetPage()
  }

  const handleFiltersChange = (newFilters: ComandoFilters) => {
    setFilters(newFilters)
    resetPage()
  }

  const handleClearFilters = () => {
    setFilters({
      status: "todos",
      tipo: "todos",
      quiosque: "todos",
      usuario: "todos",
    })
    resetPage()
  }

  const handleViewDetails = (comando: Comando) => {
    setSelectedComando(comando)
    setShowDetailsModal(true)
  }

  const handleCloseModal = () => {
    setShowDetailsModal(false)
    setSelectedComando(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando comandos...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader isRefreshing={refreshing} onRefresh={handleRefresh} />

      <StatsCards stats={stats} />

      <SearchAndFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        hasActiveFilters={hasActiveFilters}
        totalResults={filteredComandos.length}
        startIndex={startIndex}
        endIndex={endIndex}
      />

      {showFilters && (
        <AdvancedFilters filters={filters} onFiltersChange={handleFiltersChange} onClearFilters={handleClearFilters} />
      )}

      <ComandosTable comandos={currentData} onViewDetails={handleViewDetails} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />

      <ComandoDetailsModal comando={selectedComando} isOpen={showDetailsModal} onClose={handleCloseModal} />
    </div>
  )
}
