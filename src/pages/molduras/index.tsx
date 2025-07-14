"use client"

import { useState } from "react"
import { RefreshCw, Search, Filter, Plus, Download, FileText, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MolduraCompleta, NovamolduraForm } from "@/modules/molduras/types/moluras"
import { ProtectedRoute } from "@/modules/auth/components"
import { MoldurasFiltersComponent } from "@/modules/molduras/components/MoldurasFilters"
import { MoldurasPagination, MoldurasTable, NovaMolduraModal } from "@/modules/molduras/components"
import { useMolduras } from "@/modules/molduras/hooks/useMolduras"

export default function MoldurasPage() {
  const {
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
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
  } = useMolduras()

  const [showNewMolduraModal, setShowNewMolduraModal] = useState(false)

  const handleClearFilters = () => {
    setFilters({
      grupoId: "todos",
      ativa: "todas",
      descricao: "",
    })
    setCurrentPage(1)
  }

  const handleEdit = (moldura: MolduraCompleta) => {
    console.log("Editar moldura:", moldura)
    // Implementar lógica de edição
  }

  const handleDelete = (moldura: MolduraCompleta) => {
    if (confirm(`Tem certeza que deseja excluir a moldura "${moldura.descricao}"?`)) {
      console.log("Excluir moldura:", moldura)
      // Implementar lógica de exclusão
    }
  }

  const handleSaveNewMoldura = (moldura: NovamolduraForm) => {
    console.log("Salvar nova moldura:", moldura)
    // Implementar lógica de salvamento
  }

  const handleExportPDF = () => {
    console.log("Exportar PDF - Molduras")
  }

  const handleExportExcel = () => {
    console.log("Exportar Excel - Molduras")
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-slate-50">

        <div className="flex-1 flex flex-col overflow-hidden">

          <main className="flex-1 overflow-y-auto p-6">
            {/* Título e Controles */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h1 className="text-4xl font-bold text-slate-800">Molduras</h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="p-2 hover:bg-slate-100 rounded-full"
                    title="Atualizar dados"
                  >
                    <RefreshCw className={`w-5 h-5 text-slate-600 ${isRefreshing ? "animate-spin" : ""}`} />
                  </Button>
                </div>
                <div className="flex space-x-2">
                    <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowNewMolduraModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Nova moldura
                    </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleExportPDF}>
                        <FileText className="w-4 h-4 mr-2" />
                        Exportar PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleExportExcel}>
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Exportar Excel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="text-slate-600 text-lg mt-3">Gerencie molduras e suas configurações</p>
            </div>

            {/* Filtros e Pesquisa */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Pesquisar molduras..."
                    className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                  />
                </div>
                <Button
                  variant={showFilters ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros {Object.values(filters).some((v) => v !== "todas" && v !== "todos" && v !== "") && "(Ativos)"}
                </Button>
              </div>
              <div className="text-sm text-slate-600">
                Mostrando {Math.min(startIndex + 1, filteredData.length)}-{Math.min(endIndex, filteredData.length)} de{" "}
                {filteredData.length} registros
              </div>
            </div>

            {/* Painel de Filtros */}
            {showFilters && (
              <MoldurasFiltersComponent
                filters={filters}
                setFilters={setFilters}
                setCurrentPage={setCurrentPage}
                onClearFilters={handleClearFilters}
              />
            )}

            {/* Tabela de Molduras */}
            <MoldurasTable currentData={currentData} onEdit={handleEdit} onDelete={handleDelete} />

            {/* Paginação */}
            <MoldurasPagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

            {/* Modal Nova Moldura */}
            <NovaMolduraModal
              isOpen={showNewMolduraModal}
              onClose={() => setShowNewMolduraModal(false)}
              onSave={handleSaveNewMoldura}
            />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
