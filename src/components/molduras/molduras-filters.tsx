"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { MolduraFilters } from "../../types/molduras"
import { gruposData } from "../../modules/auth/services/gruposData"


interface MoldurasFiltersProps {
  filters: MolduraFilters
  setFilters: React.Dispatch<React.SetStateAction<MolduraFilters>>
  setCurrentPage: (page: number) => void
  onClearFilters: () => void
}

export function MoldurasFiltersComponent({
  filters,
  setFilters,
  setCurrentPage,
  onClearFilters,
}: MoldurasFiltersProps) {
  return (
    <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-800 flex items-center justify-between">
          <span>Filtros</span>
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Limpar Filtros
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro por Grupo */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Grupo</label>
            <Select
              value={filters.grupoId}
              onValueChange={(value) => {
                setFilters((prev) => ({ ...prev, grupoId: value }))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Grupos</SelectItem>
                {gruposData.map((grupo) => (
                  <SelectItem key={grupo.id} value={grupo.id.toString()}>
                    {grupo.icone} {grupo.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filtro por Status */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
            <Select
              value={filters.ativa}
              onValueChange={(value) => {
                setFilters((prev) => ({ ...prev, ativa: value }))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="ativas">Apenas Ativas</SelectItem>
                <SelectItem value="inativas">Apenas Inativas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtros Rápidos */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Filtros Rápidos</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilters((prev) => ({ ...prev, grupoId: "1" }))
                  setCurrentPage(1)
                }}
              >
                Aniversário
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilters((prev) => ({ ...prev, ativa: "ativas" }))
                  setCurrentPage(1)
                }}
              >
                Apenas Ativas
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
