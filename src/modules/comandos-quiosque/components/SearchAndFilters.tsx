"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

interface SearchAndFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  showFilters: boolean
  onToggleFilters: () => void
  hasActiveFilters: boolean
  totalResults: number
  startIndex: number
  endIndex: number
}

export const SearchAndFilters = ({
  searchTerm,
  onSearchChange,
  showFilters,
  onToggleFilters,
  hasActiveFilters,
  totalResults,
  startIndex,
  endIndex,
}: SearchAndFiltersProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Procurar por quiosque, tipo, usuário..."
            className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button variant={showFilters ? "default" : "outline"} size="sm" onClick={onToggleFilters}>
          <Filter className="w-4 h-4 mr-2" />
          Filtros {hasActiveFilters && "(Ativos)"}
        </Button>
      </div>
      <div className="text-sm text-slate-600">
        Mostrando {startIndex + 1}-{Math.min(endIndex, totalResults)} de {totalResults} comandos
      </div>
    </div>
  )
}
